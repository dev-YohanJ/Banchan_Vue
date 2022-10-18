<template>
    <div class="modal1 bg" v-show="display">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <form @submit.prevent="goDelete(id)">
                        <div class="form-gorup">
                            <h4>정말 탈퇴하시겠습니까?</h4>
                            <div class="context">
                            계정의 모든 정보는 삭제되며<br>
                            복구되지 않습니다.
                            </div>
                        </div>
                        <div class="btn btn2">
                        <button type="button" class="btn btnchk" data-dismiss="modal" @click="hidden">취소</button>
                        <button type="submit" class="btn btncan">확인</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {ref, computed} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import axios from '../axios/axiossetting.js';
import {useStore} from 'vuex';
export default {
    props: {
        parent_id:{
        type:String,
        required:true
        }
    },
    emits:['parent_getSession'],
    setup(props, context) {
        context.emit("parent_getSession");
        const id = props.parent_id;
        const store = useStore();
        const router = useRouter();
        const display = computed(()=> store.state.display);

        const hidden = ()=>{
        store.dispatch('display', false)
        }

        const goDelete = async (id)=> {
            console.log("secession id="+ id);
            const res = await axios.delete(`secession/${id}`)
            if(res.data == -1) {
                alert('삭제 실패 입니다.')
            } else {
                alert('삭제 성공');
                store.dispatch('display', false);
                router.push({
                    name : 'Main',
                });
            }
        }

        return {
            hidden, goDelete, display, id
        }
    }
};
</script>

<style scoped>
.btn:active, .btn:focus {
outline:none !important;
box-shadow:none !important;
}
.modal-body {
    padding: 0px;
}
.btn2 {
    display: flex;
    flex-direction: row;
    height: 60px;
    z-index: 3102;
    border-top: 1px solid rgb(238, 238, 238);
}
.btnchk {
    flex: 1 1 0%;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    font-size: 1rem;
    font-weight: 700;
    color: rgb(0, 165, 135);
    text-align: center;
    color: rgb(153, 153, 153);
    border-right: 1px solid rgb(238, 238, 238);
}
.btncan {
    flex: 1 1 0%;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    font-size: 1rem;
    font-weight: 700;
    color: rgb(0, 165, 135);
    text-align: center;
}
.modal-content {
    border-radius: 15px;
    max-width: 18.5rem;
    width: 80%;
    max-height: 70%;
    background-color: rgb(255, 255, 255);
    z-index: 3102;
}
.context {
    margin-top: 20px;
    line-height:20px;
    font-size: 16px;
}
h4 {
    font-weight: bold;
    font-size: 20px;
}
.form-gorup {
    padding: 30px;
    text-align: center;
}
 .modal1 {
    top: 0;
    left: 0;
    overflow: hidden;
    outline: 0;
 }
 .bg{
	width:100%;
	height:100%;
	background:rgba(0,0,0,0.5);
	position:fixed;padding:20px
	}


</style>
