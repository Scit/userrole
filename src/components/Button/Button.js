import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './style.css';

export default class Button extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.node,
        onClick: PropTypes.func
    };

    render() {
        const { props } = this;
        const className = classnames('button', props.className);

        return (
             <div
                 className={className}
                 onClick={props.onClick}
             >
                 {props.children}
             </div>
        );

    }
}