import React from 'react'
import '../styles/FormLogin.css'


const FormLogin = () => {
    return (
        <form>
            <h2>Login</h2>
            <label>
                <span>Email :</span>
                <input type="email" name='email' id='iEmail' required />

            </label>

            <label>
                <span>Senha :</span>
                <input type="password" name="password" id="iPassword" required />
            </label>

            <input type="submit" value="login" />
        
        </form>
    )
}

export default FormLogin