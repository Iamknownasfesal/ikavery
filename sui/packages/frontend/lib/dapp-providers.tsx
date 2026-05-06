"use client";

import "@mysten/dapp-kit/dist/index.css";

import {
  SuiClientProvider,
  useSuiClientContext,
  WalletProvider,
} from "@mysten/dapp-kit";
import { isEnokiNetwork, registerEnokiWallets } from "@mysten/enoki";
import { getJsonRpcFullnodeUrl } from "@mysten/sui/jsonRpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";

import { env } from "./env";

const networks = {
  testnet: {
    url: env.suiRpcUrl ?? getJsonRpcFullnodeUrl("testnet"),
    network: "testnet" as const,
  },
  mainnet: {
    url: getJsonRpcFullnodeUrl("mainnet"),
    network: "mainnet" as const,
  },
};

export function DappKitProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networks} defaultNetwork={env.network}>
        <RegisterEnokiWallets />
        <WalletProvider autoConnect>{children}</WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}

/**
 * Registers zkLogin OAuth flows (Google/Twitch/Facebook) as Wallet Standard
 * wallets via Enoki. They show up in `useWallets()` alongside any installed
 * extensions, so the picker UI in <WalletConnect /> Just Works.
 *
 * Configured providers depend on which `NEXT_PUBLIC_*_CLIENT_ID` env vars
 * are set. Without an Enoki API key, this is a no-op.
 */
function RegisterEnokiWallets() {
  const { client, network } = useSuiClientContext();

  React.useEffect(() => {
    if (!env.enokiApiKey) return;
    if (!isEnokiNetwork(network)) return;

    // Pin every provider's redirect URI to a single page so only one URL
    // needs to be whitelisted in each OAuth client console.
    const redirectUrl = `${window.location.origin}/auth`;
    const providers: Parameters<typeof registerEnokiWallets>[0]["providers"] =
      {};
    if (env.googleClientId)
      providers.google = {
        clientId: env.googleClientId,
        redirectUrl,
        // Force Google's account picker every OAuth round-trip. Without this
        // Google silently returns the most-recently-used account, which
        // breaks the multi-Google-account use case (e.g. the importer wants
        // a different identity than the gas payer).
        extraParams: { prompt: "select_account" },
      };
    if (env.twitchClientId)
      providers.twitch = { clientId: env.twitchClientId, redirectUrl };
    if (env.facebookClientId)
      providers.facebook = {
        clientId: env.facebookClientId,
        redirectUrl,
      };
    if (Object.keys(providers).length === 0) return;

    const { unregister } = registerEnokiWallets({
      apiKey: env.enokiApiKey,
      providers,
      client,
      network,
    });
    return unregister;
  }, [client, network]);

  return null;
}
