import React, { createContext, Component } from 'react'
import { withRouter } from 'react-router-dom'
import AUTH_SERVICE from './services/index'
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
    feed: null
  }

  handleInput = (e, obj) => {
    const { name, value } = e.target
    let Obj=this.state[obj]
    Obj[name] = value
    this.setState({ Obj })
  }

  async componentDidMount() {
    //const { data } = await axios.get('https://api.imgflip.com/get_memes')
    //const { memes } = await AUTH_SERVICE.FEED()
    //this.setState({ meme_templates: data.data.memes, feed: memes })
  }


  onClose = () => {
    this.setState({ isOpen: false })
  }


  handleLogout = async () => {
    await AUTH_SERVICE.logOut()
    this.props.history.push('/')
    this.setState({ loggedUser: null, isLogged: false })
  }

  handleSignupSubmit = async e => {
    e.preventDefault()
    const form = this.state.formSignup
    this.setState({ formSignup: { name: '', email: ''} })
    return await AUTH_SERVICE.signup(form)
    .then(({data})=>{
      return {user:data.user,msg:"Se ha mandado un correo al usuario."}})
    .catch(({err})=>{return {user:null,msg:"La cuenta ya existe."}})
  }

  handleLoginSubmit = e => {
    e.preventDefault()
    const form = this.state.formLogin
    return AUTH_SERVICE.login(form)
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
      onClose
    } = this
    return (
      <MyContext.Provider
        value={{
          state,
          handleInput,
          handleSignupSubmit,
          handleLoginSubmit,
          handleLogout,
          onClose
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    )
  }
}

export default withRouter(MyProvider)
