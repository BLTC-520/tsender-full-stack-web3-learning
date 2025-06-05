"use client" // this tells react components to be run on the client side

import { getDefaultConfig } from "@rainbow-me/rainbowkit" // boilerplate for rainbowkit config
import { arbitrum, base, mainnet, optimism, anvil, zksync, sepolia} from "wagmi/chains" // import the chains we want to use

export default getDefaultConfig({
    appName: "TSender",
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!, // "!" means that this value is 100% defined
    chains: [mainnet, optimism, arbitrum, base, zksync, sepolia, anvil],
    ssr: false, // server-side rendering (x)
})
