const baseUrl =
  'https://cors-anywhere.herokuapp.com/' +
  'http://99.79.69.43/web/libraries/civicrm/extern/rest.php' +
  '?key=addf0fd097b87e5364a74c07b4ef4e3e&api_key=drupal';

const checkUserExists = email => {
  const requestType = 'entity=Contact&action=get';
  const fields = 'id,email,first_name,last_name,gender_id,custom_14,city,custom_19,custom_18';
  const body = `json={"returns":"${fields}","email":"${email}"}`;

  return fetch(`${baseUrl}&${requestType}&${body}`).then(response => {
    return response.json();
  });
};

export default checkUserExists;