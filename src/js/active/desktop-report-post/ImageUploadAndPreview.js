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
        this.resizePreviewImage = this.resizePreviewImage.bind(this);
    }

    handleDrop(images) {
        const reader = new FileReader();
        const image = images[0];
        reader.readAsDataURL(image);
        reader.onload = (event) => {
            const dataUrl = event.target.result;
            const image = new Image();
            image.src = dataUrl;
            image.onload = () => {
                this.resizePreviewImage(image, MAX_WIDTH, MAX_HEIGHT, 0.7);
                this.props.handleImageChange(images, dataUrl);
            };
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
            imagePreviewUrl,
            images,
            resizedHeight,
            resizedWidth
        } = this.props;
        return (
            <ImageZoneWrapper>
                { !imagePreviewUrl ?
                    <DropZoneWrapper>
                        <DropZone
                            accept="image/jpeg, image/png"
                            maxSize={100*1024*1024}
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
                :
                    <PreviewWrapper>
                        {
                            images.map(
                                image =>
                                <PreviewImage
                                    resizedHeight={resizedHeight}
                                    resizedWidth={resizedWidth}
                                    src={imagePreviewUrl}
                                />
                            )
                        }
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
                }
            </ImageZoneWrapper>
        );
    }
}

export default ImageUploadAndPreview;
