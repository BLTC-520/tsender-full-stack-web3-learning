"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { type ReactNode, useState, useEffect } from "react" 
import { lightTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit"
// wagmi provider + config from our rainbowKitConfig 
import { WagmiProvider } from "wagmi"
import config from "@/rainbowKitConfig"
import "@rainbow-me/rainbowkit/styles.css"

// Providers component wraps the application with necessary providers
export function Providers(props: { children: ReactNode }) { 
    const [queryClient] = useState(() => new QueryClient())

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider theme={lightTheme({ borderRadius: "medium" })}>
                    {/* all website code will be in here. */}
                    {props.children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}