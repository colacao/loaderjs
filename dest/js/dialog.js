define("dialog",function(c,a,b){return define("dialog",function(t,e,o){!function(){function t(){var i=e.attr("hl-cls");clearTimeout(o),e.removeClass(i).removeAttr("hl-cls"),e=null,n.off("touchend touchmove touchcancel",t)}var e,o,n=$(document);$.fn.highlight=function(i,a){return this.each(function(){var s=$(this);s.css({"-webkit-tap-highlight-color":"rgba(255,255,255,0)"}).off("touchstart.hl"),i&&s.on("touchstart.hl",function(c){var l;e=a?(l=$(c.target).closest(a,this))&&l.length&&l:s,e&&(e.attr("hl-cls",i),o=setTimeout(function(){e.addClass(i)},100),n.on("touchend touchmove touchcancel",t))})})}}(),function(){function t(t){this._options=this._options||{},$.extend(this._options,n),$.extend(this._options,t),this.init()}function e(t){var e,o,n,i=this,a=i._options;switch(t.type){case a.RotateChangeEvent:a._isOpen&&this.refresh();break;case"touchmove":a.scrollMove&&t.preventDefault();break;case"click":if(a._mask&&($.contains(a._mask[0],t.target)||a._mask[0]===t.target))return"function"==typeof a.maskClick&&a.maskClick();o=a._wrap.get(0),(e=$(t.target).closest(".close",o))&&e.length?i.close():(e=$(t.target).closest(".ui-dialog-btns .ui-btn",o))&&e.length&&(n=a.buttons[e.attr("data-key")],n&&n.apply(i,arguments))}}var o={close:\'<a class="close" title="关闭"></a>\',mask:\'<div class="ui-mask"></div>\',title:\'<div class="ui-dialog-title"></div>\',wrap:\'<div class="ui-dialog"><div class="ui-dialog-content"></div>BTNSTRING</div> \'},n={autoOpen:!1,className:"",buttons:null,closeBtn:!1,mask:!0,width:300,height:"auto",title:void 0,content:null,scrollMove:!0,container:null,maskClick:null,beforeOpen:null,afterOpen:null,beforeClose:null,afterClose:null,style:null,closeTime:2e3,className:""};t.prototype.getWrap=function(){return this._options._wrap},t.prototype.init=function(){var t,n=this,i=n._options,a=0,s={};i.eventHand=$.proxy(e,n),i._container=$(i.container||document.body),(i._cIsBody=i._container.is("body"))||i._container.addClass("ui-dialog-container`"),s.btns=t=[],i.buttons&&$.each(i.buttons,function(e){t.push({index:++a,text:e,key:e})}),i._mask=i.mask?$(o.mask).appendTo(i._container):null;var c="";if(t[0]){c=\'<div class="ui-dialog-btns">\';for(var a=0,l=t.length;l>a;a++){var r=t[a];c+=\'<a class="ui-btn ui-btn-\'+a+\'" data-key="\'+r.key+\'">\'+r.text+"</a>"}c+="</div>"}i._wrap=$(o.wrap.replace("BTNSTRING",c)).appendTo(i._container),i._content=$(".ui-dialog-content",i._wrap),i._title=$(o.title),i._close=i.closeBtn&&$(o.close).appendTo(i._title).highlight("close-hover").on("click",function(){n.close()}),n.title(i.title),n.content(i.content),t.length&&$(".ui-dialog-btns .ui-btn",i._wrap).highlight("ui-state-hover"),i._wrap.css({width:i.width,height:i.height}).addClass(i.className),i.RotateChangeEvent="onorientationchange"in window?"orientationchange":"resize",$(window).on(i.RotateChangeEvent,i.eventHand),i._wrap.on("click",i.eventHand),i._mask&&i._mask.on("click",i.eventHand),i.autoOpen&&n.open()},t.prototype.calculate=function(){var t,e,o=this,n=o._options,i=document.body,a={},s=n._cIsBody,c=Math.round;return n.mask&&(a.mask=s?{width:"100%",height:Math.max(i.scrollHeight,i.clientHeight)}:{width:"100%",height:"100%"}),t=n._wrap.offset(),e=$(window),a.wrap={left:"50%",marginLeft:-c(n._wrap.width()/2)+"px",top:s?c(e.height()/2)+window.pageYOffset:"50%",marginTop:-c(n._wrap.height()/2)+"px"},a},t.prototype.refresh=function(){var t,e,o=this,n=o._options;return e=function(){t=o.calculate(),t.mask&&n._mask.css(t.mask),n._wrap.css(t.wrap)},$.os&&$.os.ios&&document.activeElement&&/input|textarea|select/i.test(document.activeElement.tagName)?(document.body.scrollLeft=0,setTimeout(e,200)):setTimeout(e,200),o},t.prototype.open=function(t){var e,o=this._options,n=this;if(!o._isOpen){if(t&&n.content(t),o._isOpen=!0,"tip"==o.style){o.mask&&o._mask.addClass("ui-dialog-tran-03"),o._wrap.addClass("ui-dialog-black");var i=n.getWrap();setTimeout(function(){o.mask&&o._mask.animate({opacity:0},1e3,"ease-out",function(){o._mask.css({opacity:""})}),i.animate({opacity:0},1e3,"ease-out",function(){i.css({opacity:"1"}),n.close()})},o.closeTime)}if("function"==typeof o.beforeOpen&&(e=o.beforeOpen()),e)return this;o._wrap.css({display:"block"}),o._mask&&o._mask.css({display:"block"}),this.refresh(),$(document).on("touchmove",o.eventHand),"function"==typeof o.afterOpen&&o.afterOpen()}},t.prototype.close=function(t){var e=this._options;return"tip"==e.style&&e.mask&&e._mask.removeClass("ui-dialog-tran-03"),"function"==typeof e.beforeClose&&e.beforeClose(),e._isOpen=!1,e._wrap.css({display:"none"}),t?this:(e._mask&&e._mask.css({display:"none"}),$(document).off("touchmove",e.eventHand),"function"==typeof e.afterClose&&e.afterClose(this),this)},t.prototype.title=function(t){var e=this._options,o=void 0!==t;return o&&(t=(e.title=t)?"<h3>"+t+"</h3>":t,e._title.html(t)[t?"prependTo":"remove"](e._wrap),e._close&&e._close.prependTo(e.title?e._title:e._wrap)),o?this:e.title},t.prototype.content=function(t){var e=this._options,o=void 0!==t;return o&&e._content.empty().append(e.content=t),o?this:e.content},t.prototype.destroy=function(){var t=this._options;return $(window).off(t.RotateChangeEvent,t.eventHand),$(document).off("touchmove",t.eventHand),t._wrap.off("click",t.eventHand).remove(),t._mask&&t._mask.off("click",t.eventHand).remove(),t._close&&t._close.highlight(),this},$.dialog=function(e){return new t(e)}}(),function(){function t(t,e){var o={autoOpen:!0,closeBtn:!1,style:"tip",mask:e,closeTime:1e3,content:t};return $.dialog(o)}function e(e,i){i?"object"==typeof n?n.open(e):n=t(e,!0):"object"==typeof o?o.open(e):o=t(e,!1)}var o,n;$.tip=e}()});},'m');