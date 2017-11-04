import React, { Component } from 'react';
import DropZone from 'react-dropzone';
import Lightbox from 'react-image-lightbox';

import axios from '../../axios-config';

export default class MobileImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            isImageUploaded: false,
            isLightBoxOpen: false
        };
        this.handleImageDrop = this.handleImageDrop.bind(this);
        this.handleImageRemove = this.handleImageRemove.bind(this);
        this.handleLightboxClose = this.handleLightboxClose.bind(this);
        this.handleLightboxOpen = this.handleLightboxOpen.bind(this);
    }

    handleImageDrop(files) {
        if (files.length === 1) {
            this.setState({
                files,
                isImageUploaded: true
            });
            const imgPost = new FormData();
            imgPost.append('file', files[0]);
            axios.post('/apis/report-image', imgPost)
            .then((response) => {
                if (response.data.status == '200') {
                    this.props.setImageLocation(response.data.location);
                } else {
                    console.error('image upload message from server: ', response.data.message);
                    console.error('image upload error from server: ', response.data.err);
                }
            })
            .catch((error) => {
                console.error('image upload error', error);
            });
        } else if (files.length > 1) {
            this.setState({
                files: []
            });
            window.alert('一次只能上傳一張圖片');
        }
    }

    handleImageRemove(event) {
        event.preventDefault();
        this.setState({
            files: [],
            isImageUploaded: false
        });
    }

    handleLightboxClose() {
        this.setState({
            isLightBoxOpen: false
        });
    }

    handleLightboxOpen() {
        this.setState({
            isLightBoxOpen: true
        });
    }

    /* components/mobile-report-form.scss */
    render() {
        const {
            files,
            isImageUploaded,
            isLightBoxOpen
        } = this.state;
        return (
            <div>
                <DropZone
                    accept={"image/*"}
                    className="mobile-report-form-image-dropzone"
                    maxSize={10*1024*1024}
                    onClick={this.handleImageDrop}
                    onDrop={this.handleImageDrop}
                >
                    選擇上傳圖片 (圖片最大限制: 10MB)
                    {
                        isImageUploaded ?
                            <div className="mobile-report-form-status">
                                <i className="fa fa-check" aria-hidden="true"></i>
                            </div>
                        :
                            null
                    }
                </DropZone>
                {
                    isImageUploaded ?
                        <div className="mobile-preview">
                            {/* components/report-form.scss */}
                            <div className="upload-preview">
                                <div className="upload-preview__image-container">
                                    <img
                                        className="upload-preview__image"
                                        onClick={this.handleLightboxOpen}
                                        src={files[0].preview}
                                    />
                                    <div className="upload-preview-instruction-container">
                                        <button
                                            className="upload-preview-instruction__remove"
                                            onClick={this.handleImageRemove}
                                            value="0"
                                        >
                                            ×
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    : null
                }
                {
                    isLightBoxOpen ?
                        <Lightbox
                            mainSrc={files[0].preview}
                            onCloseRequest={this.handleLightboxClose}
                        />
                    : null
                }
            </div>
        );
    }
}