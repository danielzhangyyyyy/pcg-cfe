<template>
    <div>
        <a-select :value="currency" style="width: 32%" @change="handleCurrencyChange">
            <a-select-option value='='>=</a-select-option>
            <a-select-option value='!='>!=</a-select-option>
            <a-select-option value='<'><</a-select-option>
            <a-select-option value='>'>></a-select-option>
            <a-select-option value='<='><=</a-select-option>
            <a-select-option value='>='>>=</a-select-option>
        </a-select>
        <a-input type='text' :value="number" @change="handleNumberChange" style="width: 63%; margin-left: 2%;"/>
    </div>
</template>

<script>
    const hasProp = (instance, prop) => {
        const $options = instance.$options || {};
        const propsData = $options.propsData || {};
        return prop in propsData;
    };
    export default {
        name: "selectInput",
        props: ['value'],
        data() {
            const value = this.value || {};
            return {
                number: value.number || undefined,
                currency: value.currency || '=',
            };
        },
        watch: {
            value(val = {}) {
                this.number = val.number || undefined;
                this.currency = val.currency || '=';
            },
        },
        methods: {
            handleNumberChange(e) {
                const number = e.target.value;
                // if (isNaN(number)) {
                //     return;
                // }
                if (!hasProp(this, 'value')) {
                    this.number = number;
                }
                this.triggerChange({number});
            },
            handleCurrencyChange(currency) {
                if (!hasProp(this, 'value')) {
                    this.currency = currency;
                }
                this.triggerChange({currency});
            },
            triggerChange(changedValue) {
                // Should provide an event to pass value to Form.
                this.$emit('change', Object.assign({}, this.$data, changedValue));
            },
        },
    }
</script>

<style scoped>

</style>
