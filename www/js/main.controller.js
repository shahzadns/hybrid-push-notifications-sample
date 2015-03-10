/**
 * Created by Shahzad on 3/9/2015.
 */

(function () {
    'use strict';

    angular
        .module('starter')
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$scope', '$rootScope', 'notificationService'];

    function MainCtrl( $scope, $rootScope, notificationService ) {
        /*VM functions*/
        $scope.register = register;
        $scope.unRegister = unRegister;
        $scope.sendPushNotification = sendPushNotification;

        /*VM properties*/
        //...

        /*initialization stuff*/
        $scope.notifications = notificationService.getNotificationsRecords();

        //to get app register for push notifications services e.g GCM
        function register() {
            alert('You chose to Register!');
            notificationService.register();
        }

        //to get app un-register from push notifications services e.g GCM
        function unRegister() {
            alert('You chose to Un-register!');
            notificationService.unRegister();
        }

        //to send a push notification to the message server.
        function sendPushNotification() {
            alert('You chose to send a push notification!');

            var data = {
                message: 'This is a test push notification.'
            };

            notificationService.sendPushNotification( data )
                .success(function ( res ) {
                    alert( res.message );
                })
                .error(function( err ) {
                    alert( err );
                });
        }
    }
})();
