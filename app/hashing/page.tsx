"use client";

import Head from "next/head";
import { useEffect, useState } from "react";
import InputWrapper from "@/components/input-wrapper";
import OutputWrapper from "@/components/output-wrapper";
import PageWrapper from "@/components/page-wrapper";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { hash, hashingAlgorithms } from "@/helpers/hashing";

export default function Home() {
	const [inputValue, setInputValue] = useState("");
	const [hashedValue, setHashedValue] = useState("");
	const [hashingType, setHashingType] = useState(hashingAlgorithms[0]);

	useEffect(() => {
		const updateValue = async (value: string, type: string) => {
			setInputValue(value.trim());
			if (value.trim()) {
				try {
					const hashedResult = await hash(value.trim(), type);
					setHashedValue(hashedResult);
				} catch (error) {
					console.error("Error while hashing:", error);
				}
			} else {
				setHashedValue("");
			}
		};

		updateValue(inputValue, hashingType);
	}, [inputValue, hashingType]);

	return (
		<>
			<Head>
				<title>Digestify - Hashing Tools</title>
			</Head>
			<PageWrapper title={`Hash your data with ${hashingType}!`}>
				<Select
					onValueChange={(value: string) => {
						setHashingType(value); // Update hashingType state immediately
					}}
					defaultValue={hashingType}
				>
					<SelectTrigger className="w-full xs:w-[180px] border-2 text-base hover:bg-background-hover">
						<SelectValue placeholder={hashingType} defaultValue={"bcrypt"} />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							{hashingAlgorithms
								.sort((a, b) => a.localeCompare(b)) // Sort alphabetically by name
								.map((type) => (
									<SelectItem key={type} value={type}>
										{type}
									</SelectItem>
								))}
						</SelectGroup>
					</SelectContent>
				</Select>
				<InputWrapper
					value={inputValue}
					onChange={(value) => setInputValue(value)}
					className="h-auto min-h-52 flex-1 "
					placeholder="Type or paste anything to hash it."
				/>
				<OutputWrapper title="Hashed string">{hashedValue}</OutputWrapper>
			</PageWrapper>
		</>
	);
}
