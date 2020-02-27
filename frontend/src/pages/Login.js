import React from 'react';
import {Box,Heading,Button,Stack,InputGroup,InputLeftAddon,Input,Icon } from "@chakra-ui/core";
function Home() {
  return (
    <>
    <Box marginTop="20vh" display="flex" h="60%" justifyContent="center" w="100%" p={4} color="white">
      <Stack width="40%" minWidth="300px">
      <Heading as="h2" color="teal.700">Ingresa a tu cuenta</Heading>
      
        <InputGroup>
          <InputLeftAddon backgroundColor="teal.100" children={<Icon name="email" color="teal.700" />}/>
          <Input type="email" roundedLeft="0" placeholder="email@emisha.com.mx" />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon backgroundColor="teal.100" children={<Icon name="lock" color="teal.700" />} />
          <Input type="password" rounded="0" placeholder="password" />
        </InputGroup>

      <br />
  <Button minWidth="150px" alignSelf="center" w="30%" backgroundColor="teal.300" color="teal.50" size="md">
    Iniciar sesión
  </Button>
  </Stack>
    </Box>
    </>
  );
}

export default Home;
