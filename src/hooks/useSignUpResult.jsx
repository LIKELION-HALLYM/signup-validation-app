import { useState } from "react";
import { logSuccess, logError } from "../utils/log";

export function useSignUpResult() {
  const [resultMessage, setResultMessage] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  function handleSuccess(message) {
    logSuccess(message);
    setResultMessage(message);
    setSubmitSuccess(true);
  }

  function handleFail(message) {
    logError(message);
    setResultMessage(message);
    setSubmitSuccess(false);
  }

  return {
    resultMessage,
    setResultMessage,
    submitSuccess,
    setSubmitSuccess,
    handleSuccess,
    handleFail,
  };
}
