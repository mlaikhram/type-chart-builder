import React from 'react';
import { Row, Col, Button, Input, Card, CardTitle, CardText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { View, Text } from 'react-native';
import { exportComponentAsPNG } from 'react-component-export-image';
import TypeCombo from './TypeCombo';
import VerticalTypeCellMap from './VerticalTypeCellMap';
import TypeMultiplierCell from './TypeMultiplierCell';
import HorizontalTypeCell from './HorizontalTypeCell';
import EditTypesChartModal from './EditTypesChartModal';
import ExportTypeChartModal from './ExportTypeChartModal';
import { FaPlus } from 'react-icons/fa';
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
            title: 'Industry Type Chart',
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
            ],
            importFileError: '',
            importFile: null
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

    handleOpenImportModal() {
        this.setState((state) => {
            state.importFile = null;
            state.importFileError = '';
            return state;
        }, () => this.handleModalToggle('import'));
    }

    handleModalToggle(modalName) {
        const prev = this.state.modalVisibility[modalName];
        this.setState((state) => {
            state.modalVisibility[modalName] = !prev;
            return state;
        });
    }

    handleTypeComboAdd() {
        const newTypeCombos = [{
            name: '',
            types: []
        }].concat(this.state.typeCombos);
        this.setState((state) => {
            state.typeCombos = newTypeCombos;
            return state;
        })
    }

    handleTypeComboEditted(index, name, types) {
        this.setState((state) => {
            state.typeCombos[index].name = name;
            state.typeCombos[index].types = types;
            return state;
        });
    }

    handleTypeComboDelete(index) {
        const newTypeCombos = this.state.typeCombos.filter((_, i) => i !== index);
        this.setState((state) => {
            state.typeCombos = newTypeCombos;
            return state;
        });
    }

    handleImportFileUpload(e) {
        const file = e.target.files[0];
        this.setState((state) => {
            state.importFile = file;
            state.importFileError = "";
            return state;
        })
    }

    handleImportFromFile() {
        if (!this.state.importFile) {
            this.setState((state) => {
                state.importFileError = "You must upload a file to import!";
                return state;
            })
        }
        else {
            const file = this.state.importFile;
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const text = e.target.result;
                try {
                    // parse to JSON
                    const importedData = JSON.parse(text);
                    // check for title
                    if (!importedData.hasOwnProperty("title")) {
                        throw new Error('Missing or invalid title');
                    }
                    // check for types
                    else if (importedData.hasOwnProperty("types")) {
                        const typeNames = Object.keys(importedData.types);
                        typeNames.forEach((typeName) => {
                            // check for valid type name
                            if (!/^[a-zA-Z]/.test(typeName)) {
                                throw new Error('Invalid type: ' + typeName);
                            }
                            // check for valid object structure
                            else if (!(typeof importedData.types[typeName] === 'object' && importedData.types[typeName] !== null)) {
                                throw new Error('Invalid or missing type body: ' + typeName);
                            }
                            // check for valid color
                            else if (!importedData.types[typeName].hasOwnProperty("color") || !/^#[0-9A-Fa-f]{6}$/i.test(importedData.types[typeName].color)) {
                                throw new Error('Invalid or missing color');
                            }
                            // check for valid values
                            else if (!(importedData.types[typeName].hasOwnProperty("values") && Array.isArray(importedData.types[typeName].values) &&
                                importedData.types[typeName].values.length === typeNames.length &&
                                importedData.types[typeName].values.every((value) => !isNaN(value) && Number(value) >= 0))) {
                                throw new Error('Invalid or missing values');
                            }
                        });
                        // check for typeCombos
                        if (importedData.hasOwnProperty("typeCombos") && Array.isArray(importedData.typeCombos) &&
                            importedData.typeCombos.every((typeCombo) => typeof typeCombo === 'object' && typeCombo !== null &&
                                typeCombo.hasOwnProperty("name") &&
                                typeCombo.hasOwnProperty("types") && Array.isArray(typeCombo.types) && typeCombo.types.every((typeName) => typeNames.includes(typeName)))) {
                            // finally import data
                            this.setState((state) => {
                                state.title = importedData.title;
                                state.types = importedData.types;
                                state.typeCombos = importedData.typeCombos;
                                state.importFile = null;
                                state.importFileError = "";
                                state.modalVisibility.import = false;
                                return state;
                            });
                        }
                        else {
                            throw new Error('invalid or missing typeCombos');
                        }
                    }
                    else {
                        throw new Error('Missing types');
                    }
                }
                catch (e) {
                    console.log(e);
                    this.setState((state) => {
                        state.importFile = null;
                        state.importFileError = "Error parsing file: " + e.message;
                        return state;
                    })
                }
            }
            fileReader.onerror = (e) => {
                this.setState((state) => {
                    state.importFile = null;
                    state.importFileError = "Error reading file: " + fileReader.error;
                    return state;
                });
            }
            try {
                console.log('file');
                console.log(file);
                fileReader.readAsText(file, "UTF-8");
            }
            catch (e) {
                this.setState((state) => {
                    state.importFile = null;
                    state.importFileError = "An unexpected error occurred. Please try again.";
                    return state;
                });
            }
        }
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
                            <Button color="primary" onClick={() => this.handleOpenImportModal()}><AiOutlineImport /></Button>
                            <Button color="success" onClick={() => this.handleModalToggle('export')}><AiOutlineExport /></Button>
                        </Row>
                    </Col>
                    <Col>
                        <Button color="success" block onClick={() => this.handleTypeComboAdd()} style={{ marginBottom: '1%' }}><FaPlus /></Button>
                        <div className="list-group">
                            {this.state.typeCombos.map((typeCombo, index) => (<TypeCombo key={index} typeLookup={this.state.types} name={typeCombo.name} types={typeCombo.types} onEditted={(name, types) => this.handleTypeComboEditted(index, name, types)} onDelete={() => this.handleTypeComboDelete(index)} />))}
                        </div>
                    </Col>
                </Row>

                <EditTypesChartModal title={this.state.title} types={this.state.types} modalVisibility={this.state.modalVisibility.edit} toggle={() => this.handleModalToggle('edit')} onSubmit={(form) => this.handleEditTypesSubmit(form)} />

                {/*Import Type Chart Modal*/}
                <Modal isOpen={this.state.modalVisibility.import} backdrop="static" toggle={() => this.handleModalToggle('import')}>
                    <ModalHeader toggle={() => this.handleModalToggle('import')}>
                        Import Type Chart
                    </ModalHeader>
                    <ModalBody>
                        <Card body style={{ marginBottom: '2%' }}>
                            <CardTitle tag="h4">Import from Preset</CardTitle>
                            <CardText>Import a premade type chart to view and customize.</CardText>
                            <CardText />
                            <Button color="success" onClick={() => exportComponentAsPNG(this.typeChartImageRef, { fileName: this.state.title.replaceAll(' ', '-'), letterRendering: true, scale: 2 })}>Import</Button>
                        </Card>
                        <Card body>
                            <CardTitle tag="h4">Import from JSON</CardTitle>
                            <CardText>Import a previously created type chart from a JSON file.</CardText>
                            <CardText><Input type="file" accept=".tych.json" onChange={(e) => this.handleImportFileUpload(e)} /><span style={{ color: '#FF0000', display: 'inline-block' }}>{this.state.importFileError}</span></CardText>
                            <Button color="success" onClick={() => this.handleImportFromFile()}>Import</Button>
                        </Card>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => this.handleModalToggle('import')}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <ExportTypeChartModal title={this.state.title} types={this.state.types} typeCombos={this.state.typeCombos} typeChartImageRef={this.typeChartImageRef} modalVisibility={this.state.modalVisibility.export} toggle={() => this.handleModalToggle('export')} />
            </div>
        );
    }
}

export default TypeChart;