<template>
  <form @submit.prevent="joinProcess">
      <h1>회원 가입 페이지</h1>
      <hr>
      <b>아이디</b>
      <!-- watch로 데이터 변화 확인, lazy 붙지 않는다. -->
      <input type="text" 
             v-model="join.id" 
             placeholder="Enter id" 
             maxLength="12" 
             required>
      <span :class="id_color">{{id_message}}</span>
	  
	  <b>비밀번호</b>
      <input type="password" 
             v-model.lazy="join.password"
             placeholder="Enter password" 
             required>
      
      <b>이름</b>
      <input type="text" 
             v-model.lazy="join.name" 
             placeholder="Enter name" 
             maxLength="15" 
             required>
      
      <b>나이</b>
      <input type="text" 
             v-model.lazy="join.age" 
             placeholder="Enter age" 
             maxLength="2" 
             pattern="[1-9][0-9]" 
             required>
      
      <b>성별</b>
      <div>
	    <input type="radio" name="gender" v-model.lazy="join.gender" value="남" checked><span>남자</span>
	   	<input type="radio" name="gender" v-model.lazy="join.gender" value="여"><span>여자</span> 
	  </div>
      
      <b>이메일 주소</b>
      <!-- watch로 데이터 변화 확인, lazy 붙지 않는다. -->
      <input type="text" 
             v-model="join.email" 
             placeholder="Enter email" 
             required>
      <span :class="email_color">{{email_message}}</span>
      
      <div class="clearfix">
	   		<button type="submit" class="submitbtn">회원가입</button>
     		<button type="reset" class="cancelbtn">다시작성</button>
	  </div>
   </form>
</template>

<script>
import {ref, watch} from 'vue'
import axios from '../../axios/axiossetting.js'
import {useRouter} from 'vue-router'
export default {
  setup() {
    const join = ref({
      id:'',
      password:'',
      name:'',
      age:'',
      gender:'남',
      email:''
    })
    const id_message=ref('')
    const email_message=ref('')
    const id_color=ref('')
    const email_color=ref('')

    const router = useRouter()

    const idcheck = async ()=>{
      try{
        console.log('idcheck=' + join.value.id)
        //const res = await axios.get(`members/idcheck?id=${join.value.id}`)
        const res = await axios.get('members/idcheck', {params : {id:join.value.id}})
        console.log('res.data=' + res.data)
        if(res.data==1){
          id_message.value = '이미 사용중인 아이디입니다.'
          id_color.value = 'red'
        }else{
          id_message.value = '사용가능한 아이디입니다.'
          id_color.value = 'green'
        }
      }catch(err){
        console.log('err' + err)
      }
    }

    /*
        1. 객체 전체를 watch하는 경우
            watch(join.value, (next,prev)=>{

            })
        2. 객체의 속성 일부분을 watch하는 경우 첫번째 매개변수를 애로우 함수로 작성한다.
            watch(
                ()=>join.value.id,
                (next,prev)=>{
            }) 
     */
    watch(
      ()=>join.value.id,
      (next,prev)=>{
        console.log('watch(id):' + prev + '=>' + next)
        let pattern = /^\w{5,12}$/
        if(!pattern.test(join.value.id)) {
          id_message.value = '영문자 숫자 _로 5~12자 가능합니다.'
          id_color.value = 'red'
        }else{
          idcheck()
        }
      }
    )

    watch(
      ()=>join.value.email,
      (next,prev)=>{
        console.log('watch(email):' + prev + '=>' + next)
        let pattern = /^\w+@\w+[.]\w{3}$/
        if(!pattern.test(join.value.email)) {
          email_message.value = '이메일 형식이 맞지 않습니다.'
          email_color.value = 'red'
        }else{
          email_message.value = '이메일 형식이 일치합니다.'
          email_color.value = 'green'
        }
      }
    )

    const joinProcess = async ()=>{
      if(id_color.value=='red'){
        alert('아이디를 확인하세요')
      }else if(email_color.value=='red'){
        alert('email을 확인하세요')
      }else{
        try{
          const res = await axios.post('members/new', join.value)
          if(res.data==1){
            alert('회원 가입을 축하합니다.')
            router.push({
              name:'Login'
            })
          }
        }catch(err){
          console.log(err)
        }
      }
    }

    return {
     join, joinProcess, id_message, id_color, email_message, email_color
    }
  }
}
</script>

<style scoped>
.red{color:red}
.green{color:green}
 input[type=text] + span{   position: relative;
        top: -20px;
 }
form {font-family: Arial, Helvetica, sans-serif;}
* {box-sizing: border-box}


input{border-radius:3px;border:1px solid lightgray}
input[type=text], input[type=password] {
    width: 100%;
    padding: 10px;
    margin: 5px 0 22px 0;
    display: inline-block;
   
}


input[type=radio]{
	width: 5%;
    display: inline-block;
    border: none;
}


input[type=text]:focus, input[type=password]:focus {
  box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
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
.cancelbtn {
    padding: 14px 20px;
    background-color: #f44336;
}

.cancelbtn, .submitbtn {
  float: left;
  width: 50%;
}

form {
    background-color: #fefefe;
    margin: 5% auto 15% auto; /* 5% from the top, 15% from the bottom and centered */
    border: 1px solid lightgray;
    width: 600px; /* Could be more or less, depending on screen size */
    padding: 16px;
}

hr {
    border: 1px solid #f1f1f1;
    margin-bottom: 25px;
}
 
b + div{width: 100%;
    padding: 10px;
    margin: 5px 0 22px 0;
    display: inline-block;
    border: none;
    background: #f1f1f1;}

/* Clear floats */
.clearfix::after {
    content: "";
    clear: both;
    display: table; 
}

h1{text-align:center}

b {
	width: 100%;
	display: block
}

span{display:inline-block;margin-top:-20px;font-size:10px}

</style>