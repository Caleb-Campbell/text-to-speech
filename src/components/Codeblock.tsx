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
});`;
      case "watson":
        return `const response = await axios.post(
  \`\${url}/v1/synthesize?voice=en-US_AllisonV3Voice\`,
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
);`;
      case "google":
        return `const responses = await googleClient.synthesizeSpeech({
  input: { text: text },
  voice: { languageCode: "en-US", ssmlGender: "FEMALE" },
  audioConfig: { audioEncoding: "MP3" },
});`;
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
