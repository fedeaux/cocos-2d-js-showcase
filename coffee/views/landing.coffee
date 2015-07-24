class @ContentWrapper extends Layer
  constructor: ->
    super
    @size = cc.winSize

    header = new Header
    @addChild header

    content = new Content
    @addChild content

class @APP extends Scene
  onEnter: ->
    super
    window.G = {}

    layer = new ContentWrapper
    @addChild layer


    # positions = new Positions
    # @addChild positions
