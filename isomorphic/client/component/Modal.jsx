import React from 'react';
import ReactDom from 'react-dom';
var Modal = require('react-modal');
import {Button} from 'react-bootstrap';
import {Glyphicon} from 'react-bootstrap';

class Modals extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // modalIsOpen: this.props.modalIsOpen
        }

        this.handleModalCloseRequest = this.handleModalCloseRequest.bind(this);
    };
    handleModalCloseRequest() {
        this.props.handleModalCloseRequest();
    }
    openModal() {
        this.props.openModal();
    }
    render() {
        return (
            <div>
              <div>
                  <Button type="button" id="spaceButton" bsStyle="danger" bsSize="small" onClick={this.openModal.bind(this)}>Add Friend</Button>
              </div>

                <Modal className="Modal__Bootstrap modal-dialog" closeTimeoutMS={150} isOpen={this.props.modalIsOpen} onRequestClose={this.handleModalCloseRequest}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <Button type="button" className="close" onClick={this.handleModalCloseRequest}>
                                <span aria-hidden="true" className="fa fa-remove faRemove"></span>
                                <span className="sr-only">Close</span>
                            </Button>
                            <h4 className="modal-title textLogin">List users</h4>
                        </div>
                        <div className="modal-body ">
                            <div className="conten_center">
                                <p>dsakjdajdkjkajdk</p>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}
export default Modals;
