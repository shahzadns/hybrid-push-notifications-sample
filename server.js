/**
 * Created by shahzad on 3/10/2015.
 */

//requires dependency modules
var express = require('express');
var bodyParser = require('body-parser');
var gcm = require('node-gcm');

//configuration
var config = {
    port : 3000,
    GCMServerKey: 'AIzaSyCn52lhDmCGEj6djV3chw4Uvw8P10NFEGs'
};

//setting up server
var app = express();
app.listen(config.port);
console.log('server is listening to ' + config.port);
var sender = new gcm.Sender(config.GCMServerKey);

//setting up middleware
app.use(bodyParser.urlencoded({
    extended : true
}));
app.use(bodyParser.json());
//allowing CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/* setting up endpoints */
app.get('/', function(req, res){
    res.send('Push notification server APIs are running.');
});

app.post('/send-notification', function(req, res){
    /*GCM business logic*/

    if(!req.body.regID){
        console.error('push notification: regID missing');
        res.send({
            message: 'push notification: regID missing.'
        });
        return;
    }

    var regIDs = [req.body.regID]; // it can also be multiple when needed

    var message = new gcm.Message();
    message.addData('title', req.body.title || 'Title Rocks!');
    message.addData('message', req.body.message || 'This is lovely description.');

    sender.send(message, regIDs, function (err, result) {
        if(err) {
            console.error('push notification:error', err);
            res.send({
                message: 'error occurred.'
            });
        } else {
            console.log('push notification:success', result);
            res.send({
                message: 'push notification sent successfully.'
            });
        }
    });
});