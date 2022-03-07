import * as yup from 'yup';

const REGEX_PHONE_NUMBER = /^0?(2|[35789])[0-9]{8}$|^02[48][0-9]{8}$/;
const REGEX_ONLY_NUMBER = /^\d+$/;
const REGEX_EMAIL = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

yup.addMethod(yup.string, 'phoneNumber', function (message = 'Số điện thoại không chính xác') {
    return this.matches(REGEX_PHONE_NUMBER, {
        message,
        excludeEmptyString: true
    })
});

yup.addMethod(yup.string, 'onlyNumber', function (message = 'Trường này chỉ được nhập số') {
    return this.matches(REGEX_ONLY_NUMBER, {
        message,
        excludeEmptyString: true
    })
});

yup.addMethod(yup.string, 'email', function (message = 'email không chính xác') {
    return this.matches(REGEX_EMAIL, {
        message,
        excludeEmptyString: true
    })
});

export default yup;