<template>
  <form @submit.prevent="joinProcess">
   <h1>회원가입</h1>
   <hr>
   <b>아이디</b>
   <input  type="text"
          v-model="join.id"
          placeholder="Enter id"
          required
          maxLength="12">
   <span :class="id_color">{{id_message}}</span>
   
   <b>비밀번호</b>
   <input  type="password"
          placeholder="Enter password"
          v-model.lazy="join.password"
          required>

  <b>비밀번호 확인</b>
   <input  type="password"
          placeholder="Enter password"
          v-model.lazy="pw_check"
          required>

  <b></b>
   <input  type="text"
          maxLength ="15"
          placeholder="Enter name"
          v-model.lazy="join.name"
          required>

   <b>이름</b>
   <input  type="text"
          maxLength ="15"
          placeholder="Enter name"
          v-model.lazy="join.name"
          required>
   
   <b>전화번호</b>
  <input  type="number"
          placeholder="예) 010-1234-5678"
          pattern="010-[0-9]{3,4}-[0-9]{4}"
          
          v-model="join.phone"
          required>
   
   <b>이메일</b>
   <input  type="text"
          placeholder="Enter email"
          v-model="join.email"
          required >
   <span :class="email_color">{{email_message}}</span>

  <b>주소
        <input class="focus:outline-none focus:ring focus:border-blue-600 border-b-2 border-black pt-2 px-2 mb-3 mr-10"  
            type="text" id="sample4_postcode" name="post_number" placeholder="우편번호" readonly required>
        <button class="border-2 border-gray-400 rounded bg-gray-100 p-1 inline-block"
            type="button" @click="addressApi">검색</button><br>

        <input class="mr-10 focus:outline-none focus:ring focus:border-blue-600 border-b-2 border-black pt-2 px-2 mb-3"   
            type="text" id="sample4_roadAddress" name="address1" placeholder="도로명주소" readonly>
        <span id="guide" style="color:#999;display:none"></span>

        <input class="focus:outline-none focus:ring focus:border-blue-600 border-b-2 border-black pt-2 px-2"   
            type="text" id="sample4_detailAddress" name="address4" placeholder="상세주소" required>
    </b>

      <div class="clearfix">
         <button type="submit" class="submitbtn">회원가입</button>
         <button type="reset" class="cancelbtn">다시작성</button>
      </div>
        </form>
</template>

<script>
import {ref, watch} from 'vue';
import axios from '../../axios/axiossetting.js';
import {useRouter} from 'vue-router';
export default {
  setup() {
    const join = ref({
     id:'', 
     password:'',
     name: '',
     phone:'010',
     email:'',
     address:''
   });

    const id_message=ref('');
    const email_message=ref('');
    const id_color=ref('');
    const email_color=ref('');

    const pw_check = ref('');
    
    const router = useRouter();

    const idcheck = async () => {
      try {
        console.log("idcheck=" + join.value.id);
        //const res = await axios.get(`members/idcheck?id=${join.value.id}`)
        const res = await axios.get("members/idcheck", { params: { id: join.value.id } });
        console.log("res.data = " + res.data);
        if (res.data == 1) {
          id_message.value = "이미 사용중인 아이디 입니다.";
          id_color.value = "red";
        } else {
          id_message.value = "사용가능한 아이디 입니다.";
          id_color.value = "green";
        }
      } catch (err) {
        console.log("err" + err);
      }
    }; //idcheck end

    watch(
      () => join.value.id,
      (next, prev) => {
        console.log("watch(id):" + prev + "=>" + next);
        var pattern = /^\w{5,12}$/;
        if (!pattern.test(join.value.id)) {
          id_message.value = "영문자 숫자 _로 5~12자 가능합니다.";
          id_color.value = "red";
        } else {
          idcheck();
        }
      }
    );

    watch(
      ()=>join.value.email,
      (next, prev )=>{
        console.log('watch(email)' + prev + "=>" + next);
        var pattern = /^\w+@\w+[.]\w{3}$/;
        if(!pattern.test(join.value.email)) {
          email_message.value = "이메일형식이 맞지 않습니다.";
          email_color.value = 'red';
        } else {
          email_message.value = "이메일형식이 일치합니다.";
          email_color.value = 'green';
        } // else end
    }) // watch end

    const joinProcess = async () => {
      if (id_color.value == "red") {
        alert("아이디를 확인하세요");
      } else if (join.value.password != pw_check.value) {
        alert("비밀번호를 확인하세요");
      } else if (email_color.value == "red") {
        alert("email을 확인하세요");
      } else {
        try {
          const res = await axios.post("members/new", join.value);
          if (res.data == 1) {
            alert("회원가입을 축하합니다. ");
            router.push({
              name: "Login",
            });
          }
        } catch (err) {
          console.log(err);
        }
      }
    };

    const addressApi = () => {
        new daum.Postcode({
            oncomplete: function(data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var roadAddr = data.roadAddress; // 도로명 주소 변수
                var extraRoadAddr = ''; // 참고 항목 변수

                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraRoadAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                   extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraRoadAddr !== ''){
                    extraRoadAddr = ' (' + extraRoadAddr + ')';
                }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById('sample4_postcode').value = data.zonecode;
                document.getElementById("sample4_roadAddress").value = roadAddr;

                var guideTextBox = document.getElementById("guide");
                // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
                if(data.autoRoadAddress) {
                    var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
                    guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
                    guideTextBox.style.display = 'block';

                } else if(data.autoJibunAddress) {
                    var expJibunAddr = data.autoJibunAddress;
                    guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
                    guideTextBox.style.display = 'block';
                } else {
                    guideTextBox.innerHTML = '';
                    guideTextBox.style.display = 'none';
                }
            }
        }).open();
    }       

    return {
      join, id_message, id_color, email_message, email_color, joinProcess, pw_check,
      addressApi
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



input[type=radio]{
   width: 5%;
    display: inline-block;
    border: none;
}


input[type=text]:focus, input[type=password]:focus {
  box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
    outline: none;
}
button[type=button] {
    background:#1263CE;
    width: 100%;
    height: 40px;
    margin-top: 5px;
    margin-bottom: 16px;
    border: none;
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