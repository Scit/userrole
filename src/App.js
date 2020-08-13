import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUsers } from './actions/userActions';
import { getRoles } from './actions/rolesActions';

import UserList from './components/UserList';
import ModalDialog from './components/ModalDialog';
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

    onChangeUser = (id) => {
        console.log('onChangeUser', id)
    };

    onDeleteUser = (id) => {
        console.log('onDeleteUser', id)
    }

    userListHandlers = {
        onChange: this.onChangeUser,
        onDelete: this.onDeleteUser
    }

    render() {
        return (
            <div className="app">
                <h1>User list app</h1>

                <UserList
                    users={this.props.users}
                    roles={this.props.roles}
                    handlers={this.userListHandlers}
                />

                <ModalDialog
                    title="Вы хотите удалить выбранные элементы?"
                    actions={[{ label: 'Удалить'}, { label: 'Отмена'}]}
                >
                    Hello
                </ModalDialog>
            </div>
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
