var Appointment = (function () {
	var module = {
		constants: {
			__hiddenClass: 'appointments-hidden',
			__noDataMessage: getLabel('js-appointment-no-data-message'),
			__wrapper: false,
			__data: {},
			__choices: {},
			__loaded: {},
			__step: 0,
			__workTime: ['09:00', '18:00'],
			__chosenDate: '',
			__loadedMonth: [],
			__mobileWidth: '700',
			__cropChar: '..',
			__cropLimit: 8
		},
		init: function () {
			var _self = module;

			if (typeof _ == "undefined" || typeof moment == "undefined") {
				return false;
			}
			_self.constants.__wrapper = $(".appointments");
			_self.getData();
		},
		getData: function () {
			var _self = module;

			$.ajax({
				url: '/udata/appointment/getAppointmentsData/' + '?lang_id=' + window.pageData.lang_id,
				dataType: 'json',
				success: function (data) {
					_self.constants.__data = data;
					_self.constants.__loadedMonth.push(moment().format('MMYYYY'));
					if (_self.isDataLoaded()) {
						_self._startAppointments();
					} else {
						_self.showMessage(_self.constants.__noDataMessage);
					}
				}
			});
		},
		isDataLoaded: function () {
			return !_.isUndefined(this.constants.__data['service']);
		},
		_startAppointments: function () {
			this.showStep('service');
		},
		/**
		 * Отображает сообщение message
		 * @param {String} message текст сообщения
		 */
		showMessage: function(message) {
			var htmlElement = document.createElement('h1');
			$(htmlElement).text(this.constants.__noDataMessage);
			this.constants.__wrapper.html(htmlElement);
		},
		draw: {
			stepDone: $('<div class="step-done__wrapper"><span class="step-done">OK</span><span class="online-entry__btn">' + getLabel('js-change') + '</span></div>'),
			entryButton: $('<span class="online-entry__btn">' + getLabel('js-choose') + '</span>'),

			/**
			 * Обрезает заголовок, если его длина превышает определенное количество символов
			 * @param {String} title обрабатываемый заголовок
			 * @returns {String} обрезанный заголовок
			 */
			chopTitle: function (title) {
				var cropLimit = module.constants.__cropLimit,
					cropString = module.constants.__cropChar;

				if (title.length < cropLimit) {
					return title;
				}

				return title.substring(0, cropLimit - 1) + cropString;
			},

			/**
			 * Проверяет является ли текущее устройство - мобильным
			 * @returns {boolean} результат проверки
			 */
			isMobile: function () {
				return ( $(window).width() < module.constants.__mobileWidth );
			},

			/** Удаляет тексты кнопок в заголовках шагов */
			removeButtonsText: function () {
				$('.step-done__wrapper span').text('');
			},

			/**
			 * Устанавливает обработчик события отображения времени работы сервиса
			 * @param {jQuery|HTMLElement} serviceElement элемент услуги, для которой отображается время работы
			 */
			bindTimeHover: function (serviceElement) {
				var self = module,
					recordingTime = $('.recording-time');


				$(serviceElement).hover(function () {
					var service = $(this).data('service');

					recordingTime.show().siblings().hide();
					self.draw.recordingTime(service);
				}, function () {
					recordingTime.hide().siblings().show();
				});
			},

			/**
			 * Устанавливает обработчик события отображения времени работы сервиса для мобильной версии виджета
			 * @param {jQuery|HTMLElement} serviceElement, элемент услуги, для которой отображается время работы
			 */
			showMobileRecordingTime: function (serviceElement) {
				var _self = module;
				var recordingTime = $('.recording-time');
				var serviceItems = $('.service-choose li');

				$(serviceElement).click(function () {
					if (isHidden(recordingTime)) {
						recordingTime.show().siblings().show();
						_self.draw.recordingTime($(this).data('service'));
						serviceItems.hide();
						$(this).show();
						serviceItems.attr('data-status', '');
						$(this).attr('data-status', 'active');
					} else {
						recordingTime.hide();
						serviceItems.show();
					}
				});
				function isHidden(element) {
					return (element.css('display') == 'none' || element.css('visibility') == 'hidden');
				}
			},
			recordingTime: function (service) {
				var _self = module,
					_data = _self.constants.__data;
				var wrapper = $(".recording-time");

				var master_list = wrapper.find('.masters-list').empty();
				var master_count = 4;
				var service_employees = {};

				if (service.personal) {
					for (var i in service.personal) {
						var personal_id = service.personal[i];
						service_employees[personal_id] = personal_id;

						var more_masters_text = "";

						if (i == master_count - 1 && service.personal.length > master_count) {
							more_masters_text = ' (' + getLabel('js-more_masters') + (service.personal.length - master_count) + ")";
						}

						if (i >= master_count) {
							break;
						}

						master_list.append(
							$("<li/>", {
								'text': _data['personal'][personal_id]['name'] + more_masters_text
							})
						);
					}
				}

				var days = {};
				var daysCounter = 0;

				for (var i = 0; i < 66; i++) {
					var day = moment().add(moment.duration({'days': i}));
					var dayNumber = Number(day.format('e'));

					for (var c in _data['personal']) {
						if (daysCounter == 4) {
							break;
						}

						if (_.isUndefined(service_employees[_data['personal'][c]['id']])) {
							continue;
						}

						if (_.isUndefined(_data['personal'][c]['days'])) {
							continue;
						}

						if (!_.isUndefined(_data['personal'][c]['days'][dayNumber])) {
							days[i] = day;
							daysCounter++;
							continue;
						}
					}
				}

				var times = {
					'08:00-12:00': getLabel('js-morning'),
					'12:00-16:00': getLabel('js-noon'),
					'16:00-20:00': getLabel('js-evening')
				};

				var entries = (_.isUndefined(_data['entry']['complete_booked'])) ? "undefined" : _data['entry']['complete_booked'];
				var service_time = _data['service'][service['id']].time;
				var time_wrapper = wrapper.find('.recording-time-selection__wrapper').empty();
				var service_employees_count = _data['service'][service['id']]['personal'].length;

				for (var i in days) {
					var entry_date = days[i].format('DD.MM.YYYY'),
						entries_date = {};

					if (!_.isUndefined(entries)) {
						entries_date = entries[entry_date];
					}

					var c_day = days[i].calendar(),
						short_day = days[i].format('ddd'),
						c_item = $("<div/>", {
							'class': 'recording-time__item',
							'text': c_day
						}),
						time_item = $("<div/>", {
							'class': 'recording-time__selection'
						});

					c_item.append($("<span/>").text(short_day));
					time_item.append(c_item);

					var entryDayNumber = Number(days[i].format('e'));

					var minTime = 0;
					var maxTime = 0;

					for (var p in _data['personal']) {
						if (_.isUndefined(service_employees[_data['personal'][p]['id']])) {
							continue;
						}

						if (_.isUndefined(_data['personal'][p]['days'])) {
							continue;
						}

						if (_.isUndefined(_data['personal'][p]['days'][entryDayNumber])) {
							continue;
						}

						var employeeTime = _data['personal'][p]['days'][entryDayNumber];
						employeeTime = employeeTime.split('-');
						var employeeTimeStart = moment.duration(employeeTime[0]);

						if (minTime == 0 || employeeTimeStart._milliseconds < minTime) {
							minTime = employeeTimeStart;
						}

						var employeeTimeEnd = moment.duration(employeeTime[1]);

						if (maxTime == 0 || employeeTimeEnd._milliseconds > maxTime) {
							maxTime = employeeTimeEnd;
						}
					}

					if ((minTime == 0 || maxTime == 0) && !_.isUndefined(_data['default']['days'][dayNumber])) {
						var serviceTime = _data['default']['days'][entryDayNumber];
						serviceTime = serviceTime.split('-');
						var serviceTimeStart = moment.duration(serviceTime[0]);

						if (minTime == 0 || serviceTimeStart._milliseconds < minTime) {
							minTime = serviceTimeStart;
						}

						var serviceTimeEnd = moment.duration(serviceTime[1]);

						if (maxTime == 0 || serviceTimeEnd._milliseconds > maxTime) {
							maxTime = serviceTimeEnd;
						}
					}

					var periodCounter = 1;

					for (var t in times) {
						var ex_time = t.split('-');
						var time_class = '';
						var booked_duration = 0;
						var period_start_time = moment.duration(ex_time[0]);

						if (period_start_time._milliseconds < minTime._milliseconds && periodCounter == 1) {
							period_start_time = minTime;
						}

						var period_end_time = moment.duration(ex_time[1]);

						if (period_end_time._milliseconds > maxTime._milliseconds && periodCounter == 3) {
							period_end_time = maxTime;
						}

						var period_duration = period_end_time._milliseconds - period_start_time._milliseconds;
						var service_duration = moment.duration(service_time);
						period_duration *= service_employees_count;

						for (var d in entries_date) {
							if (!_self.haveIntersectionBetween(ex_time[0], ex_time[1], entries_date[d].time)) {
								continue;
							}

							var booked_service_id = entries_date[d].service;
							var booked_service_duration = _data['service'][booked_service_id].time;
							booked_service_duration = moment.duration(booked_service_duration)._milliseconds;
							var entry_start_time = moment.duration(entries_date[d].time)._milliseconds;
							var entry_end_time = entry_start_time + booked_service_duration;

							if (entry_end_time > period_end_time._milliseconds) {
								booked_service_duration -= (entry_end_time - period_end_time._milliseconds);
							}

							booked_duration += booked_service_duration;
						}

						booked_duration *= service_employees_count;

						var free_period_duration = period_duration - booked_duration;

						if (service_duration._milliseconds <= free_period_duration) {
							time_class = 'free';
						} else {
							time_class = 'closed';
						}

						var t_time = c_item.clone().addClass(time_class).text(times[t]);
						time_item.append(t_time);
						periodCounter++;
					}

					time_wrapper.append(time_item);
				}
			},
			service: function (data) {
				if (typeof data == "undefined") {
					return false;
				}

				var list = $(".service-choose"),
					_self = module;

				if (list.children().length > 1) {
					return false;
				}

				var category_html = $("<div/>", {
						'class': 'service-type'
					}),
					service_item = $("<span/>", {
						'class': 'service-item'
					}),
					service_price = $("<span/>", {
						'class': 'service-price'
					});

				var category = _self.constants.__data['scats'];

				for (var cat in category) {
					var cat_item = category[cat],
						ul = $("<ul/>");

					list.append(category_html.clone().text(cat));

					for (var service in cat_item) {
						var s_id = cat_item[service],
							li = $("<li/>"),
							item = data[s_id];

						li.append(service_item.clone().append($("<span/>", {
							'text': item.name
						})));
						li.append(service_price.clone().text(item.cost));
						li.data('service', item);
						li.data('personal', item.personal);
						li.data('category', cat);

						if (!_self.draw.isMobile()) {
							_self.draw.bindTimeHover(li);
							li.click(function (event) {
								$(this).parents('service-choose').find('li').removeClass('selected');
								$(this).addClass('selected');

								_self.constants.__choices['service'] = $(this).data('service');
								_self.constants.__choices['category'] = $(this).data('category');

								_self.showStep('personal', $(this).data('personal'));

								var stepDoneButton = _self.draw.stepDone.clone();
								stepDoneButton.click(function () {
									_self.showStep('service');
								});
								var serviceStep = $('#data-service');
								serviceStep.addClass('step-passed').find('.online-entry__title').append(stepDoneButton);
								serviceStep.find('.online-entry__choice').text($(this).data('service').name);
							});
						} else {
							_self.draw.showMobileRecordingTime(li);
							var nextStepBtn = $('.mobile_next_step');
							nextStepBtn.click(function () {
								var activeLi = $('[data-status="' + 'active' + '"]');
								_self.constants.__choices['service'] = activeLi.data('service');
								_self.constants.__choices['category'] = activeLi.data('category');
								_self.showStep('personal', activeLi.data('personal'));

								var stepDoneButton = _self.draw.stepDone.clone();

								stepDoneButton.click(function () {
									_self.showStep('service');
								});

								var serviceStep = $('#data-service');
								serviceStep.addClass('step-passed').find('.online-entry__title')
									.append(stepDoneButton);
								_self.draw.removeButtonsText();
								var serviceTitle = activeLi.data('service').name;
								serviceTitle = _self.draw.chopTitle(serviceTitle);
								serviceStep.find('.online-entry__choice').text(serviceTitle);
							});
						}


						ul.append(li);
					}

					list.append(ul);
				}

				list.find('li .service-item span').hoverForMore({
					speed: 60.0,		// Measured in pixels-per-second
					loop: false,		// Scroll to the end and stop, or loop continuously?
					gap: 20,		// When looping, insert this many pixels of blank space
					target: false,		// Hover on this CSS selector instead of the text line itself
					removeTitle: true,	// By default, remove the title attribute, as a tooltip is redundant
					snapback: true,		// Animate when de-activating, as opposed to instantly reverting
					addStyles: true,	// Auto-add CSS; leave this on unless you need to override default styles
					alwaysOn: false,	// If you're insane, you can turn this into a <marquee> tag. (Please don't.)
				});

				$("#service-loader").remove();
			},
			personal: function (data) {
				var _self = module,
					ids = Object.keys(data),
					stepDoneButton = _self.draw.stepDone.clone();

				var adminPersonal = {
					photo: '/templates/demomarket/img/appointments/person.png',
					description: getLabel('js-service_administrator'),
					name: getLabel('js-administrator'),
					id: '*'
				};

				stepDoneButton.off('click').click(function () {
					_self.showStep('personal', ids);
				});

				$(".operator-click-btn").click(function () {
					_self.constants.__choices['personal'] = adminPersonal;
					_self.showStep('entry', '*');
					var personalStep = $('#data-personal');


					personalStep.find('.step-done__wrapper').remove();
					personalStep.addClass("step-passed").find(".online-entry__title").append(stepDoneButton);

					var adminTitle = adminPersonal.name;

					if (_self.draw.isMobile()) {
						_self.draw.removeButtonsText();
						adminTitle = _self.draw.chopTitle(adminTitle);
					}
					personalStep.find(".online-entry__choice").text(adminTitle);
					return false;
				});

				if (_.isUndefined(data)) {
					return false;
				}

				var list = $(".master-list").empty();

				var chosen_person = false;
				if (!_.isUndefined(_self.constants.__choices['personal'])) {
					chosen_person = (!_.isUndefined(_self.constants.__choices['personal'].id)) ?
						_self.constants.__choices['personal'].id : false;
				}

				var chosen_service = _self.constants.__choices['service'].id;
				if (!list.data('service') || (list.data('service') != chosen_service)) {
					list.data('service', chosen_service);
					chosen_person = false;
				}

				if (_.isEmpty(data)) {
					data = [adminPersonal];
				}

				var person_item = $("<div/>", {
						'class': 'master-item'
					}),
					person_photo = $("<div/>", {
						'class': 'master-photo'
					}),
					person_info = $("<div/>", {
						'class': 'master-info'
					}),
					person_name = $("<div/>", {
						'class': 'master-name'
					}),
					person_desc = $("<div/>", {
						'class': 'master-description'
					});

				for (var i in data) {
					var item = person_item.clone(),
						img = $("<img/>", {
							'src': (data[i].photo) ? data[i].photo : '/templates/demomarket/img/appointments/person.png'
						});

					item.append(person_photo.clone().append(img));

					var info = person_info.clone(),
						name = person_name.clone().text(data[i].name),
						desc = person_desc.clone().text(
							(data[i].description) ? data[i].description : ''
						),
						entryButton = _self.draw.entryButton.clone();

					entryButton.data('personal_id', data[i].id);
					entryButton.data('personal', data[i]);

					if (chosen_person == entryButton.data('personal_id')) {
						item.addClass('selected');
					}

					entryButton.click(function () {
						var master_item = $(this).parents('.master-item');
						master_item.addClass('selected').siblings().removeClass('selected');

						_self.constants.__choices['personal'] = $(this).data('personal');
						_self.showStep('entry', $(this).data('personal_id'));

						var personalStep = $('#data-personal');

						personalStep.addClass("step-passed").find(".online-entry__title").append(stepDoneButton);

						if (_self.draw.isMobile()) {
							_self.draw.removeButtonsText();
						}
						var personalTitle = $(this).data('personal').name;

						if (_self.draw.isMobile()) {
							personalTitle = _self.draw.chopTitle(personalTitle);
						}

						personalStep.find(".online-entry__choice").text(personalTitle);
					});

					info.append(name, desc, entryButton);
					item.append(info);
					list.append(item);
				}
			},
			entry: function (data) {
				$("#datepicker").datepicker("refresh");
				Appointment.binder.calendar.showFreeTime();
			},
			confirm: function (data) {
				var list = $(".online-entry__ordering").find('ul'),
					_self = module,
					_c = _self.constants.__choices;

				list.empty();

				var submit_array = {};

				for (var i in _c) {
					var list_item = $("<li/>"),
						item = _c[i];

					if (i != "category") {
						if (typeof item == "object") {
							list_item.text(item.name);
							submit_array[i] = item.id;
						} else {
							list_item.text(item);
							submit_array[i] = item;
						}

						list.append(list_item);
					}

					submit_array['full_' + i] = item;
				}

				var submit_form = $(".online-entry__ordering form"),
					submit_fields = submit_form.find('input');

				submit_fields.inputmask();

				var create_button = $("#create-appointment");

				create_button.click(function (e) {
					e.preventDefault();
					var formIsValid = true;

					if (typeof HTMLFormElement.prototype.reportValidity === 'function') {
						$('div.online-entry__ordering form input').each(function(index, input) {
							if (!input.reportValidity()) {
								formIsValid = false;
							}
						});
					}

					if (!formIsValid) {
						return false;
					}

					var form = $(this).parents('form'),
						form_array = form.serializeArray();

					for (var i in form_array) {
						var name = form_array[i]['name'],
							value = form_array[i]['value'];

						submit_array[name] = value;
					}
					submit_array['lang_id'] = window.pageData.lang_id;

					create_button.hide();

					$.ajax({
						type: 'POST',
						url: '/udata/appointment/postAppointment/',
						data: submit_array,
						dataType: 'json',
						success: function (result) {
							var message = '';

							if (result.error) {
								message = result.text;
							} else {
								message = getLabel('js-appointment-posted-successfully');
							}

							alert(message);

							if (result.error) {
								create_button.show();
							} else {
								setTimeout(function () {
									window.location.reload();
									return false;
								}, 2000);
							}

						}
					});

					return false;
				});
			}
		},
		binder: {
			calendar: {
				showFreeTime: function (date) {
					$(".choose-time").show().siblings().hide();

					var _self = module,
						_p = _self.constants.__choices['personal'],
						_s = _self.constants.__choices['service'];

					if (_p && _p['id'] == "*") {
						_p = _self.constants.__data['default'];
					}

					var date_string = $("#datepicker").datepicker("getDate");
					var day_of_week = Number(moment(date_string).format('e'));

					var work_time = (!_.isUndefined(_p['days'][day_of_week])) ? _p['days'][day_of_week] : false;
					var service_time = _s.time;

					var split_time = work_time.split('-'),
						start_time = split_time[0],
						end_time = split_time[1];

					var start_duration = moment.duration(start_time),
						end_duration = moment.duration(end_time),
						service_duration = moment.duration(service_time);

					var time_range = _.range(start_duration, end_duration, service_duration);

					var list = $(".choose-time").find(".choose-time_selection").empty();
					var entries = _self.constants.__data['entry']['personal'],
						entry_date = moment(date_string).format('DD.MM.YYYY');

					var date_entries = (entries && !_.isUndefined(entries[_p.id]) && !_.isUndefined(entries[_p.id][entry_date])) ?
						entries[_p.id][entry_date] :
						false;

					if (!date_entries && _self.constants.__choices['personal']['id'] == "*") {
						entries = _self.constants.__data['entry']['service'];

						if (typeof entries == 'object') {
							var allEntries = [];

							for (var key in entries) {
								for (var day in entries[key]) {
									if (entry_date != day) {
										continue;
									}

									for (var num in entries[key][day]) {
										allEntries.push(entries[key][day][num]);
									}
								}
							}

							entries = allEntries;
						} else {
							entries = false;
						}

						date_entries = entries;
					}

					for (var i in time_range) {
						var hours = moment.duration(time_range[i]).hours(),
							hour_duration = (hours.toString().length < 2) ? '0' + hours : hours;

						var minutes = moment.duration(time_range[i]).minutes(),
							minutes_duration = (minutes.toString().length < 2) ? '0' + minutes : minutes;

						var service_split_time = hour_duration + ":" + minutes_duration;

						var item_class = (date_entries && _self.haveIntersection(service_split_time, service_duration, date_entries)) ? "time-output" : "time-free";

						var div_item = $("<div/>", {
							'class': 'choose-time_item ' + item_class,
							'text': service_split_time
						}).data({
							'time': service_split_time,
							'date': date
						});

						div_item.click(function () {
							if ($(this).hasClass('time-output') || $(this).hasClass('time-busy')) {
								return false;
							}

							$(this).addClass('selected').siblings().removeClass('selected');

							_self.constants.__choices['time'] = $(this).data('time');
							var selected_date = (!_.isUndefined($(this).data('date'))) ? $(this).data('date') : moment().format('DD.MM.YYYY');
							_self.constants.__choices['date'] = selected_date;

							var stepDoneButton = _self.draw.stepDone.clone();

							stepDoneButton.click(function () {
								_self.showStep('entry');
							});

							var entryStep = $('#data-entry');
							entryStep.addClass("step-passed").find(".online-entry__title").append(stepDoneButton);

							if (_self.draw.isMobile()) {
								_self.draw.removeButtonsText();
							}

							entryStep.find(".online-entry__choice").text(selected_date + " " + $(this).data('time'));
							_self.showStep('confirm');
						});

						list.append(div_item);
					}
				},
				disableDate: function (date) {
					var string = $.datepicker.formatDate('yy-mm-dd', date);
					var weekend = !$.datepicker.noWeekends(date)[0];

					var thisDate = moment(date);
					var currentDate = moment();

					var dayOfWeek = Number(moment(date).format('e'));

					var _self = module,
						_p = _self.constants.__choices['personal'];

					if (_p && _p['id'] == "*") {
						_p = _self.constants.__data['default'];
					}

					if (moment(thisDate).isBefore(currentDate, 'day')) {
						return [false, "ui-disabled"];
					}

					if (_.isUndefined(_p)) {
						return [false, "ui-weekend"];
					}

					if (!_.isUndefined(_p) &&
						(_.isUndefined(_p['days']) || !(_p['days'][dayOfWeek]))) {
						return [false, "ui-weekend"];
					}

					return [true, "ui-enabled"];
				}
			}
		},
		showStep: function (name, ids) {
			var _self = module,
				_ids = ids || false;

			var _data = {};

			var need_ids = (name == "personal" || name == "entry");

			if (need_ids && _ids) {
				for (var i in _ids) {
					_data[_ids[i]] = _self.constants.__data[name][_ids[i]];
				}
			} else if (need_ids && !_ids) {
				_data = {};
			} else {
				_data = _self.constants.__data[name];
			}

			$("#data-" + name)
				.addClass('selected')
				.removeClass('step-passed')
				.find('.step-done__wrapper')
				.remove()
				.end()
				.siblings()
				.removeClass('selected');

			$("#data-" + name)
				.nextAll('.step-passed')
				.find('.step-done__wrapper')
				.remove();

			switch (name) {
				case 'service':
					_self.draw.service(_data);
					break;
				case 'personal':
					_self.draw.personal(_data);
					break;
				case 'entry':
					_self.draw.entry(_data);
					break;
				case 'confirm':
					_self.draw.confirm(_data);
					break;
				default:
					break;
			}
		},
		haveIntersection: function (service_start, service_duration, entries) {
			var serviceStart = moment.duration(service_start)._milliseconds;
			var serviceDuration = service_duration._milliseconds;
			var serviceEnd = serviceStart + serviceDuration;
			var intersection = false;

			for (var i in entries) {
				if (entries[i]['status'] != 2) {
					continue;
				}

				var intersection = true;
				var orderDuration = moment.duration(this.constants.__data['service'][parseInt(entries[i]['service'])]['time'])._milliseconds;
				var orderStart = moment.duration(entries[i]['time'])._milliseconds;
				var orderEnd = orderStart + orderDuration;

				var orderBeforeService = (orderEnd <= serviceStart);
				var orderAfterService = (orderStart >= serviceEnd);

				if (orderBeforeService && ((serviceEnd < orderStart) || (orderEnd <= serviceStart))) {
					intersection = false;
				} else if (orderAfterService && ((serviceEnd <= orderStart) || (orderEnd < serviceStart))) {
					intersection = false;
				} else if ((serviceEnd <= orderStart) || (orderEnd <= serviceStart)) {
					intersection = false;
				} else {
					return intersection;
				}
			}

			return intersection;
		},
		haveIntersectionBetween: function (time_start, time_end, service_time) {
			var start_dur = moment.duration(time_start),
				end_dur = moment.duration(time_end),
				serv_dur = moment.duration(service_time);

			if (serv_dur >= start_dur && serv_dur <= end_dur) {
				return true;
			} else {
				return false;
			}
		}
	};

	return module;
}());
