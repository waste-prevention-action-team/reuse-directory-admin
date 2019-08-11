import React from 'react'

import { Header as SUIHeader, Image, Menu } from '../semantic'
import logo from '../images/logo-small-wpat.jpg'

const Header = () => (
    <Menu id="Header" borderless>
        <Menu.Item header>
            <SUIHeader as="h3">
                <Image src={logo} avatar />
                Waste Reduction Directory - Admin
            </SUIHeader>
        </Menu.Item>
        <Menu.Item position="right">
            <SUIHeader as="h4">
                Benton County, OR
            </SUIHeader>
        </Menu.Item>
    </Menu>
)

export default Header
