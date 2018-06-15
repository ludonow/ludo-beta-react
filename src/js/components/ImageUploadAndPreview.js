import React, { Component } from 'react';
import styled from 'styled-components';
import DropZone from 'react-dropzone';
import LightBox from 'react-image-lightbox';

import cameraIconSrc from '../../images/camera-icon.png';
import { withMaybe } from '../components/higher-order-components/index';
import axios from '../axios-config';
import Button from './Button';

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

    @media (min-width: 769px) {
        width: 35vw;
    }
`;

const PreviewImage = styled.img`
    cursor: zoom-in;
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

const reactModalStyle = {
    overlay: {
        zIndex: 2000
    }
};

const isImageLightBoxClose = (props) => !props.isImageLightBoxOpen;
const ImageLightBox = withMaybe(isImageLightBoxClose)(LightBox);

class ImageUploadAndPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enlargeImageLocation: '',
            isImageLightBoxOpen: false,
        };
        this.handleDrop = this.handleDrop.bind(this);
        // this.handleImageUpload = this.handleImageUpload.bind(this);
        this.handleImageLightBoxClose = this.handleImageLightBoxClose.bind(this);
        this.handleImageLightBoxOpen = this.handleImageLightBoxOpen.bind(this);
        this.handleImagePreview = this.handleImagePreview.bind(this);
        this.resizePreviewImage = this.resizePreviewImage.bind(this);
    }

    componentDidMount() {
        if (this.props.imageLocation) {
            this.handleImagePreview(this.props.imageLocation);
        }
    }

    handleDrop(files) {
        if (files.length > 1) {
            window.alert('一次只能上傳一張圖片');
        } else if (files.length == 1) {
            const image = files[0];
            if (image.size >= 1*1024*1024) {
                window.alert('您上傳的圖片已超過上限 1 MB！請改用messenger bot 上傳回報');
                
                // const reader = new FileReader();
                // const tempImage = new Image();

                // reader.onload = function(e) {
                //     tempImage.src = e.target.result;
                // };
                // reader.readAsDataURL(image);

                // console.log("old img"+image);

                // tempImage.onload = () => {
                //     const canvas = document.createElement('canvas'); 
                //     const context = canvas.getContext('2d'); 
                //     canvas.width = 400; 
                //     canvas.height = 300; 
                //     context.drawImage(tempImage,0,0,400,300);
                //     const newUrl = canvas.toDataURL();   
                //     const newImage = new Image();
                //     newImage.src = newUrl;
                //     this.props.handleImageChange(newImage);
                //     this.handleImagePreview(newUrl);
                // };
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

    handleImageLightBoxClose() {
        this.setState({
            isImageLightBoxOpen: false
        });
    }

    handleImageLightBoxOpen(event) {
        this.setState({
            enlargeImageLocation: event.currentTarget.src,
            isImageLightBoxOpen: true
        });
    }

    handleImagePreview(imageUrl) {
        const image = new Image();
        image.src = imageUrl;
        image.onload = () => {
            this.resizePreviewImage(image, MAX_WIDTH, MAX_HEIGHT, 0.7);
            console.log("preview");
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
            imageLocation,
            images,
            resizedHeight,
            resizedWidth,
        } = this.props;

        const {
            enlargeImageLocation,
            isImageLightBoxOpen,
        } = this.state;

        if (images.length === 0) {
            if (imageLocation) {
                return (
                    <ImageZoneWrapper>
                        <PreviewWrapper>
                            <PreviewImage
                                onClick={this.handleImageLightBoxOpen}
                                resizedHeight={resizedHeight}
                                resizedWidth={resizedWidth}
                                src={imageLocation}
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
                        <ImageLightBox
                            isImageLightBoxOpen={isImageLightBoxOpen}
                            mainSrc={enlargeImageLocation}
                            onCloseRequest={this.handleImageLightBoxClose}
                            reactModalStyle={reactModalStyle}
                        />
                    </ImageZoneWrapper>
                )
            } else {
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
            }
        } else if (images.length === 1) {
            const userSelectedImage = images[0];
            return (
                <ImageZoneWrapper>
                    <PreviewWrapper>
                        <PreviewImage
                            onClick={this.handleImageLightBoxOpen}
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
                    <ImageLightBox
                        isImageLightBoxOpen={isImageLightBoxOpen}
                        mainSrc={enlargeImageLocation}
                        onCloseRequest={this.handleImageLightBoxClose}
                        reactModalStyle={reactModalStyle}
                    />
                </ImageZoneWrapper>
            );
        }
    }
}

export default ImageUploadAndPreview;
