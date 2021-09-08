export default function() {
    return {
        get(data) {
            let stock_obj = {
                stock_sort: [],
                stock_map: {},
            };
            data.forEach((item) => {
                if (!stock_obj.stock_map[item[1]]) {
                    stock_obj.stock_sort.push(item[1]);
                    stock_obj.stock_map[item[1]] = {
                        stock_sort: [],
                        stock_total: 0,
                        stock_id: item[0],
                        stock_name: item[1],
                    };
                }
                let total = 0;
                let total_price = 0;
                if (item[3] == 1) {
                    total = parseFloat(item[5]) * -1;
                    total_price =
                        parseFloat(item[5]) * parseFloat(item[4]) -
                        parseFloat(item[6]) -
                        parseFloat(item[7]);
                } else {
                    total = parseFloat(item[5]);
                    total_price =
                        (parseFloat(item[5]) * parseFloat(item[4]) +
                            parseFloat(item[6]) +
                            parseFloat(item[7])) *
                        -1;
                }
                stock_obj.stock_map[item[1]].stock_sort.push({
                    date: item[2],
                    merchandise: item[3],
                    stock_count: item[5],
                    stock_price: item[4],
                    stock_handling: item[6],
                    stock_taxes: item[7],
                    stock_total_price: total_price,
                });

                stock_obj.stock_map[item[1]].stock_total =
                    parseInt(stock_obj.stock_map[item[1]].stock_total) + total;
            });
            return stock_obj;
        },
    };
}
