import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup(props) {
    const inputRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: inputRef.current.value,
        });
    }

    return (
        <PopupWithForm
            name='avatar'
            title='Обновить аватар'
            saveButton='Сохранить'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}>
            <input id='avatar-url' type='url' name='link' className='popup__field' placeholder='Ссылка на картинку' required ref={inputRef} />
            <span id='avatar-url-error' className='popup__error'></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;