import React from 'react';
import $ from 'jquery';
import { Col, Row } from 'react-flexbox-grid';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../styles/post_creation_from.scss';
import { setPostCreationFormImage, setPostCreationFormText } from '../actions/postCreationFormActions';

class ImageLoader extends React.Component {
    constructor(props) {
        super(props);
        this.imageLoaded = false;
        this.loadButton = (
            <div>
                <button className="image-loader-btn" onClick={ () => { $('#image-loader-input').click(); } }>+</button>
                <input
                    id="image-loader-input"
                    onChange={ () => { this.updateImage(); } }
                    type="file"
                    style={ { display: 'none' } }
                />
            </div>
        );
        this.updateImage.bind(this);
    }

    updateImage() {
        const image = $('#image-loader-input')[0].files;
        this.props.setPostCreationFormImage(image);
    }

    render() {
        content = this.imageLoaded ? (<p>image loaded</p>) : this.loadButton;
        return (
            <div className="image-loader">
                { content }
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ setPostCreationFormImage }, dispatch);
ImageLoader = connect(null, mapDispatchToProps)(ImageLoader);

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = $.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function getBase64(file, callback) {
    const reader = new FileReader();
    console.log(callback);
    reader.onloadend = function() {
        const base64data = window.btoa(reader.result);
        console.log('callback', callback);
        callback(base64data);
    };
    reader.readAsDataURL(file);
}

class PostCreationForm extends React.Component {
    constructor(props) {
        super(props);
        this.form = (
            <form
                encType="multipart/form-data"
                method="post"
                action="http://localhost:8000/api/posts/new/"
                style={ { display: 'none' } }
                id="hidden-form"
            >
                <input name="text" id="hidden-form-text-input" />
                <input type="file" name="image" id="hidden-form-image-input" />
                <input name="csrfmiddlewaretoken" value={ getCookie('csrftoken') } />
            </form>
        );
    }

    validateAndSend() {
        // no validation for now
        const url = 'http://localhost:8000/api/posts/new/';
        const cookie = getCookie('csrftoken');

        $('#hidden-form-text-input').text(this.props.text);
        $('#hidden-form-image-input')[0].files = this.props.image;
        $('#hidden-form').submit(function(e) {
            e.preventDefault();
        });
    }

    render() {
        return (
            <div className="post-creation-form">
                <Row>
                    <Col md={ 8 } className="post-creation-form-left">
                        <ImageLoader />
                    </Col>
                    <Col md={ 4 } className="post-creation-form-right">
                        <textarea
                            className="post-creation-form-textarea"
                            onChange={ () => {
                                this.props.setPostCreationFormText($('.post-creation-form-textarea').val());
                            } }
                        />
                        <button
                            className="post-creation-form-btn"
                            onClick={ this.validateAndSend.bind(this) }
                        >
                            Создать пост
                        </button>
                    </Col>
                </Row>
                { this.form }
            </div>
        );
    }
}


const mapStateToProps = store => ({
    image: store.postCreationFormReducer.image,
    text: store.postCreationFormReducer.text,
});

const mapPostDispatchToProps = dispatch => bindActionCreators({ setPostCreationFormText }, dispatch);

export default connect(mapStateToProps, mapPostDispatchToProps)(PostCreationForm);
