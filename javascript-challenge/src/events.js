const { parseISO } = require('date-fns');
var differenceInDays = require('date-fns/differenceInDays');
var add = require('date-fns/add');
var parseJSON = require('date-fns/parseJSON');

var moment = require('moment'); // require
moment().format(); 
/** 
  An event could look like this:
  ```
  {
    id: 107,
    startsAt: '2021-01-27T13:01:11Z', 
    endsAt: '2021-01-27T15:01:11Z', 
    title: 'Daily walk',
  }
  ```
*/

/** 
  Take an array of events and return an object that is a  mapping from the 'day' to the events occuring on that day.
  The keys should be the day-difference to the earliest occuring event.
  Each days events should be sorted in ascending order of startsAt

  A result could look like:
  ```
  {
    0: [
      { id: 106, startsAt: '2021-01-27T13:01:11Z',  endsAt: '2021-01-27T15:01:11Z',  title: 'Daily walk' },
      { id: 156, startsAt: '2021-01-27T17:01:11Z',  endsAt: '2021-01-27T22:01:11Z',  title: 'Dinner' },
    ],
    2: [
      { id: 5676, startsAt: '2021-01-29T13:01:11Z',  endsAt: '2021-01-27T15:01:11Z',  title: 'Daily walk' },
    ]
  }
 ```

 Your solution should not modify any of the function arguments
*/
const groupEventsByDay = (events = []) => {
  let results = {};

  if(!Array.isArray(events)) throw new Error("Invalid data passed in.");

  if(events.length < 1) throw new Error("Events cannot be empty.");  

  events.forEach((event) => {
    const diff = differenceInDays(parseISO(event.endsAt), parseISO(event.startsAt))

    if(results[diff]){
      results[diff] = [...results[diff], {...event}].sort((a,b) => {
        return a.startsAt < b.startsAt ? -1 : a.startsAt > b.startsAt ? 1 : 0;
      });
    }else{
      results[diff] = [{...event}];
    }
  });

  return results;
};


/** 
  Adjust the start and end date of an event so it maintains its total duration, but is moved `toDay`.
  `eventsByDay` should be the same as the return value of `groupEventsByDay`
  `id` will be the event that should be moved
  `toDay` will be a number that indicates the key of `eventsByDay` that the target event should be moved to

  Example:
  ```
  eventsByDay(
    {
      0: [
        { id: 106, startsAt: '2021-01-27T13:01:11Z',  endsAt: '2021-01-27T15:01:11Z',  title: 'Daily walk' },      
      ],
      2: [
        { id: 5676, startsAt: '2021-01-29T13:01:11Z',  endsAt: '2021-01-29T15:01:11Z',  title: 'Daily walk' },
      ]
    },
    5676,
    3,
  )
  ```
  Should return something like 
  ``` 
  {
    0: [
      { id: 106, startsAt: '2021-01-27T13:01:11Z',  endsAt: '2021-01-27T15:01:11Z',  title: 'Daily walk' },      
    ],5415400
    3: [
      { id: 5676, startsAt: '2021-01-30T13:01:11Z',  endsAt: '2021-01-30T15:01:11Z',  title: 'Daily walk' },
    ]
  },
  ```

  Your solution should not modify any of the function arguments
*/
const moveEventToDay = (eventsByDay, id, toDay) => {
  
  const eventsArr = Object.entries(eventsByDay);

  // Validate inputs
  if(!eventsArr.length || !id || !toDay) throw  new Error("Input cannot be empty!");
  if(typeof id !== "number") throw new Error("Event ID must be a number");
  if(typeof toDay !== "number") throw new Error("toDay must be a number");


  let eventToBeMoved, previousKey;
  
  eventsArr.forEach((event) => {
        
    const found = event[1].length > 1 ? event[1].find((item) => item.id === id) : event[1][0];
    
    if(found){
      eventToBeMoved = found;
      previousKey = event[0];
    }
  })

  // Remove the element from it's previous position
  if(eventsByDay[previousKey].length === 1){
    delete eventsByDay[previousKey];
  }else{
    eventsByDay[previousKey] = eventsByDay[previousKey].filter((event) => event.id !==  id);
  }


  // Number of days to increment by
  const increment = Number(toDay) - Number(previousKey);

  const { startsAt, endsAt } = eventToBeMoved;

  // Increment the dates
  eventToBeMoved.startsAt = add(parseISO(startsAt), {days: increment}).toISOString();
  eventToBeMoved.endsAt = add(parseISO(endsAt), {days: increment}).toISOString();

  // Reset the event based on toDay value
  eventsByDay[toDay] = eventToBeMoved;
  
  return eventsByDay; 
};

module.exports = {
  moveEventToDay, 
  groupEventsByDay
};