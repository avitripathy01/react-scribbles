import { Component } from 'react';
import { connect } from 'react-redux';
import { dispatchSignUp } from '../state/authActionCreators';
class SignUp extends Component {

    state = {
        username: '',
        password: '',
        invalidCredentials: false
    }

    static getDerivedStateFromProps(props, state) {

        if (props.authStatus && props.successRedirect) {
            props.history.push('/profile');
        }
        return state;
    }
    componentDidUpdate() {
        if (this.props.failureSignUp && !this.state.invalidCredentials) {
            this.setState({ invalidCredentials: true });
        }
    }
    signup = (event) => {
        event.preventDefault();
        this.props.createNewUser(this.state.username, this.state.password);

    }

    nameChangeHandler = (event) => {
        this.setState({ username: event.target.value });
    }
    passwordChangeHandler = (event) => {
        this.setState({ password: event.target.value });
    }
    render() {
        const signUpFailure = this.state.invalidCredentials && `User already  exist!!`;
        console.log('Rendering [SignUp]');
        return (
            <div>
                {signUpFailure}
                <form name="signup" className="form-example"  >
                    <div className="form-example">
                        <label htmlFor="username">UserName</label>
                        <input type="text" name="username" onChange={this.nameChangeHandler} value={this.state.username} />
                    </div>
                    <div className="form-example">
                        <label htmlFor="password">Password</label>
                        <input type="text" name="password" onChange={this.passwordChangeHandler} value={this.state.password} />
                    </div>

                    <div className="form-example" >
                        <button className="Button" onClick={this.signup} >SignUp</button>
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
        failureSignUp: storeState.signInFailure
    };
}
const mapDispatchActionstoProps = (dispatch) => {
    return {
        createNewUser: (uname, pass) => dispatch(dispatchSignUp(uname, pass))
    };
}

export default connect(mapAuthStoreToProps, mapDispatchActionstoProps)(SignUp);
