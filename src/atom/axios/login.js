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
  photoUrl,
  gender
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
      gender,
    },
    'POST'
  )
}

export async function logout() {
  return handleRequest('/auth/logout')
}

export async function checkResetToken(token) {
  return handleRequest('/auth/check-reset-token', { token }, 'GET')
}

export async function setNewPassword(resetToken, newPassword) {
  return handleRequest(
    '/auth/set-new-password',
    { resetToken, newPassword },
    'POST'
  )
}
