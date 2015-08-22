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
    direction: 'top',
    trigger: 'hover'
    align: 'middle'
    attr: 'title'
  }

  ## Defaults:
  # direction: which side of the element the tooltip appears
  # options: 'top', 'right', 'bottom', 'right'
  #
  # trigger: event that triggers tooltip
  # options: 'hover' (for now)
  #
  # align: direction the tooltip aligns from in respect of the arrow
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

      # jQuery can't select pseudo-elements, so the left css property
      # cannot be accessed. The property below needs to be the same
      # as the left/right (depending on the direction) and width
      # CSS of the .cooltip:after element.
      # A better way should be seeked out.
      @_aligning_arrow_buffer = .3*16 # rem to px
      @_aligning_arrow_width = .8*16 # rem to px

      @_initTip()
      @_bindTrigger()
      return

    _initTip: ->
      @$tip = $("<div/>", {id: @uniq_id, class: 'cooltip'})
      @$tip.html @$target.attr @options.attr
      return

    _positionTip: ->
      @_setClass()
      position = @_getPosition()
      @$tip.css(
        left: position.left
        top: position.top
      )
      return

    _calcPositionLeft: ->
      left = null
      if @options.direction == 'top' || @options.direction == 'bottom'
        if @options.align == 'right'
          left = @$target.offset().left + @$target.outerWidth(true)/2 - @_aligning_arrow_width/2 - @_aligning_arrow_buffer
        else if @options.align == 'left'
          left = @$target.offset().left - @$tip.outerWidth(true) + @$target.outerWidth(true)/2 + @_aligning_arrow_width/2 + @_aligning_arrow_buffer
        else # default, align in middle
          left = @$target.offset().left + @$target.outerWidth(true)/2 - @$tip.outerWidth(true)/2

      else if @options.direction == 'left'
        left = @$target.offset().left - @$tip.outerWidth((true))

      else if @options.direction == 'right'
        left = @$target.offset().left + @$target.outerWidth(true)

      return left

    _calcPositionTop: ->
      top = null
      if @options.direction == 'top'
        top = @$target.offset().top - @$tip.outerHeight(true)

      else if @options.direction == 'bottom'
        top = @$target.offset().top + @$target.outerHeight(true)

      else if @options.direction == 'left' || @options.direction == 'right'
        if @options.align == 'top'
          top = @$target.offset().top - @$tip.outerHeight(true) + @$target.outerHeight(true)/2 + @_aligning_arrow_width/2 + @_aligning_arrow_buffer
        else if @options.align == 'bottom'
          top = @$target.offset().top + @$target.outerHeight(true)/2 - @_aligning_arrow_width/2 - @_aligning_arrow_buffer

        else # default, align in middle
          top = @$target.offset().top + @$target.outerHeight(true)/2  - @$tip.outerHeight(true)/2

    _getPosition: ->
      position =
        left: @_calcPositionLeft()
        top: @_calcPositionTop()

      return position

    _setClass: ->
      switch @options.direction
        when 'top'
          @$tip.addClass 'direction-top'

        when 'right'
          @$tip.addClass 'direction-right'

        when 'bottom'
          @$tip.addClass 'direction-bottom'

        when 'left'
          @$tip.addClass 'direction-left'

      if @options.direction == 'top' || @options.direction == 'bottom'
        switch @options.align
          when 'left'
            @$tip.addClass 'align-left'
          when 'right'
            @$tip.addClass 'align-right'

      if @options.direction == 'right' || @options.direction == 'left'
        switch @options.align
          when 'top'
            @$tip.addClass 'align-top'
          when 'bottom'
            @$tip.addClass 'align-bottom'

      return

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
        return

      switch @options.trigger
        when 'hover'
          bindAsHover()

        else
          bindAsHover()
      return

    _appendTip: ->
      @$tip.appendTo $('body')

    showTip: ->
      @_appendTip()
      @_positionTip()
      return

    hideTip: ->
      @$tip.remove()
      return

    # If the attribute being copied into the tooltip is the title attribute,
    # change the title attribute name to data-title attribute to temporarily.
    _maskTitle: ->
      is_using_title_attr = if @options.attr == 'title' then true else false
      title_exists = if (typeof @$target.attr('title') != typeof undefined && @$target.attr('title') != false && @$target.attr('title').length > 0) then true else false
      if is_using_title_attr && title_exists
        @$target.data 'title', @$target.attr('title')
        @$target.attr 'title', ''
      return

    # Restore the data-title to the title attribute.
    _unmaskTitle: ->
      data_title_exists = if (typeof @$target.attr('title') != typeof undefined && @$target.attr('title') != false) then true else false
      # If title_already_exists (below) then the maskTitle function did not actually run, so let's leave it alone.
      title_already_exists = if (typeof @$target.attr('title') != typeof undefined && @$target.attr('title') != false && @$target.attr('title').length > 0) then true else false

      if data_title_exists && !title_already_exists
        @$target.attr 'title', @$target.data('title')
        @$target.data 'title', ''
      return


  $.fn[pluginName] = (options) ->
    @each ->
      unless $.data this, 'plugin_' + pluginName
        $.data this, 'plugin_' + pluginName, new Cooltip(this, options)

) jQuery, window, document

$ ->
  $("a#demo-direction-top-align-default").cooltip {direction: 'top'}
  $("a#demo-direction-top-align-right").cooltip {direction: 'top', align: 'right'}
  $("a#demo-direction-top-align-left").cooltip {direction: 'top', align: 'left'}

  $("a#demo-direction-right-align-default").cooltip {direction: 'right'}
  $("a#demo-direction-right-align-top").cooltip {direction: 'right', align: 'top'}
  $("a#demo-direction-right-align-bottom").cooltip {direction: 'right', align: 'bottom'}

  $("a#demo-direction-bottom-align-default").cooltip {direction: 'bottom'}
  $("a#demo-direction-bottom-align-right").cooltip {direction: 'bottom', align: 'right'}
  $("a#demo-direction-bottom-align-left").cooltip {direction: 'bottom', align: 'left'}

  $("a#demo-direction-left-align-default").cooltip {direction: 'left'}
  $("a#demo-direction-left-align-top").cooltip {direction: 'left', align: 'top'}
  $("a#demo-direction-left-align-bottom").cooltip {direction: 'left', align: 'bottom'}
