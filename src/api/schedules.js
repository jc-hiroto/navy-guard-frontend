import instance from "./axios";

const get_schedule_by_date = async (date) => {
  const response = await instance.get(`/schedules/${date}`);
  return response.data;
}

const get_week_history = async () => {
  const response = await instance.get(`/schedules/history/week`);
  return response.data;
}

const get_week_prediction = async () => {
  const response = await instance.get(`/schedules/prediction/week`);
  return response.data;
}

const get_day_prediction = async () => {
  const response = await instance.get(`/schedules/prediction/day`);
  return response.data;
}

const createSchedule = async (data, token) => {
  const response = await instance.post("/schedules", data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}

export { get_schedule_by_date, get_week_history, get_week_prediction, get_day_prediction, createSchedule };
