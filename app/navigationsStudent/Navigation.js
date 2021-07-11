import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Button, Text, ScrollView } from 'react-native';
import {TABSCREENHOME, TOPSCREENHOME} from '../styles/styleValues';
import HomeStack from './HomeStack';
import CalificationStack from './CalificationStack';
import ProfileStack from './ProfileStack';

const Tab = createBottomTabNavigator();

export default function Navigation(props) {
    const { setLogin } = props;
    // una posibilidad es hacer un useContext para tener la funcion setLogin ahí
    // y accederla cuando se cierra sesión

    return (
        
            <NavigationContainer >
                <View  style={{height:'100%'}}>
                <Tab.Navigator   initialRouteName="home" 
                    tabBarOptions={{
                        style:{ backgroundColor:TABSCREENHOME, 
                                height:'7%'                               
                            },
                        headerTintColor:{
                            fontSize:20,
                            fontWeight:'bold',
                            color: TOPSCREENHOME
                        }
                    }}
                    >
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
                </View>
            </NavigationContainer>
        
    );
}

const styles = StyleSheet.create({
    tabscreen:{
        backgroundColor:TABSCREENHOME,
        height:'10%',
    }
});