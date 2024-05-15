import { useState } from "react";
import CodeBlock from "~/components/Codeblock";
import Notes from "~/components/Notes";
import { api } from "~/utils/api";

function Home() {
  const [selectedModel, setSelectedModel] = useState("");
  const [inputText, setInputText] = useState("");
  const [audioUrl, setAudioUrl] = useState("");

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const generateAudio = api.tts.generate.useMutation();

  const handleGenerateAudio = async () => {
    await generateAudio.mutateAsync(
      { model: selectedModel, text: inputText },
      {
        onSuccess: (data) => {
          setAudioUrl(data.url);
        },
      },
    );
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-cyan-900 to-blue-700 py-10">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold">
          Text-to-Speech Research Project
        </h1>
        <div className="mb-4">
          <label htmlFor="model-select" className="mb-2 block font-bold">
            Select Model:
          </label>
          <select
            id="model-select"
            value={selectedModel}
            onChange={handleModelChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Choose a model</option>
            <option value="openai">OpenAI</option>
            <option value="watson">Watson</option>
            <option value="google">Google Cloud (Not working)</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="input-text" className="mb-2 block font-bold">
            Input Text:
          </label>
          <textarea
            id="input-text"
            value={inputText}
            onChange={handleInputChange}
            rows={4}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <button
          onClick={handleGenerateAudio}
          disabled={generateAudio.isPending}
          className="w-full rounded-md bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {generateAudio.isPending ? "Generating..." : "Generate Audio"}
        </button>
        {audioUrl && (
          <div className="mt-6">
            <audio src={audioUrl} controls className="w-full" />
          </div>
        )}
      </div>
      <div>
        <CodeBlock selectedModel={selectedModel} />
        <Notes />
      </div>
    </div>
  );
}

export default Home;
