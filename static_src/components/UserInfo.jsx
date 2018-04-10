export default class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
        console.log('user info created');
    }

    render() {
        console.log('user info rendered');
        return (
            <div className="user-info">
                <img src="" className="user-info-avatar"/>
                <p className="user-info-username">{this.state.username}</p>
            </div>
        );
    }
}
