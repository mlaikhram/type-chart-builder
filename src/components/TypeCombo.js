import React from 'react';
import { Input, Row, Col } from 'reactstrap';
import VerticalTypeCellMap from './VerticalTypeCellMap';
import TypeMultiplierCell from './TypeMultiplierCell';
import HorizontalTypeCell from './HorizontalTypeCell';

class TypeCombo extends React.Component {

    render() {
        const typeArr = Object.keys(this.props.typeLookup);

        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            {typeArr.map((typeName, index) => VerticalTypeCellMap(this.props.typeLookup, typeName, index))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {typeArr.map((typeName, index) => (<TypeMultiplierCell typeLookup={this.props.typeLookup} defendingTypeNames={this.props.typeCombo.types} attackIndex={index} edittable={false} />))}
                        </tr>
                    </tbody>
                </table>
                <Row>
                    <Col sm={4}>
                        <Input type="text" maxLength="20" value={this.props.typeCombo.name} onChange={this.props.onNameChange} />
                    </Col>
                    <Col sm={8}>
                        <Row>
                            {this.props.typeCombo.types.map((type) => (<HorizontalTypeCell type={type} color={this.props.typeLookup[type].color} />))}
                        </Row>
                     </Col>
                </Row>
            </div>
            );
    }
}

export default TypeCombo;