import React from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import { DoneBadge, NotDoneBadge } from '../Badges';
import TitledDialog, { DialogContent } from './TitledDialog';

export const taskInformationBody = task => (
  <React.Fragment>
    <Typography variant="body1" component="div">
      <p>
        <b>Name: </b>
        {' '}
        {task.name}
      </p>
    </Typography>
    <Divider />
    <Typography variant="body1" component="div">
      <p>
        <b>Created by: </b>
        {' '}
        {task.created_by_username}
      </p>
      <p>
        <b>Status: </b>
        {task.accomplished_by && <DoneBadge>{task.status_readable}</DoneBadge>}
        {!task.accomplished_by && <NotDoneBadge>{task.status_readable}</NotDoneBadge>}
      </p>
    </Typography>
    <Divider />
    <Typography variant="body1" component="div">
      <p>
        <b>Description: </b>
        {' '}
        {task.description}
      </p>
    </Typography>
  </React.Fragment>
);

export default function TaskInfoDialog(props) {
  const { taskObject: task } = props;

  return (
    <TitledDialog title="Task Information" {...props}>
      <DialogContent>{taskInformationBody(task)}</DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={props.closeDialog} color="primary">
          OK
        </Button>
      </DialogActions>
    </TitledDialog>
  );
}
