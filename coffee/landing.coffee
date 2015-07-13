class @LandingLayer extends Layer
  constructor: ->
    super

    size = cc.winSize

    @label = new cc.LabelTTF('This d be awesome :3', 'Arial', 44)
    @label2 = new cc.LabelTTF('Can I have it? ^^', 'Arial', 44)

    @label.x = size.width / 2
    @label.y = size.height / 2

    @label2.x = size.width / 2
    @label2.y = size.height / 2 - 50

    @addChild @label
    @addChild @label2

    true

class @Landing extends cc.Scene
  onEnter: ->
    @_super()
    layer = new LandingLayer
    @addChild layer
    return
