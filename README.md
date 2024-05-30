# Poshti js sdk


## Instructions


### Make your poshti instance
```ts
import { Poshti, USER_ROLES } from "poshti";


let poshti = new Poshti({ params: { pid: "<YOUR_POSHTI_ID>" } });
// default `userRole` is USER_ROLES.publicUser

//  In case you need to connect to poshti as admin user
poshti = new Poshti({
  userRole: USER_ROLES.admin,
  params: {
    auth: "<YOUR_ADMIN_TOKEN>",
    pid: "<YOUR_POSHTI_ID>",
  },
});

//  In case you need to connect to poshti as end user
poshti = new Poshti({
  userRole: USER_ROLES.endUser,
  params: {
    auth: "<YOUR_AUTHENTICATION_TOKEN>",
    pid: "<YOUR_POSHTI_IDÎ>",
    channel: "<CHANNEL_YOU_WANT_TO_JOIN>",
  },
});
```


### Connection establishment

```ts
// optionally add your event listeners
poshti.onError((e) => console.log("Poshti Socket Connection Error", e));
poshti.onError(sendPoshtiSocketConnectionErrorsToSentry);
poshti.onClose((e) => console.log("Socket Connection Drop", e));

// connect to poshti
poshti.connect();

// create channel
const channel = public_user.channel(config.channel_name);
// join the channel
channel
  .join()
  .receive("ok", ({ messages }) => console.log("catching up", messages))
  .receive("error", ({ reason }) => console.log("failed join", reason))
  .receive("timeout", () => console.log("Networking issue. Still waiting..."));

// send message via internal socket
const topic = "<YOU_MESSAGE_TOPIC>";
const payload = { custom: "any payload you want to send" };
channel
  .push(topic, payload)
  .receive("ok", (payload) => console.log("replied:", payload))
  .receive("error", (err) => console.log("errored", err))
  .receive("timeout", () => console.log("pushing"));
```