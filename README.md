**Готовое решение "Demomarket"**

Решение предназначено для редакции Commerce.

Чтобы собрать расширение, нужно:

* Установить umi.cms актуальной версии (https://github.com/Umisoft/umi.cms.2);
* Импортировать дамп базы данных dump/dump.sql;
* Загрузить файлы из src/ поверх установленной umi.cms;
* Загрузить конфигурацию упаковщика packer/config.php;
* Выполнить команду из корня проекта: php libs/packer/run.php packer/config.php;

(Настройки пакера подробнее описаны в файле `libs/packer/config.sample.php`)

Результат сборки: файл `libs/packer/out/demomarket/demomarket.tar`. 
Чтобы обновить версию решения, нужно добавить этот файл в репозиторий партнерских решений `umi.cms2-builder/partner/solutions` и сделать деплой.