/* jshint camelcase:false*/
module.exports = {
  virtualVolumes: [
    {
      volumeID: 1,
      snapshotID: 0,
      parentVirtualVolumeID: '00000000-0000-0000-0000-000000000000',
      virtualVolumeID: '014fc68b-b4aa-4331-a72b-c33b9ac6678f',
      virtualVolumeType: 'data',
      metadata: {
        VMW_GosType: 'windows8Server64Guest',
        VMW_VmID: '50269ecc-4dda-b329-904f-086553386715',
        VMW_VVolName: 'VH-ALEX-SILO04_2'
      },
      volumeInfo: {
        access: 'readWrite',
        totalSize: 107374182400,
        qos: {
          minIOPS: 1000,
          maxIOPS: 15000,
          burstIOPS: 15000
        },
        createTime: '2016-11-23T14:56:05Z'
      },
      snapshotInfo: null
    },
    {
      volumeID: 2,
      snapshotID: 0,
      parentVirtualVolumeID: '00000000-0000-0000-0000-000000000000',
      virtualVolumeID: '85c64ddc-451b-457a-be85-5515e029101',
      virtualVolumeType: 'config',
      metadata: {
        VMW_GosType: 'windows8Server64Guest',
        VMW_VmID: '50261da2-a72e-05a1-7ee4-85cceb339ac0',
        VMW_VVolName: 'VDI-Win10-004-checkpoint'
      },
      volumeInfo: {
        access: 'readWrite',
        totalSize: 107374182400,
        qos: {
          minIOPS: 1000,
          maxIOPS: 15000,
          burstIOPS: 15000
        },
        createTime: '2016-11-23T14:56:05Z',
        snapshotInfo: null
      }
    },
    {
      volumeID: 3,
      snapshotID: 0,
      parentVirtualVolumeID: '00000000-0000-0000-0000-000000000000',
      virtualVolumeID: '014fc68b-b4aa-4331-a72b-c33b9ac6678f',
      virtualVolumeType: 'other',
      metadata: {
        VMW_GosType: 'windows8Server64Guest',
        VMW_VmID: '525ac7f2-594d-1f58-d519-d2daadd0b149',
        VMW_VVolName: 'replica-e5b7eb2c-6739-43f1-a361-7768f9be2dfb.vswp'
      },
      volumeInfo: {
        access: 'readOnly',
        totalSize: 4294967296,
        qos: {
          minIOPS: 1000,
          maxIOPS: 15000,
          burstIOPS: 15000
        },
        createTime: '2016-11-23T14:56:05Z',
        snapshotInfo: null
      }
    },
    {
      volumeID: 4,
      snapshotID: 0,
      parentVirtualVolumeID: '00000000-0000-0000-0000-000000000000',
      virtualVolumeID: '00f56ba3-0abd-4efc-b5b3-08d74a0d5178',
      virtualVolumeType: 'swap',
      metadata: {
        VMW_GosType: 'sles11_64Guest',
        VMW_VmID: '501cfcfa-d5b6-f77a-ab97-af13d73942e4',
        VMW_VVolName: 'hbr-persistent-state-RDID-403f6b52-8c0e-440c-ac9d-461f9388fb19.vmdk'
      },
      volumeInfo: {
        access: 'readWrite',
        totalSize: 4294967296,
        qos: {
          minIOPS: 1000,
          maxIOPS: 15000,
          burstIOPS: 15000
        },
        createTime: '2016-11-23T14:56:05Z',
        snapshotInfo: null
      }
    },
    {
      volumeID: 5,
      snapshotID: 0,
      parentVirtualVolumeID: '00000000-0000-0000-0000-000000000000',
      virtualVolumeID: '00f56ba3-0abd-4efc-b5b3-08d74a0d5178',
      virtualVolumeType: 'data',
      metadata: {
        VMW_GosType: 'sles11_64Guest',
        VMW_VmID: '5026e603-01ab-4f47-b72d-bfeb7338e5b4',
        VMW_VVolName: 'vSphere Web Client Appliance_1'
      },
      volumeInfo: {
        access: 'readOnly',
        totalSize: 4294967296,
        qos: {
          minIOPS: 1000,
          maxIOPS: 15000,
          burstIOPS: 15000
        },
        createTime: '2016-11-23T14:56:05Z',
        snapshotInfo: null
      }
    },
    {
      volumeID: 6,
      snapshotID: 0,
      parentVirtualVolumeID: '8d86eb05-a7cf-42b0-8906-1b7422d125dc',
      virtualVolumeID: '00f56ba3-0abd-4efc-b5b3-08d74a0d5178',
      virtualVolumeType: 'config',
      metadata: {
        VMW_GosType: 'sles11_64Guest',
        VMW_VmID: '501c8403-6bbf-4422-f749-a094c62af7b7',
        VMW_VVolName: 'VH-ALEX-NTADB.ussfcu.office_2.vmdk'
      },
      volumeInfo: {
        access: 'readWrite',
        totalSize: 12884901888,
        qos: {
          minIOPS: 1000,
          maxIOPS: 15000,
          burstIOPS: 15000
        },
        createTime: '2016-11-23T14:56:05Z',
        snapshotInfo: null
      }
    },
    {
      volumeID: 7,
      snapshotID: 0,
      parentVirtualVolumeID: '75c6be75-2ad3-4bfc-9a61-691cd81c1dbf',
      virtualVolumeID: '00ec7b85-a193-4171-8c00-be8809bc6199',
      virtualVolumeType: 'data',
      metadata: {
        VMW_GosType: 'sles11_64Guest',
        VMW_VmID: '525ac7f2-594d-1f58-d519-d2daadd0b149',
        VMW_VVolName: 'replica-e5b7eb2c-6739-43f1-a361-7768f9be2dfb.vswp'
      },
      volumeInfo: {
        access: 'writeOnly',
        totalSize: 12884901888,
        qos: {
          minIOPS: 1000,
          maxIOPS: 20000,
          burstIOPS: 20000
        },
        createTime: '2016-11-23T14:56:05Z',
        snapshotInfo: null
      }
    },
    {
      volumeID: 8,
      snapshotID: 0,
      parentVirtualVolumeID: '00000000-0000-0000-0000-000000000000',
      virtualVolumeID: '00ec7b85-a193-4171-8c00-be8809bc619',
      virtualVolumeType: 'other',
      metadata: {
        VMW_GosType: 'sles11_64Guest',
        VMW_VmID: '501c6f8a-cd50-e244-62a0-53c856beabd5',
        VMW_VVolName: 'LYNC-EDGE-01.vswp'
      },
      volumeInfo: {
        access: 'readWrite',
        totalSize: 12884901888,
        qos: {
          minIOPS: 5000,
          maxIOPS: 15000,
          burstIOPS: 15000
        },
        createTime: '2016-11-23T14:56:05Z',
        snapshotInfo: null
      }
    },
    {
      volumeID: 9,
      snapshotID: 0,
      parentVirtualVolumeID: '00000000-0000-0000-0000-000000000000',
      virtualVolumeID: '00d85964-65aa-4a69-b21f-aecd80d4b1ed',
      virtualVolumeType: 'data',
      metadata: {
        VMW_GosType: 'centosGuest',
        VMW_VmID: '50267bc4-2b21-d169-b2b4-2a8b029b4fe5',
        VMW_VVolName: 'www-02.ussfcu.org_1.vmdk'
      },
      volumeInfo: {
        access: 'readWrite',
        totalSize: 4294967296,
        qos: {
          minIOPS: 1000,
          maxIOPS: 15000,
          burstIOPS: 15000
        },
        createTime: '2016-11-23T14:56:05Z',
        snapshotInfo: null
      }
    },
    {
      volumeID: 10,
      snapshotID: 0,
      parentVirtualVolumeID: '00000000-0000-0000-0000-000000000000',
      virtualVolumeID: '00d85964-65aa-4a69-b21f-aecd80d4b1ed',
      virtualVolumeType: 'swap',
      metadata: {
        VMW_GosType: 'centosGuest',
        VMW_VmID: '5026e603-01ab-4f47-b72d-bfeb7338e5b4',
        VMW_VVolName: 'VH-ALEX-vSERVICES2-f95ffec6'
      },
      volumeInfo: {
        access: 'readWrite',
        totalSize: 4294967296,
        qos: {
          minIOPS: 500,
          maxIOPS: 1000,
          burstIOPS: 1000
        },
        createTime: '2016-11-23T14:56:05Z',
        snapshotInfo: null
      }
    }  ]
};
