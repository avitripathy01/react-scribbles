import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import Quote from './Quote';
import ActionElements from '../ActionElements/ActionElements';
import { getActiveUser } from '../utilities/localstorage';

import './QuotesContainer.css';



class QuotesContainer extends Component {

    constructor() {
        super();
        this.state = {
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
    }

    componentDidMount() {
        if (!(this.state.isAuth || this.state.user !== '')) {
            const user = getActiveUser();
            this.setState({ isAuth: user && user !== "", userName: user });
        }
    }
    toggleDisplayQuotes = () => {
        let showAllToggle = this.state.showAll;
        this.setState({ showAll: !showAllToggle });
    }

    addUserQuote = () => {
        (this.props.authStatus || this.state.isAuth) ? this.props.history.push('/add-quote') :
            this.signUpClickHandler();
    }

    signUpClickHandler = () => {
        this.props.history.push('signup');
    }

    signInClickHandler = () => {
        this.props.history.push('signin');
    }

    gotoProfilePage = () => {
        this.props.history.push('/profile');
    }

    logout = () => {
        let userName = this.props.userName || this.state.userName;
        this.props.signout(userName);
        this.setState({ isAuth: false, user: '' });
    }

    render() {
        console.log('Rendering [QuoteContainer] : Authentication status:: ', (this.props.authStatus || this.state.isAuth));
        let quotes = [];
        let showButtonText = 'Show All Quotes';

        if (this.state.showAll) {
            quotes = this.state.quotes;
            showButtonText = 'Show featured Quotes';
        } else {
            quotes = this.state.quotes.filter(quote => { return quote.isFeatured });
        }
        const quotesDisplay = quotes.map((quote) => {
            return <div key={quote.id}>
                <Quote author={quote.author} featured={quote.isFeatured} desc={quote.quote} />
            </div>
        });

        return (
            <React.Fragment>
                <ActionElements toggleQuoteButtonText={showButtonText}
                    signUp={this.signUpClickHandler}
                    signIn={this.signInClickHandler}
                    isAuth={this.props.authStatus || this.state.isAuth}
                    addQuote={this.addUserQuote}
                    toggleQuote={this.toggleDisplayQuotes}
                    signout={this.logout}
                    visitProfile={this.gotoProfilePage} />

                {quotesDisplay}

            </React.Fragment>
        );
    }
}

const mapStoreStateToProps = (state) => {
    return {
        authStatus: state.isAuthenticated,
        userName: state.userName
    };
}
const mapDispatchActionstoProps = (dispatch) => {
    return {
        signout: (uname) => dispatch(

            { type: 'SIGNOUT', payLoad: { userName: uname } }

        )
    };
}

export default connect(mapStoreStateToProps, mapDispatchActionstoProps)(withRouter(QuotesContainer));
