import { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getActiveUser } from '../utilities/localstorage';

const Profile = (props) => {


    useEffect(() => {
        if (!props.isAuth) {
            const user = getActiveUser();
            if (!user) {
                props.history.push('/');
            }
        }
    }, [props]);

    console.log('Rendering [Profile]');
    const hereText = <Link to="/">here</Link>
    return (<p>Welcome user !! Click {hereText} for Home</p>);

}

const mapAuthStoreToProps = (storeState) => {
    return {
        isAuth: storeState.isAuthenticated
    };
}

export default connect(mapAuthStoreToProps, null)(withRouter(Profile));