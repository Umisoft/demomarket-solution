/**
 * Модуль форм на сайте
 * @type {Object}
 */
site.forms = {

	/** Инициализация форм */
	init: function() {
		site.forms.showFieldErrorMessages();

		$('#post_vote').on('submit', this.submitVoteForm);

		if (location.href.indexOf('forget') !== -1) {
			let $forgetPasswordForm = $('#forget');

			$forgetPasswordForm.find('input:radio').click(function() {
				$forgetPasswordForm.find('input:text').attr('name', $(this).attr('id'));
			});
		}

		if (location.href.indexOf('reactivate') !== -1) {
			let $reactivateForm = $('#reactivate');

			$reactivateForm.find('input:radio').click(function() {
				$reactivateForm.find('input:text').attr('name', $(this).attr('id'));
			});
		}

		if (location.href.indexOf('purchasing_one_step') !== -1) {
			this.emarket.purchasingOneStep.init();
		}

		if (location.href.indexOf('purchase') !== -1) {
			this.emarket.purchase.init();
		}

		this.initLoginAjaxForm();
		this.initCallbackAjaxForm();
	},

	/** Инициализирует форму обратной связи "Заказать звонок" */
	initCallbackAjaxForm: function() {
		var $container = $('#callbackContent');
		var $form = $container.find('form');

		$form.on('submit', function(e) {
			e.preventDefault();
			$.ajax({
				type: 'POST',
				dataType: 'json',
				url: '/' + window.pageData.lang + '/webforms/send.json?redirect_disallow=1',
				data: $form.serialize(),

				success: function(data) {
					var sendSuccess = !data.data;
					if (sendSuccess) {
						$container.html(getLabel('js-callback_success'));
						return;
					}

					var sendFailure = data.data && data.data.error;
					if (sendFailure) {
						site.forms.showErrorMessage($form, data.data.error);
					}
				}
			});
		});
	},

	/** Инициализирует форму авторизации */
	initLoginAjaxForm: function() {
		let $form = $('#login_form');
		$form.on('submit', function(e) {
			e.preventDefault();
			$.ajax({
				type: 'POST',
				dataType: 'json',
				url: '/' + window.pageData.lang +'/users/login_do.json?redirect_disallow=1',
				data: $form.serialize(),

				success: function(data) {
					let loginSuccess = !data.data;
					if (loginSuccess) {
						location.reload(true);
					}

					let loginFailed = (data.data && data.data.from_page);
					if (loginFailed) {
						site.forms.showErrorMessage($form, getLabel('js-login_do_try_again'));
					}

					let loginNotActivated = (data.data && data.data.not_activated);
					if (loginNotActivated) {
						site.forms.showErrorMessage($form, getLabel('js-login_not_activated'));
					}
				}
			});
		});
	},

	/**
	 * Выводит в форме сообщение об ошибке
	 * @param {jQuery} $form форма
	 * @param {String} message сообщение
	 */
	showErrorMessage: function($form, message) {
		$('.field_error_message', $form).remove();
		$('<div>', {
			'class': 'field_error_message',
			html: message
		}).appendTo($form);
	},

	/** Отправляет выбранный вариант опроса и выводит результаты опроса */
	submitVoteForm: function(e) {
		e.preventDefault();
		var $voteForm = $('#post_vote');
		var voteId = $voteForm.data('vote_id');
		var selected = $('input[name=answer]:checked', $voteForm).val();

		$.post('/' + window.pageData.lang + '/vote/post/' + selected, function() {
			$.getJSON('/udata://vote/results/' + voteId + '.json' + '?lang_id=' + window.pageData.lang_id, function(data) {
				var optionList = data.items.item;

				var $templateElement = $('#vote_result_template');
				var template = _.template($templateElement.html());
				var resultHtml = template({optionList: optionList});

				$('.interview').replaceWith(resultHtml);
				site.common.stylizeVoteResults();
			});
		});
	},

	/** Выводит сообщения об ошибках для полей форм */
	showFieldErrorMessages: function() {
		var matches = /_err=([^&]+)/.exec(location.search);
		if (!matches) {
			return;
		}

		var errorId = matches[1];
		$.getJSON('/udata/system/listErrorMessages.json?_err=' + errorId + '&lang_id=' + window.pageData.lang_id, function(data) {
			var errorList = (data.items && data.items.item) || [];
			$.each(errorList, function(i, error) {
				var fieldName = error['str-code'] || '';
				if (!fieldName) {
					return;
				}

				var $container;
				if (fieldName === 'captcha') {
					$container = $('main .captcha_field');
				} else {
					$container = $('main input[name="' + fieldName + '"]').parent();
				}

				$('<div>', {
					'class': 'field_error_message',
					html: error.message
				}).appendTo($container);
			});
		});
	},

	/**
	 * Контейнер для модулей оформления заказа
	 * @type {Object}
	 */
	emarket: {
		toggleNewObjectForm: function(container, newObjectBlock) {
			let block = $(newObjectBlock);

			if (block.length === 0) {
				return;
			}

			let $form = $('form#deliveryForm');

			if ($('input[type=radio][value!=new]', container).length > 0) {
				if ($('input[type=radio]:checked', container).val() !== 'new') {
					block.hide();
					$form.attr('novalidate', 'novalidate');
					$form.find('.personal_data_wrapper').hide();
				}
			}

			$('input[type=radio]', container).click(function() {
				if ($(this).val() !== 'new') {
					block.hide();
					$form.attr('novalidate', 'novalidate');
					$form.find('.personal_data_wrapper').hide();
				} else {
					block.show();
					$form.removeAttr('novalidate');
					$form.find('.personal_data_wrapper').show();
				}

				let $address = $(this);

				$($form.find('input:checked').each( function() {
					if ($(this).val() !== $address.val()) {
						$(this).prop('checked', false);
					}
				}));
			});
		},

		/**
		 * Модуль оформления заказа
		 * @type {Object}
		 */
		purchase: {
			init: function() {
				this.initDeliveryAddressPage();
				this.initInvoicePaymentPage();
			},

			// Показать/скрыть форму создания нового адреса доставки
			initDeliveryAddressPage: function() {
				var	addressBlock = '.delivery_address';
				site.forms.emarket.toggleNewObjectForm(addressBlock, '#new-address');

			},

			// Показать/скрыть форму создания нового юридического лица
			initInvoicePaymentPage: function() {
				var invoicePaymentBlock = '#invoice';
				var newLegalPersonBlock = '#new-legal-person';
				var $form = $('form#invoice');

				if ($('input[type=radio][value!=new]', invoicePaymentBlock).length > 0) {
					if ($('input[type=radio]:checked', invoicePaymentBlock).val() !== 'new') {
						$(newLegalPersonBlock).hide();
						$form.attr('novalidate', 'novalidate');
					}
				}

				$('input[type=radio]', invoicePaymentBlock).click(function() {
					if ($(this).val() !== 'new') {
						$(newLegalPersonBlock).hide();
						$form.attr('novalidate', 'novalidate');
					} else {
						$(newLegalPersonBlock).show();
						$form.removeAttr('novalidate');
					}
				});
			}
		},

		/**
		 * Модуль оформления заказа в один шаг
		 * @type {Object}
		 */
		purchasingOneStep: {
			init: function() {
				var	addressSelector = '.delivery_address.onestep';
				var	deliverySelector = '.delivery_choose.onestep';
				var paymentSelector = '.payment.onestep';

				var $form = $('#oneStepForm');

				// Показать/скрыть форму создания нового адреса доставки
				site.forms.emarket.toggleNewObjectForm(addressSelector, '#new-address');

				var animationSpeed = 300;
				var $paymentBlock = $(paymentSelector, $form);
				var $deliveryBlock = $(deliverySelector, $form);
				var purchasing = this;

				var $deliveryRadioButton = purchasing.flagDeliveryRadioButton();
				purchasing.flagAddressRadioButton();

				var price = $deliveryRadioButton.data('price');
				this.setPriceInCart(price);

				// Обработчик события выбора адреса доставки или Самовывоза
				$('input[type=radio]', addressSelector).click(function() {
					var $address = $(this);

					$('.delivery_address input:checked').each(
						function() {
							if ($(this).val() !== $address.val()) {
								$(this).prop('checked', false);
							}
						}
					);

					var addressType = $address.data('type');

					if (addressType === 'self') {
						$deliveryBlock.hide(animationSpeed);
						$paymentBlock.show(animationSpeed);
					} else {
						$deliveryBlock.show(animationSpeed);
					}

					var addressId = $address.attr('value');

					if (addressId === 'new') {
						purchasing.saveDeliveryAddress();
					} else if (addressType !== 'self') {
						purchasing.updateDeliveryPrice({'delivery-address' : addressId});
					}

					var deliveryPrice = $address.data('price');
					purchasing.setPriceInCart(deliveryPrice);
				});

				// Обработчик события выбора способа доставки
				$('input[type="radio"]', deliverySelector).click(function() {
					if ($paymentBlock.length > 0) {
						$paymentBlock.show(animationSpeed);
					}

					var $delivery = $(this);
					var price = $delivery.data('price');

					if ($delivery.data('api') !== 'api-ship') {
						purchasing.setPriceInCart(price);
					}

					$('div.choose-payment').show();
					var disabledPayment = String($delivery.data('disabledpayments'));
					if (disabledPayment) {
						disabledPayment = disabledPayment.split(',');

						for (let paymentId of disabledPayment) {
							$('input[name="payment-id"][value="' + paymentId + '"]').closest('div.choose-payment').hide();
						}
					}
				});

				let personalDataAgreement = $form.find('#purchase-step-address-152-federal-law');
				let personalDataErrorBlock = $form.find('.personal_data_error');

				personalDataAgreement.click(function() {
					let isAgreeWidthProcessingPersonalData = personalDataAgreement.prop('checked');
					if (isAgreeWidthProcessingPersonalData) {
						personalDataErrorBlock.css('display', 'none');
					}
				});

				$form.on('submit', function(e) {
					let isAgreeWidthProcessingPersonalData = personalDataAgreement.prop('checked');

					if (!isAgreeWidthProcessingPersonalData) {
						e.preventDefault();
						personalDataErrorBlock.css('display', 'block');
						personalDataErrorBlock.text(getLabel('js-personal-data-error'));
					}

					if (purchasing.showErrors()) {
						e.preventDefault();
					}
				})
			},

			/**
			 * Отмечает радио-кнопку выбранной доставки
			 * @returns {jQuery} выбранная радио-кнопка
			 */
			flagDeliveryRadioButton: function() {
				var currentDeliveryId = this.getDeliveryPriceBlockInCart().data('delivery');

				return this.flagCheckedRadioButton(currentDeliveryId, $('.delivery_choose.onestep'));
			},

			/**
			 * Отмечает радио-кнопку выбранного адреса
			 * @returns {jQuery} выбранная радио-кнопка
			 */
			flagAddressRadioButton: function() {
				var currentAddressId = this.getDeliveryPriceBlockInCart().data('address');

				return this.flagCheckedRadioButton(currentAddressId, $('.delivery_address.onestep'));
			},

			/**
			 * Возвращает блок цены доставки в корзине
			 * @returns {jQuery}
			 */
			getDeliveryPriceBlockInCart: function() {
				return $('#delivery_price');
			},

			/**
			 * Отмечает выбранную радио-кнопку и возвращает ее
			 * @param {int} id идентификатор объекта
			 * @param {jQuery} $form форма с радио-кнопками
			 * @return {jQuery} выбранная радио-кнопка
			 */
			flagCheckedRadioButton: function(id, $form) {
				var radioButton = $form.find('input[value="' + id + '"]:eq(0)');

				if (radioButton.length > 0) {
					radioButton.attr('checked', true)
				}
				
				return radioButton;
			},

			/**
			 * Изменяет цену доставки и общую цену в корзине
			 * @param {int} deliveryPrice цена доставки
			 */
			setPriceInCart: function(deliveryPrice) {
				var formatPrice = site.helpers.formatPrice;
				var $orderPrice = $('#order_price');
				var discount = parseFloat($('#discount').data('price'));
				deliveryPrice = $.isNumeric(deliveryPrice) ? deliveryPrice : 0;

				$('#delivery_price').text(formatPrice(deliveryPrice));

				var totalPrice = parseFloat($orderPrice.data('price')) + parseFloat(deliveryPrice) - discount;
				$orderPrice.text(formatPrice(totalPrice));
			},

			/** Сохраняет адрес доставки в заказ */
			saveDeliveryAddress: function() {
				var $form = $('#new-address');
				var $fieldList = $('input,textarea,select', $form);

				$fieldList.change(function() {
					$form.data("changed", true);
				});

				var purchasing = this;

				$('#save-delivery').click(function(e) {
					e.preventDefault();

					var $requiredFieldList = $fieldList.filter('[required]:visible');
					var $emptyRequiredFieldList = purchasing.getEmptyRequiredFieldList($requiredFieldList);

					if ($emptyRequiredFieldList.length === 0) {
						var id = $form.data('id') ? $form.data('id') : 'new';
						var data = $fieldList.serialize() + '&replace-address=1&delivery-address=' + id;

						if ($form.data("changed")) {
							$form.data("send", true);
							purchasing.updateDeliveryPrice(data);
						}

						$form.data("changed", false);
					} else {
						purchasing.highlightFieldList($emptyRequiredFieldList);
					}
				});
			},

			/**
			 * Добавляет адрес доставки в форму
			 * @param {int} addressId идетификатор адреса
			 */
			addDeliveryAddress: function(addressId) {
				let form = $('#new-address');
				form.data('id', addressId);
				form.hide();

				let fieldList = $('input,select', form);
				let address = [];
				fieldList.each(function(i,e) {
					if (e.type == 'submit') {
						return;
					}

					let val = '';
					let field = $(e);
					if (e.tagName == "SELECT") {
						val = field.find('option:selected').text();
					} else {
						val = field.val();
					}

					address.push(val);
					field.val(null);
				});

				var templateElement = $('#add_address_template');
				var template = _.template(templateElement.html());
				var resultHtml = template({addressId: addressId, address: address});
				$('.delivery_address .del_content:first-child div:last-child')
					.before(resultHtml);
				form.data("send", false);
			},

			/**
			 * Возвращает список незаполненных обязательных полей
			 * @param {jQuery[]} $requiredFieldList список полей
			 * @returns {Array}
			 */
			getEmptyRequiredFieldList: function($requiredFieldList) {
				var emptyRequiredFieldList = [];

				$($requiredFieldList).each(function() {
					var $input = $(this);

					if ($input.val() === '') {
						emptyRequiredFieldList.push($input);
					}
				});

				return emptyRequiredFieldList;
			},

			/** Отображает ошибки на экране при подтверждении заказа */
			showErrors: function() {
				var $fieldList = $('input,textarea,select', "#oneStepForm").filter('[required]:visible');
				var $emptyRequiredFieldList = this.getEmptyRequiredFieldList($fieldList);

				if ($emptyRequiredFieldList.length > 0) {
					this.highlightFieldList($emptyRequiredFieldList);

					var $orderError = $('.order-error', '#billForm').first();
					$orderError.show();

					setTimeout(function() {
						$orderError.hide();
					}, 4000);

					return true;
				}

				return false;
			},

			/**
			 * Подсвечивает поля из списка
			 * @param {jQuery[]} $fieldList
			 */
			highlightFieldList: function($fieldList) {
				$($fieldList).each(function(index, item) {
					var oldBorder = item.css('border');
					item.css('border', '1px solid red');

					setTimeout(function() {
						item.css('border', oldBorder);
					}, 2000)
				});
			},

			/**
			 * Обновляет цену доставок
			 * @param {Object|string} data информация из формы для передачи через ajax
			 */
			updateDeliveryPrice: function(data) {
				var purchasing = this;

				$.ajax({
					type: 'POST',
					url: '/udata://emarket/saveInfo/0/0/0/0/0',
					data: data,

					success: function(data) {
						let error = $(data).find('error');
						let form = $('#new-address');
						if (error.length) {
							alert(getLabel('js-error') + ': ' + error.first().text());
							form.data("changed", true);
							return;
						}

						if (form.data("send")) {
							let addressId = $(data).find('address-id').first().text();
							purchasing.addDeliveryAddress(addressId);
						}

						purchasing.updateRussianPostDeliveryPrice();
					}
				});
			},

			/** Обновляет цену доставок типа "Почта России" */
			updateRussianPostDeliveryPrice: function() {
				let purchasing = this;
				let $russianPostList = $('input[data-type="russianpost"]', '.delivery_choose.onestep');

				if ($russianPostList.length > 0) {
					$.each($russianPostList, function(index, russianPost) {
						let $russianPost = $(russianPost);
						let $deliveryId = $russianPost.attr('value');
						let $price = purchasing.getDeliveryPrice($deliveryId);

						if ($russianPost.prop('checked')) {
							purchasing.updateDeliveryInOrder($deliveryId)
						}

						purchasing.updatePriceInChooseList($russianPost, $price);
						purchasing.setPriceOfChosenDeliveryInCart()
					});
				}
			},

			/**
			 * Обновляет информацию о доставке в заказе
			 * @param {int} $deliveryId идентификатор доставки
			 */
			updateDeliveryInOrder: function($deliveryId) {
				$.ajax({
					type: 'POST',
					url: '/udata://emarket/saveInfo/0/0/0/0/0',
					data: {'delivery-id' : $deliveryId},
					async: false,
				});
			},

			/**
			 * Возвращает цену доставки
			 * @param {int} $deliveryId идентификатор доставки
			 * @returns {int}
			 */
			getDeliveryPrice: function($deliveryId) {
				let price = 0;
				let url = '/udata://emarket/getDeliveryPriceByDeliveryId/' + $deliveryId;

				$.ajax({
					type: 'POST',
					url: url,
					async: false,

					success: function(data) {
						price = $('udata', data).text();
					}
				});

				return price;
			},

			/** Изменяет цену выбранной доставки в корзине */
			setPriceOfChosenDeliveryInCart: function() {
				var checkedDeliverySelector = 'input[type="radio"]:checked:eq(0)';
				var $currentDelivery = $('.delivery_choose.onestep').find(checkedDeliverySelector);

				if ($currentDelivery.length > 0) {
					this.setPriceInCart($currentDelivery.data('price'));
				}
			},

			/**
			 * Обновляет и форматирует цены доставок в форме выбора доставки
			 * @param {jQuery} $delivery кнопка выбора доставки
			 * @param {int} price цена
			 */
			updatePriceInChooseList: function($delivery, price) {
				$.ajax({
					type: 'POST',
					url: '/udata://emarket/applyPriceCurrency/' + price,
					async: false,

					success: function(data) {
						var $priceContainer = $delivery.parent().find('.delivery-price:eq(0)');
						var $priceBlock = $priceContainer.children('.price:eq(0)');
						var $priceNode = $(data).find('price');
						var deliveryPrice = $priceNode.children('actual').text();
						var prefix = '';
						var suffix = '';

						if (!$.isNumeric(deliveryPrice)) {
							$priceBlock.addClass('price-error');
							$delivery.data('price', 0);
						} else {
							$delivery.data('price', deliveryPrice);
							$priceBlock.removeClass('price-error');
							prefix = $priceNode.attr('prefix');
							suffix = $priceNode.attr('suffix');
						}

						$priceContainer.children('.prefix:eq(0)').text(prefix);
						$priceContainer.children('.suffix:eq(0)').text(suffix);
						$priceBlock.text(deliveryPrice);
					},
				});
			},
		}
	}
};

$(function() {
	site.forms.init();
});
