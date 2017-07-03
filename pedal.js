var user = "joisak",
		apiKey = "2716701230e056321ef598407d964f0b";
new Vue({
	el: '#music-list',
	data: {
		results: [],
		resultsArtist: [],
		topArtist: [],
		topTracks : [],
		loading: false,
		show: false,
		showArtist: false
	},
	created() {
		axios.get('http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user='+user+'&api_key='+ apiKey +'&format=json')
		.then(response => {
			this.results = response.data.recenttracks.track
			for(var i = 0; i < 9; i++){
				this.topTracks.push(this.results[i]);
			}
		});
		axios.get('http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user='+user+'&api_key='+ apiKey +'&format=json')
		.then(response => {
			this.resultsArtist = response.data.topartists.artist
			for(var i = 0; i < 9; i++){
				this.topArtist.push(this.resultsArtist[i]);
			}
		});
	},
	methods: {
		buttonArtist: function(){
					this.show = false;
					this.showArtist = true;
		},
		buttonTracks: function(){
					this.showArtist = false;
					this.show = true;
		}
	},
	updated(){
	}
})
