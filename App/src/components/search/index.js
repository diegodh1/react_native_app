import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import { search_ot_remision } from '../../redux/actions/actions';

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ot_texto: '',
        };
        this.updateSearch = this.updateSearch.bind(this);
    }
    updateSearch = ot_texto => {
        this.setState({ ot_texto });
        this.props.search_ot_remision(ot_texto);
    };
    render() {
        const { ot_texto } = this.state;

        return (
            <SearchBar
                placeholder="Escribir OT..."
                onChangeText={this.updateSearch}
                platform="ios"
                round
                value={ot_texto}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.userRedux.message,
        usuario: state.userRedux.usuario,
        ot: state.userRedux.ot
    };
}
const mapDispatchToProps = {
    search_ot_remision,
}
export default connect(mapStateToProps, mapDispatchToProps)(Search);