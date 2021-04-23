import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import { View } from 'react-native';
import { Textfit } from 'react-textfit';


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
        console.log('value: ' + valueString);
        if (!valueString.includes('-') && newValue >= 0) {
            this.setState((state) => {
                state.editValue = newValue;
                return state;
            });
            this.props.onChange(e);
        }
    }

    handleOnFocus(e) {
        e.target.select();
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

    calculateBackgroundColor(multiplierValue) {
        if (multiplierValue === 0) {
            return '#646464';
        }
        else if (multiplierValue === 1) {
            return '#E6E6FA';
        }
        else {
            const linearValue = Math.log2(multiplierValue);
            const linearMax = 2;

            const ratio = 1 - Math.min(Math.abs(linearValue), linearMax) / linearMax;
            const partialHexComp = Math.round(ratio * 255).toString(16);
            const hexComp = partialHexComp.length > 1 ? partialHexComp : ('0' + partialHexComp);
            if (linearValue < 0) {
                return '#' + hexComp + 'FF' + hexComp;
            }
            else {
                return '#FF' + hexComp + hexComp;
            }
        }
    }

    render() {
        if (this.props.edittable && this.state.editting) {
            return (
                <td><View style={{ height: '40px', width: '40px' }}><Input type='number' min={0} max={99} precision={2} autoFocus onFocus={(e) => this.handleOnFocus(e)} onBlur={() => this.handleOnBlur()} onKeyDown={(e) => this.handleKeyPress(e)} onMouseEnter={() => this.handleOnMouseHover(true)} onMouseLeave={() => this.handleOnMouseHover(false)} style={{ height: '40px', width: '40px', lineHeight: '40px', textAlign: 'center', paddingLeft: '0', paddingRight: '0' }} value={this.state.editValue} onChange={(e) => this.handleOnValueChange(e)} /></View></td>
            );
        }
        else {
            const multiplierValue = this.props.defendingTypeNames.map((type) => this.props.typeLookup[type].values[this.props.attackIndex]).reduce((acc, currentVal) => acc * currentVal, 1);
            const backgroundColor = this.calculateBackgroundColor(multiplierValue);
            return (
                <td><View onMouseEnter={() => this.handleOnMouseHover(true)} onMouseLeave={() => this.handleOnMouseHover(false)} style={{ height: '40px', width: '40px' }}><Textfit mode="single" forceSingleModeWidth={false} max={20} onClick={() => this.handleOnClick(multiplierValue)} style={{ height: '40px', width: '40px', lineHeight: '40px', fontWeight: 'bold', textShadow: '-1px 1px 2px #000, 1px 1px 2px #000, 1px -1px 2px #000, -1px -1px 2px #000', color: '#FFFFFF', backgroundColor: backgroundColor, borderRadius: ((this.props.edittable && this.state.hovering) ? 0 : 10), textAlign: 'center', cursor: (this.props.edittable ? 'pointer' : '')}}>{multiplierValue}</Textfit></View></td>
            );
        }
    }
}

TypeMultiplierCell.propTypes = {
    defendingTypeNames: PropTypes.arrayOf(PropTypes.string).isRequired,
    attackIndex: PropTypes.number.isRequired,
    typeLookup: PropTypes.objectOf(PropTypes.shape({
        color: PropTypes.string.isRequired,
        values: PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ])).isRequired
    })).isRequired,
    edittable: PropTypes.bool,
    onChange: PropTypes.func
};

export default TypeMultiplierCell;