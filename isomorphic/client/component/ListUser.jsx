import React from 'react';
import {Button} from 'react-bootstrap';
import {Glyphicon} from 'react-bootstrap';
import Modals from './Modal.jsx';

class ListUser extends React.Component {
constructor(props) {
    super(props);
    this.state={
      modalIsOpen: false
    }
    this.handleDeleteButton = this.handleDeleteButton.bind(this);
    this.handleEditButton = this.handleEditButton.bind(this);
    this.handleFriendButton = this.handleFriendButton.bind(this);
 };

  handleDeleteButton(){
    console.log(this.props.data._id);
    this.props.deleteUser(this.props.data._id);
  }

  handleEditButton(){
    this.props.handleEditButton(this.props.indexUser);
  }

  handleFriendButton(){
    this.props.handleFriendButton(this.props.indexUser);
  }

  handleModalCloseRequest(){
    this.setState({modalIsOpen: false});
  }
  openModal(){
    this.setState({modalIsOpen: true});
  }
   render() {
      return (
      <div id="try">
           <ul id="listUser">
              <table>
                <tbody>
                  <tr >
                     <td id="imageUser"><img src={this.props.data.photo} width="180" height="190" alt="No image" /></td>
                     <td id="infor"><b> Id user: </b> {this.props.data._id} <br />
                     <b> First name: </b>{this.props.data.firstName} <br />
                     <b> Last Name: </b>{this.props.data.lastName} <br />
                  </td>
                  </tr>
                </tbody>

              </table>
              <Button id="spaceButton" onClick={this.handleDeleteButton} bsStyle="danger" bsSize="small"><Glyphicon glyph="remove"/> Delete</Button>
              <Button id="spaceButton" onClick={this.handleEditButton} bsStyle="warning" bsSize="small"><Glyphicon glyph="pencil"/> Edit </Button>
              <Button id="spaceButton" onClick={this.handleFriendButton} bsStyle="info" bsSize="small"><Glyphicon glyph="list"/> Friend </Button>
              <Modals openModal={this.openModal.bind(this)} handleModalCloseRequest={this.handleModalCloseRequest.bind(this)} modalIsOpen={this.state.modalIsOpen} />
           </ul>
      </div>
      );
   }
}

export default ListUser;
