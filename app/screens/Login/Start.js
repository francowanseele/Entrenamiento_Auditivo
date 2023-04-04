import React, { useState, useEffect } from 'react';
import {
    getStorageIsLogged,
    getStorageIsStudent,
} from '../../../utils/asyncStorageManagement';
import UserGuest from './UserGuest';
import Navigation from '../../navigationsStudent/Navigation';
import NavigationProf from '../../navigationsProf/Navigation';
import VersionCheck from 'react-native-version-check';
import { needUpdateApi } from '../../api/versionCheckLocal';
import MustToUpdate from '../../components/MustToUpdate';

export default function Start() {
    const [login, setLogin] = useState(false);
    const [isStudent, setIsStudent] = useState(null);
    const [needUpdate, setNeedUpdate] = useState(false);

    useEffect(() => {
        getStorageIsLogged().then((isLogged) => {
            setLogin(isLogged);
        });
        getStorageIsStudent().then((isStudent_storage) => {
            setIsStudent(isStudent_storage);
        });
    }, [login]);

    Promise.all([VersionCheck.needUpdate({ depth: 2 }), needUpdateApi()]).then(
        (values) => {
            const resVersionCheck = values[0];
            const resVersionCheckLocal = values[1];

            if (resVersionCheckLocal.ok && resVersionCheckLocal.isNeeded) {
                if (resVersionCheck.isNeeded) {
                    setNeedUpdate(true);
                }
            }
        }
    );

    if (needUpdate) {
        return <MustToUpdate />;
    } else {
        return !login ? (
            <UserGuest setLogin={setLogin} setIsStudent={setIsStudent} />
        ) : isStudent ? (
            <Navigation setLogin={setLogin} />
        ) : (
            <NavigationProf setLogin={setLogin} />
        );
    }

}
