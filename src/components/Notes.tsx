import React from "react";

const Notes: React.FC = () => {
  return (
    <div className="mt-8 max-w-3xl rounded-lg bg-white p-6 shadow-lg">
      <section>
        <h2 className="mb-4 text-2xl font-bold">OPENAI TTS</h2>
        <div className="mb-4">
          <p className="font-bold">Ease of use: 5/5</p>
          <p>
            As a team we have experience working with the Open AI SDK, and it
            has extensive features.
          </p>
        </div>
        <div className="mb-4">
          <p className="font-bold">Price:</p>
          <p>$15 per million characters</p>
        </div>
        <div>
          <p className="font-bold">Other notes:</p>
          <ul className="list-disc pl-6">
            <li>Great audio quality</li>
            <li>Easy to integrate with the SDK</li>
          </ul>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-bold">Watson TTS</h2>
        <div className="mb-4">
          <p className="font-bold">Ease of use: 4/5</p>
          <p>
            There is no dedicated SDK, just an endpoint, which makes it somewhat
            more difficult in typing and utilizing features.
          </p>
        </div>
        <div>
          <p className="font-bold">Price:</p>
          <p>$20 per million characters</p>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-bold">Google TTS</h2>
        <div className="mb-4">
          <p className="font-bold">Ease of use: 2/5</p>
          <p>
            Couldn't set it up simply without the need for extra credentials and
            determined it wasn't worth the time in the mock up. We were getting
            general 401 errors which didn't help setting up or troubleshooting.
            (I don't have a ton of experience with Google Cloud Console, but I'm
            really starting to hate it.)
          </p>
        </div>
        <div className="mb-4">
          <p className="font-bold">Price: $4 per million characters!</p>
        </div>
        <div>
          <p className="font-bold">Other notes:</p>
          <ul className="list-disc pl-6">
            <li>Lowest price among the options</li>
            <li>Difficult setup process</li>
          </ul>
        </div>
      </section>

      <blockquote className="mt-8 border-l-4 border-gray-300 pl-4 italic">
        We may be able to save money by saving the audio for re-used lessons, so
        we don't need to generate them each time.
      </blockquote>
    </div>
  );
};

export default Notes;
