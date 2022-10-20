<template>
  <div class="container">
    <!-- Sidebar-->
    <div class="bg-white w-25">
      <router-link class="list-group-item list-group-item-action p-3" :to="{name:'Notice_List'}">공지사항</router-link>
      <router-link class="list-group-item list-group-item-action p-3" :to="{name:'Qna_List'}">문의게시판</router-link>
      <router-link class="list-group-item list-group-item-action p-3" :to="{name:'Item_List_Admin'}">판매글 관리</router-link>
      <router-link class="list-group-item list-group-item-action p-3" :to="{name:'Member_List'}">회원 관리</router-link>
    </div>
  </div>
</template>

<script>
export default {
    setup() {

  }
}
</script>

<style scoped>
</style>