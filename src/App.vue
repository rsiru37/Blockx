<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="header" style="margin: auto; text-align: center;">
      <h1 margin="auto">BLOCK EXPLORER</h1>
      <h3 margin="auto">For Ethereum Mainnet</h3>
    </div>
      <nav>
        <RouterLink to="/">Home  </RouterLink>
        <!-- <RouterLink to="/nft">  NFT</RouterLink> -->
      </nav>
  </header>
  <RouterView />
</template>
