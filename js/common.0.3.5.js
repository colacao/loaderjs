/*from tccdn minify at 2015-12-31 0:13:38,file：/touch/weixin/train/js/public/common.0.3.5.js?v=201512302060*/
Zepto.cookie = function (h, m, j) {
    if (typeof m != "undefined") {
        j = j || {};
        if (m === null) {
            m = "";
            j.expires = -1
        }
        var f = "";
        if (j.expires && (typeof j.expires == "number" || j.expires.toUTCString)) {
            var d;
            if (typeof j.expires == "number") {
                d = new Date();
                d.setTime(d.getTime() + (j.expires * 24 * 60 * 60 * 1000))
            } else {
                d = j.expires
            }
            f = "; expires=" + d.toUTCString()
        }
        var k = j.path ? "; path=" + j.path : "";
        var e = j.domain ? "; domain=" + j.domain : "";
        var l = j.secure ? "; secure" : "";
        document.cookie = [h, "=", encodeURIComponent(m), f, k, e, l].join("")
    } else {
        var c = null;
        if (document.cookie && document.cookie != "") {
            var b = document.cookie.split(";");
            for (var g = 0; g < b.length; g++) {
                var a = Zepto.trim(b[g]);
                if (a.substring(0, h.length + 1) == (h + "=")) {
                    c = decodeURIComponent(a.substring(h.length + 1));
                    break
                }
            }
        }
        return c
    }
};
$.fn.show = function () {
    this.each(function (c, d) {
        d.style.display = "block"
    });
    return this
};
var StorageHelp = {
    SetStorage: function (e, g) {
        if (window.localStorage) {
            var h = window.localStorage;
            try {
                h.setItem(e, g)
            } catch (f) {
                $.cookie(e, g, { expires: 30 })
            }
        } else {
            $.cookie(e, g, { expires: 30 })
        }
    }, GetStorage: function (d) {
        if (window.localStorage) {
            var f = window.localStorage;
            try {
                f = f.getItem(d);
                if (f == null || f == "") {
                    return $.cookie(d) == null ? "" : $.cookie(d)
                } else {
                    return f
                }
            } catch (e) {
                return $.cookie(d) == null ? "" : $.cookie(d)
            }
        } else {
            return $.cookie(d) == null ? "" : $.cookie(d)
        }
    }
};
var mobileUtil = {
    touch: ("createTouch" in document), start: this.touch ? "touchstart" : "mousedown", move: this.touch ? "touchmove" : "mousemove", end: this.touch ? "touchend" : "mouseup", click: this.touch ? "tap" : "click", dialog: function (g, f, e, a) {
        if ($(f + " #showTip").length < 1) {
            var d = { _content_: g, _confirm_: a || "确认" };
            var b = $(this.dialogTpl().replace(/_[^_]*_/g, function (c) {
                return d[c]
            }));
            $(".msg-btn", b[1]).bind("click", function () {
                $("#bgTip").remove();
                $("#showTip").remove();
                startScroll();
                e && e()
            });
            $(f).append(b);
            stopScroll()
        }
    }, dialogTpl: function () {
        return '<div id="bgTip" style="display: block;"></div><div id="showTip"><div class="msg-content">_content_</div><div class="msg-btn"><button style="margin:0;" class="btn touchable">_confirm_</button></div></div>'
    }, confirm: function (g, f, e, a, d, k) {
        var c = { _cancle_: a || "取消", _confirm_: d || "确认", _content_: g }, b = $(this.confirmTpl().replace(/_[^_]*_/g, function (h) {
            return c[h]
        }));
        $(".cancle", b).bind(this.click, function () {
            startScroll();
            k && k();
            b.remove()
        });
        $(".confirm", b).bind(this.click, function () {
            startScroll();
            e && e();
            b.remove()
        });
        $(f).append(b);
        stopScroll()
    }, confirmTpl: function () {
        return '<div id="bgTip" style="display: block;"><div id="showTip"><div class="msg-content">_content_</div><div class="msg-btn double"><button  class="cancle btn graybt touchable">_cancle_</button><button  class="confirm btn touchable">_confirm_</button></div></div></div>'
    }
};
function stopScroll() {
    $("body").on("touchmove", function (a) {
        a.preventDefault();
    })
}
function startScroll() {
    $("body").off("touchmove")
}
var modal = {
    checkParam: function (param) {
        var element = typeof param == 'string' ? $('#' + param) : param;
        return element;
    },
    into: function (modalDom, modalBgDom) {
        this.checkParam(modalDom).removeClass("modal-out").addClass("modal-in");
        this.checkParam(modalBgDom).addClass("modal-bg-visible");
        stopScroll();
    },
    out: function (modalDom, modalBgDom) {
        this.checkParam(modalDom).removeClass("modal-in").addClass("modal-out");
        this.checkParam(modalBgDom).removeClass("modal-bg-visible");
        startScroll();
    }
};
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds(),
        "w+": Date.getWeek(this.getDay())
    };


    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
    return format;
};
Date.getWeek = function (e) {
    this.aWeek = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return this.aWeek[e];
}
Date.ParseString = function (e) {
    var b = /(\d{4})-(\d{1,2})-(\d{1,2})(?:\s+(\d{1,2}):(\d{1,2}):(\d{1,2}))?/i,
        a = b.exec(e),
        c = 0,
        d = null;
    if (a && a.length) {
        if (a.length > 5 && a[6]) {
            c = Date.parse(e.replace(b, "$2/$3/$1 $4:$5:$6"));
        } else {
            c = Date.parse(e.replace(b, "$2/$3/$1"));
        }
    } else {
        c = Date.parse(e);

    }
    if (!isNaN(c)) {
        d = new Date(c);
    }
    return d;
};

var showLoadingCount = 0;
function showLoading() {
    if ($(".opLayer").get(0) == null)
        $("body").append('<div class="opLayer"><div class="loading"><em class="loadingImg"></em></div></div>');
    showLoadingCount++;
}
function hideLoading(isClosed) {
    if (isClosed) showLoadingCount = 0;
    else showLoadingCount--;
    if (showLoadingCount <= 0) {
        showLoadingCount = 0;
        $(".opLayer").remove();
    }
}
function showMsgLoading(msg, sec, backFn) {
    $("body").append('<div class="opMsgLayer"><div class="loading">' + msg + '</div></div>');
    loadTimeout = setTimeout(function () {
        hideMsgLoading();
        if (backFn) backFn();
    }, sec)
}
function hideMsgLoading() {
    $(".opMsgLayer,.opLayer").remove();
    if (typeof loadTimeout != 'undefined') {
        clearTimeout(loadTimeout);
    }
}
//反馈信息提交成功或取消订单成功弹框显示

function showConfirm(conText) {
    $("body").append('<div class="ex-popoup-hint exph-suc"><s></s><span class="con">' + conText + '</span></div>');
    setTimeout(function () {
        $(".ex-popoup-hint").hide();
    }, 2000);
}
//半透明黑框提示
function showToast(toastText, delay) {
    if (toastText && $('#toastEle').length == 0) {
        $('body').append('<div id="toastEle" class="ui-toast"><div class="ui-toast-padding"><div class="ui-toast-content">' + toastText + '</div></div></div>')
    } else {
        return;
    }
    var toastEle = $('#toastEle');
    toastEle.css({
        'margin-top': -Math.round(toastEle.offset().height / 2) + 'px',
        "left": Math.round(($(window).width() - toastEle.width()) / 2) + 'px'
    });
    setTimeout(function () {
        toastEle.css({ opacity: 0 });
        setTimeout(function () {
            toastEle.remove();
        }, 1000);
    }, (delay || 2000));
}
//获得url中的queryString OBJ
function getRequest() {
    var searchString = window.location.search.substring(1),
        params = searchString.split("&"),
        hash = {};

    if (searchString == "") return {};
    for (var i = 0; i < params.length; i++) {
        // 获取等号位置
        var pos = params[i].indexOf('=');
        if (pos == -1) { continue; }
        // 获取name 和 value
        var paraName = params[i].substring(0, pos),
            paraValue = params[i].substring(pos + 1);
        hash[paraName] = paraValue;
    }
    return hash;
}
/*function getRequest() {
    var url = location.search;
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
        }
    }
    return theRequest;
}*/
function getWxObj() {
    var str = $.cookie("WxUser");
    var theRequest = new Object();
    if (str) {
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].slice(0, strs[i].indexOf('='))] = strs[i].slice(strs[i].indexOf('=') + 1);
        }
    }
    return theRequest;
}
//获取wx地址
function getWXaddress(callback) {
    var domain = location.href;
    showLoading();
    $.ajax({
        url: "wechatapi.html",
        type: 'get',
        data: {
            url: domain.split('#')[0]
        },
        timeout: 10000,
        success: function (res) {
            var jsonstr = typeof res;
            if (jsonstr == "string") {
                var ha = JSON.parse(res);
            } else {
                var ha = res;
            }
            hideLoading();
            WeixinJSBridge.invoke('editAddress', {
                "appId": "wx3827070276e49e30",
                "scope": "jsapi_address",
                "signType": ha.SignType,
                "addrSign": ha.AddrSign,
                "timeStamp": ha.TimeStamp,
                "nonceStr": ha.NonceStr
            }, function (res) {
                hideLoading();
                if (res.err_msg == "edit_address:ok") {
                    callback && callback(res);
                }
            })
        },
        error: function (xml, html) {
            hideLoading();
            mobileUtil.dialog("服务器繁忙，请稍后重试！", "body");
        },
        complete: function () { }
    });
}
/*获取机票cookie*/
function getCooperateUser() {
    var str = $.cookie("CooperateWxUser") || $.cookie("CooperateUser");
    var theRequest = new Object();
    if (str) {
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].slice(0, strs[i].indexOf('='))] = strs[i].slice(strs[i].indexOf('=') + 1);
        }
    }
    return theRequest;
}

; (function (root) {
    // Store.js
    var store = {},
        win = window,
        doc = win.document,
        localStorageName = 'localStorage',
        scriptTag = 'script',
        storage

    store.disabled = false
    store.version = '1.3.17'
    store.set = function (key, value) { }
    store.get = function (key, defaultVal) { }
    store.has = function (key) { return store.get(key) !== undefined }
    store.remove = function (key) { }
    store.clear = function () { }
    store.transact = function (key, defaultVal, transactionFn) {
        if (transactionFn == null) {
            transactionFn = defaultVal
            defaultVal = null
        }
        if (defaultVal == null) {
            defaultVal = {}
        }
        var val = store.get(key, defaultVal)
        transactionFn(val)
        store.set(key, val)
    }
    store.getAll = function () { }
    store.forEach = function () { }

    store.serialize = function (value) {
        return JSON.stringify(value)
    }
    store.deserialize = function (value) {
        if (typeof value != 'string') { return undefined }
        try { return JSON.parse(value) }
        catch (e) { return value || undefined }
    }

    // Functions to encapsulate questionable FireFox 3.6.13 behavior
    // when about.config::dom.storage.enabled === false
    // See https://github.com/marcuswestin/store.js/issues#issue/13
    function isLocalStorageNameSupported() {
        try { return (localStorageName in win && win[localStorageName]) }
        catch (err) { return false }
    }

    if (isLocalStorageNameSupported()) {
        storage = win[localStorageName]
        store.set = function (key, val) {
            if (val === undefined) { return store.remove(key) }
            storage.setItem(key, store.serialize(val))
            return val
        }
        store.get = function (key, defaultVal) {
            var val = store.deserialize(storage.getItem(key))
            return (val === undefined ? defaultVal : val)
        }
        store.remove = function (key) { storage.removeItem(key) }
        store.clear = function () { storage.clear() }
        store.getAll = function () {
            var ret = {}
            store.forEach(function (key, val) {
                ret[key] = val
            })
            return ret
        }
        store.forEach = function (callback) {
            for (var i = 0; i < storage.length; i++) {
                var key = storage.key(i)
                callback(key, store.get(key))
            }
        }
    } else if (doc.documentElement.addBehavior) {
        var storageOwner,
            storageContainer
        // Since #userData storage applies only to specific paths, we need to
        // somehow link our data to a specific path.  We choose /favicon.ico
        // as a pretty safe option, since all browsers already make a request to
        // this URL anyway and being a 404 will not hurt us here.  We wrap an
        // iframe pointing to the favicon in an ActiveXObject(htmlfile) object
        // (see: http://msdn.microsoft.com/en-us/library/aa752574(v=VS.85).aspx)
        // since the iframe access rules appear to allow direct access and
        // manipulation of the document element, even for a 404 page.  This
        // document can be used instead of the current document (which would
        // have been limited to the current path) to perform #userData storage.
        try {
            storageContainer = new ActiveXObject('htmlfile')
            storageContainer.open()
            storageContainer.write('<' + scriptTag + '>document.w=window</' + scriptTag + '><iframe src="/favicon.ico"></iframe>')
            storageContainer.close()
            storageOwner = storageContainer.w.frames[0].document
            storage = storageOwner.createElement('div')
        } catch (e) {
            // somehow ActiveXObject instantiation failed (perhaps some special
            // security settings or otherwse), fall back to per-path storage
            storage = doc.createElement('div')
            storageOwner = doc.body
        }
        var withIEStorage = function (storeFunction) {
            return function () {
                var args = Array.prototype.slice.call(arguments, 0)
                args.unshift(storage)
                // See http://msdn.microsoft.com/en-us/library/ms531081(v=VS.85).aspx
                // and http://msdn.microsoft.com/en-us/library/ms531424(v=VS.85).aspx
                storageOwner.appendChild(storage)
                storage.addBehavior('#default#userData')
                storage.load(localStorageName)
                var result = storeFunction.apply(store, args)
                storageOwner.removeChild(storage)
                return result
            }
        }

        // In IE7, keys cannot start with a digit or contain certain chars.
        // See https://github.com/marcuswestin/store.js/issues/40
        // See https://github.com/marcuswestin/store.js/issues/83
        var forbiddenCharsRegex = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g")
        var ieKeyFix = function (key) {
            return key.replace(/^d/, '___$&').replace(forbiddenCharsRegex, '___')
        }
        store.set = withIEStorage(function (storage, key, val) {
            key = ieKeyFix(key)
            if (val === undefined) { return store.remove(key) }
            storage.setAttribute(key, store.serialize(val))
            storage.save(localStorageName)
            return val
        })
        store.get = withIEStorage(function (storage, key, defaultVal) {
            key = ieKeyFix(key)
            var val = store.deserialize(storage.getAttribute(key))
            return (val === undefined ? defaultVal : val)
        })
        store.remove = withIEStorage(function (storage, key) {
            key = ieKeyFix(key)
            storage.removeAttribute(key)
            storage.save(localStorageName)
        })
        store.clear = withIEStorage(function (storage) {
            var attributes = storage.XMLDocument.documentElement.attributes
            storage.load(localStorageName)
            while (attributes.length) {
                storage.removeAttribute(attributes[0].name)
            }
            storage.save(localStorageName)
        })
        store.getAll = function (storage) {
            var ret = {}
            store.forEach(function (key, val) {
                ret[key] = val
            })
            return ret
        }
        store.forEach = withIEStorage(function (storage, callback) {
            var attributes = storage.XMLDocument.documentElement.attributes
            for (var i = 0, attr; attr = attributes[i]; ++i) {
                callback(attr.name, store.deserialize(storage.getAttribute(attr.name)))
            }
        })
    }

    try {
        var testKey = '__storejs__'
        store.set(testKey, testKey)
        if (store.get(testKey) != testKey) { store.disabled = true }
        store.remove(testKey)
    } catch (e) {
        store.disabled = true
    }
    store.enabled = !store.disabled

    root.store = store;
    root.storeWithExpiration = {
        set: function (key, val, exp) { store.set(key, { val: val, exp: exp, time: new Date().getTime() }); },
        get: function (key) { var info = store.get(key); if (!info) { return null; }; if (new Date().getTime() - info.time > info.exp) { return null; } return info.val }
    };
})(window);




var browser = {
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {//移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}



/*
 * getDate  获取服務器时间
 * getUnix: 获取服務器时间戳
 * isWorkTime: 当前时间是否在工作时间內
 * getServertime: 获取服务器时间請求
 * */

var utilityServertime = function () {
    var servertime;
    function servertimeRequest(fn) {
        $.ajax({
            url: "GetServiceTime",
            dataType: "jsonp",
            timeout: 3000,
            success: function (obj) {
                if (obj.ResponseStatus) {
                    var serverTimeStr = obj.ResponseMessage.replace(/-/g, '/');
                    //serverTimeStr = "2015-03-06 22:59:50";
                    var localtime = new Date();
                    servertime = { server: new Date(Date.parse(serverTimeStr)), local: localtime };
                    var localtimeStr = localtime.getFullYear() + '/' + (localtime.getMonth() + 1) + '/' + localtime.getDate() + ' ' + localtime.getHours() + ':' + localtime.getMinutes() + ':' + localtime.getSeconds();
                    store.set('TRAIN_SERVERTIME', { serverTimeStr: serverTimeStr, localtimeStr: localtimeStr });
                    //StorageHelp.SetStorage('TRAIN_SERVERTIME', JSON.stringify({serverTimeStr: serverTimeStr, localtimeStr: localtimeStr}));
                }
            },
            complete: function () {
                if (fn) fn();
            }
        });
    }

    function getServertime(fn) {
        var storageServertime = store.get('TRAIN_SERVERTIME');
        //var storageServertime = StorageHelp.GetStorage('TRAIN_SERVERTIME') && JSON.parse(StorageHelp.GetStorage('TRAIN_SERVERTIME'));
        if (storageServertime) {
            try {
                servertime = {
                    server: new Date(Date.parse(storageServertime.serverTimeStr)),
                    local: new Date(Date.parse(storageServertime.localtimeStr))
                }
                if (fn) fn();
            } catch (e) {
                servertimeRequest(fn);
            }
        } else {
            servertimeRequest(fn);
        }
    };

    var isExist = function () {
        if (typeof servertime == "undefined" || !servertime.server) {
            return false;
        }
        return true;
    };

    var getDate = function () {
        var currentTime;
        if (isExist()) {
            currentTime = new Date(new Date().getTime() + (servertime.server - servertime.local)); //服务器时间
        } else {
            currentTime = new Date(); //当前时间
        }
        return currentTime;
    };

    var getUnix = function () {
        return getDate().getTime();
    };

    //是否在工作时间之内
    var isWorkTime = function () {
        var workSTime = WebConfigUrl.WorkSTime,
            workETime = WebConfigUrl.WorkETime,
            workSMinute = parseInt(workSTime.split(":")[0]) * 60 + parseInt(workSTime.split(":")[1]),
            workEMinute = parseInt(workETime.split(":")[0]) * 60 + parseInt(workETime.split(":")[1]);
        var servertimeMinute = utilityServertime.getDate().getHours() * 60 + utilityServertime.getDate().getMinutes();
        if (servertimeMinute >= workSMinute && servertimeMinute < workEMinute) {
            return true;
        } else {
            return false;
        }
    }

    getServertime();

    return {
        getDate: getDate,
        getUnix: getUnix,
        isWorkTime: isWorkTime,
        getServertime: getServertime
    };
}();


/**
 * 功能：点击input框右边的删除按钮清除input框内容
 * @param input input输入框
 * @param clearBtn 清除按钮
 * @param clearCallBack 清除input框内容后的回调函数（可选）
 */
function jqshow(a) {
    $(a).show();
}
function jqhide(a) {
    $(a).hide();
}
var eyeInput = function (input, eyebtn, eyeCallBack) {
    var input = typeof clearBtn == 'string' ? $(input) : input,
        eyeBtn = typeof clearBtn == 'string' ? $(eyebtn) : eyebtn;
    eyebtn.on('touchstart', function () {
        if ($(this).hasClass('shuteye')) {
            $(this).removeClass('shuteye');
            input.attr('type', 'text');
        } else {
            $(this).addClass('shuteye');
            input.attr('type', 'password');
        }
        if (input.val()) { input.focus(); }
        return false;
    });

    eyeCallBack && eyeCallBack();
}

var clearInput = function (input, clearBtn, clearCallBack, inputCallBack) {
    var input = typeof clearBtn == 'string' ? $(input) : input,
        clearBtn = typeof clearBtn == 'string' ? $(clearBtn) : clearBtn;

    input.each(function () {
        var _this = $(this);
        _this.btn = false;
        _this.bind({
            focus: function () {
                var inputValue = $.trim(_this.val());
                if (inputValue != '') {
                    clearBtn.addClass('not-empty');
                }
                if (_this.btn) jqshow('#trainPasswordClear');
            },
            blur: function () {
                //setTimeout(function () {
                clearBtn.removeClass('not-empty');
                //})
            },
            input: function () {
                if (this.timer) clearTimeout(this.timer);
                // this.timer = setTimeout(function () {
                var inputValue = _this.val();
                inputValue == '' ? clearBtn.removeClass('not-empty') : clearBtn.addClass('not-empty');
                if (inputCallBack) inputCallBack(_this);
                // }, 200);
            }
        });

        clearBtn.bind('touchend', function (e) {  // 此处使用click在iOS 9.0.2上会有问题
            e.preventDefault();
            e.stopPropagation();
            _this.val(""), _this.keyup(), _this.focus(), _this.trigger("input"), typeof clearCallBack == "function" && clearCallBack.call(this);
            if (inputCallBack) inputCallBack(_this);
            //                setTimeout(function () {
            //                    _this.trigger("input"); //再次触发输入框的input事件
            //                    _this.focus();
            //
            //                    _this.keydown();
            //                }, 500)
        });

    });
};




var WebConfigUrl = {};
WebConfigUrl.PublicInterface = $("#PublicInterface").val();
WebConfigUrl.OrderDetail = $("#ResourceUrl").val() + "OrderOperation/QueryOrderDetailsV1";
WebConfigUrl.ticketSearch = $("#TicketSearch").val() + "ticket/searchfortouch";
WebConfigUrl.StationUrl = $("#TicketSearch").val() + "Station";
WebConfigUrl.MonitorHandle = $("#ResourceUrl").val() + "OrderOperation/MonitorHandle";
WebConfigUrl.HotelAjaxCall = $("#HotelAjaxCall").val();
WebConfigUrl.WritePayBack = $("#PayBackUrl").val();
WebConfigUrl.CallBackUrl = $("#CallBackUrl").val();
WebConfigUrl.MerchentReUrl = $("#MerchentReUrl").val();
WebConfigUrl.LoginUrl = $("#LoginUrl").val();
WebConfigUrl.MyOrders = $("#MyOrders").val();
WebConfigUrl.RefundOrderTime = $("#RefundOrderTime").val();
WebConfigUrl.GetCityUrl = $("#GetCityUrl").val();
WebConfigUrl.WorkSTime = $("#WorkSTime").val();
WebConfigUrl.WorkETime = $("#WorkETime").val();
WebConfigUrl.SaveMemberUrl = $("#ResourceUrl").val() + "FavoriteContacts/SaveMemberLinker";
WebConfigUrl.PayUrl = $("#PayUrl").val();
WebConfigUrl.GetOrderTrackingUrl = $("#ResourceUrl").val() + "OrderOperation/SearchOrderTracking";
WebConfigUrl.wxTrainUrl = $("#wxTrainUrl").val();
WebConfigUrl.wxFlightRootUrl = $("#wxFlightRootUrl").val();
WebConfigUrl.wxFlightUrl = $("#wxFlightUrl").val();
WebConfigUrl.hotCityUrl = $("#hotCityUrl").val();
WebConfigUrl.letterCityUrl = $("#letterCityUrl").val();
WebConfigUrl.wxIndexUrl = $("#wxIndexUrl").val();
WebConfigUrl.WeChatHoldingSeat = $("#ResourceUrl").val() + "OrderOperation/WeChatHoldingSeat";
WebConfigUrl.VerificationIdentity = $("#ResourceUrl").val() + "OrderOperation/VerificationIdentity";
WebConfigUrl.GetNoticeInfo = $("#ResourceUrl").val() + "Notice/GetNoticeInfo";
WebConfigUrl.TrainRefundTrack = $("#ResourceUrl").val() + "OrderOperation/RefundTrack";
WebConfigUrl.CancelNightOrderUrl = $("#ResourceUrl").val() + "Handlers/TrainTicket.ashx";
WebConfigUrl.ActiveUrl = $("#activeUrl").val();
WebConfigUrl.IsOpenActive = $("#ResourceUrl").val() + "OrderOperation/ActiveSendPackageControl";
/* 卡券 */
WebConfigUrl.UseList = $("#ResourceUrl").val() + "ManageWXCard/GetUserTrainActivityUseList";
WebConfigUrl.UpdateUseInfo = $("#ResourceUrl").val() + "AddWXCard/UpdateActivityUseInfo";
/* 常旅身份核验 */
WebConfigUrl.Authentication = $("#ResourceUrl").val() + "OrderOperation/Authentication";
/*改签订单信息*/
WebConfigUrl.BookChangeOrder = $("#ResourceUrl").val() + "OrderOperation/BookChangeOrder";
/*热门车次退票拦截后台存储接口*/
WebConfigUrl.UpdatePassengerInfo = $("#ResourceUrl").val() + "OrderOperation/UpdatePassengerInfo";
WebConfigUrl.getShareStatus = $("#ResourceUrl").val() + "ManageWXCard/GetShareStatus";
WebConfigUrl.setShareStatus = $("#ResourceUrl").val() + "ManageWXCard/SetShareStatus";
WebConfigUrl.wxCouponShareUrl = $("#wxCouponShareUrl").val();
//服务器时间
WebConfigUrl.PublicServiceTime = "http://www.ly.com/huochepiao/resource/PublicInterface/GetServiceTime";
//送票上门验证接口
WebConfigUrl.offlineTicketVerification = $("#TrainorderPublicUrl").val() + 'TCOrder/offlineTicketVerification';
//送票上门 - 邮寄费接口
WebConfigUrl.GetPostFee = $("#TrainorderPublicUrl").val() + 'TCOrder/GetPostFee';




(function (S) {
    S.prototype.zjTrim = function () {
        return this.replace(/^\s+|\s+$/g, '');
    };
    S.prototype.zjEndWiths = function (str) {
        return this.lastIndexOf(str) == this.length - str.length;
    };
    S.prototype.zjFill = function (args) {
        var s = this;
        if (args != null) {
            var r, type = Object.prototype.toString.call(args),
                arr = type == "[object Array]" || type == "[object Object]" ? args : arguments;
            for (var i in arr) {
                r = new RegExp('\\{' + i + '\\}', 'gm');
                s = s.replace(r, arr[i]);
            }
        }
        return s;
    };
    S.prototype.zjReplace = function (oldStr, newStr) {
        var s = this, i = 0;
        while ((i = s.indexOf(oldStr, i)) > -1) {
            s = s.substring(0, i) + newStr + s.substring(i + oldStr.length);
            i += newStr.length;
        }
        return s;
    };
    S.prototype.zjGetByteLength = function () {
        var str = this, bytesCount = 0;
        for (var i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 255) bytesCount += 2;
            else bytesCount++;
        }
        return bytesCount;
    };
})(String);

(function () {

    var zjEvents = {
        touchStart: "touchstart"
    };

    var zjPopup = function (options) {
        var opts = {
            bgCls: "zjPopupBg",
            cls: "zjPopup",
            speed: 400,
            showAn: null,
            hideAn: null,
            isShowBg: true,
            html: '',
            showBefore: null,
            hideBefore: null,
            autoDestroy: true
        },
        that = this;

        for (var i in options) opts[i] = options[i];
        this.opts = opts;

        this.bg = null;  // background
        this.container = null;

        (function () {

            that.container = $("<div class='" + opts.cls + "'>" + opts.html + "</div>").css("zIndex", 2050); //zjPopup.zIndex++);
            that.container.appendTo(document.body);
            //$(document.body).prepend(that.container);
            that.container.on(zjEvents.touchStart, function (e) {
                //var tn = e.target.tagName.toLowerCase();
                //if (e.target.getAttribute("preventDefault") == "true")                 e.preventDefault();
                //if (e.target == that.container.get(0)) e.preventDefault();
                //console.log(e.target, that.container.get(0), e.target == that.container.get(0));
            });

            if (that.opts.isShowBg) {
                that.bg = $("<div class='" + opts.bgCls + "'></div>").css("zIndex", zjPopup.zIndex++);
                that.bg.appendTo(document.body);
                that.bg.on(zjEvents.touchStart, function (e) { e.preventDefault(); });
            }

            $(window).bind("resize", function () {
                if (that.isHided() || that.isDestroy()) return;
                that.toCenter();
            });

            //console.log(that.opts);
        })();
    };

    zjPopup.prototype = {

        setContent: function (content) {
            this.container.html(content);
        },

        setAutoDestroy: function (enable) {
            this.opts.autoDestroy = enable;
        },

        getPosition: function () {
            var o = this.container.offset();
            return { x: o.left, y: o.top };
        },

        getCenter: function () {
            var that = this;
            return { left: ($(window).width() - that.container.width()) / 2.0, top: ($(window).height() - that.container.height()) / 2.0 };
        },

        toCenter: function () {
            var c = this.getCenter(); //console.log(c);
            c.left = c.left / $(window).width() * 100 + "%";
            c.top = c.top / $(window).height() * 100 * 0.8 + "%";
            //console.log(c);
            this.container.css(c);
        },

        isHided: function () {
            var dis = this.container.css("display");
            return !dis || dis == "none" || this.container.css("opacity") == 0;
        },

        isDestroy: function () {
            return this.container == null;
        },

        show: function () {
            if (this.isHided()) {
                if (this.opts.showBefore) this.opts.showBefore(this);
                if (this.bg) this.bg.css("opacity", 0.5).show();//.fadeIn();
                if (this.opts.hideAn) this.container.removeClass(this.opts.hideAn);
                if (this.opts.showAn) this.container.addClass(this.opts.showAn);
                    //else this.container.fadeIn(this.opts.speed);
                else this.container.show();
                this.toCenter();
            }
        },

        hide: function () {
            if (this.opts.hideBefore) this.opts.hideBefore(this);
            if (this.opts.showAn) this.container.removeClass(this.opts.showAn);
            if (this.opts.hideAn) this.container.addClass(this.opts.hideAn);
                //else this.container.fadeOut(this.opts.speed);
            else this.container.hide();
            if (this.bg) this.bg.hide(); //.fadeOut(); 10/22
            this.autoDestroy();
        },

        hideTo: function (obj, option) {
            obj = typeof obj == 'string' ? $(obj) : obj;
            var o = {
                offsetX: 0,
                offsetY: 0
            };
            if (option) for (var i in option) o[i] = option[i];

            if (this.opts.hideBefore) this.opts.hideBefore(this);

            var o1 = obj.offset(),
                o2 = this.container.offset(),
                x = o1.left - o2.left - o1.width / 2 + o.offsetX,
                y = o1.top - o2.top - 60 + o.offsetY;

            this.container.css({
                "-webkit-transition": "all 0.8s",
                "-webkit-transform": "translate({0}px,{1}px) scale(0,0)".zjFill(x, y) // 注意顺序
            });

            if (this.bg) this.bg.hide(); //.fadeOut(); 10/22
            this.autoDestroy();
        },

        autoDestroy: function () {
            var t = this;
            if (this.opts.autoDestroy) setTimeout(function () { t.destroy(); }, this.opts.speed + 600);
        },

        destroy: function () {
            if (this.bg) this.bg.remove();
            if (this.container) this.container.remove();
            this.bg = null;
            this.container = null;
        },

        animateNo: function () {
            this.animate("zjPopupNo", 600);
        },

        animate: function (clsName, duration) {
            var t = this;
            this.container.addClass(clsName);
            setTimeout(function () { t.container.removeClass(clsName) }, duration + 100);
        }
    }

    zjPopup.zIndex = 2015;

    // btnArr : [ { text:'ok', fun: function(){} } ]
    zjPopup.getBtnMsg = function (msg, btnArr) {
        var h = "";
        for (var i in btnArr) h += "<div>" + btnArr[i].text + "</div>";
        var p = new zjPopup({
            //showAn: "zjPopupFlip",
            //hideAn: "zjPopupFlip_back",
            html: "<div class='btnMsg'><div></div><div class='btnContainer'>" + h + "</div></div>"
        });
        p.setContent = function (msg) { this.container.find(".btnMsg > div").eq(0).text(msg); };
        p.setContent(msg);
        var arr = p.container.find(".btnMsg > div:last-child > div");
        for (var i in btnArr) arr.eq(i).on(zjEvents.touchStart, btnArr[i].fun);
        return p;
    }

    zjPopup.getAlert = function (msg, fun) {
        var p = zjPopup.getBtnMsg(msg, [{ text: '确定', fun: function () { p.hide(); if (fun) fun(); } }]);
        return p;
    }

    zjPopup.getConfirm = function (msg, okFun, cancelFun) {
        var p = zjPopup.getBtnMsg(msg, [
            { text: '取消', fun: function () { p.hide(); if (cancelFun) cancelFun(); } },
            { text: '确定', fun: function () { p.hide(); if (okFun) okFun(); } }
        ]);
        return p;
    }

    zjPopup.getToast = function (msg, delay) {
        delay = delay || 2000;
        var p = new zjPopup({
            isShowBg: false,
            speed: 1000,
            html: "<div class='toast'><div class='msg'></div></div>",
            showBefore: function (t) { setTimeout(function () { t.hide(); }, delay + t.opts.speed); }
        });
        p.setContent = function (msg) { this.container.find(".toast > div").text(msg); };
        p.setContent(msg);
        return p;
    }

    zjPopup.getIconToast = function (icon, msg, delay) {
        delay = delay || 2000;
        var p = new zjPopup({
            isShowBg: false,
            speed: 1000,
            html: "<div class='toast'><div class='icon'></div><div class='msg'></div></div>",
            showBefore: function (t) { setTimeout(function () { t.hide(); }, delay + t.opts.speed); }
        });
        p.setContent = function (icon, msg) {
            //this.container.find(".toast .icon").css({ "backgroundColor": icon });
            this.container.find(".toast .icon").html("<img src='" + icon + "' />");
            this.container.find(".toast .msg").text(msg);
        };
        p.setContent(icon, msg);
        return p;
    }

    zjPopup.getSuccessToast = function (msg, delay) {
        return zjPopup.getIconToast("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGIAAABMBAMAAABkLX97AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAkUExURQAAAP///////////////////////////////////////////7QJjekAAAALdFJOUwAKwNka8KdNZYUz7dJFZQAAATdJREFUSMft1z9Lw2AQBvBXUGM7SYVCRzvq0iGLdCkUnF2csqTglqVLJ5fuLn4Jv4Cl2nJfrn/S5s1L7y73DKEouS3D8QvhnjviXFN11PPrG9ZwOaTFCOoYE1EMEoQhO4IoBQmiF5SgAUrQJ0p836LE/Z8m2glKfOUNPzAxqZ9IYcL9P6LXn2PExaPyqVmio0yMRMhTyRLXylgeiTDdV8roH4i1YzpYJGKJw1uxyIwllAwLhBJigZARkRCRd4mQkIiUTcsiCsEjKsEiKuGR2EoUiD+MFcQpciTkcLq7EPnIH1fKAtjnqkBuqok8uwViIELERASIiSgjRqKEGAmPPFmJAiEr4REzESIr0+YvI1PbsfDIr/G8eMRIeMRKeMRMONcFiS2SgUSOIMS2MlpOsY5W8tD8Bp2tNsf7x3UWg/gnAAAAAElFTkSuQmCC", msg, delay);
    };

    zjPopup.getLoading = function (msg, imgSrc) {
        var p = new zjPopup({
            html: "<div class='loading'><div></div><div></div></div>"
        });
        p.container.find(".loading > div").eq(0).html(imgSrc ? "<img src='" + imgSrc + "' />" : "<div class='img'></div>");
        p.setContent = function (msg) { this.container.find(".loading > div").eq(1).text(msg); };
        p.setContent(msg || "正在加载......");
        return p;
    };

    zjPopup.get12306Loading = function (msg) {
        var p = new zjPopup({
            html: '<div class="loading-box"><div class="icon-train-two loading-icon"><div class="icon-train-two loading-gif"></div></div><p class="loading-content"></p></div>'
        });
        // p.container.find(".loading > div").eq(0).html(imgSrc ? "<img src='" + imgSrc + "' />" : "<div class='img'></div>");
        p.setContent = function (msg) { this.container.find(".loading-content").text(msg); };
        p.setContent(msg || "正在加载...");
        return p;
    };


    var zjLoading = null;

    zjPopup.showLoading = function (msg) {
        if (zjLoading == null) {
            zjLoading = zjPopup.getLoading();
            zjLoading.setAutoDestroy(false);
        }
        zjLoading.setContent(msg || "正在加载数据。。。");
        zjLoading.show();
    };

    zjPopup.hideLoading = function () {
        if (zjLoading) zjLoading.hide();
    };

    var zj12306Loading = null;

    zjPopup.show12306Loading = function (msg) {
        if (zj12306Loading == null) {
            zj12306Loading = zjPopup.get12306Loading(msg);
            zj12306Loading.bg.css("opacity", "0");
            zj12306Loading.setAutoDestroy(false);
        }
        else zj12306Loading.setContent(msg);
        zj12306Loading.show();
    };

    zjPopup.hide12306Loading = function () {
        if (zj12306Loading) zj12306Loading.hide();
    };

    zjPopup.getCloseBox = function (msg, btnText, fun, closeFun) {

        var p = new zjPopup({
            html: "<div class='closeBox'><div><span class='icon-train-two'></span></div><div class='msg'></div><div class='btnContainer'><div></div></div></div>"
        });

        p.bg.css("opacity", "0.5");
        p.setContent = function (msg) { this.container.find(".msg").eq(0).html(msg); };
        p.setContent(msg);

        p.container.find(".closeBox > div:first-child > span").eq(0).bind("click", function () {
            p.hide();
            if (closeFun) closeFun();
        });

        p.container.find(".btnContainer > div").eq(0).bind("click", function () {
            p.hide();
            if (fun) fun();
        }).text(btnText);

        return p;
    };

    zjPopup.getSingleInput = function (opts, okFun, closeFun) {

        var o = {
            msg: null,
            label: null,
            hideTo: null,
            hideToOffset: null,
            input: {
                value: '',
                type: 'text',
                placeholder: '请输入'
            },
            btnText: "确认"
        };

        for (var i in opts) {
            if (i == "input") {
                for (var j in opts[i]) o[i][j] = opts[i][j];
            } else {
                o[i] = opts[i];
            }
        }

        var id = "validateCodeClear" + zjPopup.zIndex,
            p = new zjPopup({
                autoDestroy: false,
                html: "<div class='singleInput'>"
                        + "<div><span class='icon-train-two'></span></div>"
                        + "<div style='clear:both;'></div><div class='msg'></div><div class='input'><span></span><input id='" + id + "' />"
                            + "<a href='javascript:;' id='" + id + "_c' class='clear-input'><label class='icon-train-two icon-clear-input'></label></a>"
                        + "</div>"
                        + "<div class='btnContainer'><div></div></div>"
                    + "</div>"
            });
        clearInput("#" + id, "#" + id + "_c");
        p.container.find(".icon-clear-input").eq(0).css({
            "margin-left": "22px",
            "margin-top": "8px"
        });

        p.bg.css("opacity", "0.5");
        p.container.css("width", "90%");
        p.setContent = function (opts, isFirst) {

            if (opts.msg) this.container.find(".msg").eq(0).html(opts.msg);
            else if (isFirst) this.container.find(".msg").eq(0).hide();

            if (opts.label) this.container.find(".input > span").eq(0).html(opts.label);
            else if (isFirst) this.container.find(".input > span").eq(0).hide();

            var inp = this.container.find("input").eq(0);
            if (opts.input) for (var i in opts.input) inp.attr(i, opts.input[i]);
        };
        p.setContent(o);

        p.getInput = function () {
            return this.container.find(".input input").eq(0);
        };

        p.container.find(".input input").eq(0).bind("focus", function () {
            //p.toCenter();
            //setTimeout(function () { p.toCenter(); }, 100);
        });

        p.container.find(".singleInput > div:first-child > span").eq(0).bind("touchend", function (e) {
            e.preventDefault();
            e.stopPropagation();
            p.setAutoDestroy(true);
            if (o.hideTo) p.hideTo(o.hideTo, o.hideToOffset);
            else p.hide();
            if (closeFun) closeFun();
        });

        p.container.find(".btnContainer > div").eq(0).bind("touchend", function (e) { // 此处使用click在iOS 9.0.2上会有问题
            e.preventDefault();
            e.stopPropagation();
            //alert('确认touchend');
            //p.hide();
            if (okFun) okFun(p.container.find("input").eq(0).val());
        }).text(o.btnText);

        return p;
    };

    zjPopup.showDialog = function (msg, fun, btnText) {
        if (typeof fun == "string") btnText = fun, fun = null;

        mobileUtil.dialog(msg, "body", fun);
        if (btnText) $("#showTip button").eq(0).text(btnText);
    };

    zjPopup.showConfirm = function (msg, btn1Text, btn1Fn, btn2Text, btn2Fn) {
        mobileUtil.confirm(msg, 'body', btn2Fn || btn1Fn, btn1Text, btn2Text, btn1Fn);
    };

    zjPopup.showExplain = function (contentObj, closeObj) {
        if (typeof contentObj == "string") contentObj = $(contentObj);
        closeObj = closeObj || $(".layer-close");

        if (closeObj.length == 0) {
            closeObj = $('<div class="layer-close"><s></s></div>');
            closeObj.appendTo(document.body);
        }
        var f = function () {
            contentObj.hide();
            closeObj.hide();
            closeObj.unbind("click", f);
        }
        closeObj.bind('click', f);

        contentObj.show();
        closeObj.show();
    }

    window.zjPopup = zjPopup;

})();

(function () {

    var zj = {};

    zj.envi = {
        hasTouch: 'ontouchstart' in window,
        isAndroid: false,
        isIOS: false,
        isIPhone: false,
        isIPad: false,
        //isPC: false,
        isInWeixin: false,
        isInQQ: false,
        deviceType: null,
        deviceModel: null,
        osVersion: null,
        getNetType: function () {
            if (navigator.connection) return navigator.connection.type;
            return 0;
        },
        init: function () {

            var av = window.navigator.appVersion;

            if (/Android /.test(av)) this.isAndroid = true;
            else if (/iPhone;/.test(av)) this.isIPhone = true;
            else if (/iPad;/.test(av)) this.isIPad = true;
            //else this.isPC = true;

            if (/MicroMessenger/.test(av)) this.isInWeixin = true;
            else if (/MQQBrowser/.test(av)) this.isInQQ = true;

            this.deviceType = this.isAndroid ? "Android" : (this.isIPhone ? "iPhone" : (this.isIPad ? "iPad" : "Other"));

            if (this.isAndroid) this.osVersion = /Android (\d+[^;]+)?;/.exec(av)[1], this.deviceModel = /; ([^;\)]+)\)/.exec(av)[1];
            else if (this.isIPhone || this.isIPad) this.osVersion = / OS (\d+[^ ]+)? /.exec(av)[1].replace(/_/g, '.');

            this.isIOS = /Mac OS X/.test(av);
        },
        toString: function (joinStr) {
            var a = [window.navigator.appVersion];
            for (var i in this) if (typeof this[i] != "function") a.push(i + ":" + this[i]);
            a.push("width:" + $(window).width());
            a.push("height:" + $(window).height());
            return a.join(joinStr || "\r\n");
        }
    };

    zj.envi.init();


    /*
    0	unknown	UNKNOWN
    1	ethernet	ETHERNET
    2	wifi	WIFI
    3	2g	CELL_2G
    4	3g	CELL_3G
    5	4g	CELL_4G（中国现在也会出现这个值，是hspa+）
    ?	none	NONE
    */
    zj.netType = {
        _unknown: 0,
        _ethernet: 1,
        _wifi: 2,
        _2g: 3,
        _3g: 4,
        _4g: 5
    };

    zj.log = function (args) { };

    zj.date = {

        parse: function (str) {
            return new Date(Date.parse(str.replace(/-/g, '/')));
        },

        getDiff: function (date1, date2) {

            var ms = (date1.getTime() - date2.getTime()); // / 24 / 3600 / 1000;

            var day1 = Math.floor(ms / 24 / 3600 / 1000),
                hh1 = Math.floor((ms / 3600 / 1000) % 24),
                mm1 = Math.floor((ms / 1000 / 60) % 60),
                ss1 = Math.floor((ms / 1000) % 60);
            return {
                day: day1,
                hour: hh1,
                minute: mm1,
                second: ss1
            };
        }

    };

    zj.config = {

        platId: 501,

        jsRoot: null,

        //账号配置开关，原来在 kyfwlogin.js 里
        getAccountConfigure: function (callback) {
            //storeWithExpiration.set('accountConfigure', 2, 5 * 60 * 1000) // 数据缓存5分钟   //TODO delete
            //callback && callback(accountConfigure);

            var accountConfigure = storeWithExpiration.get('accountConfigure');
            if (accountConfigure != null) {  // old no != null
                //    //console.log('从本地获取 accountConfigure')
                storeWithExpiration.set('accountConfigure', accountConfigure, 5 * 60 * 1000) // 数据缓存5分钟
                callback && callback(accountConfigure);

                //console.log('账号配置(从本地取)为：' + accountConfigure);
            } else {
                //console.log('从接口获取 accountConfigure')
                $.ajax({   //配置开关接口
                    //url: WebConfigUrl.PublicServiceTime,
                    // url: 'http://wx070841:8091/huochepiao/resource/OrderOperation/GetResourceByName',
                    url: $('#ResourceUrl').val() + 'OrderOperation/GetResourceByName',
                    data: { para: JSON.stringify({ resourceName: "UserBinding12306ForPlaceOrder", flag: 4 }) },  //flag: 5表示手Q  4表示微信
                    dataType: "jsonp",
                    success: function (response) {
                        //console.log(response);
                        response = JSON.parse(response);
                        //response = {"msgCode":"1000","msgInfo":"成功","data":"1"};
                        if (response.msgCode == "1000") {
                            //accountConfigure ->   0：两者并存    1：同程账号    2：12306账号
                            accountConfigure = response.data;
                            //accountConfigure = 2
                            //console.log('账号配置(从接口取)为：' + accountConfigure);

                            storeWithExpiration.set('accountConfigure', accountConfigure, 5 * 60 * 1000) // 数据缓存5分钟
                            //storeWithExpiration.set('accountConfigure', accountConfigure, 60 * 1000) // 数据缓存10s 测试
                            callback && callback(accountConfigure);
                        }
                    },
                    error: function () {
                        //接口失败，则默认同程账号登陆
                        callback && callback(1);
                    }
                });
            }
        },

        //获取当前可以使用账号类型及是否是在job时间
        getUseAccountType: function (callback) {
            zj.apis.isWorkTime(function (data) {
                if (data) {
                    zj.config.getAccountConfigure(function (da) {
                        callback(da, true);
                    });
                } else {
                    callback(zj.useAccountType.tc, false);
                }
            });
        }
    };

    zj.useAccountType = {

        //两者并存
        both: 0,

        //同程账号
        tc: 1,

        //12306账号
        _12306: 2
    };

    zj.apiHelper = {

        getOpts: function (api, data, method, callback, timeout, dataType) {

            return {
                url: api,
                data: data,
                type: method,
                dataType: dataType || "json",
                timeout: timeout || 30000,
                success: function (d) {
                    //console.log(d);
                    if (callback) callback(true, d);
                },
                error: function (d) {
                    //console.log(d);
                    if (callback) callback(false, d);
                }
            };
        },

        get: function (api, data, callback, timeout) {
            if ($.isFunction(data)) callback = data, data = null;
            return $.ajax(this.getOpts(api, data, "GET", callback, timeout));
        },

        post: function (api, data, callback, timeout) {
            return $.ajax(this.getOpts(api, data, "POST", callback, timeout));
        },

        getJSONP: function (api, data, callback, timeout) {
            if ($.isFunction(data)) callback = data, data = null;
            return $.ajax(this.getOpts(api, data, "GET", callback, timeout, "jsonp"));
        },

        postJSONP: function (api, data, callback, timeout) {
            return $.ajax(this.getOpts(api, data, "POST", callback, timeout, "jsonp"));
        },

        getText: function (api, data, callback, timeout) {
            if ($.isFunction(data)) callback = data, data = null;
            return $.ajax(this.getOpts(api, data, "GET", callback, timeout, "text"));
        }
    };


    zj.trainUser = {

        get: function () {
            var json = store.get('TrainUser');
            if (json) return JSON.parse(json);
            return null;
        },

        //获取或设置当前的主动登出状态（true代表已主动登出，false代表没有主动登出），注意没有登出不代表已登录
        currentActiveSignOut: function (isSignOut) {
            var key = "currentActiveSignOut_key";
            if (typeof isSignOut == "undefined") {
                var v = sessionStorage.getItem(key);
                if (v == null) return false;
                return v == "true";
            }
            sessionStorage.setItem(key, isSignOut);
        },

        //获取火车票(12306)用户临时登录凭据，还未登录成功
        getTemp: function () {
            return store.get("TrainUserTemping");
        },

        //当前是否已经登录
        isLogined: function (fun, errFun, isShowLoging, userName) {

            if (typeof errFun == "boolean") isShowLoging = errFun, errFun = null;
            isShowLoging = isShowLoging == false ? false : true;

            var u = this.get();
            if (storeWithExpiration.get('isTrainLogged') && u) {
                fun(true);
            } else {
                fun(false);
                return;

                var name = userName || u.username,
                    para = {
                        opendId: getWxObj().openid || store.get("WxOpenid") || "",
                        userName: encodeURIComponent(name),
                        //passWord: null,
                        binding: 2, //binding: 0 绑定（登录）  2 验证登录   3 自动登录
                        platId: zj.config.platId
                    };

                if (isShowLoging) showLoading();

                var api = "BingingKyfw";
                zj.apiHelper.get(api, { Para: JSON.stringify(para) }, function (isOk, res) {
                    if (isShowLoging) hideLoading();
                    if (isOk) {
                        if (res.msgCode == "1000") storeWithExpiration.set('isTrainLogged', true, 15 * 60 * 1000);
                        fun(res.msgCode == "1000");
                    } else {
                        if (errFun) errFun(res);
                        else zjPopup.showDialog("获取登录状态失败！");
                    }
                });
            }
        },

        //登录 
        login: function (fn, prompt, openFun) {
            var openPage = function () {
                utilityRailway.bindEvent();
                utilityRailway.loginPromptMsg = prompt;
                utilityRailway.openLoginPage(null, null, openFun);
            };
            utilityRailway.loginCallback = function (tag) {
                //tag -> 0:登录失败 1：登录成功 
                if (tag == 1) {
                    if (fn) {
                        fn();
                        //if (!fn()) utilityRailway.closeLoginPage();
                    }
                } else {
                    openPage();
                }
            }
            openPage();
        },

        //验证是否已登录，如果未登录则必须登录
        checkAndLogin: function (fun, prompt, isShowLoading, userName) {
            if (typeof prompt == 'boolean') isShowLoading = prompt, prompt = null;
            var t = this,
                login = function () {
                    if (isShowLoading == false) fun({ status: 1, msg: "需要登录" });
                    t.login(function () { fun({ status: 0, msg: "登录成功" }) }, prompt);
                };
            this.isLogined(function (isLogin) {
                if (isLogin) fun({ status: 0, msg: "不需要登录" });
                else login();
            }, function () {
                prompt = "登录已失效，请重新登录";
                login();
            }, isShowLoading, userName);
        },

        //通过特定的用户名，验证是否已登录，如果未登录则必须登录，且走自动登录模式
        checkAndLoginByName: function (userName, fun, prompt, isShowLoading) {
            utilityRailway.autoLoginUserName = userName;
            this.checkAndLogin(fun, prompt, isShowLoading, userName);
        },

        // 清除用户登录信息
        clear: function () {
            store.set('TrainUser', '');
            storeWithExpiration.set('isTrainLogged', false);
        },

        //自动登录，之前已舍弃，现在又启用
        autoLogin: function (fn, userName) {            
            utilityRailway.autoLogin(fn, userName);
        }
    };


    zj.apis = {

        isWorkTime: function (callBack) {
            $.ajax({
                url: "CheckWorkTime",
                type: "post",
                timeout: 20000,
                dataType: "text",
                success: function (res) {
                    callBack(res == 'true');
                },
                complete: function (req, state) { }
            })
        },

        //获取远程12306用户常旅
        getRemoteContacts: function (account, callback, isRefresh) {
            zj.apiHelper.get(
                'GetFavoriteContactsForOtherAccounts',
                {
                    otherAccounts: account,
                    type: isRefresh ? 1 : 0,
                    platId: zj.config.platId
                }, callback);
        },

        //验证乘客是否是315乘客，没有的话会返回：{"Passengers":null}
        getPassengerVerify: function (passengers, callback) {
            zj.apiHelper.get(
                'GetPassengerVerify',
                passengers,
                callback);
        }

    };

    zj.events = {

        /**
         * 添加hash绑定事件
         * @param {String} name page名称，如果传空的话，则表示全局不做筛选
         * @param {Function} fun 回调函数，参数：是否是打开（append）
         * @param {Boolean} allowQueue 回调函数是否启用队列，默认不启用
        */
        hashChange: function (name, fun, allowQueue, tag) {
            if (name == null) name = "";
            name = name.toLowerCase();

            if (this.hashArr == null) {
                var _this = this;
                this.hashArr = [];
                $(window).bind('hashchange', function (e) {

                    var newHash = location.hash.toLocaleLowerCase(),
                        oldHash = e.oldURL.lastIndexOf('#') == -1 ? "" : e.oldURL.substring(e.oldURL.lastIndexOf('#') + 1).toLowerCase();
                    if (newHash) newHash = newHash.substring(1);

                    // 先执行全局
                    for (var i in _this.hashArr) {
                        if (_this.hashArr[i].name.length == 0) {
                            _this.hashArr[i].callback(null, e);
                            break;
                        }
                    }

                    for (var i = _this.hashArr.length - 1; i > -1; i--) {
                        if (_this.hashArr[i].name.length == 0) continue;
                        //zj.log("oldHash:", oldHash, "\tnewHash:", newHash);
                        if (_this.hashArr[i].name == oldHash) { // 关闭（remove）
                            //zj.log(oldHash, "close");
                            if (_this.hashChangeCloseList) {
                                for (var j in _this.hashChangeCloseList) _this.hashChangeCloseList[j](oldHash);
                            }
                            _this.hashArr[i].callback(false, e);
                            break;
                        }
                        if (_this.hashArr[i].name == newHash) { // 打开 (append)
                            //zj.log(newHash, "open");
                            if (_this.hashChangeOpenList) {
                                for (var j in _this.hashChangeOpenList) _this.hashChangeOpenList[j](newHash);
                            }
                            _this.hashArr[i].callback(true, e);
                            break;
                        }
                    }
                });
            }

            for (var i in this.hashArr) {
                if (this.hashArr[i].name == name) {
                    if (!allowQueue) this.hashArr[i].funs.length = 0;
                    this.hashArr[i].funs.push(fun);
                    return;
                }
            }

            this.hashArr.push({
                name: name, funs: [fun], callback: function (isAppend, e) {
                    for (var i in this.funs) this.funs[i](isAppend, e);
                }, toString: function () {
                    return name;
                }
            });
        },

        hashChangeCloseList: null,

        registerHashChangeClose: function (fn) {
            if (!this.hashChangeCloseList) this.hashChangeCloseList = [];
            this.hashChangeCloseList.push(fn);
        },

        hashChangeOpenList: null,

        registerHashChangeOpen: function () {
            if (!this.hashChangeCloseList) this.hashChangeOpenList = [];
            this.hashChangeOpenList.push(fn);
        },

        // 点击事件延迟，
        clickDelay: function (fn, args, delay) {

            $("input").each(function (i, o) {
                o.blur();
            });
            if (delay == null) {
                delay = zj.envi.isIOS ? 500 : 200;
            }
            setTimeout(fn, delay, args);
        },

        bindDelayClick: function (o, fn, delay) {
            var _this = this;
            $(o).bind("click", function (e) {
                _this.clickDelay(fn, e, delay);
            });
        }
    };


    zj.tmpl = {

        callback: function () { },

        //加载模版代码
        loadKyfwloginPage: function (fun, isShowLoading) {
            /*
            var src = this.getPath("kyfwloginPage.0.0.1.js");
            zj.tmpl.callback = function (txt) {
                $(txt).appendTo(document.body);
                if (isShowLoading) hideLoading();
                fun();
            };
            var js = document.createElement("script");
            js.src = src;
            document.body.appendChild(js);
            return;
            */
            this.load("kyfwloginPage", "0.0.5", function (txt) {
                $(txt).appendTo(document.body);
                fun();
            }, isShowLoading);
        },

        load: function (name, version, fun, isShowLoading) {

            var lsName = "_tmpl_" + name,
                data = localStorage.getItem(lsName);
            if (data) data = JSON.parse(data);

            if (data && data.version == version) {
                fun(data.txt);
                return;
            }

            isShowLoading = isShowLoading || isShowLoading == null;
            if (isShowLoading) showLoading();
            var src = this.getPath(name);
            (function () {
                var me = arguments.callee;
                zj.apiHelper.getText(src, function (isOk, txt) {
                    zj.log("tmpl txt:", isOk, txt);
                    if (isOk) {
                        if (isShowLoading) hideLoading();
                        localStorage.setItem(lsName, JSON.stringify({ version: version, txt: txt }));
                        fun(txt);
                    } else {
                        setTimeout(me, 1000); // 1s 后稍试
                    }
                });
            })();
        },

        getPath: function (name) {
            return "tmpl/" + name + ".txt";
            /*
            var root = zj.config.jsRoot.toLowerCase();
            if (root.indexOf("http") == 0 && root.indexOf("??") > 0) root = root.substring(0, root.zjReplace("//", "aa").indexOf("/")) + root.substring(root.indexOf("??") + 2);
            return root + "tmpl/" + name;
            */
        }
    }

    zj.page = {

        //历史
        hisPages: [],

        pages: [],

        open: function (pageName, title, initFun, notCheckInitRepeat) {
            if ($.isFunction(title)) initFun = title, title = null;
            page.open(pageName);

            var p = { name: pageName, frontTitle: document.title, currentTitle: title || document.title };
            this.pages.push(p);

            if (title) zj.hack.setTitle(title);

            var hasBeenOpened = false;
            for (var i in this.hisPages) {
                if (this.hisPages[i] == pageName) {
                    hasBeenOpened = true;
                    break;
                }
            }

            if (!hasBeenOpened) {
                this.hisPages.push(pageName);
                (function (p) {
                    zj.events.hashChange(p.name, function (isOpen) {
                        if (!isOpen) zj.hack.setTitle(p.frontTitle);
                    }, true);
                })(p);
            }
            if (initFun && (!hasBeenOpened || notCheckInitRepeat)) initFun();
        }

    };

    zj.validator = {
        // 手机号码
        isMobile: function (v) {
            return /^((13[0-9])|(14[0-9])|(15[0-9])|(18[0-9])|(17[0-9]))\d{8}$/.test(v);
        },

        // 固话号码
        isTelePhone: function (txt) {
            return /^\\d{3,4}-?\\d{7,8}$/.test(txt);
        },
        isEmail: function (txt) {
            return /^\\w+([-+.\']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$/.test(txt);
        },
        // 身份证
        isIdCard: function (txt) {
            //return /(^[0-9]{17}([0-9]|X|x)$)|(^[0-9]{15}$)/.test(txt);

            var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];    // 加权因子   
            var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];            // 身份证验证位值.10代表X   
            var idCard = txt;
            idCard = trim(idCard.replace(/ /g, ""));               //去掉字符串头尾空格                     
            if (false && idCard.length == 15) {
                return isValidityBrithBy15IdCard(idCard);       //进行15位身份证的验证    
            } else if (idCard.length == 18) {
                var a_idCard = idCard.split("");                // 得到身份证数组   
                if (isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(a_idCard)) {   //进行18位身份证的基本验证和第18位的验证
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }

            /**  
             * 判断身份证号码为18位时最后的验证位是否正确  
             * @param a_idCard 身份证号码数组  
             * @return  
             */
            function isTrueValidateCodeBy18IdCard(a_idCard) {
                var sum = 0;                             // 声明加权求和变量   
                if (a_idCard[17].toLowerCase() == 'x') {
                    a_idCard[17] = 10;                    // 将最后位为x的验证码替换为10方便后续操作   
                }
                for (var i = 0; i < 17; i++) {
                    sum += Wi[i] * a_idCard[i];            // 加权求和   
                }
                valCodePosition = sum % 11;                // 得到验证码所位置   
                if (a_idCard[17] == ValideCode[valCodePosition]) {
                    return true;
                } else {
                    return false;
                }
            }
            /**  
              * 验证18位数身份证号码中的生日是否是有效生日  
              * @param idCard 18位书身份证字符串  
              * @return  
              */
            function isValidityBrithBy18IdCard(idCard18) {
                var year = idCard18.substring(6, 10);
                var month = idCard18.substring(10, 12);
                var day = idCard18.substring(12, 14);
                var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
                // 这里用getFullYear()获取年份，避免千年虫问题   
                if (temp_date.getFullYear() != parseFloat(year)
                      || temp_date.getMonth() != parseFloat(month) - 1
                      || temp_date.getDate() != parseFloat(day)) {
                    return false;
                } else {
                    return true;
                }
            }
            /**  
             * 验证15位数身份证号码中的生日是否是有效生日  
             * @param idCard15 15位书身份证字符串  
             * @return  
             */
            function isValidityBrithBy15IdCard(idCard15) {
                var year = idCard15.substring(6, 8);
                var month = idCard15.substring(8, 10);
                var day = idCard15.substring(10, 12);
                var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
                // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法   
                if (temp_date.getYear() != parseFloat(year)
                        || temp_date.getMonth() != parseFloat(month) - 1
                        || temp_date.getDate() != parseFloat(day)) {
                    return false;
                } else {
                    return true;
                }
            }
            //去掉字符串头尾空格   
            function trim(str) {
                return str.replace(/(^\s*)|(\s*$)/g, "");
            }
        },
        // 邮编
        isZip: function (txt) {
            return /^\\d{6}$/.test(txt);
        },
        // 常旅姓名
        isTravelName: function (txt) {
            return /^[a-z\u4e00-\u9fa5]+$/i.test(txt);
        }
    };

    zj.cred = {
        hasWxObj: function () {
            var wx = getWxObj();
            if (wx == null || wx.userid == null || wx.openid == undefined || wx.openid == "undefined" || wx.openid == "0") {
                mobileUtil.dialog("会员信息丢失，请重新查询预订", "body", function () {
                    location.href = WebConfigUrl.wxIndexUrl;
                });
                return false;
            }
            return true;
        },

        toWxAuthIndex: function () {
            location.href = WebConfigUrl.wxIndexUrl;
        }
    };

    zj.track = {

        tc: function (key, eventName) {
            eventName = eventName || "click";
            zj.log("track:", key, eventName);
            try {
                _tcTraObj._tcTrackEvent(eventName, key, 'wxtrain', '');
            } catch (ex) { }
        },

        htStore: function (data) {
            var key = "htStore_key";
            if (data) {
                sessionStorage.setItem(key, typeof data == "string" ? data : JSON.stringify(data || {}));
            } else {
                var o = sessionStorage.getItem(key);
                return o && JSON.parse(o) || {};
            }
        },

        htBegin: function (key) {
            var obj = this.htStore();
            obj["_" + key] = {
                begin: new Date().getTime(),
                end: 0,
                data: null
            };
            this.htStore(obj);
        },

        htEnd: function (key, data) {
            var obj = this.htStore();
            key = "_" + key;
            if (!obj[key]) return;
            obj[key].end = new Date().getTime();
            if (data) obj[key].data = (typeof data == "[object Object]" || $.isArray(data)) ? JSON.stringify(data) : data;
            this.htStore(obj);

            var c = 0;
            for (var i in obj) c++;
            if (c >= 6) this.htSave();
        },

        htSave: function () {
            if (!window.tcpLogWrite) return;

            var obj = this.htStore();
            for (var i in obj) {
                if (i.charAt(0) != '_') delete obj[i];
                else if (obj[i].end > obj[i].begin) {  // 只发送已结束的，并从缓存中删除
                    //window.tcpsearchlog(i.substring(1), (obj[i].end - obj[i].begin) + (obj[i].data ? "&data=" + obj[i].data : ""));
                    window.tcpLogWrite(i.substring(1), (obj[i].end - obj[i].begin) + (obj[i].data ? "&data=" + obj[i].data : ""));
                    delete obj[i];
                }
            }

            //window.tcpBuriedEnd();
            this.htStore(obj);
        }
    };

    zj.format = {

        forMobile: function (input, value) {
            if (typeof input == "string") input = $(input);
            var f = function (i, v) {
                v = v.replace(/\s/g, "");
                if (v.length > 7) v = v.substring(0, 3) + " " + v.substring(3, 7) + " " + v.substring(7);
                else if (v.length > 3) v = v.substring(0, 3) + " " + v.substring(3);
                i.val(v);
            };
            input.bind("keyup", function () { f($(this), $(this).val()); });
            if (value) f(input, value);
        },

        forIdCard: function (input, value) {
            if (typeof input == "string") input = $(input);
            var f = function (i, v) {
                var v = v.replace(/\s/g, "");
                if (v.length > 14) v = v.substring(0, 6) + " " + v.substring(6, 14) + " " + v.substring(14);
                else if (v.length > 6) v = v.substring(0, 6) + " " + v.substring(6);
                i.val(v);
            };
            input.bind("keyup", function () { f($(this), $(this).val()); });
            if (value) f(input, value);
        }
    };

    zj.tool = {

        // 获取微信授权URL
        getWxAuthUrl: function (url) {
            if (url.indexOf("://") == -1) url = location.href.substring(0, location.href.replace('//', 'aa').indexOf('/')) + location.pathname.substring(0, location.pathname.lastIndexOf('/') + 1) + url;
            if (url.indexOf('?') == -1) url += '?';
            else if (url.charAt(url.length - 1) != '&') url += '&';
            var indexUrl = $("#wxIndexUrl").val(),
                start = indexUrl.substring(0, indexUrl.indexOf("redirect_uri=") + "redirect_uri=".length),
                end = indexUrl.substring(indexUrl.lastIndexOf("response_type=code"));
            return start + url + end;
        },

        // 获取微信授权URL并且把QueryString转换成JSON String
        getWxAuthUrlAndQsToJSONString: function (url, qs) {
            var js = {};
            if (qs) {
                if (qs.indexOf('?') == 0) qs = qs.substring(1);
                var j,
                    arr = qs.split('&');
                for (var i in arr) {
                    if (!arr[i]) continue;
                    j = arr[i].indexOf('=');
                    if (j == -1) js[arr[i]] = "";
                    else js[arr[i].substring(0, j)] = arr[i].substring(j + 1);
                }
            }
            zj.log(js);
            return this.getWxAuthUrl(url + "?urlQueryString=" + encodeURI(JSON.stringify(js)) + "&");
        },

        // 获取当前URL中的参数并转换成JSON对象【不能兼容&符号】
        getJSONFromUrlQs: function () {
            var qj = getRequest();
            if (typeof qj.urlQueryString != 'undefined' && qj.urlQueryString) {
                try {
                    return JSON.parse(decodeURI(qj.urlQueryString));
                } catch (e) { }
            }
            return null;
        },

        toIndex: function () {
            location.href = "trainQuery.html";
        }
    };

    zj.hack = {

        setTitle: function (title) {
            document.title = title;
            if (zj.envi.isIOS) {
                // hack在微信等webview中无法修改document.title的情况
                var ifr = $('<iframe src="/favicon.ico"></iframe>');
                ifr.on('load', function () {
                    setTimeout(function () {
                        ifr.off('load').remove();
                    }, 0);
                }).appendTo($('body'));
            }
        }
    };

    window.zj = zj;

})();

if (window != parent) top.location.href = window.location.href;


function _12306MenuClick(e) {
    location.href = "trainMy12306.html"; return;

    showLoading();
    zj.config.getAccountConfigure(function (c) {
        hideLoading();
        if (c == zj.useAccountType.tc) {
            zjPopup.showDialog("12306系统升级中，您可以直接点击【火车查询】使用微信购票哦", "知道了");
            return;
        }
        if (utilityServertime.isWorkTime()) {
            zj.trainUser.isLogined(function (isLogined) {

                /*
                alert(isLogined);
                alert(storeWithExpiration.get('isTrainLogged'));
                alert(store.get('TrainUser'));
                */

                if (isLogined) {
                    var msg = zj.trainUser.get().username + "【已登录】";
                    zjPopup.showDialog(msg, "极速购票");
                } else {
                    var root = location.href.substring(0, location.href.lastIndexOf("/") + 1);
                    oldUrl = root + "trainquery.html?",
                    url = root + "trainWxAuth.html?toaction=12306menu&",
                    //href = $("#wxIndexUrl").val().replace(oldUrl, url);
                    href = "trainKyfwPage.html?toaction=12306menu";
                    location.href = href;
                    //location.href = ("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3827070276e49e30|redirect_uri=" + url + "?toAction=12306menu|showwxpaytitle=2|response_type=code|scope=snsapi_base|state=123#wechat_redirect").zjReplace('|', '&');
                }
            });
        } else zjPopup.showDialog("23:00-7:00夜间时段12306休息，次日7:00以后再来哦", "知道了");
    });
}

