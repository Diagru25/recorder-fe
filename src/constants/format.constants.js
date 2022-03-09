import moment from 'moment';

export const MOMENT_DATE_FORMAT = 'DD/MM/YYYY'

export const CUSTOM_DATE_RANGES = [
    {
        label: '7 ngày qua',
        value: [
            new Date(moment().subtract(7, 'days')), new Date(moment())
        ]
    },
    {
        label: '30 ngày qua',
        value: [
            new Date(moment().subtract(1, 'months')),
            new Date(moment())
        ]
    },
    {
        label: 'Tháng trước',
        value: [
            new Date(moment().subtract(1, 'months').startOf('month')),
            new Date(moment().startOf('month').subtract(1, 'days'))
        ]
    },
    {
        label: 'Năm nay',
        value: [
            new Date(moment().startOf('year')),
            new Date(moment())
        ]
    },
]

export const GENDER = {
    MALE: '0',
    FEMALE: '1'
}

export const AREA = {
    NORTH: "Bắc",
    CENTRAL: "Trung",
    SOUTH: "Nam",
}

export const AGE = {
    AGE_UNDER: 'Dưới 20',
    AGE_2X: '20 - 29',
    AGE_3X: '30 - 39',
    AGE_4X: '40 - 49',
    AGE_5X: '50 - 59',
    AGE_6X: '60 - 69',
    AGE_7X: '70 - 79',
    AGE_8X: '80 - 89',
    AGE_9X: '90 - 99',
    AGE_UPPER: 'Trên 99'
}