import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup } from 'reactstrap';
import TypeField from './TypeField';
import { FaPlus } from 'react-icons/fa';

class EditTypesChartModal extends React.Component {

    constructor() {
        super();
        this.state = {
            editTitle: '',
            editTypes: []
        };
    }

    handleRefreshForm() {
        const editTitle = this.props.title;
        this.setState((state) => {
            state.editTitle = editTitle;
            state.editTypes = Object.keys(this.props.types).map((typeName) => {
                return {
                    oldName: typeName,
                    newName: typeName,
                    color: this.props.types[typeName].color,
                    errorMessage: ''
                }
            });
            return state;
        });
    }

    handleEditTitleNameChanged(e) {
        const newTitle = e.target.value;
        this.setState((state) => {
            state.editTitle = newTitle;
            return state;
        })
    }

    handleEditTypeNameChanged(e, index) {
        const newName = e.target.value;

        if (/^[a-zA-Z]/.test(newName) || newName.length <= 0) {
            this.setState((state) => {
                state.editTypes[index].newName = newName;
                return state;
            });
        }
    }

    handleEditTypeColorChanged(e, index) {
        const newColor = e.target.value;

        this.setState((state) => {
            state.editTypes[index].color = newColor;
            return state;
        });
    }

    handleEditTypeAdd() {
        const newEditTypes = this.state.editTypes.concat({
            oldName: '',
            newName: '',
            color: '#FFFFFF',
            errorMessage: ''
        });
        this.setState((state) => {
            state.editTypes = newEditTypes;
            return state;
        })
    }

    handleEditTypeDelete(index) {
        if (this.state.editTypes.length > 1) {
            const newEditTypes = this.state.editTypes.filter((_, i) => i !== index);
            this.setState((state) => {
                state.editTypes = newEditTypes;
                return state;
            });
        }
    }

    handleEditTypesSubmit() {
        // validation for blank or duplicate names
        const newEditTypes = [];
        let isValid = true;
        const uniqueNames = new Set();
        for (let i = 0; i < this.state.editTypes.length; ++i) {
            let errorMessage = '';
            if (this.state.editTypes[i].newName.length <= 0) {
                isValid = false;
                errorMessage = 'Name cannot be blank';
            } else if (uniqueNames.has(this.state.editTypes[i].newName)) {
                isValid = false;
                errorMessage = 'Type "' + this.state.editTypes[i].newName + '" already exists';
            } else {
                uniqueNames.add(this.state.editTypes[i].newName);
            }
            newEditTypes.push({
                oldName: this.state.editTypes[i].oldName,
                newName: this.state.editTypes[i].newName,
                color: this.state.editTypes[i].color,
                errorMessage: errorMessage
            })
        }
        if (!isValid) {
            this.setState((state) => {
                state.editTypes = newEditTypes;
                return state;
            });
        }
        else {
            this.props.onSubmit(this.state);
        }
    }

    render() {
        return (
            <Modal isOpen={this.props.modalVisibility} backdrop="static" toggle={() => this.props.toggle()} onOpened={() => this.handleRefreshForm()}>
                <ModalHeader toggle={() => this.props.toggle()}>
                    <Input id="title" type="text" onChange={(e) => this.handleEditTitleNameChanged(e)} value={this.state.editTitle} />
                </ModalHeader>
                <ModalBody>
                    <ListGroup flush>
                        {this.state.editTypes.map((editType, index) => (<TypeField key={index} uniqueId={index} typeName={editType.newName} color={editType.color} deletable={ this.state.editTypes.length > 2} errorMessage={editType.errorMessage} onTypeNameChange={(e) => this.handleEditTypeNameChanged(e, index)} onColorChange={(e) => this.handleEditTypeColorChanged(e, index)} onDelete={() => this.handleEditTypeDelete(index)} />))}
                    </ListGroup>
                    <Button color="success" block onClick={() => this.handleEditTypeAdd()} style={{ marginTop: '2%' }}><FaPlus /></Button>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={() => this.handleEditTypesSubmit()}>Save</Button>
                    <Button color="danger" onClick={() => this.props.toggle()}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

EditTypesChartModal.propTypes = {
    title: PropTypes.string.isRequired,
    types: PropTypes.objectOf(PropTypes.shape({
        color: PropTypes.string.isRequired,
        values: PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ])).isRequired
    })).isRequired,
    modalVisibility: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    toggle: PropTypes.func.isRequired
};

export default EditTypesChartModal;