const moment = require('moment');

module.exports = {
  "result": {
    "clusterFullPrediction": {
      "clusterID": 1898714,
      "stage3": moment().add({ days: 35, hours: 1 }).utc().format(),
      "stage3Code": {
        "code": "OK",
        "description": "Prediction Successful"
      },
      "stage3Confidence": null,
      "stage4": moment().add({ days: 70, hours: 1 }).utc().format(),
      "stage4Code": {
        "code": "OK",
        "description": "Prediction Successful"
      },
      "stage4Confidence": null,
      "stage5": moment().add({ days: 100, hours: 1 }).utc().format(),
      "stage5Code": {
        "code": "OK",
        "description": "Prediction Successful"
      },
      "stage5Confidence": null,
      "metadata": null,
      "metadataCode": {
        "code": "NO_TREND",
        "description": "No growth trend on cluster"
      },
      "metadataConfidence": null
    }
  }
}
