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

  // deleteUserFriend = function(idUser){
  //   User.find({}'friends': idUser}, function(err, arr){
  //     console.log(arr);
  //     if (arr.length <= 0) {
  //       return 0;
  //     }else {
  //       for(var i=0; i<arr.length; i++){
  //
  //       }
  //     }
  //   });
  // }
