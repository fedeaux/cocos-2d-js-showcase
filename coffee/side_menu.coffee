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
    @setAnchorPoint 0, 0
    @setGravity ccui.ListView.GRAVITY_CENTER_HORIZONTAL

    for item in ['Animations', 'UI', 'Scene Transitions', 'Network']
      @addItem item

    @setItemsMargin @evalMargin()
    @setContentSize @evalInnerWidth(), @size.height

    @shownPosition = cc.p(0, 0)
    @hiddenPosition = cc.p((-@evalInnerWidth()), 0)

    @setPosition @hiddenPosition

    # px / sec
    @animationSpeed = @evalInnerWidth() / Style.animation.duration

    @shown = false

  createOverlay: ->
    @overlay = new Overlay @container
    @container.addChild @overlay
    @sensibleArea = cc.rect 0, 0, @size.width * 0.05, @size.height

    cc.eventManager.addListener {
      event: cc.EventListener.TOUCH_ONE_BY_ONE

      onTouchBegan: (touch, event) =>
        @isDragging = cc.rectContainsPoint(@sensibleArea, event.getCurrentTarget().convertToNodeSpace(touch.getLocation())) or @shown
        @dragStartedAt = touch.getLocationX()
        true

      onTouchMoved: (touch, event) =>
        if @isDragging
          if @shown
            draggingInTermsOfPercentage = orbtatingPercentage 1.6 * (Math.min(touch.getLocationX() - @dragStartedAt, 0)) / @size.width

          else
            draggingInTermsOfPercentage = orbtatingPercentage 1.6 * (Math.max(touch.getLocationX() - @dragStartedAt, @dragStartedAt)) / @size.width

          @to draggingInTermsOfPercentage

        return

      onTouchEnded: (touch, event) =>
        @isDragging = false
        @resolve()
        return

      onTouchCancelled: (touch, event) =>
        @isDragging = false
        return

    }, @overlay

  to: (val) =>
    @overlay.to val

    new_x = intervalPercentage @hiddenPosition.x, @shownPosition.x, val
    @setPosition new_x, @shownPosition.y

  resolve: ->
    if @getPosition().x < (@hiddenPosition.x - @shownPosition.x) / 2
      @hide()
    else
      @show()

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
