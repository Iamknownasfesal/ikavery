/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/


/**
 * Discovery index for the recovery package.
 * 
 * The `Registry` is a single shared object created once at publish time. It maps a
 * member's canonical id bytes to the set of recovery objects that member belongs
 * to. Member id bytes match `auth::new_member_id_bytes`: 33 bytes for a passkey
 * (compressed secp256r1 public key) and 32 bytes for an address — different
 * lengths so the two namespaces never collide.
 * 
 * `register` / `unregister` are `public(package)` and only called from
 * `recovery::recovery` (on `create`, `execute_enrollment`). The reader
 * `list_for_member` is `public` so any client can discover the recoveries they
 * belong to without already knowing the recovery id.
 */

import { MoveStruct, normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import * as table from './deps/sui/table.js';
const $moduleName = '@local-pkg/recovery::registry';
export const REGISTRY = new MoveStruct({ name: `${$moduleName}::REGISTRY`, fields: {
        dummy_field: bcs.bool()
    } });
export const Registry = new MoveStruct({ name: `${$moduleName}::Registry`, fields: {
        id: bcs.Address,
        by_member: table.Table
    } });
export interface ListForMemberArguments {
    self: RawTransactionArgument<string>;
    memberId: RawTransactionArgument<Array<number>>;
}
export interface ListForMemberOptions {
    package?: string;
    arguments: ListForMemberArguments | [
        self: RawTransactionArgument<string>,
        memberId: RawTransactionArgument<Array<number>>
    ];
}
export function listForMember(options: ListForMemberOptions) {
    const packageAddress = options.package ?? '@local-pkg/recovery';
    const argumentsTypes = [
        null,
        'vector<u8>'
    ] satisfies (string | null)[];
    const parameterNames = ["self", "memberId"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'registry',
        function: 'list_for_member',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}