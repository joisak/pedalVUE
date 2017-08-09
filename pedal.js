var user = "joisak",
		apiKey = "2716701230e056321ef598407d964f0b";

const Tracks = {
	template: `
	<div>
		<div class="text-center" v-for="item in topTracks">
			<p v-show="loading">"Listen to a lot of music..."</p>

						<transition name="slide">
							<div class="music-shit" v-if="show">
								<img :src="item.image[3]['#text']"/>
								<p v-cloak>
									{{ item.name }}<br>
									<b>{{ item.artist['#text']}}</b>
								</p>
							</div>
						</transition>

		</div>
	</div>
	`,
	data(){
		return {
			results: [],
			topTracks : [],
			loading: false,
			show: false,
			seen: false
		}
	},
	created() {
		axios.get('http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user='+user+'&api_key='+ apiKey +'&format=json')
		.then(response => {
			this.results = response.data.recenttracks.track
			for(var i = 0; i < 9; i++){
				this.topTracks.push(this.results[i]);
			}
		});
	},
	updated(){
		console.log(this.$children);
		this.show = true;
	}
};

const Home = {
	template: `
		<transition name="fade">
	<div class="text-center">

					<img src="me.jpg" class="me-img">
					<span>Web enthusiast with a passion to develop and design web pages. My expertise consists of the combination of editorial work, design and programming.  I am a cheerful, sociable and cool person with an interest in communication.
					If you would like more information or to discuss commissions and collaborations, please get in touch.
					Joakim Isaksson Göteborg
					</span>
	</div>
	</transition>

	`,
	data(){
		return {
			show: false
		}
	}
}

const routes = [
  { path: '/foo', component: Tracks },
  { path: '/bar', component: Home }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})


new Vue({
	el: '#music-list',
	router
})
