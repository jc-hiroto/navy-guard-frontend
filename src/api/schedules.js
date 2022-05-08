import instance from "./axios";

const get_schedule_by_date = async (date) => {
  const response = await instance.get(`/schedules/${date}`);
  return response.data;
}

export { get_schedule_by_date };
