/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/


/**
 * Unified authentication for the recovery module.
 * 
 * Every member is a `(scheme, public_key)` pair. Authorization is a signature over
 * a per-operation challenge — never `ctx.sender()`. This decouples auth from the
 * Sui sender, so a sponsor wallet can be the transaction sender (and gas-owner)
 * while a member's wallet just signs the challenge on the side.
 * 
 * Schemes: 0 = Ed25519 (32-byte pubkey, raw `signPersonalMessage` sig) 1 =
 * Secp256k1 (33-byte compressed pubkey, raw `signPersonalMessage` sig) 2 =
 * Secp256r1 (33-byte compressed pubkey, raw `signPersonalMessage` sig) 3 =
 * WebAuthn (33-byte compressed secp256r1 passkey pubkey, full WebAuthn assertion
 * envelope verified by `assertion`) 4 = SenderAddress (32-byte Sui address — auth
 * gate is `ctx.sender() == addr`, which is exactly how Sui validators verify
 * zkLogin / MultiSig / Passkey-as-sender signatures on the way in. These members
 * are _approver-only_: they can propose + approve, but they cannot execute,
 * because they don't hold an encrypted user-share — see `recovery::recovery`.)
 * 
 * Member id (used for dedup, voter tracking, and the registry) =
 * `[scheme_byte, ...pubkey_or_address_bytes]`. Different schemes never collide
 * because we always prefix the byte tag.
 */

import { MoveEnum, MoveStruct, normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import { bcs } from '@mysten/sui/bcs';
import { type Transaction, type TransactionArgument } from '@mysten/sui/transactions';
import * as assertion from './assertion.js';
const $moduleName = '@local-pkg/recovery::auth';
export const Credential = new MoveEnum({ name: `${$moduleName}::Credential`, fields: {
        Ed25519: new MoveStruct({ name: `Credential.Ed25519`, fields: {
                signature: bcs.vector(bcs.u8()),
                public_key: bcs.vector(bcs.u8())
            } }),
        Secp256k1: new MoveStruct({ name: `Credential.Secp256k1`, fields: {
                signature: bcs.vector(bcs.u8()),
                public_key: bcs.vector(bcs.u8())
            } }),
        Secp256r1: new MoveStruct({ name: `Credential.Secp256r1`, fields: {
                signature: bcs.vector(bcs.u8()),
                public_key: bcs.vector(bcs.u8())
            } }),
        WebAuthn: assertion.WebAuthnAssertion,
        /**
         * Approver-only: authorized when the embedded address equals `ctx.sender()`. The
         * address is captured at construction (in the same PTB as verification, since
         * `Credential` has `drop` only) so it cannot drift; verification still re-checks
         * against the live sender to defeat hand-built forgeries.
         */
        SenderAddress: bcs.Address
    } });
export const NewMember = new MoveEnum({ name: `${$moduleName}::NewMember`, fields: {
        Ed25519: bcs.vector(bcs.u8()),
        Secp256k1: bcs.vector(bcs.u8()),
        Secp256r1: bcs.vector(bcs.u8()),
        WebAuthn: bcs.vector(bcs.u8()),
        /**
         * Approver-only member. Identified by Sui address; auth is `ctx.sender()` at
         * action time. Doesn't need an encryption key registered, doesn't receive a
         * re-encrypted user share.
         */
        SenderAddress: bcs.Address
    } });
export interface Ed25519CredentialArguments {
    signature: RawTransactionArgument<Array<number>>;
    publicKey: RawTransactionArgument<Array<number>>;
}
export interface Ed25519CredentialOptions {
    package?: string;
    arguments: Ed25519CredentialArguments | [
        signature: RawTransactionArgument<Array<number>>,
        publicKey: RawTransactionArgument<Array<number>>
    ];
}
export function ed25519Credential(options: Ed25519CredentialOptions) {
    const packageAddress = options.package ?? '@local-pkg/recovery';
    const argumentsTypes = [
        'vector<u8>',
        'vector<u8>'
    ] satisfies (string | null)[];
    const parameterNames = ["signature", "publicKey"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'auth',
        function: 'ed25519_credential',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface Secp256k1CredentialArguments {
    signature: RawTransactionArgument<Array<number>>;
    publicKey: RawTransactionArgument<Array<number>>;
}
export interface Secp256k1CredentialOptions {
    package?: string;
    arguments: Secp256k1CredentialArguments | [
        signature: RawTransactionArgument<Array<number>>,
        publicKey: RawTransactionArgument<Array<number>>
    ];
}
export function secp256k1Credential(options: Secp256k1CredentialOptions) {
    const packageAddress = options.package ?? '@local-pkg/recovery';
    const argumentsTypes = [
        'vector<u8>',
        'vector<u8>'
    ] satisfies (string | null)[];
    const parameterNames = ["signature", "publicKey"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'auth',
        function: 'secp256k1_credential',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface Secp256r1CredentialArguments {
    signature: RawTransactionArgument<Array<number>>;
    publicKey: RawTransactionArgument<Array<number>>;
}
export interface Secp256r1CredentialOptions {
    package?: string;
    arguments: Secp256r1CredentialArguments | [
        signature: RawTransactionArgument<Array<number>>,
        publicKey: RawTransactionArgument<Array<number>>
    ];
}
export function secp256r1Credential(options: Secp256r1CredentialOptions) {
    const packageAddress = options.package ?? '@local-pkg/recovery';
    const argumentsTypes = [
        'vector<u8>',
        'vector<u8>'
    ] satisfies (string | null)[];
    const parameterNames = ["signature", "publicKey"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'auth',
        function: 'secp256r1_credential',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface WebauthnCredentialArguments {
    a: TransactionArgument;
}
export interface WebauthnCredentialOptions {
    package?: string;
    arguments: WebauthnCredentialArguments | [
        a: TransactionArgument
    ];
}
export function webauthnCredential(options: WebauthnCredentialOptions) {
    const packageAddress = options.package ?? '@local-pkg/recovery';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["a"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'auth',
        function: 'webauthn_credential',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface SenderCredentialOptions {
    package?: string;
    arguments?: [
    ];
}
/**
 * Wrap `ctx.sender()` as a credential. Use this for member identities whose
 * authentication is delegated to Sui's tx-signature pipeline (zkLogin, MultiSig,
 * Passkey-as-sender). The validators have already verified the signature on the
 * way in by the time Move runs — we only need to confirm the sender is in the
 * members set.
 */
export function senderCredential(options: SenderCredentialOptions = {}) {
    const packageAddress = options.package ?? '@local-pkg/recovery';
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'auth',
        function: 'sender_credential',
    });
}
export interface IsApproverOnlyArguments {
    cred: TransactionArgument;
}
export interface IsApproverOnlyOptions {
    package?: string;
    arguments: IsApproverOnlyArguments | [
        cred: TransactionArgument
    ];
}
/**
 * True if the credential is the approver-only variant. Callers that gate
 * "execute"-style operations on having an encrypted user share should use this to
 * fail fast with a clear message before consuming any presigns.
 */
export function isApproverOnly(options: IsApproverOnlyOptions) {
    const packageAddress = options.package ?? '@local-pkg/recovery';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["cred"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'auth',
        function: 'is_approver_only',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface NewEd25519MemberArguments {
    publicKey: RawTransactionArgument<Array<number>>;
}
export interface NewEd25519MemberOptions {
    package?: string;
    arguments: NewEd25519MemberArguments | [
        publicKey: RawTransactionArgument<Array<number>>
    ];
}
export function newEd25519Member(options: NewEd25519MemberOptions) {
    const packageAddress = options.package ?? '@local-pkg/recovery';
    const argumentsTypes = [
        'vector<u8>'
    ] satisfies (string | null)[];
    const parameterNames = ["publicKey"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'auth',
        function: 'new_ed25519_member',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface NewSecp256k1MemberArguments {
    publicKey: RawTransactionArgument<Array<number>>;
}
export interface NewSecp256k1MemberOptions {
    package?: string;
    arguments: NewSecp256k1MemberArguments | [
        publicKey: RawTransactionArgument<Array<number>>
    ];
}
export function newSecp256k1Member(options: NewSecp256k1MemberOptions) {
    const packageAddress = options.package ?? '@local-pkg/recovery';
    const argumentsTypes = [
        'vector<u8>'
    ] satisfies (string | null)[];
    const parameterNames = ["publicKey"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'auth',
        function: 'new_secp256k1_member',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface NewSecp256r1MemberArguments {
    publicKey: RawTransactionArgument<Array<number>>;
}
export interface NewSecp256r1MemberOptions {
    package?: string;
    arguments: NewSecp256r1MemberArguments | [
        publicKey: RawTransactionArgument<Array<number>>
    ];
}
export function newSecp256r1Member(options: NewSecp256r1MemberOptions) {
    const packageAddress = options.package ?? '@local-pkg/recovery';
    const argumentsTypes = [
        'vector<u8>'
    ] satisfies (string | null)[];
    const parameterNames = ["publicKey"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'auth',
        function: 'new_secp256r1_member',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface NewWebauthnMemberArguments {
    publicKey: RawTransactionArgument<Array<number>>;
}
export interface NewWebauthnMemberOptions {
    package?: string;
    arguments: NewWebauthnMemberArguments | [
        publicKey: RawTransactionArgument<Array<number>>
    ];
}
export function newWebauthnMember(options: NewWebauthnMemberOptions) {
    const packageAddress = options.package ?? '@local-pkg/recovery';
    const argumentsTypes = [
        'vector<u8>'
    ] satisfies (string | null)[];
    const parameterNames = ["publicKey"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'auth',
        function: 'new_webauthn_member',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface NewSenderMemberArguments {
    addr: RawTransactionArgument<string>;
}
export interface NewSenderMemberOptions {
    package?: string;
    arguments: NewSenderMemberArguments | [
        addr: RawTransactionArgument<string>
    ];
}
export function newSenderMember(options: NewSenderMemberOptions) {
    const packageAddress = options.package ?? '@local-pkg/recovery';
    const argumentsTypes = [
        'address'
    ] satisfies (string | null)[];
    const parameterNames = ["addr"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'auth',
        function: 'new_sender_member',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface IsApproverOnlyMemberArguments {
    m: TransactionArgument;
}
export interface IsApproverOnlyMemberOptions {
    package?: string;
    arguments: IsApproverOnlyMemberArguments | [
        m: TransactionArgument
    ];
}
/**
 * True for members whose identity is just an address — no encryption share gets
 * re-encrypted to them, so they can't be the executor of a recovery.
 */
export function isApproverOnlyMember(options: IsApproverOnlyMemberOptions) {
    const packageAddress = options.package ?? '@local-pkg/recovery';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["m"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'auth',
        function: 'is_approver_only_member',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}