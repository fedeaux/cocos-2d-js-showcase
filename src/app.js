(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.HelloWorldScene = cc.Scene.extend({
    onEnter: function() {
      var layer;
      this._super();
      layer = new LandingLayer;
      this.addChild(layer);
    }
  });

  this.Layer = (function(superClass) {
    extend(Layer, superClass);

    function Layer() {
      this.ctor();
    }

    return Layer;

  })(cc.Layer);

  this.LandingLayer = (function(superClass) {
    extend(LandingLayer, superClass);

    function LandingLayer() {
      var size;
      LandingLayer.__super__.constructor.apply(this, arguments);
      size = cc.winSize;
      this.label = new cc.LabelTTF('This d be awesome :3', 'Arial', 44);
      this.label2 = new cc.LabelTTF('Can I have it? ^^', 'Arial', 44);
      this.label.x = size.width / 2;
      this.label.y = size.height / 2;
      this.label2.x = size.width / 2;
      this.label2.y = size.height / 2 - 50;
      this.addChild(this.label);
      this.addChild(this.label2);
      true;
    }

    return LandingLayer;

  })(Layer);

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
