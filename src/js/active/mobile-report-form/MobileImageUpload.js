import React, { Component } from 'react';
import styled from 'styled-components';
import DropZone from 'react-dropzone';
import Lightbox from 'react-image-lightbox';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import axios from '../../axios-config';

const ImageLoadingWrapper = styled.div`
    margin-left: 23%;
    margin-top: 30px;
`;

// override material ui style
const RefreshIndicatorStyle = {
    position: 'relative'
};

export default class MobileImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            isImageUploaded: false,
            isImageUploading: false,
            isLightBoxOpen: false
        };
        this.handleImageDrop = this.handleImageDrop.bind(this);
        this.handleImageRemove = this.handleImageRemove.bind(this);
        this.handleLightboxClose = this.handleLightboxClose.bind(this);
        this.handleLightboxOpen = this.handleLightboxOpen.bind(this);
    }

    handleImageDrop(files) {
        if (files.length > 1) {
            this.setState({
                files: []
            });
            window.alert('一次只能上傳一張圖片');
        } else if (files.length === 1) {
            const image = files[0];
            if (image.size > 1*1024*1024) {
                window.alert('你上傳的圖片已超過上限 1 MB！');
            } else {
                this.setState({
                    files,
                    isImageUploading: true
                });
                const imgPost = new FormData();
                imgPost.append('file', files[0]);
                axios.post('/apis/report-image', imgPost)
                .then((response) => {
                    if (response.data.status == '200') {
                        this.setState({
                            isImageUploaded: true,
                            isImageUploading: false
                        });
                        this.props.setImageLocation(response.data.location);
                    } else {
                        console.error('image upload message from server: ', response.data.message);
                        console.error('image upload error from server: ', response.data.err);
                    }
                })
                .catch((error) => {
                    console.error('image upload error', error);
                });
            }
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
            isImageUploading,
            isLightBoxOpen
        } = this.state;
        return (
            <div>
                <DropZone
                    accept={"image/*"}
                    className="mobile-report-form-image-dropzone"
                    onClick={this.handleImageDrop}
                    onDrop={this.handleImageDrop}
                >
                    選擇上傳圖片 (圖片最大限制: 1MB)
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
                    isImageUploading ?
                        <ImageLoadingWrapper>
                            <RefreshIndicator
                                left={70}
                                loadingColor="#FF9800"
                                size={50}
                                status="loading"
                                style={RefreshIndicatorStyle}
                                top={0}
                            />
                        </ImageLoadingWrapper>
                    : null
                }
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