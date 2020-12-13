
import moment from 'moment';
// add your helper function here
export const isMonthMatch = (currentMonth,dataDate) => {
    if (currentMonth === parseInt(dataDate.format('M')) 
    && moment().year() === parseInt(dataDate.format('YYYY'))) return true;
    return false;
  }