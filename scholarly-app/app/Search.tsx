"use client"

import React, { useState } from 'react';
import { Button, Input, useInput } from "@geist-ui/core";
import { useRouter } from 'next/navigation';
import { Terminal } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function Search() {
    const [doi, setDoi] = useState(""); // State to store the DOI input value
    const router = useRouter();
    const { state, setState, reset, bindings } = useInput(doi);

    const [showAlert, setShowAlert] = useState(false); // State to control the visibility of the Alert

    const handleSearch = async () => {
        if (!state) {
            setShowAlert(true); // Show the Alert if the DOI is empty
            setTimeout(() => {
                setShowAlert(false); // Hide the Alert after a few seconds
            }, 4000);
        } else {
            console.log(state);
            router.push(`/readv2/${state}`);
        }
    };

    return (
        <>
            <div className="flex flex-col items-center space-y-2 text-center">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Scholarly </h1>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Enter the DOI (Digital Object Identifier) of an ArXiv research paper
                </p>
            </div>
            <form className="flex flex-col gap-2 w-full max-w-3xl p-4 border rounded-lg border-gray-200 bg-white shadow-sm md:p-6">
                <div className="grid gap-1">
                    <Input
                        label="DOI"
                        id="doi"
                        placeholder="2403.12168"
                        width="100%"
                        onPointerEnterCapture={() => {}}
                        onPointerLeaveCapture={() => {}}
                        crossOrigin=""
                        {...bindings}
                    />
                </div>
                <Button onClick={handleSearch} placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>Search</Button>
            </form>
            {showAlert && (
                <Alert variant="destructive" className='w-2/5'>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Oops!</AlertTitle>
                    <AlertDescription>
                        Please enter a valid ArXiv DOI
                    </AlertDescription>
                </Alert>
            )}
        </>
    );
}
