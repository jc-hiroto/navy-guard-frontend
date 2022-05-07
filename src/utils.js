const getFilledMemberId = (mid) => {
  return ('000' + mid).substr(-3);
}
const get_now_date = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  return [year, month, day];
};
const get_days_left = () => {
  const end = "2022-06-29";
  const end_date = new Date(end);
  const now = new Date();
  const days_left = Math.floor((end_date - now) / (1000 * 60 * 60 * 24));
  return days_left;
};

export { getFilledMemberId, get_now_date, get_days_left };