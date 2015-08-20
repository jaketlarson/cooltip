(($, window, document) ->

  pluginName = 'cooltip'
  defaults = {
    direction: 'right',
    trigger: 'hover'
  }

  Cooltip = (target, options) ->
    @target = target
    @$target = $(target)
    @options = $.extend({}, defaults, options) # needs improvement
    @_defaults = defaults
    @_name = pluginName

    @init()
    return

  Cooltip.prototype =
    init: ->
      @uniq_id = Math.random().toString(36).slice(2)
      @initTip()

    initTip: ->
      position = @getPosition()

      tip = $("<div class='cooltip'></div>")
      tip.attr('id', @uniq_id)
      tip.html @$target.attr('title')

      tip.css(
        left: position.left
        top: position.top
      )

      $('body').append(tip)

    getPosition: ->
      position =
        left: null
        top: null

      switch (@options.direction)
        when 'right'
          position.left = @$target.offset().left + @$target.outerWidth(true)
          position.top = @$target.offset().top

        else 
          console.log 'set up default'

      return position

  $.fn[pluginName] = (options) ->
    @each ->
      if !$.data(this, 'plugin_' + pluginName)
        $.data this, 'plugin_' + pluginName, new Cooltip(this, options)
      return

  return

) jQuery, window, document

$ ->
  $("a").cooltip()