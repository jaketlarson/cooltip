# Cooltip.js
# 1.0.0
# https://github.com/jaketlarson/cooltip
#
# Copyright(c) 2015 Jake Larson <codereloadrepeat@gmail.com>
# MIT Licensed. http://www.opensource.org/licenses/mit-license.php
#
# jQuery plugin boilerplate used in this script can be found at:
# https://github.com/jquery-boilerplate/jquery-boilerplate/blob/master/src/jquery.boilerplate.coffee

(($, window, document) ->
  pluginName = 'cooltip'
  defaults = {
    direction: 'right',
    trigger: 'hover'
    lean: 'middle'
    attr: 'title'
  }

  ## Defaults:
  # direction: which side of the element the tooltip appears
  # options: 'top', 'right', 'bottom', 'right'
  #
  # trigger: event that triggers tooltip
  # options: 'hover' (for now)
  #
  # lean: direction the tooltip leans from in respect of the arrow
  # options:
  #   if any direction: 'middle'
  #   if direction is 'top' or 'bottom': 'left', 'right'
  #   [coming soon] if direction is 'left' or 'right': 'up', 'down'


  Cooltip = (target, options) ->
    @target = target
    @$target = $(target)
    @options = $.extend({}, defaults, options) # needs improvement
    @_defaults = defaults
    @_name = pluginName

    @init()

  Cooltip.prototype =
    init: ->
      # Generate a random ID for this tooltip
      @uniq_id = Math.random().toString(36).slice(2)

      @initTip()
      @bindTrigger()

    initTip: ->
      @$tip = $("<div class='cooltip'></div>")
      @$tip.attr 'id', @uniq_id
      $('body').append @$tip
      @$tip.html @$target.attr @options.attr

    positionTip: ->
      position = @getPosition()
      @$tip.css(
        left: position.left
        top: position.top
      )

    getPosition: ->
      position =
        left: null
        top: null

      positionTop = =>
        position.left = @$target.offset().left + @$target.outerWidth(true)/2 - @$tip.outerWidth(true)/2
        position.top = @$target.offset().top - @$tip.innerHeight()
        @$tip.addClass('direction-top')

      positionRight = =>
        position.left = @$target.offset().left + @$target.outerWidth(true)
        position.top = @$target.offset().top + @$target.outerHeight(true)/2  - @$tip.innerHeight()/2
        @$tip.addClass('direction-right')

      positionBottom = =>
        position.left = @$target.offset().left + @$target.outerWidth(true)/2 - @$tip.innerWidth()/2
        position.top = @$target.offset().top + @$target.outerHeight(true)
        @$tip.addClass('direction-bottom')

      positionLeft = =>
        position.left = @$target.offset().left - @$tip.innerWidth()
        position.top = @$target.offset().top + @$target.outerHeight(true)/2  - @$tip.innerHeight()/2
        @$tip.addClass('direction-left')

      switch (@options.direction)
        when 'top'
          positionTop()

        when 'right'
          positionRight()

        when 'bottom'
          positionBottom()

        when 'left'
          positionLeft()

        else
          positionTop()

      return position

    bindTrigger: ->
      bindAsHover = =>
        @$target.hover (e) =>
          # mouseenter
          @showTip()

        , (e) =>
          # mouseleave
          @hideTip()

      switch @options.trigger
        when 'hover'
          bindAsHover()

        else
          bindAsHover()

    showTip: ->
      @$tip.show()
      @positionTip()

    hideTip: ->
      @$tip.hide()


  $.fn[pluginName] = (options) ->
    @each ->
      unless$.data this, 'plugin_' + pluginName
        $.data this, 'plugin_' + pluginName, new Cooltip(this, options)

) jQuery, window, document

$ ->
  $("a#demo-direction-top").cooltip({direction: 'top'})
  $("a#demo-direction-right").cooltip({direction: 'right'})
  $("a#demo-direction-bottom").cooltip({direction: 'bottom'})
  $("a#demo-direction-left").cooltip({direction: 'left'})
