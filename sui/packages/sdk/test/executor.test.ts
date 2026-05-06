import { describe, expect, test } from "bun:test";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";

import { executorFromKeypair, sponsoredExecutor } from "../src/executor";

describe("executorFromKeypair", () => {
  test("address matches the keypair's Sui address", () => {
    const kp = new Ed25519Keypair();
    const exec = executorFromKeypair(kp, {} as never);
    expect(exec.address).toBe(kp.toSuiAddress());
  });
});

describe("sponsoredExecutor", () => {
  test("address resolves to the sender, not the sponsor", () => {
    // The whole point of sponsorship: `ctx.sender()` is the user even though
    // the sponsor pays gas. Flow code keys credential auth off the sender's
    // address, so executor.address must be the sender.
    const sender = new Ed25519Keypair();
    const sponsor = new Ed25519Keypair();
    const exec = sponsoredExecutor({ sender, sponsor, suiClient: {} as never });
    expect(exec.address).toBe(sender.toSuiAddress());
    expect(exec.address).not.toBe(sponsor.toSuiAddress());
  });
});
