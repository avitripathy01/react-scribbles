import { Component } from 'react';
import { connect } from 'react-redux';

import { dispatchSignIn } from '../state/authActionCreators'

class SignIn extends Component {

    state = {
        username: '',
        password: '',
        invalidCredentials: false
    };

    static getDerivedStateFromProps(props, state) {

        if (props.authStatus && props.successRedirect) {
            props.history.push('/profile');
        }
        return state;
    }

    componentDidUpdate() {
        if (!this.state.invalidCredentials && this.props.signInFailed) {
            this.setState({ invalidCredentials: true });
        }
    }

    signIn = (event) => {
        event.preventDefault();
        this.props.login(this.state.username, this.state.password);

    }

    nameChangeHandler = (event) => {
        this.setState({ username: event.target.value });
    }
    passwordChangeHandler = (event) => {
        this.setState({ password: event.target.value });
    }
    render() {
        const signInFailure = this.state.invalidCredentials && `Invalid Credentials or User doesn't exist!!`;
        console.log('Rendering [SignIn]');
        return (
            <div>
                {signInFailure}
                <form name="signup" className="form-example">
                    <div className="form-example">
                        <label htmlFor="username">UserName</label>
                        <input type="text" name="username" onChange={this.nameChangeHandler} value={this.state.username} />
                    </div>
                    <div className="form-example">
                        <label htmlFor="password">Password</label>
                        <input type="text" name="password" onChange={this.passwordChangeHandler} value={this.state.password} />
                    </div>

                    <div className="form-example" >
                        <button className="Button" onClick={this.signIn} >SignIn</button>
                    </div>


                </form>

            </div>
        );
    }
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
