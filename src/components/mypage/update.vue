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
                    </ul>
                </aside>
            </div>
        </div>
        <form @submit.prevent="updateProcess">
            <b>아이디</b>
            <input  type="text"
                    v-model="update.id"
                    placeholder="아이디"
                    readonly
                    maxLength="12">
            
            <b>비밀번호</b>
            <input  type="password"
                    maxlength="30"
                    placeholder="비밀번호"
                    v-model="update.password"
                    required>
            <span :class="pass_color" class="msg">{{pass_message}}</span>

            <b>비밀번호 확인</b>
            <input  type="password"
                    placeholder="비밀번호 확인"
                    v-model="pw_check"
                    required>
            <span :class="pass_check_color" class="msg">{{pass_check_message}}</span>

            <b>이름</b>
            <input  type="text"
                    maxLength ="15"
                    placeholder="이름"
                    v-model="update.name"
                    required>
            <span :class="name_color" class="msg">{{name_message}}</span>

            <b>닉네임</b>
            <input  type="text"
                    maxLength ="20"
                    placeholder="닉네임"
                    v-model="update.nickname"
                    required>
            <span :class="nick_color" class="msg">{{nick_message}}</span>

            <b>전화번호</b>
            <input  type="text"
                    placeholder="예) 01012345678"
                    maxlength="11" 
                    v-model.lazy="update.phone"
                    required>
            <span :class="phone_color" class="msg">{{phone_message}}</span>
            <b>이메일</b>
            <input  type="text"
                    placeholder="이메일"
                    v-model="update.email"
                    required >
            <span :class="email_color" class="msg">{{email_message}}</span>

            <b>주소
                <input class="focus:outline-none focus:ring focus:border-blue-600 border-b-2 border-black pt-2 px-2 mb-3 mr-10"  
                    type="number" name="post_number" placeholder="우편번호" v-model="post" maxlength="5" readonly>
                <button class="border-2 border-gray-400 rounded bg-gray-100 p-1 inline-block"
                    type="button" @click="addressApi">검색</button><br>

                <input class="mr-10 focus:outline-none focus:ring focus:border-blue-600 border-b-2 border-black pt-2 px-2 mb-3"   
                    type="text" name="address1" placeholder="도로명주소" v-model="roadaddr" maxlength="30" readonly>

                <input class="focus:outline-none focus:ring focus:border-blue-600 border-b-2 border-black pt-2 px-2"   
                    type="text" id="sample4_detailAddress" name="address4" v-model="detailaddr" placeholder="상세주소" maxlength="30" required>
            </b>

            <div class="clearfix">
                <button  type="submit" class="submitbtn">수정</button>
            </div>
        </form>
      </div>
   </div>
</template>

<script>
import {ref, watch} from 'vue';
import axios from '../../axios/axiossetting.js';
import {useRouter} from 'vue-router';
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
    const update = ref({
     id:'', 
     password:'',
     name: '',
     nickname:'',
     phone:'',
     email:'',
     address:''
   });

    const email_message=ref('');
    const email_color=ref('');
    const pass_message=ref('');
    const pass_color=ref('');
    const pass_check_message=ref('');
    const pass_check_color=ref('');
    const name_color=ref('');
    const name_message=ref('');
    const nick_color=ref('');
    const nick_message=ref('');
    const phone_color=ref('');
    const phone_message=ref('');

    const nickchk = ref('');

    const post = ref('');
    const roadaddr = ref('');
    const detailaddr = ref('');

    const pw_check = ref('');
    
    const router = useRouter();

    watch( ()=> props.parent_id , ()=>{
      console.log('watch=' + props.parent_id);
      if (props.parent_id) {
        console.log(props.parent_id);
        load();
      }
    })

    const addr = ()=> {
      update.value.address = post.value + "/" + roadaddr.value + "/" + detailaddr.value
      console.log(update.value.address);
    }

    const nickcheck = async () => {
      try {
        const id = props.parent_id;
        console.log("load id="+ id);
        const res = await axios.get("members/nickcheck", { params: { nickname: update.value.nickname } });
        console.log("res.data = " + res.data);
        if (res.data == 1) {

          const res2 = await axios.get("members/nickcheck2", {params: { id: id, nickname: update.value.nickname }})
          if(res2.data == 1) {
            nick_message.value = "원래 사용한 닉네임 입니다.";
            nick_color.value = "green";
          } else {
            nick_message.value = "이미 사용중인 닉네임 입니다.";
            nick_color.value = "red";
          }
        } else {
          nick_message.value = "사용가능한 닉네임 입니다.";
          nick_color.value = "green";
        }
      } catch (err) {
        console.log("err" + err);
      }
    }; //nickcheck end

    watch(
      () => update.value.password,
      () => {
        var pattern = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/
        if (!pattern.test(update.value.password)) {
          pass_message.value = "영문,숫자,특수문자를 조합하여 입력해주세요.(8-20자)";
          pass_color.value = "red";
        } else {
          pass_message.value = "영문,숫자,특수문자를 조합하여 입력해주세요.(8-20자)";
          pass_color.value = "green";

        }
      }
    );

    watch(
      () => pw_check.value,
      () => {
        if (pass_color.value == "red") {
          pass_check_message.value = "비밀번호를 형식에 맞게 입력하세요.";
          pass_check_color.value = "red";
        } else {
            if (update.value.password != pw_check.value) {
            pass_check_message.value = "비밀번호가 일치하지 않습니다.";
            pass_check_color.value = "red";
          } else {
            pass_check_message.value = "비밀번호가 일치합니다.";
            pass_check_color.value = "green";
          }
        }
      }
    )

    watch(
      () => update.value.name,
      () => {
        var pattern = /^[가-힣]{2,}$/
        if (!pattern.test(update.value.name)) {
          name_message.value = "한글로 입력해주세요.";
          name_color.value = "red";
        } else {
          name_message.value = "올바르게 입력되었습니다.";
          name_color.value = "green";
        }
      }
    )
    
    watch(
      () => update.value.nickname,
      () => {
        var pattern = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,12}$/;
        if (!pattern.test(update.value.nickname)) {
          nick_message.value = "한글,영문자,숫자로 2~12자까지 가능합니다.";
          nick_color.value = "red";
        } else {
          nickcheck();
        }
        
      }
    );

    watch(
      () => update.value.phone,
      () => {
        console.log(update.value.phone)
        var pattern = /^010[0-9]{8}$/
        if (!pattern.test(update.value.phone)) {
          phone_message.value = "형식에 맞게 입력해주세요.";
          phone_color.value = "red";
        } else {
          phone_message.value = "사용 가능한 번호입니다.";
          phone_color.value = "green";
        }
      }
    )

    watch(
      ()=>update.value.email,
      (next, prev )=>{
        console.log('watch(email)' + prev + "=>" + next);
        var pattern = /^\w+@\w+[.]\w{3}$/;
        if(!pattern.test(update.value.email)) {
          email_message.value = "이메일형식이 맞지 않습니다.";
          email_color.value = 'red';
        } else {
          email_message.value = "이메일형식이 일치합니다.";
          email_color.value = 'green';
        } // else end
    }) // watch end

    watch(
      ()=> detailaddr.value,
      () => {
        addr();
      }
    )

    watch(
      ()=> roadaddr.value,
      () => {
        addr();
      }
    )

    const updateProcess = async () => {
      if (update.value.password != pw_check.value) {
        alert("비밀번호를 확인하세요");
      } else if (update.value.nickname == "red") {
        alert("닉네임을 확인하세요")
      } else if (email_color.value == "red") {
        alert("email을 확인하세요");
      } else if (post.value == '') {
        alert("주소 검색을 확인하세요")
      } else {
        try {
          const res = await axios.patch("members/update", update.value);
          console.log("res.data=" + res.data);
          if (res.data == 1) {
            alert("수정되었습니다.");
            router.push({
              name: "Mypage",
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
                var roadAddr = ''; // 도로명 주소 변수
                var extraRoadAddr = ''; // 참고 항목 변수

                //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    roadAddr = data.roadAddress;
                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    roadAddr = data.jibunAddress;
                }


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
                post.value = data.zonecode;
                roadaddr.value = roadAddr;
            }
        }).open();
    }    
    
    const load = async() => {
      const id = props.parent_id;
      console.log("load id="+ id);
      try {
        const res = await axios.get(`members/${id}`)
        update.value = res.data;
        update.value.password = "";
        const adr = update.value.address.split("/");
        console.log(adr);
        post.value = adr[0]
        roadaddr.value = adr[1]
        detailaddr.value = adr[2]


        nickchk.value = update.value.nickname;

      } catch(err) {
          console.log(err)
          console.log("여기는 에러")
      }
    }
    
    load();

    return {
      update, email_message, email_color, updateProcess, pw_check,
      addressApi, pass_message, pass_color, pass_check_message, pass_check_color,
      name_color, name_message, nick_color, nick_message, phone_message, phone_color,
      post, roadaddr, detailaddr
    }
  }

}
</script>

<style scoped>
.buble {
    margin-right: 20px;
}
.red{color:red}
.green{color:green}
 .msg {   position: relative;
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
    cursor: pointer;
    width: 100%;
    opacity: 0.9;
}

button:hover {
    opacity:1;
    
}
button:focus{
   outline:none;
}

.cancelbtn {
    padding: 14px 20px;
    background-color: #f44336;
}

.submitbtn {
  float: left;
  border-radius: 0.25rem;
  width: 100%;
  padding: 10px;
}
form {
    background-color: #fefefe;
    margin-left: 60px; 
    border: 0px;
    width: 600px; 
}

hr {
    border: 1px solid #f1f1f1;
    margin-bottom: 25px;
}

.clearfix::after {
    content: "";
    clear: both;
    display: table; 
}

h1{text-align:center;
  margin-bottom: 40px;}

b {
   width: 100%;
   display: block
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