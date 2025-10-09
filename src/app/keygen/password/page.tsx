"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { RotateCcw } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import OutputWrapper from "@/components/output-wrapper"
import PageWrapper from "@/components/page-wrapper"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Slider } from "@/components/ui/slider"
import { generatePassword } from "@/helpers/keygen/password"

const PASSWORD_MIN_LENGTH = 8
const PASSWORD_MAX_LENGTH = 64
const PASSWORD_DEFAULT_LENGTH = 12

const formSchema = z.object({
  length: z.coerce
    .number()
    .min(PASSWORD_MIN_LENGTH, {
      message: "Password cannot be smaller than 8 characters."
    })
    .max(PASSWORD_MAX_LENGTH, {
      message: "Password cannot be larger than 64 characters."
    })
    .default(PASSWORD_DEFAULT_LENGTH),
  includeUppercase: z.boolean().default(true),
  includeLowercase: z.boolean().default(true),
  includeNumbers: z.boolean().default(true),
  includeSymbols: z.boolean().default(true)
})

export default function SecretGenerator() {
  const [securePassword, setSecurePassword] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    // biome-ignore lint/suspicious/noExplicitAny: <ignore this any>
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      length: 12,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: true
    }
  })

  useEffect(() => {
    const subscription = form.watch((values) => {
      const parsed = formSchema.safeParse(values)
      if (parsed.success) {
        setSecurePassword(generatePassword(parsed.data))
      }
    })
    return () => subscription.unsubscribe()
  }, [form])

  function onSubmit(data: z.infer<typeof formSchema>) {
    const {
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSymbols
    } = data
    const unselected = !(
      includeUppercase ||
      includeLowercase ||
      includeNumbers ||
      includeSymbols
    )

    if (unselected) {
      toast.error("Invalid Password Options.", {
        description: "Please select at least one character type."
      })
    } else {
      setSecurePassword(generatePassword(data))
    }
  }

  return (
    <PageWrapper title="Generate a secure password.">
      <OutputWrapper title="Secure password">
        {securePassword ? securePassword : " "}
      </OutputWrapper>
      <Form {...form}>
        <form
          className="order-2 mx-auto w-full min-w-fit max-w-xs space-y-8 rounded-xl bg-background px-8 py-6 ring-1 ring-border sm:order-1 lg:order-2 lg:w-full lg:max-w-full"
          onSubmit={form.handleSubmit(onSubmit)}
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
                      className="w-full"
                      defaultValue={[value]}
                      max={64}
                      min={8}
                      onValueChange={onChange}
                      step={1}
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
            className="mx-auto flex gap-2 px-8 text-lg"
            type="submit"
          >
            Generate
            <RotateCcw className="h-5 w-5" />
          </Button>
        </form>
      </Form>
    </PageWrapper>
  )
}
