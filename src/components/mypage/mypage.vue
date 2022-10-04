<template>
  <!-- 왼쪽 네비게이션 -->
   <div style="margin-top:300px; margin-bottom:300px">
      <div class="row">
         <div>
                <div>
                    <aside>
                        <h3>오늘의 반찬</h3>
                        <ul class="nav nav-pills flex-column">
                            <li class="nav-item"><a class="nav-link active bg-danger" href="#">마이페이지</a></li>
                            <li class="nav-item"><a class="nav-link" href="#">찜 목록</a></li>
                            <li class="nav-item"><a class="nav-link" href="#">구매 목록</a></li>
                            <li class="nav-item"><a class="nav-link" href="#">판매 목록</a></li>
                            <li class="nav-item"><a class="nav-link" href="#">개인정보수정</a></li>
                            <li class="nav-item"><a class="nav-link" href="#">회원탈퇴</a></li>
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