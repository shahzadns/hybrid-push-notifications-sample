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
    var regIDs = req.body.regIDs || ['APA91bFS6o8Ycd2s_22uVnhwEsdwRM0PhBM3EXdtrN2qWEDP4CYlbBLKEWkqO9_yF0F8aAv94zjFsD5rvJdzf6oDjeysIHgtTNdLmDko0sdhwpo39kMNslz04Vb4529BJS3T43QLDpGi5vCISv4it7fcJVZV-XYndNVUfrqAmm1_UAeBmP4fZDSnD4X5CJykV7uE0BOB0Xu8'];

    var message = new gcm.Message();
    message.addData('message', req.body.message || 'This is a test push notification');

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