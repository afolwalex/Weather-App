import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

const Home = ({navigation}) => {
    const [location, setLocation] = useState({lng: 0, lat: 0});
    const [load, setLoad] = useState(false);
    const [weatherInfo, setWeatherInfo] = useState({});

    useEffect(() => {
        requestPermission();
    }, []);

    useEffect(() => {
        if (location.lat !== 0) {
            fetchWeather();
        }
    }, [location]);

    const requestPermission = () => {
        Geolocation.requestAuthorization('whenInUse')
            .then(() => getCurrentLocation())
            .catch(err => Alert.alert('Error', 'Permission Denied!'));
    };

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                const {latitude, longitude} = position.coords;
                setLocation({lat: latitude, lng: longitude});
            },
            error => {
                console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
    };

    const fetchWeather = async () => {
        try {
            setLoad(true);
            const {data} = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lng}&appid=e451f29d1ee172e606dc0d749bd8c6c5`,
            );
            setLoad(false);
            setWeatherInfo(data);
        } catch (err) {
            setLoad(false);
            console.log(err);
        }
    };

    return (
        <View style={{flex: 1, paddingVertical: 30, paddingHorizontal: 20}}>
            <View style={styles.cover}>
                <Text>Longitude:</Text>
                <Text>{location.lng}</Text>
            </View>
            <View style={styles.cover}>
                <Text>Latitude:</Text>
                <Text>{location.lat}</Text>
            </View>
            <Text style={{fontSize: 16, marginBottom: 20}}>
                Weather Information
            </Text>
            {load ? (
                <Text>Fetching...</Text>
            ) : (
                <>
                    <View style={styles.cover}>
                        <Text>Humidity:</Text>
                        <Text>{weatherInfo.main?.humidity}</Text>
                    </View>
                    <View style={styles.cover}>
                        <Text>Temperature:</Text>
                        <Text>{weatherInfo.main?.temp}</Text>
                    </View>
                </>
            )}

            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Location')}>
                <Text style={{color: 'blue'}}>Go to Location</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    cover: {
        flexDirection: 'row',
        marginBottom: 20,
    },
});
