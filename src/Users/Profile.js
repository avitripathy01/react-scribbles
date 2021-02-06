import { Component } from 'react';
import { Link } from 'react-router-dom';

class Profile extends Component {

    render(){
        const hereText = <Link to="/">here</Link>
        return(<p>Welcome user !! Click {hereText} for Home</p>);
    }
}

export default Profile;