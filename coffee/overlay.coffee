class @Overlay extends Layout
  constructor: (@container) ->
    super
    @size = @container.getBoundingBox()
    @setBackGroundColorType ccui.Layout.BG_COLOR_SOLID
    @setBackGroundColor cc.color(0,0,0)
    @setContentSize cc.size @size.width, @size.height
    @setAnchorPoint 0, 0
    @setPosition 0, 0
    @to 0

    @maxOpacity = 210

  show: ->
    @currentOpacity = @maxOpacity
    @runAction new cc.FadeTo Style.animation.duration, @maxOpacity

  hide: ->
    @currentOpacity = 0
    @runAction new cc.FadeTo Style.animation.duration, @currentOpacity

  to: (val) ->
    @currentOpacity = intervalPercentage 0, @maxOpacity, val
    @setOpacity @currentOpacity

  resolve: ->
    if @currentOpacity < @maxOpacity / 2
      @hide()

    else
      @show()
