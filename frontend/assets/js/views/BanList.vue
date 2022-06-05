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
        <div class="list-item" v-for="site in banList" :key="site.id">
            <div>{{ site.url.substring(8) }}</div>
            <div @click="deleteSite(site.id)">img</div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
    setup() {
        const banList = ref(null)
        return {
            banList
        }
    },
    beforeMount() {
        this.getBanList();
    },

    methods: {
        getBanList() {
            const config = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }
            }

            fetch('https://fastapi-ml-sis1812.herokuapp.com/blocks', config)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    this.banList = data;
                });
        },

        deleteSite(id) {
            const delData = {
                "id": id
            }
            const config = {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(delData)
            }

            fetch('https://fastapi-ml-sis1812.herokuapp.com/delete', config)
                .then(response => response.json())
                .catch(err => console.log(err))
            this.getBanList()
        }
    },

}
</script>