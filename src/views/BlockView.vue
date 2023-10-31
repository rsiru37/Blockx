<template>
    <div v-if="erri == 1">
        <h1> {{ response }}</h1>
    </div>
    <div v-else>
        <h1>BLOCK HASH : {{ response.hash }}</h1>
    <p>BLOCK NUMBER : {{ response.number }}</p>
    <p>PARENT HASH : {{ response.parentHash }}</p>
    <p>Date of Inception : {{ new Date(response.timestamp*1000).toLocaleString() }}</p>
    <p>GAS LIMIT : {{ Number(response.gasLimit) }}</p>
    <p>GAS USED : {{ Utils.formatEther(Number(response.gasUsed)) }}</p>
    <p> MINER : {{ response.miner }}</p>
    <h5>List of Transactions : </h5>
    <div v-for="(tx,index) in response.transactions">
        <p> {{ index+1 }} <RouterLink :to="{name: 'TxhView', params: { id: tx } }">{{ tx }}</RouterLink></p>
    
    </div>
    <p v-for="(tx,index) in response.transactions"> {{ index+1 }} {{ tx }} <br></p>
    </div>
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
const bid=useRoute().params.id;
const response = ref();
const erri =ref(1);
(async () => {
    try{
        console.log("hello");
        if(bid.length<66){
            response.value = await alchemy.core.getBlock(Number(bid));
        }
        else{
            response.value = await alchemy.core.getBlock(bid);
        }
        console.log(response);
        erri.value=0;
    }
    catch(err){
        response.value = err.reason
        console.log("err", err, err.reason);
        erri.value=1;
    }
})();
</script>