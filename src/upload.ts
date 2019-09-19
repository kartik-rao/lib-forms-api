import _AWS from 'aws-sdk';
import XRay from 'aws-xray-sdk';
const AWS = XRay.captureAWS(_AWS);