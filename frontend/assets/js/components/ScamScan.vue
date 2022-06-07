<template>
    <div class="result">
        <div>
            <div class="scan-txt mb-5">Page domain is:</div>
            <div class="scan-txt bad">{{ domain }}</div>
        </div>
        <div class="scan-txt">this page <span style="font-weight: 800">is not</span> safe for browsing</div>
        <div class="scan-txt">want to add to <span style="font-weight: 800">ban list?</span></div>
    </div>
    <div v-if="isError" class="scan-txt mb-5">Something went wrong</div>
    <div style="display: flex; justify-content: space-between; margin-top: 10px;">
        <button class="yes-btn btn-txt">no</button>
        <button class="no-btn btn-txt" @click="addToBan">yes</button>
    </div>
     <div v-if="isSuccess" class="scan-txt mb-5">You added this site to ban</div>
</template>

<script>
export default {
    name: 'Scam',

    props: {
        domain: {
            type: String
        },
        originFromPage: {
            type: String
        }
    },

    data() {
        return {
            url: '',
            isError: false,
            isSuccess: false
        }
    },

    methods: {
        getUrl() {
            this.url = this.originFromPage
        },

        addToBan() {
            this.getUrl();

            const site = {
                "url": this.url
            }
            const config = {
                headers: {
                    'Content-type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(site)
            }
            console.log(site)
            console.log(config)
            fetch('https://fastapi-ml-sis1812.herokuapp.com/block', config)
                .then((response) => { 
                    this.isSuccess = true
                    response.json() })
                .catch(err => {
                    this.isError = true
                    console.log(err)
                }
                )
        }
    }
}
</script>