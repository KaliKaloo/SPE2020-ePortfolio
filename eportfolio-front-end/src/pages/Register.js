import "../styles/tos.css"
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function Register() {
    const [username, setUsername] = useState('');
    const [Firstname, setFirstname] = useState('');
    const [Lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordWarning, setPasswordWarning] = useState(false);
    const [usernameWarning, setUsernameWarning] = useState(false);
    const history = useHistory();

    // Terms & Conditions Check
    const [agree, setAgree] = useState(false);

    const checkboxHandler = () => {
        setAgree(!agree);
    }

    let uniqueUsername = false;

    useEffect(() => {
        if (passwordWarning && password.length > 7) {
            setPasswordWarning(false);
        }
        if (uniqueUsername) {
            setUsernameWarning(false);
        }
    }, [password, passwordWarning, uniqueUsername]);


    const handleSubmit = (e) => {
        e.preventDefault()

        if (password.length < 8) {
            setPassword('');
            setPasswordWarning(true);
        }
        else{
        fetch('https://api.youreportfolio.uk/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                firstName: Firstname,
                lastName: Lastname,
                email: email,
                password: password
            })
        })
            .then(resp => {
                if (resp.ok) {
                    uniqueUsername = true;
                    history.push("/login");
                    window.alert("Register Successful! Please sign in");

                } else {
                    if (resp.status === 409) {
                        setUsername("");
                        setUsernameWarning(true);
                    }
                }
            });
        }
    }
    return (
        <div className="login">
            <div className="container">
            <Link to="/" className="back_icon">
                    <ArrowBackIcon/>
            </Link>
            <div className="reg-form-box">
                <h2> Register </h2>
                <h5>to ePortfolio</h5>
                <form onSubmit={handleSubmit}>

                    <label>
                        <p>Username</p>
                        <input type='text'
                            className="form-control"
                            name='username'
                            value={username} placeholder='' required
                            onChange={e => setUsername(e.target.value)} />
                        {usernameWarning ? <p className="password-warning">Username is taken</p> : null}
                    </label>

                    <label>
                        <p>First Name</p>
                        <input type='text' className="form-control" name='' value={Firstname} placeholder='' required onChange={e => setFirstname(e.target.value)} />
                    </label>

                    <label>
                        <p>Last Name</p>
                        <input type='text' className="form-control" name='Lastname' value={Lastname} placeholder='' required onChange={e => setLastname(e.target.value)} />
                    </label>

                    <label>
                        <p>Email Address</p>
                        <input type='email' className="form-control" name='email' value={email} placeholder='' required onChange={e => setEmail(e.target.value)} />
                    </label>

                    <label>
                        <p>Password</p>
                        <input type='password' className="form-control"
                            name='password'
                            value={password}
                            placeholder='' required
                            onChange={e => setPassword(e.target.value)} />
                        {passwordWarning ? <p className="password-warning">Password must be at least 8 characters long</p> : null}
                    </label>

                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                        <label className="form-check-label" for="flexCheckDefault">
                            I agree to the <Link to="/terms_and_conditions" target="_blank">Terms and Conditions</Link>
                        </label>
                    </div>
                    <div className="form-check">    
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={checkboxHandler} />
                        
                        <label className="form-check-label" for="flexCheckDefault">
                            I consent to the processing of personal data
                        </label>
                    </div>

                    <button disabled={!agree} className="btn btn-login" onSubmit={handleSubmit}>Sign up</button>
                    
                    <Link to="/login"><button className="btn btn-register">Login</button></Link>
                </form>
            </div>
            </div>
        </div>
    );
}

export default Register;

