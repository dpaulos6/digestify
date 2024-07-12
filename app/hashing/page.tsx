'use client'

import { useState, useEffect } from 'react'
import { hash, hashingAlgorithms } from '@/helpers/hashing'
import OutputWrapper from '@/components/output-wrapper'
import Head from 'next/head'
import InputWrapper from '@/components/input-wrapper'
import PageWrapper from '@/components/PageWrapper'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

export default function Home() {
  const [inputValue, setInputValue] = useState('')
  const [hashedValue, setHashedValue] = useState('')
  const [hashingType, setHashingType] = useState('bcrypt')

  useEffect(() => {
    const updateValue = async (value: string, type: string) => {
      setInputValue(value.trim())
      if (value.trim()) {
        try {
          const hashedResult = await hash(value.trim(), type)
          setHashedValue(hashedResult)
        } catch (error) {
          console.error('Error while hashing:', error)
        }
      } else {
        setHashedValue('')
      }
    }

    updateValue(inputValue, hashingType)
  }, [inputValue, hashingType])

  return (
    <>
      <Head>
        <title>Digestify - Hashing Tools</title>
      </Head>
      <PageWrapper title="Hash your data at lightspeed!">
        <Select
          onValueChange={(value: string) => {
            setHashingType(value) // Update hashingType state immediately
          }}
          defaultValue={hashingType}
        >
          <SelectTrigger className="w-full border-2 text-base hover:bg-background-hover xs:w-[180px]">
            <SelectValue
              placeholder={hashingType}
              defaultValue={'bcrypt'}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {hashingAlgorithms
                .sort((a, b) => a.localeCompare(b)) // Sort alphabetically by name
                .map((type, i) => (
                  <SelectItem
                    key={i}
                    value={type}
                  >
                    {type}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <InputWrapper
          value={inputValue}
          onChange={(value) => setInputValue(value)}
          className="h-auto min-h-52 flex-1 cursor-default resize-none rounded-md ring-1 ring-border transition hover:ring-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          placeholder="Type or paste anything to hash it."
        />
        <OutputWrapper title="Hashed string">{hashedValue}</OutputWrapper>
      </PageWrapper>
    </>
  )
}
