import styled from '@emotion/styled';
import React from 'react';
import { createPortal } from 'react-dom';
interface Props {
    handleSetShowModal: () => void;
    children?: React.ReactNode;
}

const CloseModal = styled.div({
    alignSelf: 'start',
    fontSize: '2rem',
    position: 'absolute',
    top: '25px',
    left: '25px',
    cursor: 'pointer',
});

const ModalContainer = styled.div({
    backgroundColor: 'rgb(0 0 0 / 80%)',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 999,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
});

const ModalWrapper = styled.div({
    height: '80vh',
    width: '80vw',
    borderRadius: '0.5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

const Modal: React.FC<Props> = ({ handleSetShowModal, children }) => {
    return (
        <>
            {createPortal(
                <ModalContainer>
                    <CloseModal
                        onClick={() => {
                            handleSetShowModal();
                        }}
                    >
                        x
                    </CloseModal>
                    <ModalWrapper>{children ?? <></>}</ModalWrapper>
                </ModalContainer>,
                document.body
            )}
        </>
    );
};

export default Modal;
