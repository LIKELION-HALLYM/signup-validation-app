const log = console.log;
export function logSuccess(message) {
  log(`성공: ${message}`);
}

export function logError(message) {
  log(`실패: ${message}`);
}
