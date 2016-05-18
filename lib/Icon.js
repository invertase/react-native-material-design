import React, { Component, PropTypes, Text} from 'react-native';
import { default as VectorIcon } from 'react-native-vector-icons/MaterialIcons';
import { getColor } from './helpers';

export default class Icon extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        style: Text.propTypes.style,
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
