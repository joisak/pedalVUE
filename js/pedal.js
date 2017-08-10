var user = "joisak",
  apiKey = "2716701230e056321ef598407d964f0b";

const Tracks = {
  template: `
	<div>
	<div id="pedal" class="text-center">
		<h1>PEDAL</h1>
	</div>
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
  },
	mounted(){
		var pedal = document.getElementById('pedal');
		var colors = ['#ffcc76','#66d99b', '#000'];
		var names = ['PEDAL','pedal','ladep','Joisaks RadioMAX', 'pEdaL','PeDaL','SUPER WEB PRODUCTION','**PEDAL**','//**---->PEDAL', 'PEDAL<----**///','snopp :)'];
		setInterval(function(){
			var randColor = colors[Math.floor(Math.random() * colors.length)];
			var randHead = names[Math.floor(Math.random() * names.length)];
			pedal.style.color = randColor;
			pedal.innerText = randHead;
		}, 2000);
	}
};

const Me = {
  template: `
		<transition name="fade">
			<div class="text-center" id="me" v-if="show">
				<img src="img/me_zoom_.gif" class="me-img">
				<p>
					Web enthusiast with a passion to develop and design web pages. My expertise consists of the combination of editorial work, design and programming.  I am a cheerful, sociable and cool person with an interest in communication.
					If you would like more information or to discuss commissions and collaborations, please <a href="https://www.linkedin.com/in/joakim-isaksson-0693a632/">get in touch.</a>
					<p><span>Joakim Isaksson - Göteborg</span></p>
				</p>
			</div>
		</transition>
	`,
  data() {
    return {
      show: false,
    }
  },
	mounted() {
		this.show = true
	}
}

Vue.component('links', {
	template: `
		<div v-cloak class="text-center links">
			<transition name="fade">
			<div v-if="show">
						<div v-if="tracks" v-on:click="changeLink">
							<router-link to="/me"><span class="moi-link">MOI</span></router-link>
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
		this.tracks = (window.location.hash == '#/') ? this.tracks = true : this.tracks = false;

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
