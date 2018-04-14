import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React from 'react';
import '../styles/comment.scss';
import { UserInfo } from './UserInfo';
import { setData, setBanner } from '../actions/commentActions';

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.data;
    }

    render() {
        const fish = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
        console.log(this.state.author);

        return (
            <div className="comment">
                <UserInfo username={ this.state.author.username || 'FIXME' } />
                <p className="comment-text">{this.state.text || fish}</p>
            </div>
        );
    }
}

class CommentBar extends React.Component {
    static defaultProps = {
        bannerShown: true,
        data: [],
    };

    render() {
        const items = this.props.data.map(el => <Comment data={ el } />);
        const content = this.props.bannerShown ? 'banner' : items;

        return (
            <div id="comment-bar">
                { content }
            </div>
        );
    }
}

const mapStateToProps = (store) => ({
    data: store.commentsReducer.commentsBar.data,
    bannerShown: store.commentsReducer.commentsBar.bannerShown,
});

const mapDispatchToProps = dispatch => bindActionCreators({ setData, setBanner }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CommentBar);
