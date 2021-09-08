<template>
    <div :class="['content1', openNum !== stockId ? '_hide' : '']">
        <div class="tbTitle" @click="$emit('openNum')">
            {{ stockName }}
            {{ stockList.stock_total }}
        </div>
        <div class="tbBox">
            <table id="tbBox" class="normal_table">
                <tr>
                    <th>買賣時間</th>
                    <th>
                        買/賣
                    </th>
                    <th>
                        成交單價
                    </th>
                    <th>成交股數</th>
                    <th>手續費</th>
                    <th>交易稅</th>
                    <th>收付金額</th>
                </tr>
                <tr v-for="(item, index) in lists" :key="index">
                    <td>
                        {{ item.date }}
                    </td>
                    <td
                        :class="
                            item.merchandise == 0 ? 'color_red' : 'color_green'
                        "
                    >
                        {{ item.merchandise == 0 ? "買進" : "賣出" }}
                    </td>
                    <td
                        :class="
                            item.merchandise == 0 ? 'color_red' : 'color_green'
                        "
                    >
                        {{ item.stock_price }}
                    </td>
                    <td>{{ item.stock_count }}</td>
                    <td>
                        {{ item.stock_handling }}
                    </td>
                    <td>
                        {{ item.stock_taxes }}
                    </td>
                    <td
                        :class="
                            item.stock_total_price > 0
                                ? 'color_red'
                                : 'color_green'
                        "
                    >
                        {{ item.stock_total_price }}
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        openNum: {
            type: String,
            defautl: false,
        },
        stockId: {
            type: String,
            defautl: false,
        },
        stockList: {
            type: Object,
            defautl: false,
        },
        stockName: {
            tyep: String,
            defautl: false,
        },
    },
    data() {
        return {
            tbHeight: 0,
        };
    },
    computed: {
        lists() {
            return this.stockList.stock_sort;
        },
    },
    methods: {
        openHandler() {
            let tbBox = document.querySelector("#tbBox");
            console.log(tbBox.offsetHeight);
            this.tbHeight = "height:" + tbBox.offsetHeight + "px";
        },
    },
};
</script>
