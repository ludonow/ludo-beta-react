import React, { Component } from 'react';
import DropZone from 'react-dropzone';
import styled from 'styled-components';

import Button from '../../components/Button';
import cameraIconSrc from '../../../images/active/camera-icon.png';
import axios from '../../axios-config';

const DropZoneWrapper = styled.div`
    cursor: pointer;
`;

const FixedSizedIcon = styled.img`
    height: 6vw;
    width: 8vw;
`;

const IconWrapper = styled.div`
    margin-bottom: 2vw;
    text-align: center;
`;

const ImageZoneWrapper = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    width: 35vw;
`;

const PreviewImage = styled.img`
    height: ${props => props.resizedHeight ? props.resizedHeight + 'px' : '320px'};
    margin: 0 auto 15px auto;
    width: ${props => props.resizedWidth ? props.resizedWidth + 'px' : '250px'};
`;

const PreviewWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const MAX_HEIGHT = 200;
const MAX_WIDTH = 250;

class ImageUploadAndPreview extends Component {
    constructor(props) {
        super(props);
        this.handleDrop = this.handleDrop.bind(this);
        // this.handleImageUpload = this.handleImageUpload.bind(this);
        this.handleImagePreview = this.handleImagePreview.bind(this);
        this.resizePreviewImage = this.resizePreviewImage.bind(this);
    }

    handleDrop(files) {
        if (files.length > 1) {
            window.alert('一次只能上傳一張圖片');
        } else if (files.length == 1) {
            const image = files[0];
            if (image.size >= 1*1024*1024) {
                window.alert('你上傳的圖片已超過上限 1 MB！');
            } else {
                // this.handleImageUpload(image);
                this.props.handleImageChange(image);
                const imageUrl = image.preview;
                this.handleImagePreview(imageUrl);
            }
        }
    }

    /**
     * @TODO: 等到後端資料庫檔案管理完成後，圖片上傳機制改為選取圖片完後立即上傳資料庫
     */
    // handleImageUpload(image) {
    //     const imagePost = new FormData();
    //     imagePost.append('file', image);
    //     axios.post('/apis/report-image', imagePost)
    //     .then(response => {
    //         if (response.data.status === '200') {
    //             this.props.setImageLocation(response.data.location);
    //         } else {
    //             const errorMessage = 'ImageUploadAndPreview handleImageDrop response is not OK. The response is from server: ' + response;
    //             throw new Error(errorMessage);
    //         }
    //     })
    //     .catch(error => {
    //         console.error(error);
    //         if (window.confirm('上傳圖片時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
    //             window.open("https://www.facebook.com/messages/t/ludonow");
    //         }
    //     });
    // }

    handleImagePreview(imageUrl) {
        const image = new Image();
        image.src = imageUrl;
        image.onload = () => {
            this.resizePreviewImage(image, MAX_WIDTH, MAX_HEIGHT, 0.7);
        };
    }

    resizePreviewImage(image, maxWidth, maxHeight, quality) {
        const height = image.height;
        const width = image.width;

        let resizedHeight = height;
        let resizedWidth = width;
    
        if (width > height) {
            if (width > maxWidth) {
                resizedHeight = Math.round(height * maxWidth / width);
                resizedWidth = maxWidth;
            }
        } else {
            if (height > maxHeight) {
                resizedWidth = Math.round(width * maxHeight / height);
                resizedHeight = maxHeight;
            }
        }
        this.props.handleImageResize(resizedWidth, resizedHeight);
    }

    render() {
        const {
            images,
            resizedHeight,
            resizedWidth
        } = this.props;

        if (images.length === 0) {
            return (
                <ImageZoneWrapper>
                    <DropZoneWrapper>
                        <DropZone
                            accept="image/*"
                            multiple={false}
                            onDrop={this.handleDrop}
                            style={{}}
                        >
                            <IconWrapper>
                                <FixedSizedIcon
                                    src={cameraIconSrc}
                                    title="上傳圖片"
                                />
                            </IconWrapper>
                            <Button
                                backgroundColor="#FF6E6E"
                                fontSize="0.7rem"
                                label="上傳圖片"
                            />
                        </DropZone>
                    </DropZoneWrapper>
                </ImageZoneWrapper>
            );
        } else if (images.length === 1) {
            const userSelectedImage = images[0];
            return (
                <ImageZoneWrapper>
                    <PreviewWrapper>
                        <PreviewImage
                            onClick={this.handleImageEnlargeOpen}
                            resizedHeight={resizedHeight}
                            resizedWidth={resizedWidth}
                            src={userSelectedImage.preview}
                        />
                            <DropZone
                                accept="image/jpeg, image/png"
                                maxSize={100*1024*1024}
                                multiple={false}
                                onDrop={this.handleDrop}
                                style={{}}
                            >
                                <Button
                                    backgroundColor="#FF6E6E"
                                    fontSize="0.7rem"
                                    label="重新上傳"
                                />
                            </DropZone>
                    </PreviewWrapper>
                </ImageZoneWrapper>
            );
        }
    }
}

export default ImageUploadAndPreview;
