<template>
    <Nav :parent_id="id" /> <!-- (3) -->

<div class="w-75 p-3 container"> 
    <div class="container"> 
        <router-view
            @parent_getSession="getSession"
            :parent_id="id" />
    </div>
</div>
<div class="footer">
    <Footer />
  </div>
</template>

<script>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import axios from './axios/axiossetting.js';
import Nav from './components/navDo.vue'; // (1) './component/navDo.vue'에 있는 컴포넌트를 Nav2로 사용합니다.
import Footer from './components/footDo.vue'; // (1) './component/navDo.vue'에 있는 컴포넌트를 Nav2로 사용합니다.
export default {
    components:{ // (2) templete에서 사용할 컴포넌트의 정보를 작성하는 속성입니다.(컴포넌트 등록)
        Nav, Footer
    },
    setup() {
        const id = ref('');

        //페이지 이동하기 위해 useRouter()를 사용합니다.
        const router = useRouter();

        //member_login.vue에서 context.emit("parent_getSession", ""); 로 보냅니다.
        // /vue/boards 상태에서 /vue/login으로 직접 주소를 입력한 경우 내부적으로 로그아웃이 되도록 처리합니다.
        const getSession = async(received_id)=>{
            if(received_id==''){
                try{
                    const res = await axios.post("members/logout");
                    id.value='';
                    console.log(res.data);
                }catch(error){
                    console.log(error);
                }

            } else {
                try{
                    const res = await axios.get("getSession");
                    id.value=res.data;
                    console.log("여기는 App.vue getSession:" + id.value)
                    if(id.value==''){ //null은 값으로 빈문자열로 리턴
                        router.push({
                            name:'Main'
                        });
                    }
                }catch(err){
                    console.log(err);
                }
            }//else end
        }//getSession end

        return{
            id, getSession
        }
    }
}
</script>

<style scoped>
.container {
    padding-bottom: 0px !important;
}
</style>