'use client'

import CopyToClipboardWrapper from '@/components/copy-to-clipboard'
import { generatePassword } from '@/helpers/password'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Slider } from '@/components/ui/slider'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from '@/components/ui/use-toast'
import { Checkbox } from '@/components/ui/checkbox'
import { RotateCcw } from 'lucide-react'

const formSchema = z.object({
  length: z.coerce
    .number()
    .min(8, { message: 'Password cannot be smaller than 8 characters.' })
    .max(64, { message: 'Password cannot be larger than 64 characters.' })
    .default(12),
  includeUppercase: z.boolean().default(true),
  includeLowercase: z.boolean().default(true),
  includeNumbers: z.boolean().default(true),
  includeSymbols: z.boolean().default(true)
  // easyToRead: z.boolean().default(false),
  // easyToSay: z.boolean().default(false)
})
// .refine(
//   (data) =>
//     data.includeUppercase ||
//     data.includeLowercase ||
//     data.includeNumbers ||
//     data.includeSymbols,
//   {
//     message: 'At least one character type must be selected',
//     path: [
//       'includeUppercase',
//       'includeLowercase',
//       'includeNumbers',
//       'includeSymbols'
//     ]
//   }
// )

export default function SecretGenerator() {
  const [securePassword, setSecurePassword] = useState('')
  const [isUnselected, setIsUnselected] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      length: 12,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: true
      // easyToRead: false,
      // easyToSay: false
    }
  })

  const { watch } = form

  useEffect(() => {
    setSecurePassword(generatePassword(watch()))
  }, [watch])

  function onSubmit(data: z.infer<typeof formSchema>) {
    const {
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSymbols
    } = data
    const unselected =
      !includeUppercase &&
      !includeLowercase &&
      !includeNumbers &&
      !includeSymbols
    setIsUnselected(unselected)

    if (!unselected) {
      toast({ itemID: 'invalidPasswordOptions' }).dismiss()
      setSecurePassword(generatePassword(data))
    } else {
      toast({
        itemID: 'invalidPasswordOptions',
        variant: 'destructive',
        title: 'Invalid Password Options.',
        description: 'At least one character type must be selected.'
      })
    }
  }

  return (
    <main className="flex-1 flex flex-col items-center">
      <span className="flex items-center gap-2 text-3xl mt-12">
        Generate a secure password.
      </span>
      <section className="flex flex-col max-w-5xl items-start justify-center w-full gap-4 my-12 px-12">
        <div className="w-full flex flex-col items-start gap-6 ">
          <div className="flex gap-2 items-center">
            <label
              className="text-xl font-semibold whitespace-nowrap"
              htmlFor="keygen-secret-32"
            >
              Secure Password:
            </label>
            <CopyToClipboardWrapper position="outside">
              <pre className="max-w-2xl whitespace-pre-wrap break-words">
                {securePassword ? securePassword : '            '}
              </pre>
            </CopyToClipboardWrapper>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="min-w-fit w-full bg-popup ring-1 ring-border px-8 py-6 rounded-xl space-y-8"
            >
              <div className="flex justify-between gap-8">
                <FormField
                  control={form.control}
                  name="length"
                  render={({ field: { value, onChange } }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Password length</FormLabel>
                      <FormControl>
                        <div className="flex gap-2">
                          <span className="flex items-center justify-center min-w-10 ring-1 ring-border px-2 py-1 rounded-md">
                            {value}
                          </span>
                          <Slider
                            min={8}
                            max={64}
                            step={1}
                            defaultValue={[value]}
                            onValueChange={onChange}
                            className="w-32 "
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="includeUppercase"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-base">Uppercase</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="includeLowercase"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-base">Lowercase</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="includeNumbers"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-base">Numbers</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="includeSymbols"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-base">Symbols</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="flex gap-2 mx-auto px-8 text-lg">
                Generate
                <RotateCcw className="w-5 h-5" />
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </main>
  )
}
