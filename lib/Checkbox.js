import React, { Component, StyleSheet, PropTypes, Text, View, TouchableHighlight } from 'react-native';
import { TYPO, PRIMARY, COLOR, PRIMARY_COLORS, THEME_NAME } from './config';
import Icon from './Icon';

const typos = StyleSheet.create(TYPO);

export default class Checkbox extends Component {

    static propTypes = {
        label: PropTypes.string,
        theme: PropTypes.oneOf(THEME_NAME),
        primary: PropTypes.oneOf(PRIMARY_COLORS),
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        checked: PropTypes.bool,
        disabled: PropTypes.bool,
        onCheck: PropTypes.func
    };

    static defaultProps = {
        theme: 'light',
        primary: PRIMARY,
        disabled: false,
        checked: false,
        label: 'A checkbox'
    };

    constructor(props){
        super(props);
        this.state = {
            checked: this.props.checked
        }
        this.onPress = this.onPress.bind(this);
    }

    onPress(){
        if(this.props.disabled){
            return;
        }

        this.setState({
            checked: !this.state.checked
        });

        if(this.props.onCheck == undefined){
            return;
        }
        this.props.onCheck(this.state.checked, this.props.value);
    }

    render() {
        const { theme, primary, checked, disabled, value} = this.props;
        const status = (()=> {
            if (disabled) {
                return 'disabled'
            } else if (checked) {
                return 'checked'
            } else {
                return 'default'
            }
        })();

        const colorMap = {
            light: {
                disabled: '#000000',
                checked: COLOR[`${primary}500`].color,
                default: '#000000'
            },
            dark: {
                disabled: '#ffffff',
                checked: COLOR[`${primary}500`].color,
                default: '#ffffff'
            }
        };

        const opacityMap = {
            light: {
                checked: 1,
                default: 0.54,
                disabled: 0.26
            },
            dark: {
                checked: 1,
                default: 0.7,
                disabled: 0.3
            }
        };

        const underlayMap = {
            light: 'rgba(0,0,0,.12)',
            dark: 'rgba(255,255,255,.12)'
        }

        const labelColorMap = {
            light: '#000000',
            dark: '#ffffff'
        };

        const CURR_COLOR = colorMap[theme][status];
        const OPACITY = opacityMap[theme][status];
        const LABEL_COLOR = labelColorMap[theme];
        const UNDERLAY_COLOR = underlayMap[theme];

        return (
            <TouchableHighlight
                onPress={this.onPress}
                underlayColor={disabled ? 'rgba(0,0,0,0)' : UNDERLAY_COLOR}
                activeOpacity={1}
            >
                <View style={styles.container}>
                    <Icon
                        disabled={disabled}
                        pressed={{color: CURR_COLOR}}
                        onPress={this.onPress}
                        name={this.state.checked ? 'check-box' : 'check-box-outline-blank'}
                        size={24}
                        color={CURR_COLOR}
                        key={value}
                        style={{
                          opacity: OPACITY,
                          margin: 16,
                        }}
                    />
                    <View
                        style={styles.labelContainer}
                        onPress={this.onPress}
                    >
                        <Text
                            style={[
                                typos.paperFontBody1,
                                styles.label,
                                COLOR[`${theme}PrimaryOpacity`],
                                disabled && COLOR[`${theme}DisabledOpacity`], {
                                    color: LABEL_COLOR
                                }
                            ]}
                        >
                            {this.props.label}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    label: {
        marginLeft: 16,
        opacity: COLOR.darkPrimaryOpacity.opacity,
        flex: 1
    }
});
