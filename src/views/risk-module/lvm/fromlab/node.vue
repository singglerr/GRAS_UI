<template>
    <div class="base">
        <input type="text" value="Опасная ситуация" class="title">
        <dsdata :node-data="nodeData"></dsdata>
        <controls :node-data="nodeData"></controls>
    </div>
</template>

<script>
	import 'vue'
    import Dsdata from './dsdata'
    import Controls from './controls'
    export default {
        components: {
            Dsdata,
            Controls,
        },
        props: {
            nodeData: Object,
        },
    }
</script>

<style>
    .base {
        text-align: left;
        border-color: blue !important;
        border: 2px solid !important;
        border-spacing: 2px;
        padding: 5px;
    }
    input {
        width: 100%;
        border-top: none;
        border-left: none;
        border-right: none;
        border-color: blue;
        /*padding: 10px;*/
        text-align: left;
        box-sizing: border-box; 
    }
</style>