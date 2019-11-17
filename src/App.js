import React from 'react';
import { Link } from 'react-router-dom';
import { UserConsumer, UserProvider } from './user.context';

function App() {
  return (
    <div>
      <UserProvider>
        <UserConsumer>
          {context => {
            return (
              <div>
                <h1>{context.user}</h1>
                <h1>Home</h1>
                Pages:
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/banner">Banner</Link>
                  </li>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/apply">Application</Link>
                  </li>
                  <li>
                    <Link to="/profile">Volunteer Profile</Link>
                  </li>
                  <li>
                    <Link to="/progress">Application Progress</Link>
                  </li>
                  <li>
                    <Link to="/upload">Document Upload</Link>
                  </li>
                  <li>
                    <Link to="/track">Track Volunteer History</Link>
                  </li>
                  <li>
                    <Link to="/events">Events</Link>
                  </li>
                  <li>
                    <Link to="/events/1">Event 1 Details</Link>
                  </li>
                </ul>
              </div>
            );
          }}
        </UserConsumer>
      </UserProvider>
    </div>
  );
}

export default App;
