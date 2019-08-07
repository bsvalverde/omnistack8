import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import classes from './Main.module.scss';

import api from '../services/api';

import dislike from '../assets/dislike.svg';
import like from '../assets/like.svg';
import logo from '../assets/logo.svg';

const Main = props => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get('/devs', {
      headers: { user: props.match.params.id }
    }).then(response => {
        setUsers(response.data);
      })
      .catch(error => console.log(error));
  }, [props.match.params.id]);

  const handleLike = id => {
    api.post(`/devs/${id}/likes`, {
      headers: { user: props.match.params.id }
    }).then(request => setUsers(users.filter(user => user._id !== id)))
      .catch(error => console.log(error));
  };

  const handleDislike = id => {
    api.post(`/devs/${id}/dislikes`, {
      headers: { user: props.match.params.id }
    }).then(request => setUsers(users.filter(user => user._id !== id)))
      .catch(error => console.log(error));
  };

  return (
    <div className={classes.MainContainer}>
      <Link to="/">
        <img src={logo} alt="Tindev" />
      </Link>
      { users.length > 0 ? (
          <ul>
            {users.map(user => (
                <li key={user._id}>
                  <img src={user.avatar} alt={user.name} />
                  <footer>
                    <strong>{user.name}</strong>
                    <p>{user.bio}</p>
                  </footer>
                  <div className={classes.Buttons}>
                    <button type="button" onClick={() => handleDislike(user._id)}>
                      <img src={dislike} alt="Dislike" />
                    </button>
                    <button type="button" onClick={() => handleLike(user._id)}>
                      <img src={like} alt="like" />
                    </button>
                  </div>
                </li>
              )
            )}
          </ul>
        ) : (
          <div className={classes.Empty}>Acabou :(</div>
        )
      }
    </div>
  );
}

export default Main;
