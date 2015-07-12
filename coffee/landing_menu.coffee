class @LandingMenu extends ccui.ListView
  ctor: =>
    super()
    size = cc.winSize

    @setDirection ccui.ScrollView.DIR_VERTICAL
    @setTouchEnabled true
    @setBounceEnabled true
    @setBackGroundImage res.HelloWorld_png
    @setContentSize cc.size size.width, size.height
    @setAnchorPoint cc.p 0.5, 0.5
    @setPosition cc.p size.width/2, size.height/2

    button = new ccui.Button
    button.setTouchEnabled true
    button.loadTextures res.CloseNormal_png, res.CloseSelected_png, ''
    button.setTitleText "Alface"
    button.setTitleFontSize 24
    button.setAnchorPoint cc.p 1, 0.5
    button.setPosition cc.p 50, size.height/2
    @pushBackCustomItem button

    button = new ccui.Button
    button.setTouchEnabled true
    button.loadTextures res.CloseNormal_png, res.CloseSelected_png, ''
    button.setTitleText "Alface"
    button.setTitleFontSize 24
    button.setAnchorPoint cc.p 1, 0.5
    button.setPosition cc.p 50, size.height/2
    @pushBackCustomItem button

    button = new ccui.Button
    button.setTouchEnabled true
    button.loadTextures res.CloseNormal_png, res.CloseSelected_png, ''
    button.setTitleText "Alface"
    button.setTitleFontSize 24
    button.setAnchorPoint cc.p 1, 0.5
    button.setPosition cc.p 50, size.height/2
    @pushBackCustomItem button
