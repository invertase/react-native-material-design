import React, {Component} from "react";
import PropTypes from "prop-types";
import {ScrollView} from "react-native";
import { THEME_NAME, PRIMARY_COLORS } from '../config';
import { getColor } from '../helpers';

import Header from './Header';
import Section from './Section';

export default class Drawer extends Component {

    static propTypes = {
        theme: PropTypes.oneOf(THEME_NAME),
        primary: PropTypes.oneOf(PRIMARY_COLORS),
        overrides: PropTypes.shape({
            backgroundColor: PropTypes.string
        }),
        children: PropTypes.node.isRequired
    };

    static defaultProps = {
        theme: 'light',
        primary: 'paperGrey'
    };

    static Header = Header;

    static Section = Section;

    render() {
        const { theme, overrides, children } = this.props;

        const backgroundColorMap = {
            light: '#ffffff',
            dark: '#333333'
        };

        const backgroundColor = (() => {
            if (overrides && overrides.backgroundColor) {
                return getColor(overrides.backgroundColor);
            }
            return backgroundColorMap[theme];
        })();

        return (
            <ScrollView style={[styles.container, { backgroundColor: backgroundColor }]}>
                {React.Children.map(children, (child) => {
                    return React.cloneElement(child, {
                        theme
                    });
                })}
            </ScrollView>
        );
    }

}

const styles = {
    container: {
        flex: 1
    }
};
