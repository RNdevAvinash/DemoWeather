import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import LottieView from 'lottie-react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllWeather } from '../redux'

const API = 'e6b29ddc286dbe32bbe1f001d81d6ed4'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function WeatherForcast({ navigation, route }) {
    const [weatherData, setWeatherData] = useState(null)
    const [currentWeather, setCurrentWeather] = useState(null)
    const [loading, setLoading] = useState(true)
    const Weather = useSelector(state => state.AllWeather.weather) ?? null;

    const dispatch = useDispatch()


    useEffect(() => {
        Geolocation.getCurrentPosition(info => {
            dispatch(fetchAllWeather(`/onecall?lat=${info.coords.latitude}&lon=${info.coords.longitude}&units=metric&
            exclude=hourly&appid=${API}`))
        })
    }, [])

    useEffect(() => {
        setLoading(true)
        if (Weather != null) {
            setCurrentWeather(Weather[0].current)
            let temp = [];
            Weather[0].daily.forEach((item, index) => {
                if (Number(index) > 1 && Number(index) < 7) {
                    temp.push(item)
                } else {
                    console.log(JSON.stringify(item) + ' +  ' + index)
                }
            });
            setWeatherData(temp)
            console.log(JSON.stringify(weatherData))
            setLoading(false)
        } else {
            setTimeout(() => {
                setLoading(false)
            }, 10000);
        }
    }, [Weather])

    const _getWeatherReport = () => {
        setLoading(true)
        Geolocation.getCurrentPosition(info => {
            dispatch(fetchAllWeather(`/onecall?lat=${info.coords.latitude}&lon=${info.coords.longitude}&units=metric&
                exclude=hourly&appid=${API}`));
        })
        setLoading(false)
    }
    const todayDay = (i) => {
        var today = new Date();
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var day = (today.getDay()) + Number(i)
        if (day > 6) {
            var dayName = days[Math.abs(7 - day)];
            console.log(dayName)
            return dayName
        } else {
            var dayName = days[day];
            console.log(dayName)
            return dayName
        }
    }


    const _renderTodayWeather = () => {
        return (
            <View style={{ height: windowHeight / 2, width: windowWidth, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', borderBottomColor: 'grey', borderBottomWidth: 1 }}>
                {currentWeather.length != 0 ?
                    <View style={{ alignSelf: 'center', justifyContent: 'space-between', alignItems: 'center', height: '30%' }}>
                        <Text style={{ fontSize: 25 }}>{todayDay(0)}</Text>
                        <Text style={{ fontSize: 32, fontWeight: '600' }}>
                            {currentWeather.temp + '\xB0C'}
                        </Text>
                        <Text style={{ fontSize: 25 }}>Delhi</Text>
                    </View> : null}
            </View>
        )
    }

    const _renderWeather = (item, index) => {
        console.log(index)
        return (
            <View style={{ width: '100%', alignSelf: 'center', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: 'grey' }}>
                <View style={{ flexDirection: 'row', width: '90%', height: (windowHeight / 13), justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center' }}>
                    <Text>{todayDay(index + 1)}</Text>
                    <Text>{item.temp.min}</Text>
                </View>
            </View>
        )
    }

    return (
        <>
            <StatusBar backgroundColor="blue" barStyle="dark-content" />
            <SafeAreaView style={{ flex: 0, backgroundColor: "#FFFFFF" }} />
            <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
                <View style={{ height: '100%', width: windowWidth, alignSelf: 'center' }}>
                    {
                        weatherData != null ?
                            <FlatList
                                data={weatherData}
                                extraData={weatherData}
                                ListHeaderComponent={_renderTodayWeather}
                                renderItem={({ item, index }) => _renderWeather(item, index)}
                                keyExtractor={(item, index) => index.toString()}
                                showsVerticalScrollIndicator={false}
                            /> :
                            (loading == true ?
                                <LottieView source={require('../components/splashy-loader.json')} autoPlay loop />
                                :
                                <View style={{ flex: 1, width: windowWidth - 30, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                                    <Text style={{ fontSize: 60, fontWeight: '400', textAlign: 'left' }}>
                                        Something Went Wrong at our End
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => _getWeatherReport()}
                                        style={{ alignItems: 'center', marginTop: 70, justifyContent: 'center', width: 100, height: 40, borderWidth: 1, borderColor: 'black' }}>
                                        <Text>
                                            RETRY
                                 </Text>
                                    </TouchableOpacity>
                                </View>
                            )
                    }
                </View>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: 'white',
        flex: 1
    },

});

