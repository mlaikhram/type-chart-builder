import React from 'react';
import { Input } from 'reactstrap';
import { View, Text } from 'react-native';


class TypeMultiplierCell extends React.Component {

    constructor() {
        super();

        this.state = {
            editting: false,
            editValue: 1
        };
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

    render() {
        if (this.props.edittable && this.state.editting) {
            return (
                <td><View style={{ height: '40px', width: '40px' }}><Input type='number' min={0} max={99} precision={2} autoFocus onBlur={() => this.handleOnBlur()} style={{ height: '40px', width: '40px', lineHeight: '40px', textAlign: 'center', paddingLeft: '0', paddingRight: '0' }} value={this.state.editValue} onChange={(e) => this.handleOnValueChange(e)} /></View></td>
            );
        }
        else { // TODO: background color on log2 scale
            const multiplierValue = this.props.defendingTypeNames.map((type) => this.props.typeLookup[type].values[this.props.attackIndex]).reduce((acc, currentVal) => acc * currentVal, 1);
            return (
                <td><View style={{ height: '40px', width: '40px' }}><Text onClick={() => this.handleOnClick(multiplierValue)} style={{ height: '40px', width: '40px', lineHeight: '40px', textAlign: 'center' }}>{multiplierValue}</Text></View></td>
            );
        }
    }
}

export default TypeMultiplierCell;