<template>
    <div>
        <safe-scan></safe-scan>
        <scam-scan></scam-scan>
    </div>
</template>

<script>
import SafeScan from "../components/SafeScan.vue";
import ScamScan from "../components/ScamScan.vue";

export default {
    name: 'Scan',
    components: {
        SafeScan,
        ScamScan
    }
}
</script>

