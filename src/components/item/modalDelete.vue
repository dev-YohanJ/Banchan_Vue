<template>
  <div class="modal1 bg" v-show="display">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <form @submit.prevent="goDelete">
            <div class="form-group">
              <label for="pwd">정말 삭제하시겠습니까?</label>
            </div>
            <button type="submit" class="btn btn-primary">확인</button>
            <button type="button" class="btn btn-danger"
              data-dismiss="modal" @click="hidden">취소</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ref, computed} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useStore} from 'vuex'
import axios from '../../axios/axiossetting.js'
export default {
  setup(){
    const num = useRoute().params.num
    console.log(num)
    const router = useRouter()
    const store = useStore()

    const display = computed(()=>store.state.display)

    const hidden = ()=>{
      store.dispatch('display', false)
    }
    
    const goDelete = async ()=>{
      const res = await axios.delete(`items/${num}`)
        alert('삭제 성공')
        store.dispatch('display', false)
        router.push({
          name : 'Item_List'
        })
      }
      return {
        goDelete, display, hidden
      }
    }
  }
</script>

<style scoped>
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