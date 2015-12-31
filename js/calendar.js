/*from tccdn minify at 2015-12-31 0:16:10,file：/touch/weixin/train/js/public/calendar/0.0.5/calendar.js*/
String.prototype.replaceWith = function(d) {
  return this.replace(/\{\$(\w+)\}/g, function(a, c) {
    if (c in d) {
      return d[c];
    } else {
      return a;
    }
  });
}
String.prototype.trim = String.prototype.trim || function() {
  return this.replace(/(^\s*)|(\s*$)/g, "");
};
Function.prototype.bind = function(a) {
  var c = this;
  var d = [].slice.call(arguments, 1);
  return function() {
    return c.apply(a, d.concat([].slice.call(arguments, 0)));
  };
}

var extend = function(obja, objb) {
  for (var b in objb) {
    if (objb[b] && objb[b].constructor == Object) {
      if (!obja[b]) {
        obja[b] = {};
      }
      arguments.callee(obja[b], objb[b])
    } else {
      obja[b] = objb[b];
    }
  }
  return obja;
};
var addClass = function() {
  if (!hasClass(arguments[0], arguments[1])) {
    arguments[0].className = [arguments[0].className.trim(), arguments[1].trim()]
      .join(" ");
  }
}
var removeClass = function() {
  if (hasClass(arguments[0], arguments[1])) {
    var reg = new RegExp('(\\s|^)' + arguments[1] + '(\\s|$)');
    arguments[0].className = arguments[0].className.replace(reg, ' ').split(
      " ").join(" ").trim();
  }
}
var hasClass = function() {
  return (arguments[0].className || "").match(new RegExp('(\\s|^)' +
    arguments[1] + '(\\s|$)'));
}
var addEvent = function(o, eType, fn) {
  if (o.addEventListener) {
    o.addEventListener(eType, fn, false);
  } else if (o.attachEvent) {
    o.attachEvent("on" + eType, fn);
  } else {
    o["on" + eType] = fn;
  }
}
var removeEvent = function(obj, type, fn) {
  if (obj.removeEventListener) obj.removeEventListener(type, fn, false);
  else if (obj.detachEvent) {
    obj.detachEvent("on" + type, obj[type + fn]);
    obj[type + fn] = null;
    obj["e" + type + fn] = null;
  }
}
String.prototype.padLeft = function (t, p) {
    var e = []; p = p || "0";
    for (var d = 0, a = t - this.length; d < a; d++) {
        e.push(p);
    }
    e.push(this).j;
    return e.join('');
}
String.prototype.padRight = function (t, p) {
    var e = [this]; p = p || "0";
    for (var d = 0, a = t - this.length; d < a; d++) {
        e.push(p);
    }
    return e.join('');
}
var triggerEvent = function() {
  if (document.createEvent) {
    var evt = document.createEvent("TouchEvent");
    evt.initEvent(arguments[1], true, true);
    arguments[0].dispatchEvent(evt);
  } else {
    arguments[0].fireEvent('on' + arguments[1]);
  }
}
var  parents = function() {
  if (arguments.length > 1) {
      var tempNode = arguments[0].parentNode;
      if(arguments[0].tagName == arguments[1].toUpperCase()){
          return arguments[0];
      }
      while (tempNode && tempNode.tagName != arguments[1].toUpperCase()) {
          tempNode = tempNode.parentNode;
      }
      return tempNode;
  } else {
      return arguments[0].parentNode;
  }
}

/*!
 * iScroll Lite base on iScroll v4.1.6 ~ Copyright (c) 2011 Matteo Spinelli, http://cubiq.org
 * Released under MIT license, http://cubiq.org/license
 */

;(function(){
var m = Math,
  mround = function (r) { return r >> 0; },
  vendor = (/webkit/i).test(navigator.appVersion) ? 'webkit' :
    (/firefox/i).test(navigator.userAgent) ? 'Moz' :
    'opera' in window ? 'O' : '',

    // Browser capabilities
    isAndroid = (/android/gi).test(navigator.appVersion),
    isIDevice = (/iphone|ipad/gi).test(navigator.appVersion),
    isPlaybook = (/playbook/gi).test(navigator.appVersion),
    isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),

    has3d = 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix(),
    hasTouch = 'ontouchstart' in window && !isTouchPad,
    hasTransform = vendor + 'Transform' in document.documentElement.style,
    hasTransitionEnd = isIDevice || isPlaybook,

  nextFrame = (function() {
      return window.requestAnimationFrame
      || window.webkitRequestAnimationFrame
      || window.mozRequestAnimationFrame
      || window.oRequestAnimationFrame
      || window.msRequestAnimationFrame
      || function(callback) { return setTimeout(callback, 17); }
  })(),
  cancelFrame = (function () {
      return window.cancelRequestAnimationFrame
      || window.cancelAnimationFrame
      || window.webkitCancelAnimationFrame
      || window.webkitCancelRequestAnimationFrame
      || window.mozCancelRequestAnimationFrame
      || window.oCancelRequestAnimationFrame
      || window.msCancelRequestAnimationFrame
      || clearTimeout
  })(),

  // Events
  RESIZE_EV = 'onorientationchange' in window ? 'orientationchange' : 'resize',
  START_EV = hasTouch ? 'touchstart' : 'mousedown',
  MOVE_EV = hasTouch ? 'touchmove' : 'mousemove',
  END_EV = hasTouch ? 'touchend' : 'mouseup',
  CANCEL_EV = hasTouch ? 'touchcancel' : 'mouseup',

  // Helpers
  trnOpen = 'translate' + (has3d ? '3d(' : '('),
  trnClose = has3d ? ',0)' : ')',

  // Constructor
  iScroll = function (el, options) {
    var that = this,
      doc = document,
      i;

    that.wrapper = typeof el == 'object' ? el : doc.getElementById(el);
    that.wrapper.style.overflow = 'hidden';
    that.scroller = that.wrapper.children[0];

    // Default options
    that.options = {
      hScroll: true,
      vScroll: true,
      x: 0,
      y: 0,
      bounce: true,
      bounceLock: false,
      momentum: true,
      lockDirection: true,
      useTransform: true,
      useTransition: false,

      // Events
      onRefresh: null,
      onBeforeScrollStart: function (e) { e.preventDefault(); },
      onScrollStart: null,
      onBeforeScrollMove: null,
      onScrollMove: null,
      onBeforeScrollEnd: null,
      onScrollEnd: null,
      onTouchEnd: null,
      onDestroy: null
    };

    // User defined options
    for (i in options) that.options[i] = options[i];

    // Set starting position
    that.x = that.options.x;
    that.y = that.options.y;

    // Normalize options
    that.options.useTransform = hasTransform ? that.options.useTransform : false;
    that.options.hScrollbar = that.options.hScroll && that.options.hScrollbar;
    that.options.vScrollbar = that.options.vScroll && that.options.vScrollbar;
    that.options.useTransition = hasTransitionEnd && that.options.useTransition;

    // Set some default styles
    that.scroller.style[vendor + 'TransitionProperty'] = that.options.useTransform ? '-' + vendor.toLowerCase() + '-transform' : 'top left';
    that.scroller.style[vendor + 'TransitionDuration'] = '0';
    that.scroller.style[vendor + 'TransformOrigin'] = '0 0';
    if (that.options.useTransition) that.scroller.style[vendor + 'TransitionTimingFunction'] = 'cubic-bezier(0.33,0.66,0.66,1)';
    
    if (that.options.useTransform) that.scroller.style[vendor + 'Transform'] = trnOpen + that.x + 'px,' + that.y + 'px' + trnClose;
    else that.scroller.style.cssText += ';position:absolute;top:' + that.y + 'px;left:' + that.x + 'px';

    that.refresh();

    that._bind(RESIZE_EV, window);
    that._bind(START_EV);
    if (!hasTouch) that._bind('mouseout', that.wrapper);
  };

// Prototype
iScroll.prototype = {
  enabled: true,
  x: 0,
  y: 0,
  steps: [],
  scale: 1,
  
  handleEvent: function (e) {
    var that = this;
    switch(e.type) {
      case START_EV:
        if (!hasTouch && e.button !== 0) return;
        that._start(e);
        break;
      case MOVE_EV: that._move(e); break;
      case END_EV:
      case CANCEL_EV: that._end(e); break;
      case RESIZE_EV: that._resize(); break;
      case 'mouseout': that._mouseout(e); break;
      case 'webkitTransitionEnd': that._transitionEnd(e); break;
    }
  },

  _resize: function () {
    this.refresh();
  },
  
  _pos: function (x, y) {
    x = this.hScroll ? x : 0;
    y = this.vScroll ? y : 0;

    if (this.options.useTransform) {
      this.scroller.style[vendor + 'Transform'] = trnOpen + x + 'px,' + y + 'px' + trnClose + ' scale(' + this.scale + ')';
    } else {
      x = mround(x);
      y = mround(y);
      this.scroller.style.left = x + 'px';
      this.scroller.style.top = y + 'px';
    }

    this.x = x;
    this.y = y;
  },

  _start: function (e) {
    var that = this,
      point = hasTouch ? e.touches[0] : e,
      matrix, x, y;

    if (!that.enabled) return;

    if (that.options.onBeforeScrollStart) that.options.onBeforeScrollStart.call(that, e);
    
    if (that.options.useTransition) that._transitionTime(0);

    that.moved = false;
    that.animating = false;
    that.zoomed = false;
    that.distX = 0;
    that.distY = 0;
    that.absDistX = 0;
    that.absDistY = 0;
    that.dirX = 0;
    that.dirY = 0;

    if (that.options.momentum) {
      if (that.options.useTransform) {
        // Very lame general purpose alternative to CSSMatrix
        matrix = getComputedStyle(that.scroller, null)[vendor + 'Transform'].replace(/[^0-9-.,]/g, '').split(',');
        x = matrix[4] * 1;
        y = matrix[5] * 1;
      } else {
        x = getComputedStyle(that.scroller, null).left.replace(/[^0-9-]/g, '') * 1;
        y = getComputedStyle(that.scroller, null).top.replace(/[^0-9-]/g, '') * 1;
      }
      
      if (x != that.x || y != that.y) {
        if (that.options.useTransition) that._unbind('webkitTransitionEnd');
        else cancelFrame(that.aniTime);
        that.steps = [];
        that._pos(x, y);
      }
    }

    that.startX = that.x;
    that.startY = that.y;
    that.pointX = point.pageX;
    that.pointY = point.pageY;

    that.startTime = e.timeStamp || Date.now();

    if (that.options.onScrollStart) that.options.onScrollStart.call(that, e);

    that._bind(MOVE_EV);
    that._bind(END_EV);
    that._bind(CANCEL_EV);
  },
  
  _move: function (e) {

    var that = this,
      point = hasTouch ? e.touches[0] : e,
      deltaX = point.pageX - that.pointX,
      deltaY = point.pageY - that.pointY,
      newX = that.x + deltaX,
      newY = that.y + deltaY,
      timestamp = e.timeStamp || Date.now();

    if (that.options.onBeforeScrollMove) that.options.onBeforeScrollMove.call(that, e);

    that.pointX = point.pageX;
    that.pointY = point.pageY;

    // Slow down if outside of the boundaries
    if (newX > 0 || newX < that.maxScrollX) {
      newX = that.options.bounce ? that.x + (deltaX / 2) : newX >= 0 || that.maxScrollX >= 0 ? 0 : that.maxScrollX;
    }
    if (newY > 0 || newY < that.maxScrollY) { 
      newY = that.options.bounce ? that.y + (deltaY / 2) : newY >= 0 || that.maxScrollY >= 0 ? 0 : that.maxScrollY;
    }

    that.distX += deltaX;
    that.distY += deltaY;
    that.absDistX = m.abs(that.distX);
    that.absDistY = m.abs(that.distY);

    if (that.absDistX < 6 && that.absDistY < 6) {
      return;
    }

    // Lock direction
    if (that.options.lockDirection) {
      if (that.absDistX > that.absDistY + 5) {
        newY = that.y;
        deltaY = 0;
      } else if (that.absDistY > that.absDistX + 5) {
        newX = that.x;
        deltaX = 0;
      }
    }

    that.moved = true;
    that._pos(newX, newY);
    that.dirX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
    that.dirY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;

    if (timestamp - that.startTime > 300) {
      that.startTime = timestamp;
      that.startX = that.x;
      that.startY = that.y;
    }
    
    if (that.options.onScrollMove) that.options.onScrollMove.call(that, e);
  },
  
  _end: function (e) {
    if (hasTouch && e.touches.length != 0) return;

    var that = this,
      point = hasTouch ? e.changedTouches[0] : e,
      target, ev,
      momentumX = { dist:0, time:0 },
      momentumY = { dist:0, time:0 },
      duration = (e.timeStamp || Date.now()) - that.startTime,
      newPosX = that.x,
      newPosY = that.y,
      newDuration;

    that._unbind(MOVE_EV);
    that._unbind(END_EV);
    that._unbind(CANCEL_EV);

    if (that.options.onBeforeScrollEnd) that.options.onBeforeScrollEnd.call(that, e);

    if (!that.moved) {
      if (hasTouch) {
        // Find the last touched element
        target = point.target;
        while (target.nodeType != 1) target = target.parentNode;

        if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA') {
          ev = document.createEvent('MouseEvents');
          ev.initMouseEvent('click', true, true, e.view, 1,
            point.screenX, point.screenY, point.clientX, point.clientY,
            e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
            0, null);
          ev._fake = true;
          target.dispatchEvent(ev);
        }
      }

      that._resetPos(200);

      if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
      return;
    }

    if (duration < 300 && that.options.momentum) {
      momentumX = newPosX ? that._momentum(newPosX - that.startX, duration, -that.x, that.scrollerW - that.wrapperW + that.x, that.options.bounce ? that.wrapperW : 0) : momentumX;
      momentumY = newPosY ? that._momentum(newPosY - that.startY, duration, -that.y, (that.maxScrollY < 0 ? that.scrollerH - that.wrapperH + that.y : 0), that.options.bounce ? that.wrapperH : 0) : momentumY;

      newPosX = that.x + momentumX.dist;
      newPosY = that.y + momentumY.dist;

      if ((that.x > 0 && newPosX > 0) || (that.x < that.maxScrollX && newPosX < that.maxScrollX)) momentumX = { dist:0, time:0 };
      if ((that.y > 0 && newPosY > 0) || (that.y < that.maxScrollY && newPosY < that.maxScrollY)) momentumY = { dist:0, time:0 };
    }

    if (momentumX.dist || momentumY.dist) {
      newDuration = m.max(m.max(momentumX.time, momentumY.time), 10);

      that.scrollTo(mround(newPosX), mround(newPosY), newDuration);

      if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
      return;
    }

    that._resetPos(200);
    if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
  },
  
  _resetPos: function (time) {
    var that = this,
      resetX = that.x >= 0 ? 0 : that.x < that.maxScrollX ? that.maxScrollX : that.x,
      resetY = that.y >= 0 || that.maxScrollY > 0 ? 0 : that.y < that.maxScrollY ? that.maxScrollY : that.y;

    if (resetX == that.x && resetY == that.y) {
      if (that.moved) {
        if (that.options.onScrollEnd) that.options.onScrollEnd.call(that);    // Execute custom code on scroll end
        that.moved = false;
      }

      return;
    }

    that.scrollTo(resetX, resetY, time || 0);
  },
  
  _mouseout: function (e) {
    var t = e.relatedTarget;

    if (!t) {
      this._end(e);
      return;
    }

    while (t = t.parentNode) if (t == this.wrapper) return;
    
    this._end(e);
  },

  _transitionEnd: function (e) {
    var that = this;

    if (e.target != that.scroller) return;

    that._unbind('webkitTransitionEnd');
    
    that._startAni();
  },

  /**
   *
   * Utilities
   *
   */
  _startAni: function () {
    var that = this,
      startX = that.x, startY = that.y,
      startTime = Date.now(),
      step, easeOut,
      animate;



    if (that.animating) return;

    if (!that.steps.length) {
      that._resetPos(400);
      return;
    }

    step = that.steps.shift();

    if (step.x == startX && step.y == startY) step.time = 0;

    that.animating = true;
    that.moved = true;

    if (that.options.useTransition) {
      that._transitionTime(step.time);
      that._pos(step.x, step.y);
      that.animating = false;
      if (step.time) that._bind('webkitTransitionEnd');
      else that._resetPos(0);
      return;
    }
    
    animate = function () {
      var now = Date.now(),
        newX, newY;

      if (that.options.onScrollMove) that.options.onScrollMove.call(that, {
        y:newY
      });

      if (now >= startTime + step.time) {
        that._pos(step.x, step.y);
        that.animating = false;
        if (that.options.onAnimationEnd) that.options.onAnimationEnd.call(that);      // Execute custom code on animation end
        that._startAni();
        return;
      }

      now = (now - startTime) / step.time - 1;
      easeOut = m.sqrt(1 - now * now);
      newX = (step.x - startX) * easeOut + startX;
      newY = (step.y - startY) * easeOut + startY;
      that._pos(newX, newY);
      if (that.animating) that.aniTime = nextFrame(animate);
    };
    
    animate();
  },

  _transitionTime: function (time) {
    this.scroller.style[vendor + 'TransitionDuration'] = time + 'ms';
  },
  
  _momentum: function (dist, time, maxDistUpper, maxDistLower, size) {
    var deceleration = 0.0006,
      speed = m.abs(dist) / time,
      newDist = (speed * speed) / (2 * deceleration),
      newTime = 0, outsideDist = 0;

    // Proportinally reduce speed if we are outside of the boundaries 
    if (dist > 0 && newDist > maxDistUpper) {
      outsideDist = size / (6 / (newDist / speed * deceleration));
      maxDistUpper = maxDistUpper + outsideDist;
      speed = speed * maxDistUpper / newDist;
      newDist = maxDistUpper;
    } else if (dist < 0 && newDist > maxDistLower) {
      outsideDist = size / (6 / (newDist / speed * deceleration));
      maxDistLower = maxDistLower + outsideDist;
      speed = speed * maxDistLower / newDist;
      newDist = maxDistLower;
    }

    newDist = newDist * (dist < 0 ? -1 : 1);
    newTime = speed / deceleration;

    return { dist: newDist, time: mround(newTime) };
  },

  _offset: function (el) {
    var left = -el.offsetLeft,
      top = -el.offsetTop;
      
    while (el = el.offsetParent) {
      left -= el.offsetLeft;
      top -= el.offsetTop;
    } 

    return { left: left, top: top };
  },

  _bind: function (type, el, bubble) {
    (el || this.scroller).addEventListener(type, this, !!bubble);
  },

  _unbind: function (type, el, bubble) {
    (el || this.scroller).removeEventListener(type, this, !!bubble);
  },


  /**
   *
   * Public methods
   *
   */
  destroy: function () {
    var that = this;

    that.scroller.style[vendor + 'Transform'] = '';

    // Remove the event listeners
    that._unbind(RESIZE_EV, window);
    that._unbind(START_EV);
    that._unbind(MOVE_EV);
    that._unbind(END_EV);
    that._unbind(CANCEL_EV);
    that._unbind('mouseout', that.wrapper);
    if (that.options.useTransition) that._unbind('webkitTransitionEnd');
    
    if (that.options.onDestroy) that.options.onDestroy.call(that);
  },

  refresh: function () {
    var that = this,
      offset;

    that.wrapperW = that.wrapper.clientWidth;
    that.wrapperH = that.wrapper.clientHeight;

    that.scrollerW = that.scroller.offsetWidth;
    that.scrollerH = that.scroller.offsetHeight;
    that.maxScrollX = that.wrapperW - that.scrollerW;
    that.maxScrollY = that.wrapperH - that.scrollerH;
    that.dirX = 0;
    that.dirY = 0;

    that.hScroll = that.options.hScroll && that.maxScrollX < 0;
    that.vScroll = that.options.vScroll && (!that.options.bounceLock && !that.hScroll || that.scrollerH > that.wrapperH);

    offset = that._offset(that.wrapper);
    that.wrapperOffsetLeft = -offset.left;
    that.wrapperOffsetTop = -offset.top;


    that.scroller.style[vendor + 'TransitionDuration'] = '0';

    that._resetPos(200);
  },

  scrollTo: function (x, y, time, relative) {
    var that = this,
      step = x,
      i, l;

    that.stop();

    if (!step.length) step = [{ x: x, y: y, time: time, relative: relative }];
    
    for (i=0, l=step.length; i<l; i++) {
      if (step[i].relative) { step[i].x = that.x - step[i].x; step[i].y = that.y - step[i].y; }
      that.steps.push({ x: step[i].x, y: step[i].y, time: step[i].time || 0 });
    }

    that._startAni();
  },

  scrollToElement: function (el, time) {
    var that = this, pos;
    el = el.nodeType ? el : that.scroller.querySelector(el);
    if (!el) return;

    pos = that._offset(el);
    pos.left += that.wrapperOffsetLeft;
    pos.top += that.wrapperOffsetTop;

    pos.left = pos.left > 0 ? 0 : pos.left < that.maxScrollX ? that.maxScrollX : pos.left;
    pos.top = pos.top > 0 ? 0 : pos.top < that.maxScrollY ? that.maxScrollY : pos.top;
    time = time === undefined ? m.max(m.abs(pos.left)*2, m.abs(pos.top)*2) : time;

    that.scrollTo(pos.left, pos.top, time);
  },

  disable: function () {
    this.stop();
    this._resetPos(0);
    this.enabled = false;

    // If disabled after touchstart we make sure that there are no left over events
    this._unbind(MOVE_EV);
    this._unbind(END_EV);
    this._unbind(CANCEL_EV);
  },
  
  enable: function () {
    this.enabled = true;
  },
  
  stop: function () {
    cancelFrame(this.aniTime);
    this.steps = [];
    this.moved = false;
    this.animating = false;
  }
};

if (typeof exports !== 'undefined') exports.iScroll = iScroll;
else window.iScroll = iScroll;

})();

/**
* 同程滚动列表
* 该组件需依赖iscroll-lite
*
*     @example
*   new List({
*     floatContainer: document.querySelectorAll(".float-header")[0],
*     Scroll: (function() {
*         var listeners = [];
*         var top;
*         var scroll = new iScroll("wrapper", {
*             onScrollMove: function(e) {
*                 top = -this.y;
*                 listeners.forEach(function(fn) {
*                     fn.call(window);
*                 });
*             }
*         });
*         return {
*             onscroll: function(fn) {
*                 listeners.push(fn);
*             },
*             getScrollTop: function() {
*                 return top;
*             },
*             getOffsetTop: function(target) {
*                 return target.offsetTop;
*             }
*         }
*     })(),
*     targets: document.querySelectorAll("ul h3")
*   });
*
* @class List
* @author colacao <cy14477@ly.com>
*/
function List(options) {
  var defaults = {
    /**
     * 需要浮动的头元素
     * @type {Array}
     */
    items: null,
    /**
     * 外层的固定浮动元素
     * @type {HTMLElement}
     */
    floatContainer: null,
    /**
     * 当前浮动头元素的索引值
     * @type {Number}
     */
    currentIndex: -1,
    /**
     * 浮动的头元素的高度
     * @type {Number}
     */
    headerHeight: 0,
    /**
     * 滚动插件(iScroll)
     * @type {Object}
     */
    Scroll:null
  }
  var opt = extend(defaults, options);
  this.initialize(opt);

}
List.prototype = {
  /**
   * 构造函数
   * @param  {Object} options
   */
  initialize: function(options) {
    this.setOptions(options);
    this.fix();
    this.bind();
    location.hash="calContainer";
  },
  /**
   * 设置初始值
   * @param  {Object} options
   */
  setOptions: function(options) {
    extend(this, options);
    this.items = this.createItems();
    
  },
  /**
   * 修正方法 
   */
  fix:function(){
    if (this.targets.length) {
      this.floatContainer.innerHTML = this.targets[0].innerHTML;
    }
  },
  /**
   * 生成头集合
   * @return {Array}
   */
  createItems:function(){
    var items = [];
    for(var i=0;i<this.targets.length;i++){
      items.push({
        node:this.targets[i],
        top:this.Scroll.getOffsetTop(this.targets[i])
      })
    }
    return items;
  },
  /**
   * 绑定事件
   */
  bind: function() {
    this.Scroll.onscroll(this.onScroll.bind(this));
  },
   /**
    * 滚动事件 
    */ 
  onScroll:function(){
    
    var _top = this.Scroll.getScrollTop();
    var top = _top + this.Scroll.getOffsetTop(this.floatContainer);


    if (_top <= 0) {
      this.floatContainer.style.opacity = 0;
    }
    this.render(top);
    var nextNode = this.items[this.currentIndex + 1];
    top += this.headerHeight;
    //document.querySelector(".float-header").innerHTML = "aa"+((nextNode && nextNode.top)+":"+top);

    if (nextNode && (nextNode.top < top)) {
    //document.querySelector(".float-header").innerHTML = "bb"+((nextNode && nextNode.top)+":"+top+":"+(nextNode.top - top));
      this.floatContainer.style.WebkitTransform = "translate(0," + (nextNode.top - top) + "px)";
      this.floatContainer.style.transform = "translate(0," + (nextNode.top - top) + "px)";

    } else {
      this.floatContainer.style.WebkitTransform = ""; 
      this.floatContainer.style.transform = "";
    }
  },
  /**
   * 查找当前的高度是第几个头
   * @param  {Number}
   * @return {Number}
   */
  findIndex: function(top) {
    for (var i = 0, l = this.items.length; i < l; i++) {
      if (this.items[i].top > top) {
        break;
      }
    }
    return i - 1;
  },
  /**
   * 渲染头
   * @param  {Number}
   */
  render: function(top) {
    var index = this.findIndex(top);
    if (index === this.currentIndex) {
      return;
    }
    if (index === -1) {
      this.floatContainer.style.opacity = 0
    } else {
      this.floatContainer.innerHTML = "";
      this.floatContainer.appendChild(this.items[index].node.firstChild.cloneNode(true))
      this.floatContainer.style.opacity = 1
      this.headerHeight = this.floatContainer.offsetHeight;

    }
    this.currentIndex = index;
  }
}


/**
* 同程日历
*
*     @example
*      new Calendar({
*        days: 60,
*        onCreate: function(dom) {
*       
*        },
*        onChange: function(value) {
*          document.getElementById("test").innerHTML = (value);
*        }
*     });
*
* {@link  http://10.14.40.14:51/pingtai-hcp/#p=日历}
* {@link https://www.tapd.cn/20001051/prong/tasks/view/1120001051001016653?left_tree=1}
* @class Calendar
* @author colacao <cy14477@ly.com>
*/

var Calendar = function(options) {
  if(Calendar.prototype.run) return;

  var defaults = {
    id:"__calendars__",
    /**
     * 可用日期范围
     * @type {Array}
     */
    range: [],
    /**
    * 起始日期
    * @cfg {Date} date
    */
    date: new Date(),
    /**
    * 在日历显示的选中日期
    * @cfg {Date} select
    */
    select:"",
    /**
    * 插入日历的元素
    * @cfg {HTMLElement} wrapper
    */
    wrapper: document.documentElement,
    target: null,
    dateAttr:"data-day",
    dayTagName:"A",
    lastValue: -1,
    run:false,
    dely:100,
    todayInfos: ["今天", "", ""],
    /**
    * 显示的日历个数
    * @cfg {Number} count
    */
    count: 3,
    /**
    * 显示多少天的日历
    * @cfg {Number} days
    */
    days: 0,
    /**
    * 日历类型
    * @cfg {String} type
    */
    type:"假",//假/抢
    /**
    * 提示层信息
    * @cfg {Object} tips
    */
    tips: {
      text: "<p class='buyDate'>今天是{$month}月{$day}号，可购买{$month_end}月{$day_end}日的火车票</p>",
      level: 1
    },
    /**
    * 事件
    * @cfg {Object} events
    */
    events: {
      touchstart: "touchstart",
      touchmove: "touchmove",
      touchend: "touchend"
    },
    /**
    * 事件
    * @cfg {Object} template
    */
    template: {
      header:'<h3 class="float-header"></h3>',
      parent: '<ul class="calendar-header"><li class="sunday">日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li> <li class="saturday">六</li></ul>',
      wrappers:"<div class='calendars-wrapper' id='calendars-wrapper'>{$wrapper}</div>",
      wrapper: '{$calendar}',
      calendar: '<dl class="calendar"><dt class="calendar-wrapper" data-year="{$year}" data-month="{$month}"><h3 class="thin-border-top">{$year}年{$month}月</h3>{$item}</dt></dl>',
      item: '<a  data-day="{$day1}"><div  {$Class}>{$day}</div></a>',
      tips: '<div class="tip">{$tip}{$parent}</div>',
      festival: '<span class="fest_{$festival}">{$day}</span>',
      tip:{
        "抢":'<div class="tag_primary"><span class="tag_content">{$type}</span></div>',
        "假":'<div class="tag_rest"><span class="tag_content">{$type}</span></div>'
      }
    },
    /**
    * 样式名
    * @cfg {Object} classNames
    */
    classNames: {
      all:"calendars",
      sunday: "sunday",
      disabled:"disabled",
      saturday: "saturday",
      today: "nian_select",
      select:"nian_select",
      tomorrow: "",
      festival:"festival",
      enter:"fadeInRightBig",
      out:"fadeOutRightBig"
    },
    /**
    * 节日
    * @cfg {Object} festival
    */
    festival: {
      "2015-1-1":["元旦",3],
      "2015-2-18":["春节",7],
      '2015-4-4':["清明",0],
      '2015-5-1':["劳动节",0],
      '2015-6-20':["端午",0],
      '2015-9-3':["胜利日",0],
      '2015-9-26':["中秋",2],
      "2015-10-1":["国庆",7],
      "2016-2-7":["除夕",0],
      "2016-2-8":["春节",6],
      "2016-2-14":["情人节",1],
      "2016-2-22":["元宵节",0],
      "2016-4-4":["清明节",0],
      "2016-6-9":["端午节",0],
      "2016-8-9":["七夕",0],
      "2016-9-15":["中秋节",2],
      "2016-10-1":["国庆节",7],
      "2016-10-19":["重阳节",0],
      "2017-1-27":["除夕",0],
      "2017-1-28":["春节",7],
      "2017-2-11":["元宵节",0],
      "2017-4-4":["清明节",0],
      "2017-5-30":["端午节",0],
      "2017-8-28":["七夕",0],
      "2017-10-1":["国庆节",7],
      "2017-10-4":["中秋节",2],
      "2017-10-28":["重阳节",0],
      "2018-2-15":["除夕",0],
      "2018-2-16":["春节",7],
      "2018-3-2":["元宵节",0],
      "2018-4-5":["清明节",0],
      "2018-6-18":["端午节",0],
      "2018-8-17":["七夕",0],
      "2018-9-24":["中秋节",2],
      "2018-10-1":["国庆节",7],
      "2018-10-17":["重阳节",0],
      "2019-2-4":["除夕",0],
      "2019-2-5":["春节",7],
      "2019-2-19":["元宵节",0],
      "2019-4-5":["清明节",0],
      "2019-6-7":["端午节",0],
      "2019-8-7":["七夕",0],
      "2019-9-13":["中秋节",2],
      "2019-10-1":["国庆节",7],
      "2019-10-7":["重阳节",0],
      "2020-1-24":["除夕",0],
      "2020-1-25":["春节",7],
      "2020-2-8":["元宵节",0],
      "2020-4-4":["清明节",0],
      "2020-6-25":["端午节",0],
      "2020-8-25":["七夕",0],
      "2020-10-1":["中秋节",2],
      "2020-10-25":["重阳",0],
      "2016-1-1":["元旦",3],
      "2017-1-1":["元旦",3],
      "2018-1-1":["元旦",3],
      "2019-1-1":["元旦",3],
      "2020-1-1":["元旦",3],
      "2017-2-14":["情人节",0],
      "2018-2-14":["情人节",0],
      "2019-2-14":["情人节",0],
      "2020-2-14":["情人节",0],
    },
    /**
     * 检查日期是否可选
     * @param  {String}  data       日期
     * @param  {HTMLElement} el 
     * @return {Boolean}          是否能选择
     */
    canChange:function(data,el){
        return true;
    },
    /**
    * 日期改变事件 
    * @event onChange  
    * 日期改变事件  
    */ 
    onChange: function() {},
    /**
    * 日历创建完成事件 
    * @event onCreate  
    * 日历创建完成事件  
    */ 
    onCreate:function(){}
  }
  var opt = extend(defaults, options);
  this.initialize(opt);
  var self = this;
  //alert(1);
  $(window).on("hashchange",function(){
    if(location.hash==""){
     self.close(true);
    }
  })
  
}
Calendar.prototype = {
  /**
   * 构造函数
   * @param  {Object} options
   */
  initialize: function(options) {
    this.setOptions(options);
    this.render();
    this.bind();
    location.hash="calContainer";
  },
   /**
   * 设置初始值
   * @param  {Object} options
   */
  setOptions: function(options) {
    extend(this, options);
      var t1  = new Date(this.date);
      if(this.date && typeof(this.date)=="object"){
          t1 = this.date;
      }else{
        t1 = new Date(this.date.replace(/-/g,"\/"));
      }
    if(t1.getDate()){
      this.date = t1;
    }else{
      this.date = new Date();
    }
    this.date.setHours(0);
    this.date.setMinutes(0);
    this.date.setSeconds(0);
    this.date.setMilliseconds(0);

    this.select  = this.select?new Date(this.select.replace(/-/g,"\/") +" 0:00:00"):"";

    // var t  = new Date(this.select.replace(/-/g,"\/")+" 0:00:00");
    // if(!t.getDate()){
    //   this.select = null;
    // }
  
    this.range = (this.range||[]).map(function(item){
      return new Date(item+" 0:00:00");
    })
  },
  /**
   * 计划两个日期相差的月数
   * @param  {Date} date1
   * @param  {Date} date2
   * @return {Number}
   */
  getMonths: function(date1, date2) {
    var year1 = parseInt(date1.getFullYear()),
      month1 = parseInt(date1.getMonth()),
      year2 = parseInt(date2.getFullYear()),
      month2 = parseInt(date2.getMonth()),
      months = (year2 - year1) * 12 + (month2 - month1) + 1;
      return months;
  },
  /**
   * 创建日历
   * 如果类型是抢,可用日期加5天。
   * 
   * @param  {Date} date
   * @return {String}
   */
  create: function(date) {
    var ret = [];
    var m = date.getMonth();

    if(this.type=="抢"){
       this.days+=5;
    }
    if (this.days) {
      var _count = new Date(date.getFullYear(), date.getMonth(), date.getDate() + this.days);
      this.count = (this.getMonths(date, _count));
    }
    for (var i = 0; i < this.count; i++) {
      var date1 = new Date(date.getFullYear(), m + i, 1);
      var bodyHtml = this.template.wrapper.replaceWith({
        year: date1.getFullYear(),
        month: (date1.getMonth() + 1).toString().padLeft(2),
        months: (date1.getMonth() + 1).toString().padLeft(2),
        calendar: this.template.calendar.replaceWith({
          year: date1.getFullYear(),
          month: (date1.getMonth() + 1).toString().padLeft(2),
          item: this.getDates(date1)
        })
      });
      ret.push(bodyHtml)
    }
    return this.template.wrappers.replaceWith({
      wrapper:ret.join("")
    })
  },
  craeteTips:function(){
    var _tempDate = new Date(this.date.getFullYear(), this.date.getMonth(),this.date.getDate() + this.days);
    var tips = this.template.tips.replaceWith({
      tip: this.tips.text.replaceWith({
        month: this.date.getMonth() + 1,
        day: this.date.getDate(),
        month_end:(_tempDate.getMonth() + 1),
        day_end:_tempDate.getDate()
      })
    });
    return tips;
  },
  /**
   * 触摸开始处理函数
   * @param  {Event} e
   */
  touchstart: function(e) {
    var px = (e.changedTouches.length ? e.changedTouches[0].pageX : 0);
    var py = (e.changedTouches.length ? e.changedTouches[0].pageY : 0);

    this.beginEL = e.target;
    this.px =  px;
    this.py =  py;
  },
  /**
   * 划动处理函数
   * @param  {Event} e
   */
  touchmove: function(e) {
    var px = (e.changedTouches.length ? e.changedTouches[0].pageX : 0);
    var py = (e.changedTouches.length ? e.changedTouches[0].pageY : 0);
    if(Math.abs(px-this.px)>10 || Math.abs(py-this.py)>10){
        this.beginEL = null;
    }
  },
  /**
   *触摸结束处理函数
   * @param  {Event} e
   */
  touchend: function(e) {
    var tag = parents(e.target,this.dayTagName);
    if (e.target == this.beginEL && tag) {
      
      var _value = tag.getAttribute(this.dateAttr);
      var check = this.canChange.call(this,_value,tag);
      if(check){
        addClass(tag.lastChild,this.classNames.select);
        this.onChange(_value);
        setTimeout(function(){
             this.close();
        }.bind(this),this.dely)
     
        //history.back();
      }
    }
    triggerEvent(this.wrapper,this.events.touchend);
  },
  /**
   * 关闭日历
   */
  close:function(noback){
    //"bounceOutDown   
    Calendar.prototype.run=true;
    //history.back();
    removeClass(this.target,this.classNames.enter);
    addClass(this.target,this.classNames.out);
    removeEvent(document.documentElement,this.events.touchmove,this.fixMove);

    setTimeout(function(){
      this.target.parentNode && this.target.parentNode.removeChild(this.target);
      // this.target = null;
      // this.wrapper = null;
      Calendar.prototype.run=false;
      if(!noback){
       history.back();
     }
   }.bind(this),400)
   
  },
  getScrollTop:function (){
      var scrollTop=0;
      if(document.documentElement&&document.documentElement.scrollTop)
      {
          scrollTop=document.documentElement.scrollTop;
      }
      else if(document.body)
      {
          scrollTop=document.body.scrollTop;
      }
      return scrollTop;
  },
  fixMove:function(e){
     e.preventDefault();
  },
  /**
  * 绑定事件 
  */
  bind: function() {
    addEvent(document.documentElement,this.events.touchmove,this.fixMove);

    addEvent(this.target, this.events.touchstart, function(e){
      this.touchstart(e);
    }.bind(this));
    addEvent(this.wrapper, this.events.touchmove, function(e) {
      this.touchmove(e);
    }.bind(this));
    addEvent(this.target, this.events.touchend, function(e) {
      this.touchend(e);
    }.bind(this));
  },
  /**
   * 将日期对象按传入的分隔符分隔
   * @param  {Date} date
   * @param  {String} split
   * @return {String}
   */
  getDateString: function(date, split) {
    split = split || "-";
    var tempArr = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
    return tempArr.join(split);
  },
  /**
   * 返回日期的样式名
   * @param  {Date} date
   * @param  {String} tempDateStr
   * @return {Object}
   */
  getClass: function(date, tempDateStr) {
    var classList = [this.classNames.today, this.classNames.tomorrow, this.classNames.aftertomorrow];
    var tempDay = Math.round(((date - this.date) / (86400000)));
    var returnValue =  "";
    var day = date.getDay();
    var fest = this.festival[tempDateStr];

    if(!this.select){
       returnValue = this.range.length?"":(classList[tempDay] || "");
    }else if(this.select && +date == +this.select){
      returnValue += this.classNames.select;
    }

    if(fest && fest.length<=2){
        returnValue += " "+this.classNames.festival;
    }

    if(tempDay+1<=0 || tempDay>this.days){
      returnValue += " "+this.classNames.disabled;
    }

    returnValue += (day == 0) ? " " + this.classNames.sunday : (day == 6) ?  " " + this.classNames.saturday : "";

    if(+date == +this.range[0] && !this.select){
       returnValue += this.classNames.select;
    }
    //58
    if(this.range.length && (+date<+this.range[0] || +date>+this.range[1])){ 
      returnValue += " "+this.classNames.disabled;
    }

    return {
      'class': returnValue.trim()
    };
  },
  /**
   * 返回日期的显示内容
   * @param  {Date} tempDate
   * @param  {String} tempDateStr
   * @param  {Number} day
   * @return {String}
   */
  getDay:function(tempDate,tempDateStr,day){
    var fest = this.festival[tempDateStr];
    var today = this.setToday(tempDate);
    var select  = this.select;
    var ret = "";
    if(this.type == "抢"){
      var tempDay = Math.round(((tempDate - this.date) / (86400000))) + 1;
       var tip = this.template.tip["抢"];
       var d = tempDay-this.days
        if(d>-4 &&  tempDay<=this.days+1){
          ret =  tip.replaceWith({
            type:"抢"
          })+((today||day));
       }
    }
    if(fest && !ret){
      for(var i=1;i<fest[1];i++){
          var _tempDate = new Date(tempDate.getFullYear(),tempDate.getMonth(), tempDate.getDate()+i);
          var pDay = this.getDateString(_tempDate);
          this.festival[pDay]=[fest[0],fest[1]-i,true];
      }

      var tip = this.template.tip["假"];
      if(fest[1]>0){
        ret = tip.replaceWith({
          type:"假"
        })+(fest.length==2?fest[0]:(today||day));
      }else{
        ret = fest[0];
      }
    }else if(!ret){
      ret= today||day;
    }
    return ret;
  },
  /**
   * 生成传入日期当月日历
   * @param  {Date} date
   * @return {String}
   */
  getDates: function(date) {
    var returnValue = [];
    var day = date.getDate();
    var beginDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay(); //当月的第一天从几开始
    var nDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); //总天数

    var pushObj = {day: "", day1: "",festival: "",Class: ""};
    for (var i = 1; i < 43-(42-nDays-beginDay); i++) {
      var tempDate = new Date(date.getFullYear(), date.getMonth(), (i - beginDay));
      var tempDateStr = this.getDateString(tempDate);
      var tempClass = this.getClass(tempDate, tempDateStr);
      if (i > beginDay && i <= nDays + beginDay) { //当前月
        pushObj = {
          day1: tempDateStr,
          day: this.getDay(tempDate,tempDateStr,i - beginDay),
          Class: (tempClass['class'] ? "class='" + tempClass['class'] + "'" : "")
        };
      }
      returnValue.push(this.template.item.replaceWith(pushObj));
    }
    return returnValue.join("");
  },
  /**
   * 设定今日的样式
   * @param {Date} date
   */
  setToday: function(date) {
    var classList = [this.classNames.today, this.classNames.tomorrow, this.classNames.aftertomorrow];
    var tempDay = Math.round(((date - this.date) / (86400000)));
    var ret = this.todayInfos[tempDay] || "";
    // if(this.range.length){
    //   return "";
    // }else{
      return ret;
    //}
  },
  /**
   * 获取屏幕高度
   * @return {Number}
   */
  winHeight:function(){
      var _h = window.innerHeight
      return ((_h > 0) ? _h :screen.height);
  },
  winWidth:function(){
     var _w = window.innerWidth
     return ((_w > 0) ? _w :screen.width);
  },
  /**
   * 渲染
   */
  render: function() {
    var t = this.create(this.date);
    var _tempwrapper = document.getElementById(this.id)||document.createElement("div");
     _tempwrapper.style.height = this.winHeight() + 'px';
     _tempwrapper.style.width = this.winWidth() + 'px';
    _tempwrapper.className = this.classNames.all;
    _tempwrapper.innerHTML =  t;
    _tempwrapper.id = this.classNames.all;
    var h = document.createElement("div");
    h.innerHTML = this.template.header;
  
    var h2 = document.createElement("div");
    h2.innerHTML = this.craeteTips().replaceWith({
      parent:this.template.parent
    });

    _tempwrapper.appendChild(h.firstChild);
    _tempwrapper.appendChild(h2.firstChild);
   
    this.wrapper.appendChild(_tempwrapper);
    
    _tempwrapper.style.top= this.getScrollTop()+"px";

     addClass(_tempwrapper,"animated");

    //_tempwrapper.style.display = "";
    this.target = _tempwrapper;
   
    //败笔，要计算提示的高度
    //addClass(_tempwrapper,this.classNames.enter);
    var fixHeight = _tempwrapper.childNodes[2].offsetHeight;
    _tempwrapper.childNodes[0].style.paddingTop = fixHeight +'px';
    _tempwrapper.childNodes[1].style.top = fixHeight+'px';
    this.onCreate(this.target);

    addClass(_tempwrapper,this.classNames.enter);
    Calendar.prototype.run=true;
    setTimeout(function(){
      Calendar.prototype.run=false;
    }.bind(this),400);

  }
}


