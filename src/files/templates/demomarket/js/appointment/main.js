(function($, appoint) {
	if ($(".content_wrapper").width() < 880) {
		$(".appointments").addClass('small');
	}

	$(function() {
		appoint.init();
	});


}(jQuery, Appointment));


