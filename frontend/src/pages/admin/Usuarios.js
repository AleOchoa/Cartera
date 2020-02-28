import React, {useContext} from 'react';
import {Box,Heading,Button,Stack,InputGroup,InputLeftAddon,Input,Icon,useToast } from "@chakra-ui/core";
import {MyContext} from '../../context'

export default function Usuarios({history}) {  
    const context = useContext(MyContext)
    const toast = useToast()
    const submit = async (e) => {
        const { user, msg } = await context.handleSignupSubmit(e)
        
        if (user) {
            toast({
                position:"top-right",
                title: "Cuenta creada",
                description: msg,
                status: "success",
                duration: 4000,
                isClosable: true,
              })
          history.push('/usuarios')
        } else {
          toast({
            position:"top-right",
            title: 'Cuenta no creada',
            description: msg,
            status: 'error',
            duration: 4000,
            isClosable: true
          })
        }
      }
    

    return (
        <MyContext.Consumer>
          {context => {
            return (
              <>
                <Box as="form" onSubmit={submit} marginTop="10vh" display="flex" h="60%" justifyContent="center" w="100%" p={4} color="white">
                  <Stack width="25%" minWidth="300px" >
                    <Heading as="h3" size="md" color="teal.700">Agrega un usuario</Heading>
                    <InputGroup>
                      <InputLeftAddon backgroundColor="teal.100" children={<Icon name="user" color="teal.700" />} />
                      <Input name="name" value={context.state.formSignup.name} onChange={(e) => context.handleInput(e, 'formSignup')} color="teal.700" type="text" rounded="0" placeholder="nombre de usuario" isRequired/>
                    </InputGroup>
                    <InputGroup>
                      <InputLeftAddon backgroundColor="teal.100" children={<Icon name="email" color="teal.700" />}/>
                      <Input name="email" value={context.state.formSignup.email} onChange={(e) => context.handleInput(e, 'formSignup')} color="teal.700" type="email" roundedLeft="0" placeholder="email@emisha.com.mx" isRequired/>
                    </InputGroup>
                    <br />
                    <Button type="submit" minWidth="150px" alignSelf="center" w="30%" backgroundColor="teal.300" color="teal.50" size="md">
                      Generar usuario
                    </Button>
                  </Stack>
                </Box>
              </>
            );
          }}
        </MyContext.Consumer>
      )
}


