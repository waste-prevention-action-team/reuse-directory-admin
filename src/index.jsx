import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'

import './style/base.less'

ReactDOM.render(
    <App />,
    document.getElementById('App')
)
