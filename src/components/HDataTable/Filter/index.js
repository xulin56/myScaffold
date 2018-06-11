import React, {Component} from 'react';
import {Form} from 'components/HForm';
import PropTypes from 'prop-types';

export default class Filter extends Component {
    static contextTypes = {
        tableName: PropTypes.string,
    };

    onSubmit(data) {
        console.log(data,'--data--');
    }

    render() {
        const {tableName} = this.context;
        return (
            <Form ns={"data-table-" + tableName} onSubmit={this.onSubmit}>
                {this.props.children}
            </Form>
        )
    }
}