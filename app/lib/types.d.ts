export type RichTextContent = {
  type: string;
  content?: RichTextContent[];
  attrs?: Record<string, JSON>;
  marks?: { type: string }[];
  text?: string;
};

export type Section = {
  name: string;
  text: RichTextContent;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  files: string[];
  created_at: string;
  progress: number;
  chapter1: Chapter
  chapter2: Chapter
  chapter3: Chapter
  chapter4: Chapter
};
export type Chapter = Record<string, Section>