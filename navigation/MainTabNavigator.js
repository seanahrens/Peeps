import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import AddScreen from '../screens/AddScreen';
import BrowseScreen from '../screens/BrowseScreen';
import ProfileScreen from '../screens/ProfileScreen';
import UpdateScreen from '../screens/UpdateScreen';

const HomeStack = createStackNavigator({
  Home: AddScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Add',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
    />
  ),
};

const BrowseStack = createStackNavigator({
  Browse: BrowseScreen,
  Profile: ProfileScreen,
});

BrowseStack.navigationOptions = {
  tabBarLabel: 'Browse',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-contacts${focused ? '' : '-outline'}`
          : 'md-contacts'
      }
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: UpdateScreen,
  Profile: ProfileScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Recent',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-albums' : 'md-albums'}
    />
  ),
};

export default createBottomTabNavigator({
  BrowseStack,
  HomeStack,
  SettingsStack,
});
