define("common",function (require, exports, module) {
	(function(i,d){var h="http://wx.17u.cn/web/wxhome/";var g=false;var a={initMenu:function(j){var l=document.getElementsByTagName("head")[0];var m=document.createElement("link");var n=["","","",""];m.setAttribute("rel","stylesheet");m.setAttribute("type","text/css");m.setAttribute("href","http://wx.40017.cn/touch/min/??/touch/weixin/home/css/common.css?v=201509181624");l.appendChild(m);j=parseInt(j);switch(j){case 1:n[0]="selected";break;case 2:n[1]="selected";break;case 3:n[2]="selected";break;case 4:n[3]="selected";break;default:n[0]="selected";break}var k='<div class="fixMenu flexbox border-2"><a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3827070276e49e30&redirect_uri=http://wx.17u.cn/train/trainquery.html?response_type=code&scope=snsapi_base&state=123#wechat_redirect" class="menuItem '+n[0]+'"><span><em class="icon iconIndex"></em>首页</span></a><a href="'+h+'travelhelper.html" class="menuItem '+n[1]+'"><span><em class="icon iconTraval"></em>行程</span></a><a href="'+h+'specialhelper.html" class="menuItem '+n[2]+'"><span><em class="icon iconActivity"></em>特惠</span></a><a href="'+h+'memberhelper.html" class="menuItem '+n[3]+'"><span><em class="icon iconPersonal"></em>我的</span></a></div>';$("body").append(k)},initBanner:function(){var j=document.getElementsByTagName("head")[0];var k=document.createElement("script");k.type="text/javascript";k.src="http://wx.40017.cn/touch/weixin/home/js/slider.js";j.appendChild(k);k.onload=function(){e()}},initEntry:function(j){$("script").each(function(){if(this.src=="http://vstlog.17usoft.com/vst.ashx"){g=true}});if(!g){var k=document.getElementsByTagName("head")[0];var l=document.createElement("script");l.type="text/javascript";l.src="http://vstlog.17usoft.com/vst.ashx";k.appendChild(l);l.onload=function(){f(j)}}else{f(j)}}};function e(){$.ajax({url:h+"WeChatHome/GetTxAdvertise?pageCode=2&siteCode=2",type:"GET",dataType:"JSON",timeout:20000,success:function(j){j=JSON.parse(j);if(j.AdvertiseInfoList.length>0){b(j.AdvertiseInfoList);$(".slideWrap").slider({content:".slideCont",item:".slideItem",loop:true,fn:function(){var l=this.index;$(".slidePoint span").removeClass("active");$(".slidePoint span").eq(l).addClass("active")}});var k=$(".slidePoint").width();$(".slidePoint").css("margin-left",-k/2+"px")}}})}function b(l){var j="";var m="";var n="";for(var k=0;k<l.length;k++){j+='<li class="slideItem"><a href="javascript:;" onclick="_tcTraObj._tcTrackEvent(\'click\',\'guanggaotu'+(k+1)+"','wxhome','');location.href='"+l[k].SkipUrl+'\';"><img src="'+l[k].ImageUrl+'" alt="" /></a></li>';if(k==0){m+='<span class="active"></span>'}else{m+="<span></span>"}}if(l.length>1){n='<div class="slidePoint">'+m+"</div>"}var o='<div id="ad" class="slideWrap"><div class="slideMain"><ul class="slideCont">'+j+"</ul>"+n+"</div></div>";$("body").prepend(o)}function f(j){$.ajax({url:h+"WeChatHome/GetAllTxHomePageManage",type:"GET",dataType:"JSON",timeout:20000,success:function(k){k=JSON.parse(k);if(k.HomePageManageInfoList.length>0){c(k.HomePageManageInfoList,j)}}})}function c(y,t){var z="";var A=new Date();var C=[];var m=function(J,K){var s,H,I,G;s=J.split("-");H=new Date(s[0],s[1]-1,s[2]);s=K.split("-");I=new Date(s[0],s[1]-1,s[2]);G=parseInt(Math.abs(H-I)/1000/60/60/24);if((H-I)<0){return -G}return G};for(var r=0;r<y.length;r++){if(y[r].TXHMIsDisabled==0){var F=y[r].TXHMSkipUrl;var D=F.indexOf("?")>0?"&":"?";var u=y[r].TXHMIconName,x=y[r].IsRedShow,v=y[r].RedShowBeginTime,w=y[r].RedShowEndTime,B=A.getFullYear()+"-"+(A.getMonth()+1)+"-"+A.getDate(),k=v.substring(0,10),p=w.substring(0,10),l=v.replace(/-/g,"/"),q=w.replace(/-/g,"/"),j=new Date(l),o=new Date(q);z+='<li class="background-r-1"><a href="javascript:;" data-name="'+u+'" class="background-b-1 '+u+"\" onclick=\"_tcTraObj._tcTrackEvent('click','"+u+"','wxhome','');location.href='"+F+D+"para="+y[r].Para+"&sign="+y[r].Sign+"';\">"+y[r].TXHMName+"</a></li>";if(A>j&&A<o){var n=m(p,B)+1;C.push({show:x,lname:u,effectiveDate:n})}}}if(z){var E='<div class="entryBox"><ul class="entryList background-t-1">'+z+"</ul></div>";$("#"+t).append(E)}$.each(C,function(s,G){var H=parseInt(G.show);if(H&&!$.cookie(G.lname+"_clicked")){$("."+G.lname).addClass("new");$("."+G.lname).on("click",function(){$.cookie(G.lname+"_clicked",1,{expires:G.effectiveDate})})}})}if(typeof module!="undefined"&&module.exports){module.exports=a}else{i[d]=a}})(window,"Common");
});