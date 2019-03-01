import moment from 'moment';

export const randomNumber = (min, max) =>
  Math.round(Math.random() * (max - min) + min);
export const generateDate = offset =>
  moment()
    .subtract(offset, 'days')
    .toDate();
