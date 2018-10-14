import React, { Component } from 'react'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import getURL from './getURL'
import getQueryParameter from './getQueryParameter'
import reset from './reset'
/* global localStorage */

export default class LinkedIn extends Component {
  static propTypes = {
    clientId: PropTypes.string,
    callback: PropTypes.func.isRequired,
    className: PropTypes.string,
    redirectUri: PropTypes.string,
    text: PropTypes.node,
    scope: PropTypes.arrayOf(PropTypes.string)
  }

  static defaultProps = {
    redirectUri: window.location.href
  }

  componentDidMount () {
    this.restart()
  }

  @autobind
  start () {
    const { clientId, scope, redirectUri } = this.props
    const state = Math.random().toString(36).substring(7)

    localStorage.linkedInReactLogin = state
    localStorage.linkedInReactLoginRedirectUri = redirectUri

    window.location.href = getURL({ clientId, state, scope, redirectUri })
  }

  @autobind
  restart () {
    const state = localStorage.linkedInReactLogin
    const redirectUri = localStorage.linkedInReactLoginRedirectUri
    const code = getQueryParameter('code')

    if (!code || !state || state !== getQueryParameter('state')) {
      return
    } else {
      reset()
      this.props.callback({code, redirectUri})
    }
  }

  render () {
    return (
      <button className={this.props.className} onClick={this.start}>
        {this.props.text}
      </button>
    )
  }
}
