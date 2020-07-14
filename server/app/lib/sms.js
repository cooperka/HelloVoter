import logger from 'logops';
import { international as phoneFormat } from './phone';

const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN, { 
    lazyLoading: true 
});

module.exports = (to, message) => {
  if (process.env.TWILIO_DISABLE === 'true') {
    return;
  }

  logger.debug(`Sending SMS to ${phoneFormat(to)}: ${message}`)

  return client.messages.create({from: process.env.TWILIO_FROM, to: phoneFormat(to), body: message});
};
