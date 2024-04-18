"use server";
import 'server-only'

export async function getPaper(doi: string) {
    // const res = await fetch("https://api.example.com/")
    // if (!res.ok) {
    //     throw new Error("Failed to fetch paper")
    // }
    // // return res.json()
    console.log(doi)
    return doi; // Return the DOI input value
}