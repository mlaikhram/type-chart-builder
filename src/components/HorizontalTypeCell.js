import React from 'react';
import { View, Text } from 'react-native';

class HorizontalTypeCell extends React.Component {

    constructor() {
        super();

        this.state = {
            hovering: false
        }
    }

    handleOnMouseHover(hovering) {
        if (this.props.hoverable) {
            this.setState((state) => {
                state.hovering = hovering;
                return state;
            });
        }
    }

    render() {
        return (
            <View key={this.props.type} onClick={this.props.onClick} onMouseEnter={() => this.handleOnMouseHover(true)} onMouseLeave={() => this.handleOnMouseHover(false)} style={{ height: '40px', width: '80px', paddingLeft: '5px', backgroundColor: this.props.color, opacity: (this.props.opacity ? this.props.opacity : 1), borderRadius: 10, borderColor: '#CED4DA', borderWidth: 'thin', transform: [{ translateY: (this.state.hovering ? -2 : 0) }], cursor: (this.props.hoverable ? 'pointer' : '') }}><Text style={{ height: '40px', width: '70px', lineHeight: '40px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: this.props.rightAlign ? 'right' : 'left' }}>{this.props.type}</Text></View>
        );
    }
}

export default HorizontalTypeCell;