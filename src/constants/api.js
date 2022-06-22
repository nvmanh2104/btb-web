//const rootApi = 'http://192.168.1.71:2020/';
const rootApi = 'http://192.168.1.71:6060/api'

const HEADERS = {
  DEFAULT_HEADER: { 'Content-Type': 'application/json; charset=UTF-8' },
  JWT_HEADER: () => ({
    'Content-Type': 'application/json; charset=UTF-8',
    Authorization: localStorage.getItem('aiJwt'),
    accept: 'application/json'
  }),
  file_header: () => ({
    'Content-Type': 'multipart/form-data',
    Authorization: localStorage.getItem('aiJwt')
  })
};

export const API = {

  SPI: {
    calculateWeekSPI: () => ({
      endPoint: rootApi + '/rain/spi/weekmonth/interpolation',
      method: 'POST',
      headers: HEADERS.JWT_HEADER()
    }),
    calculateMonthSPI: () => ({
      endPoint: rootApi + '/rain/spi/month/interpolation',
      method: 'POST',
      headers: HEADERS.JWT_HEADER()
    }),
    calculateSeasonSPI: () => ({
      endPoint: rootApi + '/rain/spi/season/interpolation',
      method: 'POST',
      headers: HEADERS.JWT_HEADER()
    }),
    calculateYearSPI: () => ({
      endPoint: rootApi + '/rain/spi/year/interpolation',
      method: 'POST',
      headers: HEADERS.JWT_HEADER()
    }),
  },

  PET:{
    calculateWeekPET:()=>({
      endPoint: rootApi + '/petari/pet/weekmonth/interpolation',
      method: 'POST',
      headers: HEADERS.JWT_HEADER()
    }),
    calculateMonthPET: () => ({
      endPoint: rootApi + '/rain/spi/month/interpolation',
      method: 'POST',
      headers: HEADERS.JWT_HEADER()
    }),
  },
  ARI:{
    calculateWeekARI:()=>({
      endPoint: rootApi + '/petari/ari/weekmonth/interpolation',
      method: 'POST',
      headers: HEADERS.JWT_HEADER()
    }),
    calculateMonthARI:()=>({
      endPoint: rootApi + '/rain/spi/weekmonth/interpolation',
      method: 'POST',
      headers: HEADERS.JWT_HEADER()
    })
  },
  THI:{
    calculateDayTHI:()=>({
      endPoint: rootApi + '/thi/daymonth/interpolation',
      method: 'POST',
      headers: HEADERS.JWT_HEADER()
    }),
  },
  SCWB:{
    calculateWeekSCWB:()=>({
      endPoint: rootApi + '/scwb/weekmonth/interpolation',
      method: 'POST',
      headers: HEADERS.JWT_HEADER()
    }),
    calculateMonthSCWB: () => ({
      endPoint: rootApi + '/scwb/month/interpolation',
      method: 'POST',
      headers: HEADERS.JWT_HEADER()
    }),
  },

}
