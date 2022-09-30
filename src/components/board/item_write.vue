<template>
<div id="app">
  <input type="file" @change="onFileChange" />

  <img v-if="url" :src="url" />
</div>
</template>

<script>
import axios from 'axios'
 
export default {
  data() {
  return {
    url: null,
  }
},
methods: {
  onFileChange(e) {
    const file = e.target.files[0];
    this.url = URL.createObjectURL(file);
  }
}
}
</script>

<style>
</style>