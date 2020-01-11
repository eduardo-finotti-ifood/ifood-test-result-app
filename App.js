import React, { Component } from 'react';
import { SafeAreaView, Text, StyleSheet, ScrollView, Dimensions, View, Image, StatusBar } from 'react-native';

import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

import HomeScreen from './pages/HomeScreen';
import IOSDailyScreen from './pages/IOSDailyScreen';
import AndroidDailyScreen from './pages/AndroidDailyScreen';
import IOSHourlyScreen from './pages/IOSHourlyScreen';
import AndroidHourlyScreen from './pages/AndroidHourlyScreen';
import ifoodLogo from './assets/ifood.png'

const { width } = Dimensions.get('window')

const CustomDrawerComponents = (props) => (
  <SafeAreaView style={{flex:1}}>
    <View style={{height:120, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
      <Image source={ifoodLogo} style={{height:80, width:150, borderRadius: 5}} />
    </View>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
)

const AppDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: () => 
            ({
                title: 'Home'
            })},
  
  IOSDaily: {
    screen: IOSDailyScreen,
    navigationOptions: () => 
            ({
                title: 'Daily Run iOS'
            })},

  AndroidDaily: {
    screen: AndroidDailyScreen,
    navigationOptions: () => 
            ({
                title: 'Daily Run Android',
              })},
  IOSHourly: {
    screen: IOSHourlyScreen,
    navigationOptions: () => 
            ({
                title: 'Hourly Run iOS'
            })},
  AndroidHourly: {
    screen: AndroidHourlyScreen,
    navigationOptions: () => 
            ({
                title: 'Hourly Run Android'
            })},
}, 
{
  contentComponent: CustomDrawerComponents,
  drawerWidth: width/1.5,
  contentOptions: {
    activeTintColor: 'red'
  },
})

export default App = createAppContainer(AppDrawerNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})