import { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { getActiveUser } from '../utilities/localstorage';
import { dispatchAddNewQuote } from '../state/authActionCreators';


import './AddQuote.css';

class AddQuote extends Component {

    state = {
        user: '',
        author: '',
        quote: '',
        featured: '',
        isAuth: false
    };



    static getDerivedStateFromProps(props, state) {
        if (!props.authStatus) {
            const user = getActiveUser();
            if (!user)
                props.history.push('/signup');
        }
        return null;;
    }

    onAuthorChangeHandler = (event) => {
        this.setState({ author: event.target.value });
    }
    onQuoteChangeHandler = (event) => {
        this.setState({ quote: event.target.value });
    }

    featureChangeHandler = (value) => {
        this.setState({ featured: value });
    }
    saveQuote = (e) => {
        this.props.history.push('/');

    }

    render() {
        console.log('Rendering [AddQuote] ');
        // const saveButton = { backgroundColor: 'green' };
        const marginStyle = { margin: '10px' };
        return (
            <div>
                <form name="add-quote" className="form-example" style={marginStyle}>
                    <div className="form-example">
                        <label htmlFor="author">Author</label>
                        <input type="text" name="author" onChange={this.onAuthorChangeHandler} value={this.state.author} />
                    </div>
                    <div className="form-example">
                        <label htmlFor="quote">Quote</label>
                        <textarea type="text" name="quote" rows="5" cols="20" onChange={this.onQuoteChangeHandler} value={this.state.quote} />
                    </div>
                    <div className="form-example" style={marginStyle}>
                        <label htmlFor="is-featured" name="featured" value={this.state.featured}>Is Featured?</label>

                        <input type="radio" name="featured"
                            onClick={this.featureChangeHandler.bind(this, true)}
                            value="yes" />
                        <label htmlFor="yes">Yes</label>

                        <input type="radio" name="featured"
                            onClick={this.featureChangeHandler.bind(this, false)}
                            value="no" />
                        <label htmlFor="no">No</label>

                    </div>
                    <div className="form-example" >
                        <button
                            onClick={this.props.addQuote.bind(this, this.state.user, this.state.author, this.state.quote, this.state.featured)}
                            className="Button">Add Quote</button>
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
    };
}

const mapDispatchActionstoProps = (dispatch) => {
    return {
        addQuote: (userName, author, quote, isFeatured) =>
            dispatch(dispatchAddNewQuote(userName, { author: author, quote: quote, isFeatured: isFeatured })
            )
    };
}

export default connect(mapAuthStoreToProps, mapDispatchActionstoProps)(withRouter(AddQuote));
