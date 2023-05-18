import './ModalEditComment.css';

const ModalEditComment = ({closeModal, component}) => {

    return(
        <div id="modal-background" onClick={closeModal}>
            <div id="modal-foreground" onClick={e => e.stopPropagation()}>
                {component}
            </div>
        </div>
    );
};

export default ModalEditComment;