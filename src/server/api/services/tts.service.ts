import { OpenAI } from "openai";
import axios from "axios";
import { TextToSpeechClient } from "@google-cloud/text-to-speech";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const googleClient = new TextToSpeechClient({
  key: process.env.GOOGLE_VOICE_KEY,
});

export const useTTSWithSelectedModel = async (model: string, text: string) => {
  if (model === "openai") {
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: text,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    const audioUrl = `data:audio/mp3;base64,${buffer.toString("base64")}`;

    return audioUrl;
  } else if (model === "watson") {
    const apiKey = process.env.WATSON_KEY;
    const url = process.env.WATSON_URL;

    const response = await axios.post(
      `${url}/v1/synthesize?voice=en-US_AllisonV3Voice`,
      { text },
      {
        auth: {
          username: "apikey",
          password: apiKey!,
        },
        headers: {
          "Content-Type": "application/json",
          Accept: "audio/ogg",
        },
        responseType: "arraybuffer",
      },
    );

    const buffer = Buffer.from(response.data, "binary");
    const audioUrl = `data:audio/ogg;base64,${buffer.toString("base64")}`;

    return audioUrl;
  } else if (model === "google") {
    try {
      const responses = await googleClient.synthesizeSpeech({
        input: { text: text },
        voice: { languageCode: "en-US", ssmlGender: "FEMALE" },
        audioConfig: { audioEncoding: "MP3" },
      });
      const response = responses[0];
      const audioContent = response.audioContent as Buffer;

      const audioUrl = `data:audio/mp3;base64,${audioContent.toString("base64")}`;

      return audioUrl;
    } catch (error) {
      console.error(
        "Error generating audio with Google Text-to-Speech API:",
        error,
      );
      throw new Error("Failed to generate audio");
    }
  } else {
    throw new Error("Invalid model selected");
  }
};
