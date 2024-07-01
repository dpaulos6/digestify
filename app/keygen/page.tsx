import CopyToClipboardWrapper from '@/components/copy-to-clipboard'
import { generateRandomSecret } from '@/helpers/crypto'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Next Page'
}

export default function SecretGenerator() {
  return (
    <main className="flex-1 flex flex-col items-center">
      <span className="flex items-center gap-2 text-3xl mt-12">
        Your random generated Secrets.
      </span>
      <section className="flex flex-col max-w-5xl items-start justify-center w-full gap-4 my-12 px-12">
        <div className="flex gap-2 items-center">
          <label className="text-lg font-semibold" htmlFor="keygen-secret-32">
            Secret 32 characters
          </label>
          <CopyToClipboardWrapper position="outside">
            {generateRandomSecret(32)}
          </CopyToClipboardWrapper>
        </div>
        <div className="flex gap-2 items-center">
          <label className="text-lg font-semibold" htmlFor="keygen-secret-64">
            Secret 64 characters
          </label>
          <CopyToClipboardWrapper position="outside">
            {generateRandomSecret(64)}
          </CopyToClipboardWrapper>
        </div>
      </section>
    </main>
  )
}
