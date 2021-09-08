<template>
    <div class="alert">
        <div class="alert_box">
            <h1 class="title">
                訊息
                <!-- <button class="icon_btn _close"></button> -->
            </h1>
            <div class="inf">
                <span
                    class="msg"
                    v-for="(item, index) in msgContent"
                    :key="index"
                >
                    {{ item }}
                </span>
            </div>
            <div class="function_box">
                <!-- <button class="btn _secondry" @click="clear">取消</button> -->
                <button class="btn _primary" @click="$emit('closeMsg')">確認</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        msgContent: {
            type: Object,
            default: null,
        },
    },
};
</script>
