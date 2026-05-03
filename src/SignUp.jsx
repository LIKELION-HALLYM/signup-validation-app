import { useSignUpForm } from "./hooks/useSignUpForm";
import { useSignUpResult } from "./hooks/useSignUpResult";
import { submitSignupForm, validateSignupForm } from "./utils/submitSignupForm";

const SignUp = () => {
  const {
    id,
    password,
    passwordCheck,
    age,
    setId,
    setPassword,
    setPasswordCheck,
    setAge,
  } = useSignUpForm();

  const { resultMessage, submitSuccess, handleSuccess, handleFail } =
    useSignUpResult();

  function isFormValid() {
    return (
      validateSignupForm(id, password, passwordCheck, Number(age)) === true
    );
  }

  function handleSubmit() {
    submitSignupForm(
      id,
      password,
      passwordCheck,
      Number(age),
      handleSuccess,
      handleFail,
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          회원가입 폼
        </h2>

        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="아이디"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all border-gray-300
              }`}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all border-gray-300`}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="비밀번호 확인"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all border-gray-300`}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="나이"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all border-gray-300`}
            />
          </div>

          {resultMessage && (
            <div
              className={`text-sm text-center p-3 rounded-lg border ${
                submitSuccess
                  ? "text-green-600 bg-green-50 border-green-200"
                  : "text-red-500 bg-red-50 border-red-200"
              }`}
            >
              {resultMessage}
            </div>
          )}

          <button
            onClick={handleSubmit}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
              isFormValid()
                ? "bg-purple-600 hover:bg-purple-700 text-white cursor-pointer shadow-md hover:shadow-lg"
                : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-60"
            }`}
          >
            회원가입
          </button>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
