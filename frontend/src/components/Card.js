import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = props.card.owner === currentUser._id;

    const cardDeleteButtonClassName = (
        `table__button-delete ${isOwn ? '' : 'button-delete_hidden'}`
    );

    const isLiked = props.card.likes.some(i => i === currentUser._id);

    const cardLikeButtonClassName = (
        `table__button-like ${isLiked ? 'button-like_active' : ''}`
    );

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    return (
        <li className='table__cell'>
            <img src={props.card.link} alt={props.card.name} className='table__photo' onClick={handleClick} />
            <div className='table__photo-description'>
                <h2 className='table__photo-name'>{props.card.name}</h2>
                <div className='table__like-container'>
                    <button type='button' className={cardLikeButtonClassName} onClick={handleLikeClick} />
                    <p className='table__like-counter'>{props.card.likes.length}</p>
                </div>
            </div>
            <button type='button' className={cardDeleteButtonClassName} onClick={handleDeleteClick} />
        </li>
    )
}

export default Card;