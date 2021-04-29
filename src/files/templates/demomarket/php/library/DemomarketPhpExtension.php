<?php
	use UmiCms\Service;
	use UmiCms\System\Trade\iOffer;
	use UmiCms\System\Trade\Offer\iPrice;
	use UmiCms\System\Trade\Offer\iMapper;
	use UmiCms\System\Orm\Entity\iCollection;
	use UmiCms\System\Trade\Offer\iCharacteristic;
	use UmiCms\System\Trade\Offer\Price\iCurrency;
	use UmiCms\Classes\System\Utils\Captcha\Strategies\GoogleRecaptcha;

	/** Расширение php шаблонизатора для шаблона demomarket */
	class DemomarketPhpExtension extends ViewPhpExtension {

		/** int максимальное количество товаров в блоке "Лучшие предложения" */
		const MAX_BEST_OFFERS_COUNT = 15;

		/** int максимальное количество товаров в карусели */
		const MAX_CAROUSEL_PRODUCT_COUNT = 12;

		/** int максимальное количество товаров для сравнения */
		const MAX_PRODUCT_COUNT_FOR_COMPARISON = 3;

		/** @const int FOOTER_CATEGORY_LIST_DEFAULT_LIMIT ограничение на количество категорий каталога для вывода в футере по умолчанию */
		const FOOTER_CATEGORY_LIST_DEFAULT_LIMIT = 6;

		/** @const int FOOTER_SUB_CATEGORY_LIST_DEFAULT_LIMIT ограничение на количество подкатегорий каталога для вывода в футере по умолчанию */
		const FOOTER_SUB_CATEGORY_LIST_DEFAULT_LIMIT = 5;

		/** @var string путь до картинки "фото временно отсутствует" */
		private $noPhotoPath = '/templates/demomarket/img/no_photo.jpg';

		/**
		 * Инициализирует общие переменные для шаблонов.
		 * @param array $variables глобальные переменные запроса
		 * @throws Exception
		 */
		public function initializeCommonVariables($variables) {
			$templateEngine = $this->getTemplateEngine();
			$templateEngine->setCommonVar('domain', $variables['domain']);
			$templateEngine->setCommonVar('lang', $variables['lang']);
			$templateEngine->setCommonVar('pre_lang', $variables['pre-lang']);
			$templateEngine->setCommonVar('header', isset($variables['header']) ? $this->escape($variables['header']) : '');
			$templateEngine->setCommonVar('request_uri', $variables['request-uri']);
			$templateEngine->setCommonVar('user', $variables['user']);
			$templateEngine->setCommonVar('settings_container', $this->requestSettingsContainer());
			$cart = $this->macros('emarket', 'cart');
			$templateEngine->setCommonVar('cart', $cart);
			$templateEngine->setCommonVar('order_id', isset($cart['id']) ? $cart['id'] : '');
			$templateEngine->setCommonVar('catalog_category_list', $this->getCategoryList());
		}

		/** @inheritDoc */
		public function getCanonicalLinkTag(array $variables) {
			if (!class_exists('SeoPhpExtension', false)) {
				return '';
			}
			return (new SeoPhpExtension($this->umiTemplaterPHP))->getCanonicalLinkTag($variables);
		}

		/** @inheritDoc */
		public function getMetaRobots(array $variables) {
			if (!class_exists('SeoPhpExtension', false)) {
				return '';
			}
			return (new SeoPhpExtension($this->umiTemplaterPHP))->getMetaRobots($variables);
		}

		/** @inheritDoc */
		public function getMetaDescription(array $variables) {
			if (!class_exists('SeoPhpExtension', false)) {
				return '';
			}
			return (new SeoPhpExtension($this->umiTemplaterPHP))->getMetaDescription($variables);
		}

		/** @inheritDoc */
		public function getMetaTitle(array $variables) {
			if (!class_exists('SeoPhpExtension', false)) {
				return '';
			}
			return (new SeoPhpExtension($this->umiTemplaterPHP))->getMetaTitle($variables);
		}

		/** @inheritDoc */
		public function getMetaKeywords(array $variables) {
			if (!class_exists('SeoPhpExtension', false)) {
				return '';
			}
			return (new SeoPhpExtension($this->umiTemplaterPHP))->getMetaKeywords($variables);
		}

		/** @inheritDoc */
		public function getMetaWithPostfix($meta) {
			if (!class_exists('SeoPhpExtension', false)) {
				return '';
			}
			return (new SeoPhpExtension($this->umiTemplaterPHP))->getMetaWithPostfix($meta);
		}

		/** @inheritDoc */
		public function getPageNumberPostfix($meta) {
			if (!class_exists('SeoPhpExtension', false)) {
				return '';
			}
			return (new SeoPhpExtension($this->umiTemplaterPHP))->getPageNumberPostfix($meta);
		}

		/** @inheritDoc */
		public function getFaviconPath() {
			if (!class_exists('SeoPhpExtension', false)) {
				return '';
			}
			return (new SeoPhpExtension($this->umiTemplaterPHP))->getFaviconPath();
		}

		/**
		 * Возвращает ID формы "заказать звонок"
		 * @return int|bool
		 * @throws coreException
		 */
		public function getCallbackId() {
			return umiObjectTypesCollection::getInstance()
				->getTypeIdByGUID('call-order-form');
		}

		/**
		 * Возвращает класс активности
		 * @param bool $isActive добавлять ли класс
		 * @return string
		 */
		public function getActiveClass($isActive) {
			return $isActive ? 'active' : '';
		}

		/**
		 * Возвращает пользовательские настройки CSS
		 * @return false|string
		 * @throws publicException
		 */
		public function getUserCss() {
			return $this->getSettingsValue('user_css');
		}

		/**
		 * Возвращает товары для вкладки "Новинки"
		 * @return iUmiHierarchyElement[]
		 * @throws selectorException
		 * @throws publicException
		 */
		public function getNewProducts() {
			$amount = $this->getSettingsValue('new_items_amount');
			return $this->getProductsByFlag('new', $amount);
		}

		/**
		 * Возвращает товары для вкладки "Лучшие предложения"
		 * @return iUmiHierarchyElement[]
		 * @throws selectorException
		 * @throws publicException
		 */
		public function getBestProducts() {
			$amount = $this->getSettingsValue('best_offers_amount');
			return $this->getProductsByFlag('best_offers', $amount);
		}

		/**
		 * Возвращает список товаров, у которых отмечено булевое поле с заданным строковым идентификатором.
		 * Виртуальные копии не учитываются в выборке.
		 *
		 * @param string $flag строковой идентификатор булевого поля
		 * @param int $amount количество товара
		 * @return iUmiHierarchyElement[]
		 * @throws selectorException
		 */
		public function getProductsByFlag($flag, $amount) {
			$amount = is_numeric($amount) ? $amount : self::MAX_BEST_OFFERS_COUNT;

			$products = new selector('pages');
			$products->types('object-type')->name('catalog', 'object');
			$products->where($flag)->equals(true);
			$products->limit(0, $amount);
			$products->order('id')->rand();
			$products->group('obj_id');
			$products->option('load-all-props')->value(true);
			$products->option('no-length', true);
			return $products->result();
		}

		/**
		 * Отображать ли вкладку "Новинки"
		 * @return bool
		 * @throws publicException
		 */
		public function isShowNewItems() {
			return (bool) !$this->getSettingsValue('disable_new_items');
		}

		/**
		 * Отображать ли вкладку "Лучшие предложения"
		 * @return bool
		 * @throws publicException
		 */
		public function isShowBestProducts() {
			return (bool) !$this->getSettingsValue('disable_best_offers');
		}

		/**
		 * Возвращает название вкладки "Новинки"
		 * @return false|string
		 * @throws publicException
		 */
		public function getNewItemsTabName() {
			return $this->getSettingsValue('new_items_name');
		}

		/**
		 * Возвращает название вкладки "Лучшие предложения"
		 * @return false|string
		 * @throws publicException
		 */
		public function getBestProductsTabName() {
			return $this->getSettingsValue('best_offers_name');
		}

		/**
		 * Возвращает форматированную цену
		 * @param float $price цена
		 * @return string
		 */
		public function formatPrice($price) {
			$price = (float) $price;
			return number_format($price, 2, '.', ' ');
		}

		/**
		 * Возвращает адрес фотографии товара
		 * @param iUmiHierarchyElement $product товар (страница)
		 * @return string
		 */
		public function getPhotoPath(iUmiHierarchyElement $product) {
			/** @var iUmiImageFile $photo */
			$photo = $product->getValue('photo');

			if ($photo instanceof iUmiImageFile) {
				return $photo->getFilePath(true);
			}

			return $this->noPhotoPath;
		}

		/**
		 * Возвращает адрес фотографии товарного наименование
		 * @param array $variables параметры списка товарного наименования
		 * @return string
		 */
		public function getOrderItemPhotoPath(array $variables) {
			if (!isset($variables['offer']['characteristic_collection']['characteristic'])) {
				return $this->getPhotoPath($variables['page']);
			}

			$characteristicList = $variables['offer']['characteristic_collection']['characteristic'];

			foreach ($characteristicList as $characteristicData) {
				if ($characteristicData['name'] == 'trade_offer_image' && isset($characteristicData['value'])) {
					return $characteristicData['value'];
				}
			}

			return $this->getPhotoPath($variables['page']);
		}

		/**
		 * Возвращает alt фотографии товара
		 * @param iUmiHierarchyElement $product товар (страница)
		 * @return string
		 */
		public function getPhotoAlt(iUmiHierarchyElement $product) {
			/** @var iUmiImageFile $photo */
			$photo = $product->getValue('photo');
			$alt = ($photo instanceof iUmiImageFile) ? $photo->getAlt() : '';
			return $alt ?: $product->getName();
		}

		/**
		 * Возвращает title фотографии товара
		 * @param iUmiHierarchyElement $product товар (страница)
		 * @return string
		 */
		public function getPhotoTitle(iUmiHierarchyElement $product) {
			/** @var iUmiImageFile $photo */
			$photo = $product->getValue('photo');
			$title = ($photo instanceof iUmiImageFile) ? $photo->getTitle() : '';
			return $title ?: $product->getName();
		}

		/**
		 * Возвращает хеш пути до файла фотографии товара для файлового менеджера 
		 * @param iUmiHierarchyElement $product товар (страница)
		 * @return string
		 */
		public function getPhotoDirHash(iUmiHierarchyElement $product) {
			/** @var iUmiImageFile $photo */
			$photo = $product->getValue('photo');
			return ($photo instanceof iUmiImageFile) ? $photo->getDirHash() : '';
		}

		/**
		 * Возвращает хеш пути фотографии товара до директории для файлового менеджера
		 * @param iUmiHierarchyElement $product товар (страница)
		 * @return string
		 */
		public function getPhotoPathHash(iUmiHierarchyElement $product) {
			/** @var iUmiImageFile $photo */
			$photo = $product->getValue('photo');
			return ($photo instanceof iUmiImageFile) ? $photo->getPathHash() : '';
		}

		/**
		 * Возвращает цену товара с учетом скидок
		 * @param iUmiHierarchyElement $product страница (товар)
		 * @return string
		 * @throws Exception
		 */
		public function getPrice(iUmiHierarchyElement $product) {
			$result = $this->macros('emarket', 'price', [$product->getId()]);
			$prefix = isset($result['price']['prefix']) ? $result['price']['prefix'] : '';
			$price = isset($result['price']['actual']) ? $result['price']['actual'] : 0;
			$suffix = isset($result['price']['suffix']) ? $result['price']['suffix'] : '';
			return $this->formatPriceWithCurrency($prefix, $price, $suffix);
		}

		/**
		 * Возвращает день публикации страницы
		 * @param iUmiHierarchyElement $page страница
		 * @return string
		 */
		public function getPublishDay(iUmiHierarchyElement $page) {
			return $this->getPublishDateParts($page)[0];
		}

		/**
		 * Возвращает месяц публикации страницы
		 * @param iUmiHierarchyElement $page страница
		 * @return string
		 */
		public function getPublishMonth(iUmiHierarchyElement $page) {
			return $this->getPublishDateParts($page)[1];
		}

		/**
		 * Возвращает год публикации страницы
		 * @param iUmiHierarchyElement $page страница
		 * @return string
		 */
		public function getPublishYear(iUmiHierarchyElement $page) {
			return $this->getPublishDateParts($page)[2];
		}

		/**
		 * Возвращает дату публикации страницы в формате [
		 *   0 => <day>,
		 *   1 => <month>,
		 *   2 => <year>,
		 * ]
		 * В текущей реализации работает только с русскоязычными датами, @see dateToString()
		 *
		 * @param iUmiHierarchyElement $page страница
		 * @return array
		 */
		public function getPublishDateParts(iUmiHierarchyElement $page) {
			$date = $page->getValue('publish_time');
			$timeStamp = ($date instanceof umiDate) ? $date->getDateTimeStamp() : $date;
			return explode(' ', dateToString($timeStamp));
		}

		/**
		 * Определяет, нужно ли выводить форму опроса
		 * @param array $variables результат работы макроса vote:poll()
		 * @return bool
		 */
		public function canShowVoteForm(array $variables) {
			return isset($variables['items'][0]['id']);
		}

		/**
		 * Определяет, нужно ли вывести результаты опроса
		 * @param array $variables результат работы макроса vote:poll()
		 * @return bool
		 */
		public function canShowVoteResults(array $variables) {
			return isset($variables['items'][0]['score']);
		}

		/**
		 * Выводит текущий год
		 * @return string
		 */
		public function getCurrentYear() {
			return date('Y');
		}

		/**
		 * Возвращает список разделов каталога, разбитый на две части
		 * @param array $variables результат работы макроса catalog::getCategoryList()
		 * @return array
		 */
		public function getCategoryGroups(array $variables) {
			return array_chunk($variables, 2);
		}

		/**
		 * Фильтрует список категорий по родителю и уровню вложенности
		 * @param int|null $parentId идентификатор родителя
		 * @param int $level уровень вложенности
		 * @return array
		 */
		public function filterCategoryList($parentId = null, $level = 0) {
			$categoryList = $this->getTemplateEngine()
				->getCommonVar('catalog_category_list');
			$parentId = $parentId ?: $categoryList['category_id'];

			return array_filter(
				$categoryList['items'],
				function ($item) use ($parentId, $level) {
					return ($item['parent'] == $parentId && $item['level'] == $level);
				}
			);
		}

		/**
		 * Обрезает список категорий каталога для вывода в футере
		 * @param array $categoryList список категорий
		 * @return array
		 */
		public function sliceFooterMenuCategoryList(array $categoryList) {
			return $categoryList = array_slice($categoryList, 0, $this->getFooterMenuCategoryListLimit());
		}

		/**
		 * Возвращает ограничение на количество категорий каталога для вывода в футере
		 * @return int
		 */
		public function getFooterMenuCategoryListLimit() {
			return (int) $this->getSettingsContainer()
				->getValue('footer_category_list_limit') ?: self::FOOTER_CATEGORY_LIST_DEFAULT_LIMIT;
		}

		/**
		 * Обрезает список подкатегорий каталога для вывода в футере
		 * @param array $subCategoryList список подкатегорий
		 * @return array
		 */
		public function sliceFooterMenuSubCategoryList(array $subCategoryList) {
			return array_slice($subCategoryList, 0, $this->getFooterMenuSubCategoryListLimit());
		}

		/**
		 * Возвращает ограничение на количество подкатегорий каталога для вывода в футере
		 * @return int
		 */
		public function getFooterMenuSubCategoryListLimit() {
			return (int) $this->getSettingsContainer()
				->getValue('footer_sub_category_list_limit') ?: self::FOOTER_SUB_CATEGORY_LIST_DEFAULT_LIMIT;
		}

		/**
		 * Проверяет есть ли у категории подкатегории
		 * @param int $id идентификатор категории
		 * @return bool
		 */
		public function isCategoryHasChild($id) {
			return !empty($this->filterCategoryList($id, 1));
		}

		/**
		 * Возвращает список разделов каталога
		 * @return array catalog::getCategoryList()
		 * @throws Exception
		 */
		public function getCategoryList() {
			$parent = $this->getCatalogRootCategory();
			$emptyList = [
				'category_id' => ($parent instanceof iUmiHierarchyElement) ? $parent->getId() : null,
				'items' => [],
			];

			if (!$parent instanceof iUmiHierarchyElement) {
				return $emptyList;
			}

			if (!$parent->getValue('show_submenu')) {
				return $emptyList;
			}

			$template = null;
			$limit = 300;
			$ignorePaging = true;
			$level = 3;
			$data = $this->macros('catalog', 'getCategoryList', [$template, $parent->getId(), $limit, $ignorePaging, $level]);
			$data = is_array($data) ? $data : [];
			$data['category_id'] = isset($data['category_id']) ? $data['category_id'] : '';
			$data['items'] = isset($data['items']) ? $data['items'] : [];

			foreach ($data['items'] as &$category) {
				$category = is_array($category) ? $category : [];
				$category['id'] = isset($category['id']) ? $category['id'] : '';
				$category['link'] = isset($category['link']) ? $category['link'] : '';
				$category['text'] = isset($category['text']) ? $category['text'] : '';
			}

			return $data;
		}

		/**
		 * Возвращает корневой раздел каталога
		 * @return iUmiHierarchyElement|null
		 */
		public function getCatalogRootCategory() {
			$pageList = (array) $this->getSettingsContainer()
				->getValue('catalog_root_category');
			return getFirstValue($pageList);
		}

		/**
		 * Возвращает данные карты сайта
		 * @return array результат работы макроса content/sitemap:
		 *
		 * [
		 *     'items' => [
		 *         # => [
		 *             'id' => int идентификатор страницы
		 *             'link' => string ссылка на страницу
		 *             'name' => название страницы
		 *         ]
		 *     ]
		 * ]
		 * @throws Exception
		 */
		public function getSiteMap() {
			$data = $this->macros('content', 'sitemap');
			$data = is_array($data) ? $data : [];
			$data['items'] = isset($data['items']) ? $data['items'] : [];

			foreach ($data['items'] as &$page) {
				$page = is_array($page) ? $page : [];
				$page['id'] = isset($page['id']) ? $page['id'] : '';
				$page['link'] = isset($page['link']) ? $page['link'] : '';
				$page['name'] = isset($page['name']) ? $page['name'] : '';
			}

			return $data;
		}

		/**
		 * Возвращает данные меню сайта
		 * @param string $menuId строковой идентификатор меню
		 * @return array результат работы макроса menu/draw:
		 *
		 * [
		 *     'lines' => [
		 *         # => [
		 *             'link' => string ссылка на страницу
		 *             'name' => название страницы
		 *         ]
		 *     ]
		 * ]
		 */
		public function getMenu($menuId) {
			$key = 'menu_' . $menuId;
			$data = $this->getTemplateEngine()
				->getCommonVar($key);

			if (is_array($data)) {
				return $data;
			}

			try {
				$data = $this->macros('menu', 'draw', [$menuId]);
			} catch (Exception $e) {
				$data = [];
			}
			$data = is_array($data) ? $data : [];
			$data['lines'] = isset($data['lines']) ? $data['lines'] : [];

			foreach ($data['lines'] as &$page) {
				$page = is_array($page) ? $page : [];
				$page['link'] = isset($page['link']) ? $page['link'] : $this->getHomePageUrl();
				$page['name'] = isset($page['name']) ? $page['name'] : '';
			}

			$this->getTemplateEngine()
				->setCommonVar($key, $data);

			return $data;
		}

		/**
		 * Возвращает данные миниатюры
		 * @param array $variables
		 *
		 * [
		 *      'src' =>  string,       // путь до оригинального изображения
		 *      'width' => int|string,  // ширина миниатюры или ключевое слово auto
		 *      'height' => int|string, // высота миниатюры или ключевое слово auto
		 *      'id' => int,            // идентификатор сущности
		 *      'field_name' => string, // строковой идентификатор поля сущности
		 *  	'object' => bool,       // является ли родитель объектом
		 * ]
		 *
		 * @return array
		 *
		 * Результат работы макроса system::makeThumbnailFull()
		 *
		 * +
		 *
		 * [
		 *  	'object' => bool,       // является ли родитель объектом
		 *      'id' => int,            // идентификатор сущности
		 *      'field_name' => string, // строковой идентификатор поля сущности
		 * ]
		 * @throws Exception
		 */
		public function getThumbnail(array $variables) {
			$variables['id'] = isset($variables['id']) ? $variables['id'] : '';
			$variables['field_name'] = isset($variables['field_name']) ? $variables['field_name'] : '';
			$variables['src'] = isset($variables['src']) ? $variables['src'] : '';
			$variables['width'] = isset($variables['width']) ? $variables['width'] : 'auto';
			$variables['height'] = isset($variables['height']) ? $variables['height'] : 'auto';

			$thumbnail = $this->macros(
				'system',
				'makeThumbnailFull',
				[
					'path' => '.' . $variables['src'],
					'width' => $variables['width'],
					'height' => $variables['height'],
					'default',
					true
				]
			);

			$thumbnail['alt'] = isset($variables['alt']) ? $variables['alt'] : '';
			$thumbnail['title'] = isset($variables['title']) ? $variables['title'] : '';
			$thumbnail['src'] = isset($thumbnail['src']) ? $thumbnail['src'] : '';
			$thumbnail['width'] = isset($thumbnail['width']) ? $thumbnail['width'] : '';
			$thumbnail['height'] = isset($thumbnail['height']) ? $thumbnail['height'] : '';
			$thumbnail['object'] = isset($variables['object']) ? $variables['object'] : '';
			$thumbnail['id'] = $variables['id'];
			$thumbnail['field_name'] = $variables['field_name'];
			$thumbnail['object-id'] = isset($variables['objectId']) ? $variables['objectId'] : '';
			$thumbnail['folderHash'] = isset($variables['folderHash']) ? $variables['folderHash'] : '';
			$thumbnail['fileHash'] = isset($variables['fileHash']) ? $variables['fileHash'] : '';
			return $thumbnail;
		}

		/**
		 * Возвращает имя аттрибута с идентификатором элемента/объекта
		 * @param bool $isObject является ли объектом
		 * @return string
		 */
		public function getUmiIdAttributeName($isObject) {
			return $isObject ? 'umi:object-id' : 'umi:element-id';
		}

		/**
		 * Определяет пуста ли корзина
		 * @param array $variables результат работы макроса emarket::cart()
		 *
		 * [
		 *      'data' => [
		 *          'items' => array // список товаров в корзине
		 *      ]
		 * ]
		 *
		 * @return bool
		 */
		public function isCartEmpty(array $variables) {
			$variables = isset($variables['data']) ? $variables['data'] : $variables;
			return !isset($variables['items'][0]);
		}

		/**
		 * Возвращает заголовок цены в корзине
		 * @param array $variables часть результата работы макроса emarket::cart()
		 *
		 * [
		 *      'data' => [
		 *          'summary' => [
		 *              'price' => [
		 *                  'prefix' =>  string,  // префикс валюты
		 *                  'suffix' =>  string,  // суффикс валюты
		 *              ]
		 *          ]
		 *      ]
		 * ]
		 *
		 * @return string
		 */
		public function getPriceHeader(array $variables) {
			return implode(' ', [
				$this->getTemplateEngine()->translate('price') . ',',
				$this->getPriceSymbol($variables),
				'x',
				$this->getTemplateEngine()->translate('amount'),
			]);
		}

		/**
		 * Возвращает символ валюты
		 * @param array $variables данные цены
		 *
		 * [
		 *      'data' => [
		 *          'summary' => [
		 *              'price' => [
		 *                  'prefix' =>  string,  // префикс валюты
		 *                  'suffix' =>  string,  // суффикс валюты
		 *              ]
		 *          ]
		 *      ]
		 * ]
		 *
		 * @return string
		 */
		public function getPriceSymbol(array $variables) {
			$variables = isset($variables['data']) ? $variables['data'] : $variables;
			$prefix = isset($variables['summary']['price']['prefix']) ? $variables['summary']['price']['prefix'] : '';
			$suffix = isset($variables['summary']['price']['suffix']) ? $variables['summary']['price']['suffix'] : '';
			return $prefix ?: $suffix;
		}

		/**
		 * Возвращает заголовок скидки в корзине
		 * @param array $variables часть результата работы макроса emarket::cart()
		 *
		 * [
		 *      'data' => [
		 *          'summary' => [
		 *              'price' => [
		 *                  'prefix' =>  string,  // префикс валюты
		 *                  'suffix' =>  string,  // суффикс валюты
		 *              ]
		 *          ]
		 *      ]
		 * ]
		 *
		 * @return string
		 */
		public function getDiscountHeader(array $variables) {
			return implode(' ', [
				$this->getTemplateEngine()->translate('item-discount') . ',',
				$this->getPriceSymbol($variables),
			]);
		}

		/**
		 * Возвращает заголовок "Сумма" для корзины
		 * @param array $variables часть результата работы макроса emarket::cart()
		 *
		 * [
		 *      'data' => [
		 *          'summary' => [
		 *              'price' => [
		 *                  'prefix' =>  string,  // префикс валюты
		 *                  'suffix' =>  string,  // суффикс валюты
		 *              ]
		 *          ]
		 *      ]
		 * ]
		 *
		 * @return string
		 */
		public function getSumHeader(array $variables) {
			return implode(' ', [
				$this->getTemplateEngine()->translate('sum') . ',',
				$this->getPriceSymbol($variables),
			]);
		}

		/**
		 * Возвращает css-класс для товара в корзине
		 * @param int $index порядковый номер товара в корзине
		 * @return string
		 */
		public function getBorderClass($index) {
			return ($index === 0) ? 'no_border' : '';
		}

		/**
		 * Возвращает цену одной единицы товара в корзине без скидки
		 * @param array $product данные товара
		 *
		 * [
		 *      'price' => [
		 *          'original' => float, // цена товара без скидки
		 *          'actual' => float    // текущая цена товара
		 *      ]
		 * ]
		 *
		 * @return  string
		 */
		public function getOriginalPrice(array $product) {
			$originalPrice = isset($product['price']['original']) ? $product['price']['original'] : 0;
			$actualPrice = isset($product['price']['actual']) ? $product['price']['actual'] : 0;
			return $this->formatPrice($originalPrice ?: $actualPrice);
		}

		/**
		 * Возвращает общую цену товара в корзине с учетом количества
		 * @param array $product данные товара
		 *
		 * [
		 *      'price' => [
		 *          'actual' => float  // текущая цена товара
		 *      ],
		 *      'amount' => int        // количество товара
		 * ]
		 *
		 * @return string
		 */
		public function getTotalPrice(array $product) {
			$price = isset($product['price']['actual']) ? $product['price']['actual'] : 0;
			$amount = isset($product['amount']) ? $product['amount'] : 1;
			return $this->formatPrice($price * $amount);
		}

		/**
		 * Возвращает общую цену с префиксом/суффиксом валюты
		 * @param array $product данные товара
		 *
		 * [
		 *      'price' => [
		 *          'actual' => float,  // текущая цена товара
		 *          'prefix' => string, // префикс валюты
		 *          'suffix' => string  // суффикс валюты
		 *      ],
		 *      'amount' => int         // количество товара
		 * ]
		 *
		 * @return string
		 */
		public function getTotalPriceWithSymbol(array $product) {
			return implode(' ', [
				$this->getTotalPricePrefix($product),
				$this->getTotalPrice($product),
				$this->getTotalPriceSuffix($product)
			]);
		}

		/**
		 * Возвращает префикс валюты общей цены
		 * @param array $product
		 * @return string
		 */
		public function getTotalPricePrefix(array $product) {
			return isset($product['price']['prefix']) ? $product['price']['prefix'] : '';
		}

		/**
		 * Возвращает суффикс валюты общей цены
		 * @param array $product
		 * @return string
		 */
		public function getTotalPriceSuffix(array $product) {
			return isset($product['price']['suffix']) ? $product['price']['suffix'] : '';
		}

		/**
		 * Возвращает количество товара в корзине
		 * @param array $product данные товара
		 *
		 * [
		 *      'amount' => int // количество товара в корзине
		 * ]
		 *
		 * @return int
		 */
		public function getAmount(array $product) {
			return (int) isset($product['amount']) ? $product['amount'] : 1;
		}

		/**
		 * Возвращает класс для отображения стикера количества товара
		 * @param int $amount
		 * @return string
		 */
		public function getProductStickerAmountClass($amount) {
			return ($amount > 0) ? '' : 'not_show';
		}

		/**
		 * Возвращает абсолютное значение скидки на товар
		 * @param array $product данные товара
		 *
		 * [
		 *      'discount' => [
		 *          'amount' => int // абсолютное значение скидки на товар
		 *      ]
		 * ]
		 *
		 * @return int
		 */
		public function getDiscount(array $product) {
			return isset($product['discount']['amount']) ? $product['discount']['amount'] : 0;
		}

		/**
		 * Возвращает скидку на товар с префиксом/суффиксом валюты
		 * @param array $product данные товара
		 *
		 * [
		 *      'discount' => [
		 *          'amount' => int // абсолютное значение скидки на товар
		 *      ],
		 *     'price' => [
		 *          'prefix' => string, // префикс валюты
		 *          'suffix' => string  // суффикс валюты
		 *      ],
		 * ]
		 *
		 * @return string
		 */
		public function getDiscountWithSymbol(array $product) {
			$discount = $this->getDiscount($product);
			$prefix = isset($product['price']['prefix']) ? $product['price']['prefix'] : '';
			$suffix = isset($product['price']['suffix']) ? $product['price']['suffix'] : '';

			return implode(' ', [
				$prefix,
				$discount,
				$suffix,
			]);
		}

		/**
		 * Возвращает абсолютное значение скидки на заказ с префиксом/суффиксом валюты
		 * @param array $variables данные заказа
		 *
		 * [
		 *      'data' => [
		 *          'summary' => [
		 *              'price' => [
		 *                  'prefix' => string  // префикс валюты
		 *                  'discount' => int   // абсолютное значение скидки
		 *                  'suffix' => string  // суффикс валюты
		 *              ]
		 *          ]
		 *      ]
		 * ]
		 *
		 * @return string
		 */
		public function getOrderDiscount(array $variables) {
			$variables = isset($variables['data']) ? $variables['data'] : $variables;

			return $this->formatPriceWithCurrency(
				$this->getOrderDiscountPrefix($variables),
				$this->getOrderDiscountAmount($variables),
				$this->getOrderDiscountSuffix($variables)
			);
		}

		/**
		 * Возвращает префикс валюты абсолютной скидки на заказ
		 * @param array $variables данные заказа
		 * @return int
		 */
		public function getOrderDiscountPrefix(array $variables) {
			return isset($variables['summary']['price']['prefix']) ? $variables['summary']['price']['prefix'] : '';
		}

		/**
		 * Возвращает суффикс валюты абсолютной скидки на заказ
		 * @param array $variables данные заказа
		 * @return int
		 */
		public function getOrderDiscountSuffix(array $variables) {
			return isset($variables['summary']['price']['suffix']) ? $variables['summary']['price']['suffix'] : '';
		}

		/**
		 * Возвращает абсолютное значение скидки на заказ
		 * @param array $variables данные заказа
		 * @return int
		 */
		public function getOrderDiscountAmount(array $variables) {
			return isset($variables['summary']['price']['discount']) ? $variables['summary']['price']['discount'] : 0;
		}

		/**
		 * Возвращает значение итоговой скидки на заказ
		 * @param array $variables данные заказа
		 * @return string
		 */
		public function getTotalDiscount(array $variables) : string {
			if (!isset($variables['data']['summary']['price']['actual']) || !isset($variables['data']['items'])) {
				return '';
			}

			$orderPrice = $variables['data']['summary']['price']['actual'];
			$orderItems = $variables['data']['items'];
			$totalOriginalPrice = 0;

			foreach ($orderItems as $orderItem) {
				if (isset($orderItem['total-price']['original'])) {
					$orderItemPrice = $orderItem['total-price']['original'];
				} else if (isset($orderItem['total-price']['actual'])) {
					$orderItemPrice = $orderItem['total-price']['actual'];
				} else {
					return '';
				}

				$totalOriginalPrice += $orderItemPrice;
			}

			$totalDiscount = $totalOriginalPrice - $orderPrice;
			return $this->formatPrice($totalDiscount);
		}

		/**
		 * Возвращает цену заказа префиксом/суффиксом валюты
		 * @param array $variables данные заказа
		 *
		 * [
		 *      'data' => [
		 *          'summary' => [
		 *              'price' => [
		 *                  'prefix' => string  // префикс валюты
		 *                  'actual' => float   // текущая цена заказа
		 *                  'suffix' => string  // суффикс валюты
		 *              ]
		 *          ]
		 *      ]
		 * ]
		 *
		 * @return string
		 */
		public function getOrderPrice(array $variables) {
			$variables = isset($variables['data']) ? $variables['data'] : $variables;
			$priceData = isset($variables['summary']['price']) ? $variables['summary']['price'] : [];

			$prefix = isset($priceData['prefix']) ? $priceData['prefix'] : '';
			$suffix = isset($priceData['suffix']) ? $priceData['suffix'] : '';
			$price = isset($priceData['actual']) ? $priceData['actual'] : 0;
			$deliveryPrice = isset($priceData['delivery']) ? $priceData['delivery'] : 0;

			return $this->formatPriceWithCurrency($prefix, ($price - $deliveryPrice), $suffix);
		}

		/**
		 * Возвращает ссылку на страницу с корзиной товаров
		 * @return string
		 */
		public function getCartLink() {
			return $this->getTemplateEngine()->getCommonVar('pre_lang') . '/emarket/cart';
		}

		/**
		 * Возвращает ссылку, чтобы положить товар в корзину
		 * @param iUmiHierarchyElement $product страница (товар)
		 * @return string
		 */
		public function getAddToCartLink(iUmiHierarchyElement $product) {
			return $this->getTemplateEngine()->getCommonVar('pre_lang') . '/emarket/basket/put/element/' . $product->getId();
		}

		/**
		 * Возвращает ссылку, чтобы убрать товар из корзины
		 * @param iUmiHierarchyElement $product страница (товар)
		 * @return string
		 */
		public function getRemoveFromCartLink(iUmiHierarchyElement $product) {
			return $this->getTemplateEngine()->getCommonVar('pre_lang') . '/emarket/basket/remove/element/' . $product->getId();
		}

		/**
		 * Возвращает список товаров, рекомендуемых к приобретению с заданным товаром
		 * @param iUmiHierarchyElement $product страница (товар)
		 * @return iUmiHierarchyElement[]
		 * @throws ErrorException
		 * @throws ReflectionException
		 * @throws databaseException
		 * @throws expectElementException
		 * @throws publicException
		 */
		public function getSuggestedProducts(iUmiHierarchyElement $product) {
			$suggestedList = $product->getValue('udachno_sochetaetsya_s');

			if (!is_array($suggestedList)) {
				$suggestedList = [];
			}

			$filteredList = [];

			foreach ($suggestedList as $suggestedProduct) {
				if (!$suggestedProduct instanceof iUmiHierarchyElement) {
					continue;
				}

				if ($this->isCheckStock() && !$this->isInStock($suggestedProduct)) {
					continue;
				}

				$filteredList[] = $suggestedProduct;
			}

			return array_slice($filteredList, 0, self::MAX_CAROUSEL_PRODUCT_COUNT);
		}

		/**
		 * Возвращает товары, находящиеся в одной категории с заданным товаром
		 * @param iUmiHierarchyElement $product страница (товар)
		 * @return iUmiHierarchyElement[]
		 * @throws selectorException
		 */
		public function getRelatedProducts(iUmiHierarchyElement $product) {
			$recommendedProducts = $product->getValue('recommended_items');
			
			if (!empty($recommendedProducts)) {
				return $recommendedProducts;
			}
			
			$products = new selector('pages');
			$products->types('hierarchy-type')->name('catalog', 'object');
			$products->where('hierarchy')->page($product->getParentId());
			$products->where('id')->notequals($product->getId());
			$products->limit(0, self::MAX_CAROUSEL_PRODUCT_COUNT);
			$products->order('id')->rand();
			$products->option('load-all-props')->value(true);
			$products->option('no-length', true);
			return $products->result();
		}

		/**
		 * Возвращает недавно просмотренные товары
		 * @return iUmiHierarchyElement[]
		 * @throws Exception
		 */
		public function getRecentlyVisitedProducts() {
			$template = null;
			$scope = null;
			$showCurrentElement = false;
			$limit = self::MAX_CAROUSEL_PRODUCT_COUNT;

			$data = $this->macros(
				'content',
				'getRecentPages',
				[$template, $scope, $showCurrentElement, $limit]
			);

			$data = is_array($data) ? $data : [];
			$productDataList = isset($data['items']) ? $data['items'] : [];

			$umiHierarchy = umiHierarchy::getInstance();
			$productList = [];

			/** @var array $productDataList */
			foreach ($productDataList as $productData) {
				$productList[] = $umiHierarchy->getElement($productData['id'], true);
			}

			return $productList;
		}

		/**
		 * Возвращает сообщение с количеством голосов
		 * @param array $variables результат работы макроса vote::getElementRating()
		 *
		 * [
		 *      'rate_voters' => int // количество голосов
		 * ]
		 *
		 * @return string
		 */
		public function getVoteCountMessage(array $variables) {
			$message = $this->getTemplateEngine()->translate('total_votes');
			$count = isset($variables['rate_voters']) ? $variables['rate_voters'] : 0;
			return "{$message} ({$count})";
		}

		/**
		 * Возвращает звездочки голосования
		 * @param array $variables результат работы макроса vote::getElementRating()
		 *
		 * [
		 *      'ceil_rate' => int,  // средний рейтинг
		 *      'element_id' => int  // идентификатор страницы
		 * ]
		 *
		 * @return array
		 *
		 * [
		 *     'css_color_class' => css-класс звездочки рейтинга
		 *     'link' => ссылка для голосования за страницу
		 * ]
		 */
		public function getVoteStars(array $variables) {
			$averagedRating = isset($variables['ceil_rate']) ? $variables['ceil_rate'] : 0;
			$elementId = isset($variables['element_id']) ? $variables['element_id'] : '';
			$minRating = 1;
			$maxRating = 5;
			$stars = [];

			$langPrefix = $this->getTemplateEngine()->getCommonVar('pre_lang');

			for ($rating = $minRating; $rating <= $maxRating; $rating++) {
				$cssColorClass = ($rating > $averagedRating) ? 'gray_text' : 'red_text';

				$stars[] = [
					'css_color_class' => $cssColorClass,
					'link' => "$langPrefix/vote/setElementRating/default/{$elementId}/{$rating}/",
				];
			}

			return $stars;
		}

		/**
		 * Возвращает родителя страницы
		 * @param array $variables глобальные переменные запроса
		 *
		 * [
		 *      'parents' => array // список страниц, родительских текущей
		 * ]
		 *
		 * @return iUmiHierarchyElement
		 */
		public function getImmediateParent(array $variables) {
			if (isset($variables['parents']) && is_array($variables['parents']) && umiCount($variables['parents']) > 0) {
				return array_pop($variables['parents']);
			}

			return $this->getDefaultPage();
		}

		/**
		 * Возвращает список изображений товара
		 * @param iUmiHierarchyElement $product страница (товар)
		 * @return iUmiImageFile[]
		 */
		public function getProductImageList(iUmiHierarchyElement $product) {
			$mainPhoto = $product->getValue('photo');
			$imageList = [$mainPhoto];

			if (!$mainPhoto) {
				$imageList = [new umiImageFile($this->noPhotoPath)];
			}

			$additionalPhotos = is_array($product->getValue('photos')) ? $product->getValue('photos') : [];

			foreach ($additionalPhotos as $photo) {
				if ($photo instanceof iUmiImageFile) {
					$imageList[] = $photo;
				}
			}

			return $imageList;
		}

		/**
		 * Возвращает значение чекбокса "Учитывать остатки на складе"
		 * настроек сайта
		 * @return bool
		 * @throws publicException
		 */
		public function isCheckStock() {
			return (bool) $this->getSettingsValue('is_check_stock');
		}

		/**
		 * Определяет в наличии ли товар
		 * @param iUmiHierarchyElement $product страница (товар)
		 * @return bool
		 * @throws ErrorException
		 * @throws ReflectionException
		 * @throws databaseException
		 * @throws expectElementException
		 * @throws publicException
		 */
		public function isInStock(iUmiHierarchyElement $product) {
			if (!$this->hasTradeOffers($product->getId())) {
				return $product->getValue('common_quantity') > 0;
			}

			return $this->getTradeOfferCollection($product)->getCount() > 0;
		}

		/**
		 * Возвращает ссылку для добавления или удаления товара из сравнения
		 * @param mixed|array $data результат работы макроса emarket::getCompareLink
		 * @return string
		 * @throws Exception
		 */
		public function getProductComparisonLink($data) {
			$data = is_array($data) ? $data : [];
			$addLink = isset($data['add-link']) ? $data['add-link'] : '';
			$removeLink = isset($data['del-link']) ? $data['del-link'] : '';
			return $addLink ?: $removeLink;
		}

		/**
		 * Возвращает сообщение для добавления или удаления товара
		 * @param mixed|array $data результат работы макроса emarket::getCompareLink
		 * @return string
		 */
		public function getComparisonMessage($data) {
			$data = is_array($data) ? $data : [];

			if (isset($data['add-link'])) {
				return $this->getTemplateEngine()->translate('js-add-to-comparison');
			}

			return $this->getTemplateEngine()->translate('js-remove-from-comparison');
		}

		/**
		 * Возвращает атрибут ссылки для добавления или удаления товара
		 * @param mixed|array $data результат работы макроса emarket::getCompareLink
		 * @return string
		 */
		public function getProductComparisonAttribute($data) {
			$data = is_array($data) ? $data : [];
			$addLink = isset($data['add-link']) ? 'add' : '';
			$removeLink = isset($data['del-link']) ? 'remove' : '';
			return $addLink ?: $removeLink;
		}

		/**
		 * Возвращает список полей товара, разделенных на две равные части
		 * @param iUmiHierarchyElement $product страница (товар)
		 * @return array
		 *
		 * [
		 *    0 => [                    // первая часть полей
		 *       0 => [
		 *          'title' => string,  // наименование поля
		 *          'name' => string,   // строковой идентификатор поля
		 *            'value' => mixed    // значение поля
		 *       ]
		 *    ],
		 *    1 => [                    // вторая часть полей
		 *       0 => [
		 *          'title' => string,  // наименование поля
		 *          'name' => string,   // строковой идентификатор поля
		 *            'value' => mixed    // значение поля
		 *       ]
		 *    ]
		 * ]
		 * @throws coreException
		 * @throws Exception
		 */
		public function getProductPropertyChunks(iUmiHierarchyElement $product) {
			$object = $product->getObject();
			$type = $object->getType();

			/** @var iUmiFieldsGroup $propertiesGroup */
			$propertiesGroup = $type->getFieldsGroupByName('item_properties');
			$fieldList = [];

			if ($propertiesGroup instanceof iUmiFieldsGroup) {
				$fieldList = $propertiesGroup->getFields();
			}

			/** @var iUmiFieldsGroup $propertiesGroup */
			$specialGroup = $type->getFieldsGroupByName('special');

			if ($specialGroup instanceof iUmiFieldsGroup) {
				$fieldList = array_merge($fieldList, $specialGroup->getFields());
			}

			$propertyList = [];

			foreach ($fieldList as $field) {
				if (!$field->getIsVisible()) {
					continue;
				}

				$propertyList[] = $object->getPropByName($field->getName());
			}

			$propertyDataList = $this->getPropertyDataList($propertyList);

			$length = umiCount($propertyDataList);
			$firstHalf = array_slice($propertyDataList, 0, $length / 2);
			$secondHalf = array_slice($propertyDataList, $length / 2);

			return [$firstHalf, $secondHalf];
		}

		/**
		 * Возвращает список данных свойств для вывода в шаблоне товара
		 * @param iUmiObjectProperty[] $propertyList список свойств
		 * @return array [
		 *   [
		 *     'title' => %title%,
		 *     'name' => %name%,
		 *     'value' => %value%
		 *   ],
		 * ]
		 * @throws Exception
		 */
		public function getPropertyDataList(array $propertyList) {
			$result = [];

			foreach ($propertyList as $property) {
				if (!$this->isAllowedDataType($property->getDataType())) {
					continue;
				}

				$result[] = $this->getPropertyData($property);
			}

			return $result;
		}

		/**
		 * Поддерживается ли вывод поля заданного типа
		 * @param string $dataType тип поля
		 * @return bool
		 */
		public function isAllowedDataType($dataType) {
			$allowedDataTypes = [
				'int',
				'string',
				'text',
				'relation',
				'date',
				'boolean',
				'symlink',
				'price',
				'float',
				'counter',
				'optioned',
				'color',
			];

			return in_array($dataType, $allowedDataTypes);
		}

		/**
		 * Возвращает данные свойства для вывода в шаблоне товара
		 * @param iUmiObjectProperty|null $property свойство
		 * @return array [
		 *   'title' => %title%,
		 *   'name' => %name%,
		 *   'value' => %value%
		 * ]
		 * @throws Exception
		 */
		public function getPropertyData($property) {
			if (!$property instanceof iUmiObjectProperty) {
				return [
					'title' => '',
					'name' => '',
					'value' => '',
				];
			}

			$dataType = $property->getDataType();
			$value = $property->getValue();

			switch ($dataType) {
				case 'date': {
					$preparedValue = '';

					if ($value instanceof umiDate) {
						$preparedValue = $value->getFormattedDate('d M Y');
					}

					break;
				}

				case 'symlink': {
					$preparedValue = $this->getSymlinkValue($property);
					break;
				}

				case 'relation': {
					$preparedValue = $this->getRelationValue($property);
					break;
				}

				case 'optioned': {
					$preparedValue = $this->getOptionedValue($property);
					break;
				}

				case 'boolean': {
					$isTrue = $value;
					$label = $isTrue ? 'yes' : 'no';
					$preparedValue = $this->translate($label);
					break;
				}

				default: {
					$preparedValue = $this->escape((string) $value);
				}
			}

			return [
				'title' => $this->escape($property->getTitle()),
				'name' => $this->escape($property->getName()),
				'value' => $preparedValue,
			];
		}

		/**
		 * Возвращает значение свойства типа `symlink`
		 * @param iUmiObjectProperty $property
		 * @return string
		 * @throws Exception
		 */
		public function getSymlinkValue(iUmiObjectProperty $property) {
			$templateEngine = $this->getTemplateEngine();
			$linkedPages = (array) $property->getValue();
			$value = '';

			/** @var iUmiHierarchyElement $page */
			foreach ($linkedPages as $page) {
				$variables = [
					'path' => $this->getPath($page),
					'name' => $this->escape($page->getName())
				];

				$value .= $templateEngine->render($variables, 'catalog/product/main/properties/symlink');
			}

			return $value;
		}

		/**
		 * Возвращает значение свойства типа `relation`
		 * @param iUmiObjectProperty $property
		 * @return string
		 */
		public function getRelationValue(iUmiObjectProperty $property) {
			$umiObjects = umiObjectsCollection::getInstance();
			$relationList = (array) $property->getValue();
			$value = [];

			foreach ($relationList as $relationId) {
				$relation = $umiObjects->getObject($relationId);

				if ($relation instanceof iUmiObject) {
					$value[] = $this->escape($relation->getName());
				}
			}

			return implode(', ', $value);
		}

		/**
		 * Возвращает значение свойства типа `optioned`
		 * @param iUmiObjectProperty $property
		 * @return string
		 */
		public function getOptionedValue(iUmiObjectProperty $property) {
			$umiObjects = umiObjectsCollection::getInstance();
			$optionList = (array) $property->getValue();
			$value = [];

			foreach ($optionList as $optionData) {
				$relationId = isset($optionData['rel']) ? $optionData['rel'] : '';
				$option = $umiObjects->getObject($relationId);

				if ($option instanceof iUmiObject) {
					$value[] = $this->escape($option->getName());
				}
			}

			return implode(', ', $value);
		}

		/**
		 * Возвращает список товаров или категорий
		 * @param array $variables результат работы метода Demomarket::getCatalog() или getChildCategories()
		 *
		 * [
		 *     'category_id' => идентификатор категории товаров,
		 *     'lines' => [
		 *         # => [
		 *             'id' => идентификатор товара/категории
		 *         ]
		 *     ]
		 * ]
		 *
		 * @return iUmiHierarchyElement[]
		 */
		public function getPages(array $variables) {
			$isRootCatalog = !isset($variables['category_id']);

			if ($isRootCatalog) {
				return $variables;
			}

			$umiHierarchy = umiHierarchy::getInstance();
			$pageDataList = isset($variables['lines']) ? $variables['lines'] : [];
			$pageList = [];

			/** @var array $pageDataList */
			foreach ($pageDataList as $pageData) {
				$page = $umiHierarchy->getElement($pageData['id'], true);

				if ($page instanceof iUmiHierarchyElement) {
					$pageList[] = $page;
				}
			}

			return $pageList;
		}

		/**
		 * Определяет находится ли страница на первом уровне вложенности от корня
		 * @param array $variables глобальные переменные запроса
		 *
		 * [
		 *     'parents' => array  // список страниц, родительских для текущей
		 * ]
		 *
		 * @return bool
		 */
		public function isRootCatalog(array $variables) {
			return !isset($variables['parents']) || umiCount($variables['parents']) === 0;
		}

		/**
		 * Возвращает строковой идентификатор поля, по которому сортируются товары
		 * @return string
		 */
		public function getSortField() {
			$cookieJar = Service::CookieJar();
			return $cookieJar->get('sort_field') ?: 'common_quantity';
		}

		/**
		 * Определяет сортируются ли товары в восходящем порядке
		 * @return bool
		 */
		public function isSortDirectionAscending() {
			$cookieJar = Service::CookieJar();
			return (bool) $cookieJar->get('sort_direction_is_ascending');
		}

		/**
		 * Возвращает css-класс для пункта сортировки
		 * @param string $sortField строковой идентификатор сортируемого поля
		 * @return string
		 */
		public function getSortClass($sortField) {
			if ($sortField !== $this->getSortField()) {
				return '';
			}

			$direction = $this->isSortDirectionAscending() ? 'up_arrow' : 'down_arrow';
			return "active {$direction}";
		}

		/**
		 * Возвращает данные для построения пагинации в списке товаров
		 * @param array $variables результат работы метода Demomarket::getCatalog()
		 *
		 * [
		 *     'category_id'  => int,  // идентификатор раздела каталога
		 *     'numpages'  =>  array,  // данные пагинации
		 *     'total'  =>  int,       // общее количество товаров
		 *     'per_page'  =>  int,    // количество выводимых товаров на одной странице
		 * ]
		 *
		 * @return array
		 *
		 * $variables['numpages]
		 *
		 * +
		 *
		 * [
		 *     'total' => int,    // общее количество товаров
		 *     'per_page' => int, // количество выводимых товаров на одной странице
		 * ]
		 */
		public function getPagination(array $variables) {
			$isRootCatalog = !isset($variables['category_id']);

			if ($isRootCatalog) {
				return [];
			}

			$pagination = isset($variables['numpages']) ? $variables['numpages'] : [];
			$pagination['total'] = isset($variables['total']) ? $variables['total'] : 0;
			$pagination['per_page'] = isset($variables['per_page']) ? $variables['per_page'] : 0;
			return $pagination;
		}

		/**
		 * Возвращает ссылку на следующую страницу пагинации
		 * @param array $pagination параметры пагинации
		 *
		 * [
		 *     'tonext_link'  => [
		 *          'value' => string,  // ссылка на следующую страницу пагинации
		 *      ]
		 * ]
		 *
		 * @return string
		 */
		public function getNextPageLink(array $pagination) {
			return $this->getCurrentPath() . $pagination['tonext_link']['value'];
		}

		/**
		 * Возвращает текущую строку запроса без get-параметров
		 * @return string
		 */
		public function getCurrentPath() {
			$currentUrl = $this->getTemplateEngine()->getCommonVar('request_uri');
			return strtok($currentUrl, '?');
		}

		/**
		 * Возвращает поля для вывода умных фильтров
		 * @param array|null $filtersData результат работы макроса catalog::getSmartFilter()
		 *
		 * [
		 *     'group' => [                         // список групп полей
		 *          0 => [                          // группа полей
		 *              0 => [                      // список полей
		 *                  0 => [
		 *                      'name' => string,   // строковой идентификатор поля
		 *                      'title' => string,  // наименования поля
		 *                      mixed array         // варианты значения поля
		 *                  ]
		 *              ]
		 *          ]
		 *     ]
		 * ]
		 *
		 * @return array
		 *
		 * [
		 *      0 => [
		 *          'name' => string,   // строковой идентификатор поля
		 *          'title' => string,  // наименования поля
		 *          mixed array         // варианты значения поля
		 *      ]
		 * ]
		 */
		public function getFilterFields($filtersData) {
			$filtersData = is_array($filtersData) ? $filtersData : [];
			$groupList = isset($filtersData['group']) ? $filtersData['group'] : [];
			$fieldList = [];

			/** @var array $groupList */
			foreach ($groupList as $group) {
				$groupFields = isset($group['field']) ? $group['field'] : [];

				foreach ($groupFields as $field) {
					$fieldList[] = $field;
				}
			}

			return $fieldList;
		}

		/**
		 * Возвращает варианты значения булевого поля, выводимого с помощью radio-кнопок
		 * @param array $data описание поля и его значений, часть результата макроса catalog::getSmartFilters()
		 *
		 * [
		 *      'item' => [
		 *          0 => [
		 *              'value' => 0,           // вариант значения поля
		 *              'is-selected' => bool   // вариант был выбран
		 *          ],
		 *          0 => [
		 *              'value' => 1,           // вариант значения поля
		 *              'is-selected' => bool   // вариант был выбран
		 *          ]
		 *      ]
		 * ]
		 *
		 * @return array
		 *
		 * [
		 *     0 => string, // применен фильтр по значению поля
		 *     1 => string, // применен фильтр по отсутствию значения поля
		 *     2 => string  // фильтр не применен
		 * ]
		 */
		public function getChecked(array $data) {
			$result = ['', '', ''];
			$i = 0;
			$checked = false;
			$items = isset($data['item']) ? $data['item'] : [];

			foreach ($items as $item) {
				if (isset($item['is-selected']) && $item['is-selected']) {
					$result[$i] = 'checked';
					$checked = true;
				}

				$i++;
			}

			if (!$checked) {
				$result['2'] = 'checked';
			}

			return $result;
		}

		/**
		 * Возвращает список фотографий фотоальбома
		 * @param array $albumData результат работы макроса photoalbum::album()
		 *
		 * [
		 *     'lines' => [
		 *          0 => [
		 *              'id' => int // идентификатор страницы (фотографии)
		 *          ]
		 *      ]
		 * ]
		 *
		 * @return iUmiHierarchyElement[]
		 */
		public function getPhotoalbumPhotos(array $albumData) {
			$umiHierarchy = umiHierarchy::getInstance();
			$photoDataList = isset($albumData['lines']) ? $albumData['lines'] : [];
			$photoList = [];

			/** @var array $photoDataList */
			foreach ($photoDataList as $photoData) {
				$photo = $umiHierarchy->getElement($photoData['id'], true);

				if ($photo instanceof iUmiHierarchyElement) {
					$photoList[] = $umiHierarchy->getElement($photoData['id'], true);
				}
			}

			return $photoList;
		}

		/**
		 * Возвращает сообщение о количестве товаров в корзине
		 * @param array $cart результат работы макроса emarket::cart()
		 *
		 * [
		 *     'total-amount' => float, // общее количество товаров в корзине
		 * ]
		 *
		 * @return string
		 */
		public function getOrderItemCountMessage(array $cart) {
			$count = isset($cart['total-amount']) ? $cart['total-amount'] : 0;

			if ($count === 0) {
				return $this->getTemplateEngine()->translate('cart_empty');
			}

			$message = $this->getTemplateEngine()->translate('cart_items_count');
			return implode(' ', [$message, $count]);
		}

		/**
		 * Возвращает данные товаров в корзине
		 * @param array $cart результат работы макроса emarket::cart()
		 *
		 * [
		 *     'items' => [
		 *         # => [
		 *             'page' => iUmiHierarchyElement страница товара,
		 *             'name' => имя товара
		 *         ]
		 *     ]
		 * ]
		 *
		 * @return array результат работы макроса emarket::cart(), ключ 'items'
		 */
		public function getOrderItems(array $cart) {
			$productList = isset($cart['items']) ? $cart['items'] : [];
			$filteredProductList = [];

			foreach ($productList as $product) {
				$page = isset($product['page']) ? $product['page'] : null;

				if ($page instanceof iUmiHierarchyElement) {
					$filteredProductList[] = $product;
				}
			}

			foreach ($filteredProductList as &$filteredProduct) {
				$filteredProduct['name'] = isset($filteredProduct['name']) ? $filteredProduct['name'] : '';
			}

			return $filteredProductList;
		}

		/**
		 * Возвращает владельца блога или null, если его не удалось определить
		 * @param array $variables глобальные переменные запроса
		 *
		 * [
		 *      'pageId' => int, // идентификатор блога
		 * ]
		 *
		 * @return int|null
		 * @throws Exception
		 */
		public function getBlogOwnerId(array $variables) {
			$data = $this->macros('blogs20', 'viewBlogAuthors', [$variables['pageId']]);
			$data = is_array($data) ? $data : [];
			$authorList = isset($data['users']) ? $data['users'] : [];

			/** @var array $authorList */
			foreach ($authorList as $author) {
				$isOwner = isset($author['is_owner']) ? (bool) $author['is_owner'] : false;

				if ($isOwner) {
					return $author['user_id'];
				}
			}

			return null;
		}

		/**
		 * Возвращает css-класс для товаров-новинок
		 * @param iUmiHierarchyElement $product страница (товар)
		 * @return string
		 */
		public function getNewLabelClass(iUmiHierarchyElement $product) {
			return $product->getValue('new') ? 'sticker_item' : '';
		}

		/**
		 * Возвращает css-класс для отображения каталога
		 * @return string
		 */
		public function getCatalogClass() {
			$cookieJar = Service::CookieJar();
			return $cookieJar->get('catalog_class') ?: 'goods';
		}

		/**
		 * Возвращает список товаров.
		 * Возвращает результат работы макроса catalog::getSmartCatalog(), либо DemomarketPhpExtension::getBestProducts(),
		 * если страница на первом уровне вложенности.
		 * @param array $variables глобальные переменные запроса
		 *
		 * [
		 *     'pageId' => int,   // идентификатор корневого раздела каталога
		 *     'parent' => array, // список страниц, родительских текущей странице
		 * ]
		 *
		 * @return array
		 * @throws Exception
		 * @throws selectorException
		 */
		public function getCatalog(array $variables) {
			if ($this->isRootCatalog($variables)) {
				return $this->getBestProducts();
			}

			$template = null;
			$categoryId = $variables['pageId'];
			$limit = null;
			$ignorePaging = false;
			$level = 2;
			$fieldName = $this->getSortField();
			$isAscending = $this->isSortDirectionAscending();

			return $this->macros(
				'catalog',
				'getSmartCatalog',
				[
					$template,
					$categoryId,
					$limit,
					$ignorePaging,
					$level,
					$fieldName,
					$isAscending,
				]
			);
		}

		/**
		 * Определяет, является ли текущая категория внутренней,
		 * т.е. содержит ли она дочерние категории и не является корневым разделом каталога
		 * @param array $variables глобальные переменные запроса
		 * @return bool
		 * @throws selectorException
		 */
		public function isInternalCategory(array $variables) {
			if ($this->getCatalogRootCategory()->getId() == $variables['pageId']) {
				return false;
			}

			$selector = Service::SelectorFactory()->createPageTypeName('catalog', 'category');
			$selector->where('hierarchy')->page($variables['pageId']);
			$selector->option('return')->value('id');
			$selector->limit(0, 1);
			return !isEmptyArray($selector->result());
		}

		/**
		 * Возвращает дочерние категории для текущей категории
		 * @param array $variables глобальные переменные запроса
		 * @return array
		 * @throws Exception
		 */
		public function getChildCategories(array $variables) {
			$template = null;
			$data = $this->macros(
				'catalog',
				'getCategoryList',
				[
					$template,
					$variables['pageId'],
				]
			);

			$data = is_array($data) ? $data : [];
			$data['items'] = $this->getPages($data);
			return $data;
		}

		/**
		 * Возвращает имя класса для оформления поля товара
		 * @param int $index порядковый связки (набора) полей
		 * @return string
		 */
		public function getPropertyChunkClass($index) {
			return ($index === 0) ? 'pr20' : 'pl20';
		}

		/**
		 * Определяет нужно ли выводить блок "опционные свойства" для товара
		 * @param iUmiHierarchyElement $product страницы (товар)
		 * @param iUmiField[] $fieldList список полей из группы "catalog_option_props"
		 * @return bool
		 */
		public function canShowOptionedProperties(iUmiHierarchyElement $product, array $fieldList) {
			foreach ($fieldList as $field) {
				$valueList = (array) $product->getValue($field->getName());

				if (umiCount($valueList) > 0) {
					return true;
				}
			}

			return false;
		}

		/**
		 * Возвращает атрибут "checked" для radio-поля
		 * @param int $index порядковый номер варианта значения radio-поля
		 * @return string
		 */
		public function getRadioStatusByPosition($index) {
			return ($index === 0) ? 'checked' : '';
		}

		/**
		 * Возвращает результат работы макроса catalog::getSmartFilters()
		 * @param array $variables глобальные переменные запроса
		 *
		 * [
		 *    'pageId' => идентификатор раздела каталога
		 * ]
		 *
		 * @return array|null
		 */
		public function getSmartFilters(array $variables) {
			$template = null;
			$categoryId = $variables['pageId'];
			$isAdaptive = false;
			$level = 1;

			try {
				$data = $this->macros('catalog', 'getSmartFilters', [$template, $categoryId, $isAdaptive, $level]);
			} catch (Exception $e) {
				return null;
			}

			$data = is_array($data) ? $data : [];
			$data['category-id'] = isset($data['category-id']) ? $data['category-id'] : 'undefined';
			return $data;
		}

		/**
		 * Определяет является ли текущая страница корзиной (emarket/cart)
		 * @return bool
		 */
		public function isCartPage() {
			$path = $this->getTemplateEngine()->getCommonVar('request_uri');
			return preg_match('/emarket\/cart/', $path);
		}

		/**
		 * Возвращает строку адреса
		 * @param int $id идентификатор адреса
		 * @return string
		 * @throws coreException
		 */
		public function getAddressLine($id) {
			$address = $this->getObjectById($id);
			$fieldList = $address->getType()->getAllFields(true);
			$result = [];

			foreach ($fieldList as $field) {
				if ($field->getName() == 'country') {
					$result[] = $this->getObjectById($address->getValue($field->getName()))->getName();
				} else {
					$result[] = $address->getValue($field->getName());
				}
			}

			return implode(', ', $result);
		}

		/**
		 * Определяет нужно ли рисовать опцию создания нового адреса доставки при оформлении заказа
		 * @param array $variables часть результата работы макроса emarket::purchase()
		 *
		 * [
		 *      'only_self_delivery' => bool,  // в системе присутствуют только способы доставки типа "Самовывоз"
		 *      'self_delivery_exist' => bool, // в системе присутствуют хотя бы один способ доставки типа "Самовывоз"
		 *      'items' => array,              // список способов доставки
		 * ]
		 *
		 * @return bool
		 */
		public function canShowNewDeliveryAddressOption(array $variables) {
			if (isset($variables['only_self_delivery']) && $variables['only_self_delivery']) {
				return false;
			}

			$realDeliveryList = isset($variables['items']) ? $variables['items'] : [];
			$selfDeliveryExists = isset($variables['self_delivery_exist']) ? $variables['self_delivery_exist'] : false;
			return umiCount($realDeliveryList) > 0 || $selfDeliveryExists;
		}

		/**
		 * Определяет нужно ли рисовать форму создания нового адреса доставки при оформлении заказа
		 * @param array $variables часть результата работы макроса emarket::purchase()
		 *
		 * [
		 *      'only_self_delivery' => bool, // в системе присутствуют только способы доставки типа "Самовывоз"
		 *      'type-id' => int,            // идентификатор типа данных способа доставки
		 * ]
		 *
		 * @return bool
		 */
		public function canShowNewDeliveryAddressForm(array $variables) {
			$onlySelfDelivery = isset($variables['only_self_delivery']) ? (bool) $variables['only_self_delivery'] : false;
			return !$onlySelfDelivery && isset($variables['type-id']);
		}

		/**
		 * Возвращает css-класс для шага оформления заказа
		 * @param array $step часть результата работы макроса emarket::purchase()
		 *
		 * [
		 *    'status' => string // статус шага оформления заказа
		 * ]
		 *
		 * @return string
		 */
		public function getPurchaseStepClass($step) {
			return in_array($step['status'], ['active', 'complete']) ? 'active' : '';
		}

		/**
		 * Возвращает результаты поиска страниц на сайте
		 * @return array результаты макроса search/search_do:
		 *
		 * [
		 *     'per_page' => int количество результатов на одной странице
		 *     'lines' => [
		 *         # => [
		 *             'id' => int идентификатор страницы
		 *             'link' => string ссылка на страницу
		 *             'name' => название страницы
		 *             'context' => string найденная строка в контексте контента поля страницы
		 *             'number' => int порядковый номер найденной страницы
		 *         ]
		 *     ]
		 * ]
		 * @throws Exception
		 */
		public function getSearchResult() {
			$data = $this->macros('search', 'search_do');
			$data = is_array($data) ? $data : [];
			$data['lines'] = isset($data['lines']) ? $data['lines'] : [];
			$data['per_page'] = isset($data['per_page']) ? $data['per_page'] : 0;
			$currentPage = Service::Request()->pageNumber();

			foreach ($data['lines'] as $index => &$item) {
				$item['id'] = isset($item['id']) ? $item['id'] : '';
				$item['name'] = isset($item['name']) ? $item['name'] : '';
				$item['link'] = isset($item['link']) ? $item['link'] : $this->getHomePageUrl();
				$item['context'] = isset($item['context']) ? $item['context'] : '';
				$item['number'] = $currentPage * $data['per_page'] + ($index + 1);
			}

			return $data;
		}

		/**
		 * Возвращает заголовок для результатов поиска
		 * @param array $variables результат работы макроса search::search_do()
		 *
		 * [
		 *    'last_search_string' => string, // поисковый запрос
		 *    'total' => int                  // количество найденных страниц
		 * ]
		 *
		 * @return string
		 */
		public function getSearchResultHeader(array $variables) {
			$total = isset($variables['total']) ? $variables['total'] : 0;

			if ($total > 0) {
				$message = $this->getTemplateEngine()->translate('search_result');
				$query = isset($variables['last_search_string']) ? $variables['last_search_string'] : '';
				return sprintf($message, htmlspecialchars($query), $total);
			}

			return $this->getTemplateEngine()->translate('search_empty_result');
		}

		/**
		 * Возвращает путь картинки для публикации новости
		 * @param iUmiHierarchyElement $newsItem новость
		 * @return string|null
		 */
		public function getNewsItemPhotoPath(iUmiHierarchyElement $newsItem) {
			/** @var umiImageFile $photo */
			$photo = $newsItem->getValue('publish_pic');

			if ($photo instanceof iUmiImageFile) {
				return $photo->getFilePath(true);
			}

			return null;
		}

		/**
		 * Возвращает alt картинки для публикации новости
		 * @param iUmiHierarchyElement $newsItem
		 * @return string|null
		 */
		public function getNewsItemPhotoAlt(iUmiHierarchyElement $newsItem) {
			/** @var iUmiImageFile $photo */
			$photo = $newsItem->getValue('publish_pic');
			$alt = ($photo instanceof iUmiImageFile) ? $photo->getAlt() : '';
			return $alt ?: $newsItem->getValue('title');
		}

		/**
		 * Возвращает title картинки для публикации новости
		 * @param iUmiHierarchyElement $newsItem
		 * @return string|null
		 */
		public function getNewsItemPhotoTitle(iUmiHierarchyElement $newsItem) {
			/** @var iUmiImageFile $photo */
			$photo = $newsItem->getValue('publish_pic');
			$title = ($photo instanceof iUmiImageFile) ? $photo->getTitle() : '';
			return $title ?: $newsItem->getValue('title');
		}

		/**
		 * Возвращает хеш пути до файла картинки для публикации новости для файлового менеджера
		 * @param iUmiHierarchyElement $newsItem
		 * @return string|null
		 */
		public function getNewsItemPhotoDirHash(iUmiHierarchyElement $newsItem) {
			/** @var iUmiImageFile $photo */
			$photo = $newsItem->getValue('publish_pic');
			return ($photo instanceof iUmiImageFile) ? $photo->getDirHash() : '';
		}

		/**
		 * Возвращает Возвращает хеш пути картинки для публикации новости до директории для файлового менеджера
		 * @param iUmiHierarchyElement $newsItem
		 * @return string|null
		 */
		public function getNewsItemPhotoPathHash(iUmiHierarchyElement $newsItem) {
			/** @var iUmiImageFile $photo */
			$photo = $newsItem->getValue('publish_pic');
			return ($photo instanceof iUmiImageFile) ? $photo->getPathHash() : '';
		}

		/**
		 * Делает редирект на указанный адрес
		 * @param string $url
		 */
		public function redirect($url) {
			Service::Response()
				->getCurrentBuffer()
				->redirect($url);
		}

		/**
		 * Возвращает сообщение с датой заказа для вкладки "Личный кабинет->Заказы"
		 * @param array $order данные заказа
		 *
		 * [
		 *     'number' => int,          // номер заказа
		 *     'creation_date' => string // дата создания заказа
		 * ]
		 *
		 * @return string
		 * @example № 8 от 19.01.2016
		 */
		public function getOrderDateMessage(array $order) {
			if (!isset($order['number'], $order['creation_date'])) {
				return '';
			}

			return implode(' ', [
				$this->getTemplateEngine()->translate('number_sign'),
				$order['number'],
				$this->getTemplateEngine()->translate('order_date_from'),
				$order['creation_date'],
			]);
		}

		/**
		 * Возвращает сообщение со статусом заказа для вкладки "Личный кабинет->Заказы"
		 * @param array $order данные заказа
		 *
		 * [
		 *     'status_name' => string,       // название статуса
		 *     'status_change_date' => string // дата изменения статуса
		 * ]
		 *
		 * @return string
		 * @example Ожидает проверки с 19.01.2016
		 */
		public function getOrderStatusMessage(array $order) {
			if (!isset($order['status_name'], $order['status_change_date'])) {
				return '';
			}

			return implode(' ', [
				$order['status_name'],
				$this->getTemplateEngine()->translate('order_status_date_from'),
				$order['status_change_date'],
			]);
		}

		/**
		 * Возвращает ссылку на товар товарного наименования для вкладки "Личный кабинет->Заказы"
		 * @param array $orderItem данные товарного наименования
		 *
		 * [
		 *     'element_id' => int // идентификатор страницы (товара)
		 * ]
		 *
		 * @return string
		 */
		public function getOrderItemProductUrl(array $orderItem) {
			$preLang = $this->getTemplateEngine()->getCommonVar('pre_lang');
			$umiHierarchy = umiHierarchy::getInstance();
			return $preLang . $umiHierarchy->getPathById($orderItem['element_id']);
		}

		/**
		 * Возвращает информацию о заказе для вкладки "Личный кабинет->Заказы"
		 * @param array $variables данные заказа
		 *
		 * [
		 *     'id' => int,           // идентификатор заказа
		 *     'name' => string,      // название заказа (Заказ #1)
		 *     'type-id' => int,      // идентификатор типа данных заказа
		 *     'type-guid' => string, // гуид типа данных заказа
		 *     'ownerId' => int,      // идентификатор владельца заказа
		 * ]
		 *
		 * @return array
		 *
		 * Результат работы макроса emarket::order()
		 *
		 * +
		 *
		 * [
		 *     'creation_date' => string,      // дата создания заказа
		 *     'status_change_date' => string, // дата изменения статуса заказа
		 *     'payment_name' => string,       // название способа оплаты
		 *     'status_name' => string,        // название статус заказа
		 *     'number' => string,             // номер заказа
		 * ]
		 * @throws Exception
		 */
		public function getOrderInfo(array $variables) {
			$order = $this->getObjectById($variables['id']);
			$orderInfo = $this->macros('emarket', 'order', [$variables['id']]);
			$orderInfo = array_merge($orderInfo, [
				'creation_date' => '',
				'status_change_date' => '',
				'payment_name' => '',
				'status_name' => '',
			]);

			$orderDate = $order->getValue('order_date');

			if ($orderDate instanceof umiDate) {
				$orderInfo['creation_date'] = $orderDate->getFormattedDate('d.m.Y');
			}

			$statusDate = $order->getValue('status_change_date');

			if ($statusDate instanceof umiDate) {
				$orderInfo['status_change_date'] = $statusDate->getFormattedDate('d.m.Y');
			}

			$payment = $this->getObjectById($order->getValue('payment_id'));

			if ($payment instanceof iUmiObject) {
				$orderInfo['payment_name'] = $this->escape($payment->getName());
			}

			$status = isset($orderInfo['status']) ? $orderInfo['status'] : null;

			if ($status instanceof iUmiObject) {
				$orderInfo['status_name'] = $this->escape($status->getName());
			}

			$orderInfo['number'] = isset($orderInfo['number']) ? $orderInfo['number'] : '';

			return $orderInfo;
		}

		/**
		 * Возвращает css-класс для поля формы, в зависимости от того, является ли оно обязательным
		 * @param array $field данные поля
		 *
		 * [
		 *    'required' => bool // является ли поле обязательным для заполнения
		 * ]
		 *
		 * @return string
		 */
		public function getFormFieldClass($field) {
			$important = isset($field['required']) ? 'important' : '';
			return $important ? $important . ' ' . $field['name'] : $field['name'];
		}

		/**
		 * Возвращает данные для шаблона входа на сайт
		 * @param array $variables глобальные переменные запроса
		 *
		 * [
		 *    'demo' => mixed  // работает ли система в режиме демо центра
		 * ]
		 *
		 * @return array
		 *
		 * [
		 *    'login' => string,         // логин
		 *    'password' => string,      // пароль
		 *    'action' => string,        // action для формы логина пользователя
		 *    'register_link' => string, // адрес страницы с формой регистрации пользователя
		 * ]
		 *
		 */
		public function getLoginParams(array $variables) {
			$langPrefix = $this->getTemplateEngine()->getCommonVar('pre_lang');
			$login = '';
			$password = '';

			if (isset($variables['demo'])) {
				$login = 'demo';
				$password = 'demo';
			}

			return [
				'login' => $login,
				'password' => $password,
				'register_link' => "{$langPrefix}/users/registrate/",
			];
		}

		/**
		 * Перенаправляет в личный кабинет, если пользователь авторизован
		 * @throws Exception
		 */
		public function redirectLoggedInUserToUserSettings() {
			// Побочный эффект от вызова
			$this->macros('users', 'registrate');
		}

		/**
		 * Возвращает ссылку на страницу регистрации
		 * @return string
		 */
		public function getRegistrationLink() {
			return $this->getTemplateEngine()->getCommonVar('pre_lang') . '/users/registrate/';
		}

		/**
		 * Возвращает ссылку на страницу восстановления пароля
		 * @return string
		 */
		public function getPasswordRestoreLink() {
			return $this->getTemplateEngine()->getCommonVar('pre_lang') . '/users/forget/';
		}

		/**
		 * Возвращает полное имя автора по его ID
		 * @param int $id идентификатор автора
		 * @return string
		 * @throws Exception
		 */
		public function getFullAuthorName($id) {
			$author = $this->macros('users', 'viewAuthor', [$id]);
			$author = is_array($author) ? $author : [];
			$firstName = isset($author['fname']) ? $author['fname'] : '';
			$lastName = isset($author['lname']) ? $author['lname'] : '';

			if ($firstName || $lastName) {
				return trim(implode(' ', [$firstName, $lastName]));
			}

			return isset($author['nickname']) ? $author['nickname'] : '';
		}

		/**
		 * Возвращает ссылку на страницу с сообщением об успешно отправленной форме
		 * @param int $formId идентификатор отправленной формы
		 * @return string
		 */
		public function getWebformSuccessUrl($formId) {
			$langPrefix = $this->getTemplateEngine()->getCommonVar('pre_lang');
			return "{$langPrefix}/webforms/posted/{$formId}";
		}

		/**
		 * Возвращает путь до главной страницы сайта
		 * @return string
		 */
		public function getHomePageUrl() {
			return $this->getTemplateEngine()->getCommonVar('pre_lang') . '/';
		}

		/**
		 * Возвращает сообщение "Добрый день %Username%"
		 * @param array $variables глобальные переменные запроса
		 *
		 * [
		 *   'user' => [
		 *        'login' => string // логин текущего пользователя
		 *    ]
		 * ]
		 *
		 * @return string
		 */
		public function getWelcomeMessage(array $variables) {
			$welcome = $this->getTemplateEngine()->translate('welcome');
			return implode(' ', [
				$welcome,
				$variables['user']['login'],
			]);
		}

		/**
		 * Можно ли показать текущему пользователю ссылку в админку
		 * @param array $variables глобальные переменные запроса
		 *
		 * [
		 *   'user' => [
		 *        'type' => string // строковой идентификатор типа текущей пользователя
		 *    ]
		 * ]
		 *
		 * @return bool
		 */
		public function canShowAdminLink(array $variables) {
			return in_array($variables['user']['type'], ['admin', 'sv']);
		}

		/**
		 * Возвращает ссылку на административную панель
		 * @return string
		 */
		public function getAdminLink() {
			return $this->getTemplateEngine()->getCommonVar('pre_lang') . '/admin/';
		}

		/**
		 * Возвращает ссылку в личный кабинет пользователя
		 * @return string
		 */
		public function getPersonalLink() {
			return $this->getTemplateEngine()->getCommonVar('pre_lang') . '/emarket/personal/';
		}

		/**
		 * Возвращает ссылку на деавторизацию
		 * @return string
		 */
		public function getLogoutLink() {
			return $this->getTemplateEngine()->getCommonVar('pre_lang') . '/users/logout/';
		}

		/**
		 * Возвращает ссылку страницу сравнения товаров
		 * @return string
		 */
		public function getComparisonLink() {
			return $this->getTemplateEngine()->getCommonVar('pre_lang') . '/emarket/compare/';
		}

		/**
		 * Возвращает количество товаров для сравнения
		 * @return int
		 * @throws Exception
		 */
		public function getComparisonProductCount() {
			$elements = $this->macros('emarket', 'getCompareElements');
			$count = is_array($elements) ? umiCount($elements) : 0;
			if ($count > self::MAX_PRODUCT_COUNT_FOR_COMPARISON) {
				$count = self::MAX_PRODUCT_COUNT_FOR_COMPARISON;
			}
			return $count;
		}

		/**
		 * Возвращает список товаров для сравнения
		 * @param array $variables результат работы макроса emarket::compare().
		 *
		 * [
		 *    'headers' => [            // список данных для формирования заголовка таблицы сравнения
		 *        0 => [
		 *            'id' => int       // id страницы
		 *            'link' => string  // адрес (ссылка) страницы
		 *            'title' => string // имя страницы
		 *        ]
		 *    ]
		 * ]
		 *
		 * @return iUmiHierarchyElement[]
		 */
		public function getProductsForComparison(array $variables) {
			$headerList = isset($variables['headers']) ? $variables['headers'] : [];
			$productList = [];

			/** @var array $headerList */
			foreach ($headerList as $header) {
				$productId = isset($header['id']) ? $header['id'] : '';
				$product = $this->getPageById($productId);

				if ($product instanceof iUmiHierarchyElement) {
					$productList[] = $product;
				}
			}

			return array_slice($productList, 0, self::MAX_PRODUCT_COUNT_FOR_COMPARISON);
		}

		/**
		 * Определяет есть ли товары для сравнения
		 * @param array $result результат работы макроса emarket::compare().
		 *
		 * [
		 *    'fields' => [
		 *        0 => []
		 *    ]
		 * ]
		 *
		 * @return bool
		 */
		public function canCompare($result) {
			return is_array($result) && isset($result['fields'][0]);
		}

		/**
		 * Фильтрует список полей по поддерживаемым типам полей.
		 * @see DemomarketPhpExtension::isAllowedDataType().
		 * @param array $fieldDataList список полей
		 *
		 * [
		 *    'type' => string // строковой идентификатор типа поля
		 * ]
		 *
		 * @return array Возвращает список полей, тип которых поддерживается.
		 * Структура данных сохраняется.
		 */
		public function filterAllowedFieldData(array $fieldDataList) {
			$result = [];

			foreach ($fieldDataList as $fieldData) {
				$type = isset($fieldData['type']) ? $fieldData['type'] : '';

				if ($this->isAllowedDataType($type)) {
					$result[] = $fieldData;
				}
			}

			return $result;
		}

		/**
		 * Возвращает один ряд значений сравниваемых свойств на странице сравнения товаров
		 * @param array $fieldData свойства поля
		 *
		 *    [
		 *        'title' => string // наименование поля
		 *        'name' => string  // строковый идентификатор поля
		 *        'values' => [
		 *            0 => [
		 *                'value' => iUmiObjectProperty // значение поля одного сравниваемого товара
		 *            ]
		 *            1 => [
		 *                'value' => iUmiObjectProperty // значение поля другого сравниваемого товара
		 *            ]
		 *        ]
		 *    ]
		 *
		 * @return string[]
		 * @throws Exception
		 */
		public function getComparedValueList(array $fieldData) {
			$fieldData['values'] = isset($fieldData['values']) ? $fieldData['values'] : null;
			$valueDataList = is_array($fieldData['values']) ? $fieldData['values'] : [];
			$row = [];

			foreach ($valueDataList as $valueData) {
				$property = null;
				$valueData['value'] = isset($valueData['value']) ? $valueData['value'] : null;
				if ($valueData['value'] instanceof iUmiObjectProperty) {
					$property = $valueData['value'];
				}

				$propertyData = $this->getPropertyData($property);

				if (isset($valueData['id'])) {
					$row[$valueData['id']] = $propertyData['value'];
				}
			}

			return array_slice($row, 0, self::MAX_PRODUCT_COUNT_FOR_COMPARISON, true);
		}

		/**
		 * Определяет может ли текущий пользователь добавить новый пост в блог
		 * @param array $variables данные страницы
		 *
		 * [
		 *    'pageId' => int // id страницы
		 * ]
		 *
		 * @return bool
		 * @throws Exception
		 */
		public function canAddNewBlogPost(array $variables) {
			$user = $this->getTemplateEngine()->getCommonVar('user');

			if ($user['type'] === 'sv') {
				return true;
			}

			$ownerId = $this->getBlogOwnerId($variables);
			return $user['id'] == $ownerId;
		}

		/**
		 * Выводит поле с капчей
		 * @return string
		 * @throws Exception
		 */
		public function renderCaptcha() {
			return $this->getTemplateEngine()->render(
				$this->macros('system', 'captcha'),
				'library/captcha'
			);
		}

		/**
		 * Выводит action для формы добавления нового поста блога
		 * @param array $variables данные страницы
		 *
		 * [
		 *    'pageId' => int // id страницы
		 * ]
		 *
		 * @return string
		 */
		public function getNewBlogPostFormAction(array $variables) {
			$pageId = isset($variables['pageId']) ? $variables['pageId'] : '';
			return $this->getTemplateEngine()->getCommonVar('pre_lang') . "/blogs20/postAdd/{$pageId}/";
		}

		/**
		 * Возвращает контент поста блога
		 * @param array $variables данные страницы
		 *
		 * [
		 *    'pageId' => int // id страницы
		 * ]
		 *
		 * @return string
		 * @throws Exception
		 */
		public function getPostContent(array $variables) {
			$pageId = isset($variables['pageId']) ? $variables['pageId'] : '';
			$postData = $this->macros('blogs20', 'postView', [$pageId]);

			if (isset($postData['content'])) {
				return $postData['content'];
			}

			$page = $this->getPageById($pageId);

			if ($page instanceof iUmiHierarchyElement) {
				return $page->getValue('content');
			}

			return '';
		}

		/**
		 * Выводит блок с комментариями
		 * @param array $variables данные страницы
		 *
		 * [
		 *    'pageId' => int // id страницы
		 * ]
		 *
		 * @return string
		 * @throws Exception
		 */
		public function renderComments(array $variables) {
			if (!$this->isCommentsModuleExists()) {
				return '';
			}

			$pageId = isset($variables['pageId']) ? $variables['pageId'] : '';
			return $this->getTemplateEngine()->render(
				$this->macros('comments', 'insert', [$pageId]),
				'comments/insert'
			);
		}

		/**
		 * Возвращает форматированную дату публикации страницы
		 * @param iUmiHierarchyElement|array $page страница или ее данные
		 *
		 * [
		 *    'publish_time' => int // дата публикации
		 * ]
		 *
		 * @return string
		 */
		public function getFormattedPublishTime($page) {
			if ($page instanceof iUmiHierarchyElement) {
				$date = $page->getValue('publish_time');
			} else {
				$date = isset($page['publish_time']) ? $page['publish_time'] : 0;
			}

			$timeStamp = ($date instanceof umiDate) ? $date->getDateTimeStamp() : $date;
			return date('d.m.Y H:i', $timeStamp);
		}

		/**
		 * Возвращает css-класс для кнопки добавления товара в корзину:
		 * Если кнопка неактивна, добавляется css-класс.
		 * @param iUmiHierarchyElement $product товар
		 * @return string
		 * @throws ErrorException
		 * @throws ReflectionException
		 * @throws databaseException
		 * @throws expectElementException
		 * @throws publicException
		 */
		public function getAddToCartButtonClass(iUmiHierarchyElement $product) {
			$isInStock = $this->isCheckStock() && !$this->isInStock($product);
			return $isInStock || $this->isInCart($product) ? 'not_buy' : '';
		}

		/**
		 * Возвращает текст для кнопки добавления товара в корзину
		 * @param iUmiHierarchyElement $product товар
		 * @return string
		 * @throws expectElementException
		 * @throws publicException
		 */
		public function getAddToCartButtonMessage(iUmiHierarchyElement $product) {
			if ($this->isInCart($product)) {
				return $this->getTemplateEngine()->translate('already_in_cart');
			}
			return $this->getTemplateEngine()->translate('purchase');
		}

		/**
		 * Возвращает css-класс для кнопки добавления товара в корзину:
		 * Если кнопка неактивна, добавляется css-класс.
		 * @param iUmiHierarchyElement $product товар
		 * @return string
		 * @throws ErrorException
		 * @throws ReflectionException
		 * @throws databaseException
		 * @throws expectElementException
		 * @throws publicException
		 */
		public function getBuyOneClickButtonClass(iUmiHierarchyElement $product) {
			return !$this->isCheckStock() || $this->isInStock($product) ? '' : 'not_buy';
		}

		/**
		 * Возвращает значение чекбокса "Включить комментарии к товарам"
		 * настроек сайта
		 * @return bool
		 * @throws publicException
		 */
		public function isShowCommentsOnProductPage() {
			return (bool) $this->getSettingsValue('is_show_product_comments') && $this->isCommentsModuleExists();
		}

		/**
		 * Возвращает значение чекбокса "Включить рейтинг товара"
		 * настроек сайта
		 * @return bool
		 * @throws publicException
		 */
		public function isShowRatingOnProductPage() {
			return (bool) $this->getSettingsValue('is_show_product_rating');
		}

		/**
		 * Определяет нужно ли показывать пагинацию на странице
		 * @param array $variables данные шаблона пагинации
		 *
		 * [
		 *    'total' => int,     // количество элементов
		 *    'per_page' => int,  // количество элементов на одну страницу
		 * ]
		 *
		 * @return bool
		 */
		public function canShowPagination(array $variables) {
			return
				isset($variables['total']) &&
				isset($variables['per_page']) &&
				$variables['total'] > $variables['per_page'];
		}

		/**
		 * Делает редирект на предыдущую страницу
		 */
		public function redirectBack() {
			Service::Response()
				->getCurrentBuffer()
				->redirect(getServer('HTTP_REFERER'));
		}

		/**
		 * Возвращает значение поля объекта настроек
		 * @param string $name идентификатор поля
		 * @return false|mixed
		 * @throws publicException
		 */
		public function getSettingsValue($name) {
			return $this->requestSettingsContainer()
				->getValue($name);
		}

		/**
		 * Возвращает объект настроек сайта из кеша
		 * @return iUmiObject|bool
		 */
		public function getSettingsContainer() {
			return $this->getTemplateEngine()
				->getCommonVar('settings_container');
		}

		/**
		 * Запрашивает актуальный объект настроек и возвращает его
		 * @return bool|iUmiObject
		 * @throws publicException
		 */
		public function requestSettingsContainer() {
			/** @var umiSettings|UmiSettingsMacros $module */
			$module = cmsController::getInstance()
				->getModule('umiSettings');
			$id = $module->getIdByCustomId('demomarket');
			return umiObjectsCollection::getInstance()
				->getObject($id);
		}

		/**
		 * Возвращает action для формы оплаты заказа бонусами
		 * @return string
		 */
		public function getBonusPaymentAction() {
			return $this->getCurrentPath() . '/do/';
		}

		/**
		 * Возвращает action для формы применения промокода
		 * @return string
		 */
		public function getPromoCodeAction() {
			return $this->getTemplateEngine()->getCommonVar('pre_lang') . '/emarket/savePromoCode/';
		}

		/**
		 * Определяет оформился ли заказ
		 * @param array $variables данные макроса оформления заказа
		 *
		 * [
		 *    'purchasing' => [
		 *        'order_id' => int // идентификатор заказа
		 *    ]
		 * ]
		 * @return bool
		 */
		public function orderWasPlaced(array $variables) {
			return isset($variables['purchasing']['order_id']);
		}

		/**
		 * Возвращает объект оформленного заказа
		 * @param array $variables данные макроса оформления заказа
		 *
		 * [
		 *    'purchasing' => [
		 *        'order_id' => int // идентификатор заказа
		 *    ]
		 * ]
		 *
		 * @return iUmiObject|bool
		 */
		public function getPlacedOrder(array $variables) {
			$orderId = isset($variables['purchasing']['order_id']) ? $variables['purchasing']['order_id'] : '';
			return $this->getObjectById($orderId);
		}

		/**
		 * Включена ли на сайте Google ReCaptcha
		 * @return bool
		 */
		public function isRecaptchaEnabled() {
			return umiCaptcha::isRecaptcha();
		}

		/**
		 * Возвращает url скрипта recaptcha
		 * @param array $variables описание страницы
		 *
		 * [
		 *    'lang' => string // код языка
		 * ]
		 *
		 * @return string
		 */
		public function getRecaptchaUrl(array $variables) {
			$lang = isset($variables['lang']) ? $variables['lang'] : 'ru';
			return "https://www.google.com/recaptcha/api.js?onload=CaptchaCallback&render=explicit&hl={$lang}";
		}

		/**
		 * Возвращает параметр sitekey для recaptcha
		 * @return string
		 */
		public function getRecaptchaSiteKey() {
			if (!$this->isRecaptchaEnabled()) {
				return '';
			}

			/** @var GoogleRecaptcha $recaptcha */
			$recaptcha = umiCaptcha::getStrategy();
			return $recaptcha->getSitekey();
		}

		/**
		 * Возвращает redirect url для скрипта ulogin.js
		 * @return string
		 * @throws coreException
		 */
		public function getULoginRedirectUrl() {
			$langPrefix = $this->getTemplateEngine()->getCommonVar('pre_lang');
			return urlencode(Service::DomainDetector()->detectUrl() . "$langPrefix/users/ulogin/");
		}

		/**
		 * Возвращает данные баннера на главной странице
		 * @return array
		 *
		 * [
		 *    'id' => int,                  // id
		 *    'name' => string,             // имя
		 *    'width' => int,               // ширина изображения
		 *    'height' => int,              // высота изображения
		 *    'alt' => string,              // alt изображения
		 *    'image' => string,            // путь до изображения
		 *    'url' => string,              // ссылка
		 *    'target' => string,           // target для ссылки
		 *    'show_till_date' => string,   // дата окончания показа баннера
		 * ]
		 * @throws Exception
		 */
		public function getBanner() {
			if (!$this->isModuleExists('banners')) {
				return [];
			}

			$placeName = 'homepage';
			$data = $this->macros('banners', 'fastInsert', [$placeName]);
			$data = is_array($data) ? $data : [];

			$bannerId = isset($data['id']) ? $data['id'] : '';
			$banner = $this->getObjectById($bannerId);

			$result = [
				'id' => $bannerId,
				'name' => '',
				'width' => '',
				'height' => '',
				'alt' => '',
				'image' => '',
				'url' => '',
				'target' => '',
				'show_till_date' => '',
			];

			$timeStamp = 0;

			if ($banner instanceof iUmiObject) {
				$result['name'] = $banner->getName();
				$date = $banner->getValue('show_till_date');
				$timeStamp = ($date instanceof umiDate) ? $date->getDateTimeStamp() : $date;
			}

			$result['show_till_date'] = date('d.m.Y', $timeStamp);
			$result['width'] = isset($data['banner']['width']) ? $data['banner']['width'] : '';
			$result['height'] = isset($data['banner']['height']) ? $data['banner']['height'] : '';
			$result['alt'] = isset($data['banner']['alt']) ? $data['banner']['alt'] : '';
			$result['image'] = isset($data['banner']['source']) ? $data['banner']['source'] : '';
			$result['url'] = isset($data['banner']['href']) ? $data['banner']['href'] : '';
			$result['target'] = isset($data['banner']['target']) ? $data['banner']['target'] : '';
			return $result;
		}

		/**
		 * Определяет существует ли модуль "Опросы"
		 * @return bool
		 */
		public function isVoteModuleExists() {
			return (bool) $this->isModuleExists('vote');
		}

		/**
		 * Определяет существует ли модуль "Рассылки"
		 * @return bool
		 */
		public function isDispatchesModuleExists() {
			return (bool) $this->isModuleExists('dispatches');
		}

		/**
		 * Определяет существует ли модуль "Push уведомления"
		 * @return bool
		 */
		public function isPushNotificationModuleExists() {
			return (bool) $this->isModuleExists('umiPushNotification');
		}

		/**
		 * Определяет существует ли модуль "Конструктор форм"
		 * @return bool
		 */
		public function isWebformsModuleExists() {
			return (bool) $this->isModuleExists('webforms');
		}

		/**
		 * Определяет существует ли модуль "Комментарии"
		 * @return bool
		 */
		public function isCommentsModuleExists() {
			return (bool) $this->isModuleExists('comments');
		}
		
		/**
		 * Определяет существует ли модуль
		 * @param string $name имя модуля
		 * @return bool
		 */
		public function isModuleExists($name) {
			return (bool) cmsController::getInstance()->isModule($name);
		}

		/**
		 * Возвращает строку с ценой опционного свойства
		 * @param array $option значение опционного свойства
		 *
		 * [
		 *    'float' => float // значения поля "число с точкой" опции
		 * ]
		 *
		 * @return string
		 */
		public function getFormattedOptionPrice(array $option) {
			$cart = $this->getTemplateEngine()->getCommonVar('cart');
			$prefix = isset($cart['summary']['price']['prefix']) ? $cart['summary']['price']['prefix'] : '';
			$price = isset($option['float']) ? $option['float'] : '';
			$suffix = isset($cart['summary']['price']['suffix']) ? $cart['summary']['price']['suffix'] : '';

			return implode(' ', [
				'+',
				$prefix,
				$price,
				$suffix,
			]);
		}

		/**
		 * Возвращает action для формы выбора способа доставки
		 * @return string
		 */
		public function getDeliveryChooseUrl() {
			return $this->getTemplateEngine()->getCommonVar('pre_lang') . '/emarket/purchase/delivery/choose/do/';
		}

		/**
		 * Определяет является ли способ переданной доставки способом ApiShip
		 * @param array $delivery описание доставки
		 *
		 * [
		 *    'type-class-name' => string // строковой идентификатор типа доставки
		 * ]
		 *
		 * @return bool
		 */
		public function isApiShipDelivery(array $delivery) {
			return isset($delivery['type-class-name']) && $delivery['type-class-name'] === 'ApiShip';
		}

		/**
		 * Возвращает строку с ценой способа доставки
		 * @param array $delivery описание доставки
		 *
		 * [
		 *    'price' => float // стоимость доставки
		 * ]
		 *
		 * @return string
		 * @throws Exception
		 */
		public function getFormattedDeliveryPrice(array $delivery) {
			$price = isset($delivery['price']) ? $delivery['price'] : 0;

			if (is_numeric($price)) {
				$price = $this->macros('emarket', 'applyPriceCurrency', [$price]);
			}

			return $this->getTemplateEngine()->render(
				$price,
				'emarket/price'
			);
		}

		/**
		 * Возвращает статус радиокнопки по активности элемента
		 * @param array $item описание кнопки
		 *
		 * [
		 *    'active' => string // активна (выбрана) ли кнопка
		 * ]
		 *
		 * @return string
		 */
		public function getRadioStatusByActivity(array $item) {
			if (cmsController::getInstance()->getCurrentMethod() == 'purchasing_one_step') {
				return '';
			}

			if (array_key_exists('active', $item)) {
				return (isset($item['active']) && $item['active'] === 'active') ? 'checked' : '';
			}

			if (array_key_exists('checked', $item)) {
				return (isset($item['checked']) && $item['checked'] === 'checked') ? 'checked' : '';
			}

			return '';
		}

		/**
		 * Возвращает action для формы оформления заказа в один шаг
		 * @return string
		 */
		public function getPurchasingOneStepUrl() {
			return $this->getTemplateEngine()->getCommonVar('pre_lang') . '/emarket/saveInfo/';
		}

		/**
		 * Возвращает путь до шаблона текущего шага оформления заказа
		 * @param array $purchase данные макроса оформления заказа
		 *
		 * [
		 *    'purchasing' => [
		 *          'stage' => string, // название этапа оформления заказа
		 *          'step' => string,  // название шага оформления заказа
		 *     ]
		 * ]
		 *
		 * @return string
		 */
		public function getPurchaseTemplate(array $purchase) {
			return implode('/', [
				'emarket',
				$purchase['purchasing']['stage'],
				$purchase['purchasing']['step']
			]);
		}

		/**
		 * Возвращает action для шага оформления заказа "Личная информация"
		 * @return string
		 */
		public function getPersonalFormUrl() {
			return $this->getTemplateEngine()->getCommonVar('pre_lang') . '/emarket/purchase/required/personal/do/';
		}

		/**
		 * Возвращает action для шага оформления заказа "Адрес доставки"
		 * @return string
		 */
		public function getDeliveryAddressFormUrl() {
			return $this->getTemplateEngine()->getCommonVar('pre_lang') . '/emarket/purchase/delivery/address/do/';
		}

		/**
		 * Возвращает сообщение об ошибке
		 * @param mixed $error
		 * @return string
		 */
		public function getErrorMessage($error) {
			if (is_array($error)) {
				return isset($error['message']) ? (string) $error['message'] : '';
			}

			return (string) $error;
		}

		/**
		 * Возвращает action для формы добавления комментария к посту блога
		 * @param array $variables глобальные переменные запроса
		 *
		 * [
		 *    'pageId' => идентификатор блога
		 * ]
		 *
		 * @return string
		 */
		public function getNewBlogCommentUrl(array $variables) {
			$pageId = isset($variables['pageId']) ? $variables['pageId'] : '';
			return $this->getTemplateEngine()->getCommonVar('pre_lang') . "/blogs20/commentAdd/{$pageId}/";
		}

		/**
		 * Возвращает атрибут поля для фильтрации
		 * @param array $data данные поля
		 * @param string $attribute имя атрибута
		 * @return string
		 */
		public function getFilterFieldAttribute(array $data, $attribute) {
			return isset($data[$attribute]) ? $data[$attribute] : 'undefined';
		}

		/**
		 * Определяет нужно ли для поля фильтрации выводить чекбокс
		 * @param array $variables описание поля
		 *
		 * [
		 *    'data-type' => string // строковый идентификатор типа поля
		 * ]
		 *
		 * @return bool
		 */
		public function isCheckboxFilterField(array $variables) {
			$dataType = $this->getFilterFieldAttribute($variables, 'data-type');
			return in_array($dataType, [
				'string',
				'color',
				'password',
				'optioned',
				'tags',
				'symlink',
				'text',
				'wysiwyg',
				'relation',
			]);
		}

		/**
		 * Определяет нужно ли для поля фильтрации выводить радиокнопку
		 * @param array $variables описание поля
		 *
		 * [
		 *    'data-type' => string // строковый идентификатор типа поля
		 * ]
		 *
		 * @return bool
		 */
		public function isRadioFilterField(array $variables) {
			$dataType = $this->getFilterFieldAttribute($variables, 'data-type');
			return in_array($dataType, [
				'boolean',
				'file',
				'img_file',
				'swf_file',
				'video_file',
			]);
		}

		/**
		 * Определяет нужно ли для поля фильтрации выводить интервал значений
		 * @param array $variables описание поля
		 *
		 * [
		 *    'data-type' => string // строковый идентификатор типа поля
		 * ]
		 *
		 * @return bool
		 */
		public function isIntervalFilterField(array $variables) {
			$dataType = $this->getFilterFieldAttribute($variables, 'data-type');
			return in_array($dataType, [
				'date',
				'int',
				'price',
				'float',
				'counter',
			]);
		}

		/**
		 * Возвращает данные для отдельной опции поля фильтрации с чекбоксом
		 * @param array $variables описание значений булевого поля
		 *
		 * [
		 *    0 => string, // имя поля
		 *    1 => string, // индекс
		 *    2 => string, // значения поля
		 * ]
		 *
		 * @return array
		 *
		 * [
		 *    'id' => string    // идентификатор поля для шаблона
		 *    'name' => string  // пример вызова фильтра
		 *    'value' => string // значение поля
		 * ]
		 */
		public function getCheckboxFilterFieldData(array $variables) {
			list($fieldName, $index, $option) = $variables;
			return [
				'id' => "{$fieldName}_{$index}",
				'name' => "filter[{$fieldName}][{$index}]",
				'value' => isset($option['value']) ? $option['value'] : 'undefined',
			];
		}

		/**
		 * Возвращает данные для поля фильтрации со слайдером
		 * @param array $variables описание значений числового поля
		 *
		 * [
		 *   'title' => string,     // наименование поля
		 *   'name' => string,      // строковой идентификатор поля
		 *   'minimum' => [
		 *       'value' => int     // минимальное значение поля
		 *       'selected' => int  // минимальное выбранное значение поля
		 *    ]
		 *   'maximum' => [
		 *       'value' => int     // максимальное значение поля
		 *       'selected' => int  // максимальное выбранное значение поля
		 *    ]
		 *    'item' => [
		 *       'value' => int     // единственное значение
		 *    ]
		 * ]
		 *
		 * @return array
		 *
		 * [
		 *   'title' => string,                      // имя поля
		 *   'name_from' => "filter[@title][from]",  // пример вызова фильтра для фильтрации "от"
		 *   'name_to' => "filter[@title]][to]",     // пример вызова фильтра для фильтрации "до"
		 *   'selected_min' => int,                  // выбранная минимальная дата
		 *   'selected_max' => int,                  // выбранная максимальная дата
		 *   'min' => int,                           // минимальная дата
		 *   'max' => int,                           // максимальная дата
		 * ]
		 */
		public function getSliderFilterFieldData(array $variables) {
			$fieldTitle = $this->getFilterFieldAttribute($variables, 'title');
			$fieldName = $this->getFilterFieldAttribute($variables, 'name');
			$min = $max = $selectedMin = $selectedMax = 0;

			switch (true) {
				case (isset($variables['minimum']) && isset($variables['maximum'])): {
					$minData = $variables['minimum'];
					$maxData = $variables['maximum'];

					$min = isset($minData['value']) ? $minData['value'] : 0;
					$max = isset($maxData['value']) ? $maxData['value'] : 0;
					$selectedMin = isset($minData['selected']) ? $minData['selected'] : $min;
					$selectedMax = isset($maxData['selected']) ? $maxData['selected'] : $max;
					break;
				}

				case (isset($variables['item'])): {
					$item = $variables['item'];
					$oneValue = isset($item['value']) ? $item['value'] : 0;
					$min = $max = $selectedMin = $selectedMax = $oneValue;
					break;
				}
			}

			return [
				'title' => $fieldTitle,
				'name_from' => "filter[{$fieldName}][from]",
				'name_to' => "filter[{$fieldName}][to]",
				'selected_min' => $selectedMin,
				'selected_max' => $selectedMax,
				'min' => $min,
				'max' => $max,
			];
		}

		/**
		 * Возвращает данные для поля фильтрации типа "Дата".
		 * Меняет таймстампы на дату в формате m.d.y.
		 * @param array $variables описание значений поля типа "дата"
		 *
		 * [
		 *   'title' => string,     // наименование поля
		 *   'name' => string,      // строковой идентификатор поля
		 *   'minimum' => [
		 *       'value' => int     // минимальное значение поля
		 *       'selected' => int  // минимальное выбранное значение поля
		 *    ]
		 *   'maximum' => [
		 *       'value' => int     // максимальное значение поля
		 *       'selected' => int  // максимальное выбранное значение поля
		 *    ]
		 *    'item' => [
		 *       'value' => int     // единственное значение
		 *    ]
		 * ]
		 *
		 * @return array
		 *
		 * [
		 *   'selected_min' => string, // выбранная минимальная дата
		 *   'min' => string,          // минимальная дата
		 *   'selected_max' => string, // выбранная максимальная дата
		 *   'max' => string,          // максимальная дата
		 * ]
		 */
		public function getDateFilterFieldData(array $variables) {
			$data = $this->getSliderFilterFieldData($variables);
			$format = 'm.d.y';

			$selectedMinDate = new umiDate($data['selected_min']);
			$data['selected_min'] = $selectedMinDate->getFormattedDate($format);

			$minDate = new umiDate($data['min']);
			$data['min'] = $minDate->getFormattedDate($format);

			$selectedMaxDate = new umiDate($data['selected_max']);
			$data['selected_max'] = $selectedMaxDate->getFormattedDate($format);

			$maxDate = new umiDate($data['max']);
			$data['max'] = $maxDate->getFormattedDate($format);

			return $data;
		}

		/** Отправляет статус 404 */
		public function send404Status() {
			Service::Response()
				->getCurrentBuffer()
				->status(404);
		}

		/**
		 * Возвращает список полей товара типа "опционное"
		 * @param iUmiHierarchyElement $product товар
		 * @return iUmiField[]
		 * @throws coreException
		 */
		public function getOptionedFieldList(iUmiHierarchyElement $product) {
			$object = $product->getObject();

			if (!$object instanceof iUmiObject) {
				return [];
			}

			$type = $object->getType();

			if (!$type instanceof iUmiObjectType) {
				return [];
			}

			$group = $type->getFieldsGroupByName('catalog_option_props');
			return ($group instanceof iUmiFieldsGroup) ? $group->getFields() : [];
		}

		/**
		 * Выводит рейтинг товара (пять звездочек).
		 * Для переключения режима рейтингования на 5-балльный нужно включить опцию в Настройках модуля "Опросы".
		 *
		 * @param int $productId ID товара
		 * @return string
		 * @throws Exception
		 */
		public function renderProductRating($productId) {
			if (!$this->isVoteModuleExists()) {
				return '';
			}

			$template = null;
			return $this->getTemplateEngine()->render(
				$this->macros('vote', 'getElementRating', [$template, $productId]),
				'vote/element_rating'
			);
		}

		/**
		 * Возвращает путь до картинки "фото временно отсутствует"
		 * @return string
		 */
		public function getNoPhotoPath() {
			return $this->noPhotoPath;
		}

		/**
		 * Является ли текущий пользователь гостем
		 * @return bool
		 */
		public function isGuest() {
			$user = $this->getTemplateEngine()->getCommonVar('user');
			return $user['type'] === 'guest';
		}

		/**
		 * Может ли текущий пользователь добавить комментарий на сайт
		 * @param array $variables результат работы макроса `comment/insert`
		 * @return bool
		 */
		public function canComment(array $variables) {
			return isset($variables['add_form']['action']);
		}

		/**
		 * Возвращает action для формы добавления нового комментария
		 * @param array $variables результат работы макроса `comment/insert`
		 * @return string
		 */
		public function getNewCommentUrl(array $variables) {
			return isset($variables['add_form']['action']) ? $variables['add_form']['action'] : '';
		}

		/**
		 * Возвращает url для отрисовки классической капчи
		 * @param array $variables результат работы макроса `system/captcha`
		 * @return string
		 */
		public function getClassicCaptchaUrl(array $variables) {
			$value = isset($variables['url']['value']) ? $variables['url']['value'] : '';
			$random = isset($variables['url']['random-string']) ? $variables['url']['random-string'] : '';
			$langId = isset($variables['url']['lang_id']) ? $variables['url']['lang_id'] : '';
			return "{$value}{$random}&lang_id={$langId}";
		}

		/**
		 * Возвращает данные для создания формы добавления топика
		 * @param int $conferenceId идентификатор родительской страницы будущего топика
		 * @return array
		 * @throws Exception
		 */
		public function getNewTopic($conferenceId) {
			$data = $this->macros('forum', 'topic_post', [$conferenceId]);
			return is_array($data) ? $data : [];
		}

		/**
		 * Может ли текущий пользователь добавить новый топик форума
		 * @param array $variables результат работы макроса `forum/topic_post`
		 * @return bool
		 */
		public function canAddNewForumTopic(array $variables) {
			return isset($variables['action']);
		}

		/**
		 * Возвращает action для формы добавления нового топика форума
		 * @param array $variables результат работы макроса `forum/topic_post`
		 * @return string
		 */
		public function getNewForumTopicUrl(array $variables) {
			return isset($variables['action']) ? $variables['action'] : '';
		}

		/**
		 * Возвращает данные для создания формы добавления сообщения
		 * @param int $topicId идентификатор родительской страницы будущего сообщения
		 * @return array
		 * @throws Exception
		 */
		public function getNewForumMessage($topicId) {
			$data = $this->macros('forum', 'message_post', [$topicId]);
			return is_array($data) ? $data : [];
		}

		/**
		 * Может ли текущий пользователь добавить новое сообщение в топик форума
		 * @param array $variables результат работы макроса `forum/message_post`
		 * @return bool
		 */
		public function canAddNewForumMessage(array $variables) {
			return isset($variables['action']);
		}

		/**
		 * Возвращает action для формы добавления нового сообщения в топик форума
		 * @param array $variables результат работы макроса `forum/message_post`
		 * @return string
		 */
		public function getNewForumMessageUrl(array $variables) {
			return isset($variables['action']) ? $variables['action'] : '';
		}

		/**
		 * Может ли текущий пользователь добавить новый комментарий в пост блога
		 * @return bool
		 * @throws Exception
		 */
		public function canAddNewBlogComment() {
			return (bool) $this->macros('blogs20', 'checkAllowComments');
		}

		/**
		 * Возвращает url карты сайта
		 * @return string
		 */
		public function getSiteMapUrl() {
			$langPrefix = $this->getTemplateEngine()->getCommonVar('pre_lang');
			return "{$langPrefix}/content/sitemap/";
		}

		/**
		 * Возвращает страницу 404
		 * @return iUmiHierarchyElement|null
		 */
		public function get404Page() {
			$pageList = (array) $this->getSettingsContainer()
				->getValue('not_found_page');
			return getFirstValue($pageList);
		}

		/**
		 * Является ли текущая страница страницей по умолчанию
		 * @param array $variables глобальные переменные запроса
		 *
		 * [
		 *     'is-default' => bool флаг страницы по умолчанию
		 * ]
		 *
		 * @return bool
		 */
		public function isHomePage(array $variables) {
			return (bool) (isset($variables['is-default']) ? $variables['is-default'] : false);
		}

		/**
		 * Является ли текущая страница страницей 404
		 * @param array $variables глобальные переменные запроса
		 *
		 * [
		 *     'page' => iUmiHierarchyElement текущая страница
		 * ]
		 *
		 * @return bool
		 */
		public function is404Page(array $variables) {
			$page = isset($variables['page']) ? $variables['page'] : null;
			$notFoundPage = $this->get404Page();

			if ($page instanceof iUmiHierarchyElement && $notFoundPage instanceof iUmiHierarchyElement) {
				return $page->getId() === $notFoundPage->getId();
			}

			return false;
		}

		/**
		 * Возвращает последние новости
		 * @param int $perPage количество новостей
		 * @return array результат работы макроса news::lastlist()
		 * @throws Exception
		 */
		public function getLastNews($perPage = 2) {
			$ignorePaging = true;
			$rubric = $this->getNewsRootRubric();

			if ($rubric instanceof iUmiHierarchyElement) {
				return $this->getNewsLastList($rubric->getId(), $perPage, $ignorePaging);
			}

			return [];
		}

		/**
		 * Возвращает последние новости на главной странице
		 * @param array|bool $lastVote последний опрос на сайте
		 * @return array
		 * @throws Exception
		 */
		public function getLastNewsForMainPage($lastVote) {
			return $lastVote ? $this->getLastNews(2) : $this->getLastNews(4);
		}

		/**
		 * Возвращает адаптивный класс для блока новостей на главной странице
		 * @param array $lastNews результат работы макроса news::lastlist()
		 * @return string
		 */
		public function getLastNewsAdaptiveClassForMainPage(array $lastNews) {
			return $lastNews['per_page'] == 2  ? 'col-md-6' : 'col-md-12';
		}

		/**
		 * Возвращает список новостей в ленте новостей
		 * @param iUmiHierarchyElement $rubric лента новостей
		 * @return array результат работы макроса news::lastlist()
		 * @throws Exception
		 */
		public function getRubricNews(iUmiHierarchyElement $rubric) {
			$perPage = false;
			$ignorePaging = false;
			return $this->getNewsLastList($rubric->getId(), $perPage, $ignorePaging);
		}

		/**
		 * Обертка над макросом news::lastlist()
		 * @param string|int $path путь до ленты новостей, либо ID ленты новостей
		 * @param int|bool $perPage количество новостей на одной странице
		 * @param bool $ignorePaging игнорировать постраничную навигацию
		 * @return array
		 * @throws Exception
		 */
		private function getNewsLastList($path, $perPage, $ignorePaging) {
			$template = null;
			$data = [];

			try {
				$data = $this->macros('news', 'lastlist', [$path, $template, $perPage, $ignorePaging]);
			} catch (publicException $e) {
				// страница не найдена
			}

			$data = is_array($data) ? $data : [];
			$data['items'] = isset($data['items']) ? $data['items'] : [];
			return $data;
		}

		/**
		 * Возвращает адрес корневой страницы новостей
		 * @return string
		 * @throws coreException
		 */
		public function getNewsLink() {
			$rubric = $this->getNewsRootRubric();
			return ($rubric instanceof iUmiHierarchyElement) ? $this->getPath($rubric) : '';
		}

		/**
		 * Возвращает корневую ленту новостей
		 * @return iUmiHierarchyElement|null
		 */
		public function getNewsRootRubric() {
			$pageList = (array) $this->getSettingsContainer()
				->getValue('news_root_rubric');
			return getFirstValue($pageList);
		}

		/**
		 * Возвращает данные для отрисовки слайдера на главной странице
		 * @return array результат работы макроса umiSliders::getSlidesBySliderName()
		 *
		 * [
		 *     'slider_id' => int идентификатор слайдера
		 *     'slides' => [
		 *         'link' => string ссылка в слайде
		 *         'target' => атрибут target для ссылки
		 *         'image' => string картинка слайда
		 *         'text' => string текст слайда
		 *     ]
		 * ]
		 * @throws Exception
		 */
		public function getSlides() {
			$template = null;
			$sliderCustomId = 'main';

			try {
				$data = $this->macros('umiSliders', 'getSlideListBySliderCustomId', [$template, $sliderCustomId]);
			} catch (publicException $e) {
				$data = [];
			}

			$data = is_array($data) ? $data : [];

			$sliderId = isset($data['id']) ? $data['id'] : '';
			$slideList = isset($data['slides']) ? $data['slides'] : [];

			/** @var array $slideList */
			foreach ($slideList as &$slide) {
				$slide['link'] = isset($slide['link']) ? $slide['link'] : '';
				$openLinkInNewTab = isset($slide['open_in_new_tab']) ? (bool) $slide['open_in_new_tab'] : false;
				$slide['target'] = $openLinkInNewTab ? 'target="_blank"' : '';
				$slide['image'] = isset($slide['image']) ? $slide['image'] : '';
				$slide['text'] = isset($slide['text']) ? $slide['text'] : '';
			}

			return [
				'slider_id' => $sliderId,
				'slides' => $slideList,
			];
		}

		/**
		 * Возвращает css-класс для слайда по его позиции
		 * @param int $index позиция слайда
		 * @return string
		 */
		public function getSlideClassByPosition($index) {
			return ($index === 0) ? 'active' : '';
		}

		/**
		 * Возвращает список топиков в текущей конференции форума
		 * @return array результат работы макроса forum::conf()
		 * @throws Exception
		 */
		public function getTopics() {
			$data = $this->macros('forum', 'conf');
			$data = is_array($data) ? $data : [];
			$data['lines'] = isset($data['lines']) ? $data['lines'] : [];
			return $data;
		}

		/**
		 * Возвращает список комментариев к текущему посту блога
		 * @param array $variables глобальные переменные запроса
		 *
		 * [
		 *     'pageId' => идентификатор текущего поста блога
		 * ]
		 *
		 * @return array результат работы макроса blogs20::commentsList()
		 * @throws Exception
		 */
		public function getBlogPostComments(array $variables) {
			$postId = $variables['pageId'];
			$data = $this->macros('blogs20', 'commentsList', [$postId]);
			$data = is_array($data) ? $data : [];
			$data['items'] = isset($data['items']) ? $data['items'] : [];

			foreach ($data['items'] as &$comment) {
				$comment['cid'] = isset($comment['cid']) ? $comment['cid'] : '';
				$comment['author_id'] = isset($comment['author_id']) ? $comment['author_id'] : '';
				$comment['content'] = isset($comment['content']) ? $comment['content'] : '';
				$comment['publish_time'] = isset($comment['publish_time']) ? $comment['publish_time'] : '';
			}

			return $data;
		}

		/**
		 * Возвращает список постов текущего блога
		 * @param array $variables глобальные переменные запроса
		 *
		 * [
		 *     'pageId' => идентификатор текущего блога
		 * ]
		 *
		 * @return array результат работы макроса blogs20::getPostsList()
		 * @throws Exception
		 */
		public function getBlogPosts(array $variables) {
			$blogId = $variables['pageId'];
			$data = $this->macros('blogs20', 'getPostsList', [$blogId]);
			$data = is_array($data) ? $data : [];
			$data['lines'] = isset($data['lines']) ? $data['lines'] : [];

			foreach ($data['lines'] as &$post) {
				$post['id'] = isset($post['id']) ? $post['id'] : '';
				$post['name'] = isset($post['name']) ? $post['name'] : '';
				$post['cut'] = isset($post['cut']) ? $post['cut'] : '';
				$post['post_link'] = isset($post['post_link']) ? $post['post_link'] : $this->getHomePageUrl();
				$post['comments_count'] = isset($post['comments_count']) ? $post['comments_count'] : 0;
			}

			return $data;
		}

		/**
		 * Возвращает данные последнего сообщения в топике форума
		 * @param array $topic данные топика
		 *
		 * [
		 *     'id' => идентификатор топика
		 * ]
		 *
		 * @return array результат работы макроса forum::topic_last_message()
		 * @throws Exception
		 */
		public function getLastTopicMessage($topic) {
			$topicId = isset($topic['id']) ? $topic['id'] : '';
			$data = $this->macros('forum', 'topic_last_message', [$topicId]);
			$data = is_array($data) ? $data : [];
			$data['id'] = isset($data['id']) ? $data['id'] : '';
			$data['name'] = isset($data['name']) ? $data['name'] : '';
			$data['link'] = isset($data['link']) ? $data['link'] : '';
			return $data;
		}

		/**
		 * Возвращает сообщение о результате восстановления пароля по ссылке из письма
		 * @param array $variables глобальные переменные запроса
		 *
		 * [
		 *     'data' => [
		 *         'status' => string статус результата восстановления пароля
		 *     ]
		 * ]
		 *
		 * @return string
		 */
		public function getPasswordRestoreMessage(array $variables) {
			$status = isset($variables['data']['status']) ? $variables['data']['status'] : '';
			$messageLabel = ($status === 'success') ? 'password_was_sent' : 'wrong_activation_code';
			return $this->getTemplateEngine()->translate($messageLabel);
		}

		/**
		 * Возвращает сообщение о результате отправки запроса на восстановление пароля
		 * @param array $variables глобальные переменные запроса
		 *
		 * [
		 *     'data' => string статус результата отправки запроса на восстановление пароля
		 * ]
		 *
		 * @return string
		 */
		public function getPasswordForgetDoMessage(array $variables) {
			$data = isset($variables['data']) ? $variables['data'] : '';
			$messageLabel = ($data === 'success') ? 'forget_do_success' : 'forget_do_fail';
			return $this->getTemplateEngine()->translate($messageLabel);
		}

		/**
		 * Возвращает список категорий проекта в модуле FAQ
		 * @param array $variables глобальные переменные запроса
		 *
		 * [
		 *     'pageId' => идентификатор проекта в модуле FAQ
		 * ]
		 *
		 * @return array результат работы макроса faq::project()
		 * @throws Exception
		 */
		public function getFaqCategories(array $variables) {
			$template = null;
			$projectId = isset($variables['pageId']) ? $variables['pageId'] : '';

			$data = $this->macros('faq', 'project', [$template, $projectId]);
			$data = is_array($data) ? $data : [];
			$data['lines'] = isset($data['lines']) ? $data['lines'] : [];

			foreach ($data['lines'] as &$category) {
				$category['id'] = isset($category['id']) ? $category['id'] : '';
				$category['name'] = isset($category['name']) ? $category['name'] : '';
				$category['link'] = isset($category['link']) ? $category['link'] : $this->getHomePageUrl();
				$category['content'] = isset($category['content']) ? $category['content'] : '';
			}

			return $data;
		}

		/**
		 * Возвращает список вопросов категории в модуле "FAQ".
		 * @param array $variables глобальные переменные запроса
		 *
		 * [
		 *     'pageId' => идентификатор категории в модуле FAQ
		 * ]
		 *
		 * @return array результат работы макроса faq::category()
		 * @throws Exception
		 */
		public function getFaqQuestions(array $variables) {
			$template = null;
			$categoryId = isset($variables['pageId']) ? $variables['pageId'] : '';

			$data = $this->macros('faq', 'category', [$template, $categoryId]);
			$data = is_array($data) ? $data : [];
			$data['lines'] = isset($data['lines']) ? $data['lines'] : [];

			foreach ($data['lines'] as &$question) {
				$question['question'] = isset($question['question']) ? $question['question'] : '';
				$question['answer'] = isset($question['answer']) ? $question['answer'] : '';
			}

			return $data;
		}

		/**
		 * Возвращает атрибут action для формы добавления нового вопроса в модуле FAQ
		 * @param array $variables глобальные переменные запроса
		 *
		 * [
		 *     'pageId' => идентификатор категории в модуле FAQ
		 * ]
		 *
		 * @return string
		 * @throws Exception
		 */
		public function getNewFaqQuestionUrl(array $variables) {
			$template = null;
			$categoryId = isset($variables['pageId']) ? $variables['pageId'] : '';
			$data = $this->macros('faq', 'addQuestionForm', [$template, $categoryId]);
			$data = is_array($data) ? $data : [];
			return isset($data['action']) ? $data['action'] : '';
		}

		/**
		 * Возвращает опрос, привязанный к странице (результат работы макроса vote::poll())
		 * @param int $pageId идентификатор страницы
		 * @return array
		 * @throws Exception
		 */
		public function getVote($pageId) {
			if (!$this->isVoteModuleExists()) {
				return [];
			}

			$data = $this->macros('vote', 'poll', [$pageId]);
			$data = is_array($data) ? $data : [];
			return $data;
		}

		/**
		 * Возвращает последний опрос на сайте (результат работы макроса vote::insertlast())
		 * @return array
		 * @throws Exception
		 */
		public function getLastVote() {
			if (!$this->isVoteModuleExists()) {
				return [];
			}

			$data = $this->macros('vote', 'insertlast');
			$data = is_array($data) ? $data : [];
			return $data;
		}

		/**
		 * Возвращает параметры способа оплаты "PayAnyWay"
		 *
		 * @param array $variables результат работы макроса emarket::purchase()
		 *
		 * [
		 *     'purchasing' => [
		 *         'formAction' => string action формы оплаты,
		 *         'mntId' => string ID магазина,
		 *         'mnTransactionId' => string ID транзакции,
		 *         'mntCurrencyCode' => string код валюты,
		 *         'mntAmount' => string стоимость заказа,
		 *         'mntTestMode' => int флаг тестового режима оплаты,
		 *         'mntSignature' => string md5-хеш транзакции,
		 *         'mntSuccessUrl' => string адрес редиректа для успешной оплаты,
		 *         'mntFailUrl' => string адрес редиректа для неуспешной оплаты,
		 *     ]
		 * ]
		 *
		 * @return array
		 *
		 * [
		 *         'formAction' => string action формы оплаты,
		 *         'mntId' => string ID магазина,
		 *         'mnTransactionId' => string ID транзакции,
		 *         'mntCurrencyCode' => string код валюты,
		 *         'mntAmount' => string стоимость заказа,
		 *         'mntTestMode' => int флаг тестового режима оплаты,
		 *         'mntSignature' => string md5-хеш транзакции,
		 *         'mntSuccessUrl' => string адрес редиректа для успешной оплаты,
		 *         'mntFailUrl' => string адрес редиректа для неуспешной оплаты,
		 * ]
		 */
		public function getPayAnyWayParams(array $variables) {
			$variables = isset($variables['purchasing']) ? $variables['purchasing'] : [];
			$variables['formAction'] = isset($variables['formAction']) ? $variables['formAction'] : '';
			$variables['mntId'] = isset($variables['mntId']) ? $variables['mntId'] : '';
			$variables['mnTransactionId'] = isset($variables['mnTransactionId']) ? $variables['mnTransactionId'] : '';
			$variables['mntCurrencyCode'] = isset($variables['mntCurrencyCode']) ? $variables['mntCurrencyCode'] : '';
			$variables['mntAmount'] = isset($variables['mntAmount']) ? $variables['mntAmount'] : '';
			$variables['mntTestMode'] = isset($variables['mntTestMode']) ? $variables['mntTestMode'] : '';
			$variables['mntSignature'] = isset($variables['mntSignature']) ? $variables['mntSignature'] : '';
			$variables['mntSuccessUrl'] = isset($variables['mntSuccessUrl']) ? $variables['mntSuccessUrl'] : '';
			$variables['mntFailUrl'] = isset($variables['mntFailUrl']) ? $variables['mntFailUrl'] : '';
			return $variables;
		}

		/**
		 * Возвращает параметры способа оплаты "Деньги Online"
		 *
		 * @param array $variables результат работы макроса emarket::purchase()
		 *
		 * [
		 *     'purchasing' => [
		 *         'formAction' => string action формы оплаты,
		 *         'project' => string ID проекта,
		 *         'amount' => string стоимость заказа,
		 *         'nickname' => string ID заказа,
		 *         'source' => string поле "Source",
		 *         'order_id' => string ID заказа,
		 *         'comment' => string Комментарий,
		 *         'paymentCurrency' => string код валюты,
		 *
		 *         'items' => [
		 *             # => [
		 *                 'id' => int ID варианта оплаты,
		 *                 'label' => string название варианта оплаты,
		 *             ]
		 *         ]
		 *     ]
		 * ]
		 *
		 * @return array
		 *
		 * [
		 *         'formAction' => string action формы оплаты,
		 *         'project' => string ID проекта,
		 *         'amount' => string стоимость заказа,
		 *         'nickname' => string ID заказа,
		 *         'source' => string поле "Source",
		 *         'order_id' => string ID заказа,
		 *         'comment' => string Комментарий,
		 *         'paymentCurrency' => string код валюты,
		 *
		 *         'items' => [
		 *             # => [
		 *                 'id' => int ID варианта оплаты,
		 *                 'label' => string название варианта оплаты,
		 *             ]
		 *         ]
		 * ]
		 */
		public function getDengiOnlineParams(array $variables) {
			$variables = isset($variables['purchasing']) ? $variables['purchasing'] : [];
			$variables['formAction'] = isset($variables['formAction']) ? $variables['formAction'] : '';
			$variables['project'] = isset($variables['project']) ? $variables['project'] : '';
			$variables['amount'] = isset($variables['amount']) ? $variables['amount'] : '';
			$variables['nickname'] = isset($variables['nickname']) ? $variables['nickname'] : '';
			$variables['source'] = isset($variables['source']) ? $variables['source'] : '';
			$variables['order_id'] = isset($variables['order_id']) ? $variables['order_id'] : '';
			$variables['comment'] = isset($variables['comment']) ? $variables['comment'] : '';
			$variables['paymentCurrency'] = isset($variables['paymentCurrency']) ? $variables['paymentCurrency'] : '';

			$variables['items'] = isset($variables['items']) ? $variables['items'] : [];

			foreach ($variables['items'] as &$item) {
				$item['id'] = isset($item['id']) ? $item['id'] : '';
				$item['label'] = isset($item['label']) ? $item['label'] : '';
			}

			return $variables;
		}

		/**
		 * Возвращает параметры способа оплаты "AcquiroPay"
		 *
		 * @param array $variables результат работы макроса emarket::purchase()
		 *
		 * [
		 *     'purchasing' => [
		 *         'formAction' => string формы оплаты,
		 *         'product_id' => string Идентификатор продукта магазина,
		 *         'amount' => string стоимость заказа,
		 *         'language' => string языковой префикс сайта,
		 *         'order_id' => string ID заказа,
		 *         'ok_url' => string адрес редиректа для успешной оплаты,
		 *         'cb_url' => string callback-адрес для обработки ответа от платежной системы,
		 *         'ko_url' => string адрес редиректа для неуспешной оплаты,
		 *         'token' => string md5-хеш транзакции,
		 *     ]
		 * ]
		 *
		 * @return array
		 *
		 * [
		 *         'formAction' => string формы оплаты,
		 *         'product_id' => string Идентификатор продукта магазина,
		 *         'amount' => string стоимость заказа,
		 *         'language' => string языковой префикс сайта,
		 *         'order_id' => string ID заказа,
		 *         'ok_url' => string адрес редиректа для успешной оплаты,
		 *         'cb_url' => string callback-адрес для обработки ответа от платежной системы,
		 *         'ko_url' => string адрес редиректа для неуспешной оплаты,
		 *         'token' => string md5-хеш транзакции,
		 * ]
		 */
		public function getAcquiroPayParams(array $variables) {
			$variables = isset($variables['purchasing']) ? $variables['purchasing'] : [];

			$variables['formAction'] = isset($variables['formAction']) ? $variables['formAction'] : '';
			$variables['product_id'] = isset($variables['product_id']) ? $variables['product_id'] : '';
			$variables['amount'] = isset($variables['amount']) ? $variables['amount'] : '';
			$variables['language'] = isset($variables['language']) ? $variables['language'] : '';
			$variables['order_id'] = isset($variables['order_id']) ? $variables['order_id'] : '';
			$variables['ok_url'] = isset($variables['ok_url']) ? $variables['ok_url'] : '';
			$variables['cb_url'] = isset($variables['cb_url']) ? $variables['cb_url'] : '';
			$variables['ko_url'] = isset($variables['ko_url']) ? $variables['ko_url'] : '';
			$variables['token'] = isset($variables['token']) ? $variables['token'] : '';

			return $variables;
		}

		/**
		 * Возвращает css-класс для элемента меню мобильного каталога второго уровня
		 * @param array $categoryList список дочерних категорий
		 * @return string
		 */
		public function getMobileMenuCatalogClass(array $categoryList) {
			return umiCount($categoryList) > 0 ? 'second_level_menu' : '';
		}

		/**
		 * Добавлен ли товар в корзину покупателя
		 * @param iUmiHierarchyElement $product товар
		 * @return bool
		 * @throws expectElementException
		 */
		private function isInCart($product) {
			if ($this->hasTradeOffers($product->getId())) {
				return false;
			}

			$cart = $this->getTemplateEngine()->getCommonVar('cart');
			$orderItemList = isset($cart['items']) ? $cart['items'] : [];

			foreach ($orderItemList as $orderItemData) {

				if ($orderItemData['element_id'] == $product->getId()) {
					return true;
				}
			}

			return false;
		}

		/**
		 * Определяет, является ли запрошенная страница страницей контактов
		 * @param iUmiHierarchyElement $page страница
		 * @return bool
		 */
		public function isContactsPage(iUmiHierarchyElement $page) {
			$contactsForm = umiObjectTypesCollection::getInstance()
				->getTypeByGUID('contacts-form');
			return $contactsForm->getId() == $page->getValue('form_id');
		}

		/**
		 * Возвращает action для формы обратной связи
		 * @return string
		 */
		public function getWebformsActionUrl() {
			return $this->getTemplateEngine()->getCommonVar('pre_lang') . '/webforms/send/';
		}

		/**
		 * Возвращает данные для формы обратной связи
		 * @param iUmiHierarchyElement $page страница с формой
		 * @return array
		 * @throws Exception
		 */
		public function getWebformsForm(iUmiHierarchyElement $page) {
			if (!$this->isWebformsModuleExists()) {
				return [];
			}

			$form = $this->macros('webforms', 'add', [$page->getValue('form_id')]);
			return is_array($form) ? $form : [];
		}

		/**
		 * Возвращает значение атрибута 'type' для html-поля
		 * @param array $field данные поля
		 *
		 * [
		 *    'name' => <field-name>,
		 * ]
		 *
		 * @return string
		 */
		public function getFieldTypeAttribute(array $field) {
			if ($this->isEmailField($field)) {
				return 'email';
			}

			if ($this->isPhoneField($field)) {
				return 'tel';
			}

			return 'text';
		}

		/**
		 * Определяет, обозначает ли поле электронную почту
		 * @param array $field данные поля
		 *
		 * [
		 *    'name' => <field-name>,
		 * ]
		 *
		 * @return bool
		 */
		private function isEmailField(array $field) {
			return in_array($field['name'], ['email', 'e-mail', 'e_mail']);
		}

		/**
		 * Определяет, обозначает ли поле номер телефона
		 * @param array $field данные поля
		 *
		 * [
		 *    'name' => <field-name>,
		 * ]
		 *
		 * @return bool
		 */
		private function isPhoneField(array $field) {
			return $field['name'] === 'phone';
		}

		/**
		 * Возвращает список способов доставки с типом "Самовывоз"
		 * @param array $variables переменные
		 *
		 * [
		 *     'delivery' => <delivery_list>
		 * ]
		 *
		 * @return array
		 */
		public function getSelfDeliveryList(array $variables) {
			return isset($variables['delivery']) ? $variables['delivery'] : [];
		}

		/**
		 * Возвращает список доступных адресов доставки
		 * @param array $variables переменные
		 *
		 * [
		 *     'items' => <address_list>
		 * ]
		 *
		 * @return array
		 */
		public function getAddressList(array $variables) {
			return isset($variables['items']) ? $variables['items'] : [];
		}

		/**
		 * Выводит данные для построения формы добавления объекта указанного типа данных.
		 * @param int $typeId ID типа данных объекта
		 * @return array
		 */
		public function getCreateForm($typeId) {
			$result = $this->getTemplateEngine()->macros('data', 'getCreateForm', [$typeId]);
			$result = is_array($result) ? $result : [];
			$result['groups'] = is_array($result['groups']) ? $result['groups'] : [];
			return $result;
		}

		/**
		 * Выводит данные для построения формы редактирования объекта с указанным id.
		 * @param int $objectId ID объекта
		 * @return array
		 */
		public function getEditForm($objectId) {
			$result = $this->getTemplateEngine()->macros('data', 'getEditForm', [$objectId]);
			$result = is_array($result) ? $result : [];
			$result['groups'] = is_array($result['groups']) ? $result['groups'] : [];
			return $result;
		}

		/**
		 * Возвращает action для формы сохранения настроек пользователя
		 * @return string
		 */
		public function getUserSettingsActionUrl() {
			return $this->getTemplateEngine()->getCommonVar('pre_lang') . '/users/settings_do/';
		}

		/**
		 * Возвращает подгруппы группы полей.
		 * @param array $group данные группы полей
		 * @return array
		 */
		public function getSubGroupList(array $group) {
			/** @var array $fieldList */
			$fieldList = $group['fields'];
			$first = [];
			$last = [];

			foreach ($fieldList as $field) {
				if (in_array($field['name'], ['country', 'index', 'region', 'city', 'street', 'house', 'flat'])) {
					$first[] = $field;
					continue;
				}

				$last[] = $field;
			}

			return [$first, $last];
		}

		/**
		 * Определяет, нужно ли выводить заголовок группы полей
		 * @param array $variables переменные
		 * @return bool
		 */
		public function canShowGroupTitle(array $variables) {
			if (!isset($variables['displayHeader'])) {
				return true;
			}
			return (bool) $variables['displayHeader'];
		}

		/**
		 * Возвращает идентификатор адреса, привязанного к форме "Заказать звонок"
		 * @param array $variables глобальные переменные
		 * @return string
		 */
		public function getCallbackAddressId(array $variables) {
			$addressList = isset($variables['items']) ? $variables['items'] : [];

			foreach ($addressList as $address) {
				if (isset($address['selected'])) {
					return $address['id'];
				}
			}

			return '';
		}

		/**
		 * Возвращает сообщения текущего топика форума
		 * @return array
		 * @throws Exception
		 */
		public function getForumTopicMessages() {
			$_REQUEST['order_property'] = 'sys::objectid';
			$_REQUEST['order_direction'] = 'asc';
			return $this->macros('forum', 'topic');
		}

		/**
		 * Возвращает ссылку в личный кабинет пользователя
		 * @param array $variables результат работы макроса emarket/purchase
		 * @return string
		 */
		public function getPersonalAccountUrl(array $variables) {
			$langPrefix = $this->getTemplateEngine()->getCommonVar('pre_lang');
			return "$langPrefix/emarket/personal/default/{$variables['purchasing']['personal_params']}/";
		}

		/**
		 * Возвращает адрес логотипа
		 * @return string
		 */
		public function getLogoPath() {
			$logo = $this->getSettingsContainer()
				->getValue('logo');

			if ($logo instanceof iUmiImageFile) {
				return $logo->getFilePath(true);
			}

			return $this->noPhotoPath;
		}

		/**
		 * Возвращает alt логотипа
		 * @return string
		 */
		public function getLogoAlt() {
			$settings = $this->getSettingsContainer();
			$logo = $settings->getValue('logo');
			$alt = ($logo instanceof iUmiImageFile) ? $logo->getAlt() : '';
			return $alt ?: $settings->getValue('site_name');
		}

		/**
		 * Возвращает title логотипа
		 * @return string
		 */
		public function getLogoTitle() {
			$settings = $this->getSettingsContainer();
			$logo = $settings->getValue('logo');
			$title = ($logo instanceof iUmiImageFile) ? $logo->getTitle() : '';
			return $title ?: $settings->getValue('site_name');
		}

		/**
		 * Возвращает набор значений характеристики торговых предложений товара
		 * @param int $productId идентификатор товара
		 * @return array
		 * @example
		 *
		 * [
		 *		'Цена' => [			//  Название характеристики
		 * 			'100 руб' => [	//  Значение характеристики
		 * 				1, 2, 3, 4	//  Идентификаторы торговых предложений
		 * 			],
		 *			'200 руб' => [
		 * 				1, 5, 6, 7
		 * 			]
		 * 		]
		 * ]
		 *
		 * @throws ErrorException
		 * @throws ExpectFieldGroupException
		 * @throws ReflectionException
		 * @throws coreException
		 * @throws databaseException
		 * @throws expectObjectTypeException
		 * @throws privateException
		 * @throws publicException
		 * @throws selectorException
		 * @throws wrongParamException
		 * @throws expectElementException
		 */
		public function getCharacteristicSet($productId) {
			$product = $this->getPageByIdStrict($productId);
			$offerCollection = $this->getTradeOfferCollection($product);

			if ($this->isCheckStock()) {
				$offerCollection->filterByNonZeroTotalCount();
			}

			if ($offerCollection->getCount() === 0) {
				return [];
			}

			$typeCharacteristicCollection = $this->getProductTypeCharacteristicCollection($product);
			$result = [];

			/** @var iCharacteristic $typeCharacteristic */
			foreach ($typeCharacteristicCollection as $typeCharacteristic) {
				if ($typeCharacteristic->isMultiple()) {
					continue;
				}

				$valueList = [];

				/** @var iOffer $tradeOffer */
				foreach ($offerCollection as $tradeOffer) {
					$offerValueList = $tradeOffer->getCharacteristicCollection()
						->copy()
						->filterByField($typeCharacteristic->getName())
						->extractField('value');
					foreach ($offerValueList as $value) {
						$valueList[$value][] = $tradeOffer->getId();
					}
				}

				$result[$typeCharacteristic->getTitle()] = $valueList;
			}

			$currency = Service::CurrencyFacade()->getCurrent();
			/** @var itemDiscount $discount */
			$discount = itemDiscount::search($product);

			foreach ($offerCollection as $tradeOffer) {
				$price = $tradeOffer->getPriceCollection()->getMain();
				$priceValue = $price instanceof iPrice ? $price->getValue() : 0.0;
				$priceValue = ($priceValue > 0 && $discount instanceof itemDiscount) ? $discount->recalcPrice($priceValue) : $priceValue;
				$formattedValue = $this->formatTradeOfferPrice($priceValue, $currency);
				$result[getLabel('js-trade-offer-price')][$formattedValue][] = $tradeOffer->getId();
			}

			return $result;
		}

		/**
		 * Возвращает идентификатор типа цены торгового предложения
		 * @param int $productId идентификатор товара
		 * @return int
		 */
		public function getPriceTypeId($productId) {
			$product = $this->getPageByIdStrict($productId);
			$offerCollection = $this->getTradeOfferCollection($product);
			$priceCollection = Service::TradeOfferPriceFacade()
				->getCollectionByOfferCollection($offerCollection);
			$price = $priceCollection->getMain();
			return $price instanceof iPrice ? $price->getTypeId() : 0;
		}

		/**
		 * Возвращает цену торгового предложения
		 * @param float $price значение цены
		 * @param iCurrency $currency валюта
		 * @return string
		 */
		public function formatTradeOfferPrice($price, iCurrency $currency) {
			return $this->formatPriceWithCurrency($currency->getPrefix(), $price, $currency->getSuffix());
		}

		/**
		 * Возвращает цену с валютой
		 * @param string $prefix префикс валюты
		 * @param float $price значение цены
		 * @param string $suffix суффикс валюты
		 * @return string
		 */
		public function formatPriceWithCurrency($prefix, $price, $suffix) {
			return sprintf('%s %s %s', $prefix, $this->formatPrice($price), $suffix);
		}

		/**
		 * Определяет есть ли у товара торговые предложения
		 * @param int $id идентификатор товара
 		 * @return bool
		 * @throws expectElementException
		 */
		public function hasTradeOffers($id) {
			$page = $this->getPageByIdStrict($id);
			$offerIdList = (array) $page->getValue('trade_offer_list');
			return count($offerIdList) > 0;
		}

		/**
		 * Возвращает страницу по идентификатору
		 * @param int $id
		 * @return iUmiHierarchyElement
		 * @throws expectElementException
		 */
		public function getPageByIdStrict($id) {
			$page = umiHierarchy::getInstance()
				->getElement($id);

			if (!$page instanceof iUmiHierarchyElement) {
				throw new expectElementException('Incorrect page id given');
			}

			return $page;
		}

		/**
		 * Возвращает имя класс для блока характеристик
		 * @param string $title имя характеристики
		 * @return string
		 */
		public function getCharacteristicBlockClass($title) {
			return in_array($title, [getLabel('js-trade-offer-price'), getLabel('js-trade-offer-image')]) ? 'hidden' : '';
		}

		/**
		 * Возвращает коллекцию торговых предложений товара
		 * @param iUmiHierarchyElement $product товар
		 * @return \UmiCms\System\Trade\Offer\iCollection|\UmiCms\System\Orm\Entity\iCollection
		 * @throws ErrorException
		 * @throws ReflectionException
		 * @throws databaseException
		 * @throws publicException
		 */
		public function getTradeOfferCollection(iUmiHierarchyElement $product) {
			$offerIdList = (array) $product->getValue('trade_offer_list');
			$tradeOfferFacade = Service::TradeOfferFacade();
			$collection = $tradeOfferFacade->mapCollectionWithRelations($tradeOfferFacade->getList($offerIdList));
			$collection->filter([
				iMapper::IS_ACTIVE => [
					iCollection::COMPARE_TYPE_NOT_EQUALS => false
				]
			]);

			if ($this->isCheckStock()) {
				$collection->filter([
					iMapper::TOTAL_COUNT => [
						iCollection::COMPARE_TYPE_NOT_EQUALS => 0
					]
				]);
			}

			return $collection;
		}

		/**
		 * Возвращает коллекцию характеристики по типу товара
		 * @param iUmiHierarchyElement $product товар
		 * @return \UmiCms\System\Trade\Offer\Characteristic\iCollection
		 * @throws ErrorException
		 * @throws ExpectFieldGroupException
		 * @throws ReflectionException
		 * @throws coreException
		 * @throws expectObjectTypeException
		 */
		public function getProductTypeCharacteristicCollection(iUmiHierarchyElement $product) {
			return Service::TradeOfferCharacteristicFacade()->getCollectionByType($product->getObjectTypeId());
		}

		/**
		 * Возвращает ссылку для отписки пользователя от рассылки
		 * @return string
		 * @throws Exception
		 */
		public function getUnsubscribeLink() {
			return $this->isDispatchesModuleExists()
				? $this->macros('dispatches', 'unsubscribe')
				: '';
		}

		/**
		 * Возвращает данные для создания формы подписки на рассылку
		 * @param array $params аргументы метода dispatches::subscribe
		 * @return array|mixed
		 * @throws Exception
		 */
		public function getSubscribeData(array $params = []) {
			return $this->isDispatchesModuleExists()
				? $this->macros('dispatches', 'subscribe', $params)
				: [];
		}

		/**
		 * Возвращает результат работы макроса dispatches::subscribe_do
		 * @return array|mixed
		 * @throws Exception
		 */
		public function getSubscribeDoData() {
			return $this->isDispatchesModuleExists()
				? $this->macros('dispatches', 'subscribe_do')
				: [];
		}

		/**
		 * Выводит подписку на новости
		 * @param int userId идентификатор пользователя
		 * @return string
		 * @throws Exception
		 */
		public function renderSubscribe($userId) {
			if (!$this->isDispatchesModuleExists()) {
				return '';
			}

			$template = null;
			return $this->getTemplateEngine()->render(
				$this->getSubscribeData([$template, $userId]),
				'layout/footer/subscribe'
			);
		}

		/**
		 * Выводит форму по ее идентифкатору
		 * @param int $id идентификатор формы
		 * @param string $path путь к шаблону вебформы
		 * @return string
		 * @throws Exception
		 */
		public function renderWebform($id, $path) {
			if (!$this->isWebformsModuleExists()) {
				return '';
			}

			return $this->getTemplateEngine()->render(
				$this->macros('webforms', 'add', [$id]),
				$path
			);
		}

		/**
		 * Возвращает заголовок вебформы "Заказать звонок"
		 * @param iUmiObject $settings настройки сайта
		 * @return string
		 */
		public function getCallBackWebformHeader(iUmiObject $settings) {
			return $this->isWebformsModuleExists()
				? $this->escape($settings->getValue('call_order_text'))
				: '';
		}

		/**
		 * Возвращает текст подписки на рассылку в футере
		 * @param iUmiObject $settings настройки сайта
		 * @return string
		 */
		public function getDispatchesFooterText(iUmiObject $settings) {
			return $this->isDispatchesModuleExists()
				? $this->escape($settings->getValue('dispatches_text'))
				: '';
		}

		/**
		 * Проверяет существует ли баннер
		 * @param array $banner результат метода ViewPhpExtension::getCommonVar('banner')
		 * @return bool
		 */
		public function isBannerExists($banner) {
			return isset($banner['id']) && $banner['id'];
		}

		/**
		 * Возвращает список идентификаторов платежных систем запрещенных для данного способа доставки
		 * @param int $deliveryId идентификатор доставки
		 * @return array
		 */
		public function getDisabledPaymentIdList($deliveryId) {
			try {
				$delivery = delivery::get($deliveryId);
			} catch (coreException $exception) {
				return [];
			}

			return $delivery->getDisabledPaymentIdList();
		}

		/**
		 * Возвращает API Key Яндекс.Карт виджета ApiShip для данного способа доставки
		 * @param int $deliveryId идентификатор доставки
		 * @return string
		 */
		public function getYandexMapApiKeyByDeliveryId($deliveryId) {
			$deliveryObject = delivery::get($deliveryId);
			return $deliveryObject->getSavedApiKeyYandexMap();
		}

		/**
		 * Проверяет необходимость использования Сaptcha в форме записи на прием
		 * @return bool
		 */
		public function isUseAppointmentsCaptcha() {
			return (bool) Service::Registry()->get('//modules/appointment/use-captcha');
		}

		/**
		 * Заменяет переносы в переданном тексте с '\n' на HTML переносы '<br/>'
		 * @param string $text текст с переносами '\n'
		 * @return string
		 */
		public function textReplaceLineBreaks($text) {
			return str_replace("\n", '<br/>', $text);
		}
	}
