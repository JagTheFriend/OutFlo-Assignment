import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { campaignRoute } from "./routes/campaign.js";

const app = new Hono();

app.route("/campaign", campaignRoute);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
