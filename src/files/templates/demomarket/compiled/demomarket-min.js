var site={};site.common={stylizeVoteResults:function(){var e=$(".result_range");$.each(e,function(e,t){var a=$(t).next().text();a=parseInt(a,10),$(this).css("width",a+"%")})},init:function(){function e(){return $(".comparison_goods:eq(0) > span")}$('input[type="tel"]').inputmask("+9-999-999-99-99"),$("a[rel=fancybox_group]").fancybox({loop:!0}),$(".slider-for").slick({slidesToShow:1,slidesToScroll:1,arrows:!1,fade:!0,asNavFor:".slider-nav"}),$(".slider-nav").slick({slidesToShow:3,slidesToScroll:1,asNavFor:".slider-for",autoplay:!0,autoplaySpeed:3e3,centerMode:!0,focusOnSelect:!0,responsive:[{breakpoint:1500,settings:{arrows:!1}}]}),$(".subCarousel").slick({slidesToShow:5,slidesToScroll:1,responsive:[{breakpoint:1500,settings:{slidesToShow:3,slidesToScroll:1}},{breakpoint:991,settings:{slidesToShow:2,slidesToScroll:1}},{breakpoint:570,settings:{slidesToShow:1,slidesToScroll:1}}]}),$.extend(verge),function(e,t,a,i){function r(){e.hasClass(i)?e.removeClass(i):e.addClass(i)}t.click(function(e){r(),e.preventDefault()}),t.on("tap",function(e){r(),e.preventDefault()}),0!=a&&(a.click(function(e){r(),e.preventDefault(e)}),a.on("tap",function(e){r(),e.preventDefault()}))}($("#headerMobileMenu"),$("#topMenuToggle"),$("#closeMenuToggle"),"active"),$(".captcha_reset").on("click",function(){var e=new Date;$(".captcha_img").attr("src","/captcha.php?reset&"+e.getTime())}),$.fn.customTooltip=function(){var e=$(this.attr("data-content"));this.tooltip({html:!0,trigger:"click",placement:"bottom",title:e.html()})},$("#basketTooltipToggle").customTooltip(),$.fn.hideText=function(e){var t=$.extend({speed:void 0,dataName:"element"},e);return this.click(function(e){var a=$(e.target).data(t.dataName),i=$(a).parent(),r=i.css("height");r>"95px"?i.css("height","67px"):i.css("height","auto"),void 0!==a&&$(a).slideToggle(t.speed,function(){if($(e.target).hasClass("sprite-hide_up")){if($(e.target).hasClass("title_link"))return;$(e.target).removeClass("sprite-hide_up")}else{if($(e.target).hasClass("title_link"))return;$(e.target).addClass("sprite-hide_up")}})}),this},$(".sprite-hide").hideText({speed:"slow"}),$(".title_link").hideText({speed:"slow"}),$(".compare_link").on("click",function(t){t.preventDefault();var a=$(this);$.ajax({type:"GET",url:"/udata"+a.attr("href"),data:{redirect_disallow:1,param0:a.data("id")},async:!1,success:function(t){var i=$(t).find("error:first");if(1===i.length){var r=a.closest(".additional-info");!function(e,t){var a=e.closest(".additional-info"),i=a.siblings(".compare-error:eq(0)");a.hide(),i.text(t).show(),setTimeout(function(){i.hide(),a.show()},2500)}(r,i.text())}else!function(t){var a=e(),i=0!==a.length?parseInt(a.text()):0;switch(t.data("action")){case"add":!function(t,a,i){t.data("action","remove"),t.attr("href","/emarket/removeFromCompare/"+t.data("id")),t.text(getLabel("js-remove-from-comparison")),0===i?($(".comparison_goods:eq(0)").append("<span></span>"),(a=e()).text(1)):a.text(i+1)}(t,a,i);break;case"remove":!function(e,t,a){e.data("action","add"),e.attr("href","/emarket/addToCompare/"+e.data("id")),e.text(getLabel("js-add-to-comparison")),1===a?t.remove():t.text(a-1),1===e.closest(".compare").length&&function(e){e.closest(".preview_product").remove();var t=$(".characteristics:eq(0)").find('[data-id="'+e.data("id")+'"]');$.each(t,function(e,t){t.closest(".compare_field").remove()}),0===$(".preview_product").length&&($(".compare:eq(0)").remove(),$(".section_capt:eq(0)").find("h1:eq(0)").text(getLabel("js-empty-comparison-list")))}(e)}(t,a,i)}}(a)}})}),basket.get(function(e){site.Cart.updateOrderItemCount(e.summary.amount)}),$("select").selectmenu(),site.common.stylizeVoteResults(),$("a.for_print").on("click",function(e){e.preventDefault(),window.print()}),$(".arrow_dropdown").on("click",function(){$(this).hasClass("fa-angle-up")?($(this).removeClass("fa-angle-up"),$(this).addClass("fa-angle-down")):($(this).removeClass("fa-angle-down"),$(this).addClass("fa-angle-up"));var e=$(this).closest(".arrow_product");e.next(".product_form").slideToggle(400)}),$(".section_capt .sort_mobile").on("click",function(){$(this).toggleClass("sort_close"),$(".filter_mobile").slideToggle(400)}),$(".sort_btn a").on("click",function(){var e=$(this),t=e.data("class");$.cookie("catalog_class",t),$("#catalog_category").removeClass("goods catalog_list catalog_inline").addClass(t)}),$(".sort_list a").on("click",function(){var e=$(this),t=e.data("field");$.cookie("sort_field",t);var a=!e.parent().hasClass("up_arrow"),i=a?"1":"0";$.cookie("sort_direction_is_ascending",i),window.location.reload(!0)}),$("form#payment_choose, form#oneStepForm").on("submit",function(e){let t=$(this),a=$("input[name='payment-id']:checked",t);if("receipt"!==a.attr("class"))return!0;let i=t.find("#purchase-step-address-152-federal-law"),r=i.prop("checked"),n=t.is("#oneStepForm");if(n&&!r)return e.preventDefault(),!1;if(site.forms.emarket.purchasingOneStep.showErrors())return e.preventDefault(),!1;let o=t.serialize(),s=t.attr("action"),c=window.open("","_blank","width=710,height=620,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no"),l="<html><head><script>location.href = '"+s+"?"+o+"'<\/script></head><body></body></html>";return c.document.write(l),c.focus(),!1}),$("input:radio[name=payment-id]").change(function(){$("#payment_choose label").removeClass("checked");var e=$(this).parent();e.addClass("checked")}),$(".product_header").on("click",function(){var e=$(this);e.toggleClass("open"),e.next("li").find(".mobile_sub_menu").slideToggle(400)}),$("a.footer_subscription_button").on("click",function(e){e.preventDefault(),$(this).closest("form").submit()}),$("a.comment_count").on("hover",function(){var e=$(this).find(".lazy_comment_count");if("?"==e.html()){e.html("");var t=e.closest(".tab_item").data("element_id");t||(t=e.closest(".add_to_cart_block").data("element_id")),$.ajax({type:"GET",dataType:"json",url:"/udata/comments/countComments/"+t+".json?lang_id="+window.pageData.lang_id,success:function(t){var a=parseInt(t.total)||0;e.html(a);var i=e.closest("a"),r=i.attr("href"),n=a>0?"#comments":"#add_comment";i.attr("href",r+n)}})}}),$(".second_level_menu").on("click",function(){var e=$(this);e.toggleClass("open");e.find(".mobile_sub_sub_menu").slideToggle(400)})}},site.helpers={formatPrice:function(e,t,a){return(t=t||"")+" "+(e=function(e,t,a,i){e=(e+"").replace(/[^0-9+\-Ee.]/g,"");var r,n=isFinite(+e)?+e:0,o=isFinite(+t)?Math.abs(t):0,s=void 0===i?",":i,c=void 0===a?".":a;return(r=(o?function(e,t){var a=Math.pow(10,t);return""+Math.round(e*a)/a}(n,o):""+Math.round(n)).split("."))[0].length>3&&(r[0]=r[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,s)),(r[1]||"").length<o&&(r[1]=r[1]||"",r[1]+=new Array(o-r[1].length+1).join("0")),r.join(c)}(e,0,","," "))+" "+(a=a||"")}},$(function(){site.common.init()}),function(e,t,a){site.TradeOffers={offerId:null,characteristicMap:{},init:function(){var e=this;e.bindSwitchBuyButtonsActivity(),e.getSelectList().selectmenu({select:function(e,t){}}),e.getSelectList().bind("selectmenuselect",function(i,r){var n=t(i.currentTarget).data("characteristic-name");e.setCharacteristic(n,t(r.item.element)),e.resolveSelectedOfferId()||alert(a("js-error-cannot-resolve-trade-offer"))})},getSelectList:function(){return t("div.additional_options-list select")},getSelectOptionListByName:function(e){return t('div.additional_options-list select[data-characteristic-name = "'+e+'"] option[data-offer-id-list]')},bindSwitchBuyButtonsActivity:function(){var e=this;e.getBuyButtonList().bind("click",function(){e.switchBuyButtonActivity(t(this)),e.highlightEmptyCharacteristicContainer()})},highlightEmptyCharacteristicContainer:function(){for(var e in this.getNotFilledCharacteristicNameList())this.highlightEmptyContainer(t('div.additional_options-text[data-title = "'+e+'"]')),this.highlightEmptyContainer(t('div.additional_options-list[data-title = "'+e+'"] span.ui-selectmenu-text'))},highlightEmptyContainer:function(e){e.effect("highlight",{color:"red"},2e3)},getBuyButtonList:function(){return t("a.add_to_cart_button, a.buy_one_click_button")},switchBuyButtonListActivity:function(){var e=this;e.getBuyButtonList().each(function(){e.switchBuyButtonActivity(t(this))})},switchBuyButtonActivity:function(e){e.data("old-class")||e.data("old-class",e.attr("class")),this.isAllCharacteristicsFilled()&&this.getOfferId()?e.attr("class",e.data("old-class")):e.hasClass("not_buy")||e.addClass("not_buy")},setCharacteristic:function(e,t){var a=this.parseOption(t);for(var i in this.characteristicMap[e]={},a)this.characteristicMap[e][i]=a[i];0===Object.keys(a).length&&delete this.characteristicMap[e]},getCharacteristicMap:function(){return this.characteristicMap},parseOption:function(e){var a={};return""===e.data("offer-id-list")?a:(t(this.getOptionOfferIdList(e)).each(function(){e.data("value")&&(a[this]=e.data("value"))}),a)},getOptionOfferIdList:function(e){return e.data("offer-id-list").toString().split(";")},resolveSelectedOfferId:function(){var e=this.getCharacteristicMap(),t={};for(var a in e)for(var i in e[a]){t[i]||(t[i]={});var r={};r[a]=a,Object.assign(t[i],r)}var n={},o=Object.keys(e).length;for(var s in t)Object.keys(t[s]).length===o&&(n[s]=s);for(var c in n)return this.setOfferId(c),this.changePrice(),this.changeImage(),this.switchBuyButtonListActivity(),!0;return!1},changePrice:function(){var e=this;this.foreachOptionWithOffer(a("js-trade-offer-price"),function(t){e.setPrice(t)})},changeImage:function(){var e=this;this.foreachOptionWithOffer(a("js-trade-offer-image"),function(t){e.setImage(t)})},foreachOptionWithOffer:function(e,a){var i=this,r=i.getOfferId();i.getSelectOptionListByName(e).each(function(){var e=t(this);-1!==i.getOptionOfferIdList(e).indexOf(r)&&a(e.data("value"))})},setPrice:function(e){e&&t("div.top_block-price h2 span").text(e)},setImage:function(e){if(e){var a=t("div.main_carousel div.slick-slide.slick-current.slick-active a");a.attr("href",e),t("img",a).attr("src",e),t("a[rel=fancybox_group]").fancybox({loop:!0})}},isAvailable:function(){return t("div.additional_options").length>0},getOfferId:function(){return this.offerId},setOfferId:function(e){this.offerId=e},isAllCharacteristicsFilled:function(){return 0===Object.keys(this.getNotFilledCharacteristicNameList()).length},getNotFilledCharacteristicNameList:function(){var e=this.getCharacteristicMap(),t={};for(var a in this.getCharacteristicNameList())e[a]||(t[a]=a);return t},getCharacteristicNameList:function(){var e=[];return this.getSelectList().each(function(){var a=t(this);if(!1===a.hasClass("hidden")){var i=a.data("characteristic-name");e[i]=i}}),e}},t(function(){site.TradeOffers.isAvailable()&&site.TradeOffers.init()})}(window,jQuery,getLabel);var basket={get:function(e){basket.__request("/udata/emarket/basket.json",{},e)},putElement:function(e,t,a){basket.__request("/udata/emarket/basket/put/element/"+e+".json",t,a)},modifyItem:function(e,t,a){0!=t.amount?basket.__request("/udata/emarket/basket/put/item/"+e+".json",t,a):this.removeItem(e,a)},removeElement:function(e,t){basket.__request("/udata/emarket/basket/remove/element/"+e+".json",{},t)},removeItem:function(e,t){basket.__request("/udata/emarket/basket/remove/item/"+e+".json",{},t)},removeAll:function(e){basket.__request("/udata/emarket/basket/remove_all.json",{},e)},__cleanupHash:function(e){return{customer:e.customer?e.customer.object.id:null,items:e.items,summary:e.summary,id:e.id}},__transformOptions:function(e){var t={};for(var a in e){t["amount"!=a.toLowerCase()?"options["+a+"]":a]=e[a]}return t},__request:function(e,t,a){jQuery.ajax({url:e,type:"POST",dataType:"json",data:basket.__transformOptions(t),success:function(e){a(basket.__cleanupHash(e))}})}};!function(e,t,a,i){site.Cart={ready:!0,isCartPage:a.isArray(e.document.location.pathname.match(/emarket\/cart/)),init:function(){t("a.add_to_cart_button").on("click",function(e){e.preventDefault();var a=t(this);if(!a.hasClass("not_buy"))if(site.TradeOffers.isAvailable())site.Cart.putElementInCart(a,{offer_id:site.TradeOffers.getOfferId()});else{var i=a.parents(".add_to_cart_block").find(".hidden_optioned_properties");if(0!==i.length){var r=t("#buy_modal");r.find("main").html(i.html()),r.find("form").attr("action",this.href),r.modal("show")}else site.Cart.putElementInCart(a)}}),t("a.buy_one_click_button").on("click",function(e){e.preventDefault();var a=t(this);if(!a.hasClass("not_buy")){var i=a.parents(".add_to_cart_block"),r=t("#oneclick_modal"),n=i.data("element_id");if(r.data("element_id",n),site.TradeOffers.isAvailable())return r.data("offer_id",n),void r.modal("show");var o=i.find(".hidden_optioned_properties");o.length>0&&t("#one_click_order_optioned_properties").html(o.html()).find('input[type="submit"]').remove(),r.modal("show")}}),t("#oneclick_modal").find("form").on("submit",function(e){e.preventDefault();var a=t("#oneclick_modal").data("element_id"),r=t("#oneclick_modal").data("offer_id"),n="/"+window.pageData.lang+"/emarket/getOneClickOrder/element/"+a+".json";site.TradeOffers.isAvailable()&&r&&(n=n+"?offer_id="+site.TradeOffers.getOfferId());var o=t(this);t.ajax({type:"POST",dataType:"json",url:n,data:o.serialize(),success:function(e){if(e&&e.data.error)site.forms.showErrorMessage(o,e.data.error);else{var t=i("js-one_click_order_fail"),a=e&&e.data.orderId?e.data.orderId:null;a&&(t=(t=i("js-one_click_order_success")).replace("%s",a)),o.parent().html(t)}}})}),t(".order_delete").on("click",function(e){e.preventDefault(),site.Cart.remove(this.id.match(/\d+/).pop())}),t(".quantity").on("focusin",function(){var e=t(this);e.data("oldValue",e.val())}).change(function(){var e=t(this),a=e.siblings(".change_product_quantity").data("id"),i=e.data("oldValue");site.Cart.modify(a,e.val(),i)}),t(".change_product_quantity a").on("click",function(e){if(e.preventDefault(),site.Cart.ready){site.Cart.ready=!1;var a=t(this),i=a.parent().data("id"),r=t("#order_item_"+i),n=t(".quantity",r),o=parseInt(n.val(),10),s=a.hasClass("increment_product_quantity")?o+1:o-1;n.val(s),site.Cart.modify(i,s,o)}}),t("form#promocode").on("submit",function(e){e.preventDefault(),t.ajax({type:"POST",dataType:"json",url:"/udata/emarket/savePromoCode/.json",data:t(this).serialize(),success:function(e){e.result?window.location.reload():t(".wrong_promocode").show()}})})},putElementInCart:function(e,a){var i=e.attr("href");i=a?site.Cart.addParamsToUrl(i,a):i,t.ajax({url:"/udata"+i,success:function(){basket.get(function(t){site.Cart.updateOrderItemCount(t.summary.amount),site.Cart.ready=!0,site.Cart.changeAddedProductButton(e)})}})},addParamsToUrl:function(e,a){return e+"?"+t.param(a)},changeAddedProductButton:function(e){e.addClass("added_product"),site.Cart.changeButtonHtml(e,i("js-product-added-successfully-label")),setTimeout(function(){site.Cart.changeButtonHtml(e,i("js-buy-button-label")),e.removeClass("added_product")},1500)},changeButtonHtml:function(e,t){e.html(t)},redraw:function(e){return function(t){var a=t.summary.amount||0;a>0?site.Cart.drawPopulatedCart(e,t):site.Cart.drawEmptyCart(),site.Cart.updateOrderItemCount(a),site.Cart.ready=!0}},drawPopulatedCart:function(e,i){var r=site.helpers.formatPrice,n=i.summary.price.prefix,o=i.summary.price.suffix,s=i.summary.price.discount||0;t("#order_discount").text(r(s,n,o));var c=i.summary.price.actual||i.summary.price.original;t("#order_price").text(r(c,n,o));var l=t("#order_item_"+e),d=!0;a.each(i.items.item,function(a){if(a.id==e){d=!1;var i=r(a["total-price"].actual,"",""),n=a.discount?a.discount.amount:0,o=0==n?0:r(n,"","");t(".order_sum span",l).text(i),t(".order_sale span",l).text(o)}}),d&&l.remove()},drawEmptyCart:function(){t.get("/templates/demomarket/js/cart/empty.html",function(e){var r=a.template(e),n={cart_empty:i("js-cart_empty"),return_to_catalog:i("js-return_to_catalog")};t(".cart").removeClass("cart").addClass("cart-empty").html(r(n))})},updateOrderItemCount:function(e){var a=t(".order_item_count");if(!(e<1&&a.hasClass("not_show"))){a.text(e),a.removeClass("not_show");var r=i("js-cart_header")+e;t("#basketTooltipToggle").text(r)}},modify:function(e,t,a){t!==a?basket.modifyItem(e,{amount:t},this.redraw(e)):this.ready=!0},remove:function(e){"all"===e?basket.removeAll(this.redraw(e)):basket.removeItem(e,this.redraw(e))}},t(function(){site.Cart.init()})}(window,jQuery,_,getLabel),site.filters=function(e){"use strict";var t,a,i=992,r="filter",n="/udata://catalog/getSmartFilters//",o={},s={$element:null,name:""},c=!1;function l(){var t=n+a+".json?lang_id="+window.pageData.lang_id;e.ajax({url:t,data:o,dataType:"json",type:"get",success:u})}function d(e){return!e instanceof Date?"Date expected":e.getDate()+"."+(e.getMonth()+1)+"."+e.getFullYear()}function u(t){var a,i,r=b();$(r,f,function(t){return"text"!==k(t).type&&!function(t){var a=g(t.attr("name")),i=!1;return e.each(o,function(e){var t=g(e);if(a===t)return i=!0,!1}),i}(t)}),$(r,w,null,t),function(){if(c)return;c=!0,$(r,function(){this.prop("checked",!0)},function(e){var t=e.attr("name"),a=k(e).type,i="checkbox"===a||"radio"===a,r=o[t]&&e.val()==o[t].replace(/\+/gi," ");return i&&r})}(),a=t,i=s.name+" ("+a.total+")",h().val(i),s.$element.val(i)}function f(){this.parent().length>0&&function(e){e.parent().addClass("filter_disabled"),e.attr("disabled","")}(this)}function p(t){var a=e(t.target||t),i=function(e){var t=e.attr("name"),a=e.val(),i={};return i[t]=a,i}(a);e.extend(o,i),"checkbox"!==k(a).type||a.prop("checked")||function(e){var t=e.attr("name");delete o[t]}(a);var r,n,s=(r=b(),n={},r.each(function(t,a){var i=e(a),r=j(i);"from"!==r&&"to"!==r||(n[i.attr("name")]=i.val())}),n);function c(){e(".arrow_left").remove()}e.extend(o,s),l(),function(){var t=h(),i=t.val()||"";t.remove(),c();var r=a.parents(".product_form:eq(0)").siblings(".arrow_product:eq(0)");e.get("/templates/demomarket/js/filters/filterPopUp.html",function(e){var t=_.template(e);r.after(t({input_value:i}))})}(),setTimeout(function(){h().remove(),c()},9e3)}function h(){return e(".show_result_pop_up:eq(0)")}function m(){var t=location.search,a={};if(""===t)return a;var i=decodeURIComponent(t),r=(i=i.replace(/^\?/,"")).split("&");return e.each(r,function(e,t){var i=(t=t.split("="))[0],r=t[1];a[i]=r}),a}function v(e){var t=e.indexOf("[");return-1===t?e:e.slice(0,t)}function g(e){var t=/^(\w+)?\[(\w+)/.exec(e);return void 0!==t[2]?t[2]:""}function y(){var t=k(this);switch(!0){case"input"===t.tag&&("radio"===t.type||"checkbox"===t.type):this.click(p);break;case this.parents(".date_field").length>0:this.change(p);break;default:this.bind("focus",function(){e(this).data("originValue",e(this).val())}),this.focusout(function(t){var a=e(this).data("originValue");e(this).val()!==a&&p(t)})}}function $(t,a,i){i="function"==typeof i?i:function(){return!0};var r=Array.prototype.slice.call(arguments,3);t.each(function(t,n){var o=e(n);i(o)&&a.apply(o,r)})}function b(){return e("input[name]",t)}function k(e){return{tag:e.prop("tagName").toLowerCase(),type:e.attr("type")||null}}function w(t){var a=function(t,a){var i=function(t){var a=[];return e.each(t,function(t,i){var r=i.field;e.each(r,function(e,t){a.push(t)})}),a}(t.group||{}),r=null;return e.each(i,function(e,t){if(t.name===a)return r=t,!1}),r}(t,g(this.attr("name"))),i=k(this);"checkbox"===i.type?C(this,a):"radio"===i.type?function(e,t){""===e.val()&&x(e);C(e,t)}(this,a):function(e,t){if(!t)return;if(t.minimum&&t.minimum.value&&"from"===j(e)){if("date"!=t["data-type"])return void e.val(t.minimum.value);var a=r(t.minimum.value);e.val(d(a))}if(t.maximum&&t.maximum.value&&"to"===j(e)){if("date"!=t["data-type"])return void e.val(t.maximum.value);var i=r(t.maximum.value);e.val(d(i))}function r(e){return new Date(1e3*e)}}(this,a)}function C(t,a){if(a){var i=t.val(),r=a.item||[];e.each(r,function(e,a){a.value===i&&x(t)})}}function x(e){e.parent().removeClass("filter_disabled"),e.removeAttr("disabled")}function j(e){var t=e.attr("name"),a=/\[(\w+)\]$/.exec(t);return a&&a[1]?a[1]:""}e(function(){var n;!function(){r=e.viewportW()<i?".mobile_filters":".desktop_filters",t=e(r),a=t.data("category"),s.$element=e(".show_result",t),s.name=s.$element.val(),e(".reset",t).click(function(e){e.preventDefault(),location.href=location.pathname}),e(".slider_field",t).each(function(){var t=e(this),a=t.find(".delta_price"),i=a.children("input.min"),r=a.children("input.max"),n=parseFloat(i.data("minimum")),o=parseFloat(i.val()),s=parseFloat(r.data("maximum")),c=parseFloat(r.val()),l=t.find(".price_progress .range");l.siblings(".min_val").text(n),l.siblings(".max_val").text(s),l.slider({range:!0,min:n,max:s,values:[o,c],slide:function(e,t){i.val(t.values[0]),r.val(t.values[1])},change:function(e,t){i.val()==t.value&&p(i.get(0)),r.val()==t.value&&p(r.get(0))}})}),e(".date_field input[type=text]",t).each(function(){var t=e(this),a=new Date(Date.parse(t.data("minimum"))),i=new Date(Date.parse(t.data("maximum"))),r=new Date(Date.parse(t.val())),n=d(r);t.val(n),t.datepicker({dateFormat:"d.m.yy",minDate:a,maxDate:i})});var r}(),function(){var e=m();for(var t in e)if(e.hasOwnProperty(t)&&v(t)===r)return!0;return!1}()&&(n={},e.each(m(),function(e,t){v(e)===r&&(n[e]=t)}),o=n,l()),$(b(),y)})}(jQuery),site.forms={init:function(){if(site.forms.showFieldErrorMessages(),$("#post_vote").on("submit",this.submitVoteForm),-1!==location.href.indexOf("forget")){var e=$("#forget");e.find("input:radio").click(function(){e.find("input:text").attr("name",$(this).attr("id"))})}-1!==location.href.indexOf("purchasing_one_step")&&this.emarket.purchasingOneStep.init(),-1!==location.href.indexOf("purchase")&&this.emarket.purchase.init(),this.initLoginAjaxForm(),this.initCallbackAjaxForm()},initCallbackAjaxForm:function(){var e=$("#callbackContent"),t=e.find("form");t.on("submit",function(a){a.preventDefault(),$.ajax({type:"POST",dataType:"json",url:"/"+window.pageData.lang+"/webforms/send.json?redirect_disallow=1",data:t.serialize(),success:function(a){a.data?a.data&&a.data.error&&site.forms.showErrorMessage(t,a.data.error):e.html(getLabel("js-callback_success"))}})})},initLoginAjaxForm:function(){var e=$("#login_form");e.on("submit",function(t){t.preventDefault(),$.ajax({type:"POST",dataType:"json",url:"/"+window.pageData.lang+"/users/login_do.json?redirect_disallow=1",data:e.serialize(),success:function(t){!t.data&&location.reload(!0),t.data&&t.data.from_page&&site.forms.showErrorMessage(e,getLabel("js-login_do_try_again"))}})})},showErrorMessage:function(e,t){$(".field_error_message",e).remove(),$("<div>",{class:"field_error_message",html:t}).appendTo(e)},submitVoteForm:function(e){e.preventDefault();var t=$("#post_vote"),a=t.data("vote_id"),i=$("input[name=answer]:checked",t).val();$.post("/"+window.pageData.lang+"/vote/post/"+i,function(){$.getJSON("/udata://vote/results/"+a+".json?lang_id="+window.pageData.lang_id,function(e){var t=e.items.item,a=$("#vote_result_template"),i=_.template(a.html())({optionList:t});$(".interview").replaceWith(i),site.common.stylizeVoteResults()})})},showFieldErrorMessages:function(){var e=/_err=([^&]+)/.exec(location.search);if(e){var t=e[1];$.getJSON("/udata/system/listErrorMessages.json?_err="+t+"&lang_id="+window.pageData.lang_id,function(e){var t=e.items&&e.items.item||[];$.each(t,function(e,t){var a,i=t["str-code"]||"";i&&(a="captcha"===i?$("main .captcha_field"):$('main input[name="'+i+'"]').parent(),$("<div>",{class:"field_error_message",html:t.message}).appendTo(a))})})}},emarket:{toggleNewObjectForm:function(e,t){var a=$(t);if(0!==a.length){var i=$("form#deliveryForm");$("input[type=radio][value!=new]",e).length>0&&"new"!==$("input[type=radio]:checked",e).val()&&(a.hide(),i.attr("novalidate","novalidate"),i.find(".personal_data_wrapper").hide()),$("input[type=radio]",e).click(function(){"new"!==$(this).val()?(a.hide(),i.attr("novalidate","novalidate"),i.find(".personal_data_wrapper").hide()):(a.show(),i.removeAttr("novalidate"),i.find(".personal_data_wrapper").show())})}},purchase:{init:function(){this.initDeliveryAddressPage(),this.initInvoicePaymentPage()},initDeliveryAddressPage:function(){site.forms.emarket.toggleNewObjectForm(".delivery_address","#new-address")},initInvoicePaymentPage:function(){var e=$("form#invoice");$("input[type=radio][value!=new]","#invoice").length>0&&"new"!==$("input[type=radio]:checked","#invoice").val()&&($("#new-legal-person").hide(),e.attr("novalidate","novalidate")),$("input[type=radio]","#invoice").click(function(){"new"!==$(this).val()?($("#new-legal-person").hide(),e.attr("novalidate","novalidate")):($("#new-legal-person").show(),e.removeAttr("novalidate"))})}},purchasingOneStep:{init:function(){var e=$("#oneStepForm");site.forms.emarket.toggleNewObjectForm(".delivery_address.onestep","#new-address");var t=$(".payment.onestep",e),a=$(".delivery_choose.onestep",e),i=this,r=i.flagDeliveryRadioButton();i.flagAddressRadioButton();var n=r.data("price");this.setPriceInCart(n),$("input[type=radio]",".delivery_address.onestep").click(function(){var e=$(this),r=e.data("type");"self"===r?(a.hide(300),t.show(300)):a.show(300);var n=e.attr("value");"new"===n?i.saveDeliveryAddress():"self"!==r&&i.updateDeliveryPrice({"delivery-address":n});var o=e.data("price");i.setPriceInCart(o)}),$('input[type="radio"]',".delivery_choose.onestep").click(function(){t.length>0&&t.show(300);var e=$(this),a=e.data("price");"api-ship"!==e.data("api")&&i.setPriceInCart(a),$("div.choose-payment").show();var r=String(e.data("disabledpayments"));if(r){r=r.split(",");for(let e of r)$('input[name="payment-id"][value="'+e+'"]').closest("div.choose-payment").hide()}});let o=e.find("#purchase-step-address-152-federal-law"),s=e.find(".personal_data_error");o.click(function(){o.prop("checked")&&s.css("display","none")}),e.on("submit",function(e){o.prop("checked")||(e.preventDefault(),s.css("display","block"),s.text(getLabel("js-personal-data-error"))),i.showErrors()&&e.preventDefault()})},flagDeliveryRadioButton:function(){var e=this.getDeliveryPriceBlockInCart().data("delivery");return this.flagCheckedRadioButton(e,$(".delivery_choose.onestep"))},flagAddressRadioButton:function(){var e=this.getDeliveryPriceBlockInCart().data("address");return this.flagCheckedRadioButton(e,$(".delivery_address.onestep"))},getDeliveryPriceBlockInCart:function(){return $("#delivery_price")},flagCheckedRadioButton:function(e,t){var a=t.find('input[value="'+e+'"]:eq(0)');return a.length>0&&a.attr("checked",!0),a},setPriceInCart:function(e){var t=site.helpers.formatPrice,a=$("#order_price"),i=parseFloat($("#discount").data("price"));e=$.isNumeric(e)?e:0,$("#delivery_price").text(t(e));var r=parseFloat(a.data("price"))+parseFloat(e)-i;a.text(t(r))},saveDeliveryAddress:function(){var e=$("#new-address"),t=$("input,textarea,select",e);t.change(function(){e.data("changed",!0)});var a=this;$("#save-delivery").click(function(i){i.preventDefault();var r=t.filter("[required]:visible"),n=a.getEmptyRequiredFieldList(r);if(0===n.length){var o=e.data("id")?e.data("id"):"new",s=t.serialize()+"&replace-address=1&delivery-address="+o;e.data("changed")&&(e.data("send",!0),a.updateDeliveryPrice(s)),e.data("changed",!1)}else a.highlightFieldList(n)})},addDeliveryAddress:function(e){let t=$("#new-address");t.data("id",e),t.hide();let a=$("input,select",t),i=[];a.each(function(e,t){if("submit"==t.type)return;let a="",r=$(t);a="SELECT"==t.tagName?r.find("option:selected").text():r.val(),i.push(a),r.val(null)});var r=$("#add_address_template"),n=_.template(r.html())({addressId:e,address:i});$(".delivery_address .del_content:first-child div:last-child").before(n),t.data("send",!1)},getEmptyRequiredFieldList:function(e){var t=[];return $(e).each(function(){var e=$(this);""===e.val()&&t.push(e)}),t},showErrors:function(){var e=$("input,textarea,select","#oneStepForm").filter("[required]:visible"),t=this.getEmptyRequiredFieldList(e);if(t.length>0){this.highlightFieldList(t);var a=$(".order-error","#billForm").first();return a.show(),setTimeout(function(){a.hide()},4e3),!0}return!1},highlightFieldList:function(e){$(e).each(function(e,t){var a=t.css("border");t.css("border","1px solid red"),setTimeout(function(){t.css("border",a)},2e3)})},updateDeliveryPrice:function(e){var t=this;$.ajax({type:"POST",url:"/udata://emarket/saveInfo/0/0/0/0/0",data:e,success:function(e){let a=$(e).find("error"),i=$("#new-address");if(a.length)return alert(getLabel("js-error")+": "+a.first().text()),void i.data("changed",!0);if(i.data("send")){let a=$(e).find("address-id").first().text();t.addDeliveryAddress(a)}t.updateRussianPostDeliveryPrice()}})},updateRussianPostDeliveryPrice:function(){let e=this,t=$('input[data-type="russianpost"]',".delivery_choose.onestep");t.length>0&&$.each(t,function(t,a){let i=$(a),r=i.attr("value"),n=e.getDeliveryPrice(r);i.prop("checked")&&e.updateDeliveryInOrder(r),e.updatePriceInChooseList(i,n),e.setPriceOfChosenDeliveryInCart()})},updateDeliveryInOrder:function(e){$.ajax({type:"POST",url:"/udata://emarket/saveInfo/0/0/0/0/0",data:{"delivery-id":e},async:!1})},getDeliveryPrice:function(e){let t=0,a="/udata://emarket/getDeliveryPriceByDeliveryId/"+e;return $.ajax({type:"POST",url:a,async:!1,success:function(e){t=$("udata",e).text()}}),t},setPriceOfChosenDeliveryInCart:function(){var e=$(".delivery_choose.onestep").find('input[type="radio"]:checked:eq(0)');e.length>0&&this.setPriceInCart(e.data("price"))},updatePriceInChooseList:function(e,t){$.ajax({type:"POST",url:"/udata://emarket/applyPriceCurrency/"+t,async:!1,success:function(t){var a=e.parent().find(".delivery-price:eq(0)"),i=a.children(".price:eq(0)"),r=$(t).find("price"),n=r.children("actual").text(),o="",s="";$.isNumeric(n)?(e.data("price",n),i.removeClass("price-error"),o=r.attr("prefix"),s=r.attr("suffix")):(i.addClass("price-error"),e.data("price",0)),a.children(".prefix:eq(0)").text(o),a.children(".suffix:eq(0)").text(s),i.text(n)}})}}}},$(function(){site.forms.init()}),function(e,t,a){"use strict";e(function(){let i=e(".push").first(),r=e(".close",i),n=e(".subscribe",i),o=function(){"https:"===a.protocol&&t.subscribe({success:function(e){t.saveToken(e),i.hide()},fail:function(e){e?i.hide():i.show()}})};!!e.cookie("push-popup-already-closed")||setTimeout(o,5e3),r.on("click",function(){i.hide(),e.cookie("push-popup-already-closed",!0,{expires:1,path:"/"})}),n.on("click",o)})}(jQuery,PushModule,location),function(e,t){"use strict";var a="/udata://search/search_do/.json?lang_id="+window.pageData.lang_id,i="search_string",r="per_page",n={},o=null,s=null,c=null,l=null,d=".all_result",u=15,f=null;function p(a,i){!function(e,t){e&&(n[h(e)]=t)}(a,i),l.html("");var r=function(a){var i=a.item;if(!i)return[];return function(a){var i=e.extend(!0,{},a),r=[],n=null;return t.each(i,function(e){(n=e.type)||(n={id:0,name:""}),"Структура"===n.module&&(n.module="Страницы");var a=t.findWhere(r,{id:n.id});a||r.push(n),(n=a||n).elements=n.elements||[],n.elements.push(e)}),r}(i)}(i);if(r.length){var o=f({typesList:r});l.html(o),l.show(),e(d,l).on("click",function(){s.submit()})}else l.hide()}function h(e){var t=0;if(0===e.length)return t;for(var a=0;a<e.length;a++)t=(t<<5)-t+e.charCodeAt(a),t&=t;return t}e(function(){var d=e.viewportW()<992?"#searchFormMobile":"#searchForm";s=e(d),o=e("input[name=search_string]",s).first(),c=e("#search_result_template"),l=e(".search_content",s.parent()),e(".icon_search img").on("click touch",function(){s.toggleClass("hide")}),l.hide(),s.length&&o.length&&c.length&&(f=t.template(c.html()),o.on("input",function(){var t=o.val();!function(t,o){if(!t)return;o="function"==typeof o?o:function(){};var s={};s[i]=t,s[r]=u;var c=n[h(t)];if(void 0!==c)return p(t,c);e.ajax({url:a,type:"get",dataType:"json",data:s,success:o})}(t,function(e){(e||{}).items&&p(t,e.items)})}),o.on("blur",function(){setTimeout(function(){l.html(""),l.hide()},200)}))})}(jQuery,_);