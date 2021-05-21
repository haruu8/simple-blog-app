import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
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
  selectArticle,
  selectCategories,
  fetchAsyncCreateCategory,
} from './articleSlice';
import { AppDispatch } from '../../app/store';
import { initialState } from './articleSlice';


const useStyles = makeStyles((theme: Theme) => ({
  field: {
    margin: theme.spacing(2),
    minWidth: 240,
  },
  button: {
    margin: theme.spacing(3),
  },
  addIcon: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(2),
  },
  saveModal: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(2),
  },
  paper: {
    position: "absolute",
    textAlign: "center",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}


const ArticleForm: React.FC = () => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();

  const categories = useSelector(selectCategories);
  const editedArticle = useSelector(selectEditedArticle);

  const [open, setOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const [inputText, setInputText] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const isDisabled =
    editedArticle.title.length === 0 ||
    editedArticle.body_text.length === 0;

  const isCatDisabled = inputText.length === 0;

  const handleInputTextChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputText(e.target.value);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value: string | number = e.target.value;
    const name = e.target.name;
    dispatch(editArticle({ ...editedArticle, [name]: value }));

  }
  const handleSelectStatusChange = (
  e: React.ChangeEvent<{value: unknown}>
  ) => {
    const value = e.target.value as string;
    dispatch(editArticle({ ...editedArticle, status: value }));
  }

  const handleSelectCatChange = (
    e: React.ChangeEvent<{ value: unknown }>
  ) => {
    const value = e.target.value as number;
    dispatch(editArticle({ ...editedArticle, category: value }));
  };
  let catOptions = categories.map((cat) => (
    <MenuItem key={cat.id} value={cat.id}>
      {cat.item}
    </MenuItem>
  ));

  return (
    <div>
      <h2>{editedArticle.id ? "Update Article" : "New Article"}</h2>
      <form>
        <TextField
          className={classes.field}
          label='title'
          name='title'
          value={editedArticle.title}
          onChange={handleInputChange}
        />
        <TextField
          className={classes.field}
          label='body_text'
          name='body_text'
          value={editedArticle.body_text}
          onChange={handleInputChange}
        />
        <br />
        <FormControl className={classes.field}>
          <InputLabel>Status</InputLabel>
          <Select
            name='status'
            value={editedArticle.status}
            onChange={handleSelectStatusChange}
          >
            <MenuItem value={1}>Not started</MenuItem>
            <MenuItem value={2}>On going</MenuItem>
            <MenuItem value={3}>Done</MenuItem>
          </Select>
        </FormControl>
        <br />
        <FormControl className={classes.field}>
          <InputLabel>Category</InputLabel>
          <Select
            name='category'
            value={editedArticle.category}
            onChange={handleSelectCatChange}
          >
            {catOptions}
          </Select>
        </FormControl>
        <Fab
          size="small"
          color="primary"
          onClick={handleOpen}
          className={classes.addIcon}
        >
          <AddIcon />
        </Fab>
        <br />

        <Modal open={open} onClose={handleClose}>
          <div style={modalStyle} className={classes.paper}>
            <TextField
              className={classes.field}
              InputLabelProps={{
                shrink: true,
              }}
              label='New Category'
              type='text'
              value={inputText}
              onChange={handleInputTextChange}
            />
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.saveModal}
              startIcon={<SaveIcon />}
              disabled={isCatDisabled}
              onClick={() => {
                dispatch(fetchAsyncCreateCategory(inputText));
                handleClose();
              }}
            >
              Save
            </Button>
          </div>
        </Modal>
        <br />
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
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
