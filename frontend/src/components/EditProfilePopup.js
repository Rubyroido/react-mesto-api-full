import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name='form-user'
            title='Редактировать профиль'
            saveButton='Сохранить'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit} >
            <input id='user-name' type='text' name='name' className='popup__field popup__field_type_name' placeholder='Имя'
                required minLength='2' maxLength='40' value={name || ''} onChange={handleNameChange} />
            <span id='user-name-error' className='popup__error'></span>
            <input id='user-description' type='text' name='description' className='popup__field popup__field_type_description'
                placeholder='О себе' required minLength='2' maxLength='200' value={description || ''} onChange={handleDescriptionChange} />
            <span id='user-description-error' className='popup__error'></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;