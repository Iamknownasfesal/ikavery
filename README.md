# ikavery

Quorum-gated key import and asset sweep on Sui and Solana, powered by Ika
dWallets. Import an existing private key into an Ika 2PC-MPC dWallet,
place it behind a t-of-N roster of WebAuthn passkeys or wallet
credentials, and recover by signing a sweep on a quorum.

Two parallel deployments share the design layer:

- [`sui.ikavery.com`](https://sui.ikavery.com) — Move package on Sui
  testnet, passkey-first via WebAuthn PRF + dapp-kit
- [`solana.ikavery.com`](https://solana.ikavery.com) — Quasar program on
  Solana devnet, wallet-first via [dynamic.xyz](https://dynamic.xyz)

Both ride the same Ika 2PC-MPC layer (Sui ika-sdk on the Sui app, Ika
pre-alpha mock signer on the Solana app).

## Layout

```
packages/
├── core/              @fesal-packages/ikavery-core         shared cross-chain logic
└── frontend-ui/       @fesal-packages/ikavery-frontend-ui  design system + primitives
sui/packages/
├── contracts/recovery/  Move package (recovery::*)
├── sdk/                 @fesal-packages/ikavery-sui-sdk
└── frontend/            ikavery-frontend (Next.js)
solana/packages/
├── program/             ikavery, Quasar program (Rust + Quasar.toml)
├── sdk/                 @fesal-packages/ikavery-solana-sdk
└── frontend/            ikavery-solana-frontend (Next.js)
```

The two frontends consume `@fesal-packages/ikavery-frontend-ui` (Shell,
Bento, motion presets, VaultDial, etc.) and only diverge at the wallet
provider, the chain SDK, and the auth ramp. Per-chain readmes:
[`sui/README.md`](sui/README.md), [`solana/README.md`](solana/README.md).

## Stack

Common:
- Bun + Turborepo workspace
- Tailwind v4 + shadcn-derived primitives + framer-motion
- `@ika.xyz/sdk` (Sui) / `@ika.xyz/pre-alpha-solana-client` (Solana)
- `@solana/web3.js` + `@solana/spl-token` for sweep tx construction

Per-chain:
- **Sui**: Move (`framework/testnet`), `@mysten/sui` v2,
  `@mysten/dapp-kit`, `@mysten/enoki`, `@simplewebauthn/browser`
- **Solana**: Quasar program (deployed to devnet),
  `@dynamic-labs/sdk-react-core` + `@dynamic-labs/solana`

## Quickstart

```bash
bun install                                         # workspace deps
bun run move:build                                  # build the Sui Move package
bun --cwd sui/packages/sdk run codegen              # one-shot Sui BCS bindings
(cd solana/packages/program && quasar build)                         # build the Solana program
bun run typecheck                                   # turbo typecheck across packages
```

Run either frontend:
```bash
bun --cwd sui/packages/frontend run dev             # localhost:3000 (Sui)
bun --cwd solana/packages/frontend run dev          # localhost:3000 (Solana)
```

Each app ships a `.env.example` documenting its required public env
variables (Dynamic env id, RPC endpoints, deployed program/package ids).

## End-to-end scripts

Each chain's SDK package ships scripts that drive the full lifecycle
against live testnets:

| Sui (`sui/packages/sdk/scripts/`) | Solana (`solana/packages/sdk/scripts/`) |
| --- | --- |
| `e2e-recover` · SOL sweep | `e2e-recover` · SOL sweep |
| `e2e-recover-spl` · SOL+SPL sweep | `e2e-recover-spl` · SOL+SPL sweep |
| `e2e-roster-change` | `e2e-roster-change` |
| `e2e-multi-member` (5-member, segregation) | `e2e-multi-member` (3-of-5 mechanics) |
| `e2e-enrollment-spl` | `e2e-enrollment` |
| `e2e-retry-spl` | `e2e-retry-spl` |

See the chain-specific READMEs for required env vars per script.

## Status

Pre-alpha. Devnet/testnet only — never import a key that holds real
funds. The Solana side runs on Ika's pre-alpha mock signer, which resets
without warning. Neither contract has been independently audited.
