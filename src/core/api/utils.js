/**
 * 공통 유틸리티 함수
 */

/**
 * 네트워크 지연 시뮬레이션
 * @param {number} ms - 밀리초
 */
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
