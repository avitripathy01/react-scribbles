import React from 'react';

const actionElements = (props) => {


    const genericActions = <React.Fragment>
        <button className="Button" onClick={props.toggleQuote}>{props.toggleQuoteButtonText}</button>
        <button className="Button" onClick={props.addQuote}>Add New Quote</button>
    </React.Fragment>;

    const authActions = <React.Fragment>
        <button className="Button" onClick={props.visitProfile}>My Profile</button>
        <button className="Button" onClick={props.signout}> Sign out</button>
    </React.Fragment>;

    const unAuthActions = <React.Fragment>
        <button className="Button" onClick={props.signUp}>Sign Up</button>
        <button className="Button" onClick={props.signIn}>Sign In</button>
    </React.Fragment>;

    const displayActions = props.isAuth ? authActions : unAuthActions;

    return (
        <div>
            {genericActions}
            {displayActions}
        </div>
    );
}



export default actionElements;