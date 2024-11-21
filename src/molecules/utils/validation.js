export const validationEmail =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/u

export const validationPlugin = {
  install(_, options) {
    options.setLocale({
      mixed: {
        default: 'VALIDATION.MIXED_DEFAULT',
        required: "Поле обов'язкове для заповнення",
        notType: 'VALIDATION.MIXED_REQUIRED',
      },
      string: {
        email: 'VALIDATION.STRING_EMAIL',
        // max: 'VALIDATION.STRING_MAX',
        min: ({ min }) => `Мінімально символів: ${min}`,
        max: ({ max }) => ({ key: 'VALIDATION.STRING_MAX', values: { max } }),
      },
      number: {
        positive: 'VALIDATION.NUMBER_POSITIVE',
        min: ({ min }) => ({ key: 'VALIDATION.NUMBER_MIN', values: { min } }),
        max: ({ max }) => ({ key: 'VALIDATION.NUMBER_MAX', values: { max } }),
        // moreThan: '', // must be greater than 99999
        // lessThan: '', // must be less than 1000000
        integer: 'VALIDATION.NUMBER_INTEGER',
      },
    })
  },
}
