<template>
    <router-link to="/" class="back">Back</router-link>
    <div class="title-wrap">
        <div>img</div>
        <div class="text">ban list</div>
    </div>
    <div class="mini mb-10">
        *you will be redirected from any website from this list because it may be unsecure
    </div>
    <div class="overflow">
        <div class="list-item">
            <div>vk.com</div>
            <div>img</div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'BanList',
    beforeMount() {
        axios.get('https://fastapi-ml-sis1812.herokuapp.com/blocks')
            .then(function (response) {
                console.log(response)
            })
    },

}
</script>