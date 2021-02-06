import { Component } from 'react';
import { connect } from 'react-redux';

class SignIn extends Component {

    state = {
        username: '',
        password: '',
        invalidCredentials: false
    }

    static getDerivedStateFromProps(props, state){
        let newState = state;
        if(props.successRedirect){
            props.history.push('/profile');
        }else if(props.signInFailed){
            newState = {...state, invalidCredentials: true}
        }
        
        return newState;
    }

    signIn = (event) => {
        this.props.login(this.state.username, this.state.password);

    }

    nameChangeHandler = (event) => {
        this.setState({ username: event.target.value });
    }
    passwordChangeHandler = (event) => {
        this.setState({ password: event.target.value });
    }
    render() {
        console.log('Rendering SignIn ', this.props );
        return (
            <div>
                {this.state.invalidCredentials && `Invalid Credentials or User doesn't exist!!`}
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
                        <button className="Button" onClick={this.signIn} >SignIn</button>
                    </div>


                </form>

            </div>
        );
    }
}

const mapAuthStoreToProps =(storeState) =>{
    return {
        successRedirect : storeState.successRedirect,
        signInFailed : storeState.signInFailure
    };
}
const mapDispatchActionstoProps = (dispatch) =>{
    return {
        login : (uname, pass) => dispatch(
           
            {type:'SIGNIN', payLoad :{userName: uname, password:pass}}
            
            )
    };
}

export default connect(mapAuthStoreToProps, mapDispatchActionstoProps)(SignIn);
