<template>
<!--
    <nav class="navbar navbar-expand-sm right-block navbar-dark" v-if="parent_id">
        <ul class="navbar-nav">
            <li class="nav-link" @click="logout">{{parent_id}}님(로그아웃)</li>
            <li class="nav-item">
                <router-link class="nav-link"
                :to="{name:'Member_Update'}">정보수정</router-link>
            </li>
                
            !-- admin 메뉴 --
            <div v-if="parent_id=='admin'">
                !-- Dropdown --
                <li class="nav-item dropdown"><div
                    class="nav-link dropdown-toggle" to="#" id="navbardrop"
                    data-toggle="dropdown">
                     관리자 </div>
                    <div class="dropdown-menu">
                        <router-link class="dropdown-item" :to="{name:'Member_List'}">회원정보</router-link>
                        <router-link class="dropdown-item" :to="{name:'Board_List'}">게시판</router-link>
                    </div>
                </li>
            </div>
        </ul>
    </nav>
-->

  
<!-- 헤더 -->
<div class="header_top">
    <div></div>
    <div class="header_bar">
        <router-link class="nav-link" :to="{name:'Login'}"><i class="fa fa-user"></i> 로그인 </router-link>
            |
        <router-link class="nav-link" :to="{name:'Join'}">회원가입</router-link>
    </div>
    <!-- <div class="header_bar" v-else-if="parent_id == 'admin'">
        <div class="nav-link" @click="logout">{{parent_id}}님(로그아웃)</div>
            |
        <router-link class="nav-link" :to="{name:'Main'}">관리자</router-link>
    </div>
    <div class="header_bar" v-else-if="parent_id">
        <div class="nav-link" @click="logout">{{parent_id}}님(로그아웃)</div>
            |
        <router-link class="nav-link" :to="{name:'Main'}">정보수정</router-link>
    </div> -->
</div>
<div class="container">
    <div class="row">
        <div class="header_logo">
            <router-link :to="{name:'Main'}"><img src="@/assets/img/logo.png"></router-link>
        </div>
        <div class="search_form">
            <form action="#">
                <input type="text" placeholder="검색어를 입력하세요.">
                <button type="submit" class="site-btn">검색</button>
            </form>
        </div>
        <div class="float-right">
                <!-- 로그인 후 이용 가능 -->
                <router-link class="tab" :to="{name:'Product_Write'}"><i class="fa fa-cutlery"></i> 판매하기 </router-link> <!-- Product_New -->
                <router-link class="tab" :to="{name:'Main'}"><i class="fa fa-user"></i> 마이페이지 </router-link> <!-- Mypage -->
                <router-link class="tab" :to="{name:'Main'}"><i class="fa fa-comments"></i> 채팅 </router-link> <!-- Chat -->
            </div>
    </div>

        
<!-- 햄버거메뉴 -->
    <div class="col-lg-3">
        <div class="categories">
            <div class="categories_all">
                <i class="fa fa-bars"></i>
                <span> 반찬목록</span>
            </div>
            <div class="categories-content">
                <ul>
                    <li><router-link class="categorie" :to="{name:'Main'}">볶음</router-link></li>
                    <li><router-link class="categorie" :to="{name:'Main'}">조림</router-link></li>
                    <li><router-link class="categorie" :to="{name:'Main'}">국/찌개/탕</router-link></li>
                    <li><router-link class="categorie" :to="{name:'Main'}">김치/절임/젓갈</router-link></li>
                    <li><router-link class="categorie" :to="{name:'Main'}">전/생선</router-link></li>
                </ul>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from '../axios/axiossetting.js'
import {useRouter} from 'vue-router';
import { ref, reactive } from 'vue'
export default {
    /*
        1. 부모 컴포넌트인 App_1.vue에서 전달받은 parent_id를 하위 컴포넌트에서 사용하기 위해서는 아래와 같이 props 사용합니다.
        2. props는 객체이고 전달 받은 속성의 type(String, Number, Object, Boolean, Array, Date, Function),
           required 등에 관한 속성을 작성합니다.
        3. App_1.vue
            <Nav :parent_id="id" /> 에서 콜론 뒤에 있는 parent_id의 이름으로 하위 컴포넌트인 이곳으로 전달됩니다.
        4. 부모에게 전달 받은 parent_id의 값은 변경될 수 없습니다.
    */
    props:{
        parent_id:{
            type:String,
            required:true
        }
    },
    setup() {
        //페이지 이동하기 위해 useRouter()를 사용합니다.
        const router = useRouter();
        const logout = async () => {
            try{
                const res = await axios.post('members/logout');
                console.log("여기는 logout:" + res.data)
                
                //route의 이름이 'Login'인 경로로 이동합니다.
                router.push({
                    name:'Login'
                });
            }catch(error){
                console.log(error);
            }
        }

        /*햄버거 메뉴*/
        const menu  = ref(null)
        const state = reactive({ isOpened : false })

        function mouseDown() {
            !state.isOpened ? open() : close()
        }

        function open() {
            state.isOpened = true
            window.addEventListener('mousedown', outside)
        }

        function close() {
            state.isOpened = false
            window.removeEventListener('mousedown', outside)
        }

        function outside(e) {
            if (e.target !== menu.value) close()
        }


        return {logout, menu, state, mouseDown}

  }

}
</script>

<style  scoped>
/* @import "@/assets/css/bootstrap.min.css"; */
@import "@/assets/css/elegant-icons.css"; /*아이콘*/
@import "@/assets/css/font-awesome.min.css"; /*아이콘*/
@import "@/assets/css/style.css";

/* 로고 */
.header_logo {
    display:flex;
	padding: 15px 0;
}

.header_logo img {
	display: inline-block;
	max-width: 170px;
}


/* 기타 */
.tab{
    padding: 10px;
    font-size: 20px;
    font-weight: bold;
    color:#1c1c1c;
    display:inline-block;
    display: flex;
}

.tabs{
    padding: 0 0 0px;
}


.nav{
    position: relative
}


/* 햄버거 메뉴 */
.categories{
  position : relative;
}

.categories-content{
  display : none;
  position : absolute;
  z-index : 1; /*다른 요소들보다 앞에 배치*/
  width: 200px;
  background-color: white;
  border: 1px solid #ebebeb;
  text-align: left;
}

router-link .categorie{
  display : block;
}

.categories:hover .categories-content {
  display: block;
}

.nav-link{
    padding: 0;
}

.float-right{
    display:flex;
    font-size:9px;
    padding: 70px 0 0 10px;
}

.float-right > .tab > i {
    padding:3px 3px 0 0;
}

</style>