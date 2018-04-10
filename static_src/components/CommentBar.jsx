import { Grid, Row, Col } from 'react-flexbox-grid';
import '../styles/comment.scss'
import UserInfo from './UserInfo'

class Comment extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = props.data;
    }

    render() {
        const fish = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

        return (
            <div className="comment">
                <UserInfo username={this.state.username || "FIXME"}/>
                <p className="comment-text">{this.state.text || fish}</p>
            </div>
        );
    }
}

export default class CommentBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
    }

    render() {
        const items = this.state.items.map(function(commentData){
            return <Comment data={commentData}/>;
        });

        return (
            <div id="comment-bar">
                {items}
            </div>
        );
    }
}