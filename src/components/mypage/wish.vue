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
                            <li><router-link class="nav-item nav-link active bg-danger" :to="{name:'Wish'}">찜 목록</router-link></li>
                            <li><router-link class="nav-item nav-link" :to="{name:'Buy'}">구매 목록</router-link></li>
                            <li><router-link class="nav-item nav-link" :to="{name:'Sell'}">판매 목록</router-link></li>
                            <li><router-link class="nav-item nav-link" :to="{name:'Update'}">개인정보수정</router-link></li>
                            <li><router-link class="nav-item nav-link" :to="{name:'Secession'}">회원탈퇴</router-link></li>
                        </ul>
                    </aside>
                </div>
         </div>

            <div>
                <div class="pic">
                    <div class="user-warp">
                        <div class="user-image">
                            <img class="icon" src="../../assets/basic.jpg">
                        </div>
                        <div class="user-text">
                            <img class="profile" src="../../assets/profile.png">
                        </div>
                    </div>
                </div>
                <div>
                    <label>
                        <div class="profile" type="button">프로필 수정</div>    
                        <input type="file" v-show="false" @change="update">
                    </label>
                </div>
            </div>
            <div class="text-area">
                <div class="nick-area">
                    <span class="nick">닉네임입니다</span><button @click="add">수정</button>
                </div>
                <textarea   rows="10" cols="30"
                    class="form-control"
                    v-model.trim="content"
                    maxlength="200"
                    style="resize:none">
                </textarea>
                <button>소개글 수정</button>
            </div>
      </div>
   </div>
</template>

<script>
import {ref} from 'vue';
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
        const fileName = ref("");
        const member = ref({});
        let file = '';
        const router = useRouter();
        const id = props.parent_id;
        let check = 0;

        const update = async(event) => {
        // 미리보기 함수 호출
            
            file = event.target.files[0];
            fileName.value = file.name;

            let frm = new FormData();
            if (file !='' && fileName.value != null) { // let file = ''; 초기값 상태가 아닌지 확인합니다.
                frm.append("uploadfile", file);
                frm.append("check", fileName.value);
                frm.append("id", id);

                try {
                const res = await axios.patch('members',
                frm
                ,
                {
                    headers:
                        { 'Content-Type' : 'multipart/form-data;charset=UTF-8' }
                }
                );

                } catch(err) {
                    console.log('여기는 오류');
                    console.log(err);
                }

            }

        } // update end

        return {
            update
        }
    }
}
</script>

<style scoped>
.pic {
    width:310px;
    height:310px;
    margin-right: 30px;
    border: 1px solid #dddddd;
}
.user-warp {
    widows: 100%;
    position: relative;
}
.user-warp img {
    width: 100%;
    vertical-align: middle;
}
.user-text {
    position: absolute;
    top: 80%;
    left: 50%;
    border-radius: 50%;
    width: 100px;
    height: 100%;
    transform: translate( -50%, -50%);
}
.row {
    margin-left: 15px;
}
.buble {
    margin-right: 20px;
}
h3 {
    margin: 10px 30px 0px 0px;
}
.introduce {
    border: 1px solid #dddddd;
}
.mybody {
    float:right;
}
</style>