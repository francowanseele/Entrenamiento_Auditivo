import { basePath } from './config';

export function playSoundApi() {
    const url = `${basePath}/play-sound`;

    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    return fetch(url, params)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            return result;
        });
}
