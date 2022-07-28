import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import {useEffect, useState} from "react";
import wizardOutput from "./../styles/WizardOutput.module.scss";
import wizard from "../styles/Wizard.module.scss";

const generateCargoTomlWithVersion = (
    version,
    name,
    edition,
    inkVersion,
    scaleVersion,
    scaleInfoVersion,
    brushDeclaration
) => {
    const inkVersionString = `${version < 'v1.7.0' ? `tag = "${inkVersion}", git = "https://github.com/paritytech/ink"` : `version = "${inkVersion}"` }`;
    return `[package]
name = "${name}"
version = "1.0.0"
edition = "${edition}"
authors = ["The best developer ever"]

[dependencies]
ink_primitives = { ${inkVersionString}, default-features = false }
ink_metadata = { ${inkVersionString}, default-features = false, features = ["derive"], optional = true }
ink_env = { ${inkVersionString}, default-features = false }
ink_storage = { ${inkVersionString}, default-features = false }
ink_lang = { ${inkVersionString}, default-features = false }
ink_prelude = { ${inkVersionString}, default-features = false }
ink_engine = { ${inkVersionString}, default-features = false, optional = true }

scale = { package = "parity-scale-codec", version = "${scaleVersion}", default-features = false, features = ["derive"] }
scale-info = { version = "${scaleInfoVersion}", default-features = false, features = ["derive"], optional = true }

# Include brush as a dependency and enable default implementation for PSP22 via brush feature
${brushDeclaration}

[lib]
name = "${name}"
path = "lib.rs"
crate-type = [
    # Used for normal contract Wasm blobs.
    "cdylib",
]

[features]
default = ["std"]
std = [
    "ink_primitives/std",
    "ink_metadata",
    "ink_metadata/std",
    "ink_env/std",
    "ink_storage/std",
    "ink_lang/std",
    "scale/std",
    "scale-info",
    "scale-info/std",

    "${version >= 'v2.0.0' ? 'openbrush' : 'brush'}/std",
]
ink-as-dependency = [] ${version == 'v1.3.0' ? '\n' +
        '[profile.dev]\n' +
        'overflow-checks = false\n' +
        '\n' +
        '[profile.release]\n' +
        'overflow-checks = false' : ''}`
}

const versionInfo = {
    'v1.3.0': {
        edition: '2018',
        inkVersion: 'v3.0.0-rc6',
        scaleVersion: '2.1',
        scaleInfoVersion: '1.0.0',
        brushDeclaration:
            (features) => `brush = { tag = "v1.3.0", git = "https://github.com/Supercolony-net/openbrush-contracts", default-features = false, features = [${features}] }`,
    },
    'v1.5.0': {
        edition: '2021',
        inkVersion: 'v3.0.0',
        scaleVersion: '3.0',
        scaleInfoVersion: '2.0.0',
        brushDeclaration:
            (features) => `brush = { tag = "v1.5.0", git = "https://github.com/Supercolony-net/openbrush-contracts", default-features = false, features = [${features}] }`,
    },
    'v1.6.0': {
        edition: '2021',
        inkVersion: 'v3.0.0',
        scaleVersion: '3.0',
        scaleInfoVersion: '2.0.0',
        brushDeclaration:
            (features) => `brush = { tag = "v1.6.0", git = "https://github.com/Supercolony-net/openbrush-contracts", default-features = false, features = [${features}] }`,
    },
    'v1.7.0': {
        edition: '2021',
        inkVersion: '3.1.0',
        scaleVersion: '3.0',
        scaleInfoVersion: '2.0.0',
        brushDeclaration:
            (features) => `brush = { tag = "v1.7.0", git = "https://github.com/Supercolony-net/openbrush-contracts", default-features = false, features = [${features}] }`,
    },
    'v2.0.0': {
        edition: '2021',
        inkVersion: '~3.2.0',
        scaleVersion: '3',
        scaleInfoVersion: '2',
        brushDeclaration:
            (features) => `openbrush = { version = "~2.0.0", default-features = false, features = [${features}] }`,
    },
    'v2.1.0': {
        edition: '2021',
        inkVersion: '~3.3.0',
        scaleVersion: '3',
        scaleInfoVersion: '2',
        brushDeclaration:
            (features) => `openbrush = { version = "~2.1.0", default-features = false, features = [${features}] }`,
    },
    'v2.2.0': {
        edition: '2021',
        inkVersion: '~3.3.0',
        scaleVersion: '3',
        scaleInfoVersion: '2',
        brushDeclaration:
            (features) => `openbrush = { version = "~2.2.0", default-features = false, features = [${features}] }`,
    }
}

export const generateCargoToml = (output, version='v2.2.0') => {
    const versionInfoElement = versionInfo[version];

    switch (output.type) {
        case 'psp22':
            return generateCargoTomlWithVersion(
                version,
                "my_" + output.type,
                versionInfoElement.edition,
                versionInfoElement.inkVersion,
                versionInfoElement.scaleVersion,
                versionInfoElement.scaleInfoVersion,
                versionInfoElement.brushDeclaration(`"psp22"${
                    output.currentControlsState.find(x => x.name === 'Pausable').state ? `, "pausable"` : ''}${
                    output.security == "ownable" ? `, "ownable"` : ''}${
                    output.security == "access_control" ? `, "access_control"` : ''}`)
            );
        case 'psp37':
            return generateCargoTomlWithVersion(
                version,
                "my_" + output.type,
                versionInfoElement.edition,
                versionInfoElement.inkVersion,
                versionInfoElement.scaleVersion,
                versionInfoElement.scaleInfoVersion,
                versionInfoElement.brushDeclaration(`"${version < 'v2.1.0' ? 'psp1155' : (version <= 'v2.2.0' ? 'psp35' : 'psp37')}"${output.security == "ownable" ? `, "ownable"` : ''}${output.security == "access_control" ? `, "access_control"` : ''}`)
            );
        case 'psp34':
            return generateCargoTomlWithVersion(
                version,
                "my_" + output.type,
                versionInfoElement.edition,
                versionInfoElement.inkVersion,
                versionInfoElement.scaleVersion,
                versionInfoElement.scaleInfoVersion,
                versionInfoElement.brushDeclaration(`"psp34"${output.security == "ownable" ? `, "ownable"` : ''}${output.security == "access_control" ? `, "access_control"` : ''}`)
            );
    }
}
export const generateLib = (output, version='v2.2.0') => {
    const brushName = version >= 'v2.2.0' ? 'openbrush' : 'brush';
    const isBatch = output.currentControlsState.find(x => x.name === 'Batch')?.state;
    const isMetadata = output.currentControlsState.find(x => x.name === 'Metadata')?.state;
    const isEnumerable = output.currentControlsState.find(x => x.name === 'Enumerable')?.state && version > "v1.5.0";
    const isBurnable = output.currentControlsState.find(x => x.name === 'Burnable')?.state;
    const isMintable = output.currentControlsState.find(x => x.name === 'Mintable')?.state;
    const isFlashMintable = output.currentControlsState.find(x => x.name === 'FlashMint')?.state;
    const isPausable = output.currentControlsState.find(x => x.name === 'Pausable')?.state;
    const isOwnable = output.security == 'ownable';
    const isAccessControl = output.security == 'access_control';
    const isWrapper = output.currentControlsState.find(x => x.name === 'Wrapper')?.state;
    const isCapped = output.currentControlsState.find(x => x.name === 'Capped')?.state;
    const name = output.currentControlsState.find(x => x.name === 'Name')?.state;
    const symbol = output.currentControlsState.find(x => x.name === 'Symbol')?.state;

    switch (output.type) {
        case 'psp22':
            return `#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]
                                
#[${brushName}::contract]
pub mod my_token {
    // Imports from ink! ${isMetadata || isCapped ? `
    use ink_prelude::string::String;` : ''} ${version != 'v1.3.0' ? `
    use ink_storage::traits::SpreadAllocate;` : ''}
    
    // Imports from ${brushName}
    use ${brushName}::contracts::psp22::*; ${isMetadata ? `
    use ${brushName}::contracts::psp22::extensions::metadata::*;` : ''} ${isBurnable ? `
    use ${brushName}::contracts::psp22::extensions::burnable::*;` : ''} ${isMintable ? `
    use ${brushName}::contracts::psp22::extensions::mintable::*;` : ''} ${isWrapper ? `
    use ${brushName}::contracts::psp22::extensions::wrapper::*;` : ''} ${isFlashMintable ? `
    use ${brushName}::contracts::psp22::extensions::flashmint::*;` : ''} ${isPausable ? `
    use ${brushName}::contracts::pausable::*;`: ''} ${isOwnable ? `
    use ${brushName}::contracts::ownable::*;` : ''} ${isAccessControl ? `
    use ${brushName}::contracts::access_control::*;` : ''}

    #[ink(storage)]
    #[derive(Default, ${
                version !== 'v1.3.0' ? 'SpreadAllocate, ' : ''}${
                version < 'v2.2.0' ? 'PSP22' : ''}Storage${
                (version < 'v2.2.0' && isMetadata) ? `, PSP22MetadataStorage` : ''}${
                (version < 'v2.2.0' && isWrapper) ? `, PSP22WrapperStorage` : ''}${
                (version < 'v2.2.0' && isPausable) ? `, PausableStorage` : ''}${
                (version < 'v2.2.0' && isOwnable) ? `, OwnableStorage` : ''}${
                (version < 'v2.2.0' && isAccessControl) ? `, AccessControlStorage` : ''})]
    pub struct Contract {
        #[${version < 'v2.2.0' ? 'PSP22StorageField' : 'storage_field'}]
        psp22: ${version < 'v2.2.0' ? 'PSP22Data' : 'psp22::Data'}, ${isOwnable ? `
        #[${version < 'v2.2.0' ? 'OwnableStorageField' : 'storage_field'}]
        ownable: ${version < 'v2.2.0' ? 'OwnableData' : 'ownable::Data'},` : ''} ${isMetadata ? `
        #[${version < 'v2.2.0' ? 'PSP22MetadataStorageField' : 'storage_field'}]
        metadata: ${version < 'v2.2.0' ? 'PSP22MetadataData' : 'metadata::Data'},` : ''} ${isWrapper ? `
        #[${version < 'v2.2.0' ? 'PSP22WrapperStorageField' : 'storage_field'}]
        wrapper: ${version < 'v2.2.0' ? 'PSP22WrapperData' : 'wrapper::Data'},` : ''} ${isPausable ? `
        #[${version < 'v2.2.0' ? 'PausableStorageField' : 'storage_field'}]
        pause: ${version < 'v2.2.0' ? 'PausableData' : 'pausable::Data'},` : ''} ${isCapped ? `
        cap: Balance,`: ''} ${isAccessControl ? `
        #[${version < 'v2.2.0' ? 'AccessControlStorageField' : 'storage_field'}]
        access_control: ${version < 'v2.2.0' ? 'AccessControlData' : 'access_control::Data'},` : ''}
    }${isAccessControl ? `
    
    // You can add more roles for different purposes
    const MANAGER: RoleType = ink_lang::selector_id!("MANAGER");
    ` : ''}

    // Section contains default implementation without any modifications
    impl PSP22 for Contract {} ${isMetadata ? `
    impl PSP22Metadata for Contract {}` : ''} ${isWrapper ? `
    impl PSP22Wrapper for Contract {}` : ''} ${isFlashMintable ? `
    impl FlashLender for Contract {}` : ''} ${isPausable ? `
    impl Pausable for Contract {}` : ''} ${isOwnable ? `
    impl Ownable for Contract {}` : ''} ${isAccessControl ? `
    impl AccessControl for Contract {}` : ''} ${isAccessControl || isOwnable ? `
    
    // Section contains modified methods with additional functionality.` : ''} ${isBurnable ? `
    impl PSP22Burnable for Contract {${isAccessControl || isOwnable ? `
        /// override the \`burn\` function to add the access modifier
        #[ink(message)]
        #[${brushName}::modifiers(${isOwnable ? 'only_owner' : 'only_role(MANAGER)'})]
        fn burn(&mut self, account: AccountId, amount: Balance) -> Result<(), PSP22Error> {
            self._burn_from(account, amount)
        }
    }` : '}'}` : ''} ${isMintable ? `
    impl PSP22Mintable for Contract {${isAccessControl || isOwnable ? `
        /// override the \`mint\` function to add the access modifier
        #[ink(message)]
        #[${brushName}::modifiers(${isOwnable ? 'only_owner' : 'only_role(MANAGER)'})]
        fn mint(&mut self, account: AccountId, amount: Balance) -> Result<(), PSP22Error> {
            self._mint(account, amount)
        }
    }` : '}'}` : ''} ${isCapped || isPausable ? `
    
    impl ${version <= 'v1.5.0'? 'PSP22Internal' : 'PSP22Transfer'} for Contract {${isPausable ? `
        /// Return \`Paused\` error if the token is paused
        #[${brushName}::modifiers(when_not_paused)]` : `` }
        fn _before_token_transfer(
            &mut self,
            _from: Option<&AccountId>,
            _to: Option<&AccountId>,
            _amount: &Balance,
        ) -> Result<(), PSP22Error> {${isCapped ? `
            // \`is_none\` means that it is minting
            if _from.is_none() && (self.total_supply() + _amount) > self.cap() {
                return Err(PSP22Error::Custom(String::from("Cap exceeded")))
            }` : `` }
            Ok(())
        }
    }` : ''}
        
    impl Contract {
        #[ink(constructor)]
        pub fn new(initial_supply: Balance${isMetadata ? `, name: Option<String>, symbol: Option<String>, decimal: u8` : ''}${isCapped ? `, cap: Balance` : ''}) -> Self {
            ${version == 'v1.3.0' ? `let mut _instance = Self::default(); ${isCapped ? `
            assert!(_instance._init_cap(cap).is_ok());` : ''} ${isMetadata ? `
            _instance.metadata.name = name;
            _instance.metadata.symbol = symbol;
            _instance.metadata.decimals = decimal;` : '' } ${isOwnable ? `
            _instance._init_with_owner(_instance.env().caller());` : '' } ${isAccessControl ? `
            _instance._init_with_admin(_instance.env().caller());
            _instance.grant_role(MANAGER, _instance.env().caller()).expect("Should grant MANAGER role");` : ''}
            assert!(_instance._mint(_instance.env().caller(), initial_supply).is_ok());
            _instance`: 
            `ink_lang::codegen::initialize_contract(|_instance: &mut ${name}| { ${isCapped ? `
                assert!(_instance._init_cap(cap).is_ok());` : ''} ${isMetadata ? `
                _instance.metadata.name = name;
                _instance.metadata.symbol = symbol;
                _instance.metadata.decimals = decimal;` : '' }
                _instance
                    ._mint(_instance.env().caller(), initial_supply)
                    .expect("Should mint");${isOwnable ? `
                _instance._init_with_owner(_instance.env().caller());` : '' } ${isAccessControl ? `
                _instance._init_with_admin(_instance.env().caller()); 
                _instance.grant_role(MANAGER, _instance.env().caller()).expect("Should grant MANAGER role");` : ''}
            })`
            }
        } ${isPausable ? `
        
        #[ink(message)]${isOwnable || isAccessControl ? `
        #[${brushName}::modifiers(${isOwnable ? 'only_owner' : 'only_role(MANAGER)'})]` : ''}
        pub fn change_state(&mut self) -> Result<(), PSP22Error>  {
            if self.paused() {
                self._unpause()
            } else {
                self._pause()
            }
        }` : ''} ${isCapped ? `
        
        /// Method to return token's cap
        #[ink(message)]
        pub fn cap(&self) -> Balance {
            self.cap
        }

        /// Initializes the token's cap
        fn _init_cap(&mut self, cap: Balance) -> Result<(), PSP22Error> {
            if cap <= 0 {
                return Err(PSP22Error::Custom(String::from("Cap must be above 0")))
            }
            self.cap = cap;
            Ok(())
        }` : ''}
    }
}`
        case 'psp37':
            const standard_name = (version < 'v2.1.0' ? 'psp1155' : (version <= 'v2.2.0' ? 'psp35' : 'psp37'));
            return `#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]

#[${brushName}::contract]
pub mod my_${standard_name} {
    // Imports from ink! ${isMetadata ? `
    use ink_prelude::string::String;` : ''} ${(isBurnable || isMintable) && (isOwnable || isAccessControl) ? `
    use ink_prelude::vec::Vec;` : ''} ${version != 'v1.3.0' ? `
    use ink_storage::traits::SpreadAllocate;` : ''}
    
    // Imports from ${brushName}
    use ${brushName}::contracts::${standard_name}::*; ${isBatch ? `
    use ${brushName}::contracts::${standard_name}::extensions::batch::*;` : ''} ${isMetadata ? `
    use ${brushName}::contracts::${standard_name}::extensions::metadata::*;` : ''} ${isBurnable ? `
    use ${brushName}::contracts::${standard_name}::extensions::burnable::*;` : ''} ${isMintable ? `
    use ${brushName}::contracts::${standard_name}::extensions::mintable::*;` : ''} ${isEnumerable ? `
    use ${brushName}::contracts::${standard_name}::extensions::enumerable::*;` : ''}${isOwnable ? `
    use ${brushName}::contracts::ownable::*;` : ''} ${isAccessControl ? `
    use ${brushName}::contracts::access_control::*;` : ''}

    #[ink(storage)]
    #[derive(Default, ${
                version !== 'v1.3.0' ? 'SpreadAllocate, ' : ''}${
                version < 'v2.2.0' ? standard_name.toUpperCase() : ''}Storage${
                (version < 'v2.2.0' && isMetadata) ? `, ${standard_name.toUpperCase()}MetadataStorage` : ``}${
                (version < 'v2.2.0' && isOwnable) ? `, OwnableStorage` : ''}${
                (version < 'v2.2.0' && isAccessControl) ? `, AccessControlStorage` : ''})]
    pub struct Contract {
        #[${version < 'v2.2.0' ? `${standard_name.toUpperCase()}StorageField` : 'storage_field'}]
        ${standard_name}: ${version < 'v2.2.0' ? `${standard_name.toUpperCase()}Data` : `${standard_name}::Data`}${isEnumerable? (version < 'v2.2.0' ? '<EnumerableBalances>' : '<enumerable::Balances>'): ''}, ${isMetadata ? `
        #[${version < 'v2.2.0' ? `${standard_name.toUpperCase()}MetadataStorageField` : 'storage_field'}]
        metadata: ${version < 'v2.2.0' ? `${standard_name.toUpperCase()}MetadataData` : 'metadata::Data'},` : ``} ${isOwnable ? `
        #[${version < 'v2.2.0' ? 'OwnableStorageField' : 'storage_field'}]
        ownable: ${version < 'v2.2.0' ? 'OwnableData' : 'ownable::Data'},` : ``} ${isAccessControl ? `
        #[${version < 'v2.2.0' ? 'AccessControlStorageField' : 'storage_field'}]
        access_control: ${version < 'v2.2.0' ? 'AccessControlData' : 'access_control::Data'},` : ''}
    }${isAccessControl ? `
    
    const MANAGER: RoleType = ink_lang::selector_id!("MANAGER");
    ` : ''}
    
    // Section contains default implementation without any modifications
    impl ${standard_name.toUpperCase()} for Contract {} ${isBatch ? `
    impl ${standard_name.toUpperCase()}Batch for Contract {}` : ''} ${isMetadata ? `
    impl ${standard_name.toUpperCase()}Metadata for Contract {}` : ''} ${isEnumerable ? `
    impl ${standard_name.toUpperCase()}Enumerable for Contract {}` : ''} ${isOwnable ? `
    impl Ownable for Contract {}` : ''} ${isAccessControl ? `
    impl AccessControl for Contract {}` : ''} ${isAccessControl || isOwnable ? `
    
    // Section contains modified methods with additional functionality.` : ''} ${isBurnable ? `
    impl ${standard_name.toUpperCase()}Burnable for Contract {${isAccessControl || isOwnable ? `
        /// override the \`burn\` function to add the access modifier
        #[ink(message)]
        #[${brushName}::modifiers(${isOwnable ? 'only_owner' : 'only_role(MANAGER)'})]
        fn burn(&mut self, from: AccountId, ids_amounts: Vec<(Id, Balance)>) -> Result<(), ${standard_name.toUpperCase()}Error> {
            self._burn_from(from, ids_amounts)
        }
    }` : '}'}` : ''} ${isMintable ? `
    impl ${standard_name.toUpperCase()}Mintable for Contract {${isAccessControl || isOwnable ? `
        /// override the \`mint\` function to add the access modifier
        #[ink(message)]
        #[${brushName}::modifiers(${isOwnable ? 'only_owner' : 'only_role(MANAGER)'})]
        fn mint(&mut self, to: AccountId, ids_amounts: Vec<(Id, Balance)>) -> Result<(), ${standard_name.toUpperCase()}Error> {
            self._mint_to(to, ids_amounts)
        }
    }` : '}'}` : ''}
    
    impl Contract {
        #[ink(constructor)]
        pub fn new(${isMetadata ? (version >= 'v2.1.0' ? `id: Id, key: Vec<u8>, data: Vec<u8>` : `uri: Option<String>`) : ''}) -> Self {
            ${ version == 'v1.3.0' ? `${isMetadata ? `let mut _instance = Self::default();
            _instance.metadata.uri = uri;${isOwnable ? 
            `_instance._init_with_owner(_instance.env().caller());` : '' }${isAccessControl ? `
            _instance._init_with_admin(_instance.env().caller()); 
            _instance.grant_role(MANAGER, _instance.env().caller()).expect("Should grant MANAGER role");` : ''}
            _instance` : `Self::default()` } ` :
                `ink_lang::codegen::initialize_contract(|_instance: &mut Self| {${isMetadata ?
                (version < 'v2.1.0' ? `
                _instance.metadata.uri = uri;` : `
                _instance._set_attribute(&id, &key, &data);`) : ''} ${isOwnable ? `
                _instance._init_with_owner(_instance.env().caller());` : '' } ${isAccessControl ? `
                _instance._init_with_admin(_instance.env().caller()); 
                _instance.grant_role(MANAGER, _instance.env().caller()).expect("Should grant MANAGER role");` : ''}
            })`
            }
        }
    } 
}
`
        case 'psp34':
            return `#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]
                    
#[${brushName}::contract]
pub mod my_psp34 {
    // Imports from ink! ${isMetadata || isCapped ? `
    use ink_prelude::string::String;` : ''} ${version != 'v1.3.0' ? `
    use ink_storage::traits::SpreadAllocate;` : ''}
    
    // Imports from ${brushName}
    use ${brushName}::contracts::psp34::*; ${isMetadata ? `
    use ${brushName}::contracts::psp34::extensions::metadata::*;` : ''} ${isEnumerable ? `
    use ${brushName}::contracts::psp34::extensions::enumerable::*;` : ''} ${isBurnable ? `
    use ${brushName}::contracts::psp34::extensions::burnable::*;` : ''} ${isMintable ? `
    use ${brushName}::contracts::psp34::extensions::mintable::*;` : ''} ${isOwnable ? `
    use ${brushName}::contracts::ownable::*;` : ''} ${isAccessControl ? `
    use ${brushName}::contracts::access_control::*;` : ''}
    
    #[derive(Default, ${
                version !== 'v1.3.0' ? 'SpreadAllocate, ' : ''}${
                version < 'v2.2.0' ? 'PSP34' : ''}Storage${
                (version < 'v2.2.0' && isMetadata) ? `, PSP34MetadataStorage` : ''}${
                (version < 'v2.2.0' && isEnumerable) ? `, PSP34EnumerableStorage` : ''}${
                (version < 'v2.2.0' && isOwnable) ? `, OwnableStorage` : ''}${
                (version < 'v2.2.0' && isAccessControl) ? `, AccessControlStorage` : ''})]
    #[ink(storage)]
    pub struct Contract{
        #[${version < 'v2.2.0' ? 'PSP34StorageField' : 'storage_field'}]
        psp34: ${version < 'v2.2.0' ? 'PSP34Data' : 'psp34::Data'}${
                (version > 'v2.0.0' && isEnumerable) ? (version < 'v2.2.0' ? '<EnumerableBalances>' : '<enumerable::Balances>') : ''}, ${isMetadata ? `
        #[${version < 'v2.2.0' ? 'PSP34MetadataStorageField' : 'storage_field'}]
        metadata: ${version < 'v2.2.0' ? 'PSP34MetadataData' : 'metadata::Data'},` : ''} ${isEnumerable && version < 'v2.1.0' ? `
        #[PSP34EnumerableStorageField]
        enumerable: PSP34EnumerableData,` : ``} ${isOwnable ? `
        #[${version < 'v2.2.0' ? 'OwnableStorageField' : 'storage_field'}]
        ownable: OwnableData,` : ''} ${isAccessControl ? `
        #[${version < 'v2.2.0' ? 'AccessControlStorageField' : 'storage_field'}]
        access_control: AccessControlData,` : ''}
    }${isAccessControl ? `
    
    const MANAGER: RoleType = ink_lang::selector_id!("MANAGER");` : ''}

    // Section contains default implementation without any modifications
    impl PSP34 for ${name} {} ${isMetadata ? `
    impl PSP34Metadata for ${name} {}` : ``} ${isEnumerable ? `
    impl PSP34Enumerable for ${name} {}` : ``} ${isOwnable ? `
    impl Ownable for ${name} {}` : ''} ${isAccessControl ? `
    impl AccessControl for ${name} {}` : ''} ${isAccessControl || isOwnable ? `
    
    // Section contains modified methods with additional functionality.` : ''} ${isBurnable ? `
    impl PSP34Burnable for Contract {${isAccessControl || isOwnable ? `
        /// override the \`burn\` function to add the access modifier
        #[ink(message)]
        #[${brushName}::modifiers(${isOwnable ? 'only_owner' : 'only_role(MANAGER)'})]
        fn burn(&mut self, account: AccountId, id: Id) -> Result<(), PSP34Error> {
        self._burn_from(account, id)
        }
    }` : '}'}` : ''} ${isMintable ? `
    impl PSP34Mintable for Contract {${isAccessControl || isOwnable ? `
        /// override the \`mint\` function to add the access modifier
        #[ink(message)]
        #[${brushName}::modifiers(${isOwnable ? 'only_owner' : 'only_role(MANAGER)'})]
        fn mint(&mut self, account: AccountId, id: Id) -> Result<(), PSP34Error> {
            self._mint_to(account, id)
        }
    }` : '}'}` : ''}
    
    impl Contract {
        #[ink(constructor)]
        pub fn new() -> Self {
            ${version == '1.3.0' ? `${isMetadata ? `let mut _instance = Self::default();
            let collection_id = _instance.collection_id();
            _instance._set_attribute(collection_id.clone(), String::from("name").into_bytes(), String::from("${name}").into_bytes());
            _instance._set_attribute(collection_id, String::from("symbol").into_bytes(), String::from("${symbol}").into_bytes());${isMintable ? `
            _instance._mint_to(_instance.env().caller(), Id::U8(1)).expect("Can mint");${isOwnable ? `
                _instance._init_with_owner(_instance.env().caller());` : '' }${isAccessControl ? `
                _instance._init_with_admin(_instance.env().caller()); 
                _instance.grant_role(MANAGER, _instance.env().caller()).expect("Should grant MANAGER role");` : ''}` : ''}
            _instance` : `let mut _instance = Self::default()${isOwnable ? `
                _instance._init_with_owner(_instance.env().caller());` : '' }${isAccessControl ? `
                _instance._init_with_admin(_instance.env().caller()); 
                _instance.grant_role(MANAGER, _instance.env().caller().expect("Should grant MANAGER role");` : ''}
                _instance`}` :
                `ink_lang::codegen::initialize_contract(|_instance: &mut Self| {${isMetadata ? `
                let collection_id = _instance.collection_id();
                _instance._set_attribute(collection_id.clone(), String::from("name").into_bytes(), String::from("${name}").into_bytes());
                _instance._set_attribute(collection_id, String::from("symbol").into_bytes(), String::from("${symbol}").into_bytes());${isMintable ? `
                _instance._mint_to(_instance.env().caller(), Id::U8(1)).expect("Can mint");` : ''}${isOwnable ? `
                _instance._init_with_owner(_instance.env().caller());` : `` }${isAccessControl ? `
                _instance._init_with_admin(_instance.env().caller()); 
                _instance.grant_role(MANAGER, _instance.env().caller()).expect("Should grant MANAGER role");` : ''}` : `${isOwnable ? `
                _instance._init_with_owner(_instance.env().caller());` : `` }${isAccessControl ? `
                _instance._init_with_admin(_instance.env().caller()); 
                _instance.grant_role(MANAGER, _instance.env().caller()).expect("Should grant MANAGER role");` : ''}`}
            })`
            }
        }
    }
}`
    }
}

const WizardOutput = ({data}) => {
    const [output, setOutPut] = useState(data)
    const [selectedTab, setSelectedTab] = useState('rust')

    useEffect(() => {
        setOutPut(data);
    }, [data, output])

    if (output)
     switch (output.type) {
        case 'psp22':
            return (
                <div>
                    <div className={wizardOutput.tabsSwitch}>
                        <div onClick={() => setSelectedTab('rust')} className={ selectedTab === 'rust' ? wizardOutput.activeTab : ''}>lib.rs</div>
                        <div onClick={() => setSelectedTab('toml')} className={ selectedTab === 'toml' ? wizardOutput.activeTab : ''}>Cargo.toml</div>
                    </div>
                    <div className={wizardOutput.mainContent}>
                        {
                            <div className={wizard.copyToClipboard}
                                 onClick={() => {
                                     selectedTab == 'rust' ? navigator.clipboard.writeText(generateLib(output, output.version)) : navigator.clipboard.writeText(generateCargoToml(output, output.version))
                                 }}
                            >
                                <img
                                    className={wizard.copyIcon}
                                    src="/icons/copy.svg"
                                    alt="logo"
                                />
                            </div>
                        }
                        {
                            selectedTab === 'rust' ?
                             (<SyntaxHighlighter language="rust" wrapLongLines={true} style={vscDarkPlus}>
                                {generateLib(output, output.version)}
                            </SyntaxHighlighter>) :
                             (<SyntaxHighlighter language="toml" wrapLongLines={true} style={vscDarkPlus}>
                                {generateCargoToml(output, output.version)}
                            </SyntaxHighlighter>)
                        }
                    </div>
                </div>
            )        
        case 'psp37':
            return (
                <div>
                    <div className={wizardOutput.tabsSwitch}>
                        <div onClick={() => setSelectedTab('rust')} className={ selectedTab === 'rust' ? wizardOutput.activeTab : ''}>lib.rs</div>
                        <div onClick={() => setSelectedTab('toml')} className={ selectedTab === 'toml' ? wizardOutput.activeTab : ''}>Cargo.toml</div>
                    </div>
                    <div className={wizardOutput.mainContent}>
                        {
                            <div className={wizard.copyToClipboard}
                            onClick={() => {
                                selectedTab == 'rust' ? navigator.clipboard.writeText(generateLib(output, output.version)) : navigator.clipboard.writeText(generateCargoToml(output, output.version))
                            }}
                            >
                            <img
                            className={wizard.copyIcon}
                            src="/icons/copy.svg"
                            alt="logo"
                            />
                            </div>
                        }
                        {
                            selectedTab === 'rust' ?
                                (<SyntaxHighlighter language="rust" wrapLongLines={true} style={vscDarkPlus}>
                                    {generateLib(output, output.version)}
                                </SyntaxHighlighter>) :
                                (<SyntaxHighlighter language="toml" wrapLongLines={true} style={vscDarkPlus}>
                                    {generateCargoToml(output, output.version)}
                                </SyntaxHighlighter>)
                        }
                    </div>
                </div>)
        case 'psp34':
            return (<>
                <div>
                    <div className={wizardOutput.tabsSwitch}>
                        <div onClick={() => setSelectedTab('rust')} className={ selectedTab === 'rust' ? wizardOutput.activeTab : ''}>lib.rs</div>
                        <div onClick={() => setSelectedTab('toml')} className={ selectedTab === 'toml' ? wizardOutput.activeTab : ''}>Cargo.toml</div>
                    </div>
                    <div className={wizardOutput.mainContent}>
                        {
                            <div className={wizard.copyToClipboard}
                                 onClick={() => {
                                     selectedTab == 'rust' ? navigator.clipboard.writeText(generateLib(output, output.version)) : navigator.clipboard.writeText(generateCargoToml(output, output.version))
                                 }}
                            >
                                <img
                                    className={wizard.copyIcon}
                                    src="/icons/copy.svg"
                                    alt="logo"
                                />
                            </div>
                        }
                        {
                            selectedTab === 'rust' ?
                                (<SyntaxHighlighter language='rust' wrapLongLines={true} style={vscDarkPlus}>
                                        {generateLib(output, output.version)}
                                    </SyntaxHighlighter>) :
                                (<SyntaxHighlighter language="toml" wrapLongLines={true} style={vscDarkPlus}>
                                    {generateCargoToml(output, output.version)}
                                </SyntaxHighlighter>)
                        }
                    </div>
                </div>
            </>)
        default:
          return (<></>)
    }
    return (<></>)

}

export default WizardOutput;