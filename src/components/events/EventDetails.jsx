import React from 'react';
import { Link } from 'react-router-dom';

const EventDetails = ({ match }) => {
  const title = `Event ${match.params.id}`;
  return (
    <div>
      <h1>{title}</h1>
      <Link to="/">Back Home</Link>
    </div>
  );
};

export default EventDetails;
