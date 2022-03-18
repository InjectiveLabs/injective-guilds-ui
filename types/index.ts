export interface DOMEvent<T extends EventTarget> extends Event {
  target: T
  charCode?: number
}

export interface GeoLocation {
  continent: string
  country: string
}

export * from './enums'
