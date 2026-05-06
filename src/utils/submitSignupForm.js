// 아이디가 4자 이상인지 검사
export function validateId(id) {
  if (id.length < 4 ) {
    return "아이디는 4자 이상이어야 합니다."
  }

  return true
}

// 비밀번호가 8자 이상인지 검사 & 비밀번호와 비밀번호 확인 값이 같은지 검사
export function validatePassword(password, passwordCheck) {
  if (password.length < 8) {
    return "비밀번호는 8자 이상이어야 합니다."
  }

  if (password !== passwordCheck) {
    return "비밀번호가 일치하지 않습니다."
  }

  return true
}

// 나이가 14 이상인지 검사
export function validateAge(age) {
  if (age < 14) {
    return "14세 이상만 가입할 수 있습니다."
  }

  return true
}

// 여러 조건을 만족하지 못한다면 가장 먼저 실패한 에러 1개만 반환
export function validateSignupForm(id, password, passwordCheck, age) {
  const idResult = validateId(id)
  if (idResult !== true) {
    return idResult
  }

  const passwordResult = validatePassword(password, passwordCheck)
  if(passwordResult !== true) {
    return passwordResult
  }

  const ageResult = validateAge(age)
  if (ageResult !== true) {
    return ageResult
  }

  return true
}

export function submitSignupForm(id, password, passwordCheck, age, onSuccess, onFail) {
  const validationResult = validateSignupForm(id, password, passwordCheck, age)
  if (validationResult === true) {
    onSuccess("회원가입이 완료되었습니다.")
  } else {
    onFail(validationResult)
  }
}