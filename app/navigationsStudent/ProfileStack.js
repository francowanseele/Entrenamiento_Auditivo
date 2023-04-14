import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screens/Student/Profile';
import { TEXTHOME, TOPSCREENHOME } from '../styles/styleValues';
import { Button, Icon } from 'react-native-elements';
import Settings from '../components/BottomSheetProfile/Settings';
import { useRef } from 'react';

const Stack = createStackNavigator();

export default function (props) {
    const { setLogin } = props;
    const refRBSheet_Settings = useRef();

    return (
        <>
            <Stack.Navigator>
                <Stack.Screen
                    name="profile"
                    // component={Profile}
                    options={{
                        title: 'Perfil Estudiante',
                        headerTitleStyle: {
                            fontSize: 20,
                            fontWeight: 'bold',
                        },
                        headerRight: () => (
                            <Icon
                                type="material-community"
                                name="cog"
                                containerStyle={{ marginRight: 10 }}
                                onPress={() => refRBSheet_Settings.current.open()}
                            />
                        ),
                    }}
                    children={() => <Profile setLogin={setLogin} />}
                />
            </Stack.Navigator>
            <Settings refRBSheet={refRBSheet_Settings} setLogin={setLogin} />
        </>
    );
}
