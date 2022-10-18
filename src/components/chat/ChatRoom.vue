<template>
  <div class="bg-white-400 h-screen w-screen overflow-hidden">
    <div class="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
    <div class="flex flex-cols-2 w-3/4 border rounded items-center justify-center mb-8" style="min-height: 60vh;">
            <div class="w-1/4 h-full bg-gray-100  border-r border-gray-300">
                <div class="my-3 mx-3 "> 
                    <button  class= " bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" 
                    v-on:click.prevent="enterRoom()">
                      나가기 
                    </button>  
                </div>
                <ul class="overflow-auto" style="height: 500px;">
                    <h2 class="ml-2 mb-2 text-gray-600 text-lg my-2">대화상대</h2>
                    <li>
                        <a class="hover:bg-gray-100 border-b border-gray-300 px-3 py-2 cursor-pointer flex items-center text-sm focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out" 
                        v-for="(user, idx) in users" :key="idx">
                             
                            <div class="w-full pb-2">
                                <div class="flex justify-between">
                                    <span class="block ml-2 font-semibold text-base text-gray-600 ">{{user}}</span>
                                </div>
                               
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="w-3/4 bg-white">
                <div class="w-full">
                    <div class="flex items-center border-b border-gray-300 pl-3 py-3">
                      
                        <span class="block ml-2 font-bold  text-gray-700 text-2xl align-middle">채팅방</span><br>
                        <h5 class="block ml-2 font-bold text-base text-gray-600 float-left">{{user}}</h5>
                      
                    </div>
                    <div id="chat" class="w-full overflow-y-auto p-10 relative" style="height: 600px;" ref="toolbarChat">
                        <ul>
                            <li class="clearfix2">
                                 <div v-for="(msg, index) in messages" :key="index">
                                     <div class="w-full flex " v-bind:class="{'justify-end': User(msg.user)}">
                                        <div class="bg-gray-100 rounded px-5 py-2 my-2 text-gray-700 relative"  style="max-width: 300px;">
                                            <span class="block text-blue-400">{{ msg.user }}</span>
                                            <span class="block">{{ msg.message }}</span>
                                            <span class="block text-xs text-right">{{msg.timestamp}}</span>
                                        </div>
                                     </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <p v-if="joined" class="pl-4 italic text-green-600">{{user_joined}}</p>
                    <p v-if="left" class="pl-4 italic text-red-600">{{user_left}}</p>
                    <p v-if="typing" class="pl-4 italic text-gray-600">{{user_typing}}</p>
                     <form @submit.prevent="sendMessage">
                        <div class="w-full py-3 px-3 flex items-center justify-between border-t border-gray-300">
                        
                                <input aria-placeholder="메시지를 입력하세요" placeholder="메시지를 입력하세요" type="text" v-model="message"
                                    class="py-2 mx-3 pl-5 block w-full rounded-full bg-gray-100 outline-none focus:text-gray-700" name="message" required/>

                                <button class="outline-none focus:outline-none" type="submit">
                                    <svg class="text-gray-400 h-7 w-7 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                    </svg>
                                </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
 
<script>
import {ref, watch, onMounted, computed} from 'vue';
import {useRouter, useRoute} from 'vue-router';
import EnterRoom from './EnterRoom.vue';
import {useStore} from 'vuex';
import io from 'socket.io-client';
export default {
  name:'ChatRoom',
  components:{
    EnterRoom    
  },
   props:{
    user : {
        type:String,
		required:true
    }
   } ,

    setup(props, context){
        console.log('setup')
        let    joined  = ref(false)
        let    left =  ref(false)
        let    typing = ref(false)
        let    user_joined = ref('')
        let    user_left = ref ('')
        let    user_typing =  ref('')
        let    message= ref ('')
        let    messages= ref ([])
        let    socket =  io('localhost:3000')
        const store = useStore();
        const username = useRoute().params.username
         console.log("this.user="+username)
          //useRouter().push("/banchan/chat-room/" + username)
          socket.emit('join', username); 
          //socket.emit('join', 'admin')
          store.dispatch('addUser', username)
          //store.dispatch('addUser', 'admin')

           const users = computed(
                ()=> store.state.users
            );


          const  enterRoom =  ()=>{
             socket.disconnect()
             context.emit('child-room', 'Main Room')
            }


          const  sendMessage = (e) => {
            e.preventDefault();
            socket.emit('SEND_MESSAGE', {
                user: username,
                message: message.value,
            });
            message.value = ''
            typing.value = false
            window.scrollTo(0, document.body.scrollHeight);
        }


         const User = (User) =>{
            if (username === User) {
                return true
            }
        }

	    const userTyping = () => {
            socket.emit('typing', {
                user: username
            })
        }

         watch( message, ()=>{
              userTyping()
         })

         onMounted(()=> {
            socket.on('MESSAGE', (data) => {
                messages.value = [...messages.value, data];
            });
            socket.on('user_joined', (data) => {
                joined.value = true
                store.dispatch('addUser', username.value)
                user_joined.value = `User ${username.value} has joined.`
                setTimeout(() =>{
                    joined.value = false
                }, 5000);
            })
            socket.on('userTyping', (data) => {
                typing.value = true
                user_typing.value = `${username} is typing...`
                setTimeout(() =>{
                    typing.value = false
                }, 5000);
            })
            socket.on('userLeft', (data) => {
                left.value = true 
                user_left.value = `A user has left has left the chat`
                store.dispatch('removeUser', username)
                setTimeout(() =>{
                    left.value = false
                }, 5000);
            })
        
    })//onMounted end

        return {
            joined, left, typing, user_joined, user_left, user_typing, message, messages,
            users, enterRoom, sendMessage, User, userTyping
        }
    }
}



</script>

<style scoped>

</style>