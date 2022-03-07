import moment from "moment";
import { numberWithCommas, roundingNumber } from "./numberHelper";
import {STANDARD_TYPE} from '../constants/format.constants';

export const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

export const simulateDownloadImageClick = (uri, filename) => {
    var link = document.createElement('a');
    if (typeof link.download !== 'string') {
        window.open(uri);
    } else {
        link.href = uri;
        link.download = filename;
        accountForFirefox(clickLink, link);
    }
}

function clickLink(link) {
    link.click();
}

export const makeId = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

function accountForFirefox(click) { // wrapper function
    let link = arguments[1];
    document.body.appendChild(link);
    click(link);
    document.body.removeChild(link);
}

export const makePrescriptionPdf = async (imgData, predictionResult) => {

    //console.log(predictionResult);

    const renderTable = (data) => {
        if (!data || data?.length === 0)
            return [];

        const a = [[
            { text: 'STT', style: 'tableHeader' },
            { text: 'Tên thuốc/TPCN', style: 'tableHeader' },
            { text: '1 ngày uống', style: 'tableHeader' },
            { text: 'Liệu trình', style: 'tableHeader' },
            { text: 'Tổng số đơn vị thuốc', style: 'tableHeader' },
            { text: 'Số lọ/hộp', style: 'tableHeader' },
            { text: 'Đơn giá', style: 'tableHeader' },
            { text: 'Thành tiền', style: 'tableHeader' },
            { text: 'Chiết khấu', style: 'tableHeader' },
            { text: 'Tổng thu', style: 'tableHeader' }
        ]];

        const b = data.map((item, index) => {
            let temp = [];
            temp.push(`${index + 1}`);
            temp.push(`${item.medicine.name} ${item.medicine.package} ${item.medicine.quantity} ${item.medicine.unit}`);
            temp.push(`${item.unit} ${item.medicine.unit}`);
            temp.push(`${item.number_day} ngày`);
            temp.push(`${item.unit * item.number_day} ${item.medicine.unit}`);
            temp.push(`${roundingNumber(item.quantity)} ${item.medicine.package}`);
            temp.push(`${numberWithCommas(item.price)}đ`);
            temp.push(`${numberWithCommas(roundingNumber(item.price * item.quantity))}đ`);
            temp.push(`${item.reduce}%`);
            temp.push(`${numberWithCommas(roundingNumber(item.price * item.quantity * (1 - item.reduce / 100)))}đ`);
            return temp;
        });

        for (let i = 0; i < b.length; i++) {
            a.push(b[i]);
        }

        const total = numberWithCommas(roundingNumber(data.reduce((a, b) => a + (b.price * b.quantity) * (1 - b.reduce / 100) || 0, 0))) + 'đ';
        const index = (b.length + 1).toString();
        a.push([
            index,
            { text: 'Tổng', bold: true },
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            { text: total, bold: true }
        ]);
        return a;
    }

    const doc = {
        pageSize: 'A4',
        pageOrientation: 'landscape',
        pageMargins: [40, 30, 40, 10],
        content: [
            {
                columns: [
                    {
                        width: 120,
                        image: imgData.logo,
                    },
                    [
                        {
                            text: 'MIDU MENAQ7 VIỆT NAM',
                            alignment: 'right',
                            color: '#7e32a0'
                        },
                        {
                            text: 'K30 Khu đấu giá Ngô Thì Nhậm Hà Đông, Hà Nội',
                            style: 'rightTitle'
                        },
                        {
                            text: 'Hotline: 0796188883',
                            style: 'rightTitle'
                        },
                        {
                            text: 'Email: midumenaq7vn@gmail.com',
                            style: 'rightTitle'
                        },
                        {
                            text: 'Website: https://midumenaq7.com',
                            style: 'rightTitle'
                        }
                    ]
                ]
            },
            {
                text: 'ĐƠN THUỐC/THỰC PHẨM TĂNG CHIỀU CAO\n',
                style: 'header',
                alignment: 'center'
            },
            {
                text: `MÃ ĐƠN HÀNG: ${predictionResult.id}\n`,
                fontSize: 13,
                alignment: 'left',
                color: 'red'
            },
            {
                columns: [
                    [
                        {
                            columns: [
                                { width: 'auto', text: 'Mã khách hàng:' },
                                {
                                    text: `${predictionResult.member.id}`, color: '#7e32a0'
                                }
                            ]
                        },
                        {
                            columns: [
                                { width: 'auto', text: 'Tên phụ huynh:' },
                                { text: `${predictionResult.member.fullname}`, color: '#7e32a0' }
                            ]
                        },
                        {
                            columns: [
                                { width: 'auto', text: 'Điện thoại:' },
                                { text: `${predictionResult.member.phone}`, color: '#7e32a0' }
                            ]
                        },
                        {
                            columns: [
                                { width: 'auto', text: 'Địa chỉ:' },
                                { text: `${predictionResult.member.address}`, color: '#7e32a0' }
                            ]
                        }
                    ],
                    [
                        {
                            columns: [

                                { width: 'auto', text: 'Ngày kê đơn: ' },
                                { text: `${moment(predictionResult.created_at).format('DD/MM/YYYY HH:mm:ss')}`, color: '#7e32a0' }
                            ]
                        },


                        {
                            columns: [
                                { width: 'auto', text: 'Họ tên con:' },
                                { text: `${predictionResult.children.fullname}`, color: 'red' }
                            ]
                        },
                        {
                            columns: [
                                { width: 'auto', text: 'Ngày sinh: ' },
                                { text: `${moment(predictionResult.children.birthday).format('DD/MM/YYYY')}`, color: '#7e32a0' }
                            ]
                        },
                        {
                            columns: [
                                { width: 'auto', text: 'Giới tính:' },
                                { text: `${predictionResult.children.sex ? 'Nữ' : 'Nam'}`, color: '#7e32a0' }
                            ]
                        }
                    ],
                    [
                        {
                            columns: [
                                { width: 'auto', text: 'Chiều cao:' },
                                { text: `${predictionResult.height}cm`, color: '#7e32a0' }
                            ]
                        },
                        {
                            columns: [
                                { width: 'auto', text: 'Cân nặng:' },
                                { text: `${predictionResult.weight}kg`, color: '#7e32a0' }
                            ]
                        },
                        {
                            columns: [
                                { width: 'auto', text: 'So chuẩn chiều cao:' },
                                { text: `${STANDARD_TYPE[predictionResult.height_standard]}`, color: '#7e32a0' }
                            ]
                        },
                        {
                            columns: [
                                { width: 'auto', text: 'So chuẩn cân nặng:' },
                                { text: `${STANDARD_TYPE[predictionResult.weight_standard]}`, color: '#7e32a0' }
                            ]
                        },
                    ]
                ]
            },
            {
                style: 'table',
                table: {
                    headerRows: 1,
                    // dontBreakRows: true,
                    // keepWithHeaderRows: 1,
                    body: renderTable(predictionResult.prescription)
                }
            },
            {
                columns: [
                    [
                        {
                            text: `Khách hàng chuyển khoản vào tài khoản sau:`,
                            alignment: 'left',
                        },
                        {
                            columns: [
                                {
                                    text: `Số tài khoản:`,
                                    width: 'auto',
                                    alignment: 'left',
                                },
                                {
                                    text: `618838888`,
                                    alignment: 'left',
                                    width: 'auto',
                                    bold: true
                                },
                                {
                                    text: ` - Ngân hàng Á Châu - ACB`,
                                    width: 'auto',
                                    alignment: 'left',
                                },
                            ]
                        },
                        {
                            text: `Chủ tài khoản: Phạm Thị Thanh Hiên`,
                            alignment: 'left',
                        }
                    ],
                    [
                        {
                            text: `Hà Nội ngày ${moment().format('DD/MM/YYYY')}`,
                            alignment: 'right',
                            italics: true,
                            lineHeight: 1,
                            margin: [0, 0, 25, 0],
                        },
                        {
                            text: `Bác sỹ chuyên khoa nhi`,
                            alignment: 'right',
                            bold: true,
                            margin: [0, 0, 25, 0],
                        },
                        {
                            width: 100,
                            image: imgData.sign,
                            alignment: 'right',
                            margin: [0, 5, 15, 5],
                        },
                        {
                            text: `Phạm Thị Thanh Hiên`,
                            alignment: 'right',
                            bold: true,
                            margin: [0, 0, 25, 0],
                        }
                    ]
                ]
            }
        ],
        styles: {
            header: {
                fontSize: 20,
                bold: true,
                color: '#7e32a0',
            },
            bigger: {
                fontSize: 15,
                italics: true
            },
            rightTitle: {
                fontSize: 8,
                alignment: 'right'
            },
            table: {
                margin: [0, 10, 0, 15],
                alignment: 'center'
            },
            tableHeader: {
                alignment: 'center',
                color: '#7e32a0',
            }
        },
        defaultStyle: {
            columnGap: 5,
            fontSize: 12,
            lineHeight: 1.2,
            font: 'Times'
        }
    }

    return doc;
}

