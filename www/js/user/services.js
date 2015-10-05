angular.module('user.services', [])

    .service('UserService', ['$q', 'ParseConfiguration',
        function ($q, ParseConfiguration) {

            var parseInitialized = false;

//var datalist=[];



            return {

                /**
                 *
                 * @returns {*}
                 */

               
                 init: function () {

             //       debugger;
                    // if initialized, then return the activeUser
                    if (parseInitialized === false) {
                        Parse.initialize("TBHcbgC2OKUluE4WMRyaV2E0ZWcnD2psTsuPb0gN", "PAfNuQDQ9BAGZ9LZkluEKARQdJBMqqy3LdWv857s");
                        parseInitialized = true;
                        console.log("parse initialized in init function");
                    }

                    var currentUser = Parse.User.current();
                 
                    if (currentUser) {
                        return $q.when(currentUser);
                    } else {
                        return $q.reject({error: "noUser"});
                    }
                    
                },

                list:function () {
                  //  $interval.flush(2)
                    var datalist=[];
                   var Record = Parse.Object.extend("Record");
                   var currentUser = Parse.User.current();
                   var query = new Parse.Query(Record);


                    query.equalTo("parent",currentUser);

                     query.find({
                 success: function(results) {
                     console.log("Successfully retrieved " + results.length);
                    // Do something with the returned Parse.Object values
                    for (var i = 0; i < results.length; i++) {
                     var object = results[i];
                    datalist.push(object.get('email'));
                     // alert(object.id + ' - ' + object.get('email'));

                     }
                    },
                        error: function(error) {
                        alert("Error: " + error.code + " " + error.message);
                        }
                        });

                     //   alert("checking" + datalist[1]);
                        return datalist;      
              //return datalist.currentUser;










                    },


    
                /**
                /**
                 *
                 * @param _userParams
                 */
                createUser: function (_userParams) {

                    var user = new Parse.User();
                    user.set("username", _userParams.email);
                    user.set("password", _userParams.password);
                        user.set("email", _userParams.email);
                    user.set("first_name", _userParams.first_name);
                    user.set("last_name", _userParams.last_name);
                    user.set("dob", _userParams.dob);

                    // should return a promise
                    return user.signUp(null, {});

                },


                addUser: function (_recordParams) {


                  var currentUser = Parse.User.current();


                    var Record = Parse.Object.extend("Record");
                    var record = new Record();
                    
                 
                    record.set("email", _recordParams.recordFirstName);
                    record.set("recordLastName", _recordParams.recordLastName);
                    record.set("recordPhoto", _recordParams.recordPhoto);
                    record.set("recordDOB", _recordParams.recordDOB);
                
                    

                    
                 //   datalist.push(_recordParams.recordFirstName,currentUser.id); 
                     
                //alert(datalist);
                record.set("parent",currentUser);


                record.save(null, {
                    success: function(record) {
                  
        console.log("initialize");
          Parse.initialize("TBHcbgC2OKUluE4WMRyaV2E0ZWcnD2psTsuPb0gN", "PAfNuQDQ9BAGZ9LZkluEKARQdJBMqqy3LdWv857s");

        
                    // Execute any logic that should take place after the object is saved.
                alert('New object created with objectId: ' + currentUser.id);
                    },
                error: function(record, error) {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and message.
                alert('Failed to create new object, with error code: ' + error.message);
                    }
                });
                  

                },
                /**
                 *
                 * @param _parseInitUser
                 * @returns {Promise}
                 */
                currentUser: function (_parseInitUser) {

                    // if there is no user passed in, see if there is already an
                    // active user that can be utilized
                    _parseInitUser = _parseInitUser ? _parseInitUser : Parse.User.current();

                    console.log("_parseInitUser " + Parse.User.current());
                    if (!_parseInitUser) {
                        return $q.reject({error: "noUser"});
                    } else {
                        return $q.when(_parseInitUser);
                    }
                },


                  addcheck: function (_checkParams,master) {

   

                            var Record = Parse.Object.extend("Record");
                            var query = new Parse.Query(Record);

                            query.equalTo('email',master);
          
                            query.first({

                                                    
                            success: function (Record) {
                                Record.save(null, {

                                success: function (record){
    
                                     
                
            
                            record.set("First", _checkParams.value1);
                            record.set("Second", _checkParams.value2);
                            record.set("Third", _checkParams.value3);
                            record.set("Fourth", _checkParams.value4);
                            record.set("Fifth", _checkParams.value5);
                            record.set("Sixth", _checkParams.value6);
                            record.save();
                    }
                    });

                    }

                    });

                     },






                  checkbox1: function (_checkParams,master) {

                      var Record = Parse.Object.extend("Record");
                      var query = new Parse.Query(Record);
                      query.equalTo('email',master);
   

                      query.first({

                          success: function (Record) {
                          Record.save(null, {

                        success: function (record){
    
                                     
                     if(_checkParams.value1==true && _checkParams.value2==true)
                   {
                    
                         console.log("hello " + _checkParams.value1 + master);
                         record.set("Value1", _checkParams.value1);
                         record.set("Value2", _checkParams.value2);
                         record.set("First",true);
                           record.save();
                    
                   }

                    else
                     {
                        console.log(record.get("First"));
                        record.set("Value1", _checkParams.value1);
                        record.set("Value2", _checkParams.value2);
                        record.set("First",false);
                        console.log(record.get("First") + " " + master);
                          record.save();
                    }
                    


                      record.save();
                 },

                     error: function(error) {
                        alert("Error: " + error.code + " " + error.message);
                        }
                    






                    });

                }

            });

                 },

          

                        

                
                
            



             display: function (rec) {

                console.log("chehehehe");        

                   var i={value1: false,value2: false,value3: false,value4:false,value5:false,value6:false};
                  //    var i=[];
                 // var Record = Parse.Object.extend("Record");
                           /*        var i=[{name:"Birth",value1: false}, {name: "2 months", value2: false},
                                         {name: "4 months", value3: false},{name: "6 months",value4: false},
                                        {name: "8 months", value5: false},{name: "12 months", value6: false}];

*/

                        
                        var query = new Parse.Query("Record");
                        query.equalTo("email",rec);
                        query.first({

                     

                        success: function(results) {
                            console.log("test");


       
                  // alert(results.get('First'));
                    i.value1=results.get('First');
                    i.value2=results.get('Second');
                    i.value3=results.get('Third');
                    i.value4=results.get('Fourth');
                    i.value5=results.get('Fifth');
                    i.value6=results.get('Sixth');

          

          // alert(typeof i);

                 

                 },
    
          error: function(error) {
             alert("Error: " + error.code + " " + error.message);
                 }


                });
              
                     return i;
                   },




             showcheck: function (rec) {

                    
                      var i={value1: false,value2: false};
                      var query = new Parse.Query("Record");
                      query.equalTo("email",rec);
                      query.first({

                     

                   success: function(results) {

                        i.value1=results.get('Value1');
                        i.value2=results.get('Value2');
                  

    
                 },
    
                   error: function(error) {
                     alert("Error: " + error.code + " " + error.message);
                    }


                });
               
                     return i;
                   },
           






                login: function (_user, _password) {
                    return Parse.User.logIn(_user, _password);
                },
                /**
                 *
                 * @returns {Promise}
                 */
                logout: function (_callback) {
                    var defered = $q.defer();
                    Parse.User.logOut();
                    defered.resolve();
                    return defered.promise;

                }

            }
        }]);




    