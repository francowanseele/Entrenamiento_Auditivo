import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Button, Text, ScrollView } from 'react-native';
import {TABSCREENHOME, TOPSCREENHOME,TEXTHOME} from '../styles/styleValues';
import HomeStack from './HomeStack';
import CalificationStack from './CalificationStack';
import ProfileStack from './ProfileStack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialIcons,FontAwesome   } from '@expo/vector-icons';

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
                                height:'8%',
                                color: TOPSCREENHOME                                   
                            },
                        headerTintColor:{
                            fontSize:20,
                            fontWeight:'bold',
                            color: TOPSCREENHOME
                        },
                        labelStyle: {
                            fontSize: 0.1,
                            color: TEXTHOME,
                            fontWeight:'bold',
                            paddingBottom: 10
                            // fontFamily: 'bold',
                          },
                    }}
                    >
                    <Tab.Screen                        
                        name=" " 
                        component={HomeStack}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                              <MaterialCommunityIcons name="home" color={TEXTHOME} size={size} />
                            ),
                          }}    
                    />
                    <Tab.Screen
                        name="  "
                        component={CalificationStack}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <FontAwesome name="pencil-square-o" size={24} color={TEXTHOME} />
                            ),
                          }}    
                    />
                    <Tab.Screen                        
                        name="   "
                        component={ProfileStack}
                        options={{ 
                            tabBarIcon: ({ color, size }) => (
                                <MaterialIcons name="account-circle" size={24} color={TEXTHOME} />
                            ),
                          }}                    
                    />
                </Tab.Navigator>
                </View>
            </NavigationContainer>
        
    );
}

const styles = StyleSheet.create({
    tabscreen:{
        backgroundColor:TABSCREENHOME,
    }
});