/**
 * Название этого файла должно быть первым в лексикографическом порядке
 * среди всех файлов sites/demomarket/src/files/templates/demomarket/js/*.js
 *
 * Это нужно для того, чтобы gulp добавил этот файл первым в compiled/demomarket.js
 */

var site = {};

/**
 * Основной модуль шаблона
 * @type {Object}
 */
site.common = {

	/** Стилизует результаты голосования модуля "Опросы" */
	stylizeVoteResults: function() {
		var $interviewRange = $('.result_range');

		$.each($interviewRange, function(key, value) {
			var rangeWidth = $(value).next().text();
			rangeWidth = parseInt(rangeWidth, 10);
			$(this).css('width', rangeWidth + '%');
		});
	},

	/** Инициализирует стили и поведение на всех страницах сайта */
	init: function() {
		initInputmask();
		initFancybox();
		initSlick();
		initVerge();
		initMenu($('#headerMobileMenu'), $('#topMenuToggle'), $('#closeMenuToggle'), 'active');
		initCaptcha();
		initToolTips();
		initFaqQuestions();
		initCompareLinkClickHandler();
		initBasket();
		stylizeSelects();
		site.common.stylizeVoteResults();

		registerPrintPageCallback();
		registerFilterFieldArrowCallback();
		registerMobileFilterBlockCallback();
		registerProductPreviewCallback();
		registerProductSortingCallback();
		registerSubmitPaymentCallback();
		registerSelectPayment();
		registerCategoryMenuCallback();
		registerSubscribeFormCallback();
		registerLazyCommentCountCallback();

		/**
		 * Обработчик наведения мыши на ссылку комментариев в превью товара.
		 * Загружает количество комментариев ajax-запросом.
		 */
		function registerLazyCommentCountCallback() {
			$('a.comment_count').on('hover', function() {
				var $container = $(this).find('.lazy_comment_count');
				if ($container.html() != '?') {
					return;
				}

				$container.html('');
				var pageId = $container.closest('.tab_item').data('element_id');
				if (!pageId) {
					pageId = $container.closest('.add_to_cart_block').data('element_id');
				}

				$.ajax({
					type: 'GET',
					dataType: 'json',
					url: '/udata/comments/countComments/' + pageId + '.json' + '?lang_id=' + window.pageData.lang_id,

					success: function(data) {
						var commentCount = parseInt(data.total) || 0;
						$container.html(commentCount);

						var $commentLink = $container.closest('a');
						var href = $commentLink.attr('href');
						var suffix = commentCount > 0 ? '#comments' : '#add_comment';
						$commentLink.attr('href', href + suffix);
					}
				});
			});
		}

		/** Добавляет маску формата телефонного номера в поля с номером телефона */
		function initInputmask() {
			$('input[type="tel"]').inputmask("+9-999-999-99-99");
		}

		/** Стилизует селекты с помощью jQuery-UI */
		function stylizeSelects() {
			$('select').selectmenu();
		}

		/** Регистрирует обработчик нажатия на кнопку "Распечатать" на странице товара. */
		function registerPrintPageCallback() {
			$('a.for_print').on('click', function(e) {
				e.preventDefault();
				window.print();
			});
		}

		/** Инициализирует slick-карусели */
		function initSlick() {
			$('.slider-for').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				fade: true,
				asNavFor: '.slider-nav'
			});

			$('.slider-nav').slick({
				slidesToShow: 3,
				slidesToScroll: 1,
				asNavFor: '.slider-for',
				autoplay: true,
				autoplaySpeed: 3000,
				centerMode: true,
				focusOnSelect: true,
				responsive: [{
					breakpoint: 1500,
					settings: {
						arrows: false
					}
				}]
			});

			$('.subCarousel').slick({
				slidesToShow: 5,
				slidesToScroll: 1,
				responsive: [
					{
						breakpoint: 1500,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 1,
						}
					},
					{
						breakpoint: 991,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 1
						}
					},
					{
						breakpoint: 570,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			});
		}

		function initMenu(menu, openToggle, closeToggle, newClass) {
			function initCollapse() {
				if (menu.hasClass(newClass)) {
					menu.removeClass(newClass);
				} else {
					menu.addClass(newClass);
				}
			}

			openToggle.click(function(event) {
				initCollapse();
				event.preventDefault();
			});

			openToggle.on('tap', function(event) {
				initCollapse();
				event.preventDefault();
			});

			if (closeToggle != false) {
				closeToggle.click(function(event) {
					initCollapse();
					event.preventDefault(event);
				});

				closeToggle.on('tap', function(event) {
					initCollapse();
					event.preventDefault();
				});
			}
		}

		/**
		 * Регистрирует обработчик нажатия на стрелочку в заголовке поля умных фильтров.
		 * Обработчик скрывает или показывает это поле.
		 */
		function registerFilterFieldArrowCallback() {
			$('.arrow_dropdown').on('click', function() {
				if ($(this).hasClass('fa-angle-up')) {
					$(this).removeClass('fa-angle-up');
					$(this).addClass('fa-angle-down');
				} else {
					$(this).removeClass('fa-angle-down');
					$(this).addClass('fa-angle-up');
				}

				var parentArrow = $(this).closest('.arrow_product');
				var animationSpeed = 400;
				parentArrow.next('.product_form').slideToggle(animationSpeed);
			});
		}

		/**
		 * Регистрирует обработчик нажатия на иконку "фильтр" в мобильной версии.
		 * Обработчик скрывает или показывает блок умных фильтров в мобильной версии.
		 */
		function registerMobileFilterBlockCallback() {
			$('.section_capt .sort_mobile').on('click', function() {
				$(this).toggleClass('sort_close');
				var animationSpeed = 400;
				$('.filter_mobile').slideToggle(animationSpeed);
			});
		}

		/**
		 * Регистрирует обработчик отправки формы выбора способа оплаты, либо формы заказа в один шаг.
		 *
		 * Если был выбран способ оплаты "Платежная квитанция", заказ оформляется особым образом:
		 *   - Отправка формы блокируется
		 *   - Создается всплывающее окно, в котором делается редирект на action формы (оформляется заказ)
		 *   - Во всплывающем окне распечатывается платежная квитанция
		 *   - Скрипт всплывающего окна инициализирует редирект основного окна на страницу успешного оформления заказа
		 */
		function registerSubmitPaymentCallback() {
			$('form#payment_choose, form#oneStepForm').on('submit', function(e) {
				let $form = $(this);
				let $payment = $("input[name='payment-id']:checked", $form);

				if ($payment.attr('class') !== 'receipt') {
					return true;
				}

				let personalDataAgreement = $form.find('#purchase-step-address-152-federal-law');
				let isAgreeWidthProcessingPersonalData = personalDataAgreement.prop('checked');
				let isOneStepForm = $form.is('#oneStepForm');

				if (isOneStepForm && !isAgreeWidthProcessingPersonalData) {
					e.preventDefault();
					return false;
				}

				if (site.forms.emarket.purchasingOneStep.showErrors()) {
					e.preventDefault();
					return false;
				}

				let params = $form.serialize();
				let url = $form.attr('action');

				let win = window.open("", "_blank", "width=710,height=620,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no");
				let html = "<html><head><" + "script" + ">location.href = '" + url + "?" + params + "'</" + "script" + "></head><body></body></html>";

				win.document.write(html);
				win.focus();

				return false;
			});
		}

		/** Регистрирует обработчик выбора способа оплаты при оформлении заказа в 1 шаг */
		function registerSelectPayment() {
			$('input:radio[name=payment-id]').change(function () {
				$('#payment_choose label').removeClass('checked');
				var $label = $(this).parent();
				$label.addClass('checked');
			});
		}

		/** Регистрирует обработчик нажатия на иконки вида превью товаров на странице категории. */
		function registerProductPreviewCallback() {
			$('.sort_btn a').on('click', function() {
				var $button = $(this);
				var className = $button.data('class');
				$.cookie('catalog_class', className);

				$('#catalog_category')
					.removeClass('goods catalog_list catalog_inline')
					.addClass(className);
			});
		}

		/** Регистрирует обработчик нажатия на кнопки в блоке "Сортировать по" на странице категории. */
		function registerProductSortingCallback() {
			$('.sort_list a').on('click', function() {
				var $this = $(this);
				var fieldName = $this.data('field');
				$.cookie('sort_field', fieldName);

				var isAscending = !$this.parent().hasClass('up_arrow');
				var flag = isAscending ? '1' : '0';
				$.cookie('sort_direction_is_ascending', flag);

				window.location.reload(true);
			});
		}

		/** Инициализирует fancybox */
		function initFancybox() {
			$("a[rel=fancybox_group]").fancybox({
				'loop': true,
				'touch': false,
				'toolbar': false,
				'hideScrollbar': false,
			});
		}

		/**
		 * Регистрирует обработчик нажатия на категорию товаров первого уровня в мобильном меню.
		 * Обработчик выводит дочерние категории для этой категории.
		 */
		function registerCategoryMenuCallback() {
			$('.product_header').on('click', function() {
				var $this = $(this);
				$this.toggleClass('open');
				var animationSpeed = 400;
				$this.next('li').find('.mobile_sub_menu').slideToggle(animationSpeed);
			});
		}

		/**
		* Регистрирует обработчик нажатия на категорию товаров второго уровня в мобильном меню.
		* Обработчик выводит дочерние категории для этой категории.
		 */
		$('.second_level_menu').on('click', function() {
			var $this = $(this);
			$this.toggleClass('open');
			var animationSpeed = 400;
			$this.find('.mobile_sub_sub_menu').slideToggle(animationSpeed);
		});

		/** Регистрирует обработчик нажатия на кнопку "Подписаться" в футере. */
		function registerSubscribeFormCallback() {
			$('a.footer_subscription_button').on('click', function(e) {
				e.preventDefault();
				$(this).closest('form').submit();
			});
		}

		/**
		 * Инициализирует классическую капчу.
		 * Регистрирует обработчик нажатия на кнопку "Перезагрузить код".
		 */
		function initCaptcha() {
			$('.captcha_reset').on('click', function() {
				var now = new Date();
				$('.captcha_img').attr('src', '/captcha.php?reset&' + now.getTime());
			});
		}

		/** Инициализирует всплывающие окна через кастомную jQuery-функцию `customTooltip`. */
		function initToolTips() {
			$.fn.customTooltip = function() {
				var $tooltipBlock = $(this.attr('data-content'));

				this.tooltip({
					'html': true,
					'trigger': 'click',
					'placement': 'bottom',
					'title': $tooltipBlock.html()
				});
			};

			$('#basketTooltipToggle').customTooltip();
		}

		/** Инициализирует сворачиваемые блоки вопросов в модуле FAQ. */
		function initFaqQuestions() {
			$.fn.hideText = function(options) {

				var settings = $.extend({
					'speed': undefined,
					'dataName': 'element'
				}, options);

				this.click(function(e) {
					var block = $(e.target).data(settings['dataName']);
					var row = $(block).parent();
					var rowHeight = row.css('height');
					if (rowHeight > '95px') {
						row.css('height', '67px');
					} else {
						row.css('height', 'auto');

					}
					if (block === undefined) {
						return;
					}
					$(block).slideToggle(settings['speed'], function() {

						if ($(e.target).hasClass('sprite-hide_up')) {
							if ($(e.target).hasClass('title_link')) {
								return;
							} else {
								$(e.target).removeClass('sprite-hide_up');
							}
						} else {
							if ($(e.target).hasClass('title_link')) {
								return;
							} else {
								$(e.target).addClass('sprite-hide_up');

							}
						}
					});
				});

				return this;
			};

			$('.sprite-hide').hideText({
				speed: 'slow'
			});

			$('.title_link').hideText({
				speed: 'slow'
			});
		}

		/** Инициализирует библиотеку verge.js */
		function initVerge() {
			$.extend(verge);
		}

		/** Инициализирует нажатие на ссылку добавления/удаления товара из сравнения товаров */
		function initCompareLinkClickHandler() {
			$('.compare_link').on('click', function(e){
				e.preventDefault();
				var $link = $(this);

				$.ajax({
					type: 'GET',
					url: '/udata' + $link.attr('href'),
					data: {
						'redirect_disallow': 1,
						'param0': $link.data('id')
					},
					async: false,

					success: function(data) {
						var $error = $(data).find('error:first');

						if ($error.length === 1) {
							var $container = $link.closest('.additional-info');
							handleCompareError($container, $error.text());
						} else {
							processAmountOfComparingItems($link);
						}
					}
				})
			})
		}

		/**
		 * Обрабатывает ошибку при добавлении/удалении товара из сравнения 
		 * @param {jQuery} $link объект ссылки
		 * @param {String} errorText текст ошибки
		 */
		function handleCompareError($link, errorText) {
			var $additionalInfoContainer = $link.closest('.additional-info');
			var $errorContainer = $additionalInfoContainer.siblings('.compare-error:eq(0)');
			
			$additionalInfoContainer.hide();
			$errorContainer.text(errorText).show();

			setTimeout(function() {
				$errorContainer.hide();
				$additionalInfoContainer.show();
			}, 2500);
		}

		/**
		 * Изменяет значение стикера с количеством товаров в сравнении
		 * @param {jQuery} $link объект ссылки
		 */
		function processAmountOfComparingItems($link) {
			var $comparisonSticker = getComparisonSticker();
			var amount = $comparisonSticker.length !== 0 ? parseInt($comparisonSticker.text()) : 0;

			switch ($link.data('action')) {
				case 'add': {
					handleAddToCompare($link, $comparisonSticker, amount);
					break;
				}
				case 'remove': {
					handleDeleteFromCompare($link, $comparisonSticker, amount);
					break;
				}
			}
		}

		/**
		 * Обработчик добавления товара в сравнение товаров
		 * @param {jQuery} $link объект ссылки
		 * @param {jQuery} $comparisonSticker объект стикера
		 * @param {int} amount текущее количество товаров
		 */
		function handleAddToCompare($link, $comparisonSticker, amount) {
			$link.data('action', 'remove');
			$link.attr('href', '/emarket/removeFromCompare/' + $link.data('id'));
			$link.text(getLabel('js-remove-from-comparison'));

			if (amount === 0) {
				$('.comparison_goods:eq(0)').append('<span></span>');
				$comparisonSticker = getComparisonSticker();
				$comparisonSticker.text(1);
			} else {
				$comparisonSticker.text(amount + 1);
			}
		}

		/**
		 * Обработчик удаления товара из сравнения товаров
		 * @param {jQuery} $link объект ссылки
		 * @param {jQuery} $comparisonSticker объект стикера
		 * @param {int} amount текущее количество товаров
		 */
		function handleDeleteFromCompare($link, $comparisonSticker, amount) {
			$link.data('action', 'add');
			$link.attr('href', '/emarket/addToCompare/' + $link.data('id'));
			$link.text(getLabel('js-add-to-comparison'));

			if (amount === 1) {
				$comparisonSticker.remove();
			} else {
				$comparisonSticker.text(amount - 1);
			}

			if ($link.closest('.compare').length === 1) {
				deleteFromCompareTable($link)
			}
		}

		/**
		 * Удаляет товар со страницы сравнения товаров
		 * @param {jQuery} $link объект ссылки
		 */
		function deleteFromCompareTable($link) {
			$link.closest('.preview_product').remove();

			var productCharacteristicList = $('.characteristics:eq(0)').find('[data-id="' + $link.data('id') + '"]');

			$.each(productCharacteristicList, function(key, $element) {
				$element.closest('.compare_field').remove();
			});

			if ($('.preview_product').length === 0) {
				$('.compare:eq(0)').remove();
				$('.section_capt:eq(0)').find('h1:eq(0)').text(getLabel('js-empty-comparison-list'))
			}
		}

		/**
		 * Возвращает стикер с количеством товаров в сравнении
		 * @returns {jQuery}
		 */
		function getComparisonSticker() {
			return $('.comparison_goods:eq(0) > span');
		}

		/** Обновляет информацию о количестве товаров в корзине в шапке сайта */
		function initBasket() {
			basket.get(function(data) {
				site.Cart.updateOrderItemCount(data.summary.amount);
			});
		}
		
	},
};

/**
 * Модуль вспомогательных функций
 * @type {Object}
 */
site.helpers = {

	/**
	 * Форматирует строку цены
	 * @link https://stackoverflow.com/a/34141813
	 *
	 * @param {Number|String} price цена
	 * @param {String|null} prefix префикс цены
	 * @param {String|null} suffix суффикс цены
	 */
	formatPrice: function(price, prefix, suffix) {
		var number_format = function(number, decimals, dec_point, thousands_sep) {
			// Strip all characters but numerical ones.
			number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
			var n = !isFinite(+number) ? 0 : +number,
				prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
				sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
				dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
				s,
				toFixedFix = function (n, prec) {
					var k = Math.pow(10, prec);
					return '' + Math.round(n * k) / k;
				};
			// Fix for IE parseFloat(0.55).toFixed(0) = 0;
			s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
			if (s[0].length > 3) {
				s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
			}
			if ((s[1] || '').length < prec) {
				s[1] = s[1] || '';
				s[1] += new Array(prec - s[1].length + 1).join('0');
			}
			return s.join(dec);
		};

		price = number_format(price, 2, '.', ' ');
		prefix = prefix || '';
		suffix = suffix || '';

		return prefix + ' ' + price + ' ' + suffix;
	}
};

$(function() {
	site.common.init();
});
