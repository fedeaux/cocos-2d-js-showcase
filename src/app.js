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
      var i, item, len, ref;
      this.container = container;
      SideMenu.__super__.constructor.apply(this, arguments);
      this.size = this.container.getBoundingBox();
      this.buttons = [];
      this.setDirection(ccui.ScrollView.DIR_VERTICAL);
      this.setTouchEnabled(true);
      this.setBounceEnabled(true);
      this.setClippingEnabled(true);
      this.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
      this.setBackGroundColor(cc.color(0, 0, 0));
      this.setAnchorPoint(cc.p(0, 1));
      this.setGravity(ccui.ListView.GRAVITY_CENTER_HORIZONTAL);
      this.setContentSize(cc.size(this.size.width, this.size.height));
      ref = ['Animations', 'UI', 'Scene Transitions', 'Network'];
      for (i = 0, len = ref.length; i < len; i++) {
        item = ref[i];
        this.addItem(item);
      }
      this.setItemsMargin(this.evalMargin());
      this.setContentSize(cc.size(this.evalInnerWidth(), this.size.height));
      this.shownPosition = cc.p(0, this.size.height);
      this.hiddenPosition = cc.p(-this.evalInnerWidth(), this.size.height);
      this.setPosition(this.hiddenPosition);
      this.showAnimation = new cc.MoveTo(2, this.shownPosition);
      this.hideAnimation = new cc.MoveTo(2, this.hiddenPosition);
      G.side_menu = this;
      this.hide();
    }

    SideMenu.prototype.show = function() {
      console.log('show');
      this.visible = true;
      return this.runAction(this.showAnimation);
    };

    SideMenu.prototype.hide = function() {
      console.log('hide');
      this.visible = false;
      return this.runAction(this.hideAnimation);
    };

    SideMenu.prototype.toggle = function() {
      if (this.visible) {
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
        console.log(heights[0], this.evalMargin());
        console.log(this._innerHeight);
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

}).call(this);
