import React from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const resetForm = () => {
        setEmail('');
        setPassword('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister( password, email );
        // resetForm();
    }

    return (
        <div className="register entry">
            <h2 className='entry__name'>Регистрация</h2>
            <form className='entry__form' onSubmit={handleSubmit}>
                <div className='entry__container'>
                    <input id='register-email' type='email' name='user-email' className='entry__input' placeholder='Email' required
                        value={email} onChange={({ target }) => setEmail(target.value)} />
                    <input id='register-password' type='password' name='user-password' className='entry__input' placeholder='Пароль' required
                        value={password} onChange={({ target }) => setPassword(target.value)} />
                </div>
                <button type='submit' className='entry__button'>Зарегистрироваться</button>
            </form>
            <p className='entry__text'>Уже зарегистрированы? <Link to='/signin' className='entry__link'>Войти</Link></p>
        </div>
    )
}

export default Register;    