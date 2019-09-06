// list页面表头
const calendar_langEn = [
    {
        title: 'NO.',
        dataIndex: 'id',
        align: 'left',
        fixed: 'left',
        width: 150,
        sorter: true
    },
    {
        title: 'factoryCode',
        dataIndex: 'factoryCode',
        align: 'left',
        width: 200,
        sorter: true
    },
    {
        title: 'years',
        dataIndex: 'years',
        align: 'left',
        width: 200,
        sorter: true
    },
    {
        title: 'mon01',
        dataIndex: 'mon01',
        align: 'left',
        width: 400,
        sorter: true
    },
    {
        title: 'mon02',
        dataIndex: 'mon02',
        align: 'left',
        width: 400,
        sorter: true
    },
    {
        title: 'mon03',
        dataIndex: 'mon03',
        align: 'left',
        width: 400,
        sorter: true
    },
    {
        title: 'mon04',
        dataIndex: 'mon04',
        align: 'left',
        width: 400,
        sorter: true
    },
    {
        title: 'mon05',
        dataIndex: 'mon05',
        align: 'left',
        width: 400,
        sorter: true
    },
    {
        title: 'mon06',
        dataIndex: 'mon06',
        align: 'left',
        width: 400,
        sorter: true
    },
    {
        title: 'mon07',
        dataIndex: 'mon07',
        align: 'left',
        width: 400,
        sorter: true
    },
    {
        title: 'mon08',
        dataIndex: 'mon08',
        align: 'left',
        width: 400,
        sorter: true
    },
    {
        title: 'mon09',
        dataIndex: 'mon09',
        align: 'left',
        width: 400,
        sorter: true
    },
    {
        title: 'mon10',
        dataIndex: 'mon10',
        align: 'left',
        width: 400,
        sorter: true
    },
    {
        title: 'mon11',
        dataIndex: 'mon11',
        align: 'left',
        width: 400,
        sorter: true
    },
    {
        title: 'mon12',
        dataIndex: 'mon12',
        align: 'left',
        width: 400,
        sorter: true
    },
    {
        title: 'workday',
        dataIndex: 'workday',
        align: 'left',
        width: 200,
        sorter: true
    },
    {
        title: 'holiday',
        dataIndex: 'holiday',
        align: 'left',
        width: 200,
        sorter: true
    },
    {
        title: 'load',
        dataIndex: 'load',
        align: 'left',
        width: 200,
        sorter: true
    },
    {
        title: 'action',
        dataIndex: 'action',
        width: '200px',
        scopedSlots: { customRender: 'action' },
        fixed: 'right',
        align: 'center'
    }
]

//edit页面
const calendar_edit_langEn =[
    {
        label: 'factoryCode',
        decorator: 'factoryCode',
        required: true,
        message: 'Please input factoryCode'
    },
    {
        label: 'years',
        decorator: 'years',
        required: true,
        message: 'Please input years'
    },
    {
        label: 'mon01',
        decorator: 'mon01',
        required: true,
        message: 'Please input mon01'
    },
    {
        label: 'mon02',
        decorator: 'mon02',
        required: true,
        message: 'Please input mon02'
    },
    {
        label: 'mon03',
        decorator: 'mon03',
        required: true,
        message: 'Please input mon03'
    },
    {
        label: 'mon04',
        decorator: 'mon04',
        required: true,
        message: 'Please input mon04'
    },
    {
        label: 'mon05',
        decorator: 'mon05',
        required: true,
        message: 'Please input mon05'
    },
    {
        label: 'mon06',
        decorator: 'mon06',
        required: true,
        message: 'Please input mon06'
    },
    {
        label: 'mon07',
        decorator: 'mon07',
        required: true,
        message: 'Please input mon07'
    },
    {
        label: 'mon08',
        decorator: 'mon08',
        required: true,
        message: 'Please input mon08'
    },
    {
        label: 'mon09',
        decorator: 'mon09',
        required: true,
        message: 'Please input mon09'
    },
    {
        label: 'mon10',
        decorator: 'mon10',
        required: true,
        message: 'Please input mon10'
    },
    {
        label: 'mon11',
        decorator: 'mon11',
        required: true,
        message: 'Please input mon11'
    },
    {
        label: 'mon12',
        decorator: 'mon12',
        required: true,
        message: 'Please input mon12'
    },
    {
        label: 'workday',
        decorator: 'workday',
        required: true,
        message: 'Please input workday'
    },
    {
        label: 'holiday',
        decorator: 'holiday',
        required: true,
        message: 'Please input holiday'
    },
    {
        label: 'load',
        decorator: 'load',
        required: true,
        message: 'Please input load'
    },
]


export default {
    calendar_langEn,
    calendar_edit_langEn
}