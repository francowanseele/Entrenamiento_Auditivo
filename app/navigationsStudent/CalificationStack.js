import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Calification from '../screens/Student/Calification';
import CalificationCourses from '../screens/Student/CalificationCourses';
import { TOPSCREENHOME, TEXTHOME } from '../styles/styleValues';
const Stack = createStackNavigator();

export default function () {
    return (
        <Stack.Navigator>
           <Stack.Screen
                name="calification_courses"
                component={CalificationCourses}
                options={{
                    title: 'Calificaciones' ,
                    headerStyle: {
                      backgroundColor: TOPSCREENHOME,
                    },
                    headerTintColor: TEXTHOME,
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }} 
            />
            <Stack.Screen
                name="Calification"
                component={Calification}
                options={{
                    title: ' Modulos' ,
                    headerStyle: {
                      backgroundColor: TOPSCREENHOME,
                    },
                    headerTintColor: TEXTHOME,
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }} 
            />
        </Stack.Navigator>
    );
}
