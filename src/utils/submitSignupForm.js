export function validateSignupForm(id, password, passwordCheck, age) {
  if (id.length < 4) {
    return '아이디는 4자 이상이어야 합니다.';
  }

  if (password.length < 8) {
    return '비밀번호는 8자 이상이어야 합니다.';
  }

  if (password !== passwordCheck) {
    return '비밀번호가 일치하지 않습니다.';
  }

  if (age < 14) {
    return '14세 이상만 가입할 수 있습니다.';
  }

  return true;
}


export function submitSignupForm(
  id,
  password,
  passwordCheck,
  age,
  onSuccess,
  onFail,
) {
  const validationResult = validateSignupForm(
    id,
    password,
    passwordCheck,
    age,
  );

  if (validationResult === true) {
    onSuccess('회원가입이 완료되었습니다.');
  } else {
    onFail(validationResult);
  }
}

