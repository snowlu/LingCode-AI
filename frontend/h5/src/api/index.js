import request from '@/utils/request';

export const getList = (industry, resource, params = {}) => {
  return request.get(`/${industry}/${resource}/list`, { params });
};
export const getDetail = (industry, resource, id) => {
  return request.get(`/${industry}/${resource}/detail/${id}`);
};
export const addItem = (industry, resource, data) => {
  return request.post(`/${industry}/${resource}/add`, data);
};
export const updateItem = (industry, resource, data) => {
  return request.post(`/${industry}/${resource}/update`, data);
};
export const deleteItem = (industry, resource, id) => {
  return request.post(`/${industry}/${resource}/delete`, { id });
};
