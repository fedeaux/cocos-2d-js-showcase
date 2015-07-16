class @SideMenu extends ListView
  constructor: (@container) ->
    super

    @size = @container.getBoundingBox()
    @buttons = []

    @setDirection ccui.ScrollView.DIR_VERTICAL
    @setTouchEnabled true
    @setBounceEnabled true
    @setClippingEnabled true
    @setBackGroundColorType ccui.Layout.BG_COLOR_SOLID
    @setBackGroundColor cc.color(0, 0, 0)
    @setAnchorPoint cc.p 0, 1
    @setGravity ccui.ListView.GRAVITY_CENTER_HORIZONTAL
    @setContentSize cc.size(@size.width, @size.height)

    for item in ['Animations', 'UI', 'Scene Transitions', 'Network']
      @addItem item

    @setItemsMargin @evalMargin()
    @setContentSize cc.size(@evalInnerWidth(), @size.height)

    @shownPosition = cc.p(0, @size.height)
    @hiddenPosition = cc.p((-@evalInnerWidth()), @size.height)

    @animationDuration = 0.3

    # px / sec
    @animationSpeed = @evalInnerWidth() / @animationDuration

    @shown = false

    G.side_menu = @

    @setPosition @hiddenPosition
    @refreshView();

  show: ->
    @shown = true
    @stopAllActions()

    @dx = @shownPosition.x - @getPosition().x
    @runAction new cc.MoveTo (@dx / @animationSpeed), @shownPosition

  hide: ->
    @shown = false
    @stopAllActions()

    @dx = @getPosition().x - @hiddenPosition.x
    @runAction new cc.MoveTo (@dx / @animationSpeed), @hiddenPosition

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
