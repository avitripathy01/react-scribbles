import { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getActiveUser } from '../utilities/localstorage';

class Profile extends Component {

    state = {
        isAuth: false,
        user: ''
    };

    componentDidMount() {
        if (!(this.state.isAuth || this.state.user !== '')) {
            const user = getActiveUser();
            if (user && user !== "")
                this.setState({ isAuth: user && user !== "", user: user });
            else
                this.props.history.push('/');
        }
    }

    render() {
        console.log('Rendering [Profile]');
        const hereText = <Link to="/">here</Link>
        return (<p>Welcome user !! Click {hereText} for Home</p>);
    }
}

const mapAuthStoreToProps = (storeState) => {
    return {
        isAuth: storeState.isAuth
    };
}

export default connect(mapAuthStoreToProps, null)(withRouter(Profile));