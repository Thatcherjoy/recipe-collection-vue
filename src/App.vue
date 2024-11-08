<template>
  <div id="app" class="app-background">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.app-background {
  background-image: url("@/assets/background.jpg"); /* Update the path if needed */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
