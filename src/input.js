// input

var Input = function(){

  window.addEventListener('keydown',function(event){
    event_key_down(event.key);
  });

  window.addEventListener('keyup',function(event){
    event_key_up(event.key);
  });

  var key_subscriptions = {
    w: [],
    a: [],
    s: [],
    d: [],
    ' ': [],
    'Enter': []
  };

  function event_key_down(key){
    if (key_subscriptions[key]){
      for (var i = 0; i < key_subscriptions[key].length; i++){
        key_subscriptions[key][i](true);
      }
    }
  };

  function event_key_up(key){
    if (key_subscriptions[key]){
      for (var i = 0; i < key_subscriptions[key].length; i++){
        key_subscriptions[key][i](false);
      }
    }
  };

  function subscribe_to_key(key, callback){
    if (key_subscriptions[key]){
      key_subscriptions[key].push(callback);
    }
  };

  this.subscribe_to_key = subscribe_to_key;

};