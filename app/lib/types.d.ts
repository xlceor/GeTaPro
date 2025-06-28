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

export type Project2 = {
  id:string;
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


export type User = {
  name: string;
  username: string;
  photoId: string;
  id: number;
  role:string;
  project_id:string | null;
} | null;

export type User2 = {
  name: string;
  username: string;
  photoId: string;
  id: number;
  rol:string;
  project_id:string | null;
  grade:number;
  group:string;
  level:  string;
} | null;