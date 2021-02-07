import { signInUser, signUpUser, signOutUser, saveUserQuotes } from '../utilities/localstorage';

export const dispatchSignIn = (uname, pass) => {
    return dispatch => {
        const authStat = signInUser(uname, pass);

        if (authStat)
            dispatch(signInSuccess(authStat, uname));
        else
            dispatch(signInFailure(authStat));
    };
}

export const dispatchSignUp = (uname, pass) => {
    return dispatch => {
        const authStat = signUpUser(uname, pass);

        if (authStat)
            dispatch(signUpSuccess(authStat, uname));
        else
            dispatch(signUpFailure(authStat));
    };
}

export const dispatchSignout = (uname) => {
    return dispatch => {
        signOutUser(uname);
        dispatch(signOut());
    };
}

export const dispatchAddNewQuote = (user, quote) => {
    return dispatch => {
        saveUserQuotes(user, quote);
        dispatch(quoteSaved());
    }
}

const signUpSuccess = (authStatus, uname) => {
    return { type: 'SIGNUP_SUCCCES', status: authStatus, username: uname };
}
const signUpFailure = (authStatus) => {
    return { type: 'SIGNUP_FAILURE', status: authStatus };
}

const signInSuccess = (authStatus, uname) => {
    return { type: 'SIGNIN_SUCCCES', status: authStatus, username: uname };
}
const signInFailure = (authStatus) => {
    return { type: 'SIGNIN_FAILURE', status: authStatus };
}

const signOut = () => {
    return { type: 'SIGNOUT' };
}

const quoteSaved = () => {
    return { type: 'ADDQUOTE' };
}