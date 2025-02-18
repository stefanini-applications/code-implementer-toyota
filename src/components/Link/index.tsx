import React from 'react';

import { Tooltip } from 'antd';

import { FakeLink, StyledLink } from './styled';

interface ILinks {
    href?: string;
    children: any;
    onClick?: any;
    icon?: any;
    isDisabled?: boolean;
    toolTip?: string;
    style?: any;
    onMouseDown?: any;
    onAuxClick?: any;
    flex?: boolean;
    fakeLink?: boolean;
}

const Link: React.FC<ILinks> = ({
    href = '',
    children,
    onClick,
    icon,
    isDisabled = false,
    toolTip,
    style,
    onMouseDown,
    onAuxClick,
    flex = false,
    fakeLink = false,
}) => {
    return !fakeLink ? (
        <Tooltip title={toolTip}>
            <StyledLink flex={flex} onAuxClick={onAuxClick} onMouseDown={onMouseDown} isDisabled={isDisabled} onClick={onClick} to={isDisabled ? '#' : href || '#'} style={style}>
                {icon}{children}
            </StyledLink>
        </Tooltip>
    ) : (
        <FakeLink isDisabled={isDisabled} style={style} onClick={onClick} onAuxClick={onAuxClick} onMouseDown={onMouseDown}>
            {children}
        </FakeLink>
    );
}

export default Link;