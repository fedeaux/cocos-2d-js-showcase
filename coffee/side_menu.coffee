class @SideMenu extends ListView
  constructor: (@container) ->
    super

    @size = @container.getBoundingBox()
    @buttons = []

    @initStyle()
    @createOverlay()

    G.side_menu = @

    @setPosition @hiddenPosition

  initStyle: ->
    @setDirection ccui.ScrollView.DIR_VERTICAL
    @setTouchEnabled true
    @setBounceEnabled true
    @setClippingEnabled true
    @setBackGroundColorType ccui.Layout.BG_COLOR_SOLID
    @setBackGroundColor cc.color(0, 0, 0)
    @setAnchorPoint 0, 1
    @setGravity ccui.ListView.GRAVITY_CENTER_HORIZONTAL

    for item in ['Animations', 'UI', 'Scene Transitions', 'Network']
      @addItem item

    @setItemsMargin @evalMargin()
    @setContentSize @evalInnerWidth(), @size.height

    @shownPosition = cc.p(0, @size.height)
    @hiddenPosition = cc.p((-@evalInnerWidth()), @size.height)

    console.log @_innerWidth
    @setPosition @hiddenPosition

    # px / sec
    @animationSpeed = @evalInnerWidth() / Style.animation.duration

    @shown = false

  createOverlay: ->
    @overlay = new Overlay @container
    @container.addChild @overlay

  show: ->
    @shown = true
    @stopAllActions()

    @dx = @shownPosition.x - @getPosition().x
    @runAction new cc.MoveTo (@dx / @animationSpeed), @shownPosition
    @overlay.show()

  hide: ->
    @shown = false
    @stopAllActions()

    @dx = @getPosition().x - @hiddenPosition.x
    @runAction new cc.MoveTo (@dx / @animationSpeed), @hiddenPosition
    @overlay.hide()

  toggle: ->
    if @shown then @hide() else @show()

  evalInnerWidth: ->
    unless @_innerWidth?
      widths = (button.getBoundingBox().width for button in @buttons)
      @_innerWidth = (Math.max.apply(0, widths) + @evalMargin() * 8)

    @_innerWidth

  evalMargin: ->
    heights = (button.getBoundingBox().height for button in @buttons)
    heightsSum = heights.reduce (t, s) -> t + s
    leftoverSpace = @size.height - heightsSum

    Math.min (leftoverSpace / @buttons.length + 1), heights[0]/2

  evalInnerHeight: ->
    unless @_innerHeight?
      heights = (button.getBoundingBox().height for button in @buttons)
      @_innerHeight = (heights[0] + @evalMargin() * 2) * @buttons.length

    @_innerHeight

  addItem: (text, callback) ->
    button = new ccui.Button
    button.setTouchEnabled true
    button.setTitleText text
    button.setTitleFontSize 24
    button.setColor cc.color 255, 0, 0
    @pushBackCustomItem button
    @buttons.push button
