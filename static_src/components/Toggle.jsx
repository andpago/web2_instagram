import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleOff, toggleOn } from '../actions/ToggleActions';
import '../styles/ToggleStyles.scss';

class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        if (this.props.isOn) {
            this.props.toggleOff();
        } else {
            this.props.toggleOn();
        }
    }

    render() {
        const className = this.props.isOn ? 'toggle-on' : 'toggle-off';

        return (
            <button className={ className } onClick={ this.toggle }> Click me! </button>
        );
    }
}

const mapStateToProps = store => ({
    isOn: store.toggleReducer.on,
});

const mapDispatchToProps = dispatch => bindActionCreators({ toggleOn, toggleOff }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Toggle);
