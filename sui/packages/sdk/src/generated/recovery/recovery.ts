/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/


/**
 * Passkey-or-zkLogin–gated recovery: import a private key into Ika as a zero-trust
 * `imported-key` dWallet, enroll multiple authentication identities (WebAuthn
 * passkeys and/or zkLogin/Sui addresses), and recover by triggering a
 * t-of-N–approved Sui transaction that signs a multi-tx Solana sweep.
 * 
 * Every member is a `(scheme, public_key)` pair stored as a single scheme-prefixed
 * byte string; authorization is always a signature over a per-operation challenge,
 * never `ctx.sender()`. This means the Sui transaction sender can be anyone
 * (including a sponsor wallet) and the member's wallet just signs the challenge on
 * the side.
 * 
 * Schemes are tagged inside `auth::Credential` / `auth::NewMember` — Ed25519,
 * Secp256k1, Secp256r1, WebAuthn (passkey), and SenderAddress (the approver-only
 * path, used for zkLogin / MultiSig / Passkey-as-sender — these members can
 * propose and approve, but cannot execute since they hold no encrypted user
 * share).
 */

import { MoveStruct, normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import { bcs } from '@mysten/sui/bcs';
import { type Transaction, type TransactionArgument } from '@mysten/sui/transactions';
import * as sweep_intent from './sweep_intent.js';
import * as coordinator_inner from './deps/ika_dwallet_2pc_mpc/coordinator_inner.js';
import * as vec_set from './deps/sui/vec_set.js';
import * as auth from './auth.js';
import * as table from './deps/sui/table.js';
const $moduleName = '@local-pkg/recovery::recovery';
export const RecoveryProposal = new MoveStruct({ name: `${$moduleName}::RecoveryProposal`, fields: {
        sweep_intents: bcs.vector(sweep_intent.SweepIntent),
        intent_hash: bcs.vector(bcs.u8()),
        proposal_presigns: bcs.vector(coordinator_inner.UnverifiedPresignCap),
        approvals: bcs.u64(),
        voters: vec_set.VecSet(bcs.vector(bcs.u8())),
        executed: bcs.bool()
    } });
export const EnrollmentProposal = new MoveStruct({ name: `${$moduleName}::EnrollmentProposal`, fields: {
        new_member: auth.NewMember,
        new_encryption_key_address: bcs.Address,
        approvals: bcs.u64(),
        voters: vec_set.VecSet(bcs.vector(bcs.u8())),
        executed: bcs.bool()
    } });
export const RosterChangeProposal = new MoveStruct({ name: `${$moduleName}::RosterChangeProposal`, fields: {
        members_to_remove: bcs.vector(bcs.vector(bcs.u8())),
        /** `option::some(t)` to also change threshold, `option::none()` to keep current. */
        new_threshold: bcs.option(bcs.u64()),
        approvals: bcs.u64(),
        voters: vec_set.VecSet(bcs.vector(bcs.u8())),
        executed: bcs.bool()
    } });
export const Recovery = new MoveStruct({ name: `${$moduleName}::Recovery`, fields: {
        id: bcs.Address,
        imported_key_cap: coordinator_inner.ImportedKeyDWalletCap,
        presigns: bcs.vector(coordinator_inner.UnverifiedPresignCap),
        /**
         * Unified members set: each entry is `[scheme, ...pubkey]` per
         * `auth::new_member_id_bytes`.
         */
        members: vec_set.VecSet(bcs.vector(bcs.u8())),
        threshold: bcs.u64(),
        proposals: table.Table,
        enrollments: table.Table,
        roster_changes: table.Table,
        next_proposal_id: bcs.u64(),
        next_enrollment_id: bcs.u64(),
        next_roster_change_id: bcs.u64(),
        nonce: bcs.u64(),
        dwallet_network_encryption_key_id: bcs.Address
    } });
export interface CreateArguments {
    importedKeyCap: RawTransactionArgument<string>;
    initialMembers: TransactionArgument;
    threshold: RawTransactionArgument<number | bigint>;
    dwalletNetworkEncryptionKeyId: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
}
export interface CreateOptions {
    package?: string;
    arguments: CreateArguments | [
        importedKeyCap: RawTransactionArgument<string>,
        initialMembers: TransactionArgument,
        threshold: RawTransactionArgument<number | bigint>,
        dwalletNetworkEncryptionKeyId: RawTransactionArgument<string>,
        registry: RawTransactionArgument<string>
    ];
}
/**
 * Create the Recovery shared object. Caller must already have produced the
 * `ImportedKeyDWalletCap` from
 * `coordinator::request_imported_key_dwallet_verification` in this same PTB and
 * pass it in here.
 *
 * `initial_members` is a mixed list of passkey + sender identities, each
 * constructed via `auth::new_passkey_member` / `auth::new_sender_member`.
 */
export function create(options: CreateOptions) {
    const packageAddress = options.package ?? '@local-pkg/recovery';
    const argumentsTypes = [
        null,
        'vector<null>',
        'u64',
        '0x2::object::ID',
        null
    ] satisfies (string | null)[];
    const parameterNames = ["importedKeyCap", "initialMembers", "threshold", "dwalletNetworkEncryptionKeyId", "registry"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'recovery',
        function: 'create',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface ReplenishPresignsArguments {
    self: RawTransactionArgument<string>;
    coord: RawTransactionArgument<string>;
    count: RawTransactionArgument<number | bigint>;
    ika: RawTransactionArgument<string>;
    sui: RawTransactionArgument<string>;
}
export interface ReplenishPresignsOptions {
    package?: string;
    arguments: ReplenishPresignsArguments | [
        self: RawTransactionArgument<string>,
        coord: RawTransactionArgument<string>,
        count: RawTransactionArgument<number | bigint>,
        ika: RawTransactionArgument<string>,
        sui: RawTransactionArgument<string>
    ];
}
export function replenishPresigns(options: ReplenishPresignsOptions) {
    const packageAddress = options.package ?? '@local-pkg/recovery';
    const argumentsTypes = [
        null,
        null,
        'u64',
        null,
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self", "coord", "count", "ika", "sui"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'recovery',
        function: 'replenish_presigns',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface ProposeArguments {
    self: RawTransactionArgument<string>;
    sweepMessages: RawTransactionArgument<Array<Array<number>>>;
    cred: TransactionArgument;
}
export interface ProposeOptions {
    package?: string;
    arguments: ProposeArguments | [
        self: RawTransactionArgument<string>,
        sweepMessages: RawTransactionArgument<Array<Array<number>>>,
        cred: TransactionArgument
    ];
}
/**
 * Propose a recovery sweep.
 *
 * `sweep_messages` is parsed (each message becomes a `SweepIntent`) and only the
 * intents are stored — the bytes themselves are discarded so the proposal isn't
 * tied to a specific recent blockhash. `execute()` will receive freshly-built
 * messages with current blockhash and re-derive intents to match.
 *
 * Each tx in the bundle reserves one presign out of the global pool. The reserved
 * caps are owned by the proposal and consumed at `execute()`.
 */
export function propose(options: ProposeOptions) {
    const packageAddress = options.package ?? '@local-pkg/recovery';
    const argumentsTypes = [
        null,
        'vector<vector<u8>>',
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self", "sweepMessages", "cred"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'recovery',
        function: 'propose',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface ApproveArguments {
    self: RawTransactionArgument<string>;
    proposalId: RawTransactionArgument<number | bigint>;
    cred: TransactionArgument;
}
export interface ApproveOptions {
    package?: string;
    arguments: ApproveArguments | [
        self: RawTransactionArgument<string>,
        proposalId: RawTransactionArgument<number | bigint>,
        cred: TransactionArgument
    ];
}
export function approve(options: ApproveOptions) {
    const packageAddress = options.package ?? '@local-pkg/recovery';
    const argumentsTypes = [
        null,
        'u64',
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self", "proposalId", "cred"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'recovery',
        function: 'approve',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface ExecuteArguments {
    self: RawTransactionArgument<string>;
    coord: RawTransactionArgument<string>;
    proposalId: RawTransactionArgument<number | bigint>;
    sweepMessages: RawTransactionArgument<Array<Array<number>>>;
    msgCentralizedSigs: RawTransactionArgument<Array<Array<number>>>;
    cred: TransactionArgument;
    ika: RawTransactionArgument<string>;
    sui: RawTransactionArgument<string>;
}
export interface ExecuteOptions {
    package?: string;
    arguments: ExecuteArguments | [
        self: RawTransactionArgument<string>,
        coord: RawTransactionArgument<string>,
        proposalId: RawTransactionArgument<number | bigint>,
        sweepMessages: RawTransactionArgument<Array<Array<number>>>,
        msgCentralizedSigs: RawTransactionArgument<Array<Array<number>>>,
        cred: TransactionArgument,
        ika: RawTransactionArgument<string>,
        sui: RawTransactionArgument<string>
    ];
}
/**
 * Execute an approved recovery proposal.
 *
 * Caller passes freshly-built sweep messages (with a current blockhash) and per-tx
 * `message_centralized_signature` blobs produced from the executor's share. For
 * each tx we re-parse the message, project to a `SweepIntent`, and abort unless it
 * matches the stored intent at the same index. Then we approve + sign via the
 * imported-key direct-sign path. The reserved presign for that index is consumed
 * regardless of whether Ika later validates the centralized signature.
 *
 * Auth: the executor must be a member. Without this gate, a non-member could
 * submit garbage centralized sigs and burn the reserved presigns.
 */
export function execute(options: ExecuteOptions) {
    const packageAddress = options.package ?? '@local-pkg/recovery';
    const argumentsTypes = [
        null,
        null,
        'u64',
        'vector<vector<u8>>',
        'vector<vector<u8>>',
        null,
        null,
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self", "coord", "proposalId", "sweepMessages", "msgCentralizedSigs", "cred", "ika", "sui"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'recovery',
        function: 'execute',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface ProposeEnrollmentArguments {
    self: RawTransactionArgument<string>;
    newMember: TransactionArgument;
    newEncryptionKeyAddress: RawTransactionArgument<string>;
    cred: TransactionArgument;
}
export interface ProposeEnrollmentOptions {
    package?: string;
    arguments: ProposeEnrollmentArguments | [
        self: RawTransactionArgument<string>,
        newMember: TransactionArgument,
        newEncryptionKeyAddress: RawTransactionArgument<string>,
        cred: TransactionArgument
    ];
}
export function proposeEnrollment(options: ProposeEnrollmentOptions) {
    const packageAddress = options.package ?? '@local-pkg/recovery';
    const argumentsTypes = [
        null,
        null,
        'address',
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self", "newMember", "newEncryptionKeyAddress", "cred"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'recovery',
        function: 'propose_enrollment',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface ApproveEnrollmentArguments {
    self: RawTransactionArgument<string>;
    enrollmentId: RawTransactionArgument<number | bigint>;
    cred: TransactionArgument;
}
export interface ApproveEnrollmentOptions {
    package?: string;
    arguments: ApproveEnrollmentArguments | [
        self: RawTransactionArgument<string>,
        enrollmentId: RawTransactionArgument<number | bigint>,
        cred: TransactionArgument
    ];
}
export function approveEnrollment(options: ApproveEnrollmentOptions) {
    const packageAddress = options.package ?? '@local-pkg/recovery';
    const argumentsTypes = [
        null,
        'u64',
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self", "enrollmentId", "cred"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'recovery',
        function: 'approve_enrollment',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface ExecuteEnrollmentArguments {
    self: RawTransactionArgument<string>;
    coord: RawTransactionArgument<string>;
    enrollmentId: RawTransactionArgument<number | bigint>;
    encryptedCentralizedSecretShareAndProof: RawTransactionArgument<Array<number>>;
    sourceEncryptedUserSecretKeyShareId: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    ika: RawTransactionArgument<string>;
    sui: RawTransactionArgument<string>;
}
export interface ExecuteEnrollmentOptions {
    package?: string;
    arguments: ExecuteEnrollmentArguments | [
        self: RawTransactionArgument<string>,
        coord: RawTransactionArgument<string>,
        enrollmentId: RawTransactionArgument<number | bigint>,
        encryptedCentralizedSecretShareAndProof: RawTransactionArgument<Array<number>>,
        sourceEncryptedUserSecretKeyShareId: RawTransactionArgument<string>,
        registry: RawTransactionArgument<string>,
        ika: RawTransactionArgument<string>,
        sui: RawTransactionArgument<string>
    ];
}
/**
 * Execute an enrollment for a _key-holding_ new member (Ed25519/Secp256k1/
 * Secp256r1/WebAuthn). Asks Ika to re-encrypt the user share to the new member's
 * encryption key, then adds them to the roster + registry.
 *
 * For approver-only (`SenderAddress`) members, use
 * `execute_enrollment_approver_only` instead — it skips the re-encrypt step (and
 * its IKA+SUI cost) since approver-only members don't hold a share.
 */
export function executeEnrollment(options: ExecuteEnrollmentOptions) {
    const packageAddress = options.package ?? '@local-pkg/recovery';
    const argumentsTypes = [
        null,
        null,
        'u64',
        'vector<u8>',
        '0x2::object::ID',
        null,
        null,
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self", "coord", "enrollmentId", "encryptedCentralizedSecretShareAndProof", "sourceEncryptedUserSecretKeyShareId", "registry", "ika", "sui"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'recovery',
        function: 'execute_enrollment',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface ExecuteEnrollmentApproverOnlyArguments {
    self: RawTransactionArgument<string>;
    enrollmentId: RawTransactionArgument<number | bigint>;
    registry: RawTransactionArgument<string>;
}
export interface ExecuteEnrollmentApproverOnlyOptions {
    package?: string;
    arguments: ExecuteEnrollmentApproverOnlyArguments | [
        self: RawTransactionArgument<string>,
        enrollmentId: RawTransactionArgument<number | bigint>,
        registry: RawTransactionArgument<string>
    ];
}
/**
 * Execute an enrollment for a `SenderAddress` (approver-only) member. Adds them to
 * the roster + registry without touching the dWallet — they can vote on future
 * proposals but never execute themselves. No IKA/SUI fee since there's no Ika
 * operation.
 */
export function executeEnrollmentApproverOnly(options: ExecuteEnrollmentApproverOnlyOptions) {
    const packageAddress = options.package ?? '@local-pkg/recovery';
    const argumentsTypes = [
        null,
        'u64',
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self", "enrollmentId", "registry"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'recovery',
        function: 'execute_enrollment_approver_only',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface ProposeRosterChangeArguments {
    self: RawTransactionArgument<string>;
    membersToRemove: RawTransactionArgument<Array<Array<number>>>;
    newThreshold: RawTransactionArgument<number | bigint | null>;
    cred: TransactionArgument;
}
export interface ProposeRosterChangeOptions {
    package?: string;
    arguments: ProposeRosterChangeArguments | [
        self: RawTransactionArgument<string>,
        membersToRemove: RawTransactionArgument<Array<Array<number>>>,
        newThreshold: RawTransactionArgument<number | bigint | null>,
        cred: TransactionArgument
    ];
}
/**
 * Propose a roster change. `members_to_remove` lists canonical member-ids to drop;
 * `new_threshold` is `option::some(t)` to also change threshold or
 * `option::none()` to keep the current value. Aborts if every removal isn't
 * already a member, or the proposal would leave the vault under `MIN_THRESHOLD`
 * members, or the resulting threshold is out of range.
 */
export function proposeRosterChange(options: ProposeRosterChangeOptions) {
    const packageAddress = options.package ?? '@local-pkg/recovery';
    const argumentsTypes = [
        null,
        'vector<vector<u8>>',
        '0x1::option::Option<u64>',
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self", "membersToRemove", "newThreshold", "cred"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'recovery',
        function: 'propose_roster_change',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface ApproveRosterChangeArguments {
    self: RawTransactionArgument<string>;
    rosterChangeId: RawTransactionArgument<number | bigint>;
    cred: TransactionArgument;
}
export interface ApproveRosterChangeOptions {
    package?: string;
    arguments: ApproveRosterChangeArguments | [
        self: RawTransactionArgument<string>,
        rosterChangeId: RawTransactionArgument<number | bigint>,
        cred: TransactionArgument
    ];
}
export function approveRosterChange(options: ApproveRosterChangeOptions) {
    const packageAddress = options.package ?? '@local-pkg/recovery';
    const argumentsTypes = [
        null,
        'u64',
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self", "rosterChangeId", "cred"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'recovery',
        function: 'approve_roster_change',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface ExecuteRosterChangeArguments {
    self: RawTransactionArgument<string>;
    rosterChangeId: RawTransactionArgument<number | bigint>;
}
export interface ExecuteRosterChangeOptions {
    package?: string;
    arguments: ExecuteRosterChangeArguments | [
        self: RawTransactionArgument<string>,
        rosterChangeId: RawTransactionArgument<number | bigint>
    ];
}
/**
 * Apply an approved roster change. No Ika ops, no IKA/SUI fee — purely a
 * shared-object mutation. Re-validates removals against the live members set (in
 * case of races with concurrent enrollments) and re-validates the resulting
 * threshold against the post-change roster size.
 */
export function executeRosterChange(options: ExecuteRosterChangeOptions) {
    const packageAddress = options.package ?? '@local-pkg/recovery';
    const argumentsTypes = [
        null,
        'u64'
    ] satisfies (string | null)[];
    const parameterNames = ["self", "rosterChangeId"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'recovery',
        function: 'execute_roster_change',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}