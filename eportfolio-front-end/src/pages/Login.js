import "../styles/tos.css"

import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {logIn, userFromUsername} from "../services/api/UserApi";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function Login() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordWarning, setPasswordWarning] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const text = await logIn(username, password);
      document.title = `${username}'s portfolio`;

      console.log(text);

      const t = await text.text();
      localStorage.setItem('token', t);
      console.log(localStorage.getItem('token'));


      const u = await userFromUsername(username);
      console.log(u);
      localStorage.setItem('userId', u.id);
      console.log(localStorage.getItem('userId'));

      localStorage.setItem('user', JSON.stringify(u));

      history.push("/home");
      console.log(JSON.parse(localStorage.getItem('user')).id);

    } catch (e) {
      console.log(e);
      setPassword('');
      setPasswordWarning(true);
      return Promise.reject();
    }
  }

  return (
    <div className="login">
        <div className="container">
            <Link to="/" className="back_icon">
                    <ArrowBackIcon/>
            </Link>

        <div className="log-form-box">
            <h2> Login </h2>
            <h5>to ePortfolio</h5>
            <form onSubmit={handleSubmit}>

            <label>
                <p>Username</p>
                <input type='text'
                    className="form-control"
                    name='username'
                    value={username} placeholder=''
                    onChange={e => setUsername(e.target.value)}/>
            </label>

            <label>
                <p>Password</p>
                <input type='password' className="form-control"
                    name='password'
                    value={password}
                    placeholder='' required
                    onChange={e => setPassword(e.target.value)}/>
                {passwordWarning ? <p className="password-warning">Incorrect username and password</p> : null}
            </label>

            <button className="btn btn-login" onSubmit={handleSubmit}>Log in</button>

            <Link to="/register">
                <button className="btn btn-register btn-outline-secondary">Register</button>
            </Link>
            </form>
        </div>
        </div>
    </div>
  );
}

export default Login;