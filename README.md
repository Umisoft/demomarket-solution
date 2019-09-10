**Готовое решение "Demomarket"**

Решение предназначено для редакции Commerce.

Чтобы собрать расширение, нужно:

* Установить umi.cms актуальной версии (https://github.com/Umisoft/umi.cms.2);
* Импортировать дамп базы данных dump/dump.sql;
* Загрузить файлы из src/ поверх установленной umi.cms;
* Загрузить конфигурацию упаковщика packer/config.php;
* Выполнить команду из корня проекта: php libs/packer/run.php packer/config.php;

(Настройки пакера подробнее описаны в файле `libs/packer/config.sample.php`)

Чтобы задеплоить решение нужно:
 * Забрать файл из `libs/packer/out/demomarket/demomarket.tar`;
 * Загрузить его в директорию /solutions репозитория market-solutions (https://github.com/Umisoft/market-solutions);
 * Запустить сценарий "market-solutions" в teamcity (http://ci.srv32.megaserver.umisoft.ru/project.html?projectId=MarketSolutions&tab=projectOverview);
