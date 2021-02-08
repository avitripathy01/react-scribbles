import { Component } from 'react';
import './Quote.css';

class Quote extends Component {
    render() {
        return (
            <div className="Quote">
                <h2>{this.props.author}</h2>
                <p>{this.props.desc}</p>
            </div>
        );
    }
}

export default Quote;