import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardTitle, CardText, Label } from 'reactstrap';
import { exportComponentAsPNG } from 'react-component-export-image';
import { saveAs } from 'file-saver';


class ExportTypeChartModal extends React.Component {

    constructor() {
        super();
        this.state = {
            includeTypeCombos: false
        };
    }

    handleCheckboxChange(e) {
        const checked = e.target.checked;
        this.setState((state) => {
            state.includeTypeCombos = checked;
            return state;
        });
    }

    handleExportAsPNG() {
        exportComponentAsPNG(this.props.typeChartImageRef, {
            fileName: this.props.title.replaceAll(' ', '-'), html2CanvasOptions: {
                letterRendering: true, scale: 2, backgroundColor: 'azure', onclone: (clone) => {
                    clone.getElementById(this.props.watermarkId).style.visibility = "visible";
                }
            }
        });
    }

    handleExportAsJSON() {
        console.log('exporting as json');
        const exportData = {
            title: this.props.title,
            types: this.props.types,
            typeCombos: (this.state.includeTypeCombos ? this.props.typeCombos : []),
            note: "You can import this file to " + window.location.href + " to view its contents"
        }
        const blob = new Blob([JSON.stringify(exportData)], { type: "application/json;charset=utf-8" });
        saveAs(blob, this.props.title.replaceAll(' ', '-') + ".tych.json");
    }

    render() {
        return (
            <Modal isOpen={this.props.modalVisibility} backdrop="static" toggle={() => this.props.toggle()}>
                <ModalHeader toggle={() => this.props.toggle()}>
                    Export Type Chart
                    </ModalHeader>
                <ModalBody>
                    <Card body style={{ marginBottom: '2%' }}>
                        <CardTitle tag="h4">Export as PNG</CardTitle>
                        <CardText>Export as an image to store or share. Note that PNGs cannot be imported to edit in the future.</CardText>
                        <CardText />
                        <Button color="success" onClick={() => this.handleExportAsPNG()}>Export</Button>
                    </Card>
                    <Card body>
                        <CardTitle tag="h4">Export as JSON</CardTitle>
                        <CardText>Export as metadata to store for later use. This file can be imported in the future to view and edit from this site.</CardText>
                        <CardText><Input type="checkbox" id="check" onChange={(e) => this.handleCheckboxChange(e)} checked={this
                            .includeTypeCombos} style={{ marginLeft: 'inherit' }} /><Label for="check" style={{ marginLeft: '5%' }}>Include Type Combos</Label></CardText>
                        <Button color="success" onClick={() => this.handleExportAsJSON()}>Export</Button>
                    </Card>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={() => this.props.toggle()}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

ExportTypeChartModal.propTypes = {
    title: PropTypes.string.isRequired,
    types: PropTypes.objectOf(PropTypes.shape({
        color: PropTypes.string.isRequired,
        values: PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ])).isRequired
    })).isRequired,
    typeCombos: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        types: PropTypes.arrayOf(PropTypes.string).isRequired
    })).isRequired,
    typeChartImageRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({
            current: PropTypes.any
        })
    ]).isRequired,
    modalVisibility: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    watermarkId: PropTypes.string.isRequired
};

export default ExportTypeChartModal;