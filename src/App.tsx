import { useEffect, useState } from "react";
import { useSpeechToText } from "./hooks/useSpeechToText";

export const App = () => {
  const [text, setText] = useState("");
  const { prepare, isReady, listenOnce } = useSpeechToText();

  useEffect(() => {
    prepare();
  }, []);

  return (
    <div>
      <h1>demo-microsoft-cognitiveservices-speech-sdk-issue-477</h1>
      <h2>{text}</h2>
      <button disabled={!isReady} onClick={() => listenOnce().then(setText)}>
        Listen once
      </button>
    </div>
  );
};
