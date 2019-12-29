import axios from "axios";
const baseUrl = "https://shrouded-earth-32064.herokuapp.com/todos";

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject);
  return response.data;
};

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
};

const remove = async id => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export default {
  getAll,
  create,
  update,
  remove
};
