var socket;

var SocketWrapper = Backbone.Model.extend( {

      initialize: function() { 

      },

      connect: function() { 
          if ( socket && socket.readyState == 1 )
          {
              console.log( "Already connected" );
              return;
          }
          
          var url = 'ws://' + this.get( 'host' ) + ':' + this.get( 'port');
          var self = this;
          
          socket = new WebSocket( url );
          socket.onmessage = function( msg ) {
              try
              {
                var response = JSON.parse( msg.data );
              }
              catch( ex )
              {
                self.trigger( "socket:parse_error", "Could not parse message from socket: " + msg.data );
                return;
              }
              
              if ( response.type == "Connect" )
              {
                  self.trigger( "socket:connect", response['data'] );
              }
              else
              {
                  self.trigger( "socket:message", response['data'] );
              }
          };

          socket.onerror = function(evt) {
              dispatcher.trigger( "socket:error" );
              console.log( evt );
          }
      }
  } );
