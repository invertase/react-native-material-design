import { Component, View} from 'react-native';
import { default as VectorIcon } from 'react-native-vector-icons/MaterialIcons';
import { getColor } from './helpers';
import React from 'react';

var PropTypes = React.PropTypes;

export default class Icon extends React.Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        style: View.propTypes.style,
        size: PropTypes.number,
        color: PropTypes.string
    };

    static defaultProps = {
        size: 30,
        color: '#757575'
    };

    render() {
        const { name, style, size, color } = this.props;

        return (
            <VectorIcon
                name={name}
                size={size}
                color={getColor(color)}
                style={style}
            />
        );
    }
}
