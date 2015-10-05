/**
 * beginnings of a controller to login to system
 * here for the purpose of showing how a service might
 * be used in an application
 */
angular.module('user.controllers', [])
    .controller('LoginController', [
        '$state', '$scope', 'UserService','$window', // <-- controller dependencies
        function ($state, $scope, UserService,$window) {

           // debugger;

            // ng-model holding values from view/html
            $scope.creds = {
                username: "adminuser",
                password: ""
            };
             UserService.init();

            /**
             *
             */
            $scope.doLogoutAction = function () {
                UserService.logout()
                    .then(function (_response) {
                        // transition to next state
                        $state.go('app-login',{},{reload: true});
                            
                         $window.location.reload(true);

                    }, function (_error) {
                        alert("error logging in " + _error.debug);
                    })
            };

            /**
             *
             */
            $scope.doLoginAction = function () {
                UserService.login($scope.creds.email, $scope.creds.password)
                    .then(function (_response) {

                        alert("login success " + _response.attributes.username);

                        // transition to next state
                     
                                $state.go('app-home', {});
              // $window.location.reload(true);


                    }, function (_error) {
                        alert("error logging in " + _error.message);
                    })
            };
        }])
    .controller('SignUpController', [
        '$state', '$scope', 'UserService', '$cordovaCamera','$window',  // <-- controller dependencies
        function ($state, $scope, UserService,$window, $cordovaCamera) {



            $scope.creds = {};

            
             $scope.start = function () {
  $state.go('app-login', {});
 }

             
            $scope.signUpUser = function () {
  
                UserService.init();


                UserService.createUser($scope.creds).then(function (_data) {
                    $scope.user = _data;

                    alert("Success Creating User Account ");

                $state.go('app-home', {});
             
                           // $state.go('tab.list', {},{reload: true});
            //   $window.location.reload(true);


                }, function (_error) {
                    alert("Error Creating User Account " + _error.debug)
                });
            }



 /*       $scope.takePicture = function() {
        var options = { 
            quality : 75, 
            destinationType: Camera.DestinationType.DATA_URL, 
            sourceType : Camera.PictureSourceType.CAMERA, 
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
 
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });
    }
   */         






        }])



                .controller('homeController', [
        '$state', '$scope','$window', // <-- controller dependencies
        function ($state, $scope,$window) {



 
             $scope.HomeUser = function () {


                         $state.go('menutest', {},{reload: true});
               $window.location.reload(true);
           }

       }
       ]);


















    ;
