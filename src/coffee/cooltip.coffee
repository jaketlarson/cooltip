# Cooltip.js
# 1.0.0
# https://github.com/jaketlarson/cooltip
#
# Copyright(c) 2015 Jake Larson <codereloadrepeat@gmail.com>
# MIT Licensed. http://www.opensource.org/licenses/mit-license.php
#
# jQuery plugin boilerplate used in this script can be found at:
# https://github.com/jquery-boilerplate/jquery-boilerplate/tree/master/src

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
    @options = $.extend {}, defaults, options
    @_defaults = defaults
    @_name = pluginName

    @init()

  Cooltip.prototype =
    init: ->
      # Generate a random ID for this tooltip
      @uniq_id = Math.random().toString(36).slice(2)

      @_initTip()
      @_bindTrigger()

    _initTip: ->
      @$tip = $("<div/>", {id: @uniq_id, class: 'cooltip'})
      @$tip.html @$target.attr @options.attr
      $('body').append @$tip

    _positionTip: ->
      position = @_getPosition()
      @$tip.css(
        left: position.left
        top: position.top
      )

    _getPosition: ->
      position =
        left: null
        top: null

      positionTop = =>
        position.left = @$target.offset().left + @$target.outerWidth(true)/2 - @$tip.outerWidth(true)/2
        position.top = @$target.offset().top - @$tip.innerHeight()
        @$tip.addClass 'direction-top'

      positionRight = =>
        position.left = @$target.offset().left + @$target.outerWidth(true)
        position.top = @$target.offset().top + @$target.outerHeight(true)/2  - @$tip.innerHeight()/2
        @$tip.addClass 'direction-right'

      positionBottom = =>
        position.left = @$target.offset().left + @$target.outerWidth(true)/2 - @$tip.innerWidth()/2
        position.top = @$target.offset().top + @$target.outerHeight(true)
        @$tip.addClass 'direction-bottom'

      positionLeft = =>
        position.left = @$target.offset().left - @$tip.innerWidth()
        position.top = @$target.offset().top + @$target.outerHeight(true)/2  - @$tip.innerHeight()/2
        @$tip.addClass 'direction-left' 

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

    _bindTrigger: ->
      bindAsHover = =>
        @$target.hover (e) => 
          # mouseenter
          @showTip()
          @_maskTitle()

        , (e) =>
          # mouseleave
          @hideTip()
          @_unmaskTitle()

      switch @options.trigger
        when 'hover'
          bindAsHover()

        else
          bindAsHover()

    showTip: ->
      @$tip.show()
      @_positionTip()

    hideTip: ->
      @$tip.hide()

    # If the attribute being copied into the tooltip is the title attribute,
    # change the title attribute name to data-title attribute to temporarily.
    _maskTitle: ->
      is_using_title_attr = if @options.attr == 'title' then true else false
      title_exists = if (typeof @$target.attr('title') != typeof undefined && @$target.attr('title') != false && @$target.attr('title').length > 0) then true else false
      if is_using_title_attr && title_exists
        @$target.data 'title', @$target.attr('title')
        @$target.attr 'title', ''

    # Restore the data-title to the title attribute.
    _unmaskTitle: ->
      data_title_exists = if (typeof @$target.attr('title') != typeof undefined && @$target.attr('title') != false) then true else false
      # If title_already_exists (below) then the maskTitle function did not actually run, so let's leave it alone.
      title_already_exists = if (typeof @$target.attr('title') != typeof undefined && @$target.attr('title') != false && @$target.attr('title').length > 0) then true else false

      if data_title_exists && !title_already_exists
        @$target.attr 'title', @$target.data('title')
        @$target.data 'title', ''


  $.fn[pluginName] = (options) ->
    @each ->
      unless $.data this, 'plugin_' + pluginName
        $.data this, 'plugin_' + pluginName, new Cooltip(this, options)

) jQuery, window, document

$ ->
  $("a#demo-direction-top").cooltip {direction: 'top'}
  $("a#demo-direction-right").cooltip {direction: 'right'}
  $("a#demo-direction-bottom").cooltip {direction: 'bottom'}
  $("a#demo-direction-left").cooltip {direction: 'left'}
