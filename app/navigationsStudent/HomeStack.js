import React from 'react';
import {StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Student/Home';
import Dictation from '../screens/Student/Dictation';
import Solution from '../screens/Student/Solution';
import ConfigDictation from '../screens/Student/ConfigDictation';
import {TOPSCREEN, BOTTOMSCREEN, TOPSCREENHOME } from '../styles/styleValues';

const Stack = createStackNavigator();

const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

export default function () {
    return (
        <Stack.Navigator >
            <Stack.Screen
                name="home"
                component={Home}
                options={{
                    title: 'Curso XX',
                    headerStyle: {
                      backgroundColor: TOPSCREENHOME,
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }} 
            />
            <Stack.Screen
                name="config_dictation"
                component={ConfigDictation}
                options={{
                    title: 'Configuración dictado XX' ,
                    headerStyle: {
                      backgroundColor: TOPSCREENHOME,
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }} 
            />
            <Stack.Screen
                name="dictation"
                component={Dictation}
                options={{
                    title: 'Dictado XX' ,
                    headerStyle: {
                      backgroundColor: TOPSCREENHOME,
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }} 
            />
            <Stack.Screen
                name="solution"
                component={Solution}
                options={{
                    title: 'Solucion' ,
                    headerStyle: {
                      backgroundColor: TOPSCREEN,
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }} 
            />
        </Stack.Navigator>
    );
}
const styles = StyleSheet.create({
   
});