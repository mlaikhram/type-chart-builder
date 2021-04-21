import React from 'react';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup } from 'reactstrap';
import { View, Text } from 'react-native';
import { exportComponentAsPNG } from 'react-component-export-image';
import TypeCombo from './TypeCombo';
import VerticalTypeCellMap from './VerticalTypeCellMap';
import TypeMultiplierCell from './TypeMultiplierCell';
import HorizontalTypeCell from './HorizontalTypeCell';
import TypeField from './TypeField';

class TypeChart extends React.Component {
    constructor() {
        super();

        this.typeChartImageRef = React.createRef();

        this.state = {
            modalVisibility: {
                edit: false
            },
            types: {
                'Rock': { color: '#F0F8FF', values: [1, 2, 0.5]},
                'Paper': { color: '#F5F5DC', values: [0.5, 1, 2] },
                'Scissors': { color: '#7FFFD4', values: [2, 0.5, 1] }
            },
            typeCombos: [
                {
                    name: 'Office',
                    types: [
                        'Paper',
                        'Scissors'
                    ]
                }
            ],
            editTypes: [
                {
                    oldName: '',
                    newName: '',
                    color: '',
                    errorMessage: ''
                }
            ]
        }
    }

    handleTypeMultiplierCellChange(e, typeName, attackIndex) {
        const newValue = e.target.value;

        this.setState((state) => {
            state.types[typeName].values[attackIndex] = newValue;
            return state;
        });
    }

    handleNameChange(e, index) {
        const newName = e.target.value;

        this.setState((state) => {
            state.typeCombos[index].name = newName;
            return state;
        });
    }

    horizontalTypeMap(typesArr, typeName, index) {
        return (
            <tr key={typeName + index}>
                <td>
                    <HorizontalTypeCell type={typeName} color={this.state.types[typeName].color} rightAlign={true}/>
                </td>
                {typesArr.map((typeName, innerIndex) => (<TypeMultiplierCell key={index + "_" + innerIndex} typeLookup={this.state.types} defendingTypeNames={[typesArr[innerIndex]]} attackIndex={index} edittable={true} onChange={(e) => this.handleTypeMultiplierCellChange(e, typesArr[innerIndex], index)} />))}
            </tr>
            );
    }

    handleEditTypeNameChanged(e, index) {
        const newName = e.target.value;

        this.setState((state) => {
            state.editTypes[index].newName = newName;
            return state;
        });
    }

    handleEditTypeColorChanged(e, index) {
        const newColor = e.target.value;

        this.setState((state) => {
            state.editTypes[index].color = newColor;
            return state;
        });
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
            // construct type chart and fix any new type refs
            const newTypes = {};
            for (let defendIndex = 0; defendIndex < this.state.editTypes.length; ++defendIndex) {
                newTypes[this.state.editTypes[defendIndex].newName] = {
                    color: this.state.editTypes[defendIndex].color,
                    values: []
                };
                for (let attackIndex = 0; attackIndex < this.state.editTypes.length; ++attackIndex) {
                    if (this.state.editTypes[defendIndex].oldName.length <= 0 || this.state.editTypes[attackIndex].oldName.length <= 0) {
                        newTypes[this.state.editTypes[defendIndex].newName].values.push(1);
                    }
                    else {
                        const oldAttackIndex = Object.keys(this.state.types).indexOf(this.state.editTypes[attackIndex].oldName);
                        newTypes[this.state.editTypes[defendIndex].newName].values.push(this.state.types[this.state.editTypes[defendIndex].oldName].values[oldAttackIndex]);
                    }
                }
            }
            // update refs for type combos, and remove refs to deleted types
            const newTypeCombos = [];
            for (let i = 0; i < this.state.typeCombos.length; ++i) {
                const typeCombo = {
                    name: this.state.typeCombos[i].name,
                    types: []
                };
                this.state.typeCombos[i].types.forEach((oldType) => {
                    const currentEditType = this.state.editTypes.find((editType) => editType.oldName === oldType);
                    if (currentEditType) {
                        typeCombo.types.push(currentEditType.newName);
                    }
                });
                newTypeCombos.push(typeCombo);
            }
            this.setState((state) => {
                state.types = newTypes;
                state.typeCombos = newTypeCombos;
                state.modalVisibility.edit = false;
                return state;
            });
        }
    }

    handleOpenEditModal() {
        this.setState((state) => {
            state.editTypes = Object.keys(this.state.types).map((typeName) => {
                return {
                    oldName: typeName,
                    newName: typeName,
                    color: this.state.types[typeName].color,
                    errorMessage: ''
                }
            });
            return state;
        }, () => this.handleModalToggle('edit'));
    }

    handleModalToggle(modalName) {
        const prev = this.state.modalVisibility[modalName];
        this.setState((state) => {
            state.modalVisibility[modalName] = !prev;
            return state;
        });
    }

    render() {
        const typesArr = Object.keys(this.state.types);
        return (
            <div className="container-fluid">
                <Row style={{ paddingTop: '40px' }}>
                    <Col style={{ paddingLeft: '5%', paddingBottom: '5%' }}>
                        <Row>
                            <div ref={this.typeChartImageRef} style={{ paddingLeft: '40px' }}>
                                <h4>
                                    <Text style={{ fontSize: 20 }}>
                                            Defending Type
                                    </Text>
                                </h4>
                                <View style={{ paddingTop: '40px', transform: [{ translateX: -40 }] }}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <td />
                                                {typesArr.map((typeName, index) => VerticalTypeCellMap(this.state.types, typeName, index))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {typesArr.map((typeName, index) => this.horizontalTypeMap(typesArr, typeName, index))}
                                        </tbody>
                                    </table>
                                </View>
                            </div>
                        </Row>
                        <Row style={{ paddingTop: '2%' }}>
                            <Button color="info" size='sm' onClick={() => this.handleOpenEditModal()}>Edit</Button>
                            <Button color="success" size='sm' onClick={() => exportComponentAsPNG(this.typeChartImageRef, {fileName: 'typeChart'})}>Export</Button>
                        </Row>
                    </Col>
                    <Col>
                        <TypeCombo typeLookup={this.state.types} typeCombo={this.state.typeCombos[0]} onNameChange={(e) => this.handleNameChange(e, 0)} />
                    </Col>
                </Row>
                <Modal isOpen={this.state.modalVisibility.edit} backdrop="static" toggle={() => this.handleModalToggle('edit')}>
                    <ModalHeader toggle={() => this.handleModalToggle('edit')}>Edit Type Chart</ModalHeader>
                    <ModalBody>
                        <ListGroup>
                            {this.state.editTypes.map((editType, index) => (<TypeField key={index} uniqueId={"editType" + index} typeName={editType.newName} color={editType.color} errorMessage={editType.errorMessage} onTypeNameChange={(e) => this.handleEditTypeNameChanged(e, index)} onColorChange={(e) => this.handleEditTypeColorChanged(e, index)} onDelete={() => this.handleEditTypeDelete(index)} />))}
                        </ListGroup>
                        <Button color="success" block onClick={() => this.handleEditTypeAdd()} style={{ marginTop: '2%' }}>+</Button>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={() => this.handleEditTypesSubmit()}>Save</Button>
                        <Button color="danger" onClick={() => this.handleModalToggle('edit')}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
            );
    }
}

export default TypeChart;