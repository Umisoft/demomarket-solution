<?php

	namespace UmiCms\Manifest\Demomarket;

	use UmiCms\Service;

	/**
	 * Команда удаления контента модулей, которые недоступны на установленном сайте
	 * @package UmiCms\Manifest\Demomarket
	 */
	class RemoveContentForUnavailableModulesAction extends \Action {

		/** @inheritdoc */
		public function execute() {
			$cmsController = \cmsController::getInstance();
			$moduleList = ['blogs20', 'vote', 'photoalbum', 'banners', 'faq', 'appointment', 'forum', 'webforms'];
			$unavailableModules = [];

			foreach ($moduleList as $module) {
				if ($cmsController->getModule($module) instanceof \def_module) {
					continue;
				}

				$unavailableModules[] = $module;
				if ($module === 'banners') {
					$this->removeBanners();
				}
			}

			$this->removeModules($unavailableModules);
			if (count($unavailableModules) > 0) {
				$this->removeMenu();
			}
		}

		/** Удаляет объекты модуля "Баннеры" */
		private function removeBanners() {
			$umiObjects = \umiObjectsCollection::getInstance();

			$queryBuilder = new \selector('objects');
			$queryBuilder->types('object-type')->guid('banners-banner');
			$queryBuilder->types('object-type')->guid('banners-place');

			/** @var \iUmiObject[] $bannerList */
			$bannerList = $queryBuilder->result();
			foreach ($bannerList as $banner) {
				$umiObjects->delObject($banner->getId());
			}
		}

		/**
		 * Убирает из системы данные недоступных модулей
		 * @param string[] $modules названия модулей
		 */
		private function removeModules(array $modules) {
			$this->removeModulesFromRegistry($modules);
			$types = \umiHierarchyTypesCollection::getInstance()
				->getTypesByModules($modules);
			$this->removePages($types);
		}

		/**
		 * Убирает из реестра информацию о недоступных модулях
		 * @param string[] $modules названия модулей
		 */
		private function removeModulesFromRegistry(array $modules) {
			$registry = Service::Registry();
			foreach ($modules as $module) {
				$registry->delete("//modules/$module");
			}
		}

		/**
		 * Удаляет страницы, принадлежащие переданным иерархическим типам данных
		 * @param \iUmiHierarchyType[] $typeList
		 */
		private function removePages(array $typeList) {
			if (empty($typeList)) {
				return;
			}

			$typeIdList = [];
			foreach ($typeList as $type) {
				$typeIdList[] = $type->getId();
			}

			$sel = new \selector('pages');
			$sel->types('hierarchy-type')->id($typeIdList);
			$sel->option('return')->value('id');
			$pageList = $sel->result();

			$umiHierarchy = \umiHierarchy::getInstance();
			foreach ($pageList as $page) {
				$umiHierarchy->killElement($page['id']);
			}
		}

		/** Удаляет верхнее правое меню на десктопной версии сайта */
		private function removeMenu() {
			$queryBuilder = new \selector('objects');
			$queryBuilder->types('object-type')->guid('menu-menu');
			$queryBuilder->where('menu_id')->equals('top_right');

			$menu = $queryBuilder->first;
			if ($menu instanceof \iUmiObject) {
				\umiObjectsCollection::getInstance()
					->delObject($menu->getId());
			}
		}

		/** @inheritdoc */
		public function rollback() {
			return $this;
		}
	}
