import './App.css';
import { Component } from 'react';

class App extends Component{
    
  state = {
    counter: 0,
    posts: [
      {
        id: 1,
        title: 'Title One',
        body: 'Body One'
      },
      {
        id: 2,
        title: 'Title Two',
        body: 'Body Two'
      },
      {
        id: 3,
        title: 'Title Three',
        body: 'Body Three'
      }
    ]
  };

  timeoutUpdate = null;

  componentDidMount(){
    this.handleTimeOut();
  }

  componentDidUpdate(){
    this.handleTimeOut();
  }

  componentWillUnmount(){
    clearTimeout(this.timeoutUpdate);
  }

  handleTimeOut = () => {
    const { posts, counter } = this.state;

    posts[0].title = 'Change Title.'
    
    this.timeoutUpdate = setTimeout(() => {
      this.setState({ posts, counter: counter + 1 });
    }, 1000);

    console.log('Olá')
  }

  render(){

    const { posts, counter } = this.state;

    return (
        <div className="App">
          <h1>{ counter }</h1>
          {
            posts.map( post => (
              <div key={post.id}>
               
                <h1> { post.title}</h1>
                <p>{post.body}</p>
              </div>
            ))
          }
        </div>
    );
  }
}

export default App;