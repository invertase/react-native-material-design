import React, {Component} from "react";
import PropTypes from "prop-types";
import {View, Text, TouchableNativeFeedback} from "react-native";
import Icon from '../Icon';
import Ripple from '../polyfill/Ripple';
import { TYPO } from '../config';
import { isCompatible } from '../helpers';

export default class Section extends Component {

    static propTypes = {
        title: PropTypes.string,
        items: PropTypes.arrayOf(PropTypes.shape({
            icon: PropTypes.string,
            value: PropTypes.string.isRequired,
            label: PropTypes.string,
            onPress: PropTypes.func,
            onLongPress: PropTypes.func,
            active: PropTypes.bool,
            disabled: PropTypes.bool
        }))
    };

    renderRow = (item, index, color) => {
        return (
            <View
                key={index}
                style={styles.item}
            >
                {item.icon &&
                    <Icon
                        name={item.icon}
                        color={color}
                        size={22}
                        style={styles.icon}
                    />
                }
                <View style={styles.value}>
                    <Text style={[TYPO.paperFontBody2, { color }]}>
                        {item.value}
                    </Text>
                </View>
                {item.label &&
                    <View style={styles.label}>
                        <Text style={[TYPO.paperFontBody2, { color }]}>
                            {item.label}
                        </Text>
                    </View>
                }
            </View>
        );
    };

    render() {
        const { theme, title, items } = this.props;

        const textStyleMap = {
            light: {
                'default': 'rgba(0,0,0,.87)',
                disabled: 'rgba(0,0,0,.38)'
            },
            dark: {
                'default': '#ffffff',
                disabled: 'rgba(255,255,255,.30)'
            }
        };

        const subheaderStyleMap = {
            light: 'rgba(0,0,0,.54)',
            dark: 'rgba(255,255,255,.70)',
        };

        const activeStyleMap = {
            light: '#f5f5f5',
            dark: '#212121',
        };

        const TEXT_COLOR = textStyleMap[theme]['default'];
        const SUB_TEXT_COLOR = subheaderStyleMap[theme];
        const ACTIVE_COLOR = activeStyleMap[theme];

        return (
            <View style={styles.section}>
                {title &&
                    <View style={[styles.subheader, styles.item]}>
                        <Text style={[TYPO.paperFontBody2, { color: SUB_TEXT_COLOR }]}>
                            {title}
                        </Text>
                    </View>
                }
                {items && items.map((item, i) => {
                    if (item.disabled) {
                        return this.renderRow(item, i, textStyleMap[theme]['disabled']);
                    }

                    if (!isCompatible('TouchableNativeFeedback')) {
                        return (
                            <Ripple
                                key={i}
                                rippleColor="rgba(153,153,153,.4)"
                                onPress={item.onPress}
                                onLongPress={item.onLongPress}
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    backgroundColor: item.active ? ACTIVE_COLOR : null
                                }}
                            >
                                {this.renderRow(item, i, TEXT_COLOR)}
                            </Ripple>
                        );
                    }

                    return (
                        <TouchableNativeFeedback
                            key={i}
                            background={TouchableNativeFeedback.Ripple('rgba(153,153,153,.4)')}
                            onPress={item.onPress}
                            onLongPress={item.onLongPress}
                        >
                            <View style={item.active ? { backgroundColor: ACTIVE_COLOR } : {}}>
                                {this.renderRow(item, i, TEXT_COLOR)}
                            </View>
                        </TouchableNativeFeedback>
                    );
                })}
            </View>
        );
    }
}

const styles = {
    section: {
        marginTop: 8,
        flexWrap: 'wrap',
        justifyContent:'flex-start'
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        paddingLeft: 16,
        flexWrap: 'wrap'
    },
    subheader: {
        flex: 1,
        flexWrap: 'wrap',
        justifyContent:'flex-start'
    },
    icon: {
        position: 'absolute',
        top: 13
    },
    value: {
        flex: 1,
        paddingLeft: 56,
        top: 2
    },
    label: {
        paddingRight: 16,
        top: 2
    }
};
