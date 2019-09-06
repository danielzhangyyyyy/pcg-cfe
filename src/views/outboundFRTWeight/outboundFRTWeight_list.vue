<template>
    <a-card :bordered="false" class="content">
        <a-row class="margin_b_20">
            <a-button class="float_r" icon="rollback" type="primary" @click="eventPush">Return</a-button>
        </a-row>
        <a-row :gutter="24">
            <a-col :md="8">
                <div class="list" @click="$router.replace('/outboundFamilyWeight/outboundFamilyWeight_list')">
                    <h2>Upload By Family</h2>
                    <p>(The lowst priority)</p>
                </div>
            </a-col>
            <a-col :md="8">
                <div class="list" @click="$router.replace('/outboundMTWeight/outboundMTWeight_list')">
                    <h2>Upload By MT</h2>
                    <p>(The medium priority)</p>
                </div>
            </a-col>
            <a-col :md="8">
                <div class="list" @click="$router.replace('/outboundItem/outboundItem_list')">
                    <h2>Upload By Item</h2>
                    <p>(The highest priority)</p>
                </div>
            </a-col>
        </a-row>
    </a-card>
</template>

<script>
    export default {
        name: 'TableList',
        data () {
            return {}
        },
        computed: {},
        created () {},
        watch: {},
        methods: {
            eventPush() {
                this.$store.dispatch("ToggleCloseTab", '');
                setTimeout(() => {
                    this.$store.dispatch("ToggleCloseTab", this.$route.fullPath);
                    this.$router.push({
                        path: "/gLOutboundFRTByUnit_list/gLOutboundFRTByUnit"
                    });
                }, 500);
            },
        }
    }
</script>
<style scoped lang="less">
    .margin_b_20{
        margin-bottom: 20px;
    }
    .float_r{
        float: right;
    }
    .list{
        border: 1px solid #eee;
        border-radius: 10px;
        padding: 15px;
        background: #fefa9b;
        cursor: pointer;
        h2{
            text-align: center;
        }
        p{
            text-align: center;
        }
    }
</style>
