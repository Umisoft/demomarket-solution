<?php

$FORMS = [];

$FORMS['compare_list_block'] = <<<END

<div id="rubricator" class="block">
    <h2>Сравнение товаров</h2>
    
    <ul>
	%items%
    </ul>
    Максимальное количество: <b>%max_elements%</b> </br>
    %compare_link%
</div>



END;


$FORMS['compare_list_block_line'] = <<<END
<li><a href="%link%">%h1%</a></li>

END;

$FORMS['compare_list_block_empty'] = <<<END
<p>Нет товаров для сравнения</p>

END;


$FORMS['compare_list_block_link'] = <<<END

<br /><p><b>Сравнить товары</b></p>
END;

?>
