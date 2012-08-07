var SocketView = Backbone.View.extend({
  template: _.template($("#template-socket-connection").html()),

  initialize: function() {
    console.log( "initialize" );
    
    this.model.bind( "change:connected", this.render, this );
  },
  
  events: {
    "click .btn-primary": "connect",
    "click .btn-danger" : "disconnect"
  },
  
  render: function() {
    console.log( "connected: " + this.model.get( 'connected' ) );
    $(this.el).html( this.template( this.model.toJSON() ) );
    
    return this;
  },
  
  connect: function() {
      this.model.connect();
  },
  
  disconnect: function() {
      this.model.disconnect();
  }
});


var SocketMessageView = Backbone.View.extend({
  template: _.template($("#template-socket-message").html()),

  initialize: function() {
    console.log( "initialize" );
    
    this.model.bind( "socket:message", this.onMessage, this );
  },
  
  onMessage: function( msg ) {
    console.log( "message: " + msg );
  },
  
  render: function() {
    $(this.el).html( this.template( this.model.toJSON() ) );
    
    return this;
  }
});