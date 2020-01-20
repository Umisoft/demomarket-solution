-- Adminer 4.7.5 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `cms3_apiship_orders`;
CREATE TABLE `cms3_apiship_orders` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `number` int(11) unsigned NOT NULL,
  `umi_order_ref_number` int(11) unsigned NOT NULL,
  `provider_order_ref_number` varchar(255) DEFAULT NULL,
  `status` enum('pending','delivered','delivering','deliveryCanceled','lost','notApplicable','onPointIn','onPointOut','onWay','partialReturn','problem','readyForRecipient','returned','returnedFromDelivery','returning','returnReady','unknown','uploaded','uploading','uploadingError') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `number` (`number`),
  KEY `umi_order_ref_number` (`umi_order_ref_number`),
  KEY `provider_order_ref_number` (`provider_order_ref_number`),
  KEY `status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_appointment_employees`;
CREATE TABLE `cms3_appointment_employees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `photo` varchar(500) NOT NULL,
  `description` mediumtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_appointment_employees_services`;
CREATE TABLE `cms3_appointment_employees_services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `employee_id and service_id` (`employee_id`,`service_id`),
  KEY `employees services to services` (`service_id`),
  CONSTRAINT `employees services to employees` FOREIGN KEY (`employee_id`) REFERENCES `cms3_appointment_employees` (`id`) ON DELETE CASCADE,
  CONSTRAINT `employees services to services` FOREIGN KEY (`service_id`) REFERENCES `cms3_appointment_services` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_appointment_employee_schedule`;
CREATE TABLE `cms3_appointment_employee_schedule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `day` enum('0','1','2','3','4','5','6') NOT NULL,
  `time_start` time NOT NULL,
  `time_end` time NOT NULL,
  PRIMARY KEY (`id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `employee schedule to employees` FOREIGN KEY (`employee_id`) REFERENCES `cms3_appointment_employees` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_appointment_orders`;
CREATE TABLE `cms3_appointment_orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `service_id` int(11) unsigned NOT NULL,
  `employee_id` int(11) unsigned DEFAULT NULL,
  `create_date` int(11) unsigned NOT NULL,
  `date` int(11) unsigned NOT NULL,
  `time` time NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `comment` mediumtext DEFAULT NULL,
  `status_id` enum('1','2','3') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `create_date` (`create_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_appointment_services`;
CREATE TABLE `cms3_appointment_services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `time` time NOT NULL,
  `price` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `services to service_groups` (`group_id`),
  CONSTRAINT `services to service_groups` FOREIGN KEY (`group_id`) REFERENCES `cms3_appointment_service_groups` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_appointment_service_groups`;
CREATE TABLE `cms3_appointment_service_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_cluster_nodes`;
CREATE TABLE `cms3_cluster_nodes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `node_ip` varchar(16) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `node_id` (`id`),
  KEY `node_ip` (`node_ip`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_cluster_nodes_cache_keys`;
CREATE TABLE `cms3_cluster_nodes_cache_keys` (
  `node_id` int(11) DEFAULT NULL,
  `key` varchar(255) NOT NULL DEFAULT '',
  KEY `node_id` (`node_id`),
  KEY `key` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_data_cache`;
CREATE TABLE `cms3_data_cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `create_time` int(11) NOT NULL,
  `expire_time` int(11) NOT NULL,
  `entry_time` int(11) NOT NULL,
  `entries_number` int(11) NOT NULL,
  PRIMARY KEY (`key`),
  KEY `Life time` (`expire_time`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_domains`;
CREATE TABLE `cms3_domains` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `host` varchar(64) NOT NULL,
  `is_default` tinyint(1) DEFAULT NULL,
  `default_lang_id` int(10) unsigned DEFAULT NULL,
  `use_ssl` tinyint(1) DEFAULT NULL,
  `favicon` mediumtext DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `host` (`host`),
  KEY `Domain to default language relation_FK` (`default_lang_id`),
  CONSTRAINT `FK_Domain to default language relation` FOREIGN KEY (`default_lang_id`) REFERENCES `cms3_langs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_domain_mirrows`;
CREATE TABLE `cms3_domain_mirrows` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `host` varchar(64) DEFAULT NULL,
  `rel` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `host` (`host`),
  KEY `Domain to mirrows relation_FK` (`rel`),
  CONSTRAINT `FK_Domain to mirrows relation` FOREIGN KEY (`rel`) REFERENCES `cms3_domains` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_emarket_top`;
CREATE TABLE `cms3_emarket_top` (
  `id` int(11) NOT NULL,
  `date` bigint(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `amount` int(11) NOT NULL,
  `total_price` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_fields_controller`;
CREATE TABLE `cms3_fields_controller` (
  `ord` int(11) DEFAULT NULL,
  `field_id` int(10) unsigned DEFAULT NULL,
  `group_id` int(10) unsigned DEFAULT NULL,
  KEY `rel to field_FK` (`field_id`),
  KEY `rel to field group_FK` (`group_id`),
  KEY `ord` (`ord`),
  CONSTRAINT `FK_rel to field` FOREIGN KEY (`field_id`) REFERENCES `cms3_object_fields` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_rel to field group` FOREIGN KEY (`group_id`) REFERENCES `cms3_object_field_groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_filter_index_52_pages_4`;
CREATE TABLE `cms3_filter_index_52_pages_4` (
  `id` int(10) unsigned NOT NULL,
  `obj_id` int(10) unsigned NOT NULL,
  `parent_id` int(10) unsigned NOT NULL,
  `type_id` int(10) unsigned NOT NULL,
  `lang_id` int(10) unsigned NOT NULL,
  `domain_id` int(10) unsigned NOT NULL,
  `brend` varchar(255) DEFAULT NULL,
  `cvet` varchar(255) DEFAULT NULL,
  `cvet_korpusa` varchar(255) DEFAULT NULL,
  `material_korpusa` varchar(255) DEFAULT NULL,
  `nalichie_budilnika` tinyint(1) DEFAULT 0,
  `naznachenie` varchar(255) DEFAULT NULL,
  `novoe_pole` varchar(255) DEFAULT NULL,
  `obem_upakovki` double DEFAULT NULL,
  `price` double DEFAULT 0,
  `proizvoditel` varchar(255) DEFAULT NULL,
  `razmer` varchar(255) DEFAULT NULL,
  `razmer_pitomca` varchar(255) DEFAULT NULL,
  `razmer_ramy_dyujmy` double DEFAULT NULL,
  `sezon` varchar(255) DEFAULT NULL,
  `sostav_napolnitelya` varchar(255) DEFAULT NULL,
  `steklo` varchar(255) DEFAULT NULL,
  `tip` varchar(255) DEFAULT NULL,
  `tip_mehanizma` varchar(255) DEFAULT NULL,
  `ves` double DEFAULT NULL,
  `ves_upakovki` double DEFAULT NULL,
  `ves_velosipeda` double DEFAULT NULL,
  `vid` varchar(255) DEFAULT NULL,
  `vmestimost` bigint(20) DEFAULT NULL,
  `vozrast` varchar(255) DEFAULT NULL,
  `vysota` double DEFAULT NULL,
  `zastezhka` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `obj_id` (`obj_id`),
  KEY `parent_id` (`parent_id`),
  KEY `type_id` (`type_id`),
  KEY `lang_id` (`lang_id`),
  KEY `domain_id` (`domain_id`),
  KEY `brend` (`brend`),
  KEY `cvet` (`cvet`),
  KEY `cvet_korpusa` (`cvet_korpusa`),
  KEY `material_korpusa` (`material_korpusa`),
  KEY `naznachenie` (`naznachenie`),
  KEY `novoe_pole` (`novoe_pole`),
  KEY `obem_upakovki` (`obem_upakovki`),
  KEY `price` (`price`),
  KEY `proizvoditel` (`proizvoditel`),
  KEY `razmer` (`razmer`),
  KEY `razmer_pitomca` (`razmer_pitomca`),
  KEY `razmer_ramy_dyujmy` (`razmer_ramy_dyujmy`),
  KEY `sezon` (`sezon`),
  KEY `sostav_napolnitelya` (`sostav_napolnitelya`),
  KEY `steklo` (`steklo`),
  KEY `tip` (`tip`),
  KEY `tip_mehanizma` (`tip_mehanizma`),
  KEY `ves` (`ves`),
  KEY `ves_upakovki` (`ves_upakovki`),
  KEY `ves_velosipeda` (`ves_velosipeda`),
  KEY `vid` (`vid`),
  KEY `vmestimost` (`vmestimost`),
  KEY `vozrast` (`vozrast`),
  KEY `vysota` (`vysota`),
  KEY `zastezhka` (`zastezhka`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_filter_index_56_pages_1161`;
CREATE TABLE `cms3_filter_index_56_pages_1161` (
  `id` int(10) unsigned NOT NULL,
  `obj_id` int(10) unsigned NOT NULL,
  `parent_id` int(10) unsigned NOT NULL,
  `type_id` int(10) unsigned NOT NULL,
  `lang_id` int(10) unsigned NOT NULL,
  `domain_id` int(10) unsigned NOT NULL,
  `brend` varchar(255) DEFAULT NULL,
  `cvet` varchar(255) DEFAULT NULL,
  `cvet_korpusa` varchar(255) DEFAULT NULL,
  `material_korpusa` varchar(255) DEFAULT NULL,
  `nalichie_budilnika` tinyint(1) DEFAULT 0,
  `novoe_pole` varchar(255) DEFAULT NULL,
  `price` double DEFAULT 0,
  `proizvoditel` varchar(255) DEFAULT NULL,
  `razmer` varchar(255) DEFAULT NULL,
  `sezon` varchar(255) DEFAULT NULL,
  `steklo` varchar(255) DEFAULT NULL,
  `tip` varchar(255) DEFAULT NULL,
  `tip_mehanizma` varchar(255) DEFAULT NULL,
  `zastezhka` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `obj_id` (`obj_id`),
  KEY `parent_id` (`parent_id`),
  KEY `type_id` (`type_id`),
  KEY `lang_id` (`lang_id`),
  KEY `domain_id` (`domain_id`),
  KEY `brend` (`brend`),
  KEY `cvet` (`cvet`),
  KEY `cvet_korpusa` (`cvet_korpusa`),
  KEY `material_korpusa` (`material_korpusa`),
  KEY `novoe_pole` (`novoe_pole`),
  KEY `price` (`price`),
  KEY `proizvoditel` (`proizvoditel`),
  KEY `razmer` (`razmer`),
  KEY `sezon` (`sezon`),
  KEY `steklo` (`steklo`),
  KEY `tip` (`tip`),
  KEY `tip_mehanizma` (`tip_mehanizma`),
  KEY `zastezhka` (`zastezhka`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_filter_index_56_pages_228`;
CREATE TABLE `cms3_filter_index_56_pages_228` (
  `id` int(10) unsigned NOT NULL,
  `obj_id` int(10) unsigned NOT NULL,
  `parent_id` int(10) unsigned NOT NULL,
  `type_id` int(10) unsigned NOT NULL,
  `lang_id` int(10) unsigned NOT NULL,
  `domain_id` int(10) unsigned NOT NULL,
  `brend` varchar(255) DEFAULT NULL,
  `cvet` varchar(255) DEFAULT NULL,
  `cvet_korpusa` varchar(255) DEFAULT NULL,
  `material_korpusa` varchar(255) DEFAULT NULL,
  `nalichie_budilnika` tinyint(1) DEFAULT 0,
  `naznachenie` varchar(255) DEFAULT NULL,
  `novoe_pole` varchar(255) DEFAULT NULL,
  `obem_upakovki` double DEFAULT NULL,
  `price` double DEFAULT 0,
  `proizvoditel` varchar(255) DEFAULT NULL,
  `razmer` varchar(255) DEFAULT NULL,
  `razmer_pitomca` varchar(255) DEFAULT NULL,
  `razmer_ramy_dyujmy` double DEFAULT NULL,
  `sezon` varchar(255) DEFAULT NULL,
  `sostav_napolnitelya` varchar(255) DEFAULT NULL,
  `steklo` varchar(255) DEFAULT NULL,
  `tip` varchar(255) DEFAULT NULL,
  `tip_mehanizma` varchar(255) DEFAULT NULL,
  `ves` double DEFAULT NULL,
  `ves_upakovki` double DEFAULT NULL,
  `ves_velosipeda` double DEFAULT NULL,
  `vid` varchar(255) DEFAULT NULL,
  `vmestimost` bigint(20) DEFAULT NULL,
  `vozrast` varchar(255) DEFAULT NULL,
  `vysota` double DEFAULT NULL,
  `zastezhka` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `obj_id` (`obj_id`),
  KEY `parent_id` (`parent_id`),
  KEY `type_id` (`type_id`),
  KEY `lang_id` (`lang_id`),
  KEY `domain_id` (`domain_id`),
  KEY `brend` (`brend`),
  KEY `cvet` (`cvet`),
  KEY `cvet_korpusa` (`cvet_korpusa`),
  KEY `material_korpusa` (`material_korpusa`),
  KEY `naznachenie` (`naznachenie`),
  KEY `novoe_pole` (`novoe_pole`),
  KEY `obem_upakovki` (`obem_upakovki`),
  KEY `price` (`price`),
  KEY `proizvoditel` (`proizvoditel`),
  KEY `razmer` (`razmer`),
  KEY `razmer_pitomca` (`razmer_pitomca`),
  KEY `razmer_ramy_dyujmy` (`razmer_ramy_dyujmy`),
  KEY `sezon` (`sezon`),
  KEY `sostav_napolnitelya` (`sostav_napolnitelya`),
  KEY `steklo` (`steklo`),
  KEY `tip` (`tip`),
  KEY `tip_mehanizma` (`tip_mehanizma`),
  KEY `ves` (`ves`),
  KEY `ves_upakovki` (`ves_upakovki`),
  KEY `ves_velosipeda` (`ves_velosipeda`),
  KEY `vid` (`vid`),
  KEY `vmestimost` (`vmestimost`),
  KEY `vozrast` (`vozrast`),
  KEY `vysota` (`vysota`),
  KEY `zastezhka` (`zastezhka`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_filter_index_56_pages_539`;
CREATE TABLE `cms3_filter_index_56_pages_539` (
  `id` int(10) unsigned NOT NULL,
  `obj_id` int(10) unsigned NOT NULL,
  `parent_id` int(10) unsigned NOT NULL,
  `type_id` int(10) unsigned NOT NULL,
  `lang_id` int(10) unsigned NOT NULL,
  `domain_id` int(10) unsigned NOT NULL,
  `brend` varchar(255) DEFAULT NULL,
  `cvet` varchar(255) DEFAULT NULL,
  `cvet_korpusa` varchar(255) DEFAULT NULL,
  `material_korpusa` varchar(255) DEFAULT NULL,
  `nalichie_budilnika` tinyint(1) DEFAULT 0,
  `novoe_pole` varchar(255) DEFAULT NULL,
  `price` double DEFAULT 0,
  `proizvoditel` varchar(255) DEFAULT NULL,
  `razmer` varchar(255) DEFAULT NULL,
  `sezon` varchar(255) DEFAULT NULL,
  `steklo` varchar(255) DEFAULT NULL,
  `tip` varchar(255) DEFAULT NULL,
  `tip_mehanizma` varchar(255) DEFAULT NULL,
  `zastezhka` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `obj_id` (`obj_id`),
  KEY `parent_id` (`parent_id`),
  KEY `type_id` (`type_id`),
  KEY `lang_id` (`lang_id`),
  KEY `domain_id` (`domain_id`),
  KEY `brend` (`brend`),
  KEY `cvet` (`cvet`),
  KEY `cvet_korpusa` (`cvet_korpusa`),
  KEY `material_korpusa` (`material_korpusa`),
  KEY `novoe_pole` (`novoe_pole`),
  KEY `price` (`price`),
  KEY `proizvoditel` (`proizvoditel`),
  KEY `razmer` (`razmer`),
  KEY `sezon` (`sezon`),
  KEY `steklo` (`steklo`),
  KEY `tip` (`tip`),
  KEY `tip_mehanizma` (`tip_mehanizma`),
  KEY `zastezhka` (`zastezhka`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_filter_index_56_pages_850`;
CREATE TABLE `cms3_filter_index_56_pages_850` (
  `id` int(10) unsigned NOT NULL,
  `obj_id` int(10) unsigned NOT NULL,
  `parent_id` int(10) unsigned NOT NULL,
  `type_id` int(10) unsigned NOT NULL,
  `lang_id` int(10) unsigned NOT NULL,
  `domain_id` int(10) unsigned NOT NULL,
  `brend` varchar(255) DEFAULT NULL,
  `cvet` varchar(255) DEFAULT NULL,
  `cvet_korpusa` varchar(255) DEFAULT NULL,
  `material_korpusa` varchar(255) DEFAULT NULL,
  `nalichie_budilnika` tinyint(1) DEFAULT 0,
  `novoe_pole` varchar(255) DEFAULT NULL,
  `price` double DEFAULT 0,
  `proizvoditel` varchar(255) DEFAULT NULL,
  `razmer` varchar(255) DEFAULT NULL,
  `sezon` varchar(255) DEFAULT NULL,
  `steklo` varchar(255) DEFAULT NULL,
  `tip` varchar(255) DEFAULT NULL,
  `tip_mehanizma` varchar(255) DEFAULT NULL,
  `zastezhka` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `obj_id` (`obj_id`),
  KEY `parent_id` (`parent_id`),
  KEY `type_id` (`type_id`),
  KEY `lang_id` (`lang_id`),
  KEY `domain_id` (`domain_id`),
  KEY `brend` (`brend`),
  KEY `cvet` (`cvet`),
  KEY `cvet_korpusa` (`cvet_korpusa`),
  KEY `material_korpusa` (`material_korpusa`),
  KEY `novoe_pole` (`novoe_pole`),
  KEY `price` (`price`),
  KEY `proizvoditel` (`proizvoditel`),
  KEY `razmer` (`razmer`),
  KEY `sezon` (`sezon`),
  KEY `steklo` (`steklo`),
  KEY `tip` (`tip`),
  KEY `tip_mehanizma` (`tip_mehanizma`),
  KEY `zastezhka` (`zastezhka`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_hierarchy`;
CREATE TABLE `cms3_hierarchy` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rel` int(10) unsigned NOT NULL,
  `type_id` int(10) unsigned NOT NULL,
  `lang_id` int(10) unsigned NOT NULL,
  `domain_id` int(10) unsigned NOT NULL,
  `obj_id` int(10) unsigned NOT NULL,
  `ord` int(11) DEFAULT 0,
  `tpl_id` int(10) unsigned DEFAULT NULL,
  `alt_name` varchar(128) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT NULL,
  `is_visible` tinyint(1) DEFAULT NULL,
  `updatetime` int(11) DEFAULT NULL,
  `is_default` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `types rels_FK` (`type_id`),
  KEY `Prefix from lang_id_FK` (`lang_id`),
  KEY `Domain from domain_id relation_FK` (`domain_id`),
  KEY `hierarchy to plain object image_FK` (`obj_id`),
  KEY `Getting template data_FK` (`tpl_id`),
  KEY `is_default` (`is_default`),
  KEY `alt_name` (`alt_name`),
  KEY `is_deleted` (`is_deleted`),
  KEY `is_active` (`is_active`),
  KEY `ord` (`ord`),
  KEY `rel` (`rel`),
  KEY `updatetime` (`updatetime`),
  KEY `is_visible` (`is_visible`),
  CONSTRAINT `FK_Domain from domain_id relation` FOREIGN KEY (`domain_id`) REFERENCES `cms3_domains` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Getting template data` FOREIGN KEY (`tpl_id`) REFERENCES `cms3_templates` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Prefix from lang_id` FOREIGN KEY (`lang_id`) REFERENCES `cms3_langs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_hierarchy to plain object image` FOREIGN KEY (`obj_id`) REFERENCES `cms3_objects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_types rels` FOREIGN KEY (`type_id`) REFERENCES `cms3_hierarchy_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_hierarchy_relations`;
CREATE TABLE `cms3_hierarchy_relations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rel_id` int(10) unsigned DEFAULT NULL,
  `child_id` int(10) unsigned DEFAULT NULL,
  `level` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `rel_id` (`rel_id`),
  KEY `child_id` (`child_id`),
  KEY `level` (`level`),
  CONSTRAINT `Hierarchy relation by child_id` FOREIGN KEY (`child_id`) REFERENCES `cms3_hierarchy` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Hierarchy relation by rel_id` FOREIGN KEY (`rel_id`) REFERENCES `cms3_hierarchy` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_hierarchy_types`;
CREATE TABLE `cms3_hierarchy_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(48) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `ext` varchar(48) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `name` (`name`,`ext`),
  KEY `title` (`title`),
  KEY `ext` (`ext`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_hieratical`;
CREATE TABLE `cms3_hieratical` (
  `id` int(10) unsigned NOT NULL,
  `rel` int(10) unsigned NOT NULL,
  `type_id` int(11) NOT NULL,
  `lang_id` int(11) NOT NULL,
  `domain_id` int(11) NOT NULL,
  `obj_id` int(10) unsigned NOT NULL,
  `ord` int(11) DEFAULT NULL,
  `tpl_id` int(10) unsigned DEFAULT NULL,
  `alt_name` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;


DROP TABLE IF EXISTS `cms3_hieratical_types`;
CREATE TABLE `cms3_hieratical_types` (
  `id` int(11) NOT NULL,
  `codename` varchar(48) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;


DROP TABLE IF EXISTS `cms3_import_apiship_orders`;
CREATE TABLE `cms3_import_apiship_orders` (
  `external_id` int(10) unsigned NOT NULL,
  `internal_id` int(10) unsigned NOT NULL,
  `source_id` int(10) unsigned NOT NULL,
  KEY `external_id` (`external_id`,`source_id`),
  KEY `internal_id` (`internal_id`,`source_id`),
  KEY `source_id` (`source_id`),
  CONSTRAINT `cms3_import_apiship_orders_ibfk_1` FOREIGN KEY (`internal_id`) REFERENCES `cms3_apiship_orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cms3_import_apiship_orders_ibfk_2` FOREIGN KEY (`source_id`) REFERENCES `cms3_import_sources` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_import_appointment_employees`;
CREATE TABLE `cms3_import_appointment_employees` (
  `external_id` int(11) NOT NULL,
  `internal_id` int(11) NOT NULL,
  `source_id` int(10) unsigned NOT NULL,
  KEY `external_id` (`external_id`,`source_id`),
  KEY `internal_id` (`internal_id`,`source_id`),
  KEY `source_id` (`source_id`),
  CONSTRAINT `cms3_import_appointment_employees_ibfk_1` FOREIGN KEY (`internal_id`) REFERENCES `cms3_appointment_employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cms3_import_appointment_employees_ibfk_2` FOREIGN KEY (`source_id`) REFERENCES `cms3_import_sources` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_import_appointment_employees_services`;
CREATE TABLE `cms3_import_appointment_employees_services` (
  `external_id` int(11) NOT NULL,
  `internal_id` int(11) NOT NULL,
  `source_id` int(10) unsigned NOT NULL,
  KEY `external_id` (`external_id`,`source_id`),
  KEY `internal_id` (`internal_id`,`source_id`),
  KEY `source_id` (`source_id`),
  CONSTRAINT `cms3_import_appointment_employees_services_ibfk_1` FOREIGN KEY (`internal_id`) REFERENCES `cms3_appointment_employees_services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cms3_import_appointment_employees_services_ibfk_2` FOREIGN KEY (`source_id`) REFERENCES `cms3_import_sources` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_import_appointment_employee_schedule`;
CREATE TABLE `cms3_import_appointment_employee_schedule` (
  `external_id` int(11) NOT NULL,
  `internal_id` int(11) NOT NULL,
  `source_id` int(10) unsigned NOT NULL,
  KEY `external_id` (`external_id`,`source_id`),
  KEY `internal_id` (`internal_id`,`source_id`),
  KEY `source_id` (`source_id`),
  CONSTRAINT `cms3_import_appointment_employee_schedule_ibfk_1` FOREIGN KEY (`internal_id`) REFERENCES `cms3_appointment_employee_schedule` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cms3_import_appointment_employee_schedule_ibfk_2` FOREIGN KEY (`source_id`) REFERENCES `cms3_import_sources` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_import_appointment_orders`;
CREATE TABLE `cms3_import_appointment_orders` (
  `external_id` int(11) NOT NULL,
  `internal_id` int(11) NOT NULL,
  `source_id` int(10) unsigned NOT NULL,
  KEY `external_id` (`external_id`,`source_id`),
  KEY `internal_id` (`internal_id`,`source_id`),
  KEY `source_id` (`source_id`),
  CONSTRAINT `cms3_import_appointment_orders_ibfk_1` FOREIGN KEY (`internal_id`) REFERENCES `cms3_appointment_orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cms3_import_appointment_orders_ibfk_2` FOREIGN KEY (`source_id`) REFERENCES `cms3_import_sources` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_import_appointment_services`;
CREATE TABLE `cms3_import_appointment_services` (
  `external_id` int(11) NOT NULL,
  `internal_id` int(11) NOT NULL,
  `source_id` int(10) unsigned NOT NULL,
  KEY `external_id` (`external_id`,`source_id`),
  KEY `internal_id` (`internal_id`,`source_id`),
  KEY `source_id` (`source_id`),
  CONSTRAINT `cms3_import_appointment_services_ibfk_1` FOREIGN KEY (`internal_id`) REFERENCES `cms3_appointment_services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cms3_import_appointment_services_ibfk_2` FOREIGN KEY (`source_id`) REFERENCES `cms3_import_sources` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_import_appointment_service_groups`;
CREATE TABLE `cms3_import_appointment_service_groups` (
  `external_id` int(11) NOT NULL,
  `internal_id` int(11) NOT NULL,
  `source_id` int(10) unsigned NOT NULL,
  KEY `external_id` (`external_id`,`source_id`),
  KEY `internal_id` (`internal_id`,`source_id`),
  KEY `source_id` (`source_id`),
  CONSTRAINT `cms3_import_appointment_service_groups_ibfk_1` FOREIGN KEY (`internal_id`) REFERENCES `cms3_appointment_service_groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cms3_import_appointment_service_groups_ibfk_2` FOREIGN KEY (`source_id`) REFERENCES `cms3_import_sources` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_import_domains`;
CREATE TABLE `cms3_import_domains` (
  `source_id` int(10) unsigned NOT NULL,
  `old_id` varchar(255) NOT NULL,
  `new_id` int(10) unsigned NOT NULL,
  KEY `source_id` (`source_id`,`old_id`,`new_id`),
  KEY `old_id` (`old_id`,`new_id`),
  KEY `new_id` (`new_id`),
  CONSTRAINT `FK_DomainSourceId_To_Source` FOREIGN KEY (`source_id`) REFERENCES `cms3_import_sources` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_NewId_To_DomainId` FOREIGN KEY (`new_id`) REFERENCES `cms3_domains` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_import_domain_mirrors`;
CREATE TABLE `cms3_import_domain_mirrors` (
  `source_id` int(10) unsigned NOT NULL,
  `old_id` varchar(255) NOT NULL,
  `new_id` int(10) unsigned NOT NULL,
  KEY `source_id` (`source_id`,`old_id`,`new_id`),
  KEY `old_id` (`old_id`,`new_id`),
  KEY `new_id` (`new_id`),
  CONSTRAINT `FK_DomainMirrorSourceId_To_Source` FOREIGN KEY (`source_id`) REFERENCES `cms3_import_sources` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_NewId_To_DomainMirrorId` FOREIGN KEY (`new_id`) REFERENCES `cms3_domain_mirrows` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_import_fields`;
CREATE TABLE `cms3_import_fields` (
  `source_id` int(10) unsigned NOT NULL,
  `field_name` varchar(64) NOT NULL,
  `type_id` int(10) unsigned NOT NULL,
  `new_id` int(10) unsigned NOT NULL,
  KEY `source_id` (`source_id`),
  KEY `type_id` (`type_id`),
  KEY `field_name` (`field_name`),
  KEY `new_id` (`new_id`),
  CONSTRAINT `FK_FieldSourceId_To_Source` FOREIGN KEY (`source_id`) REFERENCES `cms3_import_sources` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_NewFieldId_To_ObjectTypeId` FOREIGN KEY (`type_id`) REFERENCES `cms3_import_types` (`new_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_NewId_To_ObjectTypeFieldId` FOREIGN KEY (`new_id`) REFERENCES `cms3_object_fields` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_import_groups`;
CREATE TABLE `cms3_import_groups` (
  `source_id` int(10) unsigned NOT NULL,
  `group_name` varchar(48) NOT NULL,
  `type_id` int(10) unsigned NOT NULL,
  `new_id` int(10) unsigned NOT NULL,
  KEY `source_id` (`source_id`),
  KEY `type_id` (`type_id`),
  KEY `group_name` (`group_name`),
  KEY `new_id` (`new_id`),
  CONSTRAINT `FK_GroupSourceId_To_Source` FOREIGN KEY (`source_id`) REFERENCES `cms3_import_sources` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_NewGroupId_To_ObjectTypeId` FOREIGN KEY (`type_id`) REFERENCES `cms3_import_types` (`new_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_NewId_To_ObjectTypeGroupId` FOREIGN KEY (`new_id`) REFERENCES `cms3_object_field_groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_import_langs`;
CREATE TABLE `cms3_import_langs` (
  `source_id` int(10) unsigned NOT NULL,
  `old_id` varchar(255) NOT NULL,
  `new_id` int(10) unsigned NOT NULL,
  KEY `source_id` (`source_id`,`old_id`,`new_id`),
  KEY `old_id` (`old_id`,`new_id`),
  KEY `new_id` (`new_id`),
  CONSTRAINT `FK_LangSourceId_To_Source` FOREIGN KEY (`source_id`) REFERENCES `cms3_import_sources` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_NewId_To_LangId` FOREIGN KEY (`new_id`) REFERENCES `cms3_langs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_import_links`;
CREATE TABLE `cms3_import_links` (
  `external_id` int(10) unsigned NOT NULL,
  `internal_id` int(10) unsigned NOT NULL,
  `source_id` int(10) unsigned NOT NULL,
  KEY `external_id` (`external_id`,`source_id`),
  KEY `internal_id` (`internal_id`,`source_id`),
  KEY `source_id` (`source_id`),
  CONSTRAINT `cms3_import_links_ibfk_1` FOREIGN KEY (`internal_id`) REFERENCES `cms3_links` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cms3_import_links_ibfk_2` FOREIGN KEY (`source_id`) REFERENCES `cms3_import_sources` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_import_links_sources`;
CREATE TABLE `cms3_import_links_sources` (
  `external_id` int(11) unsigned NOT NULL,
  `internal_id` int(11) unsigned NOT NULL,
  `source_id` int(10) unsigned NOT NULL,
  KEY `external_id` (`external_id`,`source_id`),
  KEY `internal_id` (`internal_id`,`source_id`),
  KEY `source_id` (`source_id`),
  CONSTRAINT `cms3_import_links_sources_ibfk_1` FOREIGN KEY (`internal_id`) REFERENCES `cms3_links_sources` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cms3_import_links_sources_ibfk_2` FOREIGN KEY (`source_id`) REFERENCES `cms3_import_sources` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_import_mail_notifications`;
CREATE TABLE `cms3_import_mail_notifications` (
  `external_id` int(11) unsigned NOT NULL,
  `internal_id` int(11) unsigned NOT NULL,
  `source_id` int(10) unsigned NOT NULL,
  KEY `external_id` (`external_id`,`source_id`),
  KEY `internal_id` (`internal_id`,`source_id`),
  KEY `source_id` (`source_id`),
  CONSTRAINT `cms3_import_mail_notifications_ibfk_1` FOREIGN KEY (`internal_id`) REFERENCES `cms3_mail_notifications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cms3_import_mail_notifications_ibfk_2` FOREIGN KEY (`source_id`) REFERENCES `cms3_import_sources` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_import_mail_templates`;
CREATE TABLE `cms3_import_mail_templates` (
  `external_id` int(10) unsigned NOT NULL,
  `internal_id` int(10) unsigned NOT NULL,
  `source_id` int(10) unsigned NOT NULL,
  KEY `external_id` (`external_id`,`source_id`),
  KEY `internal_id` (`internal_id`,`source_id`),
  KEY `source_id` (`source_id`),
  CONSTRAINT `cms3_import_mail_templates_ibfk_1` FOREIGN KEY (`internal_id`) REFERENCES `cms3_mail_templates` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cms3_import_mail_templates_ibfk_2` FOREIGN KEY (`source_id`) REFERENCES `cms3_import_sources` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_import_mail_variables`;
CREATE TABLE `cms3_import_mail_variables` (
  `external_id` int(10) unsigned NOT NULL,
  `internal_id` int(10) unsigned NOT NULL,
  `source_id` int(10) unsigned NOT NULL,
  KEY `external_id` (`external_id`,`source_id`),
  KEY `internal_id` (`internal_id`,`source_id`),
  KEY `source_id` (`source_id`),
  CONSTRAINT `cms3_import_mail_variables_ibfk_1` FOREIGN KEY (`internal_id`) REFERENCES `cms3_mail_variables` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cms3_import_mail_variables_ibfk_2` FOREIGN KEY (`source_id`) REFERENCES `cms3_import_sources` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_import_objects`;
CREATE TABLE `cms3_import_objects` (
  `source_id` int(10) unsigned NOT NULL,
  `old_id` varchar(255) NOT NULL,
  `new_id` int(10) unsigned NOT NULL,
  KEY `source_id` (`source_id`,`old_id`,`new_id`),
  KEY `old_id` (`old_id`,`new_id`),
  KEY `new_id` (`new_id`),
  CONSTRAINT `FK_NewId_To_ObjectsId` FOREIGN KEY (`new_id`) REFERENCES `cms3_objects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ObjectSourceId_To_Source` FOREIGN KEY (`source_id`) REFERENCES `cms3_import_sources` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_import_offer_list`;
CREATE TABLE `cms3_import_offer_list` (
  `external_id` varchar(255) NOT NULL,
  `internal_id` int(10) unsigned NOT NULL,
  `source_id` int(10) unsigned NOT NULL,
  KEY `external_id` (`external_id`,`source_id`),
  KEY `internal_id` (`internal_id`,`source_id`),
  KEY `source_id` (`source_id`),
  CONSTRAINT `internal id to offer` FOREIGN KEY (`internal_id`) REFERENCES `cms3_offer_list` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `offer source id to import source` FOREIGN KEY (`source_id`) REFERENCES `cms3_import_sources` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_import_offer_price_list`;
CREATE TABLE `cms3_import_offer_price_list` (
  `external_id` varchar(255) NOT NULL,
  `internal_id` int(10) unsigned NOT NULL,
  `source_id` int(10) unsigned NOT NULL,
  KEY `external_id` (`external_id`,`source_id`),
  KEY `internal_id` (`internal_id`,`source_id`),
  KEY `source_id` (`source_id`),
  CONSTRAINT `internal id to price` FOREIGN KEY (`internal_id`) REFERENCES `cms3_offer_price_list` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `price source id to import source` FOREIGN KEY (`source_id`) REFERENCES `cms3_import_sources` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_import_offer_price_type_list`;
CREATE TABLE `cms3_import_offer_price_type_list` (
  `external_id` varchar(255) NOT NULL,
  `internal_id` int(10) unsigned NOT NULL,
  `source_id` int(10) unsigned NOT NULL,
  KEY `external_id` (`external_id`,`source_id`),
  KEY `internal_id` (`internal_id`,`source_id`),
  KEY `source_id` (`source_id`),
  CONSTRAINT `internal id to price type` FOREIGN KEY (`internal_id`) REFERENCES `cms3_offer_price_type_list` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `price type source id to import source` FOREIGN KEY (`source_id`) REFERENCES `cms3_import_sources` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_import_redirects`;
CREATE TABLE `cms3_import_redirects` (
  `external_id` int(11) NOT NULL,
  `internal_id` int(11) NOT NULL,
  `source_id` int(10) unsigned NOT NULL,
  KEY `external_id` (`external_id`,`source_id`),
  KEY `internal_id` (`internal_id`,`source_id`),
  KEY `source_id` (`source_id`),
  CONSTRAINT `cms3_import_redirects_ibfk_1` FOREIGN KEY (`internal_id`) REFERENCES `cms3_redirects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cms3_import_redirects_ibfk_2` FOREIGN KEY (`source_id`) REFERENCES `cms3_import_sources` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_import_relations`;
CREATE TABLE `cms3_import_relations` (
  `source_id` int(10) unsigned NOT NULL,
  `old_id` varchar(255) NOT NULL,
  `new_id` int(10) unsigned NOT NULL,
  KEY `source_id` (`source_id`,`old_id`,`new_id`),
  KEY `old_id` (`old_id`,`new_id`),
  KEY `new_id` (`new_id`),
  CONSTRAINT `FK_NewId_To_HierarchyId` FOREIGN KEY (`new_id`) REFERENCES `cms3_hierarchy` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_SourceId_To_Source` FOREIGN KEY (`source_id`) REFERENCES `cms3_import_sources` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_import_restrictions`;
CREATE TABLE `cms3_import_restrictions` (
  `source_id` int(10) unsigned NOT NULL,
  `old_id` varchar(255) NOT NULL,
  `new_id` int(10) unsigned NOT NULL,
  KEY `source_id` (`source_id`,`old_id`,`new_id`),
  KEY `old_id` (`old_id`,`new_id`),
  KEY `new_id` (`new_id`),
  CONSTRAINT `FK_NewId_To_RestrictionId` FOREIGN KEY (`new_id`) REFERENCES `cms3_object_fields_restrictions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_RestrictionSourceId_To_Source` FOREIGN KEY (`source_id`) REFERENCES `cms3_import_sources` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_import_sliders`;
CREATE TABLE `cms3_import_sliders` (
  `external_id` int(10) unsigned NOT NULL,
  `internal_id` int(10) unsigned NOT NULL,
  `source_id` int(10) unsigned NOT NULL,
  KEY `external_id` (`external_id`,`source_id`),
  KEY `internal_id` (`internal_id`,`source_id`),
  KEY `source_id` (`source_id`),
  CONSTRAINT `cms3_import_sliders_ibfk_1` FOREIGN KEY (`internal_id`) REFERENCES `cms3_sliders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cms3_import_sliders_ibfk_2` FOREIGN KEY (`source_id`) REFERENCES `cms3_import_sources` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_import_slides`;
CREATE TABLE `cms3_import_slides` (
  `external_id` int(10) unsigned NOT NULL,
  `internal_id` int(10) unsigned NOT NULL,
  `source_id` int(10) unsigned NOT NULL,
  KEY `external_id` (`external_id`,`source_id`),
  KEY `internal_id` (`internal_id`,`source_id`),
  KEY `source_id` (`source_id`),
  CONSTRAINT `cms3_import_slides_ibfk_1` FOREIGN KEY (`internal_id`) REFERENCES `cms3_slides` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cms3_import_slides_ibfk_2` FOREIGN KEY (`source_id`) REFERENCES `cms3_import_sources` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_import_sources`;
CREATE TABLE `cms3_import_sources` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `source_name` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `source_name` (`source_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_import_stock_balance_list`;
CREATE TABLE `cms3_import_stock_balance_list` (
  `external_id` varchar(255) NOT NULL,
  `internal_id` int(10) unsigned NOT NULL,
  `source_id` int(10) unsigned NOT NULL,
  KEY `external_id` (`external_id`,`source_id`),
  KEY `internal_id` (`internal_id`,`source_id`),
  KEY `source_id` (`source_id`),
  CONSTRAINT `internal id to stock balance` FOREIGN KEY (`internal_id`) REFERENCES `cms3_stock_balance_list` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `stock balance source id to import source` FOREIGN KEY (`source_id`) REFERENCES `cms3_import_sources` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_import_templates`;
CREATE TABLE `cms3_import_templates` (
  `source_id` int(10) unsigned NOT NULL,
  `old_id` varchar(255) NOT NULL,
  `new_id` int(10) unsigned NOT NULL,
  KEY `source_id` (`source_id`,`old_id`,`new_id`),
  KEY `old_id` (`old_id`,`new_id`),
  KEY `new_id` (`new_id`),
  CONSTRAINT `FK_NewId_To_TemplateId` FOREIGN KEY (`new_id`) REFERENCES `cms3_templates` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_TemplateSourceId_To_Source` FOREIGN KEY (`source_id`) REFERENCES `cms3_import_sources` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_import_types`;
CREATE TABLE `cms3_import_types` (
  `source_id` int(10) unsigned NOT NULL,
  `old_id` varchar(255) NOT NULL,
  `new_id` int(10) unsigned NOT NULL,
  KEY `source_id` (`source_id`,`old_id`,`new_id`),
  KEY `old_id` (`old_id`,`new_id`),
  KEY `new_id` (`new_id`),
  CONSTRAINT `FK_NewId_To_ObjectTypeId` FOREIGN KEY (`new_id`) REFERENCES `cms3_object_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_TypeSourceId_To_Source` FOREIGN KEY (`source_id`) REFERENCES `cms3_import_sources` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_langs`;
CREATE TABLE `cms3_langs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `prefix` varchar(16) NOT NULL,
  `title` varchar(255) NOT NULL,
  `is_default` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `prefix` (`prefix`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_links`;
CREATE TABLE `cms3_links` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `address` varchar(1024) NOT NULL,
  `address_hash` varchar(32) NOT NULL,
  `place` varchar(255) NOT NULL,
  `broken` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `address_hash` (`address_hash`),
  KEY `broken` (`broken`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_links_sources`;
CREATE TABLE `cms3_links_sources` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `link_id` int(11) unsigned NOT NULL,
  `place` varchar(255) NOT NULL,
  `type` enum('object','template') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `link_source` (`link_id`,`place`),
  CONSTRAINT `source link_id` FOREIGN KEY (`link_id`) REFERENCES `cms3_links` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_mail_notifications`;
CREATE TABLE `cms3_mail_notifications` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `lang_id` int(10) unsigned NOT NULL,
  `domain_id` int(10) unsigned NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `module` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name-domain-lang` (`name`,`domain_id`,`lang_id`),
  KEY `lang_id` (`lang_id`),
  KEY `domain_id` (`domain_id`),
  KEY `name` (`name`),
  CONSTRAINT `notification to domain` FOREIGN KEY (`domain_id`) REFERENCES `cms3_domains` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `notification to lang` FOREIGN KEY (`lang_id`) REFERENCES `cms3_langs` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_mail_templates`;
CREATE TABLE `cms3_mail_templates` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `notification_id` int(11) unsigned NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `content` mediumtext DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name-notification` (`name`,`notification_id`),
  KEY `name` (`name`),
  KEY `notification_id` (`notification_id`),
  CONSTRAINT `mail template to notification` FOREIGN KEY (`notification_id`) REFERENCES `cms3_mail_notifications` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_mail_variables`;
CREATE TABLE `cms3_mail_variables` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `template_id` int(11) unsigned NOT NULL,
  `variable` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `field_name` (`variable`),
  KEY `template_name` (`template_id`),
  CONSTRAINT `cms3_mail_variables_ibfk_1` FOREIGN KEY (`template_id`) REFERENCES `cms3_mail_templates` (`id`),
  CONSTRAINT `mail variable to template` FOREIGN KEY (`template_id`) REFERENCES `cms3_mail_templates` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_messages`;
CREATE TABLE `cms3_messages` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` mediumtext NOT NULL,
  `sender_id` int(10) unsigned DEFAULT NULL,
  `create_time` int(11) NOT NULL,
  `type` enum('private','sys-event','sys-log') NOT NULL,
  `priority` int(11) DEFAULT 0,
  `is_sended` int(11) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `title` (`title`),
  KEY `create_time` (`create_time`),
  KEY `priority` (`priority`),
  KEY `type` (`type`),
  KEY `is_sended` (`is_sended`),
  KEY `FK_Messages to user relation` (`sender_id`),
  CONSTRAINT `FK_Messages to user relation` FOREIGN KEY (`sender_id`) REFERENCES `cms3_objects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_messages_inbox`;
CREATE TABLE `cms3_messages_inbox` (
  `message_id` int(10) unsigned DEFAULT NULL,
  `recipient_id` int(10) unsigned DEFAULT NULL,
  `is_opened` int(11) DEFAULT 0,
  KEY `message_id` (`message_id`),
  KEY `recipient_id` (`recipient_id`),
  KEY `is_opened` (`is_opened`),
  KEY `FK_MessagesInbox to Messages` (`message_id`),
  KEY `FK_MessagesInbox to User` (`recipient_id`),
  CONSTRAINT `FK_MessagesInbox to Messages` FOREIGN KEY (`message_id`) REFERENCES `cms3_messages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_MessagesInbox to User` FOREIGN KEY (`recipient_id`) REFERENCES `cms3_objects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_objects`;
CREATE TABLE `cms3_objects` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `guid` varchar(64) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `is_locked` tinyint(1) DEFAULT NULL,
  `type_id` int(10) unsigned DEFAULT NULL,
  `owner_id` int(10) unsigned DEFAULT NULL,
  `ord` int(10) unsigned DEFAULT 0,
  `updatetime` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Object to type relation_FK` (`type_id`),
  KEY `name` (`name`),
  KEY `owner_id` (`owner_id`),
  KEY `is_locked` (`is_locked`),
  KEY `ord` (`ord`),
  KEY `guid` (`guid`),
  KEY `updatetime` (`updatetime`),
  CONSTRAINT `FK_Object to type relation` FOREIGN KEY (`type_id`) REFERENCES `cms3_object_types` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `cms3_objects` (`id`, `guid`, `name`, `is_locked`, `type_id`, `owner_id`, `ord`, `updatetime`) VALUES
(1,	'2ca45ca1c710cf65f451f098f4bf683082566200',	'i18n::object-commerceml_catalog',	0,	35,	25,	1,	1498560651),
(2,	'681665ea8b72237d1677dfaf7339ef7a7ec40269',	'i18n::object-commerceml_offer_list',	0,	35,	25,	2,	1498560651),
(3,	'8e9874cd7a1b20f4b00c95fd7126f2112101c2ac',	'i18n::object-commerceml_order_list',	0,	35,	25,	3,	1498560651),
(4,	'ff6c38d4ab12cda6c035cf36a4afb829049fbf21',	'i18n::object-yml_catalog',	0,	35,	25,	4,	1498560651),
(5,	'b8c554e9ce8127f2405c189857cfd6831dcc2f5d',	'i18n::object-umiDump_data_format',	0,	35,	25,	5,	1498560651),
(6,	'de2d91f2111e74d1fab49ffed3220fc4b1d51d42',	'i18n::object-csv_dataformat',	0,	35,	25,	6,	1498560651),
(7,	'ccc9bf34f683f8e4ecf2ffe2910f3d8cda2b6852',	'i18n::object-umi_export_umiDump',	0,	35,	25,	7,	1498560652),
(8,	'exchange-export-commerceml',	'i18n::object-catalog_export',	0,	35,	25,	8,	1498560652),
(9,	'25ec3f9da5444fe6a125910137ec28200d4eaaa8',	'i18n::object-status-publish',	0,	2,	25,	1,	1498560650),
(10,	'8a6f804b3690f0592a3f17ed980a9df5f16bacd8',	'i18n::object-status-unpublish',	0,	2,	25,	2,	1498560650),
(11,	'f4df5d14f5a1aeeebfe3db75b73e57fef8bcc4f2',	'i18n::object-status-preunpublish',	0,	2,	25,	3,	1498560650),
(12,	'84a36e2847c33ac03a7223b57b0c864b80ab26c8',	'i18n::object-rss',	0,	5,	0,	1,	1498560503),
(13,	'a35ff773f425e44df36c1cc68a415d92318b19ac',	'i18n::object-atom',	0,	5,	0,	2,	1498560503),
(14,	'news-rss-charset-27949',	'i18n::object-windows_1251',	0,	6,	25,	1,	1498560652),
(15,	'news-rss-charset-27950',	'i18n::object-utf_8',	0,	6,	25,	2,	1498560652),
(16,	'emarket-currency-27226',	'i18n::object-rur',	0,	22,	25,	1,	1498560650),
(17,	'emarket-currency-27227',	'i18n::object-usd',	0,	22,	25,	2,	1501681021),
(18,	'emarket-currency-27228',	'i18n::object-euro',	0,	22,	25,	3,	1501681005),
(19,	'emarket-mobile-platform-27944',	'i18n::object-android',	0,	24,	25,	1,	1498560652),
(20,	'emarket-mobile-platform-27945',	'i18n::object-ios',	0,	24,	25,	2,	1498560652),
(21,	'emarket-discounttype-27131',	'i18n::object-catalog_item_discount',	0,	29,	25,	1,	1498560650),
(22,	'emarket-discounttype-27132',	'i18n::object-order_discount',	0,	29,	25,	2,	1498560650),
(23,	'emarket-discounttype-bonus',	'i18n::object-bonus-discount',	0,	29,	25,	3,	1498560650),
(24,	'users-users-15',	'i18n::object-supervajzery',	0,	36,	0,	1,	1498560503),
(25,	'system-supervisor',	'sv',	0,	51,	0,	1,	1579526019),
(26,	'emarket-discountmodificatortype-27136',	'i18n::object-summ_percent',	0,	30,	25,	1,	1498560650),
(27,	'emarket-discountmodificatortype-27456',	'i18n::object-fixed_modifier',	0,	30,	25,	2,	1552573407),
(28,	'emarket-discountruletype-27150',	'i18n::object-specify_items',	0,	32,	25,	1,	1498560650),
(29,	'emarket-discountruletype-27393',	'i18n::object-time_interval_discount',	0,	32,	25,	2,	1498560650),
(30,	'emarket-discountruletype-27394',	'i18n::object-order_summ_discount',	0,	32,	25,	3,	1498560650),
(31,	'emarket-discountruletype-27395',	'i18n::object-user_summ_discount',	0,	32,	25,	4,	1498560650),
(32,	'emarket-discountruletype-27396',	'i18n::object-user_group_discount',	0,	32,	25,	5,	1498560650),
(33,	'emarket-discountruletype-27397',	'i18n::object-users_discount',	0,	32,	25,	6,	1498560650),
(34,	'emarket-discountruletype-27398',	'i18n::object-related_items_discount',	0,	32,	25,	7,	1498560650),
(35,	'users-users-2374',	'i18n::object-zaregistrirovannye_pol_zovateli',	0,	36,	0,	2,	1498560508),
(36,	'a1e3ae17e80ba2b4a3ddb1b855430346f74b8d48',	'i18n::object-usa',	0,	10,	25,	1,	1498560648),
(37,	'e9aa8c23a339224b25945aa9e99f09f578bdd483',	'i18n::object-russia',	0,	10,	25,	2,	1498560645),
(38,	'emarket-itemtype-27180',	'i18n::object-digital',	0,	38,	25,	1,	1498560650),
(39,	'emarket-itemtype-27181',	'i18n::object-complex',	0,	38,	25,	2,	1498560650),
(40,	'tax-rate-27961',	'Без НДС',	0,	28,	0,	1,	1546015307),
(41,	'tax-rate-27962',	'НДС по ставке 0%',	0,	28,	0,	2,	1546015307),
(42,	'tax-rate-27963',	'НДС по ставке 10%',	0,	28,	0,	3,	1546015307),
(43,	'tax-rate-27964',	'НДС по ставке 20%',	0,	28,	0,	4,	1546015307),
(44,	'tax-rate-27965',	'НДС по расчетной ставке 10/110',	0,	28,	0,	5,	1546015307),
(45,	'tax-rate-27966',	'НДС  по расчетной ставке 20/120',	0,	28,	0,	6,	1546015307),
(46,	'system-guest',	'i18n::object-guest',	0,	51,	0,	2,	1498560575),
(47,	'emarket-orderstatus-27258',	'i18n::object-otmenen',	0,	42,	25,	1,	1498560650),
(48,	'emarket-orderstatus-27259',	'i18n::object-otklonen',	0,	42,	25,	2,	1498560650),
(49,	'emarket-orderstatus-27260',	'i18n::object-oplachivaetsya',	0,	42,	25,	3,	1498560650),
(50,	'emarket-orderstatus-27261',	'i18n::object-dostavlyaetsya',	0,	42,	25,	4,	1498560650),
(51,	'emarket-orderstatus-27262',	'i18n::object-ozhidaet_proverki',	0,	42,	25,	5,	1498560645),
(52,	'emarket-orderstatus-27263',	'i18n::object-prinyat',	0,	42,	25,	6,	1498560650),
(53,	'emarket-orderstatus-27264',	'i18n::object-gotov',	0,	42,	25,	7,	1498560650),
(54,	'emarket-orderstatus-editing',	'i18n::object-orderstatus-editing',	0,	42,	25,	8,	1498560651),
(55,	'emarket-order-credit-status-27932',	'i18n::object-credit-status-new',	0,	23,	25,	1,	1498560652),
(56,	'emarket-order-credit-status-27933',	'i18n::object-credit-status-hol',	0,	23,	25,	2,	1498560652),
(57,	'emarket-order-credit-status-27934',	'i18n::object-credit-status-ver',	0,	23,	25,	3,	1498560652),
(58,	'emarket-order-credit-status-27935',	'i18n::object-credit-status-rej',	0,	23,	25,	4,	1498560652),
(59,	'emarket-order-credit-status-27936',	'i18n::object-credit-status-can',	0,	23,	25,	5,	1498560652),
(60,	'emarket-order-credit-status-27937',	'i18n::object-credit-status-ovr',	0,	23,	25,	6,	1498560652),
(61,	'emarket-order-credit-status-27938',	'i18n::object-credit-status-agr',	0,	23,	25,	7,	1498560652),
(62,	'emarket-order-credit-status-27939',	'i18n::object-credit-status-app',	0,	23,	25,	8,	1498560652),
(63,	'emarket-order-credit-status-27940',	'i18n::object-credit-status-prr',	0,	23,	25,	9,	1498560652),
(64,	'emarket-order-credit-status-27941',	'i18n::object-credit-status-pvr',	0,	23,	25,	10,	1498560652),
(65,	'emarket-order-credit-status-27942',	'i18n::object-credit-status-fap',	0,	23,	25,	11,	1498560652),
(66,	'emarket-signing-type-bank',	'i18n::object-signingtype-bank',	0,	21,	25,	1,	1498560652),
(67,	'emarket-signing-type-partner',	'i18n::object-signingtype-partner',	0,	21,	25,	2,	1498560652),
(68,	'emarket-paymenttype-27236',	'i18n::object-sales_draft',	0,	43,	25,	1,	1498560645),
(69,	'emarket-paymenttype-27457',	'i18n::object-payonline_system',	0,	43,	25,	2,	1498560650),
(70,	'emarket-paymenttype-27458',	'i18n::object-to_courier',	0,	43,	25,	3,	1498560650),
(71,	'emarket-paymenttype-27486',	'i18n::object-robokassa',	0,	43,	25,	4,	1498560651),
(72,	'emarket-paymenttype-27487',	'i18n::object-rbk_money',	0,	43,	25,	5,	1498560651),
(73,	'emarket-paymenttype-27519',	'i18n::object-legal_bodies_account',	0,	43,	25,	6,	1498560651),
(74,	'emarket-paymenttype-payanyway',	'i18n::object-payanyway',	0,	43,	25,	7,	1498560651),
(75,	'emarket-paymenttype-dengionline',	'i18n::object-money_online',	0,	43,	25,	8,	1498560651),
(76,	'emarket-paymenttype-kvk',	'i18n::object-paymenttype-kvk',	0,	43,	25,	9,	1498560652),
(77,	'emarket-paymenttype-acquiropay',	'i18n::object-acquiropay',	0,	43,	25,	10,	1498560652),
(78,	'emarket-paymenttype-yandex30',	'i18n::object-paymenttype-yandex30',	0,	43,	25,	11,	1498560652),
(79,	'emarket-paymenttype-paypal',	'i18n::object-paymenttype-paypal',	0,	43,	25,	12,	1498560652),
(80,	'emarket-orderpaymentstatus-27380',	'i18n::object-inicialisirovana',	0,	45,	25,	1,	1498560650),
(81,	'emarket-orderpaymentstatus-27381',	'i18n::object-podtverjdena',	0,	45,	25,	2,	1498560650),
(82,	'emarket-orderpaymentstatus-27382',	'i18n::object-otklonena',	0,	45,	25,	3,	1498560650),
(83,	'emarket-orderpaymentstatus-27383',	'i18n::object-prinyata',	0,	45,	25,	4,	1498560650),
(84,	'emarket-order-payment-status-default',	'i18n::object-order-payment-status-default',	0,	45,	25,	5,	1498560652),
(85,	'emarket-deliverytype-27230',	'i18n::object-pickup',	0,	47,	25,	1,	1498560650),
(86,	'emarket-deliverytype-27233',	'i18n::object-courier_delivery',	0,	47,	25,	2,	1498560645),
(87,	'emarket-deliverytype-27481',	'i18n::object-russian_post',	0,	47,	25,	3,	1498560651),
(88,	'emarket-deliverytype-27958',	'i18n::object-type-apiship',	0,	47,	0,	4,	1498560509),
(89,	'emarket-orderdeliverystatus-27377',	'i18n::object-ojidaet_otgruzki',	0,	49,	25,	1,	1498560650),
(90,	'emarket-orderdeliverystatus-27378',	'i18n::object-dostavlyaetsya',	0,	49,	25,	2,	1498560650),
(91,	'emarket-orderdeliverystatus-27379',	'i18n::object-dostavlen',	0,	49,	25,	3,	1498560650),
(92,	'emarket-order-delivery-status-default',	'i18n::object-order-payment-status-default',	0,	49,	25,	4,	1498560652),
(93,	'emarket-orderdeliverystatus-27959',	'i18n::object-otmenen',	0,	49,	0,	5,	1498560509),
(94,	'emarket-orderdeliverystatus-27960',	'i18n::object-return',	0,	49,	0,	6,	1498560509),
(95,	'0a6697c2e0b67a404a645c2dd03f846e55afd981',	'i18n::object-monday',	0,	17,	25,	1,	1498560651),
(96,	'4ba74364fd714bc12a8e8943cc6a36a26eaa36df',	'i18n::object-tuesday',	0,	17,	25,	2,	1498560651),
(97,	'95b836e6799c016df64fdbab8d40d1c2b60173b3',	'i18n::object-wednesday',	0,	17,	25,	3,	1498560651),
(98,	'a9bbb4de15c70fc416f13be9760ef33c3b2c6d67',	'i18n::object-thursday',	0,	17,	25,	4,	1498560651),
(99,	'14a13a85a4e99c4f6c2fa9f42c4ff765e14415c3',	'i18n::object-friday',	0,	17,	25,	5,	1498560651),
(100,	'bd7e2b0388c70b3ae4f64fe0bf5533f16e814704',	'i18n::object-saturday',	0,	17,	25,	6,	1498560651),
(101,	'31586aa19a50a89a33e4d37a5d200671252fbd60',	'i18n::object-sunday',	0,	17,	25,	7,	1498560651),
(102,	'8d0a7e8844fd4b2eea8da19a39b81b048ce713d0',	'12:00',	0,	16,	25,	1,	1498560651),
(103,	'873f75be11e53b76dea6a438a97d3167d0aeb95c',	'23:00',	0,	16,	25,	2,	1498560651),
(104,	'4f4c3308c188af2a2e08d59aecfaa2690fcf9981',	'22:00',	0,	16,	25,	3,	1498560651),
(105,	'0837bbc4bf13fa667b3397def81d3a95a22f0739',	'21:00',	0,	16,	25,	4,	1498560651),
(106,	'c60043f184d65a3101c6df21a087bbf99875a60b',	'20:00',	0,	16,	25,	5,	1498560651),
(107,	'70df85f9ac44cb7c7598b6ef28a50ddaa21d3937',	'19:00',	0,	16,	25,	6,	1498560651),
(108,	'e7951bd7de49615dc83491a195b47b61e82263bf',	'18:00',	0,	16,	25,	7,	1498560651),
(109,	'0db9ccf6183c19890acb33bc83c6167c7e941a5b',	'17:00',	0,	16,	25,	8,	1498560651),
(110,	'76ef341932f74678306044a0fa3e0105f5564492',	'16:00',	0,	16,	25,	9,	1498560651),
(111,	'de1581726146cac70c29f0db6043eaa552da041f',	'15:00',	0,	16,	25,	10,	1498560651),
(112,	'a03164eed7751779efd5d55464af6ae13fc4696e',	'14:00',	0,	16,	25,	11,	1498560651),
(113,	'22df1963ca47cc9ae5f0228f56ceeff467a2a280',	'13:00',	0,	16,	25,	12,	1498560651),
(114,	'6bc46e77b86f1420917bee7a0e2154b34cdaad61',	'00:00',	0,	16,	25,	13,	1498560651),
(115,	'a86f018536b8cb5896cdb631c8da8f10f0253fd9',	'11:00',	0,	16,	25,	14,	1498560651),
(116,	'fffaba271c93a300f405a329f303686a9450bf5b',	'10:00',	0,	16,	25,	15,	1498560651),
(117,	'fd1f432dc313a02bcbcc9f405d8e9d121b01ba8d',	'09:00',	0,	16,	25,	16,	1498560651),
(118,	'23b3d29bb04eec144896f7f983b2f66611fe1435',	'08:00',	0,	16,	25,	17,	1498560651),
(119,	'8e0da95ba94e4757f3cc0f24bb0955069eb0f771',	'07:00',	0,	16,	25,	18,	1498560651),
(120,	'5dc9eb3a83efd4d3302570742365c0186386947d',	'06:00',	0,	16,	25,	19,	1498560651),
(121,	'14aa300dbddcacb6c76a4b5a364a034b6128693a',	'05:00',	0,	16,	25,	20,	1498560651),
(122,	'2054dced2668a57484cb2aa2498def91c22320ae',	'04:00',	0,	16,	25,	21,	1498560651),
(123,	'8794b39a7bd4fe275575b6b864cf1fcca4d6d93b',	'03:00',	0,	16,	25,	22,	1498560651),
(124,	'da2e75029f33e530c848c3aa89690ec07dd414b2',	'02:00',	0,	16,	25,	23,	1498560651),
(125,	'1648322caec238f02862b0449a33b58245a9d6ce',	'01:00',	0,	16,	25,	24,	1498560651),
(126,	'e99ecbbec4c871f3fb63c3cc85796e177d017614',	'i18n::object-male',	0,	4,	0,	1,	1498560524),
(127,	'7b04a4565f37a07f1c2ee54be8286017de6c56df',	'i18n::object-female',	0,	4,	0,	2,	1498560524),
(153,	'emarket-store-27147',	'i18n::object-main_store',	0,	81,	25,	1,	1498560646),
(154,	'russianpost_ems_standart',	'i18n::object-ems_standart',	0,	14,	25,	1,	1538039640),
(155,	'russianpost_ems_declared_value',	'i18n::object-ems_declared_value',	0,	14,	25,	2,	1538039640),
(156,	'russianpost_registered_wrapper',	'i18n::object-registered_wrapper',	0,	14,	25,	3,	1538039640),
(157,	'russianpost_registered_wrapper_first_class',	'i18n::object-registered_wrapper_first_class',	0,	14,	25,	4,	1538039640),
(158,	'russianpost_wrapper_with_declared_value',	'i18n::object-wrapper_with_declared_value',	0,	14,	25,	5,	1538039640),
(159,	'russianpost_wrapper_first_class_with_declared_value',	'i18n::object-wrapper_first_class_with_declared_value',	0,	14,	25,	6,	1538039640),
(160,	'russianpost_parcel_with_declared_value',	'i18n::object-parcel_with_declared_value',	0,	14,	25,	7,	1538039640),
(161,	'399872db6f3d1341ef99b406aa2a9e515292b0c9',	'i18n::object-surface',	0,	15,	25,	1,	1498560651),
(162,	'417baf8cefb99325510d31e974835254c980828b',	'i18n::object-air',	0,	15,	25,	2,	1498560651),
(163,	'76377e05d0ffd4b0f6f0e72a45645f4be10f1c66',	'i18n::object-composite',	0,	15,	25,	3,	1498560651),
(164,	'df383879afa5ac2e221b8fa0b0f2a6467da2886f',	'i18n::object-accelerated',	0,	15,	25,	4,	1498560651),
(165,	'sytem-citylist-26905',	'Москва',	0,	11,	25,	1,	1498560648),
(166,	'sytem-citylist-26906',	'Санкт-Петербург',	0,	11,	25,	2,	1498560648),
(167,	'sytem-citylist-26907',	'Новосибирск',	0,	11,	25,	3,	1498560648),
(168,	'sytem-citylist-26908',	'Екатеринбург',	0,	11,	25,	4,	1498560648),
(169,	'sytem-citylist-26909',	'Нижний Новгород',	0,	11,	25,	5,	1498560648),
(170,	'sytem-citylist-26910',	'Самара',	0,	11,	25,	6,	1498560648),
(171,	'sytem-citylist-26911',	'Омск',	0,	11,	25,	7,	1498560648),
(172,	'sytem-citylist-26912',	'Казань',	0,	11,	25,	8,	1498560648),
(173,	'sytem-citylist-26913',	'Челябинск',	0,	11,	25,	9,	1498560648),
(174,	'sytem-citylist-26914',	'Ростов-на-Дону',	0,	11,	25,	10,	1498560648),
(175,	'sytem-citylist-26915',	'Уфа',	0,	11,	25,	11,	1498560648),
(176,	'sytem-citylist-26916',	'Пермь',	0,	11,	25,	12,	1498560648),
(177,	'sytem-citylist-26917',	'Волгоград',	0,	11,	25,	13,	1498560648),
(178,	'sytem-citylist-26918',	'Красноярск',	0,	11,	25,	14,	1498560648),
(179,	'sytem-citylist-26919',	'Саратов',	0,	11,	25,	15,	1498560648),
(180,	'sytem-citylist-26920',	'Воронеж',	0,	11,	25,	16,	1498560648),
(181,	'sytem-citylist-26921',	'Краснодар',	0,	11,	25,	17,	1498560648),
(182,	'sytem-citylist-26922',	'Тольятти',	0,	11,	25,	18,	1498560648),
(183,	'sytem-citylist-26923',	'Ижевск',	0,	11,	25,	19,	1498560648),
(184,	'sytem-citylist-26924',	'Ульяновск',	0,	11,	25,	20,	1498560648),
(185,	'sytem-citylist-26925',	'Ярославль',	0,	11,	25,	21,	1498560648),
(186,	'sytem-citylist-26926',	'Барнаул',	0,	11,	25,	22,	1498560648),
(187,	'sytem-citylist-26927',	'Владивосток',	0,	11,	25,	23,	1498560648),
(188,	'sytem-citylist-26928',	'Хабаровск',	0,	11,	25,	24,	1498560648),
(189,	'sytem-citylist-26929',	'Иркутск',	0,	11,	25,	25,	1498560648),
(190,	'sytem-citylist-26930',	'Новокузнецк',	0,	11,	25,	26,	1498560648),
(191,	'sytem-citylist-26931',	'Тюмень',	0,	11,	25,	27,	1498560648),
(192,	'sytem-citylist-26932',	'Оренбург',	0,	11,	25,	28,	1498560648),
(193,	'sytem-citylist-26933',	'Кемерово',	0,	11,	25,	29,	1498560648),
(194,	'sytem-citylist-26934',	'Рязань',	0,	11,	25,	30,	1498560648),
(195,	'sytem-citylist-26935',	'Пенза',	0,	11,	25,	31,	1498560648),
(196,	'sytem-citylist-26936',	'Набережные Челны',	0,	11,	25,	32,	1498560649),
(197,	'sytem-citylist-26937',	'Тула',	0,	11,	25,	33,	1498560649),
(198,	'sytem-citylist-26938',	'Липецк',	0,	11,	25,	34,	1498560649),
(199,	'sytem-citylist-26939',	'Астрахань',	0,	11,	25,	35,	1498560649),
(200,	'sytem-citylist-26940',	'Томск',	0,	11,	25,	36,	1498560649),
(201,	'sytem-citylist-26941',	'Махачкала',	0,	11,	25,	37,	1498560649),
(202,	'sytem-citylist-26942',	'Киров',	0,	11,	25,	38,	1498560649),
(203,	'sytem-citylist-26943',	'Чебоксары',	0,	11,	25,	39,	1498560649),
(204,	'sytem-citylist-26944',	'Калининград',	0,	11,	25,	40,	1498560649),
(205,	'sytem-citylist-26945',	'Брянск',	0,	11,	25,	41,	1498560649),
(206,	'sytem-citylist-26946',	'Магнитогорск',	0,	11,	25,	42,	1498560649),
(207,	'sytem-citylist-26947',	'Иваново',	0,	11,	25,	43,	1498560649),
(208,	'sytem-citylist-26948',	'Курск',	0,	11,	25,	44,	1498560649),
(209,	'sytem-citylist-26949',	'Тверь',	0,	11,	25,	45,	1498560649),
(210,	'sytem-citylist-26950',	'Нижний Тагил',	0,	11,	25,	46,	1498560649),
(211,	'sytem-citylist-26951',	'Ставрополь',	0,	11,	25,	47,	1498560649),
(212,	'sytem-citylist-26952',	'Архангельск',	0,	11,	25,	48,	1498560649),
(213,	'sytem-citylist-26953',	'Белгород',	0,	11,	25,	49,	1498560649),
(214,	'sytem-citylist-26954',	'Улан-Удэ',	0,	11,	25,	50,	1498560649),
(215,	'sytem-citylist-26955',	'Владимир',	0,	11,	25,	51,	1498560649),
(216,	'sytem-citylist-26956',	'Сочи',	0,	11,	25,	52,	1498560649),
(217,	'sytem-citylist-26957',	'Калуга',	0,	11,	25,	53,	1498560649),
(218,	'sytem-citylist-26958',	'Курган',	0,	11,	25,	54,	1498560649),
(219,	'sytem-citylist-26959',	'Орёл',	0,	11,	25,	55,	1498560649),
(220,	'sytem-citylist-26960',	'Смоленск',	0,	11,	25,	56,	1498560649),
(221,	'sytem-citylist-26961',	'Мурманск',	0,	11,	25,	57,	1498560649),
(222,	'sytem-citylist-26962',	'Владикавказ',	0,	11,	25,	58,	1498560649),
(223,	'sytem-citylist-26963',	'Череповец',	0,	11,	25,	59,	1498560649),
(224,	'sytem-citylist-26964',	'Волжский',	0,	11,	25,	60,	1498560649),
(225,	'sytem-citylist-26965',	'Чита',	0,	11,	25,	61,	1498560649),
(226,	'sytem-citylist-26966',	'Саранск',	0,	11,	25,	62,	1498560649),
(227,	'sytem-citylist-26967',	'Сургут',	0,	11,	25,	63,	1498560649),
(228,	'sytem-citylist-26968',	'Вологда',	0,	11,	25,	64,	1498560649),
(229,	'sytem-citylist-26969',	'Тамбов',	0,	11,	25,	65,	1498560649),
(230,	'sytem-citylist-26970',	'Кострома',	0,	11,	25,	66,	1498560649),
(231,	'sytem-citylist-26971',	'Комсомольск-на-Амуре',	0,	11,	25,	67,	1498560649),
(232,	'sytem-citylist-26972',	'Нальчик',	0,	11,	25,	68,	1498560649),
(233,	'sytem-citylist-26973',	'Петрозаводск',	0,	11,	25,	69,	1498560649),
(234,	'sytem-citylist-26974',	'Стерлитамак',	0,	11,	25,	70,	1498560649),
(235,	'sytem-citylist-26975',	'Таганрог',	0,	11,	25,	71,	1498560649),
(236,	'sytem-citylist-26976',	'Братск',	0,	11,	25,	72,	1498560649),
(237,	'sytem-citylist-26977',	'Дзержинск',	0,	11,	25,	73,	1498560649),
(238,	'sytem-citylist-26978',	'Йошкар-Ола',	0,	11,	25,	74,	1498560649),
(239,	'sytem-citylist-26979',	'Орск',	0,	11,	25,	75,	1498560649),
(240,	'sytem-citylist-26980',	'Шахты',	0,	11,	25,	76,	1498560649),
(241,	'sytem-citylist-26981',	'Якутск',	0,	11,	25,	77,	1498560649),
(242,	'sytem-citylist-26982',	'Ангарск',	0,	11,	25,	78,	1498560649),
(243,	'sytem-citylist-26983',	'Нижневартовск',	0,	11,	25,	79,	1498560649),
(244,	'sytem-citylist-26984',	'Сыктывкар',	0,	11,	25,	80,	1498560649),
(245,	'sytem-citylist-26985',	'Новороссийск',	0,	11,	25,	81,	1498560649),
(246,	'sytem-citylist-26986',	'Нижнекамск',	0,	11,	25,	82,	1498560649),
(247,	'sytem-citylist-26987',	'Бийск',	0,	11,	25,	83,	1498560649),
(248,	'sytem-citylist-26988',	'Грозный',	0,	11,	25,	84,	1498560649),
(249,	'sytem-citylist-26989',	'Старый Оскол',	0,	11,	25,	85,	1498560649),
(250,	'sytem-citylist-26990',	'Великий Новгород',	0,	11,	25,	86,	1498560649),
(251,	'sytem-citylist-26991',	'Прокопьевск',	0,	11,	25,	87,	1498560649),
(252,	'sytem-citylist-26992',	'Рыбинск',	0,	11,	25,	88,	1498560649),
(253,	'sytem-citylist-26993',	'Норильск',	0,	11,	25,	89,	1498560649),
(254,	'sytem-citylist-26994',	'Благовещенск',	0,	11,	25,	90,	1498560649),
(255,	'sytem-citylist-26995',	'Энгельс',	0,	11,	25,	91,	1498560649),
(256,	'sytem-citylist-26996',	'Балаково',	0,	11,	25,	92,	1498560649),
(257,	'sytem-citylist-26997',	'Петропавловск-Камчатский',	0,	11,	25,	93,	1498560649),
(258,	'sytem-citylist-26998',	'Псков',	0,	11,	25,	94,	1498560649),
(259,	'sytem-citylist-26999',	'Северодвинск',	0,	11,	25,	95,	1498560649),
(260,	'sytem-citylist-27000',	'Армавир',	0,	11,	25,	96,	1498560649),
(261,	'sytem-citylist-27001',	'Златоуст',	0,	11,	25,	97,	1498560649),
(262,	'sytem-citylist-27002',	'Балашиха',	0,	11,	25,	98,	1498560649),
(263,	'sytem-citylist-27003',	'Каменск-Уральский',	0,	11,	25,	99,	1498560649),
(264,	'sytem-citylist-27004',	'Химки',	0,	11,	25,	100,	1498560649),
(265,	'sytem-citylist-27005',	'Сызрань',	0,	11,	25,	101,	1498560649),
(266,	'sytem-citylist-27006',	'Подольск',	0,	11,	25,	102,	1498560649),
(267,	'sytem-citylist-27007',	'Новочеркасск',	0,	11,	25,	103,	1498560649),
(268,	'sytem-citylist-27008',	'Королёв',	0,	11,	25,	104,	1498560649),
(269,	'sytem-citylist-27009',	'Южно-Сахалинск',	0,	11,	25,	105,	1498560649),
(270,	'sytem-citylist-27010',	'Волгодонск',	0,	11,	25,	106,	1498560649),
(271,	'sytem-citylist-27011',	'Находка',	0,	11,	25,	107,	1498560649),
(272,	'sytem-citylist-27012',	'Березники',	0,	11,	25,	108,	1498560649),
(273,	'sytem-citylist-27013',	'Абакан',	0,	11,	25,	109,	1498560649),
(274,	'sytem-citylist-27014',	'Мытищи',	0,	11,	25,	110,	1498560649),
(275,	'sytem-citylist-27015',	'Люберцы',	0,	11,	25,	111,	1498560649),
(276,	'sytem-citylist-27016',	'Рубцовск',	0,	11,	25,	112,	1498560649),
(277,	'sytem-citylist-27017',	'Майкоп',	0,	11,	25,	113,	1498560649),
(278,	'sytem-citylist-27018',	'Салават',	0,	11,	25,	114,	1498560649),
(279,	'sytem-citylist-27019',	'Уссурийск',	0,	11,	25,	115,	1498560649),
(280,	'sytem-citylist-27020',	'Миасс',	0,	11,	25,	116,	1498560649),
(281,	'sytem-citylist-27021',	'Ковров',	0,	11,	25,	117,	1498560649),
(282,	'sytem-citylist-27022',	'Коломна',	0,	11,	25,	118,	1498560649),
(283,	'sytem-citylist-27023',	'Электросталь',	0,	11,	25,	119,	1498560649),
(284,	'sytem-citylist-27024',	'Альметьевск',	0,	11,	25,	120,	1498560649),
(285,	'sytem-citylist-27025',	'Пятигорск',	0,	11,	25,	121,	1498560649),
(286,	'sytem-citylist-27026',	'Копейск',	0,	11,	25,	122,	1498560649),
(287,	'sytem-citylist-27027',	'Первоуральск',	0,	11,	25,	123,	1498560649),
(288,	'sytem-citylist-27028',	'Назрань',	0,	11,	25,	124,	1498560649),
(289,	'sytem-citylist-27029',	'Одинцово',	0,	11,	25,	125,	1498560649),
(290,	'sytem-citylist-27030',	'Невинномысск',	0,	11,	25,	126,	1498560649),
(291,	'sytem-citylist-27031',	'Кисловодск',	0,	11,	25,	127,	1498560649),
(292,	'sytem-citylist-27032',	'Димитровград',	0,	11,	25,	128,	1498560649),
(293,	'sytem-citylist-27033',	'Хасавюрт',	0,	11,	25,	129,	1498560649),
(294,	'sytem-citylist-27034',	'Новочебоксарск',	0,	11,	25,	130,	1498560649),
(295,	'sytem-citylist-27035',	'Новомосковск',	0,	11,	25,	131,	1498560649),
(296,	'sytem-citylist-27036',	'Серпухов',	0,	11,	25,	132,	1498560649),
(297,	'sytem-citylist-27037',	'Орехово-Зуево',	0,	11,	25,	133,	1498560649),
(298,	'sytem-citylist-27038',	'Муром',	0,	11,	25,	134,	1498560649),
(299,	'sytem-citylist-27039',	'Камышин',	0,	11,	25,	135,	1498560649),
(300,	'sytem-citylist-27040',	'Железнодорожный',	0,	11,	25,	136,	1498560649),
(301,	'sytem-citylist-27041',	'Нефтекамск',	0,	11,	25,	137,	1498560649),
(302,	'sytem-citylist-27042',	'Новый Уренгой',	0,	11,	25,	138,	1498560649),
(303,	'sytem-citylist-27043',	'Черкесск',	0,	11,	25,	139,	1498560649),
(304,	'sytem-citylist-27044',	'Ногинск',	0,	11,	25,	140,	1498560649),
(305,	'sytem-citylist-27045',	'Новошахтинск',	0,	11,	25,	141,	1498560649),
(306,	'sytem-citylist-27046',	'Нефтеюганск',	0,	11,	25,	142,	1498560649),
(307,	'sytem-citylist-27047',	'Щёлково',	0,	11,	25,	143,	1498560649),
(308,	'sytem-citylist-27048',	'Елец',	0,	11,	25,	144,	1498560649),
(309,	'sytem-citylist-27049',	'Ачинск',	0,	11,	25,	145,	1498560649),
(310,	'sytem-citylist-27050',	'Новокуйбышевск',	0,	11,	25,	146,	1498560649),
(311,	'sytem-citylist-27051',	'Сергиев Посад',	0,	11,	25,	147,	1498560649),
(312,	'sytem-citylist-27052',	'Ноябрьск',	0,	11,	25,	148,	1498560649),
(313,	'sytem-citylist-27053',	'Кызыл',	0,	11,	25,	149,	1498560649),
(314,	'sytem-citylist-27054',	'Дербент',	0,	11,	25,	150,	1498560649),
(315,	'sytem-citylist-27055',	'Октябрьский',	0,	11,	25,	151,	1498560649),
(316,	'sytem-citylist-27056',	'Северск',	0,	11,	25,	152,	1498560649),
(317,	'sytem-citylist-27057',	'Ленинск-Кузнецкий',	0,	11,	25,	153,	1498560649),
(318,	'sytem-citylist-27058',	'Арзамас',	0,	11,	25,	154,	1498560649),
(319,	'sytem-citylist-27059',	'Обнинск',	0,	11,	25,	155,	1498560649),
(320,	'sytem-citylist-27060',	'Ухта',	0,	11,	25,	156,	1498560649),
(321,	'sytem-citylist-27061',	'Междуреченск',	0,	11,	25,	157,	1498560649),
(322,	'sytem-citylist-27062',	'Киселёвск',	0,	11,	25,	158,	1498560649),
(323,	'sytem-citylist-27063',	'Новотроицк',	0,	11,	25,	159,	1498560649),
(324,	'sytem-citylist-27064',	'Батайск',	0,	11,	25,	160,	1498560649),
(325,	'sytem-citylist-27065',	'Элиста',	0,	11,	25,	161,	1498560649),
(326,	'sytem-citylist-27066',	'Артём',	0,	11,	25,	162,	1498560649),
(327,	'sytem-citylist-27067',	'Жуковский',	0,	11,	25,	163,	1498560649),
(328,	'sytem-citylist-27068',	'Великие Луки',	0,	11,	25,	164,	1498560649),
(329,	'sytem-citylist-27069',	'Канск',	0,	11,	25,	165,	1498560649),
(330,	'sytem-citylist-27070',	'Магадан',	0,	11,	25,	166,	1498560649),
(331,	'sytem-citylist-27071',	'Тобольск',	0,	11,	25,	167,	1498560650),
(332,	'sytem-citylist-27072',	'Глазов',	0,	11,	25,	168,	1498560650),
(333,	'swf-banner-quality-low',	'i18n::object-low',	0,	9,	25,	1,	1498560651),
(334,	'swf-banner-quality-medium',	'i18n::object-medium',	0,	9,	25,	2,	1498560651),
(335,	'swf-banner-quality-high',	'i18n::object-height',	0,	9,	25,	3,	1498560651),
(336,	'exchange-encoding-windows-1251',	'Windows-1251',	0,	27,	0,	1,	1498560543),
(337,	'exchange-encoding-utf-8',	'UTF-8',	0,	27,	0,	2,	1498560543),
(338,	'3fb6d39f5279c04f1bfec5a7cc13783a45d00141',	'i18n::object-commerceml_data_format',	0,	34,	25,	1,	1498560650),
(339,	'2c4eff97ef278f12c4461309e84dd0627bd4a37b',	'i18n::object-umiDump_data_format',	0,	34,	25,	2,	1498560651),
(340,	'23abbfa28d922d786d39218e3aa26719ad16ee47',	'i18n::object-csv_dataformat',	0,	34,	25,	3,	1498560651),
(341,	'cdc4a1f4e0ee63b2359d3dec91efe33d2a296c92',	'i18n::object-umi_export_umiDump',	0,	34,	25,	4,	1498560652),
(342,	'social_networks-network-27915',	'i18n::object-vkontakte',	0,	118,	25,	1,	1498560651),
(343,	'',	'Address for customer #14',	0,	37,	25,	1,	1498560645),
(345,	'',	'i18n::object-type-blue',	0,	124,	25,	1,	1498560645),
(347,	'',	'Ленинский',	0,	81,	25,	2,	1498560645),
(352,	'',	'i18n::object-sales_draft',	0,	44,	25,	9,	1499756611),
(355,	'',	'Главная страница',	0,	142,	25,	3,	1549012578),
(356,	'',	'Каталог товаров',	0,	80,	25,	4,	1577198855),
(357,	'',	'Новости',	0,	7,	25,	5,	1544795573),
(358,	'',	'Доставка и оплата',	0,	55,	25,	6,	1498560645),
(359,	'',	'Помощь',	0,	55,	25,	7,	1498560645),
(362,	'',	'О магазине',	0,	55,	25,	8,	1498560645),
(363,	'',	'Страница не найдена',	0,	55,	25,	9,	1499932211),
(364,	'',	'Уже пользуюсь',	0,	65,	25,	1,	1498646284),
(365,	'',	'Скоро приобрету',	0,	65,	25,	2,	1498560645),
(366,	'',	'Хочу, но нет возможности',	0,	65,	25,	3,	1499700598),
(367,	'',	'Ни в коем случае!',	0,	65,	25,	4,	1498560645),
(368,	'',	'Готовы ли вы купить iPad?',	0,	66,	25,	10,	1498560645),
(369,	'',	'Обзоры новинок техники',	0,	57,	25,	11,	1498560645),
(370,	'',	'Вопросы и ответы',	0,	73,	25,	12,	1498560645),
(371,	'',	'Admin',	0,	58,	25,	1,	1498560645),
(372,	'',	'Поделитесь мнениями',	0,	63,	25,	13,	1515762518),
(373,	'',	'Я выбрал M-150. Что скажете?',	0,	62,	25,	14,	1544792794),
(374,	'',	'Фан-клуб Pioneer',	0,	61,	25,	15,	1515762658),
(375,	'',	'Фотогалерея кабелей',	0,	71,	25,	16,	1498560645),
(393,	'',	'I already use it',	0,	65,	25,	5,	1498560645),
(394,	'',	'I am going to buy it soon',	0,	65,	25,	6,	1498560645),
(395,	'',	'I wish I had an opportunity',	0,	65,	25,	7,	1498560645),
(396,	'',	'Never!',	0,	65,	25,	8,	1498560645),
(415,	'',	'i18n::object-type-black',	0,	124,	25,	2,	1498560646),
(417,	'',	'i18n::object-type-red',	0,	124,	25,	3,	1498560646),
(420,	'',	'i18n::object-type-silver',	0,	124,	25,	4,	1498560646),
(421,	'',	'Лиговский',	0,	81,	25,	3,	1498560646),
(425,	'',	'i18n::object-type-mahogany',	0,	123,	25,	1,	1498560646),
(426,	'',	'i18n::object-type-ivory',	0,	123,	25,	2,	1498560646),
(427,	'',	'i18n::object-type-strass',	0,	123,	25,	3,	1498560646),
(435,	'',	'i18n::object-type-vinous',	0,	124,	25,	5,	1498560646),
(437,	'',	'Литейный',	0,	81,	25,	4,	1498560646),
(449,	'',	'i18n::object-type-brown',	0,	124,	25,	8,	1498560646),
(458,	'',	'i18n::object-type-green',	0,	124,	25,	9,	1498560646),
(463,	'',	'i18n::object-type-velour',	0,	123,	25,	4,	1498560646),
(505,	'',	'i18n::object-type-grey',	0,	124,	25,	11,	1498560647),
(537,	'',	'Спешите, акция!',	0,	54,	25,	79,	1501682123),
(538,	'',	'Только семь дней',	0,	54,	25,	80,	1501682095),
(556,	'',	'Электроника 432-Д',	0,	60,	25,	89,	1498560647),
(557,	'',	'Браво!',	0,	59,	25,	90,	1498560647),
(558,	'',	'С чего начать?',	0,	74,	25,	91,	1498560647),
(559,	'',	'Как снять корпус?',	0,	75,	25,	92,	1498560647),
(560,	'',	'Нужно ли выключать прибор?',	0,	75,	25,	93,	1498560647),
(561,	'',	'Я выбрал M-150. Что скажете?',	0,	63,	25,	94,	1515762658),
(562,	'',	'Оптоволоконный разъем',	0,	72,	25,	95,	1498560647),
(563,	'',	'BNC-коннектор',	0,	72,	25,	96,	1498560647),
(564,	'',	'Разъем для PSP',	0,	72,	25,	97,	1498560647),
(565,	'',	'Разъем firewire',	0,	72,	25,	98,	1498560647),
(642,	'emarket-discountmodificator-768-27135',	'i18n::object-test_percent_modifier',	0,	84,	25,	1,	1498560650),
(643,	'',	'27154',	0,	84,	25,	2,	1498560650),
(644,	'',	'27155',	0,	86,	25,	1,	1498560650),
(645,	'',	'27166',	0,	40,	25,	1,	1498560650),
(646,	'',	'i18n::object-type-red',	0,	40,	25,	2,	1498560650),
(647,	'',	'L',	0,	40,	25,	3,	1498560650),
(648,	'',	'i18n::object-type-without_design',	0,	40,	25,	4,	1498560650),
(649,	'',	'i18n::object-type-blue',	0,	40,	25,	5,	1498560650),
(650,	'',	'XL',	0,	40,	25,	6,	1498560650),
(651,	'',	'i18n::object-type-basic_design',	0,	40,	25,	7,	1498560650),
(652,	'',	'XXL',	0,	40,	25,	8,	1498560650),
(653,	'',	'i18n::object-type-personal_design',	0,	40,	25,	9,	1498560650),
(654,	'',	'27191',	0,	84,	25,	3,	1498560650),
(655,	'',	'items',	0,	86,	25,	2,	1498560650),
(656,	'',	'27196',	0,	84,	25,	4,	1498560650),
(657,	'',	'test',	0,	53,	25,	1,	1498560650),
(658,	'',	'27374',	0,	84,	25,	5,	1498560650),
(659,	'',	'items',	0,	86,	25,	3,	1498560650),
(660,	'',	'orderPrice',	0,	88,	25,	4,	1498560650),
(661,	'',	'orderPrice',	0,	88,	25,	5,	1498560650),
(662,	'',	'orderPrice',	0,	88,	25,	6,	1498560650),
(663,	'',	'userGroups',	0,	90,	25,	7,	1498560650),
(664,	'',	'orderPrice',	0,	88,	25,	8,	1498560650),
(665,	'',	'userGroups',	0,	90,	25,	9,	1498560650),
(666,	'',	'orderPrice',	0,	88,	25,	10,	1498560650),
(667,	'',	'userGroups',	0,	90,	25,	11,	1498560650),
(668,	'emarket-discountrule-798-27438',	'i18n::object-users',	0,	91,	25,	12,	1498560650),
(669,	'',	'orderPrice',	0,	88,	25,	13,	1498560650),
(670,	'',	'userGroups',	0,	90,	25,	14,	1498560650),
(671,	'',	'i18n::object-users',	0,	91,	25,	15,	1498560650),
(672,	'',	'allOrdersPrices',	0,	89,	25,	16,	1498560650),
(673,	'',	'orderPrice',	0,	88,	25,	17,	1498560650),
(674,	'',	'userGroups',	0,	90,	25,	18,	1498560650),
(675,	'',	'i18n::object-users',	0,	91,	25,	19,	1498560650),
(676,	'',	'allOrdersPrices',	0,	89,	25,	20,	1498560650),
(677,	'',	'dateRange',	0,	87,	25,	21,	1498560650),
(678,	'',	'userGroups',	0,	90,	25,	22,	1498560650),
(679,	'',	'allOrdersPrices',	0,	89,	25,	23,	1498560650),
(680,	'',	'Address for customer #27495',	0,	37,	0,	2,	1498560634),
(682,	'',	'homepage',	0,	109,	25,	1,	1499647263),
(684,	'',	'-',	0,	77,	25,	1,	1498560650),
(685,	'',	'Успей купить колонку в виде панды по сниженной цене',	0,	111,	25,	2,	1579524315),
(687,	'',	'Новости о мобильных гаджетах',	0,	76,	25,	1,	1498560650),
(688,	'',	'-',	0,	77,	25,	2,	1498560650),
(689,	'',	'еуые',	0,	40,	0,	10,	1498560589),
(737,	'filemanager-elfinder',	'i18n::object-filemanager-elfinder',	0,	122,	25,	1,	1498560651),
(763,	'',	'Администратор',	0,	70,	25,	1,	1513952108),
(764,	'call-order-template',	'Заказать звонок',	0,	69,	25,	1,	1498560652),
(1021,	'',	'Оплата по безналичному расчету',	0,	102,	25,	14,	1499931181),
(1023,	'',	'Пункт самовывоза: Москва, ул. Ленина 15 (+100 рублей)',	0,	93,	25,	6,	1501142655),
(1024,	'',	'Пункт самовывоза: Волгоград, ул. Пушкина 11 (+50 рублей)',	0,	93,	25,	7,	1501142873),
(1280,	'',	'Онлайн-запись',	0,	121,	0,	135,	1498560678),
(1281,	'',	'Доставка курьером',	0,	96,	0,	8,	1501084687),
(1282,	'',	'Меню для мобильной версии',	0,	52,	25,	2,	1542095604),
(1283,	'',	'Верхнее левое меню',	0,	52,	25,	3,	1513952620),
(1284,	'',	'Верхнее правое меню',	0,	52,	25,	4,	1510763132),
(1441,	'',	'Общие поля',	0,	141,	25,	1,	1548860315),
(1572,	'',	'Заказать звонок',	0,	67,	25,	136,	1499760018),
(1594,	'',	'Администратор',	0,	139,	25,	1,	1499777480),
(1597,	'',	'dummy',	0,	50,	25,	1,	1502103686),
(1598,	'social_networks-network-27915',	'i18n::object-vkontakte',	0,	118,	25,	1,	1500037211),
(1599,	'',	'178.16.152.254',	0,	83,	46,	1,	1501085627),
(1600,	'',	NULL,	0,	50,	0,	2,	1501141272),
(1601,	'',	'Ericssont DISEN9',	0,	41,	0,	1,	1501084463),
(1602,	'',	'Самовывоз из офиса: СПб, Красного Курсанта 25 (с 9:00 по 20:00 без выходных)',	0,	93,	25,	3,	1501142742),
(1603,	'',	'i18n::object-russian_post',	0,	95,	25,	9,	1501136387),
(1604,	'',	'Оплата при получении',	0,	99,	25,	5,	1501085496),
(1605,	'',	'Address for customer #1599',	0,	37,	0,	3,	1501085627),
(1606,	'',	'Заказ #22',	0,	50,	25,	3,	1506504622),
(1609,	'',	'178.16.152.254',	0,	83,	46,	2,	1501140743),
(1610,	'',	NULL,	0,	50,	0,	4,	1501140716),
(1612,	'',	'Dual X-980Z (Велюр)',	0,	41,	0,	5,	1501140716),
(1613,	'',	'178.16.152.254',	0,	83,	46,	3,	1501141545),
(1614,	'',	NULL,	0,	50,	0,	5,	1501141501),
(1615,	'',	'Ericssont DISEN9',	0,	41,	0,	6,	1501141501),
(1616,	'',	'178.16.152.254',	0,	83,	46,	4,	1501141846),
(1617,	'',	'Заказ #14',	0,	50,	0,	6,	1501237581),
(1618,	'',	'Akai BB-1442',	0,	41,	0,	7,	1501141766),
(1619,	'',	'Самовывоз из офиса: СПб, пр. Стачек 15 (пн-пт 11:00 до 19:00, сб-вс 13:00-16:00)',	0,	93,	25,	5,	1501142981),
(1622,	'',	'Менеджеры',	0,	36,	25,	3,	1501144845),
(1623,	'',	'SalesManager1',	0,	51,	25,	3,	1501144990),
(1624,	'',	'SalesManager2',	0,	51,	25,	4,	1501144976),
(1625,	'',	'SalesManager3',	0,	51,	25,	5,	1501145037),
(1626,	'',	'178.16.152.254',	0,	83,	46,	5,	1501145316),
(1627,	'',	'Заказ #15',	0,	50,	0,	7,	1501152945),
(1628,	'',	'Moskwich SINGED12',	0,	41,	0,	8,	1501145216),
(1629,	'',	'Teac 2525',	0,	41,	0,	9,	1501145220),
(1631,	'',	'Mpad INHIB100 (Красное дерево)',	0,	41,	0,	11,	1501145227),
(1632,	'',	'plaer N78',	0,	41,	0,	12,	1501145261),
(1633,	'',	'Телевизор «Panasonic»',	0,	41,	0,	13,	1501145243),
(1634,	'',	'Вrandon_start',	0,	51,	1634,	6,	1512647582),
(1638,	'',	'Sovet BC-HOOK (Слоновая кость)',	0,	41,	0,	15,	1501145780),
(1639,	'',	'Заказ #16',	0,	50,	1634,	9,	1501146136),
(1641,	'',	NULL,	0,	84,	25,	6,	1501146204),
(1642,	'',	'allOrdersPrices',	0,	89,	25,	24,	1501146204),
(1643,	'',	'i18n::object-users',	0,	91,	25,	25,	1501146204),
(1645,	'',	NULL,	0,	84,	25,	7,	1501146256),
(1647,	'',	NULL,	0,	84,	25,	8,	1501146286),
(1648,	'',	'orderPrice',	0,	88,	25,	26,	1501146331),
(1650,	'',	NULL,	0,	84,	25,	9,	1501146352),
(1651,	'',	'dateRange',	0,	87,	25,	27,	1501146352),
(1652,	'',	'Накопительная скидка - 3%',	0,	39,	25,	3,	1501146507),
(1653,	'',	NULL,	0,	84,	25,	10,	1501146452),
(1654,	'',	'allOrdersPrices',	0,	89,	25,	28,	1501146452),
(1655,	'',	'Накопительная скидка - 5%',	0,	39,	25,	4,	1501146541),
(1656,	'',	NULL,	0,	84,	25,	11,	1501146490),
(1657,	'',	'allOrdersPrices',	0,	89,	25,	29,	1501146490),
(1658,	'',	'Накопительная скидка - 10%',	0,	39,	25,	5,	1501146597),
(1659,	'',	NULL,	0,	84,	25,	12,	1501146573),
(1660,	'',	'allOrdersPrices',	0,	89,	25,	30,	1501146573),
(1661,	'',	'Скидка на заказ - 7%',	0,	39,	25,	6,	1501146681),
(1662,	'',	NULL,	0,	85,	25,	13,	1501146652),
(1663,	'',	'orderPrice',	0,	88,	25,	31,	1501146652),
(1664,	'',	'Скидка для своих',	0,	39,	25,	7,	1501146747),
(1665,	'',	NULL,	0,	84,	25,	14,	1501146722),
(1666,	'',	'userGroups',	0,	90,	25,	32,	1501146722),
(1668,	'',	NULL,	0,	84,	25,	15,	1501146786),
(1669,	'',	'dateRange',	0,	87,	25,	33,	1501146786),
(1670,	'',	'Распродажа аудиотехники',	0,	39,	25,	9,	1501146903),
(1671,	'',	NULL,	0,	84,	25,	16,	1501146878),
(1672,	'',	'items',	0,	86,	25,	34,	1501146878),
(1673,	'',	'dateRange',	0,	87,	25,	35,	1501146878),
(1674,	'',	'178.16.152.254',	0,	83,	46,	6,	1501245471),
(1675,	'',	'Заказ #18',	0,	50,	0,	10,	1501245461),
(1677,	'',	'Akai TF-000 (Стразы)',	0,	41,	0,	17,	1501147067),
(1678,	'',	'intellect_rebus',	0,	51,	1678,	7,	1512647585),
(1679,	'',	'Заказ #17',	0,	50,	1678,	11,	1501152893),
(1680,	'',	'Телевизор «Philips»',	0,	41,	1678,	18,	1501147258),
(1681,	'',	'Tekila_lover',	0,	51,	1681,	8,	1512647603),
(1682,	'',	'RamzesIII',	0,	51,	1682,	9,	1512647618),
(1683,	'',	'i_am_boss',	0,	51,	1683,	10,	1512647591),
(1684,	'',	'178.16.152.254',	0,	83,	46,	7,	1501235786),
(1685,	'',	NULL,	0,	50,	0,	12,	1501237623),
(1686,	'',	'Ericssont TOME2',	0,	41,	0,	19,	1501233617),
(1687,	'',	'178.16.152.254',	0,	83,	46,	8,	1501235993),
(1688,	'',	NULL,	0,	50,	0,	13,	1501235993),
(1689,	'',	'Coral GG-WP',	0,	41,	0,	20,	1501235993),
(1691,	'',	'Player B783 (Велюр)',	0,	41,	0,	22,	1501237178),
(1692,	'',	'dvd 01',	0,	41,	0,	23,	1501237189),
(1693,	'',	'Ericssont 415',	0,	41,	0,	24,	1501245342),
(1694,	'',	'Address for customer #1674',	0,	37,	0,	4,	1501245449),
(1695,	'',	NULL,	0,	50,	0,	14,	1501245486),
(1697,	'',	'Akai TF-000 (Стразы)',	0,	41,	0,	26,	1501245471),
(1698,	'',	'178.16.152.254',	0,	83,	46,	9,	1501245568),
(1699,	'',	'Заказ #19',	0,	50,	0,	15,	1501245595),
(1700,	'',	'plaer N78',	0,	41,	0,	27,	1501245525),
(1701,	'',	'Заказ #20',	0,	50,	1678,	16,	1501246036),
(1702,	'',	'Moskwich SINGED12',	0,	41,	1678,	28,	1501246015),
(1703,	'',	'95.188.69.249',	0,	83,	46,	10,	1501255771),
(1704,	'',	NULL,	0,	50,	0,	17,	1501255782),
(1705,	'',	'Sony PS-6750',	0,	41,	0,	29,	1501255771),
(1706,	'',	'plaer T2',	0,	41,	0,	30,	1501255782),
(1717,	'',	'178.16.152.254',	0,	83,	46,	11,	1501680522),
(1718,	'',	'Заказ #21',	0,	50,	0,	18,	1501681271),
(1719,	'',	'Ericssont 450',	0,	41,	0,	31,	1501679524),
(1720,	'',	'Address for customer #1717',	0,	37,	0,	5,	1501680461),
(1721,	'',	'Address for customer #1717',	0,	37,	0,	6,	1501680522),
(1724,	'',	'Выгрузка товаров в Яндекс.Маркет',	0,	115,	25,	1,	1501681657),
(1725,	'',	'Выгрузка каталога товаров в Excel',	0,	115,	25,	2,	1501681742),
(1726,	'',	'178.16.152.254',	0,	83,	46,	12,	1501843689),
(1727,	'',	NULL,	0,	50,	0,	19,	1501843696),
(1728,	'',	'Ericssont 415',	0,	41,	0,	32,	1501843673),
(1729,	'',	'146.185.223.166',	0,	83,	46,	13,	1501847772),
(1731,	'',	'146.185.223.132',	0,	83,	46,	14,	1501848065),
(1733,	'',	'146.185.223.123',	0,	83,	46,	15,	1501848091),
(1735,	'',	'146.185.223.163',	0,	83,	46,	16,	1501850103),
(1737,	'',	'37.115.184.31',	0,	83,	46,	17,	1501850120),
(1752,	'',	'176.10.115.139',	0,	83,	46,	18,	1502103686),
(1765,	'',	'Спорт и туризм',	0,	80,	25,	137,	1506348067),
(1766,	'',	'Велосипеды и аксессуары',	0,	80,	25,	138,	1542183692),
(1767,	'',	'Оранжевый',	0,	124,	25,	12,	1506343379),
(1768,	'',	'Хардтейл',	0,	146,	25,	1,	1506343500),
(1769,	'',	'i18n::object-male',	0,	152,	25,	1,	1506343507),
(1770,	'',	'18',	0,	150,	25,	1,	1506343521),
(1772,	'',	'Ободная',	0,	151,	25,	1,	1506343551),
(1773,	'',	'В коробке',	0,	149,	25,	1,	1506343565),
(1775,	'',	'26',	0,	148,	25,	1,	1506350230),
(1776,	'',	'Нет (3 года)',	0,	153,	25,	1,	1506343755),
(1777,	'',	'Городской',	0,	154,	25,	1,	1506344173),
(1778,	'',	'Взрослые велосипеды',	0,	80,	25,	139,	1542184846),
(1782,	'',	'Детские велосипеды',	0,	80,	25,	139,	1542184846),
(1787,	'',	'Велоаксессуары',	0,	80,	25,	139,	1542184846),
(1793,	'',	'Зоотовары',	0,	80,	25,	141,	1506348068),
(1794,	'',	'Для кошек',	0,	80,	25,	142,	1542185613),
(1795,	'',	'Для собак',	0,	80,	25,	143,	1542185613),
(1796,	'',	'Для птиц',	0,	80,	25,	144,	1542185613),
(1797,	'',	'Наполнители',	0,	80,	25,	145,	1542186144),
(1798,	'',	'Сухие корма',	0,	80,	25,	146,	1542186144),
(1799,	'',	'Влажные корма',	0,	80,	25,	147,	1542186144),
(1801,	'',	'Туалеты',	0,	80,	25,	149,	1542186203),
(1803,	'',	'Корма и лакомства',	0,	80,	25,	151,	1542186227),
(1806,	'',	'Бытовая техника',	0,	80,	25,	154,	1506348068),
(1807,	'',	'Парфюмерия и косметика',	0,	80,	25,	155,	1513775214),
(1823,	'',	'Велосипед Carrera Virtuoso Road Bike',	0,	177,	25,	2,	1545913233),
(1824,	'',	'Дорожный',	0,	146,	25,	2,	1506350159),
(1825,	'',	'Дорожный',	0,	154,	25,	2,	1506350182),
(1826,	'',	'Мужская одежда',	0,	80,	25,	157,	1506524601),
(1828,	'',	'i18n::object-type-green',	0,	124,	25,	13,	1506350309),
(1829,	'',	'Детская одежда',	0,	80,	25,	159,	1513775144),
(1831,	'',	'25',	0,	148,	25,	2,	1506350349),
(1832,	'',	'22',	0,	148,	25,	3,	1506350434),
(1833,	'',	'Boardman CX Comp Bike',	0,	177,	25,	3,	1545913243),
(1840,	'',	'Летняя ',	0,	80,	25,	167,	1542186940),
(1841,	'',	'Зимняя',	0,	80,	25,	168,	1542186851),
(1845,	'',	'i18n::object-female',	0,	152,	25,	2,	1506351350),
(1846,	'',	'Обувь ',	0,	80,	25,	172,	1542186851),
(1847,	'',	'Бирюзовый',	0,	124,	25,	14,	1506351366),
(1848,	'',	'Дисковая',	0,	151,	25,	2,	1506351561),
(1849,	'',	'Велосипед Mizani AR1 Womens Road Bike',	0,	177,	25,	4,	1545913265),
(1850,	'',	'Двухподвес',	0,	146,	25,	3,	1506352012),
(1851,	'',	'21',	0,	150,	25,	2,	1506352112),
(1852,	'',	'Laura Trott RD 2 Women\'s Road Bike',	0,	177,	25,	5,	1545913277),
(1853,	'',	'Горный',	0,	154,	25,	3,	1506352878),
(1854,	'',	'20',	0,	150,	25,	3,	1506352937),
(1855,	'',	'VooDoo Zobop Full Suspension Mountain Bike',	0,	177,	25,	6,	1545913287),
(1856,	'',	'23',	0,	148,	25,	4,	1506353445),
(1857,	'',	'Унисекс',	0,	152,	25,	3,	1506353459),
(1858,	'',	'Intuition Lambda Women\'s Road Bike',	0,	177,	25,	7,	1545913431),
(1859,	'',	'Apollo Paradox Road Bike',	0,	177,	25,	8,	1545913380),
(1860,	'',	'Elswick Harmony Girls Bike',	0,	177,	25,	9,	1513520051),
(1861,	'',	'20',	0,	148,	25,	5,	1506354470),
(1862,	'',	'Туристическое снаряжение',	0,	80,	25,	173,	1542184498),
(1863,	'',	'Палатки',	0,	80,	25,	174,	1506355954),
(1864,	'',	'14',	0,	148,	25,	6,	1506354843),
(1865,	'',	'TREK PLANET Lite Dome 2',	0,	184,	25,	10,	1513487962),
(1866,	'',	'Carrera Star Kids\' Bike',	0,	177,	25,	10,	1513520042),
(1867,	'',	'16',	0,	148,	25,	7,	1506355175),
(1868,	'',	'Apollo Fade Kids Bike',	0,	177,	25,	11,	1545913093),
(1869,	'',	'Палатка рыболовная Columbus Sea Shel',	0,	184,	25,	12,	1513519106),
(1870,	'',	'Полусфера',	0,	164,	25,	1,	1506355334),
(1871,	'',	'Палатка Columbus Sea Shell',	0,	184,	25,	13,	1545912969),
(1872,	'',	'Палатка 2-х местная Larsen A2',	0,	184,	25,	14,	1513519099),
(1874,	'',	'Часы',	0,	80,	25,	176,	1506439157),
(1875,	'',	'Мужские часы',	0,	80,	25,	177,	1542184984),
(1876,	'',	'Женские часы',	0,	80,	25,	178,	1542184985),
(1877,	'',	'Стандартная 3 года',	0,	166,	25,	1,	1506436790),
(1878,	'',	'3,5 года',	0,	166,	25,	2,	1506436862),
(1879,	'',	'Posio Edifice EQB-600D-1A2',	0,	82,	25,	179,	1513528673),
(1880,	'',	'i18n::object-russia',	0,	162,	25,	1,	1506436999),
(1882,	'',	'Китай',	0,	162,	25,	2,	1506437157),
(1883,	'',	'Кварцевые часы',	0,	176,	25,	1,	1506437179),
(1885,	'',	'Минеральное',	0,	173,	25,	1,	1506437310),
(1886,	'',	'Posio',	0,	171,	25,	1,	1506437316),
(1887,	'',	'Нержавеющая сталь',	0,	172,	25,	1,	1506437328),
(1888,	'',	'i18n::object-type-grey',	0,	175,	25,	1,	1506437352),
(1889,	'',	'Кварцевый хронограф',	0,	176,	25,	2,	1506438395),
(1890,	'',	'Jacques Lemans',	0,	171,	25,	2,	1506438409),
(1891,	'',	'Jacques Lemans London 1-1844D',	0,	170,	25,	64,	1513954117),
(1892,	'',	'Швейцария',	0,	162,	25,	3,	1506438652),
(1893,	'',	'Механические часы с ручным заводом',	0,	176,	25,	3,	1506438662),
(1894,	'',	'Сапфировое',	0,	173,	25,	2,	1506438677),
(1895,	'',	'Epos',	0,	171,	25,	3,	1506438700),
(1896,	'',	'Нержавеющая сталь + PVD покрытие',	0,	172,	25,	2,	1506438715),
(1897,	'',	'Золотой',	0,	175,	25,	2,	1506438723),
(1898,	'',	'Epos Passion 3403.193.24.15.25',	0,	170,	25,	65,	1513520452),
(1899,	'',	'Титан',	0,	172,	25,	3,	1506439082),
(1900,	'',	'Hublot',	0,	171,	25,	4,	1506439362),
(1901,	'',	'Montana 15 X',	0,	170,	25,	66,	1545912940),
(1902,	'',	'Финляндия',	0,	162,	25,	4,	1506439686),
(1903,	'',	'Электронные',	0,	176,	25,	4,	1506439697),
(1904,	'',	'Suunto',	0,	171,	25,	5,	1506439714),
(1905,	'',	'i18n::object-type-black',	0,	175,	25,	3,	1506439734),
(1906,	'',	'Suunto Core SS020692000',	0,	170,	25,	67,	1513520272),
(1907,	'',	'i18n::object-usa',	0,	162,	25,	5,	1506439862),
(1908,	'',	'Пластик',	0,	173,	25,	3,	1506439883),
(1909,	'',	'Пластик',	0,	172,	25,	4,	1506439895),
(1910,	'',	'Timex',	0,	171,	25,	6,	1506439903),
(1911,	'',	'i18n::object-type-blue',	0,	175,	25,	4,	1506439913),
(1912,	'',	'Timeman K9',	0,	170,	25,	68,	1513520177),
(1913,	'',	'Victorinox Swiss Army',	0,	171,	25,	7,	1506440137),
(1914,	'',	'Белый',	0,	175,	25,	5,	1506440167),
(1915,	'',	'Victorinox Swiss Army Chrono Classic',	0,	170,	25,	69,	1545913160),
(1916,	'',	'Япония',	0,	162,	25,	6,	1506440426),
(1917,	'',	'Seiko',	0,	171,	25,	8,	1506440451),
(1918,	'',	'Seiko Astron SSE021J1',	0,	170,	25,	70,	1513520513),
(1919,	'',	'Candino',	0,	171,	25,	9,	1506440655),
(1920,	'',	'Керамика',	0,	172,	25,	5,	1506440664),
(1921,	'',	'Candino Ceramic C6504.3',	0,	170,	25,	71,	1513520399),
(1922,	'',	'Michael Kors',	0,	171,	25,	10,	1506440872),
(1923,	'',	'Michael Kors Runway MK3493',	0,	170,	25,	72,	1513497652),
(1924,	'',	'Posio Baby-G BGA-130-1B',	0,	170,	25,	73,	1513497812),
(1925,	'',	'Boardman CX Comp Bike',	0,	41,	25,	33,	1506504580),
(1926,	'',	'Boardman CX Comp Bike',	0,	41,	25,	34,	1506504581),
(1927,	'',	'Laura Trott RD 2 Women\'s Road Bike',	0,	41,	25,	35,	1506504584),
(1928,	'',	'Carrera Star Kids\' Bike',	0,	41,	25,	36,	1506504587),
(1929,	'',	'Наполнитель древесный Vitaline',	0,	180,	25,	74,	1545912142),
(1930,	'',	'Средние',	0,	181,	25,	1,	1506515554),
(1931,	'',	'Древесина',	0,	182,	25,	1,	1506515561),
(1932,	'',	'Без добавок',	0,	183,	25,	1,	1506515576),
(1933,	'',	'Наполнитель древесный Барсик',	0,	180,	25,	75,	1545912325),
(1934,	'',	'Хлопок',	0,	182,	25,	2,	1506515780),
(1935,	'',	'Наполнитель впитывающий N1 NATUReL',	0,	180,	25,	76,	1545912639),
(1936,	'',	'Глина + мин. добавки',	0,	182,	25,	3,	1506515884),
(1937,	'',	'Наполнитель впитывающий Fresh Step',	0,	180,	25,	77,	1545912848),
(1938,	'',	'Насос велосипедный Bike Attitude GP23',	0,	82,	25,	180,	1513508262),
(1939,	'',	'Фляга BBB 750ml CompTank',	0,	82,	25,	181,	1513521673),
(1940,	'',	'Насос велосипедный ZEFAL Profil Max FP30',	0,	82,	25,	182,	1513521242),
(1941,	'',	'Спальные мешки',	0,	80,	25,	183,	1506522327),
(1942,	'',	'Спальный мешок Picrest СО2',	0,	82,	25,	184,	1513521370),
(1943,	'',	'Спальный мешок TREK PLANET Camper',	0,	82,	25,	185,	1513954118),
(1944,	'',	'Спальный мешок NOVA TOUR Валдай 300',	0,	82,	25,	186,	1513521689),
(1945,	'',	'Спальный мешок Greenell Tory',	0,	82,	25,	187,	1513521532),
(1946,	'',	'Спальный мешок Nova Tour Крым V2',	0,	82,	25,	188,	1513521593),
(1947,	'',	'Пакет',	0,	157,	25,	1,	1506520134),
(1948,	'',	'Взрослые',	0,	158,	25,	1,	1506520149),
(1949,	'',	'Любой размер',	0,	159,	25,	1,	1506520168),
(1950,	'',	'Кролик',	0,	160,	25,	1,	1506520177),
(1951,	'',	'Франция',	0,	162,	25,	7,	1506520196),
(1952,	'',	'Корм сухой Purina Pro Plan Sterilised feline with Rabbit dry',	0,	178,	25,	78,	1513521552),
(1953,	'',	'Ассорти',	0,	160,	25,	2,	1506520310),
(1954,	'',	'Упаковка сухих кормов 8 шт Purina CAT CHOW Adult',	0,	178,	25,	79,	1513521507),
(1955,	'',	'Курица, рис',	0,	160,	25,	3,	1506520417),
(1956,	'',	'Корм сухой Royal Canin Fit 32',	0,	178,	25,	80,	1513521736),
(1957,	'',	'Цыпленок, лосось, ягненок',	0,	160,	25,	4,	1506520501),
(1958,	'',	'Канада',	0,	162,	25,	8,	1506520513),
(1959,	'',	'Корм ProNature 28 Meat Fiesta with Chicken, Salmon &amp; Lamb Flavor',	0,	178,	25,	81,	1513521342),
(1960,	'',	'Любой',	0,	158,	25,	2,	1506520598),
(1961,	'',	'Лосось, форель',	0,	160,	25,	5,	1506520608),
(1962,	'',	'Корм GO! Sensitivity + Shine Trout+Salmon Cat Recipe, Grain Free',	0,	178,	25,	82,	1513521776),
(1963,	'',	'Паучи',	0,	157,	25,	2,	1506520724),
(1964,	'',	'Австрия',	0,	162,	25,	9,	1506520751),
(1965,	'',	'Упаковка паучей 12 шт Royal Canin Instinctive в соусе',	0,	178,	25,	83,	1513520602),
(1966,	'',	'Италия',	0,	162,	25,	10,	1506520873),
(1967,	'',	'Упаковка паучей 24 шт STUZZYCAT',	0,	178,	25,	84,	1513520545),
(1968,	'',	'Упаковка паучей 24 шт Purina Pro Plan NutriSavour Sterilised feline with Chicken in gravy',	0,	178,	25,	85,	1513520352),
(1969,	'',	'Железная банка',	0,	157,	25,	3,	1506521025),
(1970,	'',	'Таиланд',	0,	162,	25,	11,	1506521050),
(1972,	'',	'Упаковка консервов 14 шт Schesir',	0,	178,	25,	86,	1513520578),
(1973,	'',	'Упаковка консервов 48 шт Brit Care Tuna &amp; Salmon',	0,	178,	25,	87,	1513508119),
(1974,	'',	'Туалет для собак V.I.PET со столбиком 48x35x6 см малый, коричневый (P159-02)',	0,	82,	25,	189,	1513522133),
(1975,	'',	'Бельгия',	0,	162,	25,	12,	1506521542),
(1976,	'',	'Туалет Savic д/щенков мелких и средних пород S3240',	0,	82,	25,	190,	1513522164),
(1977,	'',	'Туалет для собак V.I.PET со стенкой 50x38x29 см малый (P130)',	0,	82,	25,	191,	1513522075),
(1978,	'',	'Малый и средний',	0,	159,	25,	2,	1506521761),
(1979,	'',	'Злаковые',	0,	160,	25,	6,	1506521776),
(1980,	'',	'Лакомства для канареек Cliffi, палочки с отборными зернами и медом',	0,	178,	25,	88,	1513526349),
(1981,	'',	'Картонная коробка',	0,	157,	25,	4,	1506522294),
(1982,	'',	'Корм для попугаев Cliffi, с ягодами фрутти и орехами',	0,	178,	25,	89,	1513526346),
(1983,	'',	'Верхняя одежда',	0,	80,	25,	192,	1542186965),
(1984,	'',	'Толстовки',	0,	80,	25,	193,	1542187123),
(1985,	'',	'Рубашки',	0,	80,	25,	194,	1542187123),
(1986,	'',	'Джинсы',	0,	80,	25,	195,	1542187123),
(1988,	'',	'Пальто',	0,	80,	25,	197,	1507121735),
(1989,	'',	'Пуховики',	0,	80,	25,	198,	1507121735),
(1991,	'',	'Oldman RZ Comp',	0,	177,	25,	3,	1545913391),
(1992,	'',	' Zobop  Mountain ',	0,	177,	25,	6,	1545913421),
(1993,	'',	'Trott RD',	0,	177,	25,	5,	1545913401),
(1994,	'',	'Paradox Bike',	0,	177,	25,	8,	1545913255),
(1995,	'',	' CX Comp Bike',	0,	177,	25,	3,	1545913412),
(1996,	'',	'AR1 Road Bike',	0,	177,	25,	4,	1545902134),
(1997,	'',	'Suspension Mountain Bike',	0,	177,	25,	6,	1545913443),
(1998,	'',	'Intuition  Women\'s Road',	0,	177,	25,	7,	1545913225),
(1999,	'',	'Nur Girls',	0,	177,	25,	9,	1513519915),
(2000,	'',	'Water PLA',	0,	177,	25,	10,	1513521642),
(2001,	'',	'Bord Kids Bike',	0,	177,	25,	11,	1513520048),
(2002,	'',	'CW-512 Yuppi',	0,	177,	25,	9,	1513520075),
(2003,	'',	'Grant 2',	0,	177,	25,	10,	1513521262),
(2004,	'',	'Moon\'s way',	0,	177,	25,	10,	1513521613),
(2005,	'',	'Elswick Love',	0,	177,	25,	9,	1513519702),
(2006,	'',	'RL 98 Stars',	0,	177,	25,	10,	1513521757),
(2007,	'',	'Edifice E-600',	0,	82,	25,	179,	1513519031),
(2008,	'',	'Edifice A2',	0,	82,	25,	179,	1513520207),
(2009,	'',	'Lemon 4RD',	0,	170,	25,	64,	1513954117),
(2010,	'',	'Ession V',	0,	170,	25,	65,	1513520313),
(2011,	'',	'Hublot Classic Fusion 515.NX.0170.LR',	0,	170,	25,	66,	1545913178),
(2012,	'',	'UtR 2000',	0,	170,	25,	67,	1513520192),
(2013,	'',	'Timex Ironman TW5K95700',	0,	170,	25,	68,	1513499242),
(2014,	'',	'Ed AN 12',	0,	82,	25,	179,	1513519042),
(2016,	'',	'Esans 2007',	0,	170,	25,	64,	1513954117),
(2017,	'',	'Es Lion',	0,	170,	25,	65,	1513520226),
(2018,	'',	'Edifice A2',	0,	82,	25,	179,	1513497821),
(2020,	'',	'Epos Passion 3403.193.24.15.25',	0,	170,	25,	65,	1513520189),
(2021,	'',	'Заказ #23',	0,	50,	25,	20,	1507734969),
(2022,	'',	'Велосипед Carrera Virtuoso Road Bike',	0,	41,	25,	37,	1507734800),
(2023,	'',	'Заказ #24',	0,	50,	25,	21,	1579524315),
(2025,	'',	'Демисезон',	0,	187,	25,	1,	1508425923),
(2026,	'',	'Молния+пуговицы',	0,	188,	25,	1,	1508425949),
(2027,	'',	'52-54',	0,	186,	25,	1,	1508425986),
(2028,	'',	'MiLtex',	0,	171,	25,	11,	1508426385),
(2029,	'',	'Мужское пальто с пластроном,черное.Арт 60',	0,	185,	25,	90,	1513523821),
(2030,	'',	'Камбоджа',	0,	162,	25,	13,	1508427207),
(2031,	'',	'Пуговицы',	0,	188,	25,	2,	1508427295),
(2032,	'',	'Mango Man',	0,	189,	25,	1,	1508427317),
(2033,	'',	'50-52',	0,	186,	25,	2,	1508427336),
(2034,	'',	'Бежевый',	0,	124,	25,	15,	1508427347),
(2035,	'',	'ARIZONA1',	0,	185,	25,	91,	1513523845),
(2037,	'',	'MitLex',	0,	189,	25,	2,	1508427482),
(2038,	'',	'MitLex',	0,	189,	25,	3,	1508427484),
(2039,	'',	'Вьетнам',	0,	162,	25,	14,	1508427616),
(2040,	'',	'Burton Menswear London',	0,	189,	25,	4,	1508427652),
(2041,	'',	'Burton Menswear London',	0,	185,	25,	92,	1513523762),
(2042,	'',	'BRUNO BANANI',	0,	189,	25,	5,	1508427896),
(2043,	'',	'Джинсы \"Dylan\" BRUNO BANANI',	0,	185,	25,	93,	1545913466),
(2044,	'',	'Roosevelt',	0,	189,	25,	6,	1508427937),
(2045,	'',	'48-50',	0,	186,	25,	3,	1508427944),
(2046,	'',	'Roosevelt RO044EMWJX83',	0,	185,	25,	94,	1513523837),
(2047,	'',	'Румыния',	0,	162,	25,	15,	1508428186),
(2048,	'',	'i18n::object-type-winter',	0,	187,	25,	2,	1508428202),
(2049,	'',	'RHODE ISLAND',	0,	189,	25,	7,	1508428205),
(2050,	'',	'United Colors of Benetton',	0,	189,	25,	8,	1508428234),
(2051,	'',	'Джинсы RHODE ISLAND',	0,	185,	25,	95,	1545913480),
(2052,	'',	'United Colors of Benetton UN012EMVWW05',	0,	185,	25,	96,	1513523744),
(2053,	'',	'Only & Sons',	0,	189,	25,	9,	1508428556),
(2054,	'',	'Only & Sons',	0,	189,	25,	10,	1508428557),
(2055,	'',	'Only & Sons',	0,	189,	25,	11,	1508428558),
(2056,	'',	'54-56',	0,	186,	25,	4,	1508428567),
(2057,	'',	'54-56',	0,	186,	25,	5,	1508428578),
(2058,	'',	'54-56',	0,	186,	25,	7,	1508428572),
(2059,	'',	'54-56',	0,	186,	25,	6,	1508428572),
(2060,	'',	'54-56',	0,	186,	25,	8,	1508428576),
(2061,	'',	'54-56',	0,	186,	25,	9,	1508428576),
(2062,	'',	'54-56',	0,	186,	25,	10,	1508428581),
(2063,	'',	'54-56',	0,	186,	25,	10,	1508428581),
(2064,	'',	'54-56',	0,	186,	25,	11,	1508428581),
(2065,	'',	'54-56',	0,	186,	25,	12,	1508428581),
(2066,	'',	'54-56',	0,	186,	25,	13,	1508428582),
(2067,	'',	'54-56',	0,	186,	25,	14,	1508428582),
(2068,	'',	'54-56',	0,	186,	25,	15,	1508428582),
(2069,	'',	'Джинсы RHODE ISLAND hard',	0,	185,	25,	97,	1545913489),
(2070,	'',	'Only &amp; Sons ON013EMUKB08',	0,	185,	25,	98,	1545913114),
(2071,	'',	'ДЖИНСЫ СТРЕТЧ ФАСОНА SLIM',	0,	185,	25,	99,	1545913497),
(2072,	'',	'Jack & Jones',	0,	189,	25,	12,	1508428904),
(2073,	'',	'ДЖИНСЫ ПРЯМОГО ПОКРОЯ С 5 КАРМАНАМИ',	0,	185,	25,	100,	1545913508),
(2074,	'',	'Jack &amp; Jones JA391EMUIX49',	0,	185,	25,	101,	1513523848),
(2075,	'',	'Kekker style',	0,	189,	25,	13,	1508429067),
(2076,	'',	'Kekker style',	0,	189,	25,	14,	1508429070),
(2077,	'',	'ДЖИНСЫ KEKKER ФАСОНА SLIM',	0,	185,	25,	102,	1545913516),
(2078,	'',	'ДЖИНСЫ KEKKER ФАСОНА Swag',	0,	185,	25,	103,	1545913791),
(2079,	'',	'Windsor',	0,	189,	25,	15,	1508513129),
(2080,	'',	'Windsor WI013EMWFG03',	0,	185,	25,	104,	1513523702),
(2081,	'',	'Молния',	0,	188,	25,	3,	1508513266),
(2082,	'',	'Trussardi Jeans',	0,	189,	25,	16,	1508513275),
(2083,	'',	'Trussardi Jeans',	0,	189,	25,	17,	1508513276),
(2084,	'',	'Trussardi Jeans TR016EMUWE49',	0,	185,	25,	105,	1513477031),
(2085,	'',	'Польша',	0,	162,	25,	16,	1508513514),
(2086,	'',	'Lagerfeld ',	0,	189,	25,	18,	1508513537),
(2088,	'',	'Демисезон, зима',	0,	187,	25,	3,	1508513762),
(2089,	'',	'Berkytt',	0,	189,	25,	19,	1508513774),
(2090,	'',	'Berkytt MP002XM0W5KQ',	0,	185,	25,	107,	1513477014),
(2091,	'',	'Piazza Italia',	0,	189,	25,	20,	1508514022),
(2092,	'',	'Piazza Italia PI022EMNYW60',	0,	185,	25,	108,	1513523633),
(2093,	'',	'Джинсы \"Peter\" FOR MEN',	0,	185,	25,	109,	1545913658),
(2094,	'',	'Atributika & Club',	0,	189,	25,	21,	1508514268),
(2095,	'',	'Atributika &amp; Club NHL CHICAGO BLACKHAWKS',	0,	185,	25,	110,	1513523851),
(2096,	'',	'Джинсы \"Peter\" BRUTAL',	0,	185,	25,	111,	1545913702),
(2097,	'',	'Trespass',	0,	189,	25,	22,	1508514460),
(2098,	'',	'Хакки',	0,	124,	25,	16,	1508514467),
(2099,	'',	'Trespass HIGHLAND',	0,	185,	25,	112,	1513954118),
(2100,	'',	'Джинсы KEKKER classic',	0,	185,	25,	113,	1545913747),
(2101,	'',	'EA7',	0,	189,	25,	23,	1508514640),
(2102,	'',	'JOHN DEVIN',	0,	189,	25,	24,	1508514645),
(2103,	'',	'Джинсы JOHN DEVIN',	0,	185,	25,	114,	1545913567),
(2104,	'',	'EA7 EA002EMUEE64',	0,	185,	25,	115,	1513954118),
(2105,	'',	'Reebok',	0,	189,	25,	25,	1508514906),
(2106,	'',	'Reebok Classics F LONG JACKET',	0,	185,	25,	116,	1545913072),
(2107,	'',	'Джинсы JOHN DEVIN strong',	0,	185,	25,	117,	1545913578),
(2108,	'',	'Bergans of Norway',	0,	189,	25,	26,	1508772154),
(2109,	'',	'SAUDA DOWN JKT',	0,	185,	25,	118,	1545913025),
(2110,	'',	'MEMURUTIND DOWN JKT',	0,	185,	25,	119,	1513523818),
(2111,	'',	'Springfield',	0,	189,	25,	27,	1508772699),
(2112,	'',	'Желтый',	0,	124,	25,	17,	1508772719),
(2113,	'',	'Springfield',	0,	185,	25,	120,	1513523698),
(2114,	'',	'Columbia',	0,	189,	25,	28,	1508773116),
(2115,	'',	'BARLOW PASS 550 TURBODOWN™ QUILTED JKT',	0,	185,	25,	121,	1513529037),
(2116,	'',	'SYLVAN LAKE 630 TURBODOWN™ HOODED JACKET',	0,	185,	25,	122,	1513523709),
(2117,	'',	'Baon',	0,	189,	25,	29,	1508773677),
(2118,	'',	'Baon',	0,	185,	25,	123,	1513954118),
(2119,	'',	'Индонезия',	0,	162,	25,	17,	1508773788),
(2120,	'',	'Quiksilver',	0,	189,	25,	30,	1508773834),
(2121,	'',	'Куртка утепленная ARRIS JACKET',	0,	185,	25,	124,	1513523827),
(2122,	'',	'Бангладеш',	0,	162,	25,	18,	1508774014),
(2123,	'',	'Columbia',	0,	189,	25,	31,	1508774028),
(2124,	'',	'Куртка утепленная MOUNT TABOR™ JACKET',	0,	185,	25,	125,	1513523804),
(2125,	'',	'Губная помада',	0,	80,	25,	201,	1542186661),
(2126,	'',	'Розовый',	0,	124,	25,	18,	1508858812),
(2127,	'',	'L`Oreal',	0,	197,	25,	1,	1508858834),
(2128,	'',	'Bell Lipstick тон 119',	0,	124,	25,	19,	1510671132),
(2129,	'',	'Bell',	0,	197,	25,	2,	1510671143),
(2130,	'',	'Bell Lipstick Classic, Тон 119',	0,	191,	25,	126,	1513520069),
(2131,	'',	'Губная помада Bell \"Classic\", тон 130',	0,	191,	25,	127,	1545912921),
(2133,	'',	'Bell Hypoallergenic пудровая губная помада Powder Lipstick Тон 05',	0,	191,	25,	129,	1513520087),
(2134,	'',	'L\'Oreal Paris Color Riche, MatteAddiction оттенок 633, Бархатный бежевый',	0,	191,	25,	130,	1513954117),
(2135,	'',	'Помада-бальзам для губ \"Sexy Balm, Infaillible\", полупрозрачный, оттенок 108',	0,	191,	25,	131,	1513954117),
(2136,	'',	'Фиолетовый',	0,	124,	25,	20,	1510673658),
(2137,	'',	'Maybelline New York',	0,	197,	25,	3,	1510673672),
(2138,	'',	'Увлажняющая помада для губ \"Color Sensational\", Maybelline New York',	0,	191,	25,	132,	1513487875),
(2139,	'',	'Великобритания',	0,	162,	25,	19,	1510673904),
(2140,	'',	'Rimmel',	0,	197,	25,	4,	1510673936),
(2141,	'',	'Губная помада \"rimmel lasting finish by kate\", тон 008, Rimmel',	0,	191,	25,	133,	1513520078),
(2142,	'',	'Лиловый',	0,	124,	25,	21,	1510674256),
(2143,	'',	'Увлажняющая помада Moisture Renew № 180, Rimmel',	0,	191,	25,	134,	1545913002),
(2144,	'',	'Сливовый',	0,	124,	25,	22,	1510674585),
(2145,	'',	'NOUBA',	0,	197,	25,	5,	1510674591),
(2146,	'',	'Устойчивая помада для губ MILLEBACI, NOUBA',	0,	191,	25,	135,	1513954117),
(2147,	'',	'MAX FACTOR',	0,	197,	25,	6,	1510674892),
(2148,	'',	'Губная помада \"Colour Elixir Lipstick\", MAX FACTOR',	0,	191,	25,	136,	1513520013),
(2149,	'',	'Revlon',	0,	197,	25,	7,	1510675130),
(2150,	'',	'Помада для губ \"Super Lustrous Lipstick\", Rum raisin 535, Revlon',	0,	191,	25,	137,	1513520036),
(2151,	'',	'Губная помада \"Classic\", тон 123, Bell',	0,	191,	25,	138,	1513520063),
(2154,	'',	'Беларусь',	0,	162,	25,	20,	1510818728),
(2155,	'',	'LUXVISAGE',	0,	197,	25,	8,	1510818738),
(2156,	'',	'LUXVISAGE',	0,	191,	25,	139,	1513520039),
(2161,	'',	'Клетки',	0,	80,	25,	202,	1542186227),
(2162,	'',	'Клетка InterZoo LUNA, 45х28х42.5 см',	0,	200,	25,	144,	1545907833),
(2163,	'',	'INTER-ZOO SONIA Р-025',	0,	200,	25,	145,	1513520686),
(2164,	'',	'INTER-ZOO MARGOT I Р-048',	0,	200,	25,	146,	1513520646),
(2165,	'',	'SAVIC ARTE 50 S5570',	0,	200,	25,	147,	1513520666),
(2166,	'',	'FERPLAST REKORD',	0,	200,	25,	148,	1513954118),
(2167,	'',	'Орехи, Фрукты',	0,	160,	25,	7,	1511606621),
(2168,	'',	'Корм для попугаев Cliffi, с фруктами и орехами',	0,	178,	25,	149,	1513526352),
(2170,	'',	'Лакомство Fiory Biscottelli with apples',	0,	178,	25,	151,	1513526334),
(2171,	'',	'Лесные ягоды',	0,	160,	25,	8,	1511608089),
(2172,	'',	'Лакомство Рио Бисквиты для птиц с лесными ягодами',	0,	178,	25,	152,	1513526358),
(2173,	'',	'Духовые шкафы',	0,	80,	25,	203,	1542186300),
(2174,	'',	'RICCI',	0,	201,	25,	1,	1511608636),
(2175,	'',	'Механическое',	0,	203,	25,	1,	1511608665),
(2177,	'',	'духовка газовая RGO-610BL',	0,	202,	25,	154,	1545905246),
(2178,	'',	'Hansa',	0,	201,	25,	2,	1511609180),
(2179,	'',	'Электрический духовой шкаф Hansa BOEW68077',	0,	202,	25,	155,	1545908313),
(2180,	'',	'Электрический духовой шкаф Hansa BOES68077',	0,	202,	25,	156,	1545908365),
(2181,	'',	'Bosch',	0,	201,	25,	3,	1511609497),
(2182,	'',	'Электронный',	0,	203,	25,	2,	1511609511),
(2183,	'',	'Электрический духовой шкаф Bosch Serie | 6 HBA23B351R',	0,	202,	25,	157,	1545908990),
(2184,	'',	'Samsung',	0,	201,	25,	4,	1511609697),
(2185,	'',	'Электрический духовой шкаф Samsung NV70K2340RS',	0,	202,	25,	158,	1545909389),
(2186,	'',	'Стиральные машины',	0,	80,	25,	204,	1542186300),
(2187,	'',	'LG E10B8ND',	0,	204,	25,	159,	1513521043),
(2188,	'',	'LG',	0,	205,	25,	1,	1511611163),
(2189,	'',	'Bosch',	0,	205,	25,	2,	1511611274),
(2190,	'',	'Стиральная машина BOSCH WLG20165OE',	0,	204,	25,	160,	1513477082),
(2191,	'',	'Indesit',	0,	205,	25,	3,	1511611554),
(2192,	'',	'INDESIT EWSC 51051 B',	0,	204,	25,	161,	1513521052),
(2193,	'',	'Xanter',	0,	51,	25,	11,	1512647365),
(2194,	'',	'Gennadiy',	0,	51,	25,	12,	1512647379),
(2195,	'',	'O_donnel',	0,	51,	25,	13,	1512647392),
(2196,	'',	'Viktor_vuten',	0,	51,	25,	14,	1512647414),
(2197,	'',	'No_body',	0,	51,	25,	15,	1512647579),
(2198,	'',	'kekman',	0,	51,	25,	16,	1512648024),
(2199,	'',	'Стиральная машина BOSCH WLN2426EOE',	0,	204,	25,	162,	1513754850),
(2200,	'',	'SAMSUNG',	0,	205,	25,	4,	1513755157),
(2201,	'',	'Стиральная машина SAMSUNG WW70J52E04W',	0,	204,	25,	163,	1513755551),
(2202,	'',	'BEKO',	0,	205,	25,	5,	1513755782),
(2203,	'',	'Стиральная машина BEKO WKB 51031 PTMA',	0,	204,	25,	164,	1513755941),
(2204,	'',	'ZANUSSI',	0,	205,	25,	6,	1513756120),
(2205,	'',	'Стиральная машина ZANUSSI ZWY61025RI',	0,	204,	25,	165,	1513756714),
(2206,	'',	'SHARP',	0,	205,	25,	7,	1513756413),
(2207,	'',	'Стиральная машина SHARP ES-FB5102AR',	0,	204,	25,	166,	1513756566),
(2208,	'',	'Пылесосы',	0,	80,	25,	205,	1542186478),
(2209,	'',	'Пылесос с контейнером для пыли TEFAL TW3786RA Compact Power',	0,	206,	25,	167,	1513757565),
(2210,	'',	'Вертикальный пылесос KITFORT КТ-506',	0,	206,	25,	168,	1513757857),
(2211,	'',	'Пылесос DYSON DC37 Allergy Musclehead',	0,	206,	25,	169,	1513758149),
(2212,	'',	'Пылесос MIDEA VCS35B15K-B',	0,	206,	25,	170,	1513758534),
(2213,	'',	'Пылесос BOSCH BGL32500',	0,	206,	25,	171,	1513758869),
(2214,	'',	'Пылесос LG VC73203UHAO',	0,	206,	25,	172,	1513759148),
(2215,	'',	'Пылесос PHILIPS FC8588/01 Performer Active',	0,	206,	25,	173,	1513759403),
(2216,	'',	'Пылесос SAMSUNG SC5241 (VCC5241S3K/XEV)',	0,	206,	25,	174,	1513759610),
(2217,	'',	'Холодильники',	0,	80,	25,	206,	1542186478),
(2218,	'',	'Двухкамерный',	0,	207,	25,	1,	1513760962),
(2219,	'',	'Холодильник INDESIT DF 4160 W',	0,	208,	25,	175,	1513761128),
(2220,	'',	'Холодильник SAMSUNG RB37J5000WW',	0,	208,	25,	176,	1513761411),
(2221,	'',	'Холодильник BEKO RCNK400E20ZGR',	0,	208,	25,	177,	1513761680),
(2222,	'',	'Трехкамерный',	0,	207,	25,	2,	1513761882),
(2223,	'',	'Холодильник HITACHI R-SG37BPU GS',	0,	208,	25,	178,	1513761991),
(2224,	'',	'Холодильник LG GA-E429SQRZ',	0,	208,	25,	179,	1513762239),
(2225,	'',	'Холодильник GORENJE NRK6192MCH',	0,	208,	25,	180,	1513762582),
(2226,	'',	'Холодильник BOSCH VitaFresh KGN39LQ3AR',	0,	208,	25,	181,	1513762860),
(2227,	'',	'Холодильник LIEBHERR CTP 3316-22 001',	0,	208,	25,	182,	1513763151),
(2228,	'',	'КУРТКА REIMA REIMATEC WINTER JACKET PENTTI СИНЯЯ',	0,	185,	25,	183,	1513765174),
(2229,	'',	'КУРТКА REIMA REIMATEC WINTER TAAG ЗЕЛЕНАЯ',	0,	185,	25,	184,	1513765471),
(2230,	'',	'Голубая',	0,	124,	25,	23,	1513765693),
(2231,	'',	'КУРТКА ПУХОВАЯ ДЛЯ ДЕВОЧКИ REIMA FERN ГОЛУБАЯ',	0,	185,	25,	185,	1513765735),
(2232,	'',	'КУРТКА ПУХОВАЯ ДЛЯ МАЛЬЧИКА REIMA JANNE СИНЯЯ',	0,	185,	25,	186,	1513766005),
(2233,	'',	'КОМБИНЕЗОН REIMA REIMATEC® WINTER OVERALL PUHURI СИНИЙ',	0,	185,	25,	187,	1513766273),
(2234,	'',	'КОМБИНЕЗОН ФЛИСОВЫЙ REIMA FLEECE OVERALL ESTER 74-98 Р СИНИЙ',	0,	185,	25,	188,	1513766552),
(2235,	'',	'КОМБИНЕЗОН ФЛИСОВЫЙ REIMA FLEECE OVERALL ESTER 74-98 Р СЕРЫЙ',	0,	185,	25,	189,	1513766881),
(2236,	'',	'КОМБИНЕЗОН ФЛИСОВЫЙ REIMA FLEECE OVERALL TAHTI СИНИЙ',	0,	185,	25,	190,	1513767049),
(2237,	'',	'i18n::object-type-summer',	0,	187,	25,	4,	1513767523),
(2238,	'',	'КУРТКА ДЛЯ МАЛЬЧИКОВ СИНЯЯ/ГОЛУБАЯ MAYORAL',	0,	185,	25,	191,	1513767579),
(2239,	'',	'КУРТКА LASSIE SOFTSHELL JACKET ЧЕРНАЯ С РОЗОВЫМ',	0,	185,	25,	192,	1513767810),
(2240,	'',	'КУРТКА REIMA WINDFLEECE JACKET VUOKSI РОЗОВАЯ',	0,	185,	25,	193,	1513768021),
(2241,	'',	'ВЕТРОВКА ДЛЯ ДЕВОЧКИ ГОЛУБАЯ MAYORAL',	0,	185,	25,	194,	1513768260),
(2242,	'',	'КУРТКА КОРИЧНЕВАЯ VITACCI',	0,	185,	25,	195,	1513768466),
(2243,	'',	'Мультиколор',	0,	124,	25,	24,	1513768564),
(2244,	'',	'ПАЛЬТО МУЛЬТИКОЛОР VITACCI',	0,	185,	25,	196,	1513768605),
(2245,	'',	'ПЛАЩ КРАСНЫЙ VITACCI',	0,	185,	25,	197,	1513768767),
(2246,	'',	'ДОЖДЕВИК СВЕТЛЯЧОК КРАСНЫЙ-ЖЕЛТЫЙ ЧУДО-ЧАДО',	0,	185,	25,	198,	1513768952),
(2247,	'',	'САПОГИ ДЛЯ ДЕВОЧКИ PUTKIVARSI ЗВЕЗДЫ РР 21-26 РОЗОВЫЕ KUOMA',	0,	209,	25,	199,	1513773921),
(2248,	'',	'ПОЛУБОТИНКИ REIMA LOTTE СИНИЕ',	0,	209,	25,	200,	1513774140),
(2249,	'',	'БОТИНКИ LASSIE LASSIETEC CARLISLE РОЗОВЫЕ',	0,	209,	25,	201,	1513774343),
(2250,	'',	'САПОГИ LASSIE COLDWELL СИНИЕ',	0,	209,	25,	202,	1513774566),
(2251,	'',	'САПОГИ LASSIE COLDWELL ЛИЛОВЫЕ',	0,	209,	25,	203,	1513774791),
(2252,	'',	'САПОГИ LASSIE LASSIETEC BOULDER ЧЕРНЫЕ С ОРАНЖЕВЫМ',	0,	209,	25,	204,	1513774947),
(2253,	'',	'САНДАЛИИ LASSIE MARLE GRAPHITE BLUE',	0,	209,	25,	205,	1513775162),
(2254,	'',	'БОТИНКИ PATROL КЭМЭЛ',	0,	209,	25,	206,	1513775350),
(2255,	'',	'Толстовка, Scorpion Bay',	0,	185,	25,	207,	1513777865),
(2256,	'',	'Толстовка, Think Pink',	0,	185,	25,	208,	1513777572),
(2257,	'',	'Темно-синий, малиновый',	0,	124,	25,	25,	1513778026),
(2258,	'',	'Толстовка, VOI JEANS',	0,	185,	25,	209,	1513778097),
(2259,	'',	'Толстовка, GARCIA',	0,	185,	25,	210,	1513778453),
(2260,	'',	'Толстовка, Quiksilver',	0,	185,	25,	211,	1513778616),
(2261,	'',	'Толстовка, Catbalou',	0,	185,	25,	212,	1513778806),
(2262,	'',	'Толстовка, VON DUTCH',	0,	185,	25,	213,	1513954117),
(2263,	'',	'Толстовка, Forward',	0,	185,	25,	214,	1513779389),
(2264,	'',	'Рубашка, Envy Lab',	0,	185,	25,	215,	1513779821),
(2265,	'',	'Рубашка, Oodji',	0,	185,	25,	216,	1513779984),
(2266,	'',	'Рубашка, U.S. Polo Assn.',	0,	185,	25,	217,	1513780134),
(2267,	'',	'Рубашка, ELIZ X GRAND',	0,	185,	25,	218,	1513782313),
(2268,	'',	'Рубашка, GUESS',	0,	185,	25,	219,	1513780364),
(2269,	'',	'Рубашка, CHOUPETTE',	0,	185,	25,	220,	1513780464),
(2270,	'',	'Рубашка Slim, S.OLIVER',	0,	185,	25,	221,	1513780655),
(2271,	'',	'Рубашка, TOM TAILOR',	0,	185,	25,	222,	1513780816),
(2272,	'',	'Шампуни',	0,	80,	25,	223,	1542186661),
(2273,	'',	'MOROCCANOIL Шампунь увлажняющий 1000 мл',	0,	211,	25,	223,	1513841392),
(2274,	'',	'Greymy Professiona Shine Shampoo Шампунь для блеска 200мл',	0,	211,	25,	224,	1513841614),
(2275,	'',	'ESTEL Haute Couture Luxury Repair Шампунь для волос 250мл',	0,	211,	25,	225,	1513954117),
(2276,	'',	'Dermalogica daily cleansing shampoo Ежедневный шампунь для здоровья волос 250 мл',	0,	211,	25,	226,	1513841965),
(2277,	'',	'L’Oreal Professionnel Absolut Lipidium / Восстанавливающий шампунь для поврежденных волос Абсолют Репэр Липидиум 250мл',	0,	211,	25,	227,	1513842137),
(2278,	'',	'Davines NOUNOU shampoo Питательный шампунь для уплотнения волос 250 мл',	0,	211,	25,	228,	1513954117),
(2279,	'',	'KAPOUS Studio Шампунь для восстановления волос «Profound Re» серии «Caring Line» 350мл',	0,	211,	25,	229,	1513842477),
(2280,	'',	'ALFAPARF Кератиновый шампунь-гладкость для волос LISSE DESIGN MAINTENANCE SHAMPOO 250 ml',	0,	211,	25,	230,	1513842627),
(2281,	'',	'Красители для волос',	0,	80,	25,	231,	1542186661),
(2282,	'',	'BAREX JOC Color Shine Developer 6% Оксигент с эффектом блеска 6% 125мл',	0,	211,	25,	231,	1513844170),
(2283,	'',	'ESTEL 8/7 Краска-уход De Luxe, светло-русый коричневый 60 мл',	0,	211,	25,	232,	1513844181),
(2284,	'',	'BAREX JOC Color Крем-краска 7.3 - Блондин золотистый 100мл',	0,	211,	25,	233,	1513844195),
(2285,	'',	'ALFAPARF Milano PIGMENTS Violet ash Ультраконцентрированный пигмент в мини-упаковке, перламутрово-пепельный .21 8мл',	0,	211,	25,	234,	1513844205),
(2286,	'',	'FULL COLOR color corrector in drops Корректор цвета в каплях красный 10мл',	0,	211,	25,	235,	1513844216),
(2287,	'',	'ESTEL 10/66 Краска-уход De Luxe, светлый блондин фиолетовый интенсивный 60 мл',	0,	211,	25,	236,	1513844517),
(2288,	'',	'ALFAPARF Milano PIGMENTS Golden mahogany Ультраконцентрированный пигмент в мини-упаковке, золотисто-махагоновый .35 8мл',	0,	211,	25,	237,	1513844696),
(2289,	'',	'ESTEL 8/7 Краска-уход De Luxe, светло-русый коричневый 60 мл',	0,	211,	25,	238,	1513844878),
(2290,	'',	'i18n::object-social_categories_perfumery',	0,	80,	25,	239,	1542186661),
(2291,	'',	'i18n::object-male',	0,	213,	25,	1,	1513845799),
(2292,	'',	'Antonio Banderas Blue Seduction Play Eau de Toilette',	0,	215,	25,	239,	1513845865),
(2293,	'',	'Gucci Guilty Pour Homme Absolute Eau De Parfum',	0,	215,	25,	240,	1513846171),
(2294,	'',	'Carolina Herrera 212 VIP Black Eau de Parfum',	0,	215,	25,	241,	1513846330),
(2295,	'',	'Lacoste L\'Homme Eau De Toilette',	0,	215,	25,	242,	1513846494),
(2296,	'',	'i18n::object-female',	0,	213,	25,	2,	1513846649),
(2297,	'',	'Thierry Mugler Angel Muse Eau de Parfum',	0,	215,	25,	243,	1513846707),
(2298,	'',	'Shakira Dance Eau de Toilette',	0,	215,	25,	244,	1513846842),
(2299,	'',	'Carolina Herrera Good Girl Eau De Parfum',	0,	215,	25,	245,	1513846941),
(2300,	'',	'Masaki Matsushima Matsu Sakura Eau De Parfum',	0,	215,	25,	246,	1513847161),
(2301,	'',	'Самокаты',	0,	80,	25,	247,	1542183692),
(2302,	'',	'Yedoo',	0,	218,	25,	1,	1513849370),
(2303,	'',	'80кг',	0,	220,	25,	1,	1513849428),
(2304,	'',	'САМОКАТ YEDOO OX NEW ЧЕРНЫЙ/ЗЕЛЕНЫЙ',	0,	219,	25,	247,	1513849646),
(2305,	'',	'Trolo Raptor',	0,	218,	25,	2,	1513849818),
(2306,	'',	'100',	0,	220,	25,	2,	1513849845),
(2307,	'',	'100кг',	0,	220,	25,	3,	1513849861),
(2308,	'',	'САМОКАТ TROLO RAPTOR 230 (2017) БЕЛЫЙ',	0,	219,	25,	248,	1513849947),
(2309,	'',	'MICRO SPEED',	0,	218,	25,	3,	1513850067),
(2310,	'',	'САМОКАТ MICRO SPEED+ ЧЕРНЫЙ',	0,	219,	25,	249,	1513850181),
(2311,	'',	'Micro Suspension',	0,	218,	25,	4,	1513850318),
(2312,	'',	'САМОКАТ MICRO SUSPENSION (SA0065) ДВА АМОРТИЗАТОРА БРОНЗА',	0,	219,	25,	250,	1513850418),
(2313,	'',	'Razor',	0,	218,	25,	5,	1513850607),
(2314,	'',	'САМОКАТ RAZOR A5 LUX СИНИЙ',	0,	219,	25,	251,	1513850699),
(2315,	'',	'Weelz Rock',	0,	218,	25,	6,	1513850920),
(2316,	'',	'САМОКАТ WEELZ ROCK ЧЕРНЫЙ/ЗЕЛЕНЫЙ',	0,	219,	25,	252,	1513851017),
(2317,	'',	'HUDORA',	0,	218,	25,	7,	1513851158),
(2318,	'',	'САМОКАТ HUDORA BIG WHEEL STYLE 230 WHITE (14236) БЕЛЫЙ',	0,	219,	25,	253,	1513851209),
(2319,	'',	'Xootr',	0,	218,	25,	8,	1513851314),
(2320,	'',	'ГОРОДСКОЙ САМОКАТ XOOTR NEW ULTRA CRUZ СЕРЫЙ',	0,	219,	25,	254,	1513851379),
(2321,	'',	'Asko',	0,	201,	25,	5,	1513853222),
(2322,	'',	'Сенсорный',	0,	203,	25,	3,	1513853244),
(2323,	'',	'Антрацит',	0,	124,	25,	26,	1513853327),
(2324,	'',	'Встраиваемый электрический духовой шкаф Asko OP 8478 G',	0,	202,	25,	255,	1545910008),
(2325,	'',	'Darina',	0,	201,	25,	6,	1513853630),
(2326,	'',	'Встраиваемый электрический духовой шкаф Darina 1V8 BDE 111707 Bg',	0,	202,	25,	256,	1545910831),
(2327,	'',	'Hotpoint-Ariston',	0,	201,	25,	7,	1513853853),
(2328,	'',	'Лед',	0,	124,	25,	27,	1513853876),
(2329,	'',	'Поворотные переключатели',	0,	203,	25,	4,	1513853912),
(2330,	'',	'Встраиваемый электрический духовой шкаф Hotpoint-Ariston FI7 861 SH IC HA',	0,	202,	25,	257,	1545911356),
(2331,	'',	'Контакты',	0,	67,	25,	258,	1514273146),
(2332,	'',	'Контактная информация',	0,	69,	25,	2,	1513953415),
(2333,	'country-AU',	'i18n::object-country-AU',	1,	10,	0,	3,	1513955220),
(2334,	'country-AT',	'i18n::object-country-AT',	1,	10,	0,	4,	1513955220),
(2335,	'country-AZ',	'i18n::object-country-AZ',	1,	10,	0,	5,	1513955220),
(2336,	'country-AX',	'i18n::object-country-AX',	1,	10,	0,	6,	1513955220),
(2337,	'country-AL',	'i18n::object-country-AL',	1,	10,	0,	7,	1513955220),
(2338,	'country-DZ',	'i18n::object-country-DZ',	1,	10,	0,	8,	1513955220),
(2339,	'country-AS',	'i18n::object-country-AS',	1,	10,	0,	9,	1513955220),
(2340,	'country-AI',	'i18n::object-country-AI',	1,	10,	0,	10,	1513955220),
(2341,	'country-AO',	'i18n::object-country-AO',	1,	10,	0,	11,	1513955220),
(2342,	'country-AD',	'i18n::object-country-AD',	1,	10,	0,	12,	1513955220),
(2343,	'country-AQ',	'i18n::object-country-AQ',	1,	10,	0,	13,	1513955220),
(2344,	'country-AG',	'i18n::object-country-AG',	1,	10,	0,	14,	1513955220),
(2345,	'country-AR',	'i18n::object-country-AR',	1,	10,	0,	15,	1513955220),
(2346,	'country-AM',	'i18n::object-country-AM',	1,	10,	0,	16,	1513955220),
(2347,	'country-AW',	'i18n::object-country-AW',	1,	10,	0,	17,	1513955220),
(2348,	'country-AF',	'i18n::object-country-AF',	1,	10,	0,	18,	1513955220),
(2349,	'country-BS',	'i18n::object-country-BS',	1,	10,	0,	19,	1513955220),
(2350,	'country-BD',	'i18n::object-country-BD',	1,	10,	0,	20,	1513955220),
(2351,	'country-BB',	'i18n::object-country-BB',	1,	10,	0,	21,	1513955220),
(2352,	'country-BH',	'i18n::object-country-BH',	1,	10,	0,	22,	1513955220),
(2353,	'country-BY',	'i18n::object-country-BY',	1,	10,	0,	23,	1513955221),
(2354,	'country-BZ',	'i18n::object-country-BZ',	1,	10,	0,	24,	1513955221),
(2355,	'country-BE',	'i18n::object-country-BE',	1,	10,	0,	25,	1513955221),
(2356,	'country-BJ',	'i18n::object-country-BJ',	1,	10,	0,	26,	1513955221),
(2357,	'country-BM',	'i18n::object-country-BM',	1,	10,	0,	27,	1513955221),
(2358,	'country-BG',	'i18n::object-country-BG',	1,	10,	0,	28,	1513955221),
(2359,	'country-BO',	'i18n::object-country-BO',	1,	10,	0,	29,	1513955221),
(2360,	'country-BQ',	'i18n::object-country-BQ',	1,	10,	0,	30,	1513955221),
(2361,	'country-BA',	'i18n::object-country-BA',	1,	10,	0,	31,	1513955221),
(2362,	'country-BW',	'i18n::object-country-BW',	1,	10,	0,	32,	1513955221),
(2363,	'country-BR',	'i18n::object-country-BR',	1,	10,	0,	33,	1513955221),
(2364,	'country-IO',	'i18n::object-country-IO',	1,	10,	0,	34,	1513955221),
(2365,	'country-BN',	'i18n::object-country-BN',	1,	10,	0,	35,	1513955221),
(2366,	'country-BF',	'i18n::object-country-BF',	1,	10,	0,	36,	1513955221),
(2367,	'country-BI',	'i18n::object-country-BI',	1,	10,	0,	37,	1513955221),
(2368,	'country-BT',	'i18n::object-country-BT',	1,	10,	0,	38,	1513955221),
(2369,	'country-VU',	'i18n::object-country-VU',	1,	10,	0,	39,	1513955221),
(2370,	'country-VA',	'i18n::object-country-VA',	1,	10,	0,	40,	1513955221),
(2371,	'country-GB',	'i18n::object-country-GB',	1,	10,	0,	41,	1513955221),
(2372,	'country-HU',	'i18n::object-country-HU',	1,	10,	0,	42,	1513955221),
(2373,	'country-VE',	'i18n::object-country-VE',	1,	10,	0,	43,	1513955221),
(2374,	'country-VG',	'i18n::object-country-VG',	1,	10,	0,	44,	1513955221),
(2375,	'country-VI',	'i18n::object-country-VI',	1,	10,	0,	45,	1513955221),
(2376,	'country-UM',	'i18n::object-country-UM',	1,	10,	0,	46,	1513955221),
(2377,	'country-TL',	'i18n::object-country-TL',	1,	10,	0,	47,	1513955221),
(2378,	'country-VN',	'i18n::object-country-VN',	1,	10,	0,	48,	1513955221),
(2379,	'country-GA',	'i18n::object-country-GA',	1,	10,	0,	49,	1513955221),
(2380,	'country-HT',	'i18n::object-country-HT',	1,	10,	0,	50,	1513955221),
(2381,	'country-GY',	'i18n::object-country-GY',	1,	10,	0,	51,	1513955221),
(2382,	'country-GM',	'i18n::object-country-GM',	1,	10,	0,	52,	1513955221),
(2383,	'country-GH',	'i18n::object-country-GH',	1,	10,	0,	53,	1513955221),
(2384,	'country-GP',	'i18n::object-country-GP',	1,	10,	0,	54,	1513955222),
(2385,	'country-GT',	'i18n::object-country-GT',	1,	10,	0,	55,	1513955222),
(2386,	'country-GN',	'i18n::object-country-GN',	1,	10,	0,	56,	1513955222),
(2387,	'country-GW',	'i18n::object-country-GW',	1,	10,	0,	57,	1513955222),
(2388,	'country-DE',	'i18n::object-country-DE',	1,	10,	0,	58,	1513955222),
(2389,	'country-GG',	'i18n::object-country-GG',	1,	10,	0,	59,	1513955222),
(2390,	'country-GI',	'i18n::object-country-GI',	1,	10,	0,	60,	1513955222),
(2391,	'country-HN',	'i18n::object-country-HN',	1,	10,	0,	61,	1513955222),
(2392,	'country-HK',	'i18n::object-country-HK',	1,	10,	0,	62,	1513955222),
(2393,	'country-GD',	'i18n::object-country-GD',	1,	10,	0,	63,	1513955222),
(2394,	'country-GL',	'i18n::object-country-GL',	1,	10,	0,	64,	1513955222),
(2395,	'country-GR',	'i18n::object-country-GR',	1,	10,	0,	65,	1513955222),
(2396,	'country-GE',	'i18n::object-country-GE',	1,	10,	0,	66,	1513955222),
(2397,	'country-GU',	'i18n::object-country-GU',	1,	10,	0,	67,	1513955222),
(2398,	'country-DK',	'i18n::object-country-DK',	1,	10,	0,	68,	1513955222),
(2399,	'country-JE',	'i18n::object-country-JE',	1,	10,	0,	69,	1513955222),
(2400,	'country-DJ',	'i18n::object-country-DJ',	1,	10,	0,	70,	1513955222),
(2401,	'country-DG',	'i18n::object-country-DG',	1,	10,	0,	71,	1513955222),
(2402,	'country-DM',	'i18n::object-country-DM',	1,	10,	0,	72,	1513955222),
(2403,	'country-DO',	'i18n::object-country-DO',	1,	10,	0,	73,	1513955222),
(2404,	'country-EG',	'i18n::object-country-EG',	1,	10,	0,	74,	1513955222),
(2405,	'country-ZM',	'i18n::object-country-ZM',	1,	10,	0,	75,	1513955222),
(2406,	'country-EH',	'i18n::object-country-EH',	1,	10,	0,	76,	1513955222),
(2407,	'country-ZW',	'i18n::object-country-ZW',	1,	10,	0,	77,	1513955222),
(2408,	'country-IL',	'i18n::object-country-IL',	1,	10,	0,	78,	1513955222),
(2409,	'country-IN',	'i18n::object-country-IN',	1,	10,	0,	79,	1513955222),
(2410,	'country-ID',	'i18n::object-country-ID',	1,	10,	0,	80,	1513955222),
(2411,	'country-JO',	'i18n::object-country-JO',	1,	10,	0,	81,	1513955222),
(2412,	'country-IQ',	'i18n::object-country-IQ',	1,	10,	0,	82,	1513955222),
(2413,	'country-IR',	'i18n::object-country-IR',	1,	10,	0,	83,	1513955222),
(2414,	'country-IE',	'i18n::object-country-IE',	1,	10,	0,	84,	1513955222),
(2415,	'country-IS',	'i18n::object-country-IS',	1,	10,	0,	85,	1513955222),
(2416,	'country-ES',	'i18n::object-country-ES',	1,	10,	0,	86,	1513955223),
(2417,	'country-IT',	'i18n::object-country-IT',	1,	10,	0,	87,	1513955223),
(2418,	'country-YE',	'i18n::object-country-YE',	1,	10,	0,	88,	1513955223),
(2419,	'country-CV',	'i18n::object-country-CV',	1,	10,	0,	89,	1513955223),
(2420,	'country-KZ',	'i18n::object-country-KZ',	1,	10,	0,	90,	1513955223),
(2421,	'country-KY',	'i18n::object-country-KY',	1,	10,	0,	91,	1513955223),
(2422,	'country-KH',	'i18n::object-country-KH',	1,	10,	0,	92,	1513955223),
(2423,	'country-CM',	'i18n::object-country-CM',	1,	10,	0,	93,	1513955223),
(2424,	'country-CA',	'i18n::object-country-CA',	1,	10,	0,	94,	1513955223),
(2425,	'country-IC',	'i18n::object-country-IC',	1,	10,	0,	95,	1513955223),
(2426,	'country-QA',	'i18n::object-country-QA',	1,	10,	0,	96,	1513955223),
(2427,	'country-KE',	'i18n::object-country-KE',	1,	10,	0,	97,	1513955223),
(2428,	'country-CY',	'i18n::object-country-CY',	1,	10,	0,	98,	1513955223),
(2429,	'country-KG',	'i18n::object-country-KG',	1,	10,	0,	99,	1513955223),
(2430,	'country-KI',	'i18n::object-country-KI',	1,	10,	0,	100,	1513955223),
(2431,	'country-CN',	'i18n::object-country-CN',	1,	10,	0,	101,	1513955223),
(2432,	'country-KP',	'i18n::object-country-KP',	1,	10,	0,	102,	1513955223),
(2433,	'country-CC',	'i18n::object-country-CC',	1,	10,	0,	103,	1513955223),
(2434,	'country-CO',	'i18n::object-country-CO',	1,	10,	0,	104,	1513955223),
(2435,	'country-KM',	'i18n::object-country-KM',	1,	10,	0,	105,	1513955223),
(2436,	'country-CG',	'i18n::object-country-CG',	1,	10,	0,	106,	1513955223),
(2437,	'country-CD',	'i18n::object-country-CD',	1,	10,	0,	107,	1513955223),
(2438,	'country-XK',	'i18n::object-country-XK',	1,	10,	0,	108,	1513955223),
(2439,	'country-CR',	'i18n::object-country-CR',	1,	10,	0,	109,	1513955223),
(2440,	'country-CI',	'i18n::object-country-CI',	1,	10,	0,	110,	1513955223),
(2441,	'country-CU',	'i18n::object-country-CU',	1,	10,	0,	111,	1513955223),
(2442,	'country-KW',	'i18n::object-country-KW',	1,	10,	0,	112,	1513955223),
(2443,	'country-CW',	'i18n::object-country-CW',	1,	10,	0,	113,	1513955223),
(2444,	'country-LA',	'i18n::object-country-LA',	1,	10,	0,	114,	1513955224),
(2445,	'country-LV',	'i18n::object-country-LV',	1,	10,	0,	115,	1513955224),
(2446,	'country-LS',	'i18n::object-country-LS',	1,	10,	0,	116,	1513955224),
(2447,	'country-LR',	'i18n::object-country-LR',	1,	10,	0,	117,	1513955224),
(2448,	'country-LB',	'i18n::object-country-LB',	1,	10,	0,	118,	1513955224),
(2449,	'country-LY',	'i18n::object-country-LY',	1,	10,	0,	119,	1513955224),
(2450,	'country-LT',	'i18n::object-country-LT',	1,	10,	0,	120,	1513955224),
(2451,	'country-LI',	'i18n::object-country-LI',	1,	10,	0,	121,	1513955224),
(2452,	'country-LU',	'i18n::object-country-LU',	1,	10,	0,	122,	1513955224),
(2453,	'country-MU',	'i18n::object-country-MU',	1,	10,	0,	123,	1513955224),
(2454,	'country-MR',	'i18n::object-country-MR',	1,	10,	0,	124,	1513955224),
(2455,	'country-MG',	'i18n::object-country-MG',	1,	10,	0,	125,	1513955224),
(2456,	'country-YT',	'i18n::object-country-YT',	1,	10,	0,	126,	1513955224),
(2457,	'country-MO',	'i18n::object-country-MO',	1,	10,	0,	127,	1513955224),
(2458,	'country-MK',	'i18n::object-country-MK',	1,	10,	0,	128,	1513955224),
(2459,	'country-MW',	'i18n::object-country-MW',	1,	10,	0,	129,	1513955224),
(2460,	'country-MY',	'i18n::object-country-MY',	1,	10,	0,	130,	1513955224),
(2461,	'country-ML',	'i18n::object-country-ML',	1,	10,	0,	131,	1513955224),
(2462,	'country-MV',	'i18n::object-country-MV',	1,	10,	0,	132,	1513955224),
(2463,	'country-MT',	'i18n::object-country-MT',	1,	10,	0,	133,	1513955224),
(2464,	'country-MA',	'i18n::object-country-MA',	1,	10,	0,	134,	1513955224),
(2465,	'country-MQ',	'i18n::object-country-MQ',	1,	10,	0,	135,	1513955224),
(2466,	'country-MH',	'i18n::object-country-MH',	1,	10,	0,	136,	1513955224),
(2467,	'country-MX',	'i18n::object-country-MX',	1,	10,	0,	137,	1513955224),
(2468,	'country-MZ',	'i18n::object-country-MZ',	1,	10,	0,	138,	1513955224),
(2469,	'country-MD',	'i18n::object-country-MD',	1,	10,	0,	139,	1513955224),
(2470,	'country-MC',	'i18n::object-country-MC',	1,	10,	0,	140,	1513955224),
(2471,	'country-MN',	'i18n::object-country-MN',	1,	10,	0,	141,	1513955224),
(2472,	'country-MS',	'i18n::object-country-MS',	1,	10,	0,	142,	1513955224),
(2473,	'country-MM',	'i18n::object-country-MM',	1,	10,	0,	143,	1513955225),
(2474,	'country-NA',	'i18n::object-country-NA',	1,	10,	0,	144,	1513955225),
(2475,	'country-NR',	'i18n::object-country-NR',	1,	10,	0,	145,	1513955225),
(2476,	'country-NP',	'i18n::object-country-NP',	1,	10,	0,	146,	1513955225),
(2477,	'country-NE',	'i18n::object-country-NE',	1,	10,	0,	147,	1513955225),
(2478,	'country-NG',	'i18n::object-country-NG',	1,	10,	0,	148,	1513955225),
(2479,	'country-NL',	'i18n::object-country-NL',	1,	10,	0,	149,	1513955225),
(2480,	'country-NI',	'i18n::object-country-NI',	1,	10,	0,	150,	1513955225),
(2481,	'country-NU',	'i18n::object-country-NU',	1,	10,	0,	151,	1513955225),
(2482,	'country-NZ',	'i18n::object-country-NZ',	1,	10,	0,	152,	1513955225),
(2483,	'country-NC',	'i18n::object-country-NC',	1,	10,	0,	153,	1513955225),
(2484,	'country-NO',	'i18n::object-country-NO',	1,	10,	0,	154,	1513955225),
(2485,	'country-AC',	'i18n::object-country-AC',	1,	10,	0,	155,	1513955225),
(2486,	'country-IM',	'i18n::object-country-IM',	1,	10,	0,	156,	1513955225),
(2487,	'country-NF',	'i18n::object-country-NF',	1,	10,	0,	157,	1513955225),
(2488,	'country-CX',	'i18n::object-country-CX',	1,	10,	0,	158,	1513955225),
(2489,	'country-SH',	'i18n::object-country-SH',	1,	10,	0,	159,	1513955225),
(2490,	'country-CK',	'i18n::object-country-CK',	1,	10,	0,	160,	1513955225),
(2491,	'country-TC',	'i18n::object-country-TC',	1,	10,	0,	161,	1513955225),
(2492,	'country-AE',	'i18n::object-country-AE',	1,	10,	0,	162,	1513955225),
(2493,	'country-OM',	'i18n::object-country-OM',	1,	10,	0,	163,	1513955225),
(2494,	'country-PK',	'i18n::object-country-PK',	1,	10,	0,	164,	1513955225),
(2495,	'country-PW',	'i18n::object-country-PW',	1,	10,	0,	165,	1513955225),
(2496,	'country-PS',	'i18n::object-country-PS',	1,	10,	0,	166,	1513955225),
(2497,	'country-PA',	'i18n::object-country-PA',	1,	10,	0,	167,	1513955225),
(2498,	'country-PG',	'i18n::object-country-PG',	1,	10,	0,	168,	1513955225),
(2499,	'country-PY',	'i18n::object-country-PY',	1,	10,	0,	169,	1513955225),
(2500,	'country-PE',	'i18n::object-country-PE',	1,	10,	0,	170,	1513955225),
(2501,	'country-PN',	'i18n::object-country-PN',	1,	10,	0,	171,	1513955225),
(2502,	'country-PL',	'i18n::object-country-PL',	1,	10,	0,	172,	1513955225),
(2503,	'country-PT',	'i18n::object-country-PT',	1,	10,	0,	173,	1513955225),
(2504,	'country-PR',	'i18n::object-country-PR',	1,	10,	0,	174,	1513955225),
(2505,	'country-KR',	'i18n::object-country-KR',	1,	10,	0,	175,	1513955226),
(2506,	'country-RE',	'i18n::object-country-RE',	1,	10,	0,	176,	1513955226),
(2507,	'country-RW',	'i18n::object-country-RW',	1,	10,	0,	177,	1513955226),
(2508,	'country-RO',	'i18n::object-country-RO',	1,	10,	0,	178,	1513955226),
(2509,	'country-SV',	'i18n::object-country-SV',	1,	10,	0,	179,	1513955226),
(2510,	'country-WS',	'i18n::object-country-WS',	1,	10,	0,	180,	1513955226),
(2511,	'country-SM',	'i18n::object-country-SM',	1,	10,	0,	181,	1513955226),
(2512,	'country-ST',	'i18n::object-country-ST',	1,	10,	0,	182,	1513955226),
(2513,	'country-SA',	'i18n::object-country-SA',	1,	10,	0,	183,	1513955226),
(2514,	'country-SZ',	'i18n::object-country-SZ',	1,	10,	0,	184,	1513955226),
(2515,	'country-MP',	'i18n::object-country-MP',	1,	10,	0,	185,	1513955226),
(2516,	'country-SC',	'i18n::object-country-SC',	1,	10,	0,	186,	1513955226),
(2517,	'country-BL',	'i18n::object-country-BL',	1,	10,	0,	187,	1513955226),
(2518,	'country-MF',	'i18n::object-country-MF',	1,	10,	0,	188,	1513955226),
(2519,	'country-PM',	'i18n::object-country-PM',	1,	10,	0,	189,	1513955226),
(2520,	'country-SN',	'i18n::object-country-SN',	1,	10,	0,	190,	1513955226),
(2521,	'country-VC',	'i18n::object-country-VC',	1,	10,	0,	191,	1513955226),
(2522,	'country-KN',	'i18n::object-country-KN',	1,	10,	0,	192,	1513955226),
(2523,	'country-LC',	'i18n::object-country-LC',	1,	10,	0,	193,	1513955226),
(2524,	'country-RS',	'i18n::object-country-RS',	1,	10,	0,	194,	1513955226),
(2525,	'country-EA',	'i18n::object-country-EA',	1,	10,	0,	195,	1513955226),
(2526,	'country-SG',	'i18n::object-country-SG',	1,	10,	0,	196,	1513955226),
(2527,	'country-SX',	'i18n::object-country-SX',	1,	10,	0,	197,	1513955226),
(2528,	'country-SY',	'i18n::object-country-SY',	1,	10,	0,	198,	1513955226),
(2529,	'country-SK',	'i18n::object-country-SK',	1,	10,	0,	199,	1513955226),
(2530,	'country-SI',	'i18n::object-country-SI',	1,	10,	0,	200,	1513955226),
(2531,	'country-SB',	'i18n::object-country-SB',	1,	10,	0,	201,	1513955226),
(2532,	'country-SO',	'i18n::object-country-SO',	1,	10,	0,	202,	1513955226),
(2533,	'country-SD',	'i18n::object-country-SD',	1,	10,	0,	203,	1513955226),
(2534,	'country-SR',	'i18n::object-country-SR',	1,	10,	0,	204,	1513955226),
(2535,	'country-SL',	'i18n::object-country-SL',	1,	10,	0,	205,	1513955226),
(2536,	'country-TJ',	'i18n::object-country-TJ',	1,	10,	0,	206,	1513955227),
(2537,	'country-TH',	'i18n::object-country-TH',	1,	10,	0,	207,	1513955227),
(2538,	'country-TW',	'i18n::object-country-TW',	1,	10,	0,	208,	1513955227),
(2539,	'country-TZ',	'i18n::object-country-TZ',	1,	10,	0,	209,	1513955227),
(2540,	'country-TG',	'i18n::object-country-TG',	1,	10,	0,	210,	1513955227),
(2541,	'country-TK',	'i18n::object-country-TK',	1,	10,	0,	211,	1513955227),
(2542,	'country-TO',	'i18n::object-country-TO',	1,	10,	0,	212,	1513955227),
(2543,	'country-TT',	'i18n::object-country-TT',	1,	10,	0,	213,	1513955227),
(2544,	'country-TA',	'i18n::object-country-TA',	1,	10,	0,	214,	1513955227),
(2545,	'country-TV',	'i18n::object-country-TV',	1,	10,	0,	215,	1513955227),
(2546,	'country-TN',	'i18n::object-country-TN',	1,	10,	0,	216,	1513955227),
(2547,	'country-TM',	'i18n::object-country-TM',	1,	10,	0,	217,	1513955227),
(2548,	'country-TR',	'i18n::object-country-TR',	1,	10,	0,	218,	1513955227),
(2549,	'country-UG',	'i18n::object-country-UG',	1,	10,	0,	219,	1513955227),
(2550,	'country-UZ',	'i18n::object-country-UZ',	1,	10,	0,	220,	1513955227),
(2551,	'country-UA',	'i18n::object-country-UA',	1,	10,	0,	221,	1513955227),
(2552,	'country-WF',	'i18n::object-country-WF',	1,	10,	0,	222,	1513955227),
(2553,	'country-UY',	'i18n::object-country-UY',	1,	10,	0,	223,	1513955227),
(2554,	'country-FO',	'i18n::object-country-FO',	1,	10,	0,	224,	1513955227),
(2555,	'country-FM',	'i18n::object-country-FM',	1,	10,	0,	225,	1513955227),
(2556,	'country-FJ',	'i18n::object-country-FJ',	1,	10,	0,	226,	1513955227),
(2557,	'country-PH',	'i18n::object-country-PH',	1,	10,	0,	227,	1513955227),
(2558,	'country-FI',	'i18n::object-country-FI',	1,	10,	0,	228,	1513955227),
(2559,	'country-FK',	'i18n::object-country-FK',	1,	10,	0,	229,	1513955227),
(2560,	'country-FR',	'i18n::object-country-FR',	1,	10,	0,	230,	1513955227),
(2561,	'country-GF',	'i18n::object-country-GF',	1,	10,	0,	231,	1513955227),
(2562,	'country-PF',	'i18n::object-country-PF',	1,	10,	0,	232,	1513955227),
(2563,	'country-TF',	'i18n::object-country-TF',	1,	10,	0,	233,	1513955227),
(2564,	'country-HR',	'i18n::object-country-HR',	1,	10,	0,	234,	1513955227),
(2565,	'country-CF',	'i18n::object-country-CF',	1,	10,	0,	235,	1513955227),
(2566,	'country-TD',	'i18n::object-country-TD',	1,	10,	0,	236,	1513955228),
(2567,	'country-ME',	'i18n::object-country-ME',	1,	10,	0,	237,	1513955228),
(2568,	'country-CZ',	'i18n::object-country-CZ',	1,	10,	0,	238,	1513955228),
(2569,	'country-CL',	'i18n::object-country-CL',	1,	10,	0,	239,	1513955228),
(2570,	'country-CH',	'i18n::object-country-CH',	1,	10,	0,	240,	1513955228),
(2571,	'country-SE',	'i18n::object-country-SE',	1,	10,	0,	241,	1513955228),
(2572,	'country-SJ',	'i18n::object-country-SJ',	1,	10,	0,	242,	1513955228),
(2573,	'country-LK',	'i18n::object-country-LK',	1,	10,	0,	243,	1513955228),
(2574,	'country-EC',	'i18n::object-country-EC',	1,	10,	0,	244,	1513955228),
(2575,	'country-GQ',	'i18n::object-country-GQ',	1,	10,	0,	245,	1513955228),
(2576,	'country-ER',	'i18n::object-country-ER',	1,	10,	0,	246,	1513955228),
(2577,	'country-EE',	'i18n::object-country-EE',	1,	10,	0,	247,	1513955228),
(2578,	'country-ET',	'i18n::object-country-ET',	1,	10,	0,	248,	1513955228),
(2579,	'country-ZA',	'i18n::object-country-ZA',	1,	10,	0,	249,	1513955228),
(2580,	'country-GS',	'i18n::object-country-GS',	1,	10,	0,	250,	1513955228),
(2581,	'country-SS',	'i18n::object-country-SS',	1,	10,	0,	251,	1513955228),
(2582,	'country-JM',	'i18n::object-country-JM',	1,	10,	0,	252,	1513955228),
(2583,	'country-JP',	'i18n::object-country-JP',	1,	10,	0,	253,	1513955228),
(2584,	'emarket-payment-type-yandex-kassa',	'i18n::object-payment-type-yandex-kassa',	1,	43,	0,	13,	1519627131),
(2585,	'',	'Online-оплата в Яндекс.Касса',	0,	222,	25,	15,	1519627723),
(2588,	'',	'127.0.0.1',	0,	83,	46,	19,	1521454280),
(2589,	'russianpost_wrapper_simple',	'i18n::object-wrapper_simple',	0,	14,	0,	8,	1538039627),
(2590,	'russianpost_parcel',	'i18n::object-parcel',	0,	14,	0,	9,	1538039627),
(2591,	'russianpost_parcel_first_class',	'i18n::object-parcel_first_class',	0,	14,	0,	10,	1538039627),
(2592,	'russianpost_parcel_first_class_with_declared_value',	'i18n::object-parcel_first_class_with_declared_value',	0,	14,	0,	11,	1538039627),
(2593,	'trade_offer_data_object_2593',	'Джинсы \"Dylan\" BRUNO BANANI',	0,	185,	25,	258,	1544712109),
(2594,	'trade_offer_data_object_2594',	'Джинсы \"Dylan\" BRUNO BANANI',	0,	185,	25,	258,	1544712294),
(2595,	'trade_offer_data_object_2595',	'Джинсы \"Dylan\" BRUNO BANANI',	0,	185,	25,	258,	1544712330),
(2596,	'trade_offer_data_object_2596',	'Джинсы \"Dylan\" BRUNO BANANI',	0,	185,	25,	258,	1544712177),
(2597,	'trade_offer_data_object_2597',	'Джинсы \"Dylan\" BRUNO BANANI',	0,	185,	25,	258,	1544712198),
(2598,	'trade_offer_data_object_2598',	'Джинсы \"Dylan\" BRUNO BANANI',	0,	185,	25,	258,	1544712219),
(2599,	'trade_offer_data_object_2599',	'Джинсы \"Dylan\" BRUNO BANANI',	0,	185,	25,	258,	1544712297),
(2600,	'trade_offer_data_object_2600',	'Джинсы \"Dylan\" BRUNO BANANI',	0,	185,	25,	258,	1544712300),
(2601,	'trade_offer_data_object_2601',	'Джинсы \"Dylan\" BRUNO BANANI',	0,	185,	25,	258,	1544712116),
(2602,	'trade_offer_data_object_2602',	'Джинсы \"Dylan\" BRUNO BANANI',	0,	185,	25,	258,	1544712332),
(2603,	'trade_offer_data_object_2603',	'Джинсы \"Dylan\" BRUNO BANANI',	0,	185,	25,	258,	1544712343),
(2604,	'trade_offer_data_object_2604',	'Джинсы \"Dylan\" BRUNO BANANI',	0,	185,	25,	258,	1544712354),
(2606,	'',	'178.16.152.254',	0,	83,	46,	20,	1544791657),
(2607,	'',	NULL,	0,	50,	0,	22,	1544791667),
(2608,	'',	'Джинсы \"Dylan\" BRUNO BANANI',	0,	41,	0,	40,	1544791667),
(2609,	'',	'178.16.152.254',	0,	83,	46,	21,	1544796850),
(2610,	'',	NULL,	0,	50,	0,	23,	1544796850),
(2611,	'',	'Джинсы \"Dylan\" BRUNO BANANI',	0,	41,	0,	41,	1544796850),
(2612,	'emarket-item-type-custom',	'Пользовательский',	1,	38,	0,	3,	1545829300),
(2613,	'emarket-item-type-trade-offer',	'Торговое предложение',	1,	38,	0,	4,	1545829300),
(2614,	'payment-subject-28225',	'Товар',	1,	226,	0,	1,	1545829300),
(2615,	'payment-mode-28238',	'Полная предоплата',	1,	227,	0,	1,	1545829300),
(2616,	'payment-subject-28226',	'Подакцизный товар',	1,	226,	0,	2,	1545829300),
(2617,	'payment-mode-28239',	'Частичная предоплата',	1,	227,	0,	2,	1545829300),
(2618,	'payment-subject-28227',	'Работа',	1,	226,	0,	3,	1545829300),
(2619,	'payment-mode-28240',	'Аванс',	1,	227,	0,	3,	1545829300),
(2620,	'payment-subject-28228',	'Услуга',	1,	226,	0,	4,	1545829300),
(2621,	'payment-mode-28241',	'Полный расчет',	1,	227,	0,	4,	1545829300),
(2622,	'payment-subject-28229',	'Ставка в азартной игре',	1,	226,	0,	5,	1545829300),
(2623,	'payment-mode-28242',	'Частичный расчет и кредит',	1,	227,	0,	5,	1545829300),
(2624,	'payment-subject-28230',	'Выигрыш в азартной игре',	1,	226,	0,	6,	1545829300),
(2625,	'payment-mode-28243',	'Кредит',	1,	227,	0,	6,	1545829300),
(2626,	'payment-subject-28231',	'Лотерейный билет',	1,	226,	0,	7,	1545829300),
(2627,	'payment-mode-28244',	'Выплата по кредиту',	1,	227,	0,	7,	1545829300),
(2628,	'payment-subject-28232',	'Выигрыш в лотерею',	1,	226,	0,	8,	1545829300),
(2629,	'payment-subject-28233',	'Результаты интеллектуальной деятельности',	1,	226,	0,	9,	1545829300),
(2630,	'payment-subject-28234',	'Платеж',	1,	226,	0,	10,	1545829300),
(2631,	'payment-subject-28235',	'Агентское вознаграждение',	1,	226,	0,	11,	1545829300),
(2632,	'payment-subject-28236',	'Несколько вариантов',	1,	226,	0,	12,	1545829300),
(2633,	'payment-subject-28237',	'i18n::object-social_categories_other',	1,	226,	0,	13,	1545829300),
(2634,	'trade_offer_data_object_2634',	'Джинсы RHODE ISLAND',	0,	185,	25,	259,	1545892685),
(2635,	'',	'S',	0,	186,	25,	16,	1545891962),
(2636,	'',	'L',	0,	186,	25,	17,	1545891977),
(2637,	'',	'XL',	0,	186,	25,	18,	1545891988),
(2638,	'',	'XXL',	0,	186,	25,	19,	1545891995),
(2639,	'trade_offer_data_object_2639',	'Джинсы RHODE ISLAND',	0,	185,	25,	260,	1545892691),
(2640,	'trade_offer_data_object_2640',	'Джинсы RHODE ISLAND',	0,	185,	25,	261,	1545892208),
(2641,	'trade_offer_data_object_2641',	'Джинсы RHODE ISLAND',	0,	185,	25,	262,	1545892215),
(2642,	'trade_offer_data_object_2642',	'Джинсы RHODE ISLAND',	0,	185,	25,	263,	1545892784),
(2643,	'trade_offer_data_object_2643',	'Джинсы RHODE ISLAND',	0,	185,	25,	264,	1545892793),
(2644,	'trade_offer_data_object_2644',	'Джинсы RHODE ISLAND',	0,	185,	25,	265,	1545892850),
(2645,	'trade_offer_data_object_2645',	'Джинсы RHODE ISLAND',	0,	185,	25,	266,	1545892860),
(2646,	'trade_offer_data_object_2646',	'Джинсы RHODE ISLAND hard',	0,	185,	25,	267,	1545893262),
(2647,	'trade_offer_data_object_2647',	'Джинсы RHODE ISLAND hard',	0,	185,	25,	268,	1545893266),
(2648,	'trade_offer_data_object_2648',	'Джинсы RHODE ISLAND hard',	0,	185,	25,	269,	1545893270),
(2649,	'trade_offer_data_object_2649',	'Джинсы RHODE ISLAND hard',	0,	185,	25,	270,	1545893276),
(2650,	'trade_offer_data_object_2650',	'Джинсы RHODE ISLAND hard',	0,	185,	25,	271,	1545893380),
(2651,	'trade_offer_data_object_2651',	'Джинсы RHODE ISLAND hard',	0,	185,	25,	272,	1545893384),
(2652,	'trade_offer_data_object_2652',	'Джинсы RHODE ISLAND hard',	0,	185,	25,	273,	1545893389),
(2653,	'trade_offer_data_object_2653',	'Джинсы RHODE ISLAND hard',	0,	185,	25,	274,	1545893393),
(2654,	'trade_offer_data_object_2654',	'ДЖИНСЫ СТРЕТЧ ФАСОНА SLIM',	0,	185,	25,	275,	1545893830),
(2655,	'trade_offer_data_object_2655',	'ДЖИНСЫ СТРЕТЧ ФАСОНА SLIM',	0,	185,	25,	276,	1545893834),
(2656,	'trade_offer_data_object_2656',	'ДЖИНСЫ СТРЕТЧ ФАСОНА SLIM',	0,	185,	25,	277,	1545893838),
(2657,	'trade_offer_data_object_2657',	'ДЖИНСЫ СТРЕТЧ ФАСОНА SLIM',	0,	185,	25,	278,	1545893842),
(2658,	'trade_offer_data_object_2658',	'ДЖИНСЫ СТРЕТЧ ФАСОНА SLIM',	0,	185,	25,	279,	1545893932),
(2659,	'trade_offer_data_object_2659',	'ДЖИНСЫ СТРЕТЧ ФАСОНА SLIM',	0,	185,	25,	280,	1545893935),
(2660,	'trade_offer_data_object_2660',	'ДЖИНСЫ СТРЕТЧ ФАСОНА SLIM',	0,	185,	25,	281,	1545893940),
(2661,	'trade_offer_data_object_2661',	'ДЖИНСЫ СТРЕТЧ ФАСОНА SLIM',	0,	185,	25,	282,	1545893943),
(2662,	'trade_offer_data_object_2662',	'ДЖИНСЫ ПРЯМОГО ПОКРОЯ С 5 КАРМАНАМИ',	0,	185,	25,	283,	1545894128),
(2663,	'trade_offer_data_object_2663',	'ДЖИНСЫ ПРЯМОГО ПОКРОЯ С 5 КАРМАНАМИ',	0,	185,	25,	284,	1545894132),
(2664,	'trade_offer_data_object_2664',	'ДЖИНСЫ ПРЯМОГО ПОКРОЯ С 5 КАРМАНАМИ',	0,	185,	25,	285,	1545894136),
(2665,	'trade_offer_data_object_2665',	'ДЖИНСЫ ПРЯМОГО ПОКРОЯ С 5 КАРМАНАМИ',	0,	185,	25,	286,	1545894142),
(2666,	'trade_offer_data_object_2666',	'ДЖИНСЫ ПРЯМОГО ПОКРОЯ С 5 КАРМАНАМИ',	0,	185,	25,	287,	1545895101),
(2667,	'trade_offer_data_object_2667',	'ДЖИНСЫ ПРЯМОГО ПОКРОЯ С 5 КАРМАНАМИ',	0,	185,	25,	288,	1545895104),
(2668,	'trade_offer_data_object_2668',	'ДЖИНСЫ ПРЯМОГО ПОКРОЯ С 5 КАРМАНАМИ',	0,	185,	25,	289,	1545895108),
(2669,	'trade_offer_data_object_2669',	'ДЖИНСЫ ПРЯМОГО ПОКРОЯ С 5 КАРМАНАМИ',	0,	185,	25,	290,	1545895111),
(2670,	'trade_offer_data_object_2670',	'ДЖИНСЫ KEKKER ФАСОНА SLIM',	0,	185,	25,	291,	1545895406),
(2671,	'trade_offer_data_object_2671',	'ДЖИНСЫ KEKKER ФАСОНА SLIM',	0,	185,	25,	292,	1545895409),
(2672,	'trade_offer_data_object_2672',	'ДЖИНСЫ KEKKER ФАСОНА SLIM',	0,	185,	25,	293,	1545895414),
(2673,	'trade_offer_data_object_2673',	'ДЖИНСЫ KEKKER ФАСОНА SLIM',	0,	185,	25,	294,	1545895417),
(2674,	'trade_offer_data_object_2674',	'ДЖИНСЫ KEKKER ФАСОНА SLIM',	0,	185,	25,	295,	1545895518),
(2675,	'trade_offer_data_object_2675',	'ДЖИНСЫ KEKKER ФАСОНА SLIM',	0,	185,	25,	296,	1545895522),
(2676,	'trade_offer_data_object_2676',	'ДЖИНСЫ KEKKER ФАСОНА SLIM',	0,	185,	25,	297,	1545895525),
(2677,	'trade_offer_data_object_2677',	'ДЖИНСЫ KEKKER ФАСОНА SLIM',	0,	185,	25,	298,	1545895528),
(2678,	'trade_offer_data_object_2678',	'ДЖИНСЫ KEKKER ФАСОНА Swag',	0,	185,	25,	299,	1545895882),
(2679,	'trade_offer_data_object_2679',	'ДЖИНСЫ KEKKER ФАСОНА Swag',	0,	185,	25,	300,	1545895885),
(2680,	'trade_offer_data_object_2680',	'ДЖИНСЫ KEKKER ФАСОНА Swag',	0,	185,	25,	301,	1545895889),
(2681,	'trade_offer_data_object_2681',	'ДЖИНСЫ KEKKER ФАСОНА Swag',	0,	185,	25,	302,	1545895894),
(2682,	'trade_offer_data_object_2682',	'ДЖИНСЫ KEKKER ФАСОНА Swag',	0,	185,	25,	303,	1545896003),
(2683,	'trade_offer_data_object_2683',	'ДЖИНСЫ KEKKER ФАСОНА Swag',	0,	185,	25,	304,	1545896006),
(2684,	'trade_offer_data_object_2684',	'ДЖИНСЫ KEKKER ФАСОНА Swag',	0,	185,	25,	305,	1545896010),
(2685,	'trade_offer_data_object_2685',	'ДЖИНСЫ KEKKER ФАСОНА Swag',	0,	185,	25,	306,	1545896013),
(2686,	'trade_offer_data_object_2686',	'Джинсы \"Peter\" FOR MEN',	0,	185,	25,	307,	1545897126),
(2687,	'trade_offer_data_object_2687',	'Джинсы \"Peter\" FOR MEN',	0,	185,	25,	308,	1545897130),
(2688,	'trade_offer_data_object_2688',	'Джинсы \"Peter\" FOR MEN',	0,	185,	25,	309,	1545897133),
(2689,	'trade_offer_data_object_2689',	'Джинсы \"Peter\" FOR MEN',	0,	185,	25,	310,	1545897136),
(2690,	'trade_offer_data_object_2690',	'Джинсы \"Peter\" FOR MEN',	0,	185,	25,	311,	1545897235),
(2691,	'trade_offer_data_object_2691',	'Джинсы \"Peter\" FOR MEN',	0,	185,	25,	312,	1545897238),
(2692,	'trade_offer_data_object_2692',	'Джинсы \"Peter\" FOR MEN',	0,	185,	25,	313,	1545897243),
(2693,	'trade_offer_data_object_2693',	'Джинсы \"Peter\" FOR MEN',	0,	185,	25,	314,	1545897250),
(2694,	'trade_offer_data_object_2694',	'Джинсы \"Peter\" BRUTAL',	0,	185,	25,	315,	1545897447),
(2695,	'trade_offer_data_object_2695',	'Джинсы \"Peter\" BRUTAL',	0,	185,	25,	316,	1545897452),
(2696,	'trade_offer_data_object_2696',	'Джинсы \"Peter\" BRUTAL',	0,	185,	25,	317,	1545897455),
(2697,	'trade_offer_data_object_2697',	'Джинсы \"Peter\" BRUTAL',	0,	185,	25,	318,	1545897459),
(2698,	'trade_offer_data_object_2698',	'Джинсы \"Peter\" BRUTAL',	0,	185,	25,	319,	1545897557),
(2699,	'trade_offer_data_object_2699',	'Джинсы \"Peter\" BRUTAL',	0,	185,	25,	320,	1545897561),
(2700,	'trade_offer_data_object_2700',	'Джинсы \"Peter\" BRUTAL',	0,	185,	25,	321,	1545897564),
(2701,	'trade_offer_data_object_2701',	'Джинсы \"Peter\" BRUTAL',	0,	185,	25,	322,	1545897567),
(2702,	'trade_offer_data_object_2702',	'Джинсы KEKKER classic',	0,	185,	25,	323,	1545897799),
(2703,	'trade_offer_data_object_2703',	'Джинсы KEKKER classic',	0,	185,	25,	324,	1545897803),
(2704,	'trade_offer_data_object_2704',	'Джинсы KEKKER classic',	0,	185,	25,	325,	1545897807),
(2705,	'trade_offer_data_object_2705',	'Джинсы KEKKER classic',	0,	185,	25,	326,	1545897812),
(2706,	'trade_offer_data_object_2706',	'Джинсы KEKKER classic',	0,	185,	25,	327,	1545897895),
(2707,	'trade_offer_data_object_2707',	'Джинсы KEKKER classic',	0,	185,	25,	328,	1545897899),
(2708,	'trade_offer_data_object_2708',	'Джинсы KEKKER classic',	0,	185,	25,	329,	1545897902),
(2709,	'trade_offer_data_object_2709',	'Джинсы KEKKER classic',	0,	185,	25,	330,	1545897906),
(2710,	'trade_offer_data_object_2710',	'Джинсы JOHN DEVIN',	0,	185,	25,	331,	1545898105),
(2711,	'trade_offer_data_object_2711',	'Джинсы JOHN DEVIN',	0,	185,	25,	332,	1545898109),
(2712,	'trade_offer_data_object_2712',	'Джинсы JOHN DEVIN',	0,	185,	25,	333,	1545898112),
(2713,	'trade_offer_data_object_2713',	'Джинсы JOHN DEVIN',	0,	185,	25,	334,	1545898117),
(2714,	'trade_offer_data_object_2714',	'Джинсы JOHN DEVIN',	0,	185,	25,	335,	1545898208),
(2715,	'trade_offer_data_object_2715',	'Джинсы JOHN DEVIN',	0,	185,	25,	336,	1545898212),
(2716,	'trade_offer_data_object_2716',	'Джинсы JOHN DEVIN',	0,	185,	25,	337,	1545898215),
(2717,	'trade_offer_data_object_2717',	'Джинсы JOHN DEVIN',	0,	185,	25,	338,	1545898218),
(2718,	'trade_offer_data_object_2718',	'Джинсы JOHN DEVIN strong',	0,	185,	25,	339,	1545898910),
(2719,	'trade_offer_data_object_2719',	'Джинсы JOHN DEVIN strong',	0,	185,	25,	340,	1545898914),
(2720,	'trade_offer_data_object_2720',	'Джинсы JOHN DEVIN strong',	0,	185,	25,	341,	1545898917),
(2721,	'trade_offer_data_object_2721',	'Джинсы JOHN DEVIN strong',	0,	185,	25,	342,	1545898924),
(2722,	'trade_offer_data_object_2722',	'Джинсы JOHN DEVIN strong',	0,	185,	25,	343,	1545899028),
(2723,	'trade_offer_data_object_2723',	'Джинсы JOHN DEVIN strong',	0,	185,	25,	344,	1545899032),
(2724,	'trade_offer_data_object_2724',	'Джинсы JOHN DEVIN strong',	0,	185,	25,	345,	1545899035),
(2725,	'trade_offer_data_object_2725',	'Джинсы JOHN DEVIN strong',	0,	185,	25,	346,	1545899037),
(2726,	'trade_offer_data_object_2726',	'Intuition  Women\'s Road',	0,	177,	25,	347,	1545899647),
(2727,	'trade_offer_data_object_2727',	'Intuition  Women\'s Road',	0,	177,	25,	348,	1545899649),
(2728,	'trade_offer_data_object_2728',	'Intuition  Women\'s Road',	0,	177,	25,	349,	1545899652),
(2729,	'trade_offer_data_object_2729',	'Intuition  Women\'s Road',	0,	177,	25,	350,	1545899654),
(2730,	'trade_offer_data_object_2730',	'Intuition  Women\'s Road',	0,	177,	25,	351,	1545899736),
(2731,	'',	'Shimano',	0,	224,	25,	1,	1545899553),
(2732,	'',	'Sram',	0,	224,	25,	2,	1545899562),
(2733,	'',	'22',	0,	225,	25,	1,	1545899585),
(2734,	'',	'26',	0,	225,	25,	2,	1545899591),
(2735,	'',	'28',	0,	225,	25,	3,	1545899597),
(2736,	'',	'29',	0,	225,	25,	4,	1545899603),
(2737,	'trade_offer_data_object_2737',	'Intuition  Women\'s Road',	0,	177,	25,	352,	1545899739),
(2738,	'trade_offer_data_object_2738',	'Intuition  Women\'s Road',	0,	177,	25,	353,	1545899741),
(2739,	'trade_offer_data_object_2739',	'Intuition  Women\'s Road',	0,	177,	25,	354,	1545899743),
(2740,	'trade_offer_data_object_2740',	'Велосипед Carrera Virtuoso Road Bike',	0,	177,	25,	355,	1545899880),
(2741,	'trade_offer_data_object_2741',	'Велосипед Carrera Virtuoso Road Bike',	0,	177,	25,	356,	1545899884),
(2742,	'trade_offer_data_object_2742',	'Велосипед Carrera Virtuoso Road Bike',	0,	177,	25,	357,	1545899890),
(2743,	'trade_offer_data_object_2743',	'Велосипед Carrera Virtuoso Road Bike',	0,	177,	25,	358,	1545899893),
(2744,	'trade_offer_data_object_2744',	'Велосипед Carrera Virtuoso Road Bike',	0,	177,	25,	359,	1545899982),
(2745,	'trade_offer_data_object_2745',	'Велосипед Carrera Virtuoso Road Bike',	0,	177,	25,	359,	1545899895),
(2746,	'trade_offer_data_object_2746',	'Велосипед Carrera Virtuoso Road Bike',	0,	177,	25,	360,	1545899896),
(2747,	'trade_offer_data_object_2747',	'Велосипед Carrera Virtuoso Road Bike',	0,	177,	25,	360,	1545899984),
(2748,	'trade_offer_data_object_2748',	'Велосипед Carrera Virtuoso Road Bike',	0,	177,	25,	361,	1545899988),
(2749,	'trade_offer_data_object_2749',	'Велосипед Carrera Virtuoso Road Bike',	0,	177,	25,	361,	1545899897),
(2750,	'trade_offer_data_object_2750',	'Велосипед Carrera Virtuoso Road Bike',	0,	177,	25,	362,	1545899990),
(2751,	'trade_offer_data_object_2751',	'Велосипед Carrera Virtuoso Road Bike',	0,	177,	25,	363,	1545899898),
(2752,	'trade_offer_data_object_2752',	'Boardman CX Comp Bike',	0,	177,	25,	364,	1545900143),
(2753,	'trade_offer_data_object_2753',	'Boardman CX Comp Bike',	0,	177,	25,	365,	1545900145),
(2754,	'trade_offer_data_object_2754',	'Boardman CX Comp Bike',	0,	177,	25,	366,	1545900148),
(2755,	'trade_offer_data_object_2755',	'Boardman CX Comp Bike',	0,	177,	25,	367,	1545900151),
(2756,	'trade_offer_data_object_2756',	'Boardman CX Comp Bike',	0,	177,	25,	368,	1545900237),
(2757,	'trade_offer_data_object_2757',	'Boardman CX Comp Bike',	0,	177,	25,	369,	1545900239),
(2758,	'trade_offer_data_object_2758',	'Boardman CX Comp Bike',	0,	177,	25,	370,	1545900242),
(2759,	'trade_offer_data_object_2759',	'Boardman CX Comp Bike',	0,	177,	25,	371,	1545900245),
(2760,	'trade_offer_data_object_2760',	'Paradox Bike',	0,	177,	25,	372,	1545900383),
(2761,	'trade_offer_data_object_2761',	'Paradox Bike',	0,	177,	25,	373,	1545900385),
(2762,	'trade_offer_data_object_2762',	'Paradox Bike',	0,	177,	25,	374,	1545900388),
(2763,	'trade_offer_data_object_2763',	'Paradox Bike',	0,	177,	25,	375,	1545900392),
(2764,	'trade_offer_data_object_2764',	'Paradox Bike',	0,	177,	25,	376,	1545900471),
(2765,	'trade_offer_data_object_2765',	'Paradox Bike',	0,	177,	25,	377,	1545900472),
(2766,	'trade_offer_data_object_2766',	'Paradox Bike',	0,	177,	25,	378,	1545900475),
(2767,	'trade_offer_data_object_2767',	'Paradox Bike',	0,	177,	25,	379,	1545900480),
(2768,	'trade_offer_data_object_2768',	'Велосипед Mizani AR1 Womens Road Bike',	0,	177,	25,	380,	1545900597),
(2769,	'trade_offer_data_object_2769',	'Велосипед Mizani AR1 Womens Road Bike',	0,	177,	25,	381,	1545900599),
(2770,	'trade_offer_data_object_2770',	'Велосипед Mizani AR1 Womens Road Bike',	0,	177,	25,	382,	1545900601),
(2771,	'trade_offer_data_object_2771',	'Велосипед Mizani AR1 Womens Road Bike',	0,	177,	25,	383,	1545900605),
(2772,	'trade_offer_data_object_2772',	'Велосипед Mizani AR1 Womens Road Bike',	0,	177,	25,	384,	1545900684),
(2773,	'trade_offer_data_object_2773',	'Велосипед Mizani AR1 Womens Road Bike',	0,	177,	25,	385,	1545900686),
(2774,	'trade_offer_data_object_2774',	'Велосипед Mizani AR1 Womens Road Bike',	0,	177,	25,	386,	1545900688),
(2775,	'trade_offer_data_object_2775',	'Велосипед Mizani AR1 Womens Road Bike',	0,	177,	25,	387,	1545900692),
(2776,	'trade_offer_data_object_2776',	'Laura Trott RD 2 Women\'s Road Bike',	0,	177,	25,	388,	1545900818),
(2777,	'trade_offer_data_object_2777',	'Laura Trott RD 2 Women\'s Road Bike',	0,	177,	25,	389,	1545900820),
(2778,	'trade_offer_data_object_2778',	'Laura Trott RD 2 Women\'s Road Bike',	0,	177,	25,	390,	1545900822),
(2779,	'trade_offer_data_object_2779',	'Laura Trott RD 2 Women\'s Road Bike',	0,	177,	25,	391,	1545900825),
(2780,	'trade_offer_data_object_2780',	'Laura Trott RD 2 Women\'s Road Bike',	0,	177,	25,	392,	1545900907),
(2781,	'trade_offer_data_object_2781',	'Laura Trott RD 2 Women\'s Road Bike',	0,	177,	25,	393,	1545900909),
(2782,	'trade_offer_data_object_2782',	'Laura Trott RD 2 Women\'s Road Bike',	0,	177,	25,	394,	1545900911),
(2783,	'trade_offer_data_object_2783',	'Laura Trott RD 2 Women\'s Road Bike',	0,	177,	25,	395,	1545900914),
(2784,	'trade_offer_data_object_2784',	'VooDoo Zobop Full Suspension Mountain Bike',	0,	177,	25,	396,	1545901031),
(2785,	'trade_offer_data_object_2785',	'VooDoo Zobop Full Suspension Mountain Bike',	0,	177,	25,	397,	1545901035),
(2786,	'trade_offer_data_object_2786',	'VooDoo Zobop Full Suspension Mountain Bike',	0,	177,	25,	398,	1545901038),
(2787,	'trade_offer_data_object_2787',	'VooDoo Zobop Full Suspension Mountain Bike',	0,	177,	25,	399,	1545901041),
(2788,	'trade_offer_data_object_2788',	'VooDoo Zobop Full Suspension Mountain Bike',	0,	177,	25,	400,	1545901119),
(2789,	'trade_offer_data_object_2789',	'VooDoo Zobop Full Suspension Mountain Bike',	0,	177,	25,	401,	1545901121),
(2790,	'trade_offer_data_object_2790',	'VooDoo Zobop Full Suspension Mountain Bike',	0,	177,	25,	402,	1545901123),
(2791,	'trade_offer_data_object_2791',	'VooDoo Zobop Full Suspension Mountain Bike',	0,	177,	25,	403,	1545901126),
(2793,	'trade_offer_data_object_2793',	'Apollo Paradox Road Bike',	0,	177,	25,	404,	1545901241),
(2794,	'trade_offer_data_object_2794',	'Apollo Paradox Road Bike',	0,	177,	25,	405,	1545901244),
(2795,	'trade_offer_data_object_2795',	'Apollo Paradox Road Bike',	0,	177,	25,	406,	1545901246),
(2796,	'trade_offer_data_object_2796',	'Apollo Paradox Road Bike',	0,	177,	25,	407,	1545901248),
(2797,	'trade_offer_data_object_2797',	'Apollo Paradox Road Bike',	0,	177,	25,	408,	1545901332),
(2798,	'trade_offer_data_object_2798',	'Apollo Paradox Road Bike',	0,	177,	25,	409,	1545901334),
(2799,	'trade_offer_data_object_2799',	'Apollo Paradox Road Bike',	0,	177,	25,	410,	1545901336),
(2800,	'trade_offer_data_object_2800',	'Apollo Paradox Road Bike',	0,	177,	25,	411,	1545901339),
(2801,	'trade_offer_data_object_2801',	'Oldman RZ Comp',	0,	177,	25,	412,	1545901466),
(2802,	'trade_offer_data_object_2802',	'Oldman RZ Comp',	0,	177,	25,	413,	1545901468),
(2803,	'trade_offer_data_object_2803',	'Oldman RZ Comp',	0,	177,	25,	414,	1545901470),
(2804,	'trade_offer_data_object_2804',	'Oldman RZ Comp',	0,	177,	25,	415,	1545901473),
(2805,	'trade_offer_data_object_2805',	'Oldman RZ Comp',	0,	177,	25,	416,	1545901551),
(2806,	'trade_offer_data_object_2806',	'Oldman RZ Comp',	0,	177,	25,	417,	1545901553),
(2807,	'trade_offer_data_object_2807',	'Oldman RZ Comp',	0,	177,	25,	418,	1545901555),
(2808,	'trade_offer_data_object_2808',	'Oldman RZ Comp',	0,	177,	25,	419,	1545901558),
(2809,	'trade_offer_data_object_2809',	'Trott RD',	0,	177,	25,	420,	1545901660),
(2810,	'trade_offer_data_object_2810',	'Trott RD',	0,	177,	25,	421,	1545901662),
(2811,	'trade_offer_data_object_2811',	'Trott RD',	0,	177,	25,	422,	1545901665),
(2812,	'trade_offer_data_object_2812',	'Trott RD',	0,	177,	25,	423,	1545901667),
(2813,	'trade_offer_data_object_2813',	'Trott RD',	0,	177,	25,	424,	1545901737),
(2814,	'trade_offer_data_object_2814',	'Trott RD',	0,	177,	25,	425,	1545901738),
(2815,	'trade_offer_data_object_2815',	'Trott RD',	0,	177,	25,	426,	1545901741),
(2816,	'trade_offer_data_object_2816',	'Trott RD',	0,	177,	25,	427,	1545901743),
(2817,	'trade_offer_data_object_2817',	' CX Comp Bike',	0,	177,	25,	428,	1545901840),
(2818,	'trade_offer_data_object_2818',	' CX Comp Bike',	0,	177,	25,	429,	1545901842),
(2819,	'trade_offer_data_object_2819',	' CX Comp Bike',	0,	177,	25,	430,	1545901844),
(2820,	'trade_offer_data_object_2820',	' CX Comp Bike',	0,	177,	25,	431,	1545901847),
(2821,	'trade_offer_data_object_2821',	' CX Comp Bike',	0,	177,	25,	432,	1545901920),
(2822,	'trade_offer_data_object_2822',	' CX Comp Bike',	0,	177,	25,	433,	1545901923),
(2823,	'trade_offer_data_object_2823',	' CX Comp Bike',	0,	177,	25,	434,	1545901926),
(2824,	'trade_offer_data_object_2824',	' CX Comp Bike',	0,	177,	25,	435,	1545901928),
(2825,	'trade_offer_data_object_2825',	'AR1 Road Bike',	0,	177,	25,	436,	1545902038),
(2826,	'trade_offer_data_object_2826',	'AR1 Road Bike',	0,	177,	25,	437,	1545902040),
(2827,	'trade_offer_data_object_2827',	'AR1 Road Bike',	0,	177,	25,	438,	1545902042),
(2828,	'trade_offer_data_object_2828',	'AR1 Road Bike',	0,	177,	25,	439,	1545902045),
(2829,	'trade_offer_data_object_2829',	'AR1 Road Bike',	0,	177,	25,	440,	1545902122),
(2830,	'trade_offer_data_object_2830',	'AR1 Road Bike',	0,	177,	25,	441,	1545902126),
(2831,	'trade_offer_data_object_2831',	'AR1 Road Bike',	0,	177,	25,	442,	1545902130),
(2832,	'trade_offer_data_object_2832',	'AR1 Road Bike',	0,	177,	25,	443,	1545902132),
(2833,	'trade_offer_data_object_2833',	' Zobop  Mountain ',	0,	177,	25,	444,	1545902228),
(2834,	'trade_offer_data_object_2834',	' Zobop  Mountain ',	0,	177,	25,	445,	1545902229),
(2835,	'trade_offer_data_object_2835',	' Zobop  Mountain ',	0,	177,	25,	446,	1545902232),
(2836,	'trade_offer_data_object_2836',	' Zobop  Mountain ',	0,	177,	25,	447,	1545902234),
(2837,	'trade_offer_data_object_2837',	' Zobop  Mountain ',	0,	177,	25,	448,	1545902315),
(2838,	'trade_offer_data_object_2838',	' Zobop  Mountain ',	0,	177,	25,	449,	1545902317),
(2839,	'trade_offer_data_object_2839',	' Zobop  Mountain ',	0,	177,	25,	450,	1545902319),
(2840,	'trade_offer_data_object_2840',	' Zobop  Mountain ',	0,	177,	25,	451,	1545902322),
(2841,	'trade_offer_data_object_2841',	'Intuition Lambda Women\'s Road Bike',	0,	177,	25,	452,	1545902413),
(2842,	'trade_offer_data_object_2842',	'Intuition Lambda Women\'s Road Bike',	0,	177,	25,	453,	1545902417),
(2843,	'trade_offer_data_object_2843',	'Intuition Lambda Women\'s Road Bike',	0,	177,	25,	454,	1545902420),
(2844,	'trade_offer_data_object_2844',	'Intuition Lambda Women\'s Road Bike',	0,	177,	25,	455,	1545902423),
(2845,	'trade_offer_data_object_2845',	'Intuition Lambda Women\'s Road Bike',	0,	177,	25,	456,	1545902524),
(2846,	'trade_offer_data_object_2846',	'Intuition Lambda Women\'s Road Bike',	0,	177,	25,	457,	1545902526),
(2847,	'trade_offer_data_object_2847',	'Intuition Lambda Women\'s Road Bike',	0,	177,	25,	458,	1545902529),
(2848,	'trade_offer_data_object_2848',	'Intuition Lambda Women\'s Road Bike',	0,	177,	25,	459,	1545902531),
(2849,	'trade_offer_data_object_2849',	'Suspension Mountain Bike',	0,	177,	25,	460,	1545902631),
(2850,	'trade_offer_data_object_2850',	'Suspension Mountain Bike',	0,	177,	25,	461,	1545902635),
(2851,	'trade_offer_data_object_2851',	'Suspension Mountain Bike',	0,	177,	25,	462,	1545902637),
(2852,	'trade_offer_data_object_2852',	'Suspension Mountain Bike',	0,	177,	25,	463,	1545902640),
(2853,	'trade_offer_data_object_2853',	'Suspension Mountain Bike',	0,	177,	25,	464,	1545902718),
(2854,	'trade_offer_data_object_2854',	'Suspension Mountain Bike',	0,	177,	25,	465,	1545902721),
(2855,	'trade_offer_data_object_2855',	'Suspension Mountain Bike',	0,	177,	25,	466,	1545902724),
(2856,	'trade_offer_data_object_2856',	'Suspension Mountain Bike',	0,	177,	25,	467,	1545902726),
(2857,	'trade_offer_data_object_2857',	'духовка газовая RGO-610BL',	0,	202,	25,	468,	1545904067),
(2858,	'',	'включена в заказ',	0,	228,	25,	1,	1545903515),
(2859,	'',	'не включена в заказ',	0,	228,	25,	2,	1545903523),
(2860,	'',	'включена в заказ',	0,	229,	25,	1,	1545903554),
(2861,	'',	'не включена в заказ',	0,	229,	25,	2,	1545903561),
(2862,	'',	'1 год',	0,	153,	25,	2,	1545903614),
(2863,	'',	'3 года',	0,	153,	25,	3,	1545903622),
(2864,	'',	'7 лет',	0,	153,	25,	4,	1545903632),
(2865,	'',	'Черный металлик',	0,	124,	25,	28,	1545903691),
(2866,	'',	'Серый металлик',	0,	124,	25,	29,	1545903700),
(2867,	'trade_offer_data_object_2867',	'духовка газовая RGO-610BL',	0,	202,	25,	469,	1545904060),
(2868,	'',	'178.16.152.254',	0,	83,	46,	22,	1545904152),
(2869,	'',	NULL,	0,	50,	0,	24,	1545904152),
(2870,	'',	'Trott RD Shimano22',	0,	41,	0,	43,	1545904152),
(2871,	'trade_offer_data_object_2871',	'духовка газовая RGO-610BL',	0,	202,	25,	470,	1545904989),
(2872,	'trade_offer_data_object_2872',	'духовка газовая RGO-610BL',	0,	202,	25,	471,	1545904995),
(2873,	'trade_offer_data_object_2873',	'духовка газовая RGO-610BL',	0,	202,	25,	472,	1545905000),
(2874,	'trade_offer_data_object_2874',	'духовка газовая RGO-610BL',	0,	202,	25,	473,	1545905003),
(2875,	'trade_offer_data_object_2875',	'духовка газовая RGO-610BL',	0,	202,	25,	474,	1545905007),
(2876,	'trade_offer_data_object_2876',	'духовка газовая RGO-610BL',	0,	202,	25,	475,	1545905010),
(2877,	'trade_offer_data_object_2877',	'духовка газовая RGO-610BL',	0,	202,	25,	476,	1545905016),
(2878,	'trade_offer_data_object_2878',	'духовка газовая RGO-610BL',	0,	202,	25,	477,	1545905042),
(2879,	'trade_offer_data_object_2879',	'духовка газовая RGO-610BL',	0,	202,	25,	478,	1545905045),
(2880,	'trade_offer_data_object_2880',	'духовка газовая RGO-610BL',	0,	202,	25,	479,	1545905049),
(2881,	'trade_offer_data_object_2881',	'духовка газовая RGO-610BL',	0,	202,	25,	480,	1545905052),
(2882,	'trade_offer_data_object_2882',	'духовка газовая RGO-610BL',	0,	202,	25,	481,	1545905056),
(2883,	'trade_offer_data_object_2883',	'духовка газовая RGO-610BL',	0,	202,	25,	482,	1545905060),
(2884,	'trade_offer_data_object_2884',	'духовка газовая RGO-610BL',	0,	202,	25,	483,	1545905063),
(2885,	'trade_offer_data_object_2885',	'Электрический духовой шкаф Hansa BOEW68077',	0,	202,	25,	484,	1545908288),
(2886,	'trade_offer_data_object_2886',	'Электрический духовой шкаф Hansa BOEW68077',	0,	202,	25,	485,	1545907045),
(2887,	'trade_offer_data_object_2887',	'Электрический духовой шкаф Hansa BOEW68077',	0,	202,	25,	484,	1545907507),
(2888,	'trade_offer_data_object_2888',	'Электрический духовой шкаф Hansa BOEW68077',	0,	202,	25,	484,	1545908291),
(2889,	'trade_offer_data_object_2889',	'Электрический духовой шкаф Hansa BOEW68077',	0,	202,	25,	484,	1545907512),
(2890,	'trade_offer_data_object_2890',	'Электрический духовой шкаф Hansa BOEW68077',	0,	202,	25,	484,	1545908294),
(2891,	'trade_offer_data_object_2891',	'Электрический духовой шкаф Hansa BOEW68077',	0,	202,	25,	484,	1545907517),
(2892,	'trade_offer_data_object_2892',	'Электрический духовой шкаф Hansa BOEW68077',	0,	202,	25,	484,	1545908298),
(2893,	'trade_offer_data_object_2893',	'Электрический духовой шкаф Hansa BOEW68077',	0,	202,	25,	484,	1545907521),
(2894,	'trade_offer_data_object_2894',	'Электрический духовой шкаф Hansa BOEW68077',	0,	202,	25,	484,	1545908301),
(2895,	'trade_offer_data_object_2895',	'Электрический духовой шкаф Hansa BOEW68077',	0,	202,	25,	484,	1545907524),
(2896,	'trade_offer_data_object_2896',	'Электрический духовой шкаф Hansa BOEW68077',	0,	202,	25,	484,	1545908305),
(2897,	'trade_offer_data_object_2897',	'Электрический духовой шкаф Hansa BOEW68077',	0,	202,	25,	484,	1545907528),
(2898,	'trade_offer_data_object_2898',	'Электрический духовой шкаф Hansa BOEW68077',	0,	202,	25,	484,	1545908308),
(2899,	'trade_offer_data_object_2899',	'Электрический духовой шкаф Hansa BOEW68077',	0,	202,	25,	484,	1545907538),
(2900,	'trade_offer_data_object_2900',	'Электрический духовой шкаф Hansa BOEW68077',	0,	202,	25,	484,	1545908311),
(2901,	'trade_offer_data_object_2901',	'Электрический духовой шкаф Hansa BOEW68077',	0,	202,	25,	484,	1545907558),
(2902,	'trade_offer_data_object_2902',	'Электрический духовой шкаф Hansa BOES68077',	0,	202,	25,	486,	1545908330),
(2903,	'trade_offer_data_object_2903',	'Электрический духовой шкаф Hansa BOES68077',	0,	202,	25,	486,	1545908192),
(2904,	'trade_offer_data_object_2904',	'Электрический духовой шкаф Hansa BOES68077',	0,	202,	25,	486,	1545908344),
(2905,	'trade_offer_data_object_2905',	'Электрический духовой шкаф Hansa BOES68077',	0,	202,	25,	486,	1545908196),
(2906,	'trade_offer_data_object_2906',	'Электрический духовой шкаф Hansa BOES68077',	0,	202,	25,	486,	1545908340),
(2907,	'trade_offer_data_object_2907',	'Электрический духовой шкаф Hansa BOES68077',	0,	202,	25,	486,	1545908201),
(2908,	'trade_offer_data_object_2908',	'Электрический духовой шкаф Hansa BOES68077',	0,	202,	25,	486,	1545908348),
(2909,	'trade_offer_data_object_2909',	'Электрический духовой шкаф Hansa BOES68077',	0,	202,	25,	486,	1545908205),
(2910,	'trade_offer_data_object_2910',	'Электрический духовой шкаф Hansa BOES68077',	0,	202,	25,	486,	1545908352),
(2911,	'trade_offer_data_object_2911',	'Электрический духовой шкаф Hansa BOES68077',	0,	202,	25,	486,	1545908208),
(2912,	'trade_offer_data_object_2912',	'Электрический духовой шкаф Hansa BOES68077',	0,	202,	25,	486,	1545908355),
(2913,	'trade_offer_data_object_2913',	'Электрический духовой шкаф Hansa BOES68077',	0,	202,	25,	486,	1545908212),
(2914,	'trade_offer_data_object_2914',	'Электрический духовой шкаф Hansa BOES68077',	0,	202,	25,	486,	1545908359),
(2915,	'trade_offer_data_object_2915',	'Электрический духовой шкаф Hansa BOES68077',	0,	202,	25,	486,	1545908215),
(2916,	'trade_offer_data_object_2916',	'Электрический духовой шкаф Hansa BOES68077',	0,	202,	25,	486,	1545907674),
(2917,	'trade_offer_data_object_2917',	'Электрический духовой шкаф Hansa BOES68077',	0,	202,	25,	486,	1545907674),
(2918,	'trade_offer_data_object_2918',	'Электрический духовой шкаф Hansa BOES68077',	0,	202,	25,	486,	1545908362),
(2919,	'trade_offer_data_object_2919',	'Электрический духовой шкаф Hansa BOES68077',	0,	202,	25,	486,	1545907674),
(2920,	'trade_offer_data_object_2920',	'Электрический духовой шкаф Hansa BOES68077',	0,	202,	25,	486,	1545908219),
(2921,	'trade_offer_data_object_2921',	'Электрический духовой шкаф Hansa BOES68077',	0,	202,	25,	486,	1545907674),
(2922,	'trade_offer_data_object_2922',	'Электрический духовой шкаф Hansa BOES68077',	0,	202,	25,	486,	1545907674),
(2923,	'trade_offer_data_object_2923',	'Электрический духовой шкаф Hansa BOES68077',	0,	202,	25,	486,	1545907674),
(2924,	'trade_offer_data_object_2924',	'Электрический духовой шкаф Hansa BOES68077',	0,	202,	25,	486,	1545907674),
(2925,	'trade_offer_data_object_2925',	'Электрический духовой шкаф Hansa BOES68077',	0,	202,	25,	486,	1545907674),
(2926,	'trade_offer_data_object_2926',	'Электрический духовой шкаф Hansa BOES68077',	0,	202,	25,	486,	1545907674),
(2927,	'trade_offer_data_object_2927',	'Электрический духовой шкаф Hansa BOES68077',	0,	202,	25,	486,	1545907674),
(2928,	'trade_offer_data_object_2928',	'Электрический духовой шкаф Hansa BOES68077',	0,	202,	25,	486,	1545907674),
(2929,	'trade_offer_data_object_2929',	'Электрический духовой шкаф Hansa BOES68077',	0,	202,	25,	486,	1545907674),
(2930,	'trade_offer_data_object_2930',	'Электрический духовой шкаф Hansa BOES68077',	0,	202,	25,	486,	1545907674),
(2931,	'trade_offer_data_object_2931',	'Электрический духовой шкаф Hansa BOES68077',	0,	202,	25,	486,	1545907674),
(2932,	'trade_offer_data_object_2932',	'Электрический духовой шкаф Hansa BOES68077',	0,	202,	25,	486,	1545907674),
(2933,	'trade_offer_data_object_2933',	'Электрический духовой шкаф Hansa BOES68077',	0,	202,	25,	486,	1545907674),
(2934,	'trade_offer_data_object_2934',	'Электрический духовой шкаф Hansa BOES68077',	0,	202,	25,	486,	1545907674),
(2935,	'trade_offer_data_object_2935',	'Электрический духовой шкаф Hansa BOES68077',	0,	202,	25,	486,	1545907674),
(2936,	'trade_offer_data_object_2936',	'Электрический духовой шкаф Hansa BOES68077',	0,	202,	25,	486,	1545907674),
(2937,	'trade_offer_data_object_2937',	'Электрический духовой шкаф Hansa BOES68077',	0,	202,	25,	486,	1545907674),
(2938,	'trade_offer_data_object_2938',	'Электрический духовой шкаф Hansa BOES68077',	0,	202,	25,	486,	1545907674),
(2939,	'trade_offer_data_object_2939',	'Электрический духовой шкаф Hansa BOES68077',	0,	202,	25,	486,	1545907674),
(2940,	'trade_offer_data_object_2940',	'Электрический духовой шкаф Hansa BOES68077',	0,	202,	25,	486,	1545907674),
(2941,	'trade_offer_data_object_2941',	'Электрический духовой шкаф Hansa BOES68077',	0,	202,	25,	486,	1545907674),
(2942,	'trade_offer_data_object_2942',	'Электрический духовой шкаф Hansa BOES68077',	0,	202,	25,	486,	1545907674),
(2943,	'trade_offer_data_object_2943',	'Клетка InterZoo LUNA, 45х28х42.5 см',	0,	200,	25,	487,	1545907800),
(2944,	'trade_offer_data_object_2944',	'Клетка InterZoo LUNA, 45х28х42.5 см',	0,	200,	25,	487,	1545907800),
(2945,	'trade_offer_data_object_2945',	'Клетка InterZoo LUNA, 45х28х42.5 см',	0,	200,	25,	487,	1545907800),
(2946,	'trade_offer_data_object_2946',	'Клетка InterZoo LUNA, 45х28х42.5 см',	0,	200,	25,	487,	1545907800),
(2947,	'trade_offer_data_object_2947',	'Клетка InterZoo LUNA, 45х28х42.5 см',	0,	200,	25,	487,	1545907800),
(2948,	'trade_offer_data_object_2948',	'Клетка InterZoo LUNA, 45х28х42.5 см',	0,	200,	25,	487,	1545907800),
(2949,	'trade_offer_data_object_2949',	'Электрический духовой шкаф Bosch Serie | 6 HBA23B351R',	0,	202,	25,	488,	1545908535),
(2950,	'trade_offer_data_object_2950',	'Электрический духовой шкаф Bosch Serie | 6 HBA23B351R',	0,	202,	25,	488,	1545908794),
(2951,	'trade_offer_data_object_2951',	'Электрический духовой шкаф Bosch Serie | 6 HBA23B351R',	0,	202,	25,	488,	1545908555),
(2952,	'trade_offer_data_object_2952',	'Электрический духовой шкаф Bosch Serie | 6 HBA23B351R',	0,	202,	25,	488,	1545908801),
(2953,	'trade_offer_data_object_2953',	'Электрический духовой шкаф Bosch Serie | 6 HBA23B351R',	0,	202,	25,	488,	1545908579),
(2954,	'trade_offer_data_object_2954',	'Электрический духовой шкаф Bosch Serie | 6 HBA23B351R',	0,	202,	25,	488,	1545908805),
(2955,	'trade_offer_data_object_2955',	'Электрический духовой шкаф Bosch Serie | 6 HBA23B351R',	0,	202,	25,	488,	1545908601),
(2956,	'trade_offer_data_object_2956',	'Электрический духовой шкаф Bosch Serie | 6 HBA23B351R',	0,	202,	25,	488,	1545908810),
(2957,	'trade_offer_data_object_2957',	'Электрический духовой шкаф Bosch Serie | 6 HBA23B351R',	0,	202,	25,	488,	1545908629),
(2958,	'trade_offer_data_object_2958',	'Электрический духовой шкаф Bosch Serie | 6 HBA23B351R',	0,	202,	25,	488,	1545908815),
(2959,	'trade_offer_data_object_2959',	'Электрический духовой шкаф Bosch Serie | 6 HBA23B351R',	0,	202,	25,	488,	1545908657),
(2960,	'trade_offer_data_object_2960',	'Электрический духовой шкаф Bosch Serie | 6 HBA23B351R',	0,	202,	25,	488,	1545908819),
(2961,	'trade_offer_data_object_2961',	'Электрический духовой шкаф Bosch Serie | 6 HBA23B351R',	0,	202,	25,	488,	1545908681),
(2962,	'trade_offer_data_object_2962',	'Электрический духовой шкаф Bosch Serie | 6 HBA23B351R',	0,	202,	25,	488,	1545908823),
(2963,	'trade_offer_data_object_2963',	'Электрический духовой шкаф Bosch Serie | 6 HBA23B351R',	0,	202,	25,	488,	1545908706),
(2964,	'trade_offer_data_object_2964',	'Электрический духовой шкаф Bosch Serie | 6 HBA23B351R',	0,	202,	25,	488,	1545908411),
(2965,	'trade_offer_data_object_2965',	'Электрический духовой шкаф Bosch Serie | 6 HBA23B351R',	0,	202,	25,	488,	1545908827),
(2966,	'trade_offer_data_object_2966',	'Электрический духовой шкаф Bosch Serie | 6 HBA23B351R',	0,	202,	25,	488,	1545908411),
(2967,	'trade_offer_data_object_2967',	'Электрический духовой шкаф Bosch Serie | 6 HBA23B351R',	0,	202,	25,	488,	1545908411),
(2968,	'trade_offer_data_object_2968',	'Электрический духовой шкаф Bosch Serie | 6 HBA23B351R',	0,	202,	25,	488,	1545908411),
(2969,	'trade_offer_data_object_2969',	'Электрический духовой шкаф Bosch Serie | 6 HBA23B351R',	0,	202,	25,	488,	1545908411),
(2970,	'trade_offer_data_object_2970',	'Электрический духовой шкаф Samsung NV70K2340RS',	0,	202,	25,	489,	1545909068),
(2971,	'trade_offer_data_object_2971',	'Электрический духовой шкаф Samsung NV70K2340RS',	0,	202,	25,	489,	1545909292),
(2972,	'trade_offer_data_object_2972',	'Электрический духовой шкаф Samsung NV70K2340RS',	0,	202,	25,	489,	1545909085),
(2973,	'trade_offer_data_object_2973',	'Электрический духовой шкаф Samsung NV70K2340RS',	0,	202,	25,	489,	1545909296),
(2974,	'trade_offer_data_object_2974',	'Электрический духовой шкаф Samsung NV70K2340RS',	0,	202,	25,	489,	1545909105),
(2975,	'trade_offer_data_object_2975',	'Электрический духовой шкаф Samsung NV70K2340RS',	0,	202,	25,	489,	1545909300),
(2976,	'trade_offer_data_object_2976',	'Электрический духовой шкаф Samsung NV70K2340RS',	0,	202,	25,	489,	1545909125),
(2977,	'trade_offer_data_object_2977',	'Электрический духовой шкаф Samsung NV70K2340RS',	0,	202,	25,	489,	1545909304),
(2978,	'trade_offer_data_object_2978',	'Электрический духовой шкаф Samsung NV70K2340RS',	0,	202,	25,	489,	1545909146),
(2979,	'trade_offer_data_object_2979',	'Электрический духовой шкаф Samsung NV70K2340RS',	0,	202,	25,	489,	1545909308),
(2980,	'trade_offer_data_object_2980',	'Электрический духовой шкаф Samsung NV70K2340RS',	0,	202,	25,	489,	1545909169),
(2981,	'trade_offer_data_object_2981',	'Электрический духовой шкаф Samsung NV70K2340RS',	0,	202,	25,	489,	1545909313),
(2982,	'trade_offer_data_object_2982',	'Электрический духовой шкаф Samsung NV70K2340RS',	0,	202,	25,	489,	1545909196),
(2983,	'trade_offer_data_object_2983',	'Электрический духовой шкаф Samsung NV70K2340RS',	0,	202,	25,	489,	1545909321),
(2984,	'trade_offer_data_object_2984',	'Электрический духовой шкаф Samsung NV70K2340RS',	0,	202,	25,	489,	1545909216),
(2985,	'trade_offer_data_object_2985',	'Электрический духовой шкаф Samsung NV70K2340RS',	0,	202,	25,	489,	1545909326),
(2986,	'trade_offer_data_object_2986',	'Встраиваемый электрический духовой шкаф Asko OP 8478 G',	0,	202,	25,	490,	1545909642),
(2987,	'trade_offer_data_object_2987',	'Встраиваемый электрический духовой шкаф Asko OP 8478 G',	0,	202,	25,	490,	1545909880),
(2988,	'trade_offer_data_object_2988',	'Встраиваемый электрический духовой шкаф Asko OP 8478 G',	0,	202,	25,	490,	1545909664),
(2989,	'trade_offer_data_object_2989',	'Встраиваемый электрический духовой шкаф Asko OP 8478 G',	0,	202,	25,	490,	1545909884),
(2990,	'trade_offer_data_object_2990',	'Встраиваемый электрический духовой шкаф Asko OP 8478 G',	0,	202,	25,	490,	1545909687),
(2991,	'trade_offer_data_object_2991',	'Встраиваемый электрический духовой шкаф Asko OP 8478 G',	0,	202,	25,	490,	1545909889),
(2992,	'trade_offer_data_object_2992',	'Встраиваемый электрический духовой шкаф Asko OP 8478 G',	0,	202,	25,	490,	1545909709),
(2993,	'trade_offer_data_object_2993',	'Встраиваемый электрический духовой шкаф Asko OP 8478 G',	0,	202,	25,	490,	1545909892),
(2994,	'trade_offer_data_object_2994',	'Встраиваемый электрический духовой шкаф Asko OP 8478 G',	0,	202,	25,	490,	1545909752),
(2995,	'trade_offer_data_object_2995',	'Встраиваемый электрический духовой шкаф Asko OP 8478 G',	0,	202,	25,	490,	1545909896),
(2996,	'trade_offer_data_object_2996',	'Встраиваемый электрический духовой шкаф Asko OP 8478 G',	0,	202,	25,	490,	1545909521),
(2997,	'trade_offer_data_object_2997',	'Встраиваемый электрический духовой шкаф Asko OP 8478 G',	0,	202,	25,	490,	1545909521),
(2998,	'trade_offer_data_object_2998',	'Встраиваемый электрический духовой шкаф Asko OP 8478 G',	0,	202,	25,	490,	1545909796),
(2999,	'trade_offer_data_object_2999',	'Встраиваемый электрический духовой шкаф Asko OP 8478 G',	0,	202,	25,	490,	1545909901),
(3000,	'trade_offer_data_object_3000',	'Встраиваемый электрический духовой шкаф Asko OP 8478 G',	0,	202,	25,	490,	1545909817),
(3001,	'trade_offer_data_object_3001',	'Встраиваемый электрический духовой шкаф Asko OP 8478 G',	0,	202,	25,	490,	1545909906),
(3002,	'trade_offer_data_object_3002',	'Встраиваемый электрический духовой шкаф Asko OP 8478 G',	0,	202,	25,	490,	1545909850),
(3003,	'trade_offer_data_object_3003',	'Встраиваемый электрический духовой шкаф Asko OP 8478 G',	0,	202,	25,	490,	1545909910),
(3004,	'trade_offer_data_object_3004',	'Встраиваемый электрический духовой шкаф Asko OP 8478 G',	0,	202,	25,	490,	1545909521),
(3005,	'trade_offer_data_object_3005',	'Встраиваемый электрический духовой шкаф Asko OP 8478 G',	0,	202,	25,	490,	1545909521),
(3006,	'trade_offer_data_object_3006',	'Встраиваемый электрический духовой шкаф Asko OP 8478 G',	0,	202,	25,	490,	1545909521),
(3007,	'trade_offer_data_object_3007',	'Встраиваемый электрический духовой шкаф Darina 1V8 BDE 111707 Bg',	0,	202,	25,	491,	1545910354),
(3008,	'trade_offer_data_object_3008',	'Встраиваемый электрический духовой шкаф Darina 1V8 BDE 111707 Bg',	0,	202,	25,	491,	1545910687),
(3009,	'trade_offer_data_object_3009',	'Встраиваемый электрический духовой шкаф Darina 1V8 BDE 111707 Bg',	0,	202,	25,	491,	1545910375),
(3010,	'trade_offer_data_object_3010',	'Встраиваемый электрический духовой шкаф Darina 1V8 BDE 111707 Bg',	0,	202,	25,	491,	1545910693),
(3011,	'trade_offer_data_object_3011',	'Встраиваемый электрический духовой шкаф Darina 1V8 BDE 111707 Bg',	0,	202,	25,	491,	1545910394),
(3012,	'trade_offer_data_object_3012',	'Встраиваемый электрический духовой шкаф Darina 1V8 BDE 111707 Bg',	0,	202,	25,	491,	1545910708),
(3013,	'trade_offer_data_object_3013',	'Встраиваемый электрический духовой шкаф Darina 1V8 BDE 111707 Bg',	0,	202,	25,	491,	1545910413),
(3014,	'trade_offer_data_object_3014',	'Встраиваемый электрический духовой шкаф Darina 1V8 BDE 111707 Bg',	0,	202,	25,	491,	1545910716),
(3015,	'trade_offer_data_object_3015',	'Встраиваемый электрический духовой шкаф Darina 1V8 BDE 111707 Bg',	0,	202,	25,	491,	1545910459),
(3016,	'trade_offer_data_object_3016',	'Встраиваемый электрический духовой шкаф Darina 1V8 BDE 111707 Bg',	0,	202,	25,	491,	1545910721),
(3017,	'trade_offer_data_object_3017',	'Встраиваемый электрический духовой шкаф Darina 1V8 BDE 111707 Bg',	0,	202,	25,	491,	1545910503),
(3018,	'trade_offer_data_object_3018',	'Встраиваемый электрический духовой шкаф Darina 1V8 BDE 111707 Bg',	0,	202,	25,	491,	1545910724),
(3019,	'trade_offer_data_object_3019',	'Встраиваемый электрический духовой шкаф Darina 1V8 BDE 111707 Bg',	0,	202,	25,	491,	1545910523),
(3020,	'trade_offer_data_object_3020',	'Встраиваемый электрический духовой шкаф Darina 1V8 BDE 111707 Bg',	0,	202,	25,	491,	1545910166),
(3021,	'trade_offer_data_object_3021',	'Встраиваемый электрический духовой шкаф Darina 1V8 BDE 111707 Bg',	0,	202,	25,	491,	1545910728),
(3022,	'trade_offer_data_object_3022',	'Встраиваемый электрический духовой шкаф Darina 1V8 BDE 111707 Bg',	0,	202,	25,	491,	1545910556),
(3023,	'trade_offer_data_object_3023',	'Встраиваемый электрический духовой шкаф Darina 1V8 BDE 111707 Bg',	0,	202,	25,	491,	1545910732),
(3024,	'trade_offer_data_object_3024',	'Встраиваемый электрический духовой шкаф Hotpoint-Ariston FI7 861 SH IC HA',	0,	202,	25,	492,	1545911049),
(3025,	'trade_offer_data_object_3025',	'Встраиваемый электрический духовой шкаф Hotpoint-Ariston FI7 861 SH IC HA',	0,	202,	25,	492,	1545911241),
(3026,	'trade_offer_data_object_3026',	'Встраиваемый электрический духовой шкаф Hotpoint-Ariston FI7 861 SH IC HA',	0,	202,	25,	492,	1545911072),
(3027,	'trade_offer_data_object_3027',	'Встраиваемый электрический духовой шкаф Hotpoint-Ariston FI7 861 SH IC HA',	0,	202,	25,	492,	1545911245),
(3028,	'trade_offer_data_object_3028',	'Встраиваемый электрический духовой шкаф Hotpoint-Ariston FI7 861 SH IC HA',	0,	202,	25,	492,	1545911091),
(3029,	'trade_offer_data_object_3029',	'Встраиваемый электрический духовой шкаф Hotpoint-Ariston FI7 861 SH IC HA',	0,	202,	25,	492,	1545911248),
(3030,	'trade_offer_data_object_3030',	'Встраиваемый электрический духовой шкаф Hotpoint-Ariston FI7 861 SH IC HA',	0,	202,	25,	492,	1545911111),
(3031,	'trade_offer_data_object_3031',	'Встраиваемый электрический духовой шкаф Hotpoint-Ariston FI7 861 SH IC HA',	0,	202,	25,	492,	1545911252),
(3032,	'trade_offer_data_object_3032',	'Встраиваемый электрический духовой шкаф Hotpoint-Ariston FI7 861 SH IC HA',	0,	202,	25,	492,	1545911139),
(3033,	'trade_offer_data_object_3033',	'Встраиваемый электрический духовой шкаф Hotpoint-Ariston FI7 861 SH IC HA',	0,	202,	25,	492,	1545911259),
(3034,	'trade_offer_data_object_3034',	'Встраиваемый электрический духовой шкаф Hotpoint-Ariston FI7 861 SH IC HA',	0,	202,	25,	492,	1545911163),
(3035,	'trade_offer_data_object_3035',	'Встраиваемый электрический духовой шкаф Hotpoint-Ariston FI7 861 SH IC HA',	0,	202,	25,	492,	1545911263),
(3036,	'trade_offer_data_object_3036',	'Встраиваемый электрический духовой шкаф Hotpoint-Ariston FI7 861 SH IC HA',	0,	202,	25,	492,	1545911187),
(3037,	'trade_offer_data_object_3037',	'Встраиваемый электрический духовой шкаф Hotpoint-Ariston FI7 861 SH IC HA',	0,	202,	25,	492,	1545911266),
(3038,	'trade_offer_data_object_3038',	'Встраиваемый электрический духовой шкаф Hotpoint-Ariston FI7 861 SH IC HA',	0,	202,	25,	492,	1545911211),
(3039,	'trade_offer_data_object_3039',	'Встраиваемый электрический духовой шкаф Hotpoint-Ariston FI7 861 SH IC HA',	0,	202,	25,	492,	1545911271),
(3040,	'trade_offer_data_object_3040',	'Наполнитель древесный Vitaline',	0,	180,	25,	493,	1545912141),
(3041,	'',	'4.5 л',	0,	223,	25,	1,	1545912017),
(3042,	'',	'15 л',	0,	223,	25,	2,	1545912028),
(3043,	'trade_offer_data_object_3043',	'Наполнитель древесный Vitaline',	0,	180,	25,	493,	1545912056),
(3044,	'',	'4.54 л',	0,	223,	25,	3,	1545912265),
(3045,	'trade_offer_data_object_3045',	'Наполнитель древесный Барсик',	0,	180,	25,	494,	1545912306),
(3046,	'trade_offer_data_object_3046',	'Наполнитель древесный Барсик',	0,	180,	25,	494,	1545912321),
(3047,	'trade_offer_data_object_3047',	'Наполнитель впитывающий N1 NATUReL',	0,	180,	25,	495,	1545912552),
(3048,	'',	'17.5 л',	0,	223,	25,	4,	1545912568),
(3049,	'trade_offer_data_object_3049',	'Наполнитель впитывающий N1 NATUReL',	0,	180,	25,	495,	1545912591),
(3050,	'',	'3 л',	0,	223,	25,	5,	1545912742),
(3051,	'',	'10 л',	0,	223,	25,	6,	1545912765),
(3052,	'trade_offer_data_object_3052',	'Наполнитель впитывающий Fresh Step',	0,	180,	25,	496,	1545912830),
(3053,	'trade_offer_data_object_3053',	'Наполнитель впитывающий Fresh Step',	0,	180,	25,	496,	1545912846),
(3054,	'',	'178.16.152.254',	0,	83,	46,	23,	1547561314),
(3055,	'',	'178.16.152.254',	0,	83,	46,	24,	1548850782),
(3056,	'',	'178.16.152.254',	0,	83,	46,	25,	1549012427),
(3057,	'',	'178.16.152.254',	0,	83,	46,	26,	1549270388);

DROP TABLE IF EXISTS `cms3_objects_expiration`;
CREATE TABLE `cms3_objects_expiration` (
  `obj_id` int(10) unsigned NOT NULL,
  `entrytime` int(10) unsigned NOT NULL,
  `expire` int(10) unsigned NOT NULL,
  PRIMARY KEY (`obj_id`),
  KEY `FK_ObjectsExpire to objects` (`obj_id`),
  KEY `entrytime` (`entrytime`,`expire`),
  CONSTRAINT `FK_ObjectsExpire to objects` FOREIGN KEY (`obj_id`) REFERENCES `cms3_objects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_object_content`;
CREATE TABLE `cms3_object_content` (
  `obj_id` int(10) unsigned DEFAULT NULL,
  `field_id` int(10) unsigned DEFAULT NULL,
  `int_val` bigint(20) DEFAULT NULL,
  `varchar_val` varchar(255) DEFAULT NULL,
  `text_val` mediumtext DEFAULT NULL,
  `rel_val` int(10) unsigned DEFAULT NULL,
  `tree_val` int(10) unsigned DEFAULT NULL,
  `float_val` double DEFAULT NULL,
  KEY `Content to object relation_FK` (`obj_id`),
  KEY `Contents field id relation_FK` (`field_id`),
  KEY `Relation value reference_FK` (`rel_val`),
  KEY `content2tree_FK` (`tree_val`),
  KEY `int_val` (`int_val`),
  KEY `varchar_val` (`varchar_val`),
  KEY `float_val` (`float_val`),
  KEY `text_val` (`text_val`(8)),
  KEY `K_Complex_FieldIdAndRelVal` (`field_id`,`rel_val`),
  KEY `K_Complex_FieldIdAndTreeVal` (`field_id`,`tree_val`),
  KEY `K_Complex_ObjIdAndFieldId` (`obj_id`,`field_id`),
  CONSTRAINT `FK_Content to object relation` FOREIGN KEY (`obj_id`) REFERENCES `cms3_objects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Contents field id relation` FOREIGN KEY (`field_id`) REFERENCES `cms3_object_fields` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Relation value reference` FOREIGN KEY (`rel_val`) REFERENCES `cms3_objects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_content2tree` FOREIGN KEY (`tree_val`) REFERENCES `cms3_hierarchy` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_object_content_cnt`;
CREATE TABLE `cms3_object_content_cnt` (
  `obj_id` int(10) unsigned DEFAULT NULL,
  `field_id` int(10) unsigned DEFAULT NULL,
  `cnt` int(10) DEFAULT 0,
  KEY `FK_Contents_Counters to object relation` (`obj_id`),
  KEY `FK_Contents_Counters field id relation` (`field_id`),
  CONSTRAINT `FK_Contents_Counters field id relation` FOREIGN KEY (`field_id`) REFERENCES `cms3_object_fields` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Contents_Counters to object relation` FOREIGN KEY (`obj_id`) REFERENCES `cms3_objects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_object_domain_id_list`;
CREATE TABLE `cms3_object_domain_id_list` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `obj_id` int(10) unsigned DEFAULT NULL,
  `field_id` int(10) unsigned DEFAULT NULL,
  `domain_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cms3_object_domain_id_list load field value` (`obj_id`,`field_id`),
  KEY `cms3_object_domain_id_list field_id` (`field_id`),
  KEY `cms3_object_domain_id_list obj_id` (`obj_id`),
  KEY `cms3_object_domain_id_list domain_id` (`domain_id`),
  CONSTRAINT `cms3_object_domain_id_list domain id` FOREIGN KEY (`domain_id`) REFERENCES `cms3_domains` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cms3_object_domain_id_list field id` FOREIGN KEY (`field_id`) REFERENCES `cms3_object_fields` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cms3_object_domain_id_list object id` FOREIGN KEY (`obj_id`) REFERENCES `cms3_objects` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_object_fields`;
CREATE TABLE `cms3_object_fields` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `is_locked` tinyint(1) DEFAULT 0,
  `field_type_id` int(10) unsigned DEFAULT NULL,
  `is_inheritable` tinyint(1) DEFAULT 0,
  `is_visible` tinyint(1) DEFAULT 1,
  `guide_id` int(10) unsigned DEFAULT NULL,
  `in_search` tinyint(1) DEFAULT 1,
  `in_filter` tinyint(1) DEFAULT 1,
  `tip` varchar(255) DEFAULT NULL,
  `is_required` tinyint(1) DEFAULT NULL,
  `restriction_id` int(10) unsigned DEFAULT NULL,
  `sortable` tinyint(4) DEFAULT 0,
  `is_system` tinyint(1) DEFAULT 0,
  `is_important` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `Field to field type relation_FK` (`field_type_id`),
  KEY `FK_Reference_25` (`guide_id`),
  KEY `name` (`name`),
  KEY `title` (`title`),
  KEY `is_locked` (`is_locked`),
  KEY `is_inheritable` (`is_inheritable`),
  KEY `is_visible` (`is_visible`),
  KEY `in_search` (`in_search`),
  KEY `in_filter` (`in_filter`),
  KEY `tip` (`tip`),
  KEY `is_required` (`is_required`),
  KEY `restriction_id` (`restriction_id`),
  KEY `sortable` (`sortable`),
  KEY `is_system` (`is_system`),
  KEY `is_important` (`is_important`),
  CONSTRAINT `FK_Field to field guide relation` FOREIGN KEY (`guide_id`) REFERENCES `cms3_object_types` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_Field to field type relation` FOREIGN KEY (`field_type_id`) REFERENCES `cms3_object_field_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Field to restriction relation` FOREIGN KEY (`restriction_id`) REFERENCES `cms3_object_fields_restrictions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_object_fields_restrictions`;
CREATE TABLE `cms3_object_fields_restrictions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `class_prefix` varchar(64) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `field_type_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Field restriction to field type relation_FK` (`field_type_id`),
  CONSTRAINT `FK_Field restriction to field type relation` FOREIGN KEY (`field_type_id`) REFERENCES `cms3_object_field_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_object_field_groups`;
CREATE TABLE `cms3_object_field_groups` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `type_id` int(10) unsigned DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `is_visible` tinyint(1) DEFAULT NULL,
  `ord` int(11) DEFAULT NULL,
  `is_locked` tinyint(1) DEFAULT 0,
  `tip` varchar(4096) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Group to type relation_FK` (`type_id`),
  KEY `ord` (`ord`),
  KEY `name` (`name`),
  KEY `title` (`title`),
  KEY `is_active` (`is_active`),
  KEY `is_visible` (`is_visible`),
  KEY `is_locked` (`is_locked`),
  CONSTRAINT `FK_Group to type relation` FOREIGN KEY (`type_id`) REFERENCES `cms3_object_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_object_field_types`;
CREATE TABLE `cms3_object_field_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) DEFAULT NULL,
  `data_type` enum('int','string','text','relation','file','img_file','swf_file','bool','date','boolean','wysiwyg','password','tags','symlink','price','formula','float','counter','optioned','video_file','color','link_to_object_type','multiple_image','domain_id','domain_id_list','offer_id_list','offer_id') DEFAULT NULL,
  `is_multiple` tinyint(1) DEFAULT 0,
  `is_unsigned` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `name` (`name`),
  KEY `data_type` (`data_type`),
  KEY `is_multiple` (`is_multiple`),
  KEY `is_unsigned` (`is_unsigned`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_object_files`;
CREATE TABLE `cms3_object_files` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `obj_id` int(10) unsigned DEFAULT NULL,
  `field_id` int(10) unsigned DEFAULT NULL,
  `src` varchar(500) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `ord` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `load field value` (`obj_id`,`field_id`),
  KEY `field_id` (`field_id`),
  KEY `obj_id` (`obj_id`),
  KEY `src` (`src`(255)),
  KEY `ord` (`ord`),
  CONSTRAINT `File object field content to field` FOREIGN KEY (`field_id`) REFERENCES `cms3_object_fields` (`id`) ON DELETE CASCADE,
  CONSTRAINT `File object field content to object` FOREIGN KEY (`obj_id`) REFERENCES `cms3_objects` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_object_images`;
CREATE TABLE `cms3_object_images` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `obj_id` int(10) unsigned DEFAULT NULL,
  `field_id` int(10) unsigned DEFAULT NULL,
  `src` varchar(500) DEFAULT NULL,
  `alt` varchar(255) DEFAULT NULL,
  `ord` int(10) unsigned DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `load field value` (`obj_id`,`field_id`),
  KEY `field_id` (`field_id`),
  KEY `obj_id` (`obj_id`),
  KEY `src` (`src`(255)),
  KEY `alt` (`alt`),
  KEY `ord` (`ord`),
  CONSTRAINT `object field content to field` FOREIGN KEY (`field_id`) REFERENCES `cms3_object_fields` (`id`) ON DELETE CASCADE,
  CONSTRAINT `object field content to object` FOREIGN KEY (`obj_id`) REFERENCES `cms3_objects` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_object_offer_id_list`;
CREATE TABLE `cms3_object_offer_id_list` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `obj_id` int(10) unsigned NOT NULL,
  `field_id` int(10) unsigned NOT NULL,
  `offer_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cms3_object_offer_id_list load field value` (`obj_id`,`field_id`),
  KEY `cms3_object_offer_id_list field_id` (`field_id`),
  KEY `cms3_object_offer_id_list obj_id` (`obj_id`),
  KEY `cms3_object_offer_id_list offer_id` (`offer_id`),
  CONSTRAINT `cms3_object_offer_id_list field id` FOREIGN KEY (`field_id`) REFERENCES `cms3_object_fields` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cms3_object_offer_id_list object id` FOREIGN KEY (`obj_id`) REFERENCES `cms3_objects` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cms3_object_offer_id_list offer id` FOREIGN KEY (`offer_id`) REFERENCES `cms3_offer_list` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_object_types`;
CREATE TABLE `cms3_object_types` (
  `domain_id` int(10) unsigned DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `guid` varchar(64) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `is_locked` tinyint(1) DEFAULT 0,
  `parent_id` int(10) unsigned DEFAULT NULL,
  `is_guidable` tinyint(1) DEFAULT 0,
  `is_public` tinyint(1) DEFAULT 0,
  `hierarchy_type_id` int(10) unsigned DEFAULT NULL,
  `sortable` tinyint(4) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `hierarchy_type_id` (`hierarchy_type_id`),
  KEY `parent_id` (`parent_id`),
  KEY `is_public` (`is_public`),
  KEY `name` (`name`),
  KEY `is_locked` (`is_locked`),
  KEY `is_guidable` (`is_guidable`),
  KEY `guid` (`guid`),
  KEY `cms3_object_types domain id` (`domain_id`),
  CONSTRAINT `cms3_object_types domain id` FOREIGN KEY (`domain_id`) REFERENCES `cms3_domains` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_object_type_tree`;
CREATE TABLE `cms3_object_type_tree` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` int(10) unsigned DEFAULT NULL,
  `child_id` int(10) unsigned DEFAULT NULL,
  `level` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique parent-child object type relation` (`parent_id`,`child_id`),
  KEY `Object type id from child_id` (`child_id`),
  CONSTRAINT `Object type id from child_id` FOREIGN KEY (`child_id`) REFERENCES `cms3_object_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Object type id from parent_id` FOREIGN KEY (`parent_id`) REFERENCES `cms3_object_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_offer_list`;
CREATE TABLE `cms3_offer_list` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type_id` int(10) unsigned NOT NULL,
  `data_object_id` int(10) unsigned DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `vendor_code` varchar(255) DEFAULT NULL,
  `bar_code` varchar(255) DEFAULT NULL,
  `total_count` bigint(20) unsigned DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `order` bigint(20) unsigned DEFAULT 0,
  `weight` bigint(20) unsigned DEFAULT 0,
  `width` bigint(20) unsigned DEFAULT 0,
  `length` bigint(20) unsigned DEFAULT 0,
  `height` bigint(20) unsigned DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `vendor_code` (`vendor_code`),
  KEY `offer to type id` (`type_id`),
  KEY `offer to data object id` (`data_object_id`),
  CONSTRAINT `offer to data object id` FOREIGN KEY (`data_object_id`) REFERENCES `cms3_objects` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `offer to type id` FOREIGN KEY (`type_id`) REFERENCES `cms3_object_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_offer_price_list`;
CREATE TABLE `cms3_offer_price_list` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `value` double unsigned NOT NULL,
  `offer_id` int(10) unsigned NOT NULL,
  `currency_id` int(10) unsigned NOT NULL,
  `type_id` int(10) unsigned NOT NULL,
  `is_main` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `offer price to offer` (`offer_id`),
  KEY `offer price to currency` (`currency_id`),
  KEY `offer price to type` (`type_id`),
  CONSTRAINT `offer price to currency` FOREIGN KEY (`currency_id`) REFERENCES `cms3_objects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `offer price to offer` FOREIGN KEY (`offer_id`) REFERENCES `cms3_offer_list` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `offer price to type` FOREIGN KEY (`type_id`) REFERENCES `cms3_offer_price_type_list` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_offer_price_type_list`;
CREATE TABLE `cms3_offer_price_type_list` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `is_default` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_permissions`;
CREATE TABLE `cms3_permissions` (
  `level` tinyint(4) DEFAULT NULL,
  `owner_id` int(10) unsigned DEFAULT NULL,
  `rel_id` int(10) unsigned DEFAULT NULL,
  KEY `owner reference_FK` (`owner_id`),
  KEY `rel reference_FK` (`rel_id`),
  KEY `level` (`level`),
  CONSTRAINT `FK_owner reference` FOREIGN KEY (`owner_id`) REFERENCES `cms3_objects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_rel reference` FOREIGN KEY (`rel_id`) REFERENCES `cms3_hierarchy` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_redirects`;
CREATE TABLE `cms3_redirects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `source` text NOT NULL,
  `target` text NOT NULL,
  `status` int(10) unsigned DEFAULT 301,
  `made_by_user` tinyint(1) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `source` (`source`(255))
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_response_error_entry_list`;
CREATE TABLE `cms3_response_error_entry_list` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `url` text NOT NULL,
  `code` int(10) unsigned NOT NULL,
  `hits_count` int(10) unsigned DEFAULT 0,
  `domain_id` int(10) unsigned NOT NULL,
  `update_time` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cms3_response_error_entry_list order by hits count` (`hits_count`),
  KEY `cms3_response_error_entry_list order by update time` (`update_time`),
  KEY `cms3_response_error_entry_list domain_id` (`domain_id`),
  CONSTRAINT `cms3_response_error_entry_list domain_id` FOREIGN KEY (`domain_id`) REFERENCES `cms3_domains` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_search`;
CREATE TABLE `cms3_search` (
  `rel_id` int(10) unsigned NOT NULL,
  `indextime` int(11) DEFAULT NULL,
  `lang_id` int(11) DEFAULT NULL,
  `domain_id` int(11) DEFAULT NULL,
  `type_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`rel_id`),
  KEY `lang_id + domain_id + type_id_FK` (`lang_id`,`domain_id`,`type_id`),
  KEY `domain_id` (`domain_id`,`type_id`),
  KEY `indextime` (`indextime`),
  KEY `type_id` (`type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_search_index`;
CREATE TABLE `cms3_search_index` (
  `rel_id` int(10) unsigned DEFAULT NULL,
  `weight` int(11) DEFAULT NULL,
  `word_id` int(10) unsigned DEFAULT NULL,
  `tf` float DEFAULT NULL,
  KEY `pages to index_FK` (`rel_id`),
  KEY `word index_FK` (`word_id`),
  KEY `weight` (`weight`),
  KEY `tf` (`tf`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_search_index_words`;
CREATE TABLE `cms3_search_index_words` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `word` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `word` (`word`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_sliders`;
CREATE TABLE `cms3_sliders` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `domain_id` int(11) unsigned NOT NULL,
  `language_id` int(11) unsigned NOT NULL,
  `sliding_speed` int(11) unsigned DEFAULT NULL,
  `sliding_delay` int(11) unsigned DEFAULT NULL,
  `sliding_loop_enable` tinyint(1) DEFAULT 0,
  `sliding_auto_play_enable` tinyint(1) DEFAULT 0,
  `sliders_random_order_enable` tinyint(1) DEFAULT 0,
  `slides_count` int(11) unsigned DEFAULT 0,
  `custom_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id from domains` (`domain_id`),
  KEY `id from languages` (`language_id`),
  CONSTRAINT `id from domains` FOREIGN KEY (`domain_id`) REFERENCES `cms3_domains` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `id from languages` FOREIGN KEY (`language_id`) REFERENCES `cms3_langs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_slides`;
CREATE TABLE `cms3_slides` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slider_id` int(11) unsigned NOT NULL,
  `is_active` tinyint(1) DEFAULT 0,
  `title` varchar(1024) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `text` mediumtext DEFAULT NULL,
  `link` varchar(1024) DEFAULT NULL,
  `open_in_new_tab` tinyint(1) DEFAULT 1,
  `order` int(11) unsigned DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `slider_id and is_active with order` (`slider_id`,`is_active`,`order`),
  CONSTRAINT `id from sliders` FOREIGN KEY (`slider_id`) REFERENCES `cms3_sliders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_stock_balance_list`;
CREATE TABLE `cms3_stock_balance_list` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `offer_id` int(10) unsigned NOT NULL,
  `stock_id` int(10) unsigned NOT NULL,
  `value` bigint(20) unsigned DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `stock balance to offer` (`offer_id`),
  KEY `stock balance to stock` (`stock_id`),
  CONSTRAINT `stock balance to offer` FOREIGN KEY (`offer_id`) REFERENCES `cms3_offer_list` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `stock balance to stock` FOREIGN KEY (`stock_id`) REFERENCES `cms3_objects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms3_templates`;
CREATE TABLE `cms3_templates` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL,
  `filename` varchar(64) DEFAULT NULL,
  `type` varchar(64) DEFAULT NULL,
  `domain_id` int(10) unsigned DEFAULT NULL,
  `lang_id` int(10) unsigned DEFAULT NULL,
  `title` varchar(128) DEFAULT NULL,
  `is_default` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Template - Lang_FK` (`lang_id`),
  KEY `Templates - domains_FK` (`domain_id`),
  KEY `is_default` (`is_default`),
  KEY `filename` (`filename`),
  KEY `title` (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms_backup`;
CREATE TABLE `cms_backup` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ctime` int(11) DEFAULT NULL,
  `changed_module` varchar(128) DEFAULT NULL,
  `changed_method` varchar(128) DEFAULT NULL,
  `param` text DEFAULT NULL,
  `param0` mediumtext DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `is_active` int(11) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms_permissions`;
CREATE TABLE `cms_permissions` (
  `module` varchar(64) DEFAULT NULL,
  `method` varchar(64) DEFAULT NULL,
  `owner_id` int(10) unsigned DEFAULT NULL,
  `allow` tinyint(4) DEFAULT 1,
  KEY `module` (`module`),
  KEY `method` (`method`),
  KEY `owner_id` (`owner_id`),
  KEY `allow` (`allow`),
  CONSTRAINT `FK_PermissionOwnerId_To_ObjectId` FOREIGN KEY (`owner_id`) REFERENCES `cms3_objects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms_reg`;
CREATE TABLE `cms_reg` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `var` varchar(48) NOT NULL,
  `val` varchar(255) DEFAULT NULL,
  `rel` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `var` (`var`),
  KEY `rel` (`rel`,`var`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms_sitemap`;
CREATE TABLE `cms_sitemap` (
  `id` int(11) NOT NULL,
  `domain_id` int(10) unsigned NOT NULL,
  `link` varchar(1024) NOT NULL,
  `sort` tinyint(4) NOT NULL,
  `priority` double NOT NULL DEFAULT 0,
  `dt` datetime NOT NULL,
  `level` int(4) unsigned NOT NULL,
  `lang_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `__sort` (`sort`),
  KEY `__domain_id` (`domain_id`),
  KEY `__domain_id__sort` (`domain_id`,`sort`),
  KEY `__domain_id__level` (`domain_id`,`level`),
  KEY `lang_id from cms3_langs` (`lang_id`),
  CONSTRAINT `domain_id from cms3_domains` FOREIGN KEY (`domain_id`) REFERENCES `cms3_domains` (`id`) ON DELETE CASCADE,
  CONSTRAINT `lang_id from cms3_langs` FOREIGN KEY (`lang_id`) REFERENCES `cms3_langs` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms_stat_dispatches`;
CREATE TABLE `cms_stat_dispatches` (
  `hash` varchar(10) NOT NULL,
  `time` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms_stat_domains`;
CREATE TABLE `cms_stat_domains` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `entrytime` int(11) DEFAULT NULL,
  `refer_domain` text DEFAULT NULL,
  `sess_id` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sess_id` (`sess_id`(4))
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms_stat_entry_points`;
CREATE TABLE `cms_stat_entry_points` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `url` text DEFAULT NULL,
  `host_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `url` (`url`(1)),
  KEY `host_id` (`host_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms_stat_entry_points_events`;
CREATE TABLE `cms_stat_entry_points_events` (
  `entry_point_id` int(11) unsigned DEFAULT NULL,
  `event_id` int(11) unsigned DEFAULT NULL,
  KEY `entry_point_id` (`entry_point_id`),
  KEY `event_id` (`event_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms_stat_events`;
CREATE TABLE `cms_stat_events` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `description` text DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type` tinyint(4) DEFAULT NULL,
  `profit` float(9,2) DEFAULT 0.00,
  `host_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `name` (`name`,`type`),
  KEY `host_id` (`host_id`),
  KEY `type` (`type`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms_stat_events_collected`;
CREATE TABLE `cms_stat_events_collected` (
  `event_id` int(11) unsigned DEFAULT NULL,
  `hit_id` int(11) unsigned DEFAULT NULL,
  KEY `event_id` (`event_id`,`hit_id`),
  KEY `hit_id` (`hit_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms_stat_events_rel`;
CREATE TABLE `cms_stat_events_rel` (
  `metaevent_id` int(11) unsigned DEFAULT NULL,
  `event_id` int(11) unsigned DEFAULT NULL,
  UNIQUE KEY `metaevent_id` (`metaevent_id`,`event_id`),
  KEY `event_id` (`event_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms_stat_events_urls`;
CREATE TABLE `cms_stat_events_urls` (
  `event_id` int(11) unsigned DEFAULT NULL,
  `page_id` int(11) unsigned DEFAULT NULL,
  UNIQUE KEY `event_id` (`event_id`,`page_id`),
  KEY `page_id` (`page_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms_stat_finders`;
CREATE TABLE `cms_stat_finders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bot_name` text DEFAULT NULL,
  `pattern` text DEFAULT NULL,
  `alias` text DEFAULT NULL,
  `domain` text DEFAULT NULL,
  `utf` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms_stat_hits`;
CREATE TABLE `cms_stat_hits` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `page_id` int(11) unsigned DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `hour` tinyint(8) DEFAULT NULL,
  `day_of_week` tinyint(1) DEFAULT NULL,
  `day` tinyint(4) DEFAULT NULL,
  `month` tinyint(4) DEFAULT NULL,
  `year` int(11) unsigned DEFAULT NULL,
  `path_id` int(11) unsigned DEFAULT NULL,
  `number_in_path` int(11) unsigned DEFAULT NULL,
  `week` tinyint(4) unsigned DEFAULT NULL,
  `prev_page_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `day_of_week` (`day_of_week`),
  KEY `date` (`date`,`day_of_week`,`day`,`month`),
  KEY `day` (`day`,`month`,`date`,`day_of_week`),
  KEY `page_id` (`page_id`,`date`),
  KEY `date_level` (`date`,`number_in_path`),
  KEY `date_prev_page_level` (`date`,`prev_page_id`,`number_in_path`),
  KEY `path_id_level` (`path_id`,`number_in_path`,`prev_page_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms_stat_holidays`;
CREATE TABLE `cms_stat_holidays` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` char(255) DEFAULT NULL,
  `day` tinyint(2) DEFAULT NULL,
  `month` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `day_month` (`day`,`month`,`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms_stat_pages`;
CREATE TABLE `cms_stat_pages` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uri` text DEFAULT NULL,
  `host_id` int(11) unsigned DEFAULT NULL,
  `section` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `section` (`section`),
  KEY `uri` (`uri`(4)),
  KEY `host_id` (`host_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms_stat_paths`;
CREATE TABLE `cms_stat_paths` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `source_id` int(11) unsigned DEFAULT NULL,
  `host_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `source_id` (`source_id`),
  KEY `user_id` (`user_id`),
  KEY `id_host` (`id`,`host_id`),
  KEY `date_host_id` (`date`,`host_id`,`user_id`),
  KEY `host_id` (`host_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms_stat_phrases`;
CREATE TABLE `cms_stat_phrases` (
  `phrase` text DEFAULT NULL,
  `domain` text DEFAULT NULL,
  `finder_id` int(11) DEFAULT NULL,
  `entrytime` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms_stat_sites`;
CREATE TABLE `cms_stat_sites` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(255) DEFAULT NULL,
  `group_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `name` (`name`),
  KEY `group_id` (`group_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms_stat_sites_groups`;
CREATE TABLE `cms_stat_sites_groups` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` char(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms_stat_sources`;
CREATE TABLE `cms_stat_sources` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `src_type` tinyint(4) unsigned DEFAULT NULL,
  `concrete_src_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `src_type` (`src_type`,`concrete_src_id`,`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms_stat_sources_coupon`;
CREATE TABLE `cms_stat_sources_coupon` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `number` varchar(255) DEFAULT NULL,
  `profit` float(9,2) DEFAULT NULL,
  `descript` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms_stat_sources_coupon_events`;
CREATE TABLE `cms_stat_sources_coupon_events` (
  `coupon_id` int(11) unsigned DEFAULT NULL,
  `event_id` int(11) unsigned DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms_stat_sources_openstat`;
CREATE TABLE `cms_stat_sources_openstat` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `service_id` int(11) unsigned DEFAULT 0,
  `campaign_id` int(11) unsigned DEFAULT 0,
  `ad_id` int(11) unsigned DEFAULT NULL,
  `source_id` int(11) unsigned DEFAULT NULL,
  `path_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `source_id` (`source_id`)
) ENGINE=MyISAM DEFAULT CHARSET=cp1251;


DROP TABLE IF EXISTS `cms_stat_sources_openstat_ad`;
CREATE TABLE `cms_stat_sources_openstat_ad` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` char(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=cp1251;


DROP TABLE IF EXISTS `cms_stat_sources_openstat_campaign`;
CREATE TABLE `cms_stat_sources_openstat_campaign` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` char(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `name` (`name`)
) ENGINE=MyISAM DEFAULT CHARSET=cp1251;


DROP TABLE IF EXISTS `cms_stat_sources_openstat_service`;
CREATE TABLE `cms_stat_sources_openstat_service` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` char(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `name` (`name`)
) ENGINE=MyISAM DEFAULT CHARSET=cp1251;


DROP TABLE IF EXISTS `cms_stat_sources_openstat_source`;
CREATE TABLE `cms_stat_sources_openstat_source` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` char(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `name` (`name`)
) ENGINE=MyISAM DEFAULT CHARSET=cp1251;


DROP TABLE IF EXISTS `cms_stat_sources_pr`;
CREATE TABLE `cms_stat_sources_pr` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms_stat_sources_pr_events`;
CREATE TABLE `cms_stat_sources_pr_events` (
  `pr_id` int(11) unsigned DEFAULT NULL,
  `event_id` int(11) unsigned DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms_stat_sources_pr_sites`;
CREATE TABLE `cms_stat_sources_pr_sites` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `pr_id` int(11) unsigned DEFAULT NULL,
  `url` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms_stat_sources_search`;
CREATE TABLE `cms_stat_sources_search` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `engine_id` int(11) unsigned DEFAULT NULL,
  `text_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `engine_id` (`engine_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms_stat_sources_search_engines`;
CREATE TABLE `cms_stat_sources_search_engines` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` char(255) DEFAULT NULL,
  `url_mask` char(255) DEFAULT NULL,
  `varname` char(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms_stat_sources_search_queries`;
CREATE TABLE `cms_stat_sources_search_queries` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `text` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms_stat_sources_sites`;
CREATE TABLE `cms_stat_sources_sites` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uri` text DEFAULT NULL,
  `domain` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `domain` (`domain`),
  KEY `uri` (`uri`(255)),
  KEY `id_domain` (`id`,`domain`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms_stat_sources_sites_domains`;
CREATE TABLE `cms_stat_sources_sites_domains` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` char(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms_stat_sources_ticket`;
CREATE TABLE `cms_stat_sources_ticket` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` char(255) DEFAULT NULL,
  `url` char(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms_stat_users`;
CREATE TABLE `cms_stat_users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `session_id` varchar(32) DEFAULT NULL,
  `first_visit` datetime DEFAULT NULL,
  `login` varchar(255) DEFAULT NULL,
  `os_id` int(11) unsigned DEFAULT NULL,
  `browser_id` int(11) unsigned DEFAULT NULL,
  `ip` varchar(15) DEFAULT NULL,
  `location` text DEFAULT NULL,
  `js_version` varchar(5) DEFAULT NULL,
  `host_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `first_visit` (`first_visit`),
  KEY `session_id` (`session_id`),
  KEY `host_id` (`host_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms_stat_users_browsers`;
CREATE TABLE `cms_stat_users_browsers` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` char(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms_stat_users_os`;
CREATE TABLE `cms_stat_users_os` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` char(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cms_webforms`;
CREATE TABLE `cms_webforms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT '',
  `descr` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `email` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `goog-malware-shavar-a-hosts`;
CREATE TABLE `goog-malware-shavar-a-hosts` (
  `ID` int(255) NOT NULL AUTO_INCREMENT,
  `Hostkey` varchar(8) NOT NULL,
  `Chunknum` int(255) NOT NULL,
  `Count` varchar(2) NOT NULL DEFAULT '0',
  `FullHash` varchar(70) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `Hostkey` (`Hostkey`),
  KEY `Hostkey_2` (`Hostkey`),
  KEY `Hostkey_3` (`Hostkey`),
  KEY `Hostkey_4` (`Hostkey`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `goog-malware-shavar-a-index`;
CREATE TABLE `goog-malware-shavar-a-index` (
  `ChunkNum` int(255) NOT NULL AUTO_INCREMENT,
  `Chunklen` int(255) NOT NULL DEFAULT 0,
  PRIMARY KEY (`ChunkNum`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `goog-malware-shavar-a-prefixes`;
CREATE TABLE `goog-malware-shavar-a-prefixes` (
  `ID` int(255) NOT NULL AUTO_INCREMENT,
  `Hostkey` varchar(8) NOT NULL,
  `Prefix` varchar(255) NOT NULL,
  `FullHash` varchar(70) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `Hostkey` (`Hostkey`),
  KEY `Hostkey_2` (`Hostkey`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `goog-malware-shavar-s-hosts`;
CREATE TABLE `goog-malware-shavar-s-hosts` (
  `ID` int(255) NOT NULL AUTO_INCREMENT,
  `Hostkey` varchar(8) NOT NULL,
  `Chunknum` int(255) NOT NULL,
  `Count` varchar(2) NOT NULL DEFAULT '0',
  `FullHash` varchar(70) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `Hostkey` (`Hostkey`),
  KEY `Hostkey_2` (`Hostkey`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `goog-malware-shavar-s-index`;
CREATE TABLE `goog-malware-shavar-s-index` (
  `ChunkNum` int(255) NOT NULL AUTO_INCREMENT,
  `Chunklen` int(255) NOT NULL DEFAULT 0,
  PRIMARY KEY (`ChunkNum`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `goog-malware-shavar-s-prefixes`;
CREATE TABLE `goog-malware-shavar-s-prefixes` (
  `ID` int(255) NOT NULL AUTO_INCREMENT,
  `Hostkey` varchar(8) NOT NULL,
  `AddChunkNum` varchar(8) NOT NULL,
  `Prefix` varchar(255) NOT NULL,
  `FullHash` varchar(70) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `Hostkey` (`Hostkey`),
  KEY `Hostkey_2` (`Hostkey`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `googpub-phish-shavar-a-hosts`;
CREATE TABLE `googpub-phish-shavar-a-hosts` (
  `ID` int(255) NOT NULL AUTO_INCREMENT,
  `Hostkey` varchar(8) NOT NULL,
  `Chunknum` int(255) NOT NULL,
  `Count` varchar(2) NOT NULL DEFAULT '0',
  `FullHash` varchar(70) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `Hostkey` (`Hostkey`),
  KEY `Hostkey_2` (`Hostkey`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `googpub-phish-shavar-a-index`;
CREATE TABLE `googpub-phish-shavar-a-index` (
  `ChunkNum` int(255) NOT NULL AUTO_INCREMENT,
  `Chunklen` int(255) NOT NULL DEFAULT 0,
  PRIMARY KEY (`ChunkNum`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `googpub-phish-shavar-a-prefixes`;
CREATE TABLE `googpub-phish-shavar-a-prefixes` (
  `ID` int(255) NOT NULL AUTO_INCREMENT,
  `Hostkey` varchar(8) NOT NULL,
  `Prefix` varchar(255) NOT NULL,
  `FullHash` varchar(70) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `Hostkey` (`Hostkey`),
  KEY `Hostkey_2` (`Hostkey`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `googpub-phish-shavar-s-hosts`;
CREATE TABLE `googpub-phish-shavar-s-hosts` (
  `ID` int(255) NOT NULL AUTO_INCREMENT,
  `Hostkey` varchar(8) NOT NULL,
  `Chunknum` int(255) NOT NULL,
  `Count` varchar(2) NOT NULL DEFAULT '0',
  `FullHash` varchar(70) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `Hostkey` (`Hostkey`),
  KEY `Hostkey_2` (`Hostkey`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `googpub-phish-shavar-s-index`;
CREATE TABLE `googpub-phish-shavar-s-index` (
  `ChunkNum` int(255) NOT NULL AUTO_INCREMENT,
  `Chunklen` int(255) NOT NULL DEFAULT 0,
  PRIMARY KEY (`ChunkNum`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `googpub-phish-shavar-s-prefixes`;
CREATE TABLE `googpub-phish-shavar-s-prefixes` (
  `ID` int(255) NOT NULL AUTO_INCREMENT,
  `Hostkey` varchar(8) NOT NULL,
  `AddChunkNum` varchar(8) NOT NULL,
  `Prefix` varchar(255) NOT NULL,
  `FullHash` varchar(70) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `Hostkey` (`Hostkey`),
  KEY `Hostkey_2` (`Hostkey`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `questions`;
CREATE TABLE `questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(48) DEFAULT NULL,
  `message` varchar(140) DEFAULT NULL,
  `type` int(11) DEFAULT 0,
  `cdate` int(11) DEFAULT NULL,
  `autor_id` int(11) DEFAULT NULL,
  `rel` int(11) DEFAULT 0,
  `rate` int(11) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP VIEW IF EXISTS `sphinx_content_index`;
CREATE TABLE `sphinx_content_index` (`id` int(10) unsigned, `type_id` int(10) unsigned, `domain_id` int(10) unsigned, `rel` int(10) unsigned, `obj_id` int(10) unsigned, `name` varchar(255), `title` varchar(255), `h1` varchar(255), `meta_keywords` varchar(255), `meta_descriptions` varchar(255), `tags` varchar(255), `readme` longtext, `is_unindexed` bigint(20), `anons` longtext, `content` longtext, `description` longtext, `descr` longtext, `message` longtext, `question` longtext, `answers` bigint(10) unsigned);


DROP TABLE IF EXISTS `umi_event_feeds`;
CREATE TABLE `umi_event_feeds` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `date` bigint(20) DEFAULT NULL,
  `params` mediumtext DEFAULT NULL,
  `type_id` varchar(255) NOT NULL,
  `element_id` int(11) DEFAULT NULL,
  `object_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `umi_event_types`;
CREATE TABLE `umi_event_types` (
  `id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `umi_event_users`;
CREATE TABLE `umi_event_users` (
  `id` int(11) unsigned NOT NULL,
  `last_check_in` bigint(20) DEFAULT NULL,
  `settings` mediumtext DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `umi_event_user_history`;
CREATE TABLE `umi_event_user_history` (
  `user_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `read` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `sphinx_content_index`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `sphinx_content_index` AS select `h`.`id` AS `id`,`h`.`type_id` AS `type_id`,`h`.`domain_id` AS `domain_id`,`h`.`rel` AS `rel`,`h`.`obj_id` AS `obj_id`,`o`.`name` AS `name`,coalesce(`cms3_object_content#2`.`varchar_val`) AS `title`,coalesce(`cms3_object_content#3`.`varchar_val`) AS `h1`,coalesce(`cms3_object_content#6`.`varchar_val`) AS `meta_keywords`,coalesce(`cms3_object_content#5`.`varchar_val`) AS `meta_descriptions`,coalesce(`cms3_object_content#7`.`varchar_val`) AS `tags`,coalesce(`cms3_object_content#21`.`text_val`) AS `readme`,coalesce(`cms3_object_content#11`.`int_val`) AS `is_unindexed`,coalesce(`cms3_object_content#240`.`text_val`) AS `anons`,coalesce(`cms3_object_content#4`.`text_val`) AS `content`,coalesce(`cms3_object_content#257`.`varchar_val`,`cms3_object_content#560`.`text_val`) AS `description`,coalesce(`cms3_object_content#267`.`text_val`) AS `descr`,coalesce(`cms3_object_content#272`.`text_val`) AS `message`,coalesce(`cms3_object_content#276`.`text_val`) AS `question`,coalesce(`cms3_object_content#277`.`rel_val`) AS `answers` from ((((((((((((((((`cms3_hierarchy` `h` left join `cms3_objects` `o` on(`o`.`id` = `h`.`obj_id`)) left join `cms3_object_content` `cms3_object_content#2` on(`cms3_object_content#2`.`obj_id` = `h`.`obj_id` and `cms3_object_content#2`.`field_id` = 2)) left join `cms3_object_content` `cms3_object_content#3` on(`cms3_object_content#3`.`obj_id` = `h`.`obj_id` and `cms3_object_content#3`.`field_id` = 3)) left join `cms3_object_content` `cms3_object_content#6` on(`cms3_object_content#6`.`obj_id` = `h`.`obj_id` and `cms3_object_content#6`.`field_id` = 6)) left join `cms3_object_content` `cms3_object_content#5` on(`cms3_object_content#5`.`obj_id` = `h`.`obj_id` and `cms3_object_content#5`.`field_id` = 5)) left join `cms3_object_content` `cms3_object_content#7` on(`cms3_object_content#7`.`obj_id` = `h`.`obj_id` and `cms3_object_content#7`.`field_id` = 7)) left join `cms3_object_content` `cms3_object_content#21` on(`cms3_object_content#21`.`obj_id` = `h`.`obj_id` and `cms3_object_content#21`.`field_id` = 21)) left join `cms3_object_content` `cms3_object_content#11` on(`cms3_object_content#11`.`obj_id` = `h`.`obj_id` and `cms3_object_content#11`.`field_id` = 11)) left join `cms3_object_content` `cms3_object_content#240` on(`cms3_object_content#240`.`obj_id` = `h`.`obj_id` and `cms3_object_content#240`.`field_id` = 240)) left join `cms3_object_content` `cms3_object_content#4` on(`cms3_object_content#4`.`obj_id` = `h`.`obj_id` and `cms3_object_content#4`.`field_id` = 4)) left join `cms3_object_content` `cms3_object_content#257` on(`cms3_object_content#257`.`obj_id` = `h`.`obj_id` and `cms3_object_content#257`.`field_id` = 257)) left join `cms3_object_content` `cms3_object_content#560` on(`cms3_object_content#560`.`obj_id` = `h`.`obj_id` and `cms3_object_content#560`.`field_id` = 560)) left join `cms3_object_content` `cms3_object_content#267` on(`cms3_object_content#267`.`obj_id` = `h`.`obj_id` and `cms3_object_content#267`.`field_id` = 267)) left join `cms3_object_content` `cms3_object_content#272` on(`cms3_object_content#272`.`obj_id` = `h`.`obj_id` and `cms3_object_content#272`.`field_id` = 272)) left join `cms3_object_content` `cms3_object_content#276` on(`cms3_object_content#276`.`obj_id` = `h`.`obj_id` and `cms3_object_content#276`.`field_id` = 276)) left join `cms3_object_content` `cms3_object_content#277` on(`cms3_object_content#277`.`obj_id` = `h`.`obj_id` and `cms3_object_content#277`.`field_id` = 277)) where `h`.`is_active` = 1 and `h`.`is_deleted` = 0 and (`cms3_object_content#11`.`int_val` is null or `cms3_object_content#11`.`int_val` = 0) and `o`.`type_id` in (7,60,61,63,65,66,67,68,69,70,72,73,77,78,79,80,81,86,87,121,130);

-- 2020-01-20 13:14:05
