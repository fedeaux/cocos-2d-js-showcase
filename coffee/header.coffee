class @Header extends Layout
  constructor: ->
    super

    @size = cc.winSize
    @height = @size.height / 10

    @setContentSize @size.width, @height
    @setAnchorPoint cc.p 0, 1
    @setPosition cc.p 0, @size.height
    @setClippingEnabled true

    @setBackGroundColorType ccui.Layout.BG_COLOR_GRADIENT
    @setBackGroundColor cc.color(90, 90, 90), cc.color(180, 180, 180)

    G.header = @

    @sideMenuHeaderButton = new SideMenuHeaderButton
    @addChild @sideMenuHeaderButton

    @addChild new AppTitle

class @AppTitle extends LabelTTF
  constructor: ->
    @title = 'Showcase'
    @prefix = 'Cocos2d JS: '

    @container = G.header
    @containerSize = @container.getContentSize()

    super "#{@prefix}#{@title}", 'Helvetica', @containerSize.height / 3

    @setAnchorPoint 0, 0
    @margin = @containerSize.height / 10

    @setPosition @margin, @margin
    # @enableShadow cc.color(0x11, 0x11, 0x11), cc.size(0, 0), 3

class @SideMenuHeaderButton extends Button
  constructor: ->
    super "res/icons/list.png"

    @container = G.header
    @containerSize = @container.getContentSize()

    @setAnchorPoint 1, 0.5
    @margin = @containerSize.height / 10

    @dimensions = @containerSize.height - 2 * @margin
    @setPosition (@containerSize.width - @margin), @containerSize.height / 2

    @setLayoutComponentEnabled true
    @ignoreContentAdaptWithSize false
    @setContentSize cc.size @dimensions, @dimensions

    # @setSize @dimensions, @dimensions

    @addTouchEventListener @click, @

  click: (target, type) =>
    if type == 2
      G.side_menu.toggle()
