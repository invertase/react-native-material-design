import React, {Component, PropTypes} from "react";
import {View, Text, TouchableNativeFeedback} from "react-native";
import { default as PolyfillRipple } from './polyfill/Ripple';
import { isCompatible } from './helpers';

export default class Ripple extends Component {

    static propTypes = {
        color: PropTypes.string,
        onPress: PropTypes.func,
        onLongPress: PropTypes.func,
        children: PropTypes.node.isRequired
    };

    static defaultProps = {
        color: 'rgba(0,0,0,.2)'
    };

    render() {
        const { color, onPress, onLongPress, children, ...other } = this.props;

        if (!isCompatible('TouchableNativeFeedback')) {
            return (
                <PolyfillRipple
                    rippleColor={color}
                    ref={this._setMainRef}
                    onPress={onPress}
                    onLongPress={onLongPress}
                    {...other}
                >
                    {/* Stops fatal crash with out of bounds animation */}
                    <View style={{ marginHorizontal: .2 }}>
                        {children}
                    </View>
                </PolyfillRipple>
            )
        }

        return (
            <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple(color)}
                onPress={onPress}
                onLongPress={onLongPress}
            >
                <View ref={this._setMainRef} {...other}>
                    {children}
                </View>
            </TouchableNativeFeedback>
        );
    }

    _setMainRef = (ref) => {
        this.main = ref;
    };

    // Proxy the measurement methods from the main view
    measure = (...args) => this.main.measure(...args);
    measureInWindow = (...args) => this.main.measureInWindow(...args);
    measureLayout = (...args) => this.main.measureLayout(...args);
}

