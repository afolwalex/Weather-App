import {StyleSheet, SafeAreaView, Text, View, StatusBar} from 'react-native';
import React from 'react';
import NavContainer from './src/navigation/NavContainer';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
    return (
        <>
            <SafeAreaView
                style={{
                    flex: 0,
                    backgroundColor: '#FFFFFF',
                }}
            />
            <SafeAreaView
                style={[
                    styles.container,
                    {
                        backgroundColor: '#FFFFFF',
                    },
                ]}>
                <NavigationContainer>
                    <NavContainer />
                </NavigationContainer>
            </SafeAreaView>
        </>
    );
};

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
});
