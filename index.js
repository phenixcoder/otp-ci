#!/usr/bin/env node
const cli = require('cli');
const OTP = require('otp');
const options = {
  counter: ['c', 'Counter for HTOP'],
  help: ['h', 'Help'],
  method: ['m', 'Method for OTP HOTP or TOTP.', 'string', 'TOTP'],
  otp: ['o', 'OTP value to be verified. Use with verify command', 'int'],
  secret: ['s', 'Secret to be used for OTP generation. Can be set using OTP_SECRET environment variable. parameter overrides environment variable', 'string']
}
const params = cli.parse(options, ['generate', 'verify']);
const secret = params.secret ? params.secret : process.env.OTP_SECRET;
if (secret === null || secret === undefined) {
  console.log('ERROR: Secret missing.\n\n');
  cli.getUsage(1);
}

if (params.method === 'HOTP' && params.counter === null) {
  console.log('ERROR: Counter required. HOTP Method selected.\n\n');
  cli.getUsage(1);
}
var otp = new OTP({
  secret: secret
});

const generatedOTP = params.method === 'TOTP' ? otp.totp() : otp.hotp(params.counter);

switch (cli.command) {
  case 'generate':
    if (params.help) {
      cli.getUsage(1);
    } else {
      console.log(generatedOTP);
    }
    break;
  case 'verify':
    if (params.help) {
      cli.getUsage(1);
    } else {

      if (params.otp === null) {
        console.log('ERROR: OTP required.\n\n');
        cli.getUsage(1);
      }
      if (generatedOTP === params.otp.toString()) {
        console.log('OK')
        process.exit(0);
      } else {
        console.log('FAIL');
        process.exit(1);

      }
    }
    break;
  default:
    cli.getUsage(1);
    break;
}


