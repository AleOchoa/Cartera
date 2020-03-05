import React, {useContext,useEffect} from 'react';
import {Select,Link,List,ListItem,Flex,Box,Heading,Button,Stack,Input,Icon,useToast, SimpleGrid,Text,InputLeftAddon, InputGroup } from "@chakra-ui/core";
import {MyContext} from '../../context'
import { FaPlusCircle} from 'react-icons/fa';
import { MdEdit} from 'react-icons/md';

export default function Contratos({history}) {  
    const context = useContext(MyContext)
    const toast = useToast()
    useEffect(()=>{
      if (!context.state.isLogged) return history.push('/')
    })
    const {feed,edita,nuevo}= context.state
    const submitContract = async (e) => {
        const {contract,msg}= await context.createContract(e)     
        if (contract) {
            toast({
                position:"top",
                title: "Contrato creado",
                description: msg,
                status: "success",
                duration: 4000,
                isClosable: true,
              })
        } else {
          toast({
            position:"top",
            title: 'Contrato no creado',
            description: msg,
            status: 'error',
            duration: 4000,
            isClosable: true
          })
        }
      }
    const deleteContract = async (e,id)=>{
      await context.deleteContract(e,id)
    } 
    const editContract = async(e,contract)=>{
      await context.editContract(e,contract)
    }
    const showEdit=async(e,contract)=>{
      await context.showEditContract(e,contract)
    }
    const showNuevo=async(e)=>{
      await context.showNuevo(e)
    }
    const handleChange=async(e)=>{
      await context.handleChange(e,'formContrato')
    }
    const showDetail=async(e,contract)=>{
      await context.showDetailContract(e,contract)
    }
    
    return (
        <MyContext.Consumer>
          {context => {
            return (
              <Flex direction="column" alignItems="center" justifyContent="center">
              {!nuevo && !edita && <Button marginTop="15px" onClick={showNuevo} width="170px" alignSelf="center" backgroundColor="teal.300" color="teal.50" size="md">
                      Agregar contrato
                    </Button>}
                {nuevo && <Box as="form" onSubmit={submitContract} display="flex" h="60%" justifyContent="center" minWidth="350px" w="25vw"  p={4} color="white">
                  <Stack >
                    <Heading as="h3" size="md" color="teal.700">Agrega un contrato</Heading>
                    <Text w="80px" color="teal.700">Cliente:</Text>
                    <Select color="teal.700" name="idcliente" onChange={(e)=>handleChange(e)}>
                      <option >Selecciona un cliente</option>
                      {context.state.allClients.map((cliente,indx)=>{
                          return <option key={indx} value={cliente._id}>{cliente.nombre} {cliente.apellidoPaterno} {cliente.apellidoMaterno}</option>
                      })
                      }
                    </Select>

                    <InputGroup>
                    <InputLeftAddon w="120px" backgroundColor="teal.100" children="Monto" color="teal.700" />
                    <Input placeholder="Monto" name="monto" type="number" value={context.state.formContrato.monto} onChange={(e) => context.handleInput(e, 'formContrato')} color="teal.700" rounded="2" isRequired/>
                    </InputGroup>
                    <InputGroup>
                    <InputLeftAddon w="120px" backgroundColor="teal.100" children="Plazo" color="teal.700" />
                    <Input placeholder="Plazo" name="plazo" type="number" value={context.state.formContrato.plazo} onChange={(e) => context.handleInput(e, 'formContrato')} color="teal.700" rounded="2" isRequired/>
                    </InputGroup>
                    <InputGroup>
                    <InputLeftAddon w="120px" backgroundColor="teal.100" children="Tasa" color="teal.700" />
                    <Input placeholder="Tasa" name="tasa" type="number" value={context.state.formContrato.tasa} onChange={(e) => context.handleInput(e, 'formContrato')} color="teal.700" rounded="2" isRequired/>
                    </InputGroup>
                    <InputGroup>
                    <InputLeftAddon w="120px" backgroundColor="teal.100" children="Fecha inicio" color="teal.700" />
                    <Input placeholder="Fecha inicio" name="fechaInicio" type="date" value={context.state.formContrato.fechaInicio} onChange={(e) => context.handleInput(e, 'formContrato')} color="teal.700" rounded="2" isRequired/>
                    </InputGroup>
                    <InputGroup display="flex" flexDirection="row" height="fit-content">
                    <InputLeftAddon w="120px" backgroundColor="teal.100" children="Día pago" color="teal.700" />
                    <Input placeholder="Día de pago" name="diaPago" type="number" value={context.state.formContrato.diaPago} onChange={(e) => context.handleInput(e, 'formContrato')} color="teal.700" rounded="2" isRequired/>
                    </InputGroup>
                    <Button type="submit" minWidth="150px" alignSelf="center" w="30%" backgroundColor="teal.300" color="teal.50" size="md">
                      Crear contrato
                    </Button>
                  </Stack>
                </Box>}
                {edita && <Box as="form" onSubmit={(e)=>editContract(e,context.state.formContrato.id)} display="flex" h="60%" justifyContent="center" minWidth="350px" w="25vw"  p={4} color="white">
                <Stack >
                    <Heading as="h3" size="md" color="teal.700">Editar</Heading>

                    <InputGroup>
                    <InputLeftAddon w="120px" backgroundColor="teal.100" children="Monto" color="teal.700" />
                    <Input placeholder="Monto" name="monto" type="number" value={context.state.formContrato.monto} onChange={(e) => context.handleInput(e, 'formContrato')} color="teal.700" rounded="2" isRequired/>
                    </InputGroup>
                    <InputGroup>
                    <InputLeftAddon w="120px" backgroundColor="teal.100" children="Plazo" color="teal.700" />
                    <Input placeholder="Plazo" name="plazo" type="number" value={context.state.formContrato.plazo} onChange={(e) => context.handleInput(e, 'formContrato')} color="teal.700" rounded="2" isRequired/>
                    </InputGroup>
                    <InputGroup>
                    <InputLeftAddon w="120px" backgroundColor="teal.100" children="Tasa" color="teal.700" />
                    <Input placeholder="Tasa" name="tasa" type="number" value={context.state.formContrato.tasa} onChange={(e) => context.handleInput(e, 'formContrato')} color="teal.700" rounded="2" isRequired/>
                    </InputGroup>
                    <InputGroup display="flex" flexDirection="row" height="fit-content">
                    <InputLeftAddon w="120px" backgroundColor="teal.100" children="Día pago" color="teal.700" />
                    <Input placeholder="Día de pago" name="diaPago" type="number" value={context.state.formContrato.diaPago} onChange={(e) => context.handleInput(e, 'formContrato')} color="teal.700" rounded="2" isRequired/>
                    </InputGroup>
                    
                    <Text w="80px" color="teal.700">Estatus:</Text>
                    <Select color="teal.700" name="estatus" onChange={(e)=>handleChange(e)} value={context.state.formContrato.estatus}>
                      <option value="Activo" >Activo</option>
                      <option value="Dacion" >Dación</option>
                      <option value="Quebranto" >Quebranto</option>
                      <option value="Siniestro" >Siniestro</option>
                      <option value="Terminado" >Terminado</option>
                    </Select>
                    <Button type="submit" minWidth="150px" alignSelf="center" w="30%" backgroundColor="teal.300" color="teal.50" size="md">
                      Guardar
                    </Button>
                  </Stack>
                </Box>}
                <Box as="form" display="flex" flexDir="column" onSubmit={submitContract} h="80%" justifyContent="center" minWidth="400px"  maxWidth="9500px" p={4} color="white">
                  <Heading as="h3" size="md" color="teal.700">Contratos</Heading>
                  <List>
                    <ListItem
                          color="teal.700"
                        >
                      <SimpleGrid columns={11}>
                        <Text >No. Contrato</Text>
                        <Text gridColumn="2/4" >Cliente</Text>
                        <Text >Monto</Text>
                        <Text >Plazo</Text>
                        <Text >Tasa</Text>
                        <Text >Mensualidad</Text>
                        <Text >Detalle</Text>
                        <Text >Editar</Text>
                        <Text >Borrar</Text>
                      </SimpleGrid>
                    </ListItem>
                    {feed && context.state.allContracts.map((contract, id) => (
                        <ListItem
                          key={id}
                          color="teal.700"
                        >
                          <SimpleGrid columns={11}>
                            <Text >{contract.numeroContrato}</Text>
                            <Text gridColumn="2/4" isTruncated >{contract.cliente.nombre} {contract.cliente.apellidoPaterno} {contract.cliente.apellidoMaterno}</Text>
                            <Text >{contract.monto}</Text>
                            <Text >{contract.plazo}</Text>
                            <Text >{contract.tasa}</Text>
                            <Text>{contract.mensualidad}</Text>
                            <Link onClick={(e)=>{showDetail(e,contract)} }><Box margin="auto" as={FaPlusCircle}/></Link>
                            <Link onClick={(e)=>{showEdit(e,contract)} }><Box margin="auto" as={MdEdit}/></Link>
                            <Link onClick={(e)=>{deleteContract(e,contract._id)} }><Icon margin="auto" name="delete"/></Link>
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


