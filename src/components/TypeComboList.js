import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import TypeCombo from './TypeCombo';

class TypeComboList extends React.Component { // TODO: add ability to switch from defense node to offense node

    constructor() {
        super();

        this.containerRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.hasChanges = false;

        this.state = {
            typeCombos: []
        };
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (this.hasChanges && this.containerRef && !this.containerRef.current.contains(event.target)) {
            const typeCombos = this.state.typeCombos;
            this.hasChanges = false;
            this.props.onSendChanges(typeCombos);
            this.setState((state) => {
                state.typeCombos = null;
                return state;
            });
        }
    }

    handleTypeComboAdd() {
        const newTypeCombos = [{
            name: '',
            types: []
        }].concat(this.hasChanges ? this.state.typeCombos : this.props.typeCombos);

        this.hasChanges = true;

        this.setState((state) => {
            state.typeCombos = newTypeCombos;
            return state;
        });
    }

    handleTypeComboEditted(index, name, types) {
        const newTypeCombos = (this.hasChanges ? this.state.typeCombos : this.props.typeCombos).map((typeCombo, i) => {
            if (i === index) {
                return {
                    name: name,
                    types: types
                };
            }
            else {
                return typeCombo;
            }
        });

        this.hasChanges = true;

        this.setState((state) => {
            state.typeCombos = newTypeCombos;
            return state;
        });
    }

    handleTypeComboDelete(index) {
        const newTypeCombos = (this.hasChanges ? this.state.typeCombos : this.props.typeCombos).filter((_, i) => i !== index);

        this.hasChanges = true;

        this.setState((state) => {
            state.typeCombos = newTypeCombos;
            return state;
        });
    }

    render() {
        return (
            <div ref={this.containerRef}>
                <Button color="success" block onClick={() => this.handleTypeComboAdd()} style={{ marginBottom: '1%' }}>New Type Combo</Button>
                <div className="list-group">
                    {(this.hasChanges ? this.state.typeCombos : this.props.typeCombos).map((typeCombo, index) => (<TypeCombo key={index} uniqueId={'typeComboList' + index} typeLookup={this.props.typeLookup} name={typeCombo.name} types={typeCombo.types} onEditted={(name, types) => this.handleTypeComboEditted(index, name, types)} onDelete={() => this.handleTypeComboDelete(index)} />))}
                </div>
            </div>
        );
    }
}

TypeComboList.propTypes = {
    typeLookup: PropTypes.objectOf(PropTypes.shape({
        color: PropTypes.string.isRequired,
        values: PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ])).isRequired
    })).isRequired,
    typeCombos: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        types: PropTypes.arrayOf(PropTypes.string).isRequired
    })).isRequired,
    onSendChanges: PropTypes.func.isRequired
}

export default TypeComboList;