import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './style.css';

export default class UserForm extends React.Component {
    static propTypes = {
        userName: PropTypes.string,
        userRoles: PropTypes.arrayOf(PropTypes.number),
        roleSource: PropTypes.arrayOf(PropTypes.shape({
            roleId: PropTypes.number,
            roleName: PropTypes.string
        })),
        handlers: PropTypes.shape({
            onChangeUserName: PropTypes.func,
            onChangeRoles: PropTypes.func
        })
    };

    onToggleRole(roleId) {
        const { userRoles } = this.props;
        const indexOf = userRoles.indexOf(roleId);
        let result;
        if (indexOf === -1) {
            result = userRoles.concat(roleId);
        } else {
            result = userRoles.concat();
            result.splice(indexOf, 1);
        }

        this.props.handlers.onChangeRoles(result);
    }

    renderRoles() {
        const { props } = this;
        return props.roleSource.map(role => {
            const selected = props.userRoles.includes(role.roleId);

            return (
                <div
                    key={role.roleId}
                    className="userForm__role"
                >
                    <input
                        type="checkbox"
                        onChange={() => this.onToggleRole(role.roleId)}
                        checked={selected}
                        name={role.roleId}
                    >
                    </input>
                    <label htmlFor={role.roleId}>{role.roleName}</label>
                </div>
            );
        });
    }

    render() {
        const { props } = this;
        return (
            <div>
                <div>
                    <input
                        value={props.userName}
                        onChange={e => props.handlers.onChangeUserName(e.currentTarget.value)}
                    />
                </div>
                <div className="userForm__roles">
                    {this.renderRoles()}
                </div>
            </div>
        );
    }
}