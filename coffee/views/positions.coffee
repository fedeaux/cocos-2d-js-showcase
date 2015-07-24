class @Positions extends Layer
  constructor: ->
    super

    @add cc.p(0.5, 0.5), cc.p(cc.winSize.width / 2, cc.winSize.height / 2)
    @add cc.p(0, 1), cc.p(0, cc.winSize.height)

  add: (anchor, position) =>
    @a = new cc.Sprite res.CloseNormal_png
    @a.setAnchorPoint anchor
    @a.setPosition position
    @addChild @a
