/* eslint-disable no-useless-concat */
const baseUrl =
  'https://cors-anywhere.herokuapp.com/' +
  'http://99.79.69.43/web/libraries/civicrm/extern/rest.php' +
  '?key=addf0fd097b87e5364a74c07b4ef4e3e&api_key=drupal';

const volunteerSubmitted = contactId => {
  const requestType = 'entity=Contact&action=create';
  const body = `json={"id":"${contactId}"` + `,"custom_37":"true"` + `}`;

  return fetch(`${baseUrl}&${requestType}&${body}`, { method: 'POST' }).then(response => {
    return response.json();
  });
};

const volunteerInterviewed = contactId => {
  const requestType = 'entity=Contact&action=create';
  const body = `json={"id":"${contactId}"` + `,"custom_45":"true"` + `}`;

  return fetch(`${baseUrl}&${requestType}&${body}`, { method: 'POST' }).then(response => {
    return response.json();
  });
};

const volunteerApproved = contactId => {
  const requestType = 'entity=Contact&action=create';
  const body = `json={"id":"${contactId}"` + `,"custom_36":"true"` + `}`;

  return fetch(`${baseUrl}&${requestType}&${body}`, { method: 'POST' }).then(response => {
    return response.json();
  });
};

export { volunteerSubmitted, volunteerInterviewed, volunteerApproved };
