import React, { useState } from 'react';
import {
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  Fab,
  Modal
} from '@material-ui/core';
import SaveIcon from "@material-ui/icons/Save";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAsyncGetArticles,
  fetchAsyncCreateArticle,
  fetchAsyncUpdateArticle,
  fetchAsyncDeleteArticle,
  selectEditedArticle,
  editArticle,
  selectArticle
} from '../article/articleSlice';
import { AppDispatch } from '../../app/store';
import { initialState } from '../article/articleSlice';


const ArticleForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const editedArticle = useSelector(selectEditedArticle);
  const [open, setOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  }
  const isDisabled =
    editedArticle.title.length === 0;
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value: string | number = e.target.value;
    const name = e.target.name;
    // status って何？
    dispatch(editArticle({ ...editedArticle, [name]: value }));
  }

  return (
    <div>
      <h2>{editedArticle.id ? "Update Article" : "New Article"}</h2>
      <form>
        <TextField
          label='title'
          name='title'
          value={editedArticle.title}
          onChange={handleInputChange}
        />
        <TextField
          label='body_text'
          name='body_text'
          value={editedArticle.body_text}
          onChange={handleInputChange}
        />
        <br/>
        <Fab
          size="small"
          color="primary"
          onClick={handleOpen}
        >
          <AddIcon />
        </Fab>
        <br />
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<SaveIcon />}
          disabled={isDisabled}
          onClick={
            editedArticle.id !== 0
              ? () => dispatch(fetchAsyncUpdateArticle(editedArticle))
              : () => dispatch(fetchAsyncCreateArticle(editedArticle))
          }
        >
          {editedArticle.id !== 0 ? "Update" : "Save"}
        </Button>
        <Button
          variant="contained"
          color="default"
          size="small"
          onClick={() => {
            dispatch(editArticle(initialState.editedArticle));
            dispatch(selectArticle(initialState.selectedArticle));
          }}
        >
          Cancel
        </Button>
      </form>
    </div>
  )
}

export default ArticleForm;
