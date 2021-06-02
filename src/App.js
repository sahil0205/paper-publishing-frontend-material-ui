import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginForm from './component/user/LoginForm';
import OnLoginHeader from './component/user/OnLoginHeader';
import UserHome from './component/user/UserHome';
import CategoryHome from './component/category/CategoryHome';
import NewsHome from './component/news/NewsHome';
import PaperHome from './component/paper/PaperHome';
import MyAccount from './component/user/MyAccount';
import Registration from './component/user/Registration';
import AddNews from './component/news/AddNews';
import AddPaper from './component/paper/AddPaper';
import UserList from './component/user/UserList';
import UserNewsList from './component/news/UserNewsList';
import UserPaperList from './component/paper/UserPaperList';
import ViewPaper from './component/paper/ViewPaper';

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
          <Route path="/addNews/:userId" component={AddNews}></Route>
          <Route path="/addpaper/:userId" component={AddPaper}></Route>
          <Route path="/usernewslist/:userId" component={UserNewsList}></Route>
          <Route path="/userpaperlist/:userId" component={UserPaperList}></Route>
          <Route path="/userlist/:userId" component={UserList}></Route>
          <Route path="/viewpaper/:userId/:paperId" component={ViewPaper}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
