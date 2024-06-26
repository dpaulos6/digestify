import { generateRandomSecret } from '@/helpers/crypto'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Next Page'
}

export default function SecretGenerator() {
  return (
    <main className="flex-1 flex flex-col items-center">
      <span className="flex items-center gap-2 text-3xl mt-12">
        Your random generated secret.
      </span>
      <section className="flex flex-col max-w-5xl justify-center w-full gap-4 items-center my-12 px-12">
        <textarea
          className="w-1/2 h-fit resize-none border py-1 px-1.5 rounded bg-foreground/5"
          rows={1}
        >
          {generateRandomSecret(32)}
        </textarea>
        <textarea
          className="w-1/2 h-fit resize-none border py-1 px-1.5 rounded bg-foreground/5"
          rows={2}
        >
          {generateRandomSecret(64)}
        </textarea>
        <textarea
          className="w-1/2 h-fit resize-none border py-1 px-1.5 rounded bg-foreground/5"
          rows={3}
        >
          {generateRandomSecret(128)}
        </textarea>
        <textarea
          className="w-1/2 h-fit resize-none border py-1 px-1.5 rounded bg-foreground/5"
          rows={6}
        >
          {generateRandomSecret(256)}
        </textarea>
      </section>
    </main>
  )
}
