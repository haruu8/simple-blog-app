import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import axios from 'axios';
import { READ_ARTICLE, POST_ARTICLE, ARTICLE_STATE, USER, CATEGORY } from '../types';


export const fetchAsyncGetUsers = createAsyncThunk(
  'article/getUsers',
  async () => {
    const res = await axios.get<USER[]>(
      `${ process.env.REACT_APP_API_URL }users/`,
      {
        headers: {
          Authorization: `JWT ${ localStorage.localJWT }`,
        }
      }
    );
    return res.data;
  }
);


export const fetchAsyncGetCategory = createAsyncThunk(
  'article/getCategory',
  async () => {
    const res = await axios.get<CATEGORY[]>(
      `${ process.env.REACT_APP_API_URL }category/`,
      {
        headers: {
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);


export const fetchAsyncCreateCategory = createAsyncThunk(
  'article/createCategory',
  async (item: string) => {
    const res = await axios.post<CATEGORY>(
      `${ process.env.REACT_APP_API_URL }category/`,
      { item: item },
      {
        headers: {
          Autorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);


export const fetchAsyncGetArticles = createAsyncThunk(
  'article/getArticles',
  async () => {
    const res = await axios.get<READ_ARTICLE[]>(
      `${ process.env.REACT_APP_API_URL }article/`,
      {
        headers: {
          Authorization: `JWT ${ localStorage.localJWT }`,
        },
      }
    );
    return res.data;
  }
)


export const fetchAsyncCreateArticle = createAsyncThunk(
  'article/createArticle',
  async (article: POST_ARTICLE) => {
    const res = await axios.post<READ_ARTICLE>(
      `${ process.env.REACT_APP_API_URL }article/`,
      article,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${ localStorage.localJWT }`,
        },
      }
    );
    return res.data;
  }
);


export const fetchAsyncUpdateArticle = createAsyncThunk(
  'article/updateArticle',
  async (article: POST_ARTICLE) => {
    const res = await axios.put<READ_ARTICLE>(
      `${ process.env.REACT_APP_API_URL }article/${ article.id }/`,
      article,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${ localStorage.localJWT }`,
        },
      }
    );
    return res.data;
  }
);


export const fetchAsyncDeleteArticle = createAsyncThunk(
  'article/deleteArticle',
  async (id: number) => {
    await axios.delete(`${ process.env.REACT_APP_API_URL }article/${ id }/`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${ localStorage.localJWT }`,
        }
      });
    return id;
  }
);


export const initialState: ARTICLE_STATE = {
  articles: [
    {
      id: 0,
      title: '',
      body_text: '',
      status: '',
      status_name: '',
      category: 0,
      category_item: '',
      author: 0,
      author_username: '',
      created_at: '',
      updated_at: '',
    },
  ],
  editedArticle:  {
    id: 0,
    title: '',
    body_text: '',
    status: '',
    category: 0,
  },
  selectedArticle:  {
    id: 0,
    title: '',
    body_text: '',
    status: '',
    status_name: '',
    category: 0,
    category_item: '',
    author: 0,
    author_username: '',
    created_at: '',
    updated_at: '',
  },
  users: [
    {
      id: 0,
      username: '',
    },
  ],
  category: [
    {
      id: 0,
      item: '',
    },
  ],
};


export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    editArticle(state, action: PayloadAction<POST_ARTICLE>) {
      state.editedArticle = action.payload;
    },
    selectArticle(state, action: PayloadAction<READ_ARTICLE>) {
      state.selectedArticle = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAsyncGetCategory.fulfilled,
      (state, action: PayloadAction<CATEGORY[]>) => {
        return {
          ...state,
          category: action.payload,
        };
      }
    );
    builder.addCase(
      fetchAsyncGetCategory.rejected,
      () => {
        alert('error');
        // window.location.href = '/';
      }
    );
    builder.addCase(
      fetchAsyncCreateCategory.fulfilled,
      (state, action: PayloadAction<CATEGORY>) => {
        return {
          ...state,
          category: [...state.category, action.payload],
          editedArticle: initialState.editedArticle,
        };
      }
    );
    builder.addCase(
      fetchAsyncCreateCategory.rejected,
      () => {
        window.location.href = '/';
      }
    );
    builder.addCase(
      fetchAsyncGetArticles.fulfilled,
      (state, action: PayloadAction<READ_ARTICLE[]>) => {
        return {
          ...state,
          articles: action.payload,
        };
      }
    );
    builder.addCase(
      fetchAsyncGetArticles.rejected,
      () => {
        window.location.href = '/';
      }
    );
    builder.addCase(
      fetchAsyncCreateArticle.fulfilled,
      (state, action: PayloadAction<READ_ARTICLE>) => {
        return {
          ...state,
          articles: [action.payload, ...state.articles],
          editedArticle: initialState.editedArticle,
        }
      }
    );
    builder.addCase(
      fetchAsyncCreateArticle.rejected,
      () => {
        window.location.href = '/';
      }
    );
    builder.addCase(
      fetchAsyncUpdateArticle.fulfilled,
      (state, action: PayloadAction<READ_ARTICLE>) => {
        return {
          ...state,
          articles: state.articles.map((article) =>
            article.id === action.payload.id ? action.payload : article
          ),
          editedArticle: initialState.editedArticle,
          selectedArticle: initialState.selectedArticle,
        };
      }
    );
    builder.addCase(
      fetchAsyncUpdateArticle.rejected,
      () => {
        window.location.href = '/';
      }
    );
    builder.addCase(
      fetchAsyncDeleteArticle.fulfilled,
      (state, action: PayloadAction<number>) => {
        return {
          ...state,
          articles: state.articles.filter((article) => article.id !== action.payload),
          editedArticle: initialState.editedArticle,
          selectedArticle: initialState.selectedArticle,
        };
      }
    );
    builder.addCase(
      fetchAsyncDeleteArticle.rejected,
      () => {
        window.location.href = '/';
      }
    );
  },
});

export const { editArticle, selectArticle } = articleSlice.actions;
export const selectSelectedArticle = (state: RootState) => state.article.selectedArticle;
export const selectEditedArticle = (state: RootState) => state.article.editedArticle;
export const selectArticles = (state: RootState) => state.article.articles;
export const selectCategory = (state: RootState) => state.article.category;
export default articleSlice.reducer;
