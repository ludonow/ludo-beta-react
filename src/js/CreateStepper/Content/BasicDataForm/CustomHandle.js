import React from 'react';
import styled from 'styled-components';
import RcSlider from 'rc-slider';
import RcTooltip from 'rc-tooltip';

import sliderHandleIcon from '../../../../images/slider-handle.png'

const { Handle } = RcSlider;

const HandleIconWrapper = styled.div`
    left: -130%;
    position: relative;
    top: -450%;

    img {
        width: 35px;
    }
`;

const CustomHandle = ({
    dragging,
    index,
    value,
    ...restProps,
}) =>(
    <RcTooltip
        defaultVisible={true}
        key={`custom-handle-tooltip-${index}`}
        overlay={`${value}天`}
        placement="top"
        prefixCls="custom-rc-slider-tooltip"
        visible={true}
    >
        <Handle
            value={value}
            {...restProps}
        >
            <HandleIconWrapper>
                <img
                    src={sliderHandleIcon}
                />
            </HandleIconWrapper>
        </Handle>
    </RcTooltip>
);

export default CustomHandle;
