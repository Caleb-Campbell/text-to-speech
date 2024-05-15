import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";

interface CodeBlockProps {
  selectedModel: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ selectedModel }) => {
  const getCodeBlock = () => {
    switch (selectedModel) {
      case "openai":
        return `const mp3 = await openai.audio.speech.create({
          model: "tts-1",
          voice: "alloy",
          input: text,
        });
    
        const buffer = Buffer.from(await mp3.arrayBuffer());
        const audioUrl = 'data:audio/mp3;base64,{buffer.toString("base64")}';
    
        return audioUrl;`;
      case "watson":
        return `const apiKey = process.env.WATSON_KEY;
        const url = process.env.WATSON_URL;
    
        const response = await axios.post(
          {url}/v1/synthesize?voice=en-US_AllisonV3Voice,
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
        const audioUrl = data:audio/ogg;base64,{buffer.toString("base64")};
    
        return audioUrl;`;
      case "google":
        return `// THIS SHOULD WORK BASED ON THE GOOGLE DOCS BUT IT DOESN'T
        try {
          const responses = await googleClient.synthesizeSpeech({
            input: { text: text },
            voice: { languageCode: "en-US", ssmlGender: "FEMALE" },
            audioConfig: { audioEncoding: "MP3" },
          });
          const response = responses[0];
          const audioContent = response.audioContent as Buffer;
    
          const audioUrl = data:audio/mp3;base64,{audioContent.toString("base64")};
    
          return audioUrl;
        } catch (error) {
          console.error(
            "Error generating audio with Google Text-to-Speech API:",
            error,
          );
          throw new Error("Failed to generate audio");
        }`;
      default:
        return "";
    }
  };

  return (
    <div className="mt-8 rounded-xl">
      <h2 className="mb-4 text-2xl font-bold">Code Block</h2>
      <SyntaxHighlighter language="typescript">
        {getCodeBlock()}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
