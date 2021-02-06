import React, { Component } from 'react';
import  { Link } from 'react-router-dom';

class Profile extends Component{

    render(){
    const homePageText = <React.Fragment><Link to="/">here</Link></React.Fragment> ;
        return (<p>WELCOME USER !! click {homePageText} for HomePage</p>);
    }
}

export default Profile; 
