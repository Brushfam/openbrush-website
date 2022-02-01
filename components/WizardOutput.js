import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import {useEffect, useState} from "react";
import wizardOutput from "./../styles/WizardOutput.module.scss";


const WizardOutput = ({data}) => {
    const [output, setOutPut] = useState(data)
    const [selectedTab, setSelectedTab] = useState('rust')

    useEffect(() => {
        setOutPut(data);
    }, [data, output])

    //Totally unreadable and unoptimized approach. TODO: Make three separate modules with placeholders, refactor
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
                            selectedTab === 'rust' ?
                             (<SyntaxHighlighter language="rust" wrapLongLines={true} style={vscDarkPlus}>
                                {`#![cfg_attr(not(feature = "std"), no_std)]
                                
#[brush::contract]
pub mod my_token { ${output.currentControlsState.find(x => x.name === 'Burnable').state ? `
    use ink_prelude::vec::Vec;` : ''} ${output.currentControlsState.find(x => x.name === 'Metadata').state ? `
    use ink_storage::Lazy;` : ''}
    use psp22::{
        traits::*, ${output.currentControlsState.find(x => x.name === 'Burnable').state ? `
        extensions::burnable::*,` : ''} ${output.currentControlsState.find(x => x.name === 'Mintable').state ? `
        extensions::mintable::*,` : ''}  
        }; ${output.currentControlsState.find(x => x.name === 'Ownable').state ? `
    use ownable::traits::*;
    use brush::modifiers;` : ``} 
    #[ink(storage)]
    #[derive(Default, PSP22Storage${output.currentControlsState.find(x => x.name === 'Metadata').state ? `, PSP22MetadataStorage` : ''} ${output.currentControlsState.find(x => x.name === 'Ownable').state ? `, OwnableStorage` : ``})]
    pub struct ${output.currentControlsState.find(x => x.name === 'Name').state} {
        #[PSP22StorageField]
        psp22: PSP22Data, ${output.currentControlsState.find(x => x.name === 'Metadata').state ? `
        #[PSP22MetadataStorageField]
        metadata: PSP22MetadataData,` : ''} ${output.currentControlsState.find(x => x.name === 'Ownable').state ? `
        #[OwnableStorageField]
        ownable: OwnableData,` : ``}
    }
        
    impl PSP22 for ${output.currentControlsState.find(x => x.name === 'Name').state} {} ${output.currentControlsState.find(x => x.name === 'Burnable').state ? `
    impl PSP22Burnable for ${output.currentControlsState.find(x => x.name === 'Name').state} {}` : ''} ${output.currentControlsState.find(x => x.name === 'Mintable').state ? `
    impl PSP22Mintable for ${output.currentControlsState.find(x => x.name === 'Name').state} {}` : ''} ${output.currentControlsState.find(x => x.name === 'Ownable').state ? `
    impl Ownable for ${output.currentControlsState.find(x => x.name === 'Name').state} {}` : ''}
        
    impl ${output.currentControlsState.find(x => x.name === 'Name').state} {
        #[ink(constructor)]
        pub fn new(decimal: u8) -> Self {
            let mut instance = Self::default(); ${output.currentControlsState.find(x => x.name === 'Metadata').state ? `
            Lazy::set(&mut instance.metadata.name, '${output.currentControlsState.find(x => x.name === 'Name').state}');
            Lazy::set(&mut instance.metadata.symbol, '${output.currentControlsState.find(x => x.name === 'Symbol').state}');
            Lazy::set(&mut instance.metadata.decimals, decimal); ${output.currentControlsState.find(x => x.name === 'Ownable').state ? `
            instance._init_with_owner(instance.env().caller());` : ''}` : ''}
            instance._mint(instance.env().caller(), ${output.currentControlsState.find(x => x.name === 'Premint').state});
            instance
        }  ${output.currentControlsState.find(x => x.name === 'Burnable').state ? `
            
        #[ink(message)]
        pub fn burn_from_many(&mut self, accounts: Vec<(AccountId, Balance)>) {
            for account in accounts.iter() {
                self.burn_from(account.0, account.1);
            }
        }` : ''} ${output.currentControlsState.find(x => x.name === 'Mintable').state ? `
            
        #[ink(message)] ${output.currentControlsState.find(x => x.name === 'Ownable').state ? `
        #[modifiers(only_owner)]` : ''}
        pub fn mint_to(&mut self, account: AccountId, amount: Balance) {
            self.mint(account, amount);
        }` : ''}
    }
}`}
                            </SyntaxHighlighter>) :
                             (<SyntaxHighlighter language="toml" wrapLongLines={true} style={vscDarkPlus}>
                                {`[package]
name = "my_token"
version = "1.0.0"
edition = "2018"

[dependencies]
ink_primitives = { tag = "v3.0.0-rc4", git = "https://github.com/Supercolony-net/ink", default-features = false }
ink_metadata = { tag = "v3.0.0-rc4", git = "https://github.com/Supercolony-net/ink", default-features = false, features = ["derive"], optional = true }
ink_env = { tag = "v3.0.0-rc4", git = "https://github.com/Supercolony-net/ink", default-features = false }
ink_storage = { tag = "v3.0.0-rc4", git = "https://github.com/Supercolony-net/ink", default-features = false }
ink_lang = { tag = "v3.0.0-rc4", git = "https://github.com/Supercolony-net/ink", default-features = false }
ink_prelude = { tag = "v3.0.0-rc4", git = "https://github.com/Supercolony-net/ink", default-features = false }

scale = { package = "parity-scale-codec", version = "2.1", default-features = false, features = ["derive"] }
scale-info = { version = "0.6.0", default-features = false, features = ["derive"], optional = true }

# These dependencies
psp22 = { path = "../../contracts/token/psp22", default-features = false } ${output.currentControlsState.find(x => x.name === 'Ownable').state ? `
ownable = { path = "../../contracts/access/ownable", default-features = false }` : ``}
brush = { path = "../../utils/brush", default-features = false }

[lib]
name = "my_psp22"
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

    # These dependencies
    "psp22/std",
    "brush/std",
]
ink-as-dependency = []`}
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
                            selectedTab === 'rust' ?
                                (<SyntaxHighlighter language="rust" wrapLongLines={true} style={vscDarkPlus}>
                                    {`#![cfg_attr(not(feature = "std"), no_std)]

#[brush::contract]
pub mod my_nft_token {
    use brush::{ ${output.currentControlsState.find(x => x.name === 'Ownable').state ? `
        modifiers,` : ``}
        traits::InkStorage,
    };
    use ink_storage::collections::HashMap as StorageHashMap; ${output.currentControlsState.find(x => x.name === 'Ownable').state ? `
    use ownable::traits::*;` : ``}
    use psp1155::{ ${output.currentControlsState.find(x => x.name === 'Burnable').state || output.currentControlsState.find(x => x.name === 'Mintable').state || output.currentControlsState.find(x => x.name === 'Metadata').state ? `
        extensions::{ ${output.currentControlsState.find(x => x.name === 'Burnable').state ? `
            burnable::*,` : ``} ${output.currentControlsState.find(x => x.name === 'Mintable').state ? `
            mintable::*,` : ``} ${output.currentControlsState.find(x => x.name === 'Metadata').state ? `
            metadata::*, ` : ``} 
        }, ` : ''}
        traits::*,
    };

    #[ink(storage)]
    #[derive(Default, PSP1155Storage${output.currentControlsState.find(x => x.name === 'Ownable').state ? `, OwnableStorage` : ``}${output.currentControlsState.find(x => x.name === 'Metadata').state ? `, PSP1155MetadataStorage` : ``})]
    pub struct ${output.currentControlsState.find(x => x.name === 'Name').state} {
        #[PSP1155StorageField]
        psp1155: PSP1155Data, ${output.currentControlsState.find(x => x.name === 'Ownable').state ? `
        #[OwnableStorageField]
        ownable: OwnableData,` : ``} ${output.currentControlsState.find(x => x.name === 'Metadata').state ? `
        #[PSP1155MetadataStorageField]
        metadata: PSP1155MetadataData,` : ``}  
        registered_ids: StorageHashMap<Id, bool>,    
    }
    ${output.currentControlsState.find(x => x.name === 'Metadata').state ? `
    impl PSP1155Metadata for MyPSP1155 {}` : ``} ${output.currentControlsState.find(x => x.name === 'Ownable').state ? `
    impl Ownable for ${output.currentControlsState.find(x => x.name === 'Name').state} {}` : ``}
    impl PSP1155 for ${output.currentControlsState.find(x => x.name === 'Name').state} {} ${output.currentControlsState.find(x => x.name === 'Burnable').state && output.currentControlsState.find(x => x.name === 'Ownable').state ? `
    
    impl PSP1155Burnable for ${output.currentControlsState.find(x => x.name === 'Name').state} {
        #[ink(message)] 
        #[modifiers(only_owner)]
        fn burn(&mut self, id: Id, amount: Balance) {
            self._burn(Self::env().caller(), id, amount);
        }
    }
    ` : output.currentControlsState.find(x => x.name === 'Burnable').state ? `
    impl PSP1155Burnable for ${output.currentControlsState.find(x => x.name === 'Name').state} {}` : ''} ${output.currentControlsState.find(x => x.name === 'Mintable').state && output.currentControlsState.find(x => x.name === 'Ownable').state ? `
    
    impl PSP1155Mintable for ${output.currentControlsState.find(x => x.name === 'Name').state} {
        #[ink(message)]
        #[modifiers(only_owner)]
        fn mint_to(&mut self, to: AccountId, id: Id, amount: Balance) {
            self._mint(to, id, amount);
        }
        #[ink(message)]
        #[modifiers(only_owner)]
        fn mint(&mut self, id: Id, amount: Balance) {
            self._mint(Self::env().caller(), id, amount);
        }
    }
    ` : output.currentControlsState.find(x => x.name === 'Mintable').state ? `
    impl PSP1155Mintable for ${output.currentControlsState.find(x => x.name === 'Name').state} {}` : ''}
    
    impl ${output.currentControlsState.find(x => x.name === 'Name').state} {
        #[ink(constructor)]
        pub fn new() -> Self {
            let mut instance = Self::default(); ${output.currentControlsState.find(x => x.name === 'Metadata').state ? `
            instance.metadata.uri = '${output.currentControlsState.find(x => x.name === 'URI')?.state}';` : ``} 
            instance
        }
        
        #[ink(message)]
        pub fn add_type(&mut self, id: Id) {
            self.registered_ids.insert(id, true);
        }
        ${output.currentControlsState.find(x => x.name === 'Mintable').state ? `
        #[ink(message)] ${output.currentControlsState.find(x => x.name === 'Ownable').state ? `
        #[modifiers(only_owner)]` : ``}
        pub fn mint_tokens(&mut self, id: Id, amount: Balance) {
            assert!(*self.registered_ids.get(&id).unwrap_or(&false));
            self.mint(id, amount);
        }` : ''}
    } 
}
`}
                                </SyntaxHighlighter>) :
                                (<SyntaxHighlighter language="toml" wrapLongLines={true} style={vscDarkPlus}>
                                    {`[package]
name = "my_nft_token"
version = "1.0.0"
edition = "2018"

[dependencies]
ink_primitives = { tag = "v3.0.0-rc4", git = "https://github.com/Supercolony-net/ink", default-features = false }
ink_metadata = { tag = "v3.0.0-rc4", git = "https://github.com/Supercolony-net/ink", default-features = false, features = ["derive"], optional = true }
ink_env = { tag = "v3.0.0-rc4", git = "https://github.com/Supercolony-net/ink", default-features = false }
ink_storage = { tag = "v3.0.0-rc4", git = "https://github.com/Supercolony-net/ink", default-features = false }
ink_lang = { tag = "v3.0.0-rc4", git = "https://github.com/Supercolony-net/ink", default-features = false }
ink_prelude = { tag = "v3.0.0-rc4", git = "https://github.com/Supercolony-net/ink", default-features = false }

scale = { package = "parity-scale-codec", version = "2.1", default-features = false, features = ["derive"] }
scale-info = { version = "0.6.0", default-features = false, features = ["derive"], optional = true }

# These dependencies
psp1155 = { path = "../../contracts/token/psp1155", default-features = false } ${output.currentControlsState.find(x => x.name === 'Ownable').state ? `
ownable = { path = "../../contracts/access/ownable", default-features = false }` : ``}
brush = { path = "../../utils/brush", default-features = false }

[lib]
name = "my_psp1155"
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

    # These dependencies
    "psp1155/std",
    "brush/std",
]
ink-as-dependency = []`}
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
                            selectedTab === 'rust' ?
                                (<SyntaxHighlighter language='rust' wrapLongLines={true} style={vscDarkPlus}>
                                        {`#![cfg_attr(not(feature = "std"), no_std)]
                    
#[brush::contract]
pub mod my_nft_token {
    use ink_prelude::{
        string::String,
        vec::Vec,
    };
    use psp34::{ ${output.currentControlsState.find(x => x.name === 'Burnable').state || output.currentControlsState.find(x => x.name === 'Mintable').state || output.currentControlsState.find(x => x.name === 'Metadata').state ? `
        extensions::{${output.currentControlsState.find(x => x.name === 'Burnable').state ? `
            burnable::*,` : ''}${output.currentControlsState.find(x => x.name === 'Mintable').state ? `
            mintable::*,` : ''} ${output.currentControlsState.find(x => x.name === 'Metadata').state ? `
            metadata::*,` : ''}
        }, ` : '' }
        traits::*,
    }; ${output.currentControlsState.find(x => x.name === 'Ownable').state ? `
    use ownable::traits::*;` : ``}

    #[derive(Default, PSP34Storage${output.currentControlsState.find(x => x.name === 'Metadata').state ? `, PSP34MetadataStorage` : ''}${output.currentControlsState.find(x => x.name === 'Ownable').state ? `, OwnableStorage` : ``})]
    #[ink(storage)]
    pub struct ${output.currentControlsState.find(x => x.name === 'Name').state}{
        #[PSP34StorageField]
        psp34: PSP34Data, ${output.currentControlsState.find(x => x.name === 'Metadata').state ? `
        #[PSP34MetadataStorageField]
        metadata: PSP34MetadataData,` : ''} ${output.currentControlsState.find(x => x.name === 'Ownable').state ? `
        #[OwnableStorageField]
        ownable: OwnableData,` : ``}
        next_id: u8,
    }

    impl PSP34 for ${output.currentControlsState.find(x => x.name === 'Name').state} {}${output.currentControlsState.find(x => x.name === 'Burnable').state ? `
    impl PSP34Burnable for ${output.currentControlsState.find(x => x.name === 'Name').state} {}` : ''} ${output.currentControlsState.find(x => x.name === 'Mintable').state ? `
    impl PSP34Mintable for ${output.currentControlsState.find(x => x.name === 'Name').state} {}` : ''} ${output.currentControlsState.find(x => x.name === 'Ownable').state ? `
    impl Ownable for ${output.currentControlsState.find(x => x.name === 'Name').state} {}` : ``} ${output.currentControlsState.find(x => x.name === 'Metadata').state ? `
    impl PSP34Metadata for ${output.currentControlsState.find(x => x.name === 'Name').state} {}` : ``}

    impl ${output.currentControlsState.find(x => x.name === 'Name').state} {
        /// A constructor which mints the first token to the owner
        #[ink(constructor)]
        pub fn new(id: Id) -> Self {
            let mut instance = Self::default(); ${output.currentControlsState.find(x => x.name === 'Metadata').state ? `
            instance._set_attribute(id.clone(), String::from("name").into_bytes(), String::from("${output.currentControlsState.find(x => x.name === 'Name').state}").into_bytes());
            instance._set_attribute(id, String::from("symbol").into_bytes(), String::from("${output.currentControlsState.find(x => x.name === 'Symbol').state}").into_bytes()); ` : ''}  ${output.currentControlsState.find(x => x.name === 'Mintable').state ? `
            instance.mint_token();` : `
            instance._mint([instance.next_id; 32]);
            instance.next_id += 1;`}
            instance
        }
        ${output.currentControlsState.find(x => x.name === 'Mintable').state ? `
        /// Mint method which mints a token and updates the id of next token
        #[ink(message)]
        pub fn mint_token(&mut self) {
            self.mint([self.next_id; 32]);
            self.next_id += 1;
        }` : ''}
    }
}`}
                                    </SyntaxHighlighter>) :
                                (<SyntaxHighlighter language="toml" wrapLongLines={true} style={vscDarkPlus}>
                                    {`[package]
name = "my_nft_token"
version = "1.0.0"
edition = "2018"

[dependencies]
ink_primitives = { tag = "v3.0.0-rc4", git = "https://github.com/Supercolony-net/ink", default-features = false }
ink_metadata = { tag = "v3.0.0-rc4", git = "https://github.com/Supercolony-net/ink", default-features = false, features = ["derive"], optional = true }
ink_env = { tag = "v3.0.0-rc4", git = "https://github.com/Supercolony-net/ink", default-features = false }
ink_storage = { tag = "v3.0.0-rc4", git = "https://github.com/Supercolony-net/ink", default-features = false }
ink_lang = { tag = "v3.0.0-rc4", git = "https://github.com/Supercolony-net/ink", default-features = false }
ink_prelude = { tag = "v3.0.0-rc4", git = "https://github.com/Supercolony-net/ink", default-features = false }

scale = { package = "parity-scale-codec", version = "2.1", default-features = false, features = ["derive"] }
scale-info = { version = "0.6.0", default-features = false, features = ["derive"], optional = true }

# These dependencies
psp34 = { path = "../../contracts/token/psp34", default-features = false } ${output.currentControlsState.find(x => x.name === 'Ownable').state ? `
ownable = { path = "../../contracts/access/ownable", default-features = false }` : ``}
brush = { path = "../../utils/brush", default-features = false }

[lib]
name = "my_psp34"
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

    # These dependencies
    "psp34/std",
    "brush/std",
]
ink-as-dependency = []`}
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

