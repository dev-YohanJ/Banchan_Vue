import {createRouter, createWebHistory} from 'vue-router';
import Main from '../pages/main/main.vue';
import Login from '../components/member/member_login.vue';
import Join from '../components/member/member_join.vue';
import ForgotPw from '../components/member/member_forgotpw.vue';
import Product_Write from '../components/item/item_write.vue';
import Mypage from '../components/mypage/mypage.vue';
import Wish from '../components/mypage/wish.vue';
import Buy from '../components/mypage/buy.vue';
import Sell from '../components/mypage/sell.vue';
import Update from '../components/mypage/update';
import Secession from '../pages/mypage/secession';
import Admin_Page from '../components/sidebarDo.vue';
import Notice_List from '../pages/admin/notice_list.vue';
// import Notice_List_Member from '../pages/admin/notice_list_member.vue';
import Notice_Detail from '../pages/admin/notice_detail.vue'
import Notice_Write from '../pages/admin/notice_write.vue';
import Notice_Update from '../pages/admin/notice_update.vue';
import Qna_List from '../pages/admin/qna_list.vue';
// import Qna_List_Member from '../pages/admin/qna_list_member.vue';
import Qna_Detail from '../pages/admin/qna_detail.vue';
import Qna_Write from '../pages/admin/qna_write.vue';
import Qna_Update from '../pages/admin/qna_update.vue';
import Item_List_Admin from '../pages/admin/item_list_admin.vue';
import Member_List from '../pages/admin/member_list.vue';
import Member_Info from '../pages/admin/member_info.vue';
import Item_List from '../pages/item/item_list.vue';
import Item_Detail from '../pages/item/item_detail.vue';
import Item_Update from '../pages/item/item_update.vue';
import Error_404 from '../components/error/404Do.vue';
import Chat from '../components/chat/App.vue'
import EnterRoom from '../components/chat/EnterRoom.vue'
import ChatRoom from '../components/chat/ChatRoom.vue'
import Update_Check from '../components/mypage/update_check.vue';

const router = createRouter({
	history : createWebHistory(),
	routes : [
	{
		path:'/',
		redirect:'/banchan/main'
	},	
	{
		path:'/banchan',
		redirect:'/banchan/main'
	},	
	{
		path:'/banchan/main',
		name : 'Main',
		component : Main
	},
	{
		path:'/banchan/login',
		name : 'Login',
		component : Login
	},
	{
		path:'/banchan/join',
		name : 'Join',
		component : Join
	},
	{
		path: '/banchan/forgotPw',
		name: 'ForgotPw',
		component: ForgotPw
	}, 
	{
		path:'/banchan/product_new',
		name : 'Product_Write',
		component : Product_Write
	},
	{
		path: '/banchan/mypage',
		name: 'Mypage',
		component: Mypage
	},
	{
		path: '/banchan/wish',
		name: 'Wish',
		component: Wish
	},
	{
		path: '/banchan/buy',
		name: 'Buy',
		component: Buy
	},
	{
		path: '/banchan/sell',
		name: 'Sell',
		component: Sell
	},
	{
		path: '/banchan/update',
		name: 'Update',
		component: Update
	},
	{
		path: '/banchan/update_check',
		name: 'Update_Check',
		component: Update_Check
	},
	{
		path: '/banchan/secession',
		name: 'Secession',
		component: Secession // 회원탈퇴
  },
	{
		path: '/banchan/admin',
		name: 'Admin_Page',
		component: Admin_Page
	},
  {
		path: '/banchan/notice/list',
		name: 'Notice_List',
		component: Notice_List
	},
	// {
	// 	path: '/banchan/notice/list/member',
	// 	name: 'Notice_List_Member',
	// 	component: Notice_List_Member
	// },
	{
		path: '/banchan/notice/:num/detail',
		name: 'Notice_Detail',
		component: Notice_Detail
	},
	{
		path:'/banchan/notice/write/:id',
		name : 'Notice_Write',
		component : Notice_Write
	},
	{
		path:'/banchan/notice/:num/edit',
		name : 'Notice_Update',
		component : Notice_Update
	},
	{
		path: '/banchan/qna/list',
		name: 'Qna_List',
		component: Qna_List
	},
	// {
	// 	path: '/banchan/qna/list/member',
	// 	name: 'Qna_List_Member',
	// 	component: Qna_List_Member
	// },
	{
		path: '/banchan/qna/:num/detail',
		name: 'Qna_Detail',
		component: Qna_Detail
	},
	{
		path:'/banchan/qna/write/:id',
		name : 'Qna_Write',
		component : Qna_Write
	},
	{
		path:'/banchan/qna/:num/edit',
		name : 'Qna_Update',
		component : Qna_Update
	},
	{
		path:'/banchan/admin/item/list',
		name : 'Item_List_Admin',
		component : Item_List_Admin		
	},
	{
		path:'/banchan/users/list',
		name : 'Member_List',
		component : Member_List
	},
	{
		path:'/banchan/users/:id/info',
		name : 'Member_Info',
		component : Member_Info
	},
	{
		path:'/banchan/item/list',
		name : 'Item_List',
		component : Item_List		
	},
	{
		path:'/banchan/item/:num/detail',
		name : 'Item_Detail',
		component : Item_Detail,
	},
	{
		path:'/banchan/item/:num/edit',
		name : 'Item_Update',
		component : Item_Update
	},
	// {
	// 	path:'/:pathMatch(.*)*',
	// 	redirect : '/banchan/404'
	// },
	{
		path:'/banchan/404',
		name : '404',
		component : Error_404
	},
	{
		path: '/banchan/chat',
		name: 'Chat',
		component: Chat
	  },
	  {
		path: '/banchan/enterchat',
		name: 'EnterRoom',
		component: EnterRoom
	  },
	  {
		path: '/banchan/chat-room/:username',
		name: 'ChatRoom',
		component: ChatRoom
	  }, 
]
});

export default router;
