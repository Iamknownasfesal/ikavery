/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/


/**
 * WebAuthn (passkey) assertion verification for the recovery module.
 * 
 * `WebAuthnAssertion` carries a passkey signature and the data the authenticator
 * signed. `verify` checks (a) the public key is in an authorized set, (b) the
 * signature is valid over `authenticator_data ||  sha256(client_data_json)` (per
 * WebAuthn §6.3.3), and (c) the JSON's `challenge` field equals the expected
 * operation-bound challenge.
 */

import { MoveStruct, normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
const $moduleName = '@local-pkg/recovery::assertion';
export const WebAuthnAssertion = new MoveStruct({ name: `${$moduleName}::WebAuthnAssertion`, fields: {
        public_key: bcs.vector(bcs.u8()),
        authenticator_data: bcs.vector(bcs.u8()),
        client_data_json: bcs.vector(bcs.u8()),
        signature: bcs.vector(bcs.u8())
    } });
export interface NewArguments {
    publicKey: RawTransactionArgument<Array<number>>;
    authenticatorData: RawTransactionArgument<Array<number>>;
    clientDataJson: RawTransactionArgument<Array<number>>;
    signature: RawTransactionArgument<Array<number>>;
}
export interface NewOptions {
    package?: string;
    arguments: NewArguments | [
        publicKey: RawTransactionArgument<Array<number>>,
        authenticatorData: RawTransactionArgument<Array<number>>,
        clientDataJson: RawTransactionArgument<Array<number>>,
        signature: RawTransactionArgument<Array<number>>
    ];
}
export function _new(options: NewOptions) {
    const packageAddress = options.package ?? '@local-pkg/recovery';
    const argumentsTypes = [
        'vector<u8>',
        'vector<u8>',
        'vector<u8>',
        'vector<u8>'
    ] satisfies (string | null)[];
    const parameterNames = ["publicKey", "authenticatorData", "clientDataJson", "signature"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'assertion',
        function: 'new',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}