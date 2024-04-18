"use client"

import React, { useState } from 'react';
import { Button, Input, useInput } from "@geist-ui/core";
import { useRouter } from 'next/navigation';

export default function Search() {
    const [doi, setDoi] = useState(""); // State to store the DOI input value
    const router = useRouter();
    const { state, setState, reset, bindings } = useInput(doi);

    const handleSearch = async () => {
        console.log(state);
        router.push(`/read/${state}`);
    };

    return (
        <>
            <div className="flex flex-col items-center space-y-2 text-center">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Scholarly </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Enter the DOI (Digital Object Identifier) of a research paper to find relevant articles and publications.
                </p>
            </div>
            <form className="flex flex-col gap-2 w-full max-w-3xl p-4 border rounded-lg border-gray-200 bg-white shadow-sm md:p-6">
                <div className="grid gap-1">
                    <Input
                        label="DOI"
                        id="doi"
                        placeholder="10.1126/science.169.3946.635"
                        width="100%"
                        onPointerEnterCapture={() => {}}
                        onPointerLeaveCapture={() => {}}
                        crossOrigin=""
                        {...bindings}
                    />
                </div>
                <Button onClick={handleSearch} placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>Search</Button>
            </form>
        </>
    );
}
