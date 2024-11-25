import { handleRequest } from '@/atom/axios/use-api.js'

export async function facultetSelect(search) {
  return handleRequest(
    '/facultet/select',
    { search: search ? search : null },
    'GET'
  )
}

export async function getBlock() {
  return handleRequest('/facultet/main-block', {}, 'GET')
}

export async function updateTeacher(array) {
  return handleRequest('/facultet/update-survey', { numberId: array }, 'POST')
}
