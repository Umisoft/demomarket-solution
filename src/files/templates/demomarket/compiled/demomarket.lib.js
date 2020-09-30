/*!
 * Bootstrap v3.3.5 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

/*!
 * Generated using the Bootstrap Customizer (http://getbootstrap.com/customize/?id=a3cfa9a2efcfaa656bd84e7e022df641)
 * Config saved to config.json and https://gist.github.com/a3cfa9a2efcfaa656bd84e7e022df641
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(t){"use strict";var e=t.fn.jquery.split(" ")[0].split(".");if(e[0]<2&&e[1]<9||1==e[0]&&9==e[1]&&e[2]<1||e[0]>2)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3")}(jQuery),+function(t){"use strict";function e(e){return this.each(function(){var i=t(this),n=i.data("bs.alert");n||i.data("bs.alert",n=new o(this)),"string"==typeof e&&n[e].call(i)})}var i='[data-dismiss="alert"]',o=function(e){t(e).on("click",i,this.close)};o.VERSION="3.3.6",o.TRANSITION_DURATION=150,o.prototype.close=function(e){function i(){a.detach().trigger("closed.bs.alert").remove()}var n=t(this),s=n.attr("data-target");s||(s=n.attr("href"),s=s&&s.replace(/.*(?=#[^\s]*$)/,""));var a=t(s);e&&e.preventDefault(),a.length||(a=n.closest(".alert")),a.trigger(e=t.Event("close.bs.alert")),e.isDefaultPrevented()||(a.removeClass("in"),t.support.transition&&a.hasClass("fade")?a.one("bsTransitionEnd",i).emulateTransitionEnd(o.TRANSITION_DURATION):i())};var n=t.fn.alert;t.fn.alert=e,t.fn.alert.Constructor=o,t.fn.alert.noConflict=function(){return t.fn.alert=n,this},t(document).on("click.bs.alert.data-api",i,o.prototype.close)}(jQuery),+function(t){"use strict";function e(e){return this.each(function(){var o=t(this),n=o.data("bs.button"),s="object"==typeof e&&e;n||o.data("bs.button",n=new i(this,s)),"toggle"==e?n.toggle():e&&n.setState(e)})}var i=function(e,o){this.$element=t(e),this.options=t.extend({},i.DEFAULTS,o),this.isLoading=!1};i.VERSION="3.3.6",i.DEFAULTS={loadingText:"loading..."},i.prototype.setState=function(e){var i="disabled",o=this.$element,n=o.is("input")?"val":"html",s=o.data();e+="Text",null==s.resetText&&o.data("resetText",o[n]()),setTimeout(t.proxy(function(){o[n](null==s[e]?this.options[e]:s[e]),"loadingText"==e?(this.isLoading=!0,o.addClass(i).attr(i,i)):this.isLoading&&(this.isLoading=!1,o.removeClass(i).removeAttr(i))},this),0)},i.prototype.toggle=function(){var t=!0,e=this.$element.closest('[data-toggle="buttons"]');if(e.length){var i=this.$element.find("input");"radio"==i.prop("type")?(i.prop("checked")&&(t=!1),e.find(".active").removeClass("active"),this.$element.addClass("active")):"checkbox"==i.prop("type")&&(i.prop("checked")!==this.$element.hasClass("active")&&(t=!1),this.$element.toggleClass("active")),i.prop("checked",this.$element.hasClass("active")),t&&i.trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active")),this.$element.toggleClass("active")};var o=t.fn.button;t.fn.button=e,t.fn.button.Constructor=i,t.fn.button.noConflict=function(){return t.fn.button=o,this},t(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(i){var o=t(i.target);o.hasClass("btn")||(o=o.closest(".btn")),e.call(o,"toggle"),t(i.target).is('input[type="radio"]')||t(i.target).is('input[type="checkbox"]')||i.preventDefault()}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(e){t(e.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(e.type))})}(jQuery),+function(t){"use strict";function e(e){return this.each(function(){var o=t(this),n=o.data("bs.carousel"),s=t.extend({},i.DEFAULTS,o.data(),"object"==typeof e&&e),a="string"==typeof e?e:s.slide;n||o.data("bs.carousel",n=new i(this,s)),"number"==typeof e?n.to(e):a?n[a]():s.interval&&n.pause().cycle()})}var i=function(e,i){this.$element=t(e),this.$indicators=this.$element.find(".carousel-indicators"),this.options=i,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",t.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",t.proxy(this.pause,this)).on("mouseleave.bs.carousel",t.proxy(this.cycle,this))};i.VERSION="3.3.6",i.TRANSITION_DURATION=600,i.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},i.prototype.keydown=function(t){if(!/input|textarea/i.test(t.target.tagName)){switch(t.which){case 37:this.prev();break;case 39:this.next();break;default:return}t.preventDefault()}},i.prototype.cycle=function(e){return e||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(t.proxy(this.next,this),this.options.interval)),this},i.prototype.getItemIndex=function(t){return this.$items=t.parent().children(".item"),this.$items.index(t||this.$active)},i.prototype.getItemForDirection=function(t,e){var i=this.getItemIndex(e),o="prev"==t&&0===i||"next"==t&&i==this.$items.length-1;if(o&&!this.options.wrap)return e;var n="prev"==t?-1:1,s=(i+n)%this.$items.length;return this.$items.eq(s)},i.prototype.to=function(t){var e=this,i=this.getItemIndex(this.$active=this.$element.find(".item.active"));return t>this.$items.length-1||0>t?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){e.to(t)}):i==t?this.pause().cycle():this.slide(t>i?"next":"prev",this.$items.eq(t))},i.prototype.pause=function(e){return e||(this.paused=!0),this.$element.find(".next, .prev").length&&t.support.transition&&(this.$element.trigger(t.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},i.prototype.next=function(){return this.sliding?void 0:this.slide("next")},i.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},i.prototype.slide=function(e,o){var n=this.$element.find(".item.active"),s=o||this.getItemForDirection(e,n),a=this.interval,r="next"==e?"left":"right",l=this;if(s.hasClass("active"))return this.sliding=!1;var h=s[0],d=t.Event("slide.bs.carousel",{relatedTarget:h,direction:r});if(this.$element.trigger(d),!d.isDefaultPrevented()){if(this.sliding=!0,a&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var p=t(this.$indicators.children()[this.getItemIndex(s)]);p&&p.addClass("active")}var c=t.Event("slid.bs.carousel",{relatedTarget:h,direction:r});return t.support.transition&&this.$element.hasClass("slide")?(s.addClass(e),s[0].offsetWidth,n.addClass(r),s.addClass(r),n.one("bsTransitionEnd",function(){s.removeClass([e,r].join(" ")).addClass("active"),n.removeClass(["active",r].join(" ")),l.sliding=!1,setTimeout(function(){l.$element.trigger(c)},0)}).emulateTransitionEnd(i.TRANSITION_DURATION)):(n.removeClass("active"),s.addClass("active"),this.sliding=!1,this.$element.trigger(c)),a&&this.cycle(),this}};var o=t.fn.carousel;t.fn.carousel=e,t.fn.carousel.Constructor=i,t.fn.carousel.noConflict=function(){return t.fn.carousel=o,this};var n=function(i){var o,n=t(this),s=t(n.attr("data-target")||(o=n.attr("href"))&&o.replace(/.*(?=#[^\s]+$)/,""));if(s.hasClass("carousel")){var a=t.extend({},s.data(),n.data()),r=n.attr("data-slide-to");r&&(a.interval=!1),e.call(s,a),r&&s.data("bs.carousel").to(r),i.preventDefault()}};t(document).on("click.bs.carousel.data-api","[data-slide]",n).on("click.bs.carousel.data-api","[data-slide-to]",n),t(window).on("load",function(){t('[data-ride="carousel"]').each(function(){var i=t(this);e.call(i,i.data())})})}(jQuery),+function(t){"use strict";function e(e){var i=e.attr("data-target");i||(i=e.attr("href"),i=i&&/#[A-Za-z]/.test(i)&&i.replace(/.*(?=#[^\s]*$)/,""));var o=i&&t(i);return o&&o.length?o:e.parent()}function i(i){i&&3===i.which||(t(n).remove(),t(s).each(function(){var o=t(this),n=e(o),s={relatedTarget:this};n.hasClass("open")&&(i&&"click"==i.type&&/input|textarea/i.test(i.target.tagName)&&t.contains(n[0],i.target)||(n.trigger(i=t.Event("hide.bs.dropdown",s)),i.isDefaultPrevented()||(o.attr("aria-expanded","false"),n.removeClass("open").trigger(t.Event("hidden.bs.dropdown",s)))))}))}function o(e){return this.each(function(){var i=t(this),o=i.data("bs.dropdown");o||i.data("bs.dropdown",o=new a(this)),"string"==typeof e&&o[e].call(i)})}var n=".dropdown-backdrop",s='[data-toggle="dropdown"]',a=function(e){t(e).on("click.bs.dropdown",this.toggle)};a.VERSION="3.3.6",a.prototype.toggle=function(o){var n=t(this);if(!n.is(".disabled, :disabled")){var s=e(n),a=s.hasClass("open");if(i(),!a){"ontouchstart"in document.documentElement&&!s.closest(".navbar-nav").length&&t(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(t(this)).on("click",i);var r={relatedTarget:this};if(s.trigger(o=t.Event("show.bs.dropdown",r)),o.isDefaultPrevented())return;n.trigger("focus").attr("aria-expanded","true"),s.toggleClass("open").trigger(t.Event("shown.bs.dropdown",r))}return!1}},a.prototype.keydown=function(i){if(/(38|40|27|32)/.test(i.which)&&!/input|textarea/i.test(i.target.tagName)){var o=t(this);if(i.preventDefault(),i.stopPropagation(),!o.is(".disabled, :disabled")){var n=e(o),a=n.hasClass("open");if(!a&&27!=i.which||a&&27==i.which)return 27==i.which&&n.find(s).trigger("focus"),o.trigger("click");var r=" li:not(.disabled):visible a",l=n.find(".dropdown-menu"+r);if(l.length){var h=l.index(i.target);38==i.which&&h>0&&h--,40==i.which&&h<l.length-1&&h++,~h||(h=0),l.eq(h).trigger("focus")}}}};var r=t.fn.dropdown;t.fn.dropdown=o,t.fn.dropdown.Constructor=a,t.fn.dropdown.noConflict=function(){return t.fn.dropdown=r,this},t(document).on("click.bs.dropdown.data-api",i).on("click.bs.dropdown.data-api",".dropdown form",function(t){t.stopPropagation()}).on("click.bs.dropdown.data-api",s,a.prototype.toggle).on("keydown.bs.dropdown.data-api",s,a.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",a.prototype.keydown)}(jQuery),+function(t){"use strict";function e(e,o){return this.each(function(){var n=t(this),s=n.data("bs.modal"),a=t.extend({},i.DEFAULTS,n.data(),"object"==typeof e&&e);s||n.data("bs.modal",s=new i(this,a)),"string"==typeof e?s[e](o):a.show&&s.show(o)})}var i=function(e,i){this.options=i,this.$body=t(document.body),this.$element=t(e),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,t.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};i.VERSION="3.3.6",i.TRANSITION_DURATION=300,i.BACKDROP_TRANSITION_DURATION=150,i.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},i.prototype.toggle=function(t){return this.isShown?this.hide():this.show(t)},i.prototype.show=function(e){var o=this,n=t.Event("show.bs.modal",{relatedTarget:e});this.$element.trigger(n),this.isShown||n.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',t.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){o.$element.one("mouseup.dismiss.bs.modal",function(e){t(e.target).is(o.$element)&&(o.ignoreBackdropClick=!0)})}),this.backdrop(function(){var n=t.support.transition&&o.$element.hasClass("fade");o.$element.parent().length||o.$element.appendTo(o.$body),o.$element.show().scrollTop(0),o.adjustDialog(),n&&o.$element[0].offsetWidth,o.$element.addClass("in"),o.enforceFocus();var s=t.Event("shown.bs.modal",{relatedTarget:e});n?o.$dialog.one("bsTransitionEnd",function(){o.$element.trigger("focus").trigger(s)}).emulateTransitionEnd(i.TRANSITION_DURATION):o.$element.trigger("focus").trigger(s)}))},i.prototype.hide=function(e){e&&e.preventDefault(),e=t.Event("hide.bs.modal"),this.$element.trigger(e),this.isShown&&!e.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),t(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),t.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",t.proxy(this.hideModal,this)).emulateTransitionEnd(i.TRANSITION_DURATION):this.hideModal())},i.prototype.enforceFocus=function(){t(document).off("focusin.bs.modal").on("focusin.bs.modal",t.proxy(function(t){this.$element[0]===t.target||this.$element.has(t.target).length||this.$element.trigger("focus")},this))},i.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",t.proxy(function(t){27==t.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},i.prototype.resize=function(){this.isShown?t(window).on("resize.bs.modal",t.proxy(this.handleUpdate,this)):t(window).off("resize.bs.modal")},i.prototype.hideModal=function(){var t=this;this.$element.hide(),this.backdrop(function(){t.$body.removeClass("modal-open"),t.resetAdjustments(),t.resetScrollbar(),t.$element.trigger("hidden.bs.modal")})},i.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},i.prototype.backdrop=function(e){var o=this,n=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var s=t.support.transition&&n;if(this.$backdrop=t(document.createElement("div")).addClass("modal-backdrop "+n).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",t.proxy(function(t){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(t.target===t.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),s&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!e)return;s?this.$backdrop.one("bsTransitionEnd",e).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION):e()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var a=function(){o.removeBackdrop(),e&&e()};t.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",a).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION):a()}else e&&e()},i.prototype.handleUpdate=function(){this.adjustDialog()},i.prototype.adjustDialog=function(){var t=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&t?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!t?this.scrollbarWidth:""})},i.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},i.prototype.checkScrollbar=function(){var t=window.innerWidth;if(!t){var e=document.documentElement.getBoundingClientRect();t=e.right-Math.abs(e.left)}this.bodyIsOverflowing=document.body.clientWidth<t,this.scrollbarWidth=this.measureScrollbar()},i.prototype.setScrollbar=function(){var t=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",t+this.scrollbarWidth)},i.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},i.prototype.measureScrollbar=function(){var t=document.createElement("div");t.className="modal-scrollbar-measure",this.$body.append(t);var e=t.offsetWidth-t.clientWidth;return this.$body[0].removeChild(t),e};var o=t.fn.modal;t.fn.modal=e,t.fn.modal.Constructor=i,t.fn.modal.noConflict=function(){return t.fn.modal=o,this},t(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(i){var o=t(this),n=o.attr("href"),s=t(o.attr("data-target")||n&&n.replace(/.*(?=#[^\s]+$)/,"")),a=s.data("bs.modal")?"toggle":t.extend({remote:!/#/.test(n)&&n},s.data(),o.data());o.is("a")&&i.preventDefault(),s.one("show.bs.modal",function(t){t.isDefaultPrevented()||s.one("hidden.bs.modal",function(){o.is(":visible")&&o.trigger("focus")})}),e.call(s,a,this)})}(jQuery),+function(t){"use strict";function e(e){return this.each(function(){var o=t(this),n=o.data("bs.tooltip"),s="object"==typeof e&&e;(n||!/destroy|hide/.test(e))&&(n||o.data("bs.tooltip",n=new i(this,s)),"string"==typeof e&&n[e]())})}var i=function(t,e){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",t,e)};i.VERSION="3.3.6",i.TRANSITION_DURATION=150,i.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},i.prototype.init=function(e,i,o){if(this.enabled=!0,this.type=e,this.$element=t(i),this.options=this.getOptions(o),this.$viewport=this.options.viewport&&t(t.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var n=this.options.trigger.split(" "),s=n.length;s--;){var a=n[s];if("click"==a)this.$element.on("click."+this.type,this.options.selector,t.proxy(this.toggle,this));else if("manual"!=a){var r="hover"==a?"mouseenter":"focusin",l="hover"==a?"mouseleave":"focusout";this.$element.on(r+"."+this.type,this.options.selector,t.proxy(this.enter,this)),this.$element.on(l+"."+this.type,this.options.selector,t.proxy(this.leave,this))}}this.options.selector?this._options=t.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},i.prototype.getDefaults=function(){return i.DEFAULTS},i.prototype.getOptions=function(e){return e=t.extend({},this.getDefaults(),this.$element.data(),e),e.delay&&"number"==typeof e.delay&&(e.delay={show:e.delay,hide:e.delay}),e},i.prototype.getDelegateOptions=function(){var e={},i=this.getDefaults();return this._options&&t.each(this._options,function(t,o){i[t]!=o&&(e[t]=o)}),e},i.prototype.enter=function(e){var i=e instanceof this.constructor?e:t(e.currentTarget).data("bs."+this.type);return i||(i=new this.constructor(e.currentTarget,this.getDelegateOptions()),t(e.currentTarget).data("bs."+this.type,i)),e instanceof t.Event&&(i.inState["focusin"==e.type?"focus":"hover"]=!0),i.tip().hasClass("in")||"in"==i.hoverState?void(i.hoverState="in"):(clearTimeout(i.timeout),i.hoverState="in",i.options.delay&&i.options.delay.show?void(i.timeout=setTimeout(function(){"in"==i.hoverState&&i.show()},i.options.delay.show)):i.show())},i.prototype.isInStateTrue=function(){for(var t in this.inState)if(this.inState[t])return!0;return!1},i.prototype.leave=function(e){var i=e instanceof this.constructor?e:t(e.currentTarget).data("bs."+this.type);return i||(i=new this.constructor(e.currentTarget,this.getDelegateOptions()),t(e.currentTarget).data("bs."+this.type,i)),e instanceof t.Event&&(i.inState["focusout"==e.type?"focus":"hover"]=!1),i.isInStateTrue()?void 0:(clearTimeout(i.timeout),i.hoverState="out",i.options.delay&&i.options.delay.hide?void(i.timeout=setTimeout(function(){"out"==i.hoverState&&i.hide()},i.options.delay.hide)):i.hide())},i.prototype.show=function(){var e=t.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(e);var o=t.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(e.isDefaultPrevented()||!o)return;var n=this,s=this.tip(),a=this.getUID(this.type);this.setContent(),s.attr("id",a),this.$element.attr("aria-describedby",a),this.options.animation&&s.addClass("fade");var r="function"==typeof this.options.placement?this.options.placement.call(this,s[0],this.$element[0]):this.options.placement,l=/\s?auto?\s?/i,h=l.test(r);h&&(r=r.replace(l,"")||"top"),s.detach().css({top:0,left:0,display:"block"}).addClass(r).data("bs."+this.type,this),this.options.container?s.appendTo(this.options.container):s.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var d=this.getPosition(),p=s[0].offsetWidth,c=s[0].offsetHeight;if(h){var f=r,u=this.getPosition(this.$viewport);r="bottom"==r&&d.bottom+c>u.bottom?"top":"top"==r&&d.top-c<u.top?"bottom":"right"==r&&d.right+p>u.width?"left":"left"==r&&d.left-p<u.left?"right":r,s.removeClass(f).addClass(r)}var g=this.getCalculatedOffset(r,d,p,c);this.applyPlacement(g,r);var v=function(){var t=n.hoverState;n.$element.trigger("shown.bs."+n.type),n.hoverState=null,"out"==t&&n.leave(n)};t.support.transition&&this.$tip.hasClass("fade")?s.one("bsTransitionEnd",v).emulateTransitionEnd(i.TRANSITION_DURATION):v()}},i.prototype.applyPlacement=function(e,i){var o=this.tip(),n=o[0].offsetWidth,s=o[0].offsetHeight,a=parseInt(o.css("margin-top"),10),r=parseInt(o.css("margin-left"),10);isNaN(a)&&(a=0),isNaN(r)&&(r=0),e.top+=a,e.left+=r,t.offset.setOffset(o[0],t.extend({using:function(t){o.css({top:Math.round(t.top),left:Math.round(t.left)})}},e),0),o.addClass("in");var l=o[0].offsetWidth,h=o[0].offsetHeight;"top"==i&&h!=s&&(e.top=e.top+s-h);var d=this.getViewportAdjustedDelta(i,e,l,h);d.left?e.left+=d.left:e.top+=d.top;var p=/top|bottom/.test(i),c=p?2*d.left-n+l:2*d.top-s+h,f=p?"offsetWidth":"offsetHeight";o.offset(e),this.replaceArrow(c,o[0][f],p)},i.prototype.replaceArrow=function(t,e,i){this.arrow().css(i?"left":"top",50*(1-t/e)+"%").css(i?"top":"left","")},i.prototype.setContent=function(){var t=this.tip(),e=this.getTitle();t.find(".tooltip-inner")[this.options.html?"html":"text"](e),t.removeClass("fade in top bottom left right")},i.prototype.hide=function(e){function o(){"in"!=n.hoverState&&s.detach(),n.$element.removeAttr("aria-describedby").trigger("hidden.bs."+n.type),e&&e()}var n=this,s=t(this.$tip),a=t.Event("hide.bs."+this.type);return this.$element.trigger(a),a.isDefaultPrevented()?void 0:(s.removeClass("in"),t.support.transition&&s.hasClass("fade")?s.one("bsTransitionEnd",o).emulateTransitionEnd(i.TRANSITION_DURATION):o(),this.hoverState=null,this)},i.prototype.fixTitle=function(){var t=this.$element;(t.attr("title")||"string"!=typeof t.attr("data-original-title"))&&t.attr("data-original-title",t.attr("title")||"").attr("title","")},i.prototype.hasContent=function(){return this.getTitle()},i.prototype.getPosition=function(e){e=e||this.$element;var i=e[0],o="BODY"==i.tagName,n=i.getBoundingClientRect();null==n.width&&(n=t.extend({},n,{width:n.right-n.left,height:n.bottom-n.top}));var s=o?{top:0,left:0}:e.offset(),a={scroll:o?document.documentElement.scrollTop||document.body.scrollTop:e.scrollTop()},r=o?{width:t(window).width(),height:t(window).height()}:null;return t.extend({},n,a,r,s)},i.prototype.getCalculatedOffset=function(t,e,i,o){return"bottom"==t?{top:e.top+e.height,left:e.left+e.width/2-i/2}:"top"==t?{top:e.top-o,left:e.left+e.width/2-i/2}:"left"==t?{top:e.top+e.height/2-o/2,left:e.left-i}:{top:e.top+e.height/2-o/2,left:e.left+e.width}},i.prototype.getViewportAdjustedDelta=function(t,e,i,o){var n={top:0,left:0};if(!this.$viewport)return n;var s=this.options.viewport&&this.options.viewport.padding||0,a=this.getPosition(this.$viewport);if(/right|left/.test(t)){var r=e.top-s-a.scroll,l=e.top+s-a.scroll+o;r<a.top?n.top=a.top-r:l>a.top+a.height&&(n.top=a.top+a.height-l)}else{var h=e.left-s,d=e.left+s+i;h<a.left?n.left=a.left-h:d>a.right&&(n.left=a.left+a.width-d)}return n},i.prototype.getTitle=function(){var t,e=this.$element,i=this.options;return t=e.attr("data-original-title")||("function"==typeof i.title?i.title.call(e[0]):i.title)},i.prototype.getUID=function(t){do t+=~~(1e6*Math.random());while(document.getElementById(t));return t},i.prototype.tip=function(){if(!this.$tip&&(this.$tip=t(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},i.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},i.prototype.enable=function(){this.enabled=!0},i.prototype.disable=function(){this.enabled=!1},i.prototype.toggleEnabled=function(){this.enabled=!this.enabled},i.prototype.toggle=function(e){var i=this;e&&(i=t(e.currentTarget).data("bs."+this.type),i||(i=new this.constructor(e.currentTarget,this.getDelegateOptions()),t(e.currentTarget).data("bs."+this.type,i))),e?(i.inState.click=!i.inState.click,i.isInStateTrue()?i.enter(i):i.leave(i)):i.tip().hasClass("in")?i.leave(i):i.enter(i)},i.prototype.destroy=function(){var t=this;clearTimeout(this.timeout),this.hide(function(){t.$element.off("."+t.type).removeData("bs."+t.type),t.$tip&&t.$tip.detach(),t.$tip=null,t.$arrow=null,t.$viewport=null})};var o=t.fn.tooltip;t.fn.tooltip=e,t.fn.tooltip.Constructor=i,t.fn.tooltip.noConflict=function(){return t.fn.tooltip=o,this}}(jQuery),+function(t){"use strict";function e(e){return this.each(function(){var o=t(this),n=o.data("bs.popover"),s="object"==typeof e&&e;(n||!/destroy|hide/.test(e))&&(n||o.data("bs.popover",n=new i(this,s)),"string"==typeof e&&n[e]())})}var i=function(t,e){this.init("popover",t,e)};if(!t.fn.tooltip)throw new Error("Popover requires tooltip.js");i.VERSION="3.3.6",i.DEFAULTS=t.extend({},t.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),i.prototype=t.extend({},t.fn.tooltip.Constructor.prototype),i.prototype.constructor=i,i.prototype.getDefaults=function(){return i.DEFAULTS},i.prototype.setContent=function(){var t=this.tip(),e=this.getTitle(),i=this.getContent();t.find(".popover-title")[this.options.html?"html":"text"](e),t.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof i?"html":"append":"text"](i),t.removeClass("fade top bottom left right in"),t.find(".popover-title").html()||t.find(".popover-title").hide()},i.prototype.hasContent=function(){return this.getTitle()||this.getContent()},i.prototype.getContent=function(){var t=this.$element,e=this.options;return t.attr("data-content")||("function"==typeof e.content?e.content.call(t[0]):e.content)},i.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var o=t.fn.popover;t.fn.popover=e,t.fn.popover.Constructor=i,t.fn.popover.noConflict=function(){return t.fn.popover=o,this}}(jQuery),+function(t){"use strict";function e(e){return this.each(function(){var o=t(this),n=o.data("bs.tab");n||o.data("bs.tab",n=new i(this)),"string"==typeof e&&n[e]()})}var i=function(e){this.element=t(e)};i.VERSION="3.3.6",i.TRANSITION_DURATION=150,i.prototype.show=function(){var e=this.element,i=e.closest("ul:not(.dropdown-menu)"),o=e.data("target");if(o||(o=e.attr("href"),o=o&&o.replace(/.*(?=#[^\s]*$)/,"")),!e.parent("li").hasClass("active")){var n=i.find(".active:last a"),s=t.Event("hide.bs.tab",{relatedTarget:e[0]}),a=t.Event("show.bs.tab",{relatedTarget:n[0]});if(n.trigger(s),e.trigger(a),!a.isDefaultPrevented()&&!s.isDefaultPrevented()){var r=t(o);this.activate(e.closest("li"),i),this.activate(r,r.parent(),function(){n.trigger({type:"hidden.bs.tab",relatedTarget:e[0]}),e.trigger({type:"shown.bs.tab",relatedTarget:n[0]})})}}},i.prototype.activate=function(e,o,n){function s(){a.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),r?(e[0].offsetWidth,e.addClass("in")):e.removeClass("fade"),e.parent(".dropdown-menu").length&&e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),n&&n()}var a=o.find("> .active"),r=n&&t.support.transition&&(a.length&&a.hasClass("fade")||!!o.find("> .fade").length);a.length&&r?a.one("bsTransitionEnd",s).emulateTransitionEnd(i.TRANSITION_DURATION):s(),a.removeClass("in")};var o=t.fn.tab;t.fn.tab=e,t.fn.tab.Constructor=i,t.fn.tab.noConflict=function(){return t.fn.tab=o,this};var n=function(i){i.preventDefault(),e.call(t(this),"show")};t(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',n).on("click.bs.tab.data-api",'[data-toggle="pill"]',n)}(jQuery),+function(t){"use strict";function e(e){return this.each(function(){var o=t(this),n=o.data("bs.affix"),s="object"==typeof e&&e;n||o.data("bs.affix",n=new i(this,s)),"string"==typeof e&&n[e]()})}var i=function(e,o){this.options=t.extend({},i.DEFAULTS,o),this.$target=t(this.options.target).on("scroll.bs.affix.data-api",t.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",t.proxy(this.checkPositionWithEventLoop,this)),this.$element=t(e),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};i.VERSION="3.3.6",i.RESET="affix affix-top affix-bottom",i.DEFAULTS={offset:0,target:window},i.prototype.getState=function(t,e,i,o){var n=this.$target.scrollTop(),s=this.$element.offset(),a=this.$target.height();if(null!=i&&"top"==this.affixed)return i>n?"top":!1;if("bottom"==this.affixed)return null!=i?n+this.unpin<=s.top?!1:"bottom":t-o>=n+a?!1:"bottom";var r=null==this.affixed,l=r?n:s.top,h=r?a:e;return null!=i&&i>=n?"top":null!=o&&l+h>=t-o?"bottom":!1},i.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(i.RESET).addClass("affix");var t=this.$target.scrollTop(),e=this.$element.offset();return this.pinnedOffset=e.top-t},i.prototype.checkPositionWithEventLoop=function(){setTimeout(t.proxy(this.checkPosition,this),1)},i.prototype.checkPosition=function(){if(this.$element.is(":visible")){var e=this.$element.height(),o=this.options.offset,n=o.top,s=o.bottom,a=Math.max(t(document).height(),t(document.body).height());"object"!=typeof o&&(s=n=o),"function"==typeof n&&(n=o.top(this.$element)),"function"==typeof s&&(s=o.bottom(this.$element));var r=this.getState(a,e,n,s);if(this.affixed!=r){null!=this.unpin&&this.$element.css("top","");var l="affix"+(r?"-"+r:""),h=t.Event(l+".bs.affix");if(this.$element.trigger(h),h.isDefaultPrevented())return;this.affixed=r,this.unpin="bottom"==r?this.getPinnedOffset():null,this.$element.removeClass(i.RESET).addClass(l).trigger(l.replace("affix","affixed")+".bs.affix")}"bottom"==r&&this.$element.offset({top:a-e-s})}};var o=t.fn.affix;t.fn.affix=e,t.fn.affix.Constructor=i,t.fn.affix.noConflict=function(){return t.fn.affix=o,this},t(window).on("load",function(){t('[data-spy="affix"]').each(function(){var i=t(this),o=i.data();o.offset=o.offset||{},null!=o.offsetBottom&&(o.offset.bottom=o.offsetBottom),null!=o.offsetTop&&(o.offset.top=o.offsetTop),e.call(i,o)})})}(jQuery),+function(t){"use strict";function e(e){var i,o=e.attr("data-target")||(i=e.attr("href"))&&i.replace(/.*(?=#[^\s]+$)/,"");return t(o)}function i(e){return this.each(function(){var i=t(this),n=i.data("bs.collapse"),s=t.extend({},o.DEFAULTS,i.data(),"object"==typeof e&&e);!n&&s.toggle&&/show|hide/.test(e)&&(s.toggle=!1),n||i.data("bs.collapse",n=new o(this,s)),"string"==typeof e&&n[e]()})}var o=function(e,i){this.$element=t(e),this.options=t.extend({},o.DEFAULTS,i),this.$trigger=t('[data-toggle="collapse"][href="#'+e.id+'"],[data-toggle="collapse"][data-target="#'+e.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};o.VERSION="3.3.6",o.TRANSITION_DURATION=350,o.DEFAULTS={toggle:!0},o.prototype.dimension=function(){var t=this.$element.hasClass("width");return t?"width":"height"},o.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var e,n=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(n&&n.length&&(e=n.data("bs.collapse"),e&&e.transitioning))){var s=t.Event("show.bs.collapse");if(this.$element.trigger(s),!s.isDefaultPrevented()){n&&n.length&&(i.call(n,"hide"),e||n.data("bs.collapse",null));var a=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[a](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var r=function(){this.$element.removeClass("collapsing").addClass("collapse in")[a](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!t.support.transition)return r.call(this);var l=t.camelCase(["scroll",a].join("-"));this.$element.one("bsTransitionEnd",t.proxy(r,this)).emulateTransitionEnd(o.TRANSITION_DURATION)[a](this.$element[0][l]);
}}}},o.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var e=t.Event("hide.bs.collapse");if(this.$element.trigger(e),!e.isDefaultPrevented()){var i=this.dimension();this.$element[i](this.$element[i]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var n=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return t.support.transition?void this.$element[i](0).one("bsTransitionEnd",t.proxy(n,this)).emulateTransitionEnd(o.TRANSITION_DURATION):n.call(this)}}},o.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},o.prototype.getParent=function(){return t(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(t.proxy(function(i,o){var n=t(o);this.addAriaAndCollapsedClass(e(n),n)},this)).end()},o.prototype.addAriaAndCollapsedClass=function(t,e){var i=t.hasClass("in");t.attr("aria-expanded",i),e.toggleClass("collapsed",!i).attr("aria-expanded",i)};var n=t.fn.collapse;t.fn.collapse=i,t.fn.collapse.Constructor=o,t.fn.collapse.noConflict=function(){return t.fn.collapse=n,this},t(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(o){var n=t(this);n.attr("data-target")||o.preventDefault();var s=e(n),a=s.data("bs.collapse"),r=a?"toggle":n.data();i.call(s,r)})}(jQuery),+function(t){"use strict";function e(i,o){this.$body=t(document.body),this.$scrollElement=t(t(i).is(document.body)?window:i),this.options=t.extend({},e.DEFAULTS,o),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",t.proxy(this.process,this)),this.refresh(),this.process()}function i(i){return this.each(function(){var o=t(this),n=o.data("bs.scrollspy"),s="object"==typeof i&&i;n||o.data("bs.scrollspy",n=new e(this,s)),"string"==typeof i&&n[i]()})}e.VERSION="3.3.6",e.DEFAULTS={offset:10},e.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},e.prototype.refresh=function(){var e=this,i="offset",o=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),t.isWindow(this.$scrollElement[0])||(i="position",o=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var e=t(this),n=e.data("target")||e.attr("href"),s=/^#./.test(n)&&t(n);return s&&s.length&&s.is(":visible")&&[[s[i]().top+o,n]]||null}).sort(function(t,e){return t[0]-e[0]}).each(function(){e.offsets.push(this[0]),e.targets.push(this[1])})},e.prototype.process=function(){var t,e=this.$scrollElement.scrollTop()+this.options.offset,i=this.getScrollHeight(),o=this.options.offset+i-this.$scrollElement.height(),n=this.offsets,s=this.targets,a=this.activeTarget;if(this.scrollHeight!=i&&this.refresh(),e>=o)return a!=(t=s[s.length-1])&&this.activate(t);if(a&&e<n[0])return this.activeTarget=null,this.clear();for(t=n.length;t--;)a!=s[t]&&e>=n[t]&&(void 0===n[t+1]||e<n[t+1])&&this.activate(s[t])},e.prototype.activate=function(e){this.activeTarget=e,this.clear();var i=this.selector+'[data-target="'+e+'"],'+this.selector+'[href="'+e+'"]',o=t(i).parents("li").addClass("active");o.parent(".dropdown-menu").length&&(o=o.closest("li.dropdown").addClass("active")),o.trigger("activate.bs.scrollspy")},e.prototype.clear=function(){t(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var o=t.fn.scrollspy;t.fn.scrollspy=i,t.fn.scrollspy.Constructor=e,t.fn.scrollspy.noConflict=function(){return t.fn.scrollspy=o,this},t(window).on("load.bs.scrollspy.data-api",function(){t('[data-spy="scroll"]').each(function(){var e=t(this);i.call(e,e.data())})})}(jQuery),+function(t){"use strict";function e(){var t=document.createElement("bootstrap"),e={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var i in e)if(void 0!==t.style[i])return{end:e[i]};return!1}t.fn.emulateTransitionEnd=function(e){var i=!1,o=this;t(this).one("bsTransitionEnd",function(){i=!0});var n=function(){i||t(o).trigger(t.support.transition.end)};return setTimeout(n,e),this},t(function(){t.support.transition=e(),t.support.transition&&(t.event.special.bsTransitionEnd={bindType:t.support.transition.end,delegateType:t.support.transition.end,handle:function(e){return t(e.target).is(this)?e.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery);
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
 * jquery.inputmask.bundle
 * http://github.com/RobinHerbots/jquery.inputmask
 * Copyright (c) 2010 - 2015 Robin Herbots
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 * Version: 3.1.64-92
 */
!function(a){function b(b){this.el=void 0,this.opts=a.extend(!0,{},this.defaults,b),this.noMasksCache=b&&void 0!==b.definitions,this.userOptions=b||{},e(this.opts.alias,b,this.opts)}function c(a){var b=document.createElement("input"),c="on"+a,d=c in b;return d||(b.setAttribute(c,"return;"),d="function"==typeof b[c]),b=null,d}function d(a){var b="text"==a||"tel"==a||"password"==a;if(!b){var c=document.createElement("input");c.setAttribute("type",a),b="text"===c.type,c=null}return b}function e(b,c,d){var f=d.aliases[b];return f?(f.alias&&e(f.alias,void 0,d),a.extend(!0,d,f),a.extend(!0,d,c),!0):(void 0==d.mask&&(d.mask=b),!1)}function f(b,c,d){var f=a(b),g=f.data("inputmask");if(g&&""!=g)try{g=g.replace(new RegExp("'","g"),'"');var h=a.parseJSON("{"+g+"}");a.extend(!0,d,h)}catch(i){}for(var j in c){var k=f.data("inputmask-"+j.toLowerCase());void 0!=k&&(k="boolean"==typeof k?k:k.toString(),"mask"==j&&0==k.indexOf("[")?(d[j]=k.replace(/[\s[\]]/g,"").split("','"),d[j][0]=d[j][0].replace("'",""),d[j][d[j].length-1]=d[j][d[j].length-1].replace("'","")):d[j]=k)}return d.alias?e(d.alias,d,c):a.extend(!0,c,d),c}function g(c,d){function e(b){function d(a,b,c,d){this.matches=[],this.isGroup=a||!1,this.isOptional=b||!1,this.isQuantifier=c||!1,this.isAlternator=d||!1,this.quantifier={min:1,max:1}}function e(b,d,e){var f=c.definitions[d],g=0==b.matches.length;if(e=void 0!=e?e:b.matches.length,f&&!o){f.placeholder=a.isFunction(f.placeholder)?f.placeholder.call(this,c):f.placeholder;for(var h=f.prevalidator,i=h?h.length:0,j=1;j<f.cardinality;j++){var k=i>=j?h[j-1]:[],l=k.validator,m=k.cardinality;b.matches.splice(e++,0,{fn:l?"string"==typeof l?new RegExp(l):new function(){this.test=l}:new RegExp("."),cardinality:m?m:1,optionality:b.isOptional,newBlockMarker:g,casing:f.casing,def:f.definitionSymbol||d,placeholder:f.placeholder,mask:d})}b.matches.splice(e++,0,{fn:f.validator?"string"==typeof f.validator?new RegExp(f.validator):new function(){this.test=f.validator}:new RegExp("."),cardinality:f.cardinality,optionality:b.isOptional,newBlockMarker:g,casing:f.casing,def:f.definitionSymbol||d,placeholder:f.placeholder,mask:d})}else b.matches.splice(e++,0,{fn:null,cardinality:0,optionality:b.isOptional,newBlockMarker:g,casing:null,def:d,placeholder:void 0,mask:d}),o=!1}function f(a){a.isGroup&&(a.isGroup=!1,e(a,c.groupmarker.start,0),e(a,c.groupmarker.end))}function g(a,b,c,d){b.matches.length>0&&(void 0==d||d)&&(c=b.matches[b.matches.length-1],f(c)),e(b,a)}for(var h,i,j,k,l,m,n=/(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?\})\??|[^.?*+^${[]()|\\]+|./g,o=!1,p=new d,q=[],r=[];h=n.exec(b);)if(i=h[0],o)g(i,p,m);else switch(i.charAt(0)){case c.escapeChar:o=!0;break;case c.optionalmarker.end:case c.groupmarker.end:if(j=q.pop(),q.length>0){if(k=q[q.length-1],k.matches.push(j),k.isAlternator){l=q.pop();for(var s=0;s<l.matches.length;s++)l.matches[s].isGroup=!1;q.length>0?(k=q[q.length-1],k.matches.push(l)):p.matches.push(l)}}else p.matches.push(j);break;case c.optionalmarker.start:q.push(new d(!1,!0));break;case c.groupmarker.start:q.push(new d(!0));break;case c.quantifiermarker.start:var t=new d(!1,!1,!0);i=i.replace(/[{}]/g,"");var u=i.split(","),v=isNaN(u[0])?u[0]:parseInt(u[0]),w=1==u.length?v:isNaN(u[1])?u[1]:parseInt(u[1]);if(("*"==w||"+"==w)&&(v="*"==w?0:1),t.quantifier={min:v,max:w},q.length>0){var x=q[q.length-1].matches;if(h=x.pop(),!h.isGroup){var y=new d(!0);y.matches.push(h),h=y}x.push(h),x.push(t)}else{if(h=p.matches.pop(),!h.isGroup){var y=new d(!0);y.matches.push(h),h=y}p.matches.push(h),p.matches.push(t)}break;case c.alternatormarker:q.length>0?(k=q[q.length-1],m=k.matches.pop()):m=p.matches.pop(),m.isAlternator?q.push(m):(l=new d(!1,!1,!1,!0),l.matches.push(m),q.push(l));break;default:if(q.length>0){if(k=q[q.length-1],g(i,k,m,!k.isAlternator),k.isAlternator){l=q.pop();for(var s=0;s<l.matches.length;s++)l.matches[s].isGroup=!1;q.length>0?(k=q[q.length-1],k.matches.push(l)):p.matches.push(l)}}else g(i,p,m)}return p.matches.length>0&&(m=p.matches[p.matches.length-1],f(m),r.push(p)),r}function f(f,g){if(void 0==f||""==f)return void 0;if(1==f.length&&0==c.greedy&&0!=c.repeat&&(c.placeholder=""),c.repeat>0||"*"==c.repeat||"+"==c.repeat){var h="*"==c.repeat?0:"+"==c.repeat?1:c.repeat;f=c.groupmarker.start+f+c.groupmarker.end+c.quantifiermarker.start+h+","+c.repeat+c.quantifiermarker.end}var i;return void 0==b.prototype.masksCache[f]||d===!0?(i={mask:f,maskToken:e(f),validPositions:{},_buffer:void 0,buffer:void 0,tests:{},metadata:g},d!==!0&&(b.prototype.masksCache[f]=i)):i=a.extend(!0,{},b.prototype.masksCache[f]),i}function g(a){if(a=a.toString(),c.numericInput){a=a.split("").reverse();for(var b=0;b<a.length;b++)a[b]==c.optionalmarker.start?a[b]=c.optionalmarker.end:a[b]==c.optionalmarker.end?a[b]=c.optionalmarker.start:a[b]==c.groupmarker.start?a[b]=c.groupmarker.end:a[b]==c.groupmarker.end&&(a[b]=c.groupmarker.start);a=a.join("")}return a}var h=void 0;if(a.isFunction(c.mask)&&(c.mask=c.mask.call(this,c)),a.isArray(c.mask)){if(c.mask.length>1){c.keepStatic=void 0==c.keepStatic?!0:c.keepStatic;var i="(";return a.each(c.mask,function(b,c){i.length>1&&(i+=")|("),i+=g(void 0==c.mask||a.isFunction(c.mask)?c:c.mask)}),i+=")",f(i,c.mask)}c.mask=c.mask.pop()}return c.mask&&(h=void 0==c.mask.mask||a.isFunction(c.mask.mask)?f(g(c.mask),c.mask):f(g(c.mask.mask),c.mask)),h}function h(e,f,g){function h(a,b,c){b=b||0;var d,e,f,g=[],h=0;do{if(a===!0&&i().validPositions[h]){var j=i().validPositions[h];e=j.match,d=j.locator.slice(),g.push(c===!0?j.input:H(h,e))}else f=r(h,d,h-1),e=f.match,d=f.locator.slice(),g.push(H(h,e));h++}while((void 0==da||da>h-1)&&null!=e.fn||null==e.fn&&""!=e.def||b>=h);return g.pop(),g}function i(){return f}function n(a){var b=i();b.buffer=void 0,b.tests={},a!==!0&&(b._buffer=void 0,b.validPositions={},b.p=0)}function o(a,b){var c=i(),d=-1,e=c.validPositions;void 0==a&&(a=-1);var f=d,g=d;for(var h in e){var j=parseInt(h);e[j]&&(b||null!=e[j].match.fn)&&(a>=j&&(f=j),j>=a&&(g=j))}return d=-1!=f&&a-f>1||a>g?f:g}function p(b,c,d){if(g.insertMode&&void 0!=i().validPositions[b]&&void 0==d){var e,f=a.extend(!0,{},i().validPositions),h=o();for(e=b;h>=e;e++)delete i().validPositions[e];i().validPositions[b]=c;var j,k=!0,l=i().validPositions;for(e=j=b;h>=e;e++){var m=f[e];if(void 0!=m)for(var n=j,p=-1;n<C()&&(null==m.match.fn&&l[e]&&(l[e].match.optionalQuantifier===!0||l[e].match.optionality===!0)||null!=m.match.fn);){if(null==m.match.fn||!g.keepStatic&&l[e]&&(void 0!=l[e+1]&&u(e+1,l[e].locator.slice(),e).length>1||void 0!=l[e].alternation)?n++:n=D(j),t(n,m.match.def)){k=A(n,m.input,!0,!0)!==!1,j=n;break}if(k=null==m.match.fn,p==n)break;p=n}if(!k)break}if(!k)return i().validPositions=a.extend(!0,{},f),!1}else i().validPositions[b]=c;return!0}function q(a,b,c,d){var e,f=a;i().p=a;for(e=f;b>e;e++)void 0!=i().validPositions[e]&&(c===!0||0!=g.canClearPosition(i(),e,o(),d,g))&&delete i().validPositions[e];for(n(!0),e=f+1;e<=o();){for(;void 0!=i().validPositions[f];)f++;var h=i().validPositions[f];f>e&&(e=f+1);var j=i().validPositions[e];void 0!=j&&void 0==h?(t(f,j.match.def)&&A(f,j.input,!0)!==!1&&(delete i().validPositions[e],e++),f++):e++}var k=o(),l=C();for(c!==!0&&void 0!=i().validPositions[k]&&i().validPositions[k].input==g.radixPoint&&delete i().validPositions[k],e=k+1;l>=e;e++)i().validPositions[e]&&delete i().validPositions[e];n(!0)}function r(a,b,c){var d=i().validPositions[a];if(void 0==d)for(var e=u(a,b,c),f=o(),h=i().validPositions[f]||u(0)[0],j=void 0!=h.alternation?h.locator[h.alternation].toString().split(","):[],k=0;k<e.length&&(d=e[k],!(d.match&&(g.greedy&&d.match.optionalQuantifier!==!0||(d.match.optionality===!1||d.match.newBlockMarker===!1)&&d.match.optionalQuantifier!==!0)&&(void 0==h.alternation||h.alternation!=d.alternation||void 0!=d.locator[h.alternation]&&z(d.locator[h.alternation].toString().split(","),j))));k++);return d}function s(a){return i().validPositions[a]?i().validPositions[a].match:u(a)[0].match}function t(a,b){for(var c=!1,d=u(a),e=0;e<d.length;e++)if(d[e].match&&d[e].match.def==b){c=!0;break}return c}function u(b,c,d,e){function f(c,d,e,g){function j(e,g,n){if(h>1e4)return alert("jquery.inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. "+i().mask),!0;if(h==b&&void 0==e.matches)return k.push({match:e,locator:g.reverse()}),!0;if(void 0!=e.matches){if(e.isGroup&&n!==!0){if(e=j(c.matches[m+1],g))return!0}else if(e.isOptional){var o=e;if(e=f(e,d,g,n)){var p=k[k.length-1].match,q=0==a.inArray(p,o.matches);if(!q)return!0;l=!0,h=b}}else if(e.isAlternator){var r,s=e,t=[],u=k.slice(),v=g.length,w=d.length>0?d.shift():-1;if(-1==w||"string"==typeof w){var x=h,y=d.slice(),z=[];"string"==typeof w&&(z=w.split(","));for(var A=0;A<s.matches.length;A++){if(k=[],e=j(s.matches[A],[A].concat(g),n)||e,e!==!0&&void 0!=e&&z[z.length-1]<s.matches.length){var B=c.matches.indexOf(e)+1;c.matches.length>B&&(e=j(c.matches[B],[B].concat(g.slice(1,g.length)),n),e&&(z.push(B.toString()),a.each(k,function(a,b){b.alternation=g.length-1})))}r=k.slice(),h=x,k=[];for(var C=0;C<y.length;C++)d[C]=y[C];for(var D=0;D<r.length;D++){var E=r[D];E.alternation=E.alternation||v;for(var F=0;F<t.length;F++){var G=t[F];if(E.match.mask==G.match.mask&&("string"!=typeof w||-1!=a.inArray(E.locator[E.alternation].toString(),z))){r.splice(D,1),D--,G.locator[E.alternation]=G.locator[E.alternation]+","+E.locator[E.alternation],G.alternation=E.alternation;break}}}t=t.concat(r)}"string"==typeof w&&(t=a.map(t,function(b,c){if(isFinite(c)){var d,e=b.alternation,f=b.locator[e].toString().split(",");b.locator[e]=void 0,b.alternation=void 0;for(var g=0;g<f.length;g++)d=-1!=a.inArray(f[g],z),d&&(void 0!=b.locator[e]?(b.locator[e]+=",",b.locator[e]+=f[g]):b.locator[e]=parseInt(f[g]),b.alternation=e);if(void 0!=b.locator[e])return b}})),k=u.concat(t),h=b,l=k.length>0}else e=s.matches[w]?j(s.matches[w],[w].concat(g),n):!1;if(e)return!0}else if(e.isQuantifier&&n!==!0)for(var H=e,I=d.length>0&&n!==!0?d.shift():0;I<(isNaN(H.quantifier.max)?I+1:H.quantifier.max)&&b>=h;I++){var J=c.matches[a.inArray(H,c.matches)-1];if(e=j(J,[I].concat(g),!0)){var p=k[k.length-1].match;p.optionalQuantifier=I>H.quantifier.min-1;var q=0==a.inArray(p,J.matches);if(q){if(I>H.quantifier.min-1){l=!0,h=b;break}return!0}return!0}}else if(e=f(e,d,g,n))return!0}else h++}for(var m=d.length>0?d.shift():0;m<c.matches.length;m++)if(c.matches[m].isQuantifier!==!0){var n=j(c.matches[m],[m].concat(e),g);if(n&&h==b)return n;if(h>b)break}}var g=i().maskToken,h=c?d:0,j=c||[0],k=[],l=!1;if(e===!0&&i().tests[b])return i().tests[b];if(void 0==c){for(var m,n=b-1;void 0==(m=i().validPositions[n])&&n>-1&&(!i().tests[n]||void 0==(m=i().tests[n][0]));)n--;void 0!=m&&n>-1&&(h=n,j=m.locator.slice())}for(var o=j.shift();o<g.length;o++){var p=f(g[o],j,[o]);if(p&&h==b||h>b)break}return(0==k.length||l)&&k.push({match:{fn:null,cardinality:0,optionality:!0,casing:null,def:""},locator:[]}),i().tests[b]=a.extend(!0,[],k),i().tests[b]}function v(){return void 0==i()._buffer&&(i()._buffer=h(!1,1)),i()._buffer}function w(){return void 0==i().buffer&&(i().buffer=h(!0,o(),!0)),i().buffer}function x(a,b,c){if(c=c||w().slice(),a===!0)n(),a=0,b=c.length;else for(var d=a;b>d;d++)delete i().validPositions[d],delete i().tests[d];for(var d=a;b>d;d++)c[d]!=g.skipOptionalPartCharacter&&A(d,c[d],!0,!0)}function y(a,b){switch(b.casing){case"upper":a=a.toUpperCase();break;case"lower":a=a.toLowerCase()}return a}function z(b,c){for(var d=g.greedy?c:c.slice(0,1),e=!1,f=0;f<b.length;f++)if(-1!=a.inArray(b[f],d)){e=!0;break}return e}function A(b,c,d,e){function f(b,c,d,e){var f=!1;return a.each(u(b),function(h,j){for(var k=j.match,l=c?1:0,m="",r=(w(),k.cardinality);r>l;r--)m+=F(b-(r-1));if(c&&(m+=c),f=null!=k.fn?k.fn.test(m,i(),b,d,g):c!=k.def&&c!=g.skipOptionalPartCharacter||""==k.def?!1:{c:k.def,pos:b},f!==!1){var s=void 0!=f.c?f.c:c;s=s==g.skipOptionalPartCharacter&&null===k.fn?k.def:s;var t=b,u=w();if(void 0!=f.remove&&(a.isArray(f.remove)||(f.remove=[f.remove]),a.each(f.remove.sort(function(a,b){return b-a}),function(a,b){q(b,b+1,!0)})),void 0!=f.insert&&(a.isArray(f.insert)||(f.insert=[f.insert]),a.each(f.insert.sort(function(a,b){return a-b}),function(a,b){A(b.pos,b.c,!0)})),f.refreshFromBuffer){var v=f.refreshFromBuffer;if(d=!0,x(v===!0?v:v.start,v.end,u),void 0==f.pos&&void 0==f.c)return f.pos=o(),!1;if(t=void 0!=f.pos?f.pos:b,t!=b)return f=a.extend(f,A(t,s,!0)),!1}else if(f!==!0&&void 0!=f.pos&&f.pos!=b&&(t=f.pos,x(b,t),t!=b))return f=a.extend(f,A(t,s,!0)),!1;return 1!=f&&void 0==f.pos&&void 0==f.c?!1:(h>0&&n(!0),p(t,a.extend({},j,{input:y(s,k)}),e)||(f=!1),!1)}}),f}function h(b,c,d,e){for(var f,h,j,k,l=a.extend(!0,{},i().validPositions),m=o();m>=0&&(k=i().validPositions[m],!k||void 0==k.alternation||(f=m,h=i().validPositions[f].alternation,r(f).locator[k.alternation]==k.locator[k.alternation]));m--);if(void 0!=h){f=parseInt(f);for(var p in i().validPositions)if(p=parseInt(p),k=i().validPositions[p],p>=f&&void 0!=k.alternation){var q=i().validPositions[f].locator[h].toString().split(","),s=k.locator[h]||q[0];s.length>0&&(s=s.split(",")[0]);for(var t=0;t<q.length;t++)if(s<q[t]){for(var u,v,w=p;w>=0;w--)if(u=i().validPositions[w],void 0!=u){v=u.locator[h],u.locator[h]=parseInt(q[t]);break}if(s!=u.locator[h]){for(var x=[],y=0,z=p+1;z<o()+1;z++){var B=i().validPositions[z];B&&(null!=B.match.fn?x.push(B.input):b>z&&y++),delete i().validPositions[z],delete i().tests[z]}for(n(!0),g.keepStatic=!g.keepStatic,j=!0;x.length>0;){var C=x.shift();if(C!=g.skipOptionalPartCharacter&&!(j=A(o()+1,C,!1,!0)))break}if(u.alternation=h,u.locator[h]=v,j){for(var D=o(b)+1,E=0,z=p+1;z<o()+1;z++){var B=i().validPositions[z];B&&null==B.match.fn&&b>z&&E++}b+=E-y,j=A(b>D?D:b,c,d,e)}if(g.keepStatic=!g.keepStatic,j)return j;n(),i().validPositions=a.extend(!0,{},l)}}break}}return!1}function j(b,c){for(var d=i().validPositions[c],e=d.locator,f=e.length,g=b;c>g;g++)if(!B(g)){var h=u(g),j=h[0],k=-1;a.each(h,function(a,b){for(var c=0;f>c;c++)b.locator[c]&&z(b.locator[c].toString().split(","),e[c].toString().split(","))&&c>k&&(k=c,j=b)}),p(g,a.extend({},j,{input:j.match.def}),!0)}}d=d===!0;for(var k=w(),l=b-1;l>-1&&!i().validPositions[l];l--);for(l++;b>l;l++)void 0==i().validPositions[l]&&((!B(l)||k[l]!=H(l))&&u(l).length>1||k[l]==g.radixPoint||"0"==k[l]&&a.inArray(g.radixPoint,k)<l)&&f(l,k[l],!0);var m=b,s=!1,t=a.extend(!0,{},i().validPositions);if(m<C()&&(s=f(m,c,d,e),(!d||e)&&s===!1)){var v=i().validPositions[m];if(!v||null!=v.match.fn||v.match.def!=c&&c!=g.skipOptionalPartCharacter){if((g.insertMode||void 0==i().validPositions[D(m)])&&!B(m))for(var E=m+1,G=D(m);G>=E;E++)if(s=f(E,c,d,e),s!==!1){j(m,E),m=E;break}}else s={caret:D(m)}}if(s===!1&&g.keepStatic&&N(k)&&(s=h(b,c,d,e)),s===!0&&(s={pos:m}),a.isFunction(g.postValidation)&&0!=s&&!d){n(!0);var I=g.postValidation(w(),g);if(I){if(I.refreshFromBuffer){var J=I.refreshFromBuffer;x(J===!0?J:J.start,J.end,I.buffer),n(!0),s=I}}else n(!0),i().validPositions=a.extend(!0,{},t),s=!1}return s}function B(a){var b=s(a);if(null!=b.fn)return b.fn;if(!g.keepStatic&&void 0==i().validPositions[a]){for(var c=u(a),d=!0,e=0;e<c.length;e++)if(""!=c[e].match.def&&(void 0==c[e].alternation||c[e].locator[c[e].alternation].length>1)){d=!1;break}return d}return!1}function C(){var a;da=ca.prop("maxLength"),-1==da&&(da=void 0);var b,c=o(),d=i().validPositions[c],e=void 0!=d?d.locator.slice():void 0;for(b=c+1;void 0==d||null!=d.match.fn||null==d.match.fn&&""!=d.match.def;b++)d=r(b,e,b-1),e=d.locator.slice();var f=s(b-1);return a=""!=f.def?b:b-1,void 0==da||da>a?a:da}function D(a){var b=C();if(a>=b)return b;for(var c=a;++c<b&&!B(c)&&(g.nojumps!==!0||g.nojumpsThreshold>c););return c}function E(a){var b=a;if(0>=b)return 0;for(;--b>0&&!B(b););return b}function F(a){return void 0==i().validPositions[a]?H(a):i().validPositions[a].input}function G(b,c,d,e,f){if(e&&a.isFunction(g.onBeforeWrite)){var h=g.onBeforeWrite.call(b,e,c,d,g);if(h){if(h.refreshFromBuffer){var i=h.refreshFromBuffer;x(i===!0?i:i.start,i.end,h.buffer||c),n(!0),c=w()}d=h.caret||d}}b._valueSet(c.join("")),void 0!=d&&K(b,d),f===!0&&(ga=!0,a(b).trigger("input"))}function H(a,b){if(b=b||s(a),void 0!=b.placeholder)return b.placeholder;if(null==b.fn){if(!g.keepStatic&&void 0==i().validPositions[a]){for(var c,d=u(a),e=!1,f=0;f<d.length;f++){if(c&&""!=d[f].match.def&&d[f].match.def!=c.match.def&&(void 0==d[f].alternation||d[f].alternation==c.alternation)){e=!0;break}1!=d[f].match.optionality&&1!=d[f].match.optionalQuantifier&&(c=d[f])}if(e)return g.placeholder.charAt(a%g.placeholder.length)}return b.def}return g.placeholder.charAt(a%g.placeholder.length)}function I(c,d,e,f){function h(){var a=!1,b=v().slice(l,D(l)).join("").indexOf(k);if(-1!=b&&!B(l)){a=!0;for(var c=v().slice(l,l+b),d=0;d<c.length;d++)if(" "!=c[d]){a=!1;break}}return a}var j=void 0!=f?f.slice():c._valueGet().split(""),k="",l=0;if(n(),i().p=D(-1),d&&c._valueSet(""),!e)if(1!=g.autoUnmask){var m=v().slice(0,D(-1)).join(""),p=j.join("").match(new RegExp("^"+b.escapeRegex(m),"g"));p&&p.length>0&&(j.splice(0,p.length*m.length),l=D(l))}else l=D(l);a.each(j,function(b,d){var f=a.Event("keypress");if(f.which=d.charCodeAt(0),k+=d,ra=o(void 0,!0),lvTest=i().validPositions[ra],nextTest=r(ra+1,lvTest?lvTest.locator.slice():void 0,ra),!h()||e||g.autoUnmask){var j=e?b:null==nextTest.match.fn&&nextTest.match.optionality&&ra+1<i().p?ra+1:i().p;T.call(c,f,!0,!1,e,j),l=j+1,k=""}else T.call(c,f,!0,!1,!0,ra+1)}),d&&G(c,w(),a(c).is(":focus")?D(o(0)):void 0,a.Event("checkval"))}function J(b){if(b[0].inputmask&&!b.hasClass("hasDatepicker")){var c=[],d=i().validPositions;for(var e in d)d[e].match&&null!=d[e].match.fn&&c.push(d[e].input);var f=(ea?c.reverse():c).join(""),h=(ea?w().slice().reverse():w()).join("");return a.isFunction(g.onUnMask)&&(f=g.onUnMask.call(b,h,f,g)||f),f}return b[0]._valueGet()}function K(b,c,d){function e(a){if(ea&&"number"==typeof a&&(!g.greedy||""!=g.placeholder)){var b=w().length;a=b-a}return a}var f,h=b.jquery&&b.length>0?b[0]:b;if("number"!=typeof c)return h.setSelectionRange?(c=h.selectionStart,d=h.selectionEnd):window.getSelection?(f=window.getSelection().getRangeAt(0),(f.commonAncestorContainer.parentNode==h||f.commonAncestorContainer==h)&&(c=f.startOffset,d=f.endOffset)):document.selection&&document.selection.createRange&&(f=document.selection.createRange(),c=0-f.duplicate().moveStart("character",-1e5),d=c+f.text.length),{begin:e(c),end:e(d)};if(c=e(c),d=e(d),d="number"==typeof d?d:c,a(h).is(":visible")){var i=a(h).css("font-size").replace("px","")*d;if(h.scrollLeft=i>h.scrollWidth?i:0,k||0!=g.insertMode||c!=d||d++,h.setSelectionRange)h.selectionStart=c,h.selectionEnd=d;else if(window.getSelection){if(f=document.createRange(),void 0==h.firstChild){var j=document.createTextNode("");h.appendChild(j)}f.setStart(h.firstChild,c<h._valueGet().length?c:h._valueGet().length),f.setEnd(h.firstChild,d<h._valueGet().length?d:h._valueGet().length),f.collapse(!0);var l=window.getSelection();l.removeAllRanges(),l.addRange(f)}else h.createTextRange&&(f=h.createTextRange(),f.collapse(!0),f.moveEnd("character",d),f.moveStart("character",c),f.select())}}function L(b){var c,d,e=w(),f=e.length,g=o(),h={},j=i().validPositions[g],k=void 0!=j?j.locator.slice():void 0;for(c=g+1;c<e.length;c++)d=r(c,k,c-1),k=d.locator.slice(),h[c]=a.extend(!0,{},d);var l=j&&void 0!=j.alternation?j.locator[j.alternation]:void 0;for(c=f-1;c>g&&(d=h[c],(d.match.optionality||d.match.optionalQuantifier||l&&(l!=h[c].locator[j.alternation]&&null!=d.match.fn||null==d.match.fn&&d.locator[j.alternation]&&z(d.locator[j.alternation].toString().split(","),l.split(","))&&""!=u(c)[0].def))&&e[c]==H(c,d.match));c--)f--;return b?{l:f,def:h[f]?h[f].match:void 0}:f}function M(a){for(var b=L(),c=a.length-1;c>b&&!B(c);c--);return a.splice(b,c+1-b),a}function N(b){if(a.isFunction(g.isComplete))return g.isComplete.call(ca,b,g);if("*"==g.repeat)return void 0;{var c=!1,d=L(!0),e=E(d.l);o()}if(void 0==d.def||d.def.newBlockMarker||d.def.optionality||d.def.optionalQuantifier){c=!0;for(var f=0;e>=f;f++){var h=r(f).match;if(null!=h.fn&&void 0==i().validPositions[f]&&h.optionality!==!0&&h.optionalQuantifier!==!0||null==h.fn&&b[f]!=H(f,h)){c=!1;break}}}return c}function O(a,b){return ea?a-b>1||a-b==1&&g.insertMode:b-a>1||b-a==1&&g.insertMode}function P(c){var d=a._data(c).events,e=!1;a.each(d,function(c,d){a.each(d,function(a,c){if("inputmask"==c.namespace&&"setvalue"!=c.type){var d=c.handler;c.handler=function(a){if(!(this.disabled||this.readOnly&&!("keydown"==a.type&&a.ctrlKey&&67==a.keyCode||a.keyCode==b.keyCode.TAB))){switch(a.type){case"input":if(ga===!0||e===!0)return ga=!1,a.preventDefault();break;case"keydown":fa=!1,e=!1;break;case"keypress":if(fa===!0)return a.preventDefault();fa=!0;break;case"compositionstart":e=!0;break;case"compositionupdate":ga=!0;break;case"compositionend":e=!1}return d.apply(this,arguments)}a.preventDefault()}}})})}function Q(b){function c(b){if(void 0==a.valHooks[b]||1!=a.valHooks[b].inputmaskpatch){var c=a.valHooks[b]&&a.valHooks[b].get?a.valHooks[b].get:function(a){return a.value},d=a.valHooks[b]&&a.valHooks[b].set?a.valHooks[b].set:function(a,b){return a.value=b,a};a.valHooks[b]={get:function(b){a(b);if(b.inputmask){if(b.inputmask.opts.autoUnmask)return b.inputmask.unmaskedvalue();var d=c(b),e=b.inputmask.maskset,f=e._buffer;return f=f?f.join(""):"",d!=f?d:""}return c(b)},set:function(b,c){var e,f=a(b);return e=d(b,c),b.inputmask&&f.triggerHandler("setvalue.inputmask"),e},inputmaskpatch:!0}}}function d(){a(this);return this.inputmask?this.inputmask.opts.autoUnmask?this.inputmask.unmaskedvalue():g.call(this)!=v().join("")?g.call(this):"":g.call(this)}function e(b){h.call(this,b),this.inputmask&&a(this).triggerHandler("setvalue.inputmask")}function f(b){a(b).bind("mouseenter.inputmask",function(b){var c=a(this),d=this,e=d._valueGet();""!=e&&e!=w().join("")&&c.triggerHandler("setvalue.inputmask")});
//!! the bound handlers are executed in the order they where bound
	var c=a._data(b).events,d=c.mouseover;if(d){for(var e=d[d.length-1],f=d.length-1;f>0;f--)d[f]=d[f-1];d[0]=e}}var g,h;if(!b._valueGet){var i;Object.getOwnPropertyDescriptor&&void 0==b.value?(g=function(){return this.textContent},h=function(a){this.textContent=a},Object.defineProperty(b,"value",{get:d,set:e})):((i=Object.getOwnPropertyDescriptor&&Object.getOwnPropertyDescriptor(b,"value"))&&i.configurable,document.__lookupGetter__&&b.__lookupGetter__("value")?(g=b.__lookupGetter__("value"),h=b.__lookupSetter__("value"),b.__defineGetter__("value",d),b.__defineSetter__("value",e)):(g=function(){return b.value},h=function(a){b.value=a},c(b.type),f(b))),b._valueGet=function(a){return ea&&a!==!0?g.call(this).split("").reverse().join(""):g.call(this)},b._valueSet=function(a){h.call(this,ea?a.split("").reverse().join(""):a)}}}function R(c,d,e,f){function h(){if(g.keepStatic){n(!0);var b,d=[],e=a.extend(!0,{},i().validPositions);for(b=o();b>=0;b--){var f=i().validPositions[b];if(f&&(null!=f.match.fn&&d.push(f.input),delete i().validPositions[b],void 0!=f.alternation&&f.locator[f.alternation]==r(b).locator[f.alternation]))break}if(b>-1)for(;d.length>0;){i().p=D(o());var h=a.Event("keypress");h.which=d.pop().charCodeAt(0),T.call(c,h,!0,!1,!1,i().p)}else i().validPositions=a.extend(!0,{},e)}}if((g.numericInput||ea)&&(d==b.keyCode.BACKSPACE?d=b.keyCode.DELETE:d==b.keyCode.DELETE&&(d=b.keyCode.BACKSPACE),ea)){var j=e.end;e.end=e.begin,e.begin=j}if(d==b.keyCode.BACKSPACE&&(e.end-e.begin<1||0==g.insertMode)?(e.begin=E(e.begin),void 0==i().validPositions[e.begin]||i().validPositions[e.begin].input!=g.groupSeparator&&i().validPositions[e.begin].input!=g.radixPoint||e.begin--):d==b.keyCode.DELETE&&e.begin==e.end&&(e.end=B(e.end)?e.end+1:D(e.end)+1,void 0==i().validPositions[e.begin]||i().validPositions[e.begin].input!=g.groupSeparator&&i().validPositions[e.begin].input!=g.radixPoint||e.end++),q(e.begin,e.end,!1,f),f!==!0){h();var k=o(e.begin);k<e.begin?(-1==k&&n(),i().p=D(k)):i().p=e.begin}}function S(d){var e=this,f=a(e),h=d.keyCode,k=K(e);h==b.keyCode.BACKSPACE||h==b.keyCode.DELETE||j&&127==h||d.ctrlKey&&88==h&&!c("cut")?(d.preventDefault(),88==h&&($=w().join("")),R(e,h,k),G(e,w(),i().p,d,$!=w().join("")),e._valueGet()==v().join("")?f.trigger("cleared"):N(w())===!0&&f.trigger("complete"),g.showTooltip&&f.prop("title",i().mask)):h==b.keyCode.END||h==b.keyCode.PAGE_DOWN?setTimeout(function(){var a=D(o());g.insertMode||a!=C()||d.shiftKey||a--,K(e,d.shiftKey?k.begin:a,a)},0):h==b.keyCode.HOME&&!d.shiftKey||h==b.keyCode.PAGE_UP?K(e,0,d.shiftKey?k.begin:0):(g.undoOnEscape&&h==b.keyCode.ESCAPE||90==h&&d.ctrlKey)&&d.altKey!==!0?(I(e,!0,!1,$.split("")),f.click()):h!=b.keyCode.INSERT||d.shiftKey||d.ctrlKey?0!=g.insertMode||d.shiftKey||(h==b.keyCode.RIGHT?setTimeout(function(){var a=K(e);K(e,a.begin)},0):h==b.keyCode.LEFT&&setTimeout(function(){var a=K(e);K(e,ea?a.begin+1:a.begin-1)},0)):(g.insertMode=!g.insertMode,K(e,g.insertMode||k.begin!=C()?k.begin:k.begin-1)),g.onKeyDown.call(this,d,w(),K(e).begin,g),ha=-1!=a.inArray(h,g.ignorables)}function T(c,d,e,f,h){var j=this,k=a(j),l=c.which||c.charCode||c.keyCode;if(!(d===!0||c.ctrlKey&&c.altKey)&&(c.ctrlKey||c.metaKey||ha))return!0;if(l){46==l&&0==c.shiftKey&&","==g.radixPoint&&(l=44);var m,o=d?{begin:h,end:h}:K(j),q=String.fromCharCode(l),r=O(o.begin,o.end);r&&(i().undoPositions=a.extend(!0,{},i().validPositions),R(j,b.keyCode.DELETE,o,!0),o.begin=i().p,g.insertMode||(g.insertMode=!g.insertMode,p(o.begin,f),g.insertMode=!g.insertMode),r=!g.multi),i().writeOutBuffer=!0;var s=ea&&!r?o.end:o.begin,t=A(s,q,f);if(t!==!1){if(t!==!0&&(s=void 0!=t.pos?t.pos:s,q=void 0!=t.c?t.c:q),n(!0),void 0!=t.caret)m=t.caret;else{var v=i().validPositions;m=!g.keepStatic&&(void 0!=v[s+1]&&u(s+1,v[s].locator.slice(),s).length>1||void 0!=v[s].alternation)?s+1:D(s)}i().p=m}if(e!==!1){var y=this;if(setTimeout(function(){g.onKeyValidation.call(y,t,g)},0),i().writeOutBuffer&&t!==!1){var z=w();G(j,z,d?void 0:g.numericInput?E(m):m,c,d!==!0),d!==!0&&setTimeout(function(){N(z)===!0&&k.trigger("complete")},0)}else r&&(i().buffer=void 0,i().validPositions=i().undoPositions)}else r&&(i().buffer=void 0,i().validPositions=i().undoPositions);if(g.showTooltip&&k.prop("title",i().mask),d&&a.isFunction(g.onBeforeWrite)){var B=g.onBeforeWrite.call(this,c,w(),m,g);if(B&&B.refreshFromBuffer){var C=B.refreshFromBuffer;x(C===!0?C:C.start,C.end,B.buffer),n(!0),B.caret&&(i().p=B.caret)}}if(c.preventDefault(),d)return t}}function U(b){var c=this,d=a(c),e=c._valueGet(!0),f=K(c);if("propertychange"==b.type&&c._valueGet().length<=C())return!0;if("paste"==b.type){var h=e.substr(0,f.begin),i=e.substr(f.end,e.length);h==v().slice(0,f.begin).join("")&&(h=""),i==v().slice(f.end).join("")&&(i=""),window.clipboardData&&window.clipboardData.getData?e=h+window.clipboardData.getData("Text")+i:b.originalEvent&&b.originalEvent.clipboardData&&b.originalEvent.clipboardData.getData&&(e=h+b.originalEvent.clipboardData.getData("text/plain")+i)}var j=e;if(a.isFunction(g.onBeforePaste)){if(j=g.onBeforePaste.call(c,e,g),j===!1)return b.preventDefault(),!1;j||(j=e)}return I(c,!1,!1,ea?j.split("").reverse():j.split("")),G(c,w(),void 0,b,!0),d.click(),N(w())===!0&&d.trigger("complete"),!1}function V(b){var c=this;I(c,!0,!1),N(w())===!0&&a(c).trigger("complete"),b.preventDefault()}function W(a){var b=this;$=w().join(""),(""==aa||0!=a.originalEvent.data.indexOf(aa))&&(_=K(b))}function X(b){var c=this,d=K(c);0==b.originalEvent.data.indexOf(aa)&&(n(),d=_);var e=b.originalEvent.data;K(c,d.begin,d.end);for(var f=0;f<e.length;f++){var h=a.Event("keypress");h.which=e.charCodeAt(f),fa=!1,ha=!1,T.call(c,h)}setTimeout(function(){var a=i().p;G(c,w(),g.numericInput?E(a):a)},0),aa=b.originalEvent.data}function Y(a){}function Z(c){ca=a(c),g.showTooltip&&ca.prop("title",i().mask),("rtl"==c.dir||g.rightAlign)&&ca.css("text-align","right"),("rtl"==c.dir||g.numericInput)&&(c.dir="ltr",ca.removeAttr("dir"),c.inputmask.isRTL=!0,ea=!0),ca.unbind(".inputmask"),(ca.is(":input")&&d(ca.attr("type"))||c.isContentEditable)&&(ca.closest("form").bind("submit",function(a){$!=w().join("")&&ca.change(),g.clearMaskOnLostFocus&&ca[0]._valueGet&&ca[0]._valueGet()==v().join("")&&ca[0]._valueSet(""),g.removeMaskOnSubmit&&ca.inputmask("remove")}).bind("reset",function(){setTimeout(function(){ca.triggerHandler("setvalue.inputmask")},0)}),ca.bind("mouseenter.inputmask",function(){var b=a(this),c=this;ja=!0,!b.is(":focus")&&g.showMaskOnHover&&c._valueGet()!=w().join("")&&G(c,w())}).bind("blur.inputmask",function(b){var c=a(this),d=this;if(d.inputmask){var e=d._valueGet(),f=w().slice();ia=!0,$!=f.join("")&&setTimeout(function(){c.change(),$=f.join("")},0),""!=e&&(g.clearMaskOnLostFocus&&(e==v().join("")?f=[]:M(f)),N(f)===!1&&(setTimeout(function(){c.trigger("incomplete")},0),g.clearIncomplete&&(n(),f=g.clearMaskOnLostFocus?[]:v().slice())),G(d,f,void 0,b))}}).bind("focus.inputmask",function(b){var c=(a(this),this),d=c._valueGet();g.showMaskOnFocus&&(!g.showMaskOnHover||g.showMaskOnHover&&""==d)?c._valueGet()!=w().join("")&&G(c,w(),D(o())):ja===!1&&K(c,D(o())),$=w().join("")}).bind("mouseleave.inputmask",function(){var b=a(this),c=this;if(ja=!1,g.clearMaskOnLostFocus){var d=w().slice(),e=c._valueGet();b.is(":focus")||e==b.attr("placeholder")||""==e||(e==v().join("")?d=[]:M(d),G(c,d))}}).bind("click.inputmask",function(){var b=a(this),c=this;if(b.is(":focus")){var d=K(c);if(d.begin==d.end)if(g.radixFocus&&""!=g.radixPoint&&-1!=a.inArray(g.radixPoint,w())&&(ia||w().join("")==v().join("")))K(c,a.inArray(g.radixPoint,w())),ia=!1;else{var e=d.begin,f=D(o(e));f>e?K(c,B(e)?e:D(e)):K(c,f)}}}).bind("dblclick.inputmask",function(){var a=this;setTimeout(function(){K(a,0,D(o()))},0)}).bind(m+".inputmask dragdrop.inputmask drop.inputmask",U).bind("cut.inputmask",function(c){ga=!0;var d=this,e=a(d),f=K(d);if(ea){var h=window.clipboardData||c.originalEvent.clipboardData,j=h.getData("text").split("").reverse().join("");h.setData("text",j)}R(d,b.keyCode.DELETE,f),G(d,w(),i().p,c,$!=w().join("")),d._valueGet()==v().join("")&&e.trigger("cleared"),g.showTooltip&&e.prop("title",i().mask)}).bind("complete.inputmask",g.oncomplete).bind("incomplete.inputmask",g.onincomplete).bind("cleared.inputmask",g.oncleared),ca.bind("keydown.inputmask",S).bind("keypress.inputmask",T),l||ca.bind("compositionstart.inputmask",W).bind("compositionupdate.inputmask",X).bind("compositionend.inputmask",Y),"paste"===m&&ca.bind("input.inputmask",V)),ca.bind("setvalue.inputmask",function(){var b=this,c=b._valueGet();b._valueSet(a.isFunction(g.onBeforeMask)?g.onBeforeMask.call(b,c,g)||c:c),I(b,!0,!1),$=w().join(""),(g.clearMaskOnLostFocus||g.clearIncomplete)&&b._valueGet()==v().join("")&&b._valueSet("")}),Q(c);var e=a.isFunction(g.onBeforeMask)?g.onBeforeMask.call(c,c._valueGet(),g)||c._valueGet():c._valueGet();I(c,!0,!1,e.split(""));var f=w().slice();$=f.join("");var h;try{h=document.activeElement}catch(j){}N(f)===!1&&g.clearIncomplete&&n(),g.clearMaskOnLostFocus&&(f.join("")==v().join("")?f=[]:M(f)),G(c,f),h===c&&K(c,D(o())),P(c)}var $,_,aa,ba,ca,da,ea=!1,fa=!1,ga=!1,ha=!1,ia=!0,ja=!0;if(void 0!=e)switch(e.action){case"isComplete":return ba=e.el,ca=a(ba),f=ba.inputmask.maskset,g=ba.inputmask.opts,N(e.buffer);case"unmaskedvalue":if(ba=e.el,void 0==ba){ca=a({}),ba=ca[0],ba.inputmask=new b,ba.inputmask.opts=g,ba.inputmask.el=ba,ba.inputmask.maskset=f,ba.inputmask.isRTL=g.numericInput,g.numericInput&&(ea=!0);var ka=(a.isFunction(g.onBeforeMask)?g.onBeforeMask.call(ca,e.value,g)||e.value:e.value).split("");I(ca,!1,!1,ea?ka.reverse():ka),a.isFunction(g.onBeforeWrite)&&g.onBeforeWrite.call(this,void 0,w(),0,g)}else ca=a(ba);return f=ba.inputmask.maskset,g=ba.inputmask.opts,ea=ba.inputmask.isRTL,J(ca);case"mask":$=w().join(""),Z(e.el);break;case"format":ca=a({}),ca[0].inputmask=new b,ca[0].inputmask.opts=g,ca[0].inputmask.el=ca[0],ca[0].inputmask.maskset=f,ca[0].inputmask.isRTL=g.numericInput,g.numericInput&&(ea=!0);var ka=(a.isFunction(g.onBeforeMask)?g.onBeforeMask.call(ca,e.value,g)||e.value:e.value).split("");return I(ca,!1,!1,ea?ka.reverse():ka),a.isFunction(g.onBeforeWrite)&&g.onBeforeWrite.call(this,void 0,w(),0,g),e.metadata?{value:ea?w().slice().reverse().join(""):w().join(""),metadata:ca.inputmask("getmetadata")}:ea?w().slice().reverse().join(""):w().join("");case"isValid":ca=a({}),ca[0].inputmask=new b,ca[0].inputmask.opts=g,ca[0].inputmask.el=ca[0],ca[0].inputmask.maskset=f,ca[0].inputmask.isRTL=g.numericInput,g.numericInput&&(ea=!0);var ka=e.value.split("");I(ca,!1,!0,ea?ka.reverse():ka);for(var la=w(),ma=L(),na=la.length-1;na>ma&&!B(na);na--);return la.splice(ma,na+1-ma),N(la)&&e.value==la.join("");case"getemptymask":return ba=e.el,ca=a(ba),f=ba.inputmask.maskset,g=ba.inputmask.opts,v();case"remove":ba=e.el,ca=a(ba),f=ba.inputmask.maskset,g=ba.inputmask.opts,ba._valueSet(J(ca)),ca.unbind(".inputmask"),ba.inputmask=void 0;var oa;Object.getOwnPropertyDescriptor&&(oa=Object.getOwnPropertyDescriptor(ba,"value")),oa&&oa.get?ba._valueGet&&Object.defineProperty(ba,"value",{get:ba._valueGet,set:ba._valueSet}):document.__lookupGetter__&&ba.__lookupGetter__("value")&&ba._valueGet&&(ba.__defineGetter__("value",ba._valueGet),ba.__defineSetter__("value",ba._valueSet));try{delete ba._valueGet,delete ba._valueSet}catch(pa){ba._valueGet=void 0,ba._valueSet=void 0}break;case"getmetadata":if(ba=e.el,ca=a(ba),f=ba.inputmask.maskset,g=ba.inputmask.opts,a.isArray(f.metadata)){for(var qa,ra=o(),sa=ra;sa>=0;sa--)if(i().validPositions[sa]&&void 0!=i().validPositions[sa].alternation){qa=i().validPositions[sa].alternation;break}return void 0!=qa?f.metadata[i().validPositions[ra].locator[qa]]:f.metadata[0]}return f.metadata}}b.prototype={defaults:{placeholder:"_",optionalmarker:{start:"[",end:"]"},quantifiermarker:{start:"{",end:"}"},groupmarker:{start:"(",end:")"},alternatormarker:"|",escapeChar:"\\",mask:null,oncomplete:a.noop,onincomplete:a.noop,oncleared:a.noop,repeat:0,greedy:!0,autoUnmask:!1,removeMaskOnSubmit:!1,clearMaskOnLostFocus:!0,insertMode:!0,clearIncomplete:!1,aliases:{},alias:null,onKeyDown:a.noop,onBeforeMask:void 0,onBeforePaste:void 0,onBeforeWrite:void 0,onUnMask:void 0,showMaskOnFocus:!0,showMaskOnHover:!0,onKeyValidation:a.noop,skipOptionalPartCharacter:" ",showTooltip:!1,numericInput:!1,rightAlign:!1,undoOnEscape:!0,radixPoint:"",groupSeparator:"",radixFocus:!1,nojumps:!1,nojumpsThreshold:0,keepStatic:void 0,definitions:{9:{validator:"[0-9]",cardinality:1,definitionSymbol:"*"},a:{validator:"[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",cardinality:1,definitionSymbol:"*"},"*":{validator:"[0-9A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",cardinality:1}},ignorables:[8,9,13,19,27,33,34,35,36,37,38,39,40,45,46,93,112,113,114,115,116,117,118,119,120,121,122,123],isComplete:void 0,canClearPosition:a.noop,postValidation:void 0},keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91},masksCache:{},mask:function(c){var d=c.jquery&&c.length>0?c[0]:c,e=a.extend(!0,{},this.opts);f(c,e,a.extend(!0,{},this.userOptions));var i=g(e,this.noMasksCache);return void 0!=i&&(d.inputmask=new b,d.inputmask.opts=e,d.inputmask.noMasksCache=this.noMasksCache,d.inputmask.el=d,d.inputmask.maskset=i,d.inputmask.isRTL=!1,h({action:"mask",el:d},i,d.inputmask.opts)),c},unmaskedvalue:function(){return this.el?h({action:"unmaskedvalue",el:this.el}):void 0},remove:function(){return this.el?(h({action:"remove",el:this.el}),this.el.inputmask=void 0,this.el):void 0},getemptymask:function(){return this.el?h({action:"getemptymask",el:this.el}):void 0},hasMaskedValue:function(){return!this.opts.autoUnmask},isComplete:function(){return this.el?h({action:"isComplete",buffer:this.el._valueGet().split(""),el:this.el}):void 0},getmetadata:function(){return this.el?h({action:"getmetadata",el:this.el}):void 0}},b.extendDefaults=function(c){a.extend(b.prototype.defaults,c)},b.extendDefinitions=function(c){a.extend(b.prototype.defaults.definitions,c)},b.extendAliases=function(c){a.extend(b.prototype.defaults.aliases,c)},b.format=function(c,d,f){var i=a.extend(!0,{},b.prototype.defaults,d);return e(i.alias,d,i),h({action:"format",value:c,metadata:f},g(i,d&&void 0!==d.definitions),i)},b.unmask=function(c,d){var f=a.extend(!0,{},b.prototype.defaults,d);return e(f.alias,d,f),h({action:"unmaskedvalue",value:c},g(f,d&&void 0!==d.definitions),f)},b.isValid=function(c,d){var f=a.extend(!0,{},b.prototype.defaults,d);return e(f.alias,d,f),h({action:"isValid",value:c},g(f,d&&void 0!==d.definitions),f)},b.escapeRegex=function(a){var b=["/",".","*","+","?","|","(",")","[","]","{","}","\\","$","^"];return a.replace(new RegExp("(\\"+b.join("|\\")+")","gim"),"\\$1")},b.keyCode={ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91};var i=navigator.userAgent,j=null!==i.match(new RegExp("iphone","i")),k=(null!==i.match(new RegExp("android.*safari.*","i")),null!==i.match(new RegExp("android.*chrome.*","i"))),l=null!==i.match(new RegExp("android.*firefox.*","i")),m=(/Kindle/i.test(i)||/Silk/i.test(i)||/KFTT/i.test(i)||/KFOT/i.test(i)||/KFJWA/i.test(i)||/KFJWI/i.test(i)||/KFSOWI/i.test(i)||/KFTHWA/i.test(i)||/KFTHWI/i.test(i)||/KFAPWA/i.test(i)||/KFAPWI/i.test(i),c("paste")?"paste":c("input")?"input":"propertychange");return window.inputmask=b,b}(jQuery),function(a){return void 0===a.fn.inputmask&&(a.fn.inputmask=function(b,c){var d;if(c=c||{},"string"==typeof b)switch(b){case"mask":return d=new inputmask(c),this.each(function(){d.mask(this)});case"unmaskedvalue":var e=this.jquery&&this.length>0?this[0]:this;return e.inputmask?e.inputmask.unmaskedvalue():a(e).val();case"remove":return this.each(function(){this.inputmask&&this.inputmask.remove()});case"getemptymask":var e=this.jquery&&this.length>0?this[0]:this;return e.inputmask?e.inputmask.getemptymask():"";case"hasMaskedValue":var e=this.jquery&&this.length>0?this[0]:this;return e.inputmask?e.inputmask.hasMaskedValue():!1;case"isComplete":var e=this.jquery&&this.length>0?this[0]:this;return e.inputmask?e.inputmask.isComplete():!0;case"getmetadata":var e=this.jquery&&this.length>0?this[0]:this;return e.inputmask?e.inputmask.getmetadata():void 0;default:return c.alias=b,d=new inputmask(c),this.each(function(){d.mask(this)})}else{if("object"==typeof b)return d=new inputmask(b),this.each(function(){d.mask(this)});if(void 0==b)return this.each(function(){d=new inputmask(c),d.mask(this)})}}),a.fn.inputmask}(jQuery),function(a){return inputmask.extendDefinitions({h:{validator:"[01][0-9]|2[0-3]",cardinality:2,prevalidator:[{validator:"[0-2]",cardinality:1}]},s:{validator:"[0-5][0-9]",cardinality:2,prevalidator:[{validator:"[0-5]",cardinality:1}]},d:{validator:"0[1-9]|[12][0-9]|3[01]",cardinality:2,prevalidator:[{validator:"[0-3]",cardinality:1}]},m:{validator:"0[1-9]|1[012]",cardinality:2,prevalidator:[{validator:"[01]",cardinality:1}]},y:{validator:"(19|20)\\d{2}",cardinality:4,prevalidator:[{validator:"[12]",cardinality:1},{validator:"(19|20)",cardinality:2},{validator:"(19|20)\\d",cardinality:3}]}}),inputmask.extendAliases({"dd/mm/yyyy":{mask:"1/2/y",placeholder:"dd/mm/yyyy",regex:{val1pre:new RegExp("[0-3]"),val1:new RegExp("0[1-9]|[12][0-9]|3[01]"),val2pre:function(a){var b=inputmask.escapeRegex.call(this,a);return new RegExp("((0[1-9]|[12][0-9]|3[01])"+b+"[01])")},val2:function(a){var b=inputmask.escapeRegex.call(this,a);return new RegExp("((0[1-9]|[12][0-9])"+b+"(0[1-9]|1[012]))|(30"+b+"(0[13-9]|1[012]))|(31"+b+"(0[13578]|1[02]))")}},leapday:"29/02/",separator:"/",yearrange:{minyear:1900,maxyear:2099},isInYearRange:function(a,b,c){if(isNaN(a))return!1;var d=parseInt(a.concat(b.toString().slice(a.length))),e=parseInt(a.concat(c.toString().slice(a.length)));return(isNaN(d)?!1:d>=b&&c>=d)||(isNaN(e)?!1:e>=b&&c>=e)},determinebaseyear:function(a,b,c){var d=(new Date).getFullYear();if(a>d)return a;if(d>b){for(var e=b.toString().slice(0,2),f=b.toString().slice(2,4);e+c>b;)e--;var g=e+f;return a>g?a:g}return d},onKeyDown:function(b,c,d,e){var f=a(this);if(b.ctrlKey&&b.keyCode==inputmask.keyCode.RIGHT){var g=new Date;f.val(g.getDate().toString()+(g.getMonth()+1).toString()+g.getFullYear().toString()),f.triggerHandler("setvalue.inputmask")}},getFrontValue:function(a,b,c){for(var d=0,e=0,f=0;f<a.length&&"2"!=a.charAt(f);f++){var g=c.definitions[a.charAt(f)];g?(d+=e,e=g.cardinality):e++}return b.join("").substr(d,e)},definitions:{1:{validator:function(a,b,c,d,e){var f=e.regex.val1.test(a);return d||f||a.charAt(1)!=e.separator&&-1=="-./".indexOf(a.charAt(1))||!(f=e.regex.val1.test("0"+a.charAt(0)))?f:(b.buffer[c-1]="0",{refreshFromBuffer:{start:c-1,end:c},pos:c,c:a.charAt(0)})},cardinality:2,prevalidator:[{validator:function(a,b,c,d,e){var f=a;isNaN(b.buffer[c+1])||(f+=b.buffer[c+1]);var g=1==f.length?e.regex.val1pre.test(f):e.regex.val1.test(f);if(!d&&!g){if(g=e.regex.val1.test(a+"0"))return b.buffer[c]=a,b.buffer[++c]="0",{pos:c,c:"0"};if(g=e.regex.val1.test("0"+a))return b.buffer[c]="0",c++,{pos:c}}return g},cardinality:1}]},2:{validator:function(a,b,c,d,e){var f=e.getFrontValue(b.mask,b.buffer,e);-1!=f.indexOf(e.placeholder[0])&&(f="01"+e.separator);var g=e.regex.val2(e.separator).test(f+a);if(!d&&!g&&(a.charAt(1)==e.separator||-1!="-./".indexOf(a.charAt(1)))&&(g=e.regex.val2(e.separator).test(f+"0"+a.charAt(0))))return b.buffer[c-1]="0",{refreshFromBuffer:{start:c-1,end:c},pos:c,c:a.charAt(0)};if(e.mask.indexOf("2")==e.mask.length-1&&g){var h=b.buffer.join("").substr(4,4)+a;if(h!=e.leapday)return!0;var i=parseInt(b.buffer.join("").substr(0,4),10);return i%4===0?i%100===0?i%400===0?!0:!1:!0:!1}return g},cardinality:2,prevalidator:[{validator:function(a,b,c,d,e){isNaN(b.buffer[c+1])||(a+=b.buffer[c+1]);var f=e.getFrontValue(b.mask,b.buffer,e);-1!=f.indexOf(e.placeholder[0])&&(f="01"+e.separator);var g=1==a.length?e.regex.val2pre(e.separator).test(f+a):e.regex.val2(e.separator).test(f+a);return d||g||!(g=e.regex.val2(e.separator).test(f+"0"+a))?g:(b.buffer[c]="0",c++,{pos:c})},cardinality:1}]},y:{validator:function(a,b,c,d,e){if(e.isInYearRange(a,e.yearrange.minyear,e.yearrange.maxyear)){var f=b.buffer.join("").substr(0,6);if(f!=e.leapday)return!0;var g=parseInt(a,10);return g%4===0?g%100===0?g%400===0?!0:!1:!0:!1}return!1},cardinality:4,prevalidator:[{validator:function(a,b,c,d,e){var f=e.isInYearRange(a,e.yearrange.minyear,e.yearrange.maxyear);if(!d&&!f){var g=e.determinebaseyear(e.yearrange.minyear,e.yearrange.maxyear,a+"0").toString().slice(0,1);if(f=e.isInYearRange(g+a,e.yearrange.minyear,e.yearrange.maxyear))return b.buffer[c++]=g.charAt(0),{pos:c};if(g=e.determinebaseyear(e.yearrange.minyear,e.yearrange.maxyear,a+"0").toString().slice(0,2),f=e.isInYearRange(g+a,e.yearrange.minyear,e.yearrange.maxyear))return b.buffer[c++]=g.charAt(0),b.buffer[c++]=g.charAt(1),{pos:c}}return f},cardinality:1},{validator:function(a,b,c,d,e){var f=e.isInYearRange(a,e.yearrange.minyear,e.yearrange.maxyear);if(!d&&!f){var g=e.determinebaseyear(e.yearrange.minyear,e.yearrange.maxyear,a).toString().slice(0,2);if(f=e.isInYearRange(a[0]+g[1]+a[1],e.yearrange.minyear,e.yearrange.maxyear))return b.buffer[c++]=g.charAt(1),{pos:c};if(g=e.determinebaseyear(e.yearrange.minyear,e.yearrange.maxyear,a).toString().slice(0,2),e.isInYearRange(g+a,e.yearrange.minyear,e.yearrange.maxyear)){var h=b.buffer.join("").substr(0,6);if(h!=e.leapday)f=!0;else{var i=parseInt(a,10);f=i%4===0?i%100===0?i%400===0?!0:!1:!0:!1}}else f=!1;if(f)return b.buffer[c-1]=g.charAt(0),b.buffer[c++]=g.charAt(1),b.buffer[c++]=a.charAt(0),{refreshFromBuffer:{start:c-3,end:c},pos:c}}return f},cardinality:2},{validator:function(a,b,c,d,e){return e.isInYearRange(a,e.yearrange.minyear,e.yearrange.maxyear)},cardinality:3}]}},insertMode:!1,autoUnmask:!1},"mm/dd/yyyy":{placeholder:"mm/dd/yyyy",alias:"dd/mm/yyyy",regex:{val2pre:function(a){var b=inputmask.escapeRegex.call(this,a);return new RegExp("((0[13-9]|1[012])"+b+"[0-3])|(02"+b+"[0-2])")},val2:function(a){var b=inputmask.escapeRegex.call(this,a);return new RegExp("((0[1-9]|1[012])"+b+"(0[1-9]|[12][0-9]))|((0[13-9]|1[012])"+b+"30)|((0[13578]|1[02])"+b+"31)")},val1pre:new RegExp("[01]"),val1:new RegExp("0[1-9]|1[012]")},leapday:"02/29/",onKeyDown:function(b,c,d,e){var f=a(this);if(b.ctrlKey&&b.keyCode==inputmask.keyCode.RIGHT){var g=new Date;f.val((g.getMonth()+1).toString()+g.getDate().toString()+g.getFullYear().toString()),f.triggerHandler("setvalue.inputmask")}}},"yyyy/mm/dd":{mask:"y/1/2",placeholder:"yyyy/mm/dd",alias:"mm/dd/yyyy",leapday:"/02/29",onKeyDown:function(b,c,d,e){var f=a(this);if(b.ctrlKey&&b.keyCode==inputmask.keyCode.RIGHT){var g=new Date;f.val(g.getFullYear().toString()+(g.getMonth()+1).toString()+g.getDate().toString()),f.triggerHandler("setvalue.inputmask")}}},"dd.mm.yyyy":{mask:"1.2.y",placeholder:"dd.mm.yyyy",leapday:"29.02.",separator:".",alias:"dd/mm/yyyy"},"dd-mm-yyyy":{mask:"1-2-y",placeholder:"dd-mm-yyyy",leapday:"29-02-",separator:"-",alias:"dd/mm/yyyy"},"mm.dd.yyyy":{mask:"1.2.y",placeholder:"mm.dd.yyyy",leapday:"02.29.",separator:".",alias:"mm/dd/yyyy"},"mm-dd-yyyy":{mask:"1-2-y",placeholder:"mm-dd-yyyy",leapday:"02-29-",separator:"-",alias:"mm/dd/yyyy"},"yyyy.mm.dd":{mask:"y.1.2",placeholder:"yyyy.mm.dd",leapday:".02.29",separator:".",alias:"yyyy/mm/dd"},"yyyy-mm-dd":{mask:"y-1-2",placeholder:"yyyy-mm-dd",leapday:"-02-29",separator:"-",alias:"yyyy/mm/dd"},datetime:{mask:"1/2/y h:s",placeholder:"dd/mm/yyyy hh:mm",alias:"dd/mm/yyyy",regex:{hrspre:new RegExp("[012]"),hrs24:new RegExp("2[0-4]|1[3-9]"),hrs:new RegExp("[01][0-9]|2[0-4]"),ampm:new RegExp("^[a|p|A|P][m|M]"),mspre:new RegExp("[0-5]"),ms:new RegExp("[0-5][0-9]")},timeseparator:":",hourFormat:"24",definitions:{h:{validator:function(a,b,c,d,e){if("24"==e.hourFormat&&24==parseInt(a,10))return b.buffer[c-1]="0",b.buffer[c]="0",{refreshFromBuffer:{start:c-1,end:c},c:"0"};var f=e.regex.hrs.test(a);if(!d&&!f&&(a.charAt(1)==e.timeseparator||-1!="-.:".indexOf(a.charAt(1)))&&(f=e.regex.hrs.test("0"+a.charAt(0))))return b.buffer[c-1]="0",b.buffer[c]=a.charAt(0),c++,{refreshFromBuffer:{start:c-2,end:c},pos:c,c:e.timeseparator};if(f&&"24"!==e.hourFormat&&e.regex.hrs24.test(a)){var g=parseInt(a,10);return 24==g?(b.buffer[c+5]="a",b.buffer[c+6]="m"):(b.buffer[c+5]="p",b.buffer[c+6]="m"),g-=12,10>g?(b.buffer[c]=g.toString(),b.buffer[c-1]="0"):(b.buffer[c]=g.toString().charAt(1),b.buffer[c-1]=g.toString().charAt(0)),{refreshFromBuffer:{start:c-1,end:c+6},c:b.buffer[c]}}return f},cardinality:2,prevalidator:[{validator:function(a,b,c,d,e){var f=e.regex.hrspre.test(a);return d||f||!(f=e.regex.hrs.test("0"+a))?f:(b.buffer[c]="0",c++,{pos:c})},cardinality:1}]},s:{validator:"[0-5][0-9]",cardinality:2,prevalidator:[{validator:function(a,b,c,d,e){var f=e.regex.mspre.test(a);return d||f||!(f=e.regex.ms.test("0"+a))?f:(b.buffer[c]="0",c++,{pos:c})},cardinality:1}]},t:{validator:function(a,b,c,d,e){return e.regex.ampm.test(a+"m")},casing:"lower",cardinality:1}},insertMode:!1,autoUnmask:!1},datetime12:{mask:"1/2/y h:s t\\m",placeholder:"dd/mm/yyyy hh:mm xm",alias:"datetime",hourFormat:"12"},"hh:mm t":{mask:"h:s t\\m",placeholder:"hh:mm xm",alias:"datetime",hourFormat:"12"},"h:s t":{mask:"h:s t\\m",placeholder:"hh:mm xm",alias:"datetime",hourFormat:"12"},"hh:mm:ss":{mask:"h:s:s",placeholder:"hh:mm:ss",alias:"datetime",autoUnmask:!1},"hh:mm":{mask:"h:s",placeholder:"hh:mm",alias:"datetime",autoUnmask:!1},date:{alias:"dd/mm/yyyy"},"mm/yyyy":{mask:"1/y",placeholder:"mm/yyyy",leapday:"donotuse",separator:"/",alias:"mm/dd/yyyy"},shamsi:{regex:{val2pre:function(a){var b=inputmask.escapeRegex.call(this,a);return new RegExp("((0[1-9]|1[012])"+b+"[0-3])")},val2:function(a){var b=inputmask.escapeRegex.call(this,a);return new RegExp("((0[1-9]|1[012])"+b+"(0[1-9]|[12][0-9]))|((0[1-9]|1[012])"+b+"30)|((0[1-6])"+b+"31)")},val1pre:new RegExp("[01]"),val1:new RegExp("0[1-9]|1[012]")},yearrange:{minyear:1300,maxyear:1499},mask:"y/1/2",leapday:"/12/30",placeholder:"yyyy/mm/dd",alias:"mm/dd/yyyy",clearIncomplete:!0}}),inputmask}(jQuery),function(a){return inputmask.extendDefinitions({A:{validator:"[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",cardinality:1,casing:"upper"},"#":{validator:"[0-9A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",cardinality:1,casing:"upper"}}),inputmask.extendAliases({url:{mask:"ir",placeholder:"",separator:"",defaultPrefix:"http://",regex:{urlpre1:new RegExp("[fh]"),urlpre2:new RegExp("(ft|ht)"),urlpre3:new RegExp("(ftp|htt)"),urlpre4:new RegExp("(ftp:|http|ftps)"),urlpre5:new RegExp("(ftp:/|ftps:|http:|https)"),urlpre6:new RegExp("(ftp://|ftps:/|http:/|https:)"),urlpre7:new RegExp("(ftp://|ftps://|http://|https:/)"),urlpre8:new RegExp("(ftp://|ftps://|http://|https://)")},definitions:{i:{validator:function(a,b,c,d,e){return!0},cardinality:8,prevalidator:function(){for(var a=[],b=8,c=0;b>c;c++)a[c]=function(){var a=c;return{validator:function(b,c,d,e,f){if(f.regex["urlpre"+(a+1)]){var g,h=b;a+1-b.length>0&&(h=c.buffer.join("").substring(0,a+1-b.length)+""+h);var i=f.regex["urlpre"+(a+1)].test(h);if(!e&&!i){for(d-=a,g=0;g<f.defaultPrefix.length;g++)c.buffer[d]=f.defaultPrefix[g],d++;for(g=0;g<h.length-1;g++)c.buffer[d]=h[g],d++;return{pos:d}}return i}return!1},cardinality:a}}();return a}()},r:{validator:".",cardinality:50}},insertMode:!1,autoUnmask:!1},ip:{mask:"i[i[i]].i[i[i]].i[i[i]].i[i[i]]",definitions:{i:{validator:function(a,b,c,d,e){return c-1>-1&&"."!=b.buffer[c-1]?(a=b.buffer[c-1]+a,a=c-2>-1&&"."!=b.buffer[c-2]?b.buffer[c-2]+a:"0"+a):a="00"+a,new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]").test(a)},cardinality:1}}},email:{mask:"*{1,64}[.*{1,64}][.*{1,64}][.*{1,64}]@*{1,64}[.*{2,64}][.*{2,6}][.*{1,2}]",greedy:!1,onBeforePaste:function(a,b){return a=a.toLowerCase(),a.replace("mailto:","")},definitions:{"*":{validator:"[0-9A-Za-z!#$%&'*+/=?^_`{|}~-]",cardinality:1,casing:"lower"}}}}),inputmask}(jQuery),function(a){return inputmask.extendAliases({numeric:{mask:function(a){function b(b){for(var c="",d=0;d<b.length;d++)c+=a.definitions[b[d]]?"\\"+b[d]:b[d];return c}if(0!==a.repeat&&isNaN(a.integerDigits)&&(a.integerDigits=a.repeat),a.repeat=0,a.groupSeparator==a.radixPoint&&("."==a.radixPoint?a.groupSeparator=",":","==a.radixPoint?a.groupSeparator=".":a.groupSeparator="")," "===a.groupSeparator&&(a.skipOptionalPartCharacter=void 0),a.autoGroup=a.autoGroup&&""!=a.groupSeparator,a.autoGroup&&("string"==typeof a.groupSize&&isFinite(a.groupSize)&&(a.groupSize=parseInt(a.groupSize)),isFinite(a.integerDigits))){var c=Math.floor(a.integerDigits/a.groupSize),d=a.integerDigits%a.groupSize;a.integerDigits=parseInt(a.integerDigits)+(0==d?c-1:c)}a.placeholder.length>1&&(a.placeholder=a.placeholder.charAt(0)),a.radixFocus=a.radixFocus&&"0"==a.placeholder,a.definitions[";"]=a.definitions["~"],a.definitions[";"].definitionSymbol="~";var e=b(a.prefix);return e+="[+]",e+="~{1,"+a.integerDigits+"}",void 0!=a.digits&&(isNaN(a.digits)||parseInt(a.digits)>0)&&(e+=a.digitsOptional?"["+(a.decimalProtect?":":a.radixPoint)+";{"+a.digits+"}]":(a.decimalProtect?":":a.radixPoint)+";{"+a.digits+"}"),""!=a.negationSymbol.back&&(e+="[-]"),e+=b(a.suffix),a.greedy=!1,e},placeholder:"",greedy:!1,digits:"*",digitsOptional:!0,radixPoint:".",radixFocus:!0,groupSize:3,autoGroup:!1,allowPlus:!0,allowMinus:!0,negationSymbol:{front:"-",back:""},integerDigits:"+",prefix:"",suffix:"",rightAlign:!0,decimalProtect:!0,min:void 0,max:void 0,step:1,insertMode:!0,autoUnmask:!1,unmaskAsNumber:!1,postFormat:function(b,c,d,e){var f=!1;b.length>=e.suffix.length&&b.join("").indexOf(e.suffix)==b.length-e.suffix.length&&(b.length=b.length-e.suffix.length,f=!0),c=c>=b.length?b.length-1:c<e.prefix.length?e.prefix.length:c;var g=!1,h=b[c];if(""==e.groupSeparator||-1!=a.inArray(e.radixPoint,b)&&c>a.inArray(e.radixPoint,b)||new RegExp("["+inputmask.escapeRegex(e.negationSymbol.front)+"+]").test(h)){if(f)for(var i=0,j=e.suffix.length;j>i;i++)b.push(e.suffix.charAt(i));return{pos:c}}var k=b.slice();h==e.groupSeparator&&(k.splice(c--,1),h=k[c]),d?h!=e.radixPoint&&(k[c]="?"):k.splice(c,0,"?");var l=k.join(""),m=l;if(l.length>0&&e.autoGroup||d&&-1!=l.indexOf(e.groupSeparator)){var n=inputmask.escapeRegex(e.groupSeparator);g=0==l.indexOf(e.groupSeparator),l=l.replace(new RegExp(n,"g"),"");var o=l.split(e.radixPoint);if(l=""==e.radixPoint?l:o[0],l!=e.prefix+"?0"&&l.length>=e.groupSize+e.prefix.length)for(var p=new RegExp("([-+]?[\\d?]+)([\\d?]{"+e.groupSize+"})");p.test(l);)l=l.replace(p,"$1"+e.groupSeparator+"$2"),l=l.replace(e.groupSeparator+e.groupSeparator,e.groupSeparator);""!=e.radixPoint&&o.length>1&&(l+=e.radixPoint+o[1])}g=m!=l,b.length=l.length;for(var i=0,j=l.length;j>i;i++)b[i]=l.charAt(i);var q=a.inArray("?",b);if(-1==q&&h==e.radixPoint&&(q=a.inArray(e.radixPoint,b)),d?b[q]=h:b.splice(q,1),!g&&f)for(var i=0,j=e.suffix.length;j>i;i++)b.push(e.suffix.charAt(i));return{pos:q,refreshFromBuffer:g,buffer:b}},onBeforeWrite:function(b,c,d,e){if(b&&"blur"==b.type){var f=c.join(""),g=f.replace(e.prefix,"");if(g=g.replace(e.suffix,""),g=g.replace(new RegExp(inputmask.escapeRegex(e.groupSeparator),"g"),""),","===e.radixPoint&&(g=g.replace(inputmask.escapeRegex(e.radixPoint),".")),isFinite(g)&&isFinite(e.min)&&parseFloat(g)<parseFloat(e.min))return a.extend(!0,{refreshFromBuffer:!0,buffer:(e.prefix+e.min).split("")},e.postFormat((e.prefix+e.min).split(""),0,!0,e));var h=""!=e.radixPoint?c.join("").split(e.radixPoint):[c.join("")],i=h[0].match(e.regex.integerPart(e)),j=2==h.length?h[1].match(e.regex.integerNPart(e)):void 0;!i||i[0]!=e.negationSymbol.front+"0"&&i[0]!=e.negationSymbol.front&&"+"!=i[0]||void 0!=j&&!j[0].match(/^0+$/)||c.splice(i.index,1);

	var k=a.inArray(e.radixPoint,c);if(-1!=k&&isFinite(e.digits)&&!e.digitsOptional){for(var l=1;l<=e.digits;l++)(void 0==c[k+l]||c[k+l]==e.placeholder.charAt(0))&&(c[k+l]="0");return{refreshFromBuffer:!0,buffer:c}}}if(e.autoGroup){var m=e.postFormat(c,d-1,!0,e);return m.caret=d<=e.prefix.length?m.pos:m.pos+1,m}},regex:{integerPart:function(a){return new RegExp("["+inputmask.escapeRegex(a.negationSymbol.front)+"+]?\\d+")},integerNPart:function(a){return new RegExp("[\\d"+inputmask.escapeRegex(a.groupSeparator)+"]+")}},signHandler:function(a,b,c,d,e){if(!d&&e.allowMinus&&"-"===a||e.allowPlus&&"+"===a){var f=b.buffer.join("").match(e.regex.integerPart(e));if(f&&f[0].length>0)return b.buffer[f.index]==("-"===a?"+":e.negationSymbol.front)?"-"==a?""!=e.negationSymbol.back?{pos:f.index,c:e.negationSymbol.front,remove:f.index,caret:c,insert:{pos:b.buffer.length-e.suffix.length-1,c:e.negationSymbol.back}}:{pos:f.index,c:e.negationSymbol.front,remove:f.index,caret:c}:""!=e.negationSymbol.back?{pos:f.index,c:"+",remove:[f.index,b.buffer.length-e.suffix.length-1],caret:c}:{pos:f.index,c:"+",remove:f.index,caret:c}:b.buffer[f.index]==("-"===a?e.negationSymbol.front:"+")?"-"==a&&""!=e.negationSymbol.back?{remove:[f.index,b.buffer.length-e.suffix.length-1],caret:c-1}:{remove:f.index,caret:c-1}:"-"==a?""!=e.negationSymbol.back?{pos:f.index,c:e.negationSymbol.front,caret:c+1,insert:{pos:b.buffer.length-e.suffix.length,c:e.negationSymbol.back}}:{pos:f.index,c:e.negationSymbol.front,caret:c+1}:{pos:f.index,c:a,caret:c+1}}return!1},radixHandler:function(b,c,d,e,f){if(!e&&b===f.radixPoint&&f.digits>0){var g=a.inArray(f.radixPoint,c.buffer),h=c.buffer.join("").match(f.regex.integerPart(f));if(-1!=g&&c.validPositions[g])return c.validPositions[g-1]?{caret:g+1}:{pos:h.index,c:h[0],caret:g+1};if(!h||"0"==h[0]&&h.index+1!=d)return c.buffer[h?h.index:d]="0",{pos:(h?h.index:d)+1}}return!1},leadingZeroHandler:function(b,c,d,e,f){var g=c.buffer.join("").match(f.regex.integerNPart(f)),h=a.inArray(f.radixPoint,c.buffer);if(g&&!e&&(-1==h||h>=d))if(0==g[0].indexOf("0")){d<f.prefix.length&&(d=g.index);var i=a.inArray(f.radixPoint,c._buffer),j=c._buffer&&c.buffer.slice(h).join("")==c._buffer.slice(i).join("")||0==parseInt(c.buffer.slice(h+1).join("")),k=c._buffer&&c.buffer.slice(g.index,h).join("")==c._buffer.slice(f.prefix.length,i).join("")||"0"==c.buffer.slice(g.index,h).join("");if(-1==h||j&&k)return c.buffer.splice(g.index,1),d=d>g.index?d-1:g.index,{pos:d,remove:g.index};if(g.index+1==d||"0"==b)return c.buffer.splice(g.index,1),d=g.index,{pos:d,remove:g.index}}else if("0"===b&&d<=g.index&&g[0]!=f.groupSeparator)return!1;return!0},postValidation:function(b,c){var d=!0,e=b.join(""),f=e.replace(c.prefix,"");return f=f.replace(c.suffix,""),f=f.replace(new RegExp(inputmask.escapeRegex(c.groupSeparator),"g"),""),","===c.radixPoint&&(f=f.replace(inputmask.escapeRegex(c.radixPoint),".")),f=f.replace(new RegExp("^"+inputmask.escapeRegex(c.negationSymbol.front)),"-"),f=f.replace(new RegExp(inputmask.escapeRegex(c.negationSymbol.back)+"$"),""),f=f==c.negationSymbol.front?f+"0":f,isFinite(f)&&(isFinite(c.max)&&(d=parseFloat(f)<=parseFloat(c.max)),d&&isFinite(c.min)&&(0>=f||f.toString().length>=c.min.toString().length)&&(d=parseFloat(f)>=parseFloat(c.min),d||(d=a.extend(!0,{refreshFromBuffer:!0,buffer:(c.prefix+c.min).split("")},c.postFormat((c.prefix+c.min).split(""),0,!0,c))))),d},definitions:{"~":{validator:function(b,c,d,e,f){var g=f.signHandler(b,c,d,e,f);if(!g&&(g=f.radixHandler(b,c,d,e,f),!g&&(g=e?new RegExp("[0-9"+inputmask.escapeRegex(f.groupSeparator)+"]").test(b):new RegExp("[0-9]").test(b),g===!0&&(g=f.leadingZeroHandler(b,c,d,e,f),g===!0)))){var h=a.inArray(f.radixPoint,c.buffer);g=-1!=h&&f.digitsOptional===!1&&d>h&&!e?{pos:d,remove:d}:{pos:d}}return g},cardinality:1,prevalidator:null},"+":{validator:function(a,b,c,d,e){var f=e.signHandler(a,b,c,d,e);return!f&&(d&&e.allowMinus&&a===e.negationSymbol.front||e.allowMinus&&"-"==a||e.allowPlus&&"+"==a)&&(f="-"==a?""!=e.negationSymbol.back?{pos:c,c:"-"===a?e.negationSymbol.front:"+",caret:c+1,insert:{pos:b.buffer.length,c:e.negationSymbol.back}}:{pos:c,c:"-"===a?e.negationSymbol.front:"+",caret:c+1}:!0),f},cardinality:1,prevalidator:null,placeholder:""},"-":{validator:function(a,b,c,d,e){var f=e.signHandler(a,b,c,d,e);return!f&&d&&e.allowMinus&&a===e.negationSymbol.back&&(f=!0),f},cardinality:1,prevalidator:null,placeholder:""},":":{validator:function(a,b,c,d,e){var f=e.signHandler(a,b,c,d,e);if(!f){var g="["+inputmask.escapeRegex(e.radixPoint)+"]";f=new RegExp(g).test(a),f&&b.validPositions[c]&&b.validPositions[c].match.placeholder==e.radixPoint&&(f={caret:c+1})}return f},cardinality:1,prevalidator:null,placeholder:function(a){return a.radixPoint}}},onUnMask:function(a,b,c){var d=a.replace(c.prefix,"");return d=d.replace(c.suffix,""),d=d.replace(new RegExp(inputmask.escapeRegex(c.groupSeparator),"g"),""),c.unmaskAsNumber?(d=d.replace(inputmask.escapeRegex.call(this,c.radixPoint),"."),Number(d)):d},isComplete:function(a,b){var c=a.join(""),d=a.slice();if(b.postFormat(d,0,!0,b),d.join("")!=c)return!1;var e=c.replace(b.prefix,"");return e=e.replace(b.suffix,""),e=e.replace(new RegExp(inputmask.escapeRegex(b.groupSeparator),"g"),""),","===b.radixPoint&&(e=e.replace(inputmask.escapeRegex(b.radixPoint),".")),isFinite(e)},onBeforeMask:function(a,b){if(""!=b.radixPoint&&isFinite(a))a=a.toString().replace(".",b.radixPoint);else{var c=a.match(/,/g),d=a.match(/\./g);d&&c?d.length>c.length?(a=a.replace(/\./g,""),a=a.replace(",",b.radixPoint)):c.length>d.length?(a=a.replace(/,/g,""),a=a.replace(".",b.radixPoint)):a=a.indexOf(".")<a.indexOf(",")?a.replace(/\./g,""):a=a.replace(/,/g,""):a=a.replace(new RegExp(inputmask.escapeRegex(b.groupSeparator),"g"),"")}if(0==b.digits&&(-1!=a.indexOf(".")?a=a.substring(0,a.indexOf(".")):-1!=a.indexOf(",")&&(a=a.substring(0,a.indexOf(",")))),""!=b.radixPoint&&isFinite(b.digits)&&-1!=a.indexOf(b.radixPoint)){var e=a.split(b.radixPoint),f=e[1].match(new RegExp("\\d*"))[0];if(parseInt(b.digits)<f.toString().length){var g=Math.pow(10,parseInt(b.digits));a=a.replace(inputmask.escapeRegex(b.radixPoint),"."),a=Math.round(parseFloat(a)*g)/g,a=a.toString().replace(".",b.radixPoint)}}return a.toString()},canClearPosition:function(b,c,d,e,f){var g=b.validPositions[c].input,h=g!=f.radixPoint&&isFinite(g)||c==d||g==f.groupSeparator||g==f.negationSymbol.front||g==f.negationSymbol.back;if(h&&isFinite(g)){var i;if(!e&&b.buffer){i=b.buffer.join("").substr(0,c).match(f.regex.integerNPart(f));var j=c+1,k=null==i||0==parseInt(i[0].replace(new RegExp(inputmask.escapeRegex(f.groupSeparator),"g"),""));if(k)for(;b.validPositions[j]&&(b.validPositions[j].input==f.groupSeparator||"0"==b.validPositions[j].input);)delete b.validPositions[j],j++}var l=[];for(var m in b.validPositions)l.push(b.validPositions[m].input);i=l.join("").match(f.regex.integerNPart(f));var n=a.inArray(f.radixPoint,b.buffer);if(i&&(-1==n||n>=c))if(0==i[0].indexOf("0"))h=i.index!=c||-1==n;else{var o=parseInt(i[0].replace(new RegExp(inputmask.escapeRegex(f.groupSeparator),"g"),""));-1!=n&&10>o&&(b.validPositions[c].input="0",b.p=f.prefix.length+1,h=!1)}}return h},onKeyDown:function(b,c,d,e){var f=a(this);if(b.ctrlKey)switch(b.keyCode){case inputmask.keyCode.UP:f.val(parseFloat(this.inputmask.unmaskedvalue())+parseInt(e.step)),f.triggerHandler("setvalue.inputmask");break;case inputmask.keyCode.DOWN:f.val(parseFloat(this.inputmask.unmaskedvalue())-parseInt(e.step)),f.triggerHandler("setvalue.inputmask")}}},currency:{prefix:"$ ",groupSeparator:",",alias:"numeric",placeholder:"0",autoGroup:!0,digits:2,digitsOptional:!1,clearMaskOnLostFocus:!1},decimal:{alias:"numeric"},integer:{alias:"numeric",digits:0,radixPoint:""},percentage:{alias:"numeric",digits:2,radixPoint:".",placeholder:"0",autoGroup:!1,min:0,max:100,suffix:" %",allowPlus:!1,allowMinus:!1},numeric2:{alias:"numeric"}}),inputmask}(jQuery),function(a){return inputmask.extendAliases({phone:{url:"phone-codes/phone-codes.js",countrycode:"",mask:function(b){b.definitions["#"]=b.definitions[9];var c=[];return a.ajax({url:b.url,async:!1,dataType:"json",success:function(a){c=a},error:function(a,c,d){alert(d+" - "+b.url)}}),c=c.sort(function(a,b){return(a.mask||a)<(b.mask||b)?-1:1})},keepStatic:!1,nojumps:!0,nojumpsThreshold:1,onBeforeMask:function(a,b){var c=a.replace(/^0/g,"");return(c.indexOf(b.countrycode)>1||-1==c.indexOf(b.countrycode))&&(c="+"+b.countrycode+c),c}},phonebe:{alias:"phone",url:"phone-codes/phone-be.js",countrycode:"32",nojumpsThreshold:4}}),inputmask}(jQuery),function(a){return inputmask.extendAliases({Regex:{mask:"r",greedy:!1,repeat:"*",regex:null,regexTokens:null,tokenizer:/\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,quantifierFilter:/[0-9]+[^,]/,isComplete:function(a,b){return new RegExp(b.regex).test(a.join(""))},definitions:{r:{validator:function(b,c,d,e,f){function g(a,b){this.matches=[],this.isGroup=a||!1,this.isQuantifier=b||!1,this.quantifier={min:1,max:1},this.repeaterPart=void 0}function h(){var a,b,c=new g,d=[];for(f.regexTokens=[];a=f.tokenizer.exec(f.regex);)switch(b=a[0],b.charAt(0)){case"(":d.push(new g(!0));break;case")":var e=d.pop();d.length>0?d[d.length-1].matches.push(e):c.matches.push(e);break;case"{":case"+":case"*":var h=new g(!1,!0);b=b.replace(/[{}]/g,"");var i=b.split(","),j=isNaN(i[0])?i[0]:parseInt(i[0]),k=1==i.length?j:isNaN(i[1])?i[1]:parseInt(i[1]);if(h.quantifier={min:j,max:k},d.length>0){var l=d[d.length-1].matches;if(a=l.pop(),!a.isGroup){var e=new g(!0);e.matches.push(a),a=e}l.push(a),l.push(h)}else{if(a=c.matches.pop(),!a.isGroup){var e=new g(!0);e.matches.push(a),a=e}c.matches.push(a),c.matches.push(h)}break;default:d.length>0?d[d.length-1].matches.push(b):c.matches.push(b)}c.matches.length>0&&f.regexTokens.push(c)}function i(b,c){var d=!1;c&&(k+="(",m++);for(var e=0;e<b.matches.length;e++){var f=b.matches[e];if(1==f.isGroup)d=i(f,!0);else if(1==f.isQuantifier){var g=a.inArray(f,b.matches),h=b.matches[g-1],j=k;if(isNaN(f.quantifier.max)){for(;f.repeaterPart&&f.repeaterPart!=k&&f.repeaterPart.length>k.length&&!(d=i(h,!0)););d=d||i(h,!0),d&&(f.repeaterPart=k),k=j+f.quantifier.max}else{for(var l=0,o=f.quantifier.max-1;o>l&&!(d=i(h,!0));l++);k=j+"{"+f.quantifier.min+","+f.quantifier.max+"}"}}else if(void 0!=f.matches)for(var p=0;p<f.length&&!(d=i(f[p],c));p++);else{var q;if("["==f.charAt(0)){q=k,q+=f;for(var r=0;m>r;r++)q+=")";var s=new RegExp("^("+q+")$");d=s.test(n)}else for(var t=0,u=f.length;u>t;t++)if("\\"!=f.charAt(t)){q=k,q+=f.substr(0,t+1),q=q.replace(/\|$/,"");for(var r=0;m>r;r++)q+=")";var s=new RegExp("^("+q+")$");if(d=s.test(n))break}k+=f}if(d)break}return c&&(k+=")",m--),d}null==f.regexTokens&&h();var j=c.buffer.slice(),k="",l=!1,m=0;j.splice(d,0,b);for(var n=j.join(""),o=0;o<f.regexTokens.length;o++){var g=f.regexTokens[o];if(l=i(g,g.isGroup))break}return l},cardinality:1}}}}),inputmask}(jQuery);
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