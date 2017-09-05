
var UTILS = {
  subtract_floor: function(num, floor){
    return (num < floor)? num : num - 1;
  },
  compare_arrays: function(a1, a2){
    if (a1.length != a2.length){
      return false;
    }
    for (var i = 0; i < a1.length; i++){
      if (a1[i] != a2[i]){
        return false;
      }
    }
    return true;
  },
  compare_objects: function(o1, o2){
    
    for (key in o1){
      if (o1[key] != o2[key]){
        return false;
      }
    }
    return true;
  }
};