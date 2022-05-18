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
    calculateSPI: () => ({
      endPoint: rootApi + '/rain/spi/weekmonth/interpolation',
      method: 'POST',
      headers: HEADERS.JWT_HEADER()
    }),

  },

};
