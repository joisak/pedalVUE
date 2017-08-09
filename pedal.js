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
  data() {
    return {
      results: [],
      topTracks: [],
      loading: false,
      show: false,
      seen: false
    }
  },
  created() {
    axios.get('http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=' + user + '&api_key=' + apiKey + '&format=json')
      .then(response => {
        this.results = response.data.recenttracks.track
        for (var i = 0; i < 9; i++) {
          this.topTracks.push(this.results[i]);
        }
      });
  },
  updated() {
    this.show = true;
  }
};

const Me = {
  template: `
		<transition name="fade">
			<div class="text-center">
				<img src="me_zoom.gif" class="me-img">
				<p>
					Web enthusiast with a passion to develop and design web pages. My expertise consists of the combination of editorial work, design and programming.  I am a cheerful, sociable and cool person with an interest in communication.
					If you would like more information or to discuss commissions and collaborations, please <a href="">get in touch.</a>
					<p><span>Joakim Isaksson - Göteborg</span></p>
				</p>
			</div>
		</transition>
	`,
  data() {
    return {
      show: false,
    }
  }
}



Vue.component('links', {
	template: `
		<div v-cloak class="text-center links">
			<transition name="fade">
			<div v-if="show">
						<div v-if="tracks" v-on:click="changeLink">
							<router-link to="/me">MOI</router-link>
						</div>
						<div v-if="!tracks" v-on:click="changeLink">
								<router-link v-on:click="changeLink" to="/"><span class="back-link">back</span></router-link>
						</div>
					</transition-group>
			</div>
			</transition>
		</div>
	`,
	data(){
		return {
			show: false,
			tracks: true
		}
	},
	methods: {
		changeLink: function(){
			this.tracks = (this.tracks) ? this.tracks = false : this.tracks = true;
		}
	},
	mounted() {
		this.show = true;
	}

});

const routes = [{
    path: '/',
    component: Tracks
  },
  {
    path: '/me',
    component: Me
  }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})


new Vue({
  el: '#music-list',
  router
})
