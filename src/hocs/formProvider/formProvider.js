import React from 'react';

const initialState = {
    userName: '',
    roles: []
}

export default (Component) => {
    return class FormProvider extends React.Component {
        state = initialState;

        onChangeUserName = (value) => {
            this.setState({
                userName: value
            });
        };

        onChangeRoles = (value) => {
            this.setState({
                roles: value
            });
        };

        handlers = {
            onChangeUserName: this.onChangeUserName,
            onChangeRoles: this.onChangeRoles
        }

        render() {
            const form = {
                fields: this.state,
                handlers: this.handlers
            };

            return (
                <Component
                    {...this.props}
                    form={form}
                />
            );
        }
    };
}