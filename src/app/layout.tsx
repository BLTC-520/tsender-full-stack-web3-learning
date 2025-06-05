import "./globals.css"
import type { Metadata } from "next"
import { type ReactNode } from "react"
import Header from "@/components/Header" // with this and wrapping the header in the layout, can use in every page
import { Providers } from "./providers"

export const metadata: Metadata = {
    title: "TSender",
    description: "Hyper gas-optimized bulk ERC20 token transfer",
}

// everything starting from the layout page 
// if we not doing wrapping, then we will have to import the header in every page
export default function RootLayout(props: { children: ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/T-Sender.svg" sizes="any" />
            </head>
            <body className="bg-zinc-50">
                <Providers>
                    <Header />
                    {props.children}
                </Providers>
            </body>
        </html>
    )
}
