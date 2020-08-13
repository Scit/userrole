import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import Button from '../Button';
import './style.css';

export default class ModalDialog extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        children: PropTypes.node,
        actions: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
            onClick: PropTypes.func
        }))
    };

    static defaultProps = {
        actions: []
    };

    renderDialogActions() {
        return this.props.actions.map((action, index) => (
            <Button
                key={index}
                onClick={action.onClick}
            >
                {action.label}
            </Button>
        ));
    }

    renderDialogFrame() {
        const { props } = this;
        return (
            <div className="modalDialog__frame">
                <div
                    className="modalDialog__title"
                >
                    {props.title}
                </div>
                <div
                    className="modalDialog__content"
                >
                    {props.children}
                </div>
                <div
                    className="modalDialog__actions"
                >
                    {this.renderDialogActions()}
                </div>
            </div>
        )
    }

    renderContent() {
        return (
            <div className="modalDialog">
                {this.renderDialogFrame()}
            </div>
        );
    }

    render() {
        return createPortal(this.renderContent(), document.body);
    }
}