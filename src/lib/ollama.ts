import { Ollama } from 'ollama'

// eslint-disable-next-line import/no-mutable-exports
export let ollama: Ollama

export const setupOllama = (host: string = 'http://127.0.0.1:11434') => {
  ollama = new Ollama({
    fetch,
    host,
  })
}
