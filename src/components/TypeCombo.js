import React from 'react';
import PropTypes from 'prop-types';
import { Input, Row, Col, ListGroupItem, Button, Collapse } from 'reactstrap';
import VerticalTypeCellMap from './VerticalTypeCellMap';
import TypeMultiplierCell from './TypeMultiplierCell';
import HorizontalTypeCell from './HorizontalTypeCell';
import { BsFillTrashFill } from 'react-icons/bs';
import { BiEditAlt } from 'react-icons/bi';


class TypeCombo extends React.Component {

    constructor() {
        super();

        this.containerRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);

        this.state = {
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
            this.setState((state) => {
                state.isEditting = false;
                return state;
            });
        }
    }

    handleToggleEdit() {
        const isEditting = !this.state.isEditting; // TODO: update to match props
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

    render() {
        const typeArr = Object.keys(this.props.typeLookup);
        return (
            <ListGroupItem style={{ padding: 0 }}>
                <div ref={this.containerRef} style={{ paddingTop: '2%', paddingBottom: '2%', paddingLeft: '4%', paddingRight: '3%' }}>
                    <Row>
                        <Col sm={11}>
                            <Row style={{ marginBottom: '1%' }}>
                                <Col sm={4} style={{ paddingLeft: 0, paddingRight: '1%' }}>
                                    {/*<Textfit mode="single" forceSingleModeWidth={false} style={{ fontWeight: 'bold', textShadow: '-1px 1px 2px #000, 1px 1px 2px #000, 1px -1px 2px #000, -1px -1px 2px #000', color: '#FFFFFF' }}>{this.props.name}</Textfit>*/}
                                    <Input type="text" value={this.state.isEditting ? this.state.name : this.props.name} onChange={(e) => this.handleNameChange(e)} disabled={!this.state.isEditting} />
                                </Col>
                                <Col sm={8}>
                                    <Row>
                                        {(this.state.isEditting ? this.state.types : this.props.types).map((typeName) => (<HorizontalTypeCell key={typeName} type={typeName} color={this.props.typeLookup[typeName].color} onClick={() => this.handleTypeClick(typeName)} hoverable={this.state.isEditting} />))}
                                    </Row>
                                </Col>
                            </Row>
                            <Collapse isOpen={this.state.isEditting} onExiting={() => this.props.onEditted(this.state.name, this.state.types)}>
                                <Row style={{ marginLeft: '5%', marginRight: '5%', marginBottom: '2%' }}>
                                    {Object.keys(this.props.typeLookup).map((typeName) => (<HorizontalTypeCell key={typeName} type={typeName} color={this.props.typeLookup[typeName].color} onClick={() => this.handleTypeClick(typeName)} opacity={this.state.types.includes(typeName) ? 0.25 : 1} hoverable={!this.state.types.includes(typeName)} />))}
                                </Row>
                            </Collapse>
                            <Row style={{ paddingTop: '40px' }}>
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
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <Button color="danger" onClick={() => this.props.onDelete()}><BsFillTrashFill /></Button>
                                <Button color="info" onClick={() => this.handleToggleEdit()}><BiEditAlt /></Button>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </ListGroupItem>
            );
    }
}

TypeCombo.propTypes = {
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