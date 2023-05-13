export type Template = {
  name: string;
  sections: Array<{
    title: string;
    content: string;
  }>;
  showTimer: boolean;
};
