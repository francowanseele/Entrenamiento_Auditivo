import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screens/Student/Profile';
import {TEXTHOME, TOPSCREENHOME} from  '../styles/styleValues';

const Stack = createStackNavigator();

export default function (props) {
    const { setLogin } = props;

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="profile"
                // component={Profile}
                options={{
                    title: 'Perfil Estudiante',
                    // headerStyle: {
                    //     backgroundColor: TOPSCREENHOME,
                    // },
                    // headerTintColor: TEXTHOME,
                    headerTitleStyle: {
                        fontSize: 20,
                        fontWeight: 'bold',
                    },
                }}
                children={() => <Profile setLogin={setLogin} />}
            />
        </Stack.Navigator>
    );
}
