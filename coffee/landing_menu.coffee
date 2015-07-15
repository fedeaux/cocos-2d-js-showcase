class @LandingMenu extends ListView
  constructor: ->
    super

    @size = cc.winSize
    @buttons = []

    @setDirection ccui.ScrollView.DIR_VERTICAL
    @setTouchEnabled true
    @setBounceEnabled true
    @setAnchorPoint cc.p 0.5, 0.5
    @setPosition cc.p @size.width/2, @size.height/2
    @setGravity ccui.ListView.GRAVITY_CENTER_HORIZONTAL
    @setContentSize cc.size(@size.width, 100)

    for item in ['Animations', 'UI', 'Scene Transitions', 'Network']
      @addItem item

    @setItemsMargin @evalMargin()

    @setContentSize cc.size(@size.width, @evalInnerHeight())

    @refreshView()

  evalMargin: ->
    heights = (button.getBoundingBox().height for button in @buttons)
    heightsSum = heights.reduce (t, s) -> t + s
    leftoverSpace = @size.height - heightsSum

    Math.min (leftoverSpace / @buttons.length + 1), heights[0]/2

  evalInnerHeight: ->
    unless @_innerHeight?
      heights = (button.getBoundingBox().height for button in @buttons)
      @_innerHeight = (heights[0] + @evalMargin() * 2) * @buttons.length
      console.log heights[0], @evalMargin()
      console.log @_innerHeight

    @_innerHeight

  addItem: (text, callback) ->
    button = new ccui.Button
    button.setTouchEnabled true
    button.setTitleText text
    button.setTitleFontSize 24
    button.setColor cc.color 255, 0, 0
    @pushBackCustomItem button
    @buttons.push button
