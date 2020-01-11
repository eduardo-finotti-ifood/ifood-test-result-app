import React from 'react';
import { SafeAreaView, Text, StatusBar } from 'react-native';

import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
} from 'react-navigation-tabs';

import {
  createAppContainer,
} from 'react-navigation';

import Daily from './pages/Login';
import Hourly from './pages/Dashboard';
import Crashes from './pages/Dashboard';

function SafeAreaMaterialTopTabBar(props) {
  
  return (
    
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      {/* <Text>Oi</Text> */}
      <MaterialTopTabBar {...props} />
    </SafeAreaView>
  );
}

const mainNavigation = createMaterialTopTabNavigator(
  {
    Daily,
    Hourly,
    Crashes,
  },
  {
    tabBarComponent: SafeAreaMaterialTopTabBar,
    tabBarOptions: {

      indicatorStyle: {
        backgroundColor: '#EA2828',
        height: 43
      },

      activeTintColor: 'white',
      pressColor: 'white',
      
      style: {
        backgroundColor: '#FF5E5E',
        height: 43,
      },    

      pressOpacity: 50,
      scrollEnabled: 5,
      
    },
    
  },
);

export default createAppContainer(mainNavigation);