import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screens/Student/Profile';
import {TOPSCREENHOME} from  '../styles/styleValues';

const Stack = createStackNavigator();

export default function () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="profile"
                component={Profile}
                options={{
                    title: 'Perfil' ,
                    headerStyle: {
                      backgroundColor: TOPSCREENHOME,
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
