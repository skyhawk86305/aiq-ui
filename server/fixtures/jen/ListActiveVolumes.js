module.exports = {
  result: {
    volumes: [
      {
        clusterID:11,
        volumeID: 1,
        accountID: 2,
        totalSize: 100000,
        enable512e: true,
        access: 'readWrite',
        qos: {
          minIOPS: 1000,
          maxIOPS: 15000,
          burstIOPS: 15000
        },
        volumePairs: [],
        configuredAccessProtocols:['ISCSI']
      },
      {
        clusterID:11,
        volumeID: 2,
        accountID: 2,
        totalSize: 200000,
        enable512e: false,
        access: 'readWrite',
        qos: {
          minIOPS: 1500,
          maxIOPS: 20000,
          burstIOPS: 20000
        },
        volumePairs: [1],
        configuredAccessProtocols:['ISCSI']
      },
      {
        clusterID:11,
        volumeID: 3,
        accountID: 4,
        totalSize: 10000000,
        enable512e: false,
        access: 'readOnly',
        qos: {
          minIOPS: 1000,
          maxIOPS: 15000,
          burstIOPS: 15000
        },
        volumePairs: [],
        configuredAccessProtocols:['ISCSI']
      },
      {
        clusterID:11,
        volumeID: 4,
        accountID: 4,
        totalSize: 1500000,
        enable512e: true,
        access: 'readWrite',
        qos: {
          minIOPS: 2500,
          maxIOPS: 25000,
          burstIOPS: 25000
        },
        volumePairs: [2],
        configuredAccessProtocols:['ISCSI']
      },
      {
        clusterID:11,
        volumeID: 5,
        accountID: 2,
        totalSize: 2000,
        enable512e: false,
        access: 'readWrite',
        qos: {
          minIOPS: 1500,
          maxIOPS: 15000,
          burstIOPS: 15000
        },
        volumePairs: [],
        configuredAccessProtocols:['ISCSI']
      },
      {
        clusterID:11,
        volumeID: 26,
        accountID: 3,
        totalSize: 400000,
        enable512e: true,
        access: 'readWrite',
        qos: {
          minIOPS: 2000,
          maxIOPS: 20000,
          burstIOPS: 20000
        },
        volumePairs: [2],
        configuredAccessProtocols:['ISCSI']
      },
      {
        clusterID:11,
        volumeID: 25,
        accountID: 4,
        totalSize: 200000,
        enable512e: true,
        access: 'readWrite',
        qos: {
          minIOPS: 1500,
          maxIOPS: 15000,
          burstIOPS: 15000
        },
        volumePairs: [],
        configuredAccessProtocols:['ISCSI']
      },
      {
        clusterID:11,
        volumeID: 30,
        accountID: 1,
        totalSize: 2000,
        enable512e: false,
        access: 'readWrite',
        qos: {
          minIOPS: 3000,
          maxIOPS: 15000,
          burstIOPS: 15000
        },
        volumePairs: [],
        configuredAccessProtocols:['ISCSI']
      },
      {
        clusterID:11,
        volumeID: 32,
        accountID: 2,
        totalSize: 100000,
        enable512e: true,
        access: 'readWrite',
        qos: {
          minIOPS: 1000,
          maxIOPS: 15000,
          burstIOPS: 15000
        },
        volumePairs: [2],
        configuredAccessProtocols:['ISCSI']
      },
      {
        clusterID:11,
        volumeID: 4000,
        accountID: 2,
        totalSize: 100000,
        enable512e: true,
        access: 'readWrite',
        qos: {
          minIOPS: 1000,
          maxIOPS: 15000,
          burstIOPS: 15000
        },
        volumePairs: [],
        configuredAccessProtocols:['ISCSI']
      }
    ]
  }
};
