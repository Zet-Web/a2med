import Router from 'next/router'

export const handleError = (err: any) => {
  if (err?.response?.status === 401) {
    console.warn(`
    ${err.message} `)

    if (Router.pathname === '/auth/login') return
    Router.replace('/auth/login')
  }
}
