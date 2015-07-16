class @Content extends HBox
  constructor: ->
    super
    @size = cc.winSize

    @height = @size.height - G.header.height

    @setContentSize @size.width, @height
    @setAnchorPoint cc.p 0, 1
    @setPosition cc.p 0, @height
    @setClippingEnabled true

    @setBackGroundColorType ccui.Layout.BG_COLOR_GRADIENT
    @setBackGroundColor cc.color(240, 240, 250), cc.color(120, 120, 125)

    @menu = new SideMenu @
    @menu.hide()
    @menu.hide()
    @addChild @menu
