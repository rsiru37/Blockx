<template>
    <h1>Welcome to NFT Page</h1>
    <div class="row">
          <div class="col-md-8">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Search..." v-model="search_data">
              <div v-if="choice!=0">
                <button class="btn btn-primary" v-on:click="searchfn()">Search</button>
              </div>
              <div v-else>
                <button type="submit" class="btn btn-primary" disabled>Search</button>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="input-group">
              <select class="form-select" v-model="choice">
                <option value="0">Filter by...</option>
                <option value="1">Floor Price</option>
                <option value="2">Transaction Hash</option>
                <option value="3">BLOCK HASH/ Block No.</option>
              </select>
            </div>
          </div>
    </div>
    <br><br>
    <p>{{ response }}</p>
</template>

<script setup>
import { ref } from 'vue'
import { Alchemy, Network } from "alchemy-sdk";
const search_data=ref();
const response=ref();
const config = {
    apiKey: "9g-OGdr_5kCCe7D-EGtp90AnejEmD8pv", // Replace with your API key
    network: Network.ETH_GOERLI, // Replace with your network
};
const alchemy = new Alchemy(config);
const choice = ref(0);
async function searchfn(){
    if(choice.value ==1){
        console.log(search_data.value);
    try{
        response.value = await alchemy.nft.getFloorPrice(search_data.value);
    }
    catch(err){
        response.value = err.reason;
    }
    }
}
</script>