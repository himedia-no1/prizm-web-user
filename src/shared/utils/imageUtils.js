/**
 * 이미지 URL을 File 객체로 변환
 * 이미지를 수정하지 않았을 때 기존 이미지를 다시 전송하기 위해 사용
 *
 * @param {string} url - 이미지 URL
 * @param {string} filename - 파일명 (기본값: 'image.jpg')
 * @returns {Promise<File>} File 객체
 */
export async function urlToFile(url, filename = 'image.jpg') {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
  } catch (error) {
    console.error('Failed to convert URL to File:', error);
    throw error;
  }
}

/**
 * FormData에 이미지 추가 (변경되지 않은 이미지도 포함)
 *
 * @param {FormData} formData - FormData 객체
 * @param {string} fieldName - 필드명
 * @param {File|null} newImage - 새로 선택한 이미지
 * @param {string|null} existingImageUrl - 기존 이미지 URL
 * @returns {Promise<void>}
 */
export async function appendImageToFormData(formData, fieldName, newImage, existingImageUrl) {
  if (newImage) {
    // 새 이미지를 선택한 경우
    formData.append(fieldName, newImage);
  } else if (existingImageUrl) {
    // 이미지를 변경하지 않은 경우 - 기존 URL을 File로 변환
    const file = await urlToFile(existingImageUrl, `${fieldName}.jpg`);
    formData.append(fieldName, file);
  }
}
