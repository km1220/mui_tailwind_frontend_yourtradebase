import { SET_USER_INFO, RESET_USER_INFO } from '../../actions/ActionTypes';



const initialState = {
  id: 0, name: '', email: '',  // password: '',
  fromName: '', reply2email: '', sign: '', TZ: '', lastLoginAt: '',
};
const initialState_2 = {
  id: 1, name: 'vladmir rudic', email: 'vlad******@gmail.com',  // password: '123',
  fromName: 'VR', reply2email: '2@2.com', sign: '',
  TZ: {
    value: 'America/Los_Angeles', label: '(GMT-8:00) Pacific Time', offset: -8, abbrev: 'PST', altName: 'Pacific Standard Time'
  },
  lastLoginAt: {
    epoch: 1676846874880,
    tz: "etc/gmt+5",
    silent: true,
    _weekStart: 1,
    _today: {}
  },
};



export default (state = initialState_2, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        ...action.payload
      };
    case RESET_USER_INFO:
      return initialState;


    default:
      return state;
  }
}
