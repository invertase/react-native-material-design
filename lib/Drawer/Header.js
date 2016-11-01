import React, {Component, PropTypes} from "react";
import {View, Image} from "react-native";

export default class Header extends Component {

    static propTypes = {
        image: PropTypes.shape({ type: PropTypes.oneOf([Image]) }),
        backgroundColor: PropTypes.string,
        height: PropTypes.number,
        children: PropTypes.node
    };

    static defaultProps = {
        height: 150,
        backgroundColor: '#333333'
    };

    render() {
        const { image, height, backgroundColor, children } = this.props;

        if (image) {
            return React.cloneElement(image, {
                style: [styles.header, { height: height }]
            }, children);
        }

        return (
            <View style={[styles.header, { height: height, backgroundColor: backgroundColor }]}>
                {children}
            </View>
        );
    }
}

const styles = {
    header: {
      flexWrap: 'wrap',
      justifyContent:'flex-start',
        marginBottom: 8
    }
};
