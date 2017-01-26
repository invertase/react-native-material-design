import React, {Component, PropTypes} from "react";
import {ActivityIndicator, View, Text, TouchableNativeFeedback, Platform} from "react-native";
import Ripple from './polyfill/Ripple';
import { TYPO, PRIMARY, THEME_NAME, PRIMARY_COLORS } from './config';
import { getColor, isCompatible } from './helpers';

export default class Button extends Component {

    static propTypes = {
        text: PropTypes.string.isRequired,
        theme: PropTypes.oneOf(THEME_NAME),
        primary: PropTypes.oneOf(PRIMARY_COLORS),
        overrides: PropTypes.shape({
            textColor: PropTypes.string,
            backgroundColor: PropTypes.string,
            rippleColor: PropTypes.string
        }),
        disabled: PropTypes.bool,
        loading: PropTypes.bool,
        activityIndicatorColor: PropTypes.string,
        raised: PropTypes.bool,
        styles: PropTypes.shape({
            button:   View.propTypes.style,
            disabled: View.propTypes.style,
            text:     Text.propTypes.style
        }),
        onPress: PropTypes.func,
        onLongPress: PropTypes.func,
    };

    static defaultProps = {
        theme: 'light',
        primary: PRIMARY,
        disabled: false,
        loading: false,
        raised: false,
        activityIndicatorColor: 'black',
        styles: {
            disabled: {opacity: 0.5}
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            elevation: 2
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.text     !== this.props.text ||
            nextProps.value    !== this.props.value ||
            nextProps.loading  !== this.props.loading ||
            nextProps.disabled !== this.props.disabled
        );
    }

    setElevation = () => {
        this.setState({
            elevation: 4
        });
    };

    removeElevation = () => {
        this.setState({
            elevation: 2
        });
    };

    render() {
        const { elevation } = this.state;
        const { text, value, theme, primary, overrides, disabled, loading, raised, styles, onPress, onLongPress } = this.props;

        const textStyleMap = {
            flat: {
                light: {
                    normal: {
                        color: getColor(primary)
                    },
                    disabled: {
                        color: 'rgba(0,0,0,.26)'
                    }
                },
                dark: {
                    normal: {
                        color: getColor(primary)
                    },
                    disabled: {
                        color: 'rgba(255,255,255,.3)'
                    }
                }
            },
            raised: {
                light: {
                    normal: {
                        color: getColor(primary)
                    },
                    disabled: {
                        color: 'rgba(0,0,0,.26)'
                    }
                },
                dark: {
                    normal: {
                        color: '#fff'
                    },
                    disabled: {
                        color: 'rgba(255,255,255,.3)'
                    }
                }
            }
        };

        const buttonStyleMap = {
            raised: {
                light: {
                    normal: {
                        backgroundColor: '#fff',
                        borderColor: 'rgba(0,0,0,.12)',
                    },
                    disabled: {
                        backgroundColor: 'rgba(0,0,0,.12)',
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0,.12)'
                    }
                },
                dark: {
                    normal: {
                        backgroundColor: getColor(primary),
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0,.12)'
                    },
                    disabled: {
                        backgroundColor: 'rgba(255,255,255,.12)',
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0,.12)'
                    }
                }
            }
        };

        const rippleColorMap = {
            flat: {
                light: {
                    normal: 'rgba(153,153,153,.4)',
                    disabled: 'rgba(0,0,0,0.06)'
                },
                dark: {
                    normal: 'rgba(204,204,204,.25)',
                    disabled: 'rgba(255,255,255,0.06)'
                }
            },
            raised: {
                light: {
                    normal: 'rgba(153,153,153,.4)',
                    disabled: 'rgba(0,0,0,.06)'
                },
                dark: {
                    normal: getColor(`${primary}700`),
                    disabled: 'rgba(255,255,255,.06)'
                }
            }
        };

        const type = disabled ? 'disabled' : 'normal';
        const shape = raised ? 'raised' : 'flat';

        const textStyle = (() => {
            if (disabled || !(overrides && overrides.textColor)) {
                return textStyleMap[shape][theme][type];
            }

            return { color: getColor(overrides.textColor) };
        })();

        const buttonStyle = (() => {
            if (raised) {
                if (disabled || !(overrides && overrides.backgroundColor)) {
                    return buttonStyleMap[shape][theme][type];
                }

                return Object.assign(buttonStyleMap[shape][theme][type], { backgroundColor: getColor(overrides.backgroundColor) });
            }

            return null;
        })();

        const rippleColor = (() => {
            if (disabled || !(overrides && overrides.rippleColor)) {
                return rippleColorMap[shape][theme][type];
            }

            return getColor(overrides.rippleColor)
        })();

        if (disabled || loading) {
            return (
                <View
                    style={[
                        componentStyles.button,
                        buttonStyle, {
                            backgroundColor: buttonStyle && buttonStyle.backgroundColor
                        },
                        styles.button,
                        styles.disabled
                    ]}
                >
                    {loading ?
                        <ActivityIndicator animating={this.props.loading} style={componentStyles.spinner} color={this.props.activityIndicatorColor} />
                        :
                        <Text style={[TYPO.paperFontButton, textStyle, componentStyles.text, styles.text]}>
                            {text || value}
                            {this.props.children}
                        </Text>
                    }
                </View>
            );
        }

        if (!isCompatible('TouchableNativeFeedback')) {
            return (
                <Ripple
                    elevation={raised ? [2, 4] : null}
                    rippleColor={rippleColor}
                    onPress={!disabled ? onPress : null}
                    onLongPress={!disabled ? onLongPress : null}
                    style={[
                        componentStyles.button,
                        buttonStyle, {
                            backgroundColor: buttonStyle && buttonStyle.backgroundColor,
                        }, raised && !isCompatible('elevation') && Platform.OS !== 'ios' && {
                            borderWidth: 1,
                            borderColor: 'rgba(0,0,0,.12)'
                        },
                        styles.button
                    ]}
                >
                    <Text style={[TYPO.paperFontButton, textStyle, componentStyles.text, styles.text]}>
                        {text || value}
                        {this.props.children}
                    </Text>
                </Ripple>
            )
        }

        return (
            <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple(rippleColor)}
                onPress={!disabled ? onPress : null}
                onLongPress={!disabled ? onLongPress : null}
                onPressIn={raised ? this.setElevation : null}
                onPressOut={raised ? this.removeElevation : null}
            >
                <View style={[
                    componentStyles.button,
                    buttonStyle, {
                        backgroundColor: buttonStyle && buttonStyle.backgroundColor,
                        elevation: raised ? elevation : 0
                    },
                    styles.button
                  ]}
                >
                    <Text style={[TYPO.paperFontButton, textStyle, componentStyles.text, styles.text]}>
                        {text || value}
                    </Text>
                </View>
            </TouchableNativeFeedback>
        );
    };
}

const componentStyles = {
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6,
        paddingHorizontal: 16,
        margin: 6,
        borderRadius: 2
    },
    text: {
        lineHeight: 20
    },
    spinner: {
        alignSelf: 'center'
    }
};
