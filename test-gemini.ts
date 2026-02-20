import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";

async function main() {
  try {
    const result = await generateObject({
      model: google("gemini-1.5-flash"),
      prompt: "What is the most likely dish: squirrel fish or hot oil eel? Query: I like sweet and sour fish.",
      schema: z.object({
        dish: z.string(),
      }),
    });
    console.log(result.object);
  } catch (e) {
    console.error(e);
  }
}
main();
