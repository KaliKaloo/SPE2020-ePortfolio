import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, useParams } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import PubNavbar from './components/pubNavbar';
import PubProjects from './pages/PubProjects';
import PubWorkExpr from './pages/PubWorkExpr';
import PubAchievements from './pages/PubAchievements';
import PubQualification from './pages/PubQualification';
import { userFromUsername } from "../services/api/UserApi";
import PubHome from "./pages/PubHome";

const Publish = () => {
  let { username } = useParams()
  if (username === undefined)
    username = JSON.parse(localStorage.getItem('user')).username

  let [user, setUser] = useState({})
  let [posts, setPosts] = useState([])

  useEffect(() => {
    (async () => {
      try {
        let u = await userFromUsername(username);
        let p = await fetch(
          'https://api.youreportfolio.uk/post/?userid=' + u.id,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        ).then(res => res.json())
        setUser(u)
        setPosts(p)
      } catch (e) {
        throw (e)
      }
    })()
  }, [username])

  return (
    <Router>
      <PubNavbar user={user} />
      <Switch>
        <Route exact path={['/publish/home/:username?', '/publish/:username?']}>
          <PubHome user={user} posts={posts} />
        </Route>
        <Route path='/publish/achievements/:username?'>
          <PubAchievements user={user} posts={posts} />
        </Route>
        <Route path='/publish/qualification/:username?'>
          <PubQualification user={user} posts={posts} />
        </Route>
        <Route path='/publish/projects/:username?'>
          <PubProjects user={user} posts={posts} />
        </Route>
        <Route path='/publish/workExperience/:username?'>
          <PubWorkExpr user={user} posts={posts} />
        </Route>
      </Switch>
    </Router>
  );
}

export default Publish;