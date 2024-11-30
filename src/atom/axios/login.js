import { handleRequest } from '@/atom/axios/use-api.js'

export async function login(email, password) {
  return handleRequest('/auth/login', { email, password }, 'POST')
}

export async function signoutUser() {
  return handleRequest('/auth/signout', {}, 'POST')
}

export async function resetPassword(email) {
  return handleRequest('/auth/reset-password', { email }, 'POST')
}

export async function myProfile() {
  return handleRequest('/profile', {}, 'GET')
}

export async function registration(
  email,
  password,
  name,
  surName,
  dateCreated,
  facultet,
  phone,
  photoUrl
) {
  return handleRequest(
    '/auth/register',
    {
      email: email,
      password: password,
      name: name,
      surName: surName,
      dateCreated: new Date(dateCreated),
      facultet,
      phone,
      roleType: 'student',
      photoUrl,
    },
    'POST'
  )
}

export async function logout() {
  return handleRequest('/auth/logout')
}
