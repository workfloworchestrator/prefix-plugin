/*
 * Copyright 2019-2020 SURF.
 */

// import "./CheckBox.scss";

import React, { ChangeEvent } from "react";

interface IProps {
    name: string;
    value?: boolean;
    onChange?: (value: ChangeEvent<HTMLInputElement>) => void;
    readOnly?: boolean;
    info?: string;
    className?: string;
    autofocus?: boolean;
    level?: string;
}

export default class CheckBox extends React.PureComponent<IProps> {
    private input: HTMLSpanElement | null = null;

    componentDidMount() {
        if (this.props.autofocus && this.input !== null) {
            this.input.focus();
        }
    }

    render() {
        const { name, value, readOnly = false, onChange = () => this, info, className = "checkbox" } = this.props;
        return (
            <div className={className}>
                <input type="checkbox" id={name} name={name} checked={value} onChange={onChange} disabled={readOnly} />
                <label htmlFor={name}>
                    <span ref={(ref) => (this.input = ref)} tabIndex={0}>
                        <i className="fa fa-check" />
                    </span>
                </label>
                {info && (
                    <label htmlFor={name} className="info">
                        {info}
                    </label>
                )}
            </div>
        );
    }
}
