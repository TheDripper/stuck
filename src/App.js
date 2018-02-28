import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from 'axios';
import Entities from 'entities';


class App extends Component {
  render() {
    return (
      <div className="App">
      	<Feed />
      </div>
    );
  }
}

class Feed extends Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: []
		}
	}
	async componentDidMount() {
		let titles = await Axios.get('https://www.reddit.com/r/worldnews/new.json');
		let pics = await Axios.get('https://www.reddit.com/r/pics/new.json');
		titles = titles.data.data.children;
		pics = pics.data.data.children;
		console.log(pics);
		let posts = [];
		titles.forEach((title,dex)=>{
			posts.unshift([title.data.title,Entities.decodeHTML(pics[dex].data.preview.images[0].source.url)]);
			this.setState({posts});
		});
	}
	render() {
		let posts = this.state.posts.map(post=>{
			var back = {
				backgroundImage: 'url('+post[1]+')'
				
			}
			return <div className="post" style={back}><h1>{post[0]}</h1></div>
		});
		return(
			<div>{posts}</div>
		);
	}
}

export default App;
