<script setup lang="ts"></script>

<template>
  <div class="wrapper">
    <header class="header"></header>

    <main class="main">
      <RouterView />
    </main>

    <footer class="footer"></footer>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.header {
  height: 60px;
  background-color: #dd8f29;
  border-bottom: 1px solid #dee2e6;
}
.main {
  flex: 1;
  padding: 20px;
  background-color: #ffffff;
}
.footer {
  height: 40px;
  background-color: #f8f9fa;
  border-top: 1px solid #dee2e6;
  text-align: center;
  line-height: 40px;
}
</style>
