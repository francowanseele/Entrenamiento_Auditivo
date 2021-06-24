import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStack from './HomeStack';
import CalificationStack from './CalificationStack';
import ProfileStack from './ProfileStack';

const Tab = createBottomTabNavigator();

export default function Navigation(props) {
    const { setLogin } = props;
    // una posibilidad es hacer un useContext para tener la funcion setLogin ahí
    // y accederla cuando se cierra sesión

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
