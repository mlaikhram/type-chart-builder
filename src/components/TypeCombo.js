import React from 'react';
import PropTypes from 'prop-types';
import { Input, Row, Col, ListGroupItem, Button, Collapse, InputGroupAddon, InputGroup, UncontrolledTooltip } from 'reactstrap';
import VerticalTypeCellMap from './VerticalTypeCellMap';
import TypeMultiplierCell from './TypeMultiplierCell';
import HorizontalTypeCell from './HorizontalTypeCell';
import { BsFillTrashFill } from 'react-icons/bs';
import { FaUndo } from 'react-icons/fa';
import { BiEditAlt } from 'react-icons/bi';
import { RiShieldFill, RiSwordFill } from 'react-icons/ri'


class TypeCombo extends React.Component {

    constructor() {
        super();

        this.containerRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);

        this.state = { // TODO: state to track offense or defense analysis
            isEditting: false,
            name: '',
            types: []
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (this.state.isEditting && this.containerRef && !this.containerRef.current.contains(event.target)) {
            this.props.onEditted(this.state.name, this.state.types);
            this.setState((state) => {
                state.isEditting = false;
                return state;
            });
        }
    }

    handleToggleEdit(isCancelled = false) {
        const isEditting = !this.state.isEditting;
        if (!isEditting && !isCancelled) {
            this.props.onEditted(this.state.name, this.state.types);
        }
        this.setState((state) => {
            state.isEditting = isEditting;
            if (isEditting) {
                state.name = this.props.name;
                state.types = this.props.types;
            }
            return state;
        });
    }

    handleNameChange(e) {
        const newName = e.target.value;
        this.setState((state) => {
            state.name = newName;
            return state;
        });
    }

    handleTypeClick(typeName) {
        const newTypes = this.state.types.includes(typeName) ?
            this.state.types.filter((_) => _ !== typeName) :
            this.state.types.concat(typeName);

        this.setState((state) => {
            state.types = newTypes;
            return state;
        });
    }

    renderEditOrCancelButton() {
        if (this.state.isEditting) {
            return (
                <div>
                    <Button id={this.props.uniqueId + "deleteButton"} color="danger" onClick={() => this.handleToggleEdit(true)} style={{ margin: '2%', float: 'right', height: 'min-content' }}><FaUndo /></Button>
                    <UncontrolledTooltip target={this.props.uniqueId + "deleteButton"}>Undo</UncontrolledTooltip>
                </div>
            );
        }
        else {
            return (
                <div>
                    <Button id={this.props.uniqueId + "deleteButton"} color="danger" onClick={() => this.props.onDelete()} style={{ margin: '2%', float: 'right', height: 'min-content' }}><BsFillTrashFill /></Button>
                    <UncontrolledTooltip target={this.props.uniqueId + "deleteButton"}>Delete</UncontrolledTooltip>
                </div>
            );
        }
    }

    render() {
        const typeArr = Object.keys(this.props.typeLookup);
        return (
            <ListGroupItem style={{ padding: 0 }}>
                <div ref={this.containerRef} style={{ padding: '1%' }}>
                    <div style={{ paddingTop: '1%', paddingBottom: '1%', paddingLeft: '3%', paddingRight: '3%' }}>
                        <Row style={{ padding: 'inherit' }}>
                            <Col style={{ paddingTop: '1%', paddingRight: '15%' }}>
                                <Row style={{ marginBottom: '1%', paddingBottom: '2%' }}>
                                    <Col sm={5} style={{ paddingLeft: 0, paddingRight: '1%', paddingBottom: '1%', paddingTop: '0.3%' }}>
                                        <InputGroup>
                                            <Input type="text" value={this.state.isEditting ? this.state.name : this.props.name} onChange={(e) => this.handleNameChange(e)} disabled={!this.state.isEditting} />
                                            <InputGroupAddon addonType="append"><Button id={this.props.uniqueId + 'comboTypeButton'} color="secondary"><RiShieldFill /></Button></InputGroupAddon>
                                        </InputGroup>
                                        <UncontrolledTooltip target={this.props.uniqueId + 'comboTypeButton'}>Analysis based on damage recieved as this Type Combo</UncontrolledTooltip>
                                    </Col>
                                    <Col sm={7}>
                                        <Row>
                                            {(this.state.isEditting ? this.state.types : this.props.types).map((typeName) => (<HorizontalTypeCell key={typeName} type={typeName} color={this.props.typeLookup[typeName].color} onClick={() => this.handleTypeClick(typeName)} hoverable={this.state.isEditting} />))}
                                        </Row>
                                    </Col>
                                </Row>
                                <Collapse isOpen={this.state.isEditting}>
                                    <Row style={{ marginLeft: '5%', marginRight: '5%', marginBottom: '2%', paddingTop: '2%' }}>
                                        {Object.keys(this.props.typeLookup).map((typeName) => (<HorizontalTypeCell key={typeName} type={typeName} color={this.props.typeLookup[typeName].color} onClick={() => this.handleTypeClick(typeName)} opacity={this.state.types.includes(typeName) ? 0.25 : 1} hoverable={!this.state.types.includes(typeName)} />))}
                                    </Row>
                                </Collapse>
                                <Row style={{ paddingTop: '1%', paddingBottom: '3%' }}>
                                    <div style={{ paddingTop: '40px' }}>
                                        <table>
                                            <thead>
                                                <tr>
                                                    {typeArr.map((typeName, index) => VerticalTypeCellMap(this.props.typeLookup, typeName, index))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    {typeArr.map((typeName, index) => (<TypeMultiplierCell key={typeName} typeLookup={this.props.typeLookup} defendingTypeNames={this.state.isEditting ? this.state.types : this.props.types} attackIndex={index} edittable={false} />))}
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </Row>
                            </Col>
                            <div style={{ paddingTop: '1%', display: 'flex' }}>
                                <Button id={this.props.uniqueId + "editButton"} color="info" onClick={() => this.handleToggleEdit()} style={{ margin: '2%', float: 'right', height: 'min-content' }}><BiEditAlt /></Button>
                                <UncontrolledTooltip target={this.props.uniqueId + "editButton"}>Edit</UncontrolledTooltip>
                                {this.renderEditOrCancelButton()}
                            </div>
                        </Row>
                    </div>
                </div>
            </ListGroupItem>
            );
    }
}

TypeCombo.propTypes = {
    uniqueId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
    typeLookup: PropTypes.objectOf(PropTypes.shape({
        color: PropTypes.string.isRequired,
        values: PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ])).isRequired
    })).isRequired,
    onEditted: PropTypes.func,
    onDelete: PropTypes.func
};

export default TypeCombo;