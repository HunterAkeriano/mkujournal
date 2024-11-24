import { handleRequest } from '@/atom/axios/use-api.js'

export async function facultetSelect(search) {
  return handleRequest(
    '/facultet/select',
    { search: search ? search : null },
    'GET'
  )
}
