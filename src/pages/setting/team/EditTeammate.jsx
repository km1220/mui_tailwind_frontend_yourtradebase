import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SET_TEAMMATES, UPDATE_ITEM_IN_TEAMMATES, LOADING } from '@store/actions';

import {
  AddCircleOutlined as AddIcon, AddOutlined, SearchOutlined as SearchIcon,
  CheckCircleOutlined as CheckIcon, CancelOutlined as CancelIcon, DeleteOutlined as DeleteIcon
} from '@mui/icons-material';
import {
  Box, Paper, Divider, Typography, Button, IconButton, Dialog, Select, MenuItem,
  Radio, Checkbox,
  alpha
} from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import clsx from 'clsx';

import * as EmailValidator from 'email-validator';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

import ItemComponent from '@components/price_list/ItemComponent';
// import DraggablePaper from '../DraggablePaper';

import { parseJSON } from '@utils';



import Circle from '@uiw/react-color-circle';

const useStyles = makeStyles(theme => ({
  root: {
    width: '55%',
    margin: '2rem',
    padding: '3rem',
    '& > *:not(:first-child)': {
      marginTop: '3rem',
    },
    [theme.breakpoints.down('lg')]: {
      width: '65%',
      padding: '1rem 2rem',
    },
    [theme.breakpoints.down('md')]: {
      width: '75%',
      padding: '1rem 2rem',
    },
    [theme.breakpoints.down('sm')]: {
      width: '85%',
      padding: '1rem 2rem',
    },
  },

  addBtn: {
    padding: '0.25rem 0.5rem !important',
    borderRadius: '0.25rem !important',
    marginTop: '0.5rem !important',
  },

  inputsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    '& > div': {
      display: 'flex',
      flexDirection: 'column',
    },
    '& > *:not(:first-child)': {
      marginTop: '1rem',
    },
  },
  colorPicker: {
    '&.w-color-circle > *': {
      margin: '0.25rem 0.5rem !important',
    },
  },
  roleSection: {
    '& > div.role-wrapper': {
      display: 'flex',
      justifyContent: 'space-between',
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
      },

      '& > div.radio-item-box': {
        flexGrow: 1,
        display: 'flex',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: '0.5rem',
        padding: '0.75rem',
        margin: '0.5rem',
        cursor: 'pointer',
        '& > div.radio-content': {},

        '&.selected': {
          backgroundColor: alpha(theme.palette.secondary.light, 0.1),
          border: `1px solid ${theme.palette.secondary.dark}`,
          color: theme.palette.secondary.dark,
        },
      },
    },
  },


  permissionBox: {
    '& .permission-title': {
      padding: '0 0.5rem',
    },
    '& .permission-content': {
      padding: '1.5rem 1.5rem',
      borderRadius: '0.25rem',
      '& > *:not(:first-child)': {
        marginTop: '0.5rem',
      },
    },

    '&.can': {
      '& .permission-title': {
        color: theme.palette.success.main,
      },
      '& .permission-content': {
        background: alpha(theme.palette.success.light, 0.15),
      },
    },
    '&.cant': {
      '& .permission-title': {
        color: theme.palette.error.main,
      },
      '& .permission-content': {
        background: alpha(theme.palette.error.light, 0.15),
      },
    },
  },

}));

const initailPermissions = {
  general: { admin: false, field_team: false, export_csv: true },
  invoice: { view: true, add: true, edit_send: true },
  quote: { view: true, add: true, edit_send: true }
};
const initialData = {
  // id: _generateNewID(),
  name: '',
  email: '',
  initialText: '',
  initialColorHex: '#4e5062',
  role: "admin",
  // permissions: '',
}
export default function EditTeammatePage(props) {
  const { id: paramID } = useParams();
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const smUpMatch = useMediaQuery(theme.breakpoints.up('sm'));

  const all_team_members = useSelector(state => state.teammates);
  const [editCustomerData, setEditData] = useState(initialData);
  const [permissions, setPermissions] = useState(initailPermissions);

  let colorList = ['#b9bac3', '#8f919d', '#4e5062', '#2b56cd', '#14234e', '#5ed9f5', '#14B8A6', '#fd5353', '#e33fa1', '#ff0099',];
  if (smUpMatch) colorList = colorList.concat(['#44814e', '#004008', /* '#FFB020', '#ff984e', '#ff4a4a', '#880000', */]);



  const _getAllTeammates = () => {
    dispatch(LOADING(true));
    axios.get('/team_members').then(res => {
      if (!res.data.team_members) {
        alert('Getting TEAM members data Error!');
        return;
      }
      let all_list = res.data.team_members.map(each => ({
        ...each,
        initialText: each.initial_text,
        initialColorHex: each.initial_color,
        role: each.role === 1 ? 'admin' : 'field_team',
        permissions: parseJSON(each.permissions)
      }));
      dispatch(SET_TEAMMATES(all_list));
      dispatch(LOADING(false));
    }).catch(err => console.log(err));
  }

  useEffect(() => {
    if (all_team_members.length === 0) _getAllTeammates();
    return () => {
      setEditData(initialData);
    }
  }, []);
  useEffect(() => {
    if (all_team_members.length === 0) return;
    const targetData = all_team_members.filter(e => e.id === Number(paramID))[0];
    if (!targetData)
      navigate('/setting/team');
    else {
      const { permissions, ...others } = targetData;
      setEditData(others);
      setPermissions(permissions);
    }
  }, [all_team_members]);

  console.log('all_team_members', all_team_members)

  const onRoleChange = val => setEditData({ ...editCustomerData, role: val });
  const handleUpdateTeammate = () => {
    const updateData = {
      name: editCustomerData.name,
      email: editCustomerData.email,
      initial_text: editCustomerData.initialText,
      initial_color: editCustomerData.initialColorHex,
      role: editCustomerData.role === 'admin' ? 1 : 2,
      permissions: editCustomerData.role === 'admin' ? JSON.stringify(permissions) : ''
    }
    axios.put(`/team_members/${editCustomerData.id}`, updateData).then(res => {
      if (res.data.affectedRows) {
        dispatch(UPDATE_ITEM_IN_TEAMMATES({
          ...editCustomerData,
          initial_text: editCustomerData.initialText,
          initial_color: editCustomerData.initialColorHex,
          permissions: editCustomerData.role === 'admin' ? permissions : ''
        }));
        navigate('/setting/team');
      }
    }).catch(err => {
      if (err.response.status === 400) alert(err.response.data);
      else if (err.response.status === 403) alert(err.response.data);
    });
  };


  return (
    <div className={clsx(classes.root, 'min-h-screen')}>
      <div>
        <Typography variant='h5'>Edit this team member</Typography>
        <Divider /> <br />

        <div className={classes.inputsWrapper}>
          <div>
            <Typography variant='subtitle2'>Team member name</Typography>
            <ItemComponent>
              <input placeholder='Enter their full name'
                value={editCustomerData.name} onChange={e => setEditData({ ...editCustomerData, name: e.target.value })}
              />
            </ItemComponent>
          </div>
          <div>
            <Typography variant='subtitle2'>Email address<Typography variant="caption">(optional)</Typography></Typography>
            <Typography variant="caption">They'll use this email address to sign in to YourTradebase</Typography>
            <ItemComponent>
              <input placeholder='Enter their email address'
                value={editCustomerData.email} onChange={e => setEditData({ ...editCustomerData, email: e.target.value })}
              />
            </ItemComponent>
          </div>
          <div>
            <Typography variant='subtitle2'>Initials<Typography variant="caption">(optional)</Typography></Typography>
            <Typography variant="caption">When assigned to jobs or events, we'll identify this team member with these initials</Typography>
            <div className='flex items-center'>
              <ItemComponent className='w-fit'>
                <input placeholder='AA' style={{ width: '2rem' }} maxLength={3}
                  value={editCustomerData.initialText} onChange={e => setEditData({ ...editCustomerData, initialText: e.target.value })}
                />
              </ItemComponent>
              <Circle
                className={classes.colorPicker}
                colors={colorList}
                color={editCustomerData.initialColorHex}
                onChange={(color) => setEditData({ ...editCustomerData, initialColorHex: color.hex })}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={classes.roleSection}>
        <Typography variant='h6'>What's their role?</Typography>

        <div className='role-wrapper'>
          <div className={clsx("radio-item-box", editCustomerData.role === "admin" ? 'selected' : '')}
            onClick={() => onRoleChange("admin")}
          >
            <Radio id='readio-input-admin' checked={editCustomerData.role === "admin"} color="secondary" />
            <div className="radio-content">
              <Typography className='' variant='subtitle2'>Admin</Typography>
              <Typography className='' variant='body1'>£15.00 per month</Typography>
            </div>
          </div>

          <div className={clsx("radio-item-box", editCustomerData.role === "field_team" ? 'selected' : '')}
            onClick={() => onRoleChange("field_team")}
          >
            <Radio id='readio-input-field-team' checked={editCustomerData.role === "field_team"} color="secondary" />
            <div className="radio-content">
              <Typography className='' variant='subtitle2'>Field team</Typography>
              <Typography className='' variant='body1'>FREE</Typography>
            </div>
          </div>
        </div>
      </div>


      {editCustomerData.role === 'admin' ?
        <div id="admin-permission">
          <div className={clsx(classes.permissionBox, 'can')}>
            <Typography className='permission-title' variant='h5'>Can...</Typography>
            <div className='permission-content'>
              <PermissionItem can={true} text='View, create and manage all customers, jobs and scheduling' />
              <PermissionItem can={true} text='Assign work to field team members' />
              <br />
              <div id='general'>
                <Typography variant='subtitle1'>General</Typography>
                <span className='flex items-center'>
                  <Checkbox sx={{ p: 0, pr: 1 }}
                    checked={permissions.general.admin}
                    onChange={e => setPermissions({ ...permissions, general: { ...permissions.general, admin: e.target.checked } })}
                  />
                  <Typography variant='body1'>Add and remove admins</Typography>
                </span>
                <span className='flex items-center'>
                  <Checkbox sx={{ p: 0, pr: 1 }}
                    checked={permissions.general.field_team}
                    onChange={e => setPermissions({ ...permissions, general: { ...permissions.general, field_team: e.target.checked } })}
                  />
                  <Typography variant='body1'>Add and remove field team members</Typography>
                </span>
                <span className='flex items-center'>
                  <Checkbox sx={{ p: 0, pr: 1 }}
                    checked={permissions.general.export_csv}
                    onChange={e => setPermissions({ ...permissions, general: { ...permissions.general, export_csv: e.target.checked } })}
                  />
                  <Typography variant='body1'>Export data to CSV</Typography>
                </span>
              </div>
              <br />
              <div id='invoices'>
                <Typography variant='subtitle1'>Invoices</Typography>
                <span className='flex items-center'>
                  <Checkbox sx={{ p: 0, pr: 1 }}
                    checked={permissions.invoice.view}
                    onChange={e => setPermissions({ ...permissions, invoice: { ...permissions.invoice, view: e.target.checked } })}
                  />
                  <Typography variant='body1'>View invoices</Typography>
                </span>
                <span className='flex items-center ml-4'>
                  <Checkbox sx={{ p: 0, pr: 1 }}
                    checked={permissions.invoice.add}
                    onChange={e => setPermissions({ ...permissions, invoice: { ...permissions.invoice, add: e.target.checked } })}
                  />
                  <Typography variant='body1'>Add new invoices</Typography>
                </span>
                <span className='flex items-center ml-4'>
                  <Checkbox sx={{ p: 0, pr: 1 }}
                    checked={permissions.invoice.edit_send}
                    onChange={e => setPermissions({ ...permissions, invoice: { ...permissions.invoice, edit_send: e.target.checked } })}
                  />
                  <Typography variant='body1'>Update, send and delete invoices</Typography>
                </span>
              </div>
              <br />
              <div id='quotes'>
                <Typography variant='subtitle1'>Quotes</Typography>
                <span className='flex items-center'>
                  <Checkbox sx={{ p: 0, pr: 1 }}
                    checked={permissions.quote.view}
                    onChange={e => setPermissions({ ...permissions, quote: { ...permissions.quote, view: e.target.checked } })}
                  />
                  <Typography variant='body1'>View all quotes</Typography>
                </span>
                <span className='flex items-center ml-4'>
                  <Checkbox sx={{ p: 0, pr: 1 }}
                    checked={permissions.quote.add}
                    onChange={e => setPermissions({ ...permissions, quote: { ...permissions.quote, add: e.target.checked } })}
                  />
                  <Typography variant='body1'>Add new quotes</Typography>
                </span>
                <span className='flex items-center ml-4'>
                  <Checkbox sx={{ p: 0, pr: 1 }}
                    checked={permissions.quote.edit_send}
                    onChange={e => setPermissions({ ...permissions, quote: { ...permissions.quote, edit_send: e.target.checked } })}
                  />
                  <Typography variant='body1'>Update, send and delete quotes</Typography>
                </span>
              </div>

            </div>
          </div>
          <br />
          <div className={clsx(classes.permissionBox, 'cant')}>
            <Typography className='permission-title' variant='h5'>Can't...</Typography>
            <div className='permission-content'>
              <PermissionItem can={false} text='Remove account owner' />
              <PermissionItem can={false} text='Manage billing' />
              <PermissionItem can={false} text='Cancel account' />
            </div>
          </div>
        </div>
        :
        <div id="field-team-permission">
          <div className={clsx(classes.permissionBox, 'can')}>
            <Typography className='permission-title' variant='subtitle1'>Can...</Typography>
            <div className='permission-content'>
              <PermissionItem can={true} text="Only view job sheets, events and tasks they've been assigned" />
              <PermissionItem can={true} text="Add notes and upload images to jobs they're assigned to" />
              <PermissionItem can={true} text="Receive daily schedule emails" />
            </div>
          </div>
          <br />
          <div className={clsx(classes.permissionBox, 'cant')}>
            <Typography className='permission-title' variant='subtitle1'>Can't...</Typography>
            <div className='permission-content'>
              <PermissionItem can={false} text="View any job costs or totals" />
              <PermissionItem can={false} text="View or manage any quotes or invoices" />
              <PermissionItem can={false} text="Create or update any jobs, customers or paperwork" />
            </div>
          </div>
        </div>
      }

      <div>
        <span className='flex items-center'>
          <Checkbox size='large' defaultChecked sx={{ p: 0, pr: 1 }} />
          <Typography variant='h6'>Email an invite to this team member</Typography>
        </span>
        <Typography variant='body2'>An invite allows this team member to choose a password and sign in to your account.
          You can also send (or re-send) invites later.</Typography>
      </div>

      <div className='flex justify-center mt-6'>
        <Button className='mx-4 rounded' color="secondary" variant="contained" onClick={handleUpdateTeammate}>Update this team member</Button>
        <Button className='mx-4 rounded' color="disabled" variant="outlined" onClick={() => navigate('/setting/team')}>Cancel</Button>
      </div>
    </div>
  )
}

const PermissionItem = ({ can = false, text = '' }) => (
  <div className='flex'>
    {can ?
      <CheckIcon className="mr-2" color='success' />
      :
      <CancelIcon className="mr-2" color='error' />
    }
    <Typography className='permission-text' variant='body1'>{text}</Typography>
  </div>
)