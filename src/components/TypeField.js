import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Input, ListGroupItem, Button, UncontrolledTooltip } from 'reactstrap';
import HorizontalTypeCell from './HorizontalTypeCell';
import { BsFillTrashFill } from 'react-icons/bs';


function TypeField(props) {
    return (
        <ListGroupItem style={{ paddingLeft: '0%' }}>
            <Row>
                <Col sm={2} style={{ paddingLeft: '5%' }}><Button color="danger" onClick={props.onDelete}><BsFillTrashFill /></Button></Col>
                <Col sm={6} style={{ paddingRight: '1%' }}><Input value={props.typeName} onChange={props.onTypeNameChange} invalid={props.errorMessage.length > 0} id={"typeFieldId" + props.uniqueId} /></Col>
                <Col sm={1} style={{ paddingRight: 0, paddingLeft: '1%' }}><Input type="color" value={props.color} onChange={props.onColorChange} style={{ padding: '5%', cursor: 'pointer' }} /></Col>
                <Col sm={3} style={{ paddingLeft: '8%' }} ><HorizontalTypeCell type={props.typeName} color={props.color} /></Col>
            </Row>
            { props.errorMessage && props.errorMessage.length > 0 &&
                <UncontrolledTooltip placement="bottom" target={"typeFieldId" + props.uniqueId}>{props.errorMessage}</UncontrolledTooltip>
            }
        </ListGroupItem>
    );
}

TypeField.propTypes = {
    uniqueId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    typeName: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    errorMessage: PropTypes.string,
    onTypeNameChange: PropTypes.func,
    onColorChange: PropTypes.func,
    onDelete: PropTypes.func
};

export default TypeField;