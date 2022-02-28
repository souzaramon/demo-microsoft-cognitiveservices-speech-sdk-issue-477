import { useState } from "react";
import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";

const speechToTextConfig = SpeechSDK.SpeechConfig.fromSubscription(
  process.env.KEY_MICROSOFT_SPEECH_SDK as string,
  "eastus"
);

speechToTextConfig.speechRecognitionLanguage = "pt-BR";

export function useSpeechToText() {
  const [isReady, setIsReady] = useState(false);

  const recognizer = new SpeechSDK.SpeechRecognizer(
    speechToTextConfig,
    SpeechSDK.AudioConfig.fromDefaultMicrophoneInput()
  );

  return {
    isReady,
    prepare: async (): Promise<undefined> => {
      await navigator.mediaDevices.getUserMedia({ audio: true });

      return void setIsReady(true);
    },
    listenOnce: (): Promise<string> => {
      return new Promise((resolve) => {
        recognizer.recognizeOnceAsync(({ reason, text }: any) => {
          if (reason === SpeechSDK.ResultReason.RecognizedSpeech) {
            return resolve(text);
          }
          return resolve("");
        });
      });
    },
  };
}
