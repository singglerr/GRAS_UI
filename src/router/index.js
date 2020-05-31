import Vue from 'vue'
import Router from 'vue-router'
import Posts from '../components/Posts'
import AddPost from '../components/AddPost'
import EditPost from '../components/EditPost'
import Hello from '../components/Hello'

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
			component: Hello,
			name: "hello"
		}
	]
})
