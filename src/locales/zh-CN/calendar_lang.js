// list页面表头
const calendar_langZh = [
    {
        title: 'NO.',
        dataIndex: 'id',
        align: 'left',
        fixed: 'left',
        width: 150,
        sorter: true
    },
    {
        title: '工厂编号',
        dataIndex: 'factoryCode',
        align: 'left',
        width: 200,
        sorter: true
    },
    {
        title: '年',
        dataIndex: 'years',
        align: 'left',
        width: 200,
        sorter: true
    },
    {
        title: '一月',
        dataIndex: 'mon01',
        align: 'left',
        width: 400,
        sorter: true
    },
    {
        title: '二月',
        dataIndex: 'mon02',
        align: 'left',
        width: 400,
        sorter: true
    },
    {
        title: '三月',
        dataIndex: 'mon03',
        align: 'left',
        width: 400,
        sorter: true
    },
    {
        title: '四月',
        dataIndex: 'mon04',
        align: 'left',
        width: 400,
        sorter: true
    },
    {
        title: '五月',
        dataIndex: 'mon05',
        align: 'left',
        width: 400,
        sorter: true
    },
    {
        title: '六月',
        dataIndex: 'mon06',
        align: 'left',
        width: 400,
        sorter: true
    },
    {
        title: '七月',
        dataIndex: 'mon07',
        align: 'left',
        width: 400,
        sorter: true
    },
    {
        title: '八月',
        dataIndex: 'mon08',
        align: 'left',
        width: 400,
        sorter: true
    },
    {
        title: '九月',
        dataIndex: 'mon09',
        align: 'left',
        width: 400,
        sorter: true
    },
    {
        title: '十月',
        dataIndex: 'mon10',
        align: 'left',
        width: 400,
        sorter: true
    },
    {
        title: '十一月',
        dataIndex: 'mon11',
        align: 'left',
        width: 400,
        sorter: true
    },
    {
        title: '十二月',
        dataIndex: 'mon12',
        align: 'left',
        width: 400,
        sorter: true
    },
    {
        title: '工作日',
        dataIndex: 'workday',
        align: 'left',
        width: 200,
        sorter: true
    },
    {
        title: '节假日',
        dataIndex: 'holiday',
        align: 'left',
        width: 200,
        sorter: true
    },
    {
        title: '加载年标识',
        dataIndex: 'load',
        align: 'left',
        width: 200,
        sorter: true
    },
    {
        title: '操作',
        dataIndex: 'action',
        width: '200px',
        scopedSlots: { customRender: 'action' },
        fixed: 'right',
        align: 'center'
    }
]

//edit页面
const calendar_edit_langZh =[
    {
        label: '工厂编号',
        decorator: 'factoryCode',
        required: true,
        message: '请输入工厂编号'
    },
    {
        label: '年',
        decorator: 'years',
        required: true,
        message: '请输入年'
    },
    {
        label: '一月',
        decorator: 'mon01',
        required: true,
        message: '请输入一月'
    },
    {
        label: '二月',
        decorator: 'mon02',
        required: true,
        message: '请输入二月'
    },
    {
        label: '三月',
        decorator: 'mon03',
        required: true,
        message: '请输入三月'
    },
    {
        label: '四月',
        decorator: 'mon04',
        required: true,
        message: '请输入四月'
    },
    {
        label: '五月',
        decorator: 'mon05',
        required: true,
        message: '请输入五月'
    },
    {
        label: '六月',
        decorator: 'mon06',
        required: true,
        message: '请输入六月'
    },
    {
        label: '七月',
        decorator: 'mon07',
        required: true,
        message: '请输入七月'
    },
    {
        label: '八月',
        decorator: 'mon08',
        required: true,
        message: '请输入八月'
    },
    {
        label: '九月',
        decorator: 'mon09',
        required: true,
        message: '请输入九月'
    },
    {
        label: '十月',
        decorator: 'mon10',
        required: true,
        message: '请输入十月'
    },
    {
        label: '十一月',
        decorator: 'mon11',
        required: true,
        message: '请输入十一月'
    },
    {
        label: '十二月',
        decorator: 'mon12',
        required: true,
        message: '请输入十二月'
    },
    {
        label: '工作日',
        decorator: 'workday',
        required: true,
        message: '请输入工作日'
    },
    {
        label: '节假日',
        decorator: 'holiday',
        required: true,
        message: '请输入节假日'
    },
    {
        label: '加载年标识',
        decorator: 'load',
        required: true,
        message: '请输入加载年标识'
    },
]



export default {
    calendar_langZh,
    calendar_edit_langZh
}