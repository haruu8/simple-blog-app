import React, { useEffect } from 'react';
import styles from "./App.module.css";
import { Grid, Avatar } from '@material-ui/core';
import {
  makeStyles,
  createMuiTheme,
  MuiThemeProvider,
  Theme,
} from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PolymerIcon from "@material-ui/icons/Polymer";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncGetArticles,
  selectEditedArticle,
} from "./features/article/articleSlice";
import ArticleList from './features/article/ArticleList';
import ArticleForm from './features/article/ArticleForm';
import ArticleDisplay from './features/article/ArticleDisplay';
import { AppDispatch } from './app/store';


const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#3cb371',
    },
  },
});


const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    marginTop: theme.spacing(3),
    cursor: 'none',
  },
  avatar: {
    marginLeft: theme.spacing(1),
  },
}));


const App: React.FC = () => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();
  const editedArticle = useSelector(selectEditedArticle);

  useEffect(() => {
    const fetchBootLoader = async () => {
      await dispatch(fetchAsyncGetArticles());
    };
    fetchBootLoader();
  }, [dispatch]);

  return (
    <MuiThemeProvider theme={theme}>
      <div className={styles.app__root}>
        <Grid container>
          <Grid item xs={4}>
            <PolymerIcon className={classes.icon} />
          </Grid>
          <Grid item xs={4}>
            <h1>ブログ</h1>
          </Grid>
          <Grid item xs={4}>
            <div className={styles.app_logout}>
              <button>
                <ExitToAppIcon fontSize='large' />
              </button>
            </div>
          </Grid>
          <Grid item xs={6}>
            <ArticleList />
          </Grid>
          <Grid item xs={6}>
            <Grid
              container
              direction='column'
              alignItems='center'
              justify='center'
              style={{ minHeight: "80vh" }}
            >
              <Grid item>
                {editedArticle.status ? <ArticleForm /> : <ArticleDisplay />}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </MuiThemeProvider>
  )
};

export default App;
