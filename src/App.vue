<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
      <nav>
        <RouterLink to="/">Homey  </RouterLink>
        <RouterLink to="/nft">  NFT</RouterLink>
      </nav>
  </header>
  <RouterView />
</template>
