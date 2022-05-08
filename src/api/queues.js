import instance from "./axios";

const getLeftQueues = async () => {
  const response = await instance.get("/queues");
  return response.data;
};

const getQueuebyId = async (queue_id) => {
  const response = await instance.get(`/queues/${queue_id}`);
  return response.data;
}

const createQueue = async (data, token) => {
  const response = await instance.post("/queues", data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}

const deleteQueuebyId = async (queue_id, token) => {
  const response = await instance.delete(`/queues/${queue_id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}

export { getLeftQueues, getQueuebyId, createQueue, deleteQueuebyId };
