import React from 'react';
import { Input, Row, Col, ListGroupItem, Button, UncontrolledCollapse } from 'reactstrap';
import VerticalTypeCellMap from './VerticalTypeCellMap';
import TypeMultiplierCell from './TypeMultiplierCell';
import HorizontalTypeCell from './HorizontalTypeCell';
import { BsFillTrashFill } from 'react-icons/bs';
import { BiEditAlt } from 'react-icons/bi';


class TypeCombo extends React.Component {

    render() {
        const typeArr = Object.keys(this.props.typeLookup);
        console.log(this.props);
        return (
            <ListGroupItem>
                <Row>
                    <Col sm={11}>
                        <Row style={{ marginBottom: '1%' }}>
                            <Col sm={4} style={{ paddingLeft: 0, paddingRight: '1%' }}>
                                <Input type="text" value={this.props.typeCombo.name} onChange={this.props.onNameChange} />
                            </Col>
                            <Col sm={8}>
                                <Row>
                                    {this.props.typeCombo.types.map((type) => (<HorizontalTypeCell key={type} type={type} color={this.props.typeLookup[type].color} />))}
                                </Row>
                            </Col>
                        </Row>
                        <UncontrolledCollapse toggler={"#typeComboEdit" + this.props.uniqueId}>
                            <Row style={{ marginLeft: '5%', marginRight: '5%', marginBottom: '2%' }}>
                                {Object.keys(this.props.typeLookup).map((typeName) => (<HorizontalTypeCell type={typeName} color={this.props.typeLookup[typeName].color} onClick={() => this.props.onTypeClick(typeName)} opacity={this.props.typeCombo.types.includes(typeName) ? 0.25 : 1} hoverable />))}
                            </Row>
                        </UncontrolledCollapse>
                        <Row style={{ paddingTop: '40px' }}>
                            <table>
                                <thead>
                                    <tr>
                                        {typeArr.map((typeName, index) => VerticalTypeCellMap(this.props.typeLookup, typeName, index))}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {typeArr.map((typeName, index) => (<TypeMultiplierCell key={typeName} typeLookup={this.props.typeLookup} defendingTypeNames={this.props.typeCombo.types} attackIndex={index} edittable={false} />))}
                                    </tr>
                                </tbody>
                            </table>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Button color="danger" onClick={() => this.props.onDelete()}><BsFillTrashFill /></Button>
                            <Button color="info" id={"typeComboEdit" + this.props.uniqueId}><BiEditAlt /></Button>
                        </Row>
                    </Col>
                </Row>
            </ListGroupItem>
            );
    }
}

export default TypeCombo;