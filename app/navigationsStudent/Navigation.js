import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Button, Text, ScrollView } from 'react-native';
import {
    TABSCREENHOME,
    TOPSCREENHOME,
    TEXTHOME,
    TABSCREENHOMETEXT,
} from '../styles/styleValues';
import HomeStack from './HomeStack';
import CalificationStack from './CalificationStack';
import ProfileStack from './ProfileStack';
import {
    MaterialIcons,
    MaterialCommunityIcons,
    Foundation,
} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function Navigation(props) {
    const { setLogin } = props;

    return (
        <NavigationContainer>
            <View style={{ height: '100%' }}>
                <Tab.Navigator
                    initialRouteName="home"
                    tabBarOptions={{
                        style: {
                            backgroundColor: TABSCREENHOME,
                            height: '8%',
                            color: TOPSCREENHOME,
                        },
                        headerTintColor: {
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: TOPSCREENHOME,
                        },
                        labelStyle: {
                            fontSize: 0.1,
                            color: TEXTHOME,
                            fontWeight: 'bold',
                            paddingBottom: 10,
                            // fontFamily: 'bold',
                        },
                    }}
                >
                    <Tab.Screen
                        name="home"
                        component={HomeStack}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons
                                    name="music-note-eighth"
                                    size={24}
                                    color={TABSCREENHOMETEXT}
                                />
                            ),
                            tabBarLabel: () => {
                                return null;
                            },
                        }}
                    />
                    <Tab.Screen
                        name="calification"
                        component={CalificationStack}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <Foundation
                                    name="clipboard-notes"
                                    size={24}
                                    color={TABSCREENHOMETEXT}
                                />
                            ),
                            tabBarLabel: () => {
                                return null;
                            },
                        }}
                    />
                    <Tab.Screen
                        name="profile"
                        // component={ProfileStack}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <MaterialIcons
                                    name="account-circle"
                                    size={24}
                                    color={TABSCREENHOMETEXT}
                                />
                            ),
                            tabBarLabel: () => {
                                return null;
                            },
                        }}
                        children={() => <ProfileStack setLogin={setLogin} />}
                    />
                </Tab.Navigator>
            </View>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    tabscreen: {
        backgroundColor: TABSCREENHOME,
    },
});
