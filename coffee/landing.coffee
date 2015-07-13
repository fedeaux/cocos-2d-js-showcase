class @LandingLayer extends Layer
  constructor: ->
    super

    size = cc.winSize

    @label = new cc.LabelTTF('I did it.', 'Arial', 44)

    @label.x = size.width / 2
    @label.y = size.height / 2 + 50

    @addChild @label

    true

class @Landing extends Scene
  onEnter: ->
    super

    layer = new LandingLayer
    @addChild layer
    return
