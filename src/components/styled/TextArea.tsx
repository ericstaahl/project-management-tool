import React, { forwardRef } from 'react';
import styled from '@emotion/styled';

const StyledTextArea = styled.textarea({
    padding: '0.3rem',
    fontFamily: 'inherit',
    border: '0.1rem solid #f5f5f5',
    borderRadius: '0.2rem',
});
interface Props extends React.ComponentProps<'textarea'> {}

const TextArea = forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
    return <StyledTextArea {...props} ref={ref} />;
});

TextArea.displayName = 'TextArea';

export default TextArea;
