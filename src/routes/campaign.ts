import { Hono } from "hono";
import { z } from "zod";
import { db } from "../lib/db.js";
import { CampaignStatus } from "../lib/generated/prisma-client/index.js";
import { zValidator } from "../lib/validator.js";

export const campaignRoute = new Hono();

// GET /campaigns Fetch all campaigns (excluding DELETED)
campaignRoute.get("/", async (c) => {
  return c.json(
    {
      data: await db.campaign.findMany({
        where: {
          NOT: [
            {
              status: "DELETED",
            },
          ],
        },
      }),
    },
    200
  );
});

// GET /campaigns/:id Fetch a single campaign by ID
campaignRoute.get("/:id", async (c) => {
  const campaign = await db.campaign.findUnique({
    where: {
      id: c.req.param("id"),
    },
  });
  return c.json(
    {
      data: campaign,
    },
    200
  );
});

const newCampaignSchema = z.object({
  name: z.string(),
  description: z.string(),
});

// POST /campaigns Create a new campaign
campaignRoute.post("/", zValidator("json", newCampaignSchema), async (c) => {
  const parsedData = c.req.valid("json");

  const campaign = await db.campaign.create({
    data: {
      ...parsedData,
      status: "ACTIVE",
    },
  });
  return c.json(
    {
      data: campaign,
    },
    201
  );
});

const updateCampaignSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  status: z.nativeEnum(CampaignStatus).optional(),
});

// PUT /campaigns/:id Update campaign details (including status)
campaignRoute.put(
  "/:id",
  zValidator("json", updateCampaignSchema),
  async (c) => {
    const parsedData = c.req.valid("json");

    const campaign = await db.campaign.update({
      where: {
        id: c.req.param("id"),
      },
      data: parsedData,
    });
    return c.json(
      {
        data: campaign,
      },
      200
    );
  }
);

// DELETE /campaigns/:id Soft delete (set status to DELETED)
campaignRoute.delete("/:id", async (c) => {
  const campaign = await db.campaign.update({
    where: {
      id: c.req.param("id"),
    },
    data: {
      status: "DELETED",
    },
  });
  return c.json(
    {
      data: campaign,
    },
    200
  );
});
