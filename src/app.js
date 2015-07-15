(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.Layer = (function(superClass) {
    extend(Layer, superClass);

    function Layer() {
      this.ctor();
    }

    return Layer;

  })(cc.Layer);

  this.Scene = (function(superClass) {
    extend(Scene, superClass);

    function Scene() {
      this.ctor();
    }

    return Scene;

  })(cc.Scene);

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

  this.Header = (function(superClass) {
    extend(Header, superClass);

    function Header() {
      Header.__super__.constructor.apply(this, arguments);
      this.size = cc.winSize;
      this.setContentSize(this.size.width, 80);
      this.createBoundingBox();
      this.createMenuButton();
    }

    Header.prototype.createBoundingBox = function() {
      console.log(this.getContentSize());
      this.boundingBox = new ccui.HBox();
      this.boundingBox.setAnchorPoint(cc.p(0, 1));
      this.boundingBox.setPosition(cc.p(0, this.size.height));
      this.boundingBox.setContentSize(cc.size(this.getContentSize().width, this.getContentSize().height));
      this.boundingBox.setClippingEnabled(true);
      this.boundingBox.setBackGroundImage(res.HelloWorld_png);
      return this.addChild(this.boundingBox);
    };

    Header.prototype.createMenuButton = function() {
      var margin;
      this.menuButton = new cc.Sprite("res/icons/list.png");
      this.menuButton.setAnchorPoint(cc.p(0.5, 0.5));
      margin = (this.boundingBox.getContentSize().height - this.menuButton.getContentSize().height) / 2;
      this.menuButton.setPosition(cc.p(this.boundingBox.getContentSize().width - margin, -margin));
      return this.addChild(this.menuButton);
    };

    return Header;

  })(Layer);

  this.LandingLayer = (function(superClass) {
    extend(LandingLayer, superClass);

    function LandingLayer() {
      LandingLayer.__super__.constructor.apply(this, arguments);
      this.size = cc.winSize;
      this.menu = new LandingMenu;
      this.addChild(this.menu);
    }

    return LandingLayer;

  })(Layer);

  this.APP = (function(superClass) {
    extend(APP, superClass);

    function APP() {
      return APP.__super__.constructor.apply(this, arguments);
    }

    APP.prototype.onEnter = function() {
      var header, layer;
      APP.__super__.onEnter.apply(this, arguments);
      header = new Header;
      this.addChild(header);
      layer = new LandingLayer;
      return this.addChild(layer);
    };

    return APP;

  })(Scene);

  this.LandingMenu = (function(superClass) {
    extend(LandingMenu, superClass);

    function LandingMenu() {
      var i, item, len, ref;
      LandingMenu.__super__.constructor.apply(this, arguments);
      this.size = cc.winSize;
      this.buttons = [];
      this.setDirection(ccui.ScrollView.DIR_VERTICAL);
      this.setTouchEnabled(true);
      this.setBounceEnabled(true);
      this.setAnchorPoint(cc.p(0.5, 0.5));
      this.setPosition(cc.p(this.size.width / 2, this.size.height / 2));
      this.setGravity(ccui.ListView.GRAVITY_CENTER_HORIZONTAL);
      this.setContentSize(cc.size(this.size.width, 100));
      ref = ['Animations', 'UI', 'Scene Transitions', 'Network'];
      for (i = 0, len = ref.length; i < len; i++) {
        item = ref[i];
        this.addItem(item);
      }
      this.setItemsMargin(this.evalMargin());
      this.setContentSize(cc.size(this.size.width, this.evalInnerHeight()));
      this.refreshView();
    }

    LandingMenu.prototype.evalMargin = function() {
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

    LandingMenu.prototype.evalInnerHeight = function() {
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

    LandingMenu.prototype.addItem = function(text, callback) {
      var button;
      button = new ccui.Button;
      button.setTouchEnabled(true);
      button.setTitleText(text);
      button.setTitleFontSize(24);
      button.setColor(cc.color(255, 0, 0));
      this.pushBackCustomItem(button);
      return this.buttons.push(button);
    };

    return LandingMenu;

  })(ListView);

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

}).call(this);
