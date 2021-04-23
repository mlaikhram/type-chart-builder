import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardTitle, CardText } from 'reactstrap';


class ImportTypeChartModal extends React.Component {

    constructor() {
        super();

        this.importFile = null;

        this.state = {
            importFileError: ''
        };
    }

    handleRefreshForm() {
        this.importFile = null;
        this.setState((state) => {
            state.importFileError = '';
            return state;
        });
    }

    handleFileUpload(e) {
        this.importFile = e.target.files[0];
        this.setState((state) => {
            state.importFileError = "";
            return state;
        })
    }

    handleImportFromFile() {
        if (!this.importFile) {
            this.setState((state) => {
                state.importFileError = "You must upload a file to import!";
                return state;
            })
        }
        else {
            const file = this.importFile;
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
                            this.props.onImport(importedData.title, importedData.types, importedData.typeCombos);
                            this.importFile = null;
                            this.setState((state) => {
                                state.importFileError = "";
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
                    this.importFile = null;
                    this.setState((state) => {
                        state.importFileError = "Error parsing file: " + e.message;
                        return state;
                    })
                }
            }
            fileReader.onerror = (e) => {
                this.importFile = null;
                this.setState((state) => {
                    state.importFileError = "Error reading file: " + fileReader.error;
                    return state;
                });
            }
            try {
                fileReader.readAsText(file, "UTF-8");
            }
            catch (e) {
                this.importFile = null;
                this.setState((state) => {
                    state.importFileError = "An unexpected error occurred. Please try again.";
                    return state;
                });
            }
        }
    }

    render() {
        return (
            <Modal isOpen={this.props.modalVisibility} backdrop="static" toggle={() => this.props.toggle()} onOpened={() => this.handleRefreshForm()}>
                <ModalHeader toggle={() => this.props.toggle()}>
                    Import Type Chart
                    </ModalHeader>
                <ModalBody>
                    <Card body style={{ marginBottom: '2%' }}>
                        <CardTitle tag="h4">Import from Preset</CardTitle>
                        <CardText>Import a premade type chart to view and customize.</CardText>
                        <CardText />
                        <Button color="success" onClick={() => this.props.toggle()}>Import</Button>
                    </Card>
                    <Card body>
                        <CardTitle tag="h4">Import from JSON</CardTitle>
                        <CardText>Import a previously created type chart from a JSON file.</CardText>
                        <CardText><Input type="file" accept=".tych.json" onChange={(e) => this.handleFileUpload(e)} /><span style={{ color: '#FF0000', display: 'inline-block' }}>{this.state.importFileError}</span></CardText>
                        <Button color="success" onClick={() => this.handleImportFromFile()}>Import</Button>
                    </Card>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={() => this.props.toggle()}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

ImportTypeChartModal.propTypes = {
    onImport: PropTypes.func.isRequired,
    modalVisibility: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired
}

export default ImportTypeChartModal;