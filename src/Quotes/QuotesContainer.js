import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import Quote from './Quote';
import ActionElements from '../ActionElements/ActionElements';
import { getActiveUser } from '../utilities/localstorage';
import { dispatchSignout } from '../state/authActionCreators';

import './QuotesContainer.css';



const QuotesContainer = (props) => {
    const initialState = {
        quotes: [
            {
                id: 1, author: 'Oscar Wilde',
                quote: 'Be yourself; everyone else is already taken.',
                isFeatured: false
            },

            {
                id: 2, author: 'Ralph Waldo Emerson',
                quote: 'Always do what you are afraid to do.',
                isFeatured: true
            },

            {
                id: 3, author: 'Oprah Winfrey',
                quote: 'Turn your wounds into wisdom.',
                isFeatured: true
            },

            {
                id: 4, author: 'Moliere',
                quote: 'Trees that are slow to grow bear the best fruit.',
                isFeatured: false
            },

            {
                id: 5, author: 'Albert Einstein',
                quote: 'You never fail until you stop trying.',
                isFeatured: true
            }
        ],
        showAll: false,
        isAuth: false,
        user: ''
    };

    const [state, setState] = useState(initialState);

    useEffect(() => {
        console.log('runnimg useeffect', state, props);
        if (!state.isAuth && !props.authStatus) {
            console.log('runnimg checks');
            const user = getActiveUser();
            if (user) {
                console.log('Mounting');
                setState({ ...state, isAuth: true, user: user });
            }

        }
    }, [state, props]);

    const toggleDisplayQuotes = () => {
        let showAllToggle = state.showAll;
        setState({ ...state, showAll: !showAllToggle });
    };

    const addUserQuote = () => {
        props.history.push('/add-qoute');
    }

    const signUpClickHandler = () => {
        props.history.push('signup');
    }

    const signInClickHandler = () => {
        props.history.push('signin');
    }

    const gotoProfilePage = () => {
        props.history.push('/profile');
    }

    const logout = () => {
        let userName = props.userName || state.userName;
        props.signout(userName);
        setState({ ...state, isAuth: false, user: '' });
    }


     
    let quotes = [];
    let showButtonText = 'Show All Quotes';

    if (state.showAll) {
        quotes = state.quotes;
        showButtonText = 'Show featured Quotes';
    } else {
        quotes = state.quotes.filter(quote => { return quote.isFeatured });
    }
    const quotesDisplay = quotes.map((quote) => {
        return <div key={quote.id}>
            <Quote author={quote.author} featured={quote.isFeatured} desc={quote.quote} />
        </div>
    });

    return (
        <React.Fragment>
            <ActionElements toggleQuoteButtonText={showButtonText}
                signUp={signUpClickHandler}
                signIn={signInClickHandler}
                isAuth={state.isAuth || props.authStatus}
                addQuote={addUserQuote}
                toggleQuote={toggleDisplayQuotes}
                signout={logout}
                visitProfile={gotoProfilePage} />
            {quotesDisplay}

        </React.Fragment>
    );
}


const mapStoreStateToProps = (state) => {
    return {
        authStatus: state.isAuthenticated,
        userName: state.userName
    };
}
const mapDispatchActionstoProps = (dispatch) => {
    return {
        signout: (uname) => dispatch(dispatchSignout(uname))

    };
}

export default connect(mapStoreStateToProps, mapDispatchActionstoProps)(withRouter(React.memo(QuotesContainer)));
