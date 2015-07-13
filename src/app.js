(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

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

  this.LandingLayer = (function(superClass) {
    extend(LandingLayer, superClass);

    function LandingLayer() {
      var button;
      LandingLayer.__super__.constructor.apply(this, arguments);
      this.size = cc.winSize;
      this.menu = new LandingMenu;
      button = new ccui.Button;
      button.setTouchEnabled(true);
      button.loadTextures(res.CloseNormal_png, res.CloseSelected_png, '');
      button.setTitleText('Alface');
      button.setTitleFontSize(24);
      button.setAnchorPoint(cc.p(1, 0.5));
      button.setPosition(cc.p(this.size.width / 2, this.size.height / 2));
      this.addChild(button);
      this.addChild(this.menu);
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
      Landing.__super__.onEnter.apply(this, arguments);
      layer = new LandingLayer;
      this.addChild(layer);
    };

    return Landing;

  })(Scene);

  this.LandingMenu = (function(superClass) {
    extend(LandingMenu, superClass);

    function LandingMenu() {
      var i, item, len, ref;
      LandingMenu.__super__.constructor.apply(this, arguments);
      this.size = cc.winSize;
      this.setTouchEnabled(true);
      this.setBounceEnabled(true);
      this.setBackGroundColor(cc.color(200, 200, 200, 0), cc.color(180, 180, 180, 0));
      this.setContentSize(cc.size(this.size.width, this.size.height));
      this.setAnchorPoint(cc.p(0.5, 0.5));
      this.setPosition(cc.p(this.size.width / 2, this.size.height / 2));
      ref = ['Animations', 'UI', 'Scene Transitions', 'Network'];
      for (i = 0, len = ref.length; i < len; i++) {
        item = ref[i];
        this.addItem(item);
      }
    }

    LandingMenu.prototype.addItem = function(text, callback) {
      var button;
      button = new ccui.Button;
      button.setTouchEnabled(true);
      button.loadTextures(res.CloseNormal_png, res.CloseSelected_png, '');
      button.setTitleText(text);
      button.setTitleFontSize(24);
      button.setAnchorPoint(cc.p(1, 0.5));
      button.setPosition(cc.p(this.size.width / 2, this.size.height / 2));
      return this.pushBackCustomItem(button);
    };

    return LandingMenu;

  })(ListView);

}).call(this);
