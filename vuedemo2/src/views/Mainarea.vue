<template>
  <div class="main-container">
    <el-row class="content-row">
      <UserManager v-if="cid == 3"></UserManager> 
      <BookType v-if="cid == 1"></BookType> 
      <BookManager v-if="cid == 2"></BookManager>
      <BorrowManager v-if="cid == 0"></BorrowManager> 
      <BookSearch v-if="cid == 4"></BookSearch>          
    </el-row>     
  </div>
</template>

<script>
import UserManager from "./userviews/UserManager.vue"
import BookType from "./bookviews/BookType.vue"
import BookManager from "./bookviews/BookManager.vue"
import BorrowManager from "./borrowviews/BorrowManager.vue"
import BookSearch from "./bookviews/BookSearch.vue"

export default {
  name: 'MainArea',
  components: { UserManager, BookType, BookManager, BorrowManager, BookSearch },
  data() {
    return {           
      cid: 0
    }
  }
}
</script>

<style scoped>
.main-container {
  padding: 20px;
  background-color: #f9f9f9;
}
.content-row {
  height: calc(100vh - 120px);
  overflow-y: auto;
}
</style>
