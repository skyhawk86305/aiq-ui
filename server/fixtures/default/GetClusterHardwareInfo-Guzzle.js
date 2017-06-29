module.exports = {
  "clusterHardwareInfo": {
    "nodes": {
      "1": {
        "uuid": "4C4C4544-0048-4710-8059-C7C04F395931",
        "network": {
          "network:3_PCI:0000:01:00.3": {
            "product": "NetXtreme II BCM57800 1/10 Gigabit Ethernet",
            "capacity": "1000000000",
            "description": "Ethernet interface",
            "clock": "33000000",
            "logicalname": "eth3",
            "vendor": "Broadcom Corporation",
            "width": "64",
            "version": "10",
            "physid": "0.3",
            "serial": "b8:ca:3a:f5:07:3c",
            "businfo": "pci@0000:01:00.3"
          },
          "network:0_PCI:0000:01:00.0": {
            "product": "NetXtreme II BCM57800 1/10 Gigabit Ethernet",
            "capacity": "1000000000",
            "description": "Ethernet interface",
            "clock": "33000000",
            "logicalname": "eth0",
            "vendor": "Broadcom Corporation",
            "width": "64",
            "version": "10",
            "physid": "0",
            "serial": "b8:ca:3a:f5:07:36",
            "businfo": "pci@0000:01:00.0"
          },
          "network:2_PCI:0000:01:00.2": {
            "product": "NetXtreme II BCM57800 1/10 Gigabit Ethernet",
            "capacity": "1000000000",
            "description": "Ethernet interface",
            "clock": "33000000",
            "logicalname": "eth2",
            "vendor": "Broadcom Corporation",
            "width": "64",
            "version": "10",
            "physid": "0.2",
            "serial": "b8:ca:3a:f5:07:3a",
            "businfo": "pci@0000:01:00.2"
          },
          "network:1_PCI:0000:01:00.1": {
            "product": "NetXtreme II BCM57800 1/10 Gigabit Ethernet",
            "capacity": "1000000000",
            "description": "Ethernet interface",
            "clock": "33000000",
            "logicalname": "eth1",
            "vendor": "Broadcom Corporation",
            "width": "64",
            "version": "10",
            "physid": "0.1",
            "serial": "b8:ca:3a:f5:07:38",
            "businfo": "pci@0000:01:00.1"
          },
          "network:0_": {
            "physid": "1",
            "serial": "b8:ca:3a:f5:07:3a",
            "logicalname": "Bond1G",
            "description": "Ethernet interface"
          },
          "network:1_": {
            "physid": "2",
            "serial": "b8:ca:3a:f5:07:36",
            "logicalname": "Bond10G",
            "description": "Ethernet interface"
          }
        },
        "platform": {
          "nodeType": "SF3010",
          "cpuModel": "Intel(R) Xeon(R) CPU E5-2640 0 @ 2.50GHz",
          "nodeMemoryGB": 72,
          "chassisType": "R620"
        },
        "bus": {
          "core_DMI:0200": {
            "product": "0H47HH",
            "vendor": "SolidFire",
            "description": "Motherboard",
            "version": "A04",
            "physid": "0",
            "serial": "..CN7475138M0435."
          }
        },
        "fibreChannelPorts": [],
        "powerSupplies": {
          "PS1 status": {
            "powerSupplyFailureDetected": false,
            "powerSupplyHasAC": true,
            "powerSupplyPresent": true,
            "powerSupplyPredictiveFailureDetected": false
          },
          "PS2 status": {
            "powerSupplyFailureDetected": false,
            "powerSupplyHasAC": true,
            "powerSupplyPresent": true,
            "powerSupplyPredictiveFailureDetected": false
          }
        },
        "storage": {
          "storage_PCI:0000:41:00.0": {
            "product": "SAS2008 PCI-Express Fusion-MPT SAS-2 [Falcon]",
            "vendor": "LSI Logic / Symbios Logic",
            "description": "Serial Attached SCSI controller",
            "clock": "33000000",
            "width": "64",
            "version": "03",
            "physid": "0",
            "businfo": "pci@0000:41:00.0"
          },
          "storage_PCI:0000:04:00.0": {
            "product": "Marvell Technology Group Ltd.",
            "vendor": "Marvell Technology Group Ltd.",
            "description": "RAID bus controller",
            "clock": "33000000",
            "width": "64",
            "version": "a1",
            "physid": "0",
            "businfo": "pci@0000:04:00.0"
          },
          "storage_PCI:0000:00:1f.2": {
            "product": "C600/X79 series chipset 6-Port SATA AHCI Controller",
            "vendor": "Intel Corporation",
            "description": "SATA controller",
            "clock": "66000000",
            "width": "32",
            "version": "05",
            "physid": "1f.2",
            "businfo": "pci@0000:00:1f.2"
          }
        },
        "system": {
          "cm-sf1_DMI:0100": {
            "width": "64",
            "product": "SFx010 (SKU=NotProvided;ModelName=SFx010)",
            "vendor": "SolidFire",
            "description": "Rack Mount Chassis",
            "serial": "GHGY9Y1"
          }
        },
        "nvram": {
          "status": {
            "supercapDischarge": "Off",
            "writeReady": "Yes",
            "supercapCharging": "Yes",
            "ssdConnected": "Yes",
            "supercapConnected": "Yes",
            "onlineHealthCheck": "Yes",
            "flags": "0000151E",
            "dataState": "Dirty",
            "dataValid": "Yes",
            "hostDma": "Initialized"
          },
          "firmwareUptime": {"calendarTime": "2017-01-22 22:29:11", "time": "549 days 17:11:21"},
          "temperature": {
            "current": "46 C",
            "average": "46 C",
            "minimum": "46 C",
            "alertTemperature": "65 C",
            "maximum": "48 C"
          },
          "versions": {
            "eepromRevision": "13",
            "firmware": "1.7.0 | 04/08/12-19:12:24",
            "boardRevision": "3.5",
            "ddrConfigurationRevision": "9",
            "driver": "1.7.2",
            "ssdFirmware": "3F0VGWAM"
          },
          "serialNumbers": {"device": "SFR2011080500076"},
          "supercap": {
            "status": "Charging",
            "maximumVoltage": "5296 mV",
            "designCap": "68 F",
            "trimVoltage": "54 mV",
            "currentCharge": "4979 mV",
            "chargePercent": "100",
            "capacitancePercent": "83.82",
            "minimumVoltage": "4580 mV",
            "capacitance": "57 F",
            "health": "Good",
            "nextHealthCheck": "2017-01-26 19:17:15",
            "expectedCharge": "4940 mV"
          },
          "backupLog": {
            "backupEnd": "40 s",
            "progress0Percent": "0 s (minIOTime: 7950 us, maxIOTime: 9720 us)",
            "supercapDuration": "56 s",
            "backupStatus": "Completed",
            "supercapStartVoltage": "4692 mV",
            "ssdFlushTime": "40 s",
            "progress25Percent": "10 s (minIOTime: 7950 us, maxIOTime: 9810 us)",
            "dramSingleBitErrors": "0",
            "progress50Percent": "20 s (minIOTime: 7920 us, maxIOTime: 9810 us)",
            "supercapEndVoltage": "3025 mV",
            "ioErrorCount": "0",
            "progress75Percent": "30 s (minIOTime: 7980 us, maxIOTime: 9810 us)",
            "dramMultiBitErrors": "0",
            "dramOffset": "8192 MB"
          },
          "dram": {
            "size": "8388608 KB",
            "multiBitErrors": "0",
            "singleBitErrors": "0",
            "usableSize": "8388600 KB",
            "memoryTest": "Passed"
          },
          "ssd": {
            "status": "Connected",
            "programErrorCount": "0",
            "eraseErrorCount": "0",
            "defectiveBlocks": "0 (8MB each)",
            "averageEraseCount": "34"
          },
          "clockSettings": {"ddr": "165 MHz", "socCPU": "495 MHz", "internalBus": "250 MHz"},
          "events": {"unread": "680"}
        },
        "fans": {
          "Fan2B RPM": {"threshold": 840, "baseUnit": "RPM", "value": 4080},
          "Fan7B RPM": {"threshold": 840, "baseUnit": "RPM", "value": 4200},
          "Fan4A RPM": {"threshold": 840, "baseUnit": "RPM", "value": 4440},
          "Fan3A RPM": {"threshold": 840, "baseUnit": "RPM", "value": 4440},
          "Fan1B RPM": {"threshold": 840, "baseUnit": "RPM", "value": 4080},
          "Fan5A RPM": {"threshold": 840, "baseUnit": "RPM", "value": 4320},
          "Fan6A RPM": {"threshold": 840, "baseUnit": "RPM", "value": 4320},
          "Fan7A RPM": {"threshold": 840, "baseUnit": "RPM", "value": 4320},
          "Fan2A RPM": {"threshold": 840, "baseUnit": "RPM", "value": 4320},
          "Fan3B RPM": {"threshold": 840, "baseUnit": "RPM", "value": 4200},
          "Fan4B RPM": {"threshold": 840, "baseUnit": "RPM", "value": 4080},
          "Fan5B RPM": {"threshold": 840, "baseUnit": "RPM", "value": 4080},
          "Fan1A RPM": {"threshold": 840, "baseUnit": "RPM", "value": 4440},
          "Fan6B RPM": {"threshold": 840, "baseUnit": "RPM", "value": 4080}
        },
        "temperatures": {
          "Exhaust Temp": {"threshold": 70, "baseUnit": "C", "value": 45},
          "Inlet Temp": {"threshold": 42, "baseUnit": "C", "value": 22}
        },
        "memory": {
          "memory_DMI:1000": {
            "slot": "System board or motherboard",
            "physid": "1000",
            "description": "System Memory",
            "size": "77309411328"
          },
          "firmware_": {
            "capacity": "8323072",
            "description": "BIOS",
            "vendor": "SolidFire",
            "version": "2.0.19",
            "date": "08/29/2013",
            "physid": "0",
            "size": "65536"
          }
        },
        "networkInterfaces": {
          "Bond1G": {"isUp": false, "isConfigured": false},
          "Bond10G": {"isUp": true, "isConfigured": true},
          "eth3": {"isUp": false, "isConfigured": false},
          "eth2": {"isUp": false, "isConfigured": false},
          "eth1": {"isUp": true, "isConfigured": true},
          "eth0": {"isUp": true, "isConfigured": true}
        }
      },
      "2": {
        "uuid": "4C4C4544-0048-3910-8056-C7C04F395931",
        "network": {
          "network:3_PCI:0000:01:00.3": {
            "product": "NetXtreme II BCM57800 1/10 Gigabit Ethernet",
            "capacity": "1000000000",
            "description": "Ethernet interface",
            "clock": "33000000",
            "logicalname": "eth3",
            "vendor": "Broadcom Corporation",
            "width": "64",
            "version": "10",
            "physid": "0.3",
            "serial": "b8:ca:3a:f5:04:d7",
            "businfo": "pci@0000:01:00.3"
          },
          "network:0_PCI:0000:01:00.0": {
            "product": "NetXtreme II BCM57800 1/10 Gigabit Ethernet",
            "capacity": "1000000000",
            "description": "Ethernet interface",
            "clock": "33000000",
            "logicalname": "eth0",
            "vendor": "Broadcom Corporation",
            "width": "64",
            "version": "10",
            "physid": "0",
            "serial": "b8:ca:3a:f5:04:d1",
            "businfo": "pci@0000:01:00.0"
          },
          "network:2_PCI:0000:01:00.2": {
            "product": "NetXtreme II BCM57800 1/10 Gigabit Ethernet",
            "capacity": "1000000000",
            "description": "Ethernet interface",
            "clock": "33000000",
            "logicalname": "eth2",
            "vendor": "Broadcom Corporation",
            "width": "64",
            "version": "10",
            "physid": "0.2",
            "serial": "b8:ca:3a:f5:04:d5",
            "businfo": "pci@0000:01:00.2"
          },
          "network:1_PCI:0000:01:00.1": {
            "product": "NetXtreme II BCM57800 1/10 Gigabit Ethernet",
            "capacity": "1000000000",
            "description": "Ethernet interface",
            "clock": "33000000",
            "logicalname": "eth1",
            "vendor": "Broadcom Corporation",
            "width": "64",
            "version": "10",
            "physid": "0.1",
            "serial": "b8:ca:3a:f5:04:d3",
            "businfo": "pci@0000:01:00.1"
          },
          "network:0_": {
            "physid": "1",
            "serial": "b8:ca:3a:f5:04:d5",
            "logicalname": "Bond1G",
            "description": "Ethernet interface"
          },
          "network:1_": {
            "physid": "2",
            "serial": "b8:ca:3a:f5:04:d1",
            "logicalname": "Bond10G",
            "description": "Ethernet interface"
          }
        },
        "platform": {
          "nodeType": "SF3010",
          "cpuModel": "Intel(R) Xeon(R) CPU E5-2640 0 @ 2.50GHz",
          "nodeMemoryGB": 72,
          "chassisType": "R620"
        },
        "bus": {
          "core_DMI:0200": {
            "product": "0H47HH",
            "vendor": "SolidFire",
            "description": "Motherboard",
            "version": "A04",
            "physid": "0",
            "serial": "..CN7475138M0305."
          }
        },
        "fibreChannelPorts": [],
        "powerSupplies": {
          "PS1 status": {
            "powerSupplyFailureDetected": false,
            "powerSupplyHasAC": true,
            "powerSupplyPresent": true,
            "powerSupplyPredictiveFailureDetected": false
          },
          "PS2 status": {
            "powerSupplyFailureDetected": false,
            "powerSupplyHasAC": true,
            "powerSupplyPresent": true,
            "powerSupplyPredictiveFailureDetected": false
          }
        },
        "storage": {
          "storage_PCI:0000:41:00.0": {
            "product": "SAS2008 PCI-Express Fusion-MPT SAS-2 [Falcon]",
            "vendor": "LSI Logic / Symbios Logic",
            "description": "Serial Attached SCSI controller",
            "clock": "33000000",
            "width": "64",
            "version": "03",
            "physid": "0",
            "businfo": "pci@0000:41:00.0"
          },
          "storage_PCI:0000:04:00.0": {
            "product": "Marvell Technology Group Ltd.",
            "vendor": "Marvell Technology Group Ltd.",
            "description": "RAID bus controller",
            "clock": "33000000",
            "width": "64",
            "version": "a1",
            "physid": "0",
            "businfo": "pci@0000:04:00.0"
          },
          "storage_PCI:0000:00:1f.2": {
            "product": "C600/X79 series chipset 6-Port SATA AHCI Controller",
            "vendor": "Intel Corporation",
            "description": "SATA controller",
            "clock": "66000000",
            "width": "32",
            "version": "05",
            "physid": "1f.2",
            "businfo": "pci@0000:00:1f.2"
          }
        },
        "system": {
          "cm-sf2_DMI:0100": {
            "width": "64",
            "product": "SFx010 (SKU=NotProvided;ModelName=SFx010)",
            "vendor": "SolidFire",
            "description": "Rack Mount Chassis",
            "serial": "GH9V9Y1"
          }
        },
        "nvram": {
          "status": {
            "supercapDischarge": "Off",
            "writeReady": "Yes",
            "supercapCharging": "Yes",
            "ssdConnected": "Yes",
            "supercapConnected": "Yes",
            "onlineHealthCheck": "Yes",
            "flags": "0000151E",
            "dataState": "Dirty",
            "dataValid": "Yes",
            "hostDma": "Initialized"
          },
          "firmwareUptime": {"calendarTime": "2017-01-22 22:28:13", "time": "590 days 19:50:26"},
          "temperature": {
            "current": "45 C",
            "average": "46 C",
            "minimum": "45 C",
            "alertTemperature": "65 C",
            "maximum": "48 C"
          },
          "versions": {
            "eepromRevision": "13",
            "firmware": "1.7.0 | 04/08/12-19:12:24",
            "boardRevision": "3.5",
            "ddrConfigurationRevision": "9",
            "driver": "1.7.2",
            "ssdFirmware": "3F0VGWAM"
          },
          "serialNumbers": {"device": "SFR2011100401045"},
          "supercap": {
            "status": "Charging",
            "maximumVoltage": "5332 mV",
            "designCap": "68 F",
            "trimVoltage": "18 mV",
            "currentCharge": "4762 mV",
            "chargePercent": "100",
            "capacitancePercent": "92.64",
            "minimumVoltage": "4592 mV",
            "capacitance": "63 F",
            "health": "Good",
            "nextHealthCheck": "2017-01-26 04:49:31",
            "expectedCharge": "4760 mV"
          },
          "backupLog": {
            "backupEnd": "39 s",
            "progress0Percent": "0 s (minIOTime: 8070 us, maxIOTime: 9300 us)",
            "supercapDuration": "53 s",
            "backupStatus": "Completed",
            "supercapStartVoltage": "4677 mV",
            "ssdFlushTime": "39 s",
            "progress25Percent": "9 s (minIOTime: 8070 us, maxIOTime: 8220 us)",
            "dramSingleBitErrors": "0",
            "progress50Percent": "19 s (minIOTime: 7920 us, maxIOTime: 9480 us)",
            "supercapEndVoltage": "2944 mV",
            "ioErrorCount": "0",
            "progress75Percent": "29 s (minIOTime: 7950 us, maxIOTime: 9480 us)",
            "dramMultiBitErrors": "0",
            "dramOffset": "8192 MB"
          },
          "dram": {
            "size": "8388608 KB",
            "multiBitErrors": "0",
            "singleBitErrors": "0",
            "usableSize": "8388600 KB",
            "memoryTest": "Passed"
          },
          "ssd": {
            "status": "Connected",
            "programErrorCount": "0",
            "eraseErrorCount": "0",
            "defectiveBlocks": "0 (8MB each)",
            "averageEraseCount": "35"
          },
          "clockSettings": {"ddr": "165 MHz", "socCPU": "495 MHz", "internalBus": "250 MHz"},
          "events": {"unread": "680"}
        },
        "fans": {
          "Fan2B RPM": {"threshold": 840, "baseUnit": "RPM", "value": 3840},
          "Fan7B RPM": {"threshold": 840, "baseUnit": "RPM", "value": 3960},
          "Fan4A RPM": {"threshold": 840, "baseUnit": "RPM", "value": 4080},
          "Fan3A RPM": {"threshold": 840, "baseUnit": "RPM", "value": 4080},
          "Fan1B RPM": {"threshold": 840, "baseUnit": "RPM", "value": 3840},
          "Fan5A RPM": {"threshold": 840, "baseUnit": "RPM", "value": 4320},
          "Fan6A RPM": {"threshold": 840, "baseUnit": "RPM", "value": 4200},
          "Fan7A RPM": {"threshold": 840, "baseUnit": "RPM", "value": 4320},
          "Fan2A RPM": {"threshold": 840, "baseUnit": "RPM", "value": 4080},
          "Fan3B RPM": {"threshold": 840, "baseUnit": "RPM", "value": 3840},
          "Fan4B RPM": {"threshold": 840, "baseUnit": "RPM", "value": 3720},
          "Fan5B RPM": {"threshold": 840, "baseUnit": "RPM", "value": 4080},
          "Fan1A RPM": {"threshold": 840, "baseUnit": "RPM", "value": 4200},
          "Fan6B RPM": {"threshold": 840, "baseUnit": "RPM", "value": 3960}
        },
        "temperatures": {
          "Exhaust Temp": {"threshold": 70, "baseUnit": "C", "value": 41},
          "Inlet Temp": {"threshold": 42, "baseUnit": "C", "value": 20}
        },
        "memory": {
          "memory_DMI:1000": {
            "slot": "System board or motherboard",
            "physid": "1000",
            "description": "System Memory",
            "size": "77309411328"
          },
          "firmware_": {
            "capacity": "8323072",
            "description": "BIOS",
            "vendor": "SolidFire",
            "version": "2.0.19",
            "date": "08/29/2013",
            "physid": "0",
            "size": "65536"
          }
        },
        "networkInterfaces": {
          "Bond1G": {"isUp": false, "isConfigured": false},
          "Bond10G": {"isUp": true, "isConfigured": true},
          "eth3": {"isUp": false, "isConfigured": false},
          "eth2": {"isUp": false, "isConfigured": false},
          "eth1": {"isUp": true, "isConfigured": true},
          "eth0": {"isUp": true, "isConfigured": true}
        }
      }
    },
    "drives": {
      "56": {
        "product": "INTEL SSDSC2BB300G4",
        "logicalname": "/dev/sdi",
        "description": "ATA      Drive",
        "driveSecurityFrozen": false,
        "devpath": "/dev/disk/by-id/scsi-SATA_INTEL_SSDSC2BB3BTWL331500C9300PGN",
        "uuid": "84616bbc-8373-af90-7b09-425f2c437ff5",
        "dev": "8:128",
        "securityFeatureSupported": true,
        "driveSecurityLocked": false,
        "securityFeatureEnabled": false,
        "version": "D2010350",
        "serial": "BTWL331500C9300PGN",
        "size": 300069052416,
        "driveSecurityAtMaximum": false
      },
      "42": {
        "product": "INTEL SSDSC2BB300G4",
        "logicalname": "/dev/sdg",
        "description": "ATA      Drive",
        "driveSecurityFrozen": false,
        "devpath": "/dev/disk/by-id/scsi-SATA_INTEL_SSDSC2BB3BTWL3315066E300PGN",
        "uuid": "8473745f-5b98-d42b-1a59-3921479689b9",
        "dev": "8:96",
        "securityFeatureSupported": true,
        "driveSecurityLocked": false,
        "securityFeatureEnabled": false,
        "version": "D2010350",
        "serial": "BTWL3315066E300PGN",
        "size": 300069052416,
        "driveSecurityAtMaximum": false
      },
      "43": {
        "product": "INTEL SSDSC2BB300G4",
        "logicalname": "/dev/sdh",
        "description": "ATA      Drive",
        "driveSecurityFrozen": false,
        "devpath": "/dev/disk/by-id/scsi-SATA_INTEL_SSDSC2BB3BTWL3315078H300PGN",
        "uuid": "ffd24959-1248-11ef-e3bf-e0874bcb9a7e",
        "dev": "8:112",
        "securityFeatureSupported": true,
        "driveSecurityLocked": false,
        "securityFeatureEnabled": false,
        "version": "D2010350",
        "serial": "BTWL3315078H300PGN",
        "size": 300069052416,
        "driveSecurityAtMaximum": false
      },
      "61": {
        "product": "VRFSD3400GNCVMTJS1",
        "logicalname": "/dev/sda",
        "description": "ATA      Drive",
        "driveSecurityFrozen": true,
        "devpath": "/dev/disk/by-id/scsi-SATA_VRFSD3400GNCVMT205044037-part4",
        "uuid": "caedf211-4dc5-1f1a-6aaa-84181292ffbe",
        "dev": "8:0",
        "securityFeatureSupported": true,
        "driveSecurityLocked": false,
        "securityFeatureEnabled": false,
        "version": "515ABBF0",
        "serial": "205044037",
        "size": 300000739328,
        "driveSecurityAtMaximum": false
      },
      "62": {
        "product": "VRFSD3400GNCVMTJS1",
        "logicalname": "/dev/sda",
        "description": "ATA      Drive",
        "driveSecurityFrozen": true,
        "devpath": "/dev/disk/by-id/scsi-SATA_VRFSD3400GNCVMT205043968-part4",
        "uuid": "df95cf78-d2ef-59fb-b238-6dc0312449e4",
        "dev": "8:0",
        "securityFeatureSupported": true,
        "driveSecurityLocked": false,
        "securityFeatureEnabled": false,
        "version": "515ABBF0",
        "serial": "205043968",
        "size": 300000739328,
        "driveSecurityAtMaximum": false
      },
      "63": {
        "product": "VRFSD3400GNCVMTJS1",
        "logicalname": "/dev/sda",
        "description": "ATA      Drive",
        "driveSecurityFrozen": true,
        "devpath": "/dev/disk/by-id/scsi-SATA_VRFSD3400GNCVMT205043963-part4",
        "uuid": "96f0aeee-062a-ceff-04f3-2cb422551434",
        "dev": "8:0",
        "securityFeatureSupported": true,
        "driveSecurityLocked": false,
        "securityFeatureEnabled": false,
        "version": "515ABBF0",
        "serial": "205043963",
        "size": 300000739328,
        "driveSecurityAtMaximum": false
      },
      "8": null,
      "11": {
        "product": "VRFSD3400GNCVMTJS1",
        "logicalname": "/dev/sda",
        "description": "ATA      Drive",
        "driveSecurityFrozen": true,
        "devpath": "/dev/disk/by-id/scsi-SATA_VRFSD3400GNCVMT205044014-part4",
        "uuid": "9ea09067-f44b-9b6b-cc21-7c5ec61f8e04",
        "dev": "8:0",
        "securityFeatureSupported": true,
        "driveSecurityLocked": false,
        "securityFeatureEnabled": false,
        "version": "515ABBF0",
        "serial": "205044014",
        "size": 300000739328,
        "driveSecurityAtMaximum": false
      },
      "12": {
        "product": "VRFSD3400GNCVMTJS1",
        "logicalname": "/dev/sda",
        "description": "ATA      Drive",
        "driveSecurityFrozen": true,
        "devpath": "/dev/disk/by-id/scsi-SATA_VRFSD3400GNCVMT205044014-part4",
        "uuid": "9ea09067-f44b-9b6b-cc21-7c5ec61f8e04",
        "dev": "8:0",
        "securityFeatureSupported": true,
        "driveSecurityLocked": false,
        "securityFeatureEnabled": false,
        "version": "515ABBF0",
        "serial": "205044014",
        "size": 300000739328,
        "driveSecurityAtMaximum": false
      }
    }
  }
};
