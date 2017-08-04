var user = "joisak",
		apiKey = "2716701230e056321ef598407d964f0b";
new Vue({
	el: '#music-list',
	data: {
		results: [],
		topTracks : [],
		loading: false,
		show: false,
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
			this.show = true;
	}
})
