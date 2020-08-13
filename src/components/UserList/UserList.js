import React from 'react';
import PropTypes from 'prop-types';
import rolesService from '../../services/rolesService';
import './style.css';

export default class UserList extends React.Component {
    static propTypes = {
        users: PropTypes.arrayOf(PropTypes.shape({
            userId: PropTypes.number,
            userName: PropTypes.string,
            roles: PropTypes.array
        })),
        roles: PropTypes.arrayOf(PropTypes.shape({
            roleId: PropTypes.number,
            roleName: PropTypes.string
        })),
        handlers: PropTypes.shape({
            onChange: PropTypes.func.isRequired,
            onDelete: PropTypes.func.isRequired
        })
    };

    onChange = (userId) => {
        const { props } = this;
        props.handlers.onChange(userId);
    }

    onDelete = (userId) => {
        const { props } = this;
        props.handlers.onDelete(userId);
    }

    renderControls(userId) {
        return (
            <div className="userList__controlsContainer">
                <div className="userList__button" onClick={() => this.onChange(userId)}>Редактировать</div>
                <div className="userList__button" onClick={() => this.onDelete(userId)}>Удалить</div>
            </div>
        );
    }

    renderRoles(roleIds) {
        const roleNames = rolesService.getRoleNames(this.props.roles, roleIds);

        return (
            <div>
                {roleIds.map((roleId, index) => {
                    const roleName = roleNames[index];
                    return (
                        <div key={roleId}>
                            {roleName}
                        </div>
                    );
                })}
            </div>
        );
    }

    render() {
        return (
            <div className="userList">
                {this.props.users.map(user => (
                    <div className="userList__row"
                        key={user.userId}
                    >
                        <div>{user.userName}</div>
                        {this.renderRoles(user.roles)}
                        {this.renderControls(user.userId)}
                    </div>
                ), this)}
            </div>
        );
    }
}