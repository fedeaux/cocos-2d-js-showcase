(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.HBox = (function(superClass) {
    extend(HBox, superClass);

    function HBox() {
      this.ctor();
    }

    return HBox;

  })(ccui.HBox);

  this.Layer = (function(superClass) {
    extend(Layer, superClass);

    function Layer() {
      this.ctor();
    }

    return Layer;

  })(cc.Layer);

  this.Layout = (function(superClass) {
    extend(Layout, superClass);

    function Layout() {
      this.ctor();
    }

    return Layout;

  })(ccui.Layout);

  this.Scene = (function(superClass) {
    extend(Scene, superClass);

    function Scene() {
      this.ctor();
    }

    return Scene;

  })(cc.Scene);

  this.Button = (function(superClass) {
    extend(Button, superClass);

    function Button(image) {
      this.ctor(image);
    }

    return Button;

  })(ccui.Button);

  this.LabelTTF = (function(superClass) {
    extend(LabelTTF, superClass);

    function LabelTTF(text, fontName, fontSize, dimensions, hAlignment, vAlignment) {
      this.ctor(text, fontName, fontSize, dimensions, hAlignment, vAlignment);
    }

    return LabelTTF;

  })(cc.LabelTTF);

  this.ListView = (function(superClass) {
    extend(ListView, superClass);

    function ListView() {
      this.ctor();
    }

    return ListView;

  })(ccui.ListView);

  this.Menu = (function(superClass) {
    extend(Menu, superClass);

    function Menu() {
      this.ctor();
    }

    return Menu;

  })(cc.Menu);

  this.Content = (function(superClass) {
    extend(Content, superClass);

    function Content() {
      Content.__super__.constructor.apply(this, arguments);
      this.size = cc.winSize;
      this.height = this.size.height - G.header.height;
      this.setContentSize(this.size.width, this.height);
      this.setAnchorPoint(cc.p(0, 1));
      this.setPosition(cc.p(0, this.height));
      this.setClippingEnabled(true);
      this.setBackGroundColorType(ccui.Layout.BG_COLOR_GRADIENT);
      this.setBackGroundColor(cc.color(240, 240, 250), cc.color(120, 120, 125));
      this.menu = new SideMenu(this);
      this.menu.hide();
      this.menu.hide();
      this.addChild(this.menu);
    }

    return Content;

  })(HBox);

  this.Header = (function(superClass) {
    extend(Header, superClass);

    function Header() {
      Header.__super__.constructor.apply(this, arguments);
      this.size = cc.winSize;
      this.height = this.size.height / 10;
      this.setContentSize(this.size.width, this.height);
      this.setAnchorPoint(cc.p(0, 1));
      this.setPosition(cc.p(0, this.size.height));
      this.setClippingEnabled(true);
      this.setBackGroundColorType(ccui.Layout.BG_COLOR_GRADIENT);
      this.setBackGroundColor(cc.color(90, 90, 90), cc.color(180, 180, 180));
      G.header = this;
      this.sideMenuHeaderButton = new SideMenuHeaderButton;
      this.addChild(this.sideMenuHeaderButton);
      this.addChild(new AppTitle);
    }

    return Header;

  })(Layout);

  this.AppTitle = (function(superClass) {
    extend(AppTitle, superClass);

    function AppTitle() {
      this.title = 'Showcase';
      this.prefix = 'Cocos2d JS: ';
      this.container = G.header;
      this.containerSize = this.container.getContentSize();
      AppTitle.__super__.constructor.call(this, "" + this.prefix + this.title, 'Helvetica', this.containerSize.height / 3);
      this.setAnchorPoint(0, 0);
      this.margin = this.containerSize.height / 10;
      this.setPosition(this.margin, this.margin);
    }

    return AppTitle;

  })(LabelTTF);

  this.SideMenuHeaderButton = (function(superClass) {
    extend(SideMenuHeaderButton, superClass);

    function SideMenuHeaderButton() {
      this.click = bind(this.click, this);
      SideMenuHeaderButton.__super__.constructor.call(this, "res/icons/list.png");
      this.container = G.header;
      this.containerSize = this.container.getContentSize();
      this.setAnchorPoint(1, 0.5);
      this.margin = this.containerSize.height / 10;
      this.dimensions = this.containerSize.height - 2 * this.margin;
      this.setPosition(this.containerSize.width - this.margin, this.containerSize.height / 2);
      this.setLayoutComponentEnabled(true);
      this.ignoreContentAdaptWithSize(false);
      this.setContentSize(cc.size(this.dimensions, this.dimensions));
      this.addTouchEventListener(this.click, this);
    }

    SideMenuHeaderButton.prototype.click = function(target, type) {
      if (type === 2) {
        return G.side_menu.toggle();
      }
    };

    return SideMenuHeaderButton;

  })(Button);

  this.ContentWrapper = (function(superClass) {
    extend(ContentWrapper, superClass);

    function ContentWrapper() {
      var content, header;
      ContentWrapper.__super__.constructor.apply(this, arguments);
      this.size = cc.winSize;
      header = new Header;
      this.addChild(header);
      content = new Content;
      this.addChild(content);
    }

    return ContentWrapper;

  })(Layer);

  this.APP = (function(superClass) {
    extend(APP, superClass);

    function APP() {
      return APP.__super__.constructor.apply(this, arguments);
    }

    APP.prototype.onEnter = function() {
      var layer;
      APP.__super__.onEnter.apply(this, arguments);
      window.G = {};
      layer = new ContentWrapper;
      return this.addChild(layer);
    };

    return APP;

  })(Scene);

  this.Overlay = (function(superClass) {
    extend(Overlay, superClass);

    function Overlay(container) {
      this.container = container;
      Overlay.__super__.constructor.apply(this, arguments);
      this.size = this.container.getBoundingBox();
      this.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
      this.setBackGroundColor(cc.color(0, 0, 0));
      this.setContentSize(cc.size(this.size.width, this.size.height));
      this.setAnchorPoint(0, 0);
      this.setPosition(0, 0);
      this.maxOpacity = 210;
    }

    Overlay.prototype.show = function() {
      this.currentOpacity = this.maxOpacity;
      return this.runAction(new cc.FadeTo(Style.animation.duration, this.maxOpacity));
    };

    Overlay.prototype.hide = function() {
      this.currentOpacity = 0;
      return this.runAction(new cc.FadeTo(Style.animation.duration, this.currentOpacity));
    };

    Overlay.prototype.to = function(val) {
      this.currentOpacity = intervalPercentage(0, this.maxOpacity, val);
      return this.setOpacity(this.currentOpacity);
    };

    Overlay.prototype.resolve = function() {
      if (this.currentOpacity < this.maxOpacity / 2) {
        return this.hide();
      } else {
        return this.show();
      }
    };

    return Overlay;

  })(Layout);

  this.Positions = (function(superClass) {
    extend(Positions, superClass);

    function Positions() {
      this.add = bind(this.add, this);
      Positions.__super__.constructor.apply(this, arguments);
      this.add(cc.p(0.5, 0.5), cc.p(cc.winSize.width / 2, cc.winSize.height / 2));
      this.add(cc.p(0, 1), cc.p(0, cc.winSize.height));
    }

    Positions.prototype.add = function(anchor, position) {
      this.a = new cc.Sprite(res.CloseNormal_png);
      this.a.setAnchorPoint(anchor);
      this.a.setPosition(position);
      return this.addChild(this.a);
    };

    return Positions;

  })(Layer);

  this.SideMenu = (function(superClass) {
    extend(SideMenu, superClass);

    function SideMenu(container) {
      this.container = container;
      this.to = bind(this.to, this);
      SideMenu.__super__.constructor.apply(this, arguments);
      this.size = this.container.getBoundingBox();
      this.buttons = [];
      this.initStyle();
      this.createOverlay();
      G.side_menu = this;
      this.setPosition(this.hiddenPosition);
    }

    SideMenu.prototype.initStyle = function() {
      var i, item, len, ref;
      this.setDirection(ccui.ScrollView.DIR_VERTICAL);
      this.setTouchEnabled(true);
      this.setBounceEnabled(true);
      this.setClippingEnabled(true);
      this.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
      this.setBackGroundColor(cc.color(0, 0, 0));
      this.setAnchorPoint(0, 0);
      this.setGravity(ccui.ListView.GRAVITY_CENTER_HORIZONTAL);
      ref = ['Animations', 'UI', 'Scene Transitions', 'Network'];
      for (i = 0, len = ref.length; i < len; i++) {
        item = ref[i];
        this.addItem(item);
      }
      this.setItemsMargin(this.evalMargin());
      this.setContentSize(this.evalInnerWidth(), this.size.height);
      this.shownPosition = cc.p(0, 0);
      this.hiddenPosition = cc.p(-this.evalInnerWidth(), 0);
      this.setPosition(this.hiddenPosition);
      this.animationSpeed = this.evalInnerWidth() / Style.animation.duration;
      return this.shown = false;
    };

    SideMenu.prototype.createOverlay = function() {
      this.overlay = new Overlay(this.container);
      this.container.addChild(this.overlay);
      this.sensibleArea = cc.rect(0, 0, this.size.width * 0.1, this.size.height);
      return cc.eventManager.addListener({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        onTouchBegan: (function(_this) {
          return function(touch, event) {
            _this.isDragging = cc.rectContainsPoint(_this.sensibleArea, event.getCurrentTarget().convertToNodeSpace(touch.getLocation())) || _this.shown;
            _this.dragStartedAt = touch.getLocationX();
            return true;
          };
        })(this),
        onTouchMoved: (function(_this) {
          return function(touch, event) {
            var draggingInTermsOfPercentage;
            if (_this.isDragging) {
              if (_this.shown) {
                draggingInTermsOfPercentage = orbtatingPercentage(1.6 * (Math.min(touch.getLocationX() - _this.dragStartedAt, 0)) / _this.size.width);
              } else {
                draggingInTermsOfPercentage = orbtatingPercentage(1.6 * (Math.max(touch.getLocationX() - _this.dragStartedAt, _this.dragStartedAt)) / _this.size.width);
              }
              _this.to(draggingInTermsOfPercentage);
            }
          };
        })(this),
        onTouchEnded: (function(_this) {
          return function(touch, event) {
            _this.isDragging = false;
            _this.resolve();
          };
        })(this),
        onTouchCancelled: (function(_this) {
          return function(touch, event) {
            _this.isDragging = false;
          };
        })(this)
      }, this.overlay);
    };

    SideMenu.prototype.to = function(val) {
      var new_x;
      this.overlay.to(val);
      new_x = intervalPercentage(this.hiddenPosition.x, this.shownPosition.x, val);
      return this.setPosition(new_x, this.shownPosition.y);
    };

    SideMenu.prototype.resolve = function() {
      if (this.getPosition().x < (this.hiddenPosition.x - this.shownPosition.x) / 2) {
        return this.hide();
      } else {
        return this.show();
      }
    };

    SideMenu.prototype.show = function() {
      this.shown = true;
      this.stopAllActions();
      this.dx = this.shownPosition.x - this.getPosition().x;
      this.runAction(new cc.MoveTo(this.dx / this.animationSpeed, this.shownPosition));
      return this.overlay.show();
    };

    SideMenu.prototype.hide = function() {
      this.shown = false;
      this.stopAllActions();
      this.dx = this.getPosition().x - this.hiddenPosition.x;
      this.runAction(new cc.MoveTo(this.dx / this.animationSpeed, this.hiddenPosition));
      return this.overlay.hide();
    };

    SideMenu.prototype.toggle = function() {
      if (this.shown) {
        return this.hide();
      } else {
        return this.show();
      }
    };

    SideMenu.prototype.evalInnerWidth = function() {
      var button, widths;
      if (this._innerWidth == null) {
        widths = (function() {
          var i, len, ref, results;
          ref = this.buttons;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            button = ref[i];
            results.push(button.getBoundingBox().width);
          }
          return results;
        }).call(this);
        this._innerWidth = Math.max.apply(0, widths) + this.evalMargin() * 8;
      }
      return this._innerWidth;
    };

    SideMenu.prototype.evalMargin = function() {
      var button, heights, heightsSum, leftoverSpace;
      heights = (function() {
        var i, len, ref, results;
        ref = this.buttons;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          button = ref[i];
          results.push(button.getBoundingBox().height);
        }
        return results;
      }).call(this);
      heightsSum = heights.reduce(function(t, s) {
        return t + s;
      });
      leftoverSpace = this.size.height - heightsSum;
      return Math.min(leftoverSpace / this.buttons.length + 1, heights[0] / 2);
    };

    SideMenu.prototype.evalInnerHeight = function() {
      var button, heights;
      if (this._innerHeight == null) {
        heights = (function() {
          var i, len, ref, results;
          ref = this.buttons;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            button = ref[i];
            results.push(button.getBoundingBox().height);
          }
          return results;
        }).call(this);
        this._innerHeight = (heights[0] + this.evalMargin() * 2) * this.buttons.length;
      }
      return this._innerHeight;
    };

    SideMenu.prototype.addItem = function(text, callback) {
      var button;
      button = new ccui.Button;
      button.setTouchEnabled(true);
      button.setTitleText(text);
      button.setTitleFontSize(24);
      button.setColor(cc.color(255, 0, 0));
      this.pushBackCustomItem(button);
      return this.buttons.push(button);
    };

    return SideMenu;

  })(ListView);

  this.Style = {
    animation: {
      duration: 0.3
    }
  };

  this.constrain = function(val, min, max) {
    if (min == null) {
      min = 0;
    }
    if (max == null) {
      max = 1;
    }
    return Math.min(max, Math.max(val, min));
  };

  this.orbtatingPercentage = function(val) {
    val = constrain(val, -1, 1);
    if (val <= 0) {
      return 1 + val;
    }
    return val;
  };

  this.intervalPercentage = function(v1, v2, percentage) {
    var max, min;
    min = Math.min(v1, v2);
    max = Math.max(v1, v2);
    return Math.abs(max - min) * percentage + min;
  };

}).call(this);
