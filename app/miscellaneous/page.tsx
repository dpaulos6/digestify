'use client'

import CopyToClipboardWrapper from '@/components/copy-to-clipboard'
import { generatePassword } from '@/helpers/password'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
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
})

export default function SecretGenerator() {
  const [securePassword, setSecurePassword] = useState('')
  const [screenSize, setScreenSize] = useState('sm')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      length: 12,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: true
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

  useEffect(() => {
    function checkScreenSize() {
      const smallBreakpoint = window.matchMedia('(max-width: 640px)')
      const mediumBreakpoint = window.matchMedia('(min-width: 768px)')
      const largeBreakpoint = window.matchMedia('(min-width: 1024px)')

      if (smallBreakpoint.matches) {
        setScreenSize('sm')
      } else if (mediumBreakpoint.matches) {
        setScreenSize('md')
      } else if (largeBreakpoint.matches) {
        setScreenSize('lg')
      }
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return (
    <main className="flex-1 flex flex-col items-center">
      <span className="flex items-center gap-2 text-center text-2xl lg:text-3xl mt-12">
        Generate a secure password.
      </span>
      <section className="flex flex-col max-w-5xl items-start justify-center w-fit lg:w-full gap-4 my-12 px-4 md:px-12">
        <div className="w-full flex flex-col sm:flex-row lg:flex-col justify-start items-start gap-6 ">
          <div className="flex flex-col lg:flex-row gap-2 w-full sm:w-fit items-center sm:items-start lg:items-center order-1 sm:order-2 lg:order-1">
            <label
              className="text-xl font-semibold whitespace-nowrap"
              htmlFor="keygen-secret-32"
            >
              Secure Password:
            </label>
            <CopyToClipboardWrapper
              position={screenSize == 'lg' ? 'outside' : 'inside'}
            >
              <pre className="max-w-52 lg:max-w-2xl whitespace-pre-wrap break-words">
                {securePassword ? securePassword : '            '}
              </pre>
            </CopyToClipboardWrapper>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="min-w-fit lg:w-full bg-popup ring-1 ring-border px-8 py-6 rounded-xl space-y-8 order-2 sm:order-1 lg:order-2"
            >
              <div className="flex flex-col lg:flex-row justify-evenly gap-8">
                <FormField
                  control={form.control}
                  name="length"
                  render={({ field: { value, onChange } }) => (
                    <FormItem className="space-y-4">
                      <div className="flex gap-2 items-center">
                        <FormLabel className="text-lg">
                          Password length
                        </FormLabel>
                        <span className="flex items-center justify-center min-w-10 ring-1 ring-border px-2 py-1 rounded-md">
                          {value}
                        </span>
                      </div>
                      <FormControl>
                        <Slider
                          min={8}
                          max={64}
                          step={1}
                          defaultValue={[value]}
                          onValueChange={onChange}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col lg:flex-row gap-2 lg:gap-8">
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
