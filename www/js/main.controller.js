/**
 * Created by Shahzad on 3/9/2015.
 */

(function () {
    'use strict';

    angular
        .module('starter')
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$scope', '$rootScope'];

    function MainCtrl( $scope, $rootScope ) {
        /*VM functions*/
        $scope.register = register;
        $scope.unRegister = unRegister;

        /*VM properties*/
        //...

        //to get app register for push notifications services e.g GCM
        function register() {
            alert('You chose to Register!');
        }

        //to get app un-register from push notifications services e.g GCM
        function unRegister() {
            alert('You chose to Un-register!');
        }
    }
})();
