import React, { Component, PropTypes, Text, View, Animated } from 'react-native';
import { getColor } from './helpers';
import { default as VectorIcon } from 'react-native-vector-icons/MaterialIcons';

export default class Icon extends Component {

    constructor(props) {
        super(props);

        this._responder = {
            onStartShouldSetResponder: (e) => true,
            onResponderGrant: this._highlight,
            onResponderRelease: this._handleResponderEnd,
            onResponderTerminate: this._unHighlight
        };
        this.badgeAnim = new Animated.Value(0);

        this.state = {
            scaleValue: new Animated.Value(0.001),
            opacityValue: new Animated.Value(0.1),
            maxOpacity: (props.pressed == undefined ? null: props.pressed.opacity),
            size: null,
            color : getColor(this.props.color),
            pressed: this._normalizePressedFromProps(this.props),
            badge: this._normalizeBadgeFromProps(this.props)
        };
    }

    _normalizeBadgeFromProps(props){
        let { badge } = props;
        if (badge && typeof badge.value === 'number') {
            badge = Object.assign({},
                {value: badge.value},
                badge.backgroundColor ? {backgroundColor: badge.backgroundColor} : {backgroundColor: 'paperRed'},
                badge.textColor ? {textColor: badge.textColor} : {textColor: '#ffffff'}
            );
            badge.backgroundColor = getColor(badge.backgroundColor);
            badge.textColor = getColor(badge.textColor);
        }
        return badge;
    }

    _normalizePressedFromProps(props){
        let { pressed } = props;
        if(pressed !== undefined){
            let percent = pressed.percent ? 90: pressed.percent;
            if (percent < 0) {
                percent = 0;
            }
            if (percent > 100) {
                percent = 100;
            }
            percent = percent / 100;
            pressed.percent = percent;
            pressed.color = pressed.color ? pressed.color: 'paperRed';
            pressed.color = getColor(pressed.color);
            pressed.opacity = pressed.opacity ? pressed.opacity: .1;
        }

        return pressed;
    }

    componentDidUpdate(prevProps) {
        if (this.props && this.props.badge) {
            if (this.props.badge.value !== prevProps.badge.value) {
                this.setState({
                    badge: {
                        ...this.state.badge,
                        value: this.props.badge.value
                    }
                });
                this._animateBadgeCounter();
            }
        }
    };

    static propTypes = {
        name: PropTypes.string.isRequired,
        style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        size: PropTypes.number,
        color: PropTypes.string.isRequired,
        pressed: PropTypes.shape({
            percent: PropTypes.number,
            opacity: PropTypes.number,
            color: PropTypes.string,
        }),
        disabled: PropTypes.bool,
        onPress: PropTypes.func,
        badge: PropTypes.shape({
            value: PropTypes.number,
            animate: PropTypes.bool,
            backgroundColor: PropTypes.string,
            textColor: PropTypes.string
        })
    };

    static defaultProps = {
        disabled: false,
        size: 30,
        color: '#757575'
    };

    onLayout = (event) => {
        const { width, height } = event.nativeEvent.layout;

        this.setState({
            size: width > height ? width : height
        });
    };

    _renderPressed(){
        const { color, size, pressed } = this.state;
        let shape = {};
        if(pressed != undefined){
            let left = ((1 - pressed.percent) * size) / 2;
            let width = pressed.percent * size;
            let borderRadius = pressed.percent * size / 2
            shape = {
                left,
                top: left,
                width,
                height: width,
                borderRadius
            }
        }
        return (size && pressed &&
            <Animated.View
                style={[{
                    position: 'absolute',
                    ...shape,
                    transform: [{ scale: this.state.scaleValue }],
                    opacity: this.state.opacityValue,
                    backgroundColor: pressed.color
                }]}
            />
        );
    }

    _renderBadge(){
        const { badge, color, size, pressed } = this.state;
        return (size && badge && typeof badge.value === 'number' &&
            <Animated.View style={[
                styles.badgeContainer, {
                backgroundColor: badge.backgroundColor,
                top: size / 10,
                right: size / 10,
                transform: [   // Array order matters
                    {scale: this.badgeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.25]
                    })},
                    {translateX: this.badgeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -6]
                    })},
                    {translateY: this.badgeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 5]
                    })},
                    {rotate: this.badgeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [
                        '0deg', '45deg' // 'deg' or 'rad'
                      ]
                    })}
                ]}]}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={[styles.badgeText, { color: badge.textColor }, badge.value > 99 ? { fontSize: 8 } : { fontSize: 10 }]}>
                        {badge.value}
                    </Text>
                </View>
            </Animated.View>
        )
    }

    render() {
        let { badge, color, size, pressed } = this.state;

        return (
            <View {...this._responder}>
                <View>
                    {this._renderPressed()}
                    <View style={{ backgroundColor: 'transparent' }} onLayout={this.onLayout}>
                        <VectorIcon
                            name={this.props.name}
                            size={this.props.size}
                            color={color}
                            style={[this.props.style, {margin: 16}]}
                        />
                    </View>
                    {this._renderBadge()}
                </View>
            </View>
        );
    };

    _highlight = () => {
        if (!this.props.disabled) {
            Animated.timing(this.state.scaleValue, {
                toValue: 1,
                duration: 150
            }).start();
            Animated.timing(this.state.opacityValue, {
                toValue: this.state.maxOpacity,
                duration: 100
            }).start();
        }
    };

    _unHighlight = () => {
        if (!this.props.disabled) {
            Animated.timing(this.state.scaleValue, {
                toValue: 0.001,
                duration: 1500
            }).start();
            Animated.timing(this.state.opacityValue, {
                toValue: 0
            }).start();
        }
    };

    _animateBadgeCounter = () => {
        if (this.badgeAnim && this.props.badge && this.props.badge.animate !== false) {
            Animated.spring(this.badgeAnim, {
                toValue: 0,   // Returns to the start
                velocity: 8,  // Velocity makes it move
                tension: -5, // Slow
                friction: 1,  // Oscillate a lot
                duration: 300
            }).start();
        }
    };

    _handleResponderEnd = () => {
        const { disabled, onPress } = this.props;

        if (!disabled) {
            this._unHighlight();
            onPress && onPress();
        }
    };
}

const styles = {
    badgeContainer: {
        position: 'absolute',
        borderRadius: 7.5,
        width: 15,
        height: 15
    },
    badgeText: {
        textAlign: 'center'
    }
};
