(function(w, $, getLabel) {

/**
 * Модуль торговых характеристик
 * @type {Object}
 */
site.TradeOffers = {

	/** @type {Null|Integer} идентификатор выбранного торгового предложения */
	offerId: null,

	/**
	 * Карта выбранных характеристик
	 * @type {Object}
	 * @example:
	 *
	 * {
	 *      'Размер': {     // Название характеристики
	 *          1: '48-50', // Идентификатор торгового предложения:  Значение характеристики
	 *          2: '48-50',
	 *          3: '48-50'
	 *      },
	 *      'Цвет': {
	 *          2: 'Синий',
	 *          4: 'Синий',
	 *          7: 'Синий'
	 *      }
	 * }
	 */
	characteristicMap: {},

	/** Инициализация модуля */
	init: function() {
		var that = this;

		that.bindSwitchBuyButtonsActivity();

		that.getSelectList().selectmenu({
			select: function( event, ui ) {}
		});

		that.getSelectList().bind('selectmenuselect', function(event, ui) {
			var $characteristicName = $(event.currentTarget).data('characteristic-name');
			that.setCharacteristic($characteristicName, $(ui.item.element));

			if (!that.resolveSelectedOfferId()) {
				alert(getLabel('js-error-cannot-resolve-trade-offer'));
			}
		});
	},

	/**
	 * Возвращает список контейнеров (<select>) вариантов значений характеристик
	 * @returns {*|jQuery|HTMLElement}
	 */
	getSelectList: function() {
		return $('div.additional_options-list select');
	},

	/**
	 * Возвращает список вариантов (<option>) значений характеристики с заданным именем
	 * @param {String} name имя характеристики
	 * @returns {*|jQuery|HTMLElement}
	 */
	getSelectOptionListByName: function(name) {
		return $('div.additional_options-list select[data-characteristic-name = "' + name + '"] option[data-offer-id-list]');
	},

	/** Прикрепляет определение выбрано ли торговое предложение к кнопкам помещения товара в корзину */
	bindSwitchBuyButtonsActivity: function() {
		var that = this;

		that.getBuyButtonList().bind('click', function() {
			that.switchBuyButtonActivity($(this));
			that.highlightEmptyCharacteristicContainer();
		});
	},

	/** Подсвечивает контейнеры вариантов значений характеристик, которые были не указаны */
	highlightEmptyCharacteristicContainer: function() {
		for (var name in this.getNotFilledCharacteristicNameList()) {
			this.highlightEmptyContainer($('div.additional_options-text[data-title = "' + name + '"]'));
			this.highlightEmptyContainer($('div.additional_options-list[data-title = "' + name + '"] span.ui-selectmenu-text'));
		}
	},

	/**
	 * Подсвечивает пустой контейнер
	 * @param {*|jQuery|HTMLElement} $container контейнер
	 */
	highlightEmptyContainer: function($container) {
		$container.effect("highlight", {color: "red"}, 2000);
	},

	/**
	 * Возвращает список кнопок помещения товара в корзину
	 * @returns {*|jQuery|HTMLElement}
	 */
	getBuyButtonList: function() {
		return $('a.add_to_cart_button, a.buy_one_click_button');
	},

	/** Переключает активность кнопок помещения товара в корзину */
	switchBuyButtonListActivity: function() {
		var that = this;

		that.getBuyButtonList().each(function() {
			that.switchBuyButtonActivity($(this));
		});
	},

	/**
	 * Переключает активность кнопки помещения товара в корзину
	 * @param {*|jQuery|HTMLElement} $button кнопка
	 */
	switchBuyButtonActivity: function($button) {

		if (!$button.data('old-class')) {
			$button.data('old-class', $button.attr('class'));
		}

		if (!this.isAllCharacteristicsFilled() || !this.getOfferId()) {

			if (!$button.hasClass('not_buy')) {
				$button.addClass('not_buy');
			}

			return;
		}

		$button.attr('class', $button.data('old-class'));
	},

	/**
	 * Устанавливает значение выбранной характеристики
	 * @param {String} name имя характеристики
	 * @param {*|jQuery|HTMLElement} $option контейнер (<option>) значения характеристики
	 */
	setCharacteristic: function(name, $option) {
		var that = this;
		var valueList = this.parseOption($option);

		that.characteristicMap[name] = {};

		for (var index in valueList) {
			that.characteristicMap[name][index] = valueList[index];
		}

		if (Object.keys(valueList).length === 0) {
			delete that.characteristicMap[name];
		}
	},

	/**
	 * Возвращает карту выбранных характеристик
	 * @returns {Object}
	 */
	getCharacteristicMap: function() {
		return this.characteristicMap;
	},

	/**
	 * Разбирает контейнер (<option>) значения характеристики
	 * @param {*|jQuery|HTMLElement} $option контейнер (<option>) значения характеристики
	 */
	parseOption: function($option) {
		var value = {};

		if ($option.data('offer-id-list') === '') {
			return value;
		}

		$(this.getOptionOfferIdList($option)).each(function() {
			if ($option.data('value')) {
				value[this] = $option.data('value');
			}
		});

		return value;
	},

	/**
	 * Возвращает список торговых предложений, с заданным значением характеристики
	 * @param {*|jQuery|HTMLElement} $option контейнер (<option>) значения характеристики
	 * @returns {Array}
	 */
	getOptionOfferIdList: function($option) {
		return $option.data('offer-id-list').toString().split(';');
	},

	/**
	 * Определяет выбранное торговое предложения исходя из указанных характеристик
	 * @returns {Boolean} удалось ли выбрать предложение
	 */
	resolveSelectedOfferId: function() {
		var selectedMap = this.getCharacteristicMap();
		var selectedOfferIdList = {};

		for (var name in selectedMap) {
			for (var selectedId in selectedMap[name]) {
				if (!selectedOfferIdList[selectedId]) {
					selectedOfferIdList[selectedId] = {};
				}

				var nameList = {};
				nameList[name] = name;
				Object.assign(selectedOfferIdList[selectedId], nameList)
			}
		}

		var filteredOfferIdList = {};
		var nameLength = Object.keys(selectedMap).length;

		for (var offerId in selectedOfferIdList) {
			if (Object.keys(selectedOfferIdList[offerId]).length === nameLength) {
				filteredOfferIdList[offerId] = offerId;
			}
		}

		for (var filteredOfferId in filteredOfferIdList) {
			this.setOfferId(filteredOfferId);
			this.changePrice();
			this.changeImage();
			this.switchBuyButtonListActivity();
			return true;
		}

		return false;
	},

	/** Вызывает изменения цены товара на цену выбранного предложения  */
	changePrice: function() {
		var that = this;
		this.foreachOptionWithOffer(getLabel('js-trade-offer-price'), function(value) {
			that.setPrice(value);
		});
	},

	/** Вызывает изменения изображения товара на изображение выбранного предложения  */
	changeImage: function() {
		var that = this;
		this.foreachOptionWithOffer(getLabel('js-trade-offer-image'), function(value) {
			that.setImage(value);
		});
	},

	/**
	 * Применяет функцию обратного вызова для значения заданной характеристики, соответсвующего выбранному предложению
	 * @param {String} characteristicName имя характеристики
	 * @param {Function} callback функция обратного вызова
	 */
	foreachOptionWithOffer: function(characteristicName, callback) {
		var that = this;
		var offerId = that.getOfferId();
		that.getSelectOptionListByName(characteristicName).each(function() {
			var $option = $(this);
			if (that.getOptionOfferIdList($option).indexOf(offerId) !== -1) {
				callback($option.data('value'));
			}
		});
	},

	/**
	 * Изменяет содержимое контейнера цены товара
	 * @param {String} value новое значение
	 */
	setPrice: function(value) {
		if (!value) {
			return;
		}

		$('div.top_block-price h2 span').text(value);
	},

	/**
	 * Изменяет содержимое контейнера главного изображения товара
	 * @param {String} value новое значение
	 */
	setImage: function(value) {
		if (!value) {
			return;
		}

		var $imageContainer = $('div.main_carousel div.slick-slide.slick-current.slick-active a');
		$imageContainer.attr('href', value);
		$('img', $imageContainer).attr('src', value);
		$("a[rel=fancybox_group]").fancybox({
			'loop': true,
			'touch': false,
			'toolbar': false,
			'hideScrollbar': false,
		});
	},

	/**
	 * Определяет доступен ли функционал модуля
	 * @returns {boolean}
	 */
	isAvailable: function() {
		return $('div.additional_options').length > 0;
	},

	/**
	 * Возвращает идентификатор выбранного торгового предложения
	 * @returns {Null|Integer}
	 */
	getOfferId: function() {
		return this.offerId;
	},

	/**
	 * Устанавливает идентификатор выбранного торгового предложения
	 * @param {Integer} id новый идентификатор
	 */
	setOfferId: function(id) {
		this.offerId = id;
	},

	/**
	 * Определяет были ли все характеристики заполнены
	 * @returns {Boolean}
	 */
	isAllCharacteristicsFilled: function() {
		return Object.keys(this.getNotFilledCharacteristicNameList()).length === 0;
	},

	/**
	 * Возвращает список имен незаполненных характеристик
	 * @return {Object}
	 */
	getNotFilledCharacteristicNameList: function() {
		var filledCharacteristicNameList = this.getCharacteristicMap();
		var notFilledCharacteristicNameList = {};

		for (var name in this.getCharacteristicNameList()) {
			if (!filledCharacteristicNameList[name]) {
				notFilledCharacteristicNameList[name] = name;
			}
		}

		return notFilledCharacteristicNameList;
	},

	/**
	 * Возвращает список имен всех характеристик, доступных для заполнения
	 * @returns {Array}
	 */
	getCharacteristicNameList: function() {
		var nameList = [];

		this.getSelectList().each(function() {
			var $select = $(this);

			if ($select.hasClass('hidden') === false) {
				var name = $select.data('characteristic-name');
				nameList[name] = name
			}
		});

		return nameList;
	}
};

$(function() {
	if (site.TradeOffers.isAvailable()) {
		site.TradeOffers.init();
	}
});

})(window, jQuery, getLabel);