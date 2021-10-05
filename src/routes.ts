import express from "express";
import axios from "axios";

const routes = express.Router();

const clientId = "YOUR CLIENT ID";
const clientSecret = "YOUR CLIENT SECRET";

routes.get("/", (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${clientId}`
  );
});

routes.get("/token", (req, res) => {
  let token: any;

  axios
    .post(
      `https://github.com/login/oauth/access_token`,
      {
        client_id: clientId,
        client_secret: clientSecret,
        code: req.query.code,
      },
      {
        headers: { accept: "application/json" },
      }
    )
    .then((res) => (token = res.data["access_token"]))
    .then(() => res.json({ Token: token }))
    .catch((err) => res.status(500).json({ message: err.message }));
});

export default routes;
