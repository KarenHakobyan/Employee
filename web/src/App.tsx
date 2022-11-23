import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Provider } from 'react-redux';

import './utils/Icons';
import './assets/base.scss';
import FileAttach from './components/FileUploader/FileAttach';
import { Card, ThemeProvider } from '@material-ui/core';
import { saveClientAttachments } from './store/fileAttachment/fileAttachmentSlice';
import store from './store';
import MuiTheme from './theme';
import { Router } from '@material-ui/icons';
import { Route, Switch } from 'react-router';
import Employees from './components/Employees';

const App = (): ReactElement => {

  return (
    <Provider store={store}>
      <Card className="card-box panel-open p-3">
        <FileAttach/>
      </Card>
      <Card className="card-box panel-open p-3 m-5">
        <Employees/>
      </Card>
    </Provider>
  );
};

export default App;
