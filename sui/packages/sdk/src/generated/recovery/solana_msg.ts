/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/


/**
 * Parser for Solana versioned `MessageV0` wire format. Used by `recovery` to
 * derive a structural `SweepIntent` from sweep transactions at proposal time and
 * re-derive it from freshly-built messages at execute time. Verifying intent in
 * Move (rather than trusting the executor's assertion) is what makes the
 * sign-at-execute model safe: the executor can replace the recent blockhash and tx
 * ordering, but cannot redirect funds.
 * 
 * Wire format (per `solana-program/src/message/versions/v0/mod.rs`): 1B
 * version-prefix (must be 0x80 for v0) 1B numRequiredSignatures 1B
 * numReadonlySignedAccounts 1B numReadonlyUnsignedAccounts shortvec
 * staticAccountKeys.len, then N\*32B 32B recentBlockhash shortvec
 * instructions.len, then per-instruction shortvec addressTableLookups.len (must be
 * 0; ALT is rejected)
 */

import { MoveStruct, normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import { bcs } from '@mysten/sui/bcs';
import { type Transaction, type TransactionArgument } from '@mysten/sui/transactions';
const $moduleName = '@local-pkg/recovery::solana_msg';
export const ParsedInstruction = new MoveStruct({ name: `${$moduleName}::ParsedInstruction`, fields: {
        program_id_index: bcs.u8(),
        account_indices: bcs.vector(bcs.u8()),
        data: bcs.vector(bcs.u8())
    } });
export const ParsedMessage = new MoveStruct({ name: `${$moduleName}::ParsedMessage`, fields: {
        num_required_signatures: bcs.u8(),
        num_readonly_signed: bcs.u8(),
        num_readonly_unsigned: bcs.u8(),
        /** 32-byte pubkeys, ordering preserved from wire. */
        account_keys: bcs.vector(bcs.vector(bcs.u8())),
        instructions: bcs.vector(ParsedInstruction)
    } });
export interface NumRequiredSignaturesArguments {
    self: TransactionArgument;
}
export interface NumRequiredSignaturesOptions {
    package?: string;
    arguments: NumRequiredSignaturesArguments | [
        self: TransactionArgument
    ];
}
export function numRequiredSignatures(options: NumRequiredSignaturesOptions) {
    const packageAddress = options.package ?? '@local-pkg/recovery';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'solana_msg',
        function: 'num_required_signatures',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface AccountKeysArguments {
    self: TransactionArgument;
}
export interface AccountKeysOptions {
    package?: string;
    arguments: AccountKeysArguments | [
        self: TransactionArgument
    ];
}
export function accountKeys(options: AccountKeysOptions) {
    const packageAddress = options.package ?? '@local-pkg/recovery';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'solana_msg',
        function: 'account_keys',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface InstructionsArguments {
    self: TransactionArgument;
}
export interface InstructionsOptions {
    package?: string;
    arguments: InstructionsArguments | [
        self: TransactionArgument
    ];
}
export function instructions(options: InstructionsOptions) {
    const packageAddress = options.package ?? '@local-pkg/recovery';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'solana_msg',
        function: 'instructions',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface ProgramIdIndexArguments {
    ix: TransactionArgument;
}
export interface ProgramIdIndexOptions {
    package?: string;
    arguments: ProgramIdIndexArguments | [
        ix: TransactionArgument
    ];
}
export function programIdIndex(options: ProgramIdIndexOptions) {
    const packageAddress = options.package ?? '@local-pkg/recovery';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["ix"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'solana_msg',
        function: 'program_id_index',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface AccountIndicesArguments {
    ix: TransactionArgument;
}
export interface AccountIndicesOptions {
    package?: string;
    arguments: AccountIndicesArguments | [
        ix: TransactionArgument
    ];
}
export function accountIndices(options: AccountIndicesOptions) {
    const packageAddress = options.package ?? '@local-pkg/recovery';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["ix"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'solana_msg',
        function: 'account_indices',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface DataArguments {
    ix: TransactionArgument;
}
export interface DataOptions {
    package?: string;
    arguments: DataArguments | [
        ix: TransactionArgument
    ];
}
export function data(options: DataOptions) {
    const packageAddress = options.package ?? '@local-pkg/recovery';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["ix"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'solana_msg',
        function: 'data',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface ProgramIdArguments {
    self: TransactionArgument;
    ix: TransactionArgument;
}
export interface ProgramIdOptions {
    package?: string;
    arguments: ProgramIdArguments | [
        self: TransactionArgument,
        ix: TransactionArgument
    ];
}
/** Resolves the program id (32-byte pubkey) for an instruction. */
export function programId(options: ProgramIdOptions) {
    const packageAddress = options.package ?? '@local-pkg/recovery';
    const argumentsTypes = [
        null,
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self", "ix"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'solana_msg',
        function: 'program_id',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface AccountAtArguments {
    self: TransactionArgument;
    ix: TransactionArgument;
    idx: RawTransactionArgument<number | bigint>;
}
export interface AccountAtOptions {
    package?: string;
    arguments: AccountAtArguments | [
        self: TransactionArgument,
        ix: TransactionArgument,
        idx: RawTransactionArgument<number | bigint>
    ];
}
/** Resolves the account at `account_indices[idx]` to its 32-byte pubkey. */
export function accountAt(options: AccountAtOptions) {
    const packageAddress = options.package ?? '@local-pkg/recovery';
    const argumentsTypes = [
        null,
        null,
        'u64'
    ] satisfies (string | null)[];
    const parameterNames = ["self", "ix", "idx"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'solana_msg',
        function: 'account_at',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface FeePayerArguments {
    self: TransactionArgument;
}
export interface FeePayerOptions {
    package?: string;
    arguments: FeePayerArguments | [
        self: TransactionArgument
    ];
}
/**
 * Returns the fee payer (account at index 0). MessageV0 always places the fee
 * payer first in the static account keys.
 */
export function feePayer(options: FeePayerOptions) {
    const packageAddress = options.package ?? '@local-pkg/recovery';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'solana_msg',
        function: 'fee_payer',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface ParseArguments {
    bytes: RawTransactionArgument<Array<number>>;
}
export interface ParseOptions {
    package?: string;
    arguments: ParseArguments | [
        bytes: RawTransactionArgument<Array<number>>
    ];
}
export function parse(options: ParseOptions) {
    const packageAddress = options.package ?? '@local-pkg/recovery';
    const argumentsTypes = [
        'vector<u8>'
    ] satisfies (string | null)[];
    const parameterNames = ["bytes"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'solana_msg',
        function: 'parse',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface ReadU32LeArguments {
    data: RawTransactionArgument<Array<number>>;
    off: RawTransactionArgument<number | bigint>;
}
export interface ReadU32LeOptions {
    package?: string;
    arguments: ReadU32LeArguments | [
        data: RawTransactionArgument<Array<number>>,
        off: RawTransactionArgument<number | bigint>
    ];
}
export function readU32Le(options: ReadU32LeOptions) {
    const packageAddress = options.package ?? '@local-pkg/recovery';
    const argumentsTypes = [
        'vector<u8>',
        'u64'
    ] satisfies (string | null)[];
    const parameterNames = ["data", "off"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'solana_msg',
        function: 'read_u32_le',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface ReadU64LeArguments {
    data: RawTransactionArgument<Array<number>>;
    off: RawTransactionArgument<number | bigint>;
}
export interface ReadU64LeOptions {
    package?: string;
    arguments: ReadU64LeArguments | [
        data: RawTransactionArgument<Array<number>>,
        off: RawTransactionArgument<number | bigint>
    ];
}
export function readU64Le(options: ReadU64LeOptions) {
    const packageAddress = options.package ?? '@local-pkg/recovery';
    const argumentsTypes = [
        'vector<u8>',
        'u64'
    ] satisfies (string | null)[];
    const parameterNames = ["data", "off"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'solana_msg',
        function: 'read_u64_le',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}