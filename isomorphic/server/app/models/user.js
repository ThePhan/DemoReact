var mongoose        = require('mongoose');
var connectDB       = require('../../connect_mongo');
var User           = require('./user_schema');
var Schema = mongoose.Schema;
  mongoose = connectDB.initialize(mongoose);
  module.exports = {
  	listUser:function(req, res){
  		User.find(function(err, data){
  			if (err) {
  				res.status(404).json({'message': 'no data was found'});
  			}
  			res.status(200).json(data);
  		})

  	},

  	addUser:function(req, res){
      var idUser='';
      for(i=0; i<8; i++){
        var x=Math.floor(Math.random()*36);
        if(x>9){
          x=String.fromCharCode(x-10 + 'A'.charCodeAt(0));
        }
        idUser+=x;
      }
  		var user = new User(req.body);
  		// user._id = new Date().getTime();
      user._id=idUser;
  		user.save(function(err, data){
  			if (err) {
  				res.status(304).json({'message': 'err'});
  			}
  			res.status(200).json({'message': 'success'});
  		});

  	},

  	editUser:function(req, res){
  		var idUser = req.body._id;
  		User.findById(idUser, function(err, data){
  			if (!data) {
  				res.status(404).json({'message': 'User not exit'});
  			}
  			else{
  				data.firstName=req.body.firstName;
  				data.lastName=req.body.lastName;
  				data.photo=req.body.photo;
  				data.save(function(err){
  					if (err) {
  						res.status(304).json({'message': 'Update user faild'});
  					}
  					res.status(200).json({'message': 'Update sucess'});
  				});
  			}
  		});

  	},
  	deleteUser:function(req, res){
  		var idUser = req.body._id;
  		User.findById(idUser, function(err, user){
  			if (!user) {
  				res.status(404).json({'message':'Noone was found'});
  			}
  			else{
          deleteUserFriend(idUser);
  				user.remove(function(err, data){
  					if (err) {
  						res.status(304).json({'message':'Delete user faild'});
  					}
  					res.status(200).json({'message':'Sucess'});
  				});
  			}
  		});
  	}
  }

// delete id user in array friend of user when delete this user
  deleteUserFriend = function(idUser){
    User.find(function(err, arr){
      // console.log(arr);
      if (err) {
        console.log(err + "errrrrrrrrrrrrrrrrrrrrrrr");
        return 0;
      }else {
        //loop array user
        for(var i=0; i<arr.length; i++){
          // get user at index i to save arr Friend after delete one value in arr Friend
          var user = arr[i];
          //get arr Friend of user in index arr[i]
          var arrFriend = arr[i].friends;

          //create new array
          newArrFriend = [];
          var k = 0;

          // loop array friends
          for(var j = 0; j < arrFriend.length; j++){
            if (arrFriend[j] != idUser) {
              newArrFriend[k] = arrFriend[j];
              k++;
              // console.log("ok   " + arrFriend[j]);
            }
          }
          user.friends = newArrFriend;
          user.save(function(err, succ){
            if (err) {
              console.log(err);
            }
            console.log("success");
          })
        }
      }

    });
  }
