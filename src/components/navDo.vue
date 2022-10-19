<template>
  
<!-- 헤더 -->
<div class="header_top">
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
        <router-link class="nav-link" :to="{name:'Notice_List'}">공지사항</router-link>
        <router-link class="nav-link" :to="{name:'Qna_List'}">문의게시판</router-link>
    </div>
</div>
<div class="container">
    <div class="row">
        <div class="header_logo">
            <router-link :to="{name:'Main'}"><img src="@/assets/img/logo.png"></router-link>
        </div>
        <div class="search_form">
            <form action="#">
                <input 
                    type="text" 
                    class="form-control"
                    v-model.lazy="search_word"
                    ref="f2"
                    placeholder="검색어를 입력하세요.">
                <button type="submit" class="site-btn">검색</button>
            </form>
        </div>
        <div class="float-right">
            <!-- 로그인 후 이용 가능 -->
            <router-link class="tab" :to="{name:'Product_Write'}"><i class="fa fa-cutlery"></i> 판매하기 </router-link> <!-- Product_New -->
            <router-link class="tab" :to="{name:'Mypage'}"><i class="fa fa-user"></i> 마이페이지 </router-link> <!-- Mypage -->
            <router-link class="tab" :to="{name:'Chat'}"><i class="fa fa-comments"></i> 채팅 </router-link> <!-- Chat -->
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
            {value:'NL', label:'제목 또는 지역'},
        ]
        const limit = ref(10)
        let currentpage = 1
        let maxpage = 1
        const list = ref([])
        const listcount = ref(0)
        const startnum = ref(0)
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
            getList(currentpage)
        }

        const change_placeholder = () => {
            option_data.value.filter(item => {
                if(item.value===search_field.value){
                placeholder_message.value = item.label + '(를)을 입력하세요'
                return
                }
            })
        }

        const getList = async (page) => {
        try{
            const res = await axios.get(`item?page=${page}&limit=${limit.value}&search_field=${search_field.value}&search_word=${search_word.value}`);
            console.log('boardlist1=' + res.data)
            list.value = res.data.boardlist1
            maxpage = res.data.maxpage
            currentpage = res.data.page
            search_field.value = res.data.search_field
            search_word.value = res.data.search_word
            startnum.value = listcount.value - (currentpage-1) * limit.value

            const pagelist = ref([])
            for(let i=res.data.startpage; i<=res.data.endpage; i++){
            pagelist.value.push(i)
            }

            const obj = {maxpage, currentpage, pagelist}
            store.dispatch('store_obj', obj)
        }catch(err){
            console.log(err)
        }
        }

        getList(1)

        watch(limit, ()=>{
        store.dispatch('store_limit', limit.value)
        console.log('(limit)member_list_vue - store.state.page] ' + store.state.page)
        getList(store.state.page)
        })

        //pagination에서 페이지 번호를 클릭한 경우 store.state.page의 값이 변경된다.
        //store.state.page에 해당하는 목록을 가져오기
        watch(()=>store.state.page, ()=>{
        getList(store.state.page)
        })


        return {
            logout,
            limit, search_field, search_word, search, listcount, list, startnum,
            placeholder_message, change_placeholder, option_data, f2      
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

.float-right{
    display:flex;
    font-size:9px;
    padding: 70px 0 0 10px;
}

.float-right > .tab > i {
    padding:3px 3px 0 0;
}

</style>