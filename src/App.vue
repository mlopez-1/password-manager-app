<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <v-app>
    <RouterView />
  </v-app>
</template>

<style>
.v-application {
  background-color: #f8f9fa !important;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #6B8E23;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #556B2F;
}
</style>
