import React from 'react';
// import axios from 'axios';
import $ from 'jquery';
import List from './component/ListUser.jsx';
import ListFriend from './component/ListFriend.jsx';
import FormUser from './component/FormUser.jsx';
var RestAPI = 'http://localhost:3030';
class App extends React.Component {
    constructor() {
        super();

        this.state = {
            User: [],
            friends: []
        }


        this.deleteUser = this.deleteUser.bind(this);
        this.addUser = this.addUser.bind(this);
        this.handleEditButton = this.handleEditButton.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.handleFriendButton = this.handleFriendButton.bind(this);
        this.deleteFriendHandleprops = this.deleteFriendHandleprops.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    };

    componentDidMount() {
        this.loadData();
    }
    componentWillUnmount() {
        this.serverRequest.abort();
    }

    addUser(user) {
        // user._id = new Date().getTime();
        var myArray = this.state.User; // React
        this.serverRequest = $.post(RestAPI+"/user",
        {"firstName": user.firstName,
        "lastName": user.lastName,
        "photo": user.photo},
        function(result) {
          if (result.message == "success") {
            this.loadData();
          }
        }.bind(this)),
        function(err){
          alert("err"+err.status);
        }
        // myArray.push(user);//React
        // this.setState({User: myArray});//React
        //  window.location.reload();
    }

    loadData(){
      this.serverRequest = $.get(RestAPI+"/user", function(result) {
        console.log(result);
          this.setState({User: result, editUser: {}});
      }.bind(this));
    }


    deleteUser(_id) {
      //React
        // var users = this.state.User.filter(function(user) {
        //     return user._id !== _id;
        // });
        //data mongo
        this.serverRequest = $.ajax({
            url: RestAPI+"/user",
            type: 'DELETE',
            dataType: 'json',
            data: {
                "_id": _id,
            },
            success:function(result){
              console.log(result.message);
              if (result.message == "Sucess") {
                // window.location.reload();
                this.loadData();
              }
            }.bind(this),
            error:function(err){
              alert(err.status);
            }
        });
        // this.setState({User: users});
        //  window.location.reload();
    }
// update user coplete
    updateUser(user, indexUser) {
        // var users = this.state.User;// get list user
        // users[indexUser] = user;// get infor user from index user
          this.serverRequest = $.ajax({
          url: RestAPI+'/user',
          method: 'PUT',
          dataType: 'json',
          data: {
                  "firstName": user.firstName,
                  "lastName": user.lastName,
                  "photo": user.photo,
                  "_id": user._id
                },
          success: function(result){
            if (result.message == "Update sucess") {
              // window.location.reload();
              this.loadData();
            }
          }.bind(this),
          error: function(err){
            if (err.message == "Update user faild") {
              alert(err.status + "Not found");
            }
          }.bind(this)
        });
        // window.location.reload();
        // this.setState({User: users, editUser: {}});
    }

    handleEditButton(index) {
      //get editUser to set value for "user":use for update, delete, addfriend, delete friend
        this.setState({editUser: this.state.User[index], editUserIndex: index});
    }
//Show list friend of user
    handleFriendButton(index) {
      //index of user
      // Get aray friend
        var userFriend = this.state.User[index].friends;
        if(userFriend.length == 0){
          alert("Noone in your list friend");
        }else {
          var idUser = this.state.User[index]._id;// id user
          var arrayFriend = [];
          //loop arrayFriend user
          for (var i = 0; i < userFriend.length; i++) {
            // loop array user
              for (var j = 0; j < this.state.User.length; j++) {
                  if (userFriend[i] === this.state.User[j]._id) {
                      var nameFriend = {
                        // use idUser to delete friend from list friend by id user
                          "idUser": idUser,
                          "_idFriend": this.state.User[j]._id,
                          "firstName": this.state.User[j].firstName,
                          "lastName": this.state.User[j].lastName,
                      };
                  }
              }
              if (typeof(nameFriend) !== "undefined") {
                arrayFriend.push(nameFriend);
              }
          }
          if (arrayFriend.length <= 0) {
            alert("your friend not exit");
          }else {
              this.setState({friends: arrayFriend});
          }

        }
    }

    deleteFriendHandleprops(_idFriend, _id) {
        // var friendss = this.state.friends.filter(function(friend) {
        //       return friend._idFriend !== _idFriend;
        // });
          this.serverRequest = $.ajax({
            url: RestAPI+"/friend",
            type: 'DELETE',
            dataType: 'json',
            data: {
                "_id": _id,
                "idFriend": _idFriend
            },
            success: function(result){
              if (result.message == "Delete friend oke") {
                this.loadData();
              }
            },
            error:function(err){
              if (err.message == "Delete faild") {
                alert(err.status + " " +err.message);
              }
            }

        });
    }

    render() {
        return (
            <div>
                <FormUser addUser={this.addUser} updateUser={this.updateUser} user={this.state.editUser} indexUser={this.state.editUserIndex}></FormUser>
                {this.state.friends.map(function(friend, i) {
                    return (<ListFriend key={i} dataFriend={friend} idUserss={this.state.idUsers}  deleteFriendHandle={this.deleteFriendHandleprops} />)
                }, this)}
                {this.state.User.map(function(person, i) {
                    return (<List handleEditButton={this.handleEditButton} handleFriendButton={this.handleFriendButton} deleteUser={this.deleteUser} key={i} data={person} indexUser={i}/>)
                }, this)}

            </div>
        );
    }
}
export default App;
