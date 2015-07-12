(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.HelloWorldLayer = cc.Layer.extend({
    sprite: null,
    ctor: function() {
      var closeItem, helloLabel, menu, size;
      this._super();
      size = cc.winSize;
      closeItem = new cc.MenuItemImage(res.CloseNormal_png, res.CloseSelected_png, (function() {
        cc.log('Menu is clicked!');
      }), this);
      closeItem.attr({
        x: size.width - 20,
        y: 20,
        anchorX: 0.5,
        anchorY: 0.5
      });
      menu = new cc.Menu(closeItem);
      menu.x = 0;
      menu.y = 0;
      this.addChild(menu, 1);
      helloLabel = new cc.LabelTTF('Coffee NPM Gruntfile.coffee without classes!', 'Arial', 38);
      helloLabel.x = size.width / 2;
      helloLabel.y = 0;
      this.addChild(helloLabel, 5);
      this.sprite = new cc.Sprite(res.HelloWorld_png);
      this.sprite.attr({
        x: size.width / 2,
        y: size.height / 2,
        scale: 0.5,
        rotation: 180
      });
      this.addChild(this.sprite, 0);
      this.sprite.runAction(cc.sequence(cc.rotateTo(2, 0), cc.scaleTo(2, 1, 1)));
      helloLabel.runAction(cc.spawn(cc.moveBy(2.5, cc.p(0, size.height - 40)), cc.tintTo(2.5, 255, 125, 0)));
      return true;
    }
  });

  this.HelloWorldScene = cc.Scene.extend({
    onEnter: function() {
      var layer;
      this._super();
      layer = new LandingLayer;
      this.addChild(layer);
    }
  });

  this.LandingLayer = cc.Layer.extend({
    ctor: function() {
      var size;
      this._super();
      size = cc.winSize;
      this.label = new cc.LabelTTF('No pretty way to class', 'Arial', 44);
      this.label.x = size.width / 2;
      this.label.y = size.height / 2;
      this.addChild(this.label);
      return true;
    }
  });

  this.Landing = (function(superClass) {
    extend(Landing, superClass);

    function Landing() {
      return Landing.__super__.constructor.apply(this, arguments);
    }

    Landing.prototype.onEnter = function() {
      var layer;
      this._super();
      layer = new LandingLayer;
      this.addChild(layer);
    };

    return Landing;

  })(cc.Scene);

  this.LandingMenu = (function(superClass) {
    extend(LandingMenu, superClass);

    function LandingMenu() {
      this.ctor = bind(this.ctor, this);
      return LandingMenu.__super__.constructor.apply(this, arguments);
    }

    LandingMenu.prototype.ctor = function() {
      var button, size;
      LandingMenu.__super__.ctor.call(this);
      size = cc.winSize;
      this.setDirection(ccui.ScrollView.DIR_VERTICAL);
      this.setTouchEnabled(true);
      this.setBounceEnabled(true);
      this.setBackGroundImage(res.HelloWorld_png);
      this.setContentSize(cc.size(size.width, size.height));
      this.setAnchorPoint(cc.p(0.5, 0.5));
      this.setPosition(cc.p(size.width / 2, size.height / 2));
      button = new ccui.Button;
      button.setTouchEnabled(true);
      button.loadTextures(res.CloseNormal_png, res.CloseSelected_png, '');
      button.setTitleText("Alface");
      button.setTitleFontSize(24);
      button.setAnchorPoint(cc.p(1, 0.5));
      button.setPosition(cc.p(50, size.height / 2));
      this.pushBackCustomItem(button);
      button = new ccui.Button;
      button.setTouchEnabled(true);
      button.loadTextures(res.CloseNormal_png, res.CloseSelected_png, '');
      button.setTitleText("Alface");
      button.setTitleFontSize(24);
      button.setAnchorPoint(cc.p(1, 0.5));
      button.setPosition(cc.p(50, size.height / 2));
      this.pushBackCustomItem(button);
      button = new ccui.Button;
      button.setTouchEnabled(true);
      button.loadTextures(res.CloseNormal_png, res.CloseSelected_png, '');
      button.setTitleText("Alface");
      button.setTitleFontSize(24);
      button.setAnchorPoint(cc.p(1, 0.5));
      button.setPosition(cc.p(50, size.height / 2));
      return this.pushBackCustomItem(button);
    };

    return LandingMenu;

  })(ccui.ListView);

}).call(this);
