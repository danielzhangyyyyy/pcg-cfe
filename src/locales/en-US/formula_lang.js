import commonWidth from  "./columnCommonWidth_lang.js"
const deltaSize = commonWidth.deltaSize
// list页面表头
const tableTitle_langEn = [
    {
        fixed: 'left',
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
        title: 'Category',
        dataIndex: 'category',
        align: 'left',
        width: commonWidth.category,
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
        title: 'Level1TBAs',
        dataIndex: 'level1Tbas',
        align: 'left',
        width: commonWidth.levelxTbas,
        sorter: true
    },
    {
        title: 'Level2TBAs',
        dataIndex: 'level2Tbas',
        align: 'left',
        width: commonWidth.levelxTbas,
        sorter: true
    },
    {
        title: 'Level3TBAs',
        dataIndex: 'level3Tbas',
        align: 'left',
        width: commonWidth.levelxTbas,
        sorter: true
    },
    {
        title: 'Level4TBAs',
        dataIndex: 'level4Tbas',
        align: 'left',
        width: commonWidth.levelxTbas,
        sorter: true
    },
    {
        title: 'Level5TBAs',
        dataIndex: 'level5Tbas',
        align: 'left',
        width: commonWidth.levelxTbas,
        sorter: true
    },
    {
        title: 'Level6TBAs',
        dataIndex: 'level6Tbas',
        align: 'left',
        width: commonWidth.level6Tbas,
        sorter: true
    },
    {
        title: 'Last Modified By',
        dataIndex: 'sysLastModifiedBy',
        align: 'left',
        width: commonWidth.sysLastModifiedBy,
        sorter: true
    },
    {
        title: 'Last Modified Date',
        dataIndex: 'sysLastModifiedDate',
        align: 'left',
        width: commonWidth.sysLastModifiedDate,
        sorter: true
    },

]

// edit
const newEdit_langEn = [
    {
        index: 0,
        label: 'Brand',
        decorator: 'brand',
        required: true,
        allowClear: true,
        message: 'Please select brand',
        editDisabled: true,
        placeHolder: 'Please input',
        inputType: 'input',
        text: ''
    },
    {
        index: 1,
        label: 'Product Family',
        decorator: 'prodfamily',
        required: false,
        allowClear: true,
        message: 'Please select Product Family',
        editDisabled: true,
        placeHolder: 'Please select',
        inputType: 'input',
        text: ''
    },
    {
        index: 2,
        label: 'Plant',
        decorator: 'plant',
        required: false,
        allowClear: true,
        message: 'Please select plant',
        editDisabled: true,
        placeHolder: 'Please select',
        inputType: 'input',
        text: ''
    },
    {
        index: 3,
        label: 'Category',
        decorator: 'category',
        required: false,
        allowClear: true,
        message: 'Please select category',
        editDisabled: true,
        placeHolder: 'Please select',
        inputType: 'input',
        text: ''
    },
    {
        index: 4,
        label: 'Subgeo',
        decorator: 'subgeo',
        required: false,
        allowClear: true,
        message: 'Please select subgeo',
        editDisabled: true,
        placeHolder: 'Please select',
        inputType: 'input',
        text: ''
    },
    {
        index: 5,
        label: 'Level1TBAs',
        decorator: 'level1Tbas',
        required: false,
        allowClear: true,
        message: 'Please input level1Tbas',
        placeHolder: 'Please input',
        inputType: 'input',
        text: ''
    },
    {
        index: 6,
        label: 'Level2TBAs',
        decorator: 'level2Tbas',
        required: false,
        allowClear: true,
        message: 'Please input level2Tbas',
        placeHolder: 'Please input',
        inputType: 'input',
        text: ''
    },

    {
        index: 7,
        label: 'Level3TBAs',
        decorator: 'level3Tbas',
        required: false,
        allowClear: true,
        message: 'Please input level3Tbas',
        placeHolder: 'Please input',
        inputType: 'input',
        text: ''
    },

    {
        index: 8,
        label: 'Level4TBAs',
        decorator: 'level4Tbas',
        required: false,
        allowClear: true,
        message: 'Please input level4Tbas',
        placeHolder: 'Please input',
        inputType: 'input',
        text: ''
    },

    {
        index: 9,
        label: 'Level5TBAs',
        decorator: 'level5Tbas',
        required: false,
        allowClear: true,
        message: 'Please input level5Tbas',
        placeHolder: 'Please input',
        inputType: 'input',
        text: ''
    },

    {
        index: 10,
        label: 'Level6TBAs',
        decorator: 'level6Tbas',
        required: false,
        allowClear: true,
        message: 'Please input level6Tbas',
        placeHolder: 'Please input',
        inputType: 'input',
        text: ''
    }
];

//edit页面
const editAndDetail_langEn = [{
        index: 0,
        label: 'Brand',
        decorator: 'brand',
        required: true,
        allowClear: true,
        message: 'Please select brand',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        dropDownList: [],
        text: ''
    },
    {
        index: 1,
        label: 'Product Family',
        decorator: 'prodfamily',
        required: false,
        allowClear: true,
        message: 'Please select Product Family',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        dropDownList: [],
        text: ''
    },
    {
        index: 2,
        label: 'Plant',
        decorator: 'plant',
        required: false,
        allowClear: true,
        message: 'Please select plant',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        dropDownList: [],
        text: ''
    },
    {
        index: 3,
        label: 'Category',
        decorator: 'category',
        required: false,
        allowClear: true,
        message: 'Please select category',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        dropDownList: [],
        text: ''
    },
    {
        index: 4,
        label: 'Subgeo',
        decorator: 'subgeo',
        required: false,
        allowClear: true,
        message: 'Please select subgeo',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        dropDownList: [],
        text: ''
    },
    {
        index: 5,
        label: 'Level1TBAs',
        decorator: 'level1Tbas',
        required: false,
        allowClear: true,
        message: 'Please input level1Tbas',
        placeHolder: 'Please input',
        inputType: 'input',
        text: ''
    },
    {
        index: 6,
        label: 'Level2TBAs',
        decorator: 'level2Tbas',
        required: false,
        allowClear: true,
        message: 'Please input level2Tbas',
        placeHolder: 'Please input',
        inputType: 'input',
        text: ''
    },

    {
        index: 7,
        label: 'Level3TBAs',
        decorator: 'level3Tbas',
        required: false,
        allowClear: true,
        message: 'Please input level3Tbas',
        placeHolder: 'Please input',
        inputType: 'input',
        text: ''
    },

    {
        index: 8,
        label: 'Level4TBAs',
        decorator: 'level4Tbas',
        required: false,
        allowClear: true,
        message: 'Please input level4Tbas',
        placeHolder: 'Please input',
        inputType: 'input',
        text: ''
    },

    {
        index: 9,
        label: 'Level5TBAs',
        decorator: 'level5Tbas',
        required: false,
        allowClear: true,
        message: 'Please input level5Tbas',
        placeHolder: 'Please input',
        inputType: 'input',
        text: ''
    },

    {
        index: 10,
        label: 'Level6TBAs',
        decorator: 'level6Tbas',
        required: false,
        allowClear: true,
        message: 'Please input level6Tbas',
        placeHolder: 'Please input',
        inputType: 'input',
        text: ''
    }
]
let filter_langEn = [{
        index: 0,
        label: 'Brand',
        decorator: 'brand',
        required: true,
        allowClear: true,
        message: 'Please input brand',
        placeHolder: 'Please input',
        inputType: 'dropDown',
        dropDownList: [],
        text: ''
    },
    {
        index: 1,
        label: 'Product Family',
        decorator: 'prodfamily',
        required: false,
        allowClear: true,
        message: 'Please select Product Family',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        dropDownList: [],
        text: ''
    },
    {
        index: 2,
        label: 'Plant',
        decorator: 'plant',
        required: false,
        allowClear: true,
        message: 'Please select plant',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        dropDownList: [],
        text: ''
    },
    {
        index: 3,
        label: 'Category',
        decorator: 'category',
        required: false,
        allowClear: true,
        message: 'Please select category',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        dropDownList: [],
        text: ''
    },
    {
        index: 4,
        label: 'Subgeo',
        decorator: 'subgeo',
        required: false,
        allowClear: true,
        message: 'Please select subgeo',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        dropDownList: [],
        text: ''
    }
]
export default {
    deltaSize,
    tableTitle_langEn,
    editAndDetail_langEn,
    filter_langEn,
    newEdit_langEn
}
