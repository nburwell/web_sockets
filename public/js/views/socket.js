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
 
  render: function() {
    $(this.el).html( this.template( this.model ) );
    
    return this;
  }
});

var SocketMessageListView = Backbone.View.extend({
  template: _.template($("#template-socket-message-list").html()),

  initialize: function() {
    this.model.bind( "socket:message", this.onMessage, this );
    this.data = [];
  },
  
  onMessage: function( type, msg ) {
    console.log( "message in list view: " + msg );
    this.data.push( { 'name' : type, 'details' : msg } );
    this.render();
  },
  
  render: function() {
    $(this.el).html('');
    
    _.each( this.data, function( msg ) {
        var output = new SocketMessageView( { model : msg } ).render();
        console.log( output.$el.html() )
        $(this.el).prepend( output.$el.html() );
    }, this );

    return this;
  }
})