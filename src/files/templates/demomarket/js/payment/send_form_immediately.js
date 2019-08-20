/** Скрипт автоматической отправки формы оплаты */
$(function() {
	$('body').hide(0, function() {
		var $form = $('main .order form').get(0);

		if ($form) {
			$form.submit();
		}

		var $url = $('#payUrl').get(0);

		if ($url) {
			document.location.href = $url.href;
		}
	});
});
