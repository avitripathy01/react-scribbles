import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { dispatchSignUp } from '../state/authActionCreators';
const SignUp = (props) => {

    const [uname, setUname] = useState('');
    const [pass, setPass] = useState('');
    const [userExists, setUserExists] = useState(false);

    useEffect(() => {
        if (props.authStatus && props.successRedirect) {
            props.history.push('/profile');
        }
    }, [props]);

    useEffect(() => {
        if (props.failureSignUp && !userExists) {
            setUserExists(true);
        }
    }, [userExists, props]);

    const signup = (event) => {
        event.preventDefault();
        props.createNewUser(uname, pass);
    }

    const nameChangeHandler = (event) => {
        setUname(event.target.value);
    }
    const passwordChangeHandler = (event) => {
        setPass(event.target.value);
    }

    const signUpFailure = userExists && `User already  exist!!`;
    console.log('Rendering [SignUp]');
    return (
        <div>
            {signUpFailure}
            <form name="signup" className="form-example"  >
                <div className="form-example">
                    <label htmlFor="username">UserName</label>
                    <input type="text" name="username" onChange={nameChangeHandler} value={uname} />
                </div>
                <div className="form-example">
                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" onChange={passwordChangeHandler} value={pass} />
                </div>

                <div className="form-example" >
                    <button className="Button" onClick={signup} >SignUp</button>
                </div>


            </form>

        </div>
    );

}

const mapAuthStoreToProps = (storeState) => {
    return {
        authStatus: storeState.isAuthenticated,
        successRedirect: storeState.successRedirect,
        failureSignUp: storeState.signInFailure
    };
}
const mapDispatchActionstoProps = (dispatch) => {
    return {
        createNewUser: (uname, pass) => dispatch(dispatchSignUp(uname, pass))
    };
}

export default connect(mapAuthStoreToProps, mapDispatchActionstoProps)(SignUp);
