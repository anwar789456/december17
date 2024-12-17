import axios from 'axios';
export async function submitChatlog(formData) {
    const endpoint = 'https://www.samethome.com/api/submit-chatlog';
    try {
        const response = await axios.post(endpoint, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return { success: true, data: response.data };
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to submit the chatlog.');
    }
}