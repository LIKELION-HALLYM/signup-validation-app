import { describe, expect, it, vi } from "vitest";
import {
  validateSignupForm,
  submitSignupForm,
} from "../../src/utils/submitSignupForm";

describe("validateSignupForm", () => {
  it("모든 값이 유효하면 true를 반환한다.", () => {
    expect(validateSignupForm("abcd", "12345678", "12345678", 14)).toBe(true);
  });

  it("아이디가 4자 미만이면 에러를 반환한다", () => {
    expect(validateSignupForm("ab", "12345678", "12345678", 20)).toBe(
      "아이디는 4자 이상이어야 합니다.",
    );
  });

  it("비밀번호가 8자 미만이면 에러를 반환한다", () => {
    expect(validateSignupForm("abcd", "1234567", "1234567", 20)).toBe(
      "비밀번호는 8자 이상이어야 합니다.",
    );
  });

  it("비밀번호와 비밀번호 확인 값이 다르면 에러를 반환한다", () => {
    expect(validateSignupForm("abcd", "12345678", "87654321", 20)).toBe(
      "비밀번호가 일치하지 않습니다.",
    );
  });

  it("나이가 14세 미만이면 에러를 반환한다", () => {
    expect(validateSignupForm("abcd", "12345678", "12345678", 13)).toBe(
      "14세 이상만 가입할 수 있습니다.",
    );
  });

  it("아이디가 정확히 4자면 통과한다", () => {
    expect(validateSignupForm("abcd", "12345678", "12345678", 20)).toBe(true);
  });

  it("비밀번호가 정확히 8자면 통과한다", () => {
    expect(validateSignupForm("validId", "12345678", "12345678", 20)).toBe(
      true,
    );
  });

  it("나이가 정확히 14세면 통과한다", () => {
    expect(validateSignupForm("validId", "12345678", "12345678", 14)).toBe(
      true,
    );
  });

  it("여러 조건이 동시에 실패하면 가장 먼저 실패한 에러만 반환한다", () => {
    expect(validateSignupForm("ab", "123", "999", 10)).toBe(
      "아이디는 4자 이상이어야 합니다.",
    );
  });

  it("아이디는 통과하고 비밀번호와 나이가 함께 실패하면 비밀번호 에러를 먼저 반환한다", () => {
    expect(validateSignupForm("abcd", "123", "999", 10)).toBe(
      "비밀번호는 8자 이상이어야 합니다.",
    );
  });

  it("아이디와 비밀번호는 통과하고 비밀번호 확인과 나이가 함께 실패하면 비밀번호 확인 에러를 먼저 반환한다", () => {
    expect(validateSignupForm("abcd", "12345678", "87654321", 10)).toBe(
      "비밀번호가 일치하지 않습니다.",
    );
  });
});

describe("submitSignupForm", () => {
  it("유효한 값이면 onSuccess를 1번 호출한다.", () => {
    const onSuccess = vi.fn();
    const onFail = vi.fn();

    submitSignupForm("abcd", "12345678", "12345678", 20, onSuccess, onFail);

    expect(onSuccess).toHaveBeenCalledTimes(1);
  });

  it("유효한 값이면 onFail은 호출하지 않는다", () => {
    const onSuccess = vi.fn();
    const onFail = vi.fn();

    submitSignupForm("abcd", "12345678", "12345678", 20, onSuccess, onFail);

    expect(onFail).not.toHaveBeenCalled();
  });

  it("유효하지 않은 값이면 onFail을 에러 메시지와 함께 호출한다", () => {
    const onSuccess = vi.fn();
    const onFail = vi.fn();

    submitSignupForm("ab", "12345678", "12345678", 20, onSuccess, onFail);

    expect(onFail).toHaveBeenCalledTimes(1);
    expect(onFail).toHaveBeenCalledWith("아이디는 4자 이상이어야 합니다.");
  });

  it("유효하지 않은 값이면 onSuccess는 호출하지 않는다", () => {
    const onSuccess = vi.fn();
    const onFail = vi.fn();

    submitSignupForm("ab", "12345678", "12345678", 20, onSuccess, onFail);

    expect(onSuccess).not.toHaveBeenCalled();
  });

  it("여러 조건이 실패하면 첫 번째 에러만 onFail에 전달한다", () => {
    const onSuccess = vi.fn();
    const onFail = vi.fn();

    submitSignupForm("ab", "123", "999", 10, onSuccess, onFail);

    expect(onFail).toHaveBeenCalledWith("아이디는 4자 이상이어야 합니다.");
  });

  it("반환값 없이 콜백 실행만 수행한다", () => {
    const onSuccess = vi.fn();
    const onFail = vi.fn();

    const result = submitSignupForm(
      "abcd",
      "12345678",
      "12345678",
      20,
      onSuccess,
      onFail,
    );

    expect(result).toBeUndefined();
  });
});
