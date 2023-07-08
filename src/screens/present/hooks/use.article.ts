
import React from 'react';
import { toast } from 'react-toastify';
import { supabase } from '../../../supabase'
import { Template } from '../../../types/template';
import { TemplateModel } from '../model/template.model';


export const useArticle = (name: string) => {
  const [article, setArticle] = React.useState<TemplateModel>();

  const loadArticle = () => {
    supabase.from("Article").select().eq("title", name).then(data => {
      if (data.error) {
        // Handle error
        toast.error(data.error.message);
      }
      setArticle(new TemplateModel(data.data?.[0].content) || {});
    });
  }

  React.useEffect(() => {
    loadArticle();
  }, []);

  return { article, loadArticle }
}
