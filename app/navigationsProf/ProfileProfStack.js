import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileProf from '../screens/Teacher/ProfileProf';
import { TOPSCREENHOME } from '../styles/styleValues';

const Stack = createStackNavigator();

export default function (props) {
    const { setLogin } = props;

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="profileprof"
                // component={ProfileProf}
                options={{
                    title: 'Perfil Docente',
                    // headerStyle: {
                    //     backgroundColor: TOPSCREENHOME,
                    // },
                    // headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontSize: 20,
                        fontWeight: 'bold',
                    },
                }}
                children={() => <ProfileProf setLogin={setLogin} />}
            />
        </Stack.Navigator>
    );
}
