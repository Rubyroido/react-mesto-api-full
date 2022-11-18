import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup(props) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onAddPlace({
            name,
            link
        })
    }
    
    return (
        <PopupWithForm
            name='form-photo'
            title='Новое место'
            saveButton='Создать'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit} >
            <input id='photo-name' type='text' name='name' className='popup__field' placeholder='Название' required
                minLength='2' maxLength='30' value={name} onChange={handleNameChange} />
            <span id='photo-name-error' className='popup__error'></span>
            <input id='photo-url' type='url' name='link' className='popup__field' placeholder='Ссылка на картинку' required value={link} onChange={handleLinkChange} />
            <span id='photo-url-error' className='popup__error'></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;