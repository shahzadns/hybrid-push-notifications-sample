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
    var regIDs = req.body.regIDs || ['APA91bELlK2Kw59DJ9PVIKqKjO914bRj3Ru5ohXNjd4wglql2uAt4thSW6pTWLj_u7N9HR-gyOyX_3hm_L4HR6kxrUr86MDVakDP1qUEh2DHNbBNtThPvTbiPWf643BG2mjHWMklfiFASg8l93Cllbt-Vre9Bmy8eBF_PZe99bc75i_B3byRY6A'];

    var message = new gcm.Message();
    message.addData('message', 'This is a test push notification');

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