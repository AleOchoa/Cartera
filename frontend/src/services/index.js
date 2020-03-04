import axios from 'axios';
let baseURL;

process.env.NODE_ENV === 'production'
  ? (baseURL = 'https://carteraemisha.herokuapp.com')
  : (baseURL = 'http://localhost:3000');

const service = axios.create({ withCredentials: true, baseURL });

const MY_SERVICE = {
  test: async () => {
    return await service.get('/');
  },
  signup: async (user) => {
    return await service.post('/signup', user);
  },
  login: async (user) => {
    return await service.post('/login', user);
  },
  logOut: async () => {
    return await service.get('/logout');
  },
//Carga información
  feedAll: async()=>{
    const users= await service.get('/usuarios')
    const clients= await service.get('/cliente')
    const contracts= await service.get('/contrato')
    return {users:users.data.users,contracts:contracts.data.contratos,clients:clients.data.clientes}
  },
  feedUsers: async()=>{
    const users= await service.get('/usuarios')
    return {users:users.data.users}
  },
  feedClients: async()=>{
    const clients= await service.get('/cliente')
    return {clients:clients.data.clientes}
  },
  feedContracts: async()=>{
    const contracts= await service.get('/contrato')
    return {contracts:contracts.data.contratos}
  },
//CRUD Usuario
  deleteUser: async(id)=>{
    const msg=await service.delete(`/borraUsuario/${id}`)
    return {msg}
  },
  editUser:async (id,form)=>{
    const user=await service.patch(`/editaUsuario/${id}`,form)
    return {user}
  },
  changeStatus:async (id)=>{
    const user=await service.patch(`/cambiaEstatus/${id}`)
    return{user}
  },
//CRUD Contrato
  createContract:async (form)=>{
    const contrato=await service.post('/contrato/crea',form)
    return{contrato}
  },
  editContract:async (id,form) => {
    const contract=await service.patch(`/contrato/edita/${id}`,form)
    return {contract}
  },
  deleteContract:async (id)=>{
    const msg=await service.delete(`/contrato/borra/${id}`)
    return {msg}
  },
//CRUD Cliente
  createClient:async (form)=>{
    const client=await service.post('/cliente/crea',form)
    return{cliente:client.data.cliente}
  },
  editClient:async (id,form) => {
    const cliente=await service.patch(`/cliente/edita/${id}`,form)
    return {cliente}
  },
  deleteClient:async (id)=>{
    const msg=await service.delete(`/cliente/borra/${id}`)
    return {msg}
  }

};

export default MY_SERVICE;
