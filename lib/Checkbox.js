import React, {Component} from "react";
import PropTypes from "prop-types";
import {StyleSheet, Text, View, TouchableHighlight} from "react-native";
import { TYPO, PRIMARY, COLOR, PRIMARY_COLORS, THEME_NAME } from './config';
import Icon from './Icon';
import IconToggle from './IconToggle';

const typos = StyleSheet.create(TYPO);

export default class Checkbox extends Component {

    static propTypes = {
        label: PropTypes.string,
        theme: PropTypes.oneOf(THEME_NAME),
        primary: PropTypes.oneOfType([PropTypes.oneOf(PRIMARY_COLORS), PropTypes.string]),
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        checked: PropTypes.bool,
        disabled: PropTypes.bool,
        onCheck: PropTypes.func
    };

    static defaultProps = {
        theme: 'light',
        primary: PRIMARY,
        disabled: false
    };

    render() {
        const { theme, primary, checked, disabled, value, onCheck } = this.props;

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
                checked: (COLOR[`${primary}500`] || {}).color || primary,
                default: '#000000'
            },
            dark: {
                disabled: '#ffffff',
                checked: (COLOR[`${primary}500`] || {}).color || primary,
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
                onPress={() => { disabled ? null : onCheck(!checked, value) }}
                underlayColor={disabled ? 'rgba(0,0,0,0)' : UNDERLAY_COLOR}
                activeOpacity={1}
            >
                <View style={styles.container}>
                    <IconToggle
                        disabled={disabled}
                        color={CURR_COLOR}
                        onPress={() => { disabled ? null : onCheck(!checked, value) }}
                    >
                        <Icon name={checked ? 'check-box' : 'check-box-outline-blank'}
                              size={24}
                              color={CURR_COLOR}
                              key={value}
                              style={{
                                  opacity: OPACITY,
                                  margin: 16,
                              }}
                        />
                    </IconToggle>
                    <View
                        style={{alignItems: 'center',
                              flexDirection: 'row',
                            	flex: 1}}
                        onPress={() => onCheck(!checked, value)}
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
        alignItems: 'center',
        flex: 1
    },
    labelContainer :{
        justifyContent: 'center',
        flexDirection:'row'
    }
});
