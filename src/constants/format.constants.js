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

export const STANDARD_TYPE = {
    ST: "Chuẩn",
    UP_ST_ONE: "Trên chuẩn độ 1",
    UP_ST_TWO: "Trên chuẩn độ 2",
    UP_ST_THREE: "Trên chuẩn độ 3",
    LOW_ST_ONE: "Dưới chuẩn độ 1",
    LOW_ST_TWO: "Dưới chuẩn độ 2",
    LOW_ST_THREE: "Dưới chuẩn độ 3"
}