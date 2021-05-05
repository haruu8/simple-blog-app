// articleSlice.ts
export interface READ_ARTICLE {
    id: number,
    title: string,
    body_text: string,
    created_at: string,
    updated_at: string,
  }


export interface POST_ARTICLE {
  id: number,
  title: string,
  body_text: string,
}


export interface ARTICLE_STATE {
  articles: READ_ARTICLE[],
  editedArticle: POST_ARTICLE[],
  selectedArticle: READ_ARTICLE[],
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
