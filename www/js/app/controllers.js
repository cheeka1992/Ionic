/**
 * beginnings of a controller to login to system
 * here for the purpose of showing how a service might
 * be used in an application
 */
angular.module('app.controllers', [])
    .controller('ListDetailCtrl', [
        '$http','$state', '$scope', '$stateParams', 'UserService','$window',   // <-- controller dependencies
        function ($http,$state, $scope, $stateParams, UserService,$window) {

   /*   var fetchData=function()
       {
        console.log("dis");
        Parse.initialize("TBHcbgC2OKUluE4WMRyaV2E0ZWcnD2psTsuPb0gN", "PAfNuQDQ9BAGZ9LZkluEKARQdJBMqqy3LdWv857s");

                        var query = new Parse.Query("Record");
                        query.equalTo("email",$scope.index);
                        query.first({

                     

                        success: function(results) {

                          var temp=JSON.parse(JSON.stringify(results));
                          $scope.check=temp;
                          console.log("inside");

                          
                         $scope.$apply();
                        console.log(temp);
          //    $scope.$broadcast('scroll.refreshComplete');

        },


         error: function(error) {
             alert("Error: " + error.code + " " + error.message);
                 }


                });

 
}

*/
                      
          $scope.index=$stateParams.itemId;   // to get the record name from previous page
        //   fetchData();

          $scope.check=(UserService.display($scope.index));  // to load the previous selections of thre record

         console.log($stateParams);



          $scope.previous = function () {
            $state.go('menutest', {},{reload: true});    // back button 


         }



             $scope.addcheck = function () {
             

              //  alert($scope.check.value1);
             UserService.addcheck($scope.check,$scope.index);   //updating the new selections in the database


               $state.go('menutest', {},{reload: true});       //Confirming and getting back to the precious page
             //   $state.go('tab.list', {},{reload: true});
              // $window.location.reload(true);

            }

             $scope.next = function () {
      
               $state.go('checkbox1', {itemId:$scope.index});  // Going to the sub checkbox list inside Birth
             //   $state.go('tab.list', {},{reload: true});
               //   $window.location.reload(true);

            }



                   

         }])



                 .controller('checkctrl', [
                '$http','$state', '$scope','UserService','$stateParams','$window', // <-- controller dependencies
               function ($http,$state, $scope,UserService,$stateParams,$window) {
 


                          var fetchData=function()
                           {
                            console.log("dis");
                            Parse.initialize("TBHcbgC2OKUluE4WMRyaV2E0ZWcnD2psTsuPb0gN", "PAfNuQDQ9BAGZ9LZkluEKARQdJBMqqy3LdWv857s");

                                            var query = new Parse.Query("Record");
                                            query.equalTo("email",$scope.index);
                                            query.first({

                                         

                                            success: function(results) {

                                              var temp=JSON.parse(JSON.stringify(results));
                                              $scope.test=temp;
                                              console.log("inside");

                                              
                                             $scope.$apply();
                                            console.log(temp);
                              //    $scope.$broadcast('scroll.refreshComplete');

                            },


                             error: function(error) {
                                 alert("Error: " + error.code + " " + error.message);
                                     }


                                    });

                     
                          }


                                   // window.setTimeout(function(){ alert($stateParams.itemId); }, 11100);
                                   $scope.x=$stateParams.itemId;         // Obtaining the record name from previous page

                                 
                                  //console.log(x);
                                  $scope.test=(UserService.showcheck($scope.x));  // Displaying the previous selections of the record

                                   
                                   
                                    //  $scope.index=$stateParams.itemId; 


                                     $scope.pre = function () {

                                       
                                       UserService.checkbox1($scope.test,$scope.x);     //saving the new selections
                                          fetchData();
                                     
                                       //console.log("hssss");

                                  $state.go('list-detail', {itemId:$scope.x},{reload:true});  // getting back to the previous screen
                                    //  $window.location.href = "#/menutest/$scope.x";

                                   //$scope.critiques.push(angular.copy($scope.critique));
                                  //   $window.history.back();   
                                //     $window.location.reload(true);        
                                                 }         
                      
                            

                              }])









    .controller('ListCtrl', [
        '$http','$state', '$scope', 'UserService','$window','$ionicPopup', // <-- controller dependencies
        function ($http,$state, $scope, UserService,$window,$ionicPopup) {


      var fetchData=function()
       {
         console.log("initialize2222");
      Parse.initialize("TBHcbgC2OKUluE4WMRyaV2E0ZWcnD2psTsuPb0gN", "PAfNuQDQ9BAGZ9LZkluEKARQdJBMqqy3LdWv857s");
        $scope.datalist = UserService.list();
        //  $scope.$apply();

        }




         //   fetchData();
      
              UserService.init();

             $scope.datalist = UserService.list();

  


              $scope.onDelete = function(item){

                alert(item);

            var record = Parse.Object.extend('Record');
            var query = new Parse.Query(record);


              query.equalTo('email',item);
            
            //        query.get('email');

                     query.first({

              success: function(results){
              
                results.destroy({});
                $ionicPopup.alert({title:'Record Deleted', template: '<center>Record has been successfully deleted from the list</center>'});
                  fetchData();
                $scope.$apply();  
              
                
              },
              error: function(obj, err){
                console.log(err);

            }
            })
          }



          










            $scope.doLogoutAction = function () {
                UserService.logout().then(function () {

                    // transition to next state
                    $state.go('app-login');

                }, function (_error) {
                    alert("error logging in " + _error.debug);
                })
            };
        }])

    .controller('AccountCtrl', [
        '$state', '$scope', 'UserService',   // <-- controller dependencies
        function ($state, $scope, UserService) {

            debugger;
            UserService.currentUser().then(function (_user) {
                $scope.user = _user;
            });


        }])



    

        .controller('adduserCtrl', [
            '$state', '$scope', 'UserService','$window', // <-- controller dependencies
            function ($state, $scope, UserService,$window,$cordovaCamera) {
              //  Parse.initialize("tf61sDjnNOnb2dtukkLDuLnUCdQHRsS8JcGstVN9", "EiL7T8fhIvlIpjGukPFBdEqvvUj1Yjk4EoWpx46t");

                  var fetchData=function()
       {
        console.log("initialize");
          Parse.initialize("TBHcbgC2OKUluE4WMRyaV2E0ZWcnD2psTsuPb0gN", "PAfNuQDQ9BAGZ9LZkluEKARQdJBMqqy3LdWv857s");

        } 




         $scope.previous = function () {
         // fetchData();
            $state.go('menutest', {},{reload:true});


         }

                $scope.rec = {};

                /**
                 *
                 */
                $scope.addUser = function () {



                    UserService.addUser($scope.rec);

                        fetchData();
                        alert("Success Record ");

                       $state.go('menutest', {});
              // $window.location.reload(true);


                    }


                  $scope.pictureUrl = 'http://placehold.it/300x300';

                    $scope.takePicture = function() {
                      var options = {
                        destinationType: Camera.DestinationType.DATA_URL,
                        encodingType: Camera.EncodingType.JPEG
                      }
                      $cordovaCamera.getPicture(options)
                        .then(function(data) {
                          //console.log('camera data: ' + angular.toJson(data));
                          $scope.pictureUrl = 'data:image/jpeg;base64,' + data;
                        }, function(error) {
                          console.log('camera error: ' + angular.toJson(error));
                        });
                    };






                }
            ])




        .controller('cameraController', function($scope, $cordovaCamera) {

            $scope.takePicture = function() {
                var options = {
                    quality : 75,
                    destinationType : Camera.DestinationType.DATA_URL,
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

        });
