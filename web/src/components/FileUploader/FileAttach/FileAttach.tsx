import React, { FunctionComponent } from 'react';
import { Form, Formik } from 'formik';
import { Button, Card, CardContent, Grid, TextField } from '@material-ui/core';

import FileUploader from '../FileUploader/FileUploader';
import { useDispatch } from 'react-redux';
import { getEmployees, saveClientAttachments } from '../../../store/fileAttachment/fileAttachmentSlice';

const FileAttach: FunctionComponent = () => {

  const dispatch = useDispatch();

  const onSubmit = (values: any) => {
    dispatch(saveClientAttachments(values));
    dispatch(getEmployees());
  }

  return (
    <Grid item xl={6}>
      <Formik
        initialValues={{
          name: '',
          file: null,
        }}
        onSubmit={(values, { resetForm }) => {
          onSubmit(values);
          resetForm();
        }}
      >
        {({
          values: { name },
          setFieldValue,
          handleChange,
          touched,
          errors,
        }) => (
          <Form>
            <Card className="card-box border-1 border-primary">
              <CardContent>
                <h5 className="font-size-xl mb-3 font-weight-bold text-left">
                  File Uploader
                </h5>
                <TextField
                  fullWidth
                  size="small"
                  variant="standard"
                  id="name"
                  name="name"
                  helperText={touched.name ? errors.name : ''}
                  error={touched.name && !!errors.name}
                  label={'File Name'}
                  value={name}
                  onChange={handleChange}
                />
                <div className="divider my-3" />
                <FileUploader
                  onChange={(file) => setFieldValue('file', file)}
                  onReset={false}
                  label={`File Uploader`}
                  acceptType={'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}
                />
                {errors.file && touched.file && (
                  <div className="text-danger mt-2 font-size-sm text-left">
                    {'required'}
                  </div>
                )}
                <div className="divider my-3" />
                <div className="d-flex justify-content-center">
                  <Button
                    className="btn-primary font-weight-bold w-20 my-2 mx-3"
                    type="submit"
                  >
                    {'Add'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Form>
        )}
      </Formik>
    </Grid>
  );
};

export default FileAttach;
