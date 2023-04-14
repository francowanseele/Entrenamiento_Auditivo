import React, { useRef } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileProf from '../screens/Teacher/ProfileProf';
import { TOPSCREENHOME } from '../styles/styleValues';
import Settings from '../components/BottomSheetProfile/Settings';
import { Icon } from 'react-native-elements';

const Stack = createStackNavigator();

export default function (props) {
    const { setLogin } = props;
    const refRBSheet_Settings = useRef();

    return (
        <>
            <Stack.Navigator>
                <Stack.Screen
                    name="profileprof"
                    options={{
                        title: 'Perfil Docente',
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
                    children={() => <ProfileProf setLogin={setLogin} />}
                />
            </Stack.Navigator>
            <Settings refRBSheet={refRBSheet_Settings} setLogin={setLogin} />
        </>
    );
}
