import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import Banner from './components/Banner';
import ApplicationForm from './components/volunteers/ApplicationForm';
import LoginPage from './components/LoginPage';
import ProfilePage from './components/volunteers/ProfilePage';
import ApplicationProgress from './components/volunteers/ApplicationProgress';
import DocumentUpload from './components/volunteers/DocumentUpload';
import TrackHistory from './components/volunteers/TrackHistory';
import EventsPage from './components/events/EventsPage';
import EventDetails from './components/events/EventDetails';

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/banner" component={Banner} />
      <Route path="/login" component={LoginPage} />
      <Route path="/apply" component={ApplicationForm} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/progress" component={ApplicationProgress} />
      <Route path="/upload" component={DocumentUpload} />
      <Route path="/track" component={TrackHistory} />
      <Route exact path="/events" component={EventsPage} />
      <Route path="/events/:id" component={EventDetails} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));
