import Store from 'electron-store'
import { JSONSchemaType } from 'json-schema-typed'

export const schema = {
  caminhoMedias: {
    type: JSONSchemaType.String,
    default: '',
  },
  caminhoFundos: {
    type: JSONSchemaType.String,
    default: '',
  },
  webTokenKey: {
    type: JSONSchemaType.String,
    default: '',
  },
  fullscreen: {
    type: JSONSchemaType.Boolean,
    default: true,
  },
  autoHideMenuBar: {
    type: JSONSchemaType.Boolean,
    default: true,
  },
}

export const store = new Store({ schema })