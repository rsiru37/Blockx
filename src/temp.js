import { Alchemy, Network} from "alchemy-sdk";
const config = {
    apiKey: "9g-OGdr_5kCCe7D-EGtp90AnejEmD8pv", // Replace with your API key
    network: Network.ETH_GOERLI, // Replace with your network
};

// Creates an Alchemy object instance with the config to use for making requests
const alchemy = new Alchemy(config);
let response = await alchemy.core.getBalance("0x884D7cFe40526BCe1A5be9c89Fd666b8eFcF2056", "latest")
//console.log(Utils.formatEther(parseInt(response)),"Hello");
console.log(parseInt(response));
console.log(await alchemy.core.getBlockNumber());
//console.log(await alchemy.nft.getNftsForOwner('0x884D7cFe40526BCe1A5be9c89Fd666b8eFcF2056'));
// try{
//   let tx = await alchemy.core.getAssetTransfers({
//     toAddress:"",
//     category:["external", "internal", "erc721", "erc1155"]
//   })
//   console.log(tx,tx.transfers.length,"hello");
//   console.log(tx.transfers[0].rawContract);
// }
// catch(err){
//   console.log(err.reason);
// }
// let txh = await alchemy.core.getBlock(9902391);
let nft = await alchemy.nft.getNftMetadata("0x5180db8F5c931aaE63c74266b211F580155ecac8", "1590", {});
console.log(nft);