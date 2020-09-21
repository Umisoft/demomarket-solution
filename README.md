### Готовое решение "Demomarket"

#### Общая информация:

 * Решение предназначено для редакции Commerce, но может работать на всех редакциях, влоть до Lite;
 * Объект решения production версии: (http://udod.umihost.ru/admin/updatesrv/edit/420641/);
 * Объект решения dev версии: (http://udod.umihost.ru/admin/updatesrv/edit/496771/);
 * Настройки конфигурации упаковщика подробнее описаны в файле (https://github.com/Umisoft/umi.cms.2/blob/dev/sys-temp/packer/config/config.sample.php);
 * Инструкция по установке системы: (https://github.com/Umisoft/umi.cms.2/blob/dev/INSTALLATION.md);
 * При любой сборке не забывает ставить заглушку на сайт через config.ini [stub], чтобы во время сборки боты не добавили вам в бд спама;

#### Чтобы собрать production версию, нужно:
 * Установить umi.cms production версии (https://github.com/Umisoft/umi.cms.2/blob/master/INSTALLATION.md);
 * Импортировать дамп базы данных `dump/dump.sql`;
 * Изменить адрес домен в таблице `cms3_domains` на свой и переактивировать систему (убедитесь что в вашем ключе нет лишних модулей и расширений);
 * Обновить umi.cms принудительно до production версии;
 * Загрузить файлы из `src/files/` поверх установленной umi.cms;
 * Удостовериться, что сайт открывается и работае базовый функционал (например: оформление заказа, авторизация);
 * Загрузить конфигурацию упаковщика `packer/config.php` в `/sys-temp/packer/config/`;
 * Выполнить команду из корня проекта: `php classes/system/commands/Packer.php sys-temp/packer/config/config.php`;

#### Чтобы задеплоить production версию, нужно:
 * Забрать файл из `/sys-temp/packer/out/demomarket/demomarket.tar`;
 * Загрузить его в директорию `solutions` репозитория market-solutions (https://github.com/Umisoft/market-solutions);
 * Запустить сценарий "market-solutions" в teamcity (http://ci.srv32.megaserver.umisoft.ru/project.html?projectId=MarketSolutions&tab=projectOverview);
 
#### Чтобы установить production версию, нужно:
 * Через gui: на этапе выбора шаблона при установке cms надо выбрать "Адаптивный интернет-магазин" (http://help.docs.umi-cms.ru/vvedenie/ustanovka_i_nastrojka/vybor_sajta/);
 * Через cli: на указать в install.ini [DEMOSITE] name = "demomarket" (https://github.com/Umisoft/umi.cms.2/blob/master/install.ini.original);
 * Через репозиторий: загрузить файлы из `src/files/` поверх установленной umi.cms;
 
#### Чтобы собрать dev версию, нужно:
 * Установить umi.cms dev версии (https://github.com/Umisoft/umi.cms.2/blob/master/INSTALLATION.md);
 * Импортировать дамп базы данных `dump/dump.sql`;
 * Изменить адрес домен в таблице `cms3_domains` на свой и переактивировать систему (убедитесь что в вашем ключе нет лишних модулей и расширений);
 * Обновить umi.cms принудительно до dev версии;
 * Загрузить файлы из `src/files/` поверх установленной umi.cms;
 * Удостовериться, что сайт открывается и работае базовый функционал (например: оформление заказа, авторизация);
 * Загрузить конфигурацию упаковщика `packer/config.php` в `/sys-temp/packer/config/`;
 * Поменять в конфигурации упаковщика в ключа 'package' и 'destination' слово 'demomarket' на 'demomarket-dev';
 * Выполнить команду из корня проекта: `php classes/system/commands/Packer.php sys-temp/packer/config/config.php`;
 
 #### Чтобы задеплоить dev версию, нужно:
  * Забрать файл из `/sys-temp/packer/out/demomarket-dev/demomarket-dev.tar`;
  * Загрузить его в директорию `solutions` репозитория market-solutions (https://github.com/Umisoft/market-solutions);
  * Запустить сценарий "market-solutions" в teamcity (http://ci.srv32.megaserver.umisoft.ru/project.html?projectId=MarketSolutions&tab=projectOverview);
  
  #### Чтобы установить dev версию, нужно:
   * Через gui: нужно указать в объекте лицензии в поле "Оплаченные решения" = "demomarket-dev" и выбрать его в разделе "Мои покупки" на этапе выбора шаблона (http://help.docs.umi-cms.ru/vvedenie/ustanovka_i_nastrojka/vybor_sajta/);
   * Через cli: нужно указать в объекте лицензии "Оплаченные решения" = "demomarket-dev" и указать в install.ini [DEMOSITE] name = "demomarket-dev" (https://github.com/Umisoft/umi.cms.2/blob/dev/install.ini.original);
   * Через репозиторий: импортировать дамп базы данных `dump/dump.sql` и загрузить файлы из `src/files/` поверх установленной umi.cms;
