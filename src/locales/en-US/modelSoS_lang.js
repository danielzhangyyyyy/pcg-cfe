import commonWidth from  "./columnCommonWidth_lang.js"
const deltaSize = commonWidth.deltaSize
// list页面表头
const tableTitle_langEn = [
    {
        title: 'Model',
        dataIndex: 'model',
        align: 'left',
        width: commonWidth.model,
        sorter: true
    },
    {
        title: 'Brand',
        dataIndex: 'brand',
        align: 'left',
        width: commonWidth.brand,
        sorter: true
    },
    {
        title: 'Product Family',
        dataIndex: 'prodfamily',
        align: 'left',
        width: commonWidth.prodFamily,
        sorter: true
    },
    {
        title: 'Plant',
        dataIndex: 'plant',
        align: 'left',
        width: commonWidth.plant,
        sorter: true
    },
    {
        title: 'Subgeo',
        dataIndex: 'subgeo',
        align: 'left',
        width: commonWidth.subgeo,
        sorter: true
    },
    {
        title: 'Country/ Region',
        dataIndex: 'country',
        align: 'left',
        width: commonWidth.country,
        sorter: true
    },
    {
        title: 'Mot',
        dataIndex: 'mot',
        align: 'left',
        width: commonWidth.freightType,
        sorter: true
    },
    {
        title: 'Description',
        dataIndex: 'description',
        align: 'left',
        width: commonWidth.description,
        sorter: true
    },
    {
        title: 'Last Modified Date',
        dataIndex: 'sysLastModifiedDate',
        align: 'left',
        width: commonWidth.sysLastModifiedBy,
        sorter: true
    },
    {
        title: 'Last Modified By',
        dataIndex: 'sysLastModifiedBy',
        align: 'left',
        width: commonWidth.sysLastModifiedBy,
        sorter: true
    }
]

//add页面
const addAndDetail_langEn = [
    {
        label: 'Model',
        decorator: 'model',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input model'
    },
    {
        label: 'Product Family',
        decorator: 'prodfamily',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input prodfamily'
    },
    {
        label: 'Brand',
        decorator: 'brand',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please select brand'
    },
    {
        label: 'Plant',
        decorator: 'plant',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please select plant'
    },
    {
        label: 'Subgeo',
        decorator: 'subgeo',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please select subgeo'
    },
    {
        label: 'Country/Region',
        decorator: 'country',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please select country'
    },
    {
        label: 'Mot',
        decorator: 'mot',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please select mot'
    },
    {
        label: 'Description',
        decorator: 'description',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input description'
    },
]

//edit
const editAndDetail_langEn = [
    {
        label: 'Model',
        decorator: 'model',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input model'
    },
    {
        label: 'Product Family',
        decorator: 'prodfamily',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input prodfamily'
    },
    {
        label: 'Brand',
        decorator: 'brand',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please select brand'
    },
    {
        label: 'Plant',
        decorator: 'plant',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please select plant'
    },
    {
        label: 'Subgeo',
        decorator: 'subgeo',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input subgeo'
    },
    {
        label: 'Country/Region',
        decorator: 'country',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input country'
    },
    {
        label: 'Mot',
        decorator: 'mot',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input mot'
    },
    {
        label: 'Description',
        decorator: 'description',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input description'
    },
]

let filter_langEn = [
    {
        index: 1,
        label: 'Model',
        decorator: 'model',
        required: true,
        allowClear: true,
        editDisabled: false,
        message: 'Please input',
        placeHolder: 'Please input',
        inputType: 'input',
        text: '',
    },
    {
        index: 2,
        label: 'Product Family',
        decorator: 'prodfamily',
        required: true,
        allowClear: true,
        editDisabled: false,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: '',
        dropDownList: []
    },
    // {
    //     index: 3,
    //     label: 'Brand',
    //     decorator: 'brand',
    //     required: false,
    //     allowClear: true,
    //     editDisabled: false,
    //     message: 'Please select',
    //     placeHolder: 'Please select',
    //     inputType: 'dropDown',
    //     text: '',
    //     dropDownList: []
    // },
    {
        index: 3,
        label: 'Plant',
        decorator: 'plant',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: '',
        dropDownList: []
    },
    {
        index: 4,
        label: 'Subgeo',
        decorator: 'subgeo',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: '',
        dropDownList: []
    },
    {
        index: 5,
        label: 'Country/Region ',
        decorator: 'country',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: '',
        dropDownList: []
    },
    {
        index: 6,
        label: 'Mot',
        decorator: 'mot',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: '',
        dropDownList: []
    },
    // {
    //     index: 8,
    //     label: 'Description',
    //     decorator: 'description',
    //     required: false,
    //     allowClear: true,
    //     editDisabled: false,
    //     message: 'Please input',
    //     placeHolder: 'Please input',
    //     inputType: 'input',
    //     text: ''
    // }
]

export default {
    deltaSize,
    tableTitle_langEn,
    editAndDetail_langEn,
    addAndDetail_langEn,
    filter_langEn
}
