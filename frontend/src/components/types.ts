// articleSlice.ts
export interface READ_ARTICLE {
  id: number,
  title: string,
  body_text: string,
  status: string;
  status_name: string;
  category: number;
  category_item: string;
  created_at: string,
  updated_at: string,
}


export interface POST_ARTICLE {
  id: number,
  title: string,
  body_text: string,
  status: string,
  category: number,
}

export interface CATEGORY {
  id: number;
  item: string;
}


export interface ARTICLE_STATE {
  articles: READ_ARTICLE[],
  editedArticle: POST_ARTICLE,
  selectedArticle: READ_ARTICLE,
  category: CATEGORY[],
}


// ArticleList.tsx
export interface SORT_STATE {
  rows: READ_ARTICLE[];
  order: "desc" | "asc";
  activeKey: string;
}


// commentSlice.ts
export interface READ_COMMENT {
  id: number,
  article: string,
  body_text: string,
  created_at: string,
  updated_at: string,
}


export interface POST_COMMENT {
  id: number,
  article: string,
  body_text: string,
}

