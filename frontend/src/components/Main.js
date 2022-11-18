import React from 'react';
import Card from './Card.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <div className='main'>
            <section className='profile'>
                <div className='profile__card'>
                    <div className='profile__avatar-container'>
                        <button type='button' className='profile__avatar-change' onClick={props.onEditAvatar} />
                        <img alt='аватар' src={currentUser.avatar} className='profile__avatar' />
                    </div>
                    <div className='profile__info'>
                        <h1 className='profile__name'>{currentUser.name}</h1>
                        <button type='button' className='profile__button-edit' onClick={props.onEditProfile} />
                        <p className='profile__description'>{currentUser.about}</p>
                    </div>
                </div>
                <button type='button' className='profile__button-add' onClick={props.onAddPlace} />
            </section>

            <section className='places'>
                <ul className='table'>
                    {props.cards.map((card) => (
                    <Card card={card} 
                    key={card._id} 
                    onCardClick={props.onCardClick} 
                    onCardLike={props.onCardLike} 
                    onCardDelete={props.onCardDelete} />)
                    )}
                </ul>
            </section>
        </div>
    )
}

export default Main;