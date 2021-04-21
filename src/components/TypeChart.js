import React from 'react';
import { Input, Row, Col } from 'reactstrap';
import TypeCombo from './TypeCombo';
import VerticalTypeCellMap from './VerticalTypeCellMap';
import TypeMultiplierCell from './TypeMultiplierCell';
import HorizontalTypeCell from './HorizontalTypeCell';

class TypeChart extends React.Component {
    constructor() {
        super();
        this.state = {
            types: {
                'Rock': { color: '#F0F8FF', values: [1, 2, 0.5]},
                'Paper': { color: '#F5F5DC', values: [0.5, 1, 2] },
                'Scissors': { color: '#7FFFD4', values: [2, 0.5, 1] }
            },
            typeCombos: [
                {
                    name: 'Office',
                    types: [
                        'Paper',
                        'Scissors'
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

    handleNameChange(e, index) {
        const newName = e.target.value;

        this.setState((state) => {
            state.typeCombos[index].name = newName;
            return state;
        });
    }

    horizontalTypeMap(typesArr, typeName, index) {
        return (
            <tr key={typeName + index}>
                <td>
                    <HorizontalTypeCell type={typeName} color={this.state.types[typeName].color} rightAlign={true}/>
                </td>
                {typesArr.map((typeName, innerIndex) => (<TypeMultiplierCell typeLookup={this.state.types} defendingTypeNames={[typesArr[innerIndex]]} attackIndex={index} edittable={true} onChange={(e) => this.handleTypeMultiplierCellChange(e, typesArr[innerIndex], index)} />))}
            </tr>
            );
    }

    render() {
        const typesArr = Object.keys(this.state.types);

        return (
            <div class="container-fluid">
                <Row style={{ paddingTop: '40px'}}>
                    <Col sm={6}>
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
                    </Col>
                    <Col sm={6}>
                        <TypeCombo typeLookup={this.state.types} typeCombo={this.state.typeCombos[0]} onNameChange={(e) => this.handleNameChange(e, 0)} />
                    </Col>
                </Row>
            </div>
            );
    }
}

export default TypeChart;