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
export const getDashboard = industry => {
  return request.get(`/${industry}/dashboard`);
};
export const getPortalHome = industry => {
  return request.get(`/portal/${industry}/home`);
};
export const submitPortalOrder = (industry, data) => {
  return request.post(`/portal/${industry}/submit`, data);
};
export const getTemplates = () => {
  return request.get('/templates');
};
export const getTemplate = id => {
  return request.get(`/templates/${id}`);
};
export const getDownloadFiles = templateType => {
  return request.get(`/download/${templateType}`);
};
export const getFlowConfig = industry => {
  return request.get(`/flow/${industry}`);
};
export const advanceFlow = (industry, data) => {
  return request.post(`/flow/${industry}/advance`, data);
};
export const applyAiModule = data => {
  return request.post('/ai/apply', data);
};
export const getAiModuleTemplates = industry => {
  return request.get(`/ai/templates/${industry}`);
};
