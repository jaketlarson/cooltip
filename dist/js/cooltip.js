/**
 * Cooltip - Lightweight, jQuery tooltip plugin
 * @version v1.0.0
 * @link https://github.com/jaketlarson/cooltip
 * @license license...
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
    this.init();
  };
  Cooltip.prototype = {
    init: function() {
      this.uniq_id = Math.random().toString(36).slice(2);
      this.initTip();
      return this.bindTrigger();
    },
    initTip: function() {
      this.$tip = $("<div class='cooltip'></div>");
      this.$tip.attr('id', this.uniq_id);
      $('body').append(this.$tip);
      return this.$tip.html(this.$target.attr(this.options.attr));
    },
    positionTip: function() {
      var position;
      position = this.getPosition();
      return this.$tip.css({
        left: position.left,
        top: position.top
      });
    },
    getPosition: function() {
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
    bindTrigger: function() {
      var bindAsHover;
      bindAsHover = (function(_this) {
        return function() {
          return _this.$target.hover(function(e) {
            return _this.showTip();
          }, function(e) {
            return _this.hideTip();
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
      return this.positionTip();
    },
    hideTip: function() {
      return this.$tip.hide();
    }
  };
  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Cooltip(this, options));
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
