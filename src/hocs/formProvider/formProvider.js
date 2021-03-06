import React from 'react';

const initialState = {
    userName: '',
    userRoles: []
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
                userRoles: value
            });
        };

        onReset = () => {
            this.setState(initialState);
        };

        handlers = {
            onChangeUserName: this.onChangeUserName,
            onChangeRoles: this.onChangeRoles,
            onReset: this.onReset
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