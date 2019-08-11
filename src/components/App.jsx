import React from 'react'
import { Segment } from '../semantic'

import Admin from './Admin'
import Header from './Header'
import Sheet from './Sheet'

export default () => (
    <Segment
        basic
        className="no-padding"
        style={{
            width: '100%',
            height: '100%'
        }}
    >
        <Sheet>
            <Header />
            <Admin />
        </Sheet>
    </Segment>
)
