import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStack from './HomeProfStack';
import CalificationStack from './CalificationProfStack';
import ProfileStack from './ProfileProfStack';

const Tab = createBottomTabNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="home" tabBarOptions={{}}>
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
