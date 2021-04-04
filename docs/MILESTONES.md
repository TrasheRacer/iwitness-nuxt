# Milestones

## Minimum viable product

- Uses GitHub repo as remote
- Depends on yarn with the global package @vue/cli-service
- Completely functional website but with only basic styling
- Every page fully responsive for personal computer & mobile device
- Hosted locally and accessible to other devices on the LAN
- Persistance via local Postgres database exposed thru REST endpoints

### Key features

#### User authentication/authorisation

- Login with username and password
- Register with username and email
- Receive password via email

#### Panic button: broadcast SOS messages to provided contacts

- Configure contacts as phone-number/email
- Trigger SOS with default options:
  - Display safeword
  - Begin streaming audio from client to server
  - Sent a message to every contact
  - SOS messages contain link to streamed content
- Additional config may also be used:
  - Stream device location in addition to audio.
  - Capture from device at every interval (provided) and upload
- Enter safeword to terminate broadcast
- Manage recorded data

  - Access audio (and location/photo) for each broadcast
  - Data which is older than some preset limit may be deleted
  - Display interactive space-time map of broadcast events

  #### iOS shortcut: download link with setup instructions

- Offers equivalent functionality by running native iOS commands
- Available only to authenticated users
- Installed by opening iCloud link from supported Apple device
- Two-step initialisation process:
  - Set username
  - Set access token (provided along with link)

### User stories

The expected difficulty of each US is estimated as follows

- 1: minor changes to either client or server which touches only one or two few files
- 2: changes to either client or server which touches only a few files
- 3: changes to multiple files in client and/or server which should be technically straightforward
- 5: changes to multiple files in client and/or server which may be technically complex
- 8: major changes to multiple files in client and/or server which require in-depth technical planning

Global IDs for pages & buttons: `$entity-$action` / `$entity-$action-success` / `$entity-$action-error`.
For example:

- `user-register`
- `user-register-success`
- `user-register-error`

#### [2] ~~Displays status of server in home page~~

#### [2] Displays total number of users in home page

- Create a Postgres database with a `users` table
- Expose table via a `users` endpoint
- Hit it from the home page then show the number of results

#### [3] Displays username in home page with successful auth

- Create an `auth` table which stores tokens for authenticated users
- Expose the `users` table via a `user/$username` endpoint
- Authenticate by checking auth token in header against database

#### [3] First-time user registration

1. Click button on home page
2. Launch user-register page
3. Provide email address not already present in database
4. Create unverified user with given email, unique username
5. Send verification link via email
6. Launch user-register-success page
7. Display prompt to check inbox

#### [3] Post-registration user verification

1. Click button in verification email
2. Launch user-verify page for given email address
3. Check that an unverified user with the given email exists in database
4. Load user-verify-error page if no such unverified user exists
5. Load user-verify-success page if otherwise.
6. Display username.

#### [3] Post-verification user login

1. Click button on user-verify-success page
2. Launch user-login page
3. Provide username then submit
4. Load user-login-error page if no such verified user exists.
5. Send one-time passcode via email if otherwise
6. Load user-auth page

#### [3] Post-login user authentication/authorisation

1. Provide passcode from login email
2. Load user-auth-error if passcode is incorrect.
3. Load user-auth-success otherwise.
4. Set auth cookie for user
5. Redirect to home page
