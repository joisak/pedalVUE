var user = "joisak",
		apiKey = "2716701230e056321ef598407d964f0b";
new Vue({
	el: '#music-list',
	data: {
		resultsTopTracks: [],
		resultsTopArtist: [],
		topTracks: [],
		topArtist:[],
		loading: false,
		show: false,
		collapse: false
	},
	created() {
		axios.get('http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user='+user+'&api_key='+ apiKey +'&format=json')
		.then(response => {
			this.resultsTopTracks = response.data.recenttracks.track
			for(var i = 0; i < 9; i++){
				this.topTracks.push(this.resultsTopTracks[i]);
			}
		});
		axios.get('http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user='+user+'&api_key='+ apiKey +'&format=json')
		.then(response => {
			this.resultsTopArtist = response.data.topartists.artist
			for(var i = 0; i < 9; i++){
				this.topArtist.push(this.resultsTopArtist[i]);
			}
		});

	},
	updated(){
			this.show = true;
	}
})
