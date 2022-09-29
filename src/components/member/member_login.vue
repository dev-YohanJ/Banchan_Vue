<template>
  <div class="wrapper fadeInDown">
    <div id="formContent">
      <!-- Tabs Titles -->

      <!-- Icon -->
      <div class="fadeIn first">
        <img
          src="../member/finallogo.png"
          id="icon"
          alt="User Icon"
        />
        <h1>SHOP</h1>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="loginProcess">
        <input
          type="text"
          id="login"
          class="fadeIn second"
          name="login"
          placeholder="아이디"
          v-model="id"
        />
        <input
          type="password"
          id="password"
          class="fadeIn third"
          name="login"
          placeholder="비밀번호"
          v-model="password"
        />
        <input type="submit" class="submitbtn fadeIn fourth" value="Log In" />
      </form>

     <section class="test">
       <div v-on:click="kakaoLoginBtn">
         <img src="../../assets/kakao.png"/>
          <br />
      </div>
      </section>
      <!-- Remind Passowrd -->
      <div id="formFooter">
        <router-link class="underlineHover" to="/signup" @click="join">회원가입</router-link>
        <br />
        <router-link class="underlineHover" to="/forgotPw">
          비밀번호 찾기</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

import cookies from "vue-cookies"; // vue에서 쿠키를 사용하기 위한 cookies를 import 합니다.

import {ref} from "vue";
import axios from "../../axios/axiossetting";
export default {
   name: "test",
  methods: {
    kakaoLoginBtn:function(){

      window.Kakao.init('bb4c325a3762f915167df9812ff4c675') // Kakao Developers에서 요약 정보 -> JavaScript 키

      if (window.Kakao.Auth.getAccessToken()) {
        window.Kakao.API.request({
          url: '/v1/user/unlink',
          success: function (response) {
            console.log(response)
          },
          fail: function (error) {
            console.log(error)
          },
        })
        window.Kakao.Auth.setAccessToken(undefined)
      }


      window.Kakao.Auth.login({
        success: function () {
          window.Kakao.API.request({
            url: '/v2/user/me',
            data: {
              property_keys: ["kakao_account.nickname"],
              property_keys: ["kakao_account.email"]
            },
            success: async function (response) {
              console.log(response)
              
              
            },
            fail: function (error) {
              console.log(error)
            },
          })
        },
        fail: function (error) {
          console.log(error)
        },
      })
    }   
  },
    emits: ["parent_getSession"],
    setup(props, context) {
        //부모 컴포넌트 App_1.vue에 있는 getSession을 호출합니다.
        //<router-view @parent_getSession="getSession" : parent_id="id"/>
        console.log('member_login : setup')
        context.emit("parent_getSession", "");

        //라우터를 사용할 수 있습니다.
        const router = useRouter(); // userRouter()는 라우터 인스턴스를 반환합니다.
        const join = () => {
        // 이동할 주소는 라우터의 push()를 이용합니다.
        // https://router.vuejs.org/guide/essentials/navigation.html
        router.push({
            name: "Join", // route의 이름이 "Join"의 경로로 이동합니다.
            });
        };

        const remember = ref(false);
        const id = ref("");
        const password = ref("");

        const getCookie = () => {
            //이름이 saveid인 쿠키를 가져옵니다.
            const cookie_value = cookies.get("saveid");
            console.log("가져온 쿠키값=" + cookie_value);
            if (cookie_value != null) {
                remember.value = true; //체크박스 체크합니다.
                id.value = cookie_value; // 쿠키에 저장된 아이디값 input에 나타납니다.
            } else {
                remember.value = false; // 체크박스 해제합니다.
            }
        }

        getCookie();

        const loginProcess = async () => {
            try {
                const res = await axios.post("members", {
                    id: id.value,
                    password: password.value,
                });
                console.log("login.vue:res.data=" + res.data);
                const result = res.data;
                if (result == -1) {
                    alert("아이디가 존재하지 않습니다.");
                } else if (result == 0) {
                    alert("비밀번호가 일치하지 않습니다.");
                } else if (result == 1) {
                    console.log("remember=" + remember.value);
                    if (remember.value) { // 체크박스 선택한 경우
                    /*
                    set(name, value, expire) : expire(만료일)을 갖는 name과 value를 가진 쿠키를 설정합니다.
                        1s : 1초
                        1h : 1시간 (60*60)
                        1d : 1일 (24*60*60)
                        1m : 1달
                        new Date(2021,08,30).toUTCString(): 특정 시간
                                (toUTCString() - 날짜를 UTC(협정 세계시) 형식으로 표현합니다.)
                    */
                   cookies.set("saveid", id.value, "id"); // 1일 동안 유효한 쿠키를 설정합니다.
                   // cookies.set("saveid", id.value, 24*60*60)
                    } else { // 체크박스 해제한 경우
                        cookies.remove("saveid"); // 쿠키 제거
                    }

                    router.push({
                        name: "Board_List"
                    });
                }
            } catch (err) {
                console.log(err);
            }
        }; // loginProcess end

        return {
        join,
        id,
        password,
        loginProcess,
        remember,
        };
  },
};
</script>

<style scoped>
/* BASIC */
html {
  background-color: #56baed;
}
body {
  font-family: 'Poppins', sans-serif;
  height: 100vh;
}
a {
  color: #92badd;
  display: inline-block;
  text-decoration: none;
  font-weight: 400;
}
h2 {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  display: inline-block;
  margin: 40px 8px 10px 8px;
  color: #cccccc;
}
/* STRUCTURE */
.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 20px;
}
#formContent {
  -webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 10px 10px 10px 10px;
  background: #fff;
  padding: 30px;
  width: 90%;
  max-width: 450px;
  position: relative;
  padding: 0px;
  -webkit-box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  text-align: center;
}
#formFooter {
  background-color: #f6f6f6;
  border-top: 1px solid #dce8f1;
  padding: 25px;
  text-align: center;
  -webkit-border-radius: 0 0 10px 10px;
  border-radius: 0 0 10px 10px;
}
/* TABS */
h2.inactive {
  color: #cccccc;
}
h2.active {
  color: #0d0d0d;
  border-bottom: 2px solid #5fbae9;
}
/* FORM TYPOGRAPHY*/
input[type='button'],
input[type='submit'],
input[type='reset'] {
  background-color: #56baed;
  border: none;
  color: white;
  padding: 15px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  -webkit-box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 5px 20px 40px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
input[type='button']:hover,
input[type='submit']:hover,
input[type='reset']:hover {
  background-color: #39ace7;
}
input[type='button']:active,
input[type='submit']:active,
input[type='reset']:active {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}
input[type='text'],
input[type='password'] {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  width: 85%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}
input[type='text']:focus {
  background-color: #fff;
  border-bottom: 2px solid #5fbae9;
}
input[type='text']:placeholder {
  color: #cccccc;
}
/* ANIMATIONS */
/* Simple CSS3 Fade-in-down Animation */
.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}
@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}
/* Simple CSS3 Fade-in Animation */
@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-moz-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.fadeIn {
  opacity: 0;
  -webkit-animation: fadeIn ease-in 1;
  -moz-animation: fadeIn ease-in 1;
  animation: fadeIn ease-in 1;
  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  -webkit-animation-duration: 1s;
  -moz-animation-duration: 1s;
  animation-duration: 1s;
}
.fadeIn.first {
  -webkit-animation-delay: 0.4s;
  -moz-animation-delay: 0.4s;
  animation-delay: 0.4s;
}
.fadeIn.second {
  -webkit-animation-delay: 0.6s;
  -moz-animation-delay: 0.6s;
  animation-delay: 0.6s;
}
.fadeIn.third {
  -webkit-animation-delay: 0.8s;
  -moz-animation-delay: 0.8s;
  animation-delay: 0.8s;
}
.fadeIn.fourth {
  -webkit-animation-delay: 1s;
  -moz-animation-delay: 1s;
  animation-delay: 1s;
}
/* Simple CSS3 Fade-in Animation */
.underlineHover:after {
  display: block;
  left: 0;
  bottom: -10px;
  width: 0;
  height: 2px;
  background-color: #56baed;
  content: '';
  transition: width 0.2s;
}
.underlineHover:hover {
  color: #0d0d0d;
}
.underlineHover:hover:after {
  width: 100%;
}
h1 {
  color: #60a0ff;
}
/* OTHERS */
*:focus {
  outline: none;
}
#icon {
  width: 25%;
}
</style>