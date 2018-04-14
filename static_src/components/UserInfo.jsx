import React from 'react';

export class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
    }

    render() {
        return (
            <div className="user-info">
                <img alt="avatar" src="" className="user-info-avatar" />
                <p className="user-info-username">{this.state.username}</p>
            </div>
        );
    }
}
