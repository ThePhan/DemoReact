var mongoose = require('mongoose');
var connectDB = require('../../connect_mongo');
var User = require('./user_schema');
var Schema = mongoose.Schema;
mongoose = connectDB.initialize(mongoose);
module.exports = {
    /* add frien into user
    find user have exit? if oke, insert id of other user into friends of this user
    */
    addFriend: function(req, res) {
      console.log(req);
        var idUser = req.body._id;
        User.find({
            "_id": idUser
        }, function(err, user) {
            if (user.length <= 0) {
                res.status(404).json({
                    'message': 'User not exit'
                });
            } else {
                var friend = user[0];
                var idFriend = req.body.idFriend;
                friend.friends.push(idFriend);
                friend.save(function(err) {
                    if (err) {
                        res.status(304).json({
                            'message': 'Save faid'
                        });
                    }
                    res.status(200).json({
                        'Message': 'oke'
                    });
                });

            }
        });
    },
    deleteFriend: function(req, res) {
        var idUser = req.body._id;
        User.find({
            "_id": idUser
        }, function(err, user) {
            if (user.length <= 0) {
                res.status(404).json({
                    'message': 'No user was found'
                });
            } else {
                var users = user[0];
                var friend = users.friends;
                var idFriend = req.body.idFriend;
                // console.log(idFriend + "")
                var newArr = [];
                var i=0;
                for (j = 0; j < friend.length; j++) {
                    if (friend[j] != idFriend) {
                      newArr[i] = friend[j];
                      i++;
                    }
                }
                users.friends = newArr;
                users.save(function(err){
                  if (err) {
                    res.status(304).json({'Message': 'Delete faild'});
                  }
                  res.status(200).json({'Message': 'Delete friend oke'});
                });
            }
        });
    }
}
