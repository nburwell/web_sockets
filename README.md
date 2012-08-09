Web Sockets playground
===========

Experiments and demos with event machine, web_sockets and event-based JavaScript. Feel free to fork and improve on the examples.

## Setup

1. Download this repo to a directory
2. From the directory:

        bundle install

3. Install redis if you want to play with pub/sub

        brew install redis

4. Start the servers:

        /usr/local/bin/redis-server &
        ./server.rb

5. View the client page in a browser [localhost:4000](http://localhost:4000)

6. To publish commands to the redis channel, do something like:

        redis-cli
        > publish 'chat' 'This is a test message from redis command line client'
