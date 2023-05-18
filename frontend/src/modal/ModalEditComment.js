import './ModalEditComment.css';

const ModalEditComment = ({closeModal, component}) => {

    return(
        <div id="modal-background-update" onClick={closeModal}>
            <div id="modal-foreground-update" onClick={e => e.stopPropagation()}>
                {component}
            </div>
        </div>
    );
};

export default ModalEditComment;