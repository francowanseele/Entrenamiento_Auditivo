import React, { useState, useEffect } from 'react';
import {
    getStorageIsLogged,
    getStorageIsStudent,
} from '../../../utils/asyncStorageManagement';
import UserGuest from './UserGuest';
import Navigation from '../../navigationsStudent/Navigation';
import NavigationProf from '../../navigationsProf/Navigation';
import Loading from '../../components/Loading';


export default function Start() {
    const [login, setLogin] = useState(false);
    const [isStudent, setIsStudent] = useState(null);
   
    useEffect(() => {
        getStorageIsLogged().then((isLogged) => {
            // setLogin(isLogged);
        });
        getStorageIsStudent().then((isStudent_storage) => {
            setIsStudent(isStudent_storage);
        });

    }, []);

    if (login === null) return <Loading isVisible={true} text="Cargando" />;

  
    return !login? (
        <UserGuest setLogin={setLogin} setIsStudent={setIsStudent}  />
    ) : isStudent ? (
        <Navigation setLogin={setLogin} />
    ) : (
        <NavigationProf setLogin={setLogin} />
    );
   
}
