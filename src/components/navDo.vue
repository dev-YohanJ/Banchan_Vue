<template>
  
<!-- 헤더 -->
<div class="header_top">
<div class="header__top">
    <div></div>
    <div class="header_bar" v-if="!parent_id">
        <router-link class="nav-link" :to="{name:'Login'}"><i class="fa fa-user"></i> 로그인 </router-link>
            |
        <router-link class="nav-link" :to="{name:'Join'}">회원가입</router-link>
    </div>
    <div class="header_bar" v-else-if="parent_id == 'admin'">
        <div class="nav-link" @click="logout">{{parent_id}}님(로그아웃)</div>
            |
        <router-link class="nav-link" :to="{name:'Admin_Page'}">관리자 기능</router-link>
    </div>
    <div class="header_bar" v-else-if="parent_id">
        <div class="nav-link" @click="logout">{{parent_id}}님(로그아웃)</div>
            |
        <router-link class="nav-link" :to="{name:'Mypage'}">정보수정</router-link>
    </div>
</div>
</div>
<div class="container">
    <div class="row">
        <div class="header_logo">
            <router-link :to="{name:'Main'}"><img src="@/assets/img/logo.png"></router-link>
        </div>
        <div class="search_form">
            <form @submit.prevent="search">
                <div class="input-group">
                    <select id="viewcount" 
                            v-model.lazy="search_field" 
                            @change="change_placeholder()">
                        <option v-for="(item,index) in option_data" :key="index" :value="item.value">
                            {{item.label}}
                        </option>
                    </select>
                    <input 
                        type="text" 
                        class="form-control"
                        v-model.lazy="search_word"
                        ref="f2"
                        placeholder="검색어를 입력하세요.">
                    <button type="submit" class="site-btn">검색</button>
                </div>
            </form>
        </div>
        <div class="float-right">
            <!-- 로그인 후 이용 가능 -->
            <router-link class="tab" :to="{name:'Product_Write'}"><i class="fa fa-cutlery"></i> 판매하기 </router-link> <!-- Product_New -->
            <router-link class="tab" :to="{name:'Mypage'}"><i class="fa fa-user"></i> 마이페이지 </router-link> <!-- Mypage -->
            <router-link class="tab" :to="{name:'Chat'}"><i class="fa fa-comments"></i> 채팅 </router-link> <!-- Chat -->
            <router-link class="tab_" :to="{name:'Notice_List'}">공지사항</router-link>
            <router-link class="tab_" :to="{name:'Qna_List'}">문의게시판</router-link>
        </div>
    </div>
</div>
</template>

<script>
import axios from '../axios/axiossetting.js'
import {useRouter} from 'vue-router';
import {useStore} from 'vuex'
import { ref, watch } from 'vue'
export default {
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
                alert="로그아웃 했습니"

                //route의 이름이 'Login'인 경로로 이동합니다.
                router.push({
                    name:'Login'
                });
            }catch(error){
                console.log(error);
            }
        }

        const store = useStore()
        let option_data = ref([])
        option_data.value = [
            {value:'NL', label:'전체'},
            {value:'N', label:'제목'},
            {value:'L', label:'지역'},
        ]
        let search_data = {}
        const search_field = ref('NL')
        const placeholder_message = ref('아이디를 입력하세요')
        console.log('search_field2=' + search_field.value)
        const search_word = ref('')
        const f2 = ref(null)
        const search = () => {
            console.log('search하러 가요')
            if(search_word.value==''){
                alert('검색어를 입력하세요')
                f2.value.focus()
                return
            }
            console.log("필드:"+search_field.value)
            console.log("워드:"+search_word.value)

            search_data = {
                search_field: search_field.value,
                keyword: search_word.value,
            }

            store.dispatch('search_data', search_data)
           //store에 검색어 입력
        }

        const change_placeholder = () => {
            option_data.value.filter(item => {
                if(item.value===search_field.value){
                placeholder_message.value = item.label + '(를)을 입력하세요'
                return
                }
            })
        }

        return {
            logout,
            search, change_placeholder, search_field, option_data, search_word   
        }
  }

}
</script>

<style  scoped>
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


/* 헤더 */

.header_top{
	justify-content: space-between;
	border-bottom: 1px solid rgb(238, 238, 238);
	height: 32px;
    width:100%;
}

.container{
    justify-content: center;
}

.header__top{
	display: flex;
	justify-content: space-between;
}


.header_bar a {
	display: inline;
	font-size: 14px;
	color: #1c1c1c;
}

.header_bar a i {
	margin-right: 6px;
}

.nav-link{
    display:inline-block;
    padding: 0;
}



/* 검색창 */
#viewcount{
    width: 100px;
    padding: 10px;
}

/* 메뉴 */
.tab{
    padding: 10px;
    font-size: 20px;
    font-weight: bold;
    color:#1c1c1c;
    display:inline-block;
    display: flex;
}

.tab_{
    padding: 10px;
    margin: 0 0 0 3px;
    line-height: 200%;
    font-size: 15px;
    font-weight: bold;
    color:#2b2b2b;
    display:inline-block;
    display: flex;
}

.tabs{
    padding: 0 0 0px;
}

.nav{
    position: relative
}

.float-right{
    display:flex;
    font-size:9px;
    padding: 70px 0 0 10px;
}

.float-right > .tab > i {
    padding:3px 3px 0 0;
}

select.form-control{
  width:auto;margin-bottom:2em;display:inline-block;
}
.rows{text-align:right;}
.center{text-align:center}

.container{
  display: flex;
  flex-wrap: wrap;
  margin: auto;
}

.contents_all{
  width: 350px;
  margin-right:10px;
  margin-bottom: 11px;
  border: 1px solid #dddddd;
  display: block;
  padding: 10px;
}

.title{
  font-size:15px;
  padding-bottom: 10px;
  color: red;
  font-weight: bold;
}

.content{
  display:flex;
  justify-content: space-between;
}

.price{
  font-size:18px;
  font-weight:bold;
}

.regdate{
  font-size:14px;
  color: grey;
}

.list{
	margin: 0 auto;
	margin-top:100px;
}

.first{
	display:flex;
	justify-content: space-between;
}


</style>