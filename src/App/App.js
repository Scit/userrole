import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUsers, deleteUser, createUser, changeUser } from '../actions/userActions';
import { getRoles } from '../actions/rolesActions';
import {
    CHANGE_DIALOG,
    CREATE_DIALOG,
    DELETE_DIALOG
} from '../constants/dialogs';

import UserList from '../components/UserList';
import ModalDialog from '../components/ModalDialog';
import UserForm from '../components/UserForm';
import Button from '../components/Button';
import './style.css';

const actions = {
    getUsers,
    deleteUser,
    changeUser,
    createUser,
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
        form: PropTypes.shape({
            fields: PropTypes.shape({
                roles: PropTypes.array,
                userName: PropTypes.string
            }),
            handlers: PropTypes.shape({
                onChangeRoles: PropTypes.func,
                onChangeUserName: PropTypes.func,
                onReset: PropTypes.func
            })
        }),
        actions: PropTypes.shape({
            getUsers: PropTypes.func.isRequired,
            deleteUser: PropTypes.func.isRequired,
            createUser: PropTypes.func.isRequired,
            changeUser: PropTypes.func.isRequired,
            getRoles: PropTypes.func.isRequired
        })
    };

    state = initialState;

    componentDidMount() {
        this.props.actions.getUsers();
        this.props.actions.getRoles();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.dialog === null && this.state.dialog === CHANGE_DIALOG) {
            const user = this.getSelectedUser();
            this.props.form.handlers.onChangeUserName(user.userName);
            this.props.form.handlers.onChangeRoles(user.userRoles);
        }
    }

    onCreateUserRequest = () => {
        this.setState({
            dialog: CREATE_DIALOG
        });
    };

    onChangeUserRequest = (id) => {
        this.setState({
            selectedUserId: id,
            dialog: CHANGE_DIALOG
        })
    };

    onDeleteUserRequest = (id) => {
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

    onSaveUser = () => {
        const { props, state } = this;
        const { fields } = props.form;
        if (state.selectedUserId) {
            props.actions.changeUser(state.selectedUserId, fields.userName, fields.userRoles);
        } else {
            props.actions.createUser(fields.userName, fields.userRoles);
        }
        this.resetState();
    };

    userListHandlers = {
        onChange: this.onChangeUserRequest,
        onDelete: this.onDeleteUserRequest
    }

    editDialogActions = [
        {
            label: 'Сохранить',
            onClick: () => this.onSaveUser()
        },
        {
            label: 'Отмена',
            onClick: () => this.resetState()
        }
    ];

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

    getSelectedUser() {
        const { props, state } = this;
        return props.users.find(user => user.userId === state.selectedUserId);
    }

    resetState() {
        this.setState(initialState);
        this.props.form.handlers.onReset();
    }

    renderDialogs() {
        let result;
        switch (this.state.dialog) {
            case CREATE_DIALOG:
                result = this.renderEditDialog("Создание нового пользователя");
                break;
            case CHANGE_DIALOG:
                result = this.renderEditDialog("Редактирование пользователя");
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

    renderEditDialog(title) {
        const { props } = this;

        return (
            <ModalDialog
                title={title}
                actions={this.editDialogActions}
            >
                <UserForm
                    userName={props.form.fields.userName}
                    userRoles={props.form.fields.userRoles}
                    roleSource={props.roles}
                    handlers={props.form.handlers}
                />
            </ModalDialog>
        );
    }

    render() {
        return (
            <div className="app">
                <div className="app__header">
                    <h1 className="app__headerText">User list app</h1>
                    <Button
                        className="app__createButton"
                        onClick={this.onCreateUserRequest}
                    >
                        Создать пользователя
                    </Button>
                </div>

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
