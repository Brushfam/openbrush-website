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
ink-as-dependency = []`
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
    'v1.4.0': {
        edition: '2021',
        inkVersion: 'v3.0.0-rc10',
        scaleVersion: '3.0',
        scaleInfoVersion: '2.0.0',
        brushDeclaration:
            (features) => `brush = { tag = "v1.4.0", git = "https://github.com/Supercolony-net/openbrush-contracts", default-features = false, features = [${features}] }`,
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
    }
}

export const generateCargoToml = (output, version='v2.0.0') => {
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
                versionInfoElement.brushDeclaration(`"psp22"${output.currentControlsState.find(x => x.name === 'Pausable').state ? `, "pausable"` : ''}${output.currentControlsState.find(x => x.name === 'Ownable').state ? `, "ownable"` : ''}`)
            );
        case 'psp1155':
            return generateCargoTomlWithVersion(
                version,
                "my_" + output.type,
                versionInfoElement.edition,
                versionInfoElement.inkVersion,
                versionInfoElement.scaleVersion,
                versionInfoElement.scaleInfoVersion,
                versionInfoElement.brushDeclaration(`"psp1155"${output.currentControlsState.find(x => x.name === 'Ownable').state ? `, "ownable"` : ''}`)
            );
        case 'psp34':
            return generateCargoTomlWithVersion(
                version,
                "my_" + output.type,
                versionInfoElement.edition,
                versionInfoElement.inkVersion,
                versionInfoElement.scaleVersion,
                versionInfoElement.scaleInfoVersion,
                versionInfoElement.brushDeclaration(`"psp34"${output.currentControlsState.find(x => x.name === 'Ownable').state ? `, "ownable"` : ''}`)
            );
    }
}
export const generateLib = (output, version='v2.0.0') => {
    const brushName = version >= 'v2.0.0' ? 'openbrush' : 'brush';

    switch (output.type) {
        case 'psp22':
            return `#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]
                                
#[${brushName}::contract]
pub mod my_token {
    use ink_prelude::{
        string::String,
        vec::Vec,
    }; ${output.version != 'v1.3.0' ? `
    use ink_storage::traits::SpreadAllocate;` : ''}
    
    use ${brushName}::contracts::psp22::*; ${output.currentControlsState.find(x => x.name === 'Metadata').state ? `
    use ${brushName}::contracts::psp22::extensions::metadata::*;` : ''} ${output.currentControlsState.find(x => x.name === 'Burnable').state ? `
    use ${brushName}::contracts::psp22::extensions::burnable::*;` : ''} ${output.currentControlsState.find(x => x.name === 'Mintable').state ? `
    use ${brushName}::contracts::psp22::extensions::mintable::*;` : ''} ${output.currentControlsState.find(x => x.name === 'Wrapper').state ? `
    use ${brushName}::contracts::psp22::extensions::wrapper::*;` : ''} ${output.currentControlsState.find(x => x.name === 'FlashMint').state ? `
    use ${brushName}::contracts::psp22::extensions::flashmint::*;` : ''} ${output.currentControlsState.find(x => x.name === 'Pausable').state ? `
    use ${brushName}::{
        contracts::pausable::*,
        modifiers,
    };`: ''} ${output.currentControlsState.find(x => x.name === 'Ownable').state ? `
    use ${brushName}::contracts::ownable::*;` : ''}

    #[ink(storage)]
    #[derive(Default, ${
                output.version !== 'v1.3.0' ? 'SpreadAllocate, ' : ''}PSP22Storage${
                output.currentControlsState.find(x => x.name === 'Metadata').state ? `, PSP22MetadataStorage` : ''}${
                output.currentControlsState.find(x => x.name === 'Wrapper').state ? `, PSP22WrapperStorage` : ''}${
                output.currentControlsState.find(x => x.name == 'Pausable').state ? `, PausableStorage` : ''}${
                output.currentControlsState.find(x => x.name == 'Ownable').state ? `, OwnableStorage` : ''})]
    pub struct ${output.currentControlsState.find(x => x.name === 'Name').state} {
        #[PSP22StorageField]
        psp22: PSP22Data, ${output.currentControlsState.find(x => x.name === 'Ownable').state ? `
        #[OwnableStorageField]
        ownable: OwnableData,` : ''} ${output.currentControlsState.find(x => x.name === 'Metadata').state ? `
        #[PSP22MetadataStorageField]
        metadata: PSP22MetadataData,` : ''} ${output.currentControlsState.find(x => x.name === 'Wrapper').state ? `
        #[PSP22WrapperStorageField]
        wrapper: PSP22WrapperData,` : ''} ${output.currentControlsState.find(x => x.name === 'Pausable').state ? `
        #[PausableStorageField]
        pause: PausableData,` : ''} ${output.currentControlsState.find(x => x.name === 'Capped').state ? `
        cap: Balance,`: ''} 
    }
        
    impl PSP22 for ${output.currentControlsState.find(x => x.name === 'Name').state} {} ${output.currentControlsState.find(x => x.name === 'Metadata').state ? `
    impl PSP22Metadata for ${output.currentControlsState.find(x => x.name === 'Name').state} {}` : ''} ${output.currentControlsState.find(x => x.name === 'Burnable').state ? `
    impl PSP22Burnable for ${output.currentControlsState.find(x => x.name === 'Name').state} {}` : ''} ${output.currentControlsState.find(x => x.name === 'Mintable').state ? `
    impl PSP22Mintable for ${output.currentControlsState.find(x => x.name === 'Name').state} {}` : ''} ${output.currentControlsState.find(x => x.name === 'Wrapper').state ? `
    impl PSP22Wrapper for ${output.currentControlsState.find(x => x.name === 'Name').state} {}` : ''} ${output.currentControlsState.find(x => x.name === 'FlashMint').state ? `
    impl FlashLender for ${output.currentControlsState.find(x => x.name === 'Name').state} {}` : ''} ${output.currentControlsState.find(x => x.name === 'Pausable').state ? `
    impl Pausable for ${output.currentControlsState.find(x => x.name === 'Name').state} {}` : ''} ${output.currentControlsState.find(x => x.name === 'Ownable').state ? `
    impl Ownable for ${output.currentControlsState.find(x => x.name === 'Name').state} {}` : ''}
        
    impl ${output.currentControlsState.find(x => x.name === 'Name').state} {
        #[ink(constructor)]
        pub fn new(initial_supply: Balance${output.currentControlsState.find(x => x.name === 'Metadata').state ? `, name: Option<String>, symbol: Option<String>, decimal: u8` : ''}${output.currentControlsState.find(x => x.name === 'Capped').state ? `, cap: Balance` : ''}) -> Self {
            ${output.version == 'v1.3.0' ? `let mut instance = Self::default(); ${output.currentControlsState.find(x => x.name === 'Capped').state ? `
            assert!(instance.init_cap(cap).is_ok());` : ''} ${output.currentControlsState.find(x => x.name === 'Metadata').state ? `
            instance.metadata.name = name;
            instance.metadata.symbol = symbol;
            instance.metadata.decimals = decimal;` : '' }
            ${output.currentControlsState.find(x => x.name === 'Ownable').state ? `
            instance._init_with_owner(instance.env().caller());` : '' }
            assert!(instance._mint(instance.env().caller(), initial_supply).is_ok());
            instance`: 
            `ink_lang::codegen::initialize_contract(|instance: &mut ${output.currentControlsState.find(x => x.name === 'Name').state}| { ${output.currentControlsState.find(x => x.name === 'Capped').state ? `
                assert!(instance.init_cap(cap).is_ok());` : ''} ${output.currentControlsState.find(x => x.name === 'Metadata').state ? `
                instance.metadata.name = name;
                instance.metadata.symbol = symbol;
                instance.metadata.decimals = decimal;` : '' }
                instance
                    ._mint(instance.env().caller(), initial_supply)
                    .expect("Should mint");
                ${output.currentControlsState.find(x => x.name === 'Ownable').state ? `
                instance._init_with_owner(instance.env().caller());` : '' }
            })`
            }
        }  ${output.currentControlsState.find(x => x.name === 'Burnable').state ? `
            
        #[ink(message)] ${output.currentControlsState.find(x => x.name === 'Ownable').state ? `
        #[${brushName}::modifiers(only_owner)]` : ''}
        pub fn burn_from_many(&mut self, accounts: Vec<(AccountId, Balance)>) -> Result<(), PSP22Error> {
            for account in accounts.iter() {
                self.burn(account.0, account.1)?;
            }
            Ok(())
        }` : ''} ${output.currentControlsState.find(x => x.name === 'Mintable').state ? `
            
        #[ink(message)]${output.currentControlsState.find(x => x.name === 'Ownable').state ? `
        #[${brushName}::modifiers(only_owner)]` : ''}
        pub fn mint_to(&mut self, account: AccountId, amount: Balance) -> Result<(), PSP22Error>  {
            self.mint(account, amount)
        }` : ''} ${output.currentControlsState.find(x => x.name === 'Pausable').state ? `
        
        #[ink(message)]${output.currentControlsState.find(x => x.name === 'Ownable').state ? `
        #[${brushName}::modifiers(only_owner)]` : ''}
        pub fn change_state(&mut self) -> Result<(), PSP22Error>  {
            if self.paused() {
                self._unpause()
            } else {
                self._pause()
            }
        }` : ''} ${output.currentControlsState.find(x => x.name === 'Capped').state ? `
        
        /// Method to return token's cap
        #[ink(message)]
        pub fn cap(&self) -> Balance {
            self.cap
        }
        
        /// Overrides the \`_mint\` function to check for cap overflow before minting tokens
        /// Performs \`PSP22Internal::_mint\` after the check succeeds
        fn _mint(&mut self, account: AccountId, amount: Balance) -> Result<(), PSP22Error> {
            if (self.total_supply() + amount) > self.cap() {
                return Err(PSP22Error::Custom(String::from("Cap exceeded")))
            }
            PSP22Internal::_mint(self, account, amount)
        }

        /// Initializes the token's cap
        fn init_cap(&mut self, cap: Balance) -> Result<(), PSP22Error> {
            if cap <= 0 {
                return Err(PSP22Error::Custom(String::from("Cap must be above 0")))
            }
            self.cap = cap;
            Ok(())
        }` : ''}
    }
}`
        case 'psp1155':
            return `#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]

#[${brushName}::contract]
pub mod my_psp1155 {
    use ink_prelude::{
        string::String,
        vec,
    };${output.version != 'v1.3.0' ? `
    use ink_storage::traits::SpreadAllocate;` : ''}
    
    ${version == 'v1.3.0' ? 'use ink_storage::collections::HashMap as StorageHashMap;' : 'use ink_storage::Mapping;'}
    use ${brushName}::contracts::psp1155::*; ${output.currentControlsState.find(x => x.name === 'Metadata').state ? `
    use ${brushName}::contracts::psp1155::extensions::metadata::*;` : ''} ${output.currentControlsState.find(x => x.name === 'Burnable').state ? `
    use ${brushName}::contracts::psp1155::extensions::burnable::*;` : ''} ${output.currentControlsState.find(x => x.name === 'Mintable').state ? `
    use ${brushName}::contracts::psp1155::extensions::mintable::*;` : ''} ${output.currentControlsState.find(x => x.name === 'Ownable').state ? `
    use ${brushName}::contracts::ownable::*;` : ''}

    #[ink(storage)]
    #[derive(Default, ${
                output.version !== 'v1.3.0' ? 'SpreadAllocate, ' : ''}PSP1155Storage${
                output.currentControlsState.find(x => x.name === 'Metadata').state ? `, PSP1155MetadataStorage` : ``}${
                output.currentControlsState.find(x => x.name == 'Ownable').state ? `, OwnableStorage` : ''})]
    pub struct ${output.currentControlsState.find(x => x.name === 'Name').state} {
        #[PSP1155StorageField]
        psp1155: PSP1155Data,
        denied_ids: ${version == 'v1.3.0' ? `StorageHashMap<Id, ()>` : 'Mapping<Id, ()>'}, ${output.currentControlsState.find(x => x.name === 'Metadata').state ? `
        #[PSP1155MetadataStorageField]
        metadata: PSP1155MetadataData,` : ``} ${output.currentControlsState.find(x => x.name === 'Ownable').state ? `
        #[OwnableStorageField]
        ownable: OwnableData,` : ``}
    }
    
    impl PSP1155 for ${output.currentControlsState.find(x => x.name === 'Name').state} {} ${output.currentControlsState.find(x => x.name === 'Metadata').state ? `
    impl PSP1155Metadata for ${output.currentControlsState.find(x => x.name === 'Name').state} {}` : ''} ${output.currentControlsState.find(x => x.name === 'Burnable').state ? `
    impl PSP1155Burnable for ${output.currentControlsState.find(x => x.name === 'Name').state} {}` : ''} ${output.currentControlsState.find(x => x.name === 'Mintable').state ? `
    impl PSP1155Mintable for ${output.currentControlsState.find(x => x.name === 'Name').state} {}` : ''} ${output.currentControlsState.find(x => x.name === 'Ownable').state ? `
    impl Ownable for ${output.currentControlsState.find(x => x.name === 'Name').state} {}` : ''}
    
    impl ${output.currentControlsState.find(x => x.name === 'Name').state} {
        #[ink(constructor)]
        pub fn new(${output.currentControlsState.find(x => x.name === 'Metadata').state ? `uri: Option<String>` : ''}) -> Self {
            ${ version == 'v1.3.0' ? `${output.currentControlsState.find(x => x.name === 'Metadata').state ? `let mut instance = Self::default();
            instance.metadata.uri = uri;${output.currentControlsState.find(x => x.name === 'Ownable').state ? 
            `instance._init_with_owner(instance.env().caller());` : '' }
            instance` : `Self::default()` } ` :
                `ink_lang::codegen::initialize_contract(|instance: &mut Self| {${output.currentControlsState.find(x => x.name === 'Metadata').state ? `
                instance.metadata.uri = uri;` : ''} ${output.currentControlsState.find(x => x.name === 'Ownable').state ? `
                instance._init_with_owner(instance.env().caller());` : '' }
            })`
            }
        }

        #[ink(message)]
        pub fn deny(&mut self, id: Id) {
            self.denied_ids.insert(id, ${version == 'v1.3.0' ? '' : '&'}());
        } ${output.currentControlsState.find(x => x.name === 'Mintable').state ? `
        #[ink(message)]${output.currentControlsState.find(x => x.name == 'Ownable').state ? `
        #[${brushName}::modifiers(only_owner)]` : ''}
        pub fn mint_tokens(&mut self, id: Id, amount: Balance) -> Result<(), PSP1155Error> {
            if self.denied_ids.get(&id).is_some() {
                return Err(PSP1155Error::Custom(String::from("Id is denied")))
            }
            self._mint_to(Self::env().caller(), vec![(id, amount)])
        }` : ''}
    } 
}
`
        case 'psp34':
            return `#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]
                    
#[${brushName}::contract]
pub mod my_psp34 {
    use ink_prelude::string::String;${output.version != 'v1.3.0' ? `
    use ink_storage::traits::SpreadAllocate;` : ''}
    use ${brushName}::contracts::psp34::*; ${output.currentControlsState.find(x => x.name === 'Metadata').state ? `
    use ${brushName}::contracts::psp34::extensions::metadata::*;` : ''} ${output.currentControlsState.find(x => x.name === 'Burnable').state ? `
    use ${brushName}::contracts::psp34::extensions::burnable::*;` : ''} ${output.currentControlsState.find(x => x.name === 'Mintable').state ? `
    use ${brushName}::contracts::psp34::extensions::mintable::*;` : ''} ${output.currentControlsState.find(x => x.name === 'Ownable').state ? `
    use ${brushName}::contracts::ownable::*;` : ''}
    

    #[derive(Default, ${
                output.version !== 'v1.3.0' ? 'SpreadAllocate, ' : ''}PSP34Storage${output.currentControlsState.find(x => x.name === 'Metadata').state ? `, PSP34MetadataStorage` : ''}${
                output.currentControlsState.find(x => x.name == 'Ownable').state ? `, OwnableStorage` : ''})]
    #[ink(storage)]
    pub struct ${output.currentControlsState.find(x => x.name === 'Name').state}{
        #[PSP34StorageField]
        psp34: PSP34Data,
        next_id: u8, ${output.currentControlsState.find(x => x.name === 'Metadata').state ? `
        #[PSP34MetadataStorageField]
        metadata: PSP34MetadataData,` : ''} ${output.currentControlsState.find(x => x.name === 'Ownable').state ? `
        #[OwnableStorageField]
        ownable: OwnableData,` : ''}
    }

    impl PSP34 for ${output.currentControlsState.find(x => x.name === 'Name').state} {}${output.currentControlsState.find(x => x.name === 'Burnable').state ? `
    impl PSP34Burnable for ${output.currentControlsState.find(x => x.name === 'Name').state} {}` : ''} ${output.currentControlsState.find(x => x.name === 'Mintable').state ? `
    impl PSP34Mintable for ${output.currentControlsState.find(x => x.name === 'Name').state} {}` : ''} ${output.currentControlsState.find(x => x.name === 'Metadata').state ? `
    impl PSP34Metadata for ${output.currentControlsState.find(x => x.name === 'Name').state} {}
    impl PSP34Internal for ${output.currentControlsState.find(x => x.name === 'Name').state} {}` : ``} ${output.currentControlsState.find(x => x.name === 'Ownable').state ? `
    impl Ownable for ${output.currentControlsState.find(x => x.name === 'Name').state} {}` : ''}
    
    impl ${output.currentControlsState.find(x => x.name === 'Name').state} {
        #[ink(constructor)]
        pub fn new(id: Id) -> Self {
            ${version == '1.3.0' ? `${output.currentControlsState.find(x => x.name === 'Metadata').state ? `let mut instance = Self::default();
            instance._set_attribute(id.clone(), String::from("name").into_bytes(), String::from("${output.currentControlsState.find(x => x.name === 'Name').state}").into_bytes());
            instance._set_attribute(id, String::from("symbol").into_bytes(), String::from("${output.currentControlsState.find(x => x.name === 'Symbol').state}").into_bytes());${output.currentControlsState.find(x => x.name === 'Mintable').state ? `
            instance.mint_token();${output.currentControlsState.find(x => x.name === 'Ownable').state ? `
                instance._init_with_owner(instance.env().caller());` : '' }` : ''}
            instance` : `let mut instance = Self::default()${output.currentControlsState.find(x => x.name === 'Ownable').state ? `
                instance._init_with_owner(instance.env().caller());` : '' }
                instance`}` :
                `ink_lang::codegen::initialize_contract(|instance: &mut Self| {${output.currentControlsState.find(x => x.name === 'Metadata').state ? 
            `instance._set_attribute(id.clone(), String::from("name").into_bytes(), String::from("${output.currentControlsState.find(x => x.name === 'Name').state}").into_bytes());
                instance._set_attribute(id, String::from("symbol").into_bytes(), String::from("${output.currentControlsState.find(x => x.name === 'Symbol').state}").into_bytes());${output.currentControlsState.find(x => x.name === 'Mintable').state ? `
                instance.mint_token();` : ''}${output.currentControlsState.find(x => x.name === 'Ownable').state ? `
                instance._init_with_owner(instance.env().caller());` : `` }` : `${output.currentControlsState.find(x => x.name === 'Ownable').state ? `
                instance._init_with_owner(instance.env().caller());` : `` }`}
            })`
            }
        } ${output.currentControlsState.find(x => x.name === 'Mintable').state ? `
        /// Mint method which mints a token and updates the id of next token
        #[ink(message)]${output.currentControlsState.find(x => x.name == 'Ownable').state ? `
        #[${brushName}::modifiers(only_owner)]` : ''}
        pub fn mint_token(&mut self) -> Result<(), PSP34Error>{
            self.mint(Self::env().account_id(), Id::U8(self.next_id))?;
            self.next_id += 1;
            Ok(())
        }` : ''}
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
        case 'psp1155':
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

