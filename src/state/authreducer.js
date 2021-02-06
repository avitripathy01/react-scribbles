import { signUpUser, signIn, signOut, saveUserQuotes } from '../utilities/localstorage';
const intialState = {isAuthenticated : false, userName : ''};

const authReducer = (authState = intialState, action) => {
    console.log('[authReducer] Received Action :',action);
    switch(action.type){
        case 'SIGNUP':
            {
                signUpUser(action.payLoad.userName, action.payLoad.password)
                    .then((authenticated) =>{
                        authState =  {...authState, userName:action.payLoad.userName, 
                                        authenticated: true, successRedirect: true};
                    });
                break;
            }
        case 'SIGNIN':
            {
                signIn(action.payLoad.userName, action.payLoad.password)
                    .then((authenticated) =>{   
                        authState =  {...authState, userName:action.payLoad.userName, 
                                        authenticated: false, successRedirect:authenticated, signInFailure: !authenticated};
                    });
                break;
            }
        case 'SIGNOUT':
            {
                signOut(action.payLoad.userName) 
                    authState =  {...authState, userName:'',  
                                    isAuthenticated: false, successRedirect:true};
               
                break;
            }
        case 'ADDQUOTE':
            {
                saveUserQuotes(action.payLoad.user, action.payLoad.quote)
                .then((saved) => {
                    authState =  {...authState, userName:action.payLoad.user,  
                        isAuthenticated: true, successRedirect: true};
                }); 
                
                break;
            }
        default: authState =  {...authState};
    }
 
    return authState;

}

export default authReducer;
