/**
 * Cooltip.js - Lightweight, jQuery tooltip plugin
 * v0.5.1
 * Docs: http://jaketlarson.github.io/cooltip/
 *
 * Copyright(c) 2015 Jake Larson <codereloadrepeat@gmail.com> <codereloadrepeat.com>
 * MIT Licensed. http://www.opensource.org/licenses/mit-license.php
 *
 * jQuery plugin boilerplate used in this script can be found at
 * https://github.com/jquery-boilerplate/jquery-boilerplate/tree/master/src
*/
(function($, window, document) {
  var Cooltip, defaults, pluginName;
  pluginName = 'cooltip';
  defaults = {
    direction: 'top',
    trigger: 'hover',
    align: 'middle',
    attr: 'title',
    "class": '',
    enabled: true
  };
  Cooltip = function(target, options) {
    this.target = target;
    this.$target = $(target);
    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    return this.init();
  };
  Cooltip.prototype = {
    init: function() {
      this.uniq_id = Math.random().toString(36).slice(2);
      this._aligning_arrow_buffer = .3 * 16;
      this._aligning_arrow_width = .8 * 16;
      this._initTip();
      this._bindTrigger();
    },
    _initTip: function() {
      this.$tip = $("<div/>", {
        id: this.uniq_id,
        "class": 'cooltip'
      });
      this.update();
      if (this.options["class"].length > 0) {
        this.$tip.addClass(this.options["class"]);
      }
      this._enabled = !!this.options.enabled;
      this._matchArrowColor();
    },
    _positionTip: function() {
      var position;
      this._setClass();
      position = this._getPosition();
      this.$tip.css({
        left: position.left,
        top: position.top
      });
    },
    _calcPositionLeft: function() {
      var left;
      left = null;
      if (this.options.direction === 'top' || this.options.direction === 'bottom') {
        if (this.options.align === 'right') {
          left = this.$target.offset().left + this.$target.outerWidth(true) / 2 - this._aligning_arrow_width / 2 - this._aligning_arrow_buffer;
        } else if (this.options.align === 'left') {
          left = this.$target.offset().left - this.$tip.outerWidth(true) + this.$target.outerWidth(true) / 2 + this._aligning_arrow_width / 2 + this._aligning_arrow_buffer;
        } else {
          left = this.$target.offset().left + this.$target.outerWidth(true) / 2 - this.$tip.outerWidth(true) / 2;
        }
      } else if (this.options.direction === 'left') {
        left = this.$target.offset().left - this.$tip.outerWidth(true);
      } else if (this.options.direction === 'right') {
        left = this.$target.offset().left + this.$target.outerWidth(true);
      }
      return left;
    },
    _calcPositionTop: function() {
      var top;
      top = null;
      if (this.options.direction === 'top') {
        return top = this.$target.offset().top - this.$tip.outerHeight(true);
      } else if (this.options.direction === 'bottom') {
        return top = this.$target.offset().top + this.$target.outerHeight(true);
      } else if (this.options.direction === 'left' || this.options.direction === 'right') {
        if (this.options.align === 'top') {
          return top = this.$target.offset().top - this.$tip.outerHeight(true) + this.$target.outerHeight(true) / 2 + this._aligning_arrow_width / 2 + this._aligning_arrow_buffer;
        } else if (this.options.align === 'bottom') {
          return top = this.$target.offset().top + this.$target.outerHeight(true) / 2 - this._aligning_arrow_width / 2 - this._aligning_arrow_buffer;
        } else {
          return top = this.$target.offset().top + this.$target.outerHeight(true) / 2 - this.$tip.outerHeight(true) / 2;
        }
      }
    },
    _getPosition: function() {
      var position;
      position = {
        left: this._calcPositionLeft(),
        top: this._calcPositionTop()
      };
      return position;
    },
    _setClass: function() {
      switch (this.options.direction) {
        case 'top':
          this.$tip.addClass('direction-top');
          break;
        case 'right':
          this.$tip.addClass('direction-right');
          break;
        case 'bottom':
          this.$tip.addClass('direction-bottom');
          break;
        case 'left':
          this.$tip.addClass('direction-left');
      }
      if (this.options.direction === 'top' || this.options.direction === 'bottom') {
        switch (this.options.align) {
          case 'left':
            this.$tip.addClass('align-left');
            break;
          case 'right':
            this.$tip.addClass('align-right');
        }
      }
      if (this.options.direction === 'right' || this.options.direction === 'left') {
        switch (this.options.align) {
          case 'top':
            this.$tip.addClass('align-top');
            break;
          case 'bottom':
            this.$tip.addClass('align-bottom');
        }
      }
    },
    _bindTrigger: function() {
      var bindAsFocus, bindAsHover;
      bindAsHover = (function(_this) {
        return function() {
          _this.$target.hover(function(e) {
            _this.showTip();
            return _this._maskTitle();
          }, function(e) {
            _this.hideTip();
            return _this._unmaskTitle();
          });
        };
      })(this);
      bindAsFocus = (function(_this) {
        return function() {
          _this.$target.focus(function(e) {
            return _this.showTip();
          });
          _this.$target.blur(function(e) {
            return _this.hideTip();
          });
        };
      })(this);
      switch (this.options.trigger) {
        case 'hover':
          bindAsHover();
          break;
        case 'focus':
          bindAsFocus();
          break;
        default:
          bindAsHover();
      }
    },
    _appendTip: function() {
      return this.$tip.appendTo($('body'));
    },
    showTip: function() {
      if (this._enabled) {
        this._appendTip();
        this._positionTip();
      }
    },
    hideTip: function() {
      if (this._enabled) {
        this.$tip.remove();
      }
    },
    _maskTitle: function() {
      var is_using_title_attr, title_exists;
      is_using_title_attr = this.options.attr === 'title' ? true : false;
      title_exists = typeof this.$target.attr('title') !== typeof void 0 && this.$target.attr('title') !== false && this.$target.attr('title').length > 0 ? true : false;
      if (is_using_title_attr && title_exists) {
        this.$target.data('title', this.$target.attr('title'));
        this.$target.attr('title', '');
      }
    },
    _unmaskTitle: function() {
      var data_title_exists, title_already_exists;
      data_title_exists = typeof this.$target.attr('title') !== typeof void 0 && this.$target.attr('title') !== false ? true : false;
      title_already_exists = typeof this.$target.attr('title') !== typeof void 0 && this.$target.attr('title') !== false && this.$target.attr('title').length > 0 ? true : false;
      if (data_title_exists && !title_already_exists) {
        this.$target.attr('title', this.$target.data('title'));
        this.$target.data('title', '');
      }
    },
    _matchArrowColor: function() {
      var tip_bg;
      $('body').append(this.$tip);
      if (parseInt(this.$tip.css('border-width')) > 0) {
        tip_bg = this.$tip.css('border-color');
      } else {
        tip_bg = this.$tip.css('background-color');
      }
      this.$tip.remove();
      if (tip_bg.length > 0) {
        return this.$tip.css('border-color', tip_bg);
      }
    },
    addClass: function(class_name) {
      if (!this.$tip.hasClass(class_name)) {
        return this.$tip.addClass(class_name);
      }
    },
    removeClass: function(class_name) {
      if (this.$tip.hasClass(class_name)) {
        return this.$tip.removeClass(class_name);
      }
    },
    disable: function() {
      return this._enabled = false;
    },
    enable: function() {
      return this._enabled = true;
    },
    destroy: function() {
      this._disabled;
      return this.$tip.remove();
    },
    update: function() {
      this.$tip.html(this.$target.attr(this.options.attr));
      return this._positionTip();
    }
  };
  return $.fn[pluginName] = function(options, arg) {
    return this.each(function() {
      var instance;
      if (!$.data(this, 'plugin_' + pluginName)) {
        return $.data(this, 'plugin_' + pluginName, new Cooltip(this, options));
      } else {
        if (typeof options === 'string') {
          instance = $.data(this, 'plugin_' + pluginName);
          switch (options) {
            case 'addClass':
              return instance.addClass(arg);
            case 'removeClass':
              return instance.removeClass(arg);
            case 'disable':
              return instance.disable();
            case 'enable':
              return instance.enable();
            case 'destroy':
              return instance.destroy();
            case 'update':
              return instance.update();
          }
        }
      }
    });
  };
})(jQuery, window, document);
