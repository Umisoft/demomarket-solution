/*!
 * Generated using the Bootstrap Customizer (https://getbootstrap.com/docs/3.4/customize/)
 */

/*!
 * Bootstrap v3.4.1 (https://getbootstrap.com/)
 * Copyright 2011-2020 Twitter, Inc.
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
	throw new Error('Bootstrap\'s JavaScript requires jQuery')
}
+function ($) {
	'use strict';
	var version = $.fn.jquery.split(' ')[0].split('.')
	if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 3)) {
		throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4')
	}
}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
	'use strict';

	// ALERT CLASS DEFINITION
	// ======================

	var dismiss = '[data-dismiss="alert"]'
	var Alert   = function (el) {
		$(el).on('click', dismiss, this.close)
	}

	Alert.VERSION = '3.4.1'

	Alert.TRANSITION_DURATION = 150

	Alert.prototype.close = function (e) {
		var $this    = $(this)
		var selector = $this.attr('data-target')

		if (!selector) {
			selector = $this.attr('href')
			selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
		}

		selector    = selector === '#' ? [] : selector
		var $parent = $(document).find(selector)

		if (e) e.preventDefault()

		if (!$parent.length) {
			$parent = $this.closest('.alert')
		}

		$parent.trigger(e = $.Event('close.bs.alert'))

		if (e.isDefaultPrevented()) return

		$parent.removeClass('in')

		function removeElement() {
			// detach from parent, fire event then clean up data
			$parent.detach().trigger('closed.bs.alert').remove()
		}

		$.support.transition && $parent.hasClass('fade') ?
			$parent
				.one('bsTransitionEnd', removeElement)
				.emulateTransitionEnd(Alert.TRANSITION_DURATION) :
			removeElement()
	}


	// ALERT PLUGIN DEFINITION
	// =======================

	function Plugin(option) {
		return this.each(function () {
			var $this = $(this)
			var data  = $this.data('bs.alert')

			if (!data) $this.data('bs.alert', (data = new Alert(this)))
			if (typeof option == 'string') data[option].call($this)
		})
	}

	var old = $.fn.alert

	$.fn.alert             = Plugin
	$.fn.alert.Constructor = Alert


	// ALERT NO CONFLICT
	// =================

	$.fn.alert.noConflict = function () {
		$.fn.alert = old
		return this
	}


	// ALERT DATA-API
	// ==============

	$(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
	'use strict';

	// BUTTON PUBLIC CLASS DEFINITION
	// ==============================

	var Button = function (element, options) {
		this.$element  = $(element)
		this.options   = $.extend({}, Button.DEFAULTS, options)
		this.isLoading = false
	}

	Button.VERSION  = '3.4.1'

	Button.DEFAULTS = {
		loadingText: 'loading...'
	}

	Button.prototype.setState = function (state) {
		var d    = 'disabled'
		var $el  = this.$element
		var val  = $el.is('input') ? 'val' : 'html'
		var data = $el.data()

		state += 'Text'

		if (data.resetText == null) $el.data('resetText', $el[val]())

		// push to event loop to allow forms to submit
		setTimeout($.proxy(function () {
			$el[val](data[state] == null ? this.options[state] : data[state])

			if (state == 'loadingText') {
				this.isLoading = true
				$el.addClass(d).attr(d, d).prop(d, true)
			} else if (this.isLoading) {
				this.isLoading = false
				$el.removeClass(d).removeAttr(d).prop(d, false)
			}
		}, this), 0)
	}

	Button.prototype.toggle = function () {
		var changed = true
		var $parent = this.$element.closest('[data-toggle="buttons"]')

		if ($parent.length) {
			var $input = this.$element.find('input')
			if ($input.prop('type') == 'radio') {
				if ($input.prop('checked')) changed = false
				$parent.find('.active').removeClass('active')
				this.$element.addClass('active')
			} else if ($input.prop('type') == 'checkbox') {
				if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
				this.$element.toggleClass('active')
			}
			$input.prop('checked', this.$element.hasClass('active'))
			if (changed) $input.trigger('change')
		} else {
			this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
			this.$element.toggleClass('active')
		}
	}


	// BUTTON PLUGIN DEFINITION
	// ========================

	function Plugin(option) {
		return this.each(function () {
			var $this   = $(this)
			var data    = $this.data('bs.button')
			var options = typeof option == 'object' && option

			if (!data) $this.data('bs.button', (data = new Button(this, options)))

			if (option == 'toggle') data.toggle()
			else if (option) data.setState(option)
		})
	}

	var old = $.fn.button

	$.fn.button             = Plugin
	$.fn.button.Constructor = Button


	// BUTTON NO CONFLICT
	// ==================

	$.fn.button.noConflict = function () {
		$.fn.button = old
		return this
	}


	// BUTTON DATA-API
	// ===============

	$(document)
		.on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
			var $btn = $(e.target).closest('.btn')
			Plugin.call($btn, 'toggle')
			if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
				// Prevent double click on radios, and the double selections (so cancellation) on checkboxes
				e.preventDefault()
				// The target component still receive the focus
				if ($btn.is('input,button')) $btn.trigger('focus')
				else $btn.find('input:visible,button:visible').first().trigger('focus')
			}
		})
		.on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
			$(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
		})

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
	'use strict';

	// CAROUSEL CLASS DEFINITION
	// =========================

	var Carousel = function (element, options) {
		this.$element    = $(element)
		this.$indicators = this.$element.find('.carousel-indicators')
		this.options     = options
		this.paused      = null
		this.sliding     = null
		this.interval    = null
		this.$active     = null
		this.$items      = null

		this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

		this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
			.on('mouseenter.bs.carousel', $.proxy(this.pause, this))
			.on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
	}

	Carousel.VERSION  = '3.4.1'

	Carousel.TRANSITION_DURATION = 600

	Carousel.DEFAULTS = {
		interval: 5000,
		pause: 'hover',
		wrap: true,
		keyboard: true
	}

	Carousel.prototype.keydown = function (e) {
		if (/input|textarea/i.test(e.target.tagName)) return
		switch (e.which) {
			case 37: this.prev(); break
			case 39: this.next(); break
			default: return
		}

		e.preventDefault()
	}

	Carousel.prototype.cycle = function (e) {
		e || (this.paused = false)

		this.interval && clearInterval(this.interval)

		this.options.interval
			&& !this.paused
			&& (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

		return this
	}

	Carousel.prototype.getItemIndex = function (item) {
		this.$items = item.parent().children('.item')
		return this.$items.index(item || this.$active)
	}

	Carousel.prototype.getItemForDirection = function (direction, active) {
		var activeIndex = this.getItemIndex(active)
		var willWrap = (direction == 'prev' && activeIndex === 0)
								|| (direction == 'next' && activeIndex == (this.$items.length - 1))
		if (willWrap && !this.options.wrap) return active
		var delta = direction == 'prev' ? -1 : 1
		var itemIndex = (activeIndex + delta) % this.$items.length
		return this.$items.eq(itemIndex)
	}

	Carousel.prototype.to = function (pos) {
		var that        = this
		var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

		if (pos > (this.$items.length - 1) || pos < 0) return

		if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
		if (activeIndex == pos) return this.pause().cycle()

		return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
	}

	Carousel.prototype.pause = function (e) {
		e || (this.paused = true)

		if (this.$element.find('.next, .prev').length && $.support.transition) {
			this.$element.trigger($.support.transition.end)
			this.cycle(true)
		}

		this.interval = clearInterval(this.interval)

		return this
	}

	Carousel.prototype.next = function () {
		if (this.sliding) return
		return this.slide('next')
	}

	Carousel.prototype.prev = function () {
		if (this.sliding) return
		return this.slide('prev')
	}

	Carousel.prototype.slide = function (type, next) {
		var $active   = this.$element.find('.item.active')
		var $next     = next || this.getItemForDirection(type, $active)
		var isCycling = this.interval
		var direction = type == 'next' ? 'left' : 'right'
		var that      = this

		if ($next.hasClass('active')) return (this.sliding = false)

		var relatedTarget = $next[0]
		var slideEvent = $.Event('slide.bs.carousel', {
			relatedTarget: relatedTarget,
			direction: direction
		})
		this.$element.trigger(slideEvent)
		if (slideEvent.isDefaultPrevented()) return

		this.sliding = true

		isCycling && this.pause()

		if (this.$indicators.length) {
			this.$indicators.find('.active').removeClass('active')
			var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
			$nextIndicator && $nextIndicator.addClass('active')
		}

		var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
		if ($.support.transition && this.$element.hasClass('slide')) {
			$next.addClass(type)
			if (typeof $next === 'object' && $next.length) {
				$next[0].offsetWidth // force reflow
			}
			$active.addClass(direction)
			$next.addClass(direction)
			$active
				.one('bsTransitionEnd', function () {
					$next.removeClass([type, direction].join(' ')).addClass('active')
					$active.removeClass(['active', direction].join(' '))
					that.sliding = false
					setTimeout(function () {
						that.$element.trigger(slidEvent)
					}, 0)
				})
				.emulateTransitionEnd(Carousel.TRANSITION_DURATION)
		} else {
			$active.removeClass('active')
			$next.addClass('active')
			this.sliding = false
			this.$element.trigger(slidEvent)
		}

		isCycling && this.cycle()

		return this
	}


	// CAROUSEL PLUGIN DEFINITION
	// ==========================

	function Plugin(option) {
		return this.each(function () {
			var $this   = $(this)
			var data    = $this.data('bs.carousel')
			var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
			var action  = typeof option == 'string' ? option : options.slide

			if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
			if (typeof option == 'number') data.to(option)
			else if (action) data[action]()
			else if (options.interval) data.pause().cycle()
		})
	}

	var old = $.fn.carousel

	$.fn.carousel             = Plugin
	$.fn.carousel.Constructor = Carousel


	// CAROUSEL NO CONFLICT
	// ====================

	$.fn.carousel.noConflict = function () {
		$.fn.carousel = old
		return this
	}


	// CAROUSEL DATA-API
	// =================

	var clickHandler = function (e) {
		var $this   = $(this)
		var href    = $this.attr('href')
		if (href) {
			href = href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7
		}

		var target  = $this.attr('data-target') || href
		var $target = $(document).find(target)

		if (!$target.hasClass('carousel')) return

		var options = $.extend({}, $target.data(), $this.data())
		var slideIndex = $this.attr('data-slide-to')
		if (slideIndex) options.interval = false

		Plugin.call($target, options)

		if (slideIndex) {
			$target.data('bs.carousel').to(slideIndex)
		}

		e.preventDefault()
	}

	$(document)
		.on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
		.on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

	$(window).on('load', function () {
		$('[data-ride="carousel"]').each(function () {
			var $carousel = $(this)
			Plugin.call($carousel, $carousel.data())
		})
	})

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
	'use strict';

	// DROPDOWN CLASS DEFINITION
	// =========================

	var backdrop = '.dropdown-backdrop'
	var toggle   = '[data-toggle="dropdown"]'
	var Dropdown = function (element) {
		$(element).on('click.bs.dropdown', this.toggle)
	}

	Dropdown.VERSION = '3.4.1'

	function getParent($this) {
		var selector = $this.attr('data-target')

		if (!selector) {
			selector = $this.attr('href')
			selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
		}

		var $parent = selector !== '#' ? $(document).find(selector) : null

		return $parent && $parent.length ? $parent : $this.parent()
	}

	function clearMenus(e) {
		if (e && e.which === 3) return
		$(backdrop).remove()
		$(toggle).each(function () {
			var $this         = $(this)
			var $parent       = getParent($this)
			var relatedTarget = { relatedTarget: this }

			if (!$parent.hasClass('open')) return

			if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

			$parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

			if (e.isDefaultPrevented()) return

			$this.attr('aria-expanded', 'false')
			$parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
		})
	}

	Dropdown.prototype.toggle = function (e) {
		var $this = $(this)

		if ($this.is('.disabled, :disabled')) return

		var $parent  = getParent($this)
		var isActive = $parent.hasClass('open')

		clearMenus()

		if (!isActive) {
			if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
				// if mobile we use a backdrop because click events don't delegate
				$(document.createElement('div'))
					.addClass('dropdown-backdrop')
					.insertAfter($(this))
					.on('click', clearMenus)
			}

			var relatedTarget = { relatedTarget: this }
			$parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

			if (e.isDefaultPrevented()) return

			$this
				.trigger('focus')
				.attr('aria-expanded', 'true')

			$parent
				.toggleClass('open')
				.trigger($.Event('shown.bs.dropdown', relatedTarget))
		}

		return false
	}

	Dropdown.prototype.keydown = function (e) {
		if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

		var $this = $(this)

		e.preventDefault()
		e.stopPropagation()

		if ($this.is('.disabled, :disabled')) return

		var $parent  = getParent($this)
		var isActive = $parent.hasClass('open')

		if (!isActive && e.which != 27 || isActive && e.which == 27) {
			if (e.which == 27) $parent.find(toggle).trigger('focus')
			return $this.trigger('click')
		}

		var desc = ' li:not(.disabled):visible a'
		var $items = $parent.find('.dropdown-menu' + desc)

		if (!$items.length) return

		var index = $items.index(e.target)

		if (e.which == 38 && index > 0)                 index--         // up
		if (e.which == 40 && index < $items.length - 1) index++         // down
		if (!~index)                                    index = 0

		$items.eq(index).trigger('focus')
	}


	// DROPDOWN PLUGIN DEFINITION
	// ==========================

	function Plugin(option) {
		return this.each(function () {
			var $this = $(this)
			var data  = $this.data('bs.dropdown')

			if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
			if (typeof option == 'string') data[option].call($this)
		})
	}

	var old = $.fn.dropdown

	$.fn.dropdown             = Plugin
	$.fn.dropdown.Constructor = Dropdown


	// DROPDOWN NO CONFLICT
	// ====================

	$.fn.dropdown.noConflict = function () {
		$.fn.dropdown = old
		return this
	}


	// APPLY TO STANDARD DROPDOWN ELEMENTS
	// ===================================

	$(document)
		.on('click.bs.dropdown.data-api', clearMenus)
		.on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
		.on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
		.on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
		.on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#modals
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
	'use strict';

	// MODAL CLASS DEFINITION
	// ======================

	var Modal = function (element, options) {
		this.options = options
		this.$body = $(document.body)
		this.$element = $(element)
		this.$dialog = this.$element.find('.modal-dialog')
		this.$backdrop = null
		this.isShown = null
		this.originalBodyPad = null
		this.scrollbarWidth = 0
		this.ignoreBackdropClick = false
		this.fixedContent = '.navbar-fixed-top, .navbar-fixed-bottom'

		if (this.options.remote) {
			this.$element
				.find('.modal-content')
				.load(this.options.remote, $.proxy(function () {
					this.$element.trigger('loaded.bs.modal')
				}, this))
		}
	}

	Modal.VERSION = '3.4.1'

	Modal.TRANSITION_DURATION = 300
	Modal.BACKDROP_TRANSITION_DURATION = 150

	Modal.DEFAULTS = {
		backdrop: true,
		keyboard: true,
		show: true
	}

	Modal.prototype.toggle = function (_relatedTarget) {
		return this.isShown ? this.hide() : this.show(_relatedTarget)
	}

	Modal.prototype.show = function (_relatedTarget) {
		var that = this
		var e = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

		this.$element.trigger(e)

		if (this.isShown || e.isDefaultPrevented()) return

		this.isShown = true

		this.checkScrollbar()
		this.setScrollbar()
		this.$body.addClass('modal-open')

		this.escape()
		this.resize()

		this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

		this.$dialog.on('mousedown.dismiss.bs.modal', function () {
			that.$element.one('mouseup.dismiss.bs.modal', function (e) {
				if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
			})
		})

		this.backdrop(function () {
			var transition = $.support.transition && that.$element.hasClass('fade')

			if (!that.$element.parent().length) {
				that.$element.appendTo(that.$body) // don't move modals dom position
			}

			that.$element
				.show()
				.scrollTop(0)

			that.adjustDialog()

			if (transition) {
				that.$element[0].offsetWidth // force reflow
			}

			that.$element.addClass('in')

			that.enforceFocus()

			var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

			transition ?
				that.$dialog // wait for modal to slide in
					.one('bsTransitionEnd', function () {
						that.$element.trigger('focus').trigger(e)
					})
					.emulateTransitionEnd(Modal.TRANSITION_DURATION) :
				that.$element.trigger('focus').trigger(e)
		})
	}

	Modal.prototype.hide = function (e) {
		if (e) e.preventDefault()

		e = $.Event('hide.bs.modal')

		this.$element.trigger(e)

		if (!this.isShown || e.isDefaultPrevented()) return

		this.isShown = false

		this.escape()
		this.resize()

		$(document).off('focusin.bs.modal')

		this.$element
			.removeClass('in')
			.off('click.dismiss.bs.modal')
			.off('mouseup.dismiss.bs.modal')

		this.$dialog.off('mousedown.dismiss.bs.modal')

		$.support.transition && this.$element.hasClass('fade') ?
			this.$element
				.one('bsTransitionEnd', $.proxy(this.hideModal, this))
				.emulateTransitionEnd(Modal.TRANSITION_DURATION) :
			this.hideModal()
	}

	Modal.prototype.enforceFocus = function () {
		$(document)
			.off('focusin.bs.modal') // guard against infinite focus loop
			.on('focusin.bs.modal', $.proxy(function (e) {
				if (document !== e.target &&
					this.$element[0] !== e.target &&
					!this.$element.has(e.target).length) {
					this.$element.trigger('focus')
				}
			}, this))
	}

	Modal.prototype.escape = function () {
		if (this.isShown && this.options.keyboard) {
			this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
				e.which == 27 && this.hide()
			}, this))
		} else if (!this.isShown) {
			this.$element.off('keydown.dismiss.bs.modal')
		}
	}

	Modal.prototype.resize = function () {
		if (this.isShown) {
			$(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
		} else {
			$(window).off('resize.bs.modal')
		}
	}

	Modal.prototype.hideModal = function () {
		var that = this
		this.$element.hide()
		this.backdrop(function () {
			that.$body.removeClass('modal-open')
			that.resetAdjustments()
			that.resetScrollbar()
			that.$element.trigger('hidden.bs.modal')
		})
	}

	Modal.prototype.removeBackdrop = function () {
		this.$backdrop && this.$backdrop.remove()
		this.$backdrop = null
	}

	Modal.prototype.backdrop = function (callback) {
		var that = this
		var animate = this.$element.hasClass('fade') ? 'fade' : ''

		if (this.isShown && this.options.backdrop) {
			var doAnimate = $.support.transition && animate

			this.$backdrop = $(document.createElement('div'))
				.addClass('modal-backdrop ' + animate)
				.appendTo(this.$body)

			this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
				if (this.ignoreBackdropClick) {
					this.ignoreBackdropClick = false
					return
				}
				if (e.target !== e.currentTarget) return
				this.options.backdrop == 'static'
					? this.$element[0].focus()
					: this.hide()
			}, this))

			if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

			this.$backdrop.addClass('in')

			if (!callback) return

			doAnimate ?
				this.$backdrop
					.one('bsTransitionEnd', callback)
					.emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
				callback()

		} else if (!this.isShown && this.$backdrop) {
			this.$backdrop.removeClass('in')

			var callbackRemove = function () {
				that.removeBackdrop()
				callback && callback()
			}
			$.support.transition && this.$element.hasClass('fade') ?
				this.$backdrop
					.one('bsTransitionEnd', callbackRemove)
					.emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
				callbackRemove()

		} else if (callback) {
			callback()
		}
	}

	// these following methods are used to handle overflowing modals

	Modal.prototype.handleUpdate = function () {
		this.adjustDialog()
	}

	Modal.prototype.adjustDialog = function () {
		var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

		this.$element.css({
			paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
			paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
		})
	}

	Modal.prototype.resetAdjustments = function () {
		this.$element.css({
			paddingLeft: '',
			paddingRight: ''
		})
	}

	Modal.prototype.checkScrollbar = function () {
		var fullWindowWidth = window.innerWidth
		if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
			var documentElementRect = document.documentElement.getBoundingClientRect()
			fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
		}
		this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
		this.scrollbarWidth = this.measureScrollbar()
	}

	Modal.prototype.setScrollbar = function () {
		var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
		this.originalBodyPad = document.body.style.paddingRight || ''
		var scrollbarWidth = this.scrollbarWidth
		if (this.bodyIsOverflowing) {
			this.$body.css('padding-right', bodyPad + scrollbarWidth)
			$(this.fixedContent).each(function (index, element) {
				var actualPadding = element.style.paddingRight
				var calculatedPadding = $(element).css('padding-right')
				$(element)
					.data('padding-right', actualPadding)
					.css('padding-right', parseFloat(calculatedPadding) + scrollbarWidth + 'px')
			})
		}
	}

	Modal.prototype.resetScrollbar = function () {
		this.$body.css('padding-right', this.originalBodyPad)
		$(this.fixedContent).each(function (index, element) {
			var padding = $(element).data('padding-right')
			$(element).removeData('padding-right')
			element.style.paddingRight = padding ? padding : ''
		})
	}

	Modal.prototype.measureScrollbar = function () { // thx walsh
		var scrollDiv = document.createElement('div')
		scrollDiv.className = 'modal-scrollbar-measure'
		this.$body.append(scrollDiv)
		var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
		this.$body[0].removeChild(scrollDiv)
		return scrollbarWidth
	}


	// MODAL PLUGIN DEFINITION
	// =======================

	function Plugin(option, _relatedTarget) {
		return this.each(function () {
			var $this = $(this)
			var data = $this.data('bs.modal')
			var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

			if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
			if (typeof option == 'string') data[option](_relatedTarget)
			else if (options.show) data.show(_relatedTarget)
		})
	}

	var old = $.fn.modal

	$.fn.modal = Plugin
	$.fn.modal.Constructor = Modal


	// MODAL NO CONFLICT
	// =================

	$.fn.modal.noConflict = function () {
		$.fn.modal = old
		return this
	}


	// MODAL DATA-API
	// ==============

	$(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
		var $this = $(this)
		var href = $this.attr('href')
		var target = $this.attr('data-target') ||
			(href && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7

		var $target = $(document).find(target)
		var option = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

		if ($this.is('a')) e.preventDefault()

		$target.one('show.bs.modal', function (showEvent) {
			if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
			$target.one('hidden.bs.modal', function () {
				$this.is(':visible') && $this.trigger('focus')
			})
		})
		Plugin.call($target, option, this)
	})

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
	'use strict';

	var DISALLOWED_ATTRIBUTES = ['sanitize', 'whiteList', 'sanitizeFn']

	var uriAttrs = [
		'background',
		'cite',
		'href',
		'itemtype',
		'longdesc',
		'poster',
		'src',
		'xlink:href'
	]

	var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i

	var DefaultWhitelist = {
		// Global attributes allowed on any supplied element below.
		'*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
		a: ['target', 'href', 'title', 'rel'],
		area: [],
		b: [],
		br: [],
		col: [],
		code: [],
		div: [],
		em: [],
		hr: [],
		h1: [],
		h2: [],
		h3: [],
		h4: [],
		h5: [],
		h6: [],
		i: [],
		img: ['src', 'alt', 'title', 'width', 'height'],
		li: [],
		ol: [],
		p: [],
		pre: [],
		s: [],
		small: [],
		span: [],
		sub: [],
		sup: [],
		strong: [],
		u: [],
		ul: []
	}

	/**
	 * A pattern that recognizes a commonly useful subset of URLs that are safe.
	 *
	 * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
	 */
	var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi

	/**
	 * A pattern that matches safe data URLs. Only matches image, video and audio types.
	 *
	 * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
	 */
	var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i

	function allowedAttribute(attr, allowedAttributeList) {
		var attrName = attr.nodeName.toLowerCase()

		if ($.inArray(attrName, allowedAttributeList) !== -1) {
			if ($.inArray(attrName, uriAttrs) !== -1) {
				return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN))
			}

			return true
		}

		var regExp = $(allowedAttributeList).filter(function (index, value) {
			return value instanceof RegExp
		})

		// Check if a regular expression validates the attribute.
		for (var i = 0, l = regExp.length; i < l; i++) {
			if (attrName.match(regExp[i])) {
				return true
			}
		}

		return false
	}

	function sanitizeHtml(unsafeHtml, whiteList, sanitizeFn) {
		if (unsafeHtml.length === 0) {
			return unsafeHtml
		}

		if (sanitizeFn && typeof sanitizeFn === 'function') {
			return sanitizeFn(unsafeHtml)
		}

		// IE 8 and below don't support createHTMLDocument
		if (!document.implementation || !document.implementation.createHTMLDocument) {
			return unsafeHtml
		}

		var createdDocument = document.implementation.createHTMLDocument('sanitization')
		createdDocument.body.innerHTML = unsafeHtml

		var whitelistKeys = $.map(whiteList, function (el, i) { return i })
		var elements = $(createdDocument.body).find('*')

		for (var i = 0, len = elements.length; i < len; i++) {
			var el = elements[i]
			var elName = el.nodeName.toLowerCase()

			if ($.inArray(elName, whitelistKeys) === -1) {
				el.parentNode.removeChild(el)

				continue
			}

			var attributeList = $.map(el.attributes, function (el) { return el })
			var whitelistedAttributes = [].concat(whiteList['*'] || [], whiteList[elName] || [])

			for (var j = 0, len2 = attributeList.length; j < len2; j++) {
				if (!allowedAttribute(attributeList[j], whitelistedAttributes)) {
					el.removeAttribute(attributeList[j].nodeName)
				}
			}
		}

		return createdDocument.body.innerHTML
	}

	// TOOLTIP PUBLIC CLASS DEFINITION
	// ===============================

	var Tooltip = function (element, options) {
		this.type       = null
		this.options    = null
		this.enabled    = null
		this.timeout    = null
		this.hoverState = null
		this.$element   = null
		this.inState    = null

		this.init('tooltip', element, options)
	}

	Tooltip.VERSION  = '3.4.1'

	Tooltip.TRANSITION_DURATION = 150

	Tooltip.DEFAULTS = {
		animation: true,
		placement: 'top',
		selector: false,
		template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
		trigger: 'hover focus',
		title: '',
		delay: 0,
		html: false,
		container: false,
		viewport: {
			selector: 'body',
			padding: 0
		},
		sanitize : true,
		sanitizeFn : null,
		whiteList : DefaultWhitelist
	}

	Tooltip.prototype.init = function (type, element, options) {
		this.enabled   = true
		this.type      = type
		this.$element  = $(element)
		this.options   = this.getOptions(options)
		this.$viewport = this.options.viewport && $(document).find(typeof this.options.viewport === "function" ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
		this.inState   = { click: false, hover: false, focus: false }

		if (this.$element[0] instanceof document.constructor && !this.options.selector) {
			throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
		}

		var triggers = this.options.trigger.split(' ')

		for (var i = triggers.length; i--;) {
			var trigger = triggers[i]

			if (trigger == 'click') {
				this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
			} else if (trigger != 'manual') {
				var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
				var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

				this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
				this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
			}
		}

		this.options.selector ?
			(this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
			this.fixTitle()
	}

	Tooltip.prototype.getDefaults = function () {
		return Tooltip.DEFAULTS
	}

	Tooltip.prototype.getOptions = function (options) {
		var dataAttributes = this.$element.data()

		for (var dataAttr in dataAttributes) {
			if (dataAttributes.hasOwnProperty(dataAttr) && $.inArray(dataAttr, DISALLOWED_ATTRIBUTES) !== -1) {
				delete dataAttributes[dataAttr]
			}
		}

		options = $.extend({}, this.getDefaults(), dataAttributes, options)

		if (options.delay && typeof options.delay == 'number') {
			options.delay = {
				show: options.delay,
				hide: options.delay
			}
		}

		if (options.sanitize) {
			options.template = sanitizeHtml(options.template, options.whiteList, options.sanitizeFn)
		}

		return options
	}

	Tooltip.prototype.getDelegateOptions = function () {
		var options  = {}
		var defaults = this.getDefaults()

		this._options && $.each(this._options, function (key, value) {
			if (defaults[key] != value) options[key] = value
		})

		return options
	}

	Tooltip.prototype.enter = function (obj) {
		var self = obj instanceof this.constructor ?
			obj : $(obj.currentTarget).data('bs.' + this.type)

		if (!self) {
			self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
			$(obj.currentTarget).data('bs.' + this.type, self)
		}

		if (obj instanceof $.Event) {
			self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
		}

		if (self.tip().hasClass('in') || self.hoverState == 'in') {
			self.hoverState = 'in'
			return
		}

		clearTimeout(self.timeout)

		self.hoverState = 'in'

		if (!self.options.delay || !self.options.delay.show) return self.show()

		self.timeout = setTimeout(function () {
			if (self.hoverState == 'in') self.show()
		}, self.options.delay.show)
	}

	Tooltip.prototype.isInStateTrue = function () {
		for (var key in this.inState) {
			if (this.inState[key]) return true
		}

		return false
	}

	Tooltip.prototype.leave = function (obj) {
		var self = obj instanceof this.constructor ?
			obj : $(obj.currentTarget).data('bs.' + this.type)

		if (!self) {
			self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
			$(obj.currentTarget).data('bs.' + this.type, self)
		}

		if (obj instanceof $.Event) {
			self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
		}

		if (self.isInStateTrue()) return

		clearTimeout(self.timeout)

		self.hoverState = 'out'

		if (!self.options.delay || !self.options.delay.hide) return self.hide()

		self.timeout = setTimeout(function () {
			if (self.hoverState == 'out') self.hide()
		}, self.options.delay.hide)
	}

	Tooltip.prototype.show = function () {
		var e = $.Event('show.bs.' + this.type)

		if (this.hasContent() && this.enabled) {
			this.$element.trigger(e)

			var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
			if (e.isDefaultPrevented() || !inDom) return
			var that = this

			var $tip = this.tip()

			var tipId = this.getUID(this.type)

			this.setContent()
			$tip.attr('id', tipId)
			this.$element.attr('aria-describedby', tipId)

			if (this.options.animation) $tip.addClass('fade')

			var placement = typeof this.options.placement == 'function' ?
				this.options.placement.call(this, $tip[0], this.$element[0]) :
				this.options.placement

			var autoToken = /\s?auto?\s?/i
			var autoPlace = autoToken.test(placement)
			if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

			$tip
				.detach()
				.css({ top: 0, left: 0, display: 'block' })
				.addClass(placement)
				.data('bs.' + this.type, this)

			this.options.container ? $tip.appendTo($(document).find(this.options.container)) : $tip.insertAfter(this.$element)
			this.$element.trigger('inserted.bs.' + this.type)

			var pos          = this.getPosition()
			var actualWidth  = $tip[0].offsetWidth
			var actualHeight = $tip[0].offsetHeight

			if (autoPlace) {
				var orgPlacement = placement
				var viewportDim = this.getPosition(this.$viewport)

				placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
							placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
							placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
							placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
							placement

				$tip
					.removeClass(orgPlacement)
					.addClass(placement)
			}

			var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

			this.applyPlacement(calculatedOffset, placement)

			var complete = function () {
				var prevHoverState = that.hoverState
				that.$element.trigger('shown.bs.' + that.type)
				that.hoverState = null

				if (prevHoverState == 'out') that.leave(that)
			}

			$.support.transition && this.$tip.hasClass('fade') ?
				$tip
					.one('bsTransitionEnd', complete)
					.emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
				complete()
		}
	}

	Tooltip.prototype.applyPlacement = function (offset, placement) {
		var $tip   = this.tip()
		var width  = $tip[0].offsetWidth
		var height = $tip[0].offsetHeight

		// manually read margins because getBoundingClientRect includes difference
		var marginTop = parseInt($tip.css('margin-top'), 10)
		var marginLeft = parseInt($tip.css('margin-left'), 10)

		// we must check for NaN for ie 8/9
		if (isNaN(marginTop))  marginTop  = 0
		if (isNaN(marginLeft)) marginLeft = 0

		offset.top  += marginTop
		offset.left += marginLeft

		// $.fn.offset doesn't round pixel values
		// so we use setOffset directly with our own function B-0
		$.offset.setOffset($tip[0], $.extend({
			using: function (props) {
				$tip.css({
					top: Math.round(props.top),
					left: Math.round(props.left)
				})
			}
		}, offset), 0)

		$tip.addClass('in')

		// check to see if placing tip in new offset caused the tip to resize itself
		var actualWidth  = $tip[0].offsetWidth
		var actualHeight = $tip[0].offsetHeight

		if (placement == 'top' && actualHeight != height) {
			offset.top = offset.top + height - actualHeight
		}

		var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

		if (delta.left) offset.left += delta.left
		else offset.top += delta.top

		var isVertical          = /top|bottom/.test(placement)
		var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
		var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

		$tip.offset(offset)
		this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
	}

	Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
		this.arrow()
			.css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
			.css(isVertical ? 'top' : 'left', '')
	}

	Tooltip.prototype.setContent = function () {
		var $tip  = this.tip()
		var title = this.getTitle()

		if (this.options.html) {
			if (this.options.sanitize) {
				title = sanitizeHtml(title, this.options.whiteList, this.options.sanitizeFn)
			}

			$tip.find('.tooltip-inner').html(title)
		} else {
			$tip.find('.tooltip-inner').text(title)
		}

		$tip.removeClass('fade in top bottom left right')
	}

	Tooltip.prototype.hide = function (callback) {
		var that = this
		var $tip = $(this.$tip)
		var e    = $.Event('hide.bs.' + this.type)

		function complete() {
			if (that.hoverState != 'in') $tip.detach()
			if (that.$element) { // TODO: Check whether guarding this code with this `if` is really necessary.
				that.$element
					.removeAttr('aria-describedby')
					.trigger('hidden.bs.' + that.type)
			}
			callback && callback()
		}

		this.$element.trigger(e)

		if (e.isDefaultPrevented()) return

		$tip.removeClass('in')

		$.support.transition && $tip.hasClass('fade') ?
			$tip
				.one('bsTransitionEnd', complete)
				.emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
			complete()

		this.hoverState = null

		return this
	}

	Tooltip.prototype.fixTitle = function () {
		var $e = this.$element
		if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
			$e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
		}
	}

	Tooltip.prototype.hasContent = function () {
		return this.getTitle()
	}

	Tooltip.prototype.getPosition = function ($element) {
		$element   = $element || this.$element

		var el     = $element[0]
		var isBody = el.tagName == 'BODY'

		var elRect    = el.getBoundingClientRect()
		if (elRect.width == null) {
			// width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
			elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
		}
		var isSvg = window.SVGElement && el instanceof window.SVGElement
		// Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
		// See https://github.com/twbs/bootstrap/issues/20280
		var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
		var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
		var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

		return $.extend({}, elRect, scroll, outerDims, elOffset)
	}

	Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
		return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
					 placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
					 placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
					/* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

	}

	Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
		var delta = { top: 0, left: 0 }
		if (!this.$viewport) return delta

		var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
		var viewportDimensions = this.getPosition(this.$viewport)

		if (/right|left/.test(placement)) {
			var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
			var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
			if (topEdgeOffset < viewportDimensions.top) { // top overflow
				delta.top = viewportDimensions.top - topEdgeOffset
			} else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
				delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
			}
		} else {
			var leftEdgeOffset  = pos.left - viewportPadding
			var rightEdgeOffset = pos.left + viewportPadding + actualWidth
			if (leftEdgeOffset < viewportDimensions.left) { // left overflow
				delta.left = viewportDimensions.left - leftEdgeOffset
			} else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
				delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
			}
		}

		return delta
	}

	Tooltip.prototype.getTitle = function () {
		var title
		var $e = this.$element
		var o  = this.options

		title = $e.attr('data-original-title')
			|| (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

		return title
	}

	Tooltip.prototype.getUID = function (prefix) {
		do prefix += ~~(Math.random() * 1000000)
		while (document.getElementById(prefix))
		return prefix
	}

	Tooltip.prototype.tip = function () {
		if (!this.$tip) {
			this.$tip = $(this.options.template)
			if (this.$tip.length != 1) {
				throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
			}
		}
		return this.$tip
	}

	Tooltip.prototype.arrow = function () {
		return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
	}

	Tooltip.prototype.enable = function () {
		this.enabled = true
	}

	Tooltip.prototype.disable = function () {
		this.enabled = false
	}

	Tooltip.prototype.toggleEnabled = function () {
		this.enabled = !this.enabled
	}

	Tooltip.prototype.toggle = function (e) {
		var self = this
		if (e) {
			self = $(e.currentTarget).data('bs.' + this.type)
			if (!self) {
				self = new this.constructor(e.currentTarget, this.getDelegateOptions())
				$(e.currentTarget).data('bs.' + this.type, self)
			}
		}

		if (e) {
			self.inState.click = !self.inState.click
			if (self.isInStateTrue()) self.enter(self)
			else self.leave(self)
		} else {
			self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
		}
	}

	Tooltip.prototype.destroy = function () {
		var that = this
		clearTimeout(this.timeout)
		this.hide(function () {
			that.$element.off('.' + that.type).removeData('bs.' + that.type)
			if (that.$tip) {
				that.$tip.detach()
			}
			that.$tip = null
			that.$arrow = null
			that.$viewport = null
			that.$element = null
		})
	}

	Tooltip.prototype.sanitizeHtml = function (unsafeHtml) {
		return sanitizeHtml(unsafeHtml, this.options.whiteList, this.options.sanitizeFn)
	}

	// TOOLTIP PLUGIN DEFINITION
	// =========================

	function Plugin(option) {
		return this.each(function () {
			var $this   = $(this)
			var data    = $this.data('bs.tooltip')
			var options = typeof option == 'object' && option

			if (!data && /destroy|hide/.test(option)) return
			if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
			if (typeof option == 'string') data[option]()
		})
	}

	var old = $.fn.tooltip

	$.fn.tooltip             = Plugin
	$.fn.tooltip.Constructor = Tooltip


	// TOOLTIP NO CONFLICT
	// ===================

	$.fn.tooltip.noConflict = function () {
		$.fn.tooltip = old
		return this
	}

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
	'use strict';

	// POPOVER PUBLIC CLASS DEFINITION
	// ===============================

	var Popover = function (element, options) {
		this.init('popover', element, options)
	}

	if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

	Popover.VERSION  = '3.4.1'

	Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
		placement: 'right',
		trigger: 'click',
		content: '',
		template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
	})


	// NOTE: POPOVER EXTENDS tooltip.js
	// ================================

	Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

	Popover.prototype.constructor = Popover

	Popover.prototype.getDefaults = function () {
		return Popover.DEFAULTS
	}

	Popover.prototype.setContent = function () {
		var $tip    = this.tip()
		var title   = this.getTitle()
		var content = this.getContent()

		if (this.options.html) {
			var typeContent = typeof content

			if (this.options.sanitize) {
				title = this.sanitizeHtml(title)

				if (typeContent === 'string') {
					content = this.sanitizeHtml(content)
				}
			}

			$tip.find('.popover-title').html(title)
			$tip.find('.popover-content').children().detach().end()[
				typeContent === 'string' ? 'html' : 'append'
			](content)
		} else {
			$tip.find('.popover-title').text(title)
			$tip.find('.popover-content').children().detach().end().text(content)
		}

		$tip.removeClass('fade top bottom left right in')

		// IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
		// this manually by checking the contents.
		if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
	}

	Popover.prototype.hasContent = function () {
		return this.getTitle() || this.getContent()
	}

	Popover.prototype.getContent = function () {
		var $e = this.$element
		var o  = this.options

		return $e.attr('data-content')
			|| (typeof o.content == 'function' ?
				o.content.call($e[0]) :
				o.content)
	}

	Popover.prototype.arrow = function () {
		return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
	}


	// POPOVER PLUGIN DEFINITION
	// =========================

	function Plugin(option) {
		return this.each(function () {
			var $this   = $(this)
			var data    = $this.data('bs.popover')
			var options = typeof option == 'object' && option

			if (!data && /destroy|hide/.test(option)) return
			if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
			if (typeof option == 'string') data[option]()
		})
	}

	var old = $.fn.popover

	$.fn.popover             = Plugin
	$.fn.popover.Constructor = Popover


	// POPOVER NO CONFLICT
	// ===================

	$.fn.popover.noConflict = function () {
		$.fn.popover = old
		return this
	}

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
	'use strict';

	// TAB CLASS DEFINITION
	// ====================

	var Tab = function (element) {
		// jscs:disable requireDollarBeforejQueryAssignment
		this.element = $(element)
		// jscs:enable requireDollarBeforejQueryAssignment
	}

	Tab.VERSION = '3.4.1'

	Tab.TRANSITION_DURATION = 150

	Tab.prototype.show = function () {
		var $this    = this.element
		var $ul      = $this.closest('ul:not(.dropdown-menu)')
		var selector = $this.data('target')

		if (!selector) {
			selector = $this.attr('href')
			selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
		}

		if ($this.parent('li').hasClass('active')) return

		var $previous = $ul.find('.active:last a')
		var hideEvent = $.Event('hide.bs.tab', {
			relatedTarget: $this[0]
		})
		var showEvent = $.Event('show.bs.tab', {
			relatedTarget: $previous[0]
		})

		$previous.trigger(hideEvent)
		$this.trigger(showEvent)

		if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

		var $target = $(document).find(selector)

		this.activate($this.closest('li'), $ul)
		this.activate($target, $target.parent(), function () {
			$previous.trigger({
				type: 'hidden.bs.tab',
				relatedTarget: $this[0]
			})
			$this.trigger({
				type: 'shown.bs.tab',
				relatedTarget: $previous[0]
			})
		})
	}

	Tab.prototype.activate = function (element, container, callback) {
		var $active    = container.find('> .active')
		var transition = callback
			&& $.support.transition
			&& ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

		function next() {
			$active
				.removeClass('active')
				.find('> .dropdown-menu > .active')
				.removeClass('active')
				.end()
				.find('[data-toggle="tab"]')
				.attr('aria-expanded', false)

			element
				.addClass('active')
				.find('[data-toggle="tab"]')
				.attr('aria-expanded', true)

			if (transition) {
				element[0].offsetWidth // reflow for transition
				element.addClass('in')
			} else {
				element.removeClass('fade')
			}

			if (element.parent('.dropdown-menu').length) {
				element
					.closest('li.dropdown')
					.addClass('active')
					.end()
					.find('[data-toggle="tab"]')
					.attr('aria-expanded', true)
			}

			callback && callback()
		}

		$active.length && transition ?
			$active
				.one('bsTransitionEnd', next)
				.emulateTransitionEnd(Tab.TRANSITION_DURATION) :
			next()

		$active.removeClass('in')
	}


	// TAB PLUGIN DEFINITION
	// =====================

	function Plugin(option) {
		return this.each(function () {
			var $this = $(this)
			var data  = $this.data('bs.tab')

			if (!data) $this.data('bs.tab', (data = new Tab(this)))
			if (typeof option == 'string') data[option]()
		})
	}

	var old = $.fn.tab

	$.fn.tab             = Plugin
	$.fn.tab.Constructor = Tab


	// TAB NO CONFLICT
	// ===============

	$.fn.tab.noConflict = function () {
		$.fn.tab = old
		return this
	}


	// TAB DATA-API
	// ============

	var clickHandler = function (e) {
		e.preventDefault()
		Plugin.call($(this), 'show')
	}

	$(document)
		.on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
		.on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#affix
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
	'use strict';

	// AFFIX CLASS DEFINITION
	// ======================

	var Affix = function (element, options) {
		this.options = $.extend({}, Affix.DEFAULTS, options)

		var target = this.options.target === Affix.DEFAULTS.target ? $(this.options.target) : $(document).find(this.options.target)

		this.$target = target
			.on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
			.on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

		this.$element     = $(element)
		this.affixed      = null
		this.unpin        = null
		this.pinnedOffset = null

		this.checkPosition()
	}

	Affix.VERSION  = '3.4.1'

	Affix.RESET    = 'affix affix-top affix-bottom'

	Affix.DEFAULTS = {
		offset: 0,
		target: window
	}

	Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
		var scrollTop    = this.$target.scrollTop()
		var position     = this.$element.offset()
		var targetHeight = this.$target.height()

		if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

		if (this.affixed == 'bottom') {
			if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
			return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
		}

		var initializing   = this.affixed == null
		var colliderTop    = initializing ? scrollTop : position.top
		var colliderHeight = initializing ? targetHeight : height

		if (offsetTop != null && scrollTop <= offsetTop) return 'top'
		if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

		return false
	}

	Affix.prototype.getPinnedOffset = function () {
		if (this.pinnedOffset) return this.pinnedOffset
		this.$element.removeClass(Affix.RESET).addClass('affix')
		var scrollTop = this.$target.scrollTop()
		var position  = this.$element.offset()
		return (this.pinnedOffset = position.top - scrollTop)
	}

	Affix.prototype.checkPositionWithEventLoop = function () {
		setTimeout($.proxy(this.checkPosition, this), 1)
	}

	Affix.prototype.checkPosition = function () {
		if (!this.$element.is(':visible')) return

		var height       = this.$element.height()
		var offset       = this.options.offset
		var offsetTop    = offset.top
		var offsetBottom = offset.bottom
		var scrollHeight = Math.max($(document).height(), $(document.body).height())

		if (typeof offset != 'object')         offsetBottom = offsetTop = offset
		if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
		if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

		var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

		if (this.affixed != affix) {
			if (this.unpin != null) this.$element.css('top', '')

			var affixType = 'affix' + (affix ? '-' + affix : '')
			var e         = $.Event(affixType + '.bs.affix')

			this.$element.trigger(e)

			if (e.isDefaultPrevented()) return

			this.affixed = affix
			this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

			this.$element
				.removeClass(Affix.RESET)
				.addClass(affixType)
				.trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
		}

		if (affix == 'bottom') {
			this.$element.offset({
				top: scrollHeight - height - offsetBottom
			})
		}
	}


	// AFFIX PLUGIN DEFINITION
	// =======================

	function Plugin(option) {
		return this.each(function () {
			var $this   = $(this)
			var data    = $this.data('bs.affix')
			var options = typeof option == 'object' && option

			if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
			if (typeof option == 'string') data[option]()
		})
	}

	var old = $.fn.affix

	$.fn.affix             = Plugin
	$.fn.affix.Constructor = Affix


	// AFFIX NO CONFLICT
	// =================

	$.fn.affix.noConflict = function () {
		$.fn.affix = old
		return this
	}


	// AFFIX DATA-API
	// ==============

	$(window).on('load', function () {
		$('[data-spy="affix"]').each(function () {
			var $spy = $(this)
			var data = $spy.data()

			data.offset = data.offset || {}

			if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
			if (data.offsetTop    != null) data.offset.top    = data.offsetTop

			Plugin.call($spy, data)
		})
	})

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */

+function ($) {
	'use strict';

	// COLLAPSE PUBLIC CLASS DEFINITION
	// ================================

	var Collapse = function (element, options) {
		this.$element      = $(element)
		this.options       = $.extend({}, Collapse.DEFAULTS, options)
		this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
							   '[data-toggle="collapse"][data-target="#' + element.id + '"]')
		this.transitioning = null

		if (this.options.parent) {
			this.$parent = this.getParent()
		} else {
			this.addAriaAndCollapsedClass(this.$element, this.$trigger)
		}

		if (this.options.toggle) this.toggle()
	}

	Collapse.VERSION  = '3.4.1'

	Collapse.TRANSITION_DURATION = 350

	Collapse.DEFAULTS = {
		toggle: true
	}

	Collapse.prototype.dimension = function () {
		var hasWidth = this.$element.hasClass('width')
		return hasWidth ? 'width' : 'height'
	}

	Collapse.prototype.show = function () {
		if (this.transitioning || this.$element.hasClass('in')) return

		var activesData
		var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

		if (actives && actives.length) {
			activesData = actives.data('bs.collapse')
			if (activesData && activesData.transitioning) return
		}

		var startEvent = $.Event('show.bs.collapse')
		this.$element.trigger(startEvent)
		if (startEvent.isDefaultPrevented()) return

		if (actives && actives.length) {
			Plugin.call(actives, 'hide')
			activesData || actives.data('bs.collapse', null)
		}

		var dimension = this.dimension()

		this.$element
			.removeClass('collapse')
			.addClass('collapsing')[dimension](0)
			.attr('aria-expanded', true)

		this.$trigger
			.removeClass('collapsed')
			.attr('aria-expanded', true)

		this.transitioning = 1

		var complete = function () {
			this.$element
				.removeClass('collapsing')
				.addClass('collapse in')[dimension]('')
			this.transitioning = 0
			this.$element
				.trigger('shown.bs.collapse')
		}

		if (!$.support.transition) return complete.call(this)

		var scrollSize = $.camelCase(['scroll', dimension].join('-'))

		this.$element
			.one('bsTransitionEnd', $.proxy(complete, this))
			.emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
	}

	Collapse.prototype.hide = function () {
		if (this.transitioning || !this.$element.hasClass('in')) return

		var startEvent = $.Event('hide.bs.collapse')
		this.$element.trigger(startEvent)
		if (startEvent.isDefaultPrevented()) return

		var dimension = this.dimension()

		this.$element[dimension](this.$element[dimension]())[0].offsetHeight

		this.$element
			.addClass('collapsing')
			.removeClass('collapse in')
			.attr('aria-expanded', false)

		this.$trigger
			.addClass('collapsed')
			.attr('aria-expanded', false)

		this.transitioning = 1

		var complete = function () {
			this.transitioning = 0
			this.$element
				.removeClass('collapsing')
				.addClass('collapse')
				.trigger('hidden.bs.collapse')
		}

		if (!$.support.transition) return complete.call(this)

		this.$element
			[dimension](0)
			.one('bsTransitionEnd', $.proxy(complete, this))
			.emulateTransitionEnd(Collapse.TRANSITION_DURATION)
	}

	Collapse.prototype.toggle = function () {
		this[this.$element.hasClass('in') ? 'hide' : 'show']()
	}

	Collapse.prototype.getParent = function () {
		return $(document).find(this.options.parent)
			.find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
			.each($.proxy(function (i, element) {
				var $element = $(element)
				this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
			}, this))
			.end()
	}

	Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
		var isOpen = $element.hasClass('in')

		$element.attr('aria-expanded', isOpen)
		$trigger
			.toggleClass('collapsed', !isOpen)
			.attr('aria-expanded', isOpen)
	}

	function getTargetFromTrigger($trigger) {
		var href
		var target = $trigger.attr('data-target')
			|| (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

		return $(document).find(target)
	}


	// COLLAPSE PLUGIN DEFINITION
	// ==========================

	function Plugin(option) {
		return this.each(function () {
			var $this   = $(this)
			var data    = $this.data('bs.collapse')
			var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

			if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
			if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
			if (typeof option == 'string') data[option]()
		})
	}

	var old = $.fn.collapse

	$.fn.collapse             = Plugin
	$.fn.collapse.Constructor = Collapse


	// COLLAPSE NO CONFLICT
	// ====================

	$.fn.collapse.noConflict = function () {
		$.fn.collapse = old
		return this
	}


	// COLLAPSE DATA-API
	// =================

	$(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
		var $this   = $(this)

		if (!$this.attr('data-target')) e.preventDefault()

		var $target = getTargetFromTrigger($this)
		var data    = $target.data('bs.collapse')
		var option  = data ? 'toggle' : $this.data()

		Plugin.call($target, option)
	})

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
	'use strict';

	// SCROLLSPY CLASS DEFINITION
	// ==========================

	function ScrollSpy(element, options) {
		this.$body          = $(document.body)
		this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
		this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
		this.selector       = (this.options.target || '') + ' .nav li > a'
		this.offsets        = []
		this.targets        = []
		this.activeTarget   = null
		this.scrollHeight   = 0

		this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
		this.refresh()
		this.process()
	}

	ScrollSpy.VERSION  = '3.4.1'

	ScrollSpy.DEFAULTS = {
		offset: 10
	}

	ScrollSpy.prototype.getScrollHeight = function () {
		return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
	}

	ScrollSpy.prototype.refresh = function () {
		var that          = this
		var offsetMethod  = 'offset'
		var offsetBase    = 0

		this.offsets      = []
		this.targets      = []
		this.scrollHeight = this.getScrollHeight()

		if (!$.isWindow(this.$scrollElement[0])) {
			offsetMethod = 'position'
			offsetBase   = this.$scrollElement.scrollTop()
		}

		this.$body
			.find(this.selector)
			.map(function () {
				var $el   = $(this)
				var href  = $el.data('target') || $el.attr('href')
				var $href = /^#./.test(href) && $(href)

				return ($href
					&& $href.length
					&& $href.is(':visible')
					&& [[$href[offsetMethod]().top + offsetBase, href]]) || null
			})
			.sort(function (a, b) { return a[0] - b[0] })
			.each(function () {
				that.offsets.push(this[0])
				that.targets.push(this[1])
			})
	}

	ScrollSpy.prototype.process = function () {
		var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
		var scrollHeight = this.getScrollHeight()
		var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
		var offsets      = this.offsets
		var targets      = this.targets
		var activeTarget = this.activeTarget
		var i

		if (this.scrollHeight != scrollHeight) {
			this.refresh()
		}

		if (scrollTop >= maxScroll) {
			return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
		}

		if (activeTarget && scrollTop < offsets[0]) {
			this.activeTarget = null
			return this.clear()
		}

		for (i = offsets.length; i--;) {
			activeTarget != targets[i]
				&& scrollTop >= offsets[i]
				&& (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
				&& this.activate(targets[i])
		}
	}

	ScrollSpy.prototype.activate = function (target) {
		this.activeTarget = target

		this.clear()

		var selector = this.selector +
			'[data-target="' + target + '"],' +
			this.selector + '[href="' + target + '"]'

		var active = $(selector)
			.parents('li')
			.addClass('active')

		if (active.parent('.dropdown-menu').length) {
			active = active
				.closest('li.dropdown')
				.addClass('active')
		}

		active.trigger('activate.bs.scrollspy')
	}

	ScrollSpy.prototype.clear = function () {
		$(this.selector)
			.parentsUntil(this.options.target, '.active')
			.removeClass('active')
	}


	// SCROLLSPY PLUGIN DEFINITION
	// ===========================

	function Plugin(option) {
		return this.each(function () {
			var $this   = $(this)
			var data    = $this.data('bs.scrollspy')
			var options = typeof option == 'object' && option

			if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
			if (typeof option == 'string') data[option]()
		})
	}

	var old = $.fn.scrollspy

	$.fn.scrollspy             = Plugin
	$.fn.scrollspy.Constructor = ScrollSpy


	// SCROLLSPY NO CONFLICT
	// =====================

	$.fn.scrollspy.noConflict = function () {
		$.fn.scrollspy = old
		return this
	}


	// SCROLLSPY DATA-API
	// ==================

	$(window).on('load.bs.scrollspy.data-api', function () {
		$('[data-spy="scroll"]').each(function () {
			var $spy = $(this)
			Plugin.call($spy, $spy.data())
		})
	})

}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
	'use strict';

	// CSS TRANSITION SUPPORT (Shoutout: https://modernizr.com/)
	// ============================================================

	function transitionEnd() {
		var el = document.createElement('bootstrap')

		var transEndEventNames = {
			WebkitTransition : 'webkitTransitionEnd',
			MozTransition    : 'transitionend',
			OTransition      : 'oTransitionEnd otransitionend',
			transition       : 'transitionend'
		}

		for (var name in transEndEventNames) {
			if (el.style[name] !== undefined) {
				return { end: transEndEventNames[name] }
			}
		}

		return false // explicit for ie8 (  ._.)
	}

	// https://blog.alexmaccaw.com/css-transitions
	$.fn.emulateTransitionEnd = function (duration) {
		var called = false
		var $el = this
		$(this).one('bsTransitionEnd', function () { called = true })
		var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
		setTimeout(callback, duration)
		return this
	}

	$(function () {
		$.support.transition = transitionEnd()

		if (!$.support.transition) return

		$.event.special.bsTransitionEnd = {
			bindType: $.support.transition.end,
			delegateType: $.support.transition.end,
			handle: function (e) {
				if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
			}
		}
	})

}(jQuery);

// HoverForMore.js v1.2.1
// ----------------------
// Author: Luke Dennis
// Website: http://lukifer.github.com/HoverForMore.js
// License: http://opensource.org/licenses/mit-license.php

;(function($, window)
{
	var isjQuery = !!$.fn.jquery;

	var isFirefox = /Firefox/.test(navigator.userAgent);
	var isMobile  = /Mobile/ .test(navigator.userAgent);

	var defaults = {
		"speed": 60.0,
		"gap": 20,
		"loop": true,
		"removeTitle": true,
		"snapback": true,
		"alwaysOn": false,
		"addStyles": true,
		"target": false,
		"startEvent": isMobile ? "touchstart" : (isjQuery ? "mouseenter" : "mouseover"),
		"stopEvent":  isMobile ? "touchend"   : (isjQuery ? "mouseleave" : "mouseout" )
	};


	$.fn['hoverForMore'] = function(options)
	{
		var self = this;
		var head = document.getElementsByTagName('head')[0];
		var originalOverflow, originalOverflowParent, startTime;

		options = $.extend({}, defaults, options);

		var targetSelector = options.target || self.selector;
		
		// Always-on without looping is just silly
		if(options.alwaysOn)
		{
			options.loop = true;
			options.startEvent = "startLooping"; // only triggered programmatically
		}

		// Detect CSS prefix and presence of CSS animation
		var hasAnimation = document.body.style.animationName ? true : false,
			animationString = 'animation',
			transitionString = 'transition',
			transformString = 'transform',
			keyframePrefix = '',
			domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
			pfx  = '';
	
		// Find the CSS prefix, if necessary
		if( hasAnimation === false )
		for( var i = 0; i < domPrefixes.length; i++ )
		{
			if( document.body.style[ domPrefixes[i] + 'AnimationName' ] === undefined )
				continue;
			
			pfx = domPrefixes[ i ];
			animationString = pfx + 'Animation';
			transitionString = pfx + 'Transition';
			transformString = pfx + 'Transform';
			cssPrefix = '-' + pfx.toLowerCase() + '-';
			hasAnimation = true;
			break;
		}

		// Auto-add ellipsis and such
		if(options.addStyles)
		{
			head.appendChild($(
			'<style type="text/css">'
			+	self.selector+'{'
			+		'cursor:default;'
			+		'text-align:left;'
			+		'display:block;'
			+		'overflow:hidden;'
			+		'white-space:nowrap;'
			+		'text-overflow:ellipsis;'
			+		cssPrefix+'user-select: none;'
			+	'}</style>')[0]);
		}
		
		// Non-animation fallback. TODO: Animate with jQuery instead
		if(!hasAnimation)
		{
			// Fallback to title text hover
			$(options.target || self.selector).each(function(n, el)
			{
				var $el = $(el);
				$el.attr("title", $.trim($el.text()));
			});
			return self;
		}
		
		// Keyframes are only used in loop mode
		if(options.loop)
		{
			// Attach global style
			var $keyframeStyle = $('<style type="text/css"></style>');
			var $keyframeStyleReverse = $('<style type="text/css"></style>');
			head.appendChild($keyframeStyle[0]);
			head.appendChild($keyframeStyleReverse[0]);
		}
		
		// For non-loop mode, set an empty transform value (FireFox needs this to transition properly)
		else
		{
			$(self.selector).each(function(n, el)
			{	el.style[transformString] = 'translateX(0px)';
			});
		}
		
		
		// Attach start event
		$(document).on(options.startEvent, targetSelector, function(e)
		{
			startTime = (new Date()).getTime();
		
			// Get hovered item, and ensure that it contains an overflown item
			var $item = $(options.target ? self.selector : this).filter(":first");
			if(!$item.length) return true;

			var $parent = $item.parent();
			var pixelDiff = $item[0].scrollWidth - $item.width();

			if(pixelDiff <= 0) // && !options.alwaysOn // TODO: <marquee> without overflow
				return true;
			
			if(options.removeTitle) $item.removeAttr("title");
			
			// Over-ride the text overflow, and cache the overflow css that we started with
			originalOverflowParent = originalOverflowParent	|| $parent.css("overflow");
			originalOverflow       = originalOverflow       || $item  .css("overflow");
			
			$parent.css("overflow", "hidden");
			if(isMobile && options.addStyles)
				$('body').css(cssPrefix+"user-select", "none");

			$item
				.css("overflow", "visible")
				.addClass("scrolling");
			
			if(options.loop)
			{
				// Remove a previous clone
				$item.children(".hoverForMoreContent").remove();

				// Attach a duplicate string which will allow content to appear wrapped
				var $contentClone = $('<span class="hoverForMoreContent" />')
					.css({"paddingLeft": parseInt(options.gap)+"px"})
					.text($item.text());

				$item.append($contentClone);
				var contentWidth = ($contentClone.width() + parseInt(options.gap));
	
				// Build keyframe string and attach to global style
				var keyframes = '@' + cssPrefix + 'keyframes hoverForMoreSlide { '
				+		'from {' 	+ cssPrefix + 'transform:translateX( 0 ) }'
				+		  'to {' 	+ cssPrefix + 'transform:translateX( -'+contentWidth+'px ) }'
				+	'}';
				$keyframeStyle[0].innerHTML = keyframes;
				
				// Go go gadget animation!
				var sec = contentWidth / parseFloat(options.speed);

				$item[0].style[animationString] = 'hoverForMoreSlide '+sec+'s linear infinite';
			}

			else // if(!options.loop)
			{
				var sec = pixelDiff / parseFloat(options.speed);

				// Apply transition + transform instead of looping
				$item[0].style[transitionString] = cssPrefix+'transform '+sec+'s linear';
				
				// Alas, Firefox won't honor the transition immediately
				if(!isFirefox)
					$item[0].style[transformString] = 'translateX(-'+pixelDiff+'px)';
				
				else setTimeout(function()
				{
					$item[0].style[transformString] = 'translateX(-'+pixelDiff+'px)';
				}, 0);
			}
		});



		// Attach stop event
		if(!options.alwaysOn)
		$(document).on(options.stopEvent, targetSelector, function(e)
		{
			var $item = $(options.target ? self.selector : this).filter(":first");
			if(!$item.length) return true;
		
			if(options.loop)
			{
				if(options.snapback)
				{
					// Reverse our animation
					var contentWidth = $item.children('.hoverForMoreContent').width() + parseInt(options.gap);
					var timeDiff = ((new Date()).getTime() - startTime)*0.001;
					var offsetX = (timeDiff * options.speed) % contentWidth;
					var switchDirection = offsetX > (contentWidth/2);
	
					// Build keyframe string and attach to global style
					var keyframes = '@' + cssPrefix + 'keyframes hoverForMoreSlideReverse { '
					+		'from {' 	+ cssPrefix + 'transform:translateX( '+(0 - offsetX)+'px ) }'
					+		  'to {' 	+ cssPrefix + 'transform:translateX( '
					+									(switchDirection ? 0-contentWidth : 0)+'px ) }'
					+	'}';
					$keyframeStyleReverse[0].innerHTML = keyframes;
	
					var sec = (switchDirection ? contentWidth-offsetX : offsetX) * 0.2 / parseFloat(options.speed);
					$item[0].style[animationString] = 'hoverForMoreSlideReverse '+(sec>1?1:sec)+'s linear';
	
					$item.removeClass("scrolling");
	
					// After animation resolves, restore original overflow setting, and remove the cloned element
					setTimeout(function()
					{
						if($item.is(".scrolling")) return;
						
						$item
							.children(".hoverForMoreContent")
							.remove();
							
						$item.css("overflow", originalOverflow);
						$item.parent().css("overflow", originalOverflowParent);

						if(isMobile && options.addStyles)
							$('body').css(cssPrefix+"user-select", 'text');
					}, (sec * 1000) - -50);
				}
				
				else // if(!options.snapback)
				{
					$item[0].style[animationString] = '';

					$item
						.css("overflow", originalOverflow)
						.find(".hoverForMoreContent")
						.remove();			
							
					$item.parent().css("overflow", originalOverflowParent);

					if(isMobile && options.addStyles)
						$('body').css(cssPrefix+"user-select", 'text');
				}
			}
			
			else // if(!options.loop)
			{
				var timeDiff = ((new Date()).getTime() - startTime) / 1000.0;
				var match = $item[0].style[transitionString].match(/transform (.*)s/);
				var sec = (match && match[1] && parseFloat(match[1]) < timeDiff) ? parseFloat(match[1]) : timeDiff;
				sec *= 0.5;

				if(!options.snapback)
					$item[0].style[transitionString] = '';
				else
					$item[0].style[transitionString] = cssPrefix+'transform '+sec+'s linear';

				$item.removeClass("scrolling")
				
				// Firefox needs a delay for the transition to take effect
				if(!isFirefox)
					$item[0].style[transformString] = 'translateX(0px)';
					
				else setTimeout(function(){
					$item[0].style[transformString] = 'translateX(0px)';
				}, 0);
				
				if(!options.snapback)
				{
					$item.css("overflow", originalOverflow);

					if(isMobile && options.addStyles)
						$('body').css(cssPrefix+"user-select", 'text');
				}

				else // if(options.snapback)
				{
					setTimeout(function()
					{
						if($item.is(".scrolling")) return;
						$item.css("overflow", originalOverflow);

						if(isMobile && options.addStyles)
							$('body').css(cssPrefix+"user-select", 'text');
					}, sec * 1000);
				}
			}
		
		});
		
		
		// To manually refresh active elements when in always-on mode
		self.refresh = function()
		{
			$(self.selector).each(function(n,el)
			{
				$(el).not(".scrolling").trigger(options.startEvent);
			})
		};

		
		// Always-on mode, activate! <marquee>, eat your heart out.
		if(options.alwaysOn)
			self.refresh();
		
		return self;
	};
	
})(window.jQuery || $);

/*!
 * dist/jquery.inputmask
 * https://github.com/RobinHerbots/Inputmask
 * Copyright (c) 2010 - 2020 Robin Herbots
 * Licensed under the MIT license
 * Version: 5.0.5-beta.0
 */
!function webpackUniversalModuleDefinition(root, factory) {
	if ("object" == typeof exports && "object" == typeof module) module.exports = factory(require("jquery")); else if ("function" == typeof define && define.amd) define([ "jquery" ], factory); else {
		var a = "object" == typeof exports ? factory(require("jquery")) : factory(root.jQuery);
		for (var i in a) ("object" == typeof exports ? exports : root)[i] = a[i];
	}
}(window, function(__WEBPACK_EXTERNAL_MODULE__8__) {
	return modules = [ function(module) {
		module.exports = JSON.parse('{"BACKSPACE":8,"BACKSPACE_SAFARI":127,"DELETE":46,"DOWN":40,"END":35,"ENTER":13,"ESCAPE":27,"HOME":36,"INSERT":45,"LEFT":37,"PAGE_DOWN":34,"PAGE_UP":33,"RIGHT":39,"SPACE":32,"TAB":9,"UP":38,"X":88,"CONTROL":17,"KEY_229":229}');
	}, function(module, exports, __webpack_require__) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0, __webpack_require__(9);
		var _mask = __webpack_require__(10), _inputmask = _interopRequireDefault(__webpack_require__(12)), _window = _interopRequireDefault(__webpack_require__(13)), _maskLexer = __webpack_require__(17), _validationTests = __webpack_require__(3), _positioning = __webpack_require__(2), _validation = __webpack_require__(4), _inputHandling = __webpack_require__(5), _eventruler = __webpack_require__(11), _definitions = _interopRequireDefault(__webpack_require__(18)), _defaults = _interopRequireDefault(__webpack_require__(19));
		function _typeof(obj) {
			return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(obj) {
				return typeof obj;
			} : function _typeof(obj) {
				return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
			}, _typeof(obj);
		}
		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : {
				default: obj
			};
		}
		var document = _window.default.document, dataKey = "_inputmask_opts";
		function Inputmask(alias, options, internal) {
			if (!(this instanceof Inputmask)) return new Inputmask(alias, options, internal);
			this.dependencyLib = _inputmask.default, this.el = void 0, this.events = {}, this.maskset = void 0, 
			!0 !== internal && ("[object Object]" === Object.prototype.toString.call(alias) ? options = alias : (options = options || {}, 
			alias && (options.alias = alias)), this.opts = _inputmask.default.extend(!0, {}, this.defaults, options), 
			this.noMasksCache = options && void 0 !== options.definitions, this.userOptions = options || {}, 
			resolveAlias(this.opts.alias, options, this.opts)), this.refreshValue = !1, this.undoValue = void 0, 
			this.$el = void 0, this.skipKeyPressEvent = !1, this.skipInputEvent = !1, this.validationEvent = !1, 
			this.ignorable = !1, this.maxLength, this.mouseEnter = !1, this.originalPlaceholder = void 0, 
			this.isComposing = !1;
		}
		function resolveAlias(aliasStr, options, opts) {
			var aliasDefinition = Inputmask.prototype.aliases[aliasStr];
			return aliasDefinition ? (aliasDefinition.alias && resolveAlias(aliasDefinition.alias, void 0, opts), 
			_inputmask.default.extend(!0, opts, aliasDefinition), _inputmask.default.extend(!0, opts, options), 
			!0) : (null === opts.mask && (opts.mask = aliasStr), !1);
		}
		function importAttributeOptions(npt, opts, userOptions, dataAttribute) {
			function importOption(option, optionData) {
				var attrOption = "" === dataAttribute ? option : dataAttribute + "-" + option;
				optionData = void 0 !== optionData ? optionData : npt.getAttribute(attrOption), 
				null !== optionData && ("string" == typeof optionData && (0 === option.indexOf("on") ? optionData = _window.default[optionData] : "false" === optionData ? optionData = !1 : "true" === optionData && (optionData = !0)), 
				userOptions[option] = optionData);
			}
			if (!0 === opts.importDataAttributes) {
				var attrOptions = npt.getAttribute(dataAttribute), option, dataoptions, optionData, p;
				if (attrOptions && "" !== attrOptions && (attrOptions = attrOptions.replace(/'/g, '"'), 
				dataoptions = JSON.parse("{" + attrOptions + "}")), dataoptions) for (p in optionData = void 0, 
				dataoptions) if ("alias" === p.toLowerCase()) {
					optionData = dataoptions[p];
					break;
				}
				for (option in importOption("alias", optionData), userOptions.alias && resolveAlias(userOptions.alias, userOptions, opts), 
				opts) {
					if (dataoptions) for (p in optionData = void 0, dataoptions) if (p.toLowerCase() === option.toLowerCase()) {
						optionData = dataoptions[p];
						break;
					}
					importOption(option, optionData);
				}
			}
			return _inputmask.default.extend(!0, opts, userOptions), "rtl" !== npt.dir && !opts.rightAlign || (npt.style.textAlign = "right"), 
			"rtl" !== npt.dir && !opts.numericInput || (npt.dir = "ltr", npt.removeAttribute("dir"), 
			opts.isRTL = !0), Object.keys(userOptions).length;
		}
		Inputmask.prototype = {
			dataAttribute: "data-inputmask",
			defaults: _defaults.default,
			definitions: _definitions.default,
			aliases: {},
			masksCache: {},
			get isRTL() {
				return this.opts.isRTL || this.opts.numericInput;
			},
			mask: function mask(elems) {
				var that = this;
				return "string" == typeof elems && (elems = document.getElementById(elems) || document.querySelectorAll(elems)), 
				elems = elems.nodeName ? [ elems ] : elems, elems.forEach(function(el, ndx) {
					var scopedOpts = _inputmask.default.extend(!0, {}, that.opts);
					if (importAttributeOptions(el, scopedOpts, _inputmask.default.extend(!0, {}, that.userOptions), that.dataAttribute)) {
						var maskset = (0, _maskLexer.generateMaskSet)(scopedOpts, that.noMasksCache);
						void 0 !== maskset && (void 0 !== el.inputmask && (el.inputmask.opts.autoUnmask = !0, 
						el.inputmask.remove()), el.inputmask = new Inputmask(void 0, void 0, !0), el.inputmask.opts = scopedOpts, 
						el.inputmask.noMasksCache = that.noMasksCache, el.inputmask.userOptions = _inputmask.default.extend(!0, {}, that.userOptions), 
						el.inputmask.el = el, el.inputmask.$el = (0, _inputmask.default)(el), el.inputmask.maskset = maskset, 
						_inputmask.default.data(el, dataKey, that.userOptions), _mask.mask.call(el.inputmask));
					}
				}), elems && elems[0] && elems[0].inputmask || this;
			},
			option: function option(options, noremask) {
				return "string" == typeof options ? this.opts[options] : "object" === _typeof(options) ? (_inputmask.default.extend(this.userOptions, options), 
				this.el && !0 !== noremask && this.mask(this.el), this) : void 0;
			},
			unmaskedvalue: function unmaskedvalue(value) {
				if (this.maskset = this.maskset || (0, _maskLexer.generateMaskSet)(this.opts, this.noMasksCache), 
				void 0 === this.el || void 0 !== value) {
					var valueBuffer = ("function" == typeof this.opts.onBeforeMask && this.opts.onBeforeMask.call(this, value, this.opts) || value).split("");
					_inputHandling.checkVal.call(this, void 0, !1, !1, valueBuffer), "function" == typeof this.opts.onBeforeWrite && this.opts.onBeforeWrite.call(this, void 0, _positioning.getBuffer.call(this), 0, this.opts);
				}
				return _inputHandling.unmaskedvalue.call(this, this.el);
			},
			remove: function remove() {
				if (this.el) {
					_inputmask.default.data(this.el, dataKey, null);
					var cv = this.opts.autoUnmask ? (0, _inputHandling.unmaskedvalue)(this.el) : this._valueGet(this.opts.autoUnmask), valueProperty;
					cv !== _positioning.getBufferTemplate.call(this).join("") ? this._valueSet(cv, this.opts.autoUnmask) : this._valueSet(""), 
					_eventruler.EventRuler.off(this.el), Object.getOwnPropertyDescriptor && Object.getPrototypeOf ? (valueProperty = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this.el), "value"), 
					valueProperty && this.__valueGet && Object.defineProperty(this.el, "value", {
						get: this.__valueGet,
						set: this.__valueSet,
						configurable: !0
					})) : document.__lookupGetter__ && this.el.__lookupGetter__("value") && this.__valueGet && (this.el.__defineGetter__("value", this.__valueGet), 
					this.el.__defineSetter__("value", this.__valueSet)), this.el.inputmask = void 0;
				}
				return this.el;
			},
			getemptymask: function getemptymask() {
				return this.maskset = this.maskset || (0, _maskLexer.generateMaskSet)(this.opts, this.noMasksCache), 
				_positioning.getBufferTemplate.call(this).join("");
			},
			hasMaskedValue: function hasMaskedValue() {
				return !this.opts.autoUnmask;
			},
			isComplete: function isComplete() {
				return this.maskset = this.maskset || (0, _maskLexer.generateMaskSet)(this.opts, this.noMasksCache), 
				_validation.isComplete.call(this, _positioning.getBuffer.call(this));
			},
			getmetadata: function getmetadata() {
				if (this.maskset = this.maskset || (0, _maskLexer.generateMaskSet)(this.opts, this.noMasksCache), 
				Array.isArray(this.maskset.metadata)) {
					var maskTarget = _validationTests.getMaskTemplate.call(this, !0, 0, !1).join("");
					return this.maskset.metadata.forEach(function(mtdt) {
						return mtdt.mask !== maskTarget || (maskTarget = mtdt, !1);
					}), maskTarget;
				}
				return this.maskset.metadata;
			},
			isValid: function isValid(value) {
				if (this.maskset = this.maskset || (0, _maskLexer.generateMaskSet)(this.opts, this.noMasksCache), 
				value) {
					var valueBuffer = ("function" == typeof this.opts.onBeforeMask && this.opts.onBeforeMask.call(this, value, this.opts) || value).split("");
					_inputHandling.checkVal.call(this, void 0, !0, !1, valueBuffer);
				} else value = this.isRTL ? _positioning.getBuffer.call(this).slice().reverse().join("") : _positioning.getBuffer.call(this).join("");
				for (var buffer = _positioning.getBuffer.call(this), rl = _positioning.determineLastRequiredPosition.call(this), lmib = buffer.length - 1; rl < lmib && !_positioning.isMask.call(this, lmib); lmib--) ;
				return buffer.splice(rl, lmib + 1 - rl), _validation.isComplete.call(this, buffer) && value === (this.isRTL ? _positioning.getBuffer.call(this).slice().reverse().join("") : _positioning.getBuffer.call(this).join(""));
			},
			format: function format(value, metadata) {
				this.maskset = this.maskset || (0, _maskLexer.generateMaskSet)(this.opts, this.noMasksCache);
				var valueBuffer = ("function" == typeof this.opts.onBeforeMask && this.opts.onBeforeMask.call(this, value, this.opts) || value).split("");
				_inputHandling.checkVal.call(this, void 0, !0, !1, valueBuffer);
				var formattedValue = this.isRTL ? _positioning.getBuffer.call(this).slice().reverse().join("") : _positioning.getBuffer.call(this).join("");
				return metadata ? {
					value: formattedValue,
					metadata: this.getmetadata()
				} : formattedValue;
			},
			setValue: function setValue(value) {
				this.el && (0, _inputmask.default)(this.el).trigger("setvalue", [ value ]);
			},
			analyseMask: _maskLexer.analyseMask
		}, Inputmask.extendDefaults = function(options) {
			_inputmask.default.extend(!0, Inputmask.prototype.defaults, options);
		}, Inputmask.extendDefinitions = function(definition) {
			_inputmask.default.extend(!0, Inputmask.prototype.definitions, definition);
		}, Inputmask.extendAliases = function(alias) {
			_inputmask.default.extend(!0, Inputmask.prototype.aliases, alias);
		}, Inputmask.format = function(value, options, metadata) {
			return Inputmask(options).format(value, metadata);
		}, Inputmask.unmask = function(value, options) {
			return Inputmask(options).unmaskedvalue(value);
		}, Inputmask.isValid = function(value, options) {
			return Inputmask(options).isValid(value);
		}, Inputmask.remove = function(elems) {
			"string" == typeof elems && (elems = document.getElementById(elems) || document.querySelectorAll(elems)), 
			elems = elems.nodeName ? [ elems ] : elems, elems.forEach(function(el) {
				el.inputmask && el.inputmask.remove();
			});
		}, Inputmask.setValue = function(elems, value) {
			"string" == typeof elems && (elems = document.getElementById(elems) || document.querySelectorAll(elems)), 
			elems = elems.nodeName ? [ elems ] : elems, elems.forEach(function(el) {
				el.inputmask ? el.inputmask.setValue(value) : (0, _inputmask.default)(el).trigger("setvalue", [ value ]);
			});
		}, Inputmask.dependencyLib = _inputmask.default, _window.default.Inputmask = Inputmask;
		var _default = Inputmask;
		exports.default = _default;
	}, function(module, exports, __webpack_require__) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.caret = caret, exports.determineLastRequiredPosition = determineLastRequiredPosition, 
		exports.determineNewCaretPosition = determineNewCaretPosition, exports.getBuffer = getBuffer, 
		exports.getBufferTemplate = getBufferTemplate, exports.getLastValidPosition = getLastValidPosition, 
		exports.isMask = isMask, exports.resetMaskSet = resetMaskSet, exports.seekNext = seekNext, 
		exports.seekPrevious = seekPrevious, exports.translatePosition = translatePosition;
		var _validationTests = __webpack_require__(3), _validation = __webpack_require__(4), _mask = __webpack_require__(10);
		function caret(input, begin, end, notranslate, isDelete) {
			var inputmask = this, opts = this.opts, range;
			if (void 0 === begin) return "selectionStart" in input && "selectionEnd" in input ? (begin = input.selectionStart, 
			end = input.selectionEnd) : window.getSelection ? (range = window.getSelection().getRangeAt(0), 
			range.commonAncestorContainer.parentNode !== input && range.commonAncestorContainer !== input || (begin = range.startOffset, 
			end = range.endOffset)) : document.selection && document.selection.createRange && (range = document.selection.createRange(), 
			begin = 0 - range.duplicate().moveStart("character", -input.inputmask._valueGet().length), 
			end = begin + range.text.length), {
				begin: notranslate ? begin : translatePosition.call(this, begin),
				end: notranslate ? end : translatePosition.call(this, end)
			};
			if (Array.isArray(begin) && (end = this.isRTL ? begin[0] : begin[1], begin = this.isRTL ? begin[1] : begin[0]), 
			void 0 !== begin.begin && (end = this.isRTL ? begin.begin : begin.end, begin = this.isRTL ? begin.end : begin.begin), 
			"number" == typeof begin) {
				begin = notranslate ? begin : translatePosition.call(this, begin), end = notranslate ? end : translatePosition.call(this, end), 
				end = "number" == typeof end ? end : begin;
				var scrollCalc = parseInt(((input.ownerDocument.defaultView || window).getComputedStyle ? (input.ownerDocument.defaultView || window).getComputedStyle(input, null) : input.currentStyle).fontSize) * end;
				if (input.scrollLeft = scrollCalc > input.scrollWidth ? scrollCalc : 0, input.inputmask.caretPos = {
					begin: begin,
					end: end
				}, opts.insertModeVisual && !1 === opts.insertMode && begin === end && (isDelete || end++), 
				input === (input.inputmask.shadowRoot || document).activeElement) if ("setSelectionRange" in input) input.setSelectionRange(begin, end); else if (window.getSelection) {
					if (range = document.createRange(), void 0 === input.firstChild || null === input.firstChild) {
						var textNode = document.createTextNode("");
						input.appendChild(textNode);
					}
					range.setStart(input.firstChild, begin < input.inputmask._valueGet().length ? begin : input.inputmask._valueGet().length), 
					range.setEnd(input.firstChild, end < input.inputmask._valueGet().length ? end : input.inputmask._valueGet().length), 
					range.collapse(!0);
					var sel = window.getSelection();
					sel.removeAllRanges(), sel.addRange(range);
				} else input.createTextRange && (range = input.createTextRange(), range.collapse(!0), 
				range.moveEnd("character", end), range.moveStart("character", begin), range.select());
			}
		}
		function determineLastRequiredPosition(returnDefinition) {
			var inputmask = this, maskset = this.maskset, $ = this.dependencyLib, buffer = _validationTests.getMaskTemplate.call(this, !0, getLastValidPosition.call(this), !0, !0), bl = buffer.length, pos, lvp = getLastValidPosition.call(this), positions = {}, lvTest = maskset.validPositions[lvp], ndxIntlzr = void 0 !== lvTest ? lvTest.locator.slice() : void 0, testPos;
			for (pos = lvp + 1; pos < buffer.length; pos++) testPos = _validationTests.getTestTemplate.call(this, pos, ndxIntlzr, pos - 1), 
			ndxIntlzr = testPos.locator.slice(), positions[pos] = $.extend(!0, {}, testPos);
			var lvTestAlt = lvTest && void 0 !== lvTest.alternation ? lvTest.locator[lvTest.alternation] : void 0;
			for (pos = bl - 1; lvp < pos && (testPos = positions[pos], (testPos.match.optionality || testPos.match.optionalQuantifier && testPos.match.newBlockMarker || lvTestAlt && (lvTestAlt !== positions[pos].locator[lvTest.alternation] && 1 != testPos.match.static || !0 === testPos.match.static && testPos.locator[lvTest.alternation] && _validation.checkAlternationMatch.call(this, testPos.locator[lvTest.alternation].toString().split(","), lvTestAlt.toString().split(",")) && "" !== _validationTests.getTests.call(this, pos)[0].def)) && buffer[pos] === _validationTests.getPlaceholder.call(this, pos, testPos.match)); pos--) bl--;
			return returnDefinition ? {
				l: bl,
				def: positions[bl] ? positions[bl].match : void 0
			} : bl;
		}
		function determineNewCaretPosition(selectedCaret, tabbed) {
			var inputmask = this, maskset = this.maskset, opts = this.opts;
			function doRadixFocus(clickPos) {
				if ("" !== opts.radixPoint && 0 !== opts.digits) {
					var vps = maskset.validPositions;
					if (void 0 === vps[clickPos] || vps[clickPos].input === _validationTests.getPlaceholder.call(inputmask, clickPos)) {
						if (clickPos < seekNext.call(inputmask, -1)) return !0;
						var radixPos = getBuffer.call(inputmask).indexOf(opts.radixPoint);
						if (-1 !== radixPos) {
							for (var vp in vps) if (vps[vp] && radixPos < vp && vps[vp].input !== _validationTests.getPlaceholder.call(inputmask, vp)) return !1;
							return !0;
						}
					}
				}
				return !1;
			}
			if (tabbed && (inputmask.isRTL ? selectedCaret.end = selectedCaret.begin : selectedCaret.begin = selectedCaret.end), 
			selectedCaret.begin === selectedCaret.end) {
				switch (opts.positionCaretOnClick) {
				  case "none":
					break;

				  case "select":
					selectedCaret = {
						begin: 0,
						end: getBuffer.call(inputmask).length
					};
					break;

				  case "ignore":
					selectedCaret.end = selectedCaret.begin = seekNext.call(inputmask, getLastValidPosition.call(inputmask));
					break;

				  case "radixFocus":
					if (doRadixFocus(selectedCaret.begin)) {
						var radixPos = getBuffer.call(inputmask).join("").indexOf(opts.radixPoint);
						selectedCaret.end = selectedCaret.begin = opts.numericInput ? seekNext.call(inputmask, radixPos) : radixPos;
						break;
					}

				  default:
					var clickPosition = selectedCaret.begin, lvclickPosition = getLastValidPosition.call(inputmask, clickPosition, !0), lastPosition = seekNext.call(inputmask, -1 !== lvclickPosition || isMask.call(inputmask, 0) ? lvclickPosition : -1);
					if (clickPosition <= lastPosition) selectedCaret.end = selectedCaret.begin = isMask.call(inputmask, clickPosition, !1, !0) ? clickPosition : seekNext.call(inputmask, clickPosition); else {
						var lvp = maskset.validPositions[lvclickPosition], tt = _validationTests.getTestTemplate.call(inputmask, lastPosition, lvp ? lvp.match.locator : void 0, lvp), placeholder = _validationTests.getPlaceholder.call(inputmask, lastPosition, tt.match);
						if ("" !== placeholder && getBuffer.call(inputmask)[lastPosition] !== placeholder && !0 !== tt.match.optionalQuantifier && !0 !== tt.match.newBlockMarker || !isMask.call(inputmask, lastPosition, opts.keepStatic, !0) && tt.match.def === placeholder) {
							var newPos = seekNext.call(inputmask, lastPosition);
							(newPos <= clickPosition || clickPosition === lastPosition) && (lastPosition = newPos);
						}
						selectedCaret.end = selectedCaret.begin = lastPosition;
					}
				}
				return selectedCaret;
			}
		}
		function getBuffer(noCache) {
			var inputmask = this, maskset = this.maskset;
			return void 0 !== maskset.buffer && !0 !== noCache || (maskset.buffer = _validationTests.getMaskTemplate.call(this, !0, getLastValidPosition.call(this), !0), 
			void 0 === maskset._buffer && (maskset._buffer = maskset.buffer.slice())), maskset.buffer;
		}
		function getBufferTemplate() {
			var inputmask = this, maskset = this.maskset;
			return void 0 === maskset._buffer && (maskset._buffer = _validationTests.getMaskTemplate.call(this, !1, 1), 
			void 0 === maskset.buffer && (maskset.buffer = maskset._buffer.slice())), maskset._buffer;
		}
		function getLastValidPosition(closestTo, strict, validPositions) {
			var maskset = this.maskset, before = -1, after = -1, valids = validPositions || maskset.validPositions;
			for (var posNdx in void 0 === closestTo && (closestTo = -1), valids) {
				var psNdx = parseInt(posNdx);
				valids[psNdx] && (strict || !0 !== valids[psNdx].generatedInput) && (psNdx <= closestTo && (before = psNdx), 
				closestTo <= psNdx && (after = psNdx));
			}
			return -1 === before || before == closestTo ? after : -1 == after ? before : closestTo - before < after - closestTo ? before : after;
		}
		function isMask(pos, strict, fuzzy) {
			var inputmask = this, maskset = this.maskset, test = _validationTests.getTestTemplate.call(this, pos).match;
			if ("" === test.def && (test = _validationTests.getTest.call(this, pos).match), 
			!0 !== test.static) return test.fn;
			if (!0 === fuzzy && void 0 !== maskset.validPositions[pos] && !0 !== maskset.validPositions[pos].generatedInput) return !0;
			if (!0 !== strict && -1 < pos) {
				if (fuzzy) {
					var tests = _validationTests.getTests.call(this, pos);
					return tests.length > 1 + ("" === tests[tests.length - 1].match.def ? 1 : 0);
				}
				var testTemplate = _validationTests.determineTestTemplate.call(this, pos, _validationTests.getTests.call(this, pos)), testPlaceHolder = _validationTests.getPlaceholder.call(this, pos, testTemplate.match);
				return testTemplate.match.def !== testPlaceHolder;
			}
			return !1;
		}
		function resetMaskSet(soft) {
			var maskset = this.maskset;
			maskset.buffer = void 0, !0 !== soft && (maskset.validPositions = {}, maskset.p = 0);
		}
		function seekNext(pos, newBlock, fuzzy) {
			var inputmask = this;
			void 0 === fuzzy && (fuzzy = !0);
			for (var position = pos + 1; "" !== _validationTests.getTest.call(this, position).match.def && (!0 === newBlock && (!0 !== _validationTests.getTest.call(this, position).match.newBlockMarker || !isMask.call(this, position, void 0, !0)) || !0 !== newBlock && !isMask.call(this, position, void 0, fuzzy)); ) position++;
			return position;
		}
		function seekPrevious(pos, newBlock) {
			var inputmask = this, position = pos - 1;
			if (pos <= 0) return 0;
			for (;0 < position && (!0 === newBlock && (!0 !== _validationTests.getTest.call(this, position).match.newBlockMarker || !isMask.call(this, position, void 0, !0)) || !0 !== newBlock && !isMask.call(this, position, void 0, !0)); ) position--;
			return position;
		}
		function translatePosition(pos) {
			var inputmask = this, opts = this.opts, el = this.el;
			return !this.isRTL || "number" != typeof pos || opts.greedy && "" === opts.placeholder || !el || (pos = this._valueGet().length - pos), 
			pos;
		}
	}, function(module, exports, __webpack_require__) {
		"use strict";
		function getLocator(tst, align) {
			var locator = (null != tst.alternation ? tst.mloc[getDecisionTaker(tst)] : tst.locator).join("");
			if ("" !== locator) for (;locator.length < align; ) locator += "0";
			return locator;
		}
		function getDecisionTaker(tst) {
			var decisionTaker = tst.locator[tst.alternation];
			return "string" == typeof decisionTaker && 0 < decisionTaker.length && (decisionTaker = decisionTaker.split(",")[0]), 
			void 0 !== decisionTaker ? decisionTaker.toString() : "";
		}
		function getPlaceholder(pos, test, returnPL) {
			var inputmask = this, opts = this.opts, maskset = this.maskset;
			if (test = test || getTest.call(this, pos).match, void 0 !== test.placeholder || !0 === returnPL) return "function" == typeof test.placeholder ? test.placeholder(opts) : test.placeholder;
			if (!0 !== test.static) return opts.placeholder.charAt(pos % opts.placeholder.length);
			if (-1 < pos && void 0 === maskset.validPositions[pos]) {
				var tests = getTests.call(this, pos), staticAlternations = [], prevTest;
				if (tests.length > 1 + ("" === tests[tests.length - 1].match.def ? 1 : 0)) for (var i = 0; i < tests.length; i++) if ("" !== tests[i].match.def && !0 !== tests[i].match.optionality && !0 !== tests[i].match.optionalQuantifier && (!0 === tests[i].match.static || void 0 === prevTest || !1 !== tests[i].match.fn.test(prevTest.match.def, maskset, pos, !0, opts)) && (staticAlternations.push(tests[i]), 
				!0 === tests[i].match.static && (prevTest = tests[i]), 1 < staticAlternations.length && /[0-9a-bA-Z]/.test(staticAlternations[0].match.def))) return opts.placeholder.charAt(pos % opts.placeholder.length);
			}
			return test.def;
		}
		function getMaskTemplate(baseOnInput, minimalPos, includeMode, noJit, clearOptionalTail) {
			var inputmask = this, opts = this.opts, maskset = this.maskset, greedy = opts.greedy;
			clearOptionalTail && (opts.greedy = !1), minimalPos = minimalPos || 0;
			var maskTemplate = [], ndxIntlzr, pos = 0, test, testPos, jitRenderStatic;
			do {
				if (!0 === baseOnInput && maskset.validPositions[pos]) testPos = clearOptionalTail && !0 === maskset.validPositions[pos].match.optionality && void 0 === maskset.validPositions[pos + 1] && (!0 === maskset.validPositions[pos].generatedInput || maskset.validPositions[pos].input == opts.skipOptionalPartCharacter && 0 < pos) ? determineTestTemplate.call(this, pos, getTests.call(this, pos, ndxIntlzr, pos - 1)) : maskset.validPositions[pos], 
				test = testPos.match, ndxIntlzr = testPos.locator.slice(), maskTemplate.push(!0 === includeMode ? testPos.input : !1 === includeMode ? test.nativeDef : getPlaceholder.call(this, pos, test)); else {
					testPos = getTestTemplate.call(this, pos, ndxIntlzr, pos - 1), test = testPos.match, 
					ndxIntlzr = testPos.locator.slice();
					var jitMasking = !0 !== noJit && (!1 !== opts.jitMasking ? opts.jitMasking : test.jit);
					jitRenderStatic = jitRenderStatic && test.static && test.def !== opts.groupSeparator && null === test.fn || maskset.validPositions[pos - 1] && test.static && test.def !== opts.groupSeparator && null === test.fn, 
					jitRenderStatic || !1 === jitMasking || void 0 === jitMasking || "number" == typeof jitMasking && isFinite(jitMasking) && pos < jitMasking ? maskTemplate.push(!1 === includeMode ? test.nativeDef : getPlaceholder.call(this, pos, test)) : jitRenderStatic = !1;
				}
				pos++;
			} while ((void 0 === this.maxLength || pos < this.maxLength) && (!0 !== test.static || "" !== test.def) || pos < minimalPos);
			return "" === maskTemplate[maskTemplate.length - 1] && maskTemplate.pop(), !1 === includeMode && void 0 !== maskset.maskLength || (maskset.maskLength = pos - 1), 
			opts.greedy = greedy, maskTemplate;
		}
		function getTestTemplate(pos, ndxIntlzr, tstPs) {
			var inputmask = this, maskset = this.maskset;
			return maskset.validPositions[pos] || determineTestTemplate.call(this, pos, getTests.call(this, pos, ndxIntlzr ? ndxIntlzr.slice() : ndxIntlzr, tstPs));
		}
		function determineTestTemplate(pos, tests) {
			var inputmask = this, opts = this.opts;
			pos = 0 < pos ? pos - 1 : 0;
			for (var altTest = getTest.call(this, pos), targetLocator = getLocator(altTest), tstLocator, closest, bestMatch, ndx = 0; ndx < tests.length; ndx++) {
				var tst = tests[ndx];
				tstLocator = getLocator(tst, targetLocator.length);
				var distance = Math.abs(tstLocator - targetLocator);
				(void 0 === closest || "" !== tstLocator && distance < closest || bestMatch && !opts.greedy && bestMatch.match.optionality && "master" === bestMatch.match.newBlockMarker && (!tst.match.optionality || !tst.match.newBlockMarker) || bestMatch && bestMatch.match.optionalQuantifier && !tst.match.optionalQuantifier) && (closest = distance, 
				bestMatch = tst);
			}
			return bestMatch;
		}
		function getTest(pos, tests) {
			var inputmask = this, maskset = this.maskset;
			return maskset.validPositions[pos] ? maskset.validPositions[pos] : (tests || getTests.call(this, pos))[0];
		}
		function getTests(pos, ndxIntlzr, tstPs) {
			var inputmask = this, $ = this.dependencyLib, maskset = this.maskset, opts = this.opts, el = this.el, maskTokens = maskset.maskToken, testPos = ndxIntlzr ? tstPs : 0, ndxInitializer = ndxIntlzr ? ndxIntlzr.slice() : [ 0 ], matches = [], insertStop = !1, latestMatch, cacheDependency = ndxIntlzr ? ndxIntlzr.join("") : "";
			function resolveTestFromToken(maskToken, ndxInitializer, loopNdx, quantifierRecurse) {
				function handleMatch(match, loopNdx, quantifierRecurse) {
					function isFirstMatch(latestMatch, tokenGroup) {
						var firstMatch = 0 === tokenGroup.matches.indexOf(latestMatch);
						return firstMatch || tokenGroup.matches.every(function(match, ndx) {
							return !0 === match.isQuantifier ? firstMatch = isFirstMatch(latestMatch, tokenGroup.matches[ndx - 1]) : Object.prototype.hasOwnProperty.call(match, "matches") && (firstMatch = isFirstMatch(latestMatch, match)), 
							!firstMatch;
						}), firstMatch;
					}
					function resolveNdxInitializer(pos, alternateNdx, targetAlternation) {
						var bestMatch, indexPos;
						if ((maskset.tests[pos] || maskset.validPositions[pos]) && (maskset.tests[pos] || [ maskset.validPositions[pos] ]).every(function(lmnt, ndx) {
							if (lmnt.mloc[alternateNdx]) return bestMatch = lmnt, !1;
							var alternation = void 0 !== targetAlternation ? targetAlternation : lmnt.alternation, ndxPos = void 0 !== lmnt.locator[alternation] ? lmnt.locator[alternation].toString().indexOf(alternateNdx) : -1;
							return (void 0 === indexPos || ndxPos < indexPos) && -1 !== ndxPos && (bestMatch = lmnt, 
							indexPos = ndxPos), !0;
						}), bestMatch) {
							var bestMatchAltIndex = bestMatch.locator[bestMatch.alternation], locator = bestMatch.mloc[alternateNdx] || bestMatch.mloc[bestMatchAltIndex] || bestMatch.locator;
							return locator.slice((void 0 !== targetAlternation ? targetAlternation : bestMatch.alternation) + 1);
						}
						return void 0 !== targetAlternation ? resolveNdxInitializer(pos, alternateNdx) : void 0;
					}
					function isSubsetOf(source, target) {
						function expand(pattern) {
							for (var expanded = [], start = -1, end, i = 0, l = pattern.length; i < l; i++) if ("-" === pattern.charAt(i)) for (end = pattern.charCodeAt(i + 1); ++start < end; ) expanded.push(String.fromCharCode(start)); else start = pattern.charCodeAt(i), 
							expanded.push(pattern.charAt(i));
							return expanded.join("");
						}
						return source.match.def === target.match.nativeDef || !(!(opts.regex || source.match.fn instanceof RegExp && target.match.fn instanceof RegExp) || !0 === source.match.static || !0 === target.match.static) && -1 !== expand(target.match.fn.toString().replace(/[[\]/]/g, "")).indexOf(expand(source.match.fn.toString().replace(/[[\]/]/g, "")));
					}
					function staticCanMatchDefinition(source, target) {
						return !0 === source.match.static && !0 !== target.match.static && target.match.fn.test(source.match.def, maskset, pos, !1, opts, !1);
					}
					function setMergeLocators(targetMatch, altMatch) {
						var alternationNdx = targetMatch.alternation, shouldMerge = void 0 === altMatch || alternationNdx === altMatch.alternation && -1 === targetMatch.locator[alternationNdx].toString().indexOf(altMatch.locator[alternationNdx]);
						if (!shouldMerge && alternationNdx > altMatch.alternation) for (var i = altMatch.alternation; i < alternationNdx; i++) if (targetMatch.locator[i] !== altMatch.locator[i]) {
							alternationNdx = i, shouldMerge = !0;
							break;
						}
						if (shouldMerge) {
							targetMatch.mloc = targetMatch.mloc || {};
							var locNdx = targetMatch.locator[alternationNdx];
							if (void 0 !== locNdx) {
								if ("string" == typeof locNdx && (locNdx = locNdx.split(",")[0]), void 0 === targetMatch.mloc[locNdx] && (targetMatch.mloc[locNdx] = targetMatch.locator.slice()), 
								void 0 !== altMatch) {
									for (var ndx in altMatch.mloc) "string" == typeof ndx && (ndx = ndx.split(",")[0]), 
									void 0 === targetMatch.mloc[ndx] && (targetMatch.mloc[ndx] = altMatch.mloc[ndx]);
									targetMatch.locator[alternationNdx] = Object.keys(targetMatch.mloc).join(",");
								}
								return !0;
							}
							targetMatch.alternation = void 0;
						}
						return !1;
					}
					function isSameLevel(targetMatch, altMatch) {
						if (targetMatch.locator.length !== altMatch.locator.length) return !1;
						for (var locNdx = targetMatch.alternation + 1; locNdx < targetMatch.locator.length; locNdx++) if (targetMatch.locator[locNdx] !== altMatch.locator[locNdx]) return !1;
						return !0;
					}
					if (testPos > pos + opts._maxTestPos) throw "Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + maskset.mask;
					if (testPos === pos && void 0 === match.matches) return matches.push({
						match: match,
						locator: loopNdx.reverse(),
						cd: cacheDependency,
						mloc: {}
					}), !0;
					if (void 0 !== match.matches) {
						if (match.isGroup && quantifierRecurse !== match) {
							if (match = handleMatch(maskToken.matches[maskToken.matches.indexOf(match) + 1], loopNdx, quantifierRecurse), 
							match) return !0;
						} else if (match.isOptional) {
							var optionalToken = match, mtchsNdx = matches.length;
							if (match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse), 
							match) {
								if (matches.forEach(function(mtch, ndx) {
									mtchsNdx <= ndx && (mtch.match.optionality = !0);
								}), latestMatch = matches[matches.length - 1].match, void 0 !== quantifierRecurse || !isFirstMatch(latestMatch, optionalToken)) return !0;
								insertStop = !0, testPos = pos;
							}
						} else if (match.isAlternator) {
							var alternateToken = match, malternateMatches = [], maltMatches, currentMatches = matches.slice(), loopNdxCnt = loopNdx.length, altIndex = 0 < ndxInitializer.length ? ndxInitializer.shift() : -1;
							if (-1 === altIndex || "string" == typeof altIndex) {
								var currentPos = testPos, ndxInitializerClone = ndxInitializer.slice(), altIndexArr = [], amndx;
								if ("string" == typeof altIndex) altIndexArr = altIndex.split(","); else for (amndx = 0; amndx < alternateToken.matches.length; amndx++) altIndexArr.push(amndx.toString());
								if (void 0 !== maskset.excludes[pos]) {
									for (var altIndexArrClone = altIndexArr.slice(), i = 0, exl = maskset.excludes[pos].length; i < exl; i++) {
										var excludeSet = maskset.excludes[pos][i].toString().split(":");
										loopNdx.length == excludeSet[1] && altIndexArr.splice(altIndexArr.indexOf(excludeSet[0]), 1);
									}
									0 === altIndexArr.length && (delete maskset.excludes[pos], altIndexArr = altIndexArrClone);
								}
								(!0 === opts.keepStatic || isFinite(parseInt(opts.keepStatic)) && currentPos >= opts.keepStatic) && (altIndexArr = altIndexArr.slice(0, 1));
								for (var unMatchedAlternation = !1, ndx = 0; ndx < altIndexArr.length; ndx++) {
									amndx = parseInt(altIndexArr[ndx]), matches = [], ndxInitializer = "string" == typeof altIndex && resolveNdxInitializer(testPos, amndx, loopNdxCnt) || ndxInitializerClone.slice(), 
									alternateToken.matches[amndx] && handleMatch(alternateToken.matches[amndx], [ amndx ].concat(loopNdx), quantifierRecurse) ? match = !0 : 0 === ndx && (unMatchedAlternation = !0), 
									maltMatches = matches.slice(), testPos = currentPos, matches = [];
									for (var ndx1 = 0; ndx1 < maltMatches.length; ndx1++) {
										var altMatch = maltMatches[ndx1], dropMatch = !1;
										altMatch.match.jit = altMatch.match.jit || unMatchedAlternation, altMatch.alternation = altMatch.alternation || loopNdxCnt, 
										setMergeLocators(altMatch);
										for (var ndx2 = 0; ndx2 < malternateMatches.length; ndx2++) {
											var altMatch2 = malternateMatches[ndx2];
											if ("string" != typeof altIndex || void 0 !== altMatch.alternation && altIndexArr.includes(altMatch.locator[altMatch.alternation].toString())) {
												if (altMatch.match.nativeDef === altMatch2.match.nativeDef) {
													dropMatch = !0, setMergeLocators(altMatch2, altMatch);
													break;
												}
												if (isSubsetOf(altMatch, altMatch2)) {
													setMergeLocators(altMatch, altMatch2) && (dropMatch = !0, malternateMatches.splice(malternateMatches.indexOf(altMatch2), 0, altMatch));
													break;
												}
												if (isSubsetOf(altMatch2, altMatch)) {
													setMergeLocators(altMatch2, altMatch);
													break;
												}
												if (staticCanMatchDefinition(altMatch, altMatch2)) {
													isSameLevel(altMatch, altMatch2) || void 0 !== el.inputmask.userOptions.keepStatic ? setMergeLocators(altMatch, altMatch2) && (dropMatch = !0, 
													malternateMatches.splice(malternateMatches.indexOf(altMatch2), 0, altMatch)) : opts.keepStatic = !0;
													break;
												}
											}
										}
										dropMatch || malternateMatches.push(altMatch);
									}
								}
								matches = currentMatches.concat(malternateMatches), testPos = pos, insertStop = 0 < matches.length, 
								match = 0 < malternateMatches.length, ndxInitializer = ndxInitializerClone.slice();
							} else match = handleMatch(alternateToken.matches[altIndex] || maskToken.matches[altIndex], [ altIndex ].concat(loopNdx), quantifierRecurse);
							if (match) return !0;
						} else if (match.isQuantifier && quantifierRecurse !== maskToken.matches[maskToken.matches.indexOf(match) - 1]) for (var qt = match, qndx = 0 < ndxInitializer.length ? ndxInitializer.shift() : 0; qndx < (isNaN(qt.quantifier.max) ? qndx + 1 : qt.quantifier.max) && testPos <= pos; qndx++) {
							var tokenGroup = maskToken.matches[maskToken.matches.indexOf(qt) - 1];
							if (match = handleMatch(tokenGroup, [ qndx ].concat(loopNdx), tokenGroup), match) {
								if (latestMatch = matches[matches.length - 1].match, latestMatch.optionalQuantifier = qndx >= qt.quantifier.min, 
								latestMatch.jit = (qndx || 1) * tokenGroup.matches.indexOf(latestMatch) >= qt.quantifier.jit, 
								latestMatch.optionalQuantifier && isFirstMatch(latestMatch, tokenGroup)) {
									insertStop = !0, testPos = pos;
									break;
								}
								return latestMatch.jit && (maskset.jitOffset[pos] = tokenGroup.matches.length - tokenGroup.matches.indexOf(latestMatch)), 
								!0;
							}
						} else if (match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse), 
						match) return !0;
					} else testPos++;
				}
				for (var tndx = 0 < ndxInitializer.length ? ndxInitializer.shift() : 0; tndx < maskToken.matches.length; tndx++) if (!0 !== maskToken.matches[tndx].isQuantifier) {
					var match = handleMatch(maskToken.matches[tndx], [ tndx ].concat(loopNdx), quantifierRecurse);
					if (match && testPos === pos) return match;
					if (pos < testPos) break;
				}
			}
			function mergeLocators(pos, tests) {
				var locator = [], alternation;
				return Array.isArray(tests) || (tests = [ tests ]), 0 < tests.length && (void 0 === tests[0].alternation || !0 === opts.keepStatic ? (locator = determineTestTemplate.call(inputmask, pos, tests.slice()).locator.slice(), 
				0 === locator.length && (locator = tests[0].locator.slice())) : tests.forEach(function(tst) {
					"" !== tst.def && (0 === locator.length ? (alternation = tst.alternation, locator = tst.locator.slice()) : tst.locator[alternation] && -1 === locator[alternation].toString().indexOf(tst.locator[alternation]) && (locator[alternation] += "," + tst.locator[alternation]));
				})), locator;
			}
			if (-1 < pos && (void 0 === inputmask.maxLength || pos < inputmask.maxLength)) {
				if (void 0 === ndxIntlzr) {
					for (var previousPos = pos - 1, test; void 0 === (test = maskset.validPositions[previousPos] || maskset.tests[previousPos]) && -1 < previousPos; ) previousPos--;
					void 0 !== test && -1 < previousPos && (ndxInitializer = mergeLocators(previousPos, test), 
					cacheDependency = ndxInitializer.join(""), testPos = previousPos);
				}
				if (maskset.tests[pos] && maskset.tests[pos][0].cd === cacheDependency) return maskset.tests[pos];
				for (var mtndx = ndxInitializer.shift(); mtndx < maskTokens.length; mtndx++) {
					var match = resolveTestFromToken(maskTokens[mtndx], ndxInitializer, [ mtndx ]);
					if (match && testPos === pos || pos < testPos) break;
				}
			}
			return 0 !== matches.length && !insertStop || matches.push({
				match: {
					fn: null,
					static: !0,
					optionality: !1,
					casing: null,
					def: "",
					placeholder: ""
				},
				locator: [],
				mloc: {},
				cd: cacheDependency
			}), void 0 !== ndxIntlzr && maskset.tests[pos] ? $.extend(!0, [], matches) : (maskset.tests[pos] = $.extend(!0, [], matches), 
			maskset.tests[pos]);
		}
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.determineTestTemplate = determineTestTemplate, exports.getDecisionTaker = getDecisionTaker, 
		exports.getMaskTemplate = getMaskTemplate, exports.getPlaceholder = getPlaceholder, 
		exports.getTest = getTest, exports.getTests = getTests, exports.getTestTemplate = getTestTemplate;
	}, function(module, exports, __webpack_require__) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.alternate = alternate, exports.checkAlternationMatch = checkAlternationMatch, 
		exports.isComplete = isComplete, exports.isValid = isValid, exports.refreshFromBuffer = refreshFromBuffer, 
		exports.revalidateMask = revalidateMask, exports.handleRemove = handleRemove;
		var _validationTests = __webpack_require__(3), _keycode = _interopRequireDefault(__webpack_require__(0)), _positioning = __webpack_require__(2), _eventhandlers = __webpack_require__(6);
		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : {
				default: obj
			};
		}
		function alternate(maskPos, c, strict, fromIsValid, rAltPos, selection) {
			var inputmask = this, $ = this.dependencyLib, opts = this.opts, maskset = this.maskset, validPsClone = $.extend(!0, {}, maskset.validPositions), tstClone = $.extend(!0, {}, maskset.tests), lastAlt, alternation, isValidRslt = !1, returnRslt = !1, altPos, prevAltPos, i, validPos, decisionPos, lAltPos = void 0 !== rAltPos ? rAltPos : _positioning.getLastValidPosition.call(this), nextPos, input, begin, end;
			if (selection && (begin = selection.begin, end = selection.end, selection.begin > selection.end && (begin = selection.end, 
			end = selection.begin)), -1 === lAltPos && void 0 === rAltPos) lastAlt = 0, prevAltPos = _validationTests.getTest.call(this, lastAlt), 
			alternation = prevAltPos.alternation; else for (;0 <= lAltPos; lAltPos--) if (altPos = maskset.validPositions[lAltPos], 
			altPos && void 0 !== altPos.alternation) {
				if (prevAltPos && prevAltPos.locator[altPos.alternation] !== altPos.locator[altPos.alternation]) break;
				lastAlt = lAltPos, alternation = maskset.validPositions[lastAlt].alternation, prevAltPos = altPos;
			}
			if (void 0 !== alternation) {
				decisionPos = parseInt(lastAlt), maskset.excludes[decisionPos] = maskset.excludes[decisionPos] || [], 
				!0 !== maskPos && maskset.excludes[decisionPos].push((0, _validationTests.getDecisionTaker)(prevAltPos) + ":" + prevAltPos.alternation);
				var validInputs = [], resultPos = -1;
				for (i = decisionPos; i < _positioning.getLastValidPosition.call(this, void 0, !0) + 1; i++) -1 === resultPos && maskPos <= i && void 0 !== c && (validInputs.push(c), 
				resultPos = validInputs.length - 1), validPos = maskset.validPositions[i], validPos && !0 !== validPos.generatedInput && (void 0 === selection || i < begin || end <= i) && validInputs.push(validPos.input), 
				delete maskset.validPositions[i];
				for (-1 === resultPos && void 0 !== c && (validInputs.push(c), resultPos = validInputs.length - 1); void 0 !== maskset.excludes[decisionPos] && maskset.excludes[decisionPos].length < 10; ) {
					for (maskset.tests = {}, _positioning.resetMaskSet.call(this, !0), isValidRslt = !0, 
					i = 0; i < validInputs.length && (nextPos = isValidRslt.caret || _positioning.getLastValidPosition.call(this, void 0, !0) + 1, 
					input = validInputs[i], isValidRslt = isValid.call(this, nextPos, input, !1, fromIsValid, !0)); i++) i === resultPos && (returnRslt = isValidRslt), 
					1 == maskPos && isValidRslt && (returnRslt = {
						caretPos: i
					});
					if (isValidRslt) break;
					if (_positioning.resetMaskSet.call(this), prevAltPos = _validationTests.getTest.call(this, decisionPos), 
					maskset.validPositions = $.extend(!0, {}, validPsClone), maskset.tests = $.extend(!0, {}, tstClone), 
					!maskset.excludes[decisionPos]) {
						returnRslt = alternate.call(this, maskPos, c, strict, fromIsValid, decisionPos - 1, selection);
						break;
					}
					var decisionTaker = (0, _validationTests.getDecisionTaker)(prevAltPos);
					if (-1 !== maskset.excludes[decisionPos].indexOf(decisionTaker + ":" + prevAltPos.alternation)) {
						returnRslt = alternate.call(this, maskPos, c, strict, fromIsValid, decisionPos - 1, selection);
						break;
					}
					for (maskset.excludes[decisionPos].push(decisionTaker + ":" + prevAltPos.alternation), 
					i = decisionPos; i < _positioning.getLastValidPosition.call(this, void 0, !0) + 1; i++) delete maskset.validPositions[i];
				}
			}
			return returnRslt && !1 === opts.keepStatic || delete maskset.excludes[decisionPos], 
			returnRslt;
		}
		function casing(elem, test, pos) {
			var opts = this.opts, maskset = this.maskset;
			switch (opts.casing || test.casing) {
			  case "upper":
				elem = elem.toUpperCase();
				break;

			  case "lower":
				elem = elem.toLowerCase();
				break;

			  case "title":
				var posBefore = maskset.validPositions[pos - 1];
				elem = 0 === pos || posBefore && posBefore.input === String.fromCharCode(_keycode.default.SPACE) ? elem.toUpperCase() : elem.toLowerCase();
				break;

			  default:
				if ("function" == typeof opts.casing) {
					var args = Array.prototype.slice.call(arguments);
					args.push(maskset.validPositions), elem = opts.casing.apply(this, args);
				}
			}
			return elem;
		}
		function checkAlternationMatch(altArr1, altArr2, na) {
			for (var opts = this.opts, altArrC = opts.greedy ? altArr2 : altArr2.slice(0, 1), isMatch = !1, naArr = void 0 !== na ? na.split(",") : [], naNdx, i = 0; i < naArr.length; i++) -1 !== (naNdx = altArr1.indexOf(naArr[i])) && altArr1.splice(naNdx, 1);
			for (var alndx = 0; alndx < altArr1.length; alndx++) if (altArrC.includes(altArr1[alndx])) {
				isMatch = !0;
				break;
			}
			return isMatch;
		}
		function handleRemove(input, k, pos, strict, fromIsValid) {
			var inputmask = this, maskset = this.maskset, opts = this.opts;
			if ((opts.numericInput || this.isRTL) && (k === _keycode.default.BACKSPACE ? k = _keycode.default.DELETE : k === _keycode.default.DELETE && (k = _keycode.default.BACKSPACE), 
			this.isRTL)) {
				var pend = pos.end;
				pos.end = pos.begin, pos.begin = pend;
			}
			var lvp = _positioning.getLastValidPosition.call(this, void 0, !0), offset;
			if (pos.end >= _positioning.getBuffer.call(this).length && lvp >= pos.end && (pos.end = lvp + 1), 
			k === _keycode.default.BACKSPACE ? pos.end - pos.begin < 1 && (pos.begin = _positioning.seekPrevious.call(this, pos.begin)) : k === _keycode.default.DELETE && pos.begin === pos.end && (pos.end = _positioning.isMask.call(this, pos.end, !0, !0) ? pos.end + 1 : _positioning.seekNext.call(this, pos.end) + 1), 
			!1 !== (offset = revalidateMask.call(this, pos))) {
				if (!0 !== strict && !1 !== opts.keepStatic || null !== opts.regex && -1 !== _validationTests.getTest.call(this, pos.begin).match.def.indexOf("|")) {
					var result = alternate.call(this, !0);
					if (result) {
						var newPos = void 0 !== result.caret ? result.caret : result.pos ? _positioning.seekNext.call(this, result.pos.begin ? result.pos.begin : result.pos) : _positioning.getLastValidPosition.call(this, -1, !0);
						(k !== _keycode.default.DELETE || pos.begin > newPos) && pos.begin;
					}
				}
				!0 !== strict && (maskset.p = k === _keycode.default.DELETE ? pos.begin + offset : pos.begin);
			}
		}
		function isComplete(buffer) {
			var inputmask = this, opts = this.opts, maskset = this.maskset;
			if ("function" == typeof opts.isComplete) return opts.isComplete(buffer, opts);
			if ("*" !== opts.repeat) {
				var complete = !1, lrp = _positioning.determineLastRequiredPosition.call(this, !0), aml = _positioning.seekPrevious.call(this, lrp.l);
				if (void 0 === lrp.def || lrp.def.newBlockMarker || lrp.def.optionality || lrp.def.optionalQuantifier) {
					complete = !0;
					for (var i = 0; i <= aml; i++) {
						var test = _validationTests.getTestTemplate.call(this, i).match;
						if (!0 !== test.static && void 0 === maskset.validPositions[i] && !0 !== test.optionality && !0 !== test.optionalQuantifier || !0 === test.static && buffer[i] !== _validationTests.getPlaceholder.call(this, i, test)) {
							complete = !1;
							break;
						}
					}
				}
				return complete;
			}
		}
		function isValid(pos, c, strict, fromIsValid, fromAlternate, validateOnly, fromCheckval) {
			var inputmask = this, $ = this.dependencyLib, opts = this.opts, el = inputmask.el, maskset = inputmask.maskset;
			function isSelection(posObj) {
				return inputmask.isRTL ? 1 < posObj.begin - posObj.end || posObj.begin - posObj.end == 1 : 1 < posObj.end - posObj.begin || posObj.end - posObj.begin == 1;
			}
			strict = !0 === strict;
			var maskPos = pos;
			function processCommandObject(commandObj) {
				if (void 0 !== commandObj) {
					if (void 0 !== commandObj.remove && (Array.isArray(commandObj.remove) || (commandObj.remove = [ commandObj.remove ]), 
					commandObj.remove.sort(function(a, b) {
						return b.pos - a.pos;
					}).forEach(function(lmnt) {
						revalidateMask.call(inputmask, {
							begin: lmnt,
							end: lmnt + 1
						});
					}), commandObj.remove = void 0), void 0 !== commandObj.insert && (Array.isArray(commandObj.insert) || (commandObj.insert = [ commandObj.insert ]), 
					commandObj.insert.sort(function(a, b) {
						return a.pos - b.pos;
					}).forEach(function(lmnt) {
						"" !== lmnt.c && isValid.call(inputmask, lmnt.pos, lmnt.c, void 0 === lmnt.strict || lmnt.strict, void 0 !== lmnt.fromIsValid ? lmnt.fromIsValid : fromIsValid);
					}), commandObj.insert = void 0), commandObj.refreshFromBuffer && commandObj.buffer) {
						var refresh = commandObj.refreshFromBuffer;
						refreshFromBuffer.call(inputmask, !0 === refresh ? refresh : refresh.start, refresh.end, commandObj.buffer), 
						commandObj.refreshFromBuffer = void 0;
					}
					void 0 !== commandObj.rewritePosition && (maskPos = commandObj.rewritePosition, 
					commandObj = !0);
				}
				return commandObj;
			}
			function _isValid(position, c, strict) {
				var rslt = !1;
				return _validationTests.getTests.call(inputmask, position).every(function(tst, ndx) {
					var test = tst.match;
					if (_positioning.getBuffer.call(inputmask, !0), rslt = null != test.fn ? test.fn.test(c, maskset, position, strict, opts, isSelection(pos)) : (c === test.def || c === opts.skipOptionalPartCharacter) && "" !== test.def && {
						c: _validationTests.getPlaceholder.call(inputmask, position, test, !0) || test.def,
						pos: position
					}, !1 === rslt) return !0;
					var elem = void 0 !== rslt.c ? rslt.c : c, validatedPos = position;
					return elem = elem === opts.skipOptionalPartCharacter && !0 === test.static ? _validationTests.getPlaceholder.call(inputmask, position, test, !0) || test.def : elem, 
					rslt = processCommandObject(rslt), !0 !== rslt && void 0 !== rslt.pos && rslt.pos !== position && (validatedPos = rslt.pos), 
					!0 !== rslt && void 0 === rslt.pos && void 0 === rslt.c || !1 === revalidateMask.call(inputmask, pos, $.extend({}, tst, {
						input: casing.call(inputmask, elem, test, validatedPos)
					}), fromIsValid, validatedPos) && (rslt = !1), !1;
				}), rslt;
			}
			void 0 !== pos.begin && (maskPos = inputmask.isRTL ? pos.end : pos.begin);
			var result = !0, positionsClone = $.extend(!0, {}, maskset.validPositions);
			if (!1 === opts.keepStatic && void 0 !== maskset.excludes[maskPos] && !0 !== fromAlternate && !0 !== fromIsValid) for (var i = maskPos; i < (inputmask.isRTL ? pos.begin : pos.end); i++) void 0 !== maskset.excludes[i] && (maskset.excludes[i] = void 0, 
			delete maskset.tests[i]);
			if ("function" == typeof opts.preValidation && !0 !== fromIsValid && !0 !== validateOnly && (result = opts.preValidation.call(el, _positioning.getBuffer.call(inputmask), maskPos, c, isSelection(pos), opts, maskset, pos, strict || fromAlternate), 
			result = processCommandObject(result)), !0 === result) {
				if (void 0 === inputmask.maxLength || maskPos < inputmask.maxLength) {
					if (result = _isValid(maskPos, c, strict), (!strict || !0 === fromIsValid) && !1 === result && !0 !== validateOnly) {
						var currentPosValid = maskset.validPositions[maskPos];
						if (!currentPosValid || !0 !== currentPosValid.match.static || currentPosValid.match.def !== c && c !== opts.skipOptionalPartCharacter) {
							if (opts.insertMode || void 0 === maskset.validPositions[_positioning.seekNext.call(inputmask, maskPos)] || pos.end > maskPos) {
								var skip = !1;
								if (maskset.jitOffset[maskPos] && void 0 === maskset.validPositions[_positioning.seekNext.call(inputmask, maskPos)] && (result = isValid.call(inputmask, maskPos + maskset.jitOffset[maskPos], c, !0), 
								!1 !== result && (!0 !== fromAlternate && (result.caret = maskPos), skip = !0)), 
								pos.end > maskPos && (maskset.validPositions[maskPos] = void 0), !skip && !_positioning.isMask.call(inputmask, maskPos, opts.keepStatic && 0 === maskPos)) for (var nPos = maskPos + 1, snPos = _positioning.seekNext.call(inputmask, maskPos, !1, 0 !== maskPos); nPos <= snPos; nPos++) if (result = _isValid(nPos, c, strict), 
								!1 !== result) {
									result = trackbackPositions.call(inputmask, maskPos, void 0 !== result.pos ? result.pos : nPos) || result, 
									maskPos = nPos;
									break;
								}
							}
						} else result = {
							caret: _positioning.seekNext.call(inputmask, maskPos)
						};
					}
				} else result = !1;
				!1 !== result || !opts.keepStatic || !isComplete.call(inputmask, _positioning.getBuffer.call(inputmask)) && 0 !== maskPos || strict || !0 === fromAlternate ? isSelection(pos) && maskset.tests[maskPos] && 1 < maskset.tests[maskPos].length && opts.keepStatic && !strict && !0 !== fromAlternate && (result = alternate.call(inputmask, !0)) : result = alternate.call(inputmask, maskPos, c, strict, fromIsValid, void 0, pos), 
				!0 === result && (result = {
					pos: maskPos
				});
			}
			if ("function" == typeof opts.postValidation && !0 !== fromIsValid && !0 !== validateOnly) {
				var postResult = opts.postValidation.call(el, _positioning.getBuffer.call(inputmask, !0), void 0 !== pos.begin ? inputmask.isRTL ? pos.end : pos.begin : pos, c, result, opts, maskset, strict, fromCheckval);
				void 0 !== postResult && (result = !0 === postResult ? result : postResult);
			}
			result && void 0 === result.pos && (result.pos = maskPos), !1 === result || !0 === validateOnly ? (_positioning.resetMaskSet.call(inputmask, !0), 
			maskset.validPositions = $.extend(!0, {}, positionsClone)) : trackbackPositions.call(inputmask, void 0, maskPos, !0);
			var endResult = processCommandObject(result);
			return endResult;
		}
		function positionCanMatchDefinition(pos, testDefinition, opts) {
			for (var inputmask = this, maskset = this.maskset, valid = !1, tests = _validationTests.getTests.call(this, pos), tndx = 0; tndx < tests.length; tndx++) {
				if (tests[tndx].match && (!(tests[tndx].match.nativeDef !== testDefinition.match[opts.shiftPositions ? "def" : "nativeDef"] || opts.shiftPositions && testDefinition.match.static) || tests[tndx].match.nativeDef === testDefinition.match.nativeDef)) {
					valid = !0;
					break;
				}
				if (tests[tndx].match && tests[tndx].match.def === testDefinition.match.nativeDef) {
					valid = void 0;
					break;
				}
			}
			return !1 === valid && void 0 !== maskset.jitOffset[pos] && (valid = positionCanMatchDefinition.call(this, pos + maskset.jitOffset[pos], testDefinition, opts)), 
			valid;
		}
		function refreshFromBuffer(start, end, buffer) {
			var inputmask = this, maskset = this.maskset, opts = this.opts, $ = this.dependencyLib, el = this.el, i, p, skipOptionalPartCharacter = opts.skipOptionalPartCharacter, bffr = this.isRTL ? buffer.slice().reverse() : buffer;
			if (opts.skipOptionalPartCharacter = "", !0 === start) _positioning.resetMaskSet.call(this), 
			maskset.tests = {}, start = 0, end = buffer.length, p = _positioning.determineNewCaretPosition.call(this, {
				begin: 0,
				end: 0
			}, !1).begin; else {
				for (i = start; i < end; i++) delete maskset.validPositions[i];
				p = start;
			}
			var keypress = new $.Event("keypress");
			for (i = start; i < end; i++) {
				keypress.which = bffr[i].toString().charCodeAt(0), this.ignorable = !1;
				var valResult = _eventhandlers.EventHandlers.keypressEvent.call(el, keypress, !0, !1, !1, p);
				!1 !== valResult && (p = valResult.forwardPosition);
			}
			opts.skipOptionalPartCharacter = skipOptionalPartCharacter;
		}
		function trackbackPositions(originalPos, newPos, fillOnly) {
			var inputmask = this, maskset = this.maskset, $ = this.dependencyLib;
			if (void 0 === originalPos) for (originalPos = newPos - 1; 0 < originalPos && !maskset.validPositions[originalPos]; originalPos--) ;
			for (var ps = originalPos; ps < newPos; ps++) if (void 0 === maskset.validPositions[ps] && !_positioning.isMask.call(this, ps, !0)) {
				var vp = 0 == ps ? _validationTests.getTest.call(this, ps) : maskset.validPositions[ps - 1];
				if (vp) {
					var tests = _validationTests.getTests.call(this, ps).slice();
					"" === tests[tests.length - 1].match.def && tests.pop();
					var bestMatch = _validationTests.determineTestTemplate.call(this, ps, tests), np;
					if (bestMatch && (!0 !== bestMatch.match.jit || "master" === bestMatch.match.newBlockMarker && (np = maskset.validPositions[ps + 1]) && !0 === np.match.optionalQuantifier) && (bestMatch = $.extend({}, bestMatch, {
						input: _validationTests.getPlaceholder.call(this, ps, bestMatch.match, !0) || bestMatch.match.def
					}), bestMatch.generatedInput = !0, revalidateMask.call(this, ps, bestMatch, !0), 
					!0 !== fillOnly)) {
						var cvpInput = maskset.validPositions[newPos].input;
						return maskset.validPositions[newPos] = void 0, isValid.call(this, newPos, cvpInput, !0, !0);
					}
				}
			}
		}
		function revalidateMask(pos, validTest, fromIsValid, validatedPos) {
			var inputmask = this, maskset = this.maskset, opts = this.opts, $ = this.dependencyLib;
			function IsEnclosedStatic(pos, valids, selection) {
				var posMatch = valids[pos];
				if (void 0 === posMatch || !0 !== posMatch.match.static || !0 === posMatch.match.optionality || void 0 !== valids[0] && void 0 !== valids[0].alternation) return !1;
				var prevMatch = selection.begin <= pos - 1 ? valids[pos - 1] && !0 === valids[pos - 1].match.static && valids[pos - 1] : valids[pos - 1], nextMatch = selection.end > pos + 1 ? valids[pos + 1] && !0 === valids[pos + 1].match.static && valids[pos + 1] : valids[pos + 1];
				return prevMatch && nextMatch;
			}
			var offset = 0, begin = void 0 !== pos.begin ? pos.begin : pos, end = void 0 !== pos.end ? pos.end : pos;
			if (pos.begin > pos.end && (begin = pos.end, end = pos.begin), validatedPos = void 0 !== validatedPos ? validatedPos : begin, 
			begin !== end || opts.insertMode && void 0 !== maskset.validPositions[validatedPos] && void 0 === fromIsValid || void 0 === validTest) {
				var positionsClone = $.extend(!0, {}, maskset.validPositions), lvp = _positioning.getLastValidPosition.call(this, void 0, !0), i;
				for (maskset.p = begin, i = lvp; begin <= i; i--) delete maskset.validPositions[i], 
				void 0 === validTest && delete maskset.tests[i + 1];
				var valid = !0, j = validatedPos, posMatch = j, t, canMatch;
				for (validTest && (maskset.validPositions[validatedPos] = $.extend(!0, {}, validTest), 
				posMatch++, j++), i = validTest ? end : end - 1; i <= lvp; i++) {
					if (void 0 !== (t = positionsClone[i]) && !0 !== t.generatedInput && (end <= i || begin <= i && IsEnclosedStatic(i, positionsClone, {
						begin: begin,
						end: end
					}))) {
						for (;"" !== _validationTests.getTest.call(this, posMatch).match.def; ) {
							if (!1 !== (canMatch = positionCanMatchDefinition.call(this, posMatch, t, opts)) || "+" === t.match.def) {
								"+" === t.match.def && _positioning.getBuffer.call(this, !0);
								var result = isValid.call(this, posMatch, t.input, "+" !== t.match.def, "+" !== t.match.def);
								if (valid = !1 !== result, j = (result.pos || posMatch) + 1, !valid && canMatch) break;
							} else valid = !1;
							if (valid) {
								void 0 === validTest && t.match.static && i === pos.begin && offset++;
								break;
							}
							if (!valid && posMatch > maskset.maskLength) break;
							posMatch++;
						}
						"" == _validationTests.getTest.call(this, posMatch).match.def && (valid = !1), posMatch = j;
					}
					if (!valid) break;
				}
				if (!valid) return maskset.validPositions = $.extend(!0, {}, positionsClone), _positioning.resetMaskSet.call(this, !0), 
				!1;
			} else validTest && _validationTests.getTest.call(this, validatedPos).match.cd === validTest.match.cd && (maskset.validPositions[validatedPos] = $.extend(!0, {}, validTest));
			return _positioning.resetMaskSet.call(this, !0), offset;
		}
	}, function(module, exports, __webpack_require__) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.applyInputValue = applyInputValue, exports.clearOptionalTail = clearOptionalTail, 
		exports.checkVal = checkVal, exports.HandleNativePlaceholder = HandleNativePlaceholder, 
		exports.unmaskedvalue = unmaskedvalue, exports.writeBuffer = writeBuffer;
		var _keycode = _interopRequireDefault(__webpack_require__(0)), _validationTests = __webpack_require__(3), _positioning = __webpack_require__(2), _validation = __webpack_require__(4), _environment = __webpack_require__(7), _eventhandlers = __webpack_require__(6);
		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : {
				default: obj
			};
		}
		function applyInputValue(input, value) {
			var inputmask = input ? input.inputmask : this, opts = inputmask.opts;
			input.inputmask.refreshValue = !1, "function" == typeof opts.onBeforeMask && (value = opts.onBeforeMask.call(inputmask, value, opts) || value), 
			value = value.toString().split(""), checkVal(input, !0, !1, value), inputmask.undoValue = _positioning.getBuffer.call(inputmask).join(""), 
			(opts.clearMaskOnLostFocus || opts.clearIncomplete) && input.inputmask._valueGet() === _positioning.getBufferTemplate.call(inputmask).join("") && -1 === _positioning.getLastValidPosition.call(inputmask) && input.inputmask._valueSet("");
		}
		function clearOptionalTail(buffer) {
			var inputmask = this;
			buffer.length = 0;
			for (var template = _validationTests.getMaskTemplate.call(this, !0, 0, !0, void 0, !0), lmnt; void 0 !== (lmnt = template.shift()); ) buffer.push(lmnt);
			return buffer;
		}
		function checkVal(input, writeOut, strict, nptvl, initiatingEvent) {
			var inputmask = input ? input.inputmask : this, maskset = inputmask.maskset, opts = inputmask.opts, $ = inputmask.dependencyLib, inputValue = nptvl.slice(), charCodes = "", initialNdx = -1, result = void 0, skipOptionalPartCharacter = opts.skipOptionalPartCharacter;
			function isTemplateMatch(ndx, charCodes) {
				for (var targetTemplate = _validationTests.getMaskTemplate.call(inputmask, !0, 0).slice(ndx, _positioning.seekNext.call(inputmask, ndx)).join("").replace(/'/g, ""), charCodeNdx = targetTemplate.indexOf(charCodes); 0 < charCodeNdx && " " === targetTemplate[charCodeNdx - 1]; ) charCodeNdx--;
				var match = 0 === charCodeNdx && !_positioning.isMask.call(inputmask, ndx) && (_validationTests.getTest.call(inputmask, ndx).match.nativeDef === charCodes.charAt(0) || !0 === _validationTests.getTest.call(inputmask, ndx).match.static && _validationTests.getTest.call(inputmask, ndx).match.nativeDef === "'" + charCodes.charAt(0) || " " === _validationTests.getTest.call(inputmask, ndx).match.nativeDef && (_validationTests.getTest.call(inputmask, ndx + 1).match.nativeDef === charCodes.charAt(0) || !0 === _validationTests.getTest.call(inputmask, ndx + 1).match.static && _validationTests.getTest.call(inputmask, ndx + 1).match.nativeDef === "'" + charCodes.charAt(0)));
				if (!match && 0 < charCodeNdx && !_positioning.isMask.call(inputmask, ndx, !1, !0)) {
					var nextPos = _positioning.seekNext.call(inputmask, ndx);
					inputmask.caretPos.begin < nextPos && (inputmask.caretPos = {
						begin: nextPos
					});
				}
				return match;
			}
			opts.skipOptionalPartCharacter = "", _positioning.resetMaskSet.call(inputmask), 
			maskset.tests = {}, initialNdx = opts.radixPoint ? _positioning.determineNewCaretPosition.call(inputmask, {
				begin: 0,
				end: 0
			}).begin : 0, maskset.p = initialNdx, inputmask.caretPos = {
				begin: initialNdx
			};
			var staticMatches = [], prevCaretPos = inputmask.caretPos;
			if (inputValue.forEach(function(charCode, ndx) {
				if (void 0 !== charCode) if (void 0 === maskset.validPositions[ndx] && inputValue[ndx] === _validationTests.getPlaceholder.call(inputmask, ndx) && _positioning.isMask.call(inputmask, ndx, !0) && !1 === _validation.isValid.call(inputmask, ndx, inputValue[ndx], !0, void 0, void 0, !0)) maskset.p++; else {
					var keypress = new $.Event("_checkval");
					keypress.which = charCode.toString().charCodeAt(0), charCodes += charCode;
					var lvp = _positioning.getLastValidPosition.call(inputmask, void 0, !0);
					isTemplateMatch(initialNdx, charCodes) ? result = _eventhandlers.EventHandlers.keypressEvent.call(input || inputmask, keypress, !0, !1, strict, lvp + 1) : (result = _eventhandlers.EventHandlers.keypressEvent.call(input || inputmask, keypress, !0, !1, strict, inputmask.caretPos.begin), 
					result && (initialNdx = inputmask.caretPos.begin + 1, charCodes = "")), result ? (void 0 !== result.pos && maskset.validPositions[result.pos] && !0 === maskset.validPositions[result.pos].match.static && void 0 === maskset.validPositions[result.pos].alternation && (staticMatches.push(result.pos), 
					inputmask.isRTL || (result.forwardPosition = result.pos + 1)), writeBuffer.call(inputmask, void 0, _positioning.getBuffer.call(inputmask), result.forwardPosition, keypress, !1), 
					inputmask.caretPos = {
						begin: result.forwardPosition,
						end: result.forwardPosition
					}, prevCaretPos = inputmask.caretPos) : inputmask.caretPos = prevCaretPos;
				}
			}), 0 < staticMatches.length) {
				var sndx, validPos, nextValid = _positioning.seekNext.call(inputmask, -1, void 0, !1);
				if (!_validation.isComplete.call(inputmask, _positioning.getBuffer.call(inputmask)) && staticMatches.length <= nextValid || _validation.isComplete.call(inputmask, _positioning.getBuffer.call(inputmask)) && 0 < staticMatches.length && staticMatches.length !== nextValid && 0 === staticMatches[0]) for (var nextSndx = nextValid; void 0 !== (sndx = staticMatches.shift()); ) {
					var keypress = new $.Event("_checkval");
					if (validPos = maskset.validPositions[sndx], validPos.generatedInput = !0, keypress.which = validPos.input.charCodeAt(0), 
					result = _eventhandlers.EventHandlers.keypressEvent.call(input, keypress, !0, !1, strict, nextSndx), 
					result && void 0 !== result.pos && result.pos !== sndx && maskset.validPositions[result.pos] && !0 === maskset.validPositions[result.pos].match.static) staticMatches.push(result.pos); else if (!result) break;
					nextSndx++;
				}
			}
			writeOut && writeBuffer.call(inputmask, input, _positioning.getBuffer.call(inputmask), result ? result.forwardPosition : inputmask.caretPos.begin, initiatingEvent || new $.Event("checkval"), initiatingEvent && "input" === initiatingEvent.type && inputmask.undoValue !== _positioning.getBuffer.call(inputmask).join("")), 
			opts.skipOptionalPartCharacter = skipOptionalPartCharacter;
		}
		function HandleNativePlaceholder(npt, value) {
			var inputmask = npt ? npt.inputmask : this;
			if (_environment.ie) {
				if (npt.inputmask._valueGet() !== value && (npt.placeholder !== value || "" === npt.placeholder)) {
					var buffer = _positioning.getBuffer.call(inputmask).slice(), nptValue = npt.inputmask._valueGet();
					if (nptValue !== value) {
						var lvp = _positioning.getLastValidPosition.call(inputmask);
						-1 === lvp && nptValue === _positioning.getBufferTemplate.call(inputmask).join("") ? buffer = [] : -1 !== lvp && clearOptionalTail.call(inputmask, buffer), 
						writeBuffer(npt, buffer);
					}
				}
			} else npt.placeholder !== value && (npt.placeholder = value, "" === npt.placeholder && npt.removeAttribute("placeholder"));
		}
		function unmaskedvalue(input) {
			var inputmask = input ? input.inputmask : this, opts = inputmask.opts, maskset = inputmask.maskset;
			if (input) {
				if (void 0 === input.inputmask) return input.value;
				input.inputmask && input.inputmask.refreshValue && applyInputValue(input, input.inputmask._valueGet(!0));
			}
			var umValue = [], vps = maskset.validPositions;
			for (var pndx in vps) vps[pndx] && vps[pndx].match && (1 != vps[pndx].match.static || Array.isArray(maskset.metadata) && !0 !== vps[pndx].generatedInput) && umValue.push(vps[pndx].input);
			var unmaskedValue = 0 === umValue.length ? "" : (inputmask.isRTL ? umValue.reverse() : umValue).join("");
			if ("function" == typeof opts.onUnMask) {
				var bufferValue = (inputmask.isRTL ? _positioning.getBuffer.call(inputmask).slice().reverse() : _positioning.getBuffer.call(inputmask)).join("");
				unmaskedValue = opts.onUnMask.call(inputmask, bufferValue, unmaskedValue, opts);
			}
			return unmaskedValue;
		}
		function writeBuffer(input, buffer, caretPos, event, triggerEvents) {
			var inputmask = input ? input.inputmask : this, opts = inputmask.opts, $ = inputmask.dependencyLib;
			if (event && "function" == typeof opts.onBeforeWrite) {
				var result = opts.onBeforeWrite.call(inputmask, event, buffer, caretPos, opts);
				if (result) {
					if (result.refreshFromBuffer) {
						var refresh = result.refreshFromBuffer;
						_validation.refreshFromBuffer.call(inputmask, !0 === refresh ? refresh : refresh.start, refresh.end, result.buffer || buffer), 
						buffer = _positioning.getBuffer.call(inputmask, !0);
					}
					void 0 !== caretPos && (caretPos = void 0 !== result.caret ? result.caret : caretPos);
				}
			}
			if (void 0 !== input && (input.inputmask._valueSet(buffer.join("")), void 0 === caretPos || void 0 !== event && "blur" === event.type || _positioning.caret.call(inputmask, input, caretPos, void 0, void 0, void 0 !== event && "keydown" === event.type && (event.keyCode === _keycode.default.DELETE || event.keyCode === _keycode.default.BACKSPACE)), 
			!0 === triggerEvents)) {
				var $input = $(input), nptVal = input.inputmask._valueGet();
				input.inputmask.skipInputEvent = !0, $input.trigger("input"), setTimeout(function() {
					nptVal === _positioning.getBufferTemplate.call(inputmask).join("") ? $input.trigger("cleared") : !0 === _validation.isComplete.call(inputmask, buffer) && $input.trigger("complete");
				}, 0);
			}
		}
	}, function(module, exports, __webpack_require__) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.EventHandlers = void 0;
		var _positioning = __webpack_require__(2), _keycode = _interopRequireDefault(__webpack_require__(0)), _environment = __webpack_require__(7), _validation = __webpack_require__(4), _inputHandling = __webpack_require__(5), _validationTests = __webpack_require__(3);
		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : {
				default: obj
			};
		}
		var EventHandlers = {
			keydownEvent: function keydownEvent(e) {
				var inputmask = this.inputmask, opts = inputmask.opts, $ = inputmask.dependencyLib, maskset = inputmask.maskset, input = this, $input = $(input), k = e.keyCode, pos = _positioning.caret.call(inputmask, input), kdResult = opts.onKeyDown.call(this, e, _positioning.getBuffer.call(inputmask), pos, opts);
				if (void 0 !== kdResult) return kdResult;
				if (k === _keycode.default.BACKSPACE || k === _keycode.default.DELETE || _environment.iphone && k === _keycode.default.BACKSPACE_SAFARI || e.ctrlKey && k === _keycode.default.X && !("oncut" in input)) e.preventDefault(), 
				_validation.handleRemove.call(inputmask, input, k, pos), (0, _inputHandling.writeBuffer)(input, _positioning.getBuffer.call(inputmask, !0), maskset.p, e, input.inputmask._valueGet() !== _positioning.getBuffer.call(inputmask).join("")); else if (k === _keycode.default.END || k === _keycode.default.PAGE_DOWN) {
					e.preventDefault();
					var caretPos = _positioning.seekNext.call(inputmask, _positioning.getLastValidPosition.call(inputmask));
					_positioning.caret.call(inputmask, input, e.shiftKey ? pos.begin : caretPos, caretPos, !0);
				} else k === _keycode.default.HOME && !e.shiftKey || k === _keycode.default.PAGE_UP ? (e.preventDefault(), 
				_positioning.caret.call(inputmask, input, 0, e.shiftKey ? pos.begin : 0, !0)) : (opts.undoOnEscape && k === _keycode.default.ESCAPE || 90 === k && e.ctrlKey) && !0 !== e.altKey ? ((0, 
				_inputHandling.checkVal)(input, !0, !1, inputmask.undoValue.split("")), $input.trigger("click")) : !0 === opts.tabThrough && k === _keycode.default.TAB ? !0 === e.shiftKey ? (pos.end = _positioning.seekPrevious.call(inputmask, pos.end, !0), 
				!0 === _validationTests.getTest.call(inputmask, pos.end - 1).match.static && pos.end--, 
				pos.begin = _positioning.seekPrevious.call(inputmask, pos.end, !0), 0 <= pos.begin && 0 < pos.end && (e.preventDefault(), 
				_positioning.caret.call(inputmask, input, pos.begin, pos.end))) : (pos.begin = _positioning.seekNext.call(inputmask, pos.begin, !0), 
				pos.end = _positioning.seekNext.call(inputmask, pos.begin, !0), pos.end < maskset.maskLength && pos.end--, 
				pos.begin <= maskset.maskLength && (e.preventDefault(), _positioning.caret.call(inputmask, input, pos.begin, pos.end))) : e.shiftKey || opts.insertModeVisual && !1 === opts.insertMode && (k === _keycode.default.RIGHT ? setTimeout(function() {
					var caretPos = _positioning.caret.call(inputmask, input);
					_positioning.caret.call(inputmask, input, caretPos.begin);
				}, 0) : k === _keycode.default.LEFT && setTimeout(function() {
					var caretPos_begin = _positioning.translatePosition.call(inputmask, input.inputmask.caretPos.begin), caretPos_end = _positioning.translatePosition.call(inputmask, input.inputmask.caretPos.end);
					inputmask.isRTL ? _positioning.caret.call(inputmask, input, caretPos_begin + (caretPos_begin === maskset.maskLength ? 0 : 1)) : _positioning.caret.call(inputmask, input, caretPos_begin - (0 === caretPos_begin ? 0 : 1));
				}, 0));
				inputmask.ignorable = opts.ignorables.includes(k);
			},
			keypressEvent: function keypressEvent(e, checkval, writeOut, strict, ndx) {
				var inputmask = this.inputmask || this, opts = inputmask.opts, $ = inputmask.dependencyLib, maskset = inputmask.maskset, input = inputmask.el, $input = $(input), k = e.which || e.charCode || e.keyCode;
				if (!(!0 === checkval || e.ctrlKey && e.altKey) && (e.ctrlKey || e.metaKey || inputmask.ignorable)) return k === _keycode.default.ENTER && inputmask.undoValue !== _positioning.getBuffer.call(inputmask).join("") && (inputmask.undoValue = _positioning.getBuffer.call(inputmask).join(""), 
				setTimeout(function() {
					$input.trigger("change");
				}, 0)), inputmask.skipInputEvent = !0, !0;
				if (k) {
					44 !== k && 46 !== k || 3 !== e.location || "" === opts.radixPoint || (k = opts.radixPoint.charCodeAt(0));
					var pos = checkval ? {
						begin: ndx,
						end: ndx
					} : _positioning.caret.call(inputmask, input), forwardPosition, c = String.fromCharCode(k);
					maskset.writeOutBuffer = !0;
					var valResult = _validation.isValid.call(inputmask, pos, c, strict, void 0, void 0, void 0, checkval);
					if (!1 !== valResult && (_positioning.resetMaskSet.call(inputmask, !0), forwardPosition = void 0 !== valResult.caret ? valResult.caret : _positioning.seekNext.call(inputmask, valResult.pos.begin ? valResult.pos.begin : valResult.pos), 
					maskset.p = forwardPosition), forwardPosition = opts.numericInput && void 0 === valResult.caret ? _positioning.seekPrevious.call(inputmask, forwardPosition) : forwardPosition, 
					!1 !== writeOut && (setTimeout(function() {
						opts.onKeyValidation.call(input, k, valResult);
					}, 0), maskset.writeOutBuffer && !1 !== valResult)) {
						var buffer = _positioning.getBuffer.call(inputmask);
						(0, _inputHandling.writeBuffer)(input, buffer, forwardPosition, e, !0 !== checkval);
					}
					if (e.preventDefault(), checkval) return !1 !== valResult && (valResult.forwardPosition = forwardPosition), 
					valResult;
				}
			},
			keyupEvent: function keyupEvent(e) {
				var inputmask = this.inputmask;
				!inputmask.isComposing || e.keyCode !== _keycode.default.KEY_229 && e.keyCode !== _keycode.default.ENTER || inputmask.$el.trigger("input");
			},
			pasteEvent: function pasteEvent(e) {
				var inputmask = this.inputmask, opts = inputmask.opts, input = this, inputValue = inputmask._valueGet(!0), caretPos = _positioning.caret.call(inputmask, this), tempValue;
				inputmask.isRTL && (tempValue = caretPos.end, caretPos.end = caretPos.begin, caretPos.begin = tempValue);
				var valueBeforeCaret = inputValue.substr(0, caretPos.begin), valueAfterCaret = inputValue.substr(caretPos.end, inputValue.length);
				if (valueBeforeCaret == (inputmask.isRTL ? _positioning.getBufferTemplate.call(inputmask).slice().reverse() : _positioning.getBufferTemplate.call(inputmask)).slice(0, caretPos.begin).join("") && (valueBeforeCaret = ""), 
				valueAfterCaret == (inputmask.isRTL ? _positioning.getBufferTemplate.call(inputmask).slice().reverse() : _positioning.getBufferTemplate.call(inputmask)).slice(caretPos.end).join("") && (valueAfterCaret = ""), 
				window.clipboardData && window.clipboardData.getData) inputValue = valueBeforeCaret + window.clipboardData.getData("Text") + valueAfterCaret; else {
					if (!e.clipboardData || !e.clipboardData.getData) return !0;
					inputValue = valueBeforeCaret + e.clipboardData.getData("text/plain") + valueAfterCaret;
				}
				var pasteValue = inputValue;
				if ("function" == typeof opts.onBeforePaste) {
					if (pasteValue = opts.onBeforePaste.call(inputmask, inputValue, opts), !1 === pasteValue) return e.preventDefault();
					pasteValue = pasteValue || inputValue;
				}
				return (0, _inputHandling.checkVal)(this, !0, !1, pasteValue.toString().split(""), e), 
				e.preventDefault();
			},
			inputFallBackEvent: function inputFallBackEvent(e) {
				var inputmask = this.inputmask, opts = inputmask.opts, $ = inputmask.dependencyLib;
				function ieMobileHandler(input, inputValue, caretPos) {
					if (_environment.iemobile) {
						var inputChar = inputValue.replace(_positioning.getBuffer.call(inputmask).join(""), "");
						if (1 === inputChar.length) {
							var iv = inputValue.split("");
							iv.splice(caretPos.begin, 0, inputChar), inputValue = iv.join("");
						}
					}
					return inputValue;
				}
				function analyseChanges(inputValue, buffer, caretPos) {
					for (var frontPart = inputValue.substr(0, caretPos.begin).split(""), backPart = inputValue.substr(caretPos.begin).split(""), frontBufferPart = buffer.substr(0, caretPos.begin).split(""), backBufferPart = buffer.substr(caretPos.begin).split(""), fpl = frontPart.length >= frontBufferPart.length ? frontPart.length : frontBufferPart.length, bpl = backPart.length >= backBufferPart.length ? backPart.length : backBufferPart.length, bl, i, action = "", data = [], marker = "~", placeholder; frontPart.length < fpl; ) frontPart.push("~");
					for (;frontBufferPart.length < fpl; ) frontBufferPart.push("~");
					for (;backPart.length < bpl; ) backPart.unshift("~");
					for (;backBufferPart.length < bpl; ) backBufferPart.unshift("~");
					var newBuffer = frontPart.concat(backPart), oldBuffer = frontBufferPart.concat(backBufferPart);
					for (i = 0, bl = newBuffer.length; i < bl; i++) switch (placeholder = _validationTests.getPlaceholder.call(inputmask, _positioning.translatePosition.call(inputmask, i)), 
					action) {
					  case "insertText":
						oldBuffer[i - 1] === newBuffer[i] && caretPos.begin == newBuffer.length - 1 && data.push(newBuffer[i]), 
						i = bl;
						break;

					  case "insertReplacementText":
						"~" === newBuffer[i] ? caretPos.end++ : i = bl;
						break;

					  case "deleteContentBackward":
						"~" === newBuffer[i] ? caretPos.end++ : i = bl;
						break;

					  default:
						newBuffer[i] !== oldBuffer[i] && ("~" !== newBuffer[i + 1] && newBuffer[i + 1] !== placeholder && void 0 !== newBuffer[i + 1] || (oldBuffer[i] !== placeholder || "~" !== oldBuffer[i + 1]) && "~" !== oldBuffer[i] ? "~" === oldBuffer[i + 1] && oldBuffer[i] === newBuffer[i + 1] ? (action = "insertText", 
						data.push(newBuffer[i]), caretPos.begin--, caretPos.end--) : newBuffer[i] !== placeholder && "~" !== newBuffer[i] && ("~" === newBuffer[i + 1] || oldBuffer[i] !== newBuffer[i] && oldBuffer[i + 1] === newBuffer[i + 1]) ? (action = "insertReplacementText", 
						data.push(newBuffer[i]), caretPos.begin--) : "~" === newBuffer[i] ? (action = "deleteContentBackward", 
						!_positioning.isMask.call(inputmask, _positioning.translatePosition.call(inputmask, i), !0) && oldBuffer[i] !== opts.radixPoint || caretPos.end++) : i = bl : (action = "insertText", 
						data.push(newBuffer[i]), caretPos.begin--, caretPos.end--));
						break;
					}
					return {
						action: action,
						data: data,
						caret: caretPos
					};
				}
				var input = this, inputValue = input.inputmask._valueGet(!0), buffer = (inputmask.isRTL ? _positioning.getBuffer.call(inputmask).slice().reverse() : _positioning.getBuffer.call(inputmask)).join(""), caretPos = _positioning.caret.call(inputmask, input, void 0, void 0, !0);
				if (buffer !== inputValue) {
					inputValue = ieMobileHandler(input, inputValue, caretPos);
					var changes = analyseChanges(inputValue, buffer, caretPos);
					switch ((input.inputmask.shadowRoot || document).activeElement !== input && input.focus(), 
					(0, _inputHandling.writeBuffer)(input, _positioning.getBuffer.call(inputmask)), 
					_positioning.caret.call(inputmask, input, caretPos.begin, caretPos.end, !0), changes.action) {
					  case "insertText":
					  case "insertReplacementText":
						changes.data.forEach(function(entry, ndx) {
							var keypress = new $.Event("keypress");
							keypress.which = entry.charCodeAt(0), inputmask.ignorable = !1, EventHandlers.keypressEvent.call(input, keypress);
						}), setTimeout(function() {
							inputmask.$el.trigger("keyup");
						}, 0);
						break;

					  case "deleteContentBackward":
						var keydown = new $.Event("keydown");
						keydown.keyCode = _keycode.default.BACKSPACE, EventHandlers.keydownEvent.call(input, keydown);
						break;

					  default:
						(0, _inputHandling.applyInputValue)(input, inputValue);
						break;
					}
					e.preventDefault();
				}
			},
			compositionendEvent: function compositionendEvent(e) {
				var inputmask = this.inputmask;
				inputmask.isComposing = !1, inputmask.$el.trigger("input");
			},
			setValueEvent: function setValueEvent(e, argument_1, argument_2) {
				var inputmask = this.inputmask, input = this, value = e && e.detail ? e.detail[0] : argument_1;
				void 0 === value && (value = this.inputmask._valueGet(!0)), (0, _inputHandling.applyInputValue)(this, value), 
				(e.detail && void 0 !== e.detail[1] || void 0 !== argument_2) && _positioning.caret.call(inputmask, this, e.detail ? e.detail[1] : argument_2);
			},
			focusEvent: function focusEvent(e) {
				var inputmask = this.inputmask, opts = inputmask.opts, input = this, nptValue = this.inputmask._valueGet();
				opts.showMaskOnFocus && nptValue !== _positioning.getBuffer.call(inputmask).join("") && (0, 
				_inputHandling.writeBuffer)(this, _positioning.getBuffer.call(inputmask), _positioning.seekNext.call(inputmask, _positioning.getLastValidPosition.call(inputmask))), 
				!0 !== opts.positionCaretOnTab || !1 !== inputmask.mouseEnter || _validation.isComplete.call(inputmask, _positioning.getBuffer.call(inputmask)) && -1 !== _positioning.getLastValidPosition.call(inputmask) || EventHandlers.clickEvent.apply(this, [ e, !0 ]), 
				inputmask.undoValue = _positioning.getBuffer.call(inputmask).join("");
			},
			invalidEvent: function invalidEvent(e) {
				this.inputmask.validationEvent = !0;
			},
			mouseleaveEvent: function mouseleaveEvent() {
				var inputmask = this.inputmask, opts = inputmask.opts, input = this;
				inputmask.mouseEnter = !1, opts.clearMaskOnLostFocus && (this.inputmask.shadowRoot || document).activeElement !== this && (0, 
				_inputHandling.HandleNativePlaceholder)(this, inputmask.originalPlaceholder);
			},
			clickEvent: function clickEvent(e, tabbed) {
				var inputmask = this.inputmask, input = this;
				if ((this.inputmask.shadowRoot || document).activeElement === this) {
					var newCaretPosition = _positioning.determineNewCaretPosition.call(inputmask, _positioning.caret.call(inputmask, this), tabbed);
					void 0 !== newCaretPosition && _positioning.caret.call(inputmask, this, newCaretPosition);
				}
			},
			cutEvent: function cutEvent(e) {
				var inputmask = this.inputmask, maskset = inputmask.maskset, input = this, pos = _positioning.caret.call(inputmask, this), clipboardData = window.clipboardData || e.clipboardData, clipData = inputmask.isRTL ? _positioning.getBuffer.call(inputmask).slice(pos.end, pos.begin) : _positioning.getBuffer.call(inputmask).slice(pos.begin, pos.end);
				clipboardData.setData("text", inputmask.isRTL ? clipData.reverse().join("") : clipData.join("")), 
				document.execCommand && document.execCommand("copy"), _validation.handleRemove.call(inputmask, this, _keycode.default.DELETE, pos), 
				(0, _inputHandling.writeBuffer)(this, _positioning.getBuffer.call(inputmask), maskset.p, e, inputmask.undoValue !== _positioning.getBuffer.call(inputmask).join(""));
			},
			blurEvent: function blurEvent(e) {
				var inputmask = this.inputmask, opts = inputmask.opts, $ = inputmask.dependencyLib, $input = $(this), input = this;
				if (this.inputmask) {
					(0, _inputHandling.HandleNativePlaceholder)(this, inputmask.originalPlaceholder);
					var nptValue = this.inputmask._valueGet(), buffer = _positioning.getBuffer.call(inputmask).slice();
					"" !== nptValue && (opts.clearMaskOnLostFocus && (-1 === _positioning.getLastValidPosition.call(inputmask) && nptValue === _positioning.getBufferTemplate.call(inputmask).join("") ? buffer = [] : _inputHandling.clearOptionalTail.call(inputmask, buffer)), 
					!1 === _validation.isComplete.call(inputmask, buffer) && (setTimeout(function() {
						$input.trigger("incomplete");
					}, 0), opts.clearIncomplete && (_positioning.resetMaskSet.call(inputmask), buffer = opts.clearMaskOnLostFocus ? [] : _positioning.getBufferTemplate.call(inputmask).slice())), 
					(0, _inputHandling.writeBuffer)(this, buffer, void 0, e)), inputmask.undoValue !== _positioning.getBuffer.call(inputmask).join("") && (inputmask.undoValue = _positioning.getBuffer.call(inputmask).join(""), 
					$input.trigger("change"));
				}
			},
			mouseenterEvent: function mouseenterEvent() {
				var inputmask = this.inputmask, opts = inputmask.opts, input = this;
				inputmask.mouseEnter = !0, (this.inputmask.shadowRoot || document).activeElement !== this && (null == inputmask.originalPlaceholder && this.placeholder !== inputmask.originalPlaceholder && (inputmask.originalPlaceholder = this.placeholder), 
				opts.showMaskOnHover && (0, _inputHandling.HandleNativePlaceholder)(this, (inputmask.isRTL ? _positioning.getBufferTemplate.call(inputmask).slice().reverse() : _positioning.getBufferTemplate.call(inputmask)).join("")));
			},
			submitEvent: function submitEvent() {
				var inputmask = this.inputmask, opts = inputmask.opts;
				inputmask.undoValue !== _positioning.getBuffer.call(inputmask).join("") && inputmask.$el.trigger("change"), 
				opts.clearMaskOnLostFocus && -1 === _positioning.getLastValidPosition.call(inputmask) && inputmask._valueGet && inputmask._valueGet() === _positioning.getBufferTemplate.call(inputmask).join("") && inputmask._valueSet(""), 
				opts.clearIncomplete && !1 === _validation.isComplete.call(inputmask, _positioning.getBuffer.call(inputmask)) && inputmask._valueSet(""), 
				opts.removeMaskOnSubmit && (inputmask._valueSet(inputmask.unmaskedvalue(), !0), 
				setTimeout(function() {
					(0, _inputHandling.writeBuffer)(inputmask.el, _positioning.getBuffer.call(inputmask));
				}, 0));
			},
			resetEvent: function resetEvent() {
				var inputmask = this.inputmask;
				inputmask.refreshValue = !0, setTimeout(function() {
					(0, _inputHandling.applyInputValue)(inputmask.el, inputmask._valueGet(!0));
				}, 0);
			}
		};
		exports.EventHandlers = EventHandlers;
	}, function(module, exports, __webpack_require__) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.iphone = exports.iemobile = exports.mobile = exports.ie = exports.ua = void 0;
		var ua = window.navigator && window.navigator.userAgent || "", ie = 0 < ua.indexOf("MSIE ") || 0 < ua.indexOf("Trident/"), mobile = "ontouchstart" in window, iemobile = /iemobile/i.test(ua), iphone = /iphone/i.test(ua) && !iemobile;
		exports.iphone = iphone, exports.iemobile = iemobile, exports.mobile = mobile, exports.ie = ie, 
		exports.ua = ua;
	}, function(module, exports) {
		module.exports = __WEBPACK_EXTERNAL_MODULE__8__;
	}, function(module, exports, __webpack_require__) {
		"use strict";
		function _typeof(obj) {
			return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(obj) {
				return typeof obj;
			} : function _typeof(obj) {
				return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
			}, _typeof(obj);
		}
		"function" != typeof Object.getPrototypeOf && (Object.getPrototypeOf = "object" === _typeof("test".__proto__) ? function(object) {
			return object.__proto__;
		} : function(object) {
			return object.constructor.prototype;
		});
	}, function(module, exports, __webpack_require__) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.mask = mask, __webpack_require__(9);
		var _keycode = _interopRequireDefault(__webpack_require__(0)), _positioning = __webpack_require__(2), _inputHandling = __webpack_require__(5), _eventruler = __webpack_require__(11), _environment = __webpack_require__(7), _validation = __webpack_require__(4), _eventhandlers = __webpack_require__(6);
		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : {
				default: obj
			};
		}
		function mask() {
			var inputmask = this, opts = this.opts, el = this.el, $ = this.dependencyLib;
			function isElementTypeSupported(input, opts) {
				function patchValueProperty(npt) {
					var valueGet, valueSet;
					function patchValhook(type) {
						if ($.valHooks && (void 0 === $.valHooks[type] || !0 !== $.valHooks[type].inputmaskpatch)) {
							var valhookGet = $.valHooks[type] && $.valHooks[type].get ? $.valHooks[type].get : function(elem) {
								return elem.value;
							}, valhookSet = $.valHooks[type] && $.valHooks[type].set ? $.valHooks[type].set : function(elem, value) {
								return elem.value = value, elem;
							};
							$.valHooks[type] = {
								get: function get(elem) {
									if (elem.inputmask) {
										if (elem.inputmask.opts.autoUnmask) return elem.inputmask.unmaskedvalue();
										var result = valhookGet(elem);
										return -1 !== _positioning.getLastValidPosition.call(inputmask, void 0, void 0, elem.inputmask.maskset.validPositions) || !0 !== opts.nullable ? result : "";
									}
									return valhookGet(elem);
								},
								set: function set(elem, value) {
									var result = valhookSet(elem, value);
									return elem.inputmask && (0, _inputHandling.applyInputValue)(elem, value), result;
								},
								inputmaskpatch: !0
							};
						}
					}
					function getter() {
						return this.inputmask ? this.inputmask.opts.autoUnmask ? this.inputmask.unmaskedvalue() : -1 !== _positioning.getLastValidPosition.call(inputmask) || !0 !== opts.nullable ? (this.inputmask.shadowRoot || document.activeElement) === this && opts.clearMaskOnLostFocus ? (inputmask.isRTL ? _inputHandling.clearOptionalTail.call(inputmask, _positioning.getBuffer.call(inputmask).slice()).reverse() : _inputHandling.clearOptionalTail.call(inputmask, _positioning.getBuffer.call(inputmask).slice())).join("") : valueGet.call(this) : "" : valueGet.call(this);
					}
					function setter(value) {
						valueSet.call(this, value), this.inputmask && (0, _inputHandling.applyInputValue)(this, value);
					}
					function installNativeValueSetFallback(npt) {
						_eventruler.EventRuler.on(npt, "mouseenter", function() {
							var input = this, value = this.inputmask._valueGet(!0);
							value !== (inputmask.isRTL ? _positioning.getBuffer.call(inputmask).reverse() : _positioning.getBuffer.call(inputmask)).join("") && (0, 
							_inputHandling.applyInputValue)(this, value);
						});
					}
					if (!npt.inputmask.__valueGet) {
						if (!0 !== opts.noValuePatching) {
							if (Object.getOwnPropertyDescriptor) {
								var valueProperty = Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(npt), "value") : void 0;
								valueProperty && valueProperty.get && valueProperty.set ? (valueGet = valueProperty.get, 
								valueSet = valueProperty.set, Object.defineProperty(npt, "value", {
									get: getter,
									set: setter,
									configurable: !0
								})) : "input" !== npt.tagName.toLowerCase() && (valueGet = function valueGet() {
									return this.textContent;
								}, valueSet = function valueSet(value) {
									this.textContent = value;
								}, Object.defineProperty(npt, "value", {
									get: getter,
									set: setter,
									configurable: !0
								}));
							} else document.__lookupGetter__ && npt.__lookupGetter__("value") && (valueGet = npt.__lookupGetter__("value"), 
							valueSet = npt.__lookupSetter__("value"), npt.__defineGetter__("value", getter), 
							npt.__defineSetter__("value", setter));
							npt.inputmask.__valueGet = valueGet, npt.inputmask.__valueSet = valueSet;
						}
						npt.inputmask._valueGet = function(overruleRTL) {
							return inputmask.isRTL && !0 !== overruleRTL ? valueGet.call(this.el).split("").reverse().join("") : valueGet.call(this.el);
						}, npt.inputmask._valueSet = function(value, overruleRTL) {
							valueSet.call(this.el, null == value ? "" : !0 !== overruleRTL && inputmask.isRTL ? value.split("").reverse().join("") : value);
						}, void 0 === valueGet && (valueGet = function valueGet() {
							return this.value;
						}, valueSet = function valueSet(value) {
							this.value = value;
						}, patchValhook(npt.type), installNativeValueSetFallback(npt));
					}
				}
				"textarea" !== input.tagName.toLowerCase() && opts.ignorables.push(_keycode.default.ENTER);
				var elementType = input.getAttribute("type"), isSupported = "input" === input.tagName.toLowerCase() && opts.supportsInputType.includes(elementType) || input.isContentEditable || "textarea" === input.tagName.toLowerCase();
				if (!isSupported) if ("input" === input.tagName.toLowerCase()) {
					var el = document.createElement("input");
					el.setAttribute("type", elementType), isSupported = "text" === el.type, el = null;
				} else isSupported = "partial";
				return !1 !== isSupported ? patchValueProperty(input) : input.inputmask = void 0, 
				isSupported;
			}
			_eventruler.EventRuler.off(el);
			var isSupported = isElementTypeSupported(el, opts);
			if (!1 !== isSupported) {
				inputmask.originalPlaceholder = el.placeholder, inputmask.maxLength = void 0 !== el ? el.maxLength : void 0, 
				-1 === inputmask.maxLength && (inputmask.maxLength = void 0), "inputMode" in el && null === el.getAttribute("inputmode") && (el.inputMode = opts.inputmode, 
				el.setAttribute("inputmode", opts.inputmode)), !0 === isSupported && (opts.showMaskOnFocus = opts.showMaskOnFocus && -1 === [ "cc-number", "cc-exp" ].indexOf(el.autocomplete), 
				_environment.iphone && (opts.insertModeVisual = !1), _eventruler.EventRuler.on(el, "submit", _eventhandlers.EventHandlers.submitEvent), 
				_eventruler.EventRuler.on(el, "reset", _eventhandlers.EventHandlers.resetEvent), 
				_eventruler.EventRuler.on(el, "blur", _eventhandlers.EventHandlers.blurEvent), _eventruler.EventRuler.on(el, "focus", _eventhandlers.EventHandlers.focusEvent), 
				_eventruler.EventRuler.on(el, "invalid", _eventhandlers.EventHandlers.invalidEvent), 
				_eventruler.EventRuler.on(el, "click", _eventhandlers.EventHandlers.clickEvent), 
				_eventruler.EventRuler.on(el, "mouseleave", _eventhandlers.EventHandlers.mouseleaveEvent), 
				_eventruler.EventRuler.on(el, "mouseenter", _eventhandlers.EventHandlers.mouseenterEvent), 
				_eventruler.EventRuler.on(el, "paste", _eventhandlers.EventHandlers.pasteEvent), 
				_eventruler.EventRuler.on(el, "cut", _eventhandlers.EventHandlers.cutEvent), _eventruler.EventRuler.on(el, "complete", opts.oncomplete), 
				_eventruler.EventRuler.on(el, "incomplete", opts.onincomplete), _eventruler.EventRuler.on(el, "cleared", opts.oncleared), 
				!0 !== opts.inputEventOnly && (_eventruler.EventRuler.on(el, "keydown", _eventhandlers.EventHandlers.keydownEvent), 
				_eventruler.EventRuler.on(el, "keypress", _eventhandlers.EventHandlers.keypressEvent), 
				_eventruler.EventRuler.on(el, "keyup", _eventhandlers.EventHandlers.keyupEvent)), 
				(_environment.mobile || opts.inputEventOnly) && el.removeAttribute("maxLength"), 
				_eventruler.EventRuler.on(el, "input", _eventhandlers.EventHandlers.inputFallBackEvent), 
				_eventruler.EventRuler.on(el, "compositionend", _eventhandlers.EventHandlers.compositionendEvent)), 
				_eventruler.EventRuler.on(el, "setvalue", _eventhandlers.EventHandlers.setValueEvent), 
				inputmask.undoValue = _positioning.getBufferTemplate.call(inputmask).join("");
				var activeElement = (el.inputmask.shadowRoot || document).activeElement;
				if ("" !== el.inputmask._valueGet(!0) || !1 === opts.clearMaskOnLostFocus || activeElement === el) {
					(0, _inputHandling.applyInputValue)(el, el.inputmask._valueGet(!0), opts);
					var buffer = _positioning.getBuffer.call(inputmask).slice();
					!1 === _validation.isComplete.call(inputmask, buffer) && opts.clearIncomplete && _positioning.resetMaskSet.call(inputmask), 
					opts.clearMaskOnLostFocus && activeElement !== el && (-1 === _positioning.getLastValidPosition.call(inputmask) ? buffer = [] : _inputHandling.clearOptionalTail.call(inputmask, buffer)), 
					(!1 === opts.clearMaskOnLostFocus || opts.showMaskOnFocus && activeElement === el || "" !== el.inputmask._valueGet(!0)) && (0, 
					_inputHandling.writeBuffer)(el, buffer), activeElement === el && _positioning.caret.call(inputmask, el, _positioning.seekNext.call(inputmask, _positioning.getLastValidPosition.call(inputmask)));
				}
			}
		}
	}, function(module, exports, __webpack_require__) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.EventRuler = void 0;
		var _inputmask = _interopRequireDefault(__webpack_require__(1)), _keycode = _interopRequireDefault(__webpack_require__(0)), _positioning = __webpack_require__(2), _inputHandling = __webpack_require__(5);
		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : {
				default: obj
			};
		}
		var EventRuler = {
			on: function on(input, eventName, eventHandler) {
				var $ = input.inputmask.dependencyLib, ev = function ev(e) {
					e.originalEvent && (e = e.originalEvent || e, arguments[0] = e);
					var that = this, args, inputmask = that.inputmask, opts = inputmask ? inputmask.opts : void 0, $ = inputmask.dependencyLib;
					if (void 0 === inputmask && "FORM" !== this.nodeName) {
						var imOpts = $.data(that, "_inputmask_opts");
						$(that).off(), imOpts && new _inputmask.default(imOpts).mask(that);
					} else {
						if ("setvalue" === e.type || "FORM" === this.nodeName || !(that.disabled || that.readOnly && !("keydown" === e.type && e.ctrlKey && 67 === e.keyCode || !1 === opts.tabThrough && e.keyCode === _keycode.default.TAB))) {
							switch (e.type) {
							  case "input":
								if (!0 === inputmask.skipInputEvent || e.inputType && "insertCompositionText" === e.inputType) return inputmask.skipInputEvent = !1, 
								e.preventDefault();
								break;

							  case "keydown":
								inputmask.skipKeyPressEvent = !1, inputmask.skipInputEvent = inputmask.isComposing = e.keyCode === _keycode.default.KEY_229;
								break;

							  case "keyup":
							  case "compositionend":
								inputmask.isComposing && (inputmask.skipInputEvent = !1);
								break;

							  case "keypress":
								if (!0 === inputmask.skipKeyPressEvent) return e.preventDefault();
								inputmask.skipKeyPressEvent = !0;
								break;

							  case "click":
							  case "focus":
								return inputmask.validationEvent ? (inputmask.validationEvent = !1, input.blur(), 
								(0, _inputHandling.HandleNativePlaceholder)(input, (inputmask.isRTL ? _positioning.getBufferTemplate.call(inputmask).slice().reverse() : _positioning.getBufferTemplate.call(inputmask)).join("")), 
								setTimeout(function() {
									input.focus();
								}, 3e3)) : (args = arguments, setTimeout(function() {
									input.inputmask && eventHandler.apply(that, args);
								}, 0)), !1;
							}
							var returnVal = eventHandler.apply(that, arguments);
							return !1 === returnVal && (e.preventDefault(), e.stopPropagation()), returnVal;
						}
						e.preventDefault();
					}
				};
				input.inputmask.events[eventName] = input.inputmask.events[eventName] || [], input.inputmask.events[eventName].push(ev), 
				[ "submit", "reset" ].includes(eventName) ? null !== input.form && $(input.form).on(eventName, ev.bind(input)) : $(input).on(eventName, ev);
			},
			off: function off(input, event) {
				if (input.inputmask && input.inputmask.events) {
					var $ = input.inputmask.dependencyLib, events = input.inputmask.events;
					for (var eventName in event && (events = [], events[event] = input.inputmask.events[event]), 
					events) {
						for (var evArr = events[eventName]; 0 < evArr.length; ) {
							var ev = evArr.pop();
							[ "submit", "reset" ].includes(eventName) ? null !== input.form && $(input.form).off(eventName, ev) : $(input).off(eventName, ev);
						}
						delete input.inputmask.events[eventName];
					}
				}
			}
		};
		exports.EventRuler = EventRuler;
	}, function(module, exports, __webpack_require__) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var _jquery = _interopRequireDefault(__webpack_require__(8));
		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : {
				default: obj
			};
		}
		if (void 0 === _jquery.default) throw "jQuery not loaded!";
		var _default = _jquery.default;
		exports.default = _default;
	}, function(module, exports, __webpack_require__) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var _default = "undefined" != typeof window ? window : new (eval("require('jsdom').JSDOM"))("").window;
		exports.default = _default;
	}, function(module, exports, __webpack_require__) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = _default;
		var escapeRegexRegex = new RegExp("(\\" + [ "/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^" ].join("|\\") + ")", "gim");
		function _default(str) {
			return str.replace(escapeRegexRegex, "\\$1");
		}
	}, function(module, exports, __webpack_require__) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0, __webpack_require__(16), __webpack_require__(20), 
		__webpack_require__(21), __webpack_require__(22);
		var _inputmask2 = _interopRequireDefault(__webpack_require__(1));
		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : {
				default: obj
			};
		}
		var _default = _inputmask2.default;
		exports.default = _default;
	}, function(module, exports, __webpack_require__) {
		"use strict";
		var _inputmask = _interopRequireDefault(__webpack_require__(1));
		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : {
				default: obj
			};
		}
		_inputmask.default.extendDefinitions({
			A: {
				validator: "[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
				casing: "upper"
			},
			"&": {
				validator: "[0-9A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
				casing: "upper"
			},
			"#": {
				validator: "[0-9A-Fa-f]",
				casing: "upper"
			}
		});
		var ipValidatorRegex = new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]");
		function ipValidator(chrs, maskset, pos, strict, opts) {
			return chrs = -1 < pos - 1 && "." !== maskset.buffer[pos - 1] ? (chrs = maskset.buffer[pos - 1] + chrs, 
			-1 < pos - 2 && "." !== maskset.buffer[pos - 2] ? maskset.buffer[pos - 2] + chrs : "0" + chrs) : "00" + chrs, 
			ipValidatorRegex.test(chrs);
		}
		_inputmask.default.extendAliases({
			cssunit: {
				regex: "[+-]?[0-9]+\\.?([0-9]+)?(px|em|rem|ex|%|in|cm|mm|pt|pc)"
			},
			url: {
				regex: "(https?|ftp)://.*",
				autoUnmask: !1,
				keepStatic: !1,
				tabThrough: !0
			},
			ip: {
				mask: "i[i[i]].j[j[j]].k[k[k]].l[l[l]]",
				definitions: {
					i: {
						validator: ipValidator
					},
					j: {
						validator: ipValidator
					},
					k: {
						validator: ipValidator
					},
					l: {
						validator: ipValidator
					}
				},
				onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
					return maskedValue;
				},
				inputmode: "numeric"
			},
			email: {
				mask: "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]",
				greedy: !1,
				casing: "lower",
				onBeforePaste: function onBeforePaste(pastedValue, opts) {
					return pastedValue = pastedValue.toLowerCase(), pastedValue.replace("mailto:", "");
				},
				definitions: {
					"*": {
						validator: "[0-9\uff11-\uff19A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5!#$%&'*+/=?^_`{|}~-]"
					},
					"-": {
						validator: "[0-9A-Za-z-]"
					}
				},
				onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
					return maskedValue;
				},
				inputmode: "email"
			},
			mac: {
				mask: "##:##:##:##:##:##"
			},
			vin: {
				mask: "V{13}9{4}",
				definitions: {
					V: {
						validator: "[A-HJ-NPR-Za-hj-npr-z\\d]",
						casing: "upper"
					}
				},
				clearIncomplete: !0,
				autoUnmask: !0
			},
			ssn: {
				mask: "999-99-9999",
				postValidation: function postValidation(buffer, pos, c, currentResult, opts, maskset, strict) {
					return /^(?!219-09-9999|078-05-1120)(?!666|000|9.{2}).{3}-(?!00).{2}-(?!0{4}).{4}$/.test(buffer.join(""));
				}
			}
		});
	}, function(module, exports, __webpack_require__) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.generateMaskSet = generateMaskSet, exports.analyseMask = analyseMask;
		var _inputmask = _interopRequireDefault(__webpack_require__(12));
		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : {
				default: obj
			};
		}
		function generateMaskSet(opts, nocache) {
			var ms;
			function generateMask(mask, metadata, opts) {
				var regexMask = !1, masksetDefinition, maskdefKey;
				if (null !== mask && "" !== mask || (regexMask = null !== opts.regex, mask = regexMask ? (mask = opts.regex, 
				mask.replace(/^(\^)(.*)(\$)$/, "$2")) : (regexMask = !0, ".*")), 1 === mask.length && !1 === opts.greedy && 0 !== opts.repeat && (opts.placeholder = ""), 
				0 < opts.repeat || "*" === opts.repeat || "+" === opts.repeat) {
					var repeatStart = "*" === opts.repeat ? 0 : "+" === opts.repeat ? 1 : opts.repeat;
					mask = opts.groupmarker[0] + mask + opts.groupmarker[1] + opts.quantifiermarker[0] + repeatStart + "," + opts.repeat + opts.quantifiermarker[1];
				}
				return maskdefKey = regexMask ? "regex_" + opts.regex : opts.numericInput ? mask.split("").reverse().join("") : mask, 
				!1 !== opts.keepStatic && (maskdefKey = "ks_" + maskdefKey), void 0 === Inputmask.prototype.masksCache[maskdefKey] || !0 === nocache ? (masksetDefinition = {
					mask: mask,
					maskToken: Inputmask.prototype.analyseMask(mask, regexMask, opts),
					validPositions: {},
					_buffer: void 0,
					buffer: void 0,
					tests: {},
					excludes: {},
					metadata: metadata,
					maskLength: void 0,
					jitOffset: {}
				}, !0 !== nocache && (Inputmask.prototype.masksCache[maskdefKey] = masksetDefinition, 
				masksetDefinition = _inputmask.default.extend(!0, {}, Inputmask.prototype.masksCache[maskdefKey]))) : masksetDefinition = _inputmask.default.extend(!0, {}, Inputmask.prototype.masksCache[maskdefKey]), 
				masksetDefinition;
			}
			if ("function" == typeof opts.mask && (opts.mask = opts.mask(opts)), Array.isArray(opts.mask)) {
				if (1 < opts.mask.length) {
					null === opts.keepStatic && (opts.keepStatic = !0);
					var altMask = opts.groupmarker[0];
					return (opts.isRTL ? opts.mask.reverse() : opts.mask).forEach(function(msk) {
						1 < altMask.length && (altMask += opts.groupmarker[1] + opts.alternatormarker + opts.groupmarker[0]), 
						void 0 !== msk.mask && "function" != typeof msk.mask ? altMask += msk.mask : altMask += msk;
					}), altMask += opts.groupmarker[1], generateMask(altMask, opts.mask, opts);
				}
				opts.mask = opts.mask.pop();
			}
			return null === opts.keepStatic && (opts.keepStatic = !1), ms = opts.mask && void 0 !== opts.mask.mask && "function" != typeof opts.mask.mask ? generateMask(opts.mask.mask, opts.mask, opts) : generateMask(opts.mask, opts.mask, opts), 
			ms;
		}
		function analyseMask(mask, regexMask, opts) {
			var tokenizer = /(?:[?*+]|\{[0-9+*]+(?:,[0-9+*]*)?(?:\|[0-9+*]*)?\})|[^.?*+^${[]()|\\]+|./g, regexTokenizer = /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g, escaped = !1, currentToken = new MaskToken(), match, m, openenings = [], maskTokens = [], openingToken, currentOpeningToken, alternator, lastMatch, closeRegexGroup = !1;
			function MaskToken(isGroup, isOptional, isQuantifier, isAlternator) {
				this.matches = [], this.openGroup = isGroup || !1, this.alternatorGroup = !1, this.isGroup = isGroup || !1, 
				this.isOptional = isOptional || !1, this.isQuantifier = isQuantifier || !1, this.isAlternator = isAlternator || !1, 
				this.quantifier = {
					min: 1,
					max: 1
				};
			}
			function insertTestDefinition(mtoken, element, position) {
				position = void 0 !== position ? position : mtoken.matches.length;
				var prevMatch = mtoken.matches[position - 1];
				if (regexMask) 0 === element.indexOf("[") || escaped && /\\d|\\s|\\w]/i.test(element) || "." === element ? mtoken.matches.splice(position++, 0, {
					fn: new RegExp(element, opts.casing ? "i" : ""),
					static: !1,
					optionality: !1,
					newBlockMarker: void 0 === prevMatch ? "master" : prevMatch.def !== element,
					casing: null,
					def: element,
					placeholder: void 0,
					nativeDef: element
				}) : (escaped && (element = element[element.length - 1]), element.split("").forEach(function(lmnt, ndx) {
					prevMatch = mtoken.matches[position - 1], mtoken.matches.splice(position++, 0, {
						fn: /[a-z]/i.test(opts.staticDefinitionSymbol || lmnt) ? new RegExp("[" + (opts.staticDefinitionSymbol || lmnt) + "]", opts.casing ? "i" : "") : null,
						static: !0,
						optionality: !1,
						newBlockMarker: void 0 === prevMatch ? "master" : prevMatch.def !== lmnt && !0 !== prevMatch.static,
						casing: null,
						def: opts.staticDefinitionSymbol || lmnt,
						placeholder: void 0 !== opts.staticDefinitionSymbol ? lmnt : void 0,
						nativeDef: (escaped ? "'" : "") + lmnt
					});
				})), escaped = !1; else {
					var maskdef = opts.definitions && opts.definitions[element] || opts.usePrototypeDefinitions && Inputmask.prototype.definitions[element];
					maskdef && !escaped ? mtoken.matches.splice(position++, 0, {
						fn: maskdef.validator ? "string" == typeof maskdef.validator ? new RegExp(maskdef.validator, opts.casing ? "i" : "") : new function() {
							this.test = maskdef.validator;
						}() : new RegExp("."),
						static: maskdef.static || !1,
						optionality: !1,
						newBlockMarker: void 0 === prevMatch ? "master" : prevMatch.def !== (maskdef.definitionSymbol || element),
						casing: maskdef.casing,
						def: maskdef.definitionSymbol || element,
						placeholder: maskdef.placeholder,
						nativeDef: element,
						generated: maskdef.generated
					}) : (mtoken.matches.splice(position++, 0, {
						fn: /[a-z]/i.test(opts.staticDefinitionSymbol || element) ? new RegExp("[" + (opts.staticDefinitionSymbol || element) + "]", opts.casing ? "i" : "") : null,
						static: !0,
						optionality: !1,
						newBlockMarker: void 0 === prevMatch ? "master" : prevMatch.def !== element && !0 !== prevMatch.static,
						casing: null,
						def: opts.staticDefinitionSymbol || element,
						placeholder: void 0 !== opts.staticDefinitionSymbol ? element : void 0,
						nativeDef: (escaped ? "'" : "") + element
					}), escaped = !1);
				}
			}
			function verifyGroupMarker(maskToken) {
				maskToken && maskToken.matches && maskToken.matches.forEach(function(token, ndx) {
					var nextToken = maskToken.matches[ndx + 1];
					(void 0 === nextToken || void 0 === nextToken.matches || !1 === nextToken.isQuantifier) && token && token.isGroup && (token.isGroup = !1, 
					regexMask || (insertTestDefinition(token, opts.groupmarker[0], 0), !0 !== token.openGroup && insertTestDefinition(token, opts.groupmarker[1]))), 
					verifyGroupMarker(token);
				});
			}
			function defaultCase() {
				if (0 < openenings.length) {
					if (currentOpeningToken = openenings[openenings.length - 1], insertTestDefinition(currentOpeningToken, m), 
					currentOpeningToken.isAlternator) {
						alternator = openenings.pop();
						for (var mndx = 0; mndx < alternator.matches.length; mndx++) alternator.matches[mndx].isGroup && (alternator.matches[mndx].isGroup = !1);
						0 < openenings.length ? (currentOpeningToken = openenings[openenings.length - 1], 
						currentOpeningToken.matches.push(alternator)) : currentToken.matches.push(alternator);
					}
				} else insertTestDefinition(currentToken, m);
			}
			function reverseTokens(maskToken) {
				function reverseStatic(st) {
					return st === opts.optionalmarker[0] ? st = opts.optionalmarker[1] : st === opts.optionalmarker[1] ? st = opts.optionalmarker[0] : st === opts.groupmarker[0] ? st = opts.groupmarker[1] : st === opts.groupmarker[1] && (st = opts.groupmarker[0]), 
					st;
				}
				for (var match in maskToken.matches = maskToken.matches.reverse(), maskToken.matches) if (Object.prototype.hasOwnProperty.call(maskToken.matches, match)) {
					var intMatch = parseInt(match);
					if (maskToken.matches[match].isQuantifier && maskToken.matches[intMatch + 1] && maskToken.matches[intMatch + 1].isGroup) {
						var qt = maskToken.matches[match];
						maskToken.matches.splice(match, 1), maskToken.matches.splice(intMatch + 1, 0, qt);
					}
					void 0 !== maskToken.matches[match].matches ? maskToken.matches[match] = reverseTokens(maskToken.matches[match]) : maskToken.matches[match] = reverseStatic(maskToken.matches[match]);
				}
				return maskToken;
			}
			function groupify(matches) {
				var groupToken = new MaskToken(!0);
				return groupToken.openGroup = !1, groupToken.matches = matches, groupToken;
			}
			function closeGroup() {
				if (openingToken = openenings.pop(), openingToken.openGroup = !1, void 0 !== openingToken) if (0 < openenings.length) {
					if (currentOpeningToken = openenings[openenings.length - 1], currentOpeningToken.matches.push(openingToken), 
					currentOpeningToken.isAlternator) {
						alternator = openenings.pop();
						for (var mndx = 0; mndx < alternator.matches.length; mndx++) alternator.matches[mndx].isGroup = !1, 
						alternator.matches[mndx].alternatorGroup = !1;
						0 < openenings.length ? (currentOpeningToken = openenings[openenings.length - 1], 
						currentOpeningToken.matches.push(alternator)) : currentToken.matches.push(alternator);
					}
				} else currentToken.matches.push(openingToken); else defaultCase();
			}
			function groupQuantifier(matches) {
				var lastMatch = matches.pop();
				return lastMatch.isQuantifier && (lastMatch = groupify([ matches.pop(), lastMatch ])), 
				lastMatch;
			}
			for (regexMask && (opts.optionalmarker[0] = void 0, opts.optionalmarker[1] = void 0); match = regexMask ? regexTokenizer.exec(mask) : tokenizer.exec(mask); ) {
				if (m = match[0], regexMask) switch (m.charAt(0)) {
				  case "?":
					m = "{0,1}";
					break;

				  case "+":
				  case "*":
					m = "{" + m + "}";
					break;

				  case "|":
					if (0 === openenings.length) {
						var altRegexGroup = groupify(currentToken.matches);
						altRegexGroup.openGroup = !0, openenings.push(altRegexGroup), currentToken.matches = [], 
						closeRegexGroup = !0;
					}
					break;
				}
				if (escaped) defaultCase(); else switch (m.charAt(0)) {
				  case "$":
				  case "^":
					regexMask || defaultCase();
					break;

				  case "(?=":
					break;

				  case "(?!":
					break;

				  case "(?<=":
					break;

				  case "(?<!":
					break;

				  case opts.escapeChar:
					escaped = !0, regexMask && defaultCase();
					break;

				  case opts.optionalmarker[1]:
				  case opts.groupmarker[1]:
					closeGroup();
					break;

				  case opts.optionalmarker[0]:
					openenings.push(new MaskToken(!1, !0));
					break;

				  case opts.groupmarker[0]:
					openenings.push(new MaskToken(!0));
					break;

				  case opts.quantifiermarker[0]:
					var quantifier = new MaskToken(!1, !1, !0);
					m = m.replace(/[{}]/g, "");
					var mqj = m.split("|"), mq = mqj[0].split(","), mq0 = isNaN(mq[0]) ? mq[0] : parseInt(mq[0]), mq1 = 1 === mq.length ? mq0 : isNaN(mq[1]) ? mq[1] : parseInt(mq[1]);
					"*" !== mq0 && "+" !== mq0 || (mq0 = "*" === mq1 ? 0 : 1), quantifier.quantifier = {
						min: mq0,
						max: mq1,
						jit: mqj[1]
					};
					var matches = 0 < openenings.length ? openenings[openenings.length - 1].matches : currentToken.matches;
					if (match = matches.pop(), match.isAlternator) {
						matches.push(match), matches = match.matches;
						var groupToken = new MaskToken(!0), tmpMatch = matches.pop();
						matches.push(groupToken), matches = groupToken.matches, match = tmpMatch;
					}
					match.isGroup || (match = groupify([ match ])), matches.push(match), matches.push(quantifier);
					break;

				  case opts.alternatormarker:
					if (0 < openenings.length) {
						currentOpeningToken = openenings[openenings.length - 1];
						var subToken = currentOpeningToken.matches[currentOpeningToken.matches.length - 1];
						lastMatch = currentOpeningToken.openGroup && (void 0 === subToken.matches || !1 === subToken.isGroup && !1 === subToken.isAlternator) ? openenings.pop() : groupQuantifier(currentOpeningToken.matches);
					} else lastMatch = groupQuantifier(currentToken.matches);
					if (lastMatch.isAlternator) openenings.push(lastMatch); else if (lastMatch.alternatorGroup ? (alternator = openenings.pop(), 
					lastMatch.alternatorGroup = !1) : alternator = new MaskToken(!1, !1, !1, !0), alternator.matches.push(lastMatch), 
					openenings.push(alternator), lastMatch.openGroup) {
						lastMatch.openGroup = !1;
						var alternatorGroup = new MaskToken(!0);
						alternatorGroup.alternatorGroup = !0, openenings.push(alternatorGroup);
					}
					break;

				  default:
					defaultCase();
				}
			}
			for (closeRegexGroup && closeGroup(); 0 < openenings.length; ) openingToken = openenings.pop(), 
			currentToken.matches.push(openingToken);
			return 0 < currentToken.matches.length && (verifyGroupMarker(currentToken), maskTokens.push(currentToken)), 
			(opts.numericInput || opts.isRTL) && reverseTokens(maskTokens[0]), maskTokens;
		}
	}, function(module, exports, __webpack_require__) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var _default = {
			9: {
				validator: "[0-9\uff10-\uff19]",
				definitionSymbol: "*"
			},
			a: {
				validator: "[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
				definitionSymbol: "*"
			},
			"*": {
				validator: "[0-9\uff10-\uff19A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]"
			}
		};
		exports.default = _default;
	}, function(module, exports, __webpack_require__) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var _default = {
			_maxTestPos: 500,
			placeholder: "_",
			optionalmarker: [ "[", "]" ],
			quantifiermarker: [ "{", "}" ],
			groupmarker: [ "(", ")" ],
			alternatormarker: "|",
			escapeChar: "\\",
			mask: null,
			regex: null,
			oncomplete: function oncomplete() {},
			onincomplete: function onincomplete() {},
			oncleared: function oncleared() {},
			repeat: 0,
			greedy: !1,
			autoUnmask: !1,
			removeMaskOnSubmit: !1,
			clearMaskOnLostFocus: !0,
			insertMode: !0,
			insertModeVisual: !0,
			clearIncomplete: !1,
			alias: null,
			onKeyDown: function onKeyDown() {},
			onBeforeMask: null,
			onBeforePaste: function onBeforePaste(pastedValue, opts) {
				return "function" == typeof opts.onBeforeMask ? opts.onBeforeMask.call(this, pastedValue, opts) : pastedValue;
			},
			onBeforeWrite: null,
			onUnMask: null,
			showMaskOnFocus: !0,
			showMaskOnHover: !0,
			onKeyValidation: function onKeyValidation() {},
			skipOptionalPartCharacter: " ",
			numericInput: !1,
			rightAlign: !1,
			undoOnEscape: !0,
			radixPoint: "",
			_radixDance: !1,
			groupSeparator: "",
			keepStatic: null,
			positionCaretOnTab: !0,
			tabThrough: !1,
			supportsInputType: [ "text", "tel", "url", "password", "search" ],
			ignorables: [ 8, 9, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 0, 229 ],
			isComplete: null,
			preValidation: null,
			postValidation: null,
			staticDefinitionSymbol: void 0,
			jitMasking: !1,
			nullable: !0,
			inputEventOnly: !1,
			noValuePatching: !1,
			positionCaretOnClick: "lvp",
			casing: null,
			inputmode: "text",
			importDataAttributes: !0,
			shiftPositions: !0,
			usePrototypeDefinitions: !0
		};
		exports.default = _default;
	}, function(module, exports, __webpack_require__) {
		"use strict";
		var _inputmask = _interopRequireDefault(__webpack_require__(1)), _keycode = _interopRequireDefault(__webpack_require__(0)), _escapeRegex = _interopRequireDefault(__webpack_require__(14));
		function _typeof(obj) {
			return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(obj) {
				return typeof obj;
			} : function _typeof(obj) {
				return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
			}, _typeof(obj);
		}
		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : {
				default: obj
			};
		}
		var $ = _inputmask.default.dependencyLib, currentYear = new Date().getFullYear(), formatCode = {
			d: [ "[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", Date.prototype.getDate ],
			dd: [ "0[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", function() {
				return pad(Date.prototype.getDate.call(this), 2);
			} ],
			ddd: [ "" ],
			dddd: [ "" ],
			m: [ "[1-9]|1[012]", Date.prototype.setMonth, "month", function() {
				return Date.prototype.getMonth.call(this) + 1;
			} ],
			mm: [ "0[1-9]|1[012]", Date.prototype.setMonth, "month", function() {
				return pad(Date.prototype.getMonth.call(this) + 1, 2);
			} ],
			mmm: [ "" ],
			mmmm: [ "" ],
			yy: [ "[0-9]{2}", Date.prototype.setFullYear, "year", function() {
				return pad(Date.prototype.getFullYear.call(this), 2);
			} ],
			yyyy: [ "[0-9]{4}", Date.prototype.setFullYear, "year", function() {
				return pad(Date.prototype.getFullYear.call(this), 4);
			} ],
			h: [ "[1-9]|1[0-2]", Date.prototype.setHours, "hours", Date.prototype.getHours ],
			hh: [ "0[1-9]|1[0-2]", Date.prototype.setHours, "hours", function() {
				return pad(Date.prototype.getHours.call(this), 2);
			} ],
			hx: [ function(x) {
				return "[0-9]{".concat(x, "}");
			}, Date.prototype.setHours, "hours", function(x) {
				return Date.prototype.getHours;
			} ],
			H: [ "1?[0-9]|2[0-3]", Date.prototype.setHours, "hours", Date.prototype.getHours ],
			HH: [ "0[0-9]|1[0-9]|2[0-3]", Date.prototype.setHours, "hours", function() {
				return pad(Date.prototype.getHours.call(this), 2);
			} ],
			Hx: [ function(x) {
				return "[0-9]{".concat(x, "}");
			}, Date.prototype.setHours, "hours", function(x) {
				return function() {
					return pad(Date.prototype.getHours.call(this), x);
				};
			} ],
			M: [ "[1-5]?[0-9]", Date.prototype.setMinutes, "minutes", Date.prototype.getMinutes ],
			MM: [ "0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]", Date.prototype.setMinutes, "minutes", function() {
				return pad(Date.prototype.getMinutes.call(this), 2);
			} ],
			s: [ "[1-5]?[0-9]", Date.prototype.setSeconds, "seconds", Date.prototype.getSeconds ],
			ss: [ "0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]", Date.prototype.setSeconds, "seconds", function() {
				return pad(Date.prototype.getSeconds.call(this), 2);
			} ],
			l: [ "[0-9]{3}", Date.prototype.setMilliseconds, "milliseconds", function() {
				return pad(Date.prototype.getMilliseconds.call(this), 3);
			} ],
			L: [ "[0-9]{2}", Date.prototype.setMilliseconds, "milliseconds", function() {
				return pad(Date.prototype.getMilliseconds.call(this), 2);
			} ],
			t: [ "[ap]" ],
			tt: [ "[ap]m" ],
			T: [ "[AP]" ],
			TT: [ "[AP]M" ],
			Z: [ "" ],
			o: [ "" ],
			S: [ "" ]
		}, formatAlias = {
			isoDate: "yyyy-mm-dd",
			isoTime: "HH:MM:ss",
			isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
			isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
		};
		function formatcode(match) {
			var dynMatches = new RegExp("\\d+$").exec(match[0]);
			if (dynMatches && void 0 !== dynMatches[0]) {
				var fcode = formatCode[match[0][0] + "x"].slice("");
				return fcode[0] = fcode[0](dynMatches[0]), fcode[3] = fcode[3](dynMatches[0]), fcode;
			}
			if (formatCode[match[0]]) return formatCode[match[0]];
		}
		function getTokenizer(opts) {
			if (!opts.tokenizer) {
				var tokens = [], dyntokens = [];
				for (var ndx in formatCode) if (/\.*x$/.test(ndx)) {
					var dynToken = ndx[0] + "\\d+";
					-1 === dyntokens.indexOf(dynToken) && dyntokens.push(dynToken);
				} else -1 === tokens.indexOf(ndx[0]) && tokens.push(ndx[0]);
				opts.tokenizer = "(" + (0 < dyntokens.length ? dyntokens.join("|") + "|" : "") + tokens.join("+|") + ")+?|.", 
				opts.tokenizer = new RegExp(opts.tokenizer, "g");
			}
			return opts.tokenizer;
		}
		function prefillYear(dateParts, currentResult, opts) {
			if (dateParts.year !== dateParts.rawyear) {
				var crrntyear = currentYear.toString(), enteredPart = dateParts.rawyear.replace(/[^0-9]/g, ""), currentYearPart = crrntyear.slice(0, enteredPart.length), currentYearNextPart = crrntyear.slice(enteredPart.length);
				if (2 === enteredPart.length && enteredPart === currentYearPart) {
					var entryCurrentYear = new Date(currentYear, dateParts.month - 1, dateParts.day);
					dateParts.day == entryCurrentYear.getDate() && (!opts.max || opts.max.date.getTime() >= entryCurrentYear.getTime()) && (dateParts.date.setFullYear(currentYear), 
					dateParts.year = crrntyear, currentResult.insert = [ {
						pos: currentResult.pos + 1,
						c: currentYearNextPart[0]
					}, {
						pos: currentResult.pos + 2,
						c: currentYearNextPart[1]
					} ]);
				}
			}
			return currentResult;
		}
		function isValidDate(dateParts, currentResult, opts) {
			if (!isFinite(dateParts.rawday) || "29" == dateParts.day && !isFinite(dateParts.rawyear) || new Date(dateParts.date.getFullYear(), isFinite(dateParts.rawmonth) ? dateParts.month : dateParts.date.getMonth() + 1, 0).getDate() >= dateParts.day) return currentResult;
			if ("29" == dateParts.day) {
				var tokenMatch = getTokenMatch(currentResult.pos, opts);
				if ("yyyy" === tokenMatch.targetMatch[0] && currentResult.pos - tokenMatch.targetMatchIndex == 2) return currentResult.remove = currentResult.pos + 1, 
				currentResult;
			}
			return !1;
		}
		function isDateInRange(dateParts, result, opts, maskset, fromCheckval) {
			if (!result) return result;
			if (opts.min) {
				if (dateParts.rawyear) {
					var rawYear = dateParts.rawyear.replace(/[^0-9]/g, ""), minYear = opts.min.year.substr(0, rawYear.length), maxYear;
					if (rawYear < minYear) {
						var tokenMatch = getTokenMatch(result.pos, opts);
						if (rawYear = dateParts.rawyear.substr(0, result.pos - tokenMatch.targetMatchIndex + 1), 
						minYear = opts.min.year.substr(0, rawYear.length), minYear <= rawYear) return result.remove = tokenMatch.targetMatchIndex + rawYear.length, 
						result;
						if (rawYear = "yyyy" === tokenMatch.targetMatch[0] ? dateParts.rawyear.substr(1, 1) : dateParts.rawyear.substr(0, 1), 
						minYear = opts.min.year.substr(2, 1), maxYear = opts.max ? opts.max.year.substr(2, 1) : rawYear, 
						1 === rawYear.length && minYear <= rawYear <= maxYear && !0 !== fromCheckval) return "yyyy" === tokenMatch.targetMatch[0] ? (result.insert = [ {
							pos: result.pos + 1,
							c: rawYear,
							strict: !0
						} ], result.caret = result.pos + 2, maskset.validPositions[result.pos].input = opts.min.year[1]) : (result.insert = [ {
							pos: result.pos + 1,
							c: opts.min.year[1],
							strict: !0
						}, {
							pos: result.pos + 2,
							c: rawYear,
							strict: !0
						} ], result.caret = result.pos + 3, maskset.validPositions[result.pos].input = opts.min.year[0]), 
						result;
						result = !1;
					}
				}
				result && dateParts.year && dateParts.year === dateParts.rawyear && opts.min.date.getTime() == opts.min.date.getTime() && (result = opts.min.date.getTime() <= dateParts.date.getTime());
			}
			return result && opts.max && opts.max.date.getTime() == opts.max.date.getTime() && (result = opts.max.date.getTime() >= dateParts.date.getTime()), 
			result;
		}
		function parse(format, dateObjValue, opts, raw) {
			var mask = "", match, fcode;
			for (getTokenizer(opts).lastIndex = 0; match = getTokenizer(opts).exec(format); ) if (void 0 === dateObjValue) if (fcode = formatcode(match)) mask += "(" + fcode[0] + ")"; else switch (match[0]) {
			  case "[":
				mask += "(";
				break;

			  case "]":
				mask += ")?";
				break;

			  default:
				mask += (0, _escapeRegex.default)(match[0]);
			} else if (fcode = formatcode(match)) if (!0 !== raw && fcode[3]) {
				var getFn = fcode[3];
				mask += getFn.call(dateObjValue.date);
			} else fcode[2] ? mask += dateObjValue["raw" + fcode[2]] : mask += match[0]; else mask += match[0];
			return mask;
		}
		function pad(val, len) {
			for (val = String(val), len = len || 2; val.length < len; ) val = "0" + val;
			return val;
		}
		function analyseMask(maskString, format, opts) {
			var dateObj = {
				date: new Date(1, 0, 1)
			}, targetProp, mask = maskString, match, dateOperation;
			function setValue(dateObj, value, opts) {
				dateObj[targetProp] = value.replace(/[^0-9]/g, "0"), dateObj["raw" + targetProp] = value, 
				void 0 !== dateOperation && dateOperation.call(dateObj.date, "month" == targetProp ? parseInt(dateObj[targetProp]) - 1 : dateObj[targetProp]);
			}
			if ("string" == typeof mask) {
				for (getTokenizer(opts).lastIndex = 0; match = getTokenizer(opts).exec(format); ) {
					var dynMatches = new RegExp("\\d+$").exec(match[0]), fcode = dynMatches ? match[0][0] + "x" : match[0], value = void 0;
					if (dynMatches) {
						var lastIndex = getTokenizer(opts).lastIndex, tokanMatch = getTokenMatch(match.index, opts);
						getTokenizer(opts).lastIndex = lastIndex, value = mask.slice(0, mask.indexOf(tokanMatch.nextMatch[0]));
					} else value = mask.slice(0, fcode.length);
					Object.prototype.hasOwnProperty.call(formatCode, fcode) && (targetProp = formatCode[fcode][2], 
					dateOperation = formatCode[fcode][1], setValue(dateObj, value, opts)), mask = mask.slice(value.length);
				}
				return dateObj;
			}
			if (mask && "object" === _typeof(mask) && Object.prototype.hasOwnProperty.call(mask, "date")) return mask;
		}
		function importDate(dateObj, opts) {
			return parse(opts.inputFormat, {
				date: dateObj
			}, opts);
		}
		function getTokenMatch(pos, opts) {
			var calcPos = 0, targetMatch, match, matchLength = 0;
			for (getTokenizer(opts).lastIndex = 0; match = getTokenizer(opts).exec(opts.inputFormat); ) {
				var dynMatches = new RegExp("\\d+$").exec(match[0]);
				if (matchLength = dynMatches ? parseInt(dynMatches[0]) : match[0].length, calcPos += matchLength, 
				pos <= calcPos) {
					targetMatch = match, match = getTokenizer(opts).exec(opts.inputFormat);
					break;
				}
			}
			return {
				targetMatchIndex: calcPos - matchLength,
				nextMatch: match,
				targetMatch: targetMatch
			};
		}
		_inputmask.default.extendAliases({
			datetime: {
				mask: function mask(opts) {
					return opts.numericInput = !1, formatCode.S = opts.i18n.ordinalSuffix.join("|"), 
					opts.inputFormat = formatAlias[opts.inputFormat] || opts.inputFormat, opts.displayFormat = formatAlias[opts.displayFormat] || opts.displayFormat || opts.inputFormat, 
					opts.outputFormat = formatAlias[opts.outputFormat] || opts.outputFormat || opts.inputFormat, 
					opts.placeholder = "" !== opts.placeholder ? opts.placeholder : opts.inputFormat.replace(/[[\]]/, ""), 
					opts.regex = parse(opts.inputFormat, void 0, opts), opts.min = analyseMask(opts.min, opts.inputFormat, opts), 
					opts.max = analyseMask(opts.max, opts.inputFormat, opts), null;
				},
				placeholder: "",
				inputFormat: "isoDateTime",
				displayFormat: void 0,
				outputFormat: void 0,
				min: null,
				max: null,
				skipOptionalPartCharacter: "",
				i18n: {
					dayNames: [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ],
					monthNames: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
					ordinalSuffix: [ "st", "nd", "rd", "th" ]
				},
				preValidation: function preValidation(buffer, pos, c, isSelection, opts, maskset, caretPos, strict) {
					if (strict) return !0;
					if (isNaN(c) && buffer[pos] !== c) {
						var tokenMatch = getTokenMatch(pos, opts);
						if (tokenMatch.nextMatch && tokenMatch.nextMatch[0] === c && 1 < tokenMatch.targetMatch[0].length) {
							var validator = formatCode[tokenMatch.targetMatch[0]][0];
							if (new RegExp(validator).test("0" + buffer[pos - 1])) return buffer[pos] = buffer[pos - 1], 
							buffer[pos - 1] = "0", {
								fuzzy: !0,
								buffer: buffer,
								refreshFromBuffer: {
									start: pos - 1,
									end: pos + 1
								},
								pos: pos + 1
							};
						}
					}
					return !0;
				},
				postValidation: function postValidation(buffer, pos, c, currentResult, opts, maskset, strict, fromCheckval) {
					if (strict) return !0;
					var tokenMatch, validator;
					if (!1 === currentResult) return tokenMatch = getTokenMatch(pos + 1, opts), tokenMatch.targetMatch && tokenMatch.targetMatchIndex === pos && 1 < tokenMatch.targetMatch[0].length && void 0 !== formatCode[tokenMatch.targetMatch[0]] && (validator = formatCode[tokenMatch.targetMatch[0]][0], 
					new RegExp(validator).test("0" + c)) ? {
						insert: [ {
							pos: pos,
							c: "0"
						}, {
							pos: pos + 1,
							c: c
						} ],
						pos: pos + 1
					} : currentResult;
					if (currentResult.fuzzy && (buffer = currentResult.buffer, pos = currentResult.pos), 
					tokenMatch = getTokenMatch(pos, opts), tokenMatch.targetMatch && tokenMatch.targetMatch[0] && void 0 !== formatCode[tokenMatch.targetMatch[0]]) {
						validator = formatCode[tokenMatch.targetMatch[0]][0];
						var part = buffer.slice(tokenMatch.targetMatchIndex, tokenMatch.targetMatchIndex + tokenMatch.targetMatch[0].length);
						!1 === new RegExp(validator).test(part.join("")) && 2 === tokenMatch.targetMatch[0].length && maskset.validPositions[tokenMatch.targetMatchIndex] && maskset.validPositions[tokenMatch.targetMatchIndex + 1] && (maskset.validPositions[tokenMatch.targetMatchIndex + 1].input = "0");
					}
					var result = currentResult, dateParts = analyseMask(buffer.join(""), opts.inputFormat, opts);
					return result && dateParts.date.getTime() == dateParts.date.getTime() && (result = prefillYear(dateParts, result, opts), 
					result = isValidDate(dateParts, result, opts), result = isDateInRange(dateParts, result, opts, maskset, fromCheckval)), 
					pos && result && currentResult.pos !== pos ? {
						buffer: parse(opts.inputFormat, dateParts, opts).split(""),
						refreshFromBuffer: {
							start: pos,
							end: currentResult.pos
						}
					} : result;
				},
				onKeyDown: function onKeyDown(e, buffer, caretPos, opts) {
					var input = this;
					e.ctrlKey && e.keyCode === _keycode.default.RIGHT && (this.inputmask._valueSet(importDate(new Date(), opts)), 
					$(this).trigger("setvalue"));
				},
				onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
					return unmaskedValue ? parse(opts.outputFormat, analyseMask(maskedValue, opts.inputFormat, opts), opts, !0) : unmaskedValue;
				},
				casing: function casing(elem, test, pos, validPositions) {
					return 0 == test.nativeDef.indexOf("[ap]") ? elem.toLowerCase() : 0 == test.nativeDef.indexOf("[AP]") ? elem.toUpperCase() : elem;
				},
				onBeforeMask: function onBeforeMask(initialValue, opts) {
					return "[object Date]" === Object.prototype.toString.call(initialValue) && (initialValue = importDate(initialValue, opts)), 
					initialValue;
				},
				insertMode: !1,
				shiftPositions: !1,
				keepStatic: !1,
				inputmode: "numeric"
			}
		});
	}, function(module, exports, __webpack_require__) {
		"use strict";
		var _inputmask = _interopRequireDefault(__webpack_require__(1)), _keycode = _interopRequireDefault(__webpack_require__(0)), _escapeRegex = _interopRequireDefault(__webpack_require__(14));
		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : {
				default: obj
			};
		}
		var $ = _inputmask.default.dependencyLib;
		function autoEscape(txt, opts) {
			for (var escapedTxt = "", i = 0; i < txt.length; i++) _inputmask.default.prototype.definitions[txt.charAt(i)] || opts.definitions[txt.charAt(i)] || opts.optionalmarker[0] === txt.charAt(i) || opts.optionalmarker[1] === txt.charAt(i) || opts.quantifiermarker[0] === txt.charAt(i) || opts.quantifiermarker[1] === txt.charAt(i) || opts.groupmarker[0] === txt.charAt(i) || opts.groupmarker[1] === txt.charAt(i) || opts.alternatormarker === txt.charAt(i) ? escapedTxt += "\\" + txt.charAt(i) : escapedTxt += txt.charAt(i);
			return escapedTxt;
		}
		function alignDigits(buffer, digits, opts, force) {
			if (0 < buffer.length && 0 < digits && (!opts.digitsOptional || force)) {
				var radixPosition = buffer.indexOf(opts.radixPoint), negationBack = !1;
				opts.negationSymbol.back === buffer[buffer.length - 1] && (negationBack = !0, buffer.length--), 
				-1 === radixPosition && (buffer.push(opts.radixPoint), radixPosition = buffer.length - 1);
				for (var i = 1; i <= digits; i++) isFinite(buffer[radixPosition + i]) || (buffer[radixPosition + i] = "0");
			}
			return negationBack && buffer.push(opts.negationSymbol.back), buffer;
		}
		function findValidator(symbol, maskset) {
			var posNdx = 0;
			if ("+" === symbol) {
				for (posNdx in maskset.validPositions) ;
				posNdx = parseInt(posNdx);
			}
			for (var tstNdx in maskset.tests) if (tstNdx = parseInt(tstNdx), posNdx <= tstNdx) for (var ndx = 0, ndxl = maskset.tests[tstNdx].length; ndx < ndxl; ndx++) if ((void 0 === maskset.validPositions[tstNdx] || "-" === symbol) && maskset.tests[tstNdx][ndx].match.def === symbol) return tstNdx + (void 0 !== maskset.validPositions[tstNdx] && "-" !== symbol ? 1 : 0);
			return posNdx;
		}
		function findValid(symbol, maskset) {
			var ret = -1;
			for (var ndx in maskset.validPositions) {
				var tst = maskset.validPositions[ndx];
				if (tst && tst.match.def === symbol) {
					ret = parseInt(ndx);
					break;
				}
			}
			return ret;
		}
		function parseMinMaxOptions(opts) {
			void 0 === opts.parseMinMaxOptions && (null !== opts.min && (opts.min = opts.min.toString().replace(new RegExp((0, 
			_escapeRegex.default)(opts.groupSeparator), "g"), ""), "," === opts.radixPoint && (opts.min = opts.min.replace(opts.radixPoint, ".")), 
			opts.min = isFinite(opts.min) ? parseFloat(opts.min) : NaN, isNaN(opts.min) && (opts.min = Number.MIN_VALUE)), 
			null !== opts.max && (opts.max = opts.max.toString().replace(new RegExp((0, _escapeRegex.default)(opts.groupSeparator), "g"), ""), 
			"," === opts.radixPoint && (opts.max = opts.max.replace(opts.radixPoint, ".")), 
			opts.max = isFinite(opts.max) ? parseFloat(opts.max) : NaN, isNaN(opts.max) && (opts.max = Number.MAX_VALUE)), 
			opts.parseMinMaxOptions = "done");
		}
		function genMask(opts) {
			opts.repeat = 0, opts.groupSeparator === opts.radixPoint && opts.digits && "0" !== opts.digits && ("." === opts.radixPoint ? opts.groupSeparator = "," : "," === opts.radixPoint ? opts.groupSeparator = "." : opts.groupSeparator = ""), 
			" " === opts.groupSeparator && (opts.skipOptionalPartCharacter = void 0), 1 < opts.placeholder.length && (opts.placeholder = opts.placeholder.charAt(0)), 
			"radixFocus" === opts.positionCaretOnClick && "" === opts.placeholder && (opts.positionCaretOnClick = "lvp");
			var decimalDef = "0", radixPointDef = opts.radixPoint;
			!0 === opts.numericInput && void 0 === opts.__financeInput ? (decimalDef = "1", 
			opts.positionCaretOnClick = "radixFocus" === opts.positionCaretOnClick ? "lvp" : opts.positionCaretOnClick, 
			opts.digitsOptional = !1, isNaN(opts.digits) && (opts.digits = 2), opts._radixDance = !1, 
			radixPointDef = "," === opts.radixPoint ? "?" : "!", "" !== opts.radixPoint && void 0 === opts.definitions[radixPointDef] && (opts.definitions[radixPointDef] = {}, 
			opts.definitions[radixPointDef].validator = "[" + opts.radixPoint + "]", opts.definitions[radixPointDef].placeholder = opts.radixPoint, 
			opts.definitions[radixPointDef].static = !0, opts.definitions[radixPointDef].generated = !0)) : (opts.__financeInput = !1, 
			opts.numericInput = !0);
			var mask = "[+]", altMask;
			if (mask += autoEscape(opts.prefix, opts), "" !== opts.groupSeparator ? (void 0 === opts.definitions[opts.groupSeparator] && (opts.definitions[opts.groupSeparator] = {}, 
			opts.definitions[opts.groupSeparator].validator = "[" + opts.groupSeparator + "]", 
			opts.definitions[opts.groupSeparator].placeholder = opts.groupSeparator, opts.definitions[opts.groupSeparator].static = !0, 
			opts.definitions[opts.groupSeparator].generated = !0), mask += opts._mask(opts)) : mask += "9{+}", 
			void 0 !== opts.digits && 0 !== opts.digits) {
				var dq = opts.digits.toString().split(",");
				isFinite(dq[0]) && dq[1] && isFinite(dq[1]) ? mask += radixPointDef + decimalDef + "{" + opts.digits + "}" : (isNaN(opts.digits) || 0 < parseInt(opts.digits)) && (opts.digitsOptional ? (altMask = mask + radixPointDef + decimalDef + "{0," + opts.digits + "}", 
				opts.keepStatic = !0) : mask += radixPointDef + decimalDef + "{" + opts.digits + "}");
			}
			return mask += autoEscape(opts.suffix, opts), mask += "[-]", altMask && (mask = [ altMask + autoEscape(opts.suffix, opts) + "[-]", mask ]), 
			opts.greedy = !1, parseMinMaxOptions(opts), mask;
		}
		function hanndleRadixDance(pos, c, radixPos, maskset, opts) {
			return opts._radixDance && opts.numericInput && c !== opts.negationSymbol.back && pos <= radixPos && (0 < radixPos || c == opts.radixPoint) && (void 0 === maskset.validPositions[pos - 1] || maskset.validPositions[pos - 1].input !== opts.negationSymbol.back) && (pos -= 1), 
			pos;
		}
		function decimalValidator(chrs, maskset, pos, strict, opts) {
			var radixPos = maskset.buffer ? maskset.buffer.indexOf(opts.radixPoint) : -1, result = -1 !== radixPos && new RegExp("[0-9\uff11-\uff19]").test(chrs);
			return opts._radixDance && result && null == maskset.validPositions[radixPos] ? {
				insert: {
					pos: radixPos === pos ? radixPos + 1 : radixPos,
					c: opts.radixPoint
				},
				pos: pos
			} : result;
		}
		function checkForLeadingZeroes(buffer, opts) {
			var numberMatches = new RegExp("(^" + ("" !== opts.negationSymbol.front ? (0, _escapeRegex.default)(opts.negationSymbol.front) + "?" : "") + (0, 
			_escapeRegex.default)(opts.prefix) + ")(.*)(" + (0, _escapeRegex.default)(opts.suffix) + ("" != opts.negationSymbol.back ? (0, 
			_escapeRegex.default)(opts.negationSymbol.back) + "?" : "") + "$)").exec(buffer.slice().reverse().join("")), number = numberMatches ? numberMatches[2] : "", leadingzeroes = !1;
			return number && (number = number.split(opts.radixPoint.charAt(0))[0], leadingzeroes = new RegExp("^[0" + opts.groupSeparator + "]*").exec(number)), 
			!(!leadingzeroes || !(1 < leadingzeroes[0].length || 0 < leadingzeroes[0].length && leadingzeroes[0].length < number.length)) && leadingzeroes;
		}
		_inputmask.default.extendAliases({
			numeric: {
				mask: genMask,
				_mask: function _mask(opts) {
					return "(" + opts.groupSeparator + "999){+|1}";
				},
				digits: "*",
				digitsOptional: !0,
				enforceDigitsOnBlur: !1,
				radixPoint: ".",
				positionCaretOnClick: "radixFocus",
				_radixDance: !0,
				groupSeparator: "",
				allowMinus: !0,
				negationSymbol: {
					front: "-",
					back: ""
				},
				prefix: "",
				suffix: "",
				min: null,
				max: null,
				SetMaxOnOverflow: !1,
				step: 1,
				inputType: "text",
				unmaskAsNumber: !1,
				roundingFN: Math.round,
				inputmode: "numeric",
				shortcuts: {
					k: "000",
					m: "000000"
				},
				placeholder: "0",
				greedy: !1,
				rightAlign: !0,
				insertMode: !0,
				autoUnmask: !1,
				skipOptionalPartCharacter: "",
				definitions: {
					0: {
						validator: decimalValidator
					},
					1: {
						validator: decimalValidator,
						definitionSymbol: "9"
					},
					"+": {
						validator: function validator(chrs, maskset, pos, strict, opts) {
							return opts.allowMinus && ("-" === chrs || chrs === opts.negationSymbol.front);
						}
					},
					"-": {
						validator: function validator(chrs, maskset, pos, strict, opts) {
							return opts.allowMinus && chrs === opts.negationSymbol.back;
						}
					}
				},
				preValidation: function preValidation(buffer, pos, c, isSelection, opts, maskset, caretPos, strict) {
					if (!1 !== opts.__financeInput && c === opts.radixPoint) return !1;
					var pattern;
					if (pattern = opts.shortcuts && opts.shortcuts[c]) {
						if (1 < pattern.length) for (var inserts = [], i = 0; i < pattern.length; i++) inserts.push({
							pos: pos + i,
							c: pattern[i],
							strict: !1
						});
						return {
							insert: inserts
						};
					}
					var radixPos = buffer.indexOf(opts.radixPoint), initPos = pos;
					if (pos = hanndleRadixDance(pos, c, radixPos, maskset, opts), "-" === c || c === opts.negationSymbol.front) {
						if (!0 !== opts.allowMinus) return !1;
						var isNegative = !1, front = findValid("+", maskset), back = findValid("-", maskset);
						return -1 !== front && (isNegative = [ front, back ]), !1 !== isNegative ? {
							remove: isNegative,
							caret: initPos - opts.negationSymbol.front.length
						} : {
							insert: [ {
								pos: findValidator("+", maskset),
								c: opts.negationSymbol.front,
								fromIsValid: !0
							}, {
								pos: findValidator("-", maskset),
								c: opts.negationSymbol.back,
								fromIsValid: void 0
							} ],
							caret: initPos + opts.negationSymbol.back.length
						};
					}
					if (c === opts.groupSeparator) return {
						caret: initPos
					};
					if (strict) return !0;
					if (-1 !== radixPos && !0 === opts._radixDance && !1 === isSelection && c === opts.radixPoint && void 0 !== opts.digits && (isNaN(opts.digits) || 0 < parseInt(opts.digits)) && radixPos !== pos) return {
						caret: opts._radixDance && pos === radixPos - 1 ? radixPos + 1 : radixPos
					};
					if (!1 === opts.__financeInput) if (isSelection) {
						if (opts.digitsOptional) return {
							rewritePosition: caretPos.end
						};
						if (!opts.digitsOptional) {
							if (caretPos.begin > radixPos && caretPos.end <= radixPos) return c === opts.radixPoint ? {
								insert: {
									pos: radixPos + 1,
									c: "0",
									fromIsValid: !0
								},
								rewritePosition: radixPos
							} : {
								rewritePosition: radixPos + 1
							};
							if (caretPos.begin < radixPos) return {
								rewritePosition: caretPos.begin - 1
							};
						}
					} else if (!opts.showMaskOnHover && !opts.showMaskOnFocus && !opts.digitsOptional && 0 < opts.digits && "" === this.inputmask.__valueGet.call(this)) return {
						rewritePosition: radixPos
					};
					return {
						rewritePosition: pos
					};
				},
				postValidation: function postValidation(buffer, pos, c, currentResult, opts, maskset, strict) {
					if (!1 === currentResult) return currentResult;
					if (strict) return !0;
					if (null !== opts.min || null !== opts.max) {
						var unmasked = opts.onUnMask(buffer.slice().reverse().join(""), void 0, $.extend({}, opts, {
							unmaskAsNumber: !0
						}));
						if (null !== opts.min && unmasked < opts.min && (unmasked.toString().length > opts.min.toString().length || unmasked < 0)) return !1;
						if (null !== opts.max && unmasked > opts.max) return !!opts.SetMaxOnOverflow && {
							refreshFromBuffer: !0,
							buffer: alignDigits(opts.max.toString().replace(".", opts.radixPoint).split(""), opts.digits, opts).reverse()
						};
					}
					return currentResult;
				},
				onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
					if ("" === unmaskedValue && !0 === opts.nullable) return unmaskedValue;
					var processValue = maskedValue.replace(opts.prefix, "");
					return processValue = processValue.replace(opts.suffix, ""), processValue = processValue.replace(new RegExp((0, 
					_escapeRegex.default)(opts.groupSeparator), "g"), ""), "" !== opts.placeholder.charAt(0) && (processValue = processValue.replace(new RegExp(opts.placeholder.charAt(0), "g"), "0")), 
					opts.unmaskAsNumber ? ("" !== opts.radixPoint && -1 !== processValue.indexOf(opts.radixPoint) && (processValue = processValue.replace(_escapeRegex.default.call(this, opts.radixPoint), ".")), 
					processValue = processValue.replace(new RegExp("^" + (0, _escapeRegex.default)(opts.negationSymbol.front)), "-"), 
					processValue = processValue.replace(new RegExp((0, _escapeRegex.default)(opts.negationSymbol.back) + "$"), ""), 
					Number(processValue)) : processValue;
				},
				isComplete: function isComplete(buffer, opts) {
					var maskedValue = (opts.numericInput ? buffer.slice().reverse() : buffer).join("");
					return maskedValue = maskedValue.replace(new RegExp("^" + (0, _escapeRegex.default)(opts.negationSymbol.front)), "-"), 
					maskedValue = maskedValue.replace(new RegExp((0, _escapeRegex.default)(opts.negationSymbol.back) + "$"), ""), 
					maskedValue = maskedValue.replace(opts.prefix, ""), maskedValue = maskedValue.replace(opts.suffix, ""), 
					maskedValue = maskedValue.replace(new RegExp((0, _escapeRegex.default)(opts.groupSeparator) + "([0-9]{3})", "g"), "$1"), 
					"," === opts.radixPoint && (maskedValue = maskedValue.replace((0, _escapeRegex.default)(opts.radixPoint), ".")), 
					isFinite(maskedValue);
				},
				onBeforeMask: function onBeforeMask(initialValue, opts) {
					var radixPoint = opts.radixPoint || ",";
					isFinite(opts.digits) && (opts.digits = parseInt(opts.digits)), "number" != typeof initialValue && "number" !== opts.inputType || "" === radixPoint || (initialValue = initialValue.toString().replace(".", radixPoint));
					var isNagtive = "-" === initialValue.charAt(0) || initialValue.charAt(0) === opts.negationSymbol.front, valueParts = initialValue.split(radixPoint), integerPart = valueParts[0].replace(/[^\-0-9]/g, ""), decimalPart = 1 < valueParts.length ? valueParts[1].replace(/[^0-9]/g, "") : "", forceDigits = 1 < valueParts.length;
					initialValue = integerPart + ("" !== decimalPart ? radixPoint + decimalPart : decimalPart);
					var digits = 0;
					if ("" !== radixPoint && (digits = opts.digitsOptional ? opts.digits < decimalPart.length ? opts.digits : decimalPart.length : opts.digits, 
					"" !== decimalPart || !opts.digitsOptional)) {
						var digitsFactor = Math.pow(10, digits || 1);
						initialValue = initialValue.replace((0, _escapeRegex.default)(radixPoint), "."), 
						isNaN(parseFloat(initialValue)) || (initialValue = (opts.roundingFN(parseFloat(initialValue) * digitsFactor) / digitsFactor).toFixed(digits)), 
						initialValue = initialValue.toString().replace(".", radixPoint);
					}
					if (0 === opts.digits && -1 !== initialValue.indexOf(radixPoint) && (initialValue = initialValue.substring(0, initialValue.indexOf(radixPoint))), 
					null !== opts.min || null !== opts.max) {
						var numberValue = initialValue.toString().replace(radixPoint, ".");
						null !== opts.min && numberValue < opts.min ? initialValue = opts.min.toString().replace(".", radixPoint) : null !== opts.max && numberValue > opts.max && (initialValue = opts.max.toString().replace(".", radixPoint));
					}
					return isNagtive && "-" !== initialValue.charAt(0) && (initialValue = "-" + initialValue), 
					alignDigits(initialValue.toString().split(""), digits, opts, forceDigits).join("");
				},
				onBeforeWrite: function onBeforeWrite(e, buffer, caretPos, opts) {
					function stripBuffer(buffer, stripRadix) {
						if (!1 !== opts.__financeInput || stripRadix) {
							var position = buffer.indexOf(opts.radixPoint);
							-1 !== position && buffer.splice(position, 1);
						}
						if ("" !== opts.groupSeparator) for (;-1 !== (position = buffer.indexOf(opts.groupSeparator)); ) buffer.splice(position, 1);
						return buffer;
					}
					var result, leadingzeroes = checkForLeadingZeroes(buffer, opts);
					if (leadingzeroes) for (var caretNdx = buffer.join("").lastIndexOf(leadingzeroes[0].split("").reverse().join("")) - (leadingzeroes[0] == leadingzeroes.input ? 0 : 1), offset = leadingzeroes[0] == leadingzeroes.input ? 1 : 0, i = leadingzeroes[0].length - offset; 0 < i; i--) delete this.maskset.validPositions[caretNdx + i], 
					delete buffer[caretNdx + i];
					if (e) switch (e.type) {
					  case "blur":
					  case "checkval":
						if (null !== opts.min) {
							var unmasked = opts.onUnMask(buffer.slice().reverse().join(""), void 0, $.extend({}, opts, {
								unmaskAsNumber: !0
							}));
							if (null !== opts.min && unmasked < opts.min) return {
								refreshFromBuffer: !0,
								buffer: alignDigits(opts.min.toString().replace(".", opts.radixPoint).split(""), opts.digits, opts).reverse()
							};
						}
						if (buffer[buffer.length - 1] === opts.negationSymbol.front) {
							var nmbrMtchs = new RegExp("(^" + ("" != opts.negationSymbol.front ? (0, _escapeRegex.default)(opts.negationSymbol.front) + "?" : "") + (0, 
							_escapeRegex.default)(opts.prefix) + ")(.*)(" + (0, _escapeRegex.default)(opts.suffix) + ("" != opts.negationSymbol.back ? (0, 
							_escapeRegex.default)(opts.negationSymbol.back) + "?" : "") + "$)").exec(stripBuffer(buffer.slice(), !0).reverse().join("")), number = nmbrMtchs ? nmbrMtchs[2] : "";
							0 == number && (result = {
								refreshFromBuffer: !0,
								buffer: [ 0 ]
							});
						} else "" !== opts.radixPoint && buffer[0] === opts.radixPoint && (result && result.buffer ? result.buffer.shift() : (buffer.shift(), 
						result = {
							refreshFromBuffer: !0,
							buffer: stripBuffer(buffer)
						}));
						if (opts.enforceDigitsOnBlur) {
							result = result || {};
							var bffr = result && result.buffer || buffer.slice().reverse();
							result.refreshFromBuffer = !0, result.buffer = alignDigits(bffr, opts.digits, opts, !0).reverse();
						}
					}
					return result;
				},
				onKeyDown: function onKeyDown(e, buffer, caretPos, opts) {
					var $input = $(this), bffr;
					if (e.ctrlKey) switch (e.keyCode) {
					  case _keycode.default.UP:
						return this.inputmask.__valueSet.call(this, parseFloat(this.inputmask.unmaskedvalue()) + parseInt(opts.step)), 
						$input.trigger("setvalue"), !1;

					  case _keycode.default.DOWN:
						return this.inputmask.__valueSet.call(this, parseFloat(this.inputmask.unmaskedvalue()) - parseInt(opts.step)), 
						$input.trigger("setvalue"), !1;
					}
					if (!e.shiftKey && (e.keyCode === _keycode.default.DELETE || e.keyCode === _keycode.default.BACKSPACE || e.keyCode === _keycode.default.BACKSPACE_SAFARI) && caretPos.begin !== buffer.length) {
						if (buffer[e.keyCode === _keycode.default.DELETE ? caretPos.begin - 1 : caretPos.end] === opts.negationSymbol.front) return bffr = buffer.slice().reverse(), 
						"" !== opts.negationSymbol.front && bffr.shift(), "" !== opts.negationSymbol.back && bffr.pop(), 
						$input.trigger("setvalue", [ bffr.join(""), caretPos.begin ]), !1;
						if (!0 === opts._radixDance) {
							var radixPos = buffer.indexOf(opts.radixPoint);
							if (opts.digitsOptional) {
								if (0 === radixPos) return bffr = buffer.slice().reverse(), bffr.pop(), $input.trigger("setvalue", [ bffr.join(""), caretPos.begin >= bffr.length ? bffr.length : caretPos.begin ]), 
								!1;
							} else if (-1 !== radixPos && (caretPos.begin < radixPos || caretPos.end < radixPos || e.keyCode === _keycode.default.DELETE && caretPos.begin === radixPos)) return caretPos.begin !== caretPos.end || e.keyCode !== _keycode.default.BACKSPACE && e.keyCode !== _keycode.default.BACKSPACE_SAFARI || caretPos.begin++, 
							bffr = buffer.slice().reverse(), bffr.splice(bffr.length - caretPos.begin, caretPos.begin - caretPos.end + 1), 
							bffr = alignDigits(bffr, opts.digits, opts).join(""), $input.trigger("setvalue", [ bffr, caretPos.begin >= bffr.length ? radixPos + 1 : caretPos.begin ]), 
							!1;
						}
					}
				}
			},
			currency: {
				prefix: "",
				groupSeparator: ",",
				alias: "numeric",
				digits: 2,
				digitsOptional: !1
			},
			decimal: {
				alias: "numeric"
			},
			integer: {
				alias: "numeric",
				digits: 0
			},
			percentage: {
				alias: "numeric",
				min: 0,
				max: 100,
				suffix: " %",
				digits: 0,
				allowMinus: !1
			},
			indianns: {
				alias: "numeric",
				_mask: function _mask(opts) {
					return "(" + opts.groupSeparator + "99){*|1}(" + opts.groupSeparator + "999){1|1}";
				},
				groupSeparator: ",",
				radixPoint: ".",
				placeholder: "0",
				digits: 2,
				digitsOptional: !1
			}
		});
	}, function(module, exports, __webpack_require__) {
		"use strict";
		var _window = _interopRequireDefault(__webpack_require__(13)), _inputmask = _interopRequireDefault(__webpack_require__(1));
		function _typeof(obj) {
			return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(obj) {
				return typeof obj;
			} : function _typeof(obj) {
				return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
			}, _typeof(obj);
		}
		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
		}
		function _inherits(subClass, superClass) {
			if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function");
			subClass.prototype = Object.create(superClass && superClass.prototype, {
				constructor: {
					value: subClass,
					writable: !0,
					configurable: !0
				}
			}), superClass && _setPrototypeOf(subClass, superClass);
		}
		function _createSuper(Derived) {
			var hasNativeReflectConstruct = _isNativeReflectConstruct();
			return function _createSuperInternal() {
				var Super = _getPrototypeOf(Derived), result;
				if (hasNativeReflectConstruct) {
					var NewTarget = _getPrototypeOf(this).constructor;
					result = Reflect.construct(Super, arguments, NewTarget);
				} else result = Super.apply(this, arguments);
				return _possibleConstructorReturn(this, result);
			};
		}
		function _possibleConstructorReturn(self, call) {
			return !call || "object" !== _typeof(call) && "function" != typeof call ? _assertThisInitialized(self) : call;
		}
		function _assertThisInitialized(self) {
			if (void 0 === self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return self;
		}
		function _wrapNativeSuper(Class) {
			var _cache = "function" == typeof Map ? new Map() : void 0;
			return _wrapNativeSuper = function _wrapNativeSuper(Class) {
				if (null === Class || !_isNativeFunction(Class)) return Class;
				if ("function" != typeof Class) throw new TypeError("Super expression must either be null or a function");
				if ("undefined" != typeof _cache) {
					if (_cache.has(Class)) return _cache.get(Class);
					_cache.set(Class, Wrapper);
				}
				function Wrapper() {
					return _construct(Class, arguments, _getPrototypeOf(this).constructor);
				}
				return Wrapper.prototype = Object.create(Class.prototype, {
					constructor: {
						value: Wrapper,
						enumerable: !1,
						writable: !0,
						configurable: !0
					}
				}), _setPrototypeOf(Wrapper, Class);
			}, _wrapNativeSuper(Class);
		}
		function _construct(Parent, args, Class) {
			return _construct = _isNativeReflectConstruct() ? Reflect.construct : function _construct(Parent, args, Class) {
				var a = [ null ];
				a.push.apply(a, args);
				var Constructor = Function.bind.apply(Parent, a), instance = new Constructor();
				return Class && _setPrototypeOf(instance, Class.prototype), instance;
			}, _construct.apply(null, arguments);
		}
		function _isNativeReflectConstruct() {
			if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ("function" == typeof Proxy) return !0;
			try {
				return Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), 
				!0;
			} catch (e) {
				return !1;
			}
		}
		function _isNativeFunction(fn) {
			return -1 !== Function.toString.call(fn).indexOf("[native code]");
		}
		function _setPrototypeOf(o, p) {
			return _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
				return o.__proto__ = p, o;
			}, _setPrototypeOf(o, p);
		}
		function _getPrototypeOf(o) {
			return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
				return o.__proto__ || Object.getPrototypeOf(o);
			}, _getPrototypeOf(o);
		}
		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : {
				default: obj
			};
		}
		var document = _window.default.document;
		if (document && document.head && document.head.attachShadow && _window.default.customElements && void 0 === _window.default.customElements.get("input-mask")) {
			var InputmaskElement = function(_HTMLElement) {
				_inherits(InputmaskElement, _HTMLElement);
				var _super = _createSuper(InputmaskElement);
				function InputmaskElement() {
					var _this;
					_classCallCheck(this, InputmaskElement), _this = _super.call(this);
					var attributeNames = _this.getAttributeNames(), shadow = _this.attachShadow({
						mode: "closed"
					}), input = document.createElement("input");
					for (var attr in input.type = "text", shadow.appendChild(input), attributeNames) Object.prototype.hasOwnProperty.call(attributeNames, attr) && input.setAttribute(attributeNames[attr], _this.getAttribute(attributeNames[attr]));
					var im = new _inputmask.default();
					return im.dataAttribute = "", im.mask(input), input.inputmask.shadowRoot = shadow, 
					_this;
				}
				return InputmaskElement;
			}(_wrapNativeSuper(HTMLElement));
			_window.default.customElements.define("input-mask", InputmaskElement);
		}
	}, function(module, exports, __webpack_require__) {
		"use strict";
		var _jquery = _interopRequireDefault(__webpack_require__(8)), _inputmask = _interopRequireDefault(__webpack_require__(1));
		function _typeof(obj) {
			return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(obj) {
				return typeof obj;
			} : function _typeof(obj) {
				return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
			}, _typeof(obj);
		}
		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : {
				default: obj
			};
		}
		void 0 === _jquery.default.fn.inputmask && (_jquery.default.fn.inputmask = function(fn, options) {
			var nptmask, input = this[0];
			if (void 0 === options && (options = {}), "string" == typeof fn) switch (fn) {
			  case "unmaskedvalue":
				return input && input.inputmask ? input.inputmask.unmaskedvalue() : (0, _jquery.default)(input).val();

			  case "remove":
				return this.each(function() {
					this.inputmask && this.inputmask.remove();
				});

			  case "getemptymask":
				return input && input.inputmask ? input.inputmask.getemptymask() : "";

			  case "hasMaskedValue":
				return !(!input || !input.inputmask) && input.inputmask.hasMaskedValue();

			  case "isComplete":
				return !input || !input.inputmask || input.inputmask.isComplete();

			  case "getmetadata":
				return input && input.inputmask ? input.inputmask.getmetadata() : void 0;

			  case "setvalue":
				_inputmask.default.setValue(input, options);
				break;

			  case "option":
				if ("string" != typeof options) return this.each(function() {
					if (void 0 !== this.inputmask) return this.inputmask.option(options);
				});
				if (input && void 0 !== input.inputmask) return input.inputmask.option(options);
				break;

			  default:
				return options.alias = fn, nptmask = new _inputmask.default(options), this.each(function() {
					nptmask.mask(this);
				});
			} else {
				if (Array.isArray(fn)) return options.alias = fn, nptmask = new _inputmask.default(options), 
				this.each(function() {
					nptmask.mask(this);
				});
				if ("object" == _typeof(fn)) return nptmask = new _inputmask.default(fn), void 0 === fn.mask && void 0 === fn.alias ? this.each(function() {
					if (void 0 !== this.inputmask) return this.inputmask.option(fn);
					nptmask.mask(this);
				}) : this.each(function() {
					nptmask.mask(this);
				});
				if (void 0 === fn) return this.each(function() {
					nptmask = new _inputmask.default(options), nptmask.mask(this);
				});
			}
		});
	}, function(module, exports, __webpack_require__) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var _bundle = _interopRequireDefault(__webpack_require__(15));
		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : {
				default: obj
			};
		}
		__webpack_require__(23);
		var _default = _bundle.default;
		exports.default = _default;
	} ], installedModules = {}, __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
	__webpack_require__.d = function(exports, name, getter) {
		__webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
			enumerable: !0,
			get: getter
		});
	}, __webpack_require__.r = function(exports) {
		"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {
			value: "Module"
		}), Object.defineProperty(exports, "__esModule", {
			value: !0
		});
	}, __webpack_require__.t = function(value, mode) {
		if (1 & mode && (value = __webpack_require__(value)), 8 & mode) return value;
		if (4 & mode && "object" == typeof value && value && value.__esModule) return value;
		var ns = Object.create(null);
		if (__webpack_require__.r(ns), Object.defineProperty(ns, "default", {
			enumerable: !0,
			value: value
		}), 2 & mode && "string" != typeof value) for (var key in value) __webpack_require__.d(ns, key, function(key) {
			return value[key];
		}.bind(null, key));
		return ns;
	}, __webpack_require__.n = function(module) {
		var getter = module && module.__esModule ? function getDefault() {
			return module.default;
		} : function getModuleExports() {
			return module;
		};
		return __webpack_require__.d(getter, "a", getter), getter;
	}, __webpack_require__.o = function(object, property) {
		return Object.prototype.hasOwnProperty.call(object, property);
	}, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 24);
	function __webpack_require__(moduleId) {
		if (installedModules[moduleId]) return installedModules[moduleId].exports;
		var module = installedModules[moduleId] = {
			i: moduleId,
			l: !1,
			exports: {}
		};
		return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
		module.l = !0, module.exports;
	}
	var modules, installedModules;
});
//! moment.js
//! version : 2.5.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

(function (undefined) {

    /************************************
        Constants
    ************************************/

    var moment,
        VERSION = "2.5.1",
        global = this,
        round = Math.round,
        i,

        YEAR = 0,
        MONTH = 1,
        DATE = 2,
        HOUR = 3,
        MINUTE = 4,
        SECOND = 5,
        MILLISECOND = 6,

        // internal storage for language config files
        languages = {},

        // moment internal properties
        momentProperties = {
            _isAMomentObject: null,
            _i : null,
            _f : null,
            _l : null,
            _strict : null,
            _isUTC : null,
            _offset : null,  // optional. Combine with _isUTC
            _pf : null,
            _lang : null  // optional
        },

        // check for nodeJS
        hasModule = (typeof module !== 'undefined' && module.exports && typeof require !== 'undefined'),

        // ASP.NET json date format regex
        aspNetJsonRegex = /^\/?Date\((\-?\d+)/i,
        aspNetTimeSpanJsonRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,

        // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
        // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
        isoDurationRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,

        // format tokens
        formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g,
        localFormattingTokens = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,

        // parsing token regexes
        parseTokenOneOrTwoDigits = /\d\d?/, // 0 - 99
        parseTokenOneToThreeDigits = /\d{1,3}/, // 0 - 999
        parseTokenOneToFourDigits = /\d{1,4}/, // 0 - 9999
        parseTokenOneToSixDigits = /[+\-]?\d{1,6}/, // -999,999 - 999,999
        parseTokenDigits = /\d+/, // nonzero number of digits
        parseTokenWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, // any word (or two) characters or numbers including two/three word month in arabic.
        parseTokenTimezone = /Z|[\+\-]\d\d:?\d\d/gi, // +00:00 -00:00 +0000 -0000 or Z
        parseTokenT = /T/i, // T (ISO separator)
        parseTokenTimestampMs = /[\+\-]?\d+(\.\d{1,3})?/, // 123456789 123456789.123

        //strict parsing regexes
        parseTokenOneDigit = /\d/, // 0 - 9
        parseTokenTwoDigits = /\d\d/, // 00 - 99
        parseTokenThreeDigits = /\d{3}/, // 000 - 999
        parseTokenFourDigits = /\d{4}/, // 0000 - 9999
        parseTokenSixDigits = /[+-]?\d{6}/, // -999,999 - 999,999
        parseTokenSignedNumber = /[+-]?\d+/, // -inf - inf

        // iso 8601 regex
        // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
        isoRegex = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,

        isoFormat = 'YYYY-MM-DDTHH:mm:ssZ',

        isoDates = [
            ['YYYYYY-MM-DD', /[+-]\d{6}-\d{2}-\d{2}/],
            ['YYYY-MM-DD', /\d{4}-\d{2}-\d{2}/],
            ['GGGG-[W]WW-E', /\d{4}-W\d{2}-\d/],
            ['GGGG-[W]WW', /\d{4}-W\d{2}/],
            ['YYYY-DDD', /\d{4}-\d{3}/]
        ],

        // iso time formats and regexes
        isoTimes = [
            ['HH:mm:ss.SSSS', /(T| )\d\d:\d\d:\d\d\.\d{1,3}/],
            ['HH:mm:ss', /(T| )\d\d:\d\d:\d\d/],
            ['HH:mm', /(T| )\d\d:\d\d/],
            ['HH', /(T| )\d\d/]
        ],

        // timezone chunker "+10:00" > ["10", "00"] or "-1530" > ["-15", "30"]
        parseTimezoneChunker = /([\+\-]|\d\d)/gi,

        // getter and setter names
        proxyGettersAndSetters = 'Date|Hours|Minutes|Seconds|Milliseconds'.split('|'),
        unitMillisecondFactors = {
            'Milliseconds' : 1,
            'Seconds' : 1e3,
            'Minutes' : 6e4,
            'Hours' : 36e5,
            'Days' : 864e5,
            'Months' : 2592e6,
            'Years' : 31536e6
        },

        unitAliases = {
            ms : 'millisecond',
            s : 'second',
            m : 'minute',
            h : 'hour',
            d : 'day',
            D : 'date',
            w : 'week',
            W : 'isoWeek',
            M : 'month',
            y : 'year',
            DDD : 'dayOfYear',
            e : 'weekday',
            E : 'isoWeekday',
            gg: 'weekYear',
            GG: 'isoWeekYear'
        },

        camelFunctions = {
            dayofyear : 'dayOfYear',
            isoweekday : 'isoWeekday',
            isoweek : 'isoWeek',
            weekyear : 'weekYear',
            isoweekyear : 'isoWeekYear'
        },

        // format function strings
        formatFunctions = {},

        // tokens to ordinalize and pad
        ordinalizeTokens = 'DDD w W M D d'.split(' '),
        paddedTokens = 'M D H h m s w W'.split(' '),

        formatTokenFunctions = {
            M    : function () {
                return this.month() + 1;
            },
            MMM  : function (format) {
                return this.lang().monthsShort(this, format);
            },
            MMMM : function (format) {
                return this.lang().months(this, format);
            },
            D    : function () {
                return this.date();
            },
            DDD  : function () {
                return this.dayOfYear();
            },
            d    : function () {
                return this.day();
            },
            dd   : function (format) {
                return this.lang().weekdaysMin(this, format);
            },
            ddd  : function (format) {
                return this.lang().weekdaysShort(this, format);
            },
            dddd : function (format) {
                return this.lang().weekdays(this, format);
            },
            w    : function () {
                return this.week();
            },
            W    : function () {
                return this.isoWeek();
            },
            YY   : function () {
                return leftZeroFill(this.year() % 100, 2);
            },
            YYYY : function () {
                return leftZeroFill(this.year(), 4);
            },
            YYYYY : function () {
                return leftZeroFill(this.year(), 5);
            },
            YYYYYY : function () {
                var y = this.year(), sign = y >= 0 ? '+' : '-';
                return sign + leftZeroFill(Math.abs(y), 6);
            },
            gg   : function () {
                return leftZeroFill(this.weekYear() % 100, 2);
            },
            gggg : function () {
                return leftZeroFill(this.weekYear(), 4);
            },
            ggggg : function () {
                return leftZeroFill(this.weekYear(), 5);
            },
            GG   : function () {
                return leftZeroFill(this.isoWeekYear() % 100, 2);
            },
            GGGG : function () {
                return leftZeroFill(this.isoWeekYear(), 4);
            },
            GGGGG : function () {
                return leftZeroFill(this.isoWeekYear(), 5);
            },
            e : function () {
                return this.weekday();
            },
            E : function () {
                return this.isoWeekday();
            },
            a    : function () {
                return this.lang().meridiem(this.hours(), this.minutes(), true);
            },
            A    : function () {
                return this.lang().meridiem(this.hours(), this.minutes(), false);
            },
            H    : function () {
                return this.hours();
            },
            h    : function () {
                return this.hours() % 12 || 12;
            },
            m    : function () {
                return this.minutes();
            },
            s    : function () {
                return this.seconds();
            },
            S    : function () {
                return toInt(this.milliseconds() / 100);
            },
            SS   : function () {
                return leftZeroFill(toInt(this.milliseconds() / 10), 2);
            },
            SSS  : function () {
                return leftZeroFill(this.milliseconds(), 3);
            },
            SSSS : function () {
                return leftZeroFill(this.milliseconds(), 3);
            },
            Z    : function () {
                var a = -this.zone(),
                    b = "+";
                if (a < 0) {
                    a = -a;
                    b = "-";
                }
                return b + leftZeroFill(toInt(a / 60), 2) + ":" + leftZeroFill(toInt(a) % 60, 2);
            },
            ZZ   : function () {
                var a = -this.zone(),
                    b = "+";
                if (a < 0) {
                    a = -a;
                    b = "-";
                }
                return b + leftZeroFill(toInt(a / 60), 2) + leftZeroFill(toInt(a) % 60, 2);
            },
            z : function () {
                return this.zoneAbbr();
            },
            zz : function () {
                return this.zoneName();
            },
            X    : function () {
                return this.unix();
            },
            Q : function () {
                return this.quarter();
            }
        },

        lists = ['months', 'monthsShort', 'weekdays', 'weekdaysShort', 'weekdaysMin'];

    function defaultParsingFlags() {
        // We need to deep clone this object, and es5 standard is not very
        // helpful.
        return {
            empty : false,
            unusedTokens : [],
            unusedInput : [],
            overflow : -2,
            charsLeftOver : 0,
            nullInput : false,
            invalidMonth : null,
            invalidFormat : false,
            userInvalidated : false,
            iso: false
        };
    }

    function padToken(func, count) {
        return function (a) {
            return leftZeroFill(func.call(this, a), count);
        };
    }
    function ordinalizeToken(func, period) {
        return function (a) {
            return this.lang().ordinal(func.call(this, a), period);
        };
    }

    while (ordinalizeTokens.length) {
        i = ordinalizeTokens.pop();
        formatTokenFunctions[i + 'o'] = ordinalizeToken(formatTokenFunctions[i], i);
    }
    while (paddedTokens.length) {
        i = paddedTokens.pop();
        formatTokenFunctions[i + i] = padToken(formatTokenFunctions[i], 2);
    }
    formatTokenFunctions.DDDD = padToken(formatTokenFunctions.DDD, 3);


    /************************************
        Constructors
    ************************************/

    function Language() {

    }

    // Moment prototype object
    function Moment(config) {
        checkOverflow(config);
        extend(this, config);
    }

    // Duration Constructor
    function Duration(duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 36e5; // 1000 * 60 * 60
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            years * 12;

        this._data = {};

        this._bubble();
    }

    /************************************
        Helpers
    ************************************/


    function extend(a, b) {
        for (var i in b) {
            if (b.hasOwnProperty(i)) {
                a[i] = b[i];
            }
        }

        if (b.hasOwnProperty("toString")) {
            a.toString = b.toString;
        }

        if (b.hasOwnProperty("valueOf")) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function cloneMoment(m) {
        var result = {}, i;
        for (i in m) {
            if (m.hasOwnProperty(i) && momentProperties.hasOwnProperty(i)) {
                result[i] = m[i];
            }
        }

        return result;
    }

    function absRound(number) {
        if (number < 0) {
            return Math.ceil(number);
        } else {
            return Math.floor(number);
        }
    }

    // left zero fill a number
    // see http://jsperf.com/left-zero-filling for performance comparison
    function leftZeroFill(number, targetLength, forceSign) {
        var output = '' + Math.abs(number),
            sign = number >= 0;

        while (output.length < targetLength) {
            output = '0' + output;
        }
        return (sign ? (forceSign ? '+' : '') : '-') + output;
    }

    // helper function for _.addTime and _.subtractTime
    function addOrSubtractDurationFromMoment(mom, duration, isAdding, ignoreUpdateOffset) {
        var milliseconds = duration._milliseconds,
            days = duration._days,
            months = duration._months,
            minutes,
            hours;

        if (milliseconds) {
            mom._d.setTime(+mom._d + milliseconds * isAdding);
        }
        // store the minutes and hours so we can restore them
        if (days || months) {
            minutes = mom.minute();
            hours = mom.hour();
        }
        if (days) {
            mom.date(mom.date() + days * isAdding);
        }
        if (months) {
            mom.month(mom.month() + months * isAdding);
        }
        if (milliseconds && !ignoreUpdateOffset) {
            moment.updateOffset(mom);
        }
        // restore the minutes and hours after possibly changing dst
        if (days || months) {
            mom.minute(minutes);
            mom.hour(hours);
        }
    }

    // check if is an array
    function isArray(input) {
        return Object.prototype.toString.call(input) === '[object Array]';
    }

    function isDate(input) {
        return  Object.prototype.toString.call(input) === '[object Date]' ||
                input instanceof Date;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function normalizeUnits(units) {
        if (units) {
            var lowered = units.toLowerCase().replace(/(.)s$/, '$1');
            units = unitAliases[units] || camelFunctions[lowered] || lowered;
        }
        return units;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (inputObject.hasOwnProperty(prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    function makeList(field) {
        var count, setter;

        if (field.indexOf('week') === 0) {
            count = 7;
            setter = 'day';
        }
        else if (field.indexOf('month') === 0) {
            count = 12;
            setter = 'month';
        }
        else {
            return;
        }

        moment[field] = function (format, index) {
            var i, getter,
                method = moment.fn._lang[field],
                results = [];

            if (typeof format === 'number') {
                index = format;
                format = undefined;
            }

            getter = function (i) {
                var m = moment().utc().set(setter, i);
                return method.call(moment.fn._lang, m, format || '');
            };

            if (index != null) {
                return getter(index);
            }
            else {
                for (i = 0; i < count; i++) {
                    results.push(getter(i));
                }
                return results;
            }
        };
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            if (coercedNumber >= 0) {
                value = Math.floor(coercedNumber);
            } else {
                value = Math.ceil(coercedNumber);
            }
        }

        return value;
    }

    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    function checkOverflow(m) {
        var overflow;
        if (m._a && m._pf.overflow === -2) {
            overflow =
                m._a[MONTH] < 0 || m._a[MONTH] > 11 ? MONTH :
                m._a[DATE] < 1 || m._a[DATE] > daysInMonth(m._a[YEAR], m._a[MONTH]) ? DATE :
                m._a[HOUR] < 0 || m._a[HOUR] > 23 ? HOUR :
                m._a[MINUTE] < 0 || m._a[MINUTE] > 59 ? MINUTE :
                m._a[SECOND] < 0 || m._a[SECOND] > 59 ? SECOND :
                m._a[MILLISECOND] < 0 || m._a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (m._pf._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }

            m._pf.overflow = overflow;
        }
    }

    function isValid(m) {
        if (m._isValid == null) {
            m._isValid = !isNaN(m._d.getTime()) &&
                m._pf.overflow < 0 &&
                !m._pf.empty &&
                !m._pf.invalidMonth &&
                !m._pf.nullInput &&
                !m._pf.invalidFormat &&
                !m._pf.userInvalidated;

            if (m._strict) {
                m._isValid = m._isValid &&
                    m._pf.charsLeftOver === 0 &&
                    m._pf.unusedTokens.length === 0;
            }
        }
        return m._isValid;
    }

    function normalizeLanguage(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function makeAs(input, model) {
        return model._isUTC ? moment(input).zone(model._offset || 0) :
            moment(input).local();
    }

    /************************************
        Languages
    ************************************/


    extend(Language.prototype, {

        set : function (config) {
            var prop, i;
            for (i in config) {
                prop = config[i];
                if (typeof prop === 'function') {
                    this[i] = prop;
                } else {
                    this['_' + i] = prop;
                }
            }
        },

        _months : "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        months : function (m) {
            return this._months[m.month()];
        },

        _monthsShort : "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        monthsShort : function (m) {
            return this._monthsShort[m.month()];
        },

        monthsParse : function (monthName) {
            var i, mom, regex;

            if (!this._monthsParse) {
                this._monthsParse = [];
            }

            for (i = 0; i < 12; i++) {
                // make the regex if we don't have it already
                if (!this._monthsParse[i]) {
                    mom = moment.utc([2000, i]);
                    regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                    this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
                }
                // test the regex
                if (this._monthsParse[i].test(monthName)) {
                    return i;
                }
            }
        },

        _weekdays : "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdays : function (m) {
            return this._weekdays[m.day()];
        },

        _weekdaysShort : "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysShort : function (m) {
            return this._weekdaysShort[m.day()];
        },

        _weekdaysMin : "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        weekdaysMin : function (m) {
            return this._weekdaysMin[m.day()];
        },

        weekdaysParse : function (weekdayName) {
            var i, mom, regex;

            if (!this._weekdaysParse) {
                this._weekdaysParse = [];
            }

            for (i = 0; i < 7; i++) {
                // make the regex if we don't have it already
                if (!this._weekdaysParse[i]) {
                    mom = moment([2000, 1]).day(i);
                    regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                    this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
                }
                // test the regex
                if (this._weekdaysParse[i].test(weekdayName)) {
                    return i;
                }
            }
        },

        _longDateFormat : {
            LT : "h:mm A",
            L : "MM/DD/YYYY",
            LL : "MMMM D YYYY",
            LLL : "MMMM D YYYY LT",
            LLLL : "dddd, MMMM D YYYY LT"
        },
        longDateFormat : function (key) {
            var output = this._longDateFormat[key];
            if (!output && this._longDateFormat[key.toUpperCase()]) {
                output = this._longDateFormat[key.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function (val) {
                    return val.slice(1);
                });
                this._longDateFormat[key] = output;
            }
            return output;
        },

        isPM : function (input) {
            // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
            // Using charAt should be more compatible.
            return ((input + '').toLowerCase().charAt(0) === 'p');
        },

        _meridiemParse : /[ap]\.?m?\.?/i,
        meridiem : function (hours, minutes, isLower) {
            if (hours > 11) {
                return isLower ? 'pm' : 'PM';
            } else {
                return isLower ? 'am' : 'AM';
            }
        },

        _calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[Last] dddd [at] LT',
            sameElse : 'L'
        },
        calendar : function (key, mom) {
            var output = this._calendar[key];
            return typeof output === 'function' ? output.apply(mom) : output;
        },

        _relativeTime : {
            future : "in %s",
            past : "%s ago",
            s : "a few seconds",
            m : "a minute",
            mm : "%d minutes",
            h : "an hour",
            hh : "%d hours",
            d : "a day",
            dd : "%d days",
            M : "a month",
            MM : "%d months",
            y : "a year",
            yy : "%d years"
        },
        relativeTime : function (number, withoutSuffix, string, isFuture) {
            var output = this._relativeTime[string];
            return (typeof output === 'function') ?
                output(number, withoutSuffix, string, isFuture) :
                output.replace(/%d/i, number);
        },
        pastFuture : function (diff, output) {
            var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
            return typeof format === 'function' ? format(output) : format.replace(/%s/i, output);
        },

        ordinal : function (number) {
            return this._ordinal.replace("%d", number);
        },
        _ordinal : "%d",

        preparse : function (string) {
            return string;
        },

        postformat : function (string) {
            return string;
        },

        week : function (mom) {
            return weekOfYear(mom, this._week.dow, this._week.doy).week;
        },

        _week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 1st is the first week of the year.
        },

        _invalidDate: 'Invalid date',
        invalidDate: function () {
            return this._invalidDate;
        }
    });

    // Loads a language definition into the `languages` cache.  The function
    // takes a key and optionally values.  If not in the browser and no values
    // are provided, it will load the language file module.  As a convenience,
    // this function also returns the language values.
    function loadLang(key, values) {
        values.abbr = key;
        if (!languages[key]) {
            languages[key] = new Language();
        }
        languages[key].set(values);
        return languages[key];
    }

    // Remove a language from the `languages` cache. Mostly useful in tests.
    function unloadLang(key) {
        delete languages[key];
    }

    // Determines which language definition to use and returns it.
    //
    // With no parameters, it will return the global language.  If you
    // pass in a language key, such as 'en', it will return the
    // definition for 'en', so long as 'en' has already been loaded using
    // moment.lang.
    function getLangDefinition(key) {
        var i = 0, j, lang, next, split,
            get = function (k) {
                if (!languages[k] && hasModule) {
                    try {
                        require('./lang/' + k);
                    } catch (e) { }
                }
                return languages[k];
            };

        if (!key) {
            return moment.fn._lang;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            lang = get(key);
            if (lang) {
                return lang;
            }
            key = [key];
        }

        //pick the language from the array
        //try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
        //substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
        while (i < key.length) {
            split = normalizeLanguage(key[i]).split('-');
            j = split.length;
            next = normalizeLanguage(key[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                lang = get(split.slice(0, j).join('-'));
                if (lang) {
                    return lang;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return moment.fn._lang;
    }

    /************************************
        Formatting
    ************************************/


    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, "");
        }
        return input.replace(/\\/g, "");
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = "";
            for (i = 0; i < length; i++) {
                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {

        if (!m.isValid()) {
            return m.lang().invalidDate();
        }

        format = expandFormat(format, m.lang());

        if (!formatFunctions[format]) {
            formatFunctions[format] = makeFormatFunction(format);
        }

        return formatFunctions[format](m);
    }

    function expandFormat(format, lang) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return lang.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }


    /************************************
        Parsing
    ************************************/


    // get the regex to find the next token
    function getParseRegexForToken(token, config) {
        var a, strict = config._strict;
        switch (token) {
        case 'DDDD':
            return parseTokenThreeDigits;
        case 'YYYY':
        case 'GGGG':
        case 'gggg':
            return strict ? parseTokenFourDigits : parseTokenOneToFourDigits;
        case 'Y':
        case 'G':
        case 'g':
            return parseTokenSignedNumber;
        case 'YYYYYY':
        case 'YYYYY':
        case 'GGGGG':
        case 'ggggg':
            return strict ? parseTokenSixDigits : parseTokenOneToSixDigits;
        case 'S':
            if (strict) { return parseTokenOneDigit; }
            /* falls through */
        case 'SS':
            if (strict) { return parseTokenTwoDigits; }
            /* falls through */
        case 'SSS':
            if (strict) { return parseTokenThreeDigits; }
            /* falls through */
        case 'DDD':
            return parseTokenOneToThreeDigits;
        case 'MMM':
        case 'MMMM':
        case 'dd':
        case 'ddd':
        case 'dddd':
            return parseTokenWord;
        case 'a':
        case 'A':
            return getLangDefinition(config._l)._meridiemParse;
        case 'X':
            return parseTokenTimestampMs;
        case 'Z':
        case 'ZZ':
            return parseTokenTimezone;
        case 'T':
            return parseTokenT;
        case 'SSSS':
            return parseTokenDigits;
        case 'MM':
        case 'DD':
        case 'YY':
        case 'GG':
        case 'gg':
        case 'HH':
        case 'hh':
        case 'mm':
        case 'ss':
        case 'ww':
        case 'WW':
            return strict ? parseTokenTwoDigits : parseTokenOneOrTwoDigits;
        case 'M':
        case 'D':
        case 'd':
        case 'H':
        case 'h':
        case 'm':
        case 's':
        case 'w':
        case 'W':
        case 'e':
        case 'E':
            return parseTokenOneOrTwoDigits;
        default :
            a = new RegExp(regexpEscape(unescapeFormat(token.replace('\\', '')), "i"));
            return a;
        }
    }

    function timezoneMinutesFromString(string) {
        string = string || "";
        var possibleTzMatches = (string.match(parseTokenTimezone) || []),
            tzChunk = possibleTzMatches[possibleTzMatches.length - 1] || [],
            parts = (tzChunk + '').match(parseTimezoneChunker) || ['-', 0, 0],
            minutes = +(parts[1] * 60) + toInt(parts[2]);

        return parts[0] === '+' ? -minutes : minutes;
    }

    // function to convert string input to date
    function addTimeToArrayFromToken(token, input, config) {
        var a, datePartArray = config._a;

        switch (token) {
        // MONTH
        case 'M' : // fall through to MM
        case 'MM' :
            if (input != null) {
                datePartArray[MONTH] = toInt(input) - 1;
            }
            break;
        case 'MMM' : // fall through to MMMM
        case 'MMMM' :
            a = getLangDefinition(config._l).monthsParse(input);
            // if we didn't find a month name, mark the date as invalid.
            if (a != null) {
                datePartArray[MONTH] = a;
            } else {
                config._pf.invalidMonth = input;
            }
            break;
        // DAY OF MONTH
        case 'D' : // fall through to DD
        case 'DD' :
            if (input != null) {
                datePartArray[DATE] = toInt(input);
            }
            break;
        // DAY OF YEAR
        case 'DDD' : // fall through to DDDD
        case 'DDDD' :
            if (input != null) {
                config._dayOfYear = toInt(input);
            }

            break;
        // YEAR
        case 'YY' :
            datePartArray[YEAR] = toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
            break;
        case 'YYYY' :
        case 'YYYYY' :
        case 'YYYYYY' :
            datePartArray[YEAR] = toInt(input);
            break;
        // AM / PM
        case 'a' : // fall through to A
        case 'A' :
            config._isPm = getLangDefinition(config._l).isPM(input);
            break;
        // 24 HOUR
        case 'H' : // fall through to hh
        case 'HH' : // fall through to hh
        case 'h' : // fall through to hh
        case 'hh' :
            datePartArray[HOUR] = toInt(input);
            break;
        // MINUTE
        case 'm' : // fall through to mm
        case 'mm' :
            datePartArray[MINUTE] = toInt(input);
            break;
        // SECOND
        case 's' : // fall through to ss
        case 'ss' :
            datePartArray[SECOND] = toInt(input);
            break;
        // MILLISECOND
        case 'S' :
        case 'SS' :
        case 'SSS' :
        case 'SSSS' :
            datePartArray[MILLISECOND] = toInt(('0.' + input) * 1000);
            break;
        // UNIX TIMESTAMP WITH MS
        case 'X':
            config._d = new Date(parseFloat(input) * 1000);
            break;
        // TIMEZONE
        case 'Z' : // fall through to ZZ
        case 'ZZ' :
            config._useUTC = true;
            config._tzm = timezoneMinutesFromString(input);
            break;
        case 'w':
        case 'ww':
        case 'W':
        case 'WW':
        case 'd':
        case 'dd':
        case 'ddd':
        case 'dddd':
        case 'e':
        case 'E':
            token = token.substr(0, 1);
            /* falls through */
        case 'gg':
        case 'gggg':
        case 'GG':
        case 'GGGG':
        case 'GGGGG':
            token = token.substr(0, 2);
            if (input) {
                config._w = config._w || {};
                config._w[token] = input;
            }
            break;
        }
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function dateFromConfig(config) {
        var i, date, input = [], currentDate,
            yearToUse, fixYear, w, temp, lang, weekday, week;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            fixYear = function (val) {
                var int_val = parseInt(val, 10);
                return val ?
                  (val.length < 3 ? (int_val > 68 ? 1900 + int_val : 2000 + int_val) : int_val) :
                  (config._a[YEAR] == null ? moment().weekYear() : config._a[YEAR]);
            };

            w = config._w;
            if (w.GG != null || w.W != null || w.E != null) {
                temp = dayOfYearFromWeeks(fixYear(w.GG), w.W || 1, w.E, 4, 1);
            }
            else {
                lang = getLangDefinition(config._l);
                weekday = w.d != null ?  parseWeekday(w.d, lang) :
                  (w.e != null ?  parseInt(w.e, 10) + lang._week.dow : 0);

                week = parseInt(w.w, 10) || 1;

                //if we're parsing 'd', then the low day numbers may be next week
                if (w.d != null && weekday < lang._week.dow) {
                    week++;
                }

                temp = dayOfYearFromWeeks(fixYear(w.gg), week, weekday, lang._week.doy, lang._week.dow);
            }

            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear) {
            yearToUse = config._a[YEAR] == null ? currentDate[YEAR] : config._a[YEAR];

            if (config._dayOfYear > daysInYear(yearToUse)) {
                config._pf._overflowDayOfYear = true;
            }

            date = makeUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // add the offsets to the time to be parsed so that we can have a clean array for checking isValid
        input[HOUR] += toInt((config._tzm || 0) / 60);
        input[MINUTE] += toInt((config._tzm || 0) % 60);

        config._d = (config._useUTC ? makeUTCDate : makeDate).apply(null, input);
    }

    function dateFromObject(config) {
        var normalizedInput;

        if (config._d) {
            return;
        }

        normalizedInput = normalizeObjectUnits(config._i);
        config._a = [
            normalizedInput.year,
            normalizedInput.month,
            normalizedInput.day,
            normalizedInput.hour,
            normalizedInput.minute,
            normalizedInput.second,
            normalizedInput.millisecond
        ];

        dateFromConfig(config);
    }

    function currentDateArray(config) {
        var now = new Date();
        if (config._useUTC) {
            return [
                now.getUTCFullYear(),
                now.getUTCMonth(),
                now.getUTCDate()
            ];
        } else {
            return [now.getFullYear(), now.getMonth(), now.getDate()];
        }
    }

    // date from string and format string
    function makeDateFromStringAndFormat(config) {

        config._a = [];
        config._pf.empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var lang = getLangDefinition(config._l),
            string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, lang).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    config._pf.unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    config._pf.empty = false;
                }
                else {
                    config._pf.unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                config._pf.unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        config._pf.charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            config._pf.unusedInput.push(string);
        }

        // handle am pm
        if (config._isPm && config._a[HOUR] < 12) {
            config._a[HOUR] += 12;
        }
        // if is 12 am, change hours to 0
        if (config._isPm === false && config._a[HOUR] === 12) {
            config._a[HOUR] = 0;
        }

        dateFromConfig(config);
        checkOverflow(config);
    }

    function unescapeFormat(s) {
        return s.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        });
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function regexpEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    // date from string and array of format strings
    function makeDateFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            config._pf.invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = extend({}, config);
            tempConfig._pf = defaultParsingFlags();
            tempConfig._f = config._f[i];
            makeDateFromStringAndFormat(tempConfig);

            if (!isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += tempConfig._pf.charsLeftOver;

            //or tokens
            currentScore += tempConfig._pf.unusedTokens.length * 10;

            tempConfig._pf.score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    // date from iso format
    function makeDateFromString(config) {
        var i, l,
            string = config._i,
            match = isoRegex.exec(string);

        if (match) {
            config._pf.iso = true;
            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(string)) {
                    // match[5] should be "T" or undefined
                    config._f = isoDates[i][0] + (match[6] || " ");
                    break;
                }
            }
            for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(string)) {
                    config._f += isoTimes[i][0];
                    break;
                }
            }
            if (string.match(parseTokenTimezone)) {
                config._f += "Z";
            }
            makeDateFromStringAndFormat(config);
        }
        else {
            config._d = new Date(string);
        }
    }

    function makeDateFromInput(config) {
        var input = config._i,
            matched = aspNetJsonRegex.exec(input);

        if (input === undefined) {
            config._d = new Date();
        } else if (matched) {
            config._d = new Date(+matched[1]);
        } else if (typeof input === 'string') {
            makeDateFromString(config);
        } else if (isArray(input)) {
            config._a = input.slice(0);
            dateFromConfig(config);
        } else if (isDate(input)) {
            config._d = new Date(+input);
        } else if (typeof(input) === 'object') {
            dateFromObject(config);
        } else {
            config._d = new Date(input);
        }
    }

    function makeDate(y, m, d, h, M, s, ms) {
        //can't just apply() to create a date:
        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
        var date = new Date(y, m, d, h, M, s, ms);

        //the date constructor doesn't accept years < 1970
        if (y < 1970) {
            date.setFullYear(y);
        }
        return date;
    }

    function makeUTCDate(y) {
        var date = new Date(Date.UTC.apply(null, arguments));
        if (y < 1970) {
            date.setUTCFullYear(y);
        }
        return date;
    }

    function parseWeekday(input, language) {
        if (typeof input === 'string') {
            if (!isNaN(input)) {
                input = parseInt(input, 10);
            }
            else {
                input = language.weekdaysParse(input);
                if (typeof input !== 'number') {
                    return null;
                }
            }
        }
        return input;
    }

    /************************************
        Relative Time
    ************************************/


    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, lang) {
        return lang.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime(milliseconds, withoutSuffix, lang) {
        var seconds = round(Math.abs(milliseconds) / 1000),
            minutes = round(seconds / 60),
            hours = round(minutes / 60),
            days = round(hours / 24),
            years = round(days / 365),
            args = seconds < 45 && ['s', seconds] ||
                minutes === 1 && ['m'] ||
                minutes < 45 && ['mm', minutes] ||
                hours === 1 && ['h'] ||
                hours < 22 && ['hh', hours] ||
                days === 1 && ['d'] ||
                days <= 25 && ['dd', days] ||
                days <= 45 && ['M'] ||
                days < 345 && ['MM', round(days / 30)] ||
                years === 1 && ['y'] || ['yy', years];
        args[2] = withoutSuffix;
        args[3] = milliseconds > 0;
        args[4] = lang;
        return substituteTimeAgo.apply({}, args);
    }


    /************************************
        Week of Year
    ************************************/


    // firstDayOfWeek       0 = sun, 6 = sat
    //                      the day of the week that starts the week
    //                      (usually sunday or monday)
    // firstDayOfWeekOfYear 0 = sun, 6 = sat
    //                      the first week is the week that contains the first
    //                      of this day of the week
    //                      (eg. ISO weeks use thursday (4))
    function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
        var end = firstDayOfWeekOfYear - firstDayOfWeek,
            daysToDayOfWeek = firstDayOfWeekOfYear - mom.day(),
            adjustedMoment;


        if (daysToDayOfWeek > end) {
            daysToDayOfWeek -= 7;
        }

        if (daysToDayOfWeek < end - 7) {
            daysToDayOfWeek += 7;
        }

        adjustedMoment = moment(mom).add('d', daysToDayOfWeek);
        return {
            week: Math.ceil(adjustedMoment.dayOfYear() / 7),
            year: adjustedMoment.year()
        };
    }

    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {
        var d = makeUTCDate(year, 0, 1).getUTCDay(), daysToAdd, dayOfYear;

        weekday = weekday != null ? weekday : firstDayOfWeek;
        daysToAdd = firstDayOfWeek - d + (d > firstDayOfWeekOfYear ? 7 : 0) - (d < firstDayOfWeek ? 7 : 0);
        dayOfYear = 7 * (week - 1) + (weekday - firstDayOfWeek) + daysToAdd + 1;

        return {
            year: dayOfYear > 0 ? year : year - 1,
            dayOfYear: dayOfYear > 0 ?  dayOfYear : daysInYear(year - 1) + dayOfYear
        };
    }

    /************************************
        Top Level Functions
    ************************************/

    function makeMoment(config) {
        var input = config._i,
            format = config._f;

        if (input === null) {
            return moment.invalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = getLangDefinition().preparse(input);
        }

        if (moment.isMoment(input)) {
            config = cloneMoment(input);

            config._d = new Date(+input._d);
        } else if (format) {
            if (isArray(format)) {
                makeDateFromStringAndArray(config);
            } else {
                makeDateFromStringAndFormat(config);
            }
        } else {
            makeDateFromInput(config);
        }

        return new Moment(config);
    }

    moment = function (input, format, lang, strict) {
        var c;

        if (typeof(lang) === "boolean") {
            strict = lang;
            lang = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c = {};
        c._isAMomentObject = true;
        c._i = input;
        c._f = format;
        c._l = lang;
        c._strict = strict;
        c._isUTC = false;
        c._pf = defaultParsingFlags();

        return makeMoment(c);
    };

    // creating with utc
    moment.utc = function (input, format, lang, strict) {
        var c;

        if (typeof(lang) === "boolean") {
            strict = lang;
            lang = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c = {};
        c._isAMomentObject = true;
        c._useUTC = true;
        c._isUTC = true;
        c._l = lang;
        c._i = input;
        c._f = format;
        c._strict = strict;
        c._pf = defaultParsingFlags();

        return makeMoment(c).utc();
    };

    // creating with unix timestamp (in seconds)
    moment.unix = function (input) {
        return moment(input * 1000);
    };

    // duration
    moment.duration = function (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            parseIso;

        if (moment.isDuration(input)) {
            duration = {
                ms: input._milliseconds,
                d: input._days,
                M: input._months
            };
        } else if (typeof input === 'number') {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetTimeSpanJsonRegex.exec(input))) {
            sign = (match[1] === "-") ? -1 : 1;
            duration = {
                y: 0,
                d: toInt(match[DATE]) * sign,
                h: toInt(match[HOUR]) * sign,
                m: toInt(match[MINUTE]) * sign,
                s: toInt(match[SECOND]) * sign,
                ms: toInt(match[MILLISECOND]) * sign
            };
        } else if (!!(match = isoDurationRegex.exec(input))) {
            sign = (match[1] === "-") ? -1 : 1;
            parseIso = function (inp) {
                // We'd normally use ~~inp for this, but unfortunately it also
                // converts floats to ints.
                // inp may be undefined, so careful calling replace on it.
                var res = inp && parseFloat(inp.replace(',', '.'));
                // apply sign while we're at it
                return (isNaN(res) ? 0 : res) * sign;
            };
            duration = {
                y: parseIso(match[2]),
                M: parseIso(match[3]),
                d: parseIso(match[4]),
                h: parseIso(match[5]),
                m: parseIso(match[6]),
                s: parseIso(match[7]),
                w: parseIso(match[8])
            };
        }

        ret = new Duration(duration);

        if (moment.isDuration(input) && input.hasOwnProperty('_lang')) {
            ret._lang = input._lang;
        }

        return ret;
    };

    // version number
    moment.version = VERSION;

    // default format
    moment.defaultFormat = isoFormat;

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    moment.updateOffset = function () {};

    // This function will load languages and then set the global language.  If
    // no arguments are passed in, it will simply return the current global
    // language key.
    moment.lang = function (key, values) {
        var r;
        if (!key) {
            return moment.fn._lang._abbr;
        }
        if (values) {
            loadLang(normalizeLanguage(key), values);
        } else if (values === null) {
            unloadLang(key);
            key = 'en';
        } else if (!languages[key]) {
            getLangDefinition(key);
        }
        r = moment.duration.fn._lang = moment.fn._lang = getLangDefinition(key);
        return r._abbr;
    };

    // returns language data
    moment.langData = function (key) {
        if (key && key._lang && key._lang._abbr) {
            key = key._lang._abbr;
        }
        return getLangDefinition(key);
    };

    // compare moment object
    moment.isMoment = function (obj) {
        return obj instanceof Moment ||
            (obj != null &&  obj.hasOwnProperty('_isAMomentObject'));
    };

    // for typechecking Duration objects
    moment.isDuration = function (obj) {
        return obj instanceof Duration;
    };

    for (i = lists.length - 1; i >= 0; --i) {
        makeList(lists[i]);
    }

    moment.normalizeUnits = function (units) {
        return normalizeUnits(units);
    };

    moment.invalid = function (flags) {
        var m = moment.utc(NaN);
        if (flags != null) {
            extend(m._pf, flags);
        }
        else {
            m._pf.userInvalidated = true;
        }

        return m;
    };

    moment.parseZone = function (input) {
        return moment(input).parseZone();
    };

    /************************************
        Moment Prototype
    ************************************/


    extend(moment.fn = Moment.prototype, {

        clone : function () {
            return moment(this);
        },

        valueOf : function () {
            return +this._d + ((this._offset || 0) * 60000);
        },

        unix : function () {
            return Math.floor(+this / 1000);
        },

        toString : function () {
            return this.clone().lang('en').format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
        },

        toDate : function () {
            return this._offset ? new Date(+this) : this._d;
        },

        toISOString : function () {
            var m = moment(this).utc();
            if (0 < m.year() && m.year() <= 9999) {
                return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
            } else {
                return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
            }
        },

        toArray : function () {
            var m = this;
            return [
                m.year(),
                m.month(),
                m.date(),
                m.hours(),
                m.minutes(),
                m.seconds(),
                m.milliseconds()
            ];
        },

        isValid : function () {
            return isValid(this);
        },

        isDSTShifted : function () {

            if (this._a) {
                return this.isValid() && compareArrays(this._a, (this._isUTC ? moment.utc(this._a) : moment(this._a)).toArray()) > 0;
            }

            return false;
        },

        parsingFlags : function () {
            return extend({}, this._pf);
        },

        invalidAt: function () {
            return this._pf.overflow;
        },

        utc : function () {
            return this.zone(0);
        },

        local : function () {
            this.zone(0);
            this._isUTC = false;
            return this;
        },

        format : function (inputString) {
            var output = formatMoment(this, inputString || moment.defaultFormat);
            return this.lang().postformat(output);
        },

        add : function (input, val) {
            var dur;
            // switch args to support add('s', 1) and add(1, 's')
            if (typeof input === 'string') {
                dur = moment.duration(+val, input);
            } else {
                dur = moment.duration(input, val);
            }
            addOrSubtractDurationFromMoment(this, dur, 1);
            return this;
        },

        subtract : function (input, val) {
            var dur;
            // switch args to support subtract('s', 1) and subtract(1, 's')
            if (typeof input === 'string') {
                dur = moment.duration(+val, input);
            } else {
                dur = moment.duration(input, val);
            }
            addOrSubtractDurationFromMoment(this, dur, -1);
            return this;
        },

        diff : function (input, units, asFloat) {
            var that = makeAs(input, this),
                zoneDiff = (this.zone() - that.zone()) * 6e4,
                diff, output;

            units = normalizeUnits(units);

            if (units === 'year' || units === 'month') {
                // average number of days in the months in the given dates
                diff = (this.daysInMonth() + that.daysInMonth()) * 432e5; // 24 * 60 * 60 * 1000 / 2
                // difference in months
                output = ((this.year() - that.year()) * 12) + (this.month() - that.month());
                // adjust by taking difference in days, average number of days
                // and dst in the given months.
                output += ((this - moment(this).startOf('month')) -
                        (that - moment(that).startOf('month'))) / diff;
                // same as above but with zones, to negate all dst
                output -= ((this.zone() - moment(this).startOf('month').zone()) -
                        (that.zone() - moment(that).startOf('month').zone())) * 6e4 / diff;
                if (units === 'year') {
                    output = output / 12;
                }
            } else {
                diff = (this - that);
                output = units === 'second' ? diff / 1e3 : // 1000
                    units === 'minute' ? diff / 6e4 : // 1000 * 60
                    units === 'hour' ? diff / 36e5 : // 1000 * 60 * 60
                    units === 'day' ? (diff - zoneDiff) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
                    units === 'week' ? (diff - zoneDiff) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
                    diff;
            }
            return asFloat ? output : absRound(output);
        },

        from : function (time, withoutSuffix) {
            return moment.duration(this.diff(time)).lang(this.lang()._abbr).humanize(!withoutSuffix);
        },

        fromNow : function (withoutSuffix) {
            return this.from(moment(), withoutSuffix);
        },

        calendar : function () {
            // We want to compare the start of today, vs this.
            // Getting start-of-today depends on whether we're zone'd or not.
            var sod = makeAs(moment(), this).startOf('day'),
                diff = this.diff(sod, 'days', true),
                format = diff < -6 ? 'sameElse' :
                    diff < -1 ? 'lastWeek' :
                    diff < 0 ? 'lastDay' :
                    diff < 1 ? 'sameDay' :
                    diff < 2 ? 'nextDay' :
                    diff < 7 ? 'nextWeek' : 'sameElse';
            return this.format(this.lang().calendar(format, this));
        },

        isLeapYear : function () {
            return isLeapYear(this.year());
        },

        isDST : function () {
            return (this.zone() < this.clone().month(0).zone() ||
                this.zone() < this.clone().month(5).zone());
        },

        day : function (input) {
            var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            if (input != null) {
                input = parseWeekday(input, this.lang());
                return this.add({ d : input - day });
            } else {
                return day;
            }
        },

        month : function (input) {
            var utc = this._isUTC ? 'UTC' : '',
                dayOfMonth;

            if (input != null) {
                if (typeof input === 'string') {
                    input = this.lang().monthsParse(input);
                    if (typeof input !== 'number') {
                        return this;
                    }
                }

                dayOfMonth = this.date();
                this.date(1);
                this._d['set' + utc + 'Month'](input);
                this.date(Math.min(dayOfMonth, this.daysInMonth()));

                moment.updateOffset(this);
                return this;
            } else {
                return this._d['get' + utc + 'Month']();
            }
        },

        startOf: function (units) {
            units = normalizeUnits(units);
            // the following switch intentionally omits break keywords
            // to utilize falling through the cases.
            switch (units) {
            case 'year':
                this.month(0);
                /* falls through */
            case 'month':
                this.date(1);
                /* falls through */
            case 'week':
            case 'isoWeek':
            case 'day':
                this.hours(0);
                /* falls through */
            case 'hour':
                this.minutes(0);
                /* falls through */
            case 'minute':
                this.seconds(0);
                /* falls through */
            case 'second':
                this.milliseconds(0);
                /* falls through */
            }

            // weeks are a special case
            if (units === 'week') {
                this.weekday(0);
            } else if (units === 'isoWeek') {
                this.isoWeekday(1);
            }

            return this;
        },

        endOf: function (units) {
            units = normalizeUnits(units);
            return this.startOf(units).add((units === 'isoWeek' ? 'week' : units), 1).subtract('ms', 1);
        },

        isAfter: function (input, units) {
            units = typeof units !== 'undefined' ? units : 'millisecond';
            return +this.clone().startOf(units) > +moment(input).startOf(units);
        },

        isBefore: function (input, units) {
            units = typeof units !== 'undefined' ? units : 'millisecond';
            return +this.clone().startOf(units) < +moment(input).startOf(units);
        },

        isSame: function (input, units) {
            units = units || 'ms';
            return +this.clone().startOf(units) === +makeAs(input, this).startOf(units);
        },

        min: function (other) {
            other = moment.apply(null, arguments);
            return other < this ? this : other;
        },

        max: function (other) {
            other = moment.apply(null, arguments);
            return other > this ? this : other;
        },

        zone : function (input) {
            var offset = this._offset || 0;
            if (input != null) {
                if (typeof input === "string") {
                    input = timezoneMinutesFromString(input);
                }
                if (Math.abs(input) < 16) {
                    input = input * 60;
                }
                this._offset = input;
                this._isUTC = true;
                if (offset !== input) {
                    addOrSubtractDurationFromMoment(this, moment.duration(offset - input, 'm'), 1, true);
                }
            } else {
                return this._isUTC ? offset : this._d.getTimezoneOffset();
            }
            return this;
        },

        zoneAbbr : function () {
            return this._isUTC ? "UTC" : "";
        },

        zoneName : function () {
            return this._isUTC ? "Coordinated Universal Time" : "";
        },

        parseZone : function () {
            if (this._tzm) {
                this.zone(this._tzm);
            } else if (typeof this._i === 'string') {
                this.zone(this._i);
            }
            return this;
        },

        hasAlignedHourOffset : function (input) {
            if (!input) {
                input = 0;
            }
            else {
                input = moment(input).zone();
            }

            return (this.zone() - input) % 60 === 0;
        },

        daysInMonth : function () {
            return daysInMonth(this.year(), this.month());
        },

        dayOfYear : function (input) {
            var dayOfYear = round((moment(this).startOf('day') - moment(this).startOf('year')) / 864e5) + 1;
            return input == null ? dayOfYear : this.add("d", (input - dayOfYear));
        },

        quarter : function () {
            return Math.ceil((this.month() + 1.0) / 3.0);
        },

        weekYear : function (input) {
            var year = weekOfYear(this, this.lang()._week.dow, this.lang()._week.doy).year;
            return input == null ? year : this.add("y", (input - year));
        },

        isoWeekYear : function (input) {
            var year = weekOfYear(this, 1, 4).year;
            return input == null ? year : this.add("y", (input - year));
        },

        week : function (input) {
            var week = this.lang().week(this);
            return input == null ? week : this.add("d", (input - week) * 7);
        },

        isoWeek : function (input) {
            var week = weekOfYear(this, 1, 4).week;
            return input == null ? week : this.add("d", (input - week) * 7);
        },

        weekday : function (input) {
            var weekday = (this.day() + 7 - this.lang()._week.dow) % 7;
            return input == null ? weekday : this.add("d", input - weekday);
        },

        isoWeekday : function (input) {
            // behaves the same as moment#day except
            // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
            // as a setter, sunday should belong to the previous week.
            return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
        },

        get : function (units) {
            units = normalizeUnits(units);
            return this[units]();
        },

        set : function (units, value) {
            units = normalizeUnits(units);
            if (typeof this[units] === 'function') {
                this[units](value);
            }
            return this;
        },

        // If passed a language key, it will set the language for this
        // instance.  Otherwise, it will return the language configuration
        // variables for this instance.
        lang : function (key) {
            if (key === undefined) {
                return this._lang;
            } else {
                this._lang = getLangDefinition(key);
                return this;
            }
        }
    });

    // helper for adding shortcuts
    function makeGetterAndSetter(name, key) {
        moment.fn[name] = moment.fn[name + 's'] = function (input) {
            var utc = this._isUTC ? 'UTC' : '';
            if (input != null) {
                this._d['set' + utc + key](input);
                moment.updateOffset(this);
                return this;
            } else {
                return this._d['get' + utc + key]();
            }
        };
    }

    // loop through and add shortcuts (Month, Date, Hours, Minutes, Seconds, Milliseconds)
    for (i = 0; i < proxyGettersAndSetters.length; i ++) {
        makeGetterAndSetter(proxyGettersAndSetters[i].toLowerCase().replace(/s$/, ''), proxyGettersAndSetters[i]);
    }

    // add shortcut for year (uses different syntax than the getter/setter 'year' == 'FullYear')
    makeGetterAndSetter('year', 'FullYear');

    // add plural methods
    moment.fn.days = moment.fn.day;
    moment.fn.months = moment.fn.month;
    moment.fn.weeks = moment.fn.week;
    moment.fn.isoWeeks = moment.fn.isoWeek;

    // add aliased format methods
    moment.fn.toJSON = moment.fn.toISOString;

    /************************************
        Duration Prototype
    ************************************/


    extend(moment.duration.fn = Duration.prototype, {

        _bubble : function () {
            var milliseconds = this._milliseconds,
                days = this._days,
                months = this._months,
                data = this._data,
                seconds, minutes, hours, years;

            // The following code bubbles up values, see the tests for
            // examples of what that means.
            data.milliseconds = milliseconds % 1000;

            seconds = absRound(milliseconds / 1000);
            data.seconds = seconds % 60;

            minutes = absRound(seconds / 60);
            data.minutes = minutes % 60;

            hours = absRound(minutes / 60);
            data.hours = hours % 24;

            days += absRound(hours / 24);
            data.days = days % 30;

            months += absRound(days / 30);
            data.months = months % 12;

            years = absRound(months / 12);
            data.years = years;
        },

        weeks : function () {
            return absRound(this.days() / 7);
        },

        valueOf : function () {
            return this._milliseconds +
              this._days * 864e5 +
              (this._months % 12) * 2592e6 +
              toInt(this._months / 12) * 31536e6;
        },

        humanize : function (withSuffix) {
            var difference = +this,
                output = relativeTime(difference, !withSuffix, this.lang());

            if (withSuffix) {
                output = this.lang().pastFuture(difference, output);
            }

            return this.lang().postformat(output);
        },

        add : function (input, val) {
            // supports only 2.0-style add(1, 's') or add(moment)
            var dur = moment.duration(input, val);

            this._milliseconds += dur._milliseconds;
            this._days += dur._days;
            this._months += dur._months;

            this._bubble();

            return this;
        },

        subtract : function (input, val) {
            var dur = moment.duration(input, val);

            this._milliseconds -= dur._milliseconds;
            this._days -= dur._days;
            this._months -= dur._months;

            this._bubble();

            return this;
        },

        get : function (units) {
            units = normalizeUnits(units);
            return this[units.toLowerCase() + 's']();
        },

        as : function (units) {
            units = normalizeUnits(units);
            return this['as' + units.charAt(0).toUpperCase() + units.slice(1) + 's']();
        },

        lang : moment.fn.lang,

        toIsoString : function () {
            // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
            var years = Math.abs(this.years()),
                months = Math.abs(this.months()),
                days = Math.abs(this.days()),
                hours = Math.abs(this.hours()),
                minutes = Math.abs(this.minutes()),
                seconds = Math.abs(this.seconds() + this.milliseconds() / 1000);

            if (!this.asSeconds()) {
                // this is the same as C#'s (Noda) and python (isodate)...
                // but not other JS (goog.date)
                return 'P0D';
            }

            return (this.asSeconds() < 0 ? '-' : '') +
                'P' +
                (years ? years + 'Y' : '') +
                (months ? months + 'M' : '') +
                (days ? days + 'D' : '') +
                ((hours || minutes || seconds) ? 'T' : '') +
                (hours ? hours + 'H' : '') +
                (minutes ? minutes + 'M' : '') +
                (seconds ? seconds + 'S' : '');
        }
    });

    function makeDurationGetter(name) {
        moment.duration.fn[name] = function () {
            return this._data[name];
        };
    }

    function makeDurationAsGetter(name, factor) {
        moment.duration.fn['as' + name] = function () {
            return +this / factor;
        };
    }

    for (i in unitMillisecondFactors) {
        if (unitMillisecondFactors.hasOwnProperty(i)) {
            makeDurationAsGetter(i, unitMillisecondFactors[i]);
            makeDurationGetter(i.toLowerCase());
        }
    }

    makeDurationAsGetter('Weeks', 6048e5);
    moment.duration.fn.asMonths = function () {
        return (+this - this.years() * 31536e6) / 2592e6 + this.years() * 12;
    };


    /************************************
        Default Lang
    ************************************/


    // Set default language, other languages will inherit from English.
    moment.lang('en', {
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    /* EMBED_LANGUAGES */

    /************************************
        Exposing Moment
    ************************************/

    function makeGlobal(deprecate) {
        var warned = false, local_moment = moment;
        /*global ender:false */
        if (typeof ender !== 'undefined') {
            return;
        }
        // here, `this` means `window` in the browser, or `global` on the server
        // add `moment` as a global object via a string identifier,
        // for Closure Compiler "advanced" mode
        if (deprecate) {
            global.moment = function () {
                if (!warned && console && console.warn) {
                    warned = true;
                    console.warn(
                            "Accessing Moment through the global scope is " +
                            "deprecated, and will be removed in an upcoming " +
                            "release.");
                }
                return local_moment.apply(null, arguments);
            };
            extend(global.moment, local_moment);
        } else {
            global['moment'] = moment;
        }
    }

    // CommonJS module is defined
    if (hasModule) {
        module.exports = moment;
        makeGlobal(true);
    } else if (typeof define === "function" && define.amd) {
        define("moment", function (require, exports, module) {
            if (module.config && module.config() && module.config().noGlobal !== true) {
                // If user provided noGlobal, he is aware of global
                makeGlobal(module.config().noGlobal === undefined);
            }

            return moment;
        });
    } else {
        makeGlobal();
    }
}).call(this);

// moment.js language configuration
// language : russian (ru)
// author : Viktorminator : https://github.com/Viktorminator
// Author : Menelion Elensúle : https://github.com/Oire

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['moment'], factory); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}(function (moment) {
    function plural(word, num) {
        var forms = word.split('_');
        return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
    }

    function relativeTimeWithPlural(number, withoutSuffix, key) {
        var format = {
            'mm': 'минута_минуты_минут',
            'hh': 'час_часа_часов',
            'dd': 'день_дня_дней',
            'MM': 'месяц_месяца_месяцев',
            'yy': 'год_года_лет'
        };
        if (key === 'm') {
            return withoutSuffix ? 'минута' : 'минуту';
        }
        else {
            return number + ' ' + plural(format[key], +number);
        }
    }

    function monthsCaseReplace(m, format) {
        var months = {
            'nominative': 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_'),
            'accusative': 'января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря'.split('_')
        },

        nounCase = (/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/).test(format) ?
            'accusative' :
            'nominative';

        return months[nounCase][m.month()];
    }

    function monthsShortCaseReplace(m, format) {
        var monthsShort = {
            'nominative': 'янв_фев_мар_апр_май_июнь_июль_авг_сен_окт_ноя_дек'.split('_'),
            'accusative': 'янв_фев_мар_апр_мая_июня_июля_авг_сен_окт_ноя_дек'.split('_')
        },

        nounCase = (/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/).test(format) ?
            'accusative' :
            'nominative';

        return monthsShort[nounCase][m.month()];
    }

    function weekdaysCaseReplace(m, format) {
        var weekdays = {
            'nominative': 'воскресенье_понедельник_вторник_среда_четверг_пятница_суббота'.split('_'),
            'accusative': 'воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу'.split('_')
        },

        nounCase = (/\[ ?[Вв] ?(?:прошлую|следующую)? ?\] ?dddd/).test(format) ?
            'accusative' :
            'nominative';

        return weekdays[nounCase][m.day()];
    }

    return moment.lang('ru', {
        months : monthsCaseReplace,
        monthsShort : monthsShortCaseReplace,
        weekdays : weekdaysCaseReplace,
        weekdaysShort : "вс_пн_вт_ср_чт_пт_сб".split("_"),
        weekdaysMin : "вс_пн_вт_ср_чт_пт_сб".split("_"),
        monthsParse : [/^янв/i, /^фев/i, /^мар/i, /^апр/i, /^ма[й|я]/i, /^июн/i, /^июл/i, /^авг/i, /^сен/i, /^окт/i, /^ноя/i, /^дек/i],
        longDateFormat : {
            LT : "HH:mm",
            L : "DD.MM.YYYY",
            LL : "D MMMM YYYY г.",
            LLL : "D MMMM YYYY г., LT",
            LLLL : "dddd, D MMMM YYYY г., LT"
        },
        calendar : {
            sameDay: '[Сегодня]',
            nextDay: '[Завтра]',
            lastDay: '[Вчера]',
            nextWeek: function () {
                return this.day() === 2 ? 'DD MMMM' : 'DD MMMM';
            },
            lastWeek: function () {
                switch (this.day()) {
                case 0:
                    return '[В прошлое] dddd [в] LT';
                case 1:
                case 2:
                case 4:
                    return '[В прошлый] dddd [в] LT';
                case 3:
                case 5:
                case 6:
                    return '[В прошлую] dddd [в] LT';
                }
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : "через %s",
            past : "%s назад",
            s : "несколько секунд",
            m : relativeTimeWithPlural,
            mm : relativeTimeWithPlural,
            h : "час",
            hh : relativeTimeWithPlural,
            d : "день",
            dd : relativeTimeWithPlural,
            M : "месяц",
            MM : relativeTimeWithPlural,
            y : "год",
            yy : relativeTimeWithPlural
        },

        // M. E.: those two are virtually unused but a user might want to implement them for his/her website for some reason

        meridiem : function (hour, minute, isLower) {
            if (hour < 4) {
                return "ночи";
            } else if (hour < 12) {
                return "утра";
            } else if (hour < 17) {
                return "дня";
            } else {
                return "вечера";
            }
        },

        ordinal: function (number, period) {
            switch (period) {
            case 'M':
            case 'd':
            case 'DDD':
                return number + '-й';
            case 'D':
                return number + '-го';
            case 'w':
            case 'W':
                return number + '-я';
            default:
                return number;
            }
        },

        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });
}));

/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.6.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"undefined"!=typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){"use strict";var b=window.Slick||{};b=function(){function c(c,d){var f,e=this;e.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:a(c),appendDots:a(c),arrows:!0,asNavFor:null,prevArrow:'<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',nextArrow:'<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(b,c){return a('<button type="button" data-role="none" role="button" tabindex="0" />').text(c+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},e.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},a.extend(e,e.initials),e.activeBreakpoint=null,e.animType=null,e.animProp=null,e.breakpoints=[],e.breakpointSettings=[],e.cssTransitions=!1,e.focussed=!1,e.interrupted=!1,e.hidden="hidden",e.paused=!0,e.positionProp=null,e.respondTo=null,e.rowCount=1,e.shouldClick=!0,e.$slider=a(c),e.$slidesCache=null,e.transformType=null,e.transitionType=null,e.visibilityChange="visibilitychange",e.windowWidth=0,e.windowTimer=null,f=a(c).data("slick")||{},e.options=a.extend({},e.defaults,d,f),e.currentSlide=e.options.initialSlide,e.originalSettings=e.options,"undefined"!=typeof document.mozHidden?(e.hidden="mozHidden",e.visibilityChange="mozvisibilitychange"):"undefined"!=typeof document.webkitHidden&&(e.hidden="webkitHidden",e.visibilityChange="webkitvisibilitychange"),e.autoPlay=a.proxy(e.autoPlay,e),e.autoPlayClear=a.proxy(e.autoPlayClear,e),e.autoPlayIterator=a.proxy(e.autoPlayIterator,e),e.changeSlide=a.proxy(e.changeSlide,e),e.clickHandler=a.proxy(e.clickHandler,e),e.selectHandler=a.proxy(e.selectHandler,e),e.setPosition=a.proxy(e.setPosition,e),e.swipeHandler=a.proxy(e.swipeHandler,e),e.dragHandler=a.proxy(e.dragHandler,e),e.keyHandler=a.proxy(e.keyHandler,e),e.instanceUid=b++,e.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,e.registerBreakpoints(),e.init(!0)}var b=0;return c}(),b.prototype.activateADA=function(){var a=this;a.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},b.prototype.addSlide=b.prototype.slickAdd=function(b,c,d){var e=this;if("boolean"==typeof c)d=c,c=null;else if(0>c||c>=e.slideCount)return!1;e.unload(),"number"==typeof c?0===c&&0===e.$slides.length?a(b).appendTo(e.$slideTrack):d?a(b).insertBefore(e.$slides.eq(c)):a(b).insertAfter(e.$slides.eq(c)):d===!0?a(b).prependTo(e.$slideTrack):a(b).appendTo(e.$slideTrack),e.$slides=e.$slideTrack.children(this.options.slide),e.$slideTrack.children(this.options.slide).detach(),e.$slideTrack.append(e.$slides),e.$slides.each(function(b,c){a(c).attr("data-slick-index",b)}),e.$slidesCache=e.$slides,e.reinit()},b.prototype.animateHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.animate({height:b},a.options.speed)}},b.prototype.animateSlide=function(b,c){var d={},e=this;e.animateHeight(),e.options.rtl===!0&&e.options.vertical===!1&&(b=-b),e.transformsEnabled===!1?e.options.vertical===!1?e.$slideTrack.animate({left:b},e.options.speed,e.options.easing,c):e.$slideTrack.animate({top:b},e.options.speed,e.options.easing,c):e.cssTransitions===!1?(e.options.rtl===!0&&(e.currentLeft=-e.currentLeft),a({animStart:e.currentLeft}).animate({animStart:b},{duration:e.options.speed,easing:e.options.easing,step:function(a){a=Math.ceil(a),e.options.vertical===!1?(d[e.animType]="translate("+a+"px, 0px)",e.$slideTrack.css(d)):(d[e.animType]="translate(0px,"+a+"px)",e.$slideTrack.css(d))},complete:function(){c&&c.call()}})):(e.applyTransition(),b=Math.ceil(b),e.options.vertical===!1?d[e.animType]="translate3d("+b+"px, 0px, 0px)":d[e.animType]="translate3d(0px,"+b+"px, 0px)",e.$slideTrack.css(d),c&&setTimeout(function(){e.disableTransition(),c.call()},e.options.speed))},b.prototype.getNavTarget=function(){var b=this,c=b.options.asNavFor;return c&&null!==c&&(c=a(c).not(b.$slider)),c},b.prototype.asNavFor=function(b){var c=this,d=c.getNavTarget();null!==d&&"object"==typeof d&&d.each(function(){var c=a(this).slick("getSlick");c.unslicked||c.slideHandler(b,!0)})},b.prototype.applyTransition=function(a){var b=this,c={};b.options.fade===!1?c[b.transitionType]=b.transformType+" "+b.options.speed+"ms "+b.options.cssEase:c[b.transitionType]="opacity "+b.options.speed+"ms "+b.options.cssEase,b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.autoPlay=function(){var a=this;a.autoPlayClear(),a.slideCount>a.options.slidesToShow&&(a.autoPlayTimer=setInterval(a.autoPlayIterator,a.options.autoplaySpeed))},b.prototype.autoPlayClear=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer)},b.prototype.autoPlayIterator=function(){var a=this,b=a.currentSlide+a.options.slidesToScroll;a.paused||a.interrupted||a.focussed||(a.options.infinite===!1&&(1===a.direction&&a.currentSlide+1===a.slideCount-1?a.direction=0:0===a.direction&&(b=a.currentSlide-a.options.slidesToScroll,a.currentSlide-1===0&&(a.direction=1))),a.slideHandler(b))},b.prototype.buildArrows=function(){var b=this;b.options.arrows===!0&&(b.$prevArrow=a(b.options.prevArrow).addClass("slick-arrow"),b.$nextArrow=a(b.options.nextArrow).addClass("slick-arrow"),b.slideCount>b.options.slidesToShow?(b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.prependTo(b.options.appendArrows),b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.appendTo(b.options.appendArrows),b.options.infinite!==!0&&b.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},b.prototype.buildDots=function(){var c,d,b=this;if(b.options.dots===!0&&b.slideCount>b.options.slidesToShow){for(b.$slider.addClass("slick-dotted"),d=a("<ul />").addClass(b.options.dotsClass),c=0;c<=b.getDotCount();c+=1)d.append(a("<li />").append(b.options.customPaging.call(this,b,c)));b.$dots=d.appendTo(b.options.appendDots),b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden","false")}},b.prototype.buildOut=function(){var b=this;b.$slides=b.$slider.children(b.options.slide+":not(.slick-cloned)").addClass("slick-slide"),b.slideCount=b.$slides.length,b.$slides.each(function(b,c){a(c).attr("data-slick-index",b).data("originalStyling",a(c).attr("style")||"")}),b.$slider.addClass("slick-slider"),b.$slideTrack=0===b.slideCount?a('<div class="slick-track"/>').appendTo(b.$slider):b.$slides.wrapAll('<div class="slick-track"/>').parent(),b.$list=b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(),b.$slideTrack.css("opacity",0),(b.options.centerMode===!0||b.options.swipeToSlide===!0)&&(b.options.slidesToScroll=1),a("img[data-lazy]",b.$slider).not("[src]").addClass("slick-loading"),b.setupInfinite(),b.buildArrows(),b.buildDots(),b.updateDots(),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.options.draggable===!0&&b.$list.addClass("draggable")},b.prototype.buildRows=function(){var b,c,d,e,f,g,h,a=this;if(e=document.createDocumentFragment(),g=a.$slider.children(),a.options.rows>1){for(h=a.options.slidesPerRow*a.options.rows,f=Math.ceil(g.length/h),b=0;f>b;b++){var i=document.createElement("div");for(c=0;c<a.options.rows;c++){var j=document.createElement("div");for(d=0;d<a.options.slidesPerRow;d++){var k=b*h+(c*a.options.slidesPerRow+d);g.get(k)&&j.appendChild(g.get(k))}i.appendChild(j)}e.appendChild(i)}a.$slider.empty().append(e),a.$slider.children().children().children().css({width:100/a.options.slidesPerRow+"%",display:"inline-block"})}},b.prototype.checkResponsive=function(b,c){var e,f,g,d=this,h=!1,i=d.$slider.width(),j=window.innerWidth||a(window).width();if("window"===d.respondTo?g=j:"slider"===d.respondTo?g=i:"min"===d.respondTo&&(g=Math.min(j,i)),d.options.responsive&&d.options.responsive.length&&null!==d.options.responsive){f=null;for(e in d.breakpoints)d.breakpoints.hasOwnProperty(e)&&(d.originalSettings.mobileFirst===!1?g<d.breakpoints[e]&&(f=d.breakpoints[e]):g>d.breakpoints[e]&&(f=d.breakpoints[e]));null!==f?null!==d.activeBreakpoint?(f!==d.activeBreakpoint||c)&&(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):null!==d.activeBreakpoint&&(d.activeBreakpoint=null,d.options=d.originalSettings,b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b),h=f),b||h===!1||d.$slider.trigger("breakpoint",[d,h])}},b.prototype.changeSlide=function(b,c){var f,g,h,d=this,e=a(b.currentTarget);switch(e.is("a")&&b.preventDefault(),e.is("li")||(e=e.closest("li")),h=d.slideCount%d.options.slidesToScroll!==0,f=h?0:(d.slideCount-d.currentSlide)%d.options.slidesToScroll,b.data.message){case"previous":g=0===f?d.options.slidesToScroll:d.options.slidesToShow-f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide-g,!1,c);break;case"next":g=0===f?d.options.slidesToScroll:f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide+g,!1,c);break;case"index":var i=0===b.data.index?0:b.data.index||e.index()*d.options.slidesToScroll;d.slideHandler(d.checkNavigable(i),!1,c),e.children().trigger("focus");break;default:return}},b.prototype.checkNavigable=function(a){var c,d,b=this;if(c=b.getNavigableIndexes(),d=0,a>c[c.length-1])a=c[c.length-1];else for(var e in c){if(a<c[e]){a=d;break}d=c[e]}return a},b.prototype.cleanUpEvents=function(){var b=this;b.options.dots&&null!==b.$dots&&a("li",b.$dots).off("click.slick",b.changeSlide).off("mouseenter.slick",a.proxy(b.interrupt,b,!0)).off("mouseleave.slick",a.proxy(b.interrupt,b,!1)),b.$slider.off("focus.slick blur.slick"),b.options.arrows===!0&&b.slideCount>b.options.slidesToShow&&(b.$prevArrow&&b.$prevArrow.off("click.slick",b.changeSlide),b.$nextArrow&&b.$nextArrow.off("click.slick",b.changeSlide)),b.$list.off("touchstart.slick mousedown.slick",b.swipeHandler),b.$list.off("touchmove.slick mousemove.slick",b.swipeHandler),b.$list.off("touchend.slick mouseup.slick",b.swipeHandler),b.$list.off("touchcancel.slick mouseleave.slick",b.swipeHandler),b.$list.off("click.slick",b.clickHandler),a(document).off(b.visibilityChange,b.visibility),b.cleanUpSlideEvents(),b.options.accessibility===!0&&b.$list.off("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().off("click.slick",b.selectHandler),a(window).off("orientationchange.slick.slick-"+b.instanceUid,b.orientationChange),a(window).off("resize.slick.slick-"+b.instanceUid,b.resize),a("[draggable!=true]",b.$slideTrack).off("dragstart",b.preventDefault),a(window).off("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).off("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.cleanUpSlideEvents=function(){var b=this;b.$list.off("mouseenter.slick",a.proxy(b.interrupt,b,!0)),b.$list.off("mouseleave.slick",a.proxy(b.interrupt,b,!1))},b.prototype.cleanUpRows=function(){var b,a=this;a.options.rows>1&&(b=a.$slides.children().children(),b.removeAttr("style"),a.$slider.empty().append(b))},b.prototype.clickHandler=function(a){var b=this;b.shouldClick===!1&&(a.stopImmediatePropagation(),a.stopPropagation(),a.preventDefault())},b.prototype.destroy=function(b){var c=this;c.autoPlayClear(),c.touchObject={},c.cleanUpEvents(),a(".slick-cloned",c.$slider).detach(),c.$dots&&c.$dots.remove(),c.$prevArrow&&c.$prevArrow.length&&(c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.prevArrow)&&c.$prevArrow.remove()),c.$nextArrow&&c.$nextArrow.length&&(c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.nextArrow)&&c.$nextArrow.remove()),c.$slides&&(c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){a(this).attr("style",a(this).data("originalStyling"))}),c.$slideTrack.children(this.options.slide).detach(),c.$slideTrack.detach(),c.$list.detach(),c.$slider.append(c.$slides)),c.cleanUpRows(),c.$slider.removeClass("slick-slider"),c.$slider.removeClass("slick-initialized"),c.$slider.removeClass("slick-dotted"),c.unslicked=!0,b||c.$slider.trigger("destroy",[c])},b.prototype.disableTransition=function(a){var b=this,c={};c[b.transitionType]="",b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.fadeSlide=function(a,b){var c=this;c.cssTransitions===!1?(c.$slides.eq(a).css({zIndex:c.options.zIndex}),c.$slides.eq(a).animate({opacity:1},c.options.speed,c.options.easing,b)):(c.applyTransition(a),c.$slides.eq(a).css({opacity:1,zIndex:c.options.zIndex}),b&&setTimeout(function(){c.disableTransition(a),b.call()},c.options.speed))},b.prototype.fadeSlideOut=function(a){var b=this;b.cssTransitions===!1?b.$slides.eq(a).animate({opacity:0,zIndex:b.options.zIndex-2},b.options.speed,b.options.easing):(b.applyTransition(a),b.$slides.eq(a).css({opacity:0,zIndex:b.options.zIndex-2}))},b.prototype.filterSlides=b.prototype.slickFilter=function(a){var b=this;null!==a&&(b.$slidesCache=b.$slides,b.unload(),b.$slideTrack.children(this.options.slide).detach(),b.$slidesCache.filter(a).appendTo(b.$slideTrack),b.reinit())},b.prototype.focusHandler=function(){var b=this;b.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*:not(.slick-arrow)",function(c){c.stopImmediatePropagation();var d=a(this);setTimeout(function(){b.options.pauseOnFocus&&(b.focussed=d.is(":focus"),b.autoPlay())},0)})},b.prototype.getCurrent=b.prototype.slickCurrentSlide=function(){var a=this;return a.currentSlide},b.prototype.getDotCount=function(){var a=this,b=0,c=0,d=0;if(a.options.infinite===!0)for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else if(a.options.centerMode===!0)d=a.slideCount;else if(a.options.asNavFor)for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else d=1+Math.ceil((a.slideCount-a.options.slidesToShow)/a.options.slidesToScroll);return d-1},b.prototype.getLeft=function(a){var c,d,f,b=this,e=0;return b.slideOffset=0,d=b.$slides.first().outerHeight(!0),b.options.infinite===!0?(b.slideCount>b.options.slidesToShow&&(b.slideOffset=b.slideWidth*b.options.slidesToShow*-1,e=d*b.options.slidesToShow*-1),b.slideCount%b.options.slidesToScroll!==0&&a+b.options.slidesToScroll>b.slideCount&&b.slideCount>b.options.slidesToShow&&(a>b.slideCount?(b.slideOffset=(b.options.slidesToShow-(a-b.slideCount))*b.slideWidth*-1,e=(b.options.slidesToShow-(a-b.slideCount))*d*-1):(b.slideOffset=b.slideCount%b.options.slidesToScroll*b.slideWidth*-1,e=b.slideCount%b.options.slidesToScroll*d*-1))):a+b.options.slidesToShow>b.slideCount&&(b.slideOffset=(a+b.options.slidesToShow-b.slideCount)*b.slideWidth,e=(a+b.options.slidesToShow-b.slideCount)*d),b.slideCount<=b.options.slidesToShow&&(b.slideOffset=0,e=0),b.options.centerMode===!0&&b.options.infinite===!0?b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)-b.slideWidth:b.options.centerMode===!0&&(b.slideOffset=0,b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)),c=b.options.vertical===!1?a*b.slideWidth*-1+b.slideOffset:a*d*-1+e,b.options.variableWidth===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,b.options.centerMode===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow+1),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,c+=(b.$list.width()-f.outerWidth())/2)),c},b.prototype.getOption=b.prototype.slickGetOption=function(a){var b=this;return b.options[a]},b.prototype.getNavigableIndexes=function(){var e,a=this,b=0,c=0,d=[];for(a.options.infinite===!1?e=a.slideCount:(b=-1*a.options.slidesToScroll,c=-1*a.options.slidesToScroll,e=2*a.slideCount);e>b;)d.push(b),b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;return d},b.prototype.getSlick=function(){return this},b.prototype.getSlideCount=function(){var c,d,e,b=this;return e=b.options.centerMode===!0?b.slideWidth*Math.floor(b.options.slidesToShow/2):0,b.options.swipeToSlide===!0?(b.$slideTrack.find(".slick-slide").each(function(c,f){return f.offsetLeft-e+a(f).outerWidth()/2>-1*b.swipeLeft?(d=f,!1):void 0}),c=Math.abs(a(d).attr("data-slick-index")-b.currentSlide)||1):b.options.slidesToScroll},b.prototype.goTo=b.prototype.slickGoTo=function(a,b){var c=this;c.changeSlide({data:{message:"index",index:parseInt(a)}},b)},b.prototype.init=function(b){var c=this;a(c.$slider).hasClass("slick-initialized")||(a(c.$slider).addClass("slick-initialized"),c.buildRows(),c.buildOut(),c.setProps(),c.startLoad(),c.loadSlider(),c.initializeEvents(),c.updateArrows(),c.updateDots(),c.checkResponsive(!0),c.focusHandler()),b&&c.$slider.trigger("init",[c]),c.options.accessibility===!0&&c.initADA(),c.options.autoplay&&(c.paused=!1,c.autoPlay())},b.prototype.initADA=function(){var b=this;b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),b.$slideTrack.attr("role","listbox"),b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function(c){a(this).attr({role:"option","aria-describedby":"slick-slide"+b.instanceUid+c})}),null!==b.$dots&&b.$dots.attr("role","tablist").find("li").each(function(c){a(this).attr({role:"presentation","aria-selected":"false","aria-controls":"navigation"+b.instanceUid+c,id:"slick-slide"+b.instanceUid+c})}).first().attr("aria-selected","true").end().find("button").attr("role","button").end().closest("div").attr("role","toolbar"),b.activateADA()},b.prototype.initArrowEvents=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},a.changeSlide),a.$nextArrow.off("click.slick").on("click.slick",{message:"next"},a.changeSlide))},b.prototype.initDotEvents=function(){var b=this;b.options.dots===!0&&b.slideCount>b.options.slidesToShow&&a("li",b.$dots).on("click.slick",{message:"index"},b.changeSlide),b.options.dots===!0&&b.options.pauseOnDotsHover===!0&&a("li",b.$dots).on("mouseenter.slick",a.proxy(b.interrupt,b,!0)).on("mouseleave.slick",a.proxy(b.interrupt,b,!1))},b.prototype.initSlideEvents=function(){var b=this;b.options.pauseOnHover&&(b.$list.on("mouseenter.slick",a.proxy(b.interrupt,b,!0)),b.$list.on("mouseleave.slick",a.proxy(b.interrupt,b,!1)))},b.prototype.initializeEvents=function(){var b=this;b.initArrowEvents(),b.initDotEvents(),b.initSlideEvents(),b.$list.on("touchstart.slick mousedown.slick",{action:"start"},b.swipeHandler),b.$list.on("touchmove.slick mousemove.slick",{action:"move"},b.swipeHandler),b.$list.on("touchend.slick mouseup.slick",{action:"end"},b.swipeHandler),b.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},b.swipeHandler),b.$list.on("click.slick",b.clickHandler),a(document).on(b.visibilityChange,a.proxy(b.visibility,b)),b.options.accessibility===!0&&b.$list.on("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),a(window).on("orientationchange.slick.slick-"+b.instanceUid,a.proxy(b.orientationChange,b)),a(window).on("resize.slick.slick-"+b.instanceUid,a.proxy(b.resize,b)),a("[draggable!=true]",b.$slideTrack).on("dragstart",b.preventDefault),a(window).on("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).on("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.initUI=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.show(),a.$nextArrow.show()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.show()},b.prototype.keyHandler=function(a){var b=this;a.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===a.keyCode&&b.options.accessibility===!0?b.changeSlide({data:{message:b.options.rtl===!0?"next":"previous"}}):39===a.keyCode&&b.options.accessibility===!0&&b.changeSlide({data:{message:b.options.rtl===!0?"previous":"next"}}))},b.prototype.lazyLoad=function(){function g(c){a("img[data-lazy]",c).each(function(){var c=a(this),d=a(this).attr("data-lazy"),e=document.createElement("img");e.onload=function(){c.animate({opacity:0},100,function(){c.attr("src",d).animate({opacity:1},200,function(){c.removeAttr("data-lazy").removeClass("slick-loading")}),b.$slider.trigger("lazyLoaded",[b,c,d])})},e.onerror=function(){c.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),b.$slider.trigger("lazyLoadError",[b,c,d])},e.src=d})}var c,d,e,f,b=this;b.options.centerMode===!0?b.options.infinite===!0?(e=b.currentSlide+(b.options.slidesToShow/2+1),f=e+b.options.slidesToShow+2):(e=Math.max(0,b.currentSlide-(b.options.slidesToShow/2+1)),f=2+(b.options.slidesToShow/2+1)+b.currentSlide):(e=b.options.infinite?b.options.slidesToShow+b.currentSlide:b.currentSlide,f=Math.ceil(e+b.options.slidesToShow),b.options.fade===!0&&(e>0&&e--,f<=b.slideCount&&f++)),c=b.$slider.find(".slick-slide").slice(e,f),g(c),b.slideCount<=b.options.slidesToShow?(d=b.$slider.find(".slick-slide"),g(d)):b.currentSlide>=b.slideCount-b.options.slidesToShow?(d=b.$slider.find(".slick-cloned").slice(0,b.options.slidesToShow),g(d)):0===b.currentSlide&&(d=b.$slider.find(".slick-cloned").slice(-1*b.options.slidesToShow),g(d))},b.prototype.loadSlider=function(){var a=this;a.setPosition(),a.$slideTrack.css({opacity:1}),a.$slider.removeClass("slick-loading"),a.initUI(),"progressive"===a.options.lazyLoad&&a.progressiveLazyLoad()},b.prototype.next=b.prototype.slickNext=function(){var a=this;a.changeSlide({data:{message:"next"}})},b.prototype.orientationChange=function(){var a=this;a.checkResponsive(),a.setPosition()},b.prototype.pause=b.prototype.slickPause=function(){var a=this;a.autoPlayClear(),a.paused=!0},b.prototype.play=b.prototype.slickPlay=function(){var a=this;a.autoPlay(),a.options.autoplay=!0,a.paused=!1,a.focussed=!1,a.interrupted=!1},b.prototype.postSlide=function(a){var b=this;b.unslicked||(b.$slider.trigger("afterChange",[b,a]),b.animating=!1,b.setPosition(),b.swipeLeft=null,b.options.autoplay&&b.autoPlay(),b.options.accessibility===!0&&b.initADA())},b.prototype.prev=b.prototype.slickPrev=function(){var a=this;a.changeSlide({data:{message:"previous"}})},b.prototype.preventDefault=function(a){a.preventDefault()},b.prototype.progressiveLazyLoad=function(b){b=b||1;var e,f,g,c=this,d=a("img[data-lazy]",c.$slider);d.length?(e=d.first(),f=e.attr("data-lazy"),g=document.createElement("img"),g.onload=function(){e.attr("src",f).removeAttr("data-lazy").removeClass("slick-loading"),c.options.adaptiveHeight===!0&&c.setPosition(),c.$slider.trigger("lazyLoaded",[c,e,f]),c.progressiveLazyLoad()},g.onerror=function(){3>b?setTimeout(function(){c.progressiveLazyLoad(b+1)},500):(e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),c.$slider.trigger("lazyLoadError",[c,e,f]),c.progressiveLazyLoad())},g.src=f):c.$slider.trigger("allImagesLoaded",[c])},b.prototype.refresh=function(b){var d,e,c=this;e=c.slideCount-c.options.slidesToShow,!c.options.infinite&&c.currentSlide>e&&(c.currentSlide=e),c.slideCount<=c.options.slidesToShow&&(c.currentSlide=0),d=c.currentSlide,c.destroy(!0),a.extend(c,c.initials,{currentSlide:d}),c.init(),b||c.changeSlide({data:{message:"index",index:d}},!1)},b.prototype.registerBreakpoints=function(){var c,d,e,b=this,f=b.options.responsive||null;if("array"===a.type(f)&&f.length){b.respondTo=b.options.respondTo||"window";for(c in f)if(e=b.breakpoints.length-1,d=f[c].breakpoint,f.hasOwnProperty(c)){for(;e>=0;)b.breakpoints[e]&&b.breakpoints[e]===d&&b.breakpoints.splice(e,1),e--;b.breakpoints.push(d),b.breakpointSettings[d]=f[c].settings}b.breakpoints.sort(function(a,c){return b.options.mobileFirst?a-c:c-a})}},b.prototype.reinit=function(){var b=this;b.$slides=b.$slideTrack.children(b.options.slide).addClass("slick-slide"),b.slideCount=b.$slides.length,b.currentSlide>=b.slideCount&&0!==b.currentSlide&&(b.currentSlide=b.currentSlide-b.options.slidesToScroll),b.slideCount<=b.options.slidesToShow&&(b.currentSlide=0),b.registerBreakpoints(),b.setProps(),b.setupInfinite(),b.buildArrows(),b.updateArrows(),b.initArrowEvents(),b.buildDots(),b.updateDots(),b.initDotEvents(),b.cleanUpSlideEvents(),b.initSlideEvents(),b.checkResponsive(!1,!0),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.setPosition(),b.focusHandler(),b.paused=!b.options.autoplay,b.autoPlay(),b.$slider.trigger("reInit",[b])},b.prototype.resize=function(){var b=this;a(window).width()!==b.windowWidth&&(clearTimeout(b.windowDelay),b.windowDelay=window.setTimeout(function(){b.windowWidth=a(window).width(),b.checkResponsive(),b.unslicked||b.setPosition()},50))},b.prototype.removeSlide=b.prototype.slickRemove=function(a,b,c){var d=this;return"boolean"==typeof a?(b=a,a=b===!0?0:d.slideCount-1):a=b===!0?--a:a,d.slideCount<1||0>a||a>d.slideCount-1?!1:(d.unload(),c===!0?d.$slideTrack.children().remove():d.$slideTrack.children(this.options.slide).eq(a).remove(),d.$slides=d.$slideTrack.children(this.options.slide),d.$slideTrack.children(this.options.slide).detach(),d.$slideTrack.append(d.$slides),d.$slidesCache=d.$slides,void d.reinit())},b.prototype.setCSS=function(a){var d,e,b=this,c={};b.options.rtl===!0&&(a=-a),d="left"==b.positionProp?Math.ceil(a)+"px":"0px",e="top"==b.positionProp?Math.ceil(a)+"px":"0px",c[b.positionProp]=a,b.transformsEnabled===!1?b.$slideTrack.css(c):(c={},b.cssTransitions===!1?(c[b.animType]="translate("+d+", "+e+")",b.$slideTrack.css(c)):(c[b.animType]="translate3d("+d+", "+e+", 0px)",b.$slideTrack.css(c)))},b.prototype.setDimensions=function(){var a=this;a.options.vertical===!1?a.options.centerMode===!0&&a.$list.css({padding:"0px "+a.options.centerPadding}):(a.$list.height(a.$slides.first().outerHeight(!0)*a.options.slidesToShow),a.options.centerMode===!0&&a.$list.css({padding:a.options.centerPadding+" 0px"})),a.listWidth=a.$list.width(),a.listHeight=a.$list.height(),a.options.vertical===!1&&a.options.variableWidth===!1?(a.slideWidth=Math.ceil(a.listWidth/a.options.slidesToShow),a.$slideTrack.width(Math.ceil(a.slideWidth*a.$slideTrack.children(".slick-slide").length))):a.options.variableWidth===!0?a.$slideTrack.width(5e3*a.slideCount):(a.slideWidth=Math.ceil(a.listWidth),a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0)*a.$slideTrack.children(".slick-slide").length)));var b=a.$slides.first().outerWidth(!0)-a.$slides.first().width();a.options.variableWidth===!1&&a.$slideTrack.children(".slick-slide").width(a.slideWidth-b)},b.prototype.setFade=function(){var c,b=this;b.$slides.each(function(d,e){c=b.slideWidth*d*-1,b.options.rtl===!0?a(e).css({position:"relative",right:c,top:0,zIndex:b.options.zIndex-2,opacity:0}):a(e).css({position:"relative",left:c,top:0,zIndex:b.options.zIndex-2,opacity:0})}),b.$slides.eq(b.currentSlide).css({zIndex:b.options.zIndex-1,opacity:1})},b.prototype.setHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.css("height",b)}},b.prototype.setOption=b.prototype.slickSetOption=function(){var c,d,e,f,h,b=this,g=!1;if("object"===a.type(arguments[0])?(e=arguments[0],g=arguments[1],h="multiple"):"string"===a.type(arguments[0])&&(e=arguments[0],f=arguments[1],g=arguments[2],"responsive"===arguments[0]&&"array"===a.type(arguments[1])?h="responsive":"undefined"!=typeof arguments[1]&&(h="single")),"single"===h)b.options[e]=f;else if("multiple"===h)a.each(e,function(a,c){b.options[a]=c});else if("responsive"===h)for(d in f)if("array"!==a.type(b.options.responsive))b.options.responsive=[f[d]];else{for(c=b.options.responsive.length-1;c>=0;)b.options.responsive[c].breakpoint===f[d].breakpoint&&b.options.responsive.splice(c,1),c--;b.options.responsive.push(f[d])}g&&(b.unload(),b.reinit())},b.prototype.setPosition=function(){var a=this;a.setDimensions(),a.setHeight(),a.options.fade===!1?a.setCSS(a.getLeft(a.currentSlide)):a.setFade(),a.$slider.trigger("setPosition",[a])},b.prototype.setProps=function(){var a=this,b=document.body.style;a.positionProp=a.options.vertical===!0?"top":"left","top"===a.positionProp?a.$slider.addClass("slick-vertical"):a.$slider.removeClass("slick-vertical"),(void 0!==b.WebkitTransition||void 0!==b.MozTransition||void 0!==b.msTransition)&&a.options.useCSS===!0&&(a.cssTransitions=!0),a.options.fade&&("number"==typeof a.options.zIndex?a.options.zIndex<3&&(a.options.zIndex=3):a.options.zIndex=a.defaults.zIndex),void 0!==b.OTransform&&(a.animType="OTransform",a.transformType="-o-transform",a.transitionType="OTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.MozTransform&&(a.animType="MozTransform",a.transformType="-moz-transform",a.transitionType="MozTransition",void 0===b.perspectiveProperty&&void 0===b.MozPerspective&&(a.animType=!1)),void 0!==b.webkitTransform&&(a.animType="webkitTransform",a.transformType="-webkit-transform",a.transitionType="webkitTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.msTransform&&(a.animType="msTransform",a.transformType="-ms-transform",a.transitionType="msTransition",void 0===b.msTransform&&(a.animType=!1)),void 0!==b.transform&&a.animType!==!1&&(a.animType="transform",a.transformType="transform",a.transitionType="transition"),a.transformsEnabled=a.options.useTransform&&null!==a.animType&&a.animType!==!1},b.prototype.setSlideClasses=function(a){var c,d,e,f,b=this;d=b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),b.$slides.eq(a).addClass("slick-current"),b.options.centerMode===!0?(c=Math.floor(b.options.slidesToShow/2),b.options.infinite===!0&&(a>=c&&a<=b.slideCount-1-c?b.$slides.slice(a-c,a+c+1).addClass("slick-active").attr("aria-hidden","false"):(e=b.options.slidesToShow+a,
d.slice(e-c+1,e+c+2).addClass("slick-active").attr("aria-hidden","false")),0===a?d.eq(d.length-1-b.options.slidesToShow).addClass("slick-center"):a===b.slideCount-1&&d.eq(b.options.slidesToShow).addClass("slick-center")),b.$slides.eq(a).addClass("slick-center")):a>=0&&a<=b.slideCount-b.options.slidesToShow?b.$slides.slice(a,a+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):d.length<=b.options.slidesToShow?d.addClass("slick-active").attr("aria-hidden","false"):(f=b.slideCount%b.options.slidesToShow,e=b.options.infinite===!0?b.options.slidesToShow+a:a,b.options.slidesToShow==b.options.slidesToScroll&&b.slideCount-a<b.options.slidesToShow?d.slice(e-(b.options.slidesToShow-f),e+f).addClass("slick-active").attr("aria-hidden","false"):d.slice(e,e+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false")),"ondemand"===b.options.lazyLoad&&b.lazyLoad()},b.prototype.setupInfinite=function(){var c,d,e,b=this;if(b.options.fade===!0&&(b.options.centerMode=!1),b.options.infinite===!0&&b.options.fade===!1&&(d=null,b.slideCount>b.options.slidesToShow)){for(e=b.options.centerMode===!0?b.options.slidesToShow+1:b.options.slidesToShow,c=b.slideCount;c>b.slideCount-e;c-=1)d=c-1,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d-b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");for(c=0;e>c;c+=1)d=c,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d+b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");b.$slideTrack.find(".slick-cloned").find("[id]").each(function(){a(this).attr("id","")})}},b.prototype.interrupt=function(a){var b=this;a||b.autoPlay(),b.interrupted=a},b.prototype.selectHandler=function(b){var c=this,d=a(b.target).is(".slick-slide")?a(b.target):a(b.target).parents(".slick-slide"),e=parseInt(d.attr("data-slick-index"));return e||(e=0),c.slideCount<=c.options.slidesToShow?(c.setSlideClasses(e),void c.asNavFor(e)):void c.slideHandler(e)},b.prototype.slideHandler=function(a,b,c){var d,e,f,g,j,h=null,i=this;return b=b||!1,i.animating===!0&&i.options.waitForAnimate===!0||i.options.fade===!0&&i.currentSlide===a||i.slideCount<=i.options.slidesToShow?void 0:(b===!1&&i.asNavFor(a),d=a,h=i.getLeft(d),g=i.getLeft(i.currentSlide),i.currentLeft=null===i.swipeLeft?g:i.swipeLeft,i.options.infinite===!1&&i.options.centerMode===!1&&(0>a||a>i.getDotCount()*i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d))):i.options.infinite===!1&&i.options.centerMode===!0&&(0>a||a>i.slideCount-i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d))):(i.options.autoplay&&clearInterval(i.autoPlayTimer),e=0>d?i.slideCount%i.options.slidesToScroll!==0?i.slideCount-i.slideCount%i.options.slidesToScroll:i.slideCount+d:d>=i.slideCount?i.slideCount%i.options.slidesToScroll!==0?0:d-i.slideCount:d,i.animating=!0,i.$slider.trigger("beforeChange",[i,i.currentSlide,e]),f=i.currentSlide,i.currentSlide=e,i.setSlideClasses(i.currentSlide),i.options.asNavFor&&(j=i.getNavTarget(),j=j.slick("getSlick"),j.slideCount<=j.options.slidesToShow&&j.setSlideClasses(i.currentSlide)),i.updateDots(),i.updateArrows(),i.options.fade===!0?(c!==!0?(i.fadeSlideOut(f),i.fadeSlide(e,function(){i.postSlide(e)})):i.postSlide(e),void i.animateHeight()):void(c!==!0?i.animateSlide(h,function(){i.postSlide(e)}):i.postSlide(e))))},b.prototype.startLoad=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.hide(),a.$nextArrow.hide()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.hide(),a.$slider.addClass("slick-loading")},b.prototype.swipeDirection=function(){var a,b,c,d,e=this;return a=e.touchObject.startX-e.touchObject.curX,b=e.touchObject.startY-e.touchObject.curY,c=Math.atan2(b,a),d=Math.round(180*c/Math.PI),0>d&&(d=360-Math.abs(d)),45>=d&&d>=0?e.options.rtl===!1?"left":"right":360>=d&&d>=315?e.options.rtl===!1?"left":"right":d>=135&&225>=d?e.options.rtl===!1?"right":"left":e.options.verticalSwiping===!0?d>=35&&135>=d?"down":"up":"vertical"},b.prototype.swipeEnd=function(a){var c,d,b=this;if(b.dragging=!1,b.interrupted=!1,b.shouldClick=b.touchObject.swipeLength>10?!1:!0,void 0===b.touchObject.curX)return!1;if(b.touchObject.edgeHit===!0&&b.$slider.trigger("edge",[b,b.swipeDirection()]),b.touchObject.swipeLength>=b.touchObject.minSwipe){switch(d=b.swipeDirection()){case"left":case"down":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide+b.getSlideCount()):b.currentSlide+b.getSlideCount(),b.currentDirection=0;break;case"right":case"up":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide-b.getSlideCount()):b.currentSlide-b.getSlideCount(),b.currentDirection=1}"vertical"!=d&&(b.slideHandler(c),b.touchObject={},b.$slider.trigger("swipe",[b,d]))}else b.touchObject.startX!==b.touchObject.curX&&(b.slideHandler(b.currentSlide),b.touchObject={})},b.prototype.swipeHandler=function(a){var b=this;if(!(b.options.swipe===!1||"ontouchend"in document&&b.options.swipe===!1||b.options.draggable===!1&&-1!==a.type.indexOf("mouse")))switch(b.touchObject.fingerCount=a.originalEvent&&void 0!==a.originalEvent.touches?a.originalEvent.touches.length:1,b.touchObject.minSwipe=b.listWidth/b.options.touchThreshold,b.options.verticalSwiping===!0&&(b.touchObject.minSwipe=b.listHeight/b.options.touchThreshold),a.data.action){case"start":b.swipeStart(a);break;case"move":b.swipeMove(a);break;case"end":b.swipeEnd(a)}},b.prototype.swipeMove=function(a){var d,e,f,g,h,b=this;return h=void 0!==a.originalEvent?a.originalEvent.touches:null,!b.dragging||h&&1!==h.length?!1:(d=b.getLeft(b.currentSlide),b.touchObject.curX=void 0!==h?h[0].pageX:a.clientX,b.touchObject.curY=void 0!==h?h[0].pageY:a.clientY,b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curX-b.touchObject.startX,2))),b.options.verticalSwiping===!0&&(b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curY-b.touchObject.startY,2)))),e=b.swipeDirection(),"vertical"!==e?(void 0!==a.originalEvent&&b.touchObject.swipeLength>4&&a.preventDefault(),g=(b.options.rtl===!1?1:-1)*(b.touchObject.curX>b.touchObject.startX?1:-1),b.options.verticalSwiping===!0&&(g=b.touchObject.curY>b.touchObject.startY?1:-1),f=b.touchObject.swipeLength,b.touchObject.edgeHit=!1,b.options.infinite===!1&&(0===b.currentSlide&&"right"===e||b.currentSlide>=b.getDotCount()&&"left"===e)&&(f=b.touchObject.swipeLength*b.options.edgeFriction,b.touchObject.edgeHit=!0),b.options.vertical===!1?b.swipeLeft=d+f*g:b.swipeLeft=d+f*(b.$list.height()/b.listWidth)*g,b.options.verticalSwiping===!0&&(b.swipeLeft=d+f*g),b.options.fade===!0||b.options.touchMove===!1?!1:b.animating===!0?(b.swipeLeft=null,!1):void b.setCSS(b.swipeLeft)):void 0)},b.prototype.swipeStart=function(a){var c,b=this;return b.interrupted=!0,1!==b.touchObject.fingerCount||b.slideCount<=b.options.slidesToShow?(b.touchObject={},!1):(void 0!==a.originalEvent&&void 0!==a.originalEvent.touches&&(c=a.originalEvent.touches[0]),b.touchObject.startX=b.touchObject.curX=void 0!==c?c.pageX:a.clientX,b.touchObject.startY=b.touchObject.curY=void 0!==c?c.pageY:a.clientY,void(b.dragging=!0))},b.prototype.unfilterSlides=b.prototype.slickUnfilter=function(){var a=this;null!==a.$slidesCache&&(a.unload(),a.$slideTrack.children(this.options.slide).detach(),a.$slidesCache.appendTo(a.$slideTrack),a.reinit())},b.prototype.unload=function(){var b=this;a(".slick-cloned",b.$slider).remove(),b.$dots&&b.$dots.remove(),b.$prevArrow&&b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.remove(),b.$nextArrow&&b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.remove(),b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},b.prototype.unslick=function(a){var b=this;b.$slider.trigger("unslick",[b,a]),b.destroy()},b.prototype.updateArrows=function(){var b,a=this;b=Math.floor(a.options.slidesToShow/2),a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&!a.options.infinite&&(a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===a.currentSlide?(a.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-a.options.slidesToShow&&a.options.centerMode===!1?(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-1&&a.options.centerMode===!0&&(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},b.prototype.updateDots=function(){var a=this;null!==a.$dots&&(a.$dots.find("li").removeClass("slick-active").attr("aria-hidden","true"),a.$dots.find("li").eq(Math.floor(a.currentSlide/a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden","false"))},b.prototype.visibility=function(){var a=this;a.options.autoplay&&(document[a.hidden]?a.interrupted=!0:a.interrupted=!1)},a.fn.slick=function(){var f,g,a=this,c=arguments[0],d=Array.prototype.slice.call(arguments,1),e=a.length;for(f=0;e>f;f++)if("object"==typeof c||"undefined"==typeof c?a[f].slick=new b(a[f],c):g=a[f].slick[c].apply(a[f].slick,d),"undefined"!=typeof g)return g;return a}});
"3.0.4";
(function(h,k,m,q){"undefined"==typeof h.easyXDM&&function(a,b,c,d,g,f){function h(a,b){var e=typeof a[b];return"function"==e||!("object"!=e||!a[b])||"unknown"==e}function k(){if(!y(m.plugins)&&"object"==typeof m.plugins["Shockwave Flash"]){var a=m.plugins["Shockwave Flash"].description;a&&!y(m.mimeTypes)&&m.mimeTypes["application/x-shockwave-flash"]&&m.mimeTypes["application/x-shockwave-flash"].enabledPlugin&&(E=a.match(/\d+/g))}if(!E)try{var b=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");E=
	Array.prototype.slice.call(b.GetVariable("$version").match(/(\d+),(\d+),(\d+),(\d+)/),1)}catch(ja){}if(!E)return!1;a=parseInt(E[0],10);b=parseInt(E[1],10);T=9<a&&0<b;return!0}function J(){if(!F){F=!0;for(var a=0;a<O.length;a++)O[a]();O.length=0}}function n(a,b){F?a.call(b):O.push(function(){a.call(b)})}function q(){var a=parent;if(""!==K)for(var b=0,c=K.split(".");b<c.length;b++)a=a[c[b]];return a.easyXDM}function r(a){var b=a.toLowerCase().match(P);a=b[2];var e=b[3];b=b[4]||"";if("http:"==a&&":80"==
	b||"https:"==a&&":443"==b)b="";return a+"//"+e+b}function C(a){a=a.replace(ea,"$1/");if(!a.match(/^(http||https):\/\//)){var b="/"===a.substring(0,1)?"":c.pathname;"/"!==b.substring(b.length-1)&&(b=b.substring(0,b.lastIndexOf("/")+1));a=c.protocol+"//"+c.host+b+a}for(;X.test(a);)a=a.replace(X,"");return a}function z(a,b){var e="",c=a.indexOf("#");-1!==c&&(e=a.substring(c),a=a.substring(0,c));c=[];for(var d in b)b.hasOwnProperty(d)&&c.push(d+"="+f(b[d]));return a+(Y?"#":-1==a.indexOf("?")?"?":"&")+
	c.join("&")+e}function y(a){return"undefined"===typeof a}function u(a,b,c){var e;for(e in b)if(b.hasOwnProperty(e))if(e in a){var d=b[e];"object"===typeof d?u(a[e],d,c):c||(a[e]=b[e])}else a[e]=b[e];return a}function D(a){if(y(Q)){var c=b.body.appendChild(b.createElement("form")),e=c.appendChild(b.createElement("input"));e.name=x+"TEST"+Z;Q=e!==c.elements[e.name];b.body.removeChild(c)}Q?c=b.createElement('<iframe name="'+a.props.name+'"/>'):(c=b.createElement("IFRAME"),c.name=a.props.name);c.id=c.name=
	a.props.name;delete a.props.name;"string"==typeof a.container&&(a.container=b.getElementById(a.container));a.container||(u(c.style,{position:"absolute",top:"-2000px",left:"0px"}),a.container=b.body);e=a.props.src;a.props.src="javascript:false";u(c,a.props);c.border=c.frameBorder=0;c.allowTransparency=!0;a.container.appendChild(c);a.onLoad&&A(c,"load",a.onLoad);if(a.usePost){var d=a.container.appendChild(b.createElement("form"));d.target=c.name;d.action=e;d.method="POST";if("object"===typeof a.usePost)for(var f in a.usePost)if(a.usePost.hasOwnProperty(f)){if(Q)var g=
	b.createElement('<input name="'+f+'"/>');else g=b.createElement("INPUT"),g.name=f;g.value=a.usePost[f];d.appendChild(g)}d.submit();d.parentNode.removeChild(d)}else c.src=e;a.props.src=e;return c}function aa(e){var d=e.protocol;e.isHost=e.isHost||y(w.xdm_p);Y=e.hash||!1;e.props||(e.props={});if(e.isHost)e.remote=C(e.remote),e.channel=e.channel||"default"+Z++,e.secret=Math.random().toString(16).substring(2),y(d)&&(d=r(c.href)==r(e.remote)?"4":h(a,"postMessage")||h(b,"postMessage")?"1":e.swf&&h(a,"ActiveXObject")&&
k()?"6":"Gecko"===m.product&&"frameElement"in a&&-1==m.userAgent.indexOf("WebKit")?"5":e.remoteHelper?"2":"0");else{e.channel=w.xdm_c.replace(/["'<>\\]/g,"");e.secret=w.xdm_s;e.remote=w.xdm_e.replace(/["'<>\\]/g,"");d=w.xdm_p;var f;if(f=e.acl){a:{f=e.acl;var g=e.remote;"string"==typeof f&&(f=[f]);for(var H,G=f.length;G--;)if(H=f[G],H=new RegExp("^"==H.substr(0,1)?H:"^"+H.replace(/(\*)/g,".$1").replace(/\?/g,".")+"$"),H.test(g)){f=!0;break a}f=!1}f=!f}if(f)throw Error("Access denied for "+e.remote);
}e.protocol=d;switch(d){case "0":u(e,{interval:100,delay:2E3,useResize:!0,useParent:!1,usePolling:!1},!0);if(e.isHost){if(!e.local){d=c.protocol+"//"+c.host;var p=b.body.getElementsByTagName("img");for(g=p.length;g--;)if(f=p[g],f.src.substring(0,d.length)===d){e.local=f.src;break}e.local||(e.local=a)}d={xdm_c:e.channel,xdm_p:0};e.local===a?(e.usePolling=!0,e.useParent=!0,e.local=c.protocol+"//"+c.host+c.pathname+c.search,d.xdm_e=e.local,d.xdm_pa=1):d.xdm_e=C(e.local);e.container&&(e.useResize=!1,
	d.xdm_po=1);e.remote=z(e.remote,d)}else u(e,{channel:w.xdm_c,remote:w.xdm_e,useParent:!y(w.xdm_pa),usePolling:!y(w.xdm_po),useResize:e.useParent?!1:e.useResize});p=[new l.stack.HashTransport(e),new l.stack.ReliableBehavior({}),new l.stack.QueueBehavior({encode:!0,maxLength:4E3-e.remote.length}),new l.stack.VerifyBehavior({initiate:e.isHost})];break;case "1":p=[new l.stack.PostMessageTransport(e)];break;case "2":e.isHost&&(e.remoteHelper=C(e.remoteHelper));p=[new l.stack.NameTransport(e),new l.stack.QueueBehavior,
	new l.stack.VerifyBehavior({initiate:e.isHost})];break;case "3":p=[new l.stack.NixTransport(e)];break;case "4":p=[new l.stack.SameOriginTransport(e)];break;case "5":p=[new l.stack.FrameElementTransport(e)];break;case "6":E||k(),p=[new l.stack.FlashTransport(e)]}p.push(new l.stack.QueueBehavior({lazy:e.lazy,remove:!0}));return p}function ba(a){for(var b,c={incoming:function(a,b){this.up.incoming(a,b)},outgoing:function(a,b){this.down.outgoing(a,b)},callback:function(a){this.up.callback(a)},init:function(){this.down.init()},
	destroy:function(){this.down.destroy()}},e=0,d=a.length;e<d;e++)b=a[e],u(b,c,!0),0!==e&&(b.down=a[e-1]),e!==d-1&&(b.up=a[e+1]);return b}function fa(a){a.up.down=a.down;a.down.up=a.up;a.up=a.down=null}var R=this,Z=Math.floor(1E4*Math.random()),U=Function.prototype,P=/^((http.?:)\/\/([^:\/\s]+)(:\d+)*)/,X=/[\-\w]+\/\.\.\//,ea=/([^:])\/\//g,K="",l={},ha=a.easyXDM,x="easyXDM_",Q,Y=!1,E,T;if(h(a,"addEventListener")){var A=function(a,b,c){a.addEventListener(b,c,!1)};var L=function(a,b,c){a.removeEventListener(b,
	c,!1)}}else if(h(a,"attachEvent"))A=function(a,b,c){a.attachEvent("on"+b,c)},L=function(a,b,c){a.detachEvent("on"+b,c)};else throw Error("Browser not supported");var F=!1,O=[];if("readyState"in b){var V=b.readyState;F="complete"==V||~m.userAgent.indexOf("AppleWebKit/")&&("loaded"==V||"interactive"==V)}else F=!!b.body;if(!F){if(h(a,"addEventListener"))A(b,"DOMContentLoaded",J);else if(A(b,"readystatechange",function(){"complete"==b.readyState&&J()}),b.documentElement.doScroll&&a===top){var ca=function(){if(!F){try{b.documentElement.doScroll("left")}catch(e){d(ca,
	1);return}J()}};ca()}A(a,"load",J)}var w=function(a){a=a.substring(1).split("&");for(var b={},c,e=a.length;e--;)c=a[e].split("="),b[c[0]]=g(c[1]);return b}(/xdm_e=/.test(c.search)?c.search:c.hash),W=function(){var a={},b={a:[1,2,3]};if("undefined"!=typeof JSON&&"function"===typeof JSON.stringify&&'{"a":[1,2,3]}'===JSON.stringify(b).replace(/\s/g,""))return JSON;Object.toJSON&&'{"a":[1,2,3]}'===Object.toJSON(b).replace(/\s/g,"")&&(a.stringify=Object.toJSON);"function"===typeof String.prototype.evalJSON&&
(b='{"a":[1,2,3]}'.evalJSON(),b.a&&3===b.a.length&&3===b.a[2]&&(a.parse=function(a){return a.evalJSON()}));return a.stringify&&a.parse?(W=function(){return a},a):null};u(l,{version:"2.4.19.0",query:w,stack:{},apply:u,getJSONObject:W,whenReady:n,noConflict:function(b){a.easyXDM=ha;(K=b)&&(x="easyXDM_"+K.replace(".","_")+"_");return l}});l.DomHelper={on:A,un:L,requiresJSON:function(c){"object"==typeof a.JSON&&a.JSON||b.write('<script type="text/javascript" src="'+c+'">\x3c/script>')}};(function(){var a=
	{};l.Fn={set:function(b,c){a[b]=c},get:function(b,c){if(a.hasOwnProperty(b)){var e=a[b];c&&delete a[b];return e}}}})();l.Socket=function(a){var b=ba(aa(a).concat([{incoming:function(b,c){a.onMessage(b,c)},callback:function(b){if(a.onReady)a.onReady(b)}}])),c=r(a.remote);this.origin=r(a.remote);this.destroy=function(){b.destroy()};this.postMessage=function(a){b.outgoing(a,c)};b.init()};l.Rpc=function(a,b){if(b.local)for(var c in b.local)if(b.local.hasOwnProperty(c)){var e=b.local[c];"function"===typeof e&&
(b.local[c]={method:e})}var d=ba(aa(a).concat([new l.stack.RpcBehavior(this,b),{callback:function(b){if(a.onReady)a.onReady(b)}}]));this.origin=r(a.remote);this.destroy=function(){d.destroy()};d.init()};l.stack.SameOriginTransport=function(a){var b,e,f,g;return b={outgoing:function(a,b,c){f(a);c&&c()},destroy:function(){e&&(e.parentNode.removeChild(e),e=null)},onDOMReady:function(){g=r(a.remote);a.isHost?(u(a.props,{src:z(a.remote,{xdm_e:c.protocol+"//"+c.host+c.pathname,xdm_c:a.channel,xdm_p:4}),
		name:x+a.channel+"_provider"}),e=D(a),l.Fn.set(a.channel,function(a){f=a;d(function(){b.up.callback(!0)},0);return function(a){b.up.incoming(a,g)}})):(f=q().Fn.get(a.channel)(function(a){b.up.incoming(a,g)}),d(function(){b.up.callback(!0)},0))},init:function(){n(b.onDOMReady,b)}}};l.stack.FlashTransport=function(a){function e(a,b){d(function(){h.up.incoming(a,G)},0)}function g(c){var d=a.swf+"?host="+a.isHost,e="easyXDM_swf_"+Math.floor(1E4*Math.random());l.Fn.set("flash_loaded"+c.replace(/[\-.]/g,
	"_"),function(){l.stack.FlashTransport[c].swf=p=I.firstChild;for(var a=l.stack.FlashTransport[c].queue,b=0;b<a.length;b++)a[b]();a.length=0});a.swfContainer?I="string"==typeof a.swfContainer?b.getElementById(a.swfContainer):a.swfContainer:(I=b.createElement("div"),u(I.style,T&&a.swfNoThrottle?{height:"20px",width:"20px",position:"fixed",right:0,top:0}:{height:"1px",width:"1px",position:"absolute",overflow:"hidden",right:0,top:0}),b.body.appendChild(I));var g="callback=flash_loaded"+f(c.replace(/[\-.]/g,
	"_"))+"&proto="+R.location.protocol+"&domain="+f(R.location.href.match(P)[3])+"&port="+f(R.location.href.match(P)[4]||"")+"&ns="+f(K);I.innerHTML="<object height='20' width='20' type='application/x-shockwave-flash' id='"+e+"' data='"+d+"'><param name='allowScriptAccess' value='always'></param><param name='wmode' value='transparent'><param name='movie' value='"+d+"'></param><param name='flashvars' value='"+g+"'></param><embed type='application/x-shockwave-flash' FlashVars='"+g+"' allowScriptAccess='always' wmode='transparent' src='"+
	d+"' height='1' width='1'></embed></object>"}var h,k,G,p,I;return h={outgoing:function(b,c,d){p.postMessage(a.channel,b.toString());d&&d()},destroy:function(){try{p.destroyChannel(a.channel)}catch(ka){}p=null;k&&(k.parentNode.removeChild(k),k=null)},onDOMReady:function(){G=a.remote;l.Fn.set("flash_"+a.channel+"_init",function(){d(function(){h.up.callback(!0)})});l.Fn.set("flash_"+a.channel+"_onMessage",e);a.swf=C(a.swf);var b=a.swf.match(P)[3],f=function(){l.stack.FlashTransport[b].init=!0;p=l.stack.FlashTransport[b].swf;
		p.createChannel(a.channel,a.secret,r(a.remote),a.isHost);a.isHost&&(T&&a.swfNoThrottle&&u(a.props,{position:"fixed",right:0,top:0,height:"20px",width:"20px"}),u(a.props,{src:z(a.remote,{xdm_e:r(c.href),xdm_c:a.channel,xdm_p:6,xdm_s:a.secret}),name:x+a.channel+"_provider"}),k=D(a))};l.stack.FlashTransport[b]&&l.stack.FlashTransport[b].init?f():l.stack.FlashTransport[b]?l.stack.FlashTransport[b].queue.push(f):(l.stack.FlashTransport[b]={queue:[f]},g(b))},init:function(){n(h.onDOMReady,h)}}};l.stack.PostMessageTransport=
	function(b){function e(a){if(a.origin)var d=r(a.origin);else if(a.uri)d=r(a.uri);else if(a.domain)d=c.protocol+"//"+a.domain;else throw"Unable to retrieve the origin of the event";d==k&&a.data&&a.data.substring&&a.data.substring(0,b.channel.length+1)==b.channel+" "&&f.up.incoming(a.data.substring(b.channel.length+1),d)}var f,g,h,k;return f={outgoing:function(a,c,d){h.postMessage(b.channel+" "+a,c||k);d&&d()},destroy:function(){L(a,"message",e);g&&(h=null,g.parentNode.removeChild(g),g=null)},onDOMReady:function(){k=
			r(b.remote);if(b.isHost){var p=function(c){c.data==b.channel+"-ready"&&(h="postMessage"in g.contentWindow?g.contentWindow:g.contentWindow.document,L(a,"message",p),A(a,"message",e),d(function(){f.up.callback(!0)},0))};A(a,"message",p);u(b.props,{src:z(b.remote,{xdm_e:r(c.href),xdm_c:b.channel,xdm_p:1}),name:x+b.channel+"_provider"});g=D(b)}else A(a,"message",e),h="postMessage"in a.parent?a.parent:a.parent.document,h.postMessage(b.channel+"-ready",k),d(function(){f.up.callback(!0)},0)},init:function(){n(f.onDOMReady,
			f)}}};l.stack.FrameElementTransport=function(e){var f,g,h,k;return f={outgoing:function(a,b,c){h.call(this,a);c&&c()},destroy:function(){g&&(g.parentNode.removeChild(g),g=null)},onDOMReady:function(){k=r(e.remote);e.isHost?(u(e.props,{src:z(e.remote,{xdm_e:r(c.href),xdm_c:e.channel,xdm_p:5}),name:x+e.channel+"_provider"}),g=D(e),g.fn=function(a){delete g.fn;h=a;d(function(){f.up.callback(!0)},0);return function(a){f.up.incoming(a,k)}}):(b.referrer&&r(b.referrer)!=w.xdm_e&&(a.top.location=w.xdm_e),
		h=a.frameElement.fn(function(a){f.up.incoming(a,k)}),f.up.callback(!0))},init:function(){n(f.onDOMReady,f)}}};l.stack.NameTransport=function(a){function b(b){k.contentWindow.sendMessage(b,a.remoteHelper+(h?"#_3":"#_2")+a.channel)}function c(){h?2!==++v&&h||g.up.callback(!0):(b("ready"),g.up.callback(!0))}function f(a){g.up.incoming(a,M)}function e(){B&&d(function(){B(!0)},0)}var g,h,k,t,v,B,M,da;return g={outgoing:function(a,c,d){B=d;b(a)},destroy:function(){k.parentNode.removeChild(k);k=null;h&&
	(t.parentNode.removeChild(t),t=null)},onDOMReady:function(){h=a.isHost;v=0;M=r(a.remote);a.local=C(a.local);h?(l.Fn.set(a.channel,function(b){h&&"ready"===b&&(l.Fn.set(a.channel,f),c())}),da=z(a.remote,{xdm_e:a.local,xdm_c:a.channel,xdm_p:2}),u(a.props,{src:da+"#"+a.channel,name:x+a.channel+"_provider"}),t=D(a)):(a.remoteHelper=a.remote,l.Fn.set(a.channel,f));var b=function(){var f=k||this;L(f,"load",b);l.Fn.set(a.channel+"_load",e);(function S(){"function"==typeof f.contentWindow.sendMessage?c():
		d(S,50)})()};k=D({props:{src:a.local+"#_4"+a.channel},onLoad:b})},init:function(){n(g.onDOMReady,g)}}};l.stack.HashTransport=function(b){function c(){if(t){var a=t.location.href,b="",c=a.indexOf("#");-1!=c&&(b=a.substring(c));b&&b!=k&&(k=b,f.up.incoming(k.substring(k.indexOf("_")+1),M))}}var f,e,g,h,k,l,t,v,B,M;return f={outgoing:function(a,c){if(v){var d=b.remote+"#"+l++ +"_"+a;(e||!B?v.contentWindow:v).location=d}},destroy:function(){a.clearInterval(g);!e&&B||v.parentNode.removeChild(v);v=null},
	onDOMReady:function(){e=b.isHost;h=b.interval;k="#"+b.channel;l=0;B=b.useParent;M=r(b.remote);if(e){u(b.props,{src:b.remote,name:x+b.channel+"_provider"});if(B)b.onLoad=function(){t=a;g=setInterval(c,h);f.up.callback(!0)};else{var p=0,G=b.delay/50;(function ia(){if(++p>G)throw Error("Unable to reference listenerwindow");try{t=v.contentWindow.frames[x+b.channel+"_consumer"]}catch(S){}t?(g=setInterval(c,h),f.up.callback(!0)):d(ia,50)})()}v=D(b)}else t=a,g=setInterval(c,h),B?(v=parent,f.up.callback(!0)):
		(u(b,{props:{src:b.remote+"#"+b.channel+new Date,name:x+b.channel+"_consumer"},onLoad:function(){f.up.callback(!0)}}),v=D(b))},init:function(){n(f.onDOMReady,f)}}};l.stack.ReliableBehavior=function(a){var b,c,d=0,f=0,e="";return b={incoming:function(a,g){var h=a.indexOf("_"),k=a.substring(0,h).split(",");a=a.substring(h+1);k[0]==d&&(e="",c&&c(!0));0<a.length&&(b.down.outgoing(k[1]+","+d+"_"+e,g),f!=k[1]&&(f=k[1],b.up.incoming(a,g)))},outgoing:function(a,g,h){e=a;c=h;b.down.outgoing(f+","+ ++d+"_"+
		a,g)}}};l.stack.QueueBehavior=function(a){function b(){if(a.remove&&0===e.length)fa(c);else if(!h&&0!==e.length&&!l){h=!0;var f=e.shift();c.down.outgoing(f.data,f.origin,function(a){h=!1;f.callback&&d(function(){f.callback(a)},0);b()})}}var c,e=[],h=!0,k="",l,t=0,n=!1,v=!1;return c={init:function(){y(a)&&(a={});a.maxLength&&(t=a.maxLength,v=!0);a.lazy?n=!0:c.down.init()},callback:function(a){h=!1;var d=c.up;b();d.callback(a)},incoming:function(b,d){if(v){var f=b.indexOf("_"),e=parseInt(b.substring(0,
		f),10);k+=b.substring(f+1);0===e&&(a.encode&&(k=g(k)),c.up.incoming(k,d),k="")}else c.up.incoming(b,d)},outgoing:function(d,g,h){a.encode&&(d=f(d));var k=[];if(v){for(;0!==d.length;){var l=d.substring(0,t);d=d.substring(l.length);k.push(l)}for(;l=k.shift();)e.push({data:k.length+"_"+l,origin:g,callback:0===k.length?h:null})}else e.push({data:d,origin:g,callback:h});n?c.down.init():b()},destroy:function(){l=!0;c.down.destroy()}}};l.stack.VerifyBehavior=function(a){function b(){d=Math.random().toString(16).substring(2);
	c.down.outgoing(d)}var c,d,f;return c={incoming:function(e,g){var h=e.indexOf("_");-1===h?e===d?c.up.callback(!0):f||(f=e,a.initiate||b(),c.down.outgoing(e)):e.substring(0,h)===f&&c.up.incoming(e.substring(h+1),g)},outgoing:function(a,b,f){c.down.outgoing(d+"_"+a,b,f)},callback:function(c){a.initiate&&b()}}};l.stack.RpcBehavior=function(a,b){function c(a){a.jsonrpc="2.0";e.down.outgoing(g.stringify(a))}function d(a,b){var d=Array.prototype.slice;return function(){var f=arguments.length,e={method:b};
	if(0<f&&"function"===typeof arguments[f-1]){if(1<f&&"function"===typeof arguments[f-2]){var g={success:arguments[f-2],error:arguments[f-1]};e.params=d.call(arguments,0,f-2)}else g={success:arguments[f-1]},e.params=d.call(arguments,0,f-1);k[""+ ++h]=g;e.id=h}else e.params=d.call(arguments,0);a.namedParams&&1===e.params.length&&(e.params=e.params[0]);c(e)}}function f(a,b,d,f){if(d){if(b){var e=function(a){e=U;c({id:b,result:a})};var g=function(a,d){g=U;var f={id:b,error:{code:-32099,message:a}};d&&
(f.error.data=d);c(f)}}else e=g=U;"[object Array]"!==Object.prototype.toString.call(f)&&(f=[f]);try{var h=d.method.apply(d.scope,f.concat([e,g]));y(h)||e(h)}catch(S){g(S.message)}}else b&&c({id:b,error:{code:-32601,message:"Procedure not found."}})}var e,g=b.serializer||W(),h=0,k={};return e={incoming:function(a,d){var e=g.parse(a);if(e.method)b.handle?b.handle(e,c):f(e.method,e.id,b.local[e.method],e.params);else{var h=k[e.id];e.error?h.error&&h.error(e.error):h.success&&h.success(e.result);delete k[e.id]}},
	init:function(){if(b.remote)for(var c in b.remote)b.remote.hasOwnProperty(c)&&(a[c]=d(b.remote[c],c));e.down.init()},destroy:function(){for(var c in b.remote)b.remote.hasOwnProperty(c)&&a.hasOwnProperty(c)&&delete a[c];e.down.destroy()}}};R.easyXDM=l}(h,k,location,h.setTimeout,decodeURIComponent,encodeURIComponent);"undefined"!=typeof h.uLogin&&h.uLogin.uLoginHost||(Array.prototype.indexOf||(Array.prototype.indexOf=function(a){try{for(var b=0;b<this.length;b++)if(this[b]==a)return b}catch(c){}return-1}),
String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")}),"undefined"===typeof h.console&&(h.console={log:function(){},error:function(){},info:function(){},assert:function(){}}),h.uLogin={uLoginHost:function(a){var b;for(b in a)if(b in a&&a[b].src&&/^https?:\/\/(.*?)\/js\/ulogin\.js/.test(a[b].src)){var c=a[b].src.match(/^https?:\/\/([^/]+)/)[1].replace(/^www\./,"");break}return"u-login.com"===c?"u-login.com":"ulogin.ru"}(k.getElementsByTagName("script"))},h.uLogin=
	{version:"3",protocol:location.href.match(/^https/i)?"https":"http",host:encodeURIComponent(location.host),uLoginHost:uLogin.uLoginHost,supportStorage:!!("localStorage"in window&&null!==window.localStorage&&"JSON"in window&&null!==window.JSON&&"undefined"!==typeof window.JSON.parse&&"undefined"!==typeof window.JSON.stringify),supportHistory:!(!window.history||!history.pushState),ids:[],timeouts:{},listeners:{},lang:(m.language||m.systemLanguage||m.userLanguage||"en").substr(0,2).toLowerCase(),langs:"en ru uk fr de uz".split(" "),
		dialog:!1,close:!1,lightbox:!1,dialogSocket:!1,pixel:!1,providerCodes:"vkontakte odnoklassniki mailru facebook twitter google yandex livejournal openid flickr lastfm linkedin liveid soundcloud steam webmoney youtube foursquare tumblr googleplus instagram wargaming".split(" "),providerNames:"VK Odnoklassniki Mail.ru Facebook Twitter Google Yandex LiveJournal OpenID Flickr Last.FM LinkedIn LiveID SoundCloud Steam WebMoney YouTube foursquare tumblr Google+ Instagram Wargaming.net".split(" "),states:["ready",
			"open","receive","close","fill"],themes:["classic","flat"],widgetSettings:{},findTimer:0,waitGetWidget:{},altwayCalled:[],rc:!1,page:null,altway:function(a){a=a.toLowerCase();return!!/iPhone|iPad/i.test(a)}(m.userAgent||m.vendor||h.opera),m:!!/(ip(ad|od|hone)|android)/i.test(m.userAgent||m.vendor||h.opera),mobile:function(a){if(/_utl_t=vk/.test(location.href)||/_utl_t=vk/.test(document.referrer))return!1;a=a.toLowerCase();return!!/(ip(ad|od|hone)|android)/i.test(a)}(m.userAgent||m.vendor||h.opera),
		openFromSocket:!1,ppi:null,authSocket:!1,availableParams:{id:1,redirect_uri:1,page:1,callback:1,fields:1,force_fields:1,popup_css:1,optional:1,protocol:1,host:1,lang:1,verify:1,sort:1,othprov:1,providers:1,altway:1,m:1,icons_32:1,icons_16:1},cancelClick:!1,postMessageIsAvailable:"undefined"!==typeof h.postMessage,init:function(a){if(k.body){this.mobile&&(this.altway=!0);this.page=encodeURIComponent(location.href);this.openFromSocket&&(this.authSocket=this.initSocket(this.buildUrl("/version/3.0/html/buttons_receiver.html",
			{four:"",r:parseInt(1E5*Math.random())}),this.getRC(),{background:"transparent"}));""==a&&(a=k.getElementsByTagName("script"),a=a[a.length-1].src,-1==a.indexOf("?")&&(a+="?"),a=a.substr(a.indexOf("?")+1));if(""!=a){var b=this.parse(a);b.version&&(this.version=b.version);if(b.display){var c=b.id||"uLogin";if(this.get(c)){a=!0;for(var d=0;d<this.ids.length;d++)c==this.ids[d].id&&(a=!1);a&&this.setProp(b.id||"uLogin",this.ids.length,b)}else q('uLogin.init("'+a+'")',1E3)}}this.add(k.body,"touchmove",
			this.touchMove);uLogin.timeouts.search_all=q(function f(){uLogin.findWidgets();if("complete"===k.readyState&&(0===uLogin.findTimer&&(uLogin.findTimer=+new Date),1E4<new Date-uLogin.findTimer))return!1;uLogin.timeouts.all=q(f,50)},50);this.findWidgets();uLogin.timeouts.search_ulogin=q(function t(){uLogin.checkAsyncWidgets();uLogin.timeouts.search_ulogin=q(t,50)},50);this.checkAsyncWidgets();uLogin.timeouts.check_widgets=q(function N(){uLogin.checkCurrentWidgets();uLogin.timeouts.check_widgets=q(N,
			300)},30);this.checkCurrentWidgets();this.sendPixel();setTimeout(function(){try{var a=document.createElement("script");a.type="text/javascript";a.src="//sonar.semantiqo.com/c83ul/checking.js";document.getElementsByTagName("head")[0].appendChild(a);document.getElementsByTagName("head")[0].removeChild(a)}catch(J){}},5);uLogin.postMessageIsAvailable&&(window.addEventListener?window.addEventListener("message",uLogin.onMessage):window.attachEvent("onmessage",uLogin.onMessage))}else q(function(){uLogin.init()},
			20);this.callbackReceived()},onMessage:function(a){a.origin=="https://"+uLogin.uLoginHost&&a.data&&a.data.mine&&a.data.func&&("object"===typeof a.data.func&&(a.data.func=a.data.func[0]),"to_window"===a.data.func?(src=uLogin.buildUrl(a.data.args[2],{fields:a.data.args[0],filled:a.data.args[1],set:encodeURIComponent("{window:1}")}),console.log(src),uLogin.loadWindow(src)):h[a.data.func]&&h[a.data.func].apply(uLogin,a.data.args||[]))},get:function(a){return k.getElementById(a)},exists:function(a){return"undefined"!=
			typeof a},add:function(a,b,c){a.addEventListener?a.addEventListener(b,function(d){"click"===b&&uLogin.cancelClick||c(a,d)},!1):a.attachEvent?a.attachEvent("on"+b,function(d){"click"===b&&uLogin.cancelClick||c(a,d)}):a["on"+b]=function(d){"click"===b&&uLogin.cancelClick||c(a,d)};"click"===b&&(this.add(a,"touchstart",this.touchStart),this.add(a,"touchend",function(a,b){return function(c,d){uLogin.cancelClick||(uLogin.cancelClick=!0,b.call(this,a,d))}}(a,c)))},touchStart:function(){uLogin.cancelClick=
			!1},touchMove:function(){uLogin.cancelClick=!0},is_encoded:function(a){return decodeURIComponent(a)!=a},genID:function(){for(var a=new Date,b=a.getTime()+Math.floor(1E5*Math.random());this.get("ul_"+b);)b=a.getTime()+Math.floor(1E5*Math.random());return"ul_"+b},show:function(a){this.exists(a)&&(a.style.display="block")},hide:function(a){a&&this.exists(a)&&(a.style.display="none")},parse:function(a){var b={};if(!a)return b;if("object"===typeof a)return a;var c=a.split("&");c=1<c.length?c:a.split(";");
			for(a=0;a<c.length;a++){var d=c[a].split("=");d[0]&&(d[0]=d[0].trim());d[1]&&(d[1]=d[1].trim());b[d[0]]=d[1]}return b},scrollTop:function(){return h.pageYOffset||k.documentElement.scrollTop||k.body.scrollTop},scrollLeft:function(){return h.pageXOffset||k.documentElement.scrollLeft||k.body.scrollLeft},dialogHeight:function(){return 358},dialogWidth:function(){return 564},clientWidth:function(){var a=0;"[object Opera]"==Object.prototype.toString.call(h.opera)&&9.5>h.parseFloat(h.opera.version())?a=
			k.body.clientWidth:h.innerWidth&&(a=h.innerWidth);this.isIE()&&(a=k.documentElement.clientWidth);return a},clientHeight:function(){var a=0;"[object Opera]"==Object.prototype.toString.call(h.opera)&&9.5>h.parseFloat(h.opera.version())?a=k.body.clientHeight:h.innerHeight&&(a=h.innerHeight);this.isIE()&&(a=k.documentElement.clientHeight);return a},isIE:function(){if(/MSIE (\d+\.\d+);/.test(m.userAgent)){var a=Number(RegExp.$1);if(9>a)return a}return!1},getPPI:function(){if(null===this.ppi)try{var a=
			window.devicePixelRatio||1,b=document.getElementsByTagName("body")[0],c=document.createElement("div");c.style="height: 1in; left: -100%; position: absolute; top: -100%; width: 1in;";b.appendChild(c);var d=c.offsetWidth*a;b.removeChild(c);this.ppi=d}catch(g){this.ppi=96}return this.ppi},inArray:function(a,b){if(!a||!b)return!1;for(var c=0,d=b.length;c<d;c++)if(a==b[c])return c;return-1},findWidgets:function(){for(var a=0,b=[],c=[],d=k.getElementsByTagName("div"),g=k.getElementsByTagName("a");g[a];)g[a]&&
		(b[a]=g[a]),a++;for(a=0;d[a];)d[a]&&(c[a]=d[a]),a++;for(a=0;c[a]||b[a];)c[a]&&this.addWidget(c[a]),b[a]&&this.addWidget(b[a]),a++},addWidget:function(a,b){var c=a.id,d=a.getAttribute("data-uloginid"),g={},f=!1;"undefined"!==typeof h.uLoginParams&&(h.uLoginParams[c]?g=h.uLoginParams[c]:h.uLoginParams[d]?g=h.uLoginParams[d]:0<this.arrayIntersectKey(h.uLoginParams,this.availableParams).length&&(g=h.uLoginParams,f=!0));b&&(g=this.extend(g,b));var k=a.getAttribute("data-ulogin")||a.getAttribute("x-ulogin-params");
			f=null!==k||!f&&0<this.arrayIntersectKey(g,this.availableParams).length;b=this.extend(this.parse(k),g);!d&&!f||c||(c=this.genID(),a.setAttribute("id",c));d?this.getWidget(d,c):f&&this.setProp(c,this.ids.length,b)},inited:function(a){for(var b=0;b<this.ids.length;b++)if(a==this.ids[b].id)return!0;return!1},initWidget:function(a){if(a){var b=this.get(a);if(b&&(b=b.getAttribute("data-ulogin")||b.getAttribute("x-ulogin-params"))&&!this.inited(a)){b=this.parse(b);var c=this.getWidgetNumber(a);isNaN(c)?
			c=this.ids.length:this.ids[c]={};this.setProp(a,c,b)}}},setProp:function(a,b,c){if(this.waitGetWidget[a]||this.inited(a))return!1;this.ids[b]={id:a,dropTimer:!1,initCheck:!1,type:c.display||"",providers:c.providers||"",hidden:c.hidden||"",redirect_uri:c.redirect_uri||"",page:this.page,callback:c.callback||"",fields:c.fields||"first_name,last_name,email",force_fields:c.force_fields||"",popup_css:c.popup_css||"",optional:c.optional||"",color:c.color||"fff",opacity:c.opacity||"75",verify:c.verify||"",
			m:"undefined"!==typeof c.m?c.m:this.m,lang:c.lang||this.lang,altway:"undefined"!==typeof c.altway?parseInt(c.altway):this.altway,sort:"default"===c.sort?"default":"relevant",state:"",hidden_button:c.hidden_button||"inset",dropdown_container:c.dropdown_container||"body",icons_32:c.icons_32||"",icons_16:c.icons_16||"",theme:c.theme||"classic",client:c.client||"",event:c.event||"click"};-1==this.inArray(this.ids[b].theme,this.themes)&&(this.ids[b].theme=this.themes[0]);this.ids[b].providers||this.ids[b].other||
		(this.ids[b].hidden="other");"small"!==this.ids[b].type&&"panel"!==this.ids[b].type||this.sendStats({type:this.ids[b].type});"window"==this.ids[b].type&&!this.ids[b].providers&&this.ids[b].hidden&&(this.ids[b].providers=this.providerCodes.join(","));this.ids[b].mobile=0==c.mobilebuttons?0:this.mobile;this.ids[b].altway&&!this.ids[b].redirect_uri&&(this.ids[b].redirect_uri=location.href);this.ids[b].callback&&!this.ids[b].altway&&(this.ids[b].redirect_uri="");this.ids[b].redirect_uri=this.clearRedirectUri(this.ids[b].redirect_uri);
			-1==this.inArray(this.ids[b].lang,this.langs)&&(this.ids[b].lang=this.lang);this.ids[b].icons_32=this.fixSiteLink(this.ids[b].icons_32);this.ids[b].icons_16=this.fixSiteLink(this.ids[b].icons_16);switch(c.display){case "small":case "panel":this.ids[b].listener_id=!1;this.initPanel(b);break;case "window":this.initWindow(b);break;case "buttons":this.initButtons(b);break;default:this.ids.splice(b,b)}this.get(a).setAttribute("data-ulogin-inited",(+new Date).toString())},fixSiteLink:function(a){a&&(/^https?:\/\/(.*?)/.test(a)||
		(/^\//.test(a)||(a="/"+a),a=location.origin+a),(new RegExp("^"+location.origin)).test(a)||(a="",console.error("uLogin ERROR: resource link is invalid, not match with location.origin")),a&&(a=this.is_encoded(a)?a.replace(/\//g,"%2F").replace(/\?/g,"%3F"):encodeURIComponent(a)));return a},clearRedirectUri:function(a){if(!a)return a;a=a.replace(/ulogin_callback=([^&?]*?)#/,"#").replace(/ulogin_callback=(.*?)(&|$)/,"").replace(/ulogin_token=([^&?]*?)#/,"#").replace(/ulogin_token=(.*?)(&|$)/,"").replace(/(\?|&)#/,
			"#").replace(/(\?|&)$/,"");return a=this.is_encoded(a)?a.replace(/\//g,"%2F").replace(/\?/g,"%3F"):encodeURIComponent(a)},initPanel:function(a){var b=this.get(this.ids[a].id),c="small"==this.ids[a].type?1:0,d=c?21:42,g=c?16:32,f=0,h=c?5:10,N=c?"16px":"32px",m="",n="";this.ids[a].icons_16&&c?m=decodeURIComponent(this.ids[a].icons_16):this.ids[a].icons_32&&!c?m=decodeURIComponent(this.ids[a].icons_32):(n=120<this.getPPI()?c?32:64:c?16:32,m="providers-{size}-{theme}.png?version=img.3.0.1".replace("{size}",
			n).replace("{theme}",this.ids[a].theme),m=this.buildUrl("version/3.0/img/"+m),n="smiles-{size}.png?version=img.3.0.1".replace("{size}",n).replace("{theme}",this.ids[a].theme),n=this.buildUrl("img/"+n),this.ids[a].hovered_sprite=n);m="url("+m+") "+(c?"0 -1px":"0 -2px")+" no-repeat";b.innerHTML="";if("other"===this.ids[a].hidden){var q=this.providerCodes.slice(0);if(this.ids[a].providers){n=this.ids[a].providers.split(",");for(var r=0;r<n.length;r++){var C=this.inArray(n[r],q);-1!==C&&q.splice(C,1)}}this.ids[a].hidden=
			q.toString()}if(this.ids[a].providers){n="relevant"===this.ids[a].sort?this.relProviders(this.ids[a].providers,this.ids[a].hidden,1):this.ids[a].providers.split(",");var z;f+=d*("inset"===this.ids[a].hidden_button&&0<this.ids[a].hidden.length?n.length+1:n.length);d=k.createElement("div");this.ids[a].buttonsContainer=d;this.ids[a].buttonsContainer.className="ulogin-buttons-container";this.resetStyle(d,{width:f,maxWidth:"100%",minHeight:g,verticalAlign:"top",display:"inline-block",lineHeight:0});b.appendChild(d);
			for(z in n)f=n[z],q=this.inArray(f,this.providerCodes),-1<q&&(d=k.createElement("div"),d.className="ulogin-button-"+f,d.setAttribute("data-uloginbutton",f),d.setAttribute("role","button"),d.setAttribute("title",this.providerNames[q]),this.resetStyle(d,{"float":"left",width:g,height:g,margin:"0 "+h+"px "+h+"px 0",background:m,cursor:"pointer",backgroundPosition:this.getIconPosition(c,q),backgroundSize:N}),this.ids[a].buttonsContainer.appendChild(d))}this.ids[a].hidden&&(b.style.position="relative",
		"relevant"===this.ids[a].sort&&(this.ids[a].hidden=this.relProviders(this.ids[a].providers,this.ids[a].hidden,2).join(",")),this.ids[a].drop=k.createElement("div"),this.ids[a].drop.className="ulogin-dropdown-button",this.resetStyle(this.ids[a].drop,{width:g,height:g,margin:"0 "+h+"px "+h+"px 0",cursor:"pointer",background:m,verticalAlign:"baseline",display:"inline-block","float":"none",backgroundSize:N}),this.ids[a].mobile||(this.add(this.ids[a].drop,"mouseover",function(b){uLogin.ids[a].showed=!1;
			uLogin.dropdownDelayed(a,c?1:2);uLogin.setOpacity(b,uLogin.ids[a].opacity)}),this.add(this.ids[a].drop,"mouseout",function(b){uLogin.ids[a].showed=!0;uLogin.dropdownDelayed(a,0);uLogin.setOpacity(b)}),this.add(this.ids[a].drop,"click",function(){uLogin.dropdown(a,c?1:2)})),"inset"===this.ids[a].hidden_button&&this.ids[a].buttonsContainer?this.ids[a].buttonsContainer.appendChild(this.ids[a].drop):b.appendChild(this.ids[a].drop),this.ids[a].mobile||this.initDrop(a));this.ids[a].buttonsContainer&&0<
		this.ids[a].buttonsContainer.clientHeight&&(this.ids[a].buttonsContainer.style.height=this.ids[a].buttonsContainer.clientHeight-h+"px");window.bc=this.ids[a].buttonsContainer;this.initButtons(a)},initWindow:function(a){var b=this.get(this.ids[a].id),c=b.getElementsByTagName("*");c.length?b=c[0]:b.innerHTML?(c=document.createElement("span"),c.innerHTML=b.innerHTML,b.innerHTML="",b=b.appendChild(c)):(c=k.createElement("img"),c.setAttribute("src",this.buildUrl("img/button.png?version=img.3.0.1")),c.setAttribute("style",
			"cursor:pointer; width:187px; height:30px"),c.setAttribute("alt","\u041c\u0443\u043b\u044c\u0442\u0438\u0412\u0445\u043e\u0434"),b=b.appendChild(c));b.setAttribute("data-uloginbutton","window");b.setAttribute("data-ulogin-default","true");this.ids[a].opacity=75;this.initButtons(a)},sendPixel:function(){this.getRC();if(this.pixel){var a=this;q(function(){if(a.pixel){var b=k.createElement("iframe"),c=a.getRC();b.src=a.pixel.replace("[rand]",parseInt(1E5*Math.random())).replace("[u]",encodeURIComponent(location.href)).replace("[r]",
			encodeURIComponent(k.referrer||""));b.width=b.height=1;b.style.display="none";c.appendChild(b);q(function(){c.removeChild(b)},3E3);a.pixel=!1}},0)}},sendStats:function(a){var b={r:parseInt(1E5*Math.random())};a.type&&(b.type=a.type);a=this.buildUrl("stats.html",b);this.initSocket(a,this.getRC())},mergeAccounts:function(a,b){if(!a)return console.error('uLogin ERROR (mergeAccounts): invalid token "'+a+'"'),!1;var c={token:a};b?("undefined"!==typeof b.join&&(b=b.join(",")),c.identities=encodeURIComponent(b),
			c=this.buildUrl("merge_accounts.php",c)):c=this.buildUrl("require_verify.php",c);this.loadWindow(c)},getRC:function(){var a=document.getElementById("ulogin_receiver_container");a||(a=k.createElement("div"),a.setAttribute("id","ulogin_receiver_container"),this.resetStyle(a,{width:0,height:0,display:"none"}),k.getElementsByTagName("body")[0].appendChild(a));return a},clearTimeouts:function(){for(var a in this.timeouts)clearTimeout(this.timeouts[a])},callbackTryCall:function(a,b){this.altwayCalled.push(a);
			h[a]?setTimeout(function(){h[a].call(h,b)},10):setTimeout(function(){uLogin.callbackTryCall(a,b)},100)},callbackReceived:function(){var a=location.search.replace("?","");if((a=this.parse(a))&&a.ulogin_callback&&a.ulogin_token&&-1===this.inArray(a.ulogin_callback,this.altwayCalled)&&(this.callbackTryCall(a.ulogin_callback,a.ulogin_token),this.supportHistory)){var b=document.getElementsByTagName("title");b=(b=b?b[0]:"")?b.innerHTML:"";delete a.ulogin_callback;delete a.ulogin_token;a=this.buildUrl("",
			a,!0);var c=location.origin+location.pathname+a+location.hash;q(function(){window.history.pushState({},b,c)},1E3)}},newDialogSocket:function(a){this.dialogSocket&&this.dialogSocket.destroy();this.dialogSocket=a},initSocket:function(a,b,c,d){d||(d=0);var g=new easyXDM.Socket({remote:a,swf:this.isIE()?this.buildUrl("js/easyxdm.swf"):"",props:{style:this.extend({margin:0,padding:0,background:"#fff",border:0,position:"absolute",left:0,top:0,overflow:"hidden",width:"100%",height:"100%"},c),frameBorder:"0"},
			container:b,onMessage:function(a){var b;/weights:/.test(a)||console.info("[uLogin] ulogin.js received message: "+a);if(b=a.match(/(.*?)\((.*?)\)/)){var c=b[1];a=b[2]}if(b=a.match(/^(.*?):(.*?)$/)){var f=b[1];var k=b[2]}/^https?:\/\//.test(a)?location.href=a:/^\/auth.php\?/.test(a)?(a="https://"+uLogin.uLoginHost+a,uLogin.ids[d].altway?location.href=a:uLogin.openWithReceiver(a,d)):-1<uLogin.inArray(a,uLogin.states)?uLogin._changeState(d,a):f&&-1<uLogin.inArray(f,uLogin.states)?uLogin._changeState(d,
				f,"string"===typeof k?k.split(","):[]):"closeme"==a?(uLogin.hideAll(),g.destroy()):/to_window:/.test(a)?(c=uLogin.buildUrl(a.replace(/to_window:\/?/,"",""),{set:encodeURIComponent("{window:1}")}),uLogin.loadWindow(c),/to_window:\/fill\.php/.test(a)&&uLogin._changeState(d,"fill")):/weights:/.test(a)?uLogin.setWeights(a.replace(/weights:\/?/,"","")):c?"undefined"!=typeof h[c]&&(h[c].apply(h,a.split(",")),g.destroy(),uLogin.dialog&&uLogin.hideAll()):uLogin.ids[d]&&"undefined"!=typeof h[uLogin.ids[d].callback]&&
				(uLogin._changeState(d,"receive"),h[uLogin.ids[d].callback](a),uLogin.dialog&&uLogin.hideAll())}});return g},getWidgetNumber:function(a){for(var b=0;b<this.ids.length;b++)if(a==this.ids[b].id)return b;return NaN},onMoveWindow:function(){this.moveWindow()},loadWindow:function(a,b){null===b&&(b=!1);var c=this.ids[b]?this.ids[b].opacity:75;try{k.body.removeChild(this.lightbox)}catch(g){}try{k.body.removeChild(this.dialog)}catch(g){}var d=k.createElement("div");this.resetStyle(d,{position:"fixed",zIndex:9997,
			width:"100%",height:"100%",background:"#"+(this.ids[b]?this.ids[b].color:"fff"),display:"none"});this.setOpacity(d,c);this.lightbox=d;d=k.createElement("div");d.id=this.genID();d.className="ulogin-popup";this.resetStyle(d,{position:"absolute",zIndex:9998,left:Math.floor(this.scrollLeft()+(this.clientWidth()-this.dialogWidth())/2),top:Math.floor(this.scrollTop()+(this.clientHeight()-this.dialogHeight())/2),width:this.dialogWidth(),height:this.dialogHeight(),overflow:"visible",display:"none",border:this.ids[b]&&
			"flat"===this.ids[b].theme?"5px solid #666":"10px solid #666",borderRadius:this.ids[b]&&"flat"===this.ids[b].theme?0:"8px",boxShadow:"0 2px 3px 0 rgba(0,0,0,.2),0 3px 2px -2px rgba(0,0,0,.22),0 1px 6px 0 rgba(0,0,0,.12)"});this.dialog=d;d=k.createElement("div");d.className="ulogin-popup-close";this.resetStyle(d,{position:"absolute",width:30,height:30,zIndex:9999,background:"url("+this.buildUrl("img/x.png")+")",cursor:"pointer",display:"none",left:"initial",top:"-15px",right:"-15px"});this.close=d;
			k.body.appendChild(this.lightbox);k.body.appendChild(this.dialog);this.dialog.appendChild(this.close);this.add(this.lightbox,"click",function(){uLogin.hideAll()});this.add(this.close,"click",function(){uLogin.hideAll()});this.add(this.close,"mouseover",function(a){a.style.background="url("+uLogin.buildUrl("img/x_.png")+")"});this.add(this.close,"mouseout",function(a){a.style.background="url("+uLogin.buildUrl("img/x.png")+")"});this.add(h,"scroll",function(){uLogin.onMoveWindow()});this.add(h,"resize",
				function(){uLogin.onMoveWindow()});this.newDialogSocket(this.initSocket(a,this.dialog.getAttribute("id"),{},b));uLogin.show(uLogin.close);uLogin.show(uLogin.lightbox);uLogin.show(uLogin.dialog);uLogin.onMoveWindow()},hideAll:function(){this.hide(this.lightbox);this.hide(this.dialog);this.hide(this.close);for(var a=0;a<this.ids.length;a++)this.ids[a].showed=!1,this.hide(this.ids[a].hiddenW),this.hide(this.ids[a].hiddenA)},moveWindow:function(){if(!this.dialog||!this.dialog.firstChild)return!1;var a=
			this.dialogWidth(),b=this.dialogHeight();a=(Math.floor(this.scrollLeft()+(this.clientWidth()-a)/2)-Number(this.dialog.style.left.slice(0,-2)))/10;b=(Math.floor(this.scrollTop()+(this.clientHeight()-b)/2)-Number(this.dialog.style.top.slice(0,-2)))/10;for(var c=0;10>c;c++)this.dialog.style.left=a+Number(this.dialog.style.left.slice(0,-2))+"px",this.dialog.style.top=b+Number(this.dialog.style.top.slice(0,-2))+"px"},resetStyle:function(a,b){!b&&(b={});var c=this.extend({margin:0,padding:0,outline:"none",
			border:"none",borderRadius:0,cursor:"default","float":"none",position:"relative",display:"inherit",width:"auto",height:"auto",left:0,top:0,boxSizing:"content-box"},b),d=["width","height","left","top"],g=["float"],f;for(f in c){-1<this.inArray(f,d)&&"number"===typeof c[f]&&(c[f]+="px");try{-1<this.inArray(f,g)&&a.style.setProperty(f,c[f])}catch(t){}try{a.style[f]=c[f]}catch(t){}}},getIconPosition:function(a,b){return a?"0 -"+(18+17*b)+"px":"0 -"+(36+34*b)+"px"},setOpacity:function(a,b){a.style.filter=
			b?"alpha(opacity="+b+") progid:DXImageTransform.Microsoft.AlphaImageLoader(src=transparent.png, sizingMethod='crop')":"";a.style.opacity=b?parseFloat(b)/100:""},initDrop:function(a){if(!this.ids[a].mobile&&""!=this.ids[a].hidden){var b=this.get(this.ids[a].id),c=this.genID();var d=310<23*this.ids[a].hidden.split(",").length-2?310:23*this.ids[a].hidden.split(",").length-2;var g=k.createElement("div");g.className="ulogin-dropdown";g.id=c;this.resetStyle(g,{position:"absolute",zIndex:9999,width:128,
			height:d,border:"flat"===this.ids[a].theme?"3px solid #666":"5px solid #666",borderRadius:"flat"===this.ids[a].theme?0:"4px",boxShadow:"0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12)",display:"none"});this.ids[a].hiddenW=g;"body"===this.ids[a].dropdown_container?k.body.appendChild(this.ids[a].hiddenW):b.appendChild(this.ids[a].hiddenW);g=this.buildUrl("/version/3.0/html/drop.html",{id:a,redirect_uri:this.ids[a].redirect_uri,callback:this.ids[a].callback,providers:this.ids[a].hidden,
			fields:this.ids[a].fields,force_fields:this.ids[a].force_fields,popup_css:this.ids[a].popup_css,optional:this.ids[a].optional,othprov:this.ids[a].providers,protocol:this.protocol,host:this.host,lang:this.ids[a].lang,verify:this.ids[a].verify,sort:this.ids[a].sort,altway:this.ids[a].altway?1:null,m:this.ids[a].m?1:0,icons_32:this.ids[a].icons_32,icons_16:this.ids[a].icons_16,theme:this.ids[a].theme,client:this.ids[a].client,page:this.page,version:this.version});this.initSocket(g,c,{position:"relative",
			width:"128px",height:d+"px"},a);g=k.createElement("div");this.resetStyle(g,{position:"absolute",background:"#000",left:"initial",right:"flat"===this.ids[a].theme?"-3px":"-5px",top:"100%",width:41,height:13,border:"flat"===this.ids[a].theme?"3px solid #666":"5px solid #666",textAlign:"center"});d=k.createElement("a");d.href=this.buildUrl("");d.target="_blank";this.resetStyle(d,{width:41,height:13,background:"url("+this.buildUrl("img/text.png")+") no-repeat"});g.appendChild(d);this.ids[a].hiddenW.appendChild(g);
			g=k.createElement("div");this.resetStyle(g,{width:0,height:0,position:"absolute",zIndex:9999,display:"none",border:"5px solid transparent",borderBottomColor:"#666"});this.ids[a].hiddenA=g;b.appendChild(this.ids[a].hiddenA);this.ids[a].showed=!1;this.add(k.body,"click",function(a,b){b.target||(b.target=b.srcElement);for(var c=0;c<uLogin.ids.length;c++)b.target!=uLogin.ids[c].drop&&(uLogin.hide(uLogin.ids[c].hiddenW),uLogin.hide(uLogin.ids[c].hiddenA))});this.ids[a].hiddenW&&this.ids[a].hiddenA&&(this.add(this.ids[a].hiddenW,
				"mouseout",function(){uLogin.dropdownDelayed(a,0)}),this.add(this.ids[a].hiddenA,"mouseout",function(){uLogin.dropdownDelayed(a,0)}),this.add(this.ids[a].hiddenW,"mouseover",function(){uLogin.clearDropTimer(a)}),this.add(this.ids[a].hiddenA,"mouseover",function(){uLogin.clearDropTimer(a)}))}},showDrop:function(a,b){if(this.ids[a].hiddenW||this.ids[a].hiddenA)if(this.ids[a].showed||0==b)this.hide(this.ids[a].hiddenW),this.hide(this.ids[a].hiddenA),this.ids[a].showed=!1;else{this.show(this.ids[a].hiddenA);
			this.show(this.ids[a].hiddenW);this.ids[a].showed=!0;var c=this.ids[a].drop;if("body"===this.ids[a].dropdown_container){var d=this.getOffset(c);var g=d.left;d=d.top;this.ids[a].hiddenW.style.left=g-(1==b?100:106)+"px";this.ids[a].hiddenW.style.top=d+(1==b?21:37)+"px";this.ids[a].hiddenA.style.left=g+(1==b?4:12)+"px";this.ids[a].hiddenA.style.top=d+(1==b?17:33)+"px"}g=c.offsetLeft;d=c.offsetTop;g-=c.scrollLeft;d-=c.scrollTop;"body"!==this.ids[a].dropdown_container&&(this.ids[a].hiddenW.style.left=
				g-(1==b?100:106)+"px",this.ids[a].hiddenW.style.top=d+(1==b?21:37)+"px");this.ids[a].hiddenA.style.left=g+(1==b?4:12)+"px";this.ids[a].hiddenA.style.top=d+(1==b?12:28)+"px"}},clearDropTimer:function(a){this.ids[a].dropTimer&&h.clearTimeout(this.ids[a].dropTimer)},dropdown:function(a,b){this.ids[a].mobile||(this.clearDropTimer(a),this.showDrop(a,b))},dropdownDelayed:function(a,b){this.clearDropTimer(a);this.ids[a].dropTimer=q(function(){uLogin.showDrop(a,b)},600)},initButtons:function(a){var b=this.get(this.ids[a].id);
			this.ids[a].mobile&&this.add(this.get(this.ids[a].id),"click",function(b,d){d.preventDefault?d.preventDefault():d.returnValue=!1;var c=uLogin.buildUrl("version/3.0/html/mobile.html",{id:uLogin.ids[a].id,redirect_uri:uLogin.ids[a].redirect_uri,callback:uLogin.ids[a].callback,fields:uLogin.ids[a].fields,force_fields:uLogin.ids[a].force_fields,popup_css:uLogin.ids[a].popup_css,optional:uLogin.ids[a].optional,protocol:uLogin.ids[a].protocol,host:uLogin.host,lang:uLogin.ids[a].lang,verify:uLogin.ids[a].verify,
				providers:uLogin.ids[a].providers,hidden:uLogin.ids[a].hidden,icons_32:uLogin.ids[a].icons_32,altway:uLogin.ids[a].altway?1:null,page:uLogin.page,m:uLogin.ids[a].m?1:0,icons_16:uLogin.ids[a].icons_16,theme:uLogin.ids[a].theme,client:uLogin.ids[a].client,version:uLogin.version});uLogin.ids[a].altway?h.top?h.top.location.href=c:location.href=c:uLogin.openWithReceiver(c,a);return!1});"window"===this.ids[a].type?this._proceedChildren(b,this._(this._initButton),a):(this.ids[a].providers="",this._proceedChildren(b,
				this._(this._initButton),a),this.ids[a].providers=this.ids[a].providers.slice(0,this.ids[a].providers.length-1));this._changeState(a,this.states[0])},_:function(a){return function(){a.apply(uLogin,arguments)}},_proceedChildren:function(a,b,c){a=a.childNodes;var d,g;for(g=0;g<a.length;g++){var f=a[g];f.getAttribute&&(b(f,c),(d=f.getAttribute("data-uloginbutton")||f.getAttribute("x-ulogin-button"))&&-1<this.inArray(d,this.providerCodes)&&!(new RegExp(d+"(,|$)","i")).test(this.ids[c].providers)&&(this.ids[c].providers+=
			d+","));this._proceedChildren(f,b,c)}},_initButton:function(a,b){var c=a.getAttribute("data-uloginbutton")||a.getAttribute("x-ulogin-button");if(c)if(-1<this.inArray(c,this.providerCodes))this.add(a,"mouseover",function(a){if(/disabled/.test(a.className))return!1;uLogin.setOpacity(a,parseFloat(uLogin.ids[b].opacity));if(+new Date<+new Date("2017/04/02 03:00:00")&&uLogin.ids[b].hovered_sprite&&!a.getAttribute("data-original-background")){var c=a.offsetHeight*uLogin.randFromTo(0,24),d="ru"===uLogin.ids[b].lang?
			"1 \u0430\u043f\u0440\u0435\u043b\u044f - \u0434\u0435\u043d\u044c \u0441\u043c\u0435\u0445\u0430! \u0423\u043b\u044b\u0431\u0430\u0439\u0442\u0435\u0441\u044c )":"April Fools' Day is here!";a.setAttribute("data-original-background",a.style.background);a.style.background="url("+uLogin.ids[b].hovered_sprite+") 0px -"+c+"px no-repeat";a.setAttribute("data-original-title",a.getAttribute("title"));a.setAttribute("title",d)}}),this.add(a,"mouseout",function(a){if(/disabled/.test(a.className))return!1;
			uLogin.setOpacity(a);a.getAttribute("data-original-background")&&(a.style.background=a.getAttribute("data-original-background"),a.removeAttribute("data-original-background"));a.getAttribute("data-original-title")&&(a.setAttribute("title",a.getAttribute("data-original-title")),a.removeAttribute("data-original-title"))}),this.ids[b].mobile||this.add(a,"click",function(a){if(/disabled/.test(a.className))return!1;var c=a.getAttribute("data-uloginbutton")||a.getAttribute("x-ulogin-button");if(a.getAttribute("data-disabled-click"))return!1;
			a.setAttribute("data-disabled-click","1");setTimeout(function(){a.setAttribute("data-disabled-click","")},1E3);uLogin.startAuth(c,"",b)});else if("window"===c&&(this.ids[b].mobile||this.add(a,this.ids[b].event,function(a,c){c.preventDefault?c.preventDefault():c.returnValue=!1;if(/disabled/.test(a.className))return!1;var d=uLogin.buildUrl(uLogin.ids[b].mobile?"version/3.0/html/mobile.html":"version/3.0/html/window.html",{id:b,redirect_uri:uLogin.ids[b].redirect_uri,callback:uLogin.ids[b].callback,
			fields:uLogin.ids[b].fields,force_fields:uLogin.ids[b].force_fields,popup_css:uLogin.ids[b].popup_css,optional:uLogin.ids[b].optional,protocol:uLogin.protocol,host:uLogin.host,lang:uLogin.ids[b].lang,verify:uLogin.ids[b].verify,sort:uLogin.ids[b].sort,othprov:uLogin.ids[b].hidden,providers:uLogin.ids[b].providers,altway:uLogin.ids[b].altway?1:null,m:uLogin.ids[b].m?1:0,icons_32:uLogin.ids[b].icons_32,icons_16:uLogin.ids[b].icons_16,theme:uLogin.ids[b].theme,client:uLogin.ids[b].client,page:uLogin.page,
			version:uLogin.version});uLogin.loadWindow(d,b);return!1}),a.getAttribute("data-ulogin-default"))){var d=this.buildUrl("img/"+("ru"==this.ids[b].lang?"":this.ids[b].lang+"/")+"button.png?version=img.3.0.1"),g=this.buildUrl("img/"+("ru"==this.ids[b].lang?"":this.ids[b].lang+"/")+"button_.png");a.src=d;this.resetStyle(a,{cursor:"pointer"});this.add(a,"mouseover",function(a){if(/disabled/.test(a.parentNode.className))return!1;a.src!=g&&(a.src=g)});this.add(a,"mouseout",function(a){if(/disabled/.test(a.parentNode.className))return!1;
			a.src!=d&&(a.src=d)})}},randFromTo:function(a,b){return Math.floor(Math.random()*b)+a},sendWeight:function(a){this.initSocket(this.buildUrl("version/3.0/html/weight_set.html",{provider:a,r:parseInt(1E5*Math.random())}),this.getRC(),{background:"transparent"})},setWeights:function(a){this.supportStorage&&(localStorage.providers_weight=a)},getWeights:function(){try{return JSON.parse(localStorage.providers_weight)}catch(a){return{}}},relProviders:function(a,b,c){a=a.split(",");b=b.split(",");if(this.supportStorage){var d=
			this.getWeights(),g;for(g in d){d=this.inArray(g,a);var f=this.inArray(g,b);-1!==d?(a.splice(d,1),a.splice(0,0,g)):-1!==f&&(a.splice(0,0,g),b.splice(f,1),b.splice(0,0,a[a.length-1]),a.splice(a.length-1,1))}}return 1===c?a:b},startAuth:function(a,b,c){var d={name:a,window:1,lang:this.ids[c].lang,fields:this.ids[c].fields,force_fields:this.ids[c].force_fields,popup_css:this.ids[c].popup_css,host:this.host,optional:this.ids[c].optional,redirect_uri:this.ids[c].redirect_uri||location.href,verify:this.ids[c].verify,
			callback:this.ids[c].callback,screen:screen.width+"x"+screen.height,url:b,providers:this.ids[c].providers,hidden:this.ids[c].hidden,m:this.ids[c].m?1:0,page:this.page,icons_32:this.ids[c].icons_32,icons_16:this.ids[c].icons_16,theme:this.ids[c].theme,client:this.ids[c].client,version:this.version};this.ids[c].altway&&(d.altway=1);a=b||"webmoney"!=a&&"livejournal"!=a&&"openid"!=a?this.buildUrl("auth.php",d):this.buildUrl("url.php",d);this._changeState(c,this.states[1]);this.ids[c].altway?h.top?h.top.location.href=
			a:location.href=a:this.openWithReceiver(a,c)},openWithReceiver:function(a,b){!b&&(b=0);var c=660,d=420;/name=vkontakte/.test(a)?d=380:/name=facebook/.test(a)?(c=560,d=350):/name=google/.test(a)?(c=800,d=630):/name=yandex/.test(a)?(c=990,d=530):/name=lastfm/.test(a)&&(c=1368,d=894);this.openFromSocket?this.authSocket.postMessage("window.open::"+a+"::"+c+"::"+d+"::"+(screen.width-c)/2+"::"+(screen.height-d)/2):(this.initSocket(this.buildUrl("/version/3.0/html/buttons_receiver.html",{four:encodeURIComponent(a),
			r:parseInt(1E5*Math.random())}),this.getRC(),{background:"transparent"},b),uLogin.getRC().getElementsByTagName("iframe"),window.open(a,"uLogin_window","width="+c+",height="+d+",left="+(screen.width-c)/2+",top="+(screen.height-d)/2))},checkWindow:function(a,b){},checkCurrentWidgets:function(){for(var a=0;this.ids[a];)this.checkWidget(this.ids[a++].id)},checkWidget:function(a,b){var c=this.get(a);if(c)if(this.inited(a)){var d=this.getWidgetNumber(a),g=this.ids[d].type;if(("small"===g||"panel"===g)&&
			!c.childNodes.length)return c=this.ids[d].id,uLogin.ids[d].id=!1,uLogin.initWidget(c),!0;c.getAttribute("data-ulogin-inited")||(c=this.ids[d].id,uLogin.ids[d].id=!1,uLogin.initWidget(c))}else this.addWidget(this.get(a),b);else this.ids[this.getWidgetNumber(a)].id=!1},buildUrl:function(a,b,c){b||(b={});c||(c=!1);a=a?"https://"+this.uLoginHost+"/"+a:"";var d="",g;for(g in b){var f=b[g];null!==f&&(!c&&(/\?/.test(f)||/\//.test(f)||/:/.test(f))&&(f=""),d+=g+"="+f+"&")}0<d.length&&(d=d.substring(0,d.length-
			1),a=a+(/\?/.test(a)?"&":"?")+d);return a},getWidget:function(a,b){if(this.inited(b))return!1;if(this.widgetSettings[a])return this.setProp(b,uLogin.ids.length,this.widgetSettings[a]),!1;if(this.waitGetWidget[a]&&-1!==this.inArray(b,this.waitGetWidget[a]))return!1;this.waitGetWidget[a]||(this.waitGetWidget[a]=[]);this.waitGetWidget[a].push(b);if(this.widgetSettings[a])this.setProp(b,this.ids.length,this.widgetSettings[a]);else{var c=this.getRC(),d=k.createElement("script");d.async=!0;d.src=this.buildUrl("getwidget",
			{widgetid:a});c.appendChild(d)}},forElements:function(a,b){if(a&&a.length)for(var c in a)b(a[c])},setWidget:function(a,b,c){!c&&b&&(c=b);if("not_found"===a)return this.forElements(this.waitGetWidget[a],function(a){if("string"!==typeof a)return!1;k.getElementById(a).setAttribute("data-uloginid","")}),!1;c&&!uLogin.widgetSettings[a]&&"undefined"!==typeof c.display&&(this.forElements(this.waitGetWidget[a],function(a){if("string"!==typeof a)return!1;var b=k.getElementById(a);if(!b)return console.error('uLogin ERROR: not found element with id "'+
			a+'"'),!1;b=uLogin.parse(b.getAttribute("data-ulogin"));for(var d in b)c[d]=b[d];uLogin.setProp(a,uLogin.ids.length,c)}),this.widgetSettings[a]=c)},customInit:function(){for(var a=0;a<arguments.length;a++)if("string"===typeof arguments[a]){var b=!1;if(!uLogin.get(arguments[a])||!arguments[a])return console.error('uLogin ERROR (customInit): Element with ID="'+arguments[a]+'" not found'),!1;1<arguments.length&&"object"===typeof arguments[arguments.length-1]&&(b=arguments[arguments.length-1]);uLogin.checkWidget(arguments[a],
			b)}},getOffsetSum:function(a){for(var b=0,c=0;a;)b+=parseFloat(a.offsetTop),c+=parseFloat(a.offsetLeft),a=a.offsetParent;return{top:Math.round(b),left:Math.round(c)}},getOffsetRect:function(a){a=a.getBoundingClientRect();var b=document.body,c=document.documentElement;return{top:Math.round(a.top+(window.pageYOffset||c.scrollTop||b.scrollTop)-(c.clientTop||b.clientTop||0)),left:Math.round(a.left+(window.pageXOffset||c.scrollLeft||b.scrollLeft)-(c.clientLeft||b.clientLeft||0))}},getOffset:function(a){return a.getBoundingClientRect?
			this.getOffsetRect(a):this.getOffsetSum(a)},checkAsyncWidgets:function(){var a=this.get("ulogin")||this.get("uLogin");a&&a.id&&this.addWidget(a)},setStateListener:function(a,b,c){this.listeners[a]||(this.listeners[a]={});this.listeners[a][b]||(this.listeners[a][b]=[]);return this.listeners[a][b].push(c)-1},removeStateListener:function(a,b,c){return this.listeners[a]&&this.listeners[a][c]?this.listeners[a][c].splice(b,1):!1},_changeState:function(a,b,c){try{this.ids[a].state=b;for(var d=0;this.listeners[this.ids[a].id][b][d];)this.listeners[this.ids[a].id][b][d++].apply(h,
			"object"===typeof c?c:[])}catch(g){}},extend:function(a,b){for(var c in b)a[c]=b[c];return a},arrayIntersectKey:function(a,b){var c=[],d;for(d in a)d in b&&c.push(d);return c}},-1==uLogin.inArray(uLogin.lang,uLogin.langs)&&(uLogin.lang=uLogin.langs[0]),uLogin.init("undefined"!=typeof uLogin_query?uLogin_query:""));h.receiver=function(a,b,c){uLogin._changeState(0,"receive",[a]);!c&&b&&(c=b);h[c](a)};h.redirect=function(a,b){var c=k.createElement("form");c.action=b;c.method="post";c.target="_top";c.style.display=
	"none";var d=k.createElement("input");d.type="hidden";d.name="token";d.value=a;c.appendChild(d);k.body.appendChild(c);c.submit()}})(window,document,navigator,setTimeout);
//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){function n(n){function t(t,r,e,u,i,o){for(;i>=0&&o>i;i+=n){var a=u?u[i]:i;e=r(e,t[a],a,t)}return e}return function(r,e,u,i){e=b(e,i,4);var o=!k(r)&&m.keys(r),a=(o||r).length,c=n>0?0:a-1;return arguments.length<3&&(u=r[o?o[c]:c],c+=n),t(r,e,u,o,c,a)}}function t(n){return function(t,r,e){r=x(r,e);for(var u=O(t),i=n>0?0:u-1;i>=0&&u>i;i+=n)if(r(t[i],i,t))return i;return-1}}function r(n,t,r){return function(e,u,i){var o=0,a=O(e);if("number"==typeof i)n>0?o=i>=0?i:Math.max(i+a,o):a=i>=0?Math.min(i+1,a):i+a+1;else if(r&&i&&a)return i=r(e,u),e[i]===u?i:-1;if(u!==u)return i=t(l.call(e,o,a),m.isNaN),i>=0?i+o:-1;for(i=n>0?o:a-1;i>=0&&a>i;i+=n)if(e[i]===u)return i;return-1}}function e(n,t){var r=I.length,e=n.constructor,u=m.isFunction(e)&&e.prototype||a,i="constructor";for(m.has(n,i)&&!m.contains(t,i)&&t.push(i);r--;)i=I[r],i in n&&n[i]!==u[i]&&!m.contains(t,i)&&t.push(i)}var u=this,i=u._,o=Array.prototype,a=Object.prototype,c=Function.prototype,f=o.push,l=o.slice,s=a.toString,p=a.hasOwnProperty,h=Array.isArray,v=Object.keys,g=c.bind,y=Object.create,d=function(){},m=function(n){return n instanceof m?n:this instanceof m?void(this._wrapped=n):new m(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=m),exports._=m):u._=m,m.VERSION="1.8.3";var b=function(n,t,r){if(t===void 0)return n;switch(null==r?3:r){case 1:return function(r){return n.call(t,r)};case 2:return function(r,e){return n.call(t,r,e)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,i){return n.call(t,r,e,u,i)}}return function(){return n.apply(t,arguments)}},x=function(n,t,r){return null==n?m.identity:m.isFunction(n)?b(n,t,r):m.isObject(n)?m.matcher(n):m.property(n)};m.iteratee=function(n,t){return x(n,t,1/0)};var _=function(n,t){return function(r){var e=arguments.length;if(2>e||null==r)return r;for(var u=1;e>u;u++)for(var i=arguments[u],o=n(i),a=o.length,c=0;a>c;c++){var f=o[c];t&&r[f]!==void 0||(r[f]=i[f])}return r}},j=function(n){if(!m.isObject(n))return{};if(y)return y(n);d.prototype=n;var t=new d;return d.prototype=null,t},w=function(n){return function(t){return null==t?void 0:t[n]}},A=Math.pow(2,53)-1,O=w("length"),k=function(n){var t=O(n);return"number"==typeof t&&t>=0&&A>=t};m.each=m.forEach=function(n,t,r){t=b(t,r);var e,u;if(k(n))for(e=0,u=n.length;u>e;e++)t(n[e],e,n);else{var i=m.keys(n);for(e=0,u=i.length;u>e;e++)t(n[i[e]],i[e],n)}return n},m.map=m.collect=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=Array(u),o=0;u>o;o++){var a=e?e[o]:o;i[o]=t(n[a],a,n)}return i},m.reduce=m.foldl=m.inject=n(1),m.reduceRight=m.foldr=n(-1),m.find=m.detect=function(n,t,r){var e;return e=k(n)?m.findIndex(n,t,r):m.findKey(n,t,r),e!==void 0&&e!==-1?n[e]:void 0},m.filter=m.select=function(n,t,r){var e=[];return t=x(t,r),m.each(n,function(n,r,u){t(n,r,u)&&e.push(n)}),e},m.reject=function(n,t,r){return m.filter(n,m.negate(x(t)),r)},m.every=m.all=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(!t(n[o],o,n))return!1}return!0},m.some=m.any=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(t(n[o],o,n))return!0}return!1},m.contains=m.includes=m.include=function(n,t,r,e){return k(n)||(n=m.values(n)),("number"!=typeof r||e)&&(r=0),m.indexOf(n,t,r)>=0},m.invoke=function(n,t){var r=l.call(arguments,2),e=m.isFunction(t);return m.map(n,function(n){var u=e?t:n[t];return null==u?u:u.apply(n,r)})},m.pluck=function(n,t){return m.map(n,m.property(t))},m.where=function(n,t){return m.filter(n,m.matcher(t))},m.findWhere=function(n,t){return m.find(n,m.matcher(t))},m.max=function(n,t,r){var e,u,i=-1/0,o=-1/0;if(null==t&&null!=n){n=k(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],e>i&&(i=e)}else t=x(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(u>o||u===-1/0&&i===-1/0)&&(i=n,o=u)});return i},m.min=function(n,t,r){var e,u,i=1/0,o=1/0;if(null==t&&null!=n){n=k(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],i>e&&(i=e)}else t=x(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(o>u||1/0===u&&1/0===i)&&(i=n,o=u)});return i},m.shuffle=function(n){for(var t,r=k(n)?n:m.values(n),e=r.length,u=Array(e),i=0;e>i;i++)t=m.random(0,i),t!==i&&(u[i]=u[t]),u[t]=r[i];return u},m.sample=function(n,t,r){return null==t||r?(k(n)||(n=m.values(n)),n[m.random(n.length-1)]):m.shuffle(n).slice(0,Math.max(0,t))},m.sortBy=function(n,t,r){return t=x(t,r),m.pluck(m.map(n,function(n,r,e){return{value:n,index:r,criteria:t(n,r,e)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var F=function(n){return function(t,r,e){var u={};return r=x(r,e),m.each(t,function(e,i){var o=r(e,i,t);n(u,e,o)}),u}};m.groupBy=F(function(n,t,r){m.has(n,r)?n[r].push(t):n[r]=[t]}),m.indexBy=F(function(n,t,r){n[r]=t}),m.countBy=F(function(n,t,r){m.has(n,r)?n[r]++:n[r]=1}),m.toArray=function(n){return n?m.isArray(n)?l.call(n):k(n)?m.map(n,m.identity):m.values(n):[]},m.size=function(n){return null==n?0:k(n)?n.length:m.keys(n).length},m.partition=function(n,t,r){t=x(t,r);var e=[],u=[];return m.each(n,function(n,r,i){(t(n,r,i)?e:u).push(n)}),[e,u]},m.first=m.head=m.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:m.initial(n,n.length-t)},m.initial=function(n,t,r){return l.call(n,0,Math.max(0,n.length-(null==t||r?1:t)))},m.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:m.rest(n,Math.max(0,n.length-t))},m.rest=m.tail=m.drop=function(n,t,r){return l.call(n,null==t||r?1:t)},m.compact=function(n){return m.filter(n,m.identity)};var S=function(n,t,r,e){for(var u=[],i=0,o=e||0,a=O(n);a>o;o++){var c=n[o];if(k(c)&&(m.isArray(c)||m.isArguments(c))){t||(c=S(c,t,r));var f=0,l=c.length;for(u.length+=l;l>f;)u[i++]=c[f++]}else r||(u[i++]=c)}return u};m.flatten=function(n,t){return S(n,t,!1)},m.without=function(n){return m.difference(n,l.call(arguments,1))},m.uniq=m.unique=function(n,t,r,e){m.isBoolean(t)||(e=r,r=t,t=!1),null!=r&&(r=x(r,e));for(var u=[],i=[],o=0,a=O(n);a>o;o++){var c=n[o],f=r?r(c,o,n):c;t?(o&&i===f||u.push(c),i=f):r?m.contains(i,f)||(i.push(f),u.push(c)):m.contains(u,c)||u.push(c)}return u},m.union=function(){return m.uniq(S(arguments,!0,!0))},m.intersection=function(n){for(var t=[],r=arguments.length,e=0,u=O(n);u>e;e++){var i=n[e];if(!m.contains(t,i)){for(var o=1;r>o&&m.contains(arguments[o],i);o++);o===r&&t.push(i)}}return t},m.difference=function(n){var t=S(arguments,!0,!0,1);return m.filter(n,function(n){return!m.contains(t,n)})},m.zip=function(){return m.unzip(arguments)},m.unzip=function(n){for(var t=n&&m.max(n,O).length||0,r=Array(t),e=0;t>e;e++)r[e]=m.pluck(n,e);return r},m.object=function(n,t){for(var r={},e=0,u=O(n);u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},m.findIndex=t(1),m.findLastIndex=t(-1),m.sortedIndex=function(n,t,r,e){r=x(r,e,1);for(var u=r(t),i=0,o=O(n);o>i;){var a=Math.floor((i+o)/2);r(n[a])<u?i=a+1:o=a}return i},m.indexOf=r(1,m.findIndex,m.sortedIndex),m.lastIndexOf=r(-1,m.findLastIndex),m.range=function(n,t,r){null==t&&(t=n||0,n=0),r=r||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=Array(e),i=0;e>i;i++,n+=r)u[i]=n;return u};var E=function(n,t,r,e,u){if(!(e instanceof t))return n.apply(r,u);var i=j(n.prototype),o=n.apply(i,u);return m.isObject(o)?o:i};m.bind=function(n,t){if(g&&n.bind===g)return g.apply(n,l.call(arguments,1));if(!m.isFunction(n))throw new TypeError("Bind must be called on a function");var r=l.call(arguments,2),e=function(){return E(n,e,t,this,r.concat(l.call(arguments)))};return e},m.partial=function(n){var t=l.call(arguments,1),r=function(){for(var e=0,u=t.length,i=Array(u),o=0;u>o;o++)i[o]=t[o]===m?arguments[e++]:t[o];for(;e<arguments.length;)i.push(arguments[e++]);return E(n,r,this,this,i)};return r},m.bindAll=function(n){var t,r,e=arguments.length;if(1>=e)throw new Error("bindAll must be passed function names");for(t=1;e>t;t++)r=arguments[t],n[r]=m.bind(n[r],n);return n},m.memoize=function(n,t){var r=function(e){var u=r.cache,i=""+(t?t.apply(this,arguments):e);return m.has(u,i)||(u[i]=n.apply(this,arguments)),u[i]};return r.cache={},r},m.delay=function(n,t){var r=l.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},m.defer=m.partial(m.delay,m,1),m.throttle=function(n,t,r){var e,u,i,o=null,a=0;r||(r={});var c=function(){a=r.leading===!1?0:m.now(),o=null,i=n.apply(e,u),o||(e=u=null)};return function(){var f=m.now();a||r.leading!==!1||(a=f);var l=t-(f-a);return e=this,u=arguments,0>=l||l>t?(o&&(clearTimeout(o),o=null),a=f,i=n.apply(e,u),o||(e=u=null)):o||r.trailing===!1||(o=setTimeout(c,l)),i}},m.debounce=function(n,t,r){var e,u,i,o,a,c=function(){var f=m.now()-o;t>f&&f>=0?e=setTimeout(c,t-f):(e=null,r||(a=n.apply(i,u),e||(i=u=null)))};return function(){i=this,u=arguments,o=m.now();var f=r&&!e;return e||(e=setTimeout(c,t)),f&&(a=n.apply(i,u),i=u=null),a}},m.wrap=function(n,t){return m.partial(t,n)},m.negate=function(n){return function(){return!n.apply(this,arguments)}},m.compose=function(){var n=arguments,t=n.length-1;return function(){for(var r=t,e=n[t].apply(this,arguments);r--;)e=n[r].call(this,e);return e}},m.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},m.before=function(n,t){var r;return function(){return--n>0&&(r=t.apply(this,arguments)),1>=n&&(t=null),r}},m.once=m.partial(m.before,2);var M=!{toString:null}.propertyIsEnumerable("toString"),I=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];m.keys=function(n){if(!m.isObject(n))return[];if(v)return v(n);var t=[];for(var r in n)m.has(n,r)&&t.push(r);return M&&e(n,t),t},m.allKeys=function(n){if(!m.isObject(n))return[];var t=[];for(var r in n)t.push(r);return M&&e(n,t),t},m.values=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},m.mapObject=function(n,t,r){t=x(t,r);for(var e,u=m.keys(n),i=u.length,o={},a=0;i>a;a++)e=u[a],o[e]=t(n[e],e,n);return o},m.pairs=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},m.invert=function(n){for(var t={},r=m.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},m.functions=m.methods=function(n){var t=[];for(var r in n)m.isFunction(n[r])&&t.push(r);return t.sort()},m.extend=_(m.allKeys),m.extendOwn=m.assign=_(m.keys),m.findKey=function(n,t,r){t=x(t,r);for(var e,u=m.keys(n),i=0,o=u.length;o>i;i++)if(e=u[i],t(n[e],e,n))return e},m.pick=function(n,t,r){var e,u,i={},o=n;if(null==o)return i;m.isFunction(t)?(u=m.allKeys(o),e=b(t,r)):(u=S(arguments,!1,!1,1),e=function(n,t,r){return t in r},o=Object(o));for(var a=0,c=u.length;c>a;a++){var f=u[a],l=o[f];e(l,f,o)&&(i[f]=l)}return i},m.omit=function(n,t,r){if(m.isFunction(t))t=m.negate(t);else{var e=m.map(S(arguments,!1,!1,1),String);t=function(n,t){return!m.contains(e,t)}}return m.pick(n,t,r)},m.defaults=_(m.allKeys,!0),m.create=function(n,t){var r=j(n);return t&&m.extendOwn(r,t),r},m.clone=function(n){return m.isObject(n)?m.isArray(n)?n.slice():m.extend({},n):n},m.tap=function(n,t){return t(n),n},m.isMatch=function(n,t){var r=m.keys(t),e=r.length;if(null==n)return!e;for(var u=Object(n),i=0;e>i;i++){var o=r[i];if(t[o]!==u[o]||!(o in u))return!1}return!0};var N=function(n,t,r,e){if(n===t)return 0!==n||1/n===1/t;if(null==n||null==t)return n===t;n instanceof m&&(n=n._wrapped),t instanceof m&&(t=t._wrapped);var u=s.call(n);if(u!==s.call(t))return!1;switch(u){case"[object RegExp]":case"[object String]":return""+n==""+t;case"[object Number]":return+n!==+n?+t!==+t:0===+n?1/+n===1/t:+n===+t;case"[object Date]":case"[object Boolean]":return+n===+t}var i="[object Array]"===u;if(!i){if("object"!=typeof n||"object"!=typeof t)return!1;var o=n.constructor,a=t.constructor;if(o!==a&&!(m.isFunction(o)&&o instanceof o&&m.isFunction(a)&&a instanceof a)&&"constructor"in n&&"constructor"in t)return!1}r=r||[],e=e||[];for(var c=r.length;c--;)if(r[c]===n)return e[c]===t;if(r.push(n),e.push(t),i){if(c=n.length,c!==t.length)return!1;for(;c--;)if(!N(n[c],t[c],r,e))return!1}else{var f,l=m.keys(n);if(c=l.length,m.keys(t).length!==c)return!1;for(;c--;)if(f=l[c],!m.has(t,f)||!N(n[f],t[f],r,e))return!1}return r.pop(),e.pop(),!0};m.isEqual=function(n,t){return N(n,t)},m.isEmpty=function(n){return null==n?!0:k(n)&&(m.isArray(n)||m.isString(n)||m.isArguments(n))?0===n.length:0===m.keys(n).length},m.isElement=function(n){return!(!n||1!==n.nodeType)},m.isArray=h||function(n){return"[object Array]"===s.call(n)},m.isObject=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},m.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(n){m["is"+n]=function(t){return s.call(t)==="[object "+n+"]"}}),m.isArguments(arguments)||(m.isArguments=function(n){return m.has(n,"callee")}),"function"!=typeof/./&&"object"!=typeof Int8Array&&(m.isFunction=function(n){return"function"==typeof n||!1}),m.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},m.isNaN=function(n){return m.isNumber(n)&&n!==+n},m.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"===s.call(n)},m.isNull=function(n){return null===n},m.isUndefined=function(n){return n===void 0},m.has=function(n,t){return null!=n&&p.call(n,t)},m.noConflict=function(){return u._=i,this},m.identity=function(n){return n},m.constant=function(n){return function(){return n}},m.noop=function(){},m.property=w,m.propertyOf=function(n){return null==n?function(){}:function(t){return n[t]}},m.matcher=m.matches=function(n){return n=m.extendOwn({},n),function(t){return m.isMatch(t,n)}},m.times=function(n,t,r){var e=Array(Math.max(0,n));t=b(t,r,1);for(var u=0;n>u;u++)e[u]=t(u);return e},m.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},m.now=Date.now||function(){return(new Date).getTime()};var B={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},T=m.invert(B),R=function(n){var t=function(t){return n[t]},r="(?:"+m.keys(n).join("|")+")",e=RegExp(r),u=RegExp(r,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,t):n}};m.escape=R(B),m.unescape=R(T),m.result=function(n,t,r){var e=null==n?void 0:n[t];return e===void 0&&(e=r),m.isFunction(e)?e.call(n):e};var q=0;m.uniqueId=function(n){var t=++q+"";return n?n+t:t},m.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var K=/(.)^/,z={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\u2028|\u2029/g,L=function(n){return"\\"+z[n]};m.template=function(n,t,r){!t&&r&&(t=r),t=m.defaults({},t,m.templateSettings);var e=RegExp([(t.escape||K).source,(t.interpolate||K).source,(t.evaluate||K).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,o,a){return i+=n.slice(u,a).replace(D,L),u=a+t.length,r?i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'":e?i+="'+\n((__t=("+e+"))==null?'':__t)+\n'":o&&(i+="';\n"+o+"\n__p+='"),t}),i+="';\n",t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var o=new Function(t.variable||"obj","_",i)}catch(a){throw a.source=i,a}var c=function(n){return o.call(this,n,m)},f=t.variable||"obj";return c.source="function("+f+"){\n"+i+"}",c},m.chain=function(n){var t=m(n);return t._chain=!0,t};var P=function(n,t){return n._chain?m(t).chain():t};m.mixin=function(n){m.each(m.functions(n),function(t){var r=m[t]=n[t];m.prototype[t]=function(){var n=[this._wrapped];return f.apply(n,arguments),P(this,r.apply(m,n))}})},m.mixin(m),m.each(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=o[n];m.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!==n&&"splice"!==n||0!==r.length||delete r[0],P(this,r)}}),m.each(["concat","join","slice"],function(n){var t=o[n];m.prototype[n]=function(){return P(this,t.apply(this._wrapped,arguments))}}),m.prototype.value=function(){return this._wrapped},m.prototype.valueOf=m.prototype.toJSON=m.prototype.value,m.prototype.toString=function(){return""+this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return m})}).call(this);

/*!
 * verge 1.10.2+201705300050
 * http://npm.im/verge
 * MIT Ryan Van Etten
 */
!function(a,b,c){"undefined"!=typeof module&&module.exports?module.exports=c():a[b]=c()}(this,"verge",function(){function a(){return{width:k(),height:l()}}function b(a,b){var c={};return b=+b||0,c.width=(c.right=a.right+b)-(c.left=a.left-b),c.height=(c.bottom=a.bottom+b)-(c.top=a.top-b),c}function c(a,c){return!(!(a=a&&!a.nodeType?a[0]:a)||1!==a.nodeType)&&b(a.getBoundingClientRect(),c)}function d(b){b=null==b?a():1===b.nodeType?c(b):b;var d=b.height,e=b.width;return d="function"==typeof d?d.call(b):d,(e="function"==typeof e?e.call(b):e)/d}var e={},f="undefined"!=typeof window&&window,g="undefined"!=typeof document&&document,h=g&&g.documentElement,i=f.matchMedia||f.msMatchMedia,j=i?function(a){return!!i.call(f,a).matches}:function(){return!1},k=e.viewportW=function(){var a=h.clientWidth,b=f.innerWidth;return a<b?b:a},l=e.viewportH=function(){var a=h.clientHeight,b=f.innerHeight;return a<b?b:a};return e.mq=j,e.matchMedia=i?function(){return i.apply(f,arguments)}:function(){return{}},e.viewport=a,e.scrollX=function(){return f.pageXOffset||h.scrollLeft},e.scrollY=function(){return f.pageYOffset||h.scrollTop},e.rectangle=c,e.aspect=d,e.inX=function(a,b){var d=c(a,b);return!!d&&d.right>=0&&d.left<=k()},e.inY=function(a,b){var d=c(a,b);return!!d&&d.bottom>=0&&d.top<=l()},e.inViewport=function(a,b){var d=c(a,b);return!!d&&d.bottom>=0&&d.right>=0&&d.top<=l()&&d.left<=k()},e});

!function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="https://yastatic.net/share2/v-1.18.1/",t(t.s=56)}([function(e,t,n){"use strict";function o(e){return e.getElementsByTagName("head")[0]||e.body}function i(e){var t=document.createElement("script");return t.src=e,t.defer=!0,document.head.appendChild(t),t}Object.defineProperty(t,"__esModule",{value:!0}),t.injectJs=i;var r=function(e){this._document=e};r.prototype.injectCss=function(e,t){var n=t.nonce,i=o(this._document),r=this._document.createElement("style");r.type="text/css",r.innerHTML=e,n&&r.setAttribute("nonce",n),i.appendChild(r)},t.default=r},function(e,t,n){"use strict";function o(e){return Array.isArray(e)?e:Array.from(e)}function i(e){return e.search.substring(1).split("&").reduce(function(e,t){var n=t.split("="),i=o(n),r=i[0],s=i.slice(1);return e[r]=decodeURIComponent(s.join("=")),e},{})}function r(e,t){return e.replace(/{(\w+)}/g,function(e,n){return void 0!==t[n]?encodeURIComponent(t[n]):""})}function s(e){return Object.keys(e).map(function(t){return t+"="+encodeURIComponent(e[t])}).join("&")}Object.defineProperty(t,"__esModule",{value:!0}),t.getParams=i,t.applyTemplate=r,t.serializeParams=s},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o={closest:function(e,t){do{if(e.classList&&e.classList.contains(t))return e}while(e=e.parentNode)},toArray:function(e){for(var t=[],n=e.length,o=0;o<n;o+=1)t.push(e[o]);return t},getTarget:function(e){return e.target||e.srcElement},remove:function(e){return e.parentNode.removeChild(e)},getRectRelativeToDocument:function(e){var t=e.getBoundingClientRect(),n=void 0===window.scrollY?document.documentElement.scrollTop:window.scrollY,o=void 0===window.scrollX?document.documentElement.scrollLeft:window.scrollX;return{top:t.top+n,left:t.left+o,width:void 0===t.width?t.right-t.left:t.width,height:void 0===t.height?t.bottom-t.top:t.height}}};t.default=o},function(e,t,n){"use strict";(function(e){function n(e){try{return JSON.parse(e)}catch(e){return{}}}function o(e){return e.parent!==e&&e.parent||e.opener||e.top}Object.defineProperty(t,"__esModule",{value:!0});var i=function(t,n){this._window=t,this._opener=o(t),this._namespace=n,this._subscriptions=new e};i.prototype.subscribe=function(e,t){var o=this,i=function(e){var i=n(e.data),r=i.namespace,s=i.action,a=i.payload;r===o._namespace&&t(s,a)},r=this._subscriptions.get(e)||[];r.push(i),this._subscriptions.set(e,r),this._window.addEventListener("message",i)},i.prototype.unsubscribe=function(e){var t=this;(this._subscriptions.get(e)||[]).forEach(function(e){return t._window.removeEventListener("message",e)}),this._subscriptions.delete(e)},i.prototype.publish=function(e,t,n){(n||this._opener).postMessage(JSON.stringify({namespace:this._namespace,action:e,payload:t}),"*")},t.default=i}).call(t,n(14))},function(e,t,n){"use strict";var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i=Object.prototype.hasOwnProperty,r=Object.prototype.toString,s=function(e){return"function"==typeof Array.isArray?Array.isArray(e):"[object Array]"===r.call(e)},a=function(e){if(!e||"[object Object]"!==r.call(e))return!1;var t=i.call(e,"constructor"),n=e.constructor&&e.constructor.prototype&&i.call(e.constructor.prototype,"isPrototypeOf");if(e.constructor&&!t&&!n)return!1;var o;for(o in e);return void 0===o||i.call(e,o)};e.exports=function e(){var t,n,i,r,l,c,u=arguments[0],p=1,f=arguments.length,h=!1;for("boolean"==typeof u?(h=u,u=arguments[1]||{},p=2):("object"!==(void 0===u?"undefined":o(u))&&"function"!=typeof u||null==u)&&(u={});p<f;++p)if(null!=(t=arguments[p]))for(n in t)i=u[n],r=t[n],u!==r&&(h&&r&&(a(r)||(l=s(r)))?(l?(l=!1,c=i&&s(i)?i:[]):c=i&&a(i)?i:{},u[n]=e(h,c,r)):void 0!==r&&(u[n]=r));return u}},function(e,t,n){"use strict";var o,i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};o=function(){return this}();try{o=o||Function("return this")()||(0,eval)("this")}catch(e){"object"===("undefined"==typeof window?"undefined":i(window))&&(o=window)}e.exports=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=t.count={jsonp:{url:"https://graph.facebook.com/?id={url}&access_token={accessToken}&callback={callback}",callback:function(e){return e.share.share_count}}};t.default={config:{shareUrl:{default:"https://www.facebook.com/sharer.php?src=sp&u={url}&title={title}&description={description}&picture={image}",share:"https://www.facebook.com/dialog/share?app_id={appId}&display=popup&href={url}&redirect_uri={nextUrl}",feed:"https://www.facebook.com/dialog/feed?display=popup&app_id={appId}&link={url}&next={nextUrl}&name={title}&description={description}&picture={image}"},count:o},contentOptions:{accessToken:"",appId:"",nextUrl:""},popupDimensions:[800,520],i18n:{az:"Facebook",be:"Facebook",en:"Facebook",hy:"Facebook",ka:"Facebook",kk:"Facebook",ro:"Facebook",ru:"Facebook",tr:"Facebook",tt:"Facebook",uk:"Facebook"},color:"#3b5998"}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.count=void 0;var o=n(13),i=t.count={cors:{request:function(e,t){var n=e.url;return(0,o.post)({url:"https://clients6.google.com/rpc",headers:{"content-type":"application/json; charset=UTF-8"},body:JSON.stringify({method:"pos.plusones.get",id:n,params:{nolog:!0,id:n,source:"widget",userId:"@viewer",groupId:"@self"},jsonrpc:"2.0",key:"p",apiVersion:"v1"})},function(e,n){if(null===e)try{var o=JSON.parse(n),i=o.result.metadata.globalCounts.count;t(null,i)}catch(e){}})}}};t.default={config:{shareUrl:"https://plus.google.com/share?url={url}",count:i},popupDimensions:[560,370],i18n:{az:"Google+",be:"Google+",en:"Google+",hy:"Google+",ka:"Google+",kk:"Google+",ro:"Google+",ru:"Google+",tr:"Google+",tt:"Google+",uk:"Google+"},color:"#dc4e41"}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=t.count={jsonp:{url:"https://www.linkedin.com/countserv/count/share?url={url}&callback={callback}",callback:function(e){return e.count}}};t.default={config:{shareUrl:"https://www.linkedin.com/shareArticle?mini=true&url={url}&title={title}&summary={description}",count:o},popupDimensions:[800,520],i18n:{az:"LinkedIn",be:"LinkedIn",en:"LinkedIn",hy:"LinkedIn",ka:"LinkedIn",kk:"LinkedIn",ro:"LinkedIn",ru:"LinkedIn",tr:"LinkedIn",tt:"LinkedIn",uk:"LinkedIn"},color:"#0083be"}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=t.count={jsonp:{url:"https://connect.mail.ru/share_count?func={callback}&callback=1&url_list={url}",callback:function(e){return e[Object.keys(e)[0]].shares}}};t.default={config:{shareUrl:"https://connect.mail.ru/share?url={url}&title={title}&description={description}",count:o},popupDimensions:[560,400],i18n:{az:"Moy Mir",be:"ÐœÐ¾Ð¹ ÐœÐ¸Ñ€",en:"Moi Mir",hy:"Moi Mir",ka:"Moi Mir",kk:"ÐœÐ¾Ð¹ ÐœÐ¸Ñ€",ro:"Moi Mir",ru:"ÐœÐ¾Ð¹ ÐœÐ¸Ñ€",tr:"Moi Mir",tt:"ÐœÐ¾Ð¹ ÐœÐ¸Ñ€",uk:"ÐœÐ¾Ð¹ ÐœÐ¸Ñ€"},color:"#168de2"}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=t.count={jsonp:{url:"https://connect.ok.ru/dk?st.cmd=extLike&uid=odklocs0&ref={url}",mount:function(e,t){e.ODKL={updateCount:function(e,n){t(n)}}}}};t.default={config:{shareUrl:"https://connect.ok.ru/offer?url={url}&title={title}&description={description}&imageUrl={image}",count:o},popupDimensions:[800,520],i18n:{az:"Odnoklassniki",be:"ÐžÐ´Ð½Ð¾ÐºÐ»Ð°ÑÑÐ½Ð¸ÐºÐ¸",en:"Odnoklassniki",hy:"Odnoklassniki",ka:"Odnoklasniki",kk:"ÐžÐ´Ð½Ð¾ÐºÐ»Ð°ÑÑÐ½Ð¸ÐºÐ¸",ro:"Odnoklassniki",ru:"ÐžÐ´Ð½Ð¾ÐºÐ»Ð°ÑÑÐ½Ð¸ÐºÐ¸",tr:"Odnoklasniki",tt:"ÐžÐ´Ð½Ð¾ÐºÐ»Ð°ÑÑÐ½Ð¸ÐºÐ¸",uk:"ÐžÐ´Ð½Ð¾ÐºÐ»Ð°ÑÐ½Ð¸ÐºÐ¸"},color:"#eb722e"}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=t.count={jsonp:{url:"https://api.pinterest.com/v1/urls/count.json?callback={callback}&url={url}",callback:function(e){return e.count}}};t.default={config:{shareUrl:"https://pinterest.com/pin/create/button/?url={url}&media={image}&description={title}",count:o},popupDimensions:[800,520],i18n:{az:"Pinterest",be:"Pinterest",en:"Pinterest",hy:"Pinterest",ka:"Pinterest",kk:"Pinterest",ro:"Pinterest",ru:"Pinterest",tr:"Pinterest",tt:"Pinterest",uk:"Pinterest"},color:"#c20724"}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=t.count={jsonp:{url:"https://vk.com/share.php?act=count&index=0&url={url}",mount:function(e,t){e.VK={Share:{count:function(e,n){t(n)}}}}}};t.default={config:{shareUrl:"https://vk.com/share.php?url={url}&title={title}&description={description}&image={image}",count:o},popupDimensions:[550,420],i18n:{az:"Ð’ÐšÐ¾Ð½Ñ‚Ð°ÐºÑ‚Ðµ",be:"Ð’ÐšÐ¾Ð½Ñ‚Ð°ÐºÑ‚Ðµ",en:"VKontakte",hy:"VKontakte",ka:"VKontakte",kk:"Ð’ÐšÐ¾Ð½Ñ‚Ð°ÐºÑ‚Ðµ",ro:"VKontakte",ru:"Ð’ÐšÐ¾Ð½Ñ‚Ð°ÐºÑ‚Ðµ",tr:"VKontakte",tt:"Ð’ÐšÐ¾Ð½Ñ‚Ð°ÐºÑ‚Ðµ",uk:"Ð’ÐšÐ¾Ð½Ñ‚Ð°ÐºÑ‚Ñ–"},color:"#48729e"}},function(e,t,n){"use strict";function o(e,t){var n=e.url,o=e.headers,i=void 0===o?{}:o,r=e.body,s=void 0===r?"":r,a=new XMLHttpRequest;a.open("POST",n,!0),Object.keys(i).forEach(function(e){a.setRequestHeader(e,i[e])}),a.onreadystatechange=function(){4===a.readyState&&200===a.status&&t(null,a.responseText)},a.send(s)}Object.defineProperty(t,"__esModule",{value:!0}),t.post=o},function(e,t,n){"use strict";function o(){var e={};return function(t){var n=t.valueOf(e);return void 0!==n&&n!==t&&n.identity===e?n:i(t,e)}}function i(e,t){var n={identity:t},o=e.valueOf,i=function(i){return i!==t||this!==e?o.apply(this,arguments):n};return e.valueOf=i,n}function r(e){if(e!==Object(e))throw new TypeError("value is not a non-null object");return e}e.exports="WeakMap"in window?window.WeakMap:function(){var e=o();return{get:function(t,n){var o=e(r(t));return{}.hasOwnProperty.call(o,"value")?o.value:n},set:function(t,n){e(r(t)).value=n},has:function(t){return"value"in e(t)},delete:function(t){return delete e(r(t)).value}}}},function(e,t,n){"use strict";function o(){var e=n(86);return e.keys().reduce(function(t,n){var o=n.match(/^\.\/(\w+)\.js/);return o&&(t[o[1]]=e(n).default),t},{})}function i(){return n(57)}function r(e){var t=n(87);return n(59)+Object.keys(e).map(function(n){return"\n.ya-share2__item_service_"+n+" .ya-share2__badge\n{\n    background-color: "+e[n].color+";\n}\n\n.ya-share2__item_service_"+n+" .ya-share2__icon\n{\n    background: url("+t("./"+n+".svg")+");\n}\n"}).join("")}Object.defineProperty(t,"__esModule",{value:!0}),t.loadPlugins=o,t.getFrameUrl=i,t.getCss=r},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(24),r=o(i),s=n(2),a=o(s),l={findInside:function(e,t){return e.querySelectorAll("."+r.default.stringify(t))},findOutside:function(e,t){return a.default.closest(e,r.default.stringify(t))},getMod:function(e,t){for(var n=0,o=e.classList.length;n<o;n+=1){var i=r.default.parse(e.classList[n]);if(i&&i.modName===t)return i.modVal}}};t.default=l},function(e,t){(function(t){e.exports=t}).call(t,{})},,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={metrika:{id:26812653},defaults:{hooks:{onready:function(){},onshare:function(){}},theme:{bare:!1,copy:"last",counter:!1,lang:"ru",limit:!1,nonce:"",popupPosition:"inner",popupDirection:"bottom",services:"collections,vkontakte,facebook,twitter",size:"m",direction:"horizontal"},i18n:{az:{copyLink:"ÆlaqÉ™",pressToCopy:"Press ctrl+C and Enter to copy"},be:{copyLink:"CÐ¿Ð°ÑÑ‹Ð»ÐºÐ°",pressToCopy:"Press ctrl+C and Enter to copy"},en:{copyLink:"Copy link",pressToCopy:"Press ctrl+C and Enter to copy"},hy:{copyLink:"Õ€Õ²Õ¸Ö‚Õ´",pressToCopy:"Press ctrl+C and Enter to copy"},ka:{copyLink:"áƒ‘áƒ›áƒ£áƒšáƒ˜",pressToCopy:"Press ctrl+C and Enter to copy"},kk:{copyLink:"Ð¡Ñ–Ð»Ñ‚ÐµÐ¼Ðµ",pressToCopy:"Press ctrl+C and Enter to copy"},ro:{copyLink:"Link",pressToCopy:"Press ctrl+C and Enter to copy"},ru:{copyLink:"Ð¡ÐºÐ¾Ð¿Ð¸Ñ€Ð¾Ð²Ð°Ñ‚ÑŒ ÑÑÑ‹Ð»ÐºÑƒ",pressToCopy:"Ð§Ñ‚Ð¾Ð±Ñ‹ ÑÐºÐ¾Ð¿Ð¸Ñ€Ð¾Ð²Ð°Ñ‚ÑŒ, Ð½Ð°Ð¶Ð¼Ð¸Ñ‚Ðµ ctrl+Ð¡ Ð¸ enter"},tr:{copyLink:"BaÄŸlantÄ±",pressToCopy:"Press ctrl+C and Enter to copy"},tt:{copyLink:"Ð¡Ñ‹Ð»Ñ‚Ð°Ð¼Ð°",pressToCopy:"Press ctrl+C and Enter to copy"},uk:{copyLink:"ÐŸÐ¾ÑÐ¸Ð»Ð°Ð½Ð½Ñ",pressToCopy:"Press ctrl+C and Enter to copy"}},content:{template:"default",description:"",image:"",title:window.document.title,url:window.location.href},contentByService:{}}}},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function i(e){return function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return"string"==typeof t&&(t=u.default.toArray(document.querySelectorAll(t))),Array.isArray(t)||(t=[t]),!1===n.reinit&&(t=t.filter(function(e){return!m.default.getMod(e,"inited")})),t.map(function(t){var o=new l.default(t,(0,s.default)({options:n},e));return o.isBare()||v||(_.injectCss((0,p.getCss)(e.plugins),{nonce:o.getNonce()}),v=!0),o})}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=i;var r=n(4),s=o(r),a=n(54),l=o(a),c=n(2),u=o(c),p=n(15),f=n(0),h=o(f),d=n(16),m=o(d),_=new h.default(window.document),v=!1},,function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){},n="function"==typeof window.jQuery;try{window["yaCounter"+e]=new window.Ya.Metrika({id:e,trackLinks:!0,accurateTrackBounce:!0,params:{jquery:n,version:n&&window.jQuery().jquery,shareVersion:2}}),t()}catch(e){}}function r(e){var t="yandex_metrika_callbacks";window[t]=window[t]||[],window[t].push(e)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=n(0),l=function(){function e(t){o(this,e),this._id=t}return s(e,[{key:"init",value:function(){var e=this;if(window.Ya&&"Metrika"in window.Ya)i(this._id);else{var t=(0,a.injectJs)("https://mc.yandex.ru/metrika/watch.js");r(function(){i(e._id,function(){return t&&t.parentNode.removeChild(t)})})}}},{key:"getCounter",value:function(){return window["yaCounter"+this._id]}}]),e}();t.default=l},function(e,t,n){"use strict";/*!
 * contentloaded.js
 *
 * Author: Diego Perini (diego.perini at gmail.com)
 * Summary: cross-browser wrapper for DOMContentLoaded
 * Updated: 20101020
 * License: MIT
 * Version: 1.2
 *
 * URL:
 * http://javascript.nwbox.com/ContentLoaded/
 * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
 *
 */
	function o(e,t){function n(o){"readystatechange"===o.type&&"complete"!==s.readyState||(("load"===o.type?e:s)[u](p+o.type,n,!1),i||(i=!0,t.call(e,o.type||o)))}function o(){try{a.doScroll("left")}catch(e){return void setTimeout(o,50)}n("poll")}var i=!1,r=!0,s=e.document,a=s.documentElement,l=s.addEventListener,c=l?"addEventListener":"attachEvent",u=l?"removeEventListener":"detachEvent",p=l?"":"on";if("complete"===s.readyState)t.call(e,"lazy");else{if(!l&&a.doScroll){try{r=!e.frameElement}catch(e){}r&&o()}s[c](p+"DOMContentLoaded",n,!1),s[c](p+"readystatechange",n,!1),e[c](p+"load",n,!1)}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=o},function(e,t,n){"use strict";(function(o){var i,r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(o){function s(e){function t(e){return _.test(e)}function n(e){var t=_.exec(e);if(t){var n={block:t[1]||t[4]},o=t[5],i=t[2]||t[6];if(o&&(n.elem=o),i){var r=t[3]||t[7];n.modName=i,n.modVal=r||!0}return n}}function o(e){if(e&&e.block){var t=e.block;if(e.elem&&(t+=m.elem+e.elem),e.modName){var n=e.modVal;!n&&0!==n&&e.hasOwnProperty("modVal")||(t+=m.mod.name+e.modName),n&&!0!==n&&(t+=m.mod.val+n)}return t}}function i(e){if("string"==typeof e&&(e=n(e)),e&&e.block){var t=e.modName,o=t&&(e.modVal||!e.hasOwnProperty("modVal"));if(e.elem){if(o)return c.ELEM_MOD;if(!t)return c.ELEM}return o?c.BLOCK_MOD:t?void 0:c.BLOCK}}function r(e){return i(e)===c.BLOCK}function s(e){return i(e)===c.BLOCK_MOD}function u(e){return i(e)===c.ELEM}function f(e){return i(e)===c.ELEM_MOD}var h=a(e),d=JSON.stringify(h);if(p[d])return p[d];var m=h.delims,_=l(m,h.wordPattern),v={validate:t,typeOf:i,isBlock:r,isBlockMod:s,isElem:u,isElemMod:f,parse:n,stringify:o,elemDelim:m.elem,modDelim:m.mod.name,modValDelim:m.mod.val};return p[d]=v,v}function a(e){if(e||(e={}),"string"==typeof e){var t=u[e];if(!t)throw new Error("The `"+e+"` naming is unknown.");return t}var n=u.origin,o=n.delims,i=o.mod,r=e.mod||o.mod;return{delims:{elem:e.elem||o.elem,mod:"string"==typeof r?{name:r,val:r}:{name:r.name||i.name,val:r.val||r.name||i.val}},wordPattern:e.wordPattern||n.wordPattern}}function l(e,t){var n="("+t+")",o="(?:"+e.elem+"("+t+"))?",i="(?:"+e.mod.name+"("+t+"))?",r="(?:"+e.mod.val+"("+t+"))?",s=i+r;return new RegExp("^"+n+s+"$|^"+n+o+s+"$")}var c={BLOCK:"block",BLOCK_MOD:"blockMod",ELEM:"elem",ELEM_MOD:"elemMod"},u={origin:{delims:{elem:"__",mod:{name:"_",val:"_"}},wordPattern:"[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*"},"two-dashes":{delims:{elem:"__",mod:{name:"--",val:"_"}},wordPattern:"[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*"}},p={},f=!0,h=["validate","typeOf","isBlock","isBlockMod","isElem","isElemMod","parse","stringify","elemDelim","modDelim","modValDelim"],d=s();h.forEach(function(e){s[e]=d[e]}),"object"===r(t)&&(e.exports=s,f=!1),"object"===("undefined"==typeof modules?"undefined":r(modules))&&(modules.define("bem-naming",function(e){e(s)}),f=!1),void 0!==(i=function(e,t,n){n.exports=s}.call(t,n,t,e))&&(e.exports=i),f=!1,f&&(o.bemNaming=s)}("undefined"!=typeof window?window:o)}).call(t,n(5))},function(e,t,n){"use strict";var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i=function(){function e(){this._shortTags={};for(var e=0;e<t.length;e++)this._shortTags[t[e]]=1;this._optJsAttrName="onclick",this._optJsAttrIsJs=!0,this._optJsCls="i-bem",this._optJsElem=!0,this._optEscapeContent=!0,this._optNobaseMods=!1,this._optDelimElem="__",this._optDelimMod="_"}e.prototype={toHtml:function(e){this._buf="",this._html(e);var t=this._buf;return delete this._buf,t},_html:function(e){var t,a,l;if(!1!==e&&null!=e)if("object"!==(void 0===e?"undefined":o(e)))this._buf+=this._optEscapeContent?n(e):e;else if(Array.isArray(e))for(t=0,a=e.length;t<a;t++)!1!==(l=e[t])&&null!=l&&this._html(l);else{if(e.toHtml){var c=e.toHtml.call(this,e)||"";return void(this._buf+=c)}var u=!1!==e.bem;if(void 0!==e.tag&&!e.tag)return void(e.html?this._buf+=e.html:this._html(e.content));e.mix&&!Array.isArray(e.mix)&&(e.mix=[e.mix]);var p,f,h,d="",m="",_=!1;if(p=e.attrs)for(t in p)f=p[t],!0===f?m+=" "+t:!1!==f&&null!==f&&void 0!==f&&(m+=" "+t+'="'+i(f)+'"');if(u){var v=e.block+(e.elem?this._optDelimElem+e.elem:"");e.block&&(d=s(e,v,null,this._optNobaseMods,this._optDelimMod),e.js&&((h={})[v]=!0===e.js?{}:e.js));var y=this._optJsCls&&(this._optJsElem||!e.elem),g=e.mix;if(g&&g.length)for(t=0,a=g.length;t<a;t++){var b=g[t];if(b&&!1!==b.bem){var k=b.block||e.block||"",w=b.elem||(b.block?null:e.block&&e.elem),x=k+(w?this._optDelimElem+w:"");k&&(d+=s(b,x,v,this._optNobaseMods,this._optDelimMod),b.js&&((h=h||{})[x]=!0===b.js?{}:b.js,_=!0,y||(y=k&&this._optJsCls&&(this._optJsElem||!w))))}}if(h){y&&(d+=" "+this._optJsCls);var C=_||!0!==e.js?r(JSON.stringify(h)):'{"'+v+'":{}}';m+=" "+(e.jsAttr||this._optJsAttrName)+"='"+(this._optJsAttrIsJs?"return "+C:C)+"'"}}e.cls&&(d=(d?d+" ":"")+i(e.cls).trim());var j=e.tag||"div";this._buf+="<"+j+(d?' class="'+d+'"':"")+(m||""),this._shortTags[j]?this._buf+="/>":(this._buf+=">",e.html?this._buf+=e.html:this._html(e.content),this._buf+="</"+j+">")}}};var t="area base br col command embed hr img input keygen link menuitem meta param source track wbr".split(" "),n=e.prototype.xmlEscape=function(e){return(e+"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},i=e.prototype.attrEscape=function(e){return(e+"").replace(/&/g,"&amp;").replace(/"/g,"&quot;")},r=e.prototype.jsAttrEscape=function(e){return(e+"").replace(/&/g,"&amp;").replace(/'/g,"&#39;")},s=function(e,t,n,o,i){var r,s,a,l="";if(n!==t&&(n&&(l+=" "),l+=t),r=e.elem&&e.elemMods||e.mods)for(a in r)((s=r[a])||0===s)&&(l+=" "+(o?i:t+i)+a+(!0===s?"":i+s));return l};return e}();e.exports=i},function(e,t,n){"use strict";function o(e){for(var t=e.split("."),n=[],o=0;o<t.length;o++){for(var i=t[o];"\\"===i[i.length-1]&&void 0!==t[o+1];)i=i.slice(0,-1)+".",i+=t[++o];n.push(i)}return n}var i=n(27);e.exports={get:function(e,t,n){if(!i(e)||"string"!=typeof t)return void 0===n?e:n;for(var r=o(t),s=0;s<r.length;s++){if(!Object.prototype.propertyIsEnumerable.call(e,r[s]))return n;if(void 0===(e=e[r[s]])||null===e){if(s!==r.length-1)return n;break}}return e},set:function(e,t,n){if(i(e)&&"string"==typeof t)for(var r=o(t),s=0;s<r.length;s++){var a=r[s];i(e[a])||(e[a]={}),s===r.length-1&&(e[a]=n),e=e[a]}},delete:function(e,t){if(i(e)&&"string"==typeof t)for(var n=o(t),r=0;r<n.length;r++){var s=n[r];if(r===n.length-1)return void delete e[s];if(e=e[s],!i(e))return}},has:function(e,t){if(!i(e)||"string"!=typeof t)return!1;for(var n=o(t),r=0;r<n.length;r++){if(!i(e))return!1;if(!(n[r]in e))return!1;e=e[n[r]]}return!0}}},function(e,t,n){"use strict";var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};e.exports=function(e){var t=void 0===e?"undefined":o(e);return null!==e&&("object"===t||"function"===t)}},function(e,t,n){"use strict";(function(e,o){var i,r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(s){function a(e){throw new RangeError(T[e])}function l(e,t){for(var n=e.length,o=[];n--;)o[n]=t(e[n]);return o}function c(e,t){var n=e.split("@"),o="";return n.length>1&&(o=n[0]+"@",e=n[1]),e=e.replace(D,"."),o+l(e.split("."),t).join(".")}function u(e){for(var t,n,o=[],i=0,r=e.length;i<r;)t=e.charCodeAt(i++),t>=55296&&t<=56319&&i<r?(n=e.charCodeAt(i++),56320==(64512&n)?o.push(((1023&t)<<10)+(1023&n)+65536):(o.push(t),i--)):o.push(t);return o}function p(e){return l(e,function(e){var t="";return e>65535&&(e-=65536,t+=U(e>>>10&1023|55296),e=56320|1023&e),t+=U(e)}).join("")}function f(e){return e-48<10?e-22:e-65<26?e-65:e-97<26?e-97:j}function h(e,t){return e+22+75*(e<26)-((0!=t)<<5)}function d(e,t,n){var o=0;for(e=n?I(e/M):e>>1,e+=I(e/t);e>B*z>>1;o+=j)e=I(e/B);return I(o+(B+1)*e/(e+O))}function m(e){var t,n,o,i,r,s,l,c,u,h,m=[],_=e.length,v=0,y=S,g=P;for(n=e.lastIndexOf(A),n<0&&(n=0),o=0;o<n;++o)e.charCodeAt(o)>=128&&a("not-basic"),m.push(e.charCodeAt(o));for(i=n>0?n+1:0;i<_;){for(r=v,s=1,l=j;i>=_&&a("invalid-input"),c=f(e.charCodeAt(i++)),(c>=j||c>I((C-v)/s))&&a("overflow"),v+=c*s,u=l<=g?E:l>=g+z?z:l-g,!(c<u);l+=j)h=j-u,s>I(C/h)&&a("overflow"),s*=h;t=m.length+1,g=d(v-r,t,0==r),I(v/t)>C-y&&a("overflow"),y+=I(v/t),v%=t,m.splice(v++,0,y)}return p(m)}function _(e){var t,n,o,i,r,s,l,c,p,f,m,_,v,y,g,b=[];for(e=u(e),_=e.length,t=S,n=0,r=P,s=0;s<_;++s)(m=e[s])<128&&b.push(U(m));for(o=i=b.length,i&&b.push(A);o<_;){for(l=C,s=0;s<_;++s)(m=e[s])>=t&&m<l&&(l=m);for(v=o+1,l-t>I((C-n)/v)&&a("overflow"),n+=(l-t)*v,t=l,s=0;s<_;++s)if(m=e[s],m<t&&++n>C&&a("overflow"),m==t){for(c=n,p=j;f=p<=r?E:p>=r+z?z:p-r,!(c<f);p+=j)g=c-f,y=j-f,b.push(U(h(f+g%y,0))),c=I(g/y);b.push(U(h(c,0))),r=d(n,v,o==i),n=0,++o}++n,++t}return b.join("")}function v(e){return c(e,function(e){return L.test(e)?m(e.slice(4).toLowerCase()):e})}function y(e){return c(e,function(e){return F.test(e)?"xn--"+_(e):e})}var g="object"==r(t)&&t&&!t.nodeType&&t,b="object"==r(e)&&e&&!e.nodeType&&e,k="object"==(void 0===o?"undefined":r(o))&&o;k.global!==k&&k.window!==k&&k.self!==k||(s=k);var w,x,C=2147483647,j=36,E=1,z=26,O=38,M=700,P=72,S=128,A="-",L=/^xn--/,F=/[^\x20-\x7E]/,D=/[\x2E\u3002\uFF0E\uFF61]/g,T={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},B=j-E,I=Math.floor,U=String.fromCharCode;if(w={version:"1.4.1",ucs2:{decode:u,encode:p},decode:m,encode:_,toASCII:y,toUnicode:v},"object"==r(n(17))&&n(17))void 0!==(i=function(){return w}.call(t,n,t,e))&&(e.exports=i);else if(g&&b)if(e.exports==g)b.exports=w;else for(x in w)w.hasOwnProperty(x)&&(g[x]=w[x]);else s.punycode=w}(void 0)}).call(t,n(29)(e),n(5))},function(e,t,n){"use strict";e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={config:{shareUrl:"https://www.blogger.com/blog-this.g?t={description}&u={url}&n={title}"},popupDimensions:[800,320],i18n:{az:"Blogger",be:"Blogger",en:"Blogger",hy:"Blogger",ka:"Blogger",kk:"Blogger",ro:"Blogger",ru:"Blogger",tr:"Blogger",tt:"Blogger",uk:"Blogger"},color:"#fb8f3d"}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={config:{shareUrl:"https://collections.yandex.ru/share/?url={url}&image={image}&description={title}"},popupDimensions:[994,576],i18n:{az:"Yandex.Collections",be:"Ð¯Ð½Ð´ÑÐºÑ.ÐšÐ°Ð»ÐµÐºÑ†Ñ‹i",en:"Yandex.Collections",hy:"Yandex.Collections",ka:"Yandex.Collections",kk:"Yandex.Collections",ro:"Yandex.Collections",ru:"Ð¯Ð½Ð´ÐµÐºÑ.ÐšÐ¾Ð»Ð»ÐµÐºÑ†Ð¸Ð¸",tr:"Yandex.Collections",tt:"Yandex.Collections",uk:"Yandex.Collections"},color:"#eb1c00"}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={config:{shareUrl:"https://www.delicious.com/save?v=5&noui&jump=close&url={url}&title={title}"},popupDimensions:[800,520],i18n:{az:"Delicious",be:"Delicious",en:"Delicious",hy:"Delicious",ka:"Delicious",kk:"Delicious",ro:"Delicious",ru:"Delicious",tr:"Delicious",tt:"Delicious",uk:"Delicious"},color:"#31a9ff"}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={config:{shareUrl:"https://digg.com/submit?url={url}&title={title}&bodytext={description}"},popupDimensions:[800,520],i18n:{az:"Digg",be:"Digg",en:"Digg",hy:"Digg",ka:"Digg",kk:"Digg",ro:"Digg",ru:"Digg",tr:"Digg",tt:"Digg",uk:"Digg"},color:"#000"}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={config:{shareUrl:"https://www.evernote.com/clip.action?title={title}&body={description}&url={url}"},popupDimensions:[800,520],i18n:{az:"Evernote",be:"Evernote",en:"Evernote",hy:"Evernote",ka:"Evernote",kk:"Evernote",ro:"Evernote",ru:"Evernote",tr:"Evernote",tt:"Evernote",uk:"Evernote"},color:"#24d666"}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={config:{shareUrl:"https://www.livejournal.com/update.bml?subject={title}&event={url}%0A{description}"},popupDimensions:[800,520],i18n:{az:"LiveJournal",be:"LiveJournal",en:"LiveJournal",hy:"LiveJournal",ka:"LiveJournal",kk:"LiveJournal",ro:"LiveJournal",ru:"LiveJournal",tr:"LiveJournal",tt:"LiveJournal",uk:"LiveJournal"},color:"#0d425a"}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={config:{shareUrl:"https://getpocket.com/save?url={url}&title={title}"},popupDimensions:[800,520],i18n:{az:"Pocket",be:"Pocket",en:"Pocket",hy:"Pocket",ka:"Pocket",kk:"Pocket",ro:"Pocket",ru:"Pocket",tr:"Pocket",tt:"Pocket",uk:"Pocket"},color:"#ee4056"}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={config:{shareUrl:"http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={url}&title={title}&pics={image}"},popupDimensions:[800,520],i18n:{az:"Qzone",be:"Qzone",en:"Qzone",hy:"Qzone",ka:"Qzone",kk:"Qzone",ro:"Qzone",ru:"Qzone",tr:"Qzone",tt:"Qzone",uk:"Qzone"},color:"#f5b53c"}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={config:{shareUrl:"https://www.reddit.com/submit?url={url}&title={title}"},popupDimensions:[800,520],i18n:{az:"reddit",be:"reddit",en:"reddit",hy:"reddit",ka:"reddit",kk:"reddit",ro:"reddit",ru:"reddit",tr:"reddit",tt:"reddit",uk:"reddit"},color:"#ff4500"}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={config:{shareUrl:"http://widget.renren.com/dialog/share?resourceUrl={url}&srcUrl={url}&title={title}&pic={image}&description={description}"},popupDimensions:[800,520],i18n:{az:"Renren",be:"Renren",en:"Renren",hy:"Renren",ka:"Renren",kk:"Renren",ro:"Renren",ru:"Renren",tr:"Renren",tt:"Renren",uk:"Renren"},color:"#1760a7"}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={config:{shareUrl:"http://service.weibo.com/share/share.php?url={url}&type=3&pic={image}&title={title}"},popupDimensions:[800,520],i18n:{az:"Sina Weibo",be:"Sina Weibo",en:"Sina Weibo",hy:"Sina Weibo",ka:"Sina Weibo",kk:"Sina Weibo",ro:"Sina Weibo",ru:"Sina Weibo",tr:"Sina Weibo",tt:"Sina Weibo",uk:"Sina Weibo"},color:"#c53220"}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={config:{shareUrl:"https://web.skype.com/share?url={url}"},popupDimensions:[800,520],i18n:{az:"Skype",be:"Skype",en:"Skype",hy:"Skype",ka:"Skype",kk:"Skype",ro:"Skype",ru:"Skype",tr:"Skype",tt:"Skype",uk:"Skype"},color:"#00aff0"}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={config:{shareUrl:"https://surfingbird.ru/share?url={url}&title={title}&desc={description}"},popupDimensions:[500,170],i18n:{az:"Surfingbird",be:"Surfingbird",en:"Surfingbird",hy:"Surfingbird",ka:"Surfingbird",kk:"Surfingbird",ro:"Surfingbird",ru:"Surfingbird",tr:"Surfingbird",tt:"Surfingbird",uk:"Surfingbird"},color:"#30baff"}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={config:{shareUrl:"https://telegram.me/share/url?url={url}&text={title}"},i18n:{az:"telegram",be:"telegram",en:"telegram",hy:"telegram",ka:"telegram",kk:"telegram",ro:"telegram",ru:"telegram",tr:"telegram",tt:"telegram",uk:"telegram"},color:"#64a9dc"}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={config:{shareUrl:"http://share.v.t.qq.com/index.php?c=share&a=index&url={url}&title={title}&pic={image}"},popupDimensions:[800,520],i18n:{az:"Tencent Weibo",be:"Tencent Weibo",en:"Tencent Weibo",hy:"Tencent Weibo",ka:"Tencent Weibo",kk:"Tencent Weibo",ro:"Tencent Weibo",ru:"Tencent Weibo",tr:"Tencent Weibo",tt:"Tencent Weibo",uk:"Tencent Weibo"},color:"#53a9d7"}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={config:{shareUrl:"https://www.tumblr.com/share/link?url={url}&description={description}"},popupDimensions:[800,520],i18n:{az:"Tumblr",be:"Tumblr",en:"Tumblr",hy:"Tumblr",ka:"Tumblr",kk:"Tumblr",ro:"Tumblr",ru:"Tumblr",tr:"Tumblr",tt:"Tumblr",uk:"Tumblr"},color:"#547093"}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={config:{shareUrl:"https://twitter.com/intent/tweet?text={title}&url={url}&hashtags={hashtags}"},contentOptions:{hashtags:""},popupDimensions:[550,420],i18n:{az:"Twitter",be:"Twitter",en:"Twitter",hy:"Twitter",ka:"Twitter",kk:"Twitter",ro:"Twitter",ru:"Twitter",tr:"Twitter",tt:"Twitter",uk:"Twitter"},color:"#00aced"}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={config:{shareUrl:"viber://forward?text={title}%20{url}"},i18n:{az:"Viber",be:"Viber",en:"Viber",hy:"Viber",ka:"Viber",kk:"Viber",ro:"Viber",ru:"Viber",tr:"Viber",tt:"Viber",uk:"Viber"},color:"#7b519d"}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={config:{shareUrl:"whatsapp://send?text={title}%20{url}"},i18n:{az:"WhatsApp",be:"WhatsApp",en:"WhatsApp",hy:"WhatsApp",ka:"WhatsApp",kk:"WhatsApp",ro:"WhatsApp",ru:"WhatsApp",tr:"WhatsApp",tt:"WhatsApp",uk:"WhatsApp"},color:"#65bc54"}},,function(e,t,n){"use strict";function o(e){var t=document.createElement("input");return t.setAttribute("type","text"),t.setAttribute("value",e),t.style.position="absolute",t.style.left="-9999px",document.body.appendChild(t),t}function i(){try{return document.execCommand("copy")}catch(e){return!1}}function r(e,t){var n=o(e);n.select();var r=i();a.default.remove(n),r||t(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.copy=i,t.clip=r;var s=n(2),a=function(e){return e&&e.__esModule?e:{default:e}}(s)},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){var n=(0,d.default)(!0,{},e,{contentByService:{}});return Object.keys(t).forEach(function(e){var o=t[e];Object.keys(o).forEach(function(t){var i="contentByService."+e+"."+t,r=o[t];_.default.set(n,i,r)})}),n}function s(e){var t={};return Object.keys(e).forEach(function(n){var o=n.split(":"),i=p(o,2),r=i[0],s=i[1],l=y[r]||y._defaults,c=l.group,u=l.type,f=a(u,e[n]),h=void 0;if(s){if("content"!==c)return;h="contentByService."+s+"."+r}else h=c+"."+r;_.default.set(t,h,f)}),t}function a(e,t){switch(e){case"boolean":return void 0!==t;default:return t}}function l(e,t){var n={};return Object.keys(e).forEach(function(o){var i=e[o];if("object"===(void 0===i?"undefined":u(i))&&null!==i)if("contentByService"===o){var r=i;Object.keys(r).forEach(function(e){var o=r[e];"object"===(void 0===i?"undefined":u(i))&&null!==i&&Object.keys(o).forEach(function(i){var r=o[i],s="contentByService."+e+"."+i;void 0===_.default.get(t,"content."+i)&&void 0===_.default.get(t,"contentByService."+e+"."+i)||_.default.set(n,s,r)})})}else{var s=i;Object.keys(s).forEach(function(e){var i=s[e],r=o+"."+e;void 0!==_.default.get(t,o+"."+e)&&_.default.set(n,r,i)})}}),n}function c(e,t,n){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},i=r(t,e),a=s(n),c=l(a,i),u=l(o,i);return new v(i,c,u)}Object.defineProperty(t,"__esModule",{value:!0}),t.Storage=void 0;var u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},p=function(){function e(e,t){var n=[],o=!0,i=!1,r=void 0;try{for(var s,a=e[Symbol.iterator]();!(o=(s=a.next()).done)&&(n.push(s.value),!t||n.length!==t);o=!0);}catch(e){i=!0,r=e}finally{try{!o&&a.return&&a.return()}finally{if(i)throw r}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),f=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();t.createSchema=r,t.fromDataset=s,t.applyWhitelist=l,t.default=c;var h=n(4),d=o(h),m=n(26),_=o(m),v=t.Storage=function(){function e(){i(this,e);for(var t=arguments.length,n=Array(t),o=0;o<t;o++)n[o]=arguments[o];this._options=d.default.apply(void 0,[!0,{}].concat(n))}return f(e,[{key:"merge",value:function(e){(0,d.default)(!0,this._options,e)}},{key:"get",value:function(e,t){if(t&&e.match(/^content\./)){var n=e.replace(/^content\./,"contentByService."+t+"."),o=_.default.get(this._options,n);if(void 0!==o)return o}return _.default.get(this._options,e)}}]),e}(),y={_defaults:{group:"content",type:"string"},bare:{group:"theme",type:"boolean"},copy:{group:"theme",type:"string"},counter:{group:"theme",type:"boolean"},lang:{group:"theme",type:"string"},limit:{group:"theme",type:"string"},nonce:{group:"theme",type:"string"},popupPosition:{group:"theme",type:"string"},popupDirection:{group:"theme",type:"string"},services:{group:"theme",type:"string"},size:{group:"theme",type:"string"},direction:{group:"theme",type:"string"}}},function(e,t,n){"use strict";function o(e,t,n){var o=""+e+Date.now(),r=i(n,2),s=r[0],a=r[1],l={scrollbars:1,resizable:1,menubar:0,toolbar:0,status:0,left:(screen.width-s)/2,top:(screen.height-a)/2,width:s,height:a},c=Object.keys(l).map(function(e){return e+"="+l[e]}).join(","),u=window.open(t,o,c);u&&u.focus()}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){var n=[],o=!0,i=!1,r=void 0;try{for(var s,a=e[Symbol.iterator]();!(o=(s=a.next()).done)&&(n.push(s.value),!t||n.length!==t);o=!0);}catch(e){i=!0,r=e}finally{try{!o&&a.return&&a.return()}finally{if(i)throw r}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();t.open=o},function(e,t,n){"use strict";(function(e){function o(t){var n=new e(t),o=n.host;return n.href.replace(o,(0,i.toASCII)(o))}Object.defineProperty(t,"__esModule",{value:!0}),t.default=o;var i=n(28)}).call(t,n(58))},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e){return Object.keys(e).reduce(function(t,n){var o=e[n];return o.contentOptions&&(t[n]=o.contentOptions),t},{})}Object.defineProperty(t,"__esModule",{value:!0});var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=n(55),c=o(l),u=n(1),p=n(53),f=o(p),h=n(52),d=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(h),m=n(16),_=o(m),v=n(50),y=n(2),g=o(y),b=n(51),k=o(b),w=n(3),x=o(w),C=function(){function e(t,n){i(this,e);var o=n.plugins,s=n.defaults,a=n.options,l=n.frameUrl,c=n.metrika,u=r(o),p="ya-share2."+Math.random(),f=new x.default(window,p);this._params=n,this._domNode=t,this._messenger=f,this._namespace=p,this._plugins=o,this._options=(0,k.default)(u,s,t.dataset,a);var h=this._options.get("theme.lang");this._i18n=this._options.get("i18n."+h),this._initLayout(o,l,p),this._bindEvents(f,c),t.classList.add("ya-share2"),t.classList.add("ya-share2_inited"),this._morePopup=_.default.findInside(this._domNode,{block:"ya-share2",elem:"popup"})[0],"outer"===this._options.get("theme.popupPosition")&&this._moveMorePopupOutside(),this._options.get("hooks.onready").call(this)}return a(e,[{key:"_isDestroyed",value:function(){return null===this._domNode}},{key:"_moveMorePopupOutside",value:function(){var e=_.default.findInside(this._domNode,{block:"ya-share2",elem:"container"})[0];this._morePopupContainer=document.createElement("div"),this._morePopupContainer.style.position="absolute",this._morePopupContainer.style["pointer-events"]="none",this._morePopup.style["pointer-events"]="all",this._morePopupContainer.className=e.className,this._morePopupContainer.appendChild(this._morePopup),document.body.appendChild(this._morePopupContainer)}},{key:"updateContent",value:function(e){if(this._isDestroyed())throw new Error("Could not operate on destroyed block.");this._options.merge({content:e}),this._initLayout(this._params.plugins,this._params.frameUrl,this._namespace)}},{key:"updateContentByService",value:function(e){if(this._isDestroyed())throw new Error("Could not operate on destroyed block.");this._options.merge({contentByService:e}),this._initLayout(this._params.plugins,this._params.frameUrl,this._namespace)}},{key:"destroy",value:function(){this._domNode.classList.remove("ya-share2_inited"),this._domNode.innerHTML="",this._domNode=null,this._morePopupContainer&&(g.default.remove(this._morePopupContainer),this._morePopupContainer=null),this._messenger.unsubscribe(this),document.body.removeEventListener("click",this._onBodyClick),document.body.removeEventListener("keydown",this._onKeydown)}},{key:"_getContentForService",value:function(e){var t=this,n=function(n){return t._options.get(n,e)},o={title:n("content.title"),description:n("content.description"),image:n("content.image"),url:n("content.url")},i=this._plugins[e].contentOptions||{};return Object.keys(i).forEach(function(e){o[e]=n("content."+e)}),o}},{key:"_initLayout",value:function(e,t,n){var o=this;this._services=this._options.get("theme.services").split(",").filter(function(t){return e[t]}).map(function(t){var n=function(e){return o._options.get(e,t)},i=e[t].config.shareUrl;if("object"===(void 0===i?"undefined":s(i))){i=i[n("content.template")]||i.default}i+="&utm_source=share2";var r=o._getContentForService(t);return{name:t,title:e[t].i18n[n("theme.lang")],location:(0,u.applyTemplate)(i,r),hasCounter:Boolean(e[t].config.count),popupDimensions:e[t].popupDimensions}}),(0,c.default)(this._i18n).update(this._domNode,"container",[{urls:{content:this._options.get("content.url"),frame:t},theme:this._options.get("theme"),services:this._services,namespace:n}]),this._frame=this._domNode.getElementsByTagName("iframe")[0]}},{key:"getNonce",value:function(){return this._options.get("theme.nonce")}},{key:"_bindEvents",value:function(e,t){var n=this;this._onBodyClick=this._onBodyClick.bind(this,t),this._onKeydown=this._onKeydown.bind(this),document.body.addEventListener("click",this._onBodyClick),document.body.addEventListener("keydown",this._onKeydown),e.subscribe(this,function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if("init"===e)n._messenger.publish("counter",{services:n._prepareServicesForFrame(),url:n._options.get("content.url")},n._frame.contentWindow);else if("counter"===e){var o=t.service,i=t.count;n.setCount(o,i)}})}},{key:"_prepareServicesForFrame",value:function(){var e=this;return this._services.reduce(function(t,n){var o=n.name,i=e._getContentForService(o),r=i.url;return t[o]={url:(0,f.default)(r)},t},{})}},{key:"_onKeydown",value:function(e){switch(e.which||e.keyCode){case 27:this._closePopup()}}},{key:"_onBodyClick",value:function(e,t){var n=g.default.getTarget(t),o=_.default.findOutside(n,{block:"ya-share2",elem:"container"}),i=_.default.findInside(this._domNode,{block:"ya-share2",elem:"container"})[0];if(!o||o!==i&&o!==this._morePopupContainer)return void this._closePopup();var r=_.default.findOutside(n,{block:"ya-share2",elem:"item"});return r?_.default.getMod(r,"more")?void this._onMoreClick(t):_.default.getMod(r,"copy")?void this._onCopyClick(t):void this._onServiceClick(t,r,e):void 0}},{key:"_onCopyClick",value:function(e){var t=this;this._morePopup.classList.contains("ya-share2__popup_clipboard")&&(this._closePopup(),(0,v.clip)(this._options.get("content.url"),function(e){prompt(t._i18n.pressToCopy,e)})),e.preventDefault(),e.stopPropagation()}},{key:"_onMoreClick",value:function(e){if((0,v.copy)()?this._morePopup.classList.add("ya-share2__popup_clipboard"):this._morePopup.classList.remove("ya-share2__popup_clipboard"),this._morePopupContainer){var t=_.default.findInside(this._domNode,{block:"ya-share2",elem:"item",modName:"more"})[0],n=g.default.getRectRelativeToDocument(t),o=n.top,i=n.left,r=n.width,s=n.height;this._morePopupContainer.style.top=o+"px",this._morePopupContainer.style.left=i+"px",this._morePopupContainer.style.width=r+"px",this._morePopupContainer.style.height=s+"px"}this._morePopup.classList.toggle("ya-share2__popup_visible"),e.preventDefault(),e.stopPropagation()}},{key:"_onServiceClick",value:function(e,t,n){this._closePopup();var o=_.default.getMod(t,"service");if(o){var i=this._services.filter(function(e){return e.name===o})[0];if(i&&(this._options.get("hooks.onshare").call(this,i.name),!this._isDestroyed())){if(this.setCount(i.name),i.popupDimensions){var r=_.default.findInside(t,{block:"ya-share2",elem:"link"})[0];e.preventDefault(),e.stopPropagation(),d.open("ya-share2",r.href,i.popupDimensions)}var s=_.default.findInside(this._domNode,{block:"ya-share2",elem:"item"}),a=[].indexOf.call(s,t);n.getCounter().reachGoal("BUTTON_CLICK",{serviceName:o,buttonIndex:a})}}}},{key:"setCount",value:function(e,t){if(this._options.get("theme.counter")){var n=_.default.findInside(this._domNode,{block:"ya-share2",elem:"item",modName:"service",modVal:e})[0];if(!n)return;var o=_.default.findInside(n,{block:"ya-share2",elem:"counter"})[0];if(!o)return;if(void 0===t){var i=parseInt(o.textContent||0,10);isNaN(i)&&(i=0),t=i+1}o.textContent=t,t>0?o.classList.add("ya-share2__counter_visible"):o.classList.remove("ya-share2__counter_visible")}}},{key:"isBare",value:function(){return Boolean(this._options.get("theme.bare"))}},{key:"_closePopup",value:function(){this._morePopup&&this._morePopup.classList.remove("ya-share2__popup_visible")}}]),e}();t.default=C},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function i(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function r(e){function t(e){for(var t=arguments.length,n=Array(t>1?t-1:0),i=1;i<t;i++)n[i-1]=arguments[i];return(0,a.default)({block:"ya-share2",elem:e},o[e].apply(o,n))}var n=new c.default,o={container:function(e){var n=e.urls,o=e.theme,r=e.services,s=e.namespace;return{mods:{size:o.size},content:[t("list",o.direction,r,o.limit,n.content,o.copy,o.popupDirection)].concat(i([o.nonce&&t("iframe-style",o.nonce),t("iframe",n.frame,s,{inlineStyle:!o.nonce})].filter(function(){return o.counter})))}},list:function(e,n){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:n.length,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",r=arguments[4],s=arguments[5];!1===o&&(o=n.length);var a=n.slice(0,o),l=n.slice(o);return{tag:"ul",mods:{direction:e},content:[a.map(function(e){return t("item",e)}),l.length>0&&t("item_more",l,i,r,s,e)]}},item:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{tag:"li",mods:{service:e.name},content:t("link",e)}},link:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.location,o=e.title,i=e.hasCounter;return{tag:"a",attrs:{href:n||"#",rel:n&&"nofollow",target:n&&"_blank",title:o},content:[t("badge",i),t("title",o)]}},badge:function(e){return{tag:"span",content:[t("icon"),e&&t("counter")]}},icon:function(){return{tag:"span"}},counter:function(){return{tag:"span"}},title:function(e){return{tag:"span",content:e}},item_more:function(e,n,o,i,r){return(0,a.default)(t("item"),{mods:{more:!0},content:[t("link_more"),t("popup",e,n,o,i,r)]})},link_more:function(){return(0,a.default)(t("link"),{mods:{more:!0},content:t("badge_more")})},badge_more:function(){return(0,a.default)(t("badge"),{mods:{more:!0},content:t("icon_more")})},icon_more:function(){return(0,a.default)(t("icon"),{mods:{more:!0}})},item_copy:function(e){return(0,a.default)(t("item"),{mods:{copy:!0},content:[t("link_copy"),t("input_copy",e)]})},link_copy:function(){return(0,a.default)(t("link"),{mods:{copy:!0},content:t("title",e.copyLink)})},input_copy:function(e){return{tag:"input",attrs:{value:e}}},popup:function(e,n){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"last",i=arguments[3],r=arguments[4],s=t("list","vertical",e);return"first"===o?s.content.unshift(t("item_copy",n)):"last"===o&&s.content.push(t("item_copy",n)),i="top"===i?"top":"bottom",r="vertical"===r?"vertical":"horizontal",{mods:{direction:i,"list-direction":r},content:s}},iframe:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=n.inlineStyle;return{tag:"iframe",attrs:{src:e+"?"+p.serializeParams({namespace:t}),style:o?"border: 0; display: none; position: absolute; left: -9999px;":null}}},"iframe-style":function(e){return{tag:"style",attrs:{nonce:e,scoped:!0},content:".ya-share2__iframe { border: 0; display: none; position: absolute; left: -9999px; }"}}};return{update:function(e,o){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];e.innerHTML=n.toHtml(t.apply(void 0,[o].concat(i(r))))}}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r;var s=n(4),a=o(s),l=n(25),c=o(l),u=n(1),p=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(u)},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r=n(19),s=o(r),a=n(15),l=n(22),c=o(l),u=n(20),p=o(u),f=n(23),h=o(f),d=(0,a.loadPlugins)(),m=(0,a.getFrameUrl)(),_=new c.default(s.default.metrika.id),v=s.default.defaults,y=(0,p.default)({defaults:v,plugins:d,frameUrl:m,metrika:_});(0,h.default)(window,function(){_.init(),y(".ya-share2",{reinit:!1})}),window.Ya=window.Ya||{},window.Ya.share2=function(e,t){if("object"===(void 0===e?"undefined":i(e))&&1===e.nodeType)return y(e,t)[0];if("string"==typeof e)return 0===e.indexOf("#")&&(console.log("DEPRECATION: use element id instead of query selector for initialization"),e=e.slice(1)),y("#"+e,t)[0];throw new TypeError("Neither element nor element id is provided")}},function(e,t,n){e.exports=n.p+"frame.html"},function(e,t,n){(function(t){(function(){"use strict";!function(e){function t(e){return void 0!==p[e]}function n(){a.call(this),this._isInvalid=!0}function o(e){return""==e&&n.call(this),e.toLowerCase()}function i(e){var t=e.charCodeAt(0);return t>32&&t<127&&-1==[34,35,60,62,63,96].indexOf(t)?e:encodeURIComponent(e)}function r(e){var t=e.charCodeAt(0);return t>32&&t<127&&-1==[34,35,60,62,96].indexOf(t)?e:encodeURIComponent(e)}function s(e,s,a){function l(e){g.push(e)}var c=s||"scheme start",u=0,_="",v=!1,y=!1,g=[];e:for(;(e[u-1]!=h||0==u)&&!this._isInvalid;){var b=e[u];switch(c){case"scheme start":if(!b||!d.test(b)){if(s){l("Invalid scheme.");break e}_="",c="no scheme";continue}_+=b.toLowerCase(),c="scheme";break;case"scheme":if(b&&m.test(b))_+=b.toLowerCase();else{if(":"!=b){if(s){if(h==b)break e;l("Code point not allowed in scheme: "+b);break e}_="",u=0,c="no scheme";continue}if(this._scheme=_,_="",s)break e;t(this._scheme)&&(this._isRelative=!0),c="file"==this._scheme?"relative":this._isRelative&&a&&a._scheme==this._scheme?"relative or authority":this._isRelative?"authority first slash":"scheme data"}break;case"scheme data":"?"==b?(this._query="?",c="query"):"#"==b?(this._fragment="#",c="fragment"):h!=b&&"\t"!=b&&"\n"!=b&&"\r"!=b&&(this._schemeData+=i(b));break;case"no scheme":if(a&&t(a._scheme)){c="relative";continue}l("Missing scheme."),n.call(this);break;case"relative or authority":if("/"!=b||"/"!=e[u+1]){l("Expected /, got: "+b),c="relative";continue}c="authority ignore slashes";break;case"relative":if(this._isRelative=!0,"file"!=this._scheme&&(this._scheme=a._scheme),h==b){this._host=a._host,this._port=a._port,this._path=a._path.slice(),this._query=a._query,this._username=a._username,this._password=a._password;break e}if("/"==b||"\\"==b)"\\"==b&&l("\\ is an invalid code point."),c="relative slash";else if("?"==b)this._host=a._host,this._port=a._port,this._path=a._path.slice(),this._query="?",this._username=a._username,this._password=a._password,c="query";else{if("#"!=b){var k=e[u+1],w=e[u+2];("file"!=this._scheme||!d.test(b)||":"!=k&&"|"!=k||h!=w&&"/"!=w&&"\\"!=w&&"?"!=w&&"#"!=w)&&(this._host=a._host,this._port=a._port,this._username=a._username,this._password=a._password,this._path=a._path.slice(),this._path.pop()),c="relative path";continue}this._host=a._host,this._port=a._port,this._path=a._path.slice(),this._query=a._query,this._fragment="#",this._username=a._username,this._password=a._password,c="fragment"}break;case"relative slash":if("/"!=b&&"\\"!=b){"file"!=this._scheme&&(this._host=a._host,this._port=a._port,this._username=a._username,this._password=a._password),c="relative path";continue}"\\"==b&&l("\\ is an invalid code point."),c="file"==this._scheme?"file host":"authority ignore slashes";break;case"authority first slash":if("/"!=b){l("Expected '/', got: "+b),c="authority ignore slashes";continue}c="authority second slash";break;case"authority second slash":if(c="authority ignore slashes","/"!=b){l("Expected '/', got: "+b);continue}break;case"authority ignore slashes":if("/"!=b&&"\\"!=b){c="authority";continue}l("Expected authority, got: "+b);break;case"authority":if("@"==b){v&&(l("@ already seen."),_+="%40"),v=!0;for(var x=0;x<_.length;x++){var C=_[x];if("\t"!=C&&"\n"!=C&&"\r"!=C)if(":"!=C||null!==this._password){var j=i(C);null!==this._password?this._password+=j:this._username+=j}else this._password="";else l("Invalid whitespace in authority.")}_=""}else{if(h==b||"/"==b||"\\"==b||"?"==b||"#"==b){u-=_.length,_="",c="host";continue}_+=b}break;case"file host":if(h==b||"/"==b||"\\"==b||"?"==b||"#"==b){2!=_.length||!d.test(_[0])||":"!=_[1]&&"|"!=_[1]?0==_.length?c="relative path start":(this._host=o.call(this,_),_="",c="relative path start"):c="relative path";continue}"\t"==b||"\n"==b||"\r"==b?l("Invalid whitespace in file host."):_+=b;break;case"host":case"hostname":if(":"!=b||y){if(h==b||"/"==b||"\\"==b||"?"==b||"#"==b){if(this._host=o.call(this,_),_="",c="relative path start",s)break e;continue}"\t"!=b&&"\n"!=b&&"\r"!=b?("["==b?y=!0:"]"==b&&(y=!1),_+=b):l("Invalid code point in host/hostname: "+b)}else if(this._host=o.call(this,_),_="",c="port","hostname"==s)break e;break;case"port":if(/[0-9]/.test(b))_+=b;else{if(h==b||"/"==b||"\\"==b||"?"==b||"#"==b||s){if(""!=_){var E=parseInt(_,10);E!=p[this._scheme]&&(this._port=E+""),_=""}if(s)break e;c="relative path start";continue}"\t"==b||"\n"==b||"\r"==b?l("Invalid code point in port: "+b):n.call(this)}break;case"relative path start":if("\\"==b&&l("'\\' not allowed in path."),c="relative path","/"!=b&&"\\"!=b)continue;break;case"relative path":if(h!=b&&"/"!=b&&"\\"!=b&&(s||"?"!=b&&"#"!=b))"\t"!=b&&"\n"!=b&&"\r"!=b&&(_+=i(b));else{"\\"==b&&l("\\ not allowed in relative path.");var z;(z=f[_.toLowerCase()])&&(_=z),".."==_?(this._path.pop(),"/"!=b&&"\\"!=b&&this._path.push("")):"."==_&&"/"!=b&&"\\"!=b?this._path.push(""):"."!=_&&("file"==this._scheme&&0==this._path.length&&2==_.length&&d.test(_[0])&&"|"==_[1]&&(_=_[0]+":"),this._path.push(_)),_="","?"==b?(this._query="?",c="query"):"#"==b&&(this._fragment="#",c="fragment")}break;case"query":s||"#"!=b?h!=b&&"\t"!=b&&"\n"!=b&&"\r"!=b&&(this._query+=r(b)):(this._fragment="#",c="fragment");break;case"fragment":h!=b&&"\t"!=b&&"\n"!=b&&"\r"!=b&&(this._fragment+=b)}u++}}function a(){this._scheme="",this._schemeData="",this._username="",this._password=null,this._host="",this._port="",this._path=[],this._query="",this._fragment="",this._isInvalid=!1,this._isRelative=!1}function l(e,t){void 0===t||t instanceof l||(t=new l(String(t))),this._url=e,a.call(this);var n=e.replace(/^[ \t\r\n\f]+|[ \t\r\n\f]+$/g,"");s.call(this,n,null,t)}var c=!1;if(!e.forceJURL)try{var u=new e.URL("b","http://a");u.pathname="c%20d",c="http://a/c%20d"===u.href}catch(e){}if(!c){var p=Object.create(null);p.ftp=21,p.file=0,p.gopher=70,p.http=80,p.https=443,p.ws=80,p.wss=443;var f=Object.create(null);f["%2e"]=".",f[".%2e"]="..",f["%2e."]="..",f["%2e%2e"]="..";var h=void 0,d=/[a-zA-Z]/,m=/[a-zA-Z0-9\+\-\.]/;l.prototype={toString:function(){return this.href},get href(){if(this._isInvalid)return this._url;var e="";return""==this._username&&null==this._password||(e=this._username+(null!=this._password?":"+this._password:"")+"@"),this.protocol+(this._isRelative?"//"+e+this.host:"")+this.pathname+this._query+this._fragment},set href(e){a.call(this),s.call(this,e)},get protocol(){return this._scheme+":"},set protocol(e){this._isInvalid||s.call(this,e+":","scheme start")},get host(){return this._isInvalid?"":this._port?this._host+":"+this._port:this._host},set host(e){!this._isInvalid&&this._isRelative&&s.call(this,e,"host")},get hostname(){return this._host},set hostname(e){!this._isInvalid&&this._isRelative&&s.call(this,e,"hostname")},get port(){return this._port},set port(e){!this._isInvalid&&this._isRelative&&s.call(this,e,"port")},get pathname(){return this._isInvalid?"":this._isRelative?"/"+this._path.join("/"):this._schemeData},set pathname(e){!this._isInvalid&&this._isRelative&&(this._path=[],s.call(this,e,"relative path start"))},get search(){return this._isInvalid||!this._query||"?"==this._query?"":this._query},set search(e){!this._isInvalid&&this._isRelative&&(this._query="?","?"==e[0]&&(e=e.slice(1)),s.call(this,e,"query"))},get hash(){return this._isInvalid||!this._fragment||"#"==this._fragment?"":this._fragment},set hash(e){this._isInvalid||(this._fragment="#","#"==e[0]&&(e=e.slice(1)),s.call(this,e,"fragment"))},get origin(){var e;if(this._isInvalid||!this._scheme)return"";switch(this._scheme){case"data":case"file":case"javascript":case"mailto":return"null"}return e=this.host,e?this._scheme+"://"+e:""}};var _=e.URL;_&&(l.createObjectURL=function(e){return _.createObjectURL.apply(_,arguments)},l.revokeObjectURL=function(e){_.revokeObjectURL(e)}),e.URL=l,l.foo="bar"}}(window),e.exports=t.URL}).call(window)}).call(t,n(5))},function(e,t){e.exports='.ya-share2,\n.ya-share2 * {\n  line-height: normal;\n}\n.ya-share2 :link:hover,\n.ya-share2 :visited:hover {\n  color: #000 !important;\n}\n.ya-share2 input {\n  color: inherit;\n  font: inherit;\n  margin: 0;\n  line-height: normal;\n}\n.ya-share2__container_size_m {\n  font-size: 13px;\n}\n.ya-share2__container_size_m .ya-share2__icon {\n  height: 24px;\n  width: 24px;\n  background-size: 24px 24px;\n}\n.ya-share2__container_size_m .ya-share2__title {\n  line-height: 24px;\n}\n.ya-share2__container_size_m .ya-share2__item {\n  margin: 5px 4px 5px 0;\n}\n.ya-share2__container_size_m .ya-share2__item:last-child {\n  margin-right: 0;\n}\n.ya-share2__container_size_m .ya-share2__counter {\n  font-size: 12px;\n  line-height: 24px;\n  padding: 0 8px;\n}\n.ya-share2__container_size_m .ya-share2__counter:before {\n  margin-left: -8px;\n}\n.ya-share2__container_size_m .ya-share2__icon_more:before {\n  font-size: 12px;\n  line-height: 24px;\n}\n.ya-share2__container_size_m .ya-share2__popup {\n  padding: 5px 10px;\n}\n.ya-share2__container_size_m .ya-share2__popup_direction_bottom {\n  top: 28px;\n}\n.ya-share2__container_size_m .ya-share2__popup_direction_top {\n  bottom: 28px;\n}\n.ya-share2__container_size_m .ya-share2__input_copy {\n  width: 140px;\n}\n.ya-share2__container_size_m .ya-share2__badge + .ya-share2__title {\n  margin-left: 10px;\n}\n.ya-share2__container_size_s {\n  font-size: 12px;\n}\n.ya-share2__container_size_s .ya-share2__icon {\n  height: 18px;\n  width: 18px;\n  background-size: 18px 18px;\n}\n.ya-share2__container_size_s .ya-share2__title {\n  line-height: 18px;\n}\n.ya-share2__container_size_s .ya-share2__item {\n  margin: 3px 4px 3px 0;\n}\n.ya-share2__container_size_s .ya-share2__item:last-child {\n  margin-right: 0;\n}\n.ya-share2__container_size_s .ya-share2__counter {\n  font-size: 10px;\n  line-height: 18px;\n  padding: 0 6px;\n}\n.ya-share2__container_size_s .ya-share2__counter:before {\n  margin-left: -6px;\n}\n.ya-share2__container_size_s .ya-share2__icon_more:before {\n  font-size: 10px;\n  line-height: 18px;\n}\n.ya-share2__container_size_s .ya-share2__popup {\n  padding: 3px 6px;\n}\n.ya-share2__container_size_s .ya-share2__popup_direction_bottom {\n  top: 21px;\n}\n.ya-share2__container_size_s .ya-share2__popup_direction_top {\n  bottom: 21px;\n}\n.ya-share2__container_size_s .ya-share2__input_copy {\n  width: 110px;\n}\n.ya-share2__container_size_s .ya-share2__badge + .ya-share2__title {\n  margin-left: 6px;\n}\n.ya-share2__list_direction_horizontal > .ya-share2__item {\n  display: inline-block;\n  vertical-align: top;\n  margin-top: 0;\n  margin-bottom: 0;\n}\n.ya-share2__list_direction_horizontal > .ya-share2__item > .ya-share2__link > .ya-share2__title {\n  display: none;\n}\n.ya-share2__list_direction_vertical > .ya-share2__item {\n  display: block;\n  margin-right: 0;\n}\n.ya-share2__list_direction_vertical > .ya-share2__item > .ya-share2__link > .ya-share2__badge > .ya-share2__counter {\n  display: none;\n}\n.ya-share2__list {\n  display: inline-block;\n  vertical-align: top;\n  padding: 0;\n  margin: 0;\n  list-style-type: none;\n}\n.ya-share2__item {\n  font-family: Arial, sans;\n  display: inline-block;\n}\n.ya-share2__item:hover {\n  opacity: 0.9;\n}\n.ya-share2__link {\n  display: inline-block;\n  vertical-align: top;\n  text-decoration: none;\n  white-space: nowrap;\n}\n.ya-share2__badge {\n  display: inline-block;\n  vertical-align: top;\n  border-radius: 2px;\n  color: #fff;\n  overflow: hidden;\n  position: relative;\n}\n.ya-share2__icon {\n  display: inline-block;\n  vertical-align: top;\n}\n.ya-share2__icon:active {\n  box-shadow: inset 0 2px 0 0 rgba(0,0,0,0.1);\n}\n.ya-share2__counter {\n  display: none;\n}\n.ya-share2__counter:before {\n  content: "";\n  position: absolute;\n  width: 1px;\n  top: 2px;\n  bottom: 2px;\n  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEX///+nxBvIAAAAAXRSTlMz/za5cAAAAApJREFUCNdjYAAAAAIAAeIhvDMAAAAASUVORK5CYII=") 0 0 repeat-y;\n}\n.ya-share2__counter_visible {\n  display: inline-block;\n}\n.ya-share2__title {\n  display: inline-block;\n  color: #000;\n  vertical-align: bottom;\n}\n.ya-share2__title:hover {\n  color: #f00;\n}\n.ya-share2__item_more {\n  position: relative;\n}\n.ya-share2__item_more:hover {\n  opacity: 1;\n}\n.ya-share2__icon_more {\n  background-color: #fff;\n  border: 1px solid #cdcdcd;\n  box-sizing: border-box;\n  position: relative;\n}\n.ya-share2__icon_more:before {\n  content: \'â€¢â€¢â€¢\';\n  color: #a0a0a0;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  position: absolute;\n  text-align: center;\n}\n.ya-share2__popup {\n  position: absolute;\n  display: none;\n  border: 1px solid #e6e6e6;\n  z-index: 9999;\n  background-color: #fff;\n}\n.ya-share2__popup_direction_bottom {\n  box-shadow: 0 10px 20px -5px rgba(0,0,0,0.4);\n}\n.ya-share2__popup_direction_top {\n  box-shadow: 0 0 20px -5px rgba(0,0,0,0.4);\n}\n.ya-share2__popup_list-direction_horizontal {\n  right: 0;\n}\n.ya-share2__popup_list-direction_vertical {\n  left: 0;\n}\n.ya-share2__popup_visible {\n  display: block;\n}\n.ya-share2__popup_clipboard .ya-share2__input_copy,\n.ya-share2__link_copy {\n  display: none;\n}\n.ya-share2__popup_clipboard .ya-share2__link_copy {\n  display: inline-block;\n}\n'},function(e,t){e.exports="\"data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M19.896 14.833A5.167 5.167 0 0 1 14.729 20H9.166A5.167 5.167 0 0 1 4 14.833V9.167A5.166 5.166 0 0 1 9.166 4h2.608a5.167 5.167 0 0 1 5.167 5.167l.002.011c.037.536.484.96 1.03.96l.018-.002h.872c.57 0 1.034.463 1.034 1.034l-.001 3.663zM9.038 10.176h2.926a.993.993 0 0 0 0-1.987H9.038a.994.994 0 0 0 0 1.987zm5.867 3.83H9.032a.94.94 0 0 0 0 1.879h5.873a.94.94 0 1 0 0-1.88z' fill='%23FFF' fill-rule='evenodd'/%3E%3C/svg%3E\""},function(e,t){e.exports="\"data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 18l5-2.71L17 18V6H7v12z' fill='%23FFF' fill-rule='evenodd'/%3E%3C/svg%3E\""},function(e,t){e.exports="\"data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 12h8v8H4zm8-8h8v8h-7.984z' fill='%23FFF' fill-rule='evenodd'/%3E%3C/svg%3E\""},function(e,t){e.exports="\"data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.555 10.814V14.1h.96s.18.005.18-.222v-3.287h-.96s-.18-.006-.18.222zm8.032 3.065v-3.287h-.96s-.18-.006-.18.222V14.1h.96s.18.006.18-.222zm-5.306 1.32c0 .227-.18.222-.18.222H4V9.497c0-.227.18-.222.18-.222h2.514V7.222c0-.227.18-.222.18-.222h1.408l-.001 8.199zm2.065 0c0 .227-.18.221-.18.221H8.761V9.496c0-.226.18-.221.18-.221h1.406v5.924zm0-7.103c0 .227-.18.222-.18.222H8.76V7.222c0-.227.18-.222.18-.222h1.408l-.001 1.096zm4.827 9.21c0 .228-.18.223-.18.223h-4.1v-1.096c0-.227.18-.222.18-.222h2.513v-.79h-2.694V9.497c0-.227.18-.222.18-.222l4.102.003v8.029zm4.826 0c0 .228-.18.223-.18.223h-4.1v-1.096c0-.227.18-.222.18-.222h2.514v-.79h-2.695V9.497c0-.227.18-.222.18-.222L20 9.279v8.028zm-1.585-3.427v-3.287h-.96s-.18-.006-.18.222V14.1h.96s.18.006.18-.222z' fill='%23FFF' fill-rule='evenodd'/%3E%3C/svg%3E\""},function(e,t){e.exports="\"data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6.277 7.109h1.517c.08 0 .16-.08.16-.16V5.313c0-.28.08-.559.159-.758l.04-.12L5.2 7.348l.16-.08c.239-.12.558-.16.917-.16zm11.654-.28c-.12-.638-.479-.917-.838-1.037-.36-.12-.718-.28-1.676-.4-.759-.08-1.557-.12-2.116-.12-.16-.438-.399-.917-1.317-1.156-.638-.16-1.796-.12-2.155-.08-.559.08-.758.319-.918.479-.16.16-.28.598-.28.878v1.556c0 .48-.318.838-.877.838H6.397c-.32 0-.559.04-.758.12-.16.12-.32.28-.4.4-.2.279-.239.598-.239.957 0 0 0 .28.08.798.04.4.479 3.033.878 3.911.16.36.28.48.599.639.718.32 2.354.639 3.152.758.759.08 1.278.32 1.557-.279 0 0 .04-.16.12-.36a6.3 6.3 0 0 0 .28-1.915c0-.04.079-.04.079 0 0 .36-.08 1.557.838 1.876.36.12 1.118.24 1.876.32.678.079 1.197.358 1.197 2.114 0 1.078-.24 1.238-1.397 1.238-.958 0-1.317.04-1.317-.759 0-.598.599-.558 1.078-.558.2 0 .04-.16.04-.52 0-.398.24-.598 0-.598-1.557-.04-2.475 0-2.475 1.956 0 1.796.679 2.115 2.914 2.115 1.756 0 2.354-.04 3.073-2.275.16-.439.479-1.796.678-4.03.16-1.478-.12-5.788-.319-6.866zm-3.033 4.75c-.2 0-.32 0-.519.04h-.08s-.04 0-.04-.04v-.04c.08-.4.28-.878.878-.878.639.04.799.599.799 1.038v.04c0 .04-.04.04-.04.04-.04 0-.04 0-.04-.04-.28-.08-.599-.12-.958-.16z' fill='%23FFF' fill-rule='evenodd'/%3E%3C/svg%3E\""},function(e,t){e.exports="\"data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.423 20v-7.298h2.464l.369-2.845h-2.832V8.042c0-.824.23-1.385 1.417-1.385h1.515V4.111A20.255 20.255 0 0 0 14.148 4c-2.183 0-3.678 1.326-3.678 3.76v2.097H8v2.845h2.47V20h2.953z' fill='%23FFF' fill-rule='evenodd'/%3E%3C/svg%3E\""},function(e,t){e.exports="\"data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.09 11.364v1.745h2.888c-.116.75-.873 2.196-2.887 2.196-1.738 0-3.156-1.44-3.156-3.214 0-1.775 1.418-3.215 3.156-3.215.989 0 1.65.422 2.029.786l1.382-1.331C11.615 7.5 10.465 7 9.09 7A5.087 5.087 0 0 0 4 12.09a5.087 5.087 0 0 0 5.09 5.092c2.94 0 4.888-2.066 4.888-4.975 0-.334-.036-.589-.08-.843H9.091zm10.91 0h-1.455V9.909h-1.454v1.455h-1.455v1.454h1.455v1.455h1.454v-1.455H20' fill='%23FFF' fill-rule='evenodd'/%3E%3C/svg%3E\""},function(e,t){e.exports="\"data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.246 8.954h3.41v10.281h-3.41zm1.725-4.935c-1.167 0-1.929.769-1.929 1.776 0 .987.74 1.777 1.884 1.777h.022c1.19 0 1.93-.79 1.93-1.777-.023-1.007-.74-1.776-1.907-1.776zm10.052 4.715c-1.81 0-2.62.997-3.073 1.698V8.976H9.54c.045.965 0 10.281 0 10.281h3.41v-5.742c0-.307.022-.614.112-.834.246-.613.807-1.25 1.75-1.25 1.233 0 1.727.944 1.727 2.325v5.501h3.41v-5.896c0-3.158-1.683-4.627-3.926-4.627z' fill='%23FFF' fill-rule='evenodd'/%3E%3C/svg%3E\""},function(e,t){e.exports="\"data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M17.815 13.3c.438 2.114.868 4.221 1.306 6.336.037.178-.148.385-.334.311-2.025-.741-4.006-1.49-6.01-2.24a.625.625 0 0 1-.318-.23l-7.39-8.903c-.067-.082-.082-.215-.06-.32.312-1.23.72-2.143 1.752-3.019C7.799 4.36 8.779 4.1 10.047 4.004c.156-.015.223.014.312.133 2.418 2.909 4.837 5.817 7.248 8.725a.888.888 0 0 1 .208.438z' fill='%23FFF'/%3E%3Cpath d='M6.175 8.462c.69-1.795 2.3-3.004 3.835-3.301l-.185-.223a4.242 4.242 0 0 0-3.85 3.272l.2.252z' fill='%230D425A'/%3E%3Cpath d='M10.53 5.792c-1.744.326-3.124 1.513-3.851 3.271l.905 1.091c.787-1.78 2.3-2.997 3.836-3.302l-.89-1.06zm2.76 7.827L9.364 8.9a6.119 6.119 0 0 0-1.269 1.87l4.89 5.89c.289-.385.867-2.359.303-3.041zM9.647 8.633l3.947 4.748c.445.542 2.456.327 3.086-.193l-4.756-5.72c-.793.156-1.587.564-2.277 1.165zm7.308 5.045c-.609.46-1.9.735-2.931.527.074.823-.096 1.892-.616 2.745l1.885.712 1.528.564c.223-.378.542-.608.913-.764l-.35-1.692-.43-2.092z' fill='%230D425A'/%3E%3C/g%3E%3C/svg%3E\""},function(e,t){e.exports="\"data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.889 9.667a1.333 1.333 0 1 0 0-2.667 1.333 1.333 0 0 0 0 2.667zm6.222 0a1.333 1.333 0 1 0 0-2.667 1.333 1.333 0 0 0 0 2.667zm4.77 6.108l-1.802-3.028a.879.879 0 0 0-1.188-.307.843.843 0 0 0-.313 1.166l.214.36a6.71 6.71 0 0 1-4.795 1.996 6.711 6.711 0 0 1-4.792-1.992l.217-.364a.844.844 0 0 0-.313-1.166.878.878 0 0 0-1.189.307l-1.8 3.028a.844.844 0 0 0 .312 1.166.88.88 0 0 0 1.189-.307l.683-1.147a8.466 8.466 0 0 0 5.694 2.18 8.463 8.463 0 0 0 5.698-2.184l.685 1.151a.873.873 0 0 0 1.189.307.844.844 0 0 0 .312-1.166z' fill='%23FFF' fill-rule='evenodd'/%3E%3C/svg%3E\""},function(e,t){e.exports="\"data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FFF' fill-rule='evenodd'%3E%3Cpath d='M11.674 6.536a1.69 1.69 0 0 0-1.688 1.688c0 .93.757 1.687 1.688 1.687a1.69 1.69 0 0 0 1.688-1.687 1.69 1.69 0 0 0-1.688-1.688zm0 5.763a4.08 4.08 0 0 1-4.076-4.075 4.08 4.08 0 0 1 4.076-4.077 4.08 4.08 0 0 1 4.077 4.077 4.08 4.08 0 0 1-4.077 4.075zM10.025 15.624a7.633 7.633 0 0 1-2.367-.98 1.194 1.194 0 0 1 1.272-2.022 5.175 5.175 0 0 0 5.489 0 1.194 1.194 0 1 1 1.272 2.022 7.647 7.647 0 0 1-2.367.98l2.279 2.28a1.194 1.194 0 0 1-1.69 1.688l-2.238-2.24-2.24 2.24a1.193 1.193 0 1 1-1.689-1.689l2.279-2.279'/%3E%3C/g%3E%3C/svg%3E\""},function(e,t){e.exports="\"data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9.742c0 1.58.599 2.986 1.884 3.51.21.087.4.003.46-.23.043-.16.144-.568.189-.738.06-.23.037-.31-.133-.512-.37-.436-.608-1.001-.608-1.802 0-2.322 1.74-4.402 4.53-4.402 2.471 0 3.829 1.508 3.829 3.522 0 2.65-1.174 4.887-2.917 4.887-.963 0-1.683-.795-1.452-1.77.276-1.165.812-2.421.812-3.262 0-.752-.405-1.38-1.24-1.38-.985 0-1.775 1.017-1.775 2.38 0 .867.293 1.454.293 1.454L8.69 16.406c-.352 1.487-.053 3.309-.028 3.492.015.11.155.136.22.054.09-.119 1.262-1.564 1.66-3.008.113-.409.647-2.526.647-2.526.32.61 1.254 1.145 2.248 1.145 2.957 0 4.964-2.693 4.964-6.298C18.4 6.539 16.089 4 12.576 4 8.204 4 6 7.13 6 9.742z' fill='%23FFF' fill-rule='evenodd'/%3E%3C/svg%3E\""},function(e,t){e.exports="\"data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M17.9 5c1.159 0 2.1.948 2.1 2.117v5.862c0 .108-.008.215-.024.32.016.156.024.314.024.473 0 3.36-3.582 6.085-8 6.085s-8-2.724-8-6.085c0-.159.008-.317.024-.473a2.148 2.148 0 0 1-.024-.32V7.117C4 5.948 4.94 5 6.1 5h11.8zM8.596 9.392L12 12.795l3.404-3.403a1.063 1.063 0 0 1 1.502 1.502l-4.132 4.131c-.21.21-.486.314-.76.311-.284.01-.571-.094-.788-.31l-4.132-4.132a1.063 1.063 0 0 1 1.502-1.502z' fill='%23FFF' fill-rule='evenodd'/%3E%3C/svg%3E\""},function(e,t){e.exports="\"data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M17.367 14.463s-.105.148-.457.299l-.553.222.597 3.273c.062.282.25.983-.082 1.062-.17.04-.307-.067-.395-.121l-.769-.445-2.675-1.545c-.204-.122-.78-.546-1.093-.489-.205.038-.336.127-.483.216l-.77.445-2.39 1.386-.883.508c-.123.06-.301.058-.394-.025-.07-.063-.09-.253-.063-.388l.19-1.004.572-3.02c.047-.2.237-.975.166-1.137-.048-.107-.173-.196-.261-.267l-.61-.565-2.13-1.983c-.189-.153-.345-.345-.533-.496l-.235-.216c-.062-.078-.165-.235-.09-.369.142-.248.974-.218 1.335-.28l2.682-.31.82-.09c.146-.024.299-.004.413-.063.239-.123.51-.809.636-1.087l1.31-2.714c.151-.297.286-.603.431-.896.075-.15.133-.308.305-.356.162-.045.257.105.312.178.177.235.325.685.451.973l1.29 2.853c.104.238.363.964.54 1.074.266.166.858.108 1.227.172l2.841.292c.355.062 1.245.01 1.36.267.076.17-.072.314-.152.394l-.864.814-1.983 1.868c-.185.164-.77.637-.833.858-.04.14.02.414.088.722-.096-.001-.39-.007-1.182-.029-.63-.007-2.616-.17-2.713-.178l-.84-.076c-.14-.023-.326.012-.4-.076v-.02c1.727-1.168 3.407-2.416 5.142-3.578l-.006-.044c-.146-.072-.359-.059-.54-.095-.385-.077-.79-.078-1.208-.147-.75-.124-1.59-.114-2.434-.114-1.172 0-2.329.03-3.35.21-.45.079-.894.095-1.309.197-.172.042-.358.03-.49.108l.007.012c.1.027.253.02.381.02l.928.019.808.025.813.032.591.032c.486.075 1.007.036 1.475.114.404.068.804.065 1.182.14.113.022.245.015.33.064v.006c-.039.094-.336.255-.432.318l-1.055.743-2.256 1.62-1.417.992c.003.048.024.035.045.061 1.15.167 2.52.258 3.77.262 1.298.005 2.465-.094 3.118-.193.561-.086 1.082-.147 1.653-.287.325-.08.521-.148.521-.148z' fill='%23FFF' fill-rule='evenodd'/%3E%3C/svg%3E\""},function(e,t){e.exports="\"data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16.542 10.63c-1.105-.636-2.494-1.033-4.025-1.118l.808-2.393 2.182.637c0 .963.78 1.742 1.743 1.742.964 0 1.758-.779 1.758-1.742C19.008 6.78 18.214 6 17.25 6c-.609 0-1.148.326-1.459.793l-2.65-.764a.482.482 0 0 0-.61.311l-1.063 3.172c-1.516.085-2.905.482-4.01 1.119a1.987 1.987 0 0 0-1.46-.623A1.995 1.995 0 0 0 4 12.004c0 .75.425 1.403 1.035 1.742-.029.17-.043.34-.043.51 0 2.62 3.146 4.744 7.015 4.744 3.855 0 7-2.124 7-4.744 0-.17-.013-.34-.042-.51A1.974 1.974 0 0 0 20 12.004a1.995 1.995 0 0 0-1.998-1.996c-.581 0-1.091.24-1.46.623zM9.499 12.5a1.01 1.01 0 0 1 1.006 1.006.998.998 0 0 1-1.006.991.986.986 0 0 1-.992-.991c0-.553.439-1.006.992-1.006zm5.002 0a.998.998 0 0 0-.992 1.006c0 .552.44.991.992.991a.998.998 0 0 0 1.006-.991 1.01 1.01 0 0 0-1.006-1.006zm-5.3 3.597a.484.484 0 0 1-.085-.694c.156-.226.482-.255.694-.085.567.44 1.474.68 2.197.68.709 0 1.616-.24 2.197-.68a.484.484 0 0 1 .694.085.496.496 0 0 1-.085.694c-.737.58-1.885.907-2.806.907-.935 0-2.07-.326-2.806-.907zm8.05-7.59c-.411 0-.752-.34-.752-.75 0-.426.34-.752.751-.752s.752.326.752.751c0 .41-.34.75-.752.75z' fill='%23FFF' fill-rule='evenodd'/%3E%3C/svg%3E\""},function(e,t){e.exports="\"data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.019 15.562l-.001-.003-.018.002a.055.055 0 0 0 .019.001zM7.71 12.398l.146-.68c.048-.205.03-.452.03-.692V9.812L7.88 8c-.139 0-.278.043-.393.076-.358.102-.666.201-.962.352-1.158.59-2.022 1.565-2.387 2.944-.343 1.297-.007 2.652.522 3.507.118.19.269.48.44.61.135-.02.272-.15.375-.217a6.06 6.06 0 0 0 .622-.452l.24-.229c.63-.506 1.075-1.346 1.373-2.193zm4.276 3.164h.02a.382.382 0 0 0-.019-.003v.003zm-3.01-.888l-.258-.575-.088-.264H8.62l-.264.498c-.176.288-.358.574-.557.839a6.5 6.5 0 0 1-.85.944l-.517.422.012.024.287.14c.206.091.43.173.657.235.788.217 1.811.177 2.545-.053.178-.055.643-.194.739-.305v-.017c-.177-.092-.324-.254-.47-.381a5.573 5.573 0 0 1-1.225-1.507zm10.884-3.302c-.365-1.379-1.23-2.354-2.387-2.944-.296-.15-.604-.25-.962-.352-.115-.033-.254-.077-.393-.076l-.005 1.812v1.214c0 .24-.019.487.029.692l.147.68c.297.847.741 1.687 1.372 2.193l.24.23c.196.164.402.309.622.45.103.067.24.198.375.218.171-.13.322-.42.44-.61.529-.855.865-2.21.522-3.507zm-3.66 3.8c-.2-.265-.381-.55-.557-.839l-.264-.498h-.011l-.088.264-.258.575a5.576 5.576 0 0 1-1.226 1.507c-.145.127-.292.29-.469.38v.018c.096.111.561.25.739.305.734.23 1.757.27 2.545.053a4.85 4.85 0 0 0 .657-.234l.287-.141a1.31 1.31 0 0 0 .012-.024l-.516-.422a6.5 6.5 0 0 1-.85-.944zm-1.653-2.727c.068-.192.097-.402.146-.61.05-.21.024-.484.024-.727V9.753l-.006-1.741c-.015-.008-.02-.01-.047-.012-.197.047-.326.05-.592.14-.357.102-.685.275-.985.44-.289.16-.53.388-.78.587-.097.077-.199.19-.308.312l.01.01a1.19 1.19 0 0 0-.01.012l.36.47c.232.359.445.763.581 1.213.326 1.079.182 2.411-.235 3.273a4.9 4.9 0 0 1-.445.75l-.258.323a.018.018 0 0 1-.003.007c.004.007.01.016.012.022h.008c.395-.215.686-.574 1.027-.844.189-.15.354-.35.504-.54.404-.514.755-1.046.997-1.73zm-2.55 3.085l-.259-.323a4.903 4.903 0 0 1-.445-.75c-.417-.862-.561-2.194-.235-3.273.136-.45.35-.854.58-1.214L12 9.501l-.01-.011.01-.01a2.791 2.791 0 0 0-.308-.313c-.25-.2-.491-.427-.78-.586-.3-.166-.628-.339-.985-.44-.266-.09-.395-.094-.592-.141-.026.001-.032.004-.047.012l-.006 1.741v1.355c0 .243-.026.517.024.727.049.208.078.418.146.61.242.684.593 1.216.997 1.73.15.19.315.39.505.54.34.27.63.629 1.026.844h.008c.001-.006.008-.015.012-.022a.019.019 0 0 1-.003-.007z' fill='%23FFF' fill-rule='evenodd'/%3E%3C/svg%3E\""},function(e,t){e.exports="\"data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Ctitle%3EsinaWeibo%3C/title%3E%3Cpath d='M10.266 14.696c-.103.421.55.447.64.063.037-.191-.103-.332-.282-.332-.167 0-.333.128-.358.269zm-.128.945c.102-.498-.307-.869-.793-.843-.46.038-.843.358-.92.754-.115.511.307.882.793.844.46-.026.843-.345.92-.755zm3.797-3.157c-1.586-.997-3.707-1.01-5.42-.447-.857.28-1.764.818-2.301 1.495-.627.793-.882 1.815-.23 2.8.958 1.431 3.413 2.033 5.675 1.508 1.33-.307 2.749-1.048 3.35-2.326.562-1.177-.052-2.378-1.074-3.03zm-3.17.498c.945.167 1.7.755 1.827 1.739.243 1.854-2.173 3.336-4.026 2.327a1.933 1.933 0 0 1-.742-2.723c.435-.767 1.266-1.266 2.148-1.355a2.75 2.75 0 0 1 .793.012zm6.11-.37c-.268-.18-.538-.281-.856-.383-.308-.103-.359-.154-.243-.46.076-.218.14-.41.166-.666.14-1.15-.793-1.495-1.854-1.406-.498.039-.92.167-1.355.307-.281.09-.806.384-.92.205-.064-.09.013-.23.038-.32.166-.626.23-1.496-.384-1.88-.447-.28-1.227-.204-1.7-.038-2.556.87-6.455 4.552-5.663 7.479.18.664.55 1.163.908 1.521 1.061 1.061 2.71 1.65 4.231 1.866 1.112.154 2.263.14 3.375-.064 1.815-.332 3.554-1.15 4.679-2.607.754-.972.997-2.352 0-3.235a3.334 3.334 0 0 0-.422-.319zm1.623-3.682c.652 1.483-.064 2.148.166 2.66.192.421.767.46 1.023.14.191-.243.294-.959.307-1.278a4.193 4.193 0 0 0-1.125-3.12c-.984-1.073-2.276-1.444-3.694-1.303-.256.025-.46.064-.601.217-.332.358-.166.882.294.959.384.063 1.342-.23 2.416.396.498.307.971.792 1.214 1.33zm-3.45-.562c-.282.345-.078.87.408.856.294-.012.358-.05.677.051.307.103.626.448.64.857.025.268-.282.895.32 1.061a.523.523 0 0 0 .536-.166c.115-.128.166-.371.192-.575.089-.857-.333-1.598-1.01-2.02-.384-.23-1.445-.46-1.764-.064z' fill='%23FFF' fill-rule='evenodd'/%3E%3C/svg%3E\""},function(e,t){e.exports="\"data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M19.537 13.698c.115-.52.176-1.06.176-1.614 0-4.155-3.415-7.524-7.63-7.524-.444 0-.88.038-1.304.11A4.444 4.444 0 0 0 8.425 4C5.981 4 4 5.954 4 8.364c0 .805.222 1.56.608 2.207a7.428 7.428 0 0 0-.155 1.513c0 4.156 3.416 7.4 7.63 7.4.477 0 .944-.044 1.397-.126.623.33 1.335.642 2.092.642 2.444 0 4.425-1.953 4.425-4.364 0-.695-.166-1.354-.46-1.938zm-3.974 1.457c-.294.418-.725.747-1.293.984-.567.238-1.239.356-2.016.356-.933 0-1.702-.162-2.308-.486a2.986 2.986 0 0 1-1.047-.934c-.268-.39-.403-.768-.403-1.137 0-.213.08-.395.242-.547a.855.855 0 0 1 .615-.229c.202 0 .373.059.512.178.14.119.26.294.358.527.12.278.25.51.39.695.139.185.336.34.589.46.254.12.587.18 1 .18.566 0 1.027-.12 1.382-.364.354-.243.532-.547.532-.91a.919.919 0 0 0-.287-.702 1.88 1.88 0 0 0-.741-.412 13.21 13.21 0 0 0-1.216-.303c-.678-.146-1.247-.318-1.703-.513-.458-.196-.822-.463-1.09-.8-.269-.34-.403-.759-.403-1.26 0-.48.142-.904.426-1.275.283-.372.693-.658 1.23-.858.537-.2 1.17-.299 1.895-.299.58 0 1.082.066 1.505.198.423.133.774.309 1.053.528.28.22.484.45.612.691.13.24.194.477.194.705 0 .21-.08.4-.241.567a.8.8 0 0 1-.603.252c-.22 0-.386-.05-.5-.151-.114-.101-.237-.266-.37-.495a2.27 2.27 0 0 0-.618-.768c-.241-.184-.627-.276-1.16-.276-.494 0-.893.1-1.196.3-.303.199-.455.44-.455.72 0 .173.053.324.155.45.103.128.245.235.426.326.18.091.363.162.547.214.185.052.49.126.916.225a15.47 15.47 0 0 1 1.446.38c.432.138.8.307 1.103.503.302.198.54.45.709.752.17.302.255.673.255 1.111 0 .525-.148.998-.442 1.417z' fill='%23FFF' fill-rule='evenodd'/%3E%3C/svg%3E\""},function(e,t){e.exports="\"data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M17.315 8.49l-.214 1.987-3.436 3.382h-1.826l-.698 1.826v2.523l-2.47-.698 2.846-5.1L4 8.167l5.638.752L6.899 5l7.463 4.027 2.202-2.47h1.02L20 7.631z' fill='%23FFF' fill-rule='evenodd'/%3E%3C/svg%3E\""},function(e,t){e.exports="\"data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18.92 6.089L4.747 11.555c-.967.388-.962.928-.176 1.168l3.534 1.104 1.353 4.146c.164.454.083.634.56.634.368 0 .53-.168.736-.368.13-.127.903-.88 1.767-1.719l3.677 2.717c.676.373 1.165.18 1.333-.628l2.414-11.374c.247-.99-.378-1.44-1.025-1.146zM8.66 13.573l7.967-5.026c.398-.242.763-.112.463.154l-6.822 6.155-.265 2.833-1.343-4.116z' fill='%23FFF' fill-rule='evenodd'/%3E%3C/svg%3E\""},function(e,t){e.exports="\"data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.813 6.01a4.397 4.397 0 0 0-4.326 6.121c.087.199.312.29.511.2a.382.382 0 0 0 .206-.51 3.566 3.566 0 0 1-.286-1.668A3.616 3.616 0 0 1 8.76 6.79a3.615 3.615 0 0 1 3.366 3.84 3.615 3.615 0 0 1-4.65 3.218.39.39 0 0 0-.486.263.394.394 0 0 0 .262.485c.315.093.647.152.977.174a4.397 4.397 0 0 0 4.677-4.087A4.398 4.398 0 0 0 8.813 6.01zm-1.348 5.658a1.67 1.67 0 1 0-.46-.655c-.274.27-.565.59-.854.966-1.022 1.315-2.224 3.694-2.148 7.007.006.204.157.484.355.497l.04.002c.213.015.394-.301.391-.516-.064-2.458.6-4.662 1.955-6.423.242-.316.488-.626.72-.878zm12.388 4.106c-1.307-.48-2.302-1.27-2.95-2.352a4.873 4.873 0 0 1-.354-.71.819.819 0 0 0 .337-.36.829.829 0 0 0-.395-1.098.822.822 0 0 0-1.098.392.822.822 0 0 0 .724 1.177c.091.237.218.516.39.81.483.812 1.431 1.912 3.196 2.558a.226.226 0 0 0 .278-.113c0-.006.005-.01.007-.022a.224.224 0 0 0-.135-.282zm-3.767-1.676a2.04 2.04 0 0 1-1.707-3.042 2.039 2.039 0 0 1 2.784-.787 2.04 2.04 0 0 1 .786 2.783 1.92 1.92 0 0 1-.268.378.223.223 0 0 0 .014.314c.09.082.234.074.313-.016a2.489 2.489 0 1 0-4.017-2.89 2.493 2.493 0 0 0 2.08 3.708.224.224 0 0 0 .015-.448z' fill='%23FFF' fill-rule='evenodd'/%3E%3C/svg%3E\""},function(e,t){e.exports="\"data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.72 7.7h3.699v2.857h-3.7v4.102c0 .928-.01 1.463.087 1.726.098.262.343.534.61.69.355.213.758.32 1.214.32.81 0 1.616-.264 2.417-.79v2.522c-.683.322-1.302.55-1.857.678a7.94 7.94 0 0 1-1.798.195 4.905 4.905 0 0 1-1.724-.276 4.215 4.215 0 0 1-1.438-.79c-.399-.343-.673-.706-.826-1.09-.154-.386-.23-.945-.23-1.676v-5.611H7V8.29c.628-.203 1.357-.496 1.804-.877.45-.382.809-.84 1.08-1.374.272-.534.459-1.214.56-2.039h2.276v3.7z' fill='%23FFF' fill-rule='evenodd'/%3E%3C/svg%3E\""},function(e,t){e.exports="\"data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 7.539a6.56 6.56 0 0 1-1.885.517 3.294 3.294 0 0 0 1.443-1.816 6.575 6.575 0 0 1-2.085.796 3.283 3.283 0 0 0-5.593 2.994A9.32 9.32 0 0 1 5.114 6.6a3.28 3.28 0 0 0 1.016 4.382 3.274 3.274 0 0 1-1.487-.41v.041a3.285 3.285 0 0 0 2.633 3.218 3.305 3.305 0 0 1-1.482.056 3.286 3.286 0 0 0 3.066 2.28A6.585 6.585 0 0 1 4 17.524 9.291 9.291 0 0 0 9.032 19c6.038 0 9.34-5 9.34-9.337 0-.143-.004-.285-.01-.425A6.672 6.672 0 0 0 20 7.538z' fill='%23FFF' fill-rule='evenodd'/%3E%3C/svg%3E\""},function(e,t){e.exports="\"data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FFF' fill-rule='evenodd'%3E%3Cpath d='M18.434 15.574c-.484-.391-1.002-.743-1.511-1.102-1.016-.718-1.945-.773-2.703.38-.426.648-1.021.677-1.644.392-1.718-.782-3.044-1.989-3.821-3.743-.344-.777-.34-1.473.465-2.022.425-.29.854-.634.82-1.268-.045-.828-2.043-3.593-2.832-3.885a1.429 1.429 0 0 0-.984 0C4.373 4.95 3.606 6.48 4.34 8.292c2.19 5.405 6.043 9.167 11.349 11.463.302.13.638.183.808.23 1.208.012 2.623-1.158 3.032-2.318.393-1.117-.438-1.56-1.096-2.093zM12.485 4.88c3.879.6 5.668 2.454 6.162 6.38.045.363-.09.909.426.919.538.01.408-.528.413-.89.045-3.699-3.163-7.127-6.888-7.253-.281.04-.863-.195-.9.438-.024.427.466.357.787.406z'/%3E%3Cpath d='M13.244 5.957c-.373-.045-.865-.222-.953.299-.09.546.458.49.811.57 2.395.538 3.23 1.414 3.624 3.802.057.349-.057.89.532.8.436-.066.278-.53.315-.802.02-2.293-1.936-4.38-4.329-4.669z'/%3E%3Cpath d='M13.464 7.832c-.249.006-.493.033-.585.3-.137.4.152.496.446.544.983.158 1.5.74 1.598 1.725.027.268.195.484.452.454.356-.043.389-.361.378-.664.017-1.106-1.227-2.385-2.289-2.359z'/%3E%3C/g%3E%3C/svg%3E\""},function(e,t){e.exports="\"data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.576-1.496c.588-.19 1.341 1.26 2.14 1.818.605.422 1.064.33 1.064.33l2.137-.03s1.117-.071.587-.964c-.043-.073-.308-.661-1.588-1.87-1.34-1.264-1.16-1.059.453-3.246.983-1.332 1.376-2.145 1.253-2.493-.117-.332-.84-.244-.84-.244l-2.406.015s-.178-.025-.31.056c-.13.079-.212.262-.212.262s-.382 1.03-.89 1.907c-1.07 1.85-1.499 1.948-1.674 1.832-.407-.267-.305-1.075-.305-1.648 0-1.793.267-2.54-.521-2.733-.262-.065-.454-.107-1.123-.114-.858-.009-1.585.003-1.996.208-.274.136-.485.44-.356.457.159.022.519.099.71.363.246.341.237 1.107.237 1.107s.142 2.11-.33 2.371c-.325.18-.77-.187-1.725-1.865-.489-.859-.859-1.81-.859-1.81s-.07-.176-.198-.272c-.154-.115-.37-.151-.37-.151l-2.286.015s-.343.01-.469.161C3.94 7.721 4.043 8 4.043 8s1.79 4.258 3.817 6.403c1.858 1.967 3.968 1.838 3.968 1.838h.957z' fill='%23FFF' fill-rule='evenodd'/%3E%3C/svg%3E\""},function(e,t){e.exports="\"data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 11.794c0 4.304-3.517 7.794-7.855 7.794a7.87 7.87 0 0 1-3.796-.97L4 20l1.418-4.182a7.714 7.714 0 0 1-1.127-4.024C4.29 7.489 7.807 4 12.145 4S20 7.49 20 11.794zm-7.855-6.553c-3.641 0-6.603 2.94-6.603 6.553 0 1.434.467 2.762 1.258 3.842l-.825 2.433 2.537-.806a6.6 6.6 0 0 0 3.633 1.084c3.642 0 6.604-2.94 6.604-6.553s-2.962-6.553-6.604-6.553zm3.967 8.348c-.049-.08-.177-.128-.37-.223-.192-.095-1.139-.558-1.315-.621-.177-.064-.305-.096-.434.095a10.92 10.92 0 0 1-.61.749c-.112.128-.224.143-.416.048-.193-.096-.813-.297-1.549-.948a5.76 5.76 0 0 1-1.07-1.323c-.113-.191-.013-.295.084-.39.086-.086.192-.223.289-.334.096-.112.128-.191.192-.319s.032-.239-.016-.335c-.048-.095-.433-1.035-.594-1.418-.16-.382-.32-.318-.433-.318-.112 0-.24-.016-.369-.016a.71.71 0 0 0-.513.239c-.177.19-.674.653-.674 1.593s.69 1.848.786 1.976c.096.127 1.332 2.119 3.289 2.884 1.958.764 1.958.51 2.31.477.353-.031 1.14-.461 1.3-.908.16-.446.16-.829.113-.908z' fill='%23FFF' fill-rule='evenodd'/%3E%3C/svg%3E\""},function(e,t,n){function o(e){return n(i(e))}function i(e){var t=r[e];if(!(t+1))throw new Error("Cannot find module '"+e+"'.");return t}var r={"./blogger.js":30,"./collections.js":31,"./delicious.js":32,"./digg.js":33,"./evernote.js":34,"./facebook.js":6,"./gplus.js":7,"./linkedin.js":8,"./lj.js":35,"./moimir.js":9,"./odnoklassniki.js":10,"./pinterest.js":11,"./pocket.js":36,"./qzone.js":37,"./reddit.js":38,"./renren.js":39,"./sinaWeibo.js":40,"./skype.js":41,"./surfingbird.js":42,"./telegram.js":43,"./tencentWeibo.js":44,"./tumblr.js":45,"./twitter.js":46,"./viber.js":47,"./vkontakte.js":12,"./whatsapp.js":48};o.keys=function(){return Object.keys(r)},o.resolve=i,e.exports=o,o.id=86},function(e,t,n){function o(e){return n(i(e))}function i(e){var t=r[e];if(!(t+1))throw new Error("Cannot find module '"+e+"'.");return t}var r={"./blogger.svg":60,"./collections.svg":61,"./delicious.svg":62,"./digg.svg":63,"./evernote.svg":64,"./facebook.svg":65,"./gplus.svg":66,"./linkedin.svg":67,"./lj.svg":68,"./moimir.svg":69,"./odnoklassniki.svg":70,"./pinterest.svg":71,"./pocket.svg":72,"./qzone.svg":73,"./reddit.svg":74,"./renren.svg":75,"./sinaWeibo.svg":76,"./skype.svg":77,"./surfingbird.svg":78,"./telegram.svg":79,"./tencentWeibo.svg":80,"./tumblr.svg":81,"./twitter.svg":82,"./viber.svg":83,"./vkontakte.svg":84,"./whatsapp.svg":85};o.keys=function(){return Object.keys(r)},o.resolve=i,e.exports=o,o.id=87}]);

let PushModule;!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).firebase=t()}(this,function(){"use strict";var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(t,n)},t=function(){return(t=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)};function n(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function r(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,i,o=n.call(e),s=[];try{for(;(void 0===t||0<t--)&&!(r=o.next()).done;)s.push(r.value)}catch(e){i={error:e}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(i)throw i.error}}return s}function i(e,t){if(!(t instanceof Object))return t;switch(t.constructor){case Date:return new Date(t.getTime());case Object:void 0===e&&(e={});break;case Array:e=[];break;default:return t}for(var n in t)t.hasOwnProperty(n)&&(e[n]=i(e[n],t[n]));return e}var o=(s.prototype.wrapCallback=function(e){var t=this;return function(n,r){n?t.reject(n):t.resolve(r),"function"==typeof e&&(t.promise.catch(function(){}),1===e.length?e(n):e(n,r))}},s);function s(){var e=this;this.reject=function(){},this.resolve=function(){},this.promise=new Promise(function(t,n){e.resolve=t,e.reject=n})}var a,c,u,l=(a=Error,e(c=p,u=a),c.prototype=null===u?Object.create(u):(f.prototype=u.prototype,new f),p);function f(){this.constructor=c}function p(e,t){var n=a.call(this,t)||this;return n.code=e,n.name="FirebaseError",Object.setPrototypeOf(n,p.prototype),Error.captureStackTrace&&Error.captureStackTrace(n,h.prototype.create),n}var h=(d.prototype.create=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];for(var r,i=t[0]||{},o=this.service+"/"+e,s=this.errors[e],a=s?(r=i,s.replace(v,function(e,t){var n=r[t];return null!=n?n.toString():"<"+t+"?>"})):"Error",c=this.serviceName+": "+a+" ("+o+").",u=new l(o,c),f=0,p=Object.keys(i);f<p.length;f++){var h=p[f];"_"!==h.slice(-1)&&(h in u&&console.warn('Overwriting FirebaseError base field "'+h+'" can cause unexpected behavior.'),u[h]=i[h])}return u},d);function d(e,t,n){this.service=e,this.serviceName=t,this.errors=n}var v=/\{\$([^}]+)}/g;function g(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function b(e,t){var n=new y(e,t);return n.subscribe.bind(n)}var y=(m.prototype.next=function(e){this.forEachObserver(function(t){t.next(e)})},m.prototype.error=function(e){this.forEachObserver(function(t){t.error(e)}),this.close(e)},m.prototype.complete=function(){this.forEachObserver(function(e){e.complete()}),this.close()},m.prototype.subscribe=function(e,t,n){var r,i=this;if(void 0===e&&void 0===t&&void 0===n)throw new Error("Missing Observer.");void 0===(r=function(e,t){if("object"==typeof e&&null!==e)for(var n=0,r=["next","error","complete"];n<r.length;n++){var i=r[n];if(i in e&&"function"==typeof e[i])return 1}}(e)?e:{next:e,error:t,complete:n}).next&&(r.next=w),void 0===r.error&&(r.error=w),void 0===r.complete&&(r.complete=w);var o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(function(){try{i.finalError?r.error(i.finalError):r.complete()}catch(e){}}),this.observers.push(r),o},m.prototype.unsubscribeOne=function(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],--this.observerCount,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))},m.prototype.forEachObserver=function(e){if(!this.finalized)for(var t=0;t<this.observers.length;t++)this.sendOne(t,e)},m.prototype.sendOne=function(e,t){var n=this;this.task.then(function(){if(void 0!==n.observers&&void 0!==n.observers[e])try{t(n.observers[e])}catch(e){"undefined"!=typeof console&&console.error&&console.error(e)}})},m.prototype.close=function(e){var t=this;this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then(function(){t.observers=void 0,t.onNoObservers=void 0}))},m);function m(e,t){var n=this;this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(function(){e(n)}).catch(function(e){n.error(e)})}function w(){}var k=(S.prototype.setInstantiationMode=function(e){return this.instantiationMode=e,this},S.prototype.setMultipleInstances=function(e){return this.multipleInstances=e,this},S.prototype.setServiceProps=function(e){return this.serviceProps=e,this},S);function S(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY"}var I="[DEFAULT]",_=(E.prototype.get=function(e){void 0===e&&(e=I);var t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){var n=new o;this.instancesDeferred.set(t,n);try{var r=this.getOrInitializeService(t);r&&n.resolve(r)}catch(e){}}return this.instancesDeferred.get(t).promise},E.prototype.getImmediate=function(e){var n=t({identifier:I,optional:!1},e),r=n.identifier,i=n.optional,o=this.normalizeInstanceIdentifier(r);try{var s=this.getOrInitializeService(o);if(s)return s;if(i)return null;throw Error("Service "+this.name+" is not available")}catch(e){if(i)return null;throw e}},E.prototype.getComponent=function(){return this.component},E.prototype.setComponent=function(e){var t,i;if(e.name!==this.name)throw Error("Mismatching Component "+e.name+" for Provider "+this.name+".");if(this.component)throw Error("Component for "+this.name+" has already been provided");if("EAGER"===(this.component=e).instantiationMode)try{this.getOrInitializeService(I)}catch(e){}try{for(var o=n(this.instancesDeferred.entries()),s=o.next();!s.done;s=o.next()){var a=r(s.value,2),c=a[0],u=a[1],l=this.normalizeInstanceIdentifier(c);try{var f=this.getOrInitializeService(l);u.resolve(f)}catch(e){}}}catch(e){t={error:e}}finally{try{s&&!s.done&&(i=o.return)&&i.call(o)}finally{if(t)throw t.error}}},E.prototype.clearInstance=function(e){void 0===e&&(e=I),this.instancesDeferred.delete(e),this.instances.delete(e)},E.prototype.delete=function(){return function(e,t,n,r){return new(n=n||Promise)(function(i,o){function s(e){try{c(r.next(e))}catch(e){o(e)}}function a(e){try{c(r.throw(e))}catch(e){o(e)}}function c(e){var t;e.done?i(e.value):((t=e.value)instanceof n?t:new n(function(e){e(t)})).then(s,a)}c((r=r.apply(e,t||[])).next())})}(this,void 0,void 0,function(){var e;return function(e,t){var n,r,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(o){return function(a){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,r=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!(i=0<(i=s.trys).length&&i[i.length-1])&&(6===o[0]||2===o[0])){s=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){s.label=o[1];break}if(6===o[0]&&s.label<i[1]){s.label=i[1],i=o;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(o);break}i[2]&&s.ops.pop(),s.trys.pop();continue}o=t.call(e,s)}catch(e){o=[6,e],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,a])}}}(this,function(t){switch(t.label){case 0:return e=Array.from(this.instances.values()),[4,Promise.all(e.filter(function(e){return"INTERNAL"in e}).map(function(e){return e.INTERNAL.delete()}))];case 1:return t.sent(),[2]}})})},E.prototype.isComponentSet=function(){return null!=this.component},E.prototype.getOrInitializeService=function(e){var t,n=this.instances.get(e);return!n&&this.component&&(n=this.component.instanceFactory(this.container,(t=e)===I?void 0:t),this.instances.set(e,n)),n||null},E.prototype.normalizeInstanceIdentifier=function(e){return!this.component||this.component.multipleInstances?e:I},E);function E(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map}var O,P=(C.prototype.addComponent=function(e){var t=this.getProvider(e.name);if(t.isComponentSet())throw new Error("Component "+e.name+" has already been registered with "+this.name);t.setComponent(e)},C.prototype.addOrOverwriteComponent=function(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)},C.prototype.getProvider=function(e){if(this.providers.has(e))return this.providers.get(e);var t=new _(e,this);return this.providers.set(e,t),t},C.prototype.getProviders=function(){return Array.from(this.providers.values())},C);function C(e){this.name=e,this.providers=new Map}function N(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var r=Array(e),i=0;for(t=0;t<n;t++)for(var o=arguments[t],s=0,a=o.length;s<a;s++,i++)r[i]=o[s];return r}var T,j,D=[];function x(e,t){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];if(!(t<e.logLevel)){var i=(new Date).toISOString(),o=M[t];if(!o)throw new Error("Attempted to log a message with an invalid logType (value: "+t+")");console[o].apply(console,N(["["+i+"]  "+e.name+":"],n))}}(j=T=T||{})[j.DEBUG=0]="DEBUG",j[j.VERBOSE=1]="VERBOSE",j[j.INFO=2]="INFO",j[j.WARN=3]="WARN",j[j.ERROR=4]="ERROR",j[j.SILENT=5]="SILENT";var A,L={debug:T.DEBUG,verbose:T.VERBOSE,info:T.INFO,warn:T.WARN,error:T.ERROR,silent:T.SILENT},R=T.INFO,M=((O={})[T.DEBUG]="log",O[T.VERBOSE]="log",O[T.INFO]="info",O[T.WARN]="warn",O[T.ERROR]="error",O),K=(Object.defineProperty(F.prototype,"logLevel",{get:function(){return this._logLevel},set:function(e){if(!(e in T))throw new TypeError('Invalid value "'+e+'" assigned to `logLevel`');this._logLevel=e},enumerable:!0,configurable:!0}),F.prototype.setLogLevel=function(e){this._logLevel="string"==typeof e?L[e]:e},Object.defineProperty(F.prototype,"logHandler",{get:function(){return this._logHandler},set:function(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e},enumerable:!0,configurable:!0}),Object.defineProperty(F.prototype,"userLogHandler",{get:function(){return this._userLogHandler},set:function(e){this._userLogHandler=e},enumerable:!0,configurable:!0}),F.prototype.debug=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,N([this,T.DEBUG],e)),this._logHandler.apply(this,N([this,T.DEBUG],e))},F.prototype.log=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,N([this,T.VERBOSE],e)),this._logHandler.apply(this,N([this,T.VERBOSE],e))},F.prototype.info=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,N([this,T.INFO],e)),this._logHandler.apply(this,N([this,T.INFO],e))},F.prototype.warn=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,N([this,T.WARN],e)),this._logHandler.apply(this,N([this,T.WARN],e))},F.prototype.error=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,N([this,T.ERROR],e)),this._logHandler.apply(this,N([this,T.ERROR],e))},F);function F(e){this.name=e,this._logLevel=R,this._logHandler=x,this._userLogHandler=null,D.push(this)}function B(e){D.forEach(function(t){t.setLogLevel(e)})}var H,V=((A={})["no-app"]="No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",A["bad-app-name"]="Illegal App name: '{$appName}",A["duplicate-app"]="Firebase App named '{$appName}' already exists",A["app-deleted"]="Firebase App named '{$appName}' already deleted",A["invalid-app-argument"]="firebase.{$appName}() takes either no argument or a Firebase App instance.",A["invalid-log-argument"]="First argument to `onLog` must be null or a function.",A),q=new h("app","Firebase",V),W="@firebase/app",U="[DEFAULT]",z=((H={})[W]="fire-core",H["@firebase/analytics"]="fire-analytics",H["@firebase/auth"]="fire-auth",H["@firebase/database"]="fire-rtdb",H["@firebase/functions"]="fire-fn",H["@firebase/installations"]="fire-iid",H["@firebase/messaging"]="fire-fcm",H["@firebase/performance"]="fire-perf",H["@firebase/remote-config"]="fire-rc",H["@firebase/storage"]="fire-gcs",H["@firebase/firestore"]="fire-fst",H["fire-js"]="fire-js",H["firebase-wrapper"]="fire-js-all",H),$=new K("@firebase/app"),G=(Object.defineProperty(J.prototype,"automaticDataCollectionEnabled",{get:function(){return this.checkDestroyed_(),this.automaticDataCollectionEnabled_},set:function(e){this.checkDestroyed_(),this.automaticDataCollectionEnabled_=e},enumerable:!0,configurable:!0}),Object.defineProperty(J.prototype,"name",{get:function(){return this.checkDestroyed_(),this.name_},enumerable:!0,configurable:!0}),Object.defineProperty(J.prototype,"options",{get:function(){return this.checkDestroyed_(),this.options_},enumerable:!0,configurable:!0}),J.prototype.delete=function(){var e=this;return new Promise(function(t){e.checkDestroyed_(),t()}).then(function(){return e.firebase_.INTERNAL.removeApp(e.name_),Promise.all(e.container.getProviders().map(function(e){return e.delete()}))}).then(function(){e.isDeleted_=!0})},J.prototype._getService=function(e,t){return void 0===t&&(t=U),this.checkDestroyed_(),this.container.getProvider(e).getImmediate({identifier:t})},J.prototype._removeServiceInstance=function(e,t){void 0===t&&(t=U),this.container.getProvider(e).clearInstance(t)},J.prototype._addComponent=function(e){try{this.container.addComponent(e)}catch(t){$.debug("Component "+e.name+" failed to register with FirebaseApp "+this.name,t)}},J.prototype._addOrOverwriteComponent=function(e){this.container.addOrOverwriteComponent(e)},J.prototype.checkDestroyed_=function(){if(this.isDeleted_)throw q.create("app-deleted",{appName:this.name_})},J);function J(e,t,r){var o,s,a=this;this.firebase_=r,this.isDeleted_=!1,this.name_=t.name,this.automaticDataCollectionEnabled_=t.automaticDataCollectionEnabled||!1,this.options_=i(void 0,e),this.container=new P(t.name),this._addComponent(new k("app",function(){return a},"PUBLIC"));try{for(var c=n(this.firebase_.INTERNAL.components.values()),u=c.next();!u.done;u=c.next()){var l=u.value;this._addComponent(l)}}catch(e){o={error:e}}finally{try{u&&!u.done&&(s=c.return)&&s.call(c)}finally{if(o)throw o.error}}}G.prototype.name&&G.prototype.options||G.prototype.delete||console.log("dc");var Y="7.15.0";var Z=function e(){var r=function(e){var t={},r=new Map,o={__esModule:!0,initializeApp:function(n,r){void 0===r&&(r={}),"object"==typeof r&&null!==r||(r={name:r});var i=r;void 0===i.name&&(i.name=U);var s=i.name;if("string"!=typeof s||!s)throw q.create("bad-app-name",{appName:String(s)});if(g(t,s))throw q.create("duplicate-app",{appName:s});var a=new e(n,i,o);return t[s]=a},app:s,registerVersion:function(e,t,n){var r,i=null!==(r=z[e])&&void 0!==r?r:e;n&&(i+="-"+n);var o=i.match(/\s|\//),s=t.match(/\s|\//);if(o||s){var c=['Unable to register library "'+i+'" with version "'+t+'":'];return o&&c.push('library name "'+i+'" contains illegal characters (whitespace or "/")'),o&&s&&c.push("and"),s&&c.push('version name "'+t+'" contains illegal characters (whitespace or "/")'),void $.warn(c.join(" "))}a(new k(i+"-version",function(){return{library:i,version:t}},"VERSION"))},setLogLevel:B,onLog:function(e,t){if(null!==e&&"function"!=typeof e)throw q.create("invalid-log-argument",{appName:name});!function(e,t){for(var n=function(n){var r=null;t&&t.level&&(r=L[t.level]),n.userLogHandler=null===e?null:function(t,n){for(var i=[],o=2;o<arguments.length;o++)i[o-2]=arguments[o];var s=i.map(function(e){if(null==e)return null;if("string"==typeof e)return e;if("number"==typeof e||"boolean"==typeof e)return e.toString();if(e instanceof Error)return e.message;try{return JSON.stringify(e)}catch(e){return null}}).filter(function(e){return e}).join(" ");n>=(null!=r?r:t.logLevel)&&e({level:T[n].toLowerCase(),message:s,args:i,type:t.name})}},r=0,i=D;r<i.length;r++)n(i[r])}(e,t)},apps:null,SDK_VERSION:Y,INTERNAL:{registerComponent:a,removeApp:function(e){delete t[e]},components:r,useAsService:function(e,t){return"serverAuth"!==t?t:null}}};function s(e){if(!g(t,e=e||U))throw q.create("no-app",{appName:e});return t[e]}function a(a){var c,u,l=a.name;if(r.has(l))return $.debug("There were multiple attempts to register component "+l+"."),"PUBLIC"===a.type?o[l]:null;if(r.set(l,a),"PUBLIC"===a.type){var f=function(e){if(void 0===e&&(e=s()),"function"!=typeof e[l])throw q.create("invalid-app-argument",{appName:l});return e[l]()};void 0!==a.serviceProps&&i(f,a.serviceProps),o[l]=f,e.prototype[l]=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return this._getService.bind(this,l).apply(this,a.multipleInstances?e:[])}}try{for(var p=n(Object.keys(t)),h=p.next();!h.done;h=p.next()){var d=h.value;t[d]._addComponent(a)}}catch(u){c={error:u}}finally{try{h&&!h.done&&(u=p.return)&&u.call(p)}finally{if(c)throw c.error}}return"PUBLIC"===a.type?o[l]:null}return o.default=o,Object.defineProperty(o,"apps",{get:function(){return Object.keys(t).map(function(e){return t[e]})}}),s.App=e,o}(G);return r.INTERNAL=t(t({},r.INTERNAL),{createFirebaseNamespace:e,extendNamespace:function(e){i(r,e)},createSubscribe:b,ErrorFactory:h,deepExtend:i}),r}(),Q=(X.prototype.getPlatformInfoString=function(){return this.container.getProviders().map(function(e){if("VERSION"!==(null==(t=e.getComponent())?void 0:t.type))return null;var t,n=e.getImmediate();return n.library+"/"+n.version}).filter(function(e){return e}).join(" ")},X);function X(e){this.container=e}if("object"==typeof self&&self.self===self&&void 0!==self.firebase){$.warn("\n    Warning: Firebase is already defined in the global scope. Please make sure\n    Firebase library is only loaded once.\n  ");var ee=self.firebase.SDK_VERSION;ee&&0<=ee.indexOf("LITE")&&$.warn("\n    Warning: You are trying to load Firebase while using Firebase Performance standalone script.\n    You should load Firebase Performance with this instance of Firebase to avoid loading duplicate code.\n    ")}var te=Z.initializeApp;Z.initializeApp=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return function(){try{return"[object process]"===Object.prototype.toString.call(global.process)}catch(e){return}}()&&$.warn('\n      Warning: This is a browser-targeted Firebase bundle but it appears it is being\n      run in a Node environment.  If running in a Node environment, make sure you\n      are using the bundle specified by the "main" field in package.json.\n      \n      If you are using Webpack, you can specify "main" as the first item in\n      "resolve.mainFields":\n      https://webpack.js.org/configuration/resolve/#resolvemainfields\n      \n      If using Rollup, use the rollup-plugin-node-resolve plugin and specify "main"\n      as the first item in "mainFields", e.g. [\'main\', \'module\'].\n      https://github.com/rollup/rollup-plugin-node-resolve\n      '),te.apply(void 0,e)};var ne,re=Z;return(ne=re).INTERNAL.registerComponent(new k("platform-logger",function(e){return new Q(e)},"PRIVATE")),ne.registerVersion(W,"0.6.5",void 0),ne.registerVersion("fire-js",""),re.registerVersion("firebase","7.15.0","app"),re}),function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(require("@firebase/app")):"function"==typeof define&&define.amd?define(["@firebase/app"],t):t((e=e||self).firebase)}(this,function(e){"use strict";try{(function(){e=e&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e;var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,n)},n=function(){return(n=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)};function r(e,t,n,r){return new(n=n||Promise)(function(i,o){function s(e){try{c(r.next(e))}catch(e){o(e)}}function a(e){try{c(r.throw(e))}catch(e){o(e)}}function c(e){var t;e.done?i(e.value):((t=e.value)instanceof n?t:new n(function(e){e(t)})).then(s,a)}c((r=r.apply(e,t||[])).next())})}function i(e,t){var n,r,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(o){return function(a){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,r=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!(i=0<(i=s.trys).length&&i[i.length-1])&&(6===o[0]||2===o[0])){s=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){s.label=o[1];break}if(6===o[0]&&s.label<i[1]){s.label=i[1],i=o;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(o);break}i[2]&&s.ops.pop(),s.trys.pop();continue}o=t.call(e,s)}catch(e){o=[6,e],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,a])}}}function o(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function s(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,i,o=n.call(e),s=[];try{for(;(void 0===t||0<t--)&&!(r=o.next()).done;)s.push(r.value)}catch(e){i={error:e}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(i)throw i.error}}return s}function a(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(s(arguments[t]));return e}var c,u,l,f=(c=Error,t(u=h,l=c),u.prototype=null===l?Object.create(l):(p.prototype=l.prototype,new p),h);function p(){this.constructor=u}function h(e,t){var n=c.call(this,t)||this;return n.code=e,n.name="FirebaseError",Object.setPrototypeOf(n,h.prototype),Error.captureStackTrace&&Error.captureStackTrace(n,d.prototype.create),n}var d=(v.prototype.create=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];for(var r,i=t[0]||{},o=this.service+"/"+e,s=this.errors[e],a=s?(r=i,s.replace(g,function(e,t){var n=r[t];return null!=n?n.toString():"<"+t+"?>"})):"Error",c=this.serviceName+": "+a+" ("+o+").",u=new f(o,c),l=0,p=Object.keys(i);l<p.length;l++){var h=p[l];"_"!==h.slice(-1)&&(h in u&&console.warn('Overwriting FirebaseError base field "'+h+'" can cause unexpected behavior.'),u[h]=i[h])}return u},v);function v(e,t,n){this.service=e,this.serviceName=t,this.errors=n}var g=/\{\$([^}]+)}/g,b=(y.prototype.setInstantiationMode=function(e){return this.instantiationMode=e,this},y.prototype.setMultipleInstances=function(e){return this.multipleInstances=e,this},y.prototype.setServiceProps=function(e){return this.serviceProps=e,this},y);function y(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY"}function m(e){return new Promise(function(t,n){e.onsuccess=function(){t(e.result)},e.onerror=function(){n(e.error)}})}function w(e,t,n){var r,i=new Promise(function(i,o){m(r=e[t].apply(e,n)).then(i,o)});return i.request=r,i}function k(e,t,n){n.forEach(function(n){Object.defineProperty(e.prototype,n,{get:function(){return this[t][n]},set:function(e){this[t][n]=e}})})}function S(e,t,n,r){r.forEach(function(r){r in n.prototype&&(e.prototype[r]=function(){return w(this[t],r,arguments)})})}function I(e,t,n,r){r.forEach(function(r){r in n.prototype&&(e.prototype[r]=function(){return this[t][r].apply(this[t],arguments)})})}function _(e,t,n,r){r.forEach(function(r){r in n.prototype&&(e.prototype[r]=function(){return e=this[t],(n=w(e,r,arguments)).then(function(e){if(e)return new O(e,n.request)});var e,n})})}function E(e){this._index=e}function O(e,t){this._cursor=e,this._request=t}function P(e){this._store=e}function C(e){this._tx=e,this.complete=new Promise(function(t,n){e.oncomplete=function(){t()},e.onerror=function(){n(e.error)},e.onabort=function(){n(e.error)}})}function N(e,t,n){this._db=e,this.oldVersion=t,this.transaction=new C(n)}function T(e){this._db=e}function j(e,t,n){var r=w(indexedDB,"open",[e,t]),i=r.request;return i&&(i.onupgradeneeded=function(e){n&&n(new N(i.result,e.oldVersion,i.transaction))}),r.then(function(e){return new T(e)})}function D(e){return w(indexedDB,"deleteDatabase",[e])}k(E,"_index",["name","keyPath","multiEntry","unique"]),S(E,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),_(E,"_index",IDBIndex,["openCursor","openKeyCursor"]),k(O,"_cursor",["direction","key","primaryKey","value"]),S(O,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach(function(e){e in IDBCursor.prototype&&(O.prototype[e]=function(){var t=this,n=arguments;return Promise.resolve().then(function(){return t._cursor[e].apply(t._cursor,n),m(t._request).then(function(e){if(e)return new O(e,t._request)})})})}),P.prototype.createIndex=function(){return new E(this._store.createIndex.apply(this._store,arguments))},P.prototype.index=function(){return new E(this._store.index.apply(this._store,arguments))},k(P,"_store",["name","keyPath","indexNames","autoIncrement"]),S(P,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]),_(P,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),I(P,"_store",IDBObjectStore,["deleteIndex"]),C.prototype.objectStore=function(){return new P(this._tx.objectStore.apply(this._tx,arguments))},k(C,"_tx",["objectStoreNames","mode"]),I(C,"_tx",IDBTransaction,["abort"]),N.prototype.createObjectStore=function(){return new P(this._db.createObjectStore.apply(this._db,arguments))},k(N,"_db",["name","version","objectStoreNames"]),I(N,"_db",IDBDatabase,["deleteObjectStore","close"]),T.prototype.transaction=function(){return new C(this._db.transaction.apply(this._db,arguments))},k(T,"_db",["name","version","objectStoreNames"]),I(T,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach(function(e){[P,E].forEach(function(t){e in t.prototype&&(t.prototype[e.replace("open","iterate")]=function(){var t,n=(t=arguments,Array.prototype.slice.call(t)),r=n[n.length-1],i=this._store||this._index,o=i[e].apply(i,n.slice(0,-1));o.onsuccess=function(){r(o.result)}})})}),[E,P].forEach(function(e){e.prototype.getAll||(e.prototype.getAll=function(e,t){var n=this,r=[];return new Promise(function(i){n.iterateCursor(e,function(e){e?(r.push(e.value),void 0===t||r.length!=t?e.continue():i(r)):i(r)})})})});var x,A="0.4.11",L=1e4,R="w:"+A,M="FIS_v2",K="https://firebaseinstallations.googleapis.com/v1",F=36e5,B=((x={})["missing-app-config-values"]='Missing App configuration value: "{$valueName}"',x["not-registered"]="Firebase Installation is not registered.",x["installation-not-found"]="Firebase Installation not found.",x["request-failed"]='{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',x["app-offline"]="Could not process request. Application offline.",x["delete-pending-registration"]="Can't delete installation while there is a pending registration request.",x),H=new d("installations","Installations",B);function V(e){return e instanceof f&&e.code.includes("request-failed")}function q(e){var t=e.projectId;return K+"/projects/"+t+"/installations"}function W(e){return{token:e.token,requestStatus:2,expiresIn:(t=e.expiresIn,Number(t.replace("s","000"))),creationTime:Date.now()};var t}function U(e,t){return r(this,void 0,void 0,function(){var n,r;return i(this,function(i){switch(i.label){case 0:return[4,t.json()];case 1:return n=i.sent(),r=n.error,[2,H.create("request-failed",{requestName:e,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})]}})})}function z(e){var t=e.apiKey;return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function $(e,t){var n=t.refreshToken,r=z(e);return r.append("Authorization",M+" "+n),r}function G(e){return r(this,void 0,void 0,function(){var t;return i(this,function(n){switch(n.label){case 0:return[4,e()];case 1:return 500<=(t=n.sent()).status&&t.status<600?[2,e()]:[2,t]}})})}function J(e){return new Promise(function(t){setTimeout(t,e)})}var Y=/^[cdef][\w-]{21}$/,Z="";function Q(){try{var e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;var t=function(e){return btoa(String.fromCharCode.apply(String,a(e))).replace(/\+/g,"-").replace(/\//g,"_")}(e).substr(0,22);return Y.test(t)?t:Z}catch(e){return Z}}function X(e){return e.appName+"!"+e.appId}var ee=new Map;function te(e,t){var n=X(e);ne(n,t),function(e,t){var n=ie();n&&n.postMessage({key:e,fid:t}),oe()}(n,t)}function ne(e,t){var n,r,i=ee.get(e);if(i)try{for(var s=o(i),a=s.next();!a.done;a=s.next())(0,a.value)(t)}catch(e){n={error:e}}finally{try{a&&!a.done&&(r=s.return)&&r.call(s)}finally{if(n)throw n.error}}}var re=null;function ie(){return!re&&"BroadcastChannel"in self&&((re=new BroadcastChannel("[Firebase] FID Change")).onmessage=function(e){ne(e.data.key,e.data.fid)}),re}function oe(){0===ee.size&&re&&(re.close(),re=null)}var se,ae,ce="firebase-installations-database",ue=1,le="firebase-installations-store",fe=null;function pe(){return fe=fe||j(ce,ue,function(e){switch(e.oldVersion){case 0:e.createObjectStore(le)}})}function he(e,t){return r(this,void 0,void 0,function(){var n,r,o,s,a;return i(this,function(i){switch(i.label){case 0:return n=X(e),[4,pe()];case 1:return r=i.sent(),o=r.transaction(le,"readwrite"),[4,(s=o.objectStore(le)).get(n)];case 2:return a=i.sent(),[4,s.put(t,n)];case 3:return i.sent(),[4,o.complete];case 4:return i.sent(),a&&a.fid===t.fid||te(e,t.fid),[2,t]}})})}function de(e){return r(this,void 0,void 0,function(){var t,n,r;return i(this,function(i){switch(i.label){case 0:return t=X(e),[4,pe()];case 1:return n=i.sent(),[4,(r=n.transaction(le,"readwrite")).objectStore(le).delete(t)];case 2:return i.sent(),[4,r.complete];case 3:return i.sent(),[2]}})})}function ve(e,t){return r(this,void 0,void 0,function(){var n,r,o,s,a,c;return i(this,function(i){switch(i.label){case 0:return n=X(e),[4,pe()];case 1:return r=i.sent(),o=r.transaction(le,"readwrite"),[4,(s=o.objectStore(le)).get(n)];case 2:return a=i.sent(),void 0!==(c=t(a))?[3,4]:[4,s.delete(n)];case 3:return i.sent(),[3,6];case 4:return[4,s.put(c,n)];case 5:i.sent(),i.label=6;case 6:return[4,o.complete];case 7:return i.sent(),!c||a&&a.fid===c.fid||te(e,c.fid),[2,c]}})})}function ge(e){return r(this,void 0,void 0,function(){var t,n,o;return i(this,function(s){switch(s.label){case 0:return[4,ve(e,function(n){var o=ye(n||{fid:Q(),registrationStatus:0}),s=function(e,t){if(0!==t.registrationStatus)return 1===t.registrationStatus?{installationEntry:t,registrationPromise:function(e){return r(this,void 0,void 0,function(){var t,n,r,o;return i(this,function(i){switch(i.label){case 0:return[4,be(e)];case 1:t=i.sent(),i.label=2;case 2:return 1!==t.registrationStatus?[3,5]:[4,J(100)];case 3:return i.sent(),[4,be(e)];case 4:return t=i.sent(),[3,2];case 5:return 0!==t.registrationStatus?[3,7]:[4,ge(e)];case 6:return n=i.sent(),r=n.installationEntry,(o=n.registrationPromise)?[2,o]:[2,r];case 7:return[2,t]}})})}(e)}:{installationEntry:t};if(!navigator.onLine)return{installationEntry:t,registrationPromise:Promise.reject(H.create("app-offline"))};var n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},o=function(e,t){return r(this,void 0,void 0,function(){var n,o;return i(this,function(s){switch(s.label){case 0:return s.trys.push([0,2,,7]),[4,function(e,n){var o=t.fid;return r(this,void 0,void 0,function(){var t,n,r,s,a,c;return i(this,function(i){switch(i.label){case 0:return t=q(e),n=z(e),r={fid:o,authVersion:M,appId:e.appId,sdkVersion:R},s={method:"POST",headers:n,body:JSON.stringify(r)},[4,G(function(){return fetch(t,s)})];case 1:return(a=i.sent()).ok?[4,a.json()]:[3,3];case 2:return[2,{fid:(c=i.sent()).fid||o,registrationStatus:2,refreshToken:c.refreshToken,authToken:W(c.authToken)}];case 3:return[4,U("Create Installation",a)];case 4:throw i.sent()}})})}(e)];case 1:return n=s.sent(),[2,he(e,n)];case 2:return V(o=s.sent())&&409===o.serverCode?[4,de(e)]:[3,4];case 3:return s.sent(),[3,6];case 4:return[4,he(e,{fid:t.fid,registrationStatus:0})];case 5:s.sent(),s.label=6;case 6:throw o;case 7:return[2]}})})}(e,n);return{installationEntry:n,registrationPromise:o}}(e,o);return t=s.registrationPromise,s.installationEntry})];case 1:return(n=s.sent()).fid!==Z?[3,3]:(o={},[4,t]);case 2:return[2,(o.installationEntry=s.sent(),o)];case 3:return[2,{installationEntry:n,registrationPromise:t}]}})})}function be(e){return ve(e,function(e){if(!e)throw H.create("installation-not-found");return ye(e)})}function ye(e){return 1===(t=e).registrationStatus&&t.registrationTime+L<Date.now()?{fid:e.fid,registrationStatus:0}:e;var t}function me(e,t){var n=e.appConfig,o=e.platformLoggerProvider;return r(this,void 0,void 0,function(){var e,r,s,a,c,u;return i(this,function(i){switch(i.label){case 0:return l=n,f=t.fid,e=q(l)+"/"+f+"/authTokens:generate",r=$(n,t),(s=o.getImmediate({optional:!0}))&&r.append("x-firebase-client",s.getPlatformInfoString()),a={installation:{sdkVersion:R}},c={method:"POST",headers:r,body:JSON.stringify(a)},[4,G(function(){return fetch(e,c)})];case 1:return(u=i.sent()).ok?[4,u.json()]:[3,3];case 2:return[2,W(i.sent())];case 3:return[4,U("Generate Auth Token",u)];case 4:throw i.sent()}var l,f})})}function we(e,t){return void 0===t&&(t=!1),r(this,void 0,void 0,function(){var o,s,a;return i(this,function(c){switch(c.label){case 0:return[4,ve(e.appConfig,function(s){if(!Se(s))throw H.create("not-registered");var a,c,u,l=s.authToken;if(t||2!==(u=l).requestStatus||function(e){var t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+F}(u)){if(1===l.requestStatus)return o=function(e,t){return r(this,void 0,void 0,function(){var n,r;return i(this,function(i){switch(i.label){case 0:return[4,ke(e.appConfig)];case 1:n=i.sent(),i.label=2;case 2:return 1!==n.authToken.requestStatus?[3,5]:[4,J(100)];case 3:return i.sent(),[4,ke(e.appConfig)];case 4:return n=i.sent(),[3,2];case 5:return 0===(r=n.authToken).requestStatus?[2,we(e,t)]:[2,r]}})})}(e,t),s;if(!navigator.onLine)throw H.create("app-offline");var f=(a=s,c={requestStatus:1,requestTime:Date.now()},n(n({},a),{authToken:c}));return o=function(e,t){return r(this,void 0,void 0,function(){var r,o,s;return i(this,function(i){switch(i.label){case 0:return i.trys.push([0,3,,8]),[4,me(e,t)];case 1:return r=i.sent(),s=n(n({},t),{authToken:r}),[4,he(e.appConfig,s)];case 2:return i.sent(),[2,r];case 3:return!V(o=i.sent())||401!==o.serverCode&&404!==o.serverCode?[3,5]:[4,de(e.appConfig)];case 4:return i.sent(),[3,7];case 5:return s=n(n({},t),{authToken:{requestStatus:0}}),[4,he(e.appConfig,s)];case 6:i.sent(),i.label=7;case 7:throw o;case 8:return[2]}})})}(e,f),f}return s})];case 1:return s=c.sent(),o?[4,o]:[3,3];case 2:return a=c.sent(),[3,4];case 3:a=s.authToken,c.label=4;case 4:return[2,a]}})})}function ke(e){return ve(e,function(e){if(!Se(e))throw H.create("not-registered");var t;return 1===(t=e.authToken).requestStatus&&t.requestTime+L<Date.now()?n(n({},e),{authToken:{requestStatus:0}}):e})}function Se(e){return void 0!==e&&2===e.registrationStatus}function Ie(e,t){return r(this,void 0,void 0,function(){var n,r,o,s;return i(this,function(i){switch(i.label){case 0:return a=e,c=t.fid,n=q(a)+"/"+c,r=$(e,t),o={method:"DELETE",headers:r},[4,G(function(){return fetch(n,o)})];case 1:return(s=i.sent()).ok?[3,3]:[4,U("Delete Installation",s)];case 2:throw i.sent();case 3:return[2]}var a,c})})}function _e(e){return H.create("missing-app-config-values",{valueName:e})}(se=e).INTERNAL.registerComponent(new b("installations",function(e){var t=e.getProvider("app").getImmediate(),n={appConfig:function(e){var t,n;if(!e||!e.options)throw _e("App Configuration");if(!e.name)throw _e("App Name");try{for(var r=o(["projectId","apiKey","appId"]),i=r.next();!i.done;i=r.next()){var s=i.value;if(!e.options[s])throw _e(s)}}catch(e){t={error:e}}finally{try{i&&!i.done&&(n=r.return)&&n.call(r)}finally{if(t)throw t.error}}return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}(t),platformLoggerProvider:e.getProvider("platform-logger")};return{app:t,getId:function(){return function(e){return r(this,void 0,void 0,function(){var t,n,r;return i(this,function(i){switch(i.label){case 0:return[4,ge(e.appConfig)];case 1:return t=i.sent(),n=t.installationEntry,(r=t.registrationPromise)?r.catch(console.error):we(e).catch(console.error),[2,n.fid]}})})}(n)},getToken:function(e){return function(e,t){return void 0===t&&(t=!1),r(this,void 0,void 0,function(){return i(this,function(n){switch(n.label){case 0:return[4,function(e){return r(this,void 0,void 0,function(){var t;return i(this,function(n){switch(n.label){case 0:return[4,ge(e)];case 1:return(t=n.sent().registrationPromise)?[4,t]:[3,3];case 2:n.sent(),n.label=3;case 3:return[2]}})})}(e.appConfig)];case 1:return n.sent(),[4,we(e,t)];case 2:return[2,n.sent().token]}})})}(n,e)},delete:function(){return function(e){return r(this,void 0,void 0,function(){var t,n;return i(this,function(r){switch(r.label){case 0:return[4,ve(t=e.appConfig,function(e){if(!e||0!==e.registrationStatus)return e})];case 1:if(!(n=r.sent()))return[3,6];if(1!==n.registrationStatus)return[3,2];throw H.create("delete-pending-registration");case 2:if(2!==n.registrationStatus)return[3,6];if(navigator.onLine)return[3,3];throw H.create("app-offline");case 3:return[4,Ie(t,n)];case 4:return r.sent(),[4,de(t)];case 5:r.sent(),r.label=6;case 6:return[2]}})})}(n)},onIdChange:function(e){return function(e,t){var n=e.appConfig;return function(e,t){ie();var n=X(e),r=ee.get(n);r||(r=new Set,ee.set(n,r)),r.add(t)}(n,t),function(){var e,r,i;e=t,r=X(n),(i=ee.get(r))&&(i.delete(e),0===i.size&&ee.delete(r),oe())}}(n,e)}}},"PUBLIC")),se.registerVersion("@firebase/installations",A);var Ee=((ae={})["missing-app-config-values"]='Missing App configuration value: "{$valueName}"',ae["only-available-in-window"]="This method is available in a Window context.",ae["only-available-in-sw"]="This method is available in a service worker context.",ae["permission-default"]="The notification permission was not granted and dismissed instead.",ae["permission-blocked"]="The notification permission was not granted and blocked instead.",ae["unsupported-browser"]="This browser doesn't support the API's required to use the firebase SDK.",ae["failed-service-worker-registration"]="We are unable to register the default service worker. {$browserErrorMessage}",ae["token-subscribe-failed"]="A problem occured while subscribing the user to FCM: {$errorInfo}",ae["token-subscribe-no-token"]="FCM returned no token when subscribing the user to push.",ae["token-unsubscribe-failed"]="A problem occured while unsubscribing the user from FCM: {$errorInfo}",ae["token-update-failed"]="A problem occured while updating the user from FCM: {$errorInfo}",ae["token-update-no-token"]="FCM returned no token when updating the user to push.",ae["use-sw-after-get-token"]="The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.",ae["invalid-sw-registration"]="The input to useServiceWorker() must be a ServiceWorkerRegistration.",ae["invalid-bg-handler"]="The input to setBackgroundMessageHandler() must be a function.",ae["invalid-vapid-key"]="The public VAPID key must be a string.",ae["use-vapid-key-after-get-token"]="The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used.",ae),Oe=new d("messaging","Messaging",Ee);function Pe(e){return Oe.create("missing-app-config-values",{valueName:e})}function Ce(e){var t=new Uint8Array(e);return btoa(String.fromCharCode.apply(String,a(t))).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}var Ne="fcm_token_details_db",Te=5,je="fcm_token_object_Store";function De(e){return r(this,void 0,void 0,function(){var t,n=this;return i(this,function(o){switch(o.label){case 0:return"databases"in indexedDB?[4,indexedDB.databases()]:[3,2];case 1:if(!o.sent().map(function(e){return e.name}).includes(Ne))return[2,null];o.label=2;case 2:return t=null,[4,j(Ne,Te,function(o){return r(n,void 0,void 0,function(){var n,r,s,a;return i(this,function(i){switch(i.label){case 0:return o.oldVersion<2?[2]:o.objectStoreNames.contains(je)?[4,(n=o.transaction.objectStore(je)).index("fcmSenderId").get(e)]:[2];case 1:return r=i.sent(),[4,n.clear()];case 2:if(i.sent(),!r)return[2];if(2===o.oldVersion){if(!(s=r).auth||!s.p256dh||!s.endpoint)return[2];t={token:s.fcmToken,createTime:null!==(a=s.createTime)&&void 0!==a?a:Date.now(),subscriptionOptions:{auth:s.auth,p256dh:s.p256dh,endpoint:s.endpoint,swScope:s.swScope,vapidKey:"string"==typeof s.vapidKey?s.vapidKey:Ce(s.vapidKey)}}}else(3===o.oldVersion||4===o.oldVersion)&&(t={token:(s=r).fcmToken,createTime:s.createTime,subscriptionOptions:{auth:Ce(s.auth),p256dh:Ce(s.p256dh),endpoint:s.endpoint,swScope:s.swScope,vapidKey:Ce(s.vapidKey)}});return[2]}})})})];case 3:return o.sent().close(),[4,D(Ne)];case 4:return o.sent(),[4,D("fcm_vapid_details_db")];case 5:return o.sent(),[4,D("undefined")];case 6:return o.sent(),[2,function(e){if(e&&e.subscriptionOptions){var t=e.subscriptionOptions;return"number"==typeof e.createTime&&0<e.createTime&&"string"==typeof e.token&&0<e.token.length&&"string"==typeof t.auth&&0<t.auth.length&&"string"==typeof t.p256dh&&0<t.p256dh.length&&"string"==typeof t.endpoint&&0<t.endpoint.length&&"string"==typeof t.swScope&&0<t.swScope.length&&"string"==typeof t.vapidKey&&0<t.vapidKey.length}}(t)?t:null]}})})}var xe="firebase-messaging-database",Ae=1,Le="firebase-messaging-store",Re=null;function Me(){return Re=Re||j(xe,Ae,function(e){switch(e.oldVersion){case 0:e.createObjectStore(Le)}})}function Ke(e){return r(this,void 0,void 0,function(){var t,n,r;return i(this,function(i){switch(i.label){case 0:return t=Be(e),[4,Me()];case 1:return[4,i.sent().transaction(Le).objectStore(Le).get(t)];case 2:return(n=i.sent())?[2,n]:[3,3];case 3:return[4,De(e.appConfig.senderId)];case 4:return(r=i.sent())?[4,Fe(e,r)]:[3,6];case 5:return i.sent(),[2,r];case 6:return[2]}})})}function Fe(e,t){return r(this,void 0,void 0,function(){var n,r,o;return i(this,function(i){switch(i.label){case 0:return n=Be(e),[4,Me()];case 1:return r=i.sent(),[4,(o=r.transaction(Le,"readwrite")).objectStore(Le).put(t,n)];case 2:return i.sent(),[4,o.complete];case 3:return i.sent(),[2,t]}})})}function Be(e){return e.appConfig.appId}var He,Ve,qe="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",We="https://fcmregistrations.googleapis.com/v1",Ue="FCM_MSG",ze="google.c.a.c_id";function $e(e,t){return r(this,void 0,void 0,function(){var n,r,o,s,a;return i(this,function(i){switch(i.label){case 0:return[4,Je(e)];case 1:n=i.sent(),r={method:"DELETE",headers:n},i.label=2;case 2:return i.trys.push([2,5,,6]),[4,fetch(Ge(e.appConfig)+"/"+t,r)];case 3:return[4,i.sent().json()];case 4:if((o=i.sent()).error)throw s=o.error.message,Oe.create("token-unsubscribe-failed",{errorInfo:s});return[3,6];case 5:throw a=i.sent(),Oe.create("token-unsubscribe-failed",{errorInfo:a});case 6:return[2]}})})}function Ge(e){var t=e.projectId;return We+"/projects/"+t+"/registrations"}function Je(e){var t=e.appConfig,n=e.installations;return r(this,void 0,void 0,function(){var e;return i(this,function(r){switch(r.label){case 0:return[4,n.getToken()];case 1:return e=r.sent(),[2,new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t.apiKey,"x-goog-firebase-installations-auth":"FIS "+e})]}})})}function Ye(e){var t=e.p256dh,n=e.auth,r=e.endpoint,i=e.vapidKey,o={web:{endpoint:r,auth:n,p256dh:t}};return i!==qe&&(o.web.applicationPubKey=i),o}function Ze(e,t,o){return r(this,void 0,void 0,function(){var s,a,c,u;return i(this,function(l){switch(l.label){case 0:if("granted"!==Notification.permission)throw Oe.create("permission-blocked");return[4,function(e,t){return r(this,void 0,void 0,function(){var n;return i(this,function(r){switch(r.label){case 0:return[4,e.pushManager.getSubscription()];case 1:return(n=r.sent())?[2,n]:[2,e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:function(e){for(var t=(e+"=".repeat((4-e.length%4)%4)).replace(/\-/g,"+").replace(/_/g,"/"),n=atob(t),r=new Uint8Array(n.length),i=0;i<n.length;++i)r[i]=n.charCodeAt(i);return r}(t)})]}})})}(t,o)];case 1:return s=l.sent(),[4,Ke(e)];case 2:return a=l.sent(),c={vapidKey:o,swScope:t.scope,endpoint:s.endpoint,auth:Ce(s.getKey("auth")),p256dh:Ce(s.getKey("p256dh"))},a?[3,3]:[2,Xe(e,c)];case 3:if(f=a.subscriptionOptions,h=(p=c).vapidKey===f.vapidKey,d=p.endpoint===f.endpoint,v=p.auth===f.auth,g=p.p256dh===f.p256dh,h&&d&&v&&g)return[3,8];l.label=4;case 4:return l.trys.push([4,6,,7]),[4,$e(e,a.token)];case 5:return l.sent(),[3,7];case 6:return u=l.sent(),console.warn(u),[3,7];case 7:return[2,Xe(e,c)];case 8:return Date.now()>=a.createTime+6048e5?[2,function(e,t,o){return r(this,void 0,void 0,function(){var s,a,c;return i(this,function(u){switch(u.label){case 0:return u.trys.push([0,3,,5]),[4,function(e,t){return r(this,void 0,void 0,function(){var n,r,o,s,a,c;return i(this,function(i){switch(i.label){case 0:return[4,Je(e)];case 1:n=i.sent(),r=Ye(t.subscriptionOptions),o={method:"PATCH",headers:n,body:JSON.stringify(r)},i.label=2;case 2:return i.trys.push([2,5,,6]),[4,fetch(Ge(e.appConfig)+"/"+t.token,o)];case 3:return[4,i.sent().json()];case 4:return s=i.sent(),[3,6];case 5:throw a=i.sent(),Oe.create("token-update-failed",{errorInfo:a});case 6:if(s.error)throw c=s.error.message,Oe.create("token-update-failed",{errorInfo:c});if(!s.token)throw Oe.create("token-update-no-token");return[2,s.token]}})})}(t,e)];case 1:return s=u.sent(),a=n({token:s,createTime:Date.now()},e),[4,Fe(t,a)];case 2:return u.sent(),[2,s];case 3:return c=u.sent(),[4,Qe(t,o)];case 4:throw u.sent(),c;case 5:return[2]}})})}({token:a.token,createTime:Date.now(),subscriptionOptions:c},e,t)]:[2,a.token];case 9:return[2]}var f,p,h,d,v,g})})}function Qe(e,t){return r(this,void 0,void 0,function(){var n,o;return i(this,function(s){switch(s.label){case 0:return[4,Ke(e)];case 1:return(n=s.sent())?[4,$e(e,n.token)]:[3,4];case 2:return s.sent(),[4,function(e){return r(this,void 0,void 0,function(){var t,n,r;return i(this,function(i){switch(i.label){case 0:return t=Be(e),[4,Me()];case 1:return n=i.sent(),[4,(r=n.transaction(Le,"readwrite")).objectStore(Le).delete(t)];case 2:return i.sent(),[4,r.complete];case 3:return i.sent(),[2]}})})}(e)];case 3:s.sent(),s.label=4;case 4:return[4,t.pushManager.getSubscription()];case 5:return(o=s.sent())?[2,o.unsubscribe()]:[2,!0]}})})}function Xe(e,t){return r(this,void 0,void 0,function(){var n,o;return i(this,function(s){switch(s.label){case 0:return[4,function(e,t){return r(this,void 0,void 0,function(){var n,r,o,s,a,c;return i(this,function(i){switch(i.label){case 0:return[4,Je(e)];case 1:n=i.sent(),r=Ye(t),o={method:"POST",headers:n,body:JSON.stringify(r)},i.label=2;case 2:return i.trys.push([2,5,,6]),[4,fetch(Ge(e.appConfig),o)];case 3:return[4,i.sent().json()];case 4:return s=i.sent(),[3,6];case 5:throw a=i.sent(),Oe.create("token-subscribe-failed",{errorInfo:a});case 6:if(s.error)throw c=s.error.message,Oe.create("token-subscribe-failed",{errorInfo:c});if(!s.token)throw Oe.create("token-subscribe-no-token");return[2,s.token]}})})}(e,t)];case 1:return n=s.sent(),o={token:n,createTime:Date.now(),subscriptionOptions:t},[4,Fe(e,o)];case 2:return s.sent(),[2,o.token]}})})}function et(e){return"object"==typeof e&&e&&ze in e}(Ve=He=He||{}).PUSH_RECEIVED="push-received",Ve.NOTIFICATION_CLICKED="notification-clicked";var tt=(Object.defineProperty(nt.prototype,"app",{get:function(){return this.firebaseDependencies.app},enumerable:!0,configurable:!0}),nt.prototype.getToken=function(){return r(this,void 0,void 0,function(){var e;return i(this,function(t){switch(t.label){case 0:return this.vapidKey||(this.vapidKey=qe),[4,this.getServiceWorkerRegistration()];case 1:return e=t.sent(),"default"!==Notification.permission?[3,3]:[4,Notification.requestPermission()];case 2:t.sent(),t.label=3;case 3:if("granted"!==Notification.permission)throw Oe.create("permission-blocked");return[2,Ze(this.firebaseDependencies,e,this.vapidKey)]}})})},nt.prototype.deleteToken=function(){return r(this,void 0,void 0,function(){var e;return i(this,function(t){switch(t.label){case 0:return[4,this.getServiceWorkerRegistration()];case 1:return e=t.sent(),[2,Qe(this.firebaseDependencies,e)]}})})},nt.prototype.requestPermission=function(){return r(this,void 0,void 0,function(){var e;return i(this,function(t){switch(t.label){case 0:return"granted"===Notification.permission?[2]:[4,Notification.requestPermission()];case 1:if("granted"===(e=t.sent()))return[2];throw"denied"===e?Oe.create("permission-blocked"):Oe.create("permission-default")}})})},nt.prototype.usePublicVapidKey=function(e){if(null!==this.vapidKey)throw Oe.create("use-vapid-key-after-get-token");if("string"!=typeof e||0===e.length)throw Oe.create("invalid-vapid-key");this.vapidKey=e},nt.prototype.useServiceWorker=function(e){if(!(e instanceof ServiceWorkerRegistration))throw Oe.create("invalid-sw-registration");if(this.swRegistration)throw Oe.create("use-sw-after-get-token");this.swRegistration=e},nt.prototype.onMessage=function(e){var t=this;return this.onMessageCallback="function"==typeof e?e:e.next,function(){t.onMessageCallback=null}},nt.prototype.setBackgroundMessageHandler=function(){throw Oe.create("only-available-in-sw")},nt.prototype.onTokenRefresh=function(){return function(){}},nt.prototype.getServiceWorkerRegistration=function(){return r(this,void 0,void 0,function(){var e,t;return i(this,function(n){switch(n.label){case 0:if(this.swRegistration)return[3,4];n.label=1;case 1:return n.trys.push([1,3,,4]),e=this,[4,navigator.serviceWorker.register("/firebase-messaging-sw.js",{scope:"/firebase-cloud-messaging-push-scope"})];case 2:return e.swRegistration=n.sent(),this.swRegistration.update().catch(function(){}),[3,4];case 3:throw t=n.sent(),Oe.create("failed-service-worker-registration",{browserErrorMessage:t.message});case 4:return[2,this.swRegistration]}})})},nt.prototype.messageEventListener=function(e){var t;return r(this,void 0,void 0,function(){var n,r,o,s;return i(this,function(i){switch(i.label){case 0:return null!==(t=e.data)&&void 0!==t&&t.firebaseMessaging?(n=e.data.firebaseMessaging,r=n.type,o=n.payload,this.onMessageCallback&&r===He.PUSH_RECEIVED&&this.onMessageCallback(o),et(s=o.data)&&"1"===s["google.c.a.e"]?[4,this.logEvent(r,s)]:[3,2]):[2];case 1:i.sent(),i.label=2;case 2:return[2]}})})},nt.prototype.logEvent=function(e,t){return r(this,void 0,void 0,function(){var n;return i(this,function(r){switch(r.label){case 0:return n=function(t){switch(e){case He.NOTIFICATION_CLICKED:return"notification_open";case He.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}(),[4,this.firebaseDependencies.analyticsProvider.get()];case 1:return r.sent().logEvent(n,{message_id:t[ze],message_name:t["google.c.a.c_l"],message_time:t["google.c.a.ts"],message_device_time:Math.floor(Date.now()/1e3)}),[2]}})})},nt);function nt(e){var t=this;this.firebaseDependencies=e,this.vapidKey=null,this.onMessageCallback=null,navigator.serviceWorker.addEventListener("message",function(e){return t.messageEventListener(e)})}var rt=(Object.defineProperty(it.prototype,"app",{get:function(){return this.firebaseDependencies.app},enumerable:!0,configurable:!0}),it.prototype.setBackgroundMessageHandler=function(e){if(!e||"function"!=typeof e)throw Oe.create("invalid-bg-handler");this.bgMessageHandler=e},it.prototype.getToken=function(){var e,t;return r(this,void 0,void 0,function(){var n;return i(this,function(r){switch(r.label){case 0:return this.vapidKey?[3,2]:[4,Ke(this.firebaseDependencies)];case 1:n=r.sent(),this.vapidKey=null!==(t=null===(e=null==n?void 0:n.subscriptionOptions)||void 0===e?void 0:e.vapidKey)&&void 0!==t?t:qe,r.label=2;case 2:return[2,Ze(this.firebaseDependencies,self.registration,this.vapidKey)]}})})},it.prototype.deleteToken=function(){return Qe(this.firebaseDependencies,self.registration)},it.prototype.requestPermission=function(){throw Oe.create("only-available-in-window")},it.prototype.usePublicVapidKey=function(e){if(null!==this.vapidKey)throw Oe.create("use-vapid-key-after-get-token");if("string"!=typeof e||0===e.length)throw Oe.create("invalid-vapid-key");this.vapidKey=e},it.prototype.useServiceWorker=function(){throw Oe.create("only-available-in-window")},it.prototype.onMessage=function(){throw Oe.create("only-available-in-window")},it.prototype.onTokenRefresh=function(){throw Oe.create("only-available-in-window")},it.prototype.onPush=function(e){return r(this,void 0,void 0,function(){var t,r,s;return i(this,function(i){switch(i.label){case 0:return(t=function(t){var n=e.data;if(!n)return null;try{return n.json()}catch(t){return null}}())?[4,ot()]:[2];case 1:return(r=i.sent()).some(function(e){return"visible"===e.visibilityState&&!e.url.startsWith("chrome-extension://")})?[2,function(e,t){var n,r,i=st(He.PUSH_RECEIVED,t);try{for(var s=o(e),a=s.next();!a.done;a=s.next())a.value.postMessage(i)}catch(e){n={error:e}}finally{try{a&&!a.done&&(r=s.return)&&r.call(s)}finally{if(n)throw n.error}}}(r,t)]:(s=function(e){var t;if(e&&"object"==typeof e.notification){var r=n({},e.notification);return r.data=n(n({},e.notification.data),((t={})[Ue]=e,t)),r}}(t))?[4,function(e){var t,n=null!==(t=e.title)&&void 0!==t?t:"",r=e.actions,i=Notification.maxActions;return r&&i&&r.length>i&&console.warn("This browser only supports "+i+" actions. The remaining actions will not be displayed."),self.registration.showNotification(n,e)}(s)]:[3,3];case 2:return i.sent(),[3,5];case 3:return this.bgMessageHandler?[4,this.bgMessageHandler(t)]:[3,5];case 4:i.sent(),i.label=5;case 5:return[2]}})})},it.prototype.onSubChange=function(e){var t,n;return r(this,void 0,void 0,function(){var r;return i(this,function(i){switch(i.label){case 0:return e.newSubscription?[3,2]:[4,Qe(this.firebaseDependencies,self.registration)];case 1:return i.sent(),[2];case 2:return[4,Ke(this.firebaseDependencies)];case 3:return r=i.sent(),[4,Qe(this.firebaseDependencies,self.registration)];case 4:return i.sent(),[4,Ze(this.firebaseDependencies,self.registration,null!==(n=null===(t=null==r?void 0:r.subscriptionOptions)||void 0===t?void 0:t.vapidKey)&&void 0!==n?n:qe)];case 5:return i.sent(),[2]}})})},it.prototype.onNotificationClick=function(e){var t,n;return r(this,void 0,void 0,function(){var s,a,c,u;return i(this,function(l){switch(l.label){case 0:return!(s=null===(n=null===(t=e.notification)||void 0===t?void 0:t.data)||void 0===n?void 0:n[Ue])||e.action?[2]:(e.stopImmediatePropagation(),e.notification.close(),(a=function(e){var t,n,r;return(null!==(n=null===(t=e.fcmOptions)||void 0===t?void 0:t.link)&&void 0!==n?n:null===(r=e.notification)||void 0===r?void 0:r.click_action)||(et(e.data)?self.location.origin:null)}(s))?[4,function(e){return r(this,void 0,void 0,function(){var t,n,r,s,a,c,u;return i(this,function(i){switch(i.label){case 0:return t=new URL(e,self.location.href),[4,ot()];case 1:n=i.sent();try{for(r=o(n),s=r.next();!s.done;s=r.next())if(a=s.value,new URL(a.url,self.location.href).host===t.host)return[2,a]}catch(i){c={error:i}}finally{try{s&&!s.done&&(u=r.return)&&u.call(r)}finally{if(c)throw c.error}}return[2,null]}})})}(a)]:[2]);case 1:return(c=l.sent())?[3,4]:[4,self.clients.openWindow(a)];case 2:return c=l.sent(),[4,(3e3,new Promise(function(e){setTimeout(e,3e3)}))];case 3:return l.sent(),[3,6];case 4:return[4,c.focus()];case 5:c=l.sent(),l.label=6;case 6:return c?(u=st(He.NOTIFICATION_CLICKED,s),[2,c.postMessage(u)]):[2]}})})},it);function it(e){var t=this;this.firebaseDependencies=e,this.vapidKey=null,this.bgMessageHandler=null,self.addEventListener("push",function(e){e.waitUntil(t.onPush(e))}),self.addEventListener("pushsubscriptionchange",function(e){e.waitUntil(t.onSubChange(e))}),self.addEventListener("notificationclick",function(e){e.waitUntil(t.onNotificationClick(e))})}function ot(){return self.clients.matchAll({type:"window",includeUncontrolled:!0})}function st(e,t){return{firebaseMessaging:{type:e,payload:t}}}var at={isSupported:ct};function ct(){return self&&"ServiceWorkerGlobalScope"in self?"indexedDB"in self&&null!==indexedDB&&"PushManager"in self&&"Notification"in self&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey"):"indexedDB"in window&&null!==indexedDB&&navigator.cookieEnabled&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}e.INTERNAL.registerComponent(new b("messaging",function(e){var t=e.getProvider("app").getImmediate(),n={app:t,appConfig:function(e){var t,n;if(!e||!e.options)throw Pe("App Configuration Object");if(!e.name)throw Pe("App Name");var r=e.options;try{for(var i=o(["projectId","apiKey","appId","messagingSenderId"]),s=i.next();!s.done;s=i.next()){var a=s.value;if(!r[a])throw Pe(a)}}catch(e){t={error:e}}finally{try{s&&!s.done&&(n=i.return)&&n.call(i)}finally{if(t)throw t.error}}return{appName:e.name,projectId:r.projectId,apiKey:r.apiKey,appId:r.appId,senderId:r.messagingSenderId}}(t),installations:e.getProvider("installations").getImmediate(),analyticsProvider:e.getProvider("analytics-internal")};if(!ct())throw Oe.create("unsupported-browser");return new(self&&"ServiceWorkerGlobalScope"in self?rt:tt)(n)},"PUBLIC").setServiceProps(at))}).apply(this,arguments)}catch(e){throw console.error(e),new Error("Cannot instantiate firebase-messaging.js - be sure to load firebase-app.js first.")}}),PushModule=function(e,t,n){"use strict";return function(){let r,i=function(){return"serviceWorker"in n&&"PushManager"in e&&"Notification"in e},o=function(){return e.localStorage.getItem("push_token")},s=function(n){e.localStorage.removeItem("push_token"),t.get("/udata://umiPushNotification/isSubscribed/"+n+"/.json",function(e){e.result&&"1"===e.result&&function(e){t.post("/udata://umiPushNotification/unsubscribe/.json",{token:e})}(n)})};return function(){if(!i())return;let n=this;t.get("/udata://umiPushNotification/getFcmConfig/.json",function(t){t.config&&(firebase.initializeApp(t.config),(r=firebase.messaging()).onMessage(function(t){t.notification.requireInteraction=!0,new e.Notification(t.notification.title,t.notification)}),r.onTokenRefresh(()=>{r.getToken().then(e=>{let t=o();t&&s(t),n.saveToken(e)}).catch(e=>{console.warn("Не удалось обновить токен ",e)})}))})}(),{subscribe:function(e){let t=(e=e||{}).success||function(){},n=e.fail||function(){};i()?function(e){let t=(e=e||{}).success||function(){},n=e.fail||function(){};"object"==typeof r&&"function"==typeof r.requestPermission&&r.requestPermission().then(function(){r.getToken().then(function(e){t(e)}).catch(n)}).catch(n)}({success:function(e){t(e)},fail:function(e){let t="messaging/permission-blocked"===e.code;t&&console.warn("Push сообщения заблокированы в настройках браузера"),n(t)}}):console.warn("Push сообщения не поддерживаются браузером")},saveToken:function(n){let r=o();t.get("/udata://umiPushNotification/isSubscribed/"+n+"/.json",function(i){let o=i.result&&"1"===i.result,s=r===n;o||function(e){t.post("/udata://umiPushNotification/subscribe/.json",{token:e})}(n),s||function(t){e.localStorage.setItem("push_token",t)}(n)})}}}()}(window,jQuery,navigator);