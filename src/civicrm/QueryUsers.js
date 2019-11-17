/* eslint-disable no-useless-concat */
/* eslint-disable max-len */
const baseUrl =
  'https://cors-anywhere.herokuapp.com/' +
  'http://99.79.69.43/web/libraries/civicrm/extern/rest.php' +
  '?key=addf0fd097b87e5364a74c07b4ef4e3e&api_key=drupal';

const checkUserExists = email => {
  const requestType = 'entity=Contact&action=get';
  const fields =
    'id,email,first_name,last_name,gender_id,custom_14,city,custom_19,custom_18,custom_23,custom_38,custom_36,custom_37,custom_45,contact_sub_type';
  const body = `json={"return":"${fields}"` + `,"email":"${email}"` + `}`;

  return fetch(`${baseUrl}&${requestType}&${body}`).then(response => {
    return response.json();
  });
};

const listVolunteers = (interviewed, approved) => {
  const requestType = 'entity=Contact&action=get';
  const fields = '';
  const extraFields =
    'custom_11,custom_15,custom_16,custom_17,custom_18,custom_19,custom_20,custom_21,custom_22,custom_23,custom_24,custom_25,custom_26,custom_27,custom_28,custom_29,custom_30,custom_31,custom_32';
  const body =
    `json={"return":"${fields}"` +
    `,"custom_37":"true"` +
    `,"custom_45":"${interviewed}"` +
    `,"custom_36":"${approved}"` +
    `,"api.Contact.get":{"return":"${extraFields}"}` +
    `}`;

  const combined = {};

  return fetch(`${baseUrl}&${requestType}&${body}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      Object.values(data.values).forEach(volunteer => {
        const customFields = volunteer['api.Contact.get'].values[0];
        combined[volunteer.id] = { ...volunteer, ...customFields };
        delete combined[volunteer.id]['api.Contact.get'];
      });
      const restructured = data;
      restructured.values = combined;
      return restructured;
    });
};

export { checkUserExists, listVolunteers };
