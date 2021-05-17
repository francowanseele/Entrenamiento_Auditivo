import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Icon } from 'react-native-elements';

import HomeStack from './HomeStack';
import CalificationStack from './CalificationStack';
import ProfileStack from './ProfileStack';

const Tab = createBottomTabNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="profile" tabBarOptions={{}}>
                <Tab.Screen
                    name="home"
                    component={HomeStack}
                    options={{ title: 'Home' }}
                />
                <Tab.Screen
                    name="calification"
                    component={CalificationStack}
                    options={{ title: 'Calificaciones' }}
                />
                <Tab.Screen
                    name="profile"
                    component={ProfileStack}
                    options={{ title: 'Perfil' }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
