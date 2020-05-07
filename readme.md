# OTP CI

Commandline utility to check OTP code.

## Usage
```
Usage:
  otpci [OPTIONS] <command> [ARGS]

Options: 
  -c, --counter          Counter for HTOP
  -h, --help             Help
  -m, --method [STRING]  Method for OTP HOTP or TOTP. (Default is TOTP)
  -o, --otp NUMBER       OTP value to be verified. Use with verify command 
  -s, --secret STRING    Secret to be used for OTP generation. Can be set using 
                         OTP_SECRET environment variable. parameter 
                         overrides environment variable 

Commands: 
  generate, verify
```
## Examples

`otpci verify -m HTOP -c 1 -s SECRET -o 123456`

`otpci generate -m HTOP -c 1 -s SECRET`
