/*from tccdn minify at 2015-12-31 0:16:58,file：/touch/weixin/train/js/trainQuery.0.4.9.js?v=201512302060*/
/*
var cookies = document.cookie.split(";");
for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
}
if(cookies.length > 0)
{
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        var domain = location.host.substr(location.host.indexOf('.'));
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=" + domain;
    }
}
localStorage.clear();
alert("缓存清除完毕");*/
/*setTimeout(function() {
    alert('WxUser值：　' + JSON.stringify(getWxObj()))
    alert('CooperateWxUser值：　' +JSON.stringify(getCooperateUser()))

}, 1000);*/
(function () {

    if (location.pathname.toLowerCase().indexOf('.html') < 0 && location.pathname.charAt(location.pathname.length - 1) != '/') location.href = location.pathname + "/";

    typeof(Common)!= 'undefined' && ( Common.initMenu("#footer"), Common.initEntry("submain") )


    setTimeout(function() {
        var openid = getWxObj().openid,
            userid = getWxObj().userid;
        if(openid&&openid!="null"&&openid!="0"&&openid!=undefined&&openid!="undefined") {
            StorageHelp.SetStorage("WxOpenid", openid);
        }
        if (!!userid && userid != "null" && userid != undefined && userid != "undefined" && userid != "0" && userid != "") {
            StorageHelp.SetStorage("WxUserid", userid);
        } else {
            StorageHelp.SetStorage("WxUserid", '');
        }
    }, 2000);


    interval();
    function interval(){
            if(window.page &&
            //$.fn.switchButton &&
         //   (typeof window.iScroll !== "undefined"||(typeof exports!=="undefined")?(typeof window.iScroll !== "undefined"):false) &&
            typeof WebConfigUrl !== "undefined" &&
            $.city &&
            //$.calendar &&
            typeof mobileUtil !=="undefined" &&
            typeof StorageHelp !=="undefined"){
                init();
            }else{
                setTimeout(interval,500);
            }
    }

    function init() {
//        if(t){
//            clearInterval(t);
//        }




        function GetServiceTime(fn){
            $.ajax({
                //url: WebConfigUrl.PublicServiceTime,
                url: "GetServiceTime",
                dataType:"json",
                timeout:5000,
                success:function (obj){
                    if(obj.ResponseStatus){
                        SERVERTIME = obj.ResponseMessage.replace(/-/g,'/');
                    }
                },
                complete:function(){
                    if(fn)fn();
                }
            });
        }

        var hotcityURLpara = {"length": 10 };
        // var $d = $("<div id='calContainerPage' class='page'/>");
        // $("body").append($d);
        function getCitysByAjax() {
            var letterarray= ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"];
//            isHasAndExe($.city,function(){
            $.city({
                nameAttr: 1,
                pyAttr: 3,
                matchAttrs: [1, 3],
                dataAttrMap: {
                    id: 0,
                    name: 1,
                    fullPy: 2
                },
                cities: {
                    //url: WebConfigUrl.letterCityUrl+"?allCity=0&letter={cityKey}",
                    url: "GetCityListByLetter?allCity=0&letter={cityKey}",
                    //url:$("#letterCityUrl").val()+"?allCity=0&letter={cityKey}",
                    dataType: "json",
                    success: function (data){
                        var lettercitypara= [];
                        var obj= data.TrainStation.StationList
                        for(i in obj){
                            var array=[];
                            array[0]=obj[i].ID;
                            array[1]=obj[i].Name;
                            array[2]=obj[i].QPY;
                            array[3]=obj[i].JPY;
                            lettercitypara.push(array);
                        }
                        return  lettercitypara;
                    }
                },
                cityFilter: function (city) {
                    return city[2] === "0";
                },
                hotCities: {
                    //url: WebConfigUrl.hotCityUrl,
                    url: "GetHotCityListV1",
                    //url:$("#hotCityUrl").val(),
                    dataType: "json",
                    success: function (data){
                        var hotcitypara=[]
                        var obj= data.TrainStation.StationList
                        for(i in obj){
                            var array=[];
                            array[0]=obj[i].ID;
                            array[1]=obj[i].Name;
                            array[2]=obj[i].QPY;
                            array[3]=obj[i].JPY;
                            hotcitypara.push(array);
                        }
                        return  hotcitypara;
                    }
                },
                historyCityName: "traincityHistoryName",
                historyCityNumber: 6,
                fn: function (city) {
                    $("#cityPage").toggle();
                    page.close();
                    $("p.t_incity input", elem).val(city[1]);
                    $(".CN",elem).val(city[1]);
                    $(".PY", elem).val(city[2]);
                },
                mode: "asRequired",
                searchObj:{
                    //url: WebConfigUrl.letterCityUrl+"?allCity=0",
                    url: "GetCityListByLetter?allCity=0",
                    //data: {
                    //    allCity: 0
                    //},
                    //url:$("#letterCityUrl").val()+"?allCity=0",
                    //type:'GET',   //默认GET
                    name :'letter', //默认 value
                    dataType: "json",
                    processFn:function(data){
                        //demo、用的数据是刚好一样，所以直接return
                        //异步返回值的处理，处理成指定的类型，要和上面的对应哦，具体可参考demo
                        //处理完要return 别忘了
                        if (data.TrainStation) {
                            document.querySelector(".search-complete").style.display = "block";
                            document.querySelector(".city-wrapper").style.display = "none";
                            var pycitypara = [];
                            var obj = data.TrainStation.StationList
                            for (i in obj) {
                                var array = [];
                                array[0] = obj[i].Name;
                                array[1] = obj[i].Name;
                                array[2] = obj[i].QPY;
                                array[3] = obj[i].JPY;
                                pycitypara.push(array);
                            }
                            return pycitypara;
                        } else {
                            document.querySelector(".search-complete").style.display = "none";
                            document.querySelector(".city-wrapper").style.display = "block";
                        }
                    }
                },
                letters:letterarray,
                loc: {
                    //url: WebConfigUrl.letterCityUrl+"?allCity=0&letter={cityName}",
                    url: "GetCityListByLetter?allCity=0&letter={cityName}",
                    dataType: "json",
                    success: function (data){
                        var citypara= [];
                        var obj= data.TrainStation.StationList
                        //for(i in obj[0]){
                            var array=[];
                            array[0]=obj[0].ID;
                            array[1]=obj[0].Name;
                            array[2]=obj[0].QPY;
                            array[3]=obj[0].JPY;
                            citypara.push(array);
                       // }
                        return  citypara;
                    }
                },
                hasLocation: 2
            });
//            })
        }
        //初始化page插件
//        isHasAndExe(page,function(){
        page && page.init(function(hash){
            if(/^[\w-]*$/.test(hash)){
                return $("#" + hash + "Page");
            }else{
                return [];
            }
        })
//        })

        //城市插件
        var elem;
        $("#t_from,#t_to").on("click", function () {
            page.open("city");
            $("#cityPage input").attr("onkeydown","if(event.keyCode==32) return false;");
            getCitysByAjax();
            //        if (a.srcElement.id =="goCity") {
            //            document.title = '选择出发城市';
            //        } else {
            //            document.title = '选择到达城市';
            //        }
            elem = this;
        });
        //日历插件
        var week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
            fDate = ['元宵','清明','端午','中秋','重阳','情人','儿童','国庆','圣诞'],
            fromTime;
            $("#BeginTime").click(function () {
               
//                GetServiceTime(function(){
                var date_cookie = StorageHelp.GetStorage("bDate");
                var todayDate = (typeof SERVERTIME!=="undefined")?new Date(SERVERTIME):new Date();
                new Calendar({
                    days: 59,
                    dely: 250,
                    date: todayDate,
                    select: $("#Time").val(),
                    onCreate: function(dom) {
                      new List({
                        floatContainer: document.querySelector(".float-header"),
                        Scroll: (function() {
                          var listeners = [];
                          var top;
                          var scroll = new iScroll("calendars", {
                            onScrollMove: function(e) {
                              top = -this.y;
                              listeners.forEach(function(fn) {
                                fn.call(window);
                              });
                            },
                            onScrollEnd: function() {
                              if (document.querySelector(".float-header")) {
                                document.querySelector(".float-header").style.opacity = 1;
                              }
                            }
                          });
                          return {
                            onscroll: function(fn) {
                              listeners.push(fn);
                            },
                            getScrollTop: function() {
                              return top;
                            },
                            getOffsetTop: function(target) {
                              return target.offsetTop;
                            }
                          }
                        })(),
                        targets: document.querySelectorAll(".calendars-wrapper h3")
                      })
                    },
                    canChange:function(date,el){
                        if($(el).find('div').hasClass('disabled') || $(el).attr('data-day') == (null||"")){
                            /* 给可售期后的添加事件 */
                            var p = $(el).attr('data-day');
                            var policydate =  new Date(zj.date.parse(p).setDate(zj.date.parse(p).getDate()-59));
                            if(policydate.getTime() > todayDate.getTime()){
                                mobileUtil.dialog("预售期为60天，您所选日期将在" + policydate.format('yyyy年MM月dd日') + "开售。","body");
                            }
                            return false;
                        }
                        $(el).parent().parent().parent().find('a').find('div').removeClass('nian_select');
                        return true;
                    },
                    onChange: function(value) {
                        $("#Time").val(value);
                        StorageHelp.SetStorage("bDate",value);
                        var dates = zj.date.parse(value);
                        $("#tselect_Date").html("<span class=\"orange\">" + (dates.getMonth() + 1) + "月" + (dates.getDate())
                            + "日</span>&nbsp;<span>" + "&nbsp;" + getTimes(value.replace(/-0/g, "-"), 1)
                            + "</span><span class=\"tra_left wxTrainBg\"></span>");
                   }
                });                
//                 var c = $.calendar({
//                     mode: "rangeFrom",
//                     //            currentDate: ["2014-8-22"],
//                     startDate:(typeof SERVERTIME!=="undefined")?new Date(SERVERTIME):new Date(),
//                     endDate:PolicyDateValidate.getPolicyDepDate()|| new Date(Date.parse((typeof SERVERTIME!=="undefined")?new Date(SERVERTIME):new Date()) + 19 * 24 * 60 * 60 * 1000),
//                     wrapper: $("#calContainerPage"),
//                     currentDate:[$("#Time").val()],
//                     fn: function (dates) {
//                         console.log(dates)
// //                        console.info($("[data-day='" + dates[2] + "']").not(function () { return !$(".disabled") }));
// //                        $("[data-day='" + dates[2] + "']").not(function () { return !$(".disabled") }).addClass("selected");
//                         var strdate = dates.join('-');
//                         dates = new Date(dates.join('/'));
// //                        console.info(dates.format("yyyy-MM-dd"));
//                         StorageHelp.SetStorage("bDate", dates.format("yyyy-MM-dd"));
//                         $("#Time").val(dates.format("yyyy-MM-dd"));
//                         var week = getTimes(strdate.replace(/-0/g, "-"), 1), dayInfo = "";
//                         if (week.indexOf("周") < 0) {
//                             dayInfo = "&nbsp;&nbsp;" + week;
//                         }
//                         $("#tselect_Date").html("<span class=\"orange\">" + (dates.getMonth() + 1) + "月" + (dates.getDate())
//                             + "日</span>&nbsp;<span>" + "&nbsp;" + getTimes(strdate.replace(/-0/g, "-"), 1)
//                             + "</span><span class=\"tra_left wxTrainBg\"></span>");
//                         page.close();
//                         //                document.title = title;
//                     },
//                     buildContent: function (date, dateStr, classArr, data) {
//                         var htmlStr;
//                         var today=  (typeof SERVERTIME!=="undefined")?new Date(SERVERTIME):new Date();
//                         var todayC=  (typeof SERVERTIME!=="undefined")?new Date(SERVERTIME):new Date();
//                         var tomorrow = new Date(today.setDate(today.getDate()+1));
//                         var afterDay = new Date(today.setDate(tomorrow.getDate()+1));
//                         htmlStr = dateStr ? dateStr : date.getDate();
//                         if(dateStr){
//                            if(fDate.indexOf(dateStr) !== -1){
//                               htmlStr = '<div>' + dateStr + '节</div>';
//                            }else{
//                               htmlStr = '<div>' + dateStr + '</div>';
//                            }
//                         }
//                         if(date.format("yyyyMMdd") == tomorrow.format("yyyyMMdd")){
//                             htmlStr = "明天";
//                         }
//                         if(date.format("yyyyMMdd") == afterDay.format("yyyyMMdd")){
//                             htmlStr = "后天";
//                         }
//                         if(classArr.toString().indexOf("today")>=0){
//                             htmlStr =  date.getDate();
//                         }
//                         if(date.format("yyyyMMdd") == todayC.format("yyyyMMdd")){
//                             htmlStr = "<div class='today'>今天</div>";
//                         }

//                         /* 给可售期后的增加标识 */
//                         if(new Date(date.format('yyyy/MM/dd')) > new Date(this.endDate.format('yyyy/MM/dd'))){
//                             classArr.push('area');
//                         }

//                         return htmlStr;
//                     }
//                 });
//                 $("#calContainerPage .tip").remove();
//                 var startM=c.startDate.getMonth() + 1,startD=c.startDate.getDate(),endM=c.endDate.getMonth() + 1,endD=c.endDate.getDate();
//                 $("#calContainerPage").append('<div class="tip"><p>今天是'+startM+'月'+startD+'号，可购买'+endM+'月'+endD+'号的火车票</p><p>部分车次预售期特殊，请以车站当日公布的为准</p></div>')

//                 /* 给可售期后的添加事件 */
//                 $("#calContainerPage .area.disabled[data-day]").on("click",function(){
//                     var p = $(this).parents('.calendar-wrapper'),day = p.attr('data-year')+'/'+p.attr('data-month')+'/'+$(this).attr('data-day'),policydate =  new Date(new Date(day).setDate(new Date(day).getDate()-59)).format('yyyy年MM月dd日');
//                     mobileUtil.dialog("预售期为60天，您所选日期将在" + policydate + "开售。","#calContainerPage");
//                 });

//                 page.open("calContainer");

            });

        //交换城市
        $("#t_changeCity").on(mobileUtil.start, function () {
            changCity();
        });

        //筛选高铁/动车
//        isHasAndExe($.fn.switchButton,function(){
//        $('#Filter1').switchButton({
//            value: "",
//            values: ["GD|D", ""]
//        });
//        });
        //筛选可售车次
//        isHasAndExe($.fn.switchButton,function(){
//        $('#Filter2').switchButton({
//            value: 0,
//            values: [1, 0]
//        });
//        });
        //订单中心
        $("#myTrainOrders").click(function () {
            if (unLogin()) {
                location.href = WebConfigUrl.MyOrders;
            }
        });
        //特惠专区
        $("#SpecialZone").bind("click", function () {
            var memberId=getWxObj().userid;
            if (memberId != "" && memberId != "0" && memberId != "") {
                location.href = "/flight/flightspecialindex.html?bookerId=" + memberId;
            } else {
                var openid = getWxObj().openid;
                if (openid && (!/undefined/.test(openid) || openid != "")) {
                    openid = "123";
                }
                location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3827070276e49e30&redirect_uri=http://wx.17u.cn/flight/flightspecialindex.html?showwxpaytitle=1&response_type=code&scope=snsapi_base&state=" + openid + "#wechat_redirect";
            }
        });
        //乘机助手
        $("#myhelper2").bind("click", function () {
            location.href = "/flight/myflighthelper.html";
            var memberId=getWxObj().userid;
            if (memberId != "" && memberId != "0" && typeof (memberId) != "undefined") {
                location.href = "/flight/myflighthelper.html?bookerId=" + memberId;
            } else {
                var openid = getWxObj().openid;
                if (openid && (!/undefined/.test(openid) || openid != "")) {
                    openid = "123";
                }
                location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3827070276e49e30&redirect_uri=http://wx.17u.cn/flight/myflighthelper.html?showwxpaytitle=1&response_type=code&scope=snsapi_base&state=" + openid + "#wechat_redirect";
            }
        });

        //火车票预订
        $("#index").bind("click", function () {
            location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3827070276e49e30&redirect_uri=http://wx.17u.cn/train/trainquery.html?showwxpaytitle=1&response_type=code&scope=snsapi_base&state=" + 123 + "#wechat_redirect";
        });
        //个人中心
        $("#myflight").bind("click", function () {
            location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3827070276e49e30&redirect_uri=http://wx.17u.cn/flight/myflight.html?showwxpaytitle=1&response_type=code&scope=snsapi_base&state=" + 123 + "#wechat_redirect";
        });
        function initCity() {
            //var city = StorageHelp._getStorage("City"),JsonCity;
            var city = StorageHelp.GetStorage("City"), JsonCity;
            if (!!city) {
                JsonCity = JSON.parse(city);
                $("#t_from .t_incity input").val(JsonCity.bName);
                $("#t_from .CN").val(JsonCity.bName);
                $("#t_from .PY").val(JsonCity.beginCity);
                $("#t_to .t_incity input").val(JsonCity.aName);
                $("#t_to .CN").val(JsonCity.aName);
                $("#t_to .PY").val(JsonCity.arrCity);
            }
//            getCitysByAjax();
        }

        function initDate() {
            GetServiceTime(function(){
                var today = new Date((typeof SERVERTIME!=="undefined")?new Date(SERVERTIME):new Date()), year = today.getFullYear(), month = today.getMonth() + 1, day = today.getDate(), y, m, d;
                month = month < 10 ? "0" + month : month;
                day = day < 10 ? "0" + day : day;
                var sDate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
                var date_cookie = StorageHelp.GetStorage("bDate");
                var toDate = date_cookie ? ((Date.parse(date_cookie.replace(/-/g, "/")) >= Date.parse(sDate.replace(/-/g, "/"))) ? date_cookie : GetDateStr(1)) : GetDateStr(1); //dateDiff(sDate.replace(/-0/g, "-"), 1)):dateDiff(sDate.replace(/-0/g, "-"), 1);
                var week = getTimes(toDate.replace(/-0/g, "-"), 1), dayInfo = "";
                if (week.indexOf("周") < 0) {
                    dayInfo = "&nbsp;&nbsp;" + week;
                }
                var tDateArr = toDate.split("-");
                y = tDateArr[0]; m = tDateArr[1]; d = tDateArr[2];
                $("div#BeginTime input[type=hidden]").val(toDate);
                $("#tselect_Date").html("<span class=\"orange\">" + m + "月" + d + "日</span><span>" + dayInfo
                    + "&nbsp;&nbsp;" + getTimes(toDate.replace(/-0/g, "-"), 0));
                return toDate;
            });
        }

        function initQhistory() {
            var qhistorystr = StorageHelp.GetStorage("queryhistory"), historyhtml = "";
            if (qhistorystr != "" && JSON.parse(qhistorystr).length > 0) {
                var his = JSON.parse(qhistorystr);
                his.length > 5 && (his.length = 5);
                for (var i = 0, len = his.length; i < len; i++) {
                    historyhtml += "<li class='touchablelist' onclick=\"_tcTraObj._tcTrackEvent('click','chaxunlishi','wxtrain','')\"><span py=" + his[i].beginCity + ">" + his[i].bName + "</span>至<span py=" + his[i].arrCity + ">" + his[i].aName + "</span></li>";
                }
            }
            if(historyhtml==""){
                $(".linebox").addClass("none");
            }
            $("#queryhistory .querybox_cont ul").html(historyhtml);
            $(".querybox_cont li").on("touchstart", function () {
                var _this = this;
                timer = setTimeout(function () {
                    var tip = $.dialog({
                        autoOpen: false,
                        closeBtn: false,
                        //                    mask:false,
                        width: 200,
                        closeTime: 1000,
                        maskClick: function () {
                            tip.destroy();
                        },
                        content: '<button class="del touchable">删除</button>'
                    });
                    tip.open();
                    $(".ui-dialog-content").css({ padding: 0 });
                    $(".ui-dialog .del").on("click", function () {
                        $(_this).remove();
                        tip.destroy();
                        //从缓存里面删除
                        var o = {}; o.beginCity = $("span", _this).eq(0).attr("py"); o.arrCity = $("span", _this).eq(1).attr("py"); o.bName = $("span", _this).eq(0).html(); o.aName = $("span", _this).eq(1);
                        var source = JSON.parse(StorageHelp.GetStorage("queryhistory"));
                        source.shift(o);
                        StorageHelp.SetStorage("queryhistory", JSON.stringify(source));
                    });

                }, 500);
            }).on("touchmove", function () {
                    clearTimeout(timer);
            }).on("click", function () {
                    if ($(".ui-mask").html() == null) {//判断 如果出现删除按钮则不自动填充城市
                        var bCity = $("span", this).eq(0);
                        var aCity = $("span", this).eq(1);
                        $("#t_goCity").val(bCity.html());
                        $("[name='BeginPlaceCn']").val(bCity.html());
                        $("[name='BeginPlace']").val(bCity.attr("py"));
                        $("#t_backCity").val(aCity.html());
                        $("[name='ArrPlaceCn']").val(aCity.html());
                        $("[name='ArrPlace']").val(aCity.attr("py"));
                    }
                }).on("touchend", function () {
                    clearTimeout(timer);
                });
            //        alert($(window).height())
            //        alert(document.body.offsetHeight )
            var conH=$(window).height() - 450;
            $(".querybox_cont").height(conH>24?conH:24);
            //        new TouchScroll({id:'querybox_cont','width':5,'opacity':0.7,color:'#555',minLength:20})

            //new iScroll("querybox_cont", { hScrollbar: false, vScrollbar: false })
        }

        function changCity() {
            var j = $("input#t_goCity").val(),
                k = $("input#t_backCity").val(),
                l = $("#t_from .PY").val(),
                m = $("#t_to .PY").val();
            $("#t_backCity").addClass("flyleft");
            $("#t_goCity").addClass("flyright");
            setTimeout(function () {
                $("#t_backCity").removeClass("flyleft");
                $("#t_goCity").removeClass("flyright");
                $("input#t_goCity").val(k);
                $("#t_backCity").val(j);

                $("#t_from .PY").val(m);
                $("#t_from .CN").val(k);

                $("#t_to .PY").val(l);
                $("#t_to .CN").val(j);
            }, 500);
        }
       
        
        //提交表单
        //$("form#t_myform").submit(function () {
        $("form #t_search").click(function (e) {
            e.preventDefault();
            var bCity = $("#t_from .PY").val().trim(),
                aCity = $("#t_to .PY").val().trim(),
                //openid = $("input[type=hidden][name='openid']").val().trim(),
                //token = $("input[type=hidden][name='token']").val().trim(),
                openid = getWxObj().openid || getCooperateUser().openid,
                token = getWxObj().token || getCooperateUser().token,
                bname = $("#t_goCity").val().trim(),
                aname = $("#t_backCity").val().trim(),
                time = $("div#BeginTime input[type=hidden]").val().trim(),
                aurl = $("form#t_myform").attr("aurl");
            $("input[type=hidden][name='openid']").val(openid);
            $("input[type=hidden][name='token']").val(token);

            if (bCity == "" || bname == "") {
                mobileUtil.dialog("请选择出发城市！", "#mainPage");
                return false;
            }

            if (aCity == "" || aname == "") {
                mobileUtil.dialog("请选择到达城市！", "#mainPage");
                return false;
            }

            if (time == "") {
                mobileUtil.dialog("请选择出发日期！", "#mainPage");
                return false;
            }

            if (bCity == aCity) {
                mobileUtil.dialog("出发站点不能和到达站点相同！", "#mainPage");
                return false;
            }

            var city = {
                beginCity: bCity,
                arrCity: aCity,
                bName: bname,
                aName: aname
            }
            //        StorageHelp._addStorage("City", JSON.stringify(city)); //添加存储
            //        StorageHelp._addStorage("bDate", time); //添加存储

            StorageHelp.SetStorage("City", JSON.stringify(city)); //添加存储
            StorageHelp.SetStorage("bDate", time); //添加存储
            StorageHelp.SetStorage("filter", ""); //添加存储

            aurl = aurl.replace("{begincity}", bCity)
                .replace("{tocity}", aCity)
                .replace("{time}", time.replace(/-/g, ''))
                .replace("{openid}", openid )
                .replace("{token}", token);

            //console.log('openid: '  + openid);
            //console.log('token: '  + token);

            /*记录最近查询的线路*/
            var qhistorystr = StorageHelp.GetStorage("queryhistory");
            if (qhistorystr == "") {
                qhistorystr = "[]";
            }
            var qhistory = JSON.parse(qhistorystr);
            //开始记录浏览历史
            qhistory.forEach(function (v, i) {
                if (v["beginCity"] == city.beginCity && v["arrCity"] == city.arrCity) {
                    qhistory.splice(i, 1);
                }
            });
            qhistory.unshift(city);
            qhistorystr = JSON.stringify(qhistory);
            StorageHelp.SetStorage("queryhistory", qhistorystr);
            //alert(123)
            //location.href = WebConfigUrl.wxTrainUrl+aurl;
            //this.action = WebConfigUrl.wxTrainUrl + "trainsearch.html";
            var surl = $("#t_myform").serialize().split("&"),turl=[];
            $.each(surl,function(i,v){
                if(!(v.indexOf("qingxuan") != -1)){
                    turl.push(v);
                }
            })
            turl = turl.join("&");
            location.href = WebConfigUrl.wxTrainUrl + "trainsearch.html?"+turl;
        });


        //tab切換到机票頁面
        $('#IsFlight').bind('click', function () {
            $(this).addClass("border_bottom_green");
            $("#IsTrain").removeClass("border_bottom_green");
            if (location.href.indexOf('wx.17u.cn/train/') != -1) {
                location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3827070276e49e30&redirect_uri=http://wx.17u.cn/flight/index.html&response_type=code&scope=snsapi_base&state=123&connect_redirect=1#wechat_redirect");
            } else {
                location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3827070276e49e30&redirect_uri=http://wx.17u.cn/wxflighttest/index.html&response_type=code&scope=snsapi_base&state=123&connect_redirect=1#wechat_redirect");
            }
        });



        function initTip(){
           $.ajax({
                //url:"http://10.1.204.199:7577/huochepiao/resource/Notice/GetNoticeInfo",
                //url:WebConfigUrl.GetNoticeInfo,
                //url: "GetNoticeInfo",
                url: "GetNoticeInfoNew",
                type: "GET",
                //data:{code:100,platId:501},
                data:{code:100,platId:4}, // 渠道代码 1：PC  2：手Q  3：APP  4：微信
                dataType:"json",
                timeout:3000,
                success:function (data){
                    //data = {"Status":true,"Code":"100","PlatId":4,"Content":"","Link":"http://wj.qq.com/survey.html?type=survey&id=156568&hash=1708","Title":"诚邀您参与每月一度用户满意度调查-您的满意是我们前行的最大动力！"};
                    //console.log(data)
                    if(data.Status){
                        if(/调查/.test(data.Title)){
                            $('.f-tip').show().find('span').html(data.Title);
                            data.Link && $(".f-tip").parent("a").attr("href", data.Link+'&openid='+(getWxObj().openid || StorageHelp.GetStorage("WxOpenid")));
                        }else{
                            $('.f-tip').show().find('span').html(data.Title);
                            data.Link && $(".f-tip").parent("a").attr("href", data.Link);
                        }
                    }
                    //console.log(data.Link+'&openid='+(getWxObj().openid || StorageHelp.GetStorage("WxOpenid")))
                },
                complete:function(req,state){
                    if(state=="timeout"){
                        req.abort();
                    }
                }
            });
        }


        //获取banner
        function getBanner(){
            var url = '';
            if (location.href.indexOf('wx.17u.cn/train/') != -1) {
                 url = '/web/wxhome/WeChatHome/GetTxAdvertise?pageCode=2&siteCode=2';
            } else {
                url = '/web/wxhometest/WeChatHome/GetTxAdvertise?pageCode=2&siteCode=2';
            }
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'JSON',
                timeout: 20000,
                success: function(data){
                    data = JSON.parse(data);
                    if(data.AdvertiseInfoList.length > 0){
                        createBanner(data.AdvertiseInfoList);

                        $('.slideBox').slider({
                            content:'.slideCont',
                            item:'.slideItem',
                            loop: true,
                            fn:function(){
                                var i = this.index;
                                $('.slidePoint2 span').removeClass('active');
                                $('.slidePoint2 span').eq(i).addClass('active');
                            }
                        });
                        var w = $('.slidePoint2').width();
                        $('.slidePoint2').css('margin-left', -w/2 + 'px');
                    }
                }
            });
        }


        //广告图
        function createBanner(list){
            var bannerHTML = '';
            var pointsHTML = '';
            var pointWrap = '';
            for(var i = 0; i < list.length; i++){
                bannerHTML += '<li class="slideItem"><a href="'+list[i].SkipUrl+'" onclick="_tcTraObj._tcTrackEvent(\'click\',\'guanggaotu'+i+1+'\',\'wxhome\',\'\')"><img src="'+list[i].ImageUrl+'" alt="" /></a></li>';
                if(i == 0){
                    pointsHTML += '<span class="active"></span>';
                }else{
                    pointsHTML += '<span></span>';
                }
            }
            if(list.length > 1){
                pointWrap = '<div class="slidePoint2">'
                +	pointsHTML
                +'</div>';
            }
            var temp = '<div id="ad" class="slideBox">'
                +	'<div class="slideMain">'
                +    	'<ul class="slideCont">'
                +        	bannerHTML
                +    	'</ul>'
                +    	pointWrap
                +	'</div>'
                +'</div>';
            $('body').prepend(temp);
        }

        //    $(function () {
        initCity(); //初始化城市
        initDate(); //初始化日期
        initQhistory(); //初始化查询历史
        initTip(); //初始化提示
        getBanner(); //获取广告图
        //        $(".slider").slider({ //幻灯片
        //            loop: true
        //        });
        //    });
        return ;
    }
})();


//计算日期
function GetDateStr(AddDayCount) {
    var dd = (typeof SERVERTIME!=="undefined")?new Date(SERVERTIME):new Date();
    dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1); //获取当前月份的日期，不足10补0
    var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
    return y + "-" + m + "-" + d;
}


//计算明天日期
function dateDiff(e, b) {
    var a = e.split("-");
    var c = isLeap(a[0]);
    var ma = [["1", "3", "5", "7", "8", "10"], ["4", "6", "9", "11"]];
    if (b == "1") {
        if ((checkArray(a[1], ma[0]) && (a[2] == "31")) || (checkArray(a[1], ma[1]) && (a[2] == "30")) || (a[1] == "2" && a[2] == "28" && !c) || (a[1] == "2" && a[2] == "29" && c)) {
            return a[0] + "-" + (a[1] * 1 + 1) + "-" + 1
        } else {
            if (a[1] == "12" && a[2] == "31") {
                return (a[0] * 1 + 1) + "-1-1"
            } else {
                a[1]= a[1]*1<10?"0" + a[1] : a[1];
                a[2]= a[2]*1+1<10?"0" + a[2]*1+1 : a[2]*1+1;
                return a[0] + "-" + a[1] + "-" + a[2] ;
            }
        }
    } else {
        if (b == "0") {
            if (checkArray(a[1] - 1, ma[0]) && (a[2] == "1")) {
                return a[0] + "-" + (a[1] - 1) + "-31"
            } else {
                if (checkArray(a[1] - 1, ma[1]) && (a[2] == "1")) {
                    return a[0] + "-" + (a[1] - 1) + "-30"
                } else {
                    if (a[1] == "1" && a[2] == "1") {
                        return (a[0] - 1) + "-12-31"
                    } else {
                        if (a[1] == "3" && a[2] == "1" && !c) {
                            return a[0] + "-2-28"
                        } else {
                            if (a[1] == "3" && a[2] == "1" && c) {
                                return a[0] + "-2-29"
                            } else {
                                return a[0] + "-" + a[1] + "-" + (a[2] - 1)
                            }
                        }
                    }
                }
            }
        } else {
            return
        }
    }
}
function isLeap(a) {
    return ((a % 4 == 0 && a % 100 != 0) || a % 400 == 0) ? true : false
}
function checkArray(e, b) {
    for (var c = 0, d = b.length; c < d; c++) {
        if (b[c] == e) {
            return true
        }
    }
    return false
}
//取得日期格式化后的中文名
function getTimes(val, type) {
    var date = val.split("-");
    var year = date[0], month = date[1] - 1, day = date[2];
    var dt = new Date(year, month, day);
    var wn = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
    var week = wn[dt.getDay()];

    if (type == 1) {
        var date = (typeof SERVERTIME!=="undefined")?new Date(SERVERTIME):new Date();
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        m = m < 10 ? "0" + m : m;
        d = d < 10 ? "0" + d : d;
        var now = y + "-" + m + "-" + d

        if (getTimeDiff(now, val) == 0) week = "今天";
        if (getTimeDiff(now, val) == 1) week = "明天";
        if (getTimeDiff(now, val) == 2) week = "后天";
    }

    return week;
}
//计算"今天","明天","后天"的计算器
function getTimeDiff(g, b) {
    var begin1 = g.split("-");
    var end1 = b.split("-");
    var date1 = new Date(begin1[0], Number(begin1[1]) - 1, begin1[2]);
    var date2 = new Date(end1[0], Number(end1[1]) - 1, end1[2]);
    var m = parseInt(Math.abs(date2 - date1) / 1000 / 60 / 60 / 24);
    return m;
}

//判断组件是否存在
/*function  isHasAndExe(plug,inst){
    if(plug){
        inst();
    }else{
        setTimeout(function(){
            isHasAndExe(plug,inst);
        },1000)
    }
}*/
var PolicyDateValidate = {
    presellStratDate	 : new Date(2014, 11, 1), //预售日期
    presellChangeEndDate : new Date(2014, 11, 6), //预售变动截止日期
    presellDepStartDate  : new Date(2014, 11, 30), //预售发车起始时间
    presellAdvanceDays : 60, //新政策预售提前天数
    getcurrentServerTime : function(){return (typeof SERVERTIME !== "undefined") ? new Date(SERVERTIME) : new Date()},//获取服务器时间

    /*
     * 根据传入日期获取最早发车日期, 默认当前时间 */
    getPolicyDepDate : function (date){

        var _this = this,
            currentTime = date || this.getcurrentServerTime(),//当前服务器时间
            currentDate = new Date(currentTime.getFullYear(), currentTime.getMonth() ,currentTime.getDate()),//当前日期
            canPresell = currentTime >= this.presellStratDate; //是否可以预售

        //获取当前站点出发日期
        var getDepDate = function(){
            if(currentDate < _this.presellStratDate){//当前时间 12.1 之前无法预售
                return null;
            }
            /*	2014.12.1 ~ 2014.12.7
             预售时间等差递增
             2014.12.30 ~ 2015.2.7 步长 7 */
            else if(currentDate >= _this.presellStratDate && currentDate <= _this.presellChangeEndDate){

                var dDays = currentDate.getDate() - _this.presellStratDate.getDate();
                return new Date(_this.presellDepStartDate.getTime() + dDays * 7 * 24 * 60 * 60 * 1000);
            }
            else{//2014, 12, 7 以后，统一提前60天购票
                return new Date(currentDate.getTime() + (_this.presellAdvanceDays - 1) * 24 * 60 * 60 * 1000);
            }
        }


        // 预售当天7:00 之前，可以预售 至有效日； 7:00之后后延1日
        var depDate = getDepDate();
        if(canPresell == false || depDate == null) {
            return null;
        }
        else{
            return depDate;
        }
    }
}

/*wx.ready(function(){
    wx.getLocation({
        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function (res) {
            var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            var speed = res.speed; // 速度，以米/每秒计
            var accuracy = res.accuracy; // 位置精度

            var latlongitude = {
                latitude: latitude,
                longitude: longitude
            };
            $.cookie('latlongitude', JSON.stringify(latlongitude), {
                expires: new Date(new Date().getTime() + (365 * 24 * 3600 * 1000)).toUTCString(),
                path: '/',
                domain: '.17u.cn'
            });
        }
    });
});*/

/*
function Chinese(num){
    if(!/^\d*(\.\d*)?$/.test(num))throw(new Error("Number is wrong!"));
    var AA = new Array("","一","二","三","四","五","六","七","八","九");
    var BB = new Array("","十","百");
    var a = (""+ num), k = 0, re = "";
    if(a.length>=4){ return num; }
    for(var i=a.length; i>0; i--){
        if(a.charAt(i-1) != 0) re = AA[a.charAt(i-1)] + BB[k%4] + re; k++;
    }
    return re;
}*/


