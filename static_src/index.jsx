function FeedEvent(props) {
    return (<div className="event" style={{border: "1px solid black"}}>
        Something happened...
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
