import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import Rank from './components/rank/Rank';
import SignIn from './components/signin/Signin';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
import FaceRecon from './components/facerecon/FaceRecon';
import Register from './components/register/Register';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';


const initialState= 
{      input: "",
      imageURL: "",
      box: "",
      route: "signin",
      isSignedIn: false,
      user: {
        id: "", 
        name: '',
        email: '',
        joined: "",
        posts: 0
      }
}


const app = new Clarifai.App({
 apiKey: "e54f2e233e444c509902652ee0a34955"
});


const particleOptions = {
                particles: {
                  line_linked: {
                    shadow: {
                      enable: true,
                      color: "#3CA9D1",
                      blur: 5
                    }
                  }
                }
        }

class App extends Component {

  constructor(props){
    super(props)
    this.state= initialState;
  }



calculateFaceLocation(data){
  const face = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('targetImage');
  const width = Number(image.width);
  const height = Number(image.height);
  return {
          leftCol: face.left_col * width,
          topRow: face.top_row * height,
          rightCol: width-(face.right_col * width),
          bottomRow: height - (face.bottom_row * height)
  }
}

loadUser = (data) =>{
  this.setState({user: {
    id: data.id,
    name: data.name,
    email: data.email,
    posts: data.posts,
    joined: data.joined
  }
  })
}

displayFaceBox = (box) =>{
  this.setState({box: box});
}


  onInputChange=(e)=>{
    console.log(e.target.value);
    this.setState({input: e.target.value})
  }

  onButtonSubmit=()=>{
    const {user} = this.state;
    this.setState({ imageURL: this.state.input });
    console.log(this.state.input);

    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input)
      .then( response => {
          if(response){
            fetch('http://localhost:3000/images', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                          id: this.state.user.id
                  })

            })
              .then(response=> response.json())
              .then(count =>{
                this.setState(Object.assign(user, {posts: count+1}))
              })
          }
          this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch((err) => console.log(err));
  }

  onRouteChange=(route)=>{
    let signedIn;
    route === 'home'? signedIn = true : signedIn = false;
    if (!signedIn){
      this.setState(initialState)
    }
    this.setState({isSignedIn: signedIn, })
    this.setState({route: route})

  }

  render() {
    const { box, imageURL, route, isSignedIn, user } = this.state;
    return (
      <div className="App">
      <Particles className="particles"
            params={particleOptions} 
            />
          <Navigation onRouteChange={this.onRouteChange} isSignedIn = {isSignedIn} />
          { this.state.route === 'home' 
            ? <div>
                <Logo />
                <Rank name={user.name} posts={user.posts}/>
                <ImageLinkForm 
                      onInputChange={this.onInputChange} 
                      onButtonSubmit={this.onButtonSubmit}
                      />
                <FaceRecon
                box={box} 
                imageURL = {imageURL} />
                </div> 
            : (route === 'signin'
                ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
                : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
                ) 
              }
      </div>
      )

  }
}

export default App;
