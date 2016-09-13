var user = require('./app/models/user');
var friend = require('./app/models/friend');

module.exports.initialize = function(app, router){
  router.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-HTTP-Method-Override");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    // var url = req.url;
    // if( url.length == 1){
    //   res.json({message:'Manager User'});
    // }else{
      // next the other router
      next();
    // }
  });
//   app.get('/', function(req, res){
//     req.on('close', function(){
//         console.log('Client closed the connection');
//     });
// });
  router.get('/user', user.listUser);

  router.post('/user', user.addUser);
  router.post('/friend',friend.addFriend);

  router.put('/user', user.editUser);

  router.delete('/user', user.deleteUser);
  router.delete('/friend', friend.deleteFriend);

  // app.disable('x-powered-by');
  app.use('/', router);
}
