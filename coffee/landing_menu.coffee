class @LandingMenu extends ListView
  constructor: ->
    super
    @size = cc.winSize

    # @setDirection ccui.ScrollView.DIR_VERTICAL
    @setTouchEnabled true
    @setBounceEnabled true
    @setBackGroundColor cc.color(200, 200, 200, 0), cc.color(180, 180, 180, 0)
    @setContentSize cc.size @size.width, @size.height
    @setAnchorPoint cc.p 0.5, 0.5
    @setPosition cc.p @size.width/2, @size.height/2

    for item in ['Animations', 'UI', 'Scene Transitions', 'Network']
      @addItem item

  addItem: (text, callback) ->
    button = new ccui.Button
    button.setTouchEnabled true
    button.loadTextures res.CloseNormal_png, res.CloseSelected_png, ''
    button.setTitleText text
    button.setTitleFontSize 24
    button.setAnchorPoint cc.p 1, 0.5
    button.setPosition cc.p @size.width/2, @size.height/2
    @pushBackCustomItem button
