export const numberWithCommas = (number) => {
    if (!number) {
        return 0;
    }
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const roundingNumber = (number, nofNumAfterDot = 2) => {
    if(!number) {
        return 0;
    }


    return Math.round(number * 10) / 10;
}

export const convertBMI2Text = (bmi) => {
    if (bmi < 16)
        return 'Gầy độ 3';
    else if (bmi < 17)
        return 'Gầy độ 2';
    else if (bmi < 18.5)
        return 'Gầy độ 1';
    else if (bmi < 25)
        return 'Bình thường';
    else if (bmi < 30)
        return 'Tiền béo phì';
    else if (bmi < 35)
        return 'Béo phì độ 1';
    else if (bmi < 40)
        return 'Béo phì độ 2';
    else
        return 'Béo phì độ 3';
}

export const isPositiveNumber = (value) => {
    try {
        const num = Number(value);
        return num > 0 ? true : false;
    }
    catch {
        return false;
    }
}