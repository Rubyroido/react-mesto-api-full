import React from 'react';

function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <form name={props.name} className='popup__container' onSubmit={props.onSubmit}>
                <h2 className='popup__container-name'>{props.title}</h2>
                <button type='button' className='popup__button-close' onClick={props.onClose} />
                {props.children}
                <button type='submit' className='popup__button-save'>{props.saveButton}</button>
            </form>
        </div>
    )
}

export default PopupWithForm;