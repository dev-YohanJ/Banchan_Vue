<template>
  <!-- 왼쪽 네비게이션 -->
   <div style="margin-top:100px; margin-bottom:100px">
      <div class="row">
        <div class="buble">
            <div>
                <aside>
                    <h3>오늘의 반찬</h3>
                    <ul class="nav nav-pills flex-column">
                        <li><router-link class="nav-item nav-link" :to="{name:'Mypage'}">마이페이지</router-link></li>
                        <li><router-link class="nav-item nav-link" :to="{name:'Wish'}">찜 목록</router-link></li>
                        <li><router-link class="nav-item nav-link" :to="{name:'Buy'}">구매 목록</router-link></li>
                        <li><router-link class="nav-item nav-link" :to="{name:'Sell'}">판매 목록</router-link></li>
                        <li><router-link class="nav-item nav-link active" :to="{name:'Update_Check'}">개인정보수정</router-link></li>
                        <li><router-link class="nav-item nav-link" :to="{name:'Secession'}">회원탈퇴</router-link></li>
                        <li><router-link class="nav-item nav-link" :to="{name:'Mypage'}">공지사항</router-link></li>
                        <li><router-link class="nav-item nav-link" :to="{name:'Mypage'}">문의게시판</router-link></li>
                    </ul>
                </aside>
            </div>
        </div>
        <form class="main-area" @submit.prevent="checkProcess">
            <b>비밀번호 입력</b>
            <input  
              type="password"
              maxlength="30"
              placeholder="비밀번호"
              v-model="member.password"
              required>

            <b>비밀번호 확인</b>
            <input
              type="password"
              placeholder="비밀번호 확인"
              v-model="pw_check"
              required>
            <div class="btnmar">
            <button class="btn btn-success">확인</button>
            </div>

        </form>
      </div>
   </div>
</template>

<script>
import {ref, watch} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import axios from '../../axios/axiossetting.js';
export default {
  props: {
        parent_id: {
            type: String,
            required: true
        }
    },
  emits:['parent_getSession'],
  
  setup(props, context) {
    context.emit("parent_getSession");
    const member = ref({
      id:'',
      password:''
    })
    const pw_check = ref('');
    const router = useRouter();

    const checkProcess = async () => {
      const id = props.parent_id;
      member.value.id = id;
      console.log("checkProcess = "+id);
      console.log(member.value.password+ "pwcheck=" +pw_check.value);
      if (member.value.password != pw_check.value) {
        alert("비밀번호를 확인하세요.");
      } else {
        try {
          const res = await axios.post("members/pwcheck", member.value);
          console.log(res.data);
          if (res.data == 1) {
            router.push({
              name: "Update",
            });
          } else {
            alert("비밀번호가 틀렸습니다.");
            return false;
          }
          
          
        } catch (err) {
          console.log(err);
        }
      }
    };

    return {
      checkProcess, pw_check, member
    }
  
  }

}
</script>

<style scoped>
.btnmar {
  margin-left: 80px;
}
button {
  width: 100px;
}
form {font-family: Arial, Helvetica, sans-serif; width: 300px;}
* {box-sizing: border-box}


input{border-radius:3px;border:1px solid lightgray}
input[type=text], input[type=number], input[type=password] {
    width: 100%;
    padding: 10px;
    margin: 5px 0 22px 0;
    display: inline-block;
   
}

input[type=number]::-webkit-outer-spin-button,
input[type=number]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=text]:focus, input[type=password]:focus {
  box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
    outline: none;
}

button:hover {
    opacity:1;
    
}
button:focus{
   outline:none;
}

.clearfix::after {
    content: "";
    clear: both;
    display: table; 
}

b {
   width: 100%;
   display: block
}
.buble {
    margin-right: 20px;
}
.main-area {
  padding: 20px;
}
span{display:inline-block;margin-top:-20px;font-size:10px}
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