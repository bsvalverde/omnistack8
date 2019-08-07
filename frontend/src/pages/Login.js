import React, { useState } from 'react';

import classes from './Login.module.scss';

import api from '../services/api';

import logo from '../assets/logo.svg';

const Login = props => {
  const [username, setUsername] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    api.post('/dev', { username })
      .then(response => {
        props.history.push(`/dev/${response.data._id}`);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div className={classes.LoginContainer}>
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Tindev" />
        <input
          placeholder="Digite seu usuário no Github"
          value={username}
          onChange={event => setUsername(event.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Login;
