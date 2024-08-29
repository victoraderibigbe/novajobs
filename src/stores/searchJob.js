import { ref } from "vue";
import axios from "axios";

export function useSearchJob() {
  const searches = ref([]);

  const jobSearch = async (keyword) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/jobs/search`, {
        params: { q: keyword }
      }); 
      searches.value = response.data.data || []; 
    } catch (error) {
      console.error('Error searching jobs:', error);
      searches.value = [];
    }
  };

  return { searches, jobSearch };
}
