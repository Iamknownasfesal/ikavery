/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/


/**
 * # dWallet 2PC-MPC Coordinator Inner Module
 * 
 * This module implements the core logic for creating and managing dWallets using
 * Multi-Party Computation (MPC) protocols. It provides a trustless and
 * decentralized approach to wallet creation and key management through distributed
 * key generation (DKG) and threshold signing protocols.
 * 
 * ## Key Features
 * 
 * - Distributed Key Generation (DKG) for secure key creation
 * - Threshold signing with presign optimization
 * - Network encryption key management and reconfiguration
 * - User encryption key registration and management
 * - Session-based MPC protocol coordination
 * - Epoch-based validator committee transitions
 * - Comprehensive pricing and fee management
 * - Support for multiple cryptographic curves and algorithms
 * 
 * ## Architecture
 * 
 * The module is organized around the `DWalletCoordinatorInner` struct which
 * manages:
 * 
 * - dWallet lifecycle and state transitions
 * - MPC session coordination and scheduling
 * - Validator committee management
 * - Cryptographic algorithm support and emergency controls
 * - Economic incentives through pricing and fee collection
 */

import { MoveStruct } from '../../../utils/index.js';
import { bcs } from '@mysten/sui/bcs';
const $moduleName = 'ika_dwallet_2pc_mpc::coordinator_inner';
export const UnverifiedPresignCap = new MoveStruct({ name: `${$moduleName}::UnverifiedPresignCap`, fields: {
        id: bcs.Address,
        /**
         * Target dWallet ID for dWallet-specific presigns
         *
         * - `Some(id)`: Can only be used with the specified dWallet (e.g. ECDSA
         *   requirement)
         * - `None`: Global presign, can be used with any compatible dWallet (e.g. Schnorr
         *   and EdDSA)
         */
        dwallet_id: bcs.option(bcs.Address),
        /** ID of the associated presign session */
        presign_id: bcs.Address
    } });
export const ImportedKeyDWalletCap = new MoveStruct({ name: `${$moduleName}::ImportedKeyDWalletCap`, fields: {
        id: bcs.Address,
        /** ID of the controlled imported key dWallet */
        dwallet_id: bcs.Address
    } });