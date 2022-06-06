<template>
    <div class="wrapper">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    data() {
        return {
            banList: []
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
        },
    }
}
</script>