import { describe, expect, test } from "bun:test";
import { Transaction } from "@mysten/sui/transactions";

import { buildCredential } from "../src/move/credential";

const PKG =
  "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";

describe("buildCredential", () => {
  test("ed25519 path emits a single auth::ed25519_credential call", () => {
    const tx = new Transaction();
    buildCredential(tx, PKG, {
      scheme: "ed25519",
      publicKey: new Uint8Array(32).fill(0x01),
      signature: new Uint8Array(64).fill(0xaa),
    });
    const calls = tx.getData().commands.filter((c) => c.$kind === "MoveCall");
    expect(calls.length).toBe(1);
    expect(calls[0]!.MoveCall!.module).toBe("auth");
    expect(calls[0]!.MoveCall!.function).toBe("ed25519_credential");
    expect(calls[0]!.MoveCall!.package).toBe(PKG);
  });

  test("secp256k1 path emits a single auth::secp256k1_credential call", () => {
    const tx = new Transaction();
    buildCredential(tx, PKG, {
      scheme: "secp256k1",
      publicKey: new Uint8Array(33).fill(0x02),
      signature: new Uint8Array(64).fill(0xbb),
    });
    const calls = tx.getData().commands.filter((c) => c.$kind === "MoveCall");
    expect(calls.length).toBe(1);
    expect(calls[0]!.MoveCall!.function).toBe("secp256k1_credential");
  });

  test("secp256r1 path emits a single auth::secp256r1_credential call", () => {
    const tx = new Transaction();
    buildCredential(tx, PKG, {
      scheme: "secp256r1",
      publicKey: new Uint8Array(33).fill(0x03),
      signature: new Uint8Array(64).fill(0xcc),
    });
    const calls = tx.getData().commands.filter((c) => c.$kind === "MoveCall");
    expect(calls.length).toBe(1);
    expect(calls[0]!.MoveCall!.function).toBe("secp256r1_credential");
  });

  test("webauthn path emits assertion::new + auth::webauthn_credential", () => {
    const tx = new Transaction();
    buildCredential(tx, PKG, {
      scheme: "webauthn",
      assertion: {
        publicKey: new Uint8Array(33).fill(0x02),
        authenticatorData: new Uint8Array(37).fill(0xab),
        clientDataJSON: new Uint8Array(80).fill(0xcd),
        signature: new Uint8Array(64).fill(0xef),
      },
    });
    const data = tx.getData();
    const calls = data.commands.filter((c) => c.$kind === "MoveCall");
    expect(calls.length).toBe(2);
    const fns = calls.map(
      (c) => `${c.MoveCall!.module}::${c.MoveCall!.function}`,
    );
    expect(fns).toEqual(["assertion::new", "auth::webauthn_credential"]);
    for (const c of calls) {
      expect(c.MoveCall!.package).toBe(PKG);
    }
  });

  test("sender_address path emits a single auth::sender_credential call with no args", () => {
    const tx = new Transaction();
    buildCredential(tx, PKG, {
      scheme: "sender_address",
      address:
        "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    });
    const calls = tx.getData().commands.filter((c) => c.$kind === "MoveCall");
    expect(calls.length).toBe(1);
    expect(calls[0]!.MoveCall!.module).toBe("auth");
    expect(calls[0]!.MoveCall!.function).toBe("sender_credential");
    expect(calls[0]!.MoveCall!.package).toBe(PKG);
    // No user-supplied args — the Move builder reads ctx.sender() itself.
    expect(calls[0]!.MoveCall!.arguments?.length ?? 0).toBe(0);
  });
});
