import React from 'react';


class TypeComboList extends React.Component {

    constructor() {
        super();

        this.state = {
            activeTypeComboIndex: -1
        };
    }

    handleTypeComboActive(index) {
        const newIndex = this.state.activeTypeComboIndex === index ? -1 : index;
        this.setState((state) => {
            state.activeTypeComboIndex = newIndex;
            return state;
        });
    }

    handleTypeComboTypeClicked(index, typeName) {
        console.log('type: ' + typeName);
        const newTypes = this.state.typeCombos[index].types.includes(typeName) ?
            this.state.typeCombos[index].types.filter((_) => _ !== typeName) :
            this.state.typeCombos[index].types.concat(typeName);

        this.setState((state) => {
            state.typeCombos[index].types = newTypes;
            return state;
        });
    }

    render() {
        return (
            <div>
                <Button color="success" block onClick={() => this.props.handleTypeComboAdd()} style={{ marginBottom: '1%' }}><FaPlus /></Button>
                <ListGroup>
                    {this.props.typeCombos.map((typeCombo, index) => (<TypeCombo key={index} active={this.state.activeTypeComboIndex === index} typeLookup={this.props.types} typeCombo={typeCombo} onActive={() => this.handleTypeComboActive(index)} onNameChange={(e) => this.handleNameChange(e, index)} onTypeClick={(typeName) => this.handleTypeComboTypeClicked(index, typeName)} onDelete={() => this.handleTypeComboDelete(index)} />))}
                </ListGroup>
            </div>
        );
    }
}