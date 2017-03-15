module.exports = {
  "volumes": [
    {
      "status": "active",
      "enable512e": true,
      "qos": {
        "burstIOPS": 30000,
        "curve": {
          "8192": 160,
          "32768": 500,
          "4096": 100,
          "1048576": 15000,
          "131072": 1950,
          "262144": 3900,
          "16384": 270,
          "65536": 1000,
          "524288": 7600
        },
        "minIOPS": 1000,
        "burstTime": 60,
        "maxIOPS": 20000
      },
      "name": "replis2so001",
      "volumeAccessGroups": [],
      "scsiNAADeviceID": "6f47acc1000000006666626c00000046",
      "totalSize": 1000000716800,
      "blockSize": 4096,
      "purgeTime": "",
      "scsiEUIDeviceID": "6666626c00000046f47acc0100000000",
      "volumeID": 70,
      "access": "replicationTarget",
      "iqn": "iqn.2010-01.com.solidfire:ffbl.replis2so001.70",
      "sliceCount": 1,
      "attributes": {},
      "volumePairs": [
        {
          "remoteReplication": {
            "pauseLimit": 3145728000,
            "remoteServiceID": 91,
            "stateDetails": "",
            "resumeDetails": "",
            "state": "Active",
            "snapshotReplication": {
              "state": "Idle",
              "stateDetails": ""
            },
            "mode": "Sync"
          },
          "volumePairUUID": "37e42fed-861b-4636-a110-a1484853f61a",
          "clusterPairID": 1,
          "remoteVolumeName": "replis2so001",
          "remoteVolumeID": 70,
          "remoteSliceID": 70
        }
      ],
      "deleteTime": "",
      "createTime": "2016-06-15T10:59:47Z",
      "accountID": 2
    },
    {
      "status": "active",
      "enable512e": true,
      "qos": {
        "burstIOPS": 30000,
        "curve": {
          "8192": 160,
          "32768": 500,
          "4096": 100,
          "1048576": 15000,
          "131072": 1950,
          "262144": 3900,
          "16384": 270,
          "65536": 1000,
          "524288": 7600
        },
        "minIOPS": 1000,
        "burstTime": 60,
        "maxIOPS": 20000
      },
      "name": "replis2so002",
      "volumeAccessGroups": [],
      "scsiNAADeviceID": "6f47acc1000000006666626c00000047",
      "totalSize": 1000000716800,
      "blockSize": 4096,
      "purgeTime": "",
      "scsiEUIDeviceID": "6666626c00000047f47acc0100000000",
      "volumeID": 71,
      "access": "replicationTarget",
      "iqn": "iqn.2010-01.com.solidfire:ffbl.replis2so002.71",
      "sliceCount": 1,
      "attributes": {},
      "volumePairs": [
        {
          "remoteReplication": {
            "pauseLimit": 3145728000,
            "remoteServiceID": 99,
            "stateDetails": "",
            "resumeDetails": "",
            "state": "Active",
            "snapshotReplication": {
              "state": "Idle",
              "stateDetails": ""
            },
            "mode": "Async"
          },
          "volumePairUUID": "9d79ff40-3423-4339-93d8-da8ee94551e9",
          "clusterPairID": 1,
          "remoteVolumeName": "replis2so002",
          "remoteVolumeID": 71,
          "remoteSliceID": 71
        }
      ],
      "deleteTime": "",
      "createTime": "2016-06-15T10:59:54Z",
      "accountID": 2
    },
    {
      "status": "active",
      "enable512e": true,
      "qos": {
        "burstIOPS": 30000,
        "curve": {
          "8192": 160,
          "32768": 500,
          "4096": 100,
          "1048576": 15000,
          "131072": 1950,
          "262144": 3900,
          "16384": 270,
          "65536": 1000,
          "524288": 7600
        },
        "minIOPS": 1000,
        "burstTime": 60,
        "maxIOPS": 20000
      },
      "name": "replisos2001",
      "volumeAccessGroups": [
        11
      ],
      "scsiNAADeviceID": "6f47acc1000000006666626c00000048",
      "totalSize": 2147483648000,
      "blockSize": 4096,
      "purgeTime": "",
      "scsiEUIDeviceID": "6666626c00000048f47acc0100000000",
      "volumeID": 72,
      "access": "readWrite",
      "iqn": "iqn.2010-01.com.solidfire:ffbl.replisos2001.72",
      "sliceCount": 1,
      "attributes": {},
      "volumePairs": [
        {
          "remoteReplication": {
            "pauseLimit": 3145728000,
            "remoteServiceID": 25,
            "stateDetails": "",
            "resumeDetails": "",
            "state": "Active",
            "snapshotReplication": {
              "state": "Idle",
              "stateDetails": ""
            },
            "mode": "Async"
          },
          "volumePairUUID": "9a1def6b-971e-428b-9bee-8bb740584d01",
          "clusterPairID": 2,
          "remoteVolumeName": "replisos2001",
          "remoteVolumeID": 72,
          "remoteSliceID": 72
        }
      ],
      "deleteTime": "",
      "createTime": "2016-06-15T11:00:05Z",
      "accountID": 2
    },
    {
      "status": "active",
      "enable512e": true,
      "qos": {
        "burstIOPS": 30000,
        "curve": {
          "8192": 160,
          "32768": 500,
          "4096": 100,
          "1048576": 15000,
          "131072": 1950,
          "262144": 3900,
          "16384": 270,
          "65536": 1000,
          "524288": 7600
        },
        "minIOPS": 1000,
        "burstTime": 60,
        "maxIOPS": 20000
      },
      "name": "replisos2002",
      "volumeAccessGroups": [],
      "scsiNAADeviceID": "6f47acc1000000006666626c00000049",
      "totalSize": 4000000770048,
      "blockSize": 4096,
      "purgeTime": "",
      "scsiEUIDeviceID": "6666626c00000049f47acc0100000000",
      "volumeID": 73,
      "access": "readWrite",
      "iqn": "iqn.2010-01.com.solidfire:ffbl.replisos2002.73",
      "sliceCount": 1,
      "attributes": {},
      "volumePairs": [
        {
          "remoteReplication": {
            "pauseLimit": 3145728000,
            "remoteServiceID": 91,
            "stateDetails": "",
            "resumeDetails": "",
            "state": "Active",
            "snapshotReplication": {
              "state": "Idle",
              "stateDetails": ""
            },
            "mode": "Async"
          },
          "volumePairUUID": "6deb72d3-f5d6-47b9-8a29-935e6a1f5235",
          "clusterPairID": 2,
          "remoteVolumeName": "replisos2002",
          "remoteVolumeID": 73,
          "remoteSliceID": 73
        }
      ],
      "deleteTime": "",
      "createTime": "2016-06-15T11:00:11Z",
      "accountID": 2
    },
    {
      "status": "active",
      "enable512e": true,
      "qos": {
        "burstIOPS": 30000,
        "curve": {
          "8192": 160,
          "32768": 500,
          "4096": 100,
          "1048576": 15000,
          "131072": 1950,
          "262144": 3900,
          "16384": 270,
          "65536": 1000,
          "524288": 7600
        },
        "minIOPS": 1000,
        "burstTime": 60,
        "maxIOPS": 20000
      },
      "name": "sf01pbv03i00074",
      "volumeAccessGroups": [
        4
      ],
      "scsiNAADeviceID": "6f47acc1000000006666626c0000004a",
      "totalSize": 2000000385024,
      "blockSize": 4096,
      "purgeTime": "",
      "scsiEUIDeviceID": "6666626c0000004af47acc0100000000",
      "volumeID": 74,
      "access": "readWrite",
      "iqn": "iqn.2010-01.com.solidfire:ffbl.sf01pbv03i00074.74",
      "sliceCount": 1,
      "attributes": {},
      "volumePairs": [
        {
          "remoteReplication": {
            "pauseLimit": 3145728000,
            "remoteServiceID": 91,
            "stateDetails": "",
            "resumeDetails": "",
            "state": "Active",
            "snapshotReplication": {
              "state": "Idle",
              "stateDetails": ""
            },
            "mode": "Async"
          },
          "volumePairUUID": "4f5695e5-e3b6-49d8-9c13-4f0ed39eef87",
          "clusterPairID": 2,
          "remoteVolumeName": "sf01pbv03i00074",
          "remoteVolumeID": 74,
          "remoteSliceID": 74
        }
      ],
      "deleteTime": "",
      "createTime": "2016-06-15T11:02:40Z",
      "accountID": 1
    },
  ]
};

