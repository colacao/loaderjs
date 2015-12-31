$(function(){
    ad.adcont();
})
var ad = {
	adcont: function(){

		$.ajax({
            url: 'http://wx.17u.cn/pub/HomePage/Advertising',
            type: 'get',
            dataType: 'jsonp',
            timeout: 30000,
            success: function(data){
            	var firstTime = parseInt(localStorage.getItem("firstUpTime")) || 0,//首次弹屏时间，没有取0
                	redbag = data.info.HomePage.ScreenList,
                	operatList =  data.info.HomePage.OperatingList;

                //弹屏如果不上线，可以注释掉
                if(redbag.length > 0){
                	var actbeginTime = new Date(redbag[0].BeginTime).getTime(),
                		actEndTime = new Date(redbag[0].EndTime).getTime(),
                		nowTime = new Date().getTime();
                	if(firstTime < actbeginTime){
	                	localStorage.removeItem("playScreen");//如果首次弹屏时间小于开始时间，删除弹过屏的记录（判断如果是新的活动弹屏，删除弹屏记录）
	                }
	                if(!localStorage.getItem("playScreen") && nowTime < actEndTime){ //如果是首次弹屏并且在有效时间内
                	
	                    buildRedPop(redbag);                   
	                }
                } 
                                  
                // 首页运营位
                if(operatList.length > 0){
                	buildOperat(operatList);   
                }
                   
            }
        });
	}
};
function buildRedPop(list){
    var temp = '<div id="redBagPop">'
        +   '<div>'
        +       '<img src="' + list[0].ImageUrl + '">'
        +       '<a class="get_btn" href="' + list[0].RedirectUrl + '"></a>'
        // +       '<a class="get_btn" href="javascript:;"  onclick="_tcTraObj._tcTrackEvent(\'click\',\'adtanpingin\',\'wxhome\',\'\');location.href=\'' + list[0].RedirectUrl + '\';"></a>'
        +       '<a class="continue_btn" href="javascript:;"></a>'
        +       '<span><em></em></span>'
        +   '</div>'
        +'</div>';
        $('body').prepend(temp);

        var	firstPopTime = new Date().getTime();
        
        if(!localStorage.getItem("playScreen")){
            localStorage.setItem("playScreen","1");//是否弹屏过
            localStorage.setItem("firstUpTime",firstPopTime);//记录首次弹屏时间
        }  

        $('#redBagPop .continue_btn,#redBagPop span').on('click', function () {
        	// _tcTraObj._tcTrackEvent('click','adtanpingout','wxhome','');
            $('#redBagPop').remove();
        });
}

function buildOperat(list){
	var htmlStr = '<div class="act_box clearfix"><div class="background-r-1">';

	for(var i=0,len=list.length;i<len;i++){
		switch (i) {
            case 0:
                htmlStr+= buildList1(list[0]);
                break;
            case 1:
                htmlStr+= buildList2(list[1]);
                break;            
            case 2:
                htmlStr+= buildList3(list[2]);
                break;
        }
	}

	$('#actBox').prepend(htmlStr); 
}
function buildList1(list){
	var listStr  = "";
	listStr =	
				// '<a href="javascript:;"  onclick="_tcTraObj._tcTrackEvent(\'click\',\'operate1\',\'wxhome\',\'\');location.href=\''+ list.RedirectUrl +'\';"></a>' +
				'<a href="' + list.RedirectUrl + '">' +			  
 				'<h3>' + list.Title + '</h3>' + 
		   		'<p>' + list.SubTitile + '</p>' +
				'<img src="' + list.ImageUrl + '">' +
				'</a></div><div><ul>';

    return listStr;
}
function buildList2(list){
	var listStr  = "";
	listStr  =  '<li class="background-b-1">' + 
				'<a href="' + list.RedirectUrl + '">' +	
				// '<a href="javascript:;"  onclick="_tcTraObj._tcTrackEvent(\'click\',\'operate2\',\'wxhome\',\'\');location.href=\''+ list.RedirectUrl +'\';">' +
 			    '<h3>' + list.Title + '</h3>' + 
		   		'<p>' + list.SubTitile + '</p>' +
			    '<img src="' + list.ImageUrl + '">' +
			    '</a></li>';
    return listStr;
}
function buildList3(list){
	var listStr  = "";
	listStr = 	'<li><a href="' + list.RedirectUrl + '">' +	
				// '<li><a href="javascript:;"  onclick="_tcTraObj._tcTrackEvent(\'click\',\'operate3\',\'wxhome\',\'\');location.href=\''+ list.RedirectUrl +'\';">' +
 			   '<h3>' + list.Title + '</h3>' + 
		   		'<p>' + list.SubTitile + '</p>' +
			   '<img src="' + list.ImageUrl + '">' +
			   '</a></li></ul></div></section>';
    return listStr;
}

