// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function( $ionicPlatform, notificationService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    //making pushNotification object to globally accessible.
    pushNotification = window.plugins.pushNotification;

    //deviceReady();
    notificationService.initialize();
  });
});
//
///*push notification logic*/
//function deviceReady (){
//  alert('document device ready');
//
//  pushNotification = window.plugins.pushNotification;
//  //alert('pushNotification availability:' + !!window.plugins.pushNotification);
//
//  var isAndroid = ionic.Platform.isAndroid();
//  var $status = $("#app-status-ul");
//
//  $status.append('<li class="item">registering device.</li>');
//  if ( isAndroid ){
//    pushNotification.register(
//        successHandler,
//        errorHandler,
//        {
//          "senderID":"609952749715",
//          "ecb":"onNotification"
//        });
//  }
//}
//
//// result contains any message sent from the plugin call
//function successHandler (result) {
//  alert('result = ' + result);
//}
//
//// result contains any error description text returned from the plugin call
//function errorHandler (error) {
//  alert('error = ' + error);
//}
//
////on notification handler
//function onNotification(e) {
//  var $status = $("#app-status-ul");
//  alert("On notification");
//
//  $status.append('<li>EVENT -> RECEIVED:' + e.event + '</li>');
//  switch( e.event )
//  {
//    case 'registered':
//      if ( e.regid.length > 0 )
//      {
//        $status.append('<li>REGISTERED -> REGID:' + e.regid + "</li>");
//        // Your GCM push server needs to know the regID before it can push to this device
//        // here is where you might want to send it the regID for later use.
//        alert("regID = " + e.regid);
//        console.log(e.regid);
//      }
//      break;
//
//    case 'message':
//      // if this flag is set, this notification happened while we were in the foreground.
//      // you might want to play a sound to get the user's attention, throw up a dialog, etc.
//      if ( e.foreground )
//      {
//        $status.append('<li>--INLINE NOTIFICATION--' + '</li>');
//
//        // on Android soundname is outside the payload.
//        // On Amazon FireOS all custom attributes are contained within payload
//        var soundfile = e.soundname || e.payload.sound;
//        // if the notification contains a soundname, play it.
//        var my_media = new Media("/android_asset/www/"+ soundfile);
//        my_media.play();
//      }
//      else
//      {  // otherwise we were launched because the user touched a notification in the notification tray.
//        if ( e.coldstart )
//        {
//          $status.append('<li>--COLDSTART NOTIFICATION--' + '</li>');
//        }
//        else
//        {
//          $status.append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
//        }
//      }
//
//      $status.append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
//      //Only works for GCM
//      $status.append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
//      //Only works on Amazon Fire OS
//      $status.append('<li>MESSAGE -> TIME: ' + e.payload.timeStamp + '</li>');
//      break;
//
//    case 'error':
//      $status.append('<li>ERROR -> MSG:' + e.msg + '</li>');
//      break;
//
//    default:
//      $status.append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
//      break;
//  }
//
//  //TODO Fix add class to li.
//  $status.find('li').addClass('item');
//}