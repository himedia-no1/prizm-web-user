import axiosInstance from './axiosInstance';

export const translateMessageAPI = async (message) => {
    try {
        const response = await axiosInstance.post('/api/translate', { message });
        console.log('Translation API response:', response.data);
        if (response.data && response.data.translatedMessage) {
            return response.data.translatedMessage;
        }
        throw new Error('Invalid translation response');
    } catch (error) {
        console.error('Translation API error:', error);
        throw error;
    }
};
