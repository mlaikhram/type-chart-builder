import React from 'react';
import { View, Text } from 'react-native';

function DefendingTypeMap(typeLookup, typeName, index) {
    return (
        <th key={index}><div style={{ width: '40px', textAlign: 'left' }}><View style={{ height: '40px', width: '80px', paddingLeft: '5px', backgroundColor: typeLookup[typeName].color, borderRadius: 10, borderColor: '#CED4DA', borderWidth: 'thin', transform: [{ rotate: "270deg" }, { translateX: 20 }, { translateY: -20 }] }}><Text style={{ height: '40px', width: '80px', lineHeight: '40px', textAlign: 'left' }}>{typeName}</Text></View></div></th>
    );
}

export default DefendingTypeMap;