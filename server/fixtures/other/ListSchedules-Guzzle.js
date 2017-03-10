module.exports = {
  "schedules": [{
    "lastRunTimeStarted": "2017-03-05T00:30:00Z",
    "hasError": false,
    "scheduleInfo": {
      "name": "all-weekly-4weeksretention",
      "volumes": [16, 17, 18, 19, 20, 21, 29, 30, 31],
      "retention": "696:00:00"
    },
    "runNextInterval": false,
    "weekdays": [{"day": 0, "offset": 1}],
    "monthdays": [],
    "lastRunStatus": "Success",
    "recurring": true,
    "scheduleID": 3,
    "startingDate": "2015-11-24T14:04:01Z",
    "hours": 0,
    "toBeDeleted": false,
    "paused": false,
    "scheduleName": "all-weekly-4weeksretention",
    "attributes": {"frequency": "Days Of Week"},
    "scheduleType": "Snapshot",
    "minutes": 30
  }, {
    "lastRunTimeStarted": "2017-03-10T00:30:00Z",
    "hasError": false,
    "scheduleInfo": {
      "name": "all-daily-1weekretention",
      "volumes": [16, 17, 18, 19, 20, 21, 29, 30, 31],
      "retention": "168:00:00"
    },
    "runNextInterval": false,
    "weekdays": [{"day": 1, "offset": 1}, {"day": 2, "offset": 1}, {"day": 3, "offset": 1}, {
      "day": 4,
      "offset": 1
    }, {"day": 5, "offset": 1}, {"day": 6, "offset": 1}],
    "monthdays": [],
    "lastRunStatus": "Success",
    "recurring": true,
    "scheduleID": 2,
    "startingDate": "2015-11-24T14:02:07Z",
    "hours": 0,
    "toBeDeleted": false,
    "paused": false,
    "scheduleName": "all-daily-1weekretention",
    "attributes": {"frequency": "Days Of Week"},
    "scheduleType": "Snapshot",
    "minutes": 30
  }, {
    "lastRunTimeStarted": "2017-03-10T14:00:00Z",
    "hasError": false,
    "scheduleInfo": {
      "name": "all-4hours-3dayretention",
      "volumes": [16, 17, 18, 19, 20, 21, 29, 30, 31],
      "retention": "72:00:00"
    },
    "runNextInterval": false,
    "weekdays": [],
    "monthdays": [],
    "lastRunStatus": "Success",
    "recurring": true,
    "scheduleID": 1,
    "startingDate": "2015-11-24T14:00:51Z",
    "hours": 4,
    "toBeDeleted": false,
    "paused": false,
    "scheduleName": "all-4hours-3dayretention",
    "attributes": {"frequency": "Time Interval"},
    "scheduleType": "Snapshot",
    "minutes": 0
  }]
};
