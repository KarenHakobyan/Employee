import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';

import api from '../../api';
import { AppDispatch, AppThunk } from '..';
import { ProviderProps } from 'react';


export const convertToFormData = (obj: object) =>
  Object.entries(obj).reduce((formData, [key, value]) => {
    if (!value) {
      return formData;
    }

    if (Array.isArray(value) && value[0] instanceof File) {
      value.forEach((file, idx) => formData.append(`file_${idx + 1}`, file));
    } else if (typeof value === 'object' && !(value instanceof File)) {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, value);
    }

    return formData;
  }, new FormData());

  interface IEmployees {
    employeesStatistic: any;
    files: any
  }

const initialState: IEmployees= {
  files: undefined,
  employeesStatistic: undefined
};

const fileAttachments = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    requestStart: (state) => {
    //   state.files = action.payload;
    },
    requestFilesSuccess: (
      state,
      action,
    ) => {
      if (action.payload) {
        state.files = action.payload;
      }
    },
    requestEmployeesSuccess: (
      state,
      action,
    ) => {
      if (action.payload) {
        state.employeesStatistic = action.payload;
      }
    },
  },
});

export const {
  requestStart,
  requestFilesSuccess,
  requestEmployeesSuccess
} = fileAttachments.actions;

export const saveClientAttachments = (
    params: any,
  ): AppThunk => async (dispatch: AppDispatch) => {
    try {
      dispatch(requestStart());
      const formData = convertToFormData(params);

      await api.post(`/api/v1/attachments`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (e) {
    }
  };

  export const getEmployees = (): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(requestStart());

    const {
      data: { data },
    } = await api.get('/api/v1/employees');

    dispatch(
      requestEmployeesSuccess({
        data
      })
    );
  } catch (e) {
  }
};

export default fileAttachments;
