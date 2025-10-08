"use client";

import { Editor } from "@monaco-editor/react";
import JSON5 from "json5";
import { useRef, useState } from "react";
import { toast } from "sonner";
import PageWrapper from "@/components/page-wrapper";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Separator } from "@/components/ui/separator";
import { copyToClipboard } from "@/utils/copy";
import { handleEditorDidMount } from "./actions/monaco";

export default function JsonTools() {
	const [inputValue, setInputValue] = useState("");
	const hiddenFileInput = useRef<HTMLInputElement | null>(null);

	const handleFormat = () => {
		try {
			if (inputValue === "") return;
			const parsed = JSON5.parse(inputValue);
			setInputValue(JSON.stringify(parsed, null, 2));
		} catch (e) {
			toast.error(<span>{String(e)}</span>);
		}
	};

	const handleValidate = () => {
		try {
			if (inputValue === "") return;
			JSON5.parse(inputValue);
			toast(<span>Valid JSON!</span>);
		} catch (e) {
			toast.error(<span>{String(e)}</span>);
		}
	};

	const handleRemoveWhitespaces = () => {
		try {
			if (inputValue === "") return;
			const parsed = JSON5.parse(inputValue);
			// Stringify with no spaces or indentation
			setInputValue(JSON.stringify(parsed));
		} catch (e) {
			toast.error(<span>{String(e)}</span>);
		}
	};

	const handlePaste = async () => {
		const text = await navigator.clipboard.readText();
		setInputValue(text);
	};

	const handleCopy = async () => {
		if (!inputValue) return;
		const response = await copyToClipboard(inputValue);
		toast(
			<span>
				Copied <code className="code">{response}</code> to clipboard.
			</span>,
		);
	};

	const handleClear = () => {
		setInputValue("");
	};

	const handleExport = () => {
		const blob = new Blob([inputValue], { type: "application/json" });
		const url = URL.createObjectURL(blob);

		const a = document.createElement("a");
		a.href = url;
		a.download = "export.json";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	const handleButtonClick = () => {
		hiddenFileInput.current?.click();
	};

	const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file && file.type === "application/json") {
			const reader = new FileReader();

			reader.onload = (e) => {
				if (e.target?.result) {
					try {
						const data = JSON.parse(e.target.result as string);
						toast.info("Imported JSON Data:", data);
						setInputValue(e.target.result as string);
					} catch (error) {
						console.error("Error parsing JSON:", error);
					}
				}
				event.target.value = "";
			};

			reader.readAsText(file);
		} else {
			console.error("Please select a valid JSON file.");
			event.target.value = "";
		}
	};

	return (
		<PageWrapper title="JSON Tools">
			<div className="flex flex-wrap items-center gap-2">
				<ButtonGroup>
					<Button variant="outline" onClick={handlePaste}>
						Paste
					</Button>
					<Button variant="outline" onClick={handleCopy}>
						Copy
					</Button>
					<Button variant="outline" onClick={handleClear}>
						Clear
					</Button>
				</ButtonGroup>
				<ButtonGroup>
					<Button
						variant="outline"
						onClick={handleFormat}
						disabled={!inputValue}
					>
						Format
					</Button>
					<Button
						variant="outline"
						onClick={handleValidate}
						disabled={!inputValue}
					>
						Validate
					</Button>
					<Button
						variant="outline"
						onClick={handleRemoveWhitespaces}
						disabled={!inputValue}
					>
						Remove whitespaces
					</Button>
				</ButtonGroup>
				<ButtonGroup>
					<Button variant="outline" onClick={handleButtonClick}>
						Import
						<input
							type="file"
							accept="application/json"
							ref={hiddenFileInput}
							className="hidden"
							onChange={handleImport}
						/>
					</Button>
					<Button
						variant="outline"
						onClick={handleExport}
						disabled={!inputValue}
					>
						Export
					</Button>
				</ButtonGroup>
			</div>
			<Editor
				height="100%"
				width="100%"
				language="json"
				value={inputValue}
				onChange={(value) => setInputValue(value || "")}
				className="min-h-[50dvh] rounded-md "
				theme="AshenVibrant"
				options={{
					minimap: { enabled: false },
					lineNumbers: "on",
					scrollBeyondLastLine: false,
					wordWrap: "off",
					fontSize: 14,
					tabSize: 4,
				}}
				beforeMount={handleEditorDidMount}
			/>
		</PageWrapper>
	);
}
