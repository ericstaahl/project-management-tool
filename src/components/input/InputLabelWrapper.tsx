import styled from '@emotion/styled';
import React from 'react';

const StyledWrapper = styled.div({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
});

const InputLabelWrapper = (
    props: React.HtmlHTMLAttributes<HTMLDivElement>
): JSX.Element => {
    return <StyledWrapper {...props} />;
};

export default InputLabelWrapper;
