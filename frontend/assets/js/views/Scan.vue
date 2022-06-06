<template>
    <div>
        <safe-scan v-if="!isScam" :domain="domain"></safe-scan>
        <scam-scan v-if="isScam" :domain="domain" :originFromPage="origin"></scam-scan>
    </div>
</template>

<script>
import { ref } from 'vue'
import SafeScan from "../components/SafeScan.vue";
import ScamScan from "../components/ScamScan.vue";

export default {
    name: 'Scan',
    components: {
        SafeScan,
        ScamScan
    },

    setup() {
        const isScam = ref(false)
        return {
            isScam,
        }
    },

    data(){
        return{
            origin: '',
            domain: '',
        }
    },

    beforeMount() {
        this.scanSite();
    },

    methods: {
        getVars(site) {
            this.origin = (new URL(site)).origin
            this.domain = (new URL(site)).hostname
        },
        scanSite() {
            chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
                let url = tabs[0].url;
                this.getVars(url)

                const scanData = {
                    "url": url
                }
                const config = {
                    headers: {
                        'Content-type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify(scanData)
                }
                fetch('https://fastapi-ml-sis1812.herokuapp.com/check', config)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        if (data.result === '-1') {
                            this.isScam = true
                        } else if (data.result === '1') {
                            this.isScam = false
                        }
                    })
                    .catch(err => console.log(err))
            });
        }
    }
}
</script>

