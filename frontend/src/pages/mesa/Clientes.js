import React, {useContext,useEffect} from 'react';
import {Select,Link,List,ListItem,Flex,Box,Heading,Button,Stack,Input,Icon,useToast, SimpleGrid,Text,InputLeftAddon, InputGroup } from "@chakra-ui/core";
import {MyContext} from '../../context'
import { MdEdit} from 'react-icons/md';

export default function Clientes({history}) {  
    const context = useContext(MyContext)
    const toast = useToast()
    useEffect(()=>{
      if (!context.state.isLogged) return history.push('/')
    })
    const {feed,edita,nuevo}= context.state
    const submitClient = async (e) => {
        const {client,msg}= await context.createClient(e)     
        if (client) {
            toast({
                position:"top",
                title: "Cliente creado",
                description: msg,
                status: "success",
                duration: 4000,
                isClosable: true,
              })
        } else {
          toast({
            position:"top",
            title: 'Cliente no creado',
            description: msg,
            status: 'error',
            duration: 4000,
            isClosable: true
          })
        }
      }
    const deleteClient = async (e,id)=>{
      await context.deleteClient(e,id)
    } 
    const editClient = async(e,client)=>{
      await context.editClient(e,client)
    }
    const showEdit=async(e,client)=>{
      await context.showEditClient(e,client)
    }
    const showNuevo=async(e)=>{
      await context.showNuevo(e)
    }
    const handleChange=async(e)=>{
      await context.handleChange(e,'formCliente')
    }
    
    return (
        <MyContext.Consumer>
          {context => {
            return (
              <Flex direction="column" alignItems="center" justifyContent="center">
              {!nuevo && !edita && <Button marginTop="15px" onClick={showNuevo} width="170px" alignSelf="center" backgroundColor="teal.300" color="teal.50" size="md">
                      Agregar cliente
                    </Button>}
                {nuevo && <Box as="form" onSubmit={submitClient} display="flex" h="60%" justifyContent="center" minWidth="350px" w="25vw"  p={4} color="white">
                  <Stack >
                    <Heading as="h3" size="md" color="teal.700">Agrega un cliente</Heading>
                    
                    <InputGroup>
                    <InputLeftAddon w="120px" backgroundColor="teal.100" children="Nombre" color="teal.700" />
                    <Input placeholder="Nombre" name="nombre" type="text" value={context.state.formCliente.nombre} onChange={(e) => context.handleInput(e, 'formCliente')} color="teal.700" rounded="2" isRequired/>
                    </InputGroup>
                    <InputGroup>
                    <InputLeftAddon w="120px" backgroundColor="teal.100" children="Ap. Paterno" color="teal.700" />
                    <Input placeholder="Apellido Paterno" name="apellidoPaterno" type="text" value={context.state.formCliente.apellidoPaterno} onChange={(e) => context.handleInput(e, 'formCliente')} color="teal.700" rounded="2" isRequired/>
                    </InputGroup>
                    <InputGroup>
                    <InputLeftAddon w="120px" backgroundColor="teal.100" children="Ap. Materno" color="teal.700" />
                    <Input placeholder="Apellido Materno" name="apellidoMaterno" type="text" value={context.state.formCliente.apellidoMaterno} onChange={(e) => context.handleInput(e, 'formCliente')} color="teal.700" rounded="2" isRequired/>
                    </InputGroup>
                    <InputGroup>
                    <InputLeftAddon w="120px" backgroundColor="teal.100" children="RFC" color="teal.700" />
                    <Input placeholder="RFC" name="rfc" type="text" value={context.state.formCliente.rfc} onChange={(e) => context.handleInput(e, 'formCliente')} color="teal.700" rounded="2" isRequired/>
                    </InputGroup>
                    <InputGroup>
                    <InputLeftAddon w="120px" backgroundColor="teal.100" children="CURP" color="teal.700" />
                    <Input placeholder="CURP" name="curp" type="text" value={context.state.formCliente.curp} onChange={(e) => context.handleInput(e, 'formCliente')} color="teal.700" rounded="2" isRequired/>
                    </InputGroup>
                    <InputGroup>
                    <InputLeftAddon w="120px" backgroundColor="teal.100" children="No. Cliente" color="teal.700" />
                    <Input placeholder="Número de cliente" name="numCliente" type="text" value={context.state.formCliente.numCliente} onChange={(e) => context.handleInput(e, 'formCliente')} color="teal.700" rounded="2" isRequired/>
                    </InputGroup>
                    <Select color="teal.700" name="genero" onChange={(e)=>handleChange(e)}>
                      <option >Selecciona tu género</option>
                      <option value="Femenino">Femenino</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Indefinido">Indefinido</option>
                  
                    </Select>
                    <Button type="submit" minWidth="150px" alignSelf="center" w="30%" backgroundColor="teal.300" color="teal.50" size="md">
                      Crear cliente
                    </Button>
                  </Stack>
                </Box>}
                {edita && <Box as="form" onSubmit={(e)=>editClient(e,context.state.formCliente.id)} display="flex" h="60%" justifyContent="center" minWidth="350px" w="25vw"  p={4} color="white">
                <Stack >
                    <Heading as="h3" size="md" color="teal.700">Editar</Heading>
                    
                    <InputGroup>
                    <InputLeftAddon w="120px" backgroundColor="teal.100" children="Nombre" color="teal.700" />
                    <Input placeholder="Nombre" name="nombre" type="text" value={context.state.formCliente.nombre} onChange={(e) => context.handleInput(e, 'formCliente')} color="teal.700" rounded="2" isRequired/>
                    </InputGroup>
                    <InputGroup>
                    <InputLeftAddon w="120px" backgroundColor="teal.100" children="Ap. Paterno" color="teal.700" />
                    <Input placeholder="Apellido Paterno" name="apellidoPaterno" type="text" value={context.state.formCliente.apellidoPaterno} onChange={(e) => context.handleInput(e, 'formCliente')} color="teal.700" rounded="2" isRequired/>
                    </InputGroup>
                    <InputGroup>
                    <InputLeftAddon w="120px" backgroundColor="teal.100" children="Ap. Materno" color="teal.700" />
                    <Input placeholder="Apellido Materno" name="apellidoMaterno" type="text" value={context.state.formCliente.apellidoMaterno} onChange={(e) => context.handleInput(e, 'formCliente')} color="teal.700" rounded="2" isRequired/>
                    </InputGroup>
                    <InputGroup>
                    <InputLeftAddon w="120px" backgroundColor="teal.100" children="RFC" color="teal.700" />
                    <Input placeholder="RFC" name="rfc" type="text" value={context.state.formCliente.rfc} onChange={(e) => context.handleInput(e, 'formCliente')} color="teal.700" rounded="2" isRequired/>
                    </InputGroup>
                    <InputGroup>
                    <InputLeftAddon w="120px" backgroundColor="teal.100" children="CURP" color="teal.700" />
                    <Input placeholder="CURP" name="curp" type="text" value={context.state.formCliente.curp} onChange={(e) => context.handleInput(e, 'formCliente')} color="teal.700" rounded="2" isRequired/>
                    </InputGroup>
                    <InputGroup>
                    <InputLeftAddon w="120px" backgroundColor="teal.100" children="No. Cliente" color="teal.700" />
                    <Input placeholder="Número de cliente" name="numCliente" type="text" value={context.state.formCliente.numCliente} onChange={(e) => context.handleInput(e, 'formCliente')} color="teal.700" rounded="2" isRequired/>
                    </InputGroup>
                    <Select color="teal.700" name="genero" value={context.state.formCliente.genero} onChange={(e)=>handleChange(e)}>
                      <option >Selecciona tu género</option>
                      <option value="Femenino">Femenino</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Indefinido">Indefinido</option>
                    </Select>

                    <Button type="submit" minWidth="150px" alignSelf="center" w="30%" backgroundColor="teal.300" color="teal.50" size="md">
                      Guardar
                    </Button>
                  </Stack>
                </Box>}
                <Box as="form" display="flex" flexDir="column" onSubmit={submitClient} h="80%" justifyContent="center" minWidth="400px"  maxWidth="9500px" p={4} color="white">
                  <Heading as="h3" size="md" color="teal.700">Clientes</Heading>
                  <List>
                    <ListItem
                          color="teal.700"
                        >
                      <SimpleGrid columns={9}>
                        <Text >Nombre</Text>
                        <Text >Apellido Paterno</Text>
                        <Text >Apellido Materno</Text>
                        <Text >No. Cliente</Text>
                        <Text >RFC</Text>
                        <Text >CURP</Text>
                        <Text >Genero</Text>
                        <Text >Editar</Text>
                        <Text >Borrar</Text>
                      </SimpleGrid>
                    </ListItem>
                    {feed && context.state.allClients.map((client, id) => (
                        <ListItem
                          key={id}
                          color="teal.700"
                        >
                          <SimpleGrid columns={9}>
                            <Text >{client.nombre}</Text>
                            <Text >{client.apellidoPaterno}</Text>
                            <Text >{client.apellidoMaterno}</Text>
                            <Text >{client.numCliente}</Text>
                            <Text >{client.rfc}</Text>
                            <Text>{client.curp}</Text>
                            <Text >{client.genero}</Text>
                            <Link onClick={(e)=>{showEdit(e,client)} }><Box margin="auto" as={MdEdit}/></Link>
                            <Link onClick={(e)=>{deleteClient(e,client._id)} }><Icon margin="auto" name="delete"/></Link>
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



