import axiosInstance from '../axiosInstance';

/**
 * 파일 관련 API 서비스
 */
export const fileService = {
  /**
   * Presigned URL 생성
   * POST /api/files/presigned-url
   * @param {object} params - {
   *   fileName: string,
   *   fileSize: number,
   *   contentType: string,
   *   directory: string (default: 'files')
   * }
   * @returns {object} { uploadUrl, fileKey, fileName, expiresIn }
   */
  async generatePresignedUrl(params) {
    const response = await axiosInstance.post('/api/files/presigned-url', {
      fileName: params.fileName,
      fileSize: params.fileSize,
      contentType: params.contentType,
      directory: params.directory || 'files',
    });
    return response.data;
  },

  /**
   * S3에 파일 직접 업로드
   * @param {string} presignedUrl - S3 Presigned URL
   * @param {File} file - 업로드할 파일
   * @param {string} contentType - 파일 Content-Type
   * @returns {Promise<void>}
   */
  async uploadToS3(presignedUrl, file, contentType) {
    await fetch(presignedUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': contentType,
      },
      body: file,
    });
  },

  /**
   * 파일 업로드 확인 및 메시지 생성
   * POST /api/files/confirm
   * @param {object} params - {
   *   fileKey: string,
   *   fileName: string,
   *   channelId: number,
   *   workspaceUserId: number
   * }
   * @returns {object} { messageId, fileId, type, fileUrl, createdAt }
   */
  async confirmUpload(params) {
    const response = await axiosInstance.post('/api/files/confirm', {
      fileKey: params.fileKey,
      fileName: params.fileName,
      channelId: params.channelId,
      workspaceUserId: params.workspaceUserId,
    });
    return response.data;
  },

  /**
   * 파일 업로드 플로우 전체 (Presigned URL → S3 Upload → Confirm)
   * @param {File} file - 업로드할 파일
   * @param {number} channelId - 채널 ID
   * @param {number} workspaceUserId - 워크스페이스 사용자 ID
   * @param {function} onProgress - 진행률 콜백 (optional)
   * @returns {object} 업로드 완료 후 메시지 정보
   */
  async uploadFile(file, channelId, workspaceUserId, onProgress = null) {
    try {
      // 1. Presigned URL 생성
      if (onProgress) onProgress({ stage: 'presigned', progress: 10 });
      const presignedData = await this.generatePresignedUrl({
        fileName: file.name,
        fileSize: file.size,
        contentType: file.type || 'application/octet-stream',
        directory: 'files',
      });

      // 2. S3 직접 업로드
      if (onProgress) onProgress({ stage: 'uploading', progress: 50 });
      await this.uploadToS3(
        presignedData.uploadUrl,
        file,
        file.type || 'application/octet-stream'
      );

      // 3. 업로드 확인
      if (onProgress) onProgress({ stage: 'confirming', progress: 90 });
      const confirmData = await this.confirmUpload({
        fileKey: presignedData.fileKey,
        fileName: file.name,
        channelId,
        workspaceUserId,
      });

      if (onProgress) onProgress({ stage: 'complete', progress: 100 });
      return confirmData;
    } catch (error) {
      console.error('File upload failed:', error);
      throw error;
    }
  },

  /**
   * 문서 분석 트리거
   * POST /api/messages/{messageId}/analyze
   * @param {number} messageId - 메시지 ID
   * @returns {object} { status: 'ANALYZING' }
   */
  async analyzeDocument(messageId) {
    const response = await axiosInstance.post(`/api/messages/${messageId}/analyze`);
    return response.data;
  },
};
