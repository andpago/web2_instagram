import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React from 'react';
import '../styles/comment.scss';
import { UserInfo } from './UserInfo';
import { startLoading, stopLoading } from '../actions/loadingActions';

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.data;
    }

    render() {
        const fish = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

        return (
            <div className="comment">
                <UserInfo username={ this.state.username || 'FIXME' } />
                <p className="comment-text">{this.state.text || fish}</p>
            </div>
        );
    }
}

class CommentBar extends React.Component {
    static defaultProps = {
        loading: false,
        text: 'default text',
    };

    componentDidMount() {
        this.props.startLoading();
        setTimeout(this.props.stopLoading, 2000);
    }

    render() {
        return (
            <div id="comment-bar">
                <p> {this.props.text} </p>
                <p> {this.props.loading + ''} </p>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        text: store.loadingReducer.commentsBar.text,
        loading: store.loadingReducer.commentsBar.isLoading,
    };
};
const mapDispatchToProps = dispatch => bindActionCreators({ startLoading, stopLoading }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CommentBar);
