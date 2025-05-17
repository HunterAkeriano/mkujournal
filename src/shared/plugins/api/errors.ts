export interface DetailedErrorMessage {
  field: string
  message: string
}

export interface DetailedErrorMessageItem {
  field: string
  message: string
  location?: string
  field_full?: string
  ids?: number[]
  id?: string
  name?: string
  user_type?: string
}

export interface ApiError {
  error: boolean
  errorMessage: string
  data: DetailedErrorMessage | DetailedErrorMessageItem[]
}

export interface InnerAxiosError {
  error: ApiError
  status: number
}

export interface FieldErrors {
  [field: string]: string
}

export function getErrorMessages(error: unknown): string[] {
  if (!checkApiErrorType(error)) {
    console.error('invalid error format', error)
    return []
  }

  if (Array.isArray(error.data)) {
    return Array.from(
      new Set(
        error.data
          .filter((item) => !item.field && !item.field_full)
          .map((item) => item.message)
      )
    )
  }

  return error.data.field ? [] : Array.from(new Set([error.data.message]))
}

export function getErrorMessagesWithField(error: unknown): string[] {
  if (!checkApiErrorType(error)) {
    console.error('invalid error format', error)
    return []
  }

  if (Array.isArray(error.data)) {
    return Array.from(new Set(error.data.map((item) => item.message)))
  }

  return Array.from(new Set([error.data.message]))
}

export function getFieldsErrors(error: unknown): FieldErrors {
  const result: FieldErrors = {}

  if (!checkApiErrorType(error)) {
    console.error('invalid error format', error)
    return result
  }

  if (!Array.isArray(error.data)) {
    result[error.data.field] = error.data.message
    return result
  }

  for (const item of error.data) {
    result[item.field] = item.message
  }
  return result
}

export function checkApiErrorType(obj: unknown): obj is ApiError {
  return typeof obj === 'object' && obj !== null && 'errorMessage' in obj
}
