const { moveEventToDay, groupEventsByDay } = require('./events');

const groupEventsDemoData = [
  {
    id: 107,
    startsAt: '2021-01-27T11:01:11Z',
    endsAt: '2021-01-29T15:01:11Z',
    title: 'Daily walk',
  },
  {
    id: 106,
    startsAt: '2021-01-27T14:01:11Z',
    endsAt: '2021-01-29T15:01:11Z',
    title: 'Daily walk',
  },
  {
    id: 105,
    startsAt: '2021-01-27T13:01:11Z',
    endsAt: '2021-01-28T15:01:11Z',
    title: 'Daily walk',
  },
];

const groupEventsExpectedOutput = {
  1: [
    {
      endsAt: '2021-01-28T15:01:11Z',
      id: 105,
      startsAt: '2021-01-27T13:01:11Z',
      title: 'Daily walk',
    },
  ],
  2: [
    {
      endsAt: '2021-01-29T15:01:11Z',
      id: 107,
      startsAt: '2021-01-27T11:01:11Z',
      title: 'Daily walk',
    },
    {
      endsAt: '2021-01-29T15:01:11Z',
      id: 106,
      startsAt: '2021-01-27T14:01:11Z',
      title: 'Daily walk',
    },
  ],
};

describe("groupEventsByDay", () => {
    it('validates empty array', () => {
        expect(() => groupEventsByDay([])).toThrow(Error);
        expect(() => groupEventsByDay([])).toThrow("Events cannot be empty.");
    })
    it('validates different data type', () => {
      expect(() => groupEventsByDay({})).toThrow(Error);
      expect(() => groupEventsByDay({})).toThrow("Invalid data passed in.");
  })
    it('groups events by day', () => {
        expect(groupEventsByDay(groupEventsDemoData)).toStrictEqual(groupEventsExpectedOutput);
        expect(Object.entries(groupEventsByDay(groupEventsDemoData)).length).toBeGreaterThan(1);
    });
})



const moveEventDemoData = {
  0: [
    {
      id: 106,
      startsAt: '2021-01-27T13:01:11Z',
      endsAt: '2021-01-27T15:01:11Z',
      title: 'Daily walk',
    },
  ],
  2: [
    {
      id: 5676,
      startsAt: '2021-01-29T13:01:11Z',
      endsAt: '2021-01-29T15:01:11Z',
      title: 'Daily dinner',
    },
  ],
}

const moveEventExpectedResult = {
  '0': [
    {
      id: 106,
      startsAt: '2021-01-27T13:01:11Z',
      endsAt: '2021-01-27T15:01:11Z',
      title: 'Daily walk'
    }
  ],
  '3': {
    id: 5676,
    startsAt: '2021-01-30T13:01:11.000Z',
    endsAt: '2021-01-30T15:01:11.000Z',
    title: 'Daily dinner'
  }
}


describe('moveEvent', () => {
    it('validates the existense three inputs', () => {
        expect(() => moveEventToDay()).toThrow(Error);
    });

    it('checks the id is of data type Number', () => {
        expect(() => moveEventToDay( moveEventDemoData, "5676", 2)).toThrow(Error);
    });
    it('checks the toDay is of data type Number', () => {
        expect(() => moveEventToDay( moveEventDemoData, 5676, "3")).toThrow(Error);
    });
    it('moves event and return data with no error', () => {

        const results = moveEventToDay(moveEventDemoData, 5676, 3);
        
        expect(results).toMatchObject(moveEventExpectedResult);
    });


})


