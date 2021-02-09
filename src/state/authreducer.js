const intialState = { isAuthenticated: false, userName: '' };

const authReducer = (authState = intialState, action) => {
    console.log('[authReducer] Received Action :', action);
    switch (action.type) {

        case 'SIGNIN_SUCCCES':
        case 'SIGNUP_SUCCCES':
            {
                authState = {
                    ...authState,
                    isAuthenticated: action.status,
                    userName: action.username,
                    successRedirect: action.status,
                    signInFailure: !action.status
                };
                break;
            }
        case 'SIGNIN_FAILURE':
        case 'SIGNUP_FAILURE':
            {
                authState = {
                    ...authState,
                    isAuthenticated: action.status,
                    successRedirect: action.status,
                    signInFailure: !action.status
                };
                break;
            }
        case 'SIGNOUT':
            {
                authState = {
                    ...authState,
                    userName: '',
                    isAuthenticated: false,
                    successRedirect: true,
                    signInFailure: false
                };
                break;
            }
        case 'ADDQUOTE':
            {
                authState = {
                    ...authState,
                    successRedirect: true
                };
                break;
            }
        default: authState = { ...authState };
    }

    return authState;

}

export default authReducer;
