import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../pages/Home';
import Location from '../pages/Location';

const Stack = createStackNavigator();

const NavContainer = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Location" component={Location} />
        </Stack.Navigator>
    );
};

export default NavContainer;

const styles = StyleSheet.create({});
