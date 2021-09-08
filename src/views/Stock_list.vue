<template>
    <div class="header">
        <h1 class="header_title">股票存則</h1>
        <div class="function">
            <button class="btn _primary" @click="addStock">新增</button>
        </div>
    </div>
    <div class="nodata" v-if="noData">
        {{ stock_list }}
    </div>

    <AccordionItem
        v-else
        v-for="item in stock_list.stock_map"
        :key="item.stock_id"
        :stockId="item.stock_id"
        :openNum="openNum"
        :stockList="item"
        :stockName="item.stock_name"
        @openNum="openNumHandler(item.stock_id)"
    ></AccordionItem>

    <div class="content">
        <div class="content_head"></div>
        <div class="content_body"></div>
    </div>
    <transition name="fade">
        <div class="alert" v-if="addBox">
            <div class="alert_box">
                <h1 class="title">
                    訊息
                    <button
                        class="icon_btn _close"
                        @click="closeAlert"
                    ></button>
                </h1>
                <div class="inf">
                    <table class="alert_tb">
                        <tr>
                            <th width="40%">名稱</th>
                            <td width="60%">
                                <label class="normal_select">
                                    <select v-model="addContent.stockName">
                                        <option value="null">請選擇</option>
                                        <option value="台積電">台積電</option>
                                        <option value="群創">群創</option>
                                        <option value="元大高股息"
                                            >元大高股息</option
                                        >
                                        <option value="敦泰">敦泰</option>
                                    </select>
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <th width="40%">買賣時間</th>
                            <td width="60%">
                                <input
                                    type="text"
                                    v-model="addContent.addTime"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th width="40%">買/賣</th>
                            <td width="60%">
                                <label class="normal_select">
                                    <select v-model="addContent.merchandise">
                                        <option value="0">買進</option>
                                        <option value="1">賣出</option>
                                    </select>
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <th width="40%">買賣價格</th>
                            <td width="60%">
                                <input
                                    type="text"
                                    class="normal_input"
                                    v-model="addContent.price"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th width="40%">買賣股數</th>
                            <td width="60%">
                                <input
                                    type="text"
                                    class="normal_input"
                                    v-model="addContent.count"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th width="40%">手續費</th>
                            <td width="60%">
                                <input
                                    type="text"
                                    class="normal_input"
                                    v-model="addContent.handling"
                                />
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="function_box">
                    <button class="btn _primary" @click="check">
                        確認
                    </button>
                </div>
            </div>
        </div>
    </transition>
    <transition name="fade">
        <AlertMsg
            v-if="msg.msgShow"
            :msgContent="msg.msgContent"
            @closeMsg="closeMsg"
        ></AlertMsg
    ></transition>
</template>

<script>
import AccordionItem from "../components/AccordionItem.vue";
import AlertMsg from "../components/AlertMsg.vue";
export default {
    data() {
        return {
            openNum: null,
            addBox: false,
            addContent: {
                stockName: "台積電",
                addTime: "",
                merchandise: 0,
                price: "",
                count: "",
                handling: "",
            },
            noData: true,
            show: true,
            msg: {
                msgShow: false,
                msgContent: [],
            },
            stockFilter: "all",
        };
    },
    components: { AccordionItem, AlertMsg },

    mounted() {
        this.$store.dispatch("READ_STOCK");
        console.log("mounted", this.$store.state.stock.length);
    },
    computed: {
        stock_list() {
            let num = this.$store.getters.filterStock(this.stockFilter).length;
            if (num == 0) {
                console.log("a");
                this.noData = true;
                return "無資料";
            } else {
                console.log("b");
                this.noData = false;
                return this.$store.getters.filterStock(this.stockFilter);
            }
        },
    },
    methods: {
        setData() {
            let year = new Date().getFullYear();
            let mounth = new Date().getMonth() + 1;
            if (mounth < 9) {
                mounth = "0" + mounth;
            }
            let date = new Date().getDate();
            if (date < 9) {
                date = "0" + date;
            }
            return year + "-" + mounth + "-" + date;
        },
        openNumHandler(id) {
            if (this.openNum == id) {
                this.openNum = null;
            } else {
                this.openNum = id;
            }
        },
        addStock() {
            this.addBox = true;
            this.addContent.addTime = this.setData();
        },
        closeAlert() {
            this.addBox = false;
        },
        check() {
            if (this.addContent.stockName == null) {
                this.msg.msgContent.push("股票名稱未選擇");
            }
            if (this.addContent.price == "") {
                this.msg.msgContent.push("購買價格未輸入");
            }
            if (this.addContent.count == "") {
                this.msg.msgContent.push("購買股數未輸入");
            }

            if (this.msg.msgContent.length == 0) {
                this.$store.dispatch("CREATE_STOCK", this.addContent);
            } else {
                this.msg.msgShow = true;
            }
        },
        closeMsg() {
            this.msg.msgContent = [];
            this.msg.msgShow = false;
        },
    },
};
</script>
