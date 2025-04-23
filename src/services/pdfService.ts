import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const uploadPdf = async (file: File, title: string) => {
  const formData = new FormData();
  formData.append('pdf', file);
  formData.append('title', title);

  try {
    const response = await axios.post(`${API_URL}/pdf-raw/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading PDF:', error);
    throw error;
  }
}; 