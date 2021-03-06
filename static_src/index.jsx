import { connect, Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import './styles/feed.scss';
import { UserInfo } from './components/UserInfo';
import CommentBar from './components/CommentBar';
import { initStore } from './utils/store';
import { fetchData } from './actions/feedActions';
import { setData } from './actions/likeCommentActions';
import ScrollDetector from './components/ScrollDetector';
import PostCreationForm, { getCookie } from './components/PostCreationForm';


const USER_POST_CREATED = 0;
const USER_POST_EDITED = 1;
const USER_SUBSCRIBED = 2;
const USER_UNSUBSCRIBED = 3;


class LikeCommentButtons extends React.Component {
    loadComments() {
        const address = 'http://localhost:8000/api/posts/' + this.props.object_id + '/comments/?format=json';

        $.getJSON(address, (data) => {
            this.props.setData(data);
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            likesCount: props.object.likes_count,
            doesLike: false,
        };
    }

    toggleLike() {
        const url = 'http://localhost:8000/api/posts/' + this.props.object_id + '/toggle_like/';
        const data = {
            csrfmiddlewaretoken: getCookie('csrftoken'),
        };
        const onSuccess = (val) => {
            console.log(val.likes_count);
            this.setState({
                likesCount: val.likes_count,
                doesLike: val.does_like,
            });
        };


        $.post(url, data, onSuccess);
    }

    render() {
        const colorClass = this.state.doesLike ? 'red' : 'green';
        return (
            <div className="like-comment-buttons">
                <button
                    className={ colorClass }
                    onClick={ this.toggleLike.bind(this) }
                >
                    Like ({ this.state.likesCount })
                </button>
                <button onClick={ this.loadComments.bind(this) } >Show comments </button>
            </div>
        );
    }
}

LikeCommentButtons = connect(null, dispatch => bindActionCreators({ setData }, dispatch))(LikeCommentButtons);

function BefriendEvent(event) {
    return (
        <Row className="postEvent">
            <Col md={ 4 } className="centered">
                <div>
                    <img alt="avatar" src="" className="avatar-large" />
                    <p className="user-info-username">{event.author.username}</p>
                </div>
            </Col>
            <Col md={ 2 } className="centered">
                =>
            </Col>
            <Col md={ 4 } className="centered">
                <div>
                    <img alt="avatar" src="" className="avatar-large" />
                    <p className="user-info-username">{event.cause.username}</p>
                </div>
            </Col>
        </Row>
    );
}

function UnfriendEvent(event) {
    return (
        <div className="befriendEvent">
            <p>{event.author.username} has unsubscribed from {event.cause.username}</p>
        </div>
    );
}


function PostEvent(event) {
    const res = (
        <Row className="postEvent">
            <Col md={ 8 }>
                <img alt="" src={ event.cause.image } className="post-image" />
            </Col>
            <Col md={ 4 }>
                <UserInfo username={ event.author.username } />
                <p className="post-text">{event.cause.caption}</p>
                <LikeCommentButtons object={ event.cause } object_id={ event.object_id } />
            </Col>
        </Row>
    );
    return res;
}

function EditEvent(event) {
    return (<div className="befriendEvent">
        <p>{event.author.username} has edited their post:</p>
        <img src={ event.cause.image } />
    </div>);
}


const eventCreatorFunctions = {};
eventCreatorFunctions[USER_UNSUBSCRIBED] = UnfriendEvent;
eventCreatorFunctions[USER_SUBSCRIBED] = BefriendEvent;
eventCreatorFunctions[USER_POST_EDITED] = EditEvent;
eventCreatorFunctions[USER_POST_CREATED] = PostEvent;

function FeedEvent(props) {
    const inside = eventCreatorFunctions[props.event.causeType](props.event);

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
        const address = 'http://localhost:8000/api/events/?format=json';

        $.getJSON(address, (data) => {
            this.props.fetchData(data);
        });
    }

    render() {
        const items = this.props.data.map((curr) => {
            const res = <FeedEvent event={ curr } key={ curr.id } />;
            return res;
        });

        return (
            <div>
                <div className="feed-list">
                    {items}
                </div>
            </div>
        );
    }
}


class Feed extends React.Component {
    render() {
        return (
            <Grid fluid>
                <Row>
                    <Col md={ 2 } id="leftCol">
                        left col
                    </Col>
                    <Col md={ 7 } id="middleCol">
                        <PostCreationForm />
                        <MakeFeed items={ [] } />
                    </Col>
                    <Col md={ 3 } id="rightCol">
                        <CommentBar />
                    </Col>
                </Row>
                <ScrollDetector />
            </Grid>
        );
    }
}

const mapStateToProps = store => ({
    data: store.feedReducer.feed.data,
});
const mapDispatchToProps = dispatch => bindActionCreators({ fetchData }, dispatch);

MakeFeed = connect(mapStateToProps, mapDispatchToProps)(MakeFeed);

const history = createHistory();

const app = (
    <Provider store={ initStore([routerMiddleware(history)]) }>
        <ConnectedRouter history={ history }>
            <Feed />
        </ConnectedRouter>
    </Provider>);


ReactDOM.render(app, document.getElementById('root'));
