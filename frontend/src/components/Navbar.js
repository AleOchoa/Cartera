import React from 'react'
import { withRouter } from 'react-router-dom'
import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  IconButton
} from '@chakra-ui/core'
import { MyContext } from '../context'
import { TiThMenu } from "react-icons/ti";

function Navbar({ history }) {
  const go = path => history.push(path)
  return (
    <MyContext.Consumer>
      {context => {
        return (
          <Flex
            pos="fixed"
            top={0}
            zIndex="99"
            w="100vw"
            h="10vh"
            p={8}
            align="center"
            justify="space-between"
            backgroundColor="teal.300"
          >
            <Image h="9vh"  src="/logo_blanco.webp" />
            {context.state.isLogged && (
            <Menu>
              <MenuButton
                as={IconButton}
                variant="outline"
                variantColor="whity"
                aria-label="Menu"
                size="lg"
                icon={TiThMenu}
                border="none"
              ></MenuButton>
              <MenuList>
                {context.state.isAdmin && (
                  <>
                    <MenuItem onClick={() => go('/usuarios')}>Usuarios</MenuItem>
                    <MenuItem onClick={() => go('/clientes')}>Clientes</MenuItem>
                    <MenuItem onClick={() => go('/contratos')}>Contratos</MenuItem>
                    <MenuItem onClick={context.handleLogout}>Logout</MenuItem>
                  </>
                )}
                {!context.state.isAdmin && (
                  <>
                    <MenuItem onClick={() => go('/clientes')}>Clientes</MenuItem>
                    <MenuItem onClick={() => go('/contratos')}>Contratos</MenuItem>
                    <MenuItem onClick={context.handleLogout}>Logout</MenuItem>
                  </>
                )}
              </MenuList>
            </Menu>)}
          </Flex>
        )
      }}
    </MyContext.Consumer>
  )
}

export default withRouter(Navbar)
