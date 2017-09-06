import * as config from './config';

/*
Profile urls
 */
export function getAllProfileURL(){
  return `${config.baseUrl}/profile/`;
}

export function getProfileById(id){
  return `${config.baseUrl}/profile/${id}`;
}

export function getProfileByUserName(userName){
    return `${config.baseUrl}/profile/userName1/${userName}`;
}

/*
Group urls
 */
export function getAllGroupsURL() {
  return `${config.baseUrl}/group/`;
}

export function saveFeedbackURL() {
  return `${config.baseUrl}/connection/save-feedback`;
}

export function getFeedbackURL(giverProfileId, seekerProfileId, seekerGroupId) {
  return `${config.baseUrl}/connection/${giverProfileId}/${seekerProfileId}/${seekerGroupId}`;
}

export function getAllFeedbackURLForLoggedInUser(giverProfileId) {
  return `${config.baseUrl}/connection/${giverProfileId}`;
}

/*
Roles urls
 */
export function getAllRolesURL() {
  return `${config.baseUrl}/role/`;
}

/* Login URL's */
export function verifyLogin(username,password){
  return `${config.baseUrl}/login/auth`;
}
