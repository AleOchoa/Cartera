import React, { createContext, Component } from 'react'
import { withRouter } from 'react-router-dom'
import SERVICE from './services/index'
//import axios from 'axios'

export const MyContext = createContext()

class MyProvider extends Component {
  state = {
    formSignup: {
      name: '',
      email: ''
    },
    formLogin: {
      email: '',
      password: ''
    },
    loggedUser: null,
    isLogged: false,
    isOpen: false,
    allUsers: null,
    allContracts:null,
    allClients:null,
    feed:false
  }

  handleInput = (e, obj) => {
    const { name, value } = e.target
    let Obj=this.state[obj]
    Obj[name] = value
    this.setState({ Obj })
  }

  async componentDidMount() {
    const data=await SERVICE.feedAll()
    this.setState({feed:true,allUsers:data.users,allContracts:data.contracts,allClients:data.clients})
  }

  onClose = () => {
    this.setState({ isOpen: false })
  }
  deleteUser=async (e,id)=>{
    await SERVICE.deleteUser(id)
    const data= await SERVICE.feedUsers()
    this.setState({allUsers:data.users})
  }

  handleLogout = async () => {
    await SERVICE.logOut()
    this.props.history.push('/')
    this.setState({ loggedUser: null, isLogged: false })
  }

  handleSignupSubmit = async e => {
    e.preventDefault()
    const form = this.state.formSignup
    this.setState({ formSignup: { name: '', email: ''} })
    return await SERVICE.signup(form)
    .then(async({data})=>{
      const {users}=await SERVICE.feedUsers()
      this.setState({allUsers:users})
      return {user:data.user,msg:"Se ha mandado un correo al usuario."}})
    .catch(({err})=>{return {user:null,msg:"La cuenta ya existe."}})
  }

  handleLoginSubmit = e => {
    e.preventDefault()
    const form = this.state.formLogin
    return SERVICE.login(form)
      .then(( {data} ) => {
        this.setState({
          loggedUser: data.user,
          isLogged: true
        })
        return { user:data.user, msg: 'Login realizado' }
      })
      .catch(err => {
        this.setState({
          loggedUser: null,
          isLogged: false,
          formLogin: { email: '', password: '' }
        })
        return { user: null, msg: 'Email/contraseña inválidos.' }
      })
      .finally(() => this.setState({ formLogin: { email: '', password: '' } }))
  }

  render() {
    const {
      state,
      handleInput,
      handleSignupSubmit,
      handleLoginSubmit,
      handleLogout,
      onClose,
      deleteUser
    } = this
    return (
      <MyContext.Provider
        value={{
          state,
          handleInput,
          handleSignupSubmit,
          handleLoginSubmit,
          handleLogout,
          onClose,
          deleteUser
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    )
  }
}

export default withRouter(MyProvider)
