import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeProfStack';
import CalificationStack from './CalificationProfStack';
import ProfileStack from './ProfileProfStack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="home" tabBarOptions={{}}>
                <Tab.Screen
                    name="home"
                    component={HomeStack}
                    // options={{ title: 'Inicio' }}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color, size }) => (
                          <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),
                      }}                  
                />
                <Tab.Screen
                    name="calification"
                    component={CalificationStack}
                    options={{ title: 'clasi' }}
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
