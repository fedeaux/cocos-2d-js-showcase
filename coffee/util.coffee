@constrain = (val, min = 0, max = 1) ->
  Math.min(max, Math.max(val, min))

@orbtatingPercentage = (val) ->
  val = constrain val, -1, 1
  return 1 + val if val <= 0
  val

@intervalPercentage = (v1, v2, percentage) ->
  min = Math.min v1, v2
  max = Math.max v1, v2

  Math.abs(max - min) * percentage + min
