class @LandingLayer extends Layer
  constructor: ->
    super
    @size = cc.winSize
    @menu = new LandingMenu

    button = new ccui.Button
    button.setTouchEnabled true
    button.loadTextures res.CloseNormal_png, res.CloseSelected_png, ''
    button.setTitleText 'Alface'
    button.setTitleFontSize 24
    button.setAnchorPoint cc.p 1, 0.5
    button.setPosition cc.p @size.width/2, @size.height/2

    @addChild button
    @addChild @menu

class @Landing extends Scene
  onEnter: ->
    super

    layer = new LandingLayer
    @addChild layer
    return
