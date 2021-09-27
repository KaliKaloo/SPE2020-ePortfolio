import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import TermsAndConditions from './pages/TermsAndConditions.js';

import Home from './pages/categories/Home';
import Projects from './pages/categories/Projects';
import WorkExpr from './pages/categories/WorkExpr';
import Qualification from './pages/categories/Qualification';
import Achievements from './pages/categories/Achievements';
import EditorPage from './pages/EditorPage';

import SettingsGeneral from './pages/settings/setting_general';
import SettingsPrivacy from './pages/settings/setting_privacy';
import SettingsAddRess from './pages/settings/setting_addRes';


import Publish from './published/Publish'


function App() {
  document.title = `ePortfolio`;

  const [isLog, setisLog] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      if (localStorage.getItem('user') !== null) {
        setisLog(true);
      }
    } else {
      setisLog(false)
    }
    return () => {
      isCancelled = true
    };
  }, [isLog]);

  return (
    <>
      <Router>
        <Switch>
        
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route path='/terms_and_conditions' component={TermsAndConditions}/>

          <Route path='/projects' component={Projects}/>
          <Route path='/workExperience' component={WorkExpr}/>
          <Route path='/achievements' component={Achievements}/>
          <Route path='/qualification' component={Qualification}/>

          <Route path='/editor/:postid?' component={EditorPage}/>
          
          <Route path='/settings_general' component={SettingsGeneral}/>
          <Route path='/settings_privacy' component={SettingsPrivacy}/>
          <Route path='/settings_additional_res' component={SettingsAddRess}/>

          <Route path={['/publish/home/:username?', '/publish/:username?']} component={Publish}/>

          <Route path='/Home' component={Home}/>

          <Route path={['/']}>
            {
              isLog ?
                <Home/>
                :
                <Landing/>
            }
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;