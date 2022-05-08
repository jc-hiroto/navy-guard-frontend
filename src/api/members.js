import instance from "./axios";

const getMemberbyId = async (member_id) => {
  const response = await instance.get(`/members/${member_id}`);
  return response.data;
}

const getIgnoreMembers = async () => {
  const response = await instance.get("/members/ignore");
  return response.data;
}

const getMemberQueuebyId = async (member_id) => {
  const response = await instance.get(`/members/${member_id}/queue`);
  return response.data;
}

const patchMemberbyId = async (member_id, data, token) => {
  const response = await instance.patch(`/members/${member_id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}

export { getMemberbyId, getIgnoreMembers, getMemberQueuebyId, patchMemberbyId };
