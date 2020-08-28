/*jslint browser:true */
/*global jQuery, PushModule, location */

(function($, PushModule, location) {
	"use strict";

	// Всплывающее окно подписки на PUSH-сообщения
	$(function() {
		let $popup = $(".push").first(),
			$closeBtn = $(".close", $popup),
			$subscribeBtn = $(".subscribe", $popup),
			cookieName = "push-popup-already-closed",
			isAlreadyClosed = !!$.cookie(cookieName),
			subscribeDelay = 5000,

			subscribe = function() {
				if (location.protocol !== "https:") {
					return;
				}

				PushModule.subscribe({
					success: function(token) {
						PushModule.saveToken(token);
						$popup.hide();
					},

					fail: function(isBlocked) {
						if (!isBlocked) {
							$popup.show();
						} else {
							$popup.hide();
						}
					}
				});
			};

		if (!isAlreadyClosed) {
			setTimeout(subscribe, subscribeDelay);
		}

		$closeBtn.on( 'click', function() {
			$popup.hide();
			$.cookie(cookieName, true, {expires: 1, path: '/'})
		});

		$subscribeBtn.on('click', subscribe);
	});


}(jQuery, PushModule, location));
