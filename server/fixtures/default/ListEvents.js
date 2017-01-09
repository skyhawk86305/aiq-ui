module.exports = {
  result: {
    events: [
      {
        timeOfReport: '2016-02-16T17:07:38.307662Z',
        timeOfPublish: '2016-02-16T17:07:38.307749Z',
        details: {
          nonceValue: 762233706,
          generation: 1455642000,
          discardedBlocks: 2236283
        },
        driveID: 0,
        eventID: 1205418,
        eventInfoType: 'gcEvent',
        message: 'GCCompleted',
        nodeID: 0,
        serviceID: 257,
        severity: 0
      },
      {
        timeOfReport: '2016-02-16T17:07:38.304606Z',
        timeOfPublish: '2016-02-16T17:07:38.304718Z',
        details: '',
        driveID: 0,
        eventID: 1205417,
        eventInfoType: 'binSyncEvent',
        message: 'Cascading Bin Sync',
        nodeID: 0,
        serviceID: 0,
        severity: 0
      },
      {
        timeOfReport: '2016-02-16T17:07:38.305656Z',
        timeOfPublish: '2016-02-16T17:07:38.305799Z',
        details: '',
        driveID: 40,
        eventID: 1205416,
        eventInfoType: 'serviceEvent',
        message: 'BlockService Started',
        nodeID: 4,
        serviceID: 43,
        severity: 0
      },
      {
        timeOfReport: '2016-02-16T17:07:38.307036Z',
        timeOfPublish: '2016-02-16T17:07:38.307190Z',
        details: {
          nonceValue: 762233706,
          generation: 1455642000,
          discardedBlocks: 1117978
        },
        driveID: 0,
        eventID: 1205415,
        eventInfoType: 'gcEvent',
        message: 'GCCompleted',
        nodeID: 0,
        serviceID: 113,
        severity: 0
      },
      {
        timeOfReport: '2016-02-16T17:07:38.306008Z',
        timeOfPublish: '2016-02-16T17:07:38.306090Z',
        details: {
          "success": true,
          "params":
            { "totalSize": 500000000000,
              "enable512e": true,
              "qos":
                {
                  "burstIOPS": 15000,
                  "minIOPS": 3000,
                  "maxIOPS": 15000
                },
              "name": "STAGE",
              "accountID": 2
            },
          "method": "CreateVolume",
          "context": {
            "ip": "172.17.21.2",
            "user": "admin"
          }
        },
        driveID: 0,
        eventID: 1205414,
        eventInfoType: 'apiEvent',
        message: 'API Call (CreateVolume)',
        nodeID: 2,
        serviceID: 0,
        severity: 0
      },
      {
        timeOfReport: '2016-02-16T17:07:38.307217Z',
        timeOfPublish: '2016-02-16T17:07:38.307316Z',
        details: {
          nonceValue: 762233706,
          generation: 1455642000,
          discardedBlocks: 2238051
        },
        driveID: 0,
        eventID: 1205413,
        eventInfoType: 'gcEvent',
        message: 'GCCompleted',
        nodeID: 0,
        serviceID: 256,
        severity: 0
      },
      {
        timeOfReport: '2016-02-16T17:07:38.307688Z',
        timeOfPublish: '2016-02-16T17:07:38.307792Z',
        details: {
          "replay":6.685609138564494
        },
        driveID: 34,
        eventID: 1205412,
        eventInfoType: 'serviceEvent',
        message: 'SliceServiceStarted',
        nodeID: 3,
        serviceID: 20,
        severity: 0
      },
      {
        timeOfReport: '2016-02-16T17:07:38.306877Z',
        timeOfPublish: '2016-02-16T17:07:38.307003Z',
        details: {
          "name": "SF-POC3",
          "sliceRepCount": 2,
          "blockRepCount": 2,
          "uniqueID": "nlir",
          "authCallback": "",
          "svip": "10.3.10.10",
          "attributes": {},
          "mvip": "10.3.1.10",
          "uuid": "e5016ca1-ef59-4e0b-8f77-eadc3bbda89f"
        },
        driveID: 0,
        eventID: 1205411,
        eventInfoType: 'clusterMasterEvent',
        message: 'Releasing ClusterMaster',
        nodeID: 1,
        serviceID: 1,
        severity: 0
      },
      {
        timeOfReport: '2016-02-16T17:07:38.307040Z',
        timeOfPublish: '2016-02-16T17:07:38.307128Z',
        details: {
          nonceValue: 762233706,
          generation: 1455642000,
          discardedBlocks: 2229383
        },
        driveID: 0,
        eventID: 1205410,
        eventInfoType: 'gcEvent',
        message: 'GCCompleted',
        nodeID: 0,
        serviceID: 299,
        severity: 0
      },
      {
        timeOfReport: '2016-02-16T17:07:38.306762Z',
        timeOfPublish: '2016-02-16T17:07:38.306872Z',
        details: {
          "returnCode": 0,
          "stderr": "",
          "stdout": "12 Oct 20:37:18 ntpdate[11900]: step time server 97.107.128.58 offset 0.374510 sec"
        },
        driveID: 0,
        eventID: 1205409,
        eventInfoType: 'serviceEvent',
        message: 'Time Service Updated',
        nodeID: 4,
        serviceID: 0,
        severity: 0
      }
    ]
  }
};
