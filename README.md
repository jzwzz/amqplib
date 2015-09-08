Meteor-amqplib
===============
A wrapper around [amqplib](https://www.npmjs.com/package/amqplib) for Meteor.js

meteor add jzwzz:amqplib

amqplib module is exposed this way by Meteor-amqplib:

    amqpClient = Npm.require('amqplib');

To use it in your Meteor application, you can start right with code like this:


    Meteor.startup(function () {
        var q = 'carbox_p2c';
        var qc2p = 'carbox_c2p';

        var open = amqpClient.connect('amqp://localhost');

        // Publisher
        open.then(function(conn) {
            var ok = conn.createChannel();
            ok = ok.then(function(ch) {
                ch.assertQueue(q);
                ch.sendToQueue(q, new Buffer('something to do'));
            });
            return ok;
        }).then(null, console.warn);

        // Consumer
        open.then(function(conn) {
            var ok = conn.createChannel();
            ok = ok.then(function(ch) {
                ch.assertQueue(qc2p);
                ch.consume(qc2p, function(msg) {
                    if (msg !== null) {
                        console.log(msg.content.toString());
                        ch.ack(msg);
                    }
                });
            });
            return ok;
        }).then(null, console.warn);
    });
    
See amqplib [documentation](https://www.npmjs.com/package/amqplib) for more details.
