import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';

import {auth, createUserProfileDocument} from './firebase/firebase.utils';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';

import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';


class App extends React.Component {
  constructor(){
    super();

    this.state = {
      currentUser : null
    }
  }

  unSubscribeFromAuth = null;

  componentDidMount(){
      this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      //this.setState({currentUser:user});
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser:{
              id:snapShot.id,
              ...snapShot.data()
            }
          })
        });
      }
      
      else{
        this.setState({currentUser:userAuth}); 
      }
    });
  }

  componentWillUnmount(){
    this.unSubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header currentUser = {this.state.currentUser}/>
        <Switch>
          <Route exact path='/' component = {HomePage}/>
          <Route exact path='/shop' component = {ShopPage}/>
          <Route exact path='/signin' component = {SignInAndSignUpPage}/>
        </Switch>
      </div>
    );
  }
}

export default App;
