import { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { dispatchSignIn } from '../state/authActionCreators'

const SignIn = (props) => {

    const [uname, setUname] = useState('');
    const [pass, setPass] = useState('');
    const [invalidCreds, setCredsValidity] = useState(false);

    useEffect(() => {
        if (props.authStatus && props.successRedirect) {
            props.history.push('/profile');
        }
    }, [props]);

    useEffect(() => {
        if (!invalidCreds && props.signInFailed) {
            setCredsValidity(true);
        }
    }, [invalidCreds, props]);

    const signIn = (event) => {
        event.preventDefault();
        props.login(uname, pass);

    }

    const nameChangeHandler = (event) => {
        setUname(event.target.value);
    }

    const passwordChangeHandler = (event) => {
        setPass(event.target.value);
    }

    const signInFailure = invalidCreds && `Invalid Credentials or User doesn't exist!!`;
    console.log('Rendering [SignIn]');
    return (
        <div>
            {signInFailure}
            <form name="signup" className="form-example">
                <div className="form-example">
                    <label htmlFor="username">UserName</label>
                    <input type="text" name="username" onChange={nameChangeHandler} value={uname} />
                </div>
                <div className="form-example">
                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" onChange={passwordChangeHandler} value={pass} />
                </div>

                <div className="form-example" >
                    <button className="Button" onClick={signIn} >SignIn</button>
                </div>


            </form>

        </div>
    );

}

const mapAuthStoreToProps = (storeState) => {
    return {
        authStatus: storeState.isAuthenticated,
        successRedirect: storeState.successRedirect,
        signInFailed: storeState.signInFailure
    };
}
const mapDispatchActionstoProps = (dispatch) => {
    return {
        login: (uname, pass) => dispatch(dispatchSignIn(uname, pass))
    };
}

export default connect(mapAuthStoreToProps, mapDispatchActionstoProps)(SignIn);
