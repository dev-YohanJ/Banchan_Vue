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
                        <li><router-link class="nav-item nav-link" :to="{name:'Sell'}">판매 목록</router-link></li>
                        <li><router-link class="nav-item nav-link" :to="{name:'Update'}">개인정보수정</router-link></li>
                        <li><router-link class="nav-item nav-link active" :to="{name:'Secession'}">회원탈퇴</router-link></li>
                        <li><router-link class="nav-item nav-link" :to="{name:'Mypage'}">공지사항</router-link></li>
                        <li><router-link class="nav-item nav-link" :to="{name:'Mypage'}">문의게시판</router-link></li>
                    </ul>
                </aside>
            </div>
        </div>
        <div class="text-area">
                    <h4>탈퇴 전 유의사항</h4>
                    <ul class="ul">
                        <li>탈퇴 후 7일간 재가입이 불가능합니다.</li>
                        <li>유료 구매한 아이템은 자동 소멸되며, 환불이 불가합니다.</li>
                        <li>탈퇴 시, 계정의 모든 정보는 삭제되며 재가입 시에도 복구되지 않습니다.</li>
                        <li>법령에서 일정기간 정보 보관을 규정하거나 서비스 운영상 반드시 필요한 경우,<br>
                            개인정보처리방침에 공개한 내용과 같이 일정한 기간동안 개인정보를 보관 후 <br>파기합니다.</li>
                    </ul>
                    <div class="qwer">
                        <button @click="showModal">탈퇴하기</button>
                    </div>
        </div>

      </div>
   </div>
</template>


<script>
import {ref, watch} from 'vue';
import axios from '../../axios/axiossetting.js';
export default {
    props: {
        parent_id: {
            type: String,
            required: true
        }
    },
    setup(props,context) {
        context.emit("parent_getSession");
        
        const showModal = ()=> {
            //store에 값을 변경합니다.
            store.dispatch('display', true);
        }

        return {
            showModal
        }
    }
}
</script>

<style scoped>
button {
    width: 150px;
    height: 37px;
    border: none;
    background: #c64832;
    color: #ffffff;
    outline: none;
}
button:hover {
    background: #993423;
}
.qwer {
    text-align: center;
}
h4{
    font-weight: 700;
    margin-bottom: 30px;
}
.text-area{
    margin-left: 60px;
}
.ul {
    width:600px;
    padding-inline-start: 40px;
    margin-bottom: 60px;
    color: rgb(102, 102, 102);
}
.nav-link.active,
.show > .nav-link { /* 공통 */
    background: #c64832;
}
.active:hover { /* 공통 */
   background: #993423;
}
.row { /* 공통 */
    margin-left: 15px;
}
h3 { /* 공통 */
    margin: 10px 30px 0px 0px;
}
</style>