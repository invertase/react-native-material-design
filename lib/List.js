import React, {Component, PropTypes} from "react";
import {StyleSheet, View, Text, TouchableWithoutFeedback} from "react-native";
import { TYPO } from './config';
import Theme from '../../../resources/Theme';

export default class List extends Component {

    static propTypes = {
        primaryText: PropTypes.string.isRequired,
        secondaryText: PropTypes.string,
        secondaryTextOnTop: PropTypes.bool,
        captionText: PropTypes.string,
        secondaryTextMoreLine: PropTypes.arrayOf(PropTypes.shape({
            key: PropTypes.oneOfType(PropTypes.number, PropTypes.string),
            text: PropTypes.string.isRequired,
            style: PropTypes.object
        })),
        leftIcon: PropTypes.element,
        rightIcon: PropTypes.element,
        leftAvatar: PropTypes.element,
        rightAvatar: PropTypes.element,
        rightAvatarStyle: PropTypes.object,
        lines: PropTypes.number,
        primaryColor: PropTypes.string,
        onPress: PropTypes.func,
        onLeftIconClick: PropTypes.func,
        onRightIconClick: PropTypes.func
    };

    static defaultProps = {
        lines: 1,
        primaryColor: 'rgba(0,0,0,.87)'
    };

    render() {
        const {
            secondaryTextOnTop,
            leftIcon,
            leftAvatar,
            rightAvatar,
            rightAvatarStyle,
            rightIcon,
            lines,
            onPress,
            primaryColor,
            onLeftIconClicked,
            onRightIconClicked,
            secondaryTextMoreLine,
            captionText
        } = this.props;

        let {
          primaryText,
          secondaryText,
        } = this.props;

        // This is a bit of a hack to support putting the primary text line in the middle and the
        // secondary text line on top, by swapping the text strings and overriding the styles to make the
        // middle (normally secondary) text larger and darker, and the top (normally primary) text
        // smaller and lighter.
        const styleOverrides = {
          primaryText: {},
          secondaryText: {},
          secondaryTextContainer: {},
        };
        if (secondaryTextOnTop) {
          const savedPrimaryText = primaryText;
          primaryText = secondaryText;
          secondaryText = savedPrimaryText;
          styleOverrides.primaryText = {...Theme.font(14), color: '#808285', lineHeight: 18, height: 24, paddingTop: 6};
          styleOverrides.secondaryText = {...Theme.font(17), color: '#4D4D4F', lineHeight: 22, height: 22};
          styleOverrides.secondaryTextContainer = {height: 24};
        }
        return (
                <View style={[styles.listContainer, { height: lines > 2 ? ((lines -1) * 16 + 56) : (secondaryText ? 72 : (leftAvatar || rightAvatar ) ? 56 : 48) }]}>
                    {leftIcon &&
                        <TouchableWithoutFeedback onPress={onLeftIconClicked}>
                            <View style={[styles.leftIcon, lines > 2 && { paddingTop: 16, alignSelf: 'flex-start' }]}>
                                {leftIcon}
                            </View>
                        </TouchableWithoutFeedback>
                    }
                    {leftAvatar &&
                        <View style={[styles.leftAvatar, lines > 2 && { paddingTop: 16, alignSelf: 'flex-start' }]}>
                            {leftAvatar}
                        </View>
                    }
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <View style={styles.firstLine}>
                            <View style={styles.primaryTextContainer}>
                                <Text numberOfLines={1} style={[styles.primaryText, { color: primaryColor, ...Theme.font(14), ...styleOverrides.primaryText } ]}>
                                    {primaryText}
                                </Text>
                            </View>
                            {(lines > 2 && !!rightIcon) ||
                                <View style={styles.captionTextContainer}>
                                    <Text style={styles.captionText}>
                                        {captionText}
                                    </Text>
                                </View>
                            }
                        </View>
                        {secondaryText &&
                            <View style={StyleSheet.flatten([styles.secondaryTextContainer, styleOverrides.secondaryTextContainer])}>
                                <Text style={[styles.secondaryText, lines > 2 && { height: 22 * (lines - 1) -4 }, styleOverrides.secondaryText]}>
                                    {secondaryText}
                                </Text>
                            </View>
                        }
                        {secondaryTextMoreLine &&
                            <View style={[{ height:18 }, lines > 2 && { height: 22 * (lines - 1) - 4 }]}>
                                {secondaryTextMoreLine.map((line, index) => (
                                    <Text key={line.key || index} style={[styles.secondaryText, { height: 22 }, line.style]}>
                                        {line.text}
                                    </Text>
                                ))}
                            </View>
                        }
                    </View>

                    {rightAvatar &&
                        <View
                            style={[rightAvatarStyle || styles.rightAvatar, lines > 2 && {
                                paddingTop: 16,
                                alignSelf: 'flex-start'
                            }]}
                        >
                            {rightAvatar}
                        </View>
                    }
                    <View style={{ flexDirection: 'column' }}>
                        {lines > 2 && !!rightIcon && !!captionText &&
                            <View style={styles.captionTextContainer2}>
                                <Text>{captionText}</Text>
                            </View>}

                        {rightIcon &&
                            <Ripple onPress={onRightIconClicked}>
                                <View
                                    style={[styles.rightIcon, { flex: 1 },lines > 2 && {
                                        paddingTop: 16,
                                        alignSelf: 'flex-end',
                                        justifyContent:'flex-end'
                                    }]}
                                    onPress={onRightIconClicked}
                                >
                                    {rightIcon}
                                </View>
                            </Ripple>
                        }
                    </View>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    listContainer: {
        flexDirection: 'row',
        paddingLeft: 16,
        paddingRight: 16,
        height: 48,
        alignItems: 'center'
    },
    leftIcon: {
        width: 56,
        position: 'relative',
        top: -6
    },
    rightIcon: {
        paddingLeft: 16,
        position: 'relative',
        top: -3,
        left: -8
    },
    leftAvatar: {
        width: 56
    },
    rightAvatar: {
        width: 56
    },
    primaryText: Object.assign({}, TYPO.paperFontSubhead, { lineHeight: 24 }),
    secondaryTextContainer: {
      height:18,
    },
    secondaryText: Object.assign({}, TYPO.paperFontBody1, {
        lineHeight: 22,
        color: 'rgba(0,0,0,.54)',
        ...Theme.font(14),
    }),
    firstLine: {
        flexDirection: 'row'
    },
    primaryTextContainer: {
        flex: 1,
        paddingRight: 16
    },
    captionTextContainer: {
        alignSelf: 'flex-start',
        alignItems: 'flex-start'
    },
    captionText: Object.assign({}, TYPO.paperFontCaption),
    captionTextContainer2: {
        alignSelf: 'flex-end',
        alignItems: 'flex-end'
    }
});
