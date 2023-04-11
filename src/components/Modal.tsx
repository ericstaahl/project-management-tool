import styled from '@emotion/styled';
import React from 'react';
import { createPortal } from 'react-dom';
import ClearIcon from '@mui/icons-material/Clear';
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
    height: '100%',
    width: '100%',
    overflow: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

const ModalWrapper = styled.div({
    margin: 'auto',
    maxHeight: '100%',
    overflow: 'auto',
});

const Modal: React.FC<Props> = ({ handleSetShowModal, children }) => {
    return (
        <>
            {createPortal(
                <ModalContainer
                    onClick={() => {
                        handleSetShowModal();
                    }}
                >
                    <CloseModal
                        onClick={() => {
                            handleSetShowModal();
                        }}
                    >
                        <ClearIcon fontSize='medium' />
                    </CloseModal>
                    <ModalWrapper
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        {children ?? <></>}
                    </ModalWrapper>
                </ModalContainer>,
                document.body
            )}
        </>
    );
};

export default Modal;
