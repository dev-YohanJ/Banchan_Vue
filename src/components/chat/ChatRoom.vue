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
/*! tailwindcss v2.2.17 | MIT License | https://tailwindcss.com */

/*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */

/*
Document
========
*/

/**
Use a better box model (opinionated).
*/

*,
::before,
::after {
  box-sizing: border-box;
}

/**
Use a more readable tab size (opinionated).
*/

html {
  -moz-tab-size: 4;
  -o-tab-size: 4;
     tab-size: 4;
}

/**
1. Correct the line height in all browsers.
2. Prevent adjustments of font size after orientation changes in iOS.
*/

html {
  line-height: 1.15; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
}

/*
Sections
========
*/

/**
Remove the margin in all browsers.
*/

body {
  margin: 0;
}

/**
Improve consistency of default fonts in all browsers. (https://github.com/sindresorhus/modern-normalize/issues/3)
*/

body {
  font-family:
		system-ui,
		-apple-system, /* Firefox supports this but not yet `system-ui` */
		'Segoe UI',
		Roboto,
		Helvetica,
		Arial,
		sans-serif,
		'Apple Color Emoji',
		'Segoe UI Emoji';
}

/*
Grouping content
================
*/

/**
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
*/

hr {
  height: 0; /* 1 */
  color: inherit; /* 2 */
}

/*
Text-level semantics
====================
*/

/**
Add the correct text decoration in Chrome, Edge, and Safari.
*/

abbr[title] {
  -webkit-text-decoration: underline dotted;
          text-decoration: underline dotted;
}

/**
Add the correct font weight in Edge and Safari.
*/

b,
strong {
  font-weight: bolder;
}

/**
1. Improve consistency of default fonts in all browsers. (https://github.com/sindresorhus/modern-normalize/issues/3)
2. Correct the odd 'em' font sizing in all browsers.
*/

code,
kbd,
samp,
pre {
  font-family:
		ui-monospace,
		SFMono-Regular,
		Consolas,
		'Liberation Mono',
		Menlo,
		monospace; /* 1 */
  font-size: 1em; /* 2 */
}

/**
Add the correct font size in all browsers.
*/

small {
  font-size: 80%;
}

/**
Prevent 'sub' and 'sup' elements from affecting the line height in all browsers.
*/

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/*
Tabular data
============
*/

/**
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
*/

table {
  text-indent: 0; /* 1 */
  border-color: inherit; /* 2 */
}

/*
Forms
=====
*/

/**
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
*/

button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-size: 100%; /* 1 */
  line-height: 1.15; /* 1 */
  margin: 0; /* 2 */
}

/**
Remove the inheritance of text transform in Edge and Firefox.
1. Remove the inheritance of text transform in Firefox.
*/

button,
select { /* 1 */
  text-transform: none;
}

/**
Correct the inability to style clickable types in iOS and Safari.
*/

button,
[type='button'],
[type='reset'],
[type='submit'] {
  -webkit-appearance: button;
}

/**
Remove the inner border and padding in Firefox.
*/

::-moz-focus-inner {
  border-style: none;
  padding: 0;
}

/**
Restore the focus styles unset by the previous rule.
*/

:-moz-focusring {
  outline: 1px dotted ButtonText;
}

/**
Remove the additional ':invalid' styles in Firefox.
See: https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737
*/

:-moz-ui-invalid {
  box-shadow: none;
}

/**
Remove the padding so developers are not caught out when they zero out 'fieldset' elements in all browsers.
*/

legend {
  padding: 0;
}

/**
Add the correct vertical alignment in Chrome and Firefox.
*/

progress {
  vertical-align: baseline;
}

/**
Correct the cursor style of increment and decrement buttons in Safari.
*/

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}

/**
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

[type='search'] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/**
Remove the inner padding in Chrome and Safari on macOS.
*/

::-webkit-search-decoration {
  -webkit-appearance: none;
}

/**
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to 'inherit' in Safari.
*/

::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/*
Interactive
===========
*/

/*
Add the correct display in Chrome and Safari.
*/

summary {
  display: list-item;
}

/**
 * Manually forked from SUIT CSS Base: https://github.com/suitcss/base
 * A thin layer on top of normalize.css that provides a starting point more
 * suitable for web applications.
 */

/**
 * Removes the default spacing and border for appropriate elements.
 */

blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
  margin: 0;
}

button {
  background-color: transparent;
  background-image: none;
}

fieldset {
  margin: 0;
  padding: 0;
}

ol,
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

/**
 * Tailwind custom reset styles
 */

/**
 * 1. Use the user's configured `sans` font-family (with Tailwind's default
 *    sans-serif font stack as a fallback) as a sane default.
 * 2. Use Tailwind's default "normal" line-height so the user isn't forced
 *    to override it to ensure consistency even when using the default theme.
 */

html {
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; /* 1 */
  line-height: 1.5; /* 2 */
}

/**
 * Inherit font-family and line-height from `html` so users can set them as
 * a class directly on the `html` element.
 */

body {
  font-family: inherit;
  line-height: inherit;
}

/**
 * 1. Prevent padding and border from affecting element width.
 *
 *    We used to set this in the html element and inherit from
 *    the parent element for everything else. This caused issues
 *    in shadow-dom-enhanced elements like <details> where the content
 *    is wrapped by a div with box-sizing set to `content-box`.
 *
 *    https://github.com/mozdevs/cssremedy/issues/4
 *
 *
 * 2. Allow adding a border to an element by just adding a border-width.
 *
 *    By default, the way the browser specifies that an element should have no
 *    border is by setting it's border-style to `none` in the user-agent
 *    stylesheet.
 *
 *    In order to easily add borders to elements by just setting the `border-width`
 *    property, we change the default border-style for all elements to `solid`, and
 *    use border-width to hide them instead. This way our `border` utilities only
 *    need to set the `border-width` property instead of the entire `border`
 *    shorthand, making our border utilities much more straightforward to compose.
 *
 *    https://github.com/tailwindcss/tailwindcss/pull/116
 */

*,
::before,
::after {
  box-sizing: border-box; /* 1 */
  border-width: 0; /* 2 */
  border-style: solid; /* 2 */
  border-color: currentColor; /* 2 */
}

/*
 * Ensure horizontal rules are visible by default
 */

hr {
  border-top-width: 1px;
}

/**
 * Undo the `border-style: none` reset that Normalize applies to images so that
 * our `border-{width}` utilities have the expected effect.
 *
 * The Normalize reset is unnecessary for us since we default the border-width
 * to 0 on all elements.
 *
 * https://github.com/tailwindcss/tailwindcss/issues/362
 */

img {
  border-style: solid;
}

textarea {
  resize: vertical;
}

input::-moz-placeholder, textarea::-moz-placeholder {
  opacity: 1;
  color: #9ca3af;
}

input::placeholder,
textarea::placeholder {
  opacity: 1;
  color: #9ca3af;
}

button,
[role="button"] {
  cursor: pointer;
}

/**
 * Override legacy focus reset from Normalize with modern Firefox focus styles.
 *
 * This is actually an improvement over the new defaults in Firefox in our testing,
 * as it triggers the better focus styles even for links, which still use a dotted
 * outline in Firefox by default.
 */

:-moz-focusring {
  outline: auto;
}

table {
  border-collapse: collapse;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

/**
 * Reset links to optimize for opt-in styling instead of
 * opt-out.
 */

a {
  color: inherit;
  text-decoration: inherit;
}

/**
 * Reset form element properties that are easy to forget to
 * style explicitly so you don't inadvertently introduce
 * styles that deviate from your design system. These styles
 * supplement a partial reset that is already applied by
 * normalize.css.
 */

button,
input,
optgroup,
select,
textarea {
  padding: 0;
  line-height: inherit;
  color: inherit;
}

/**
 * Use the configured 'mono' font family for elements that
 * are expected to be rendered with a monospace font, falling
 * back to the system monospace stack if there is no configured
 * 'mono' font family.
 */

pre,
code,
kbd,
samp {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}


</style>