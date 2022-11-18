import React from 'react';
import successPic from '../images/success.svg';
import failPic from '../images/fail.svg';

function InfoToolTip(props) {

    return (
        <div className={`popup  popup_type_info ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className='popup__container'>
                <img className='popup__image' src={props.state ? successPic : failPic} />
                <p className='popup__message'>
                    {props.state ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
                </p>
                <button type='button' className='popup__button-close' onClick={props.onClose} />
            </div>
        </div>
    )
}

export default InfoToolTip;