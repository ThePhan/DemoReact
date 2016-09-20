import React from 'react';
import ReactDom from 'react-dom';
var Modal = require('react-modal');

class Modals extends React.Componenr {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
      <Modal
          className = "Modal__Bootstrap modal-dialog"
          closeTimeoutMS = {150  }
          isOpen = {this.state.modalIsOpen}
          onRequestClose = {this.handleModalCloseRequest}
        >
         <div className="modal-content">
            <div className="modal-header">
                <button type="button" className="close" onClick={this.handleModalCloseRequest}>
                    <span aria-hidden="true" className="fa fa-remove faRemove"></span>
                    <span className="sr-only">Close</span>
                </button>
                <h4 className="modal-title textLogin">Login</h4>
            </div>
            <div className="modal-body ">
                <div className="conten_center">
                    <div className="input-group input-group-lg txt_height">
                        <span className="input-group-addon backgroundAdon">
                            <i className="fa fa-diamond icon_color"></i>
                        </span>
                        <input type="number" className="form-control" ref="idStudent" placeholder="Enter code student..."/>
                    </div>
                    <div className="input-group input-group-lg txt_height">
                        <span className="input-group-addon backgroundAdon">
                            <i className="fa fa-unlock-alt icon_color"></i>
                        </span>
                        <input type="password" className="form-control" ref="passwordStudent" placeholder="Enter password..."/>
                    </div>
                    <div id="ErrLogin">
                        <p >
                            {this.state.notFound}</p>
                    </div>
                    <button type="button" className="btn btsubmit" onClick={this.checkLogin}>
                        Submit</button>
                    <button type="button" className="btn btn-default btsubmit" onClick={this.handleModalCloseRequest}>Close</button>
                </div>
            </div>

        </div>
        </Modal>
    }
}
