import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { View, Text } from 'react-native';
import TypeComboList from './TypeComboList';
import VerticalTypeCellMap from './VerticalTypeCellMap';
import TypeMultiplierCell from './TypeMultiplierCell';
import HorizontalTypeCell from './HorizontalTypeCell';
import EditTypesChartModal from './EditTypesChartModal';
import ImportTypeChartModal from './ImportTypeChartModal';
import ExportTypeChartModal from './ExportTypeChartModal';
import { BiEditAlt } from 'react-icons/bi';
import { AiOutlineExport, AiOutlineImport } from 'react-icons/ai';


class TypeChart extends React.Component {
    constructor() {
        super();

        this.typeChartImageRef = React.createRef();

        this.state = {
            modalVisibility: {
                edit: false,
                import: false,
                export: false
            },
            title: 'Software Engineering',
            types: {
                'Human': { color: '#C77B3D', values: [2, 1, 2, 1, 2, 2]},
                'Bug': { color: '#86FF24', values: [2, 0.5, 1, 1, 1, 0.5] },
                'Tech': { color: '#B6CDC6', values: [0.5, 2, 2, 2, 0, 0] },
                'Coder': { color: '#00F010', values: [1, 2, 0.5, 0.5, 2, 0] },
                'Meeting': { color: '#E60000', values: [0.5, 0.5, 2, 0.5, 0.5, 1] },
                'Sleep': { color: '#3D3D3D', values: [0.5, 2, 1, 2, 0.5, 2] }
            },
            typeCombos: [
                {
                    name: 'Programmer',
                    types: [
                        'Human',
                        'Coder'
                    ]
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

    handleModalToggle(modalName) {
        const prev = this.state.modalVisibility[modalName];
        this.setState((state) => {
            state.modalVisibility[modalName] = !prev;
            return state;
        });
    }

    handleEditTypesSubmit(editTypesForm) {
        const newTitle = editTypesForm.editTitle;
        // construct type chart and fix any new type refs
        const newTypes = {};
        for (let defendIndex = 0; defendIndex < editTypesForm.editTypes.length; ++defendIndex) {
            newTypes[editTypesForm.editTypes[defendIndex].newName] = {
                color: editTypesForm.editTypes[defendIndex].color,
                values: []
            };
            for (let attackIndex = 0; attackIndex < editTypesForm.editTypes.length; ++attackIndex) {
                if (editTypesForm.editTypes[defendIndex].oldName.length <= 0 || editTypesForm.editTypes[attackIndex].oldName.length <= 0) {
                    newTypes[editTypesForm.editTypes[defendIndex].newName].values.push(1);
                }
                else {
                    const oldAttackIndex = Object.keys(this.state.types).indexOf(editTypesForm.editTypes[attackIndex].oldName);
                    newTypes[editTypesForm.editTypes[defendIndex].newName].values.push(this.state.types[editTypesForm.editTypes[defendIndex].oldName].values[oldAttackIndex]);
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
                const currentEditType = editTypesForm.editTypes.find((editType) => editType.oldName === oldType);
                if (currentEditType) {
                    typeCombo.types.push(currentEditType.newName);
                }
            });
            newTypeCombos.push(typeCombo);
        }
        this.setState((state) => {
            state.title = newTitle;
            state.types = newTypes;
            state.typeCombos = newTypeCombos;
            state.modalVisibility.edit = false;
            return state;
        });
    }

    handleTypeComboListChanged(typeCombos) {
        this.setState((state) => {
            state.typeCombos = typeCombos;
            return state;
        });
    }

    handleImport(title, types, typeCombos) {
        this.setState((state) => {
            state.title = title;
            state.types = types;
            state.typeCombos = typeCombos;
            state.modalVisibility.import = false;
            return state;
        });
    }

    render() {
        const typesArr = Object.keys(this.state.types);
        console.log(this.state);
        return (
            <div className="container-fluid">
                <Row style={{ paddingTop: '40px' }}>
                    <Col style={{ paddingLeft: '5%', paddingBottom: '5%' }}>
                        <Row>
                            <div ref={this.typeChartImageRef}>
                                <Text style={{ paddingLeft: '1%', paddingBottom: '10px', display: 'inherit', textAlign: 'center', width: 0, minWidth: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: 'x-large', fontWeight: 'bold', textShadow: '-1px 1px 2px #000, 1px 1px 2px #000, 1px -1px 2px #000, -1px -1px 2px #000', color: '#FFFFFF', transform: [{ translateX: -40 }] }}>{this.state.title}</Text>
                                <div style={{ paddingLeft: '40px' }}>
                                    <h6>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold', textShadow: '-1px 1px 2px #000, 1px 1px 2px #000, 1px -1px 2px #000, -1px -1px 2px #000', color: '#FFFFFF', }}>
                                            Defending Type
                                        </Text>
                                    </h6>
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
                            </div>
                        </Row>
                        <Row style={{ paddingTop: '2%' }}>
                            <Button color="info" onClick={() => this.handleModalToggle('edit')}><BiEditAlt /></Button>
                            <Button color="primary" onClick={() => this.handleModalToggle('import')}><AiOutlineImport /></Button>
                            <Button color="success" onClick={() => this.handleModalToggle('export')}><AiOutlineExport /></Button>
                        </Row>
                    </Col>
                    <Col>
                        <TypeComboList typeLookup={this.state.types} typeCombos={this.state.typeCombos} onSendChanges={(typeCombos) => this.handleTypeComboListChanged(typeCombos)} />
                    </Col>
                </Row>
                <EditTypesChartModal title={this.state.title} types={this.state.types} modalVisibility={this.state.modalVisibility.edit} toggle={() => this.handleModalToggle('edit')} onSubmit={(form) => this.handleEditTypesSubmit(form)} />
                <ImportTypeChartModal onImport={(title, types, typeCombos) => this.handleImport(title, types, typeCombos)} modalVisibility={this.state.modalVisibility.import} toggle={() => this.handleModalToggle('import')} />
                <ExportTypeChartModal title={this.state.title} types={this.state.types} typeCombos={this.state.typeCombos} typeChartImageRef={this.typeChartImageRef} modalVisibility={this.state.modalVisibility.export} toggle={() => this.handleModalToggle('export')} />
            </div>
        );
    }
}

export default TypeChart;