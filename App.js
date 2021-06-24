import React from 'react';
import Navigation from './app/navigationsStudent/Navigation';
import NavigationProf from './app/navigationsProf/Navigation';
import Start from './app/screens/Login/Start';

export default function App() {
    // TODO
    // Si inició como estudiante renderizo navigationsStudent/Navigation
    // Si inició como docente renderizo navigation DOCENTE

    return <Start />;
    //return <Navigation />;
    // return <NavigationProf />;
}
