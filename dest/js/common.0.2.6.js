define("common",function(c,a,b){return define("common.0.2.6",function(e,t,n){function i(){$("body").on("touchmove",function(e){e.preventDefault()})}function o(){$("body").off("touchmove")}function r(){$("body").append(\'<div class="opLayer"><div class="loading"><em class="loadingImg"></em></div></div>\')}function a(){$(".opLayer").remove()}function s(){var e=$.cookie("WxUser"),t=new Object;if(e)for(var n=e.split("&"),i=0;i<n.length;i++)t[n[i].slice(0,n[i].indexOf("="))]=n[i].slice(n[i].indexOf("=")+1);return t}function c(e){$(e).show()}function l(e){$(e).hide()}Zepto.cookie=function(e,t,n){if("undefined"==typeof t){var i=null;if(document.cookie&&""!=document.cookie)for(var o=document.cookie.split(";"),r=0;r<o.length;r++){var a=Zepto.trim(o[r]);if(a.substring(0,e.length+1)==e+"="){i=decodeURIComponent(a.substring(e.length+1));break}}return i}n=n||{},null===t&&(t="",n.expires=-1);var s="";if(n.expires&&("number"==typeof n.expires||n.expires.toUTCString)){var c;"number"==typeof n.expires?(c=new Date,c.setTime(c.getTime()+24*n.expires*60*60*1e3)):c=n.expires,s="; expires="+c.toUTCString()}var l=n.path?"; path="+n.path:"",u=n.domain?"; domain="+n.domain:"",d=n.secure?"; secure":"";document.cookie=[e,"=",encodeURIComponent(t),s,l,u,d].join("")},$.fn.show=function(){return this.each(function(e,t){t.style.display="block"}),this};var u={touch:"createTouch"in document,start:this.touch?"touchstart":"mousedown",move:this.touch?"touchmove":"mousemove",end:this.touch?"touchend":"mouseup",click:this.touch?"tap":"click",dialog:function(e,t,n,r){if($(t+" #showTip").length<1){var a={_content_:e,_confirm_:r||"确认"},s=$(this.dialogTpl().replace(/_[^_]*_/g,function(e){return a[e]}));$(".msg-btn",s[1]).bind("click",function(){$("#bgTip").remove(),$("#showTip").remove(),o(),n&&n()}),$(t).append(s),i()}},dialogTpl:function(){return\'<div id="bgTip" style="display: block;"></div><div id="showTip"><div class="msg-content">_content_</div><div class="msg-btn"><button style="margin:0;" class="btn touchable">_confirm_</button></div></div>\'},confirm:function(e,t,n,r,a,s){var c={_cancle_:r||"取消",_confirm_:a||"确认",_content_:e},l=$(this.confirmTpl().replace(/_[^_]*_/g,function(e){return c[e]}));$(".cancle",l).bind(this.click,function(){o(),s&&s(),l.remove()}),$(".confirm",l).bind(this.click,function(){o(),n&&n(),l.remove()}),$(t).append(l),i()},confirmTpl:function(){return\'<div id="bgTip" style="display: block;"><div id="showTip"><div class="msg-content">_content_</div><div class="msg-btn double"><button  class="cancle btn graybt touchable">_cancle_</button><button  class="confirm btn touchable">_confirm_</button></div></div></div>\'}};Date.prototype.format=function(e){var t={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds(),"w+":Date.getWeek(this.getDay())};/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length)));for(var n in t)new RegExp("("+n+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?t[n]:("00"+t[n]).substr((""+t[n]).length)));return e},Date.getWeek=function(e){return this.aWeek=["周日","周一","周二","周三","周四","周五","周六"],this.aWeek[e]},Date.ParseString=function(e){var t=/(\\d{4})-(\\d{1,2})-(\\d{1,2})(?:\\s+(\\d{1,2}):(\\d{1,2}):(\\d{1,2}))?/i,n=t.exec(e),i=0,o=null;return i=n&&n.length?n.length>5&&n[6]?Date.parse(e.replace(t,"$2/$3/$1 $4:$5:$6")):Date.parse(e.replace(t,"$2/$3/$1")):Date.parse(e),isNaN(i)||(o=new Date(i)),o},function(e){function t(){try{return a in o&&o[a]}catch(e){return!1}}var n,i={},o=window,r=o.document,a="localStorage",s="script";if(i.disabled=!1,i.version="1.3.17",i.set=function(e,t){},i.get=function(e,t){},i.has=function(e){return void 0!==i.get(e)},i.remove=function(e){},i.clear=function(){},i.transact=function(e,t,n){null==n&&(n=t,t=null),null==t&&(t={});var o=i.get(e,t);n(o),i.set(e,o)},i.getAll=function(){},i.forEach=function(){},i.serialize=function(e){return JSON.stringify(e)},i.deserialize=function(e){if("string"==typeof e)try{return JSON.parse(e)}catch(t){return e||void 0}},t())n=o[a],i.set=function(e,t){return void 0===t?i.remove(e):(n.setItem(e,i.serialize(t)),t)},i.get=function(e,t){var o=i.deserialize(n.getItem(e));return void 0===o?t:o},i.remove=function(e){n.removeItem(e)},i.clear=function(){n.clear()},i.getAll=function(){var e={};return i.forEach(function(t,n){e[t]=n}),e},i.forEach=function(e){for(var t=0;t<n.length;t++){var o=n.key(t);e(o,i.get(o))}};else if(r.documentElement.addBehavior){var c,l;try{l=new ActiveXObject("htmlfile"),l.open(),l.write("<"+s+">document.w=window</"+s+\'><iframe src="/favicon.ico"></iframe>\'),l.close(),c=l.w.frames[0].document,n=c.createElement("div")}catch(u){n=r.createElement("div"),c=r.body}var d=function(e){return function(){var t=Array.prototype.slice.call(arguments,0);t.unshift(n),c.appendChild(n),n.addBehavior("#default#userData"),n.load(a);var o=e.apply(i,t);return c.removeChild(n),o}},h=new RegExp("[!\\"#$%&\'()*+,/\\\\\\\\:;<=>?@[\\\\]^`{|}~]","g"),f=function(e){return e.replace(/^d/,"___$&").replace(h,"___")};i.set=d(function(e,t,n){return t=f(t),void 0===n?i.remove(t):(e.setAttribute(t,i.serialize(n)),e.save(a),n)}),i.get=d(function(e,t,n){t=f(t);var o=i.deserialize(e.getAttribute(t));return void 0===o?n:o}),i.remove=d(function(e,t){t=f(t),e.removeAttribute(t),e.save(a)}),i.clear=d(function(e){var t=e.XMLDocument.documentElement.attributes;for(e.load(a);t.length;)e.removeAttribute(t[0].name);e.save(a)}),i.getAll=function(e){var t={};return i.forEach(function(e,n){t[e]=n}),t},i.forEach=d(function(e,t){for(var n,o=e.XMLDocument.documentElement.attributes,r=0;n=o[r];++r)t(n.name,i.deserialize(e.getAttribute(n.name)))})}try{var p="__storejs__";i.set(p,p),i.get(p)!=p&&(i.disabled=!0),i.remove(p)}catch(u){i.disabled=!0}i.enabled=!i.disabled,e.store=i,e.storeWithExpiration={set:function(e,t,n){i.set(e,{val:t,exp:n,time:(new Date).getTime()})},get:function(e){var t=i.get(e);return t?(new Date).getTime()-t.time>t.exp?null:t.val:null}}}(window);var d=({versions:function(){var e=navigator.userAgent;navigator.appVersion;return{trident:e.indexOf("Trident")>-1,presto:e.indexOf("Presto")>-1,webKit:e.indexOf("AppleWebKit")>-1,gecko:e.indexOf("Gecko")>-1&&-1==e.indexOf("KHTML"),mobile:!!e.match(/AppleWebKit.*Mobile.*/)||!!e.match(/AppleWebKit/),ios:!!e.match(/\\(i[^;]+;( U;)? CPU.+Mac OS X/),android:e.indexOf("Android")>-1||e.indexOf("Linux")>-1,iPhone:e.indexOf("iPhone")>-1||e.indexOf("Mac")>-1,iPad:e.indexOf("iPad")>-1,webApp:-1==e.indexOf("Safari")}}(),language:(navigator.browserLanguage||navigator.language).toLowerCase()},function(){function e(e){$.ajax({url:"GetServiceTime",dataType:"jsonp",timeout:3e3,success:function(e){if(e.ResponseStatus){var t=e.ResponseMessage.replace(/-/g,"/"),i=new Date;n={server:new Date(Date.parse(t)),local:i};var o=i.getFullYear()+"/"+(i.getMonth()+1)+"/"+i.getDate()+" "+i.getHours()+":"+i.getMinutes()+":"+i.getSeconds();store.set("TRAIN_SERVERTIME",{serverTimeStr:t,localtimeStr:o})}},complete:function(){e&&e()}})}function t(t){var i=store.get("TRAIN_SERVERTIME");if(i)try{n={server:new Date(Date.parse(i.serverTimeStr)),local:new Date(Date.parse(i.localtimeStr))},t&&t()}catch(o){e(t)}else e(t)}var n,i=function(){return"undefined"!=typeof n&&n.server?!0:!1},o=function(){var e;return e=i()?new Date((new Date).getTime()+(n.server-n.local)):new Date},r=function(){return o().getTime()},a=function(){var e=f.WorkSTime,t=f.WorkETime,n=60*parseInt(e.split(":")[0])+parseInt(e.split(":")[1]),i=60*parseInt(t.split(":")[0])+parseInt(t.split(":")[1]),o=60*d.getDate().getHours()+d.getDate().getMinutes();return o>=n&&i>o?!0:!1};return t(),{getDate:o,getUnix:r,isWorkTime:a,getServertime:t}}()),h=function(e,t,n){var e="string"==typeof t?$(e):e,t="string"==typeof t?$(t):t;e.each(function(){var e=$(this);e.btn=!1,e.bind({focus:function(){var n=$.trim(e.val());""!=n&&t.addClass("not-empty"),e.btn&&c("#trainPasswordClear")},blur:function(){t.removeClass("not-empty")},input:function(){this.timer&&clearTimeout(this.timer);var n=e.val();""==n?t.removeClass("not-empty"):t.addClass("not-empty"),e.btn&&c("#trainPasswordClear"),"trainPassword"==e.attr("id")&&(n||utilityRailway.needAutoLogin||(c("#eye-password"),l("#trainPasswordClear"),$("#trainPasswordClear").addClass("trainpasswordeye"),e.btn=!0))}}),t.bind("touchend",function(t){t.preventDefault(),t.stopPropagation(),e.val(""),e.keyup(),e.focus(),e.trigger("input"),"function"==typeof n&&n.call(this);var i=e.val();"trainPassword"==e.attr("id")&&(i||utilityRailway.needAutoLogin||(c("#eye-password"),l("#trainPasswordClear"),$("#trainPasswordClear").addClass("trainpasswordeye"),e.btn=!0))})})},f={};f.PublicInterface=$("#PublicInterface").val(),f.OrderDetail=$("#ResourceUrl").val()+"OrderOperation/QueryOrderDetailsV1",f.ticketSearch=$("#TicketSearch").val()+"ticket/searchfortouch",f.StationUrl=$("#TicketSearch").val()+"Station",f.MonitorHandle=$("#ResourceUrl").val()+"OrderOperation/MonitorHandle",f.HotelAjaxCall=$("#HotelAjaxCall").val(),f.WritePayBack=$("#PayBackUrl").val(),f.CallBackUrl=$("#CallBackUrl").val(),f.MerchentReUrl=$("#MerchentReUrl").val(),f.LoginUrl=$("#LoginUrl").val(),f.MyOrders=$("#MyOrders").val(),f.RefundOrderTime=$("#RefundOrderTime").val(),f.GetCityUrl=$("#GetCityUrl").val(),f.WorkSTime=$("#WorkSTime").val(),f.WorkETime=$("#WorkETime").val(),f.SaveMemberUrl=$("#ResourceUrl").val()+"FavoriteContacts/SaveMemberLinker",f.PayUrl=$("#PayUrl").val(),f.GetOrderTrackingUrl=$("#ResourceUrl").val()+"OrderOperation/SearchOrderTracking",f.wxTrainUrl=$("#wxTrainUrl").val(),f.wxFlightRootUrl=$("#wxFlightRootUrl").val(),f.wxFlightUrl=$("#wxFlightUrl").val(),f.hotCityUrl=$("#hotCityUrl").val(),f.letterCityUrl=$("#letterCityUrl").val(),f.wxIndexUrl=$("#wxIndexUrl").val(),f.WeChatHoldingSeat=$("#ResourceUrl").val()+"OrderOperation/WeChatHoldingSeat",f.VerificationIdentity=$("#ResourceUrl").val()+"OrderOperation/VerificationIdentity",f.GetNoticeInfo=$("#ResourceUrl").val()+"Notice/GetNoticeInfo",f.TrainRefundTrack=$("#ResourceUrl").val()+"OrderOperation/RefundTrack",f.CancelNightOrderUrl=$("#ResourceUrl").val()+"Handlers/TrainTicket.ashx",f.ActiveUrl=$("#activeUrl").val(),f.IsOpenActive=$("#ResourceUrl").val()+"OrderOperation/ActiveSendPackageControl",f.UseList=$("#ResourceUrl").val()+"ManageWXCard/GetUserTrainActivityUseList",f.UpdateUseInfo=$("#ResourceUrl").val()+"AddWXCard/UpdateActivityUseInfo",f.Authentication=$("#ResourceUrl").val()+"OrderOperation/Authentication",f.BookChangeOrder=$("#ResourceUrl").val()+"OrderOperation/BookChangeOrder",f.UpdatePassengerInfo=$("#ResourceUrl").val()+"OrderOperation/UpdatePassengerInfo",f.getShareStatus=$("#ResourceUrl").val()+"ManageWXCard/GetShareStatus",f.setShareStatus=$("#ResourceUrl").val()+"ManageWXCard/SetShareStatus",f.wxCouponShareUrl=$("#wxCouponShareUrl").val(),f.PublicServiceTime="http://www.ly.com/huochepiao/resource/PublicInterface/GetServiceTime",f.offlineTicketVerification=$("#TrainorderPublicUrl").val()+"TCOrder/offlineTicketVerification",f.GetPostFee=$("#TrainorderPublicUrl").val()+"TCOrder/GetPostFee",function(e){e.prototype.zjTrim=function(){return this.replace(/^\\s+|\\s+$/g,"")},e.prototype.zjEndWiths=function(e){return this.lastIndexOf(e)==this.length-e.length},e.prototype.zjFill=function(e){var t=this;if(null!=e){var n,i=Object.prototype.toString.call(e),o="[object Array]"==i||"[object Object]"==i?e:arguments;for(var r in o)n=new RegExp("\\\\{"+r+"\\\\}","gm"),t=t.replace(n,o[r])}return t},e.prototype.zjReplace=function(e,t){for(var n=this,i=0;(i=n.indexOf(e,i))>-1;)n=n.substring(0,i)+t+n.substring(i+e.length),i+=t.length;return n}}(String),function(){var e={touchStart:"touchstart"},t=function(n){var i={bgCls:"zjPopupBg",cls:"zjPopup",speed:400,showAn:null,hideAn:null,isShowBg:!0,html:"",showBefore:null,hideBefore:null,autoDestroy:!0},o=this;for(var r in n)i[r]=n[r];this.opts=i,this.bg=null,this.container=null,function(){o.container=$("<div class=\'"+i.cls+"\'>"+i.html+"</div>").css("zIndex",2050),o.container.appendTo(document.body),o.container.on(e.touchStart,function(e){}),o.opts.isShowBg&&(o.bg=$("<div class=\'"+i.bgCls+"\'></div>").css("zIndex",t.zIndex++),o.bg.appendTo(document.body),o.bg.on(e.touchStart,function(e){e.preventDefault()})),$(window).bind("resize",function(){o.isHided()||o.isDestroy()||o.toCenter()})}()};t.prototype={setContent:function(e){this.container.html(e)},setAutoDestroy:function(e){this.opts.autoDestroy=e},getPosition:function(){var e=this.container.offset();return{x:e.left,y:e.top}},getCenter:function(){var e=this;return{left:($(window).width()-e.container.width())/2,top:($(window).height()-e.container.height())/2}},toCenter:function(){var e=this.getCenter();e.left=e.left/$(window).width()*100+"%",e.top=e.top/$(window).height()*100*.8+"%",this.container.css(e)},isHided:function(){var e=this.container.css("display");return!e||"none"==e||0==this.container.css("opacity")},isDestroy:function(){return null==this.container},show:function(){this.isHided()&&(this.opts.showBefore&&this.opts.showBefore(this),this.bg&&this.bg.css("opacity",.5).show(),this.opts.hideAn&&this.container.removeClass(this.opts.hideAn),this.opts.showAn?this.container.addClass(this.opts.showAn):this.container.show(),this.toCenter())},hide:function(){this.opts.hideBefore&&this.opts.hideBefore(this),this.opts.showAn&&this.container.removeClass(this.opts.showAn),this.opts.hideAn?this.container.addClass(this.opts.hideAn):this.container.hide(),this.bg&&this.bg.hide(),this.autoDestroy()},hideTo:function(e,t){e="string"==typeof e?$(e):e;var n={offsetX:0,offsetY:0};if(t)for(var i in t)n[i]=t[i];this.opts.hideBefore&&this.opts.hideBefore(this);var o=e.offset(),r=this.container.offset(),a=o.left-r.left-o.width/2+n.offsetX,s=o.top-r.top-60+n.offsetY;this.container.css({"-webkit-transition":"all 0.8s","-webkit-transform":"translate({0}px,{1}px) scale(0,0)".zjFill(a,s)}),this.bg&&this.bg.hide(),this.autoDestroy()},autoDestroy:function(){var e=this;this.opts.autoDestroy&&setTimeout(function(){e.destroy()},this.opts.speed+600)},destroy:function(){this.bg&&this.bg.remove(),this.container&&this.container.remove(),this.bg=null,this.container=null},animateNo:function(){this.animate("zjPopupNo",600)},animate:function(e,t){var n=this;this.container.addClass(e),setTimeout(function(){n.container.removeClass(e)},t+100)}},t.zIndex=2015,t.getBtnMsg=function(n,i){var o="";for(var r in i)o+="<div>"+i[r].text+"</div>";var a=new t({html:"<div class=\'btnMsg\'><div></div><div class=\'btnContainer\'>"+o+"</div></div>"});a.setContent=function(e){this.container.find(".btnMsg > div").eq(0).text(e)},a.setContent(n);var s=a.container.find(".btnMsg > div:last-child > div");for(var r in i)s.eq(r).on(e.touchStart,i[r].fun);return a},t.getAlert=function(e,n){var i=t.getBtnMsg(e,[{text:"确定",fun:function(){i.hide(),n&&n()}}]);return i},t.getConfirm=function(e,n,i){var o=t.getBtnMsg(e,[{text:"取消",fun:function(){o.hide(),i&&i()}},{text:"确定",fun:function(){o.hide(),n&&n()}}]);return o},t.getToast=function(e,n){n=n||2e3;var i=new t({isShowBg:!1,speed:1e3,html:"<div class=\'toast\'><div class=\'msg\'></div></div>",showBefore:function(e){setTimeout(function(){e.hide()},n+e.opts.speed)}});return i.setContent=function(e){this.container.find(".toast > div").text(e)},i.setContent(e),i},t.getIconToast=function(e,n,i){i=i||2e3;var o=new t({isShowBg:!1,speed:1e3,html:"<div class=\'toast\'><div class=\'icon\'></div><div class=\'msg\'></div></div>",showBefore:function(e){setTimeout(function(){e.hide()},i+e.opts.speed)}});return o.setContent=function(e,t){this.container.find(".toast .icon").html("<img src=\'"+e+"\' />"),this.container.find(".toast .msg").text(t)},o.setContent(e,n),o},t.getSuccessToast=function(e,n){return t.getIconToast("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGIAAABMBAMAAABkLX97AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAkUExURQAAAP///////////////////////////////////////////7QJjekAAAALdFJOUwAKwNka8KdNZYUz7dJFZQAAATdJREFUSMft1z9Lw2AQBvBXUGM7SYVCRzvq0iGLdCkUnF2csqTglqVLJ5fuLn4Jv4Cl2nJfrn/S5s1L7y73DKEouS3D8QvhnjviXFN11PPrG9ZwOaTFCOoYE1EMEoQhO4IoBQmiF5SgAUrQJ0p836LE/Z8m2glKfOUNPzAxqZ9IYcL9P6LXn2PExaPyqVmio0yMRMhTyRLXylgeiTDdV8roH4i1YzpYJGKJw1uxyIwllAwLhBJigZARkRCRd4mQkIiUTcsiCsEjKsEiKuGR2EoUiD+MFcQpciTkcLq7EPnIH1fKAtjnqkBuqok8uwViIELERASIiSgjRqKEGAmPPFmJAiEr4REzESIr0+YvI1PbsfDIr/G8eMRIeMRKeMRMONcFiS2SgUSOIMS2MlpOsY5W8tD8Bp2tNsf7x3UWg/gnAAAAAElFTkSuQmCC",e,n)},t.getLoading=function(e,n){var i=new t({html:"<div class=\'loading\'><div></div><div></div></div>"});return i.container.find(".loading > div").eq(0).html(n?"<img src=\'"+n+"\' />":"<div class=\'img\'></div>"),i.setContent=function(e){this.container.find(".loading > div").eq(1).text(e)},i.setContent(e||"正在加载......"),i},t.get12306Loading=function(e){var n=new t({html:\'<div class="loading-box"><div class="icon-train-two loading-icon"><div class="icon-train-two loading-gif"></div></div><p class="loading-content"></p></div>\'});return n.setContent=function(e){this.container.find(".loading-content").text(e)},n.setContent(e||"正在加载..."),n};var n=null;t.showLoading=function(e){null==n&&(n=t.getLoading(),n.setAutoDestroy(!1)),n.setContent(e||"正在加载数据。。。"),n.show()},t.hideLoading=function(){n&&n.hide()};var i=null;t.show12306Loading=function(e){null==i?(i=t.get12306Loading(e),i.bg.css("opacity","0"),i.setAutoDestroy(!1)):i.setContent(e),i.show()},t.hide12306Loading=function(){i&&i.hide()},t.getCloseBox=function(e,n,i,o){var r=new t({html:"<div class=\'closeBox\'><div><span class=\'icon-train-two\'></span></div><div class=\'msg\'></div><div class=\'btnContainer\'><div></div></div></div>"});return r.bg.css("opacity","0.5"),r.setContent=function(e){this.container.find(".msg").eq(0).html(e)},r.setContent(e),r.container.find(".closeBox > div:first-child > span").eq(0).bind("click",function(){r.hide(),o&&o()}),r.container.find(".btnContainer > div").eq(0).bind("click",function(){r.hide(),i&&i()}).text(n),r},t.getSingleInput=function(e,n,i){var o={msg:null,label:null,hideTo:null,hideToOffset:null,input:{value:"",type:"text",placeholder:"请输入"},btnText:"确认"};for(var r in e)if("input"==r)for(var a in e[r])o[r][a]=e[r][a];else o[r]=e[r];var s="validateCodeClear"+t.zIndex,c=new t({autoDestroy:!1,html:"<div class=\'singleInput\'><div><span class=\'icon-train-two\'></span></div><div style=\'clear:both;\'></div><div class=\'msg\'></div><div class=\'input\'><span></span><input id=\'"+s+"\' /><a href=\'javascript:;\' id=\'"+s+"_c\' class=\'clear-input\'><label class=\'icon-train-two icon-clear-input\'></label></a></div><div class=\'btnContainer\'><div></div></div></div>"});return h("#"+s,"#"+s+"_c"),c.container.find(".icon-clear-input").eq(0).css({"margin-left":"22px","margin-top":"8px"}),c.bg.css("opacity","0.5"),c.container.css("width","90%"),c.setContent=function(e,t){e.msg?this.container.find(".msg").eq(0).html(e.msg):t&&this.container.find(".msg").eq(0).hide(),e.label?this.container.find(".input > span").eq(0).html(e.label):t&&this.container.find(".input > span").eq(0).hide();var n=this.container.find("input").eq(0);if(e.input)for(var i in e.input)n.attr(i,e.input[i])},c.setContent(o),c.getInput=function(){return this.container.find(".input input").eq(0)},c.container.find(".input input").eq(0).bind("focus",function(){}),c.container.find(".singleInput > div:first-child > span").eq(0).bind("touchend",function(e){e.preventDefault(),e.stopPropagation(),c.setAutoDestroy(!0),o.hideTo?c.hideTo(o.hideTo,o.hideToOffset):c.hide(),i&&i()}),c.container.find(".btnContainer > div").eq(0).bind("touchend",function(){n&&n(c.container.find("input").eq(0).val())}).text(o.btnText),c},t.showDialog=function(e,t,n){u.dialog(e,"body",t),n&&$("#showTip button").eq(0).text(n)},t.showExplain=function(e,t){"string"==typeof e&&(e=$(e)),t=t||$(".layer-close");var n=function(){e.hide(),t.hide(),t.unbind("click",n)};t.bind("click",n),e.show(),t.show()},window.zjPopup=t}(),function(){var e={};e.envi={hasTouch:"ontouchstart"in window,isAndroid:!1,isIOS:!1,isIPhone:!1,isIPad:!1,isInWeixin:!1,isInQQ:!1,deviceType:null,deviceModel:null,osVersion:null,init:function(){var e=window.navigator.appVersion;/Android /.test(e)?this.isAndroid=!0:/iPhone;/.test(e)?this.isIPhone=!0:/iPad;/.test(e)&&(this.isIPad=!0),/MicroMessenger/.test(e)?this.isInWeixin=!0:/MQQBrowser/.test(e)&&(this.isInQQ=!0),this.deviceType=this.isAndroid?"Android":this.isIPhone?"iPhone":this.isIPad?"iPad":"PC",this.isAndroid?(this.osVersion=/Android (\\d+[^;]+)?;/.exec(e)[1],this.deviceModel=/; ([^;\\)]+)\\)/.exec(e)[1]):(this.isIPhone||this.isIPad)&&(this.osVersion=/ OS (\\d+[^ ]+)? /.exec(e)[1].replace(/_/g,".")),this.isIOS=/Mac OS X/.test(e)},toString:function(e){var t=[window.navigator.appVersion];for(var n in this)"function"!=typeof this[n]&&t.push(n+":"+this[n]);return t.push("width:"+$(window).width()),t.push("height:"+$(window).height()),t.join(e||"\\r\\n")}},e.envi.init(),e.log=function(e){},e.date={parse:function(e){return new Date(Date.parse(e.replace("-/g","/")))},getDiff:function(e,t){var n=e.getTime()-t.getTime(),i=Math.floor(n/24/3600/1e3),o=Math.floor(n/3600/1e3%24),r=Math.floor(n/1e3/60%60),a=Math.floor(n/1e3%60);return{day:i,hour:o,minute:r,second:a}}},e.config={platId:501,getUseAccountType:function(t){e.apis.isWorkTime(function(n){n?utilityRailway.getAccountConfigure(function(e){t(e,!0)}):t(e.useAccountType.tc,!1)})}},e.useAccountType={both:0,tc:1,_12306:2},e.apiHelper={getOpts:function(e,t,n,i,o,r){return{url:e,data:t,type:n,dataType:r||"json",timeout:o||2e4,success:function(e){i&&i(!0,e)},error:function(e){i&&i(!1,e)}}},get:function(e,t,n,i){return $.isFunction(t)&&(n=t,t=null),$.ajax(this.getOpts(e,t,"GET",n,i))},post:function(e,t,n,i){return $.ajax(this.getOpts(e,t,"POST",n,i))},getJSONP:function(e,t,n,i){return $.isFunction(t)&&(n=t,t=null),$.ajax(this.getOpts(e,t,"GET",n,i,"jsonp"))},postJSONP:function(e,t,n,i){return $.ajax(this.getOpts(e,t,"POST",n,i,"jsonp"))}},e.trainUser={get:function(){var e=store.get("TrainUser");return e?JSON.parse(e):null},getTemp:function(){return store.get("TrainUserTemping")},isLogined:function(t,n,i,o){"boolean"==typeof n&&(i=n,n=null),i=0==i?!1:!0;var c=this.get();if(c){var l=o||c.username,u={opendId:s().openid||store.get("WxOpenid")||"",userName:encodeURIComponent(l),binding:2,platId:e.config.platId};i&&r();var d="BingingKyfw";e.apiHelper.get(d,{Para:JSON.stringify(u)},function(e,o){i&&a(),e?t("1000"==o.msgCode):n?n(o):zjPopup.showDialog("获取登录状态失败！")})}else t(!1)},login:function(e,t){var n=function(){utilityRailway.bindEvent(),t&&$("#refund-prompt").html(t).show(),utilityRailway.openLoginPage()};utilityRailway.loginCallback=function(t){1==t?e&&e():n()},n()},checkAndLogin:function(e,t,n,i){"boolean"==typeof t&&(n=t,t=null);var o=this,r=function(){0==n&&e({status:1,msg:"需要登录"}),o.login(function(){e({status:0,msg:"登录成功"})},t)};this.isLogined(function(t){t?e({status:0,msg:"不需要登录"}):r()},function(){t="登录已失效，请重新登录",r()},n,i)},checkAndLoginByName:function(e,t,n,i){utilityRailway.autoLoginUserName=e,this.checkAndLogin(t,n,i,e)},refreshValidateCodeByRequestId:function(e,t){this.refreshValidateCode({data:{Type:0,RequestId:e},label:"登录验证码",timeout:5e3,userName:this.getTemp().username},t)},refreshValidateCodeByOrderId:function(e,t,n,i){this.refreshValidateCode({data:{Type:1,OrderId:e},label:"下单验证码",hideTo:i,hideToOffset:{offsetX:0,offsetY:500},timeout:5e3,userName:n},t)},refreshValidateCode:function(t,n){var i=null,o="12306GetCodeTime",r="12306InputCodeData",a=null,s=function(e,t,i,o){n({status:e,msg:t,success:i,userCancel:1==o})},c=function(n){localStorage.setItem(r,JSON.stringify(n)),s(1,"需要输入验证码",!1);var c=Math.ceil((a-Date.now())/1e3)+130,l=zjPopup.getSingleInput({msg:"msg",label:t.label,hideTo:t.hideTo,hideToOffset:t.hideToOffset,input:{placeholder:"请在10分钟内输入验证码"}},function(i){l.hide();var r=function(e,t){zjPopup.showDialog(e,function(){l.show()},t)},a=function(){s(2,"验证输入验证码",!1),zjPopup.show12306Loading("12306验证码验证中");var a="SendCaptChar.html",c={CtKey:n.CaptchaKey,UserName:t.userName,Result:i};t.data.OrderId?c.OrderId=t.data.OrderId:c.RequestId=t.data.RequestId,e.apiHelper.get(a,c,function(t,n){zjPopup.hide12306Loading(),t?(e.log(n),"1100"==n.Code?(localStorage.setItem(o,null),s(0,"验证成功",!0)):"1212"==n.Code?(localStorage.setItem(o,null),s(0,n.Msg,!1)):(l.getInput().val(""),r(n.Msg,"重新输入"))):r("服务器繁忙，请稍后重试！")})};i?a():r("12306购票要求输入验证码，您还没有输入哦","立即输入")},function(){s(0,"取消输入验证码",!1,!0)});if(l.opts.hideBefore=function(){i&&clearTimeout(i)},0==n.CaptchaType||1==n.CaptchaType)!function(){var e=c>=1?"<label style=\'color:#ff6600\'>"+c+"S</label>&nbsp;内 ":"";e+="<label style=\'color:#ff6600\'>{0}</label><br />{1}发到12306账号绑定的手机。".zjFill(t.label,c>=1?"将":"已经"),l.setContent({msg:e}),i&&clearTimeout(i),--c>=0&&(i=setTimeout(arguments.callee,1e3))}();else{var u="<img src=\'data:image/png;base64,"+n.CaptchaImage+"\' style=\'max-width:98%; max-height:11rem; vertical-align:top; margin:auto; margin-bottom:-10px\' />";l.setContent({msg:u}),l.container.find(".msg img").eq(0).bind("load",function(){l.toCenter()})}l.show()},l=function(){var n="GetCaptchaStatus.html",r=arguments.callee,l=function(){var n=(new Date).getTime(),o=(n-e.trainUser.refreshValidateCodeFirstTime)/6e4;i&&clearTimeout(i),o>20||(i=setTimeout(r,t.timeout))};e.apiHelper.get(n,t.data,function(e,t){if(e)if(100==t.Code){var n=t.Data.IsNeedCaptcha;0==n?l():1==n?(a=Date.now(),localStorage.setItem(o,a),c(t.Data)):s(0,"无需验证码",!0)}else 400==t.Code&&s(0,"参数错误",!1);else l()})};e.trainUser.refreshValidateCodeFirstTime||(e.trainUser.refreshValidateCodeFirstTime=(new Date).getTime()),l()},clear:function(){store.set("TrainUser",""),storeWithExpiration.set("isTrainLogged",!1)},autoLogin:function(e,t){return void console.error("autoLogin 已舍弃，不应调用此方法")}},e.apis={isWorkTime:function(e){$.ajax({url:"CheckWorkTime",type:"post",timeout:2e4,dataType:"text",success:function(t){e("true"==t)},complete:function(e,t){}})},getRemoteContacts:function(t,n,i){e.apiHelper.get("GetFavoriteContactsForOtherAccounts",{otherAccounts:t,type:i?1:0,platId:e.config.platId},n)},getPassengerVerify:function(t,n){e.apiHelper.get("GetPassengerVerify",t,n)}},e.events={hashChange:function(e,t,n){if(e=e.toLowerCase(),!this.hashArr){var i=this;$(window).bind("hashchange",function(e){var t=location.hash.toLocaleLowerCase(),n=e.oldURL.substring(e.oldURL.lastIndexOf("#")+1).toLowerCase();t&&(t=t.substring(1));for(var o in i.hashArr){if(i.hashArr[o].name==n){i.hashArr[o].callback(!1,e);break}if(i.hashArr[o].name==t){i.hashArr[o].callback(!0,e);break}}}),this.hashArr=[]}for(var o in this.hashArr)if(this.hashArr[o].name==e)return n||(this.hashArr[o].funs.length=0),void this.hashArr[o].funs.push(t);this.hashArr.push({name:e,funs:[t],callback:function(e,t){for(var n in this.funs)this.funs[n](e,t)}})}},window.zj=e}()});},'m');