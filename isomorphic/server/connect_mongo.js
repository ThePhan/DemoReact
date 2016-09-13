module.exports.initialize = function(mongoose){
  // mongoose = mongoose.createConnection('mongodb://localhost/users');
  mongoose = mongoose.createConnection('mongodb://user:12345678@ds029456.mlab.com:29456/manageruser');
  //  mongodb://Demo:11111111@ds029456.mlab.com:29456/try
  return mongoose;
}
