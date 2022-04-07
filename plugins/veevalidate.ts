import { extend, localize } from 'vee-validate'
import { required, min, max, between } from 'vee-validate/dist/rules'
import { NUMBER_REGEX } from '@injectivelabs/ui-common'

localize({
  en: {
    messages: {
      injaddress: 'This field is not a valid Injective address',
      required: 'This field is required',
      positiveNumber: 'This field is not a valid number',
      between: (_field: string, params: Record<string, any>) =>
        `${
          params.max <= params.min
            ? `Your input value of ${params._value_} cant be higher than ${params.max}`
            : `This field should be between ${params.min} and ${params.max}`
        }`,
      max: 'This field should be less than {length}',
      min: 'This field should be greater than {length}'
    }
  }
})

extend('injaddress', {
  validate: (value: string) => {
    return value.startsWith('inj') || value.length !== 42
  }
})
extend('required', required)
extend('between', between)
extend('min', min)
extend('max', max)
extend('positiveNumber', (value: string) => {
  return NUMBER_REGEX.test(value)
})
