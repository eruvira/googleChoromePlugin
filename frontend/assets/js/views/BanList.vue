<template>
    <router-link to="/" class="back">Back</router-link>
    <div class="title-wrap">
        <svg version="1.1" height="25px" width="25px" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px" y="0px" viewBox="0 0 60.123 60.123"
            style="enable-background:new 0 0 60.123 60.123; margin-right: 15px" xml:space="preserve">
            <g>
                <path
                    d="M57.124,51.893H16.92c-1.657,0-3-1.343-3-3s1.343-3,3-3h40.203c1.657,0,3,1.343,3,3S58.781,51.893,57.124,51.893z"
                    style="fill: #d5212d" />
                <path d="M57.124,33.062H16.92c-1.657,0-3-1.343-3-3s1.343-3,3-3h40.203c1.657,0,3,1.343,3,3
		C60.124,31.719,58.781,33.062,57.124,33.062z" style="fill: #d5212d" />
                <path
                    d="M57.124,14.231H16.92c-1.657,0-3-1.343-3-3s1.343-3,3-3h40.203c1.657,0,3,1.343,3,3S58.781,14.231,57.124,14.231z"
                    style="fill: #d5212d" />
                <circle cx="4.029" cy="11.463" r="4.029" style="fill: #d5212d" />
                <circle cx="4.029" cy="30.062" r="4.029" style="fill: #d5212d" />
                <circle cx="4.029" cy="48.661" r="4.029" style="fill: #d5212d" />
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
        </svg>
        <div class="text">ban list</div>
    </div>
    <div class="mini mb-10">
        *you will be redirected from any website from this list because it may be unsecure
    </div>
    <div class="overflow">
        <div v-if="isError && !isLoading" class="scan-txt mb-5">Something went wrong</div>
        <div id="loading" v-if="isLoading" class="mt-10"></div>
        <div class="list-item" v-for="site in banList" :key="site.id">
            <div>{{ site.url.substring(8) }}</div>
            <div @click="deleteSite(site.id)"><svg width="24px" height="24px" viewBox="0 0 24 24" version="1.2"
                    baseProfile="tiny" xmlns="http://www.w3.org/2000/svg">
                    <path style="fill: #f44236"
                        d="M12 4c-4.419 0-8 3.582-8 8s3.581 8 8 8 8-3.582 8-8-3.581-8-8-8zm3.707 10.293c.391.391.391 1.023 0 1.414-.195.195-.451.293-.707.293s-.512-.098-.707-.293l-2.293-2.293-2.293 2.293c-.195.195-.451.293-.707.293s-.512-.098-.707-.293c-.391-.391-.391-1.023 0-1.414l2.293-2.293-2.293-2.293c-.391-.391-.391-1.023 0-1.414s1.023-.391 1.414 0l2.293 2.293 2.293-2.293c.391-.391 1.023-.391 1.414 0s.391 1.023 0 1.414l-2.293 2.293 2.293 2.293z" />
                </svg></div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
    setup() {
        const banList = ref(null)
        const isError = ref(false)
        const isLoading = ref(true)
        const list = ref([])
        return {
            banList,
            isError,
            isLoading,
            list
        }
    },
    beforeMount() {
        chrome.storage.sync.get(['toggleSitesList'], (result) => {
            this.banList = result.toggleSitesList;
        });
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
                    this.isLoading = false
                    this.banList = data;
                    data.forEach((site) => {
                        this.list.push(site.url)
                    })
                    chrome.storage.sync.set({
                        toggleSitesList: this.list
                    }, () => { })
                })
                .catch(err => {
                    this.isError = true
                    console.log(err)
                })

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
                .catch(err => {
                    this.isError = true
                    console.log(err)
                }
                )
            this.getBanList()
        },

    },

}
</script>