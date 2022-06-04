<template>
<div class="wrapper">
    <router-view></router-view>
</div>
</template>
<script>
export default{
    data(){
        return {
            msg: '',
        }
    },

    created(){
        this.msg = 'hello';
        console.log(this.msg)
    }
}
</script>