import { Ollama } from 'ollama'

// eslint-disable-next-line import/no-mutable-exports
export let ollama: Ollama

export const setupOllama = (host: string) => {
  ollama = new Ollama({
    fetch,
    host,
  })
}
