(function($, window, document) {
  var Cooltip, defaults, pluginName;
  pluginName = 'cooltip';
  defaults = {
    direction: 'right',
    trigger: 'hover'
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
      return this.initTip();
    },
    initTip: function() {
      var position, tip;
      position = this.getPosition();
      tip = $("<div class='cooltip'></div>");
      tip.attr('id', this.uniq_id);
      tip.html(this.$target.attr('title'));
      tip.css({
        left: position.left,
        top: position.top
      });
      return $('body').append(tip);
    },
    getPosition: function() {
      var position;
      position = {
        left: null,
        top: null
      };
      switch (this.options.direction) {
        case 'right':
          position.left = this.$target.offset().left + this.$target.outerWidth(true);
          position.top = this.$target.offset().top;
          break;
        default:
          console.log('set up default');
      }
      return position;
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
  return $("a").cooltip();
});
