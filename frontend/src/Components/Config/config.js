const LOGIN_API_BASE_URL = 'http://192.168.29.111:1220/api';
const BOKEH_SERVER_URL = 'http://192.168.29.77:8005/'

// const BOKEH_SERVER_URL = 'http://localhost:5000/'

const LOGIN_API_ENDPOINTS = {
    login: {
        url: '/Token', 
        method: 'POST',
      },
};
const BOKEH_SERVER_URL_ENDPOINTS ={
  generatechart:{
    url:'/generate_chart',
    method:['GET','POST']
  },
  addtag:{
    url:'/add',
    method:'POST'
  },
  updateTableText:{
    url:'/update_tableTextFormat',
    method:'POST'
  },
  formatconditions:{
    url:'/formatconditions',
    method:'POST'
  },
  updatetableLetterColor:{
    url:'/update_table_lettercolor',
    method:'POST'
  },
  updatetablebgColor:{
    url:'/update_table_bgcolor',
    method:'POST'
  },
  fetchdatatable:{
    url:'',
    method:'POST'
  }
}
export { LOGIN_API_BASE_URL, LOGIN_API_ENDPOINTS,BOKEH_SERVER_URL,BOKEH_SERVER_URL_ENDPOINTS };