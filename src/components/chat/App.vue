
<template>
  <div id="app">
    <component v-bind:is="currentComponent" 
    v-on:child-room="updateRoom" 
    v-on:user-to-room="addUser"  
    :user="username"
    :parent_id="parent_id"
    
    ></component>
  </div>
</template>

  
<script>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import EnterRoom from '@/components/chat/EnterRoom.vue'
import ChatRoom from '@/components/chat/ChatRoom.vue'
export default {
  name:'App',
  components: {
    'Main Room': EnterRoom,
    'Chat Room': ChatRoom,
  },
  props: {
    parent_id:{
      type:String,
      required:true
    }
  },
   emits:['parent_getSession'],

  setup(props, context){
     context.emit('parent_getSession')
      let currentComponent = ref('Main Room');
      let username = ref('');
      const router = useRouter();  
      const updateRoom = (room) =>{
           //useRouter().push("/banchan/chat-room/admin" )
           username.value = props.parent_id
           router.push({name:'ChatRoom', params: { username: props.parent_id }})
          }

      const addUser=(user) =>{
          console.log("addUser=" + user)
          username.value = user
      }

      return {
        currentComponent,
        username,
        updateRoom,
        addUser
      }

  }
}
  

</script>

