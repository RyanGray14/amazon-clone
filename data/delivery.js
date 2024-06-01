import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
export const deliveryOptions = [
    {
        id: '1',
        time: 1,
        priceCents: 999
    }, {
        id: '2', 
        time: 3, 
        priceCents: 499
    }, {
        id: '3', 
        time: 7, 
        priceCents: 0
}]; 

function isWeekend(date) {
    const dayOfWeek = date.format('dddd');
    return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
}  
export function getDate(deliveryOption) {
        let remainingDays = deliveryOption.time;
    let deliveryDate = dayjs();
  
    while (remainingDays > 0) {
        deliveryDate = deliveryDate.add(1, 'day');
  
        if (!isWeekend(deliveryDate)) 
            remainingDays--;
    }
    return deliveryDate.format('dddd, MMMM D');
}
