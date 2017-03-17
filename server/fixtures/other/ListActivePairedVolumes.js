module.exports = {
  "result": {
    "volumes": [
      {
        "clusterID": 1902365,
        "volumeID": 70,
        "access": "replicationTarget",
        "accountID": 2,
        "blockSize": 4096,
        "createTime": "2016-06-15T10:59:47Z",
        "deleteTime": "",
        "enable512e": true,
        "iqn": "iqn.2010-01.com.solidfire:ffbl.replis2so001.70",
        "name": null,
        "purgeTime": "",
        "scsiEUIDeviceID": "6666626c00000046f47acc0100000000",
        "scsiNAADeviceID": "6f47acc1000000006666626c00000046",
        "sliceCount": 1,
        "status": "active",
        "totalSize": 1000000716800,
        "volumeStats": {
          "clusterID": 1902365,
          "volumeID": 70,
          "actualIOPS": 2,
          "asyncDelay": null,
          "averageIOPSize": 4096,
          "burstIopsCredit": 600000,
          "clientQueueDepth": 0,
          "latencyUSec": 300,
          "nonZeroBlocks": 3936680,
          "readBytes": 0,
          "readLatencyUSec": 0,
          "readOps": 0,
          "throttle": 0,
          "timestamp": "2017-03-14T21:07:47.645272Z",
          "unalignedReads": 0,
          "unalignedWrites": 0,
          "volumeSize": 1000000716800,
          "volumeUtilization": 0.0001,
          "writeBytes": 145410330624,
          "writeLatencyUSec": 300,
          "writeOps": 31267067,
          "zeroBlocks": 240204120,
          "created": "2016-06-15T11:04:33Z",
          "updated": "2017-03-14T21:07:48Z"
        },
        "qos": {
          "clusterID": 1902365,
          "volumeID": 70,
          "burstIOPS": 30000,
          "burstTime": 60,
          "maxIOPS": 20000,
          "minIOPS": 1000,
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
          "created": "2016-06-15T11:04:54Z",
          "updated": "2016-06-15T14:35:13Z"
        },
        "configuredAccessProtocols": [
          "ISCSI"
        ],
        "volumePairs": [
          {
            "clusterPairID": 1,
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
            "remoteSliceID": 70,
            "remoteVolumeID": 70,
            "remoteVolumeName": "replis2so001",
            "volumePairUUID": "37e42fed-861b-4636-a110-a1484853f61a"
          }
        ],
        "created": "2016-06-15T11:04:54Z",
        "updated": "2016-06-15T13:45:08Z"
      },
      {
        "clusterID": 1902365,
        "volumeID": 71,
        "access": "replicationTarget",
        "accountID": 2,
        "blockSize": 4096,
        "createTime": "2016-06-15T10:59:54Z",
        "deleteTime": "",
        "enable512e": true,
        "iqn": "iqn.2010-01.com.solidfire:ffbl.replis2so002.71",
        "name": null,
        "purgeTime": "",
        "scsiEUIDeviceID": "6666626c00000047f47acc0100000000",
        "scsiNAADeviceID": "6f47acc1000000006666626c00000047",
        "sliceCount": 1,
        "status": "active",
        "totalSize": 1000000716800,
        "volumeStats": {
          "clusterID": 1902365,
          "volumeID": 71,
          "actualIOPS": 4,
          "asyncDelay": null,
          "averageIOPSize": 4096,
          "burstIopsCredit": 600000,
          "clientQueueDepth": 0,
          "latencyUSec": 302,
          "nonZeroBlocks": 3021609,
          "readBytes": 0,
          "readLatencyUSec": 0,
          "readOps": 0,
          "throttle": 0,
          "timestamp": "2017-03-14T21:07:47.646556Z",
          "unalignedReads": 0,
          "unalignedWrites": 0,
          "volumeSize": 1000000716800,
          "volumeUtilization": 0.0002,
          "writeBytes": 125090054144,
          "writeLatencyUSec": 302,
          "writeOps": 30493036,
          "zeroBlocks": 241119191,
          "created": "2016-06-15T11:04:33Z",
          "updated": "2017-03-14T21:07:48Z"
        },
        "qos": {
          "clusterID": 1902365,
          "volumeID": 71,
          "burstIOPS": 30000,
          "burstTime": 60,
          "maxIOPS": 20000,
          "minIOPS": 1000,
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
          "created": "2016-06-15T11:04:54Z",
          "updated": "2016-06-15T14:35:13Z"
        },
        "configuredAccessProtocols": [
          "ISCSI"
        ],
        "volumePairs": [
          {
            "clusterPairID": 1,
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
            "remoteSliceID": 71,
            "remoteVolumeID": 71,
            "remoteVolumeName": "replis2so002",
            "volumePairUUID": "9d79ff40-3423-4339-93d8-da8ee94551e9"
          }
        ],
        "created": "2016-06-15T11:04:54Z",
        "updated": "2016-06-15T14:10:20Z"
      },
      {
        "clusterID": 1902365,
        "volumeID": 72,
        "access": "readWrite",
        "accountID": 2,
        "blockSize": 4096,
        "createTime": "2016-06-15T11:00:05Z",
        "deleteTime": "",
        "enable512e": true,
        "iqn": "iqn.2010-01.com.solidfire:ffbl.replisos2001.72",
        "name": null,
        "purgeTime": "",
        "scsiEUIDeviceID": "6666626c00000048f47acc0100000000",
        "scsiNAADeviceID": "6f47acc1000000006666626c00000048",
        "sliceCount": 1,
        "status": "active",
        "totalSize": 2147483648000,
        "volumeStats": {
          "clusterID": 1902365,
          "volumeID": 72,
          "actualIOPS": 4,
          "asyncDelay": "00:00:00.000000",
          "averageIOPSize": 512,
          "burstIopsCredit": 600000,
          "clientQueueDepth": 0,
          "latencyUSec": 408,
          "nonZeroBlocks": 368313198,
          "readBytes": 18911879721984,
          "readLatencyUSec": 0,
          "readOps": 275801859,
          "throttle": 0,
          "timestamp": "2017-03-14T21:07:47.647924Z",
          "unalignedReads": 51830512,
          "unalignedWrites": 114285404,
          "volumeSize": 2147483648000,
          "volumeUtilization": 0.0002,
          "writeBytes": 10347858191360,
          "writeLatencyUSec": 408,
          "writeOps": 376955571,
          "zeroBlocks": 155974802,
          "created": "2016-06-15T11:04:33Z",
          "updated": "2017-03-14T21:07:48Z"
        },
        "qos": {
          "clusterID": 1902365,
          "volumeID": 72,
          "burstIOPS": 30000,
          "burstTime": 60,
          "maxIOPS": 20000,
          "minIOPS": 1000,
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
          "created": "2016-06-15T11:04:54Z",
          "updated": "2016-06-15T14:35:13Z"
        },
        "configuredAccessProtocols": [
          "ISCSI"
        ],
        "volumePairs": [
          {
            "clusterPairID": 2,
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
            "remoteSliceID": 72,
            "remoteVolumeID": 72,
            "remoteVolumeName": "replisos2001",
            "volumePairUUID": "9a1def6b-971e-428b-9bee-8bb740584d01"
          }
        ],
        "created": "2016-06-15T11:04:54Z",
        "updated": "2016-12-12T09:46:33Z"
      },
      {
        "clusterID": 1902365,
        "volumeID": 73,
        "access": "readWrite",
        "accountID": 2,
        "blockSize": 4096,
        "createTime": "2016-06-15T11:00:11Z",
        "deleteTime": "",
        "enable512e": true,
        "iqn": "iqn.2010-01.com.solidfire:ffbl.replisos2002.73",
        "name": null,
        "purgeTime": "",
        "scsiEUIDeviceID": "6666626c00000049f47acc0100000000",
        "scsiNAADeviceID": "6f47acc1000000006666626c00000049",
        "sliceCount": 1,
        "status": "active",
        "totalSize": 4000000770048,
        "volumeStats": {
          "clusterID": 1902365,
          "volumeID": 73,
          "actualIOPS": 4,
          "asyncDelay": "00:00:00.000000",
          "averageIOPSize": 512,
          "burstIopsCredit": 600000,
          "clientQueueDepth": 0,
          "latencyUSec": 387,
          "nonZeroBlocks": 4307134,
          "readBytes": 67098507264,
          "readLatencyUSec": 0,
          "readOps": 1813065,
          "throttle": 0,
          "timestamp": "2017-03-14T21:07:47.649247Z",
          "unalignedReads": 1168480,
          "unalignedWrites": 15616514,
          "volumeSize": 4000000770048,
          "volumeUtilization": 0.0002,
          "writeBytes": 253162786816,
          "writeLatencyUSec": 387,
          "writeOps": 42976509,
          "zeroBlocks": 972255554,
          "created": "2016-06-15T11:04:33Z",
          "updated": "2017-03-14T21:07:48Z"
        },
        "qos": {
          "clusterID": 1902365,
          "volumeID": 73,
          "burstIOPS": 30000,
          "burstTime": 60,
          "maxIOPS": 20000,
          "minIOPS": 1000,
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
          "created": "2016-06-15T11:04:54Z",
          "updated": "2016-06-15T14:35:13Z"
        },
        "configuredAccessProtocols": [
          "ISCSI"
        ],
        "volumePairs": [
          {
            "clusterPairID": 2,
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
            "remoteSliceID": 73,
            "remoteVolumeID": 73,
            "remoteVolumeName": "replisos2002",
            "volumePairUUID": "6deb72d3-f5d6-47b9-8a29-935e6a1f5235"
          }
        ],
        "created": "2016-06-15T11:04:54Z",
        "updated": "2017-01-04T15:11:40Z"
      },
      {
        "clusterID": 1902365,
        "volumeID": 74,
        "access": "readWrite",
        "accountID": 1,
        "blockSize": 4096,
        "createTime": "2016-06-15T11:02:40Z",
        "deleteTime": "",
        "enable512e": true,
        "iqn": "iqn.2010-01.com.solidfire:ffbl.sf01pbv03i00074.74",
        "name": null,
        "purgeTime": "",
        "scsiEUIDeviceID": "6666626c0000004af47acc0100000000",
        "scsiNAADeviceID": "6f47acc1000000006666626c0000004a",
        "sliceCount": 1,
        "status": "active",
        "totalSize": 4000000770048,
        "volumeStats": {
          "clusterID": 1902365,
          "volumeID": 74,
          "actualIOPS": 0,
          "asyncDelay": "00:00:00.000000",
          "averageIOPSize": 5225,
          "burstIopsCredit": 1200000,
          "clientQueueDepth": 0,
          "latencyUSec": 0,
          "nonZeroBlocks": 56170695,
          "readBytes": 20209824007168,
          "readLatencyUSec": 0,
          "readOps": 207578504,
          "throttle": 0,
          "timestamp": "2017-03-14T21:07:47.650705Z",
          "unalignedReads": 25646879,
          "unalignedWrites": 83981497,
          "volumeSize": 4000000770048,
          "volumeUtilization": 0,
          "writeBytes": 298478654982656,
          "writeLatencyUSec": 0,
          "writeOps": 462828919,
          "zeroBlocks": 920391993,
          "created": "2016-06-15T11:07:35Z",
          "updated": "2017-03-14T21:07:48Z"
        },
        "qos": {
          "clusterID": 1902365,
          "volumeID": 74,
          "burstIOPS": 35000,
          "burstTime": 60,
          "maxIOPS": 15000,
          "minIOPS": 1000,
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
          "created": "2016-06-15T11:09:53Z",
          "updated": "2017-03-14T10:07:52Z"
        },
        "configuredAccessProtocols": [
          "ISCSI"
        ],
        "volumePairs": [
          {
            "clusterPairID": 2,
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
            "remoteSliceID": 74,
            "remoteVolumeID": 74,
            "remoteVolumeName": "sf01pbv03i00074",
            "volumePairUUID": "4f5695e5-e3b6-49d8-9c13-4f0ed39eef87"
          }
        ],
        "created": "2016-06-15T11:09:53Z",
        "updated": "2017-03-14T10:07:52Z"
      },
    ]
  },
}
