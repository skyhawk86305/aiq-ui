module.exports = {
  result: {
    notifications : [
      {
        "notificationID": 379,
        "notificationName": "QE Test Alert - Cluster Fault - Any Code",
        "destinationEmail": "aiqdev@gmail.com",
        "notificationSeverity": "Warning",
        "userID": 400,
        "customerID": 136,
        "clusterID": null,
        "repeatThreshold": null,
        "noInternalClusters": 1,
        "deleteTime": null,
        "username": "aiq_qe_user@solidfire.com",
        "clusterName": null,
        "customerName": "Test Customer AIQ QE",
        "notificationFields": [
          {
            "notificationFieldID": 377,
            "notificationFieldOperator": "*",
            "notificationFieldValue": null,
            "streamFieldID": 40,
            "streamID": 11,
            "streamFieldName": "code",
            "streamFieldType": "string",
            "streamFieldDisplayName": "Fault Code",
            "parentStreamFieldID": 46,
            "parentStreamFieldName": "faults",
            "parentStreamFieldDisplayName": "Faults",
            "parentStreamFieldType": "array",
            "streamName": "ListClusterFaults"
          }
        ],
        "triggeredNotifications": []
      },
      {
        "notificationID": 407,
        "notificationName": "All Cluster Faults",
        "destinationEmail": "aiqdev2@gmail.com",
        "notificationSeverity": "Info",
        "userID": 394,
        "customerID": null,
        "clusterID": null,
        "repeatThreshold": null,
        "noInternalClusters": 1,
        "deleteTime": null,
        "username": "jeff.baziuk@solidfire.com",
        "clusterName": 'a cluster',
        "customerName": 'a customer',
        "notificationFields": [
          {
            "notificationFieldID": 405,
            "notificationFieldOperator": "*",
            "notificationFieldValue": null,
            "streamFieldID": 40,
            "streamID": 11,
            "streamFieldName": "code",
            "streamFieldType": "string",
            "streamFieldDisplayName": "Fault Code",
            "parentStreamFieldID": 46,
            "parentStreamFieldName": "faults",
            "parentStreamFieldDisplayName": "Faults",
            "parentStreamFieldType": "array",
            "streamName": "ListClusterFaults"
          }
        ],
        "triggeredNotifications": []
      },
      {
        "notificationID": 2738,
        "notificationName": "Testing fault notification chain",
        "destinationEmail": "activeiq.email.test+83068dad-f5f5-4e27-b8ae-d83ca5962f78@gmail.com",
        "notificationSeverity": "Warning",
        "userID": 528,
        "customerID": null,
        "clusterID": null,
        "repeatThreshold": null,
        "noInternalClusters": 1,
        "deleteTime": null,
        "username": "aiq_system_tests_admin@solidfire.com",
        "clusterName": null,
        "customerName": null,
        "notificationFields": [
          {
            "notificationFieldID": 2735,
            "notificationFieldOperator": "*",
            "notificationFieldValue": null,
            "streamFieldID": 40,
            "streamID": 11,
            "streamFieldName": "code",
            "streamFieldType": "string",
            "streamFieldDisplayName": "Fault Code",
            "parentStreamFieldID": 46,
            "parentStreamFieldName": "faults",
            "parentStreamFieldDisplayName": "Faults",
            "parentStreamFieldType": "array",
            "streamName": "ListClusterFaults"
          }
        ],
        "triggeredNotifications": []
      },
      {
        "notificationID": 4049,
        "notificationName": "Testing fault notification chain x2",
        "destinationEmail": "email.bucket+8c482afd-1e9a-4e36-bf78-64a087cee227@netapp.test",
        "notificationSeverity": "Warning",
        "userID": 528,
        "customerID": null,
        "clusterID": null,
        "repeatThreshold": null,
        "noInternalClusters": 1,
        "deleteTime": null,
        "username": "aiq_system_tests_admin@solidfire.com",
        "clusterName": null,
        "customerName": null,
        "notificationFields": [
          {
            "notificationFieldID": 4046,
            "notificationFieldOperator": "*",
            "notificationFieldValue": null,
            "streamFieldID": 40,
            "streamID": 11,
            "streamFieldName": "code",
            "streamFieldType": "string",
            "streamFieldDisplayName": "Fault Code",
            "parentStreamFieldID": 46,
            "parentStreamFieldName": "faults",
            "parentStreamFieldDisplayName": "Faults",
            "parentStreamFieldType": "array",
            "streamName": "ListClusterFaults"
          }
        ],
        "triggeredNotifications": []
      },
      {
        "notificationID": 4930,
        "notificationName": "billyjoejack",
        "destinationEmail": "Brad.Katz@solidfire.com; katzbrd@gmail.com",
        "notificationSeverity": "Info",
        "userID": 401,
        "customerID": null,
        "clusterID": null,
        "repeatThreshold": null,
        "noInternalClusters": 1,
        "deleteTime": null,
        "username": "Brad.Katz@solidfire.com",
        "clusterName": null,
        "customerName": null,
        "notificationFields": [
          {
            "notificationFieldID": 4927,
            "notificationFieldOperator": "*",
            "notificationFieldValue": null,
            "streamFieldID": 40,
            "streamID": 11,
            "streamFieldName": "code",
            "streamFieldType": "string",
            "streamFieldDisplayName": "Fault Code",
            "parentStreamFieldID": 46,
            "parentStreamFieldName": "faults",
            "parentStreamFieldDisplayName": "Faults",
            "parentStreamFieldType": "array",
            "streamName": "ListClusterFaults"
          }
        ],
        "triggeredNotifications": []
      }
    ]
  }
};
