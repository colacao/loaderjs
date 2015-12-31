/*from tccdn minify at 2015-12-31 0:16:39,file：/touch/weixin/train/js/public/slider.js*/
(function () {
    /**
     * content {selector} 内容块选择元素，默认是ul
     * item    {selector} 幻灯片项的选择器，默认是li
     * loop    {boolen}   是否循环，默认是true
     * speed   {number}   动画切换时长，默认是300毫秒
     * duration {number}  动画之间的间隔，默认是3000毫秒(3秒)
     * autoScroll {boolean} 是否自动滚动，默认是true
    **/
    $.fn.slider = function (options) {
        var sliders = [];
        for (var i = 0, len = this.length; i < len; i++) {
            sliders.push(new Slider(this[i], options));
        }
        if (sliders.length === 1) {
            return sliders[0];
        } else if (sliders.length > 1) {
            return sliders;
        }
    };
    function Slider(elem, options) {
        $.extend(this, {content: "ul", item: "li", loop: true, speed: 300, duration: 3000, autoScroll: true}, options);
        elem = $(elem);
        var content = $(this.content, elem),
            items = $(this.item, elem);
        this.elem = elem;
        this.content = content;
        this.index = 0;
        this.length = items.length;
        if (items.length <= 1) {
            return this;
        }
        elem.css({"overflow": "hidden", position: "relative"});
        content.css({
            position: "relative",
            width: "100%"
        });
        for (var i = 1, len = items.length; i < len; i++) {
            $(items[i]).css({
                position: "absolute",
                width: "100%",
                top: 0,
                left: i * 100 + "%"
            });
        }
        addIndicator.call(this, items.length);
        if (this.loop) { // 循环时需要复制第一张幻灯片插入在最后
            $(items.first().clone()).css({
                position: "absolute",
                width: "100%",
                top: 0,
                left: items.length * 100 + "%"
            }).appendTo(content);
        }
        this.to(this.active ? this.active : 0);
        bindEvent.call(this);
        if (this.autoScroll) {
            this.start();
        }
    }
    function bindEvent () {
        var that = this;
        this.elem.on("touchstart", function (e) {
            var et = e.touches[0];
            that._startLocation = {
                x: et.pageX,
                y: et.pageY
            };
            that._isStart = false;
        }).on("touchmove", function (e) {
            if (e.touches.length > 1 || e.scale && e.scale !== 1) {
                return;
            }
            var et = e.touches[0],
                distX = et.pageX - that._startLocation.x;
            if (!that._isStart) {
                that._isStart = Math.abs(distX) > Math.abs(et.pageY - that._startLocation.y); //不是上下
            }
            if (that._isStart) {
                e.preventDefault();
                clearTimeout(that.timer); // 停止
                var i = that.index,
                    elemWidth = that.elem.width();
                if (that.loop) {  
                    if (that.index === 0 && distX > 0) {
                        i = that.length;
                    }
                } else {//不循环
                    distX = distX / ((that.index === 0 && distX > 0 || that.index == that.length && distX < 0) ? (Math.abs(distX) / elemWidth + 1 ) : 1 );  //增加阻力
                }
                that.content.css({"-webkit-transform": "translate3d(-" + 100 * (i - distX / elemWidth) + "%, 0, 0)"});
                that._distX = distX;
            }
        }).on("touchend touchcancel", function (e) {
            if (that._isStart) {
                if (that._distX < 0) {
                    e.preventDefault();
                    that.next();
                } else {
                    e.preventDefault();
                    that.previous(true);
                }
            }
        });
    }
    Slider.prototype.to = function (i) {
        this.stop();
        var that = this;
        this.content.animate({"-webkit-transform": "translate3d(-"  + i * 100 + "%, 0, 0)"}, this.speed, "ease", function () {
            if (i === that.length) {
                that.content.css({"-webkit-transform": "translate3d(0, 0, 0)"});
                i = 0;
            }
            that.index = i;
            if (that.indicators) {
                $(that.indicators.removeClass("active")[i]).addClass("active");
            }
            that.fn && that.fn();
        });
    };
    Slider.prototype.previous = function (notResetPos) {
        if (!this.loop && this.index === 0) { // 不循环需要停止
            this.to(this.index);
            return;
        }
        var i = this.index - 1;
        if (this.index === 0) {
            i = this.length - 1;
            if (!notResetPos) {
                this.content.css({"-webkit-transform": "translate3d(-"  + 100 * (this.length)+ "%, 0, 0)"});
            }
        }
        this.to(i);
        if (this.autoScroll) {
            this.start();
        }
    };
    Slider.prototype.next = function () {
        if (!this.loop && this.index === this.length - 1) { // 不循环需要停止
            this.to(this.index);
            return;
        }
        this.to(this.index + 1);
        if (this.autoScroll) {
            this.start();
        }
    };
    Slider.prototype.start = function () {
        var that = this;
        this.timer = setTimeout(function () {
            that.next();
        }, this.duration);
    };
    Slider.prototype.stop = function () {
        clearTimeout(this.timer);
    };
    function addIndicator(len) {
        var htmlStr = '<span class="indicator">';
        for (var i = 0; i < len; i++) {
            htmlStr += '<i></i>';
        }
        htmlStr += '</span>';
        this.elem.append(htmlStr);
        var indicator = $(".indicator", this.elem);
        indicator.css({"margin-left": - indicator.width() / 2 + "px"});
        this.indicators = $("i", indicator);
        $(this.indicators[0]).addClass("active");
    }
})();
