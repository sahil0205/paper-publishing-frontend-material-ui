import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeComponent from './component/HomeComponent';
import LoginForm from './component/user/LoginForm';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={HomeComponent}></Route>
          <Route path="/login" component={LoginForm}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
