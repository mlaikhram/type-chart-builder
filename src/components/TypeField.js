import React from 'react';
import { Row, Col, Input, ListGroupItem, Button, UncontrolledTooltip } from 'reactstrap';
import HorizontalTypeCell from './HorizontalTypeCell';
import { BsFillTrashFill } from 'react-icons/bs';


function TypeField(props) {
    return (
        <ListGroupItem style={{ paddingLeft: '0%' }}>
            <Row>
                <Col sm={1}><Button color="danger" onClick={props.onDelete}><BsFillTrashFill /></Button></Col>
                <Col sm={7} style={{ paddingLeft: '10%', paddingRight: '1%' }}><Input value={props.typeName} onChange={props.onTypeNameChange} invalid={props.errorMessage.length > 0} id={"typeFieldId" + props.uniqueId} /></Col>
                <Col sm={1} style={{ paddingRight: 0, paddingLeft: '1%' }}><Input type="color" value={props.color} onChange={props.onColorChange} style={{ padding: '5%', cursor: 'pointer' }} /></Col>
                <Col sm={3} style={{ paddingLeft: '8%' }} ><HorizontalTypeCell type={props.typeName} color={props.color} /></Col>
            </Row>
            { props.errorMessage && props.errorMessage.length > 0 &&
                <UncontrolledTooltip placement="bottom" target={"typeFieldId" + props.uniqueId}>{props.errorMessage}</UncontrolledTooltip>
            }
        </ListGroupItem>
    );
}

export default TypeField;