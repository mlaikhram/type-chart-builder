import React from 'react';
import { View, Text } from 'react-native';

function HorizontalTypeCell(props) {
    return (
        <View key={props.type} style={{ height: '40px', width: '80px', paddingLeft: '5px', backgroundColor: props.color, borderRadius: 10, borderColor: '#CED4DA', borderWidth: 'thin' }}><Text style={{ height: '40px', width: '70px', lineHeight: '40px', textAlign: props.rightAlign ? 'right' : 'left' }}>{props.type}</Text></View>
    );
}

export default HorizontalTypeCell;