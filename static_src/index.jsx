import { Grid, Row, Col } from 'react-flexbox-grid';
import './styles/feed.scss';
import {UserInfo} from './components/UserInfo';
import CommentBar from './components/CommentBar';
import {initStore} from './utils/store.js';
import {connect, Provider} from "react-redux";
import {startLoading, stopLoading} from "./actions/loadingActions";
import {fetchData, FETCH_DATA} from "./actions/feedActions";
import {bindActionCreators} from "redux";


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
    const res = (
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
    console.log('post_event:', res);
    return res;
}

function EditEvent(event) {
    return (<div className="befriendEvent">
        <p>{event.author.username} has edited their post:</p>
        <img src={event.cause.image}/>
    </div>);
}


let eventCreatorFunctions = {};
eventCreatorFunctions[USER_UNSUBSCRIBED] = UnfriendEvent;
eventCreatorFunctions[USER_SUBSCRIBED] = BefriendEvent;
eventCreatorFunctions[USER_POST_EDITED] = EditEvent;
eventCreatorFunctions[USER_POST_CREATED] = PostEvent;

function FeedEvent(props) {
    const inside = eventCreatorFunctions[props.event.causeType](props.event);
    console.log('inside:', inside);

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

        $.getJSON( address, (data) => {
            this.props.fetchData(data);
        });

    }

    render() {
        const items = this.props.data.map(function(curr){
            const res = <FeedEvent event={curr} key={curr.id}/>;
            console.log('res:',res);
            return res;
        });

        console.log(items);

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
                        <CommentBar/>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        data: store.feedReducer.feed.data,
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({fetchData}, dispatch);
};

MakeFeed = connect(mapStateToProps, mapDispatchToProps)(MakeFeed);


const app = (
    <Provider store={initStore()}>
        <Feed text="halo Welt"/>
    </Provider>
);

console.log(ReactDOM.render);

ReactDOM.render(app, document.getElementById('root'));
