import { log } from './log';

export const clearLocalStorage = (key) => {
    try {
        return window.localStorage.removeItem(key);
    } catch (err) {
        log('localStorage write error', err);
    }
};

export const readLocalStorage = (key) => {
    try {
        const storedData = window.localStorage.getItem(key);

        if (storedData === null) {
            return null;
        }

        const { expires, value } = JSON.parse(storedData) || {};

        // If the value has expired, tidy up the item and return null
        if (expires && expires < Date.now()) {
            clearLocalStorage(key);
            return null;
        }

        return value;
    } catch (err) {
        log('localStorage read error', err);
        return null;
    }
};

export const writeLocalStorage = (key, value, expires = 0) => {
    try {
        const data = { value };
        if (expires) {
            data.expires = Date.now() + expires;
        }

        return window.localStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
        log('localStorage write error', err);
    }
};
