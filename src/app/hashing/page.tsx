"use client"

import Head from "next/head"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import InputWrapper from "@/components/input-wrapper"
import OutputWrapper from "@/components/output-wrapper"
import PageWrapper from "@/components/page-wrapper"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { hash } from "@/helpers/hashing"
import { hashingAlgorithms } from "@/helpers/hashing/hashing-algorithms"

export default function Home() {
  const [inputValue, setInputValue] = useState("")
  const [hashedValue, setHashedValue] = useState("")
  const [hashingType, setHashingType] = useState(hashingAlgorithms[0])

  useEffect(() => {
    const updateValue = async (value: string, type: string) => {
      setInputValue(value.trim())
      if (value.trim()) {
        try {
          const hashedResult = await hash(value.trim(), type)
          setHashedValue(hashedResult)
        } catch (error) {
          toast.error(`Error while hashing: ${error}`)
        }
      } else {
        setHashedValue("")
      }
    }

    updateValue(inputValue, hashingType)
  }, [inputValue, hashingType])

  return (
    <>
      <Head>
        <title>Digestify - Hashing Tools</title>
      </Head>
      <PageWrapper title={`Hash your data with ${hashingType}!`}>
        <Select
          defaultValue={hashingType}
          onValueChange={(value: string) => {
            setHashingType(value) // Update hashingType state immediately
          }}
        >
          <SelectTrigger className="w-full xs:w-[180px] border-2 text-base hover:bg-background-hover">
            <SelectValue
              defaultValue={"bcrypt"}
              placeholder={hashingType}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {hashingAlgorithms
                .sort((a, b) => a.localeCompare(b)) // Sort alphabetically by name
                .map((type) => (
                  <SelectItem
                    key={type}
                    value={type}
                  >
                    {type}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <InputWrapper
          className="h-auto min-h-52 flex-1"
          onChange={(value) => setInputValue(value)}
          placeholder="Type or paste anything to hash it."
          value={inputValue}
        />
        <OutputWrapper title="Hashed string">{hashedValue}</OutputWrapper>
      </PageWrapper>
    </>
  )
}
