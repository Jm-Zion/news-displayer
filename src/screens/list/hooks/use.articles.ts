import React from 'react';
import { toast } from 'react-toastify';
import { supabase } from '../../../supabase'

export const useArticlesTitle = () => {
  const [results, setResults] = React.useState<Array<string>>([]);

  const loadArticlesTitle = () => {
    supabase.from("Article").select("title").then(data => {
      if (data.error) {
        // Handle error
        toast.error(data.error.message);
      }
      setResults(data.data?.map((item) => item.title) || []);
    });
  }

  React.useEffect(() => {
    loadArticlesTitle();
  }, []);

  return { results, loadArticlesTitle }
}
