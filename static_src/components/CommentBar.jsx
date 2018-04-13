import { Grid, Row, Col } from 'react-flexbox-grid';
import '../styles/comment.scss'
import { UserInfo } from './UserInfo'
import { connect } from 'react-redux';
import {START_LOADING, startLoading, stopLoading} from "../actions/loadingActions";
import {bindActionCreators} from "redux";

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

class CommentBar extends React.Component {
    static defaultProps = {
        loading: false,
        text: "default text"
    };

    constructor(props) {
        super(props);
        console.log(this);
    }

    componentDidMount() {
        this.props.startLoading();
        setTimeout(this.props.stopLoading, 2000);
    }

    render() {
        // const items = this.state.items.map(function(commentData){
        //     return <Comment data={commentData}/>;
        // });

        return (
            <div id="comment-bar">
                <p> {this.props.text} </p>
                <p> {this.props.loading + ''} </p>
                {/*{items}*/}
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
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({startLoading, stopLoading}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentBar);