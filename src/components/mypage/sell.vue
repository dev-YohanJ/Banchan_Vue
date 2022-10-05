<template>
  <!-- 왼쪽 네비게이션 -->
   <div style="margin-top:100px; margin-bottom:100px">
      <div class="row">
         <div>
                <div>
                    <aside>
                        <h3>오늘의 반찬</h3>
                        <ul class="nav nav-pills flex-column">
                            <li><router-link class="nav-item nav-link" :to="{name:'Mypage'}">마이페이지</router-link></li>
                            <li><router-link class="nav-item nav-link" :to="{name:'Wish'}">찜 목록</router-link></li>
                            <li><router-link class="nav-item nav-link" :to="{name:'Buy'}">구매 목록</router-link></li>
                            <li><router-link class="nav-item nav-link active bg-danger" :to="{name:'Sell'}">판매 목록</router-link></li>
                            <li><router-link class="nav-item nav-link" :to="{name:'Update'}">개인정보수정</router-link></li>
                            <li><router-link class="nav-item nav-link" :to="{name:'Secession'}">회원탈퇴</router-link></li>
                        </ul>
                    </aside>
                </div>
         </div>

            <div>
                 <div class="pic" style="width: 310px; height: 310px;">
                        <img src="#" style="width: 100%; height: 100%; object-fit:cover;">
                  </div>
            </div>
            <div class="text-area">
                <div class="nick-area">
                    <span class="nick">닉네임입니다</span><button @click="add">수정</button>
                </div>
                <textarea   rows="10" cols="30"
                    class="form-control"
                    v-model.trim="content"
                    maxlength="200"
                    style="resize:none">
                </textarea>
                <button>소개글 수정</button>
            </div>
      </div>
   </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.row {
    margin-left: 100px;
}
.pic {
    margin-right: 30px;
}
h3 {
    margin: 10px 30px 0px 0px;
}
.introduce {
    
}
.mybody {
    float:right;
}
</style>