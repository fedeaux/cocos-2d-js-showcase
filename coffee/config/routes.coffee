class @Routes
  constructor: ->
    @definitions = {
      'animation/:id': (id) ->
        Controllers.Animation.show id
    }

window.routes = new @Routes
