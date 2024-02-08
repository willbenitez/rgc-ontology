import Modal from 'react-bootstrap/Modal';

const GenericModal = ({
    show,
    title,
    handleClose,
    children,
}: {
    show: boolean;
    title: string;
    handleClose: () => void;
    children: JSX.Element | string;
}): JSX.Element => {
    return (
        <Modal
            style={{
                color: '#495057',
            }}
            show={show}
            onHide={handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
        </Modal>
    );
};

export default GenericModal;
