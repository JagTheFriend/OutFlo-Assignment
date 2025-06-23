import { Hono } from "hono";
import OpenAI from "openai";
import z from "zod";
import { zValidator } from "../lib/validator.js";

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export const personalizedMessage = new Hono();

const personalizedMessageSchema = z.object({
  name: z.string(),
  job_title: z.string(),
  company: z.string(),
  location: z.string(),
  summary: z.string(),
});

// POST /personalized-message Create a personalized LinkedIn message
personalizedMessage.post(
  "/",
  zValidator("json", personalizedMessageSchema),
  async (c) => {
    const { name, job_title, company, location, summary } = c.req.valid("json");

    const completion = await openai.chat.completions.create({
      model: "google/gemma-3n-e4b-it:free",
      messages: [
        {
          role: "user",
          content: `Assume that you work as a recruiter on behalf of a company. Create a personalized LinkedIn message for ${name}, who is a ${job_title} at ${company}. The message should be written in a professional tone and include their location (${location}) and a brief summary of their work experience (${summary}). Don't include reasoning, only include the message.`,
        },
      ],
    });

    console.log(completion.choices[0]);

    return c.json(
      {
        data: completion.choices?.shift()?.message.content,
      },
      200
    );
  }
);
