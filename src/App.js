import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Login from './Components/Login'
import Home from './Components/Home'
import Jobs from './Components/Jobs'
import JobItem from './Components/JobItem'
import NotFound from './Components/NotFound'
import ProtectedRoute from './Components/ProtectedRoute'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <div className="app-container">
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/jobs" component={Jobs} />
        <ProtectedRoute exact path="/jobs/:id" component={JobItem} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </div>
)

export default App
