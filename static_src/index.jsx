const USER_POST_CREATED = 0;
const USER_POST_EDITED = 1;
const USER_SUBSCRIBED = 2;
const USER_UNSUBSCRIBED = 3;

function BefriendEvent(event) {
    return (<div className="befriendEvent">
        <p>{event.friender} has subscribed to {event.friendee}</p>
    </div>);
}

function UnfriendEvent(event) {
    return (<div className="befriendEvent">
        <p>{event.unfriender} has unsubscribed from {event.unfriendee}</p>
    </div>);
}

function PostEvent(event) {
    return (<div className="befriendEvent">
        <p>{event.author} has posted a photo:</p>
        <img src={event.imageUrl}/>
    </div>);
}

function EditEvent(event) {
    return (<div className="befriendEvent">
        <p>{event.author} has edited their post:</p>
        <img src={event.imageUrl}/>
    </div>);
}


let functions = {};
functions[USER_UNSUBSCRIBED] = UnfriendEvent;
functions[USER_SUBSCRIBED] = BefriendEvent;
functions[USER_POST_EDITED] = EditEvent;
functions[USER_POST_CREATED] = PostEvent;

function FeedEvent(props) {
    const inside = functions[props.event.causeType](props.event);


    return (<div className="event" style={{border: "1px solid black"}}>
        {inside}
        <p>at {props.event.created_at}</p>
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
            <h1>News feed</h1>
            <div className="feed-list">
                {items}
            </div>
        </div>);
    }
}


const feed = <MakeFeed items={[]}/>;

console.log(feed);

ReactDOM.render(feed, document.getElementById('root'));
