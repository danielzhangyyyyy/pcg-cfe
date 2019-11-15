import './index.less'

export default {
    props: {
        rowKey: {
            type: [String, Function],
            default: 'id'
        },
        columns: {
            type: Array,
            default: []
        },
        dataSource: {
            type: Array,
            default: []
        },
        scroll: {
            type: Object,
            default: {
                x: 0,
                y: 0
            },
            required: false
        }
    },
    watch: {},
    data() {
        return {}
    },
    methods: {
        renderSlot(key, index) {
            return (
                <div>{this.$slots[key]}</div>
            )
        },
        renderScopedSlot(h, key, index) {
            const props = { text: this.dataSource[index][key], record: this.dataSource[index] }
            console.log(this.$slots, 'ssss');
            console.log(this.$scopedSlots, props, 'slslsl');
            return h("div", [this.$scopedSlots.default(this.dataSource[index][key])])
        },
    },
    render(h) {
        const self = this
        const { $slots, $scopedSlots } = this;
        const thead = (
            <tr>
                {
                    this.columns.map(element => {
                        return <th style={{ width: element.width + 'px' }}>{element.title}</th>
                    })
                }
            </tr>
        )
        const key = self.rowKey;
        const ZTr = (props) => {
            return (
                <tr key={props[key]}> {
                    self.columns.map((element, index) => {
                        return element.scopedSlots && element.scopedSlots.customRender ?
                            <td style={{ width: element.width + 'px' }}>
                                {self.renderScopedSlot(h, element.scopedSlots.customRender, index)}
                            </td>
                            : <td style={{ width: element.width + 'px' }}>{props.props.item[element.dataIndex]}</td>
                    })
                }
                </tr>
            )
        }
        const tbody = (
            this.dataSource.length !== 0 ?
                this.dataSource.map((item) => {
                    return (<ZTr item={item} />)
                })
                : <tr style={{ lineHeight: '40px' }}>No Data</tr>
        )
        const table = (
            <table class='myTable' style={{ width: this.scroll.x + 'px', height: this.scroll.y + 'px' }}>
                <thead>{thead}</thead>
                <tbody>{tbody}</tbody>
            </table>
        )
        return (
            <div class="myCard">
                {table}
            </div>
        )
    }
}
