import { createSelector } from 'reselect'

const getCurrentUser = (state) => state.profile
const getGroups = (state) => state.groups

export const createProfileInformation = createSelector(
  [getGroups, getCurrentUser],
  (groups, currentUser) => {
    let profile = currentUser;
    let groupsList = [];
    if(groups) {
      Object.keys(groups).forEach((key) => {
        const group = groups[key];
        group.groupMembers.forEach((member) => {
          if(member.profile._id === currentUser._id) {
            groupsList.push(group);
          }
        });
      });
      profile.groups = groupsList;
      return profile;
    }
  }
)
