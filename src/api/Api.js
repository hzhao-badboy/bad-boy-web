import request from '../../utils/http.js';

export const login = (params) => {
  return request.post('/api/login', params);
};

export const upload = (params) => {
  return request.postFormData('/api/admin/upload', params);
};

export const getAlbumList = (params) => {
  return request.get('/api/album/list', params);
};
