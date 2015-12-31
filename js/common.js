/*from tccdn minify at 2015-12-31 0:14:24,file：/touch/weixin/home/js/common.js?v=201512302060*/
(function(window, exportName){
	var host = 'http://wx.17u.cn/web/wxhome/';
	var hasVst = false;
	 
	var Common = {
		initMenu: function(id){
			var oHead = document.getElementsByTagName('head')[0];
			var oStyle = document.createElement('link');
			
			oStyle.setAttribute('rel', 'stylesheet');
	        oStyle.setAttribute('type', 'text/css');
	        oStyle.setAttribute('href', 'http://wx.40017.cn/touch/min/??/touch/weixin/public/css/common.css?v=2015121612');
	        oHead.appendChild(oStyle);
			id = parseInt(id); 			 
			oStyle.onload = function(){
				getMenu(id);
			}          			
		},
		initBanner: function(){
			var oHead = document.getElementsByTagName('head')[0];
			var oScript = document.createElement('script');
			oScript.type = 'text/javascript'; 
			oScript.src = 'http://wx.40017.cn/touch/weixin/home/js/slider.js';
			oHead.appendChild(oScript);
			oScript.onload = function(){
				getBanner();
			}
		},
		initEntry: function(id){
			$('script').each(function(){
				if(this.src == 'http://vstlog.17usoft.com/vst.ashx'){
					hasVst = true;
				}
			});
			if(!hasVst){
				var oHead = document.getElementsByTagName('head')[0];
				var oScript = document.createElement('script');
				oScript.type = 'text/javascript'; 
				oScript.src = 'http://vstlog.17usoft.com/vst.ashx';
				oHead.appendChild(oScript);
				oScript.onload = function(){
					getEntry(id);
				}
			}else{
				getEntry(id);
			}
		}
	};

	function getBanner(){
		$.ajax({
		    url: host + 'WeChatHome/GetTxAdvertise?pageCode=2&siteCode=2',
		    type: 'GET',
		    dataType: 'JSON',
		    timeout: 20000,
		    success: function(data){
		    	data = JSON.parse(data);
				if(data.AdvertiseInfoList.length > 0){
					createBanner(data.AdvertiseInfoList);

					$('.slideWrap').slider({
						content:'.slideCont',
						item:'.slideItem',
						loop: true,
						fn:function(){
						  var i = this.index;
						  $('.slidePoint span').removeClass('active');
						  $('.slidePoint span').eq(i).addClass('active');
						}
					});
					var w = $('.slidePoint').width();
					$('.slidePoint').css('margin-left', -w/2 + 'px');
				}
			}
		});
	}

	function createBanner(list){
		var bannerHTML = '';
		var pointsHTML = '';
		var pointWrap = '';
		for(var i = 0; i < list.length; i++){
			bannerHTML += '<li class="slideItem"><a href="javascript:;" onclick="_tcTraObj._tcTrackEvent(\'click\',\'guanggaotu'+(i+1)+'\',\'wxhome\',\'\');location.href=\''+list[i].SkipUrl+'\';"><img src="'+list[i].ImageUrl+'" alt="" /></a></li>';
			if(i == 0){
				pointsHTML += '<span class="active"></span>';
			}else{
				pointsHTML += '<span></span>';
			}
		}
		if(list.length > 1){
			pointWrap = '<div class="slidePoint">'
				        +	pointsHTML
				        +'</div>';
		}
		var temp = '<div id="ad" class="slideWrap">'
		+	'<div class="slideMain">'
        +    	'<ul class="slideCont">'
        +        	bannerHTML
        +    	'</ul>'
        +    	pointWrap
        +	'</div>'
        +'</div>';
        $('body').prepend(temp);
	}

	function getEntry(id){
		$.ajax({
		    url: host + 'WeChatHome/GetAllTxHomePageManage',
		    type: 'GET',
		    dataType: 'JSON',
		    timeout: 20000,
		    success: function(data){
		    	data = JSON.parse(data);
				if(data.HomePageManageInfoList.length > 0){
					createEntry(data.HomePageManageInfoList, id);
				}
			}
		});
	}

	function createEntry(list, id){
		var listHTML = '';
		var nowDate = new Date();
		var redList = [];

		var DateDiff = function(sDate1, sDate2){ //sDate1和sDate2是yyyy-MM-dd格式
		    var aDate, oDate1, oDate2, iDays;
		    aDate = sDate1.split("-");
		    oDate1 = new Date(aDate[0],aDate[1]-1,aDate[2]);
		    aDate = sDate2.split("-");
		    oDate2 = new Date(aDate[0],aDate[1]-1,aDate[2]);

		    iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 /24);
		    if((oDate1 - oDate2)<0){
		        return -iDays;
		    }
		    return iDays;
		};

		for(var i = 0; i < list.length; i++){
			if(list[i].TXHMIsDisabled == 0){
				var url = list[i].TXHMSkipUrl;
				var s = url.indexOf('?') > 0 ? '&' : '?';

				var itemName = list[i].TXHMIconName,
					itemShow = list[i].IsRedShow,
					itemRedBegin = list[i].RedShowBeginTime,
					itemRedEnd = list[i].RedShowEndTime,
					nowStr = nowDate.getFullYear()+'-'+(nowDate.getMonth()+1)+'-'+nowDate.getDate(),
					beginStr = itemRedBegin.substring(0,10), //2015-09-23
					finishStr = itemRedEnd.substring(0,10),
					beginStrFormat = itemRedBegin.replace(/-/g, '/'), //2015/09/23 10:09
					finishStrFormat = itemRedEnd.replace(/-/g, '/'),
					beginDate = new Date(beginStrFormat),  //Wed Sep 23 2015 10:09:00 GMT+0800 (中国标准时间)
					finishDate = new Date(finishStrFormat);

				listHTML += '<li class="background-r-1"><a href="javascript:;" data-name="'+itemName+'" class="background-b-1 '+itemName+'" onclick="_tcTraObj._tcTrackEvent(\'click\',\''+itemName+'\',\'wxhome\',\'\');location.href=\''+url+s+'para='+list[i].Para+'&sign='+list[i].Sign+'\';">'+list[i].TXHMName+'</a></li>';
				
				if(nowDate > beginDate && nowDate < finishDate){
					var effectiveDate = DateDiff(finishStr, nowStr) + 1;
					redList.push({
						show: itemShow,
						lname: itemName,
						effectiveDate: effectiveDate
					});
				}
			}
		}
		if(listHTML){
			var temp = '<div class="entryBox">'
	        +    '<ul class="entryList background-t-1">'
	        +        listHTML
	        +    '</ul>'
	        +'</div>';
	        $('#' + id).append(temp);
		}
		//add redicon
		$.each(redList, function(index, item){
			var show = parseInt(item.show);
			if(show && !$.cookie(item.lname + '_clicked')){
				$('.' + item.lname).addClass('new');
				$('.' + item.lname).on('click', function(){
					$.cookie(item.lname + '_clicked', 1, {
						expires: item.effectiveDate
					});
				});
			}
		});
	}

	function getMenu(id){
		$.ajax({
			url: 'http://wx.17u.cn/pub/common/tab',
	        type: 'post',
	        dataType: 'jsonp',
	        timeout: 25000,
			success: function(data){
				var tabList = data.info.Common.Tab;
				if(tabList.length > 0){
					createMenu(tabList,id);
				}
			}
		});
	}
	function createMenu(list,id){
		var selected = ['', '', '', '', ''],
		id = parseInt(id);
		switch(id){
			case 1:
				selected[0] = 'selected';
				break;
			case 2:
				selected[1] = 'selected';
				break;
			case 3:
				selected[2] = 'selected';
				break;
			case 4:
				selected[3] = 'selected';
				break;
			case 5:
				selected[4] = 'selected';
				break;
			default:
				selected[0] = 'selected';
				break;
		}
		var menuTemp = '<div class="fixMenu flexbox border-2">';
		for(var i=0,len=list.length;i<len;i++){
					
			menuTemp += '<a href="' + list[i].RedirectUrl + '" class="menuItem ' + selected[i] + '">'
				    + '<span>' + redIcon(list[i]) 
				    + 	 '<em class="icon ' + list[i].ImageUrl + '"></em>' 
				    + 	 list[i].IconName 
				    + '</span></a>';
		}
		menuTemp += '</div>';
		
		$('body').append(menuTemp); 
	}
	function redIcon(list){
		var now = new Date(),
			redIconBegin = new Date(list.RDBeginTime.replace(/-/g, '/')), 
			redIconEnd = new Date(list.RDEndTime.replace(/-/g, '/'));	

		if(now > redIconBegin && now < redIconEnd && list.RedDot == 1){
			return list.ImageUrl == "icon2" ? '<i class="new-icon"></i>':'<i class="redHot"></i>';
		}else{
			return "";
		}
	}

	if(typeof module != 'undefined' && module.exports){
		module.exports = Common;
	}else{
		window[exportName] = Common;
	}
})(window, 'Common');




