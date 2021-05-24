import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import axios from 'axios';
import {
  POST_PROFILE
} from '../types';


export const fetchAsyncGetMyProf = createAsyncThunk(
  'auth/loginUser',
  async () => {
    const res = await axios.post
  }
)
