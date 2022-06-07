<template>
    <div class="wrapper">
         <div v-if="isError" class="scan-txt mb-5">Something went wrong</div>
        <router-view v-if="!isError"></router-view>
    </div>
</template>
<script>
export default {
    data() {
        return {
            banList: [],
            isError: false
        }
    },

    beforeMount(){
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
                    data.forEach((site) => {
                        this.banList.push(site.url)
                    });

                    chrome.storage.sync.set({
                        toggleSitesList: this.banList
                    }, () => { })
                })
                .catch((error) => {
                    this.isError = true
                    console.log(error)
                })
        },
    }
}
</script>