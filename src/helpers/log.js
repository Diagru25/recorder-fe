export const log = (name, data = {}, type = 'UNKNOWN') => {
    if (process.env.NODE_ENV === 'production') return;
    console.info({ [name.toUpperCase()]: data, type });
};