import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { scrollAction } from '../actions/scroll';

const SENSITIVITY = 200; // px;

class ScrollDetector extends React.Component {

    constructor(props) {
        super(props);
        this.yPos = 0;
        this.active = false;
    }

    componentDidMount() {
        window.onclick = () => {
            this.yPos = window.pageYOffset;
            this.active = true;
        };

        window.onscroll = () => {
            if ((Math.abs(this.yPos - window.pageYOffset) > SENSITIVITY) && this.active) {
                this.props.scrollAction();
                this.active = false;
            }
        };
    }

    render() {
        return null;
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ scrollAction }, dispatch);
export default connect(null, mapDispatchToProps)(ScrollDetector);
