import React, {useContext} from 'react';
import {Box,Heading,Button,Stack,InputGroup,InputLeftAddon,Input,Icon,useToast } from "@chakra-ui/core";
import {MyContext} from '../context'

export default function Login({ history }) {
  const toast = useToast()
  const context = useContext(MyContext)

  const submit = async (e) => {
    const { user, msg } = await context.handleLoginSubmit(e)
    if (user) {
      history.push('/contratos')
    } else {
      toast({
        title: 'Revisa tus credenciales.',
        description: msg,
        status: 'error',
        duration: 5000,
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
              <Stack width="40%" minWidth="300px" >
                <Heading as="h2" color="teal.700">Ingresa a tu cuenta</Heading>
                <InputGroup>
                  <InputLeftAddon backgroundColor="teal.100" children={<Icon name="email" color="teal.700" />}/>
                  <Input name="email" value={context.state.formLogin.email} onChange={(e) => context.handleInput(e, 'formLogin')} color="teal.700" type="email" roundedLeft="0" placeholder="email@emisha.com.mx" isRequired/>
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon backgroundColor="teal.100" children={<Icon name="lock" color="teal.700" />} />
                  <Input name="password" value={context.state.formLogin.password} onChange={(e) => context.handleInput(e, 'formLogin')} color="teal.700" type="password" rounded="0" placeholder="contraseña" isRequired/>
                </InputGroup>
                <br />
                <Button type="submit" minWidth="150px" alignSelf="center" w="30%" backgroundColor="teal.300" color="teal.50" size="md">
                  Iniciar sesión
                </Button>
              </Stack>
            </Box>
          </>
        );
      }}
    </MyContext.Consumer>
  )
}



