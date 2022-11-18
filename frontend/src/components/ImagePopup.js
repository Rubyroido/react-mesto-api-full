import React from 'react';

function ImagePopup(props) {

    return (
        <div className={`popup popup_type_photo ${props.card ? 'popup_opened' : ''}`}>
            <div className='popup__photo-container'>
                <img src={props.card ? props.card.link : ''} alt='фотография' className='popup__photo' />
                <p className='popup__photo-name'>{props.card ? props.card.name : ''}</p>
                <button type='button' className='popup__button-close popup__button-close_type-photo-card' onClick={props.onClose} />
            </div>
        </div>
    )
}

export default ImagePopup;
