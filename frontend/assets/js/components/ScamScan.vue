<template>
    <div class="result">
        <div>
            <div class="scan-txt mb-5">Page domain is:</div>
            <div class="scan-txt bad">example.com</div>
        </div>
        <div class="scan-txt">this page <span style="font-weight: 800">is not</span> safe for browsing</div>
        <div class="scan-txt">want to add to <span style="font-weight: 800">ban list?</span></div>
    </div>
    <div style="display: flex; justify-content: space-between; margin-top: 10px;">
        <button class="yes-btn btn-txt">no</button>
        <button class="no-btn btn-txt">yes</button>
    </div>
</template>