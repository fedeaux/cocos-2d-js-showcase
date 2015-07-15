class @LandingLayer extends Layer
  constructor: ->
    super
    @size = cc.winSize
    @menu = new LandingMenu

    # backgroundLayer = new cc.LayerGradient(cc.color(0,0,0,255), cc.color(0x46,0x82,0xB4,255))#new cc.LayerColor(new cc.Color(40,40,40,255), @size.width, @size.height)
    # @addChild(backgroundLayer)

    @addChild @menu

class @APP extends Scene
  onEnter: ->
    super

    header = new Header
    @addChild header

    layer = new LandingLayer
    @addChild layer

    # positions = new Positions
    # @addChild positions
