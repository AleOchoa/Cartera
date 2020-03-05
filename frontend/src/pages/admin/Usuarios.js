import React, {useContext,useEffect} from 'react';
import {Select,Link,List,ListIcon,ListItem,Flex,Box,Heading,Button,Stack,InputGroup,InputLeftAddon,Input,Icon,useToast, SimpleGrid,Text } from "@chakra-ui/core";
import {MyContext} from '../../context'
import { MdBlock,MdEdit,MdVpnKey} from 'react-icons/md';
import { FaUser} from 'react-icons/fa';


export default function Usuarios({history}) {  
    const context = useContext(MyContext)
    useEffect(()=>{
      if (!context.state.isLogged) return history.push('/')
    })
    const toast = useToast()
    const {feed,edita,nuevo}= context.state
    const submitUser = async (e) => {
        const { user, msg } = await context.handleSignupSubmit(e)
        if (user) {
            toast({
                position:"top-left",
                title: "Cuenta creada",
                description: msg,
                status: "success",
                duration: 4000,
                isClosable: true,
              })
        } else {
          toast({
            position:"top-left",
            title: 'Cuenta no creada',
            description: msg,
            status: 'error',
            duration: 4000,
            isClosable: true
          })
        }
      }
    const deleteUser = async (e,id)=>{
      await context.deleteUser(e,id)
    } 
    const editUser = async(e,user)=>{
      await context.editUser(e,user)
    }
    const showEdit=async(e,user)=>{
      await context.showEditUser(e,user)
    }
    const showNuevo=async(e)=>{
      await context.showNuevo(e)
    }
    const restorePassword = async(e,id)=>{
      await context.restorePassword(e,id)
    }
    const changeStatus=async(e,id)=>{
      await context.changeStatus(e,id)
    }
    const handleChange=async(e)=>{
      await context.handleChange(e,'formUsuario')
    }
    
    return (
        <MyContext.Consumer>
          {context => {
            return (
              <Flex direction="column" alignItems="center" justifyContent="center">
              {!nuevo && !edita && <Button marginTop="15px" onClick={showNuevo} width="120px" alignSelf="center" backgroundColor="teal.300" color="teal.50" size="md">
                      Nuevo usuario
                    </Button>}
                {nuevo && <Box as="form" onSubmit={submitUser} display="flex" h="60%" justifyContent="center" minWidth="350px" w="25vw"  p={4} color="white">
                  <Stack >
                    <Heading as="h3" size="md" color="teal.700">Agrega un usuario</Heading>
                    <InputGroup>
                      <InputLeftAddon backgroundColor="teal.100" children={<Box as={FaUser} color="teal.700" />} />
                      <Input name="name" value={context.state.formSignup.name} onChange={(e) => context.handleInput(e, 'formSignup')} color="teal.700" type="text" rounded="0" placeholder="nombre de usuario" isRequired/>
                    </InputGroup>
                    <InputGroup size="md">
                      <InputLeftAddon backgroundColor="teal.100" children={<Icon name="email" color="teal.700" />}/>
                      <Input name="email" value={context.state.formSignup.email} onChange={(e) => context.handleInput(e, 'formSignup')} color="teal.700" type="email" roundedLeft="0" placeholder="email@emisha.com.mx" isRequired/>
                    </InputGroup>
        
                    <Button type="submit" minWidth="150px" alignSelf="center" w="30%" backgroundColor="teal.300" color="teal.50" size="md">
                      Generar usuario
                    </Button>
                  </Stack>
                </Box>}
                {edita && <Box as="form" onSubmit={(e)=>editUser(e,context.state.formUsuario.id)} display="flex" h="60%" justifyContent="center" minWidth="350px" w="25vw"  p={4} color="white">
                  <Stack >
                    <Heading as="h3" size="md" color="teal.700">Editar</Heading>
                    <InputGroup>
                      <InputLeftAddon backgroundColor="teal.100" children={<Box as={FaUser} color="teal.700" />} />
                      <Input name="name" value={context.state.formUsuario.name} onChange={(e) => context.handleInput(e, 'formUsuario')} color="teal.700" type="text" rounded="0" placeholder="nombre de usuario" isRequired/>
                    </InputGroup>
                    <InputGroup size="md">
                      <InputLeftAddon backgroundColor="teal.100" children={<Icon name="email" color="teal.700" />}/>
                      <Input name="email" value={context.state.formUsuario.email} onChange={(e) => context.handleInput(e, 'formUsuario')} color="teal.700" type="email" roundedLeft="0" placeholder="email@emisha.com.mx" isRequired/>
                    </InputGroup>
                    <Select color="teal.700" name="rol" onChange={(e)=>handleChange(e)} value={context.state.formUsuario.rol}>
                      <option value="Mesa">Mesa</option>
                      <option value="Admin">Admin</option>
                    </Select>
        
                    <Button type="submit" minWidth="150px" alignSelf="center" w="30%" backgroundColor="teal.300" color="teal.50" size="md">
                      Guardar
                    </Button>
                  </Stack>
                </Box>}
                <Box as="form" display="flex" flexDir="column" onSubmit={submitUser} h="80%" justifyContent="center" minWidth="400px"  maxWidth="9500px" p={4} color="white">
                  <Heading as="h3" size="md" color="teal.700">Usuarios</Heading>
                  <List>
                    <ListItem
                          color="teal.700"
                        >
                      <SimpleGrid columns={13}>
                        <Text >Estatus</Text>
                        <Text gridColumn="2/6" >Nombre</Text>
                        <Text gridColumn="6/10">Email</Text>
                        <Text gridColumn="10/11" >Perfil</Text>
                        <Text >Editar</Text>
                        <Text >Borrar</Text>
                        <Text >Reiniciar Password</Text>
                      </SimpleGrid>
                    </ListItem>
                    {feed && context.state.allUsers.map((user, id) => (
                        <ListItem
                          key={id}
                          color="teal.700"
                        >
                          <SimpleGrid columns={13}>
                            {user.isActive && <ListIcon onClick={(e)=>{changeStatus(e,user._id)} } margin="auto" icon="check-circle" color="green.500" />}
                            {!user.isActive && <ListIcon onClick={(e)=>{changeStatus(e,user._id)} } margin="auto" icon={MdBlock} color="red.500" />}
                            <Text gridColumn="2/6" isTruncated>{user.name}</Text>
                            <Text gridColumn="6/10" isTruncated>{user.email}</Text>
                            <Text gridColumn="10/11" >{user.rol}</Text>
                            <Link onClick={(e)=>{showEdit(e,user)} }><Box margin="auto" as={MdEdit}/></Link>
                            <Link onClick={(e)=>{deleteUser(e,user._id)} }><Icon margin="auto" name="delete"/></Link>
                            <Link color="gray.400" onClick={(e)=>{restorePassword(e,user._id)} }><Box margin="auto" as={MdVpnKey}/></Link>
                          </SimpleGrid>
                          </ListItem>

                      ))}
                  </List>
                </Box>  
              </Flex>
            );
          }}
        </MyContext.Consumer>
      )
}


