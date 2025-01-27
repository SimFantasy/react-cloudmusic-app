import { redirect } from 'react-router'

const isAuth = true

export const protectedLoader = () => {
  if (!isAuth) {
    return redirect('/login')
  }
  return null
}
