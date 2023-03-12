export type Post = {
  slug: string;
  title: string;
  body: string;
  date: Date;
  excerpt: string;
};

export type ExtractedContent = {
  body: string;
  attrs: Record<string, string>
};

