module.exports = {
  "virtualNetworks": [
    {
      "addressBlocks": [
        {
          "available": "11111111111111110000",
          "size": 20,
          "start": "10.10.10.2"
        }
      ],
      "attributes": {
        "description": ""
      },
      "gateway": "0.0.0.0",
      "name": "Intervision",
      "namespace": false,
      "netmask": "255.255.255.0",
      "svip": "10.10.10.1",
      "virtualNetworkID": 3,
      "virtualNetworkTag": 30
    },
    {
      "addressBlocks": [
        {
          "available": "1111100100",
          "size": 10,
          "start": "123.123.123.100"
        }
      ],
      "attributes": null,
      "gateway": "123.123.123.1",
      "name": "thtest1234",
      "namespace": true,
      "netmask": "255.255.255.0",
      "svip": "123.123.123.10",
      "virtualNetworkID": 5,
      "virtualNetworkTag": 1234
    },
    {
      "addressBlocks": [
        {
          "available": "111111100100",
          "size": 12,
          "start": "192.168.2.10"
        }
      ],
      "attributes": null,
      "gateway": "0.0.0.0",
      "name": "TheGreatVLAN",
      "namespace": true,
      "netmask": "255.255.255.0",
      "svip": "192.168.2.5",
      "virtualNetworkID": 7,
      "virtualNetworkTag": 59
    }
  ]
};
