import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LoginForm from './component/user/LoginForm';
import OnLoginHeader from './component/user/OnLoginHeader';
import UserHome from './component/user/UserHome';
import CategoryHome from './component/category/CategoryHome';
import NewsHome from './component/news/NewsHome';
import PaperHome from './component/paper/PaperHome';
import HeaderComponent from './component/HeaderComponent';
import MyAccount from './component/user/MyAccount';
import Registration from './component/user/Registration';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={LoginForm}></Route>
          <Route path="/userhome/:userId" component={UserHome}></Route>
          <Route path="/cathome/:userId" component={CategoryHome}></Route>
          <Route path="/newshome/:userId" component={NewsHome}></Route>
          <Route path="/paphome/:userId" component={PaperHome}></Route>
          <Route path="/onloginheader" component={OnLoginHeader}></Route>
          <Route path="/myaccount/:userId" component={MyAccount}></Route>
          <Route path="/registration" component={Registration}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
