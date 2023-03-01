import React from 'react';
import { createPortal } from 'react-dom';
interface Props {
    children?: React.ReactNode;
}

const Modal: React.FC<Props> = ({ children }) => {
    return (
        <>
            {createPortal(
                <div
                    style={{
                        backgroundColor: 'rgb(0 0 0 / 50%)',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        zIndex: 999,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                        width: '100vw',
                    }}
                >
                    <div style={{ height: '80vh', width: '80vw' }}>
                        {children ?? <></>}
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};

export default Modal;
