import React, { Component, PropTypes, View, TouchableNativeFeedback } from 'react-native';
import { PRIMARY, PRIMARY_COLORS } from './config';
import Icon from './Icon';
import { getColor } from './helpers';

export default class FloatingActionButton extends Component {

    static propTypes = {
        primary: PropTypes.oneOf(PRIMARY_COLORS),
        onPress: PropTypes.func,
        onLongPress: PropTypes.func,
        mini: PropTypes.bool,
        iconName: PropTypes.string,
        iconColor: PropTypes.oneOf(PRIMARY_COLORS),
        iconStyles: PropTypes.object,
    };

    static defaultProps = {
        primary: PRIMARY,
        mini: false,
        iconStyles: {},
    };

    render() {
        const { primary, onPress, onLongPress, mini, iconName, iconColor, iconStyles } = this.props;

        const buttonBackground = { backgroundColor: getColor(primary) };
        const outerStyles = mini ? { borderRadius: 20, width: 40, height: 40 } : { borderRadius: 28, width: 56, height: 56 };

        return (
            <View style={styles.wrapper}>
                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple()}
                    onPress={onPress}
                    onLongPress={onLongPress}
                >
                    <View style={[
                        styles.initialStyles,
                        outerStyles,
                        buttonBackground,
                    ]}
                      elevation={5} >
                        <Icon
                          name={iconName}
                          color={iconColor}
                          style={iconStyles}
                        />
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    };
}

const styles = {
    wrapper: {
        position: 'absolute',
        bottom: 16,
        right: 16,
    },
    initialStyles: {
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    }
};
