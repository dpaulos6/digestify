'use client'

import OutputWrapper from '@/components/output-wrapper'
import { generatePassword } from '@/helpers/keygen'
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
import PageWrapper from '@/components/PageWrapper'

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

  return (
    <PageWrapper title="Generate a secure password.">
      <OutputWrapper title="Secure password">
        {securePassword ? securePassword : ' '}
      </OutputWrapper>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="order-2 mx-auto w-full min-w-fit max-w-xs space-y-8 rounded-xl bg-background px-8 py-6 ring-1 ring-border sm:order-1 lg:order-2 lg:w-full lg:max-w-full"
        >
          <div className="flex flex-col justify-evenly gap-8 lg:flex-row">
            <FormField
              control={form.control}
              name="length"
              render={({ field: { value, onChange } }) => (
                <FormItem className="space-y-4">
                  <div className="flex items-center gap-2">
                    <FormLabel className="text-lg">Password length</FormLabel>
                    <span className="flex min-w-10 items-center justify-center rounded-md px-2 py-1 ring-1 ring-border">
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
            <div className="flex flex-col gap-2 lg:flex-row lg:gap-8">
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
          <Button
            type="submit"
            className="mx-auto flex gap-2 px-8 text-lg"
          >
            Generate
            <RotateCcw className="h-5 w-5" />
          </Button>
        </form>
      </Form>
    </PageWrapper>
  )
}
