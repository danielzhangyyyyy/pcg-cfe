import commonWidth from  "./columnCommonWidth_lang.js"
const deltaSize = commonWidth.deltaSize
// list页面表头
const tableTitle_langEn = [
    {
        fixed: 'left',
    },
    /* {
        title: 'productGroup',
        dataIndex: 'productGroup',
        align: 'left',
        width: 300,
        sorter: true
    }, */
    {
        title: 'Plant',
        dataIndex: 'plant',
        align: 'left',
        width: 200,
        sorter: true
    },
    {
        title: 'Brand',
        dataIndex: 'brand',
        align: 'left',
        width: 200,
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
    },

    /*   {
          title: 'action',
          dataIndex: 'action',
          align: 'left',
          width: 300,
          sorter: true
      }, 
      {
          title: 'status',
          dataIndex: 'status',
          align: 'left',
          width: 300,
          sorter: true
      },
      {
          title: 'sysCreatedDate',
          dataIndex: 'sysCreatedDate',
          align: 'left',
          width: 300,
          sorter: true
      },
      {
          title: 'sysCreatedBy',
          dataIndex: 'sysCreatedBy',
          align: 'left',
          width: 300,
          sorter: true
      },*/
]

//edit页面
const editAndDetail_langEn = [
    {
        label: 'Product Group',
        decorator: 'productGroup',
        required: true,
        message: 'Please input productGroup',
        inputType: 'input',
        show: true,
        initialValue: '',
        editDisabled: true,
    },
    {
        label: 'Brand',
        decorator: 'brand',
        required: true,
        message: 'Please input brand',
        inputType: 'dropDown',
        show: true,
        initialValue: '',
        dropDownValue: []
    },
    {
        label: 'Plant',
        decorator: 'plant',
        required: true,
        message: 'Please input plant',
        inputType: 'dropDown',
        show: true,
        initialValue: '',
        dropDownValue: []
    },
    /*   {
          label: 'action',
          decorator: 'action',
          required: true,
          message: 'Please input action',
      },
      {
          label: 'status',
          decorator: 'status',
          required: true,
          message: 'Please input status'
      }, */
    // {
    //     label: 'sysCreatedDate',
    //     decorator: 'sysCreatedDate',
    //     required: false,
    //     message: 'Please input sysCreatedDate'
    // },
    // {
    //    label: 'sysCreatedBy',
    //    decorator: 'sysCreatedBy',
    //    required: true,
    //    message: 'Please input sysCreatedBy'
    //},
    // {
    //     label: 'sysLastModifiedDate',
    //     decorator: 'sysLastModifiedDate',
    //     required: false,
    //     message: 'Please input sysLastModifiedDate'
    // },
    // {
    //    label: 'sysLastModifiedBy',
    //    decorator: 'sysLastModifiedBy',
    //    required: true,
    //    message: 'Please input sysLastModifiedBy'
    // },
]

let filter_langEn = [{
    index: 0,
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
    index: 1,
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
}]

export default {
    deltaSize,
    tableTitle_langEn,
    editAndDetail_langEn,
    filter_langEn
}
