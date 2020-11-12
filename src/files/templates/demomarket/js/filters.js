/**
 * Модуль filters.
 * Используется для управления адаптивной фильтрацией.
 * 
 * @param {jQuery} $
 * @link http://dev.docs.umi-cms.ru/spravochnik_makrosov_umicms/katalog/catalog_getsmartfilters/
 */
site.filters = (function($) {

	'use strict';

	/**
	 * @type {Number} минимальная ширина экрана в пикселях,
	 * при которой будет использоваться десктопная форма фильтров, а не мобильная.
	 */
	var MINIMUM_DESKTOP_WIDTH = 992;

	/** @type {jQuery} Форма с фильтрами */
	var _$form;

	/** @type {String} Название get-параметра, в котором передаются данные фильтрации */
	var _filterParamName = 'filter';

	/** @type {String} Префикс запроса на получение данных фильтрации */
	var _baseUrl = '/udata://catalog/getSmartFilters//';

	/** @type {String} ID категории, по которой выполняется фильтрация */
	var _categoryId;

	/** @type {Object} get-параметры фильтрации для всех полей */
	var _params = {};

	/**
	 * Кнопка отображения результатов фильтрации "Показать"
	 * @type {{element: jQuery, name: String}}
	 */
	var _resultButton = {
		$element: null,
		name: ''
	};

	/** @type {Boolean} Флаг инициализации полей типов "Чекбокс" и "Радио-кнопка" при первой загрузке фильтров */
	var _checkboxAndRadioFieldsAreInitialized = false;

	/** Инициализирует фильтрацию на странице */
	$(function() {
		init();

		if (hasFilterParam()) {
			_params = getFilterParams();
			getFilters();
		}

		var fieldList = getAllFields();
		forEachField(fieldList, bindValueChangeHandler);
	});

	/** Инициализирует умные фильтры на текущей странице */
	function init() {
		initFilterData();
		initResetButton();
		initSliderFields();
		initDateFields();

		/** Инициализирует основные параметры фильтрации */
		function initFilterData() {
			var formSelector = canShowMobileFilters() ? '.mobile_filters' : '.desktop_filters';
			_$form = $(formSelector);
			_categoryId = _$form.data('category');
			_resultButton.$element = $('.show_result', _$form);
			_resultButton.name = _resultButton.$element.val();
		}

		/** Инициализирует кнопку сброса фильтров */
		function initResetButton() {
			$('.reset', _$form).click(function(e) {
				e.preventDefault();
				location.href = location.pathname;
			});
		}

		/** Инициализирует поля со слайдером */
		function initSliderFields() {
			$('.slider_field', _$form).each(function() {
				var $field = $(this);

				var rangeBlock = $field.find('.delta_price');
				var from = rangeBlock.children('input.min');
				var to = rangeBlock.children('input.max');

				var startValue = parseFloat(from.data('minimum'));
				var selectedStartValue = parseFloat(from.val());

				var endValue = parseFloat(to.data('maximum'));
				var selectedEndValue = parseFloat(to.val());

				var $slider = $field.find('.price_progress .range');

				$slider.siblings('.min_val').text(startValue);
				$slider.siblings('.max_val').text(endValue);
				$slider.slider({
					range: true,
					min: startValue,
					max: endValue,
					values: [selectedStartValue, selectedEndValue],

					slide: function(event, ui) {
						from.val(ui.values[0]);
						to.val(ui.values[1]);
					},

					change: function(event, ui) {
						if (from.val() == ui.value) {
							onChange(from.get(0));
						} else if (to.val() == ui.value) {
							onChange(to.get(0));
						}
					}
				});
			});
		}

		/** Инициализирует поля с типом "дата" */
		function initDateFields() {
			$('.date_field input[type=text]', _$form).each(function() {
				var $field = $(this);

				var minDate = new Date(Date.parse($field.data('minimum')));
				var maxDate = new Date(Date.parse($field.data('maximum')));
				var selectedDate = new Date(Date.parse($field.val()));
				var formattedDate = formatDate(selectedDate);

				$field.val(formattedDate);
				$field.datepicker({
					dateFormat: 'd.m.yy',
					minDate: minDate,
					maxDate: maxDate
				});
			});
		}
	}

	/** Выполняет ajax запрос для получения данных фильтрации */
	function getFilters() {
		var url = _baseUrl + _categoryId + '.json' + '?lang_id=' + window.pageData.lang_id;

		$.ajax({
			url: url,
			data: _params,
			dataType: 'json',
			type: 'get',
			success: onGetFilters
		});
	}

	/**
	 * Отображает результат фильтрации (количество найденных товаров)
	 * @param {Object} data ответ от сервера с данными о фильтрации
	 */
	function showResult(data) {
		var value = _resultButton.name + ' (' + data.total + ')';
		getFilterResultPopUp().val(value);
		_resultButton.$element.val(value);
	}

	/**
	 * Определяет, нужно ли выводить фильтры в мобильной форме.
	 * Если сайт открыт в маленьком окне, для фильтрации будет использоваться
	 * мобильная форма, а если в большом - десктопная.
	 * @returns {Boolean}
	 */
	function canShowMobileFilters() {
		return $.viewportW() < MINIMUM_DESKTOP_WIDTH;
	}
	
	/**
	 * Преобразует Date в строковую дату
	 * @param {Date} date
	 * @returns {String}
	 */
	function formatDate(date) {
		if (!date instanceof Date) {
			return 'Date expected';
		}
		return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
	}

	/**
	 * Обработчик ответа сервера с данными фильтрации
	 * @param {Object} response данные фильтрации
	 */
	function onGetFilters(response) {
		var $fieldList = getAllFields();

		forEachField($fieldList, resetField, function($field) {
			return (getFieldType($field).type !== 'text' && !isFiltered($field));
		});
		forEachField($fieldList, setField, null, response);
		enableCheckboxAndRadioFields();
		showResult(response);

		/** Включает поля типов "Чекбокс" и "Радио-кнопка" при первой загрузке фильтров */
		function enableCheckboxAndRadioFields() {
			if (_checkboxAndRadioFieldsAreInitialized) {
				return;
			}

			_checkboxAndRadioFieldsAreInitialized = true;

			forEachField($fieldList, function() {
				this.prop('checked', true);
			}, function($field) {
				var name = $field.attr('name');
				var type = getFieldType($field).type;
				var checkboxOrRadio = (type === 'checkbox' || type === 'radio');
				var isEnabled = (_params[name] && $field.val() == _params[name].replace(/\+/ig, ' '));
				return checkboxOrRadio && isEnabled;
			});
		}
	}

	/**
	 * Определяет, присутствует ли поле в параметрах фильтрации.
	 *
	 * Для полей типа "Чекбокс" учитывается совокупность всех чекбоксов
	 * в рамках одного свойства, например если хотя бы один чекбокс нажат:
	 *   filter[cvet][0]
	 *   filter[cvet][1]
	 *   filter[cvet][2]
	 *
	 *   все поля filter[cvet][*] участвуют в фильтрации.
	 *
	 * @param {jQuery} $field поле
	 * @returns {Boolean}
	 */
	function isFiltered($field) {
		var fieldName = getFieldNameByParam($field.attr('name'));
		var isFound = false;

		$.each(_params, function(param) {
			var name = getFieldNameByParam(param);
			if (fieldName === name) {
				isFound = true;
				return false;
			}
		});

		return isFound;
	}

	/** Выполняет визуальную "деактивацию" поля */
	function resetField() {
		var $field = this;

		if ($field.parent().length > 0) {
			disableField($field);
		}
	}

	/**
	 * Делает поле неактивным
	 * @param {jQuery} $field поле
	 */
	function disableField($field) {
		$field.parent().addClass('filter_disabled');
		$field.attr('disabled', '');
	}

	/**
	 * Обработчик события изменения значения поля
	 * @param {Object} event событие
	 */
	function onChange(event) {
		var $field = $(event.target || event);
		var newFieldParam = getFieldParam($field);
		$.extend(_params, newFieldParam);

		if (getFieldType($field).type === 'checkbox' && !$field.prop('checked')) {
			deleteFieldParam($field);
		}

		var rangeParams = getRangeParams();
		$.extend(_params, rangeParams);
		getFilters();
		showFilterResultPopUp();

		setTimeout(function() {
			getFilterResultPopUp().remove();
			removePopUpArrow();
		}, 9000);

		/**
		 * Возвращает параметр с его значением поля
		 * @param {jQuery} $field поле
		 * @returns {Object}
		 */
		function getFieldParam($field) {
			var name = $field.attr('name');
			var value = $field.val();
			var param = {};
			param[name] = value;
			return param;
		}

		/**
		 * Удаляет параметр поля $field из объекта параметров фильтрации
		 * @param {jQuery} $field поле фильтрации
		 */
		function deleteFieldParam($field) {
			var name = $field.attr('name');
			delete _params[name];
		}

		/**
		 * Возвращает параметры полей с интервалом значений
		 * @returns {Object} {paramName1: paramValue1, paramName2: paramValue2, ...}
		 */
		function getRangeParams() {
			var $fieldList = getAllFields();
			var params = {};

			$fieldList.each(function (i, field) {
				var $field = $(field);
				var boundary = getBoundary($field);

				if (boundary === 'from' || boundary === 'to') {
					params[$field.attr('name')] = $field.val();
				}
			});

			return params;
		}

		/** Отображает всплывающее окно с результатом фильтрации */
		function showFilterResultPopUp() {
			var $popUp = getFilterResultPopUp();
			var text = $popUp.val() || '';
			$popUp.remove();
			removePopUpArrow();

			var $container = $field.parents('.product_form:eq(0)').siblings('.arrow_product:eq(0)');

			$.get('/templates/demomarket/js/filters/filterPopUp.html', function(data) {
				var popUpTemplate = _.template(data);
				$container.after(popUpTemplate({ 'input_value': text }))
			});
		}

		/** Удаляет стрелку у всплывающего окна */
		function removePopUpArrow() {
			$('.arrow_left').remove();
		}
	}

	/**
	 * Возвращает всплывающее окно
	 * @returns {jQuery}
	 */
	function getFilterResultPopUp() {
		return $('.show_result_pop_up:eq(0)');
	}

	/**
	 * Возвращает есть ли в адресе параметры фильтрации
	 * @returns {Boolean}
	 */
	function hasFilterParam() {
		var params = getAllParams();
		for (var name in params) {
			if (params.hasOwnProperty(name)) {
				if (getArrayParamName(name) === _filterParamName) {
					return true;
				}
			}
		}

		return false;
	}

	/**
	 * Возвращает все параметры и их значения из строки запроса в виде объекта
	 * вида {paramName1: paramValue1, paramName2: paramValue2, ...}
	 * @returns {Object}
	 */
	function getAllParams() {
		var query = location.search;
		var params = {};

		if (query === '') {
			return params;
		}

		var decodedQuery = decodeURIComponent(query);
		decodedQuery = decodedQuery.replace(/^\?/, '');

		var groupList = decodedQuery.split('&');
		$.each(groupList, function(i, group) {
			group = group.split('=');
			var name = group[0];
			var value = group[1];
			params[name] = value;
		});

		return params;
	}

	/**
	 * Возвращает имя массива параметров по имени параметра
	 * @param {String} paramName имя параметра, @example "filter[price][from]"
	 * @returns {String} имя массива, @example "filter"
	 */
	function getArrayParamName(paramName) {
		var bracketPos = paramName.indexOf('[');
		if (bracketPos === -1) {
			return paramName;
		}
		return paramName.slice(0, bracketPos);
	}

	/**
	 * Возвращает объект только с данными о параметрах фильтрации
	 * вида вида {paramName1: paramValue1, paramName2: paramValue2 ...}
	 * @returns {Object}
	 */
	function getFilterParams() {
		var filterParams = {};
		$.each(getAllParams(), function(name, value) {
			if (getArrayParamName(name) === _filterParamName) {
				filterParams[name] = value;
			}
		});
		return filterParams;
	}

	/**
	 * Возвращает имя поля по имени параметра
	 * @param {String} paramName имя параметра, @example 'filter[price][from]'
	 * @returns {String} имя поля или пустую строку, @example 'price'
	 */
	function getFieldNameByParam(paramName) {
		var matches = /^(\w+)?\[(\w+)/.exec(paramName);
		if (typeof matches[2] !== 'undefined') {
			return matches[2];
		}
		return '';
	}

	/** Назначает обработчик событий выбора значения в фильтре для полей разных типов */
	function bindValueChangeHandler() {
		var $field = this;
		var fieldType = getFieldType($field);

		switch (true) {
			case fieldType.tag === 'input' && (fieldType.type === 'radio' || fieldType.type === 'checkbox'): {
				$field.click(onChange);
				break;
			}

			case $field.parents('.date_field').length > 0: {
				$field.change(onChange);
				break;
			}

			// Поле со слайдером
			default: {
				$field.bind('focus', function() {
					$(this).data('originValue', $(this).val());
				});

				$field.focusout(function(e) {
					var originValue = $(this).data('originValue');

					if ($(this).val() !== originValue) {
						onChange(e);
					}
				});
			}
		}
	}

	/**
	 * Возвращает данные, пришедшие от сервера по полю с именем `name`
	 * @param {JSON} data данные от сервера
	 * @param {String} name имя поля
	 * @returns {JSON}
	 */
	function getFieldDataByName(data, name) {
		var groupList = data['group'] || {};
		var fieldList = getFieldList(groupList);
		var fieldData = null;

		$.each(fieldList, function(i, field) {
			if (field.name === name) {
				fieldData = field;
				return false;
			}
		});

		return fieldData;

		/**
		 * Возвращает данные о дочерних элементах с именем 'field'
		 * @param {JSON} data
		 * @returns {Array}
		 */
		function getFieldList(data) {
			var allFieldList = [];
			$.each(data, function(name, value) {
				var fieldList = value['field'];
				$.each(fieldList, function(i, field) {
					allFieldList.push(field);
				});
			});

			return allFieldList;
		}
	}

	/**
	 * Выполняет функцию callback для всех полей fieldList, которые соответствуют критерию filter
	 * @param {jQuery} fieldList объект содержащий данные о полях формы фильтрации
	 * @param {Function} callback функция, которая будет выполнена для каждого поля
	 * @param {Function} [filter] функция, которая выступает в качестве критерия для отбора полей
	 */
	function forEachField(fieldList, callback, filter) {
		filter = (typeof filter === 'function') ? filter : function() {
			return true;
		};

		var extraArgs = Array.prototype.slice.call(arguments, 3);

		fieldList.each(function(i, field) {
			var $field = $(field);
			if (filter($field)) {
				callback.apply($field, extraArgs);
			}
		});
	}

	/**
	 * Возвращает все поля формы
	 * @returns {jQuery}
	 */
	function getAllFields() {
		return $('input[name]', _$form);
	}

	/**
	 * Возвращает объект с именем тега и типом (атрибут type) поля
	 * @param {jQuery} $field поле
	 */
	function getFieldType($field) {
		var tag = $field.prop('tagName').toLowerCase();
		var type = $field.attr('type') || null;

		return {
			tag: tag,
			type: type
		};
	}

	/**
	 * Изменяет состояние поля в зависимости от переданных данных
	 * @param {JSON} data
	 */
	function setField(data) {
		var $field = this;
		var paramName = $field.attr('name');
		var fieldName = getFieldNameByParam(paramName);
		var fieldData = getFieldDataByName(data, fieldName);

		var fieldType = getFieldType($field);
		if (fieldType.type === 'checkbox') {
			setCheckBoxField($field, fieldData);
		} else if (fieldType.type === 'radio') {
			setRadioField($field, fieldData);
		} else {
			setRangeField($field, fieldData);
		}
	}

	/**
	 * Изменяет состояние поля типа "Checkbox" в зависимости от переданных данных
	 * @param {jQuery} $field поле
	 * @param {JSON} data
	 */
	function setCheckBoxField($field, data) {
		if (!data) {
			return;
		}

		var fieldValue = $field.val();
		var itemList = data.item || [];

		$.each(itemList, function(i, item) {
			if (item.value === fieldValue) {
				enableField($field);
			}
		});
	}

	/**
	 * Делает поле активным
	 * @param {jQuery} $field поле
	 */
	function enableField($field) {
		$field.parent().removeClass('filter_disabled');
		$field.removeAttr('disabled');
	}

	/**
	 * Изменяет состояние поля типа "Radio" в зависимости от переданных данных
	 * @param {jQuery} $field поле
	 * @param {JSON} data
	 */
	function setRadioField($field, data) {
		var value = $field.val();
		if (value === '') {
			enableField($field);
		}
		setCheckBoxField($field, data);
	}

	/**
	 * Изменяет состояние поля с интервалом значений в зависимости от переданных данных
	 * @param {jQuery} $field поле
	 * @param {JSON} data
	 */
	function setRangeField($field, data) {
		if (!data) {
			return;
		}

		if (data.minimum && data.minimum.value && getBoundary($field) === 'from') {
			if (data['data-type'] != 'date') {
				$field.val(data.minimum.value);
				return;
			}
			var minDate = convertTimestampToDate(data.minimum.value);
			$field.val(formatDate(minDate));
		}

		if (data.maximum && data.maximum.value && getBoundary($field) === 'to') {
			if (data['data-type'] != 'date') {
				$field.val(data.maximum.value);
				return;
			}
			var maxDate = convertTimestampToDate(data.maximum.value);
			$field.val(formatDate(maxDate));
		}

		/**
		 * Преобразует timestamp в Date
		 * @param {Integer} timestamp
		 * @returns {Date}
		 */
		function convertTimestampToDate(timestamp) {
			return new Date(timestamp * 1000);
		}
	}

	/**
	 * Возвращает имя границы (from или to) поля с интервалом значений
	 * @param {jQuery} $field
	 * @returns {String}
	 */
	function getBoundary($field) {
		var name = $field.attr('name');
		var matches = /\[(\w+)\]$/.exec(name);

		if (matches && matches[1]) {
			return matches[1];
		}

		return '';
	}

})(jQuery);
