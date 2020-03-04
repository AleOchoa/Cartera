import React, {useContext,useEffect} from 'react';
import {Select,Link,List,ListItem,Flex,Box,Heading,Button,Stack,Input,Icon,useToast, SimpleGrid,Text,InputLeftAddon, InputGroup } from "@chakra-ui/core";
import {MyContext} from '../../context'

export default function DetalleContrato({history}) {  
    const context = useContext(MyContext)
    const toast = useToast()
    useEffect(()=>{
      if (!context.state.isLogged) return history.push('/')
    })
    const contract=context.state.contratoDetalle
    return (
        <MyContext.Consumer>
          {context => {
            return (
              <Flex wrap="wrap" justifyContent="center">
                <Box display="flex" flexDir="column"  h="80%" justifyContent="center" minWidth="400px"  maxWidth="9500px" p={4} color="white">
                  <Heading as="h3" size="md" color="teal.700">Detalle Contrato</Heading>
                  <List>
                    <ListItem
                          color="teal.700"
                        >
                      <SimpleGrid columns={11}>
                        <Text >No. Contrato</Text>
                        <Text gridColumn="3/5" >Cliente</Text>
                        <Text >Monto</Text>
                        <Text >Plazo</Text>
                        <Text >Tasa</Text>
                        <Text gridColumn="9/10">Mensualidad</Text>
                        <Text >Primer Pago</Text>
                      </SimpleGrid>
                    </ListItem>
                        <ListItem color="teal.700">
                      <SimpleGrid columns={11}>
                        <Text >{contract.numeroContrato}</Text>
                        <Text gridColumn="3/5" isTruncated >{contract.cliente.nombre} {contract.cliente.apellidoPaterno} {contract.cliente.apellidoMaterno}</Text>
                        <Text >{contract.monto}</Text>
                        <Text >{contract.plazo}</Text>
                        <Text >{contract.tasa}</Text>
                        <Text gridColumn="9/10">{contract.mensualidad}</Text>
                        <Text >{contract.fechaPrimerPagoCorto}</Text>
                      </SimpleGrid>
                      </ListItem>
                  </List>
                  <Heading as="h4" size="md" color="teal.700">Tabla Amortización</Heading>
                  <List>
                    <ListItem color="teal.700">
                      <SimpleGrid columns={10}>
                        <Text>Pago</Text>
                        <Text>Fecha Exigibilidad</Text>
                        <Text gridColumn="3/4" >Saldo Inicial</Text>
                        <Text>Capital</Text>
                        <Text>Interés</Text>
                        <Text>Iva Interés</Text>
                        <Text gridColumn="8/9">Saldo Final</Text>
                        <Text>Mensualidad</Text>
                      </SimpleGrid>
                    </ListItem>
                    {contract.tablaOriginal.map((el,indx)=>(
                      <ListItem
                          key={indx}
                          color="teal.700"
                        >
                      <SimpleGrid columns={10}>
                        <Text>{el.pago}</Text>
                        <Text>{el.fechaExigibilidad}</Text>
                        <Text gridColumn="3/4" >{el.saldoInicial}</Text>
                        <Text>{el.capital}</Text>
                        <Text>{el.interes}</Text>
                        <Text>{el.ivaInteres}</Text>
                        <Text gridColumn="8/9">{el.saldoFinal}</Text>
                        <Text>{el.mensualidad}</Text>
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