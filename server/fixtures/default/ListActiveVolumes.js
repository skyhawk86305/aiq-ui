module.exports = {
  result: {
    volumes: [
      {
        clusterID: 11,
        volumeID: 1,
        accountID: 2,
        totalSize: 10000000,
        enable512e: true,
        access: 'readWrite',
        qos: {
          minIOPS: 1000,
          maxIOPS: 15000,
          burstIOPS: 15000
        },
        volumePairs: [],
        volumeAccessGroups: [1, 2, 3],
        createTime: '2014-12-02T19:52:37Z',
        blockSize: 4096,
        iqn: 'iqn.2010-01.com.solidfire:ddjt.staging-mango-data-01.31',
        scsiEUIDeviceID: '64646a7400123301ff47acc0100000000',
        scsiNAADeviceID: '6f47acc100056600064646a740000001f',
        configuredAccessProtocols: ['ISCSI']
      },
      {
        clusterID: 11,
        volumeID: 2,
        accountID: 2,
        totalSize: 20000000,
        enable512e: false,
        access: 'readWrite',
        qos: {
          minIOPS: 1500,
          maxIOPS: 20000,
          burstIOPS: 20000
        },
        volumePairs: [1],
        volumeAccessGroups: [1],
        createTime: '2014-12-02T19:52:37Z',
        blockSize: 4096,
        iqn: 'iqn.2010-01.com.solidfire:ddjt.stage-mango-data-01.31',
        scsiEUIDeviceID: '64646a7400012301ff47acc0100000000',
        scsiNAADeviceID: '6f47acc1000000006464656a740000001f',
        configuredAccessProtocols: ['ISCSI']
      },
      {
        clusterID: 11,
        volumeID: 3,
        accountID: 4,
        totalSize: 10000000,
        enable512e: true,
        access: 'readWrite',
        qos: {
          minIOPS: 1000,
          maxIOPS: 15000,
          burstIOPS: 15000
        },
        volumePairs: [],
        volumeAccessGroups: [1, 2, 3],
        createTime: '2014-10-02T19:55:37Z',
        blockSize: 4096,
        iqn: 'iqn.2010-01.com.firesolid:ddjt.staging-mango-data-01.31',
        scsiEUIDeviceID: '64646a740000001f123acc0100000000',
        scsiNAADeviceID: '6f47acc10000000064646a123000001f',
        configuredAccessProtocols: ['ISCSI']
      },
      {
        clusterID: 11,
        volumeID: 4,
        accountID: 4,
        totalSize: 150000000,
        enable512e: true,
        access: 'readOnly',
        qos: {
          minIOPS: 2500,
          maxIOPS: 25000,
          burstIOPS: 25000
        },
        volumePairs: [2],
        volumeAccessGroups: [1, 2, 3],
        createTime: '2014-10-02T19:52:37Z',
        blockSize: 4096,
        iqn: 'iqn.2010-01.com.solidfire:ddjt.staging-mango-data-01.31',
        scsiEUIDeviceID: '64646a740000001ff47acc0100000000',
        scsiNAADeviceID: '6f47acc10000000064646a740000001f',
        configuredAccessProtocols: ['ISCSI']
      },
      {
        clusterID: 11,
        volumeID: 5,
        accountID: 2,
        totalSize: 20480000000,
        enable512e: false,
        access: 'readWrite',
        qos: {
          minIOPS: 1500,
          maxIOPS: 15000,
          burstIOPS: 15000
        },
        volumePairs: [],
        volumeAccessGroups: [1, 2, 3],
        createTime: '2014-10-02T19:52:37Z',
        blockSize: 4096,
        iqn: 'iqn.2010-01.com.solidfire:ddjt.staging-mango-data-01.31',
        scsiEUIDeviceID: '64646a740000001ff47acc0100000000',
        scsiNAADeviceID: '6f47acc10000000064646a740000001f',
        configuredAccessProtocols: ['ISCSI']
      },
      {
        clusterID: 11,
        volumeID: 26,
        accountID: 3,
        totalSize: 160000114688,
        enable512e: true,
        access: 'readWrite',
        qos: {
          minIOPS: 2000,
          maxIOPS: 20000,
          burstIOPS: 20000
        },
        volumePairs: [2],
        volumeAccessGroups: [1, 2, 3],
        createTime: '2014-10-02T19:52:37Z',
        blockSize: 4096,
        iqn: 'iqn.2010-01.com.solidfire:ddjt.staging-mango-data-01.31',
        scsiEUIDeviceID: '64646a740000001ff47acc0100000000',
        scsiNAADeviceID: '6f47acc10000000064646a740000001f',
        configuredAccessProtocols: ['ISCSI']
      },
      {
        clusterID: 11,
        volumeID: 25,
        accountID: 4,
        totalSize: 20000000,
        enable512e: true,
        access: 'readWrite',
        qos: {
          minIOPS: 1500,
          maxIOPS: 15000,
          burstIOPS: 15000
        },
        volumeAccessGroups: [1, 2, 3],
        createTime: '2014-10-02T19:52:37Z',
        blockSize: 4096,
        iqn: 'iqn.2010-01.com.solidfire:ddjt.staging-mango-data-01.31',
        scsiEUIDeviceID: '64646a740000001ff47acc0100000000',
        scsiNAADeviceID: '6f47acc10000000064646a740000001f',
        volumePairs: [],
        configuredAccessProtocols: ['ISCSI']
      },
      {
        clusterID: 11,
        volumeID: 30,
        accountID: 1,
        totalSize: 8000000491520,
        enable512e: false,
        access: 'readOnly',
        qos: {
          minIOPS: 3000,
          maxIOPS: 15000,
          burstIOPS: 15000
        },
        volumePairs: [],
        volumeAccessGroups: [1, 2, 3],
        createTime: '2014-10-02T19:52:37Z',
        blockSize: 4096,
        iqn: 'iqn.2010-01.com.solidfire:ddjt.staging-mango-data-01.31',
        scsiEUIDeviceID: '64646a740000001ff47acc0100000000',
        scsiNAADeviceID: '6f47acc10000000064646a740000001f',
        configuredAccessProtocols: ['ISCSI']
      },
      {
        clusterID: 11,
        volumeID: 32,
        accountID: 2,
        totalSize: 3072000524288,
        enable512e: true,
        access: 'readWrite',
        qos: {
          minIOPS: 1000,
          maxIOPS: 15000,
          burstIOPS: 15000
        },
        volumePairs: [2],
        volumeAccessGroups: [1, 2, 3],
        createTime: '2014-10-02T19:52:37Z',
        blockSize: 4096,
        iqn: 'iqn.2010-01.com.solidfire:ddjt.staging-mango-data-01.31',
        scsiEUIDeviceID: '64646a740000001ff47acc0100000000',
        scsiNAADeviceID: '6f47acc10000000064646a740000001f',
        configuredAccessProtocols: ['ISCSI']
      },
      {
        clusterID: 11,
        volumeID: 4000,
        accountID: 2,
        totalSize: 500000882688,
        enable512e: true,
        access: 'readWrite',
        qos: {
          minIOPS: 1000,
          maxIOPS: 15000,
          burstIOPS: 15000
        },
        volumePairs: [],
        volumeAccessGroups: [1, 2, 3],
        createTime: '2014-10-02T19:52:37Z',
        blockSize: 4096,
        iqn: 'iqn.2010-01.com.solidfire:ddjt.staging-mango-data-01.31',
        scsiEUIDeviceID: '64646a740000001ff47acc0100000000',
        scsiNAADeviceID: '6f47acc10000000064646a740000001f',
        configuredAccessProtocols: ['ISCSI']
      },
      {
        clusterID: 1898714,
        volumeID: 31,
        access: 'readWrite',
        accountID: 1,
        blockSize: 4096,
        createTime: '2014-10-02T19:52:37Z',
        deleteTime: '',
        enable512e: false,
        iqn: 'iqn.2010-01.com.solidfire:ddjt.staging-mongo-data-01.31',
        name: null,
        purgeTime: '',
        scsiEUIDeviceID: '64646a740000001ff47acc0100000000',
        scsiNAADeviceID: '6f47acc10000000064646a740000001f',
        sliceCount: 1,
        status: 'active',
        totalSize: 500000882688,
        volumeStats: {
          clusterID: 1898714,
          volumeID: 31,
          actualIOPS: 0,
          asyncDelay: null,
          averageIOPSize: 0,
          burstIopsCredit: 0,
          clientQueueDepth: 0,
          latencyUSec: 0,
          nonZeroBlocks: 646,
          readBytes: 19144994955264,
          readLatencyUSec: 0,
          readOps: 296028548,
          throttle: 0.0,
          timestamp: '2017-01-09T18:02:47.463693Z',
          unalignedReads: 0,
          unalignedWrites: 0,
          volumeSize: 500000882688,
          volumeUtilization: 0.0,
          writeBytes: 74808381898752,
          writeLatencyUSec: 0,
          writeOps: 3553500890,
          zeroBlocks: 122069882,
          created: '2016-04-13T19:30:27Z',
          updated: '2017-01-09T18:02:47Z'
        },
        qos: {
          clusterID: 1898714,
          volumeID: 31,
          burstIOPS: 15000,
          burstTime: 60,
          maxIOPS: 15000,
          minIOPS: 3250,
          curve: {
            8192: 160,
            32768: 500,
            4096: 100,
            1048576: 15000,
            131072: 1950,
            262144: 3900,
            16384: 270,
            65536: 1000,
            524288: 7600
          },
          created: '2016-04-13T19:30:35Z',
          updated: '2016-12-15T18:41:33Z'
        },
        configuredAccessProtocols: [
          'ISCSI'
        ],
        volumePairs: [],
        created: '2016-04-07T19:33:48Z',
        updated: '2016-12-14T23:45:06Z'
      }
    ]
  }
};
