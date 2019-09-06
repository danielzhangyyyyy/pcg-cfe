import commonWidth from  "./columnCommonWidth_lang.js"
const deltaSize = commonWidth.deltaSize
// list页面表头
const tableTitle_langEn = [
    {
        title: 'Part',
        dataIndex: 'part',
        align: 'left',
        width: commonWidth.part,
        sorter: false,
        scopedSlots: {customRender: "part"}
    },
    {
        title: 'PartDescription',
        dataIndex: 'itemDesc',
        align: 'left',
        width: commonWidth.itemDesc,
        sorter: false,
        scopedSlots: {customRender: "partDesc"}
    },
    {
        title: 'Lv',
        dataIndex: 'bomLvl',
        align: 'left',
        width: commonWidth.bomLvl,
        sorter: false
    },
    {
        title: 'BOM Quantity',
        dataIndex: 'qtyper',
        align: 'right',
        width: commonWidth.qtyper,
        sorter: false
    },
    {
        title: 'Alt Group',
        dataIndex: 'altgrup',
        align: 'left',
        width: commonWidth.altgrup,
        sorter: false
    },
    {
        title: 'Alt Pri',
        dataIndex: 'altpri',
        align: 'right',
        width: commonWidth.altpri,
        sorter: false
    },
    {
        title: 'Alt Percentage',
        dataIndex: 'altpercent',
        align: 'right',
        width: commonWidth.altpercent,
        sorter: false
    },
    {
        title: 'Cost',
        dataIndex: 'm1',
        align: 'right',
        width: commonWidth.m,
        sorter: false
    }
]

//edit页面
const editAndDetail_langEn = [
    {
        label: 'lm9',
        decorator: 'lm9',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input lm9'
    },
    {
        label: 'lm10',
        decorator: 'lm10',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input lm10'
    },
    {
        label: 'lm11',
        decorator: 'lm11',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input lm11'
    },
    {
        label: 'lm12',
        decorator: 'lm12',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input lm12'
    },
    {
        label: 'weightedAverage',
        decorator: 'weightedAverage',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input weightedAverage'
    },
    {
        label: 'lattestProcur',
        decorator: 'lattestProcur',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input lattestProcur'
    },
    {
        label: 'action',
        decorator: 'action',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input action'
    },
    {
        label: 'status',
        decorator: 'status',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input status'
    },
    {
        label: 'sysCreatedDate',
        decorator: 'sysCreatedDate',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input sysCreatedDate'
    },
    {
        label: 'sysCreatedBy',
        decorator: 'sysCreatedBy',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input sysCreatedBy'
    },
    {
        label: 'sysLastModifiedDate',
        decorator: 'sysLastModifiedDate',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input sysLastModifiedDate'
    },
    {
        label: 'sysLastModifiedBy',
        decorator: 'sysLastModifiedBy',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input sysLastModifiedBy'
    },
    {
        label: 'swrc',
        decorator: 'swrc',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input swrc'
    },
    {
        label: 'cycle',
        decorator: 'cycle',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input cycle'
    },
    {
        label: 'productGroup',
        decorator: 'productGroup',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input productGroup'
    },
    {
        label: 'model',
        decorator: 'model',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input model'
    },
    {
        label: 'father',
        decorator: 'father',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input father'
    },
    {
        label: 'children',
        decorator: 'children',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input children'
    },
    {
        label: 'itemDesc',
        decorator: 'itemDesc',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input itemDesc'
    },
    {
        label: 'plant',
        decorator: 'plant',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input plant'
    },
    {
        label: 'bomPlant',
        decorator: 'bomPlant',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input bomPlant'
    },
    {
        label: 'sbomPlant',
        decorator: 'sbomPlant',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input sbomPlant'
    },
    {
        label: 'oem',
        decorator: 'oem',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input oem'
    },
    {
        label: 'brand',
        decorator: 'brand',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input brand'
    },
    {
        label: 'aspPrdFamily',
        decorator: 'aspPrdFamily',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input aspPrdFamily'
    },
    {
        label: 'geo',
        decorator: 'geo',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input geo'
    },
    {
        label: 'subgeo',
        decorator: 'subgeo',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input subgeo'
    },
    {
        label: 'country',
        decorator: 'country',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input country'
    },
    {
        label: 'qtyper',
        decorator: 'qtyper',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input qtyper'
    },
    {
        label: 'altgrup',
        decorator: 'altgrup',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input altgrup'
    },
    {
        label: 'altpri',
        decorator: 'altpri',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input altpri'
    },
    {
        label: 'altpercent',
        decorator: 'altpercent',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input altpercent'
    },
    {
        label: 'costflag',
        decorator: 'costflag',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input costflag'
    },
    {
        label: 'itemTypeM',
        decorator: 'itemTypeM',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input itemTypeM'
    },
    {
        label: 'itemTypeF',
        decorator: 'itemTypeF',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input itemTypeF'
    },
    {
        label: 'itemTypeC',
        decorator: 'itemTypeC',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input itemTypeC'
    },
    {
        label: 'bomLvl',
        decorator: 'bomLvl',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input bomLvl'
    },
    {
        label: 'costPlant',
        decorator: 'costPlant',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input costPlant'
    },
    {
        label: 'isBasesbb',
        decorator: 'isBasesbb',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input isBasesbb'
    },
    {
        label: 'm1',
        decorator: 'm1',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input m1'
    },
    {
        label: 'm2',
        decorator: 'm2',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input m2'
    },
    {
        label: 'm3',
        decorator: 'm3',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input m3'
    },
    {
        label: 'm4',
        decorator: 'm4',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input m4'
    },
    {
        label: 'm5',
        decorator: 'm5',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input m5'
    },
    {
        label: 'm6',
        decorator: 'm6',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input m6'
    },
    {
        label: 'm7',
        decorator: 'm7',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input m7'
    },
    {
        label: 'm8',
        decorator: 'm8',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input m8'
    },
    {
        label: 'm9',
        decorator: 'm9',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input m9'
    },
    {
        label: 'm10',
        decorator: 'm10',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input m10'
    },
    {
        label: 'm11',
        decorator: 'm11',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input m11'
    },
    {
        label: 'm12',
        decorator: 'm12',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input m12'
    },
    {
        label: 'lm1',
        decorator: 'lm1',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input lm1'
    },
    {
        label: 'lm2',
        decorator: 'lm2',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input lm2'
    },
    {
        label: 'lm3',
        decorator: 'lm3',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input lm3'
    },
    {
        label: 'lm4',
        decorator: 'lm4',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input lm4'
    },
    {
        label: 'lm5',
        decorator: 'lm5',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input lm5'
    },
    {
        label: 'lm6',
        decorator: 'lm6',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input lm6'
    },
    {
        label: 'lm7',
        decorator: 'lm7',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input lm7'
    },
    {
        label: 'lm8',
        decorator: 'lm8',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input lm8'
    },
]

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
        label: 'SBB',
        decorator: 'model',
        required: true,
        allowClear: true,
        editDisabled: false,
        message: 'Please input',
        placeHolder: 'Please input',
        inputType: 'input',
        text: ''
    },
    {
        index: 3,
        label: 'Plant',
        decorator: 'plant',
        required: true,
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
    editAndDetail_langEn,
    filter_langEn
}
