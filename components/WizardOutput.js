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
                versionInfoElement.brushDeclaration(`"psp22"${
                    output.currentControlsState.find(x => x.name === 'Pausable').state ? `, "pausable"` : ''}${
                    output.security == "ownable" ? `, "ownable"` : ''}${
                    output.security == "access_control" ? `, "access_control"` : ''}`)
            );
        case 'psp1155':
            return generateCargoTomlWithVersion(
                version,
                "my_" + output.type,
                versionInfoElement.edition,
                versionInfoElement.inkVersion,
                versionInfoElement.scaleVersion,
                versionInfoElement.scaleInfoVersion,
                versionInfoElement.brushDeclaration(`"psp1155"${output.security == "ownable" ? `, "ownable"` : ''}${output.security == "access_control" ? `, "access_control"` : ''}`)
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
export const generateLib = (output, version='v2.0.0') => {
    const brushName = version >= 'v2.0.0' ? 'openbrush' : 'brush';
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
                version !== 'v1.3.0' ? 'SpreadAllocate, ' : ''}PSP22Storage${
                isMetadata ? `, PSP22MetadataStorage` : ''}${
                isWrapper ? `, PSP22WrapperStorage` : ''}${
                isPausable ? `, PausableStorage` : ''}${
                isOwnable ? `, OwnableStorage` : ''}${
                isAccessControl ? `, AccessControlStorage` : ''})]
    pub struct ${name} {
        #[PSP22StorageField]
        psp22: PSP22Data, ${isOwnable ? `
        #[OwnableStorageField]
        ownable: OwnableData,` : ''} ${isMetadata ? `
        #[PSP22MetadataStorageField]
        metadata: PSP22MetadataData,` : ''} ${isWrapper ? `
        #[PSP22WrapperStorageField]
        wrapper: PSP22WrapperData,` : ''} ${isPausable ? `
        #[PausableStorageField]
        pause: PausableData,` : ''} ${isCapped ? `
        cap: Balance,`: ''} ${isAccessControl ? `
        #[AccessControlStorageField]
        access_control: AccessControlData,` : ''}
    }${isAccessControl ? `
    
    // You can add more roles for different purposes
    const MANAGER: RoleType = ink_lang::selector_id!("MANAGER");
    ` : ''}

    // Section contains default implementation without any modifications
    impl PSP22 for ${name} {} ${isMetadata ? `
    impl PSP22Metadata for ${name} {}` : ''} ${isWrapper ? `
    impl PSP22Wrapper for ${name} {}` : ''} ${isFlashMintable ? `
    impl FlashLender for ${name} {}` : ''} ${isPausable ? `
    impl Pausable for ${name} {}` : ''} ${isOwnable ? `
    impl Ownable for ${name} {}` : ''} ${isAccessControl ? `
    impl AccessControl for ${name} {}` : ''} ${isAccessControl || isOwnable ? `
    
    // Section contains modified methods with additional functionality.` : ''} ${isBurnable ? `
    impl PSP22Burnable for ${name} {${isAccessControl || isOwnable ? `
        /// override the \`burn\` function to add the access modifier
        #[ink(message)]
        #[${brushName}::modifiers(${isOwnable ? 'only_owner' : 'only_role(MANAGER)'})]
        fn burn(&mut self, account: AccountId, amount: Balance) -> Result<(), PSP22Error> {
            self._burn_from(account, amount)
        }
    }` : '}'}` : ''} ${isMintable ? `
    impl PSP22Mintable for ${name} {${isAccessControl || isOwnable ? `
        /// override the \`mint\` function to add the access modifier
        #[ink(message)]
        #[${brushName}::modifiers(${isOwnable ? 'only_owner' : 'only_role(MANAGER)'})]
        fn mint(&mut self, account: AccountId, amount: Balance) -> Result<(), PSP22Error> {
            self._mint(account, amount)
        }
    }` : '}'}` : ''} ${isCapped || isPausable ? `
    
    impl ${version <= 'v1.5.0'? 'PSP22Internal' : 'PSP22Transfer'} for ${name} {${isPausable ? `
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
        
    impl ${name} {
        #[ink(constructor)]
        pub fn new(initial_supply: Balance${isMetadata ? `, name: Option<String>, symbol: Option<String>, decimal: u8` : ''}${isCapped ? `, cap: Balance` : ''}) -> Self {
            ${version == 'v1.3.0' ? `let mut _instance = Self::default(); ${isCapped ? `
            assert!(_instance._init_cap(cap).is_ok());` : ''} ${isMetadata ? `
            _instance.metadata.name = name;
            _instance.metadata.symbol = symbol;
            _instance.metadata.decimals = decimal;` : '' }
            ${isOwnable ? `
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
                    .expect("Should mint");
                ${isOwnable ? `
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
        case 'psp1155':
            return `#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]

#[${brushName}::contract]
pub mod my_psp1155 {
    // Imports from ink! ${isMetadata ? `
    use ink_prelude::string::String;` : ''} ${(isBurnable || isMintable) && (isOwnable || isAccessControl) ? `
    use ink_prelude::vec::Vec;` : ''} ${version != 'v1.3.0' ? `
    use ink_storage::traits::SpreadAllocate;` : ''}
    
    // Imports from ${brushName}
    use ${brushName}::contracts::psp1155::*; ${isMetadata ? `
    use ${brushName}::contracts::psp1155::extensions::metadata::*;` : ''} ${isBurnable ? `
    use ${brushName}::contracts::psp1155::extensions::burnable::*;` : ''} ${isMintable ? `
    use ${brushName}::contracts::psp1155::extensions::mintable::*;` : ''} ${isOwnable ? `
    use ${brushName}::contracts::ownable::*;` : ''} ${isAccessControl ? `
    use ${brushName}::contracts::access_control::*;` : ''}

    #[ink(storage)]
    #[derive(Default, ${
                version !== 'v1.3.0' ? 'SpreadAllocate, ' : ''}PSP1155Storage${
                isMetadata ? `, PSP1155MetadataStorage` : ``}${
                isOwnable ? `, OwnableStorage` : ''}${
                isAccessControl ? `, AccessControlStorage` : ''})]
    pub struct ${name} {
        #[PSP1155StorageField]
        psp1155: PSP1155Data, ${isMetadata ? `
        #[PSP1155MetadataStorageField]
        metadata: PSP1155MetadataData,` : ``} ${isOwnable ? `
        #[OwnableStorageField]
        ownable: OwnableData,` : ``} ${isAccessControl ? `
        #[AccessControlStorageField]
        access_control: AccessControlData,` : ''}
    }${isAccessControl ? `
    
    const MANAGER: RoleType = ink_lang::selector_id!("MANAGER");
    ` : ''}
    
    // Section contains default implementation without any modifications
    impl PSP1155 for ${name} {} ${isMetadata ? `
    impl PSP1155Metadata for ${name} {}` : ''} ${isOwnable ? `
    impl Ownable for ${name} {}` : ''} ${isAccessControl ? `
    impl AccessControl for ${name} {}` : ''} ${isAccessControl || isOwnable ? `
    
    // Section contains modified methods with additional functionality.` : ''} ${isBurnable ? `
    impl PSP1155Burnable for ${name} {${isAccessControl || isOwnable ? `
        /// override the \`burn\` function to add the access modifier
        #[ink(message)]
        #[${brushName}::modifiers(${isOwnable ? 'only_owner' : 'only_role(MANAGER)'})]
        fn burn(&mut self, from: AccountId, ids_amounts: Vec<(Id, Balance)>) -> Result<(), PSP1155Error> {
            self._burn_from(from, ids_amounts)
        }
    }` : '}'}` : ''} ${isMintable ? `
    impl PSP1155Mintable for ${name} {${isAccessControl || isOwnable ? `
        /// override the \`mint\` function to add the access modifier
        #[ink(message)]
        #[${brushName}::modifiers(${isOwnable ? 'only_owner' : 'only_role(MANAGER)'})]
        fn mint(&mut self, to: AccountId, ids_amounts: Vec<(Id, Balance)>) -> Result<(), PSP1155Error> {
            self._mint_to(to, ids_amounts)
        }
    }` : '}'}` : ''}
    
    impl ${name} {
        #[ink(constructor)]
        pub fn new(${isMetadata ? `uri: Option<String>` : ''}) -> Self {
            ${ version == 'v1.3.0' ? `${isMetadata ? `let mut _instance = Self::default();
            _instance.metadata.uri = uri;${isOwnable ? 
            `_instance._init_with_owner(_instance.env().caller());` : '' }${isAccessControl ? `
            _instance._init_with_admin(_instance.env().caller()); 
            _instance.grant_role(MANAGER, _instance.env().caller()).expect("Should grant MANAGER role");` : ''}
            _instance` : `Self::default()` } ` :
                `ink_lang::codegen::initialize_contract(|_instance: &mut Self| {${isMetadata ? `
                _instance.metadata.uri = uri;` : ''} ${isOwnable ? `
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
                version !== 'v1.3.0' ? 'SpreadAllocate, ' : ''}PSP34Storage${
                isMetadata ? `, PSP34MetadataStorage` : ''}${
                isEnumerable ? `, PSP34EnumerableStorage` : ''}${
                isOwnable ? `, OwnableStorage` : ''}${
                isAccessControl ? `, AccessControlStorage` : ''})]
    #[ink(storage)]
    pub struct ${name}{
        #[PSP34StorageField]
        psp34: PSP34Data, ${isMetadata ? `
        #[PSP34MetadataStorageField]
        metadata: PSP34MetadataData,` : ''} ${isEnumerable ? `
        #[PSP34EnumerableStorageField]
        enumerable: PSP34EnumerableData,` : ``} ${isOwnable ? `
        #[OwnableStorageField]
        ownable: OwnableData,` : ''} ${isAccessControl ? `
        #[AccessControlStorageField]
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
    impl PSP34Burnable for ${name} {${isAccessControl || isOwnable ? `
        /// override the \`burn\` function to add the access modifier
        #[ink(message)]
        #[${brushName}::modifiers(${isOwnable ? 'only_owner' : 'only_role(MANAGER)'})]
        fn burn(&mut self, account: AccountId, id: Id) -> Result<(), PSP34Error> {
        self._burn_from(account, id)
        }
    }` : '}'}` : ''} ${isMintable ? `
    impl PSP34Mintable for ${name} {${isAccessControl || isOwnable ? `
        /// override the \`mint\` function to add the access modifier
        #[ink(message)]
        #[${brushName}::modifiers(${isOwnable ? 'only_owner' : 'only_role(MANAGER)'})]
        fn mint(&mut self, account: AccountId, id: Id) -> Result<(), PSP34Error> {
            self._mint_to(account, id)
        }
    }` : '}'}` : ''}
    
    impl ${name} {
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

