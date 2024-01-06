<template>
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
              <option value="1">Address</option>
              <option value="2">Transaction Hash</option>
              <option value="3">BLOCK HASH/ Block No.</option>
            </select>
          </div>
        </div>
      </div>
      <div class="container" style="margin-top: 3%, float: left;">
    <p>The Balance is : {{ res }}</p>
      </div>
      <br><br>
    <div v-if="erri == 0">
      <table class="table table-striped">
    <tr align="center">
      <th> S.No</th>
      <th> TX HASH </th>
      <th> BLOCK NO. </th>
      <th> FROM </th>
      <th> TO </th>
      <th> VALUE </th>
    </tr>
    <tbody>
    <tr v-for="(tx,index) in final">
      <td> {{ index+1 }}</td>
      <td> {{ tx.hash }}</td>
      <td> {{ Number(tx.blockNum) }}</td>
      <td> {{ tx.from }}</td>
      <td> {{ tx.to }}</td>
      <td> {{ tx.value }} {{ tx.asset }}</td>
    </tr>
     </tbody>
    </table>
    <h1> NFTS => </h1>
    <h3> {{ nfts }}</h3>
    </div>
    <div v-else>
      <h1>{{ final }}</h1>
    </div>
</template>


<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue'
import { Alchemy, Network } from "alchemy-sdk";
const config = {
    apiKey: "9g-OGdr_5kCCe7D-EGtp90AnejEmD8pv", // Replace with your API key
    network: Network.ETH_GOERLI, // Replace with your network
};
const alchemy = new Alchemy(config);
const erri = ref(1);
const choice = ref(0);
const res = ref(0);
let txsf = ref(0);
let txst = ref(0);
const search_data = ref();
const final = ref("");
const nfts=ref();
const router=useRouter();
async function searchfn(){
  if(choice.value ==1){
    console.log("hrllo", search_data.value);
  try{
  res.value = parseInt(await alchemy.core.getBalance(search_data.value, "latest"));
  console.log(res.value);
  txsf.value = await alchemy.core.getAssetTransfers({
   fromAddress:search_data.value,
   category:["external", "internal", "erc20", "erc721", "erc1155"]
});
  txst.value = await alchemy.core.getAssetTransfers({
    toAddress:search_data.value,
    category:["external", "internal", "erc20", "erc721", "erc1155"]
  });
  nfts.value = await alchemy.nft.getNftsForOwner(search_data.value);
  final.value = txsf.value.transfers.concat(txst.value.transfers);
  console.log("raj from try", txsf.value);
  erri.value = 0;
  }
  catch(err){
    erri.value =1;
    console.log(err.reason,"hello");
    final.value = err.reason;
    console.log(final.value,"Yopies");
  }
  console.log(search_data.value, final.value);
  return final.value;
  }
  else if(choice.value ==2){
    router.push({ name: 'TxhView', params: { id: search_data.value}});
    // catch(err){
    //   final.value = err.reason;
    //   console.log("Error", err);
    // }
    // <RouterLink :to="{name: 'TxhView', params: { id: search_data.value } }">EDIT</RouterLink>
  }
  else if(choice.value ==3){
    console.log("e");
    router.push({ name: 'BlkView', params: { id: search_data.value}});
  }
}
// console.log(await alchemy.core.getBlockNumber());
</script>


