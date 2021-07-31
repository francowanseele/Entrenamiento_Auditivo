import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CalificationStack from './CalificationProfStack';
import ProfileStack from './ProfileProfStack';
import DictationStack from './DictationProfStack';
import CreateDictationStack from './CreateDictationProfStack';

const Tab = createBottomTabNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="home" tabBarOptions={{}}>
                <Tab.Screen
                    name="dictation"
                    component={DictationStack}
                    options={{ title: 'Ver' }}
                />
                <Tab.Screen
                    name="createDictation"
                    component={CreateDictationStack}
                    options={{ title: 'Crear' }}
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
