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
    `,"contact_type":"Individual"` +
    `,"contact_sub_type":"Volunteer"` +
    `,"return":"${fields}"` +
    `}`;

  return fetch(`${baseUrl}&${requestType}&${body}`, { method: 'POST' }).then(response => {
    return response.json();
  });
};

const submitVolunteerApplication = (id, data) => {
  const requestType = 'entity=Contact&action=create';
  const body =
    `json={"id":"${id}"` +
    `,"custom_11":"${data.emergencyContactName}"` +
    `,"custom_15":"${data.emergencyContactRelationship}"` +
    `,"custom_16":"${data.emergencyContactPhoneNumber}"` +
    `,"custom_17":"${data.howHeardAboutUs}"` +
    `,"custom_18":"${data.areasOfInterest}"` +
    `,"custom_19":"${data.qualifications}"` +
    `,"custom_20":"${data.firstAid}"` +
    `,"custom_21":"${data.otherCertificates}"` +
    `,"custom_22":"${data.willingToSubmitVulnerableScreening}"` +
    `,"custom_23":"${data.completedVulnerableSectorCheck}"` +
    `,"custom_24":"${data.availability}"` +
    `,"custom_25":"${data.periodOfTime}"` +
    `,"custom_26":"${data.cities}"` +
    `,"custom_27":"${data.vehicle}"` +
    `,"custom_28":"${data.stayConnected}"` +
    `,"custom_29":"${data.references}"` +
    `,"custom_30":"${data.nameDate}"` +
    `,"custom_31":"${data.parentName}"` +
    `,"custom_32":"${data.parentNameDate}"` +
    `}`;

  return fetch(`${baseUrl}&${requestType}&${body}`, { method: 'POST' }).then(response => {
    return response.json();
  });
};

export { createVolunteer, submitVolunteerApplication };
