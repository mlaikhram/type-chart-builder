import React from 'react';
import PropTypes from 'prop-types';
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

    handleOnMouseClick() {
        if (this.props.hoverable) {
            this.props.onClick();
        }
    }

    render() {
        return (
            <View key={this.props.type} onClick={() => this.handleOnMouseClick()} onMouseEnter={() => this.handleOnMouseHover(true)} onMouseLeave={() => this.handleOnMouseHover(false)} style={{ height: '40px', width: '80px', paddingLeft: '5px', backgroundColor: this.props.color, opacity: (this.props.opacity ? this.props.opacity : 1), borderRadius: 10, borderColor: '#CED4DA', borderWidth: 'thin', transform: [{ translateY: (this.state.hovering ? -2 : 0) }], cursor: (this.props.hoverable ? 'pointer' : '') }}><Text style={{ height: '40px', width: '70px', lineHeight: '40px', fontWeight: 'bold', textShadow: '-1px 1px 2px #000, 1px 1px 2px #000, 1px -1px 2px #000, -1px -1px 2px #000', color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: this.props.rightAlign ? 'right' : 'left', paddingLeft: '2px', paddingRight: '2px' }}>{this.props.type}</Text></View>
        );
    }
}

HorizontalTypeCell.propTypes = {
    type: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    opacity: PropTypes.number,
    rightAlign: PropTypes.bool,
    hoverable: PropTypes.bool,
    onClick: PropTypes.func
};

export default HorizontalTypeCell;