import 'App.css';
import React from 'react';
import { Row, Col, Button, Collapse, Navbar, NavbarBrand, Nav, NavItem, NavLink, NavbarText, Modal, ModalBody } from 'reactstrap';
import { View } from 'react-native';
import TypeChart from 'components/TypeChart';
import TypeComboList from 'components/TypeComboList';
import EditTypesChartModal from 'components/EditTypesChartModal';
import ImportTypeChartModal from 'components/ImportTypeChartModal';
import ExportTypeChartModal from 'components/ExportTypeChartModal';
import { BiEditAlt } from 'react-icons/bi';
import { AiOutlineExport, AiOutlineImport } from 'react-icons/ai';

class App extends React.Component {
    constructor() {
        super();

        if (window.location.href.includes('?')) {
            window.location.href = window.location.href.substring(0, window.location.href.indexOf('?'));
        }

        this.typeChartImageRef = React.createRef();
        this.watermarkId = "TypeChartWatermark";

        this.state = {
            modalVisibility: {
                edit: false,
                import: false,
                export: false,
                info: false
            },
            title: 'Software Engineering',
            types: {
                'Human': { color: '#C77B3D', values: [2, 1, 2, 1, 2, 2] },
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
        return (
            <div className="App">
                <Navbar color="dark" dark expand="md">
                    <NavbarBrand>TypeCharts</NavbarBrand>
                    <Collapse navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink onClick={() => this.handleModalToggle('info')} style={{ cursor: 'pointer' }}>Info</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://github.com/mlaikhram/type-chart-builder" target="_blank">GitHub</NavLink>
                            </NavItem>
                        </Nav>
                        <NavbarText>Made by Matthew Laikhram</NavbarText>
                    </Collapse>
                </Navbar>
                <div className="container-fluid">
                    <Row style={{ paddingTop: '40px' }}>
                        <Col style={{ paddingLeft: '3%', paddingBottom: '5%' }}>
                            <Row>
                                <TypeChart ref={this.typeChartImageRef} title={this.state.title} types={this.state.types} onTypeMultiplierCellChange={(e, typeName, attackIndex) => this.handleTypeMultiplierCellChange(e, typeName, attackIndex)} watermarkId={this.watermarkId} />
                            </Row>
                            <View style={{ display: 'inherit', transform: [{translateY: '-40px'}] }}>
                                <Row style={{ paddingLeft: '75px' }}>
                                    <Button color="info" onClick={() => this.handleModalToggle('edit')}><BiEditAlt /></Button>
                                    <Button color="primary" onClick={() => this.handleModalToggle('import')}><AiOutlineImport /></Button>
                                    <Button color="success" onClick={() => this.handleModalToggle('export')}><AiOutlineExport /></Button>
                                </Row>
                            </View>
                        </Col>
                        <Col>
                            <TypeComboList typeLookup={this.state.types} typeCombos={this.state.typeCombos} onSendChanges={(typeCombos) => this.handleTypeComboListChanged(typeCombos)} />
                        </Col>
                    </Row>
                    <EditTypesChartModal title={this.state.title} types={this.state.types} modalVisibility={this.state.modalVisibility.edit} toggle={() => this.handleModalToggle('edit')} onSubmit={(form) => this.handleEditTypesSubmit(form)} />
                    <ImportTypeChartModal onImport={(title, types, typeCombos) => this.handleImport(title, types, typeCombos)} modalVisibility={this.state.modalVisibility.import} toggle={() => this.handleModalToggle('import')} />
                    <ExportTypeChartModal title={this.state.title} types={this.state.types} typeCombos={this.state.typeCombos} typeChartImageRef={this.typeChartImageRef} modalVisibility={this.state.modalVisibility.export} toggle={() => this.handleModalToggle('export')} watermarkId={this.watermarkId} />
                    <Modal isOpen={this.state.modalVisibility.info} toggle={() => this.handleModalToggle('info')}>
                        <ModalBody>
                            <h5>What is TypeCharts?</h5>
                            <p>
                                Typecharts is a sandbox for gamers and designers to experiment with Type Charts 
                                and type combinations either for existing games or for the purpose of building 
                                a game that utilizes the Type Chart as a combat mechanic.
                            </p>
                            <h5>What can I do in TypeCharts?</h5>
                            <p>
                                TypeCharts allows you to customize your Type Chart by editting the values directly 
                                in each cell and by using the various options listed below:
                            </p>
                            <ul>
                                <li>
                                    <BiEditAlt />Edit: Modify the title and types displayed in the Type Chart
                                </li>
                                <li>
                                    <AiOutlineImport />Import: Load an existing Type Chart from one of the presets
                                    available, or from a previously exported file
                                </li>
                                <li>
                                    <AiOutlineExport />Export: Save your Type Chart as an image or as a tych.json
                                    file, which can be re-imported for later use
                                </li>
                            </ul>
                            <p>
                                With TypeCharts, you can also test out your creation by adding Type Combos using
                                the <b>New Type Combo</b> button. Each Type Combo allows you to add a name and one 
                                or more types, which it will then use to calculate your combo's stats. This can help 
                                you determine which type combos are best for your strategy, or in a designer's case 
                                it could help determine if your type chart needs tweaking based on under/overtuned 
                                combinations.
                            </p>
                            <h5>Upcoming Features</h5>
                            <p>
                                While TypeCharts is currently geared toward defensive typing analysis, there are 
                                plans to implement a feature for analysing offensive type combinations as well. 
                                Look out for more updates on that!
                            </p>
                            <p>
                                There are also various QoL updates being looked into, including a visual indicator to 
                                help more quickly determine which two types intersect with the Type Chart cell you are 
                                currently hovering over.
                            </p>
                        </ModalBody>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default App;
