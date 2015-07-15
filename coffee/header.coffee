class @Header extends Layer
  constructor: ->
    super
    @size = cc.winSize
    @setContentSize @size.width, 80
    # @setAnchorPoint cc.p 0, 1
    # @setPosition cc.p 0, @size.height - 80
    #@addChild new cc.LayerGradient(cc.color(0,0,0,255), cc.color(120,0,120,255), cc.p(1, 2))

    @createBoundingBox()
    @createMenuButton()

  createBoundingBox: ->
    console.log @getContentSize()

    @boundingBox = new ccui.HBox()
    @boundingBox.setAnchorPoint cc.p 0, 1
    @boundingBox.setPosition cc.p 0, @size.height
    @boundingBox.setContentSize cc.size @getContentSize().width, @getContentSize().height
    @boundingBox.setClippingEnabled true
    @boundingBox.setBackGroundImage res.HelloWorld_png

    @addChild @boundingBox

    # @background = new cc.Texture2D "res/header-bg.png"
    # console.log cc.Sprite.createWithTexture(@background, cc.rect(0, 0, 640, 80)).getTexture().setTexParameters()

    # Size visibleSize = Director::getInstance()->getVisibleSize();
    # Vec2 origin = Director::getInstance()->getVisibleOrigin();

    # // Set an image to a texture, set the param "repeat"
    # Texture2D *bgTexture = Director::getInstance()->getTextureCache()->addImage("bg.jpg");
    # const Texture2D::TexParams tp = {GL_LINEAR, GL_LINEAR, GL_REPEAT, GL_REPEAT};

    # // use the texture as Sprite
    # Sprite *background = Sprite::createWithTexture(bgTexture, Rect(0, 0, visibleSize.width, visibleSize.height));
    # background->getTexture()->setTexParameters(&tp);
    # background->setPosition(Vec2(visibleSize.width / 2, visibleSize.height / 2));
    # this->addChild(background, 1);


  createMenuButton: ->
    @menuButton = new cc.Sprite "res/icons/list.png"
    @menuButton.setAnchorPoint cc.p 0.5, 0.5

    margin = ( @boundingBox.getContentSize().height - @menuButton.getContentSize().height ) / 2
    @menuButton.setPosition cc.p(@boundingBox.getContentSize().width - margin, -margin)
    @addChild @menuButton
