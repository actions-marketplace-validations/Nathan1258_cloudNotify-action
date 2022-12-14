const request = require("request");
const fs = require("fs");
const API_URL = `https://cloud-notify.ellisn.com/api/notify?`;

const eventPayload = JSON.parse(
  fs.readFileSync(process.env.GITHUB_EVENT_PATH, "utf8")
);

const message = {
  body: process.env.MESSAGE || "No message specified",
  title:
    process.env.TITLE ||
    `GitHub Notification from ${process.env.GITHUB_REPOSITORY}`,
};

if (!process.env.TOKEN) {
  return console.error("CLOUD_NOTIFY_API_TOKEN is missing");
}

if (!process.env.USERID) {
  return console.error("CLOUD_NOTIFY_USERID_KEY is missing");
}

const newURLString = `${API_URL}userID=${process.env.USERID}&token=${process.env.TOKEN}&title=${message.title}&body=${message.body}`;
const newURL = encodeURI(newURLString.trim());

request(
  {
    url: newURL,
    method: "GET",
  },
  (err, response) => {
    if (err) {
      return console.error(err.toString());
    }
    console.log("Notification sent! Response from server: ", response.body);
  }
);
