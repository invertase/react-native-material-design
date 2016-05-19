import React, {Component, PropTypes} from "react";
import {View, Animated, TouchableOpacity} from "react-native";
import elevationPolyfill from './Elevation';

export default class Ripple extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scaleValue: new Animated.Value(0.001),
            fadeValue: new Animated.Value(0.001),
            pageX: null,
            pageY: null,
            rippling: false,
            size: null,
            location: null,
            longPress: false,
            elevation: props.elevation ? props.elevation[0] : null
        };
    }

    static propTypes = {
        rippleColor: PropTypes.string,
        elevation: PropTypes.array,
        onPress: PropTypes.func,
        onLongPress: PropTypes.func,
        style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        children: PropTypes.element.isRequired
    };

    static defaultProps = {
        rippleColor: 'rgba(0,0,0,.2)',
        elevation: null
    };

    render() {
        const { rippleColor, onPress, onLongPress, children, style } = this.props;
        const { fadeValue ,size, pageX, pageY, rippling, scaleValue, location, elevation } = this.state;

        return (
            <TouchableOpacity
                ref='container'
                activeOpacity={1}
		delayPressOut={400}
		onPress={onPress}
                onLongPress={onLongPress}
                onPressIn={this._highlight}
                onPressOut={this._unHighlight}
            >
                <View
                    style={[style || {}, elevationPolyfill(elevation ? elevation : 0)]}
                >
                    <Animated.View  style={[
                        styles.background, {
                            backgroundColor: rippling ? rippleColor : 'transparent',
                        }
                    ]}/>
                    <Animated.View style={[
                        styles.ripple,
                        location &&
                            {
                                backgroundColor: rippleColor,
                                width: size,
                                height: size,
                                top: pageY - location.pageY - size / 2,
                                left: pageX - location.pageX - size / 2,
                                borderRadius: size / 2,
				opacity: fadeValue,
                            },
                        {
                            transform: [{ scale: scaleValue }]
                        }]}
                    />
                    {children}
                </View>
            </TouchableOpacity>
        );
    };

    _highlight = (e) => {
        const { elevation } = this.props;

        if (elevation) {
            this.setState({
                elevation: elevation[1]
            });
        }

        const { pageX, pageY } = e.nativeEvent;

        this.setState({
            rippling: true,
            pageX,
            pageY
        });

        this._getContainerDimensions(() => {
            const duration = (this.state.size / 100) * 110;

            Animated.timing(this.state.scaleValue, {
                toValue: 1,
                duration: duration < 300 || duration >= 600 ? 300 : duration
            }).start();

            Animated.timing(this.state.fadeValue, {
                toValue: .8,
                duration: 100
            }).start();
        });
    };

    _unHighlight = () => {
        const { elevation } = this.props;

        if (elevation) {
            this.setState({
                elevation: elevation[0]
            });
        }

        this.setState({
            rippling: false
        });

        Animated.timing(this.state.scaleValue, {
            toValue: 0,
            duration: 1
        }).start();

        Animated.timing(this.state.fadeValue, {
            toValue: 0,
            duration: 1,
        }).start();
    };

    _getContainerDimensions = (next) => {
        this.refs.container.measure((x, y, width, height, pageX, pageY) => {
            this.setState({
                size: 3 * (width > height ? width : height),
                location: { pageX, pageY }
            }, next);
        })
    };

}

const styles = {
    container: {
        overflow: 'hidden'
    },
    background: {
        flex: 1,
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    ripple: {
        position: 'absolute'
    }
};
