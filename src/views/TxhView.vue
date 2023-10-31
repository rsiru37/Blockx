<template>
    <br><br>
    <p>BLOCK HASH : {{ response.blockHash }}</p>
    <p>BLOCK NUMBER : {{ response.blockNumber }}</p>
    <p> FROM : {{ response.from }}</p>
    <p> TO : {{ response.to }}</p>
    <p> CONFIRMATIONS : {{ response.confirmations }}</p>    
    <p v-if="response.status ==1">STATUS : SUCCESS</p>
    <p v-else> STATUS : FAILED</p>
    <p> GAS USED : {{ Utils.formatEther(Number(response.gasUsed)) }} ETH</p>
    <p> GAS PRICE : {{ Utils.formatEther(Number(response.effectiveGasPrice)) }} ETH</p>
</template>
<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref } from 'vue';
import { Alchemy, Network, Utils } from "alchemy-sdk";
const config = {
    apiKey: "9g-OGdr_5kCCe7D-EGtp90AnejEmD8pv", // Replace with your API key
    network: Network.ETH_GOERLI, // Replace with your network
};
const alchemy = new Alchemy(config);
const tid=useRoute().params.id;
const response = ref();
(async () => {
    response.value = await alchemy.core.getTransactionReceipt(tid);
    console.log(response);
})();
</script>