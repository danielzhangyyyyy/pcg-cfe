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
        title: 'Plant',
        dataIndex: 'plant',
        align: 'left',
        width: commonWidth.plant,
        sorter: true
    },
    {
        title: 'GEO Type',
        dataIndex: 'geoType',
        align: 'left',
        width: commonWidth.geoType,
        sorter: true
    },
    {
        title: 'Geo Code',
        dataIndex: 'geo',
        align: 'left',
        width: commonWidth.subgeo,
        sorter: true
    },
    {
        title: 'Product Family',
        dataIndex: 'prodFamily',
        align: 'left',
        width: commonWidth.prodFamily,
        sorter: true
    },
    {
        title: 'Fee',
        dataIndex: 'm1',
        align: 'right',
        width: commonWidth.m,
        sorter: true
    },
    {
        title: 'Last Modified Date',
        dataIndex: 'sysLastModifiedDate',
        align: 'left',
        width: commonWidth.sysLastModifiedDate,
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

//edit页面
let airList = [
    {
        label: 'AIR',
        decorator: 'AirFreightType',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input Only Number'
    },
    {
        label: 'GL Percentage',
        decorator: 'AirGlPercentage',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Can only be a number,and keep two digits'
    },
    {
        label: 'GEO Percentage',
        decorator: 'AirGeoPercentage',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input Only Number'
    }
]
let oceanList = [
    {
        label: 'OCEAN',
        decorator: 'OceanFreightType',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input Only Number'
    },
    {
        label: 'GL Percentage',
        decorator: 'OceanGlPercentage',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Can only be a number,and keep two digits'
    },
    {
        label: 'GEO Percentage',
        decorator: 'OceanGeoPercentage',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input Only Number'
    }
]
let truckList = [
    {
        label: 'TRUCK',
        decorator: 'TruckFreightType',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input Only Number'
    },
    {
        label: 'GL Percentage',
        decorator: 'TruckGlPercentage',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Can only be a number,and keep two digits'
    },
    {
        label: 'GEO Percentage',
        decorator: 'TruckGeoPercentage',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input Only Number'
    }
]
// edit 页面

let filter_langEn = [
    {
        index: 1,
        label: 'Cycle',
        decorator: 'cycle',
        required: true,
        allowClear: true,
        editDisabled: false,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: 'CURRENT',
        dropDownList: []
    },
    {
        index: 2,
        label: 'Brand',
        decorator: 'brand',
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
        label: 'Geo Type',
        decorator: 'geoType',
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
        label: 'Geo Code',
        decorator: 'geo',
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
        label: 'Product Family',
        decorator: 'prodFamily',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: '',
        dropDownList: []
    }
]

export default {
    deltaSize,
    tableTitle_langEn,
    airList,
    oceanList,
    truckList,
    filter_langEn
}
