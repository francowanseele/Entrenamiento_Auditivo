import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CalificationStack from './CalificationProfStack';
import ProfileStack from './ProfileProfStack';
import DictationStack from './DictationProfStack';
import CreateDictationStack from './CreateDictationProfStack';
import { Icon } from 'react-native-elements';
import { PRIMARY_COLOR } from '../../utils/colorPalette';

const Tab = createBottomTabNavigator();

export default function Navigation(props) {
    const { setLogin } = props;

    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="home" tabBarOptions={{}}>
                <Tab.Screen
                    name="dictation"
                    tabBarOptions={{}}
                    component={DictationStack}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon
                                name="book-music"
                                type="material-community"
                                color={PRIMARY_COLOR}
                            />
                        ),
                        tabBarLabel: () => {
                            return null;
                        },
                    }}
                />
                <Tab.Screen
                    name="createDictation"
                    component={CreateDictationStack}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon
                                name="music-note-plus"
                                type="material-community"
                                color={PRIMARY_COLOR}
                            />
                        ),
                        tabBarLabel: () => {
                            return null;
                        },
                    }}
                />
                <Tab.Screen
                    name="calification"
                    component={CalificationStack}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon
                                name="school"
                                type="material-community"
                                color={PRIMARY_COLOR}
                            />
                        ),
                        tabBarLabel: () => {
                            return null;
                        },
                    }}
                />
                <Tab.Screen
                    name="profile"
                    // component={ProfileStack}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon
                                name="account-circle"
                                type="material-community"
                                color={PRIMARY_COLOR}
                            />
                        ),
                        tabBarLabel: () => {
                            return null;
                        },
                    }}
                    children={() => <ProfileStack setLogin={setLogin} />}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
