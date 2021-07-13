import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileProf from '../screens/Teacher/ProfileProf';

const Stack = createStackNavigator();

export default function () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="profileprof"
                component={ProfileProf}
                options={{ 
                title: 'Perfil Docente',
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
