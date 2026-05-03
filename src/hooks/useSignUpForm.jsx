import { useState } from "react";

export function useSignUpForm() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [age, setAge] = useState("");

  return {
    id,
    setId,
    password,
    setPassword,
    passwordCheck,
    setPasswordCheck,
    age,
    setAge,
  };
}
