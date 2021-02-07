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
        let newState = state;
        if (props.successRedirect) {
            props.history.push('/profile');
        }

        return newState;
    }

    signup = (event) => {
        this.props.createNewUser(this.state.username, this.state.password);

    }

    nameChangeHandler = (event) => {
        this.setState({ username: event.target.value });
    }
    passwordChangeHandler = (event) => {
        this.setState({ password: event.target.value });
    }
    render() {
        console.log('Rendering SignIn ', this.props);
        return (
            <div>

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
        successRedirect: storeState.successRedirect,

    };
}
const mapDispatchActionstoProps = (dispatch) => {
    return {
        createNewUser: (uname, pass) => dispatch(dispatchSignUp(uname, pass))
    };
}

export default connect(mapAuthStoreToProps, mapDispatchActionstoProps)(SignUp);
