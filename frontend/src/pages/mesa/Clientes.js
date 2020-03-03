import React,{useContext,useEffect} from 'react'
import {MyContext} from '../../context'

export default function Clientes({history}) {
    useEffect(()=>{
        if (!context.state.isLogged) return history.push('/')
      })
    const context = useContext(MyContext)
    return (
        <div>
            <h1>Clientes</h1>
            {/*     <Input placeholder="Nombre" name="name" value={context.state.formContract.name} onChange={(e) => context.handleInput(e, 'formContract')} color="teal.700" type="text" rounded="0" placeholder="nombre de usuario" isRequired/>
                    <Input placeholder="Apellido Paterno" name="apellidoPaterno" value={context.state.formContract.apellidoPaterno} onChange={(e) => context.handleInput(e, 'formContract')} color="teal.700" type="text" roundedLeft="0" placeholder="email@emisha.com.mx" isRequired/>
                    <Input placeholder="Apellido Materno" name="apellidoMaterno" value={context.state.formContract.apellidoMaterno} onChange={(e) => context.handleInput(e, 'formContract')} color="teal.700" type="text" roundedLeft="0" placeholder="email@emisha.com.mx" isRequired/>
                     */}
        </div>
    )
}


