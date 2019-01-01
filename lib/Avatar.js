import React, {Component, PropTypes} from "react";
import {StyleSheet, View, Image, Text} from "react-native";
import Icon from './Icon';
import { getColor } from './helpers';

export default class Avatar extends Component {

    static propTypes = {
        image: PropTypes.shape({ type: PropTypes.oneOf([Image]) }),
        icon: PropTypes.string,
        size: PropTypes.number,
        textSize: PropTypes.number,
        textLineHeight: PropTypes.number,
        color: PropTypes.string,
        backgroundColor: PropTypes.string,
        text: PropTypes.string,
        borderRadius: PropTypes.number,
        borderColor: PropTypes.string,
        borderWidth: PropTypes.number
    };

    static defaultProps = {
        size: 40,
        color: '#ffffff',
        backgroundColor: getColor('paperGrey500'),
        borderRadius: 40 / 2,
        borderColor: 'rgba(0,0,0,.1)',
        borderWidth: 1
    };

    render() {
        const {
            image,
            icon,
            size,
            color,
            backgroundColor,
            textSize,
            textLineHeight,
            text,
            borderRadius,
            borderColor,
            borderWidth
        } = this.props;

        if (image) {
            return React.cloneElement(image, {
                style: {
                    width: size,
                    height: size,
                    borderRadius: borderRadius,
                    borderColor: borderColor,
                    borderWidth: borderWidth
                }
            });
        }

        if (icon) {
            return (
                <View style={{ flex: 1 }}>
                    <View style={{ width: size, height: size, borderRadius: borderRadius, backgroundColor: getColor(backgroundColor), alignItems:'center', justifyContent: 'center' }}>
                        <Icon
                            name={icon}
                            color={getColor(color)}
                            size={0.6 * size}
                        />
                    </View>
                </View>
            );
        }

        if (text) {
            return (
                <View style={{ flex: 1 }}>
                    <View style={{ width: size, height: size, borderRadius: borderRadius, backgroundColor: getColor(backgroundColor), alignItems:'center', justifyContent: 'center' }}>
                        <Text
                            suppressHighlighting
                            style={[
                                styles.text,
                                { color: getColor(color) },
                                textSize && { fontSize: textSize },
                                textLineHeight && { lineHeight: textLineHeight }]
                            }
                        >
                            {text}
                        </Text>
                    </View>
                </View>
            );
        }

        return null;
    }
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        textAlignVertical: 'center',
        includeFontPadding: false
    }
});