import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUsers, deleteUser } from '../actions/userActions';
import { getRoles } from '../actions/rolesActions';
import {
    CHANGE_DIALOG,
    CREATE_DIALOG,
    DELETE_DIALOG
} from '../constants/dialogs';

import UserList from '../components/UserList';
import ModalDialog from '../components/ModalDialog';
import './style.css';

const actions = {
    getUsers,
    deleteUser,
    getRoles
};

const initialState = {
    selectedUserId: null,
    dialog: null
};

class App extends React.Component {
    static propTypes = {
        users: PropTypes.array,
        roles: PropTypes.array,
        actions: PropTypes.shape({
            getUsers: PropTypes.func.isRequired,
            deleteUser: PropTypes.func.isRequired,
            getRoles: PropTypes.func.isRequired
        })
    };

    state = initialState;

    componentDidMount() {
        this.props.actions.getUsers();
        this.props.actions.getRoles();
    }

    onChangeUserRequest = (id) => {
        console.log('onChangeUser', id)
    };

    onDeleteUserRequest = (id) => {
        console.log('onDeleteUser', id)
        this.setState({
            selectedUserId: id,
            dialog: DELETE_DIALOG
        })
    };

    onDeleteUser = () => {
        const { props, state } = this;
        props.actions.deleteUser(state.selectedUserId);
        this.resetState();
    };

    userListHandlers = {
        onChange: this.onChangeUserRequest,
        onDelete: this.onDeleteUserRequest
    }

    deleteDialogActions = [
        {
            label: 'Удалить',
            onClick: () => this.onDeleteUser()
        },
        {
            label: 'Отмена',
            onClick: () => this.resetState()
        }
    ];

    resetState() {
        this.setState(initialState);
    }

    renderDialogs() {
        let result;
        switch (this.state.dialog) {
            case CREATE_DIALOG:
                result = null;
                break;
            case CHANGE_DIALOG:
                result = null;
                break;
            case DELETE_DIALOG:
                result = this.renderDeleteDialog();
                break;
            default:
                result = null;
                break;
        }

        return result;
    }

    renderDeleteDialog() {
        const { props, state } = this;
        const user = props.users.find(user => user.userId === state.selectedUserId);

        return (
            <ModalDialog
                title="Вы действительно хотите удалить выбранного пользователя?"
                actions={this.deleteDialogActions}
            >
                {user.userName}
            </ModalDialog>
        );
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

                {this.renderDialogs()}
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
