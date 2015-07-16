class @Overlay extends Layout
  constructor: (@container) ->
    super
    @size = @container.getBoundingBox()
    @setBackGroundColorType ccui.Layout.BG_COLOR_SOLID
    @setBackGroundColor cc.color(0,0,0)
    @setContentSize cc.size @size.width, @size.height
    @setAnchorPoint 0, 0
    @setPosition 0, 0
    @setOpacity 0

  show: ->
    @runAction new cc.FadeTo Style.animation.duration, 210

  hide: ->
    @runAction new cc.FadeTo Style.animation.duration, 0
