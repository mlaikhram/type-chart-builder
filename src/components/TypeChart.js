import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import VerticalTypeCellMap from './VerticalTypeCellMap';
import HorizontalTypeCell from './HorizontalTypeCell';
import TypeMultiplierCell from './TypeMultiplierCell';


class TypeChart extends React.Component {
    horizontalTypeMap(typesArr, typeName, index) {
        return (
            <tr key={typeName + index}>
                <td>
                    <HorizontalTypeCell type={typeName} color={this.props.types[typeName].color} rightAlign={true} />
                </td>
                {typesArr.map((typeName, innerIndex) => (<TypeMultiplierCell key={index + "_" + innerIndex} typeLookup={this.props.types} defendingTypeNames={[typesArr[innerIndex]]} attackIndex={index} edittable={true} onChange={(e) => this.props.onTypeMultiplierCellChange(e, typesArr[innerIndex], index)} />))}
            </tr>
        );  // TODO: replace with onBlur
    }

    render() {
        const typesArr = Object.keys(this.props.types);

        return (
            <div>
                <Text style={{ paddingLeft: '1%', paddingBottom: '10px', display: 'inherit', textAlign: 'center', width: 0, minWidth: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: 'x-large', fontWeight: 'bold', textShadow: '-1px 1px 2px #000, 1px 1px 2px #000, 1px -1px 2px #000, -1px -1px 2px #000', color: '#FFFFFF', transform: [{ translateX: -40 }] }}>{this.props.title}</Text>
                <div style={{ paddingLeft: '40px' }}>
                    <h6>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', textShadow: '-1px 1px 2px #000, 1px 1px 2px #000, 1px -1px 2px #000, -1px -1px 2px #000', color: '#FFFFFF', }}>
                            Defending Type
                        </Text>
                    </h6>
                    <View style={{ paddingTop: '40px', transform: [{ translateX: -40 }] }}>
                        <table>
                            <thead>
                                <tr>
                                    <td />
                                    {typesArr.map((typeName, index) => VerticalTypeCellMap(this.props.types, typeName, index))}
                                </tr>
                            </thead>
                            <tbody>
                                {typesArr.map((typeName, index) => this.horizontalTypeMap(typesArr, typeName, index))}
                            </tbody>
                        </table>
                    </View>
                </div>
            </div>
        );
    }
}

TypeChart.propTypes = {
    title: PropTypes.string.isRequired,
    types: PropTypes.objectOf(PropTypes.shape({
        color: PropTypes.string.isRequired,
        values: PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ])).isRequired
    })).isRequired,
    onTypeMultiplierCellChange: PropTypes.func.isRequired
}

export default TypeChart;