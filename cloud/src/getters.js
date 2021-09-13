import api, {route} from "@forge/api";

// TODO: refactor code

// get account IDs of users
export const getMemberAccountIds = async (groupName) => {
  getGroupMembers(groupName).map(a => a.accountId);
  // return users.map(a => a.accountId);

}
// get account IDs of users
export const getAccountIds = async (users) => {
  return await users.map(a => a.accountId);
  // return await users[0];
}

export const getSpace = async (spaceKey) => {
  try {
    const response = await api.asApp().requestConfluence(route`/wiki/rest/api/space/{spaceKey}`, {
      headers: {
        'Accept': 'application/json'
      }
    });
      return await response.json();
    } catch (error) {
      console.log("getSpace Error: ", error);
      throw error;
    }
}
export const getEmailAddress = async (accountId) => {
  try {
    const response = await api.requestConfluence(route`/wiki/rest/api/user/email?accountId={accountId}`, {
      headers: {
        'Accept': 'application/json'
      }
    });
      return await response.json();
    } catch (error) {
      console.log("getEmailAddress Error: ", error);
      throw error;
    }
}

export const getGroups = async () => {
  try {
    const response = await api.asApp().requestConfluence(route`/wiki/rest/api/group`, {
      headers: {
        'Accept': 'application/json'
      }
    })
      return await response.json();

    } catch (error) {
      console.log("getGroups Error: ", error);
      throw error;
    }
}

export const getGroupMembers = async (groupName) => {
  try {
    const response = await api.asApp().requestConfluence(route`/wiki/rest/api/group/member?name=${groupName}`, {
      headers: {
        'Accept': 'application/json'
      }
    });
    console.log(`Response: ${response.status} ${response.statusText}`);
    return await response.json();

    } catch (error) {
      console.log("getGroupMembers error: ", error);
      throw error;
    }
}