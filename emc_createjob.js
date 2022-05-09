var params = {
  "Queue": "arn:aws:mediaconvert:us-east-1:036146218632:queues/Default",
  "Role": "arn:aws:iam::036146218632:role/service-role/MediaConvert_Default_Role",
  "Settings": {
    "TimecodeConfig": {
      "Source": "ZEROBASED"
    },
    "OutputGroups": [
      {
        "Name": "Apple HLS",
        "Outputs": [
          {
            "ContainerSettings": {
              "Container": "M3U8",
              "M3u8Settings": {}
            },
            "AudioDescriptions": [
              {
                "AudioSourceName": "Audio Selector 1",
                "CodecSettings": {
                  "Codec": "AAC",
                  "AacSettings": {
                    "Bitrate": 96000,
                    "CodingMode": "CODING_MODE_2_0",
                    "SampleRate": 48000
                  }
                }
              }
            ],
            "OutputSettings": {
              "HlsSettings": {}
            },
            "NameModifier": "convertedFile"
          }
        ],
        "OutputGroupSettings": {
          "Type": "HLS_GROUP_SETTINGS",
          "HlsGroupSettings": {
            "SegmentLength": 10,
            "Destination": "s3://calculabor/",
            "MinSegmentLength": 0
          }
        }
      }
    ],
    "Inputs": [
      {
        "AudioSelectors": {
          "Audio Selector 1": {
            "DefaultSelection": "DEFAULT"
          }
        },
        "VideoSelector": {},
        "TimecodeSource": "ZEROBASED",
        "FileInput": "s3://calculabor/1643966934835-665659669.766082.mp4"
      }
    ]
  },
  "AccelerationSettings": {
    "Mode": "DISABLED"
  },
  "StatusUpdateInterval": "SECONDS_60",
  "Priority": 0
}