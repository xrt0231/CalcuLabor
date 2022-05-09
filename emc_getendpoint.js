// Load the SDK for JavaScript.
const aws = require('aws-sdk');

// Set the AWS Region.
aws.config.update({region: 'us-west-2'});

// Create the client.
const mediaConvert = new aws.MediaConvert({apiVersion: '2017-08-29'});

exports.handler = async (event, context) => {
  // Create empty request parameters
  const params = {
    MaxResults: 0,
  };

  try {
    const { Endpoints } = await mediaConvert.describeEndpoints(params).promise();
    console.log("Your MediaConvert endpoint is ", Endpoints);
  } catch (err) {
    console.log("MediaConvert Error", err);
  }
}