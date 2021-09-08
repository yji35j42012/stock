import { createStore } from "vuex";
import axios from "axios";
import ResetStock from "../modelus/ResetStock";

const RESETSTOCK = new ResetStock("todo-vue");

export default createStore({
    state: {
        stock: [],
        loadingShow: true,
    },
    mutations: {
        SET_STOCK(state, data) {
            state.stock = data;
        },
    },
    getters: {
        filterStock(state) {
            return (filter) => {
                switch (filter) {
                    case "all":
                        return state.stock;
                }
            };
        },
    },
    actions: {
        READ_STOCK({ commit }) {
            axios.get("/api/getStockData.php").then((res) => {
                if (res.data == 0) return;
                commit("SET_STOCK", RESETSTOCK.get(res.data));
            });
        },
        CREATE_STOCK({ commit }, addTodo) {
            axios.post("/api/setStockData.php", addTodo).then((res) => {
                commit("SET_STOCK", RESETSTOCK.get(res.data));
                // console.log(res.data);
            });
        },
    },
});
