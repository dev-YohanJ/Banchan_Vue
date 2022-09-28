<template>
  <form @submit.prevent="loginProcess">
      <h1>로그인</h1>
      <hr>
      <b>아이디</b>
      <input type=text 
             v-model="id" 
             name="id" 
             placeholder="Enter id" 
             required>
	  
	    <b>Password</b>
      <input type=password 
             v-model="password" 
             name="password" 
             placeholder="Enter password" 
             required>
      <label>
        <input type="checkbox" 
               v-model="remember" 
               style="margin-bottom:15px">
          Remember me
      </label>
      <div class=clearfix>
	   		<button type=submit class=submitbtn>로그인</button>
     		<button type=button class=join @click="join">회원가입</button>
	  </div>
   </form>
</template>

<script>
import {useRouter} from 'vue-router'
//npm install vue-cookies
import cookies from 'vue-cookies'//vue에서 쿠키를 사용하기 위한 cookies를 import
import {ref} from 'vue'
import axios from '../../axios/axiossetting.js'
export default {
  emits: ['parent_getSession'],

  setup(props, context) {
    //부모 컴포넌트 App_1.vue에 있는 getSession을 호출한다.
    //<router-view @parent_getSession="getSession" :parent_id="id" />
    console.log('member_login : setup')
    context.emit('parent_getSession', '')
    
    //라우터 사용 가능
    const router = useRouter()
    const join = () => {
      router.push({
        name:'Join' //route의 이름이 'Join'인 경로로 이동
      })
    }

    const remember = ref(false)
    const id = ref('')
    const password = ref('')

    const getCookie = () => {
      //이름이 saveid인 쿠키를 가져온다.
      const cookie_value = cookies.get('saveid')
      console.log('가져온 쿠키 값=' + cookie_value)
      if(cookie_value != null){
        remember.value = true //체크박스 체크
        id.value = cookie_value //쿠키에 저장된 아이디값 input에 나타낸다.
      }else{
        remember.value = false  //체크박스 해제
      }
    }

    getCookie()

    const loginProcess = async () => {
      try {
        const res = await axios.post('members', {
          id: id.value,
          password: password.value
        })
        console.log('login.vue:res.data=' + res.data)
        const result = res.data
        if(result == -1){
          alert('아이디가 존재하지 않습니다.')
        }else if(result == 0){
          alert('비밀번호가 일치하지 않습니다.')
        }else if(result == 1){
          console.log('remember=' + remember.value)
          if(remember.value){ //체크박스 선택한 경우
            /*
              set(name, value, expire) : expire(만료일)를 갖는 name과 value를 가진 쿠키 설정
                1s : 1초
                1h : 1시간 (60*60)
                1d : 1일   (24*60*60)
                1m : 1달
                new Date(2021,08,30).toUTCString() : 특정 시간
                (toUTCString() - 날짜를 UTC(세계 협정시) 형식으로 표현)
            */
            cookies.set('saveid', id.value, '1d') //1일 동안 유효한 쿠키 설정
            //cookies.set('saveid', id.value, 24*60*60)
          }else{  //체크박스 해제한 경우
            cookies.remove('saveid')  //쿠키 제거
          }
          
          router.push({
            name: 'Board_List'
          })
        }
      }catch(err){
        console.log(err)
      }
    }

    return {
      join, id, password, remember, loginProcess
    }
  }
}
</script>

<style scoped>
* {box-sizing: border-box}

input[type=text], input[type=password] {
    width: 100%;
    padding: 15px;
    margin: 5px 0 22px 0;
    display: inline-block;
    border: none;
    background: #f1f1f1;
}

input[type=text]:focus, input[type=password]:focus {
    background-color: #ddd;
    outline: none;
}

button {
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer; /* 손가락 커서 모양 */
    width: 100%;
    opacity: 0.9;
}
button:hover {
    opacity:1;
    
}
button:focus{
   outline:none;
}

/* 취소 버튼*/
.join{
    padding: 14px 20px;
    background-color: #f44336;
}

.join, .submitbtn {
  height:45px;
  float: left;
  width: 50%;
}

a{color:white;text-decoration:none;}

form {
    background-color: #fefefe;
    margin: 5% auto 15% auto; /* 5% from the top, 15% from the bottom and centered */
    border: 1px solid #888;
    width: 50%; /* Could be more or less, depending on screen size */
    padding: 16px;
}

hr {
    border: 1px solid #f1f1f1;
    margin-bottom: 25px;
}
 
/* Clear floats */
.clearfix::after {
    content: "";
    clear: both;
    display: table; 
}
</style>