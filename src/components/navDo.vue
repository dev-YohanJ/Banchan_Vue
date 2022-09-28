<template>
  <nav class="navbar navbar-expand-sm right-block navbar-dark" v-if="parent_id">
	<ul class="navbar-nav">
	  <li class="nav-item nav-link" @click="logout">{{parent_id}}님(로그아웃)</li>
	  <li class="nav-item">
        <router-link class="nav-link" 
        :to="{name:'Member_Update'}">정보수정</router-link>
      </li>

	  <!-- admin menu -->
      <div v-if="parent_id=='admin'">
		<!-- Dropdown -->
		<li class="nav-item dropdown">
		  <div class="nav-link dropdown-toggle" to="#" id="navbardrop" 
            data-toggle="dropdown">관리자</div>
		  <div class="dropdown-menu">
			<router-link class="dropdown-item" :to="{name:'Member_List'}">회원정보</router-link>
			<router-link class="dropdown-item" :to="{name:'Board_List'}">게시판</router-link>
		  </div>
		</li>
      </div>
	</ul>
  </nav>
</template>

<script>
import axios from '../axios/axiossetting.js'
import {useRouter} from 'vue-router'
export default {
  /*
  1. 부모 컴포넌트인 App_1.vue에서 전달받은 parent_id를 하위 컴포넌트에서 사용하기 위해서는 아래와 같이 props 사용
  2. props는 객체이고 전달 받은 속성의 type, required 등에 관한 속성을 작성
  3. App_1.vue
    <Nav :parent_id="id" />에서 콜론 뒤에 있는 parent_id의 이름으로 하위 컴포넌트인 이곳으로 전달
  4. 부모에게 전달 받은 parent_id의 값은 변경될 수 없음
  */
  props:{
    parent_id:{
      type:String,
      required:true
    }
  },
  setup() {
    //페이지 이동하기 위해 useRouter()를 사용
    const router = useRouter()
    const logout = async()=>{
      try{
        const res = await axios.post('members/logout')
        console.log("여기는 logout:"+res.data) 

        //route의 이름이 'Login'인 경로로 이동
        router.push({
          name:'Login'
        })
      }catch(err){
        console.log(err)
      }
    }
    return {logout}
  }
}
</script>

<style scoped>
nav.navbar {
  justify-content: flex-end; /* 오른쪽 정렬 */
}

.dropdown-menu {
  min-width: 0rem; 
}

/* nav 색상 지정 */
.navbar {
  background: #096988;
  margin-bottom: 3em;
  padding-right: 3em;
}

.navbar-dark .navbar-nav .nav-link {
  color: rgb(255, 255, 255);
}

.dropdown-menu a:hover {
  background-color: #ddd;
}

.dropdown:hover .dropdown-menu {
  display: block;
}
</style>