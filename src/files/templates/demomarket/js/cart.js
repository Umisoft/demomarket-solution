(function(w, $, _, getLabel) {

/**
 * Модуль корзины товаров
 * @type {Object}
 */
site.Cart = {
	/** @type {Boolean} Статус готовности корзины */
	ready: true,

	/** @type {Boolean} Является ли текущая страница корзиной */
	isCartPage: _.isArray(w.document.location.pathname.match(/emarket\/cart/)),

	/** Инициализация модуля */
	init: function() {

		/** @type {string} Селектор всплывающего окна для кнопки "Купить" */
		var buyModalSelector = '#buy_modal';

		/** @type {string} Селектор всплывающего окна для кнопки "Купить в один клик" */
		var oneClickModalSelector = '#oneclick_modal';

		/**
		 * Нажатие на кнопку "Купить" ("Добавить" для связанных товаров в корзине).
		 * Если у товара есть опционные свойства - появляется всплывающее окно с выбором свойств.
		 * Если опционных свойств нет - товар добавляется в корзину.
		 */
		$('a.add_to_cart_button').on('click', function(e) {
			e.preventDefault();
			var $button = $(this);

			if ($button.hasClass('not_buy')) {
				return;
			}

			if (site.TradeOffers.isAvailable()) {
				site.Cart.putElementInCart($button, {
					'offer_id': site.TradeOffers.getOfferId(),
					'price_type_id': $('#price_type_id').data('price-type-id')
				});
				return;
			}

			var $optionedPropertiesBlock = $button.parents('.add_to_cart_block').find('.hidden_optioned_properties');

			if ($optionedPropertiesBlock.length === 0) {
				site.Cart.putElementInCart($button);
				return;
			}

			var $buyModal = $(buyModalSelector);
			$buyModal.find('main').html($optionedPropertiesBlock.html());
			var $form = $buyModal.find('form');
			$form.attr('action', this.href);

			$buyModal.modal('show');
		});

		/** Нажатие на кнопку "Купить в один клик". */
		$('a.buy_one_click_button').on('click', function(e) {
			e.preventDefault();
			var $button = $(this);

			if ($button.hasClass('not_buy')) {
				return;
			}

			var $addToCartBlock = $button.parents('.add_to_cart_block');
			var $oneClickModal = $(oneClickModalSelector);

			var elementId = $addToCartBlock.data('element_id');
			$oneClickModal.data('element_id', elementId);

			if (site.TradeOffers.isAvailable()) {
				$oneClickModal.data('offer_id', elementId);
				$oneClickModal.modal('show');
				return;
			}

			var $optionedPropertiesBlock = $addToCartBlock.find('.hidden_optioned_properties');

			if ($optionedPropertiesBlock.length > 0) {
				$('#one_click_order_optioned_properties')
					.html($optionedPropertiesBlock.html())
					.find('input[type="submit"]')
					.remove(); // Удаляем ненужную кнопку 'Добавить в корзину'
			}

			$oneClickModal.modal('show');
		});

		/** Нажатие на кнопку "Оформить заказ" внутри всплывающего окна для заказа в один клик. */
		$(oneClickModalSelector).find('form').on('submit', function(e) {
			e.preventDefault();
			var elementId = $(oneClickModalSelector).data('element_id');
			var offerId = $(oneClickModalSelector).data('offer_id');
			var url = '/' + window.pageData.lang + '/emarket/getOneClickOrder/element/' + elementId + '.json';

			if (site.TradeOffers.isAvailable() && offerId) {
				url = url + '?offer_id=' + site.TradeOffers.getOfferId();
			}

			var $form = $(this);
			$.ajax({
				type: 'POST',
				dataType: 'json',
				url: url,
				data: $form.serialize(),

				success: function(data) {
					if (data && data.data.error) {
						site.forms.showErrorMessage($form, data.data.error);
						return;
					}

					var message = getLabel('js-one_click_order_fail');

					var orderNumber = (data && data.data.orderId) ? data.data.orderId : null;
					if (orderNumber) {
						message = getLabel('js-one_click_order_success');
						message = message.replace('%s', orderNumber);
					}

					$form.parent().html(message);
				}
			});
		});

		/** Кнопка-крестик удаления товара из корзины */
		$('.order_delete').on('click', function(e) {
			e.preventDefault();
			site.Cart.remove(this.id.match(/\d+/).pop());
		});

		/** Изменение количества товара через клавиатуру */
		$('.quantity').on('focusin', function() {
			var $input = $(this);
			$input.data('oldValue', $input.val());
		}).change(function() {
			var $input = $(this);
			var orderItemId = $input.siblings('.change_product_quantity').data('id');
			var oldValue = $input.data('oldValue');
			site.Cart.modify(orderItemId, $input.val(), oldValue);
		});

		/** Изменение количества товара через кнопки "плюс/минус" */
		$('.change_product_quantity a').on('click', function(e) {
			e.preventDefault();

			if (!site.Cart.ready) {
				return;
			}

			site.Cart.ready = false;

			var $button = $(this);
			var orderItemId = $button.parent().data('id');
			var orderItemBlock = $('#order_item_' + orderItemId);

			var quantityNode = $('.quantity', orderItemBlock);
			var oldQuantity = parseInt(quantityNode.val(), 10);
			var newQuantity = $button.hasClass('increment_product_quantity') ? oldQuantity + 1 : oldQuantity - 1;

			quantityNode.val(newQuantity);
			site.Cart.modify(orderItemId, newQuantity, oldQuantity);
		});

		/** Применение промокода */
		$('form#promocode').on('submit', function(e) {
			e.preventDefault();

			$.ajax({
				type: 'POST',
				dataType: 'json',
				url: '/udata/emarket/savePromoCode/.json',
				data: $(this).serialize(),

				success: function(data) {
					if (data.result) {
						window.location.reload();
					} else {
						$('.wrong_promocode').show();
					}
				}
			});
		});
	},

	/**
	 * Добавляет товар в корзину
	 * @param {jQuery} $button кнопка товара "Купить"
	 * @param {object} paramList параметры GET запроса
	 */
	putElementInCart: function($button, paramList) {
		var url = $button.attr('href');
		url = paramList ? site.Cart.addParamsToUrl(url, paramList) : url;

		$.ajax({
			url: '/udata' + url,
			success: function() {
				basket.get(function(data) {
					site.Cart.updateOrderItemCount(data.summary.amount);
					site.Cart.ready = true;

					site.Cart.changeAddedProductButton($button);
				});
			}
		});
	},

	/**
	 * Добавляет гет параметры к url
	 * @param {string} url адрес
	 * @param {object} paramList параметры GET запроса
	 * @returns {string}
	 */
	addParamsToUrl: function(url, paramList) {
		return url + '?' + $.param(paramList);
	},

	/**
	 * Изменяет внешний вид кнопки "Купить" при добавлении товара в корзину
	 * @param {jQuery} $button кнопка товара "Купить"
	 */
	changeAddedProductButton: function($button) {
		$button.addClass('added_product');
		site.Cart.changeButtonHtml($button, getLabel('js-product-added-successfully-label'));

		setTimeout(function() {
			site.Cart.changeButtonHtml($button, getLabel('js-buy-button-label'));
			$button.removeClass('added_product');
		}, 1500)
	},

	/**
	 * Изменяет содержимое html кнопки
	 * @param {jQuery} $button кнопка товара "Купить"
	 * @param {string} html содержимое html кнопки
	 */
	changeButtonHtml: function($button, html) {
		$button.html(html);
	},

	/**
	 * Возвращает функцию, которая вызывается после обновления корзины в бекенде,
	 * @see js/client/basket.js, basket.__request()
	 * Функция отвечает за обновление фронтенда корзины - пересчет количества товаров, цен, скидок и т.д.
	 *
	 * @param {Number|String} id Идентификатор измененного товарного наименования
	 * @returns {Function}
	 */
	redraw: function(id) {
		return function(data) {
			var orderItemCount = data.summary.amount || 0;

			if (orderItemCount > 0) {
				site.Cart.drawPopulatedCart(id, data);
			} else {
				site.Cart.drawEmptyCart();
			}

			site.Cart.updateOrderItemCount(orderItemCount);
			site.Cart.ready = true;
		};
	},

	/**
	 * Обновляет UI непустой корзины
	 * @param {Number|String} id Идентификатор измененного товарного наименования
	 * @param {Array} data данные корзины из бекенда
	 */
	drawPopulatedCart: function(id, data) {
		var formatPrice = site.helpers.formatPrice;
		var prefix = data.summary.price.prefix;
		var suffix = data.summary.price.suffix;

		var orderDiscount = data.summary.price.discount || 0;
		$('#order_discount').text(formatPrice(orderDiscount, prefix, suffix));

		var orderPrice = data.summary.price.actual || data.summary.price.original;
		$('#order_price').text(formatPrice(orderPrice, prefix, suffix));

		var totalOriginalPrice = 0;
		var orderItems = data.items.item;

		$.each(orderItems, function () {
			var originalPrice = (this["total-price"].original) ? this["total-price"].original : this["total-price"].actual;
			totalOriginalPrice += originalPrice;
		});

		var totalDiscount = totalOriginalPrice - orderPrice;
		$('#total_discount').text(formatPrice(totalDiscount, prefix, suffix));

		var orderItemBlock = $('#order_item_' + id);
		var orderItemWasRemoved = true;

		_.each(data.items.item, function(orderItem) {
			if (orderItem.id != id) {
				return;
			}

			orderItemWasRemoved = false;
			var orderItemTotalPrice = formatPrice(orderItem["total-price"].actual, '', '');
			var discount = orderItem.discount ? orderItem.discount.amount : 0;
			var orderItemDiscount = (discount == 0) ? 0 : formatPrice(discount, '', '');

			$('.order_sum span', orderItemBlock).text(orderItemTotalPrice);
			$('.order_sale span', orderItemBlock).text(orderItemDiscount);
		});

		if (orderItemWasRemoved) {
			orderItemBlock.remove();
		}
	},

	/** Выводит на фронтенд пустую корзину */
	drawEmptyCart: function() {
		$.get('/templates/demomarket/js/cart/empty.html', function (data) {
			var emptyTemplate = _.template(data);
			var params = {
				'cart_empty': getLabel('js-cart_empty'),
				'return_to_catalog': getLabel('js-return_to_catalog')
			};

			$('.cart')
				.removeClass('cart')
				.addClass('cart-empty')
				.html(emptyTemplate(params));
		});
	},

	/**
	 * Обновляет информацию о количестве товаров в корзине в шапке сайта
	 * @param {Number} count новое количество товаров в корзине
	 */
	updateOrderItemCount: function (count) {
		var $itemCount = $('.order_item_count');
		if (count < 1 && $itemCount.hasClass('not_show')) {
			return;
		}

		$itemCount.text(count);
		$itemCount.removeClass('not_show');

		var cartHeader = getLabel('js-cart_header') + count;
		$('#basketTooltipToggle').text(cartHeader);
	},

	/**
	 * Отправляет аякс-запрос на изменение количества товарного наименования.
	 * Обновляет UI корзины.
	 *
	 * @param {number|string} id Идентификатор товарного наименования
	 * @param {number} newQuantity новое количество
	 * @param {number} oldQuantity предыдущее количество
	 */
	modify: function(id, newQuantity, oldQuantity) {
		if (newQuantity !== oldQuantity) {
			basket.modifyItem(id, {amount: newQuantity}, this.redraw(id));
		} else {
			this.ready = true;
		}
	},

	/**
	 * Отправляет аякс-запрос на удаление товарного наименования из корзины.
	 * Обновляет UI корзины.
	 *
	 * @param {number|string} id Идентификатор товарного наименования - числовое значение или ключевая строка `all`
	 */
	remove: function(id) {
		if (id === 'all') {
			basket.removeAll(this.redraw(id));
		} else {
			basket.removeItem(id, this.redraw(id));
		}
	}
};

$(function() {
	site.Cart.init();
});

})(window, jQuery, _, getLabel);
