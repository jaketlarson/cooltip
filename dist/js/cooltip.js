/**
 * Cooltip.js - Lightweight, jQuery tooltip plugin
 * v0.2.0
 * GitHub: https://github.com/jaketlarson/cooltip
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
    attr: 'title'
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
      this.$tip.html(this.$target.attr(this.options.attr));
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
      var bindAsHover;
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
      switch (this.options.trigger) {
        case 'hover':
          bindAsHover();
          break;
        default:
          bindAsHover();
      }
    },
    _appendTip: function() {
      return this.$tip.appendTo($('body'));
    },
    showTip: function() {
      this._appendTip();
      this._positionTip();
    },
    hideTip: function() {
      this.$tip.remove();
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
    }
  };
  return $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, 'plugin_' + pluginName)) {
        return $.data(this, 'plugin_' + pluginName, new Cooltip(this, options));
      }
    });
  };
})(jQuery, window, document);

$(function() {
  $("a#demo-direction-top-align-default").cooltip({
    direction: 'top'
  });
  $("a#demo-direction-top-align-right").cooltip({
    direction: 'top',
    align: 'right'
  });
  $("a#demo-direction-top-align-left").cooltip({
    direction: 'top',
    align: 'left'
  });
  $("a#demo-direction-right-align-default").cooltip({
    direction: 'right'
  });
  $("a#demo-direction-right-align-top").cooltip({
    direction: 'right',
    align: 'top'
  });
  $("a#demo-direction-right-align-bottom").cooltip({
    direction: 'right',
    align: 'bottom'
  });
  $("a#demo-direction-bottom-align-default").cooltip({
    direction: 'bottom'
  });
  $("a#demo-direction-bottom-align-right").cooltip({
    direction: 'bottom',
    align: 'right'
  });
  $("a#demo-direction-bottom-align-left").cooltip({
    direction: 'bottom',
    align: 'left'
  });
  $("a#demo-direction-left-align-default").cooltip({
    direction: 'left'
  });
  $("a#demo-direction-left-align-top").cooltip({
    direction: 'left',
    align: 'top'
  });
  return $("a#demo-direction-left-align-bottom").cooltip({
    direction: 'left',
    align: 'bottom'
  });
});
