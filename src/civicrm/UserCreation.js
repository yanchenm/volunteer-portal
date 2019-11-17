const baseUrl =
  'https://cors-anywhere.herokuapp.com/' +
  'http://99.79.69.43/web/libraries/civicrm/extern/rest.php' +
  '?key=addf0fd097b87e5364a74c07b4ef4e3e&api_key=drupal';

const createVolunteer = data => {
  const requestType = 'entity=Contact&action=create';
  const fields = 'id';
  const body =
    `json={"first_name":"${data.firstName}"` +
    `,"last_name":"${data.lastName}"` +
    `,"gender_id":"${data.gender}"` +
    // `,"street_address":"${struct.address}"` +
    // `,"city":"${struct.city}"` +
    // `,"state_province_name":"${struct.province}"` +
    // `,"postal":"${struct.postalCode"` +
    `,"custom_12":"${data.dayPhone}"` +
    `,"custom_13":"${data.eveningPhone}"` +
    `,"email":"${data.email}"` +
    // `,"password":"${struct.password}"` +
    `,"custom_14":"${data.age}"` +
    `,"custom_9":"${data.languagesSpoken}"` +
    `,"custom_10":"${data.languagesWritten}"` +
    `,"perferred_communication_method":"${data.preferredContactMethod}"` +
    `,"return":"${fields}"` +
    `}`;

  return fetch(`${baseUrl}&${requestType}&${body}`).then(response => {
    return response.json();
  });
};

export default createVolunteer;
