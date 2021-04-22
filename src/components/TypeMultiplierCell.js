import React from 'react';
import { Input } from 'reactstrap';
import { View, Text } from 'react-native';


class TypeMultiplierCell extends React.Component {

    constructor() {
        super();

        this.state = {
            hovering: false,
            editting: false,
            editValue: 1
        };
    }

    handleOnMouseHover(hovering) {
        this.setState((state) => {
            state.hovering = hovering;
            return state;
        });
    }

    handleOnClick(multiplierValue) {
        if (this.props.edittable) {
            this.setState((state) => {
                state.editting = true;
                state.editValue = multiplierValue;
                return state;
            });
        }
    }

    handleOnValueChange(e) {
        const newValue = e.target.value;
        const valueString = newValue.toString();
        if (!valueString.includes('-') && newValue >= 0 && newValue < 100 && (!valueString.includes('.') || valueString.split('.')[1].length <= 2)) {
            this.setState((state) => {
                state.editValue = newValue;
                return state;
            });
            this.props.onChange(e);
        }
    }

    handleOnBlur() {
        this.setState((state) => {
            state.editting = false;
            return state;
        });
    }

    handleKeyPress(e) {
        // check for enter key press
        if (e.keyCode === 13) {
            e.target.blur();
        }
    }

    render() {
        if (this.props.edittable && this.state.editting) {
            return (
                <td><View style={{ height: '40px', width: '40px' }}><Input type='number' min={0} max={99} precision={2} autoFocus onBlur={() => this.handleOnBlur()} onKeyDown={(e) => this.handleKeyPress(e)} onMouseEnter={() => this.handleOnMouseHover(true)} onMouseLeave={() => this.handleOnMouseHover(false)} style={{ height: '40px', width: '40px', lineHeight: '40px', textAlign: 'center', paddingLeft: '0', paddingRight: '0' }} value={this.state.editValue} onChange={(e) => this.handleOnValueChange(e)} /></View></td>
            );
        }
        else { // TODO: background color on log2 scale
            const multiplierValue = this.props.defendingTypeNames.map((type) => this.props.typeLookup[type].values[this.props.attackIndex]).reduce((acc, currentVal) => acc * currentVal, 1);
            return (
                <td><View style={{ height: '40px', width: '40px' }}><Text onClick={() => this.handleOnClick(multiplierValue)} onMouseEnter={() => this.handleOnMouseHover(true)} onMouseLeave={() => this.handleOnMouseHover(false)} style={{ height: '40px', width: '40px', lineHeight: '40px', borderColor: '#80BDFF', borderWidth: ((this.props.edittable && this.state.hovering) ? 'thin' : ''), textAlign: 'center', cursor: (this.props.edittable ? 'pointer' : '')}}>{multiplierValue}</Text></View></td>
            );
        }
    }
}

export default TypeMultiplierCell;