import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUsers } from './actions/userActions';
import { getRoles } from './actions/rolesActions';
import './App.css';

const actions = {
    getUsers,
    getRoles
};

class App extends React.Component {
    static propTypes = {
        users: PropTypes.array,
        roles: PropTypes.array,
        actions: PropTypes.shape({
            getUsers: PropTypes.func.isRequired,
            getRoles: PropTypes.func.isRequired
        })
    };

    componentDidMount() {
        this.props.actions.getUsers();
        this.props.actions.getRoles();
    }

    render() {
        console.log('props', this.props)
        return (
            <div>hello</div>
        );
    }
}

function mapStateToProps(state) {
    return {
        users: state.users,
        roles: state.roles
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
