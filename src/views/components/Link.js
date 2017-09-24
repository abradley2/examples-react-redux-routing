import React from 'react'

export default function Link(props) {
  const {
    replaceState = false,
    state = {},
    title = '',
    url = '',
    linkProps = {}
  } = props

  return <a
    href={url}
    ref={(el) => {if (el && !el.onclick) el.onclick = (e) => e.preventDefault()}}
    onClick={() => {
      window.history[replaceState ? 'replaceState' : 'pushState'](state, title, url)
    }}
    {...linkProps}
  >
    {props.children}
  </a>
}