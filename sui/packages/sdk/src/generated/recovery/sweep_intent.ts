/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/


/**
 * Structural intent of a Solana sweep transaction. Built from a parsed `MessageV0`
 * at proposal time and re-built from a fresh message at execute time; the dWallet
 * only signs if the freshly-built intent equals the stored one. This is what makes
 * blockhash-refresh-at-execute safe — the executor can change the recent blockhash
 * and re-pack instructions but cannot change destinations, mints, amounts, or
 * program ids.
 * 
 * Compute-budget instructions are explicitly _unconstrained_: they can be
 * added/removed/reordered between propose and execute. Compute fees are paid by
 * the source, are bounded by the runtime, and don't redirect funds.
 * 
 * Any unknown program or instruction discriminator causes `from_message` to abort,
 * so `propose()` will reject malformed bundles, and `execute()` will reject any
 * executor-injected instructions outside the whitelist.
 */

import { MoveEnum, MoveStruct, normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import { bcs } from '@mysten/sui/bcs';
import { type Transaction, type TransactionArgument } from '@mysten/sui/transactions';
const $moduleName = '@local-pkg/recovery::sweep_intent';
/**
 * One whitelisted instruction's structural fingerprint. Compute-budget
 * instructions are not represented here — they are dropped during intent
 * extraction.
 */
export const SweepIxIntent = new MoveEnum({ name: `${$moduleName}::SweepIxIntent`, fields: {
        SystemTransfer: new MoveStruct({ name: `SweepIxIntent.SystemTransfer`, fields: {
                from: bcs.vector(bcs.u8()),
                to: bcs.vector(bcs.u8()),
                lamports: bcs.u64()
            } }),
        SplTransferChecked: new MoveStruct({ name: `SweepIxIntent.SplTransferChecked`, fields: {
                program_id: bcs.vector(bcs.u8()),
                source: bcs.vector(bcs.u8()),
                mint: bcs.vector(bcs.u8()),
                destination: bcs.vector(bcs.u8()),
                authority: bcs.vector(bcs.u8()),
                amount: bcs.u64(),
                decimals: bcs.u8()
            } }),
        AtaCreateIdempotent: new MoveStruct({ name: `SweepIxIntent.AtaCreateIdempotent`, fields: {
                token_program: bcs.vector(bcs.u8()),
                payer: bcs.vector(bcs.u8()),
                ata: bcs.vector(bcs.u8()),
                owner: bcs.vector(bcs.u8()),
                mint: bcs.vector(bcs.u8())
            } }),
        SplCloseAccount: new MoveStruct({ name: `SweepIxIntent.SplCloseAccount`, fields: {
                program_id: bcs.vector(bcs.u8()),
                account: bcs.vector(bcs.u8()),
                destination: bcs.vector(bcs.u8()),
                authority: bcs.vector(bcs.u8())
            } })
    } });
export const SweepIntent = new MoveStruct({ name: `${$moduleName}::SweepIntent`, fields: {
        fee_payer: bcs.vector(bcs.u8()),
        ixs: bcs.vector(SweepIxIntent)
    } });
export interface FeePayerArguments {
    self: TransactionArgument;
}
export interface FeePayerOptions {
    package?: string;
    arguments: FeePayerArguments | [
        self: TransactionArgument
    ];
}
export function feePayer(options: FeePayerOptions) {
    const packageAddress = options.package ?? '@local-pkg/recovery';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'sweep_intent',
        function: 'fee_payer',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface IxsArguments {
    self: TransactionArgument;
}
export interface IxsOptions {
    package?: string;
    arguments: IxsArguments | [
        self: TransactionArgument
    ];
}
export function ixs(options: IxsOptions) {
    const packageAddress = options.package ?? '@local-pkg/recovery';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'sweep_intent',
        function: 'ixs',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface FromMessageBytesArguments {
    messageBytes: RawTransactionArgument<Array<number>>;
}
export interface FromMessageBytesOptions {
    package?: string;
    arguments: FromMessageBytesArguments | [
        messageBytes: RawTransactionArgument<Array<number>>
    ];
}
/**
 * Parse `message_bytes` and project it down to a `SweepIntent`. Aborts on any
 * unknown program / unknown instruction / malformed instruction data /
 * address-table-lookup usage.
 */
export function fromMessageBytes(options: FromMessageBytesOptions) {
    const packageAddress = options.package ?? '@local-pkg/recovery';
    const argumentsTypes = [
        'vector<u8>'
    ] satisfies (string | null)[];
    const parameterNames = ["messageBytes"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'sweep_intent',
        function: 'from_message_bytes',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface FromParsedArguments {
    msg: TransactionArgument;
}
export interface FromParsedOptions {
    package?: string;
    arguments: FromParsedArguments | [
        msg: TransactionArgument
    ];
}
export function fromParsed(options: FromParsedOptions) {
    const packageAddress = options.package ?? '@local-pkg/recovery';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["msg"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'sweep_intent',
        function: 'from_parsed',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}