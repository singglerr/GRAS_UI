import Vue from 'vue'
import Router from 'vue-router'
import Posts from '../components/Posts'
import AddPost from '../components/AddPost'
import EditPost from '../components/EditPost'
import Home from '../components/Home'
import Auth from "../components/Login"

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/posts',
			name: 'Posts',
			mata: {layout: "empty"},
			component: Posts
		},
		{
			path: '/posts/add',
			component: AddPost,
			name: 'addpost'
		},
		{
			path: '/posts/:id/edit',
			component: EditPost,
			name: 'editpost'
		},
		{
			path: "/",
			component: Home,
			name: "home"
		},
		{
			path: "/login",
			name: "Login",
			component: Auth
		}
	]
})
