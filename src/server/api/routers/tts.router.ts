import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { useTTSWithSelectedModel } from "../services/tts.service";

export const ttsRouter = createTRPCRouter({
  generate: publicProcedure
    .input(
      z.object({
        model: z.string(),
        text: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const audioUrl = await useTTSWithSelectedModel(input.model, input.text);
        return { url: audioUrl };
      } catch (error) {
        console.error("Error generating audio:", error);
        throw new Error("Failed to generate audio");
      }
    }),
});
