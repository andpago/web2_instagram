import { Grid, Row, Col } from 'react-flexbox-grid';
import './styles/feed.scss';
import UserInfo from './components/UserInfo';
import CommentBar from './components/CommentBar';


const USER_POST_CREATED = 0;
const USER_POST_EDITED = 1;
const USER_SUBSCRIBED = 2;
const USER_UNSUBSCRIBED = 3;


function LikeCommentButtons(props) {
    return (
        <div className="like-comment-buttons">
            <button>Like</button>
            <button>Show comments</button>
        </div>
    );
}

function BefriendEvent(event) {
    return (<div className="befriendEvent">
        <p>{event.author.username} has subscribed to {event.cause.username}</p>
    </div>);
}

function UnfriendEvent(event) {
    return (<div className="befriendEvent">
        <p>{event.author.username} has unsubscribed from {event.cause.username}</p>
    </div>);
}


function PostEvent(event) {
    // return (<div className="befriendEvent">
    //     <h3 className="caption">{event.cause.caption}</h3>
    //     <img src={event.cause.image}/>
    // </div>);

    return (
        <Row className="postEvent">
            <Col md={8}>
                <img src={event.cause.image} className="post-image"/>
            </Col>
            <Col md={4}>
                <UserInfo username={event.author.username}/>
                <p className="post-text">{event.cause.caption}</p>
                <LikeCommentButtons/>
            </Col>
        </Row>
    );
}

function EditEvent(event) {
    return (<div className="befriendEvent">
        <p>{event.author.username} has edited their post:</p>
        <img src={event.cause.image}/>
    </div>);
}


let functions = {};
functions[USER_UNSUBSCRIBED] = UnfriendEvent;
functions[USER_SUBSCRIBED] = BefriendEvent;
functions[USER_POST_EDITED] = EditEvent;
functions[USER_POST_CREATED] = PostEvent;

function FeedEvent(props) {
    const inside = functions[props.event.causeType](props.event);


    return (
    <div className="event">
        {inside}
    </div>);
}

class MakeFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
    }

    componentDidMount() {
        this.loadFeed();
    }

    loadFeed() {
        const address = "http://localhost:8000/api/events/?format=json";
        const self = this;

        $.getJSON( address, function( data ) {
            self.setState({items: data});
        });

    }

    render() {
        const items = this.state.items.map(function(curr){
            return <FeedEvent event={curr}/>;
        });

        return (<div>
            <div className="feed-list">
                {items}
            </div>
        </div>);
    }
}


class Feed extends React.Component {
    render() {
        return (
            <Grid fluid>
                <Row>
                    <Col md={2} id="leftCol">
                        left col
                    </Col>
                    <Col md={7} id="middleCol">
                        <MakeFeed items={[]}/>
                    </Col>
                    <Col md={3} id="rightCol">
                        <CommentBar items={[{username: 'anon', text: 'comment text'},{},{}]}/>
                    </Col>
                </Row>
            </Grid>
        );
    }
}


const app = <Feed text="halo Welt"/>;


ReactDOM.render(app, document.getElementById('root'));
