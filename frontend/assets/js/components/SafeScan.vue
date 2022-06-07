<template>
    <div class="result">
        <div>
            <div class="scan-txt mb-5">Page domain is:</div>
            <div class="scan-txt good">{{domain}}</div>
        </div>
        <div class="scan-txt">this page is safe for browsing</div>
    </div>
</template>

<script>
export default{
    name: "Safe",

     props: {
        domain: {
            type: String
        }
     }
}
</script>