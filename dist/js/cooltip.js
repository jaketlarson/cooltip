/**
 * Cooltip.js - Lightweight, jQuery tooltip plugin
 * v0.1.5
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
    direction: 'right',
    trigger: 'hover',
    lean: 'middle',
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
      this._initTip();
      return this._bindTrigger();
    },
    _initTip: function() {
      this.$tip = $("<div/>", {
        id: this.uniq_id,
        "class": 'cooltip'
      });
      this.$tip.html(this.$target.attr(this.options.attr));
      return $('body').append(this.$tip);
    },
    _positionTip: function() {
      var position;
      position = this._getPosition();
      return this.$tip.css({
        left: position.left,
        top: position.top
      });
    },
    _getPosition: function() {
      var position, positionBottom, positionLeft, positionRight, positionTop;
      position = {
        left: null,
        top: null
      };
      positionTop = (function(_this) {
        return function() {
          position.left = _this.$target.offset().left + _this.$target.outerWidth(true) / 2 - _this.$tip.outerWidth(true) / 2;
          position.top = _this.$target.offset().top - _this.$tip.innerHeight();
          return _this.$tip.addClass('direction-top');
        };
      })(this);
      positionRight = (function(_this) {
        return function() {
          position.left = _this.$target.offset().left + _this.$target.outerWidth(true);
          position.top = _this.$target.offset().top + _this.$target.outerHeight(true) / 2 - _this.$tip.innerHeight() / 2;
          return _this.$tip.addClass('direction-right');
        };
      })(this);
      positionBottom = (function(_this) {
        return function() {
          position.left = _this.$target.offset().left + _this.$target.outerWidth(true) / 2 - _this.$tip.innerWidth() / 2;
          position.top = _this.$target.offset().top + _this.$target.outerHeight(true);
          return _this.$tip.addClass('direction-bottom');
        };
      })(this);
      positionLeft = (function(_this) {
        return function() {
          position.left = _this.$target.offset().left - _this.$tip.innerWidth();
          position.top = _this.$target.offset().top + _this.$target.outerHeight(true) / 2 - _this.$tip.innerHeight() / 2;
          return _this.$tip.addClass('direction-left');
        };
      })(this);
      switch (this.options.direction) {
        case 'top':
          positionTop();
          break;
        case 'right':
          positionRight();
          break;
        case 'bottom':
          positionBottom();
          break;
        case 'left':
          positionLeft();
          break;
        default:
          positionTop();
      }
      return position;
    },
    _bindTrigger: function() {
      var bindAsHover;
      bindAsHover = (function(_this) {
        return function() {
          return _this.$target.hover(function(e) {
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
          return bindAsHover();
        default:
          return bindAsHover();
      }
    },
    showTip: function() {
      this.$tip.show();
      return this._positionTip();
    },
    hideTip: function() {
      return this.$tip.hide();
    },
    _maskTitle: function() {
      var is_using_title_attr, title_exists;
      is_using_title_attr = this.options.attr === 'title' ? true : false;
      title_exists = typeof this.$target.attr('title') !== typeof void 0 && this.$target.attr('title') !== false && this.$target.attr('title').length > 0 ? true : false;
      if (is_using_title_attr && title_exists) {
        this.$target.data('title', this.$target.attr('title'));
        return this.$target.attr('title', '');
      }
    },
    _unmaskTitle: function() {
      var data_title_exists, title_already_exists;
      data_title_exists = typeof this.$target.attr('title') !== typeof void 0 && this.$target.attr('title') !== false ? true : false;
      title_already_exists = typeof this.$target.attr('title') !== typeof void 0 && this.$target.attr('title') !== false && this.$target.attr('title').length > 0 ? true : false;
      if (data_title_exists && !title_already_exists) {
        this.$target.attr('title', this.$target.data('title'));
        return this.$target.data('title', '');
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
  $("a#demo-direction-top").cooltip({
    direction: 'top'
  });
  $("a#demo-direction-right").cooltip({
    direction: 'right'
  });
  $("a#demo-direction-bottom").cooltip({
    direction: 'bottom'
  });
  return $("a#demo-direction-left").cooltip({
    direction: 'left'
  });
});
