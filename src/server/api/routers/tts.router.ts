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
      const audioUrl = await useTTSWithSelectedModel(input.model, input.text);
      return { url: audioUrl };
    }),
});
