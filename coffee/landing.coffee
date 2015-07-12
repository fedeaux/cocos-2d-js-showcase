@LandingLayer = cc.Layer.extend(
  ctor: ->
    @_super()
    size = cc.winSize
    # @addChild new LandingMenu

    @label = new cc.LabelTTF('No pretty way to class', 'Arial', 44)

    @label.x = size.width / 2
    @label.y = size.height / 2

    @addChild @label

    true
)

class @Landing extends cc.Scene
  onEnter: ->
    @_super()
    layer = new LandingLayer
    @addChild layer
    return
