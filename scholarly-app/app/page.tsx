/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Al23Gd1iDRU
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"
import Search from "./Search"

export default function Component() {
  return (
    <div className="flex flex-col items-center space-y-2 w-full min-h-[80vh] py-6">
        <Search/>
    </div>
  )
}

