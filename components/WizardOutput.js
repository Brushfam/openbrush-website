import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import {useEffect, useState} from "react";

const WizardOutput = ({data}) => {
    const [output, setOutPut] = useState(data)

    useEffect(() => {
        setOutPut(data);
    }, [data, output])

    //Totally unreadable.
    if (output)
     switch (output.type) {
        case 'psp22':
            return (
                <>
                <SyntaxHighlighter language="rust" wrapLongLines={true} style={vscDarkPlus}>
                    {`
#![cfg_attr(not(feature = "std"), no_std)]
#[brush::contract]
pub mod my_psp22 {
    use ink_prelude::{
        string::String,
        vec::Vec,
    }; ${output.currentControlsState.find(x => x.name === 'Metadata').state ? `
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
    
    impl PSP22 for ${output.currentControlsState.find(x => x.name === 'Name').state} {} ${output.currentControlsState.find(x => x.name === 'Metadata').state ? `
    impl PSP22Metadata for ${output.currentControlsState.find(x => x.name === 'Name').state} {}` : ''} ${output.currentControlsState.find(x => x.name === 'Burnable').state ? `
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
}
`}
                </SyntaxHighlighter>
                </>
            )        
        case 'psp1155':
            return (<>
                <SyntaxHighlighter language="rust" wrapLongLines={true} style={vscDarkPlus}>
                    {`#![cfg_attr(not(feature = "std"), no_std)]

#[brush::contract]
pub mod my_psp1155 {
    use brush::{ ${output.currentControlsState.find(x => x.name === 'Ownable').state ? `
        modifiers,` : ``}
        traits::InkStorage,
    };
    use ink_prelude::vec::Vec; ${output.currentControlsState.find(x => x.name === 'Ownable').state ? `
    use ownable::traits::*;` : ``}
    use psp1155::{
        extensions::{ ${output.currentControlsState.find(x => x.name === 'Burnable').state ? `
            burnable::*,` : ``} ${output.currentControlsState.find(x => x.name === 'Mintable').state ? `
            mintable::*,` : ``} ${output.currentControlsState.find(x => x.name === 'Metadata').state ? `
            metadata::*, ` : ``} 
        },
        traits::*,
    };

    #[ink(storage)]
    #[derive(Default, PSP1155Storage${output.currentControlsState.find(x => x.name === 'Ownable').state ? `, OwnableStorage` : ``})]
    pub struct ${output.currentControlsState.find(x => x.name === 'Name').state} {
        #[PSP1155StorageField]
        psp1155: PSP1155Data, ${output.currentControlsState.find(x => x.name === 'Ownable').state ? `
        #[OwnableStorageField]
        ownable: OwnableData,` : ``}
    }

    impl ${output.currentControlsState.find(x => x.name === 'Name').state} {
        #[ink(constructor)]
        pub fn new() -> Self {
            let mut instance = Self::default(); ${output.currentControlsState.find(x => x.name === 'Ownable').state ? `
            let caller = instance.env().caller();
            instance._init_with_owner(caller);` : ``}
            instance
        }
    } 
    ${output.currentControlsState.find(x => x.name === 'Ownable').state ? `
    impl Ownable for ${output.currentControlsState.find(x => x.name === 'Name').state} {}` : ``}

    impl PSP1155 for ${output.currentControlsState.find(x => x.name === 'Name').state} {}
    ${output.currentControlsState.find(x => x.name === 'Mintable').state ? `
    impl PSP1155Mintable for ${output.currentControlsState.find(x => x.name === 'Name').state} {
        #[ink(message)] ${output.currentControlsState.find(x => x.name === 'Ownable').state ? `
        #[modifiers(only_owner)]` : ``}
        fn mint_to(&mut self, to: AccountId, id: Id, amount: Balance) {
            self._mint(to, id, amount);
        }

        #[ink(message)] ${output.currentControlsState.find(x => x.name === 'Ownable').state ? `
        #[modifiers(only_owner)]` : ``}
        fn mint(&mut self, id: Id, amount: Balance) {
            self._mint(Self::env().caller(), id, amount);
        }
    }` : ``} ${output.currentControlsState.find(x => x.name === 'Burnable').state ? `
    impl PSP1155Burnable for ${output.currentControlsState.find(x => x.name === 'Name').state} {
        #[ink(message)] ${output.currentControlsState.find(x => x.name === 'Ownable').state ? `
        #[modifiers(only_owner)]` : ``}
        fn burn(&mut self, id: Id, amount: Balance) {
            self._burn(Self::env().caller(), id, amount);
        }
    }` : ``}
}
`}
                </SyntaxHighlighter>
                </>)
        case 'psp721':
            return (<>
                <SyntaxHighlighter language='rust' wrapLongLines={true} style={vscDarkPlus}>
                    {`#![cfg_attr(not(feature = "std"), no_std)]

#[brush::contract]
pub mod my_psp721 {
    use ink_prelude::{
        string::String,
        vec::Vec,
    };
    use psp721::{
        extensions::{${output.currentControlsState.find(x => x.name === 'Burnable').state ? `
            burnable::*,` : ''}${output.currentControlsState.find(x => x.name === 'Mintable').state ? `
            mintable::*,` : ''}
            metadata::*,
        },
        traits::*,
    };

    #[derive(Default, PSP721Storage, PSP721MetadataStorage)]
    #[ink(storage)]
    pub struct ${output.currentControlsState.find(x => x.name === 'Name').state}{
        #[PSP721StorageField]
        psp721: PSP721Data,
        #[PSP721MetadataStorageField]
        metadata: PSP721MetadataData,
        next_id: u8,
    }

    impl PSP721 for ${output.currentControlsState.find(x => x.name === 'Name').state} {}${output.currentControlsState.find(x => x.name === 'Burnable').state ? `
    impl PSP721Burnable for ${output.currentControlsState.find(x => x.name === 'Name').state} {}` : ''} ${output.currentControlsState.find(x => x.name === 'Mintable').state ? `
    impl PSP721Mintable for ${output.currentControlsState.find(x => x.name === 'Name').state} {}` : ''}
    impl PSP721Metadata for ${output.currentControlsState.find(x => x.name === 'Name').state} {}

    impl ${output.currentControlsState.find(x => x.name === 'Name').state} {
        /// A constructor which mints the first token to the owner
        #[ink(constructor)]
        pub fn new() -> Self {
            let mut instance = Self::default();
            instance.metadata.name = '${output.currentControlsState.find(x => x.name === 'Name').state}';
            instance.metadata.symbol = '${output.currentControlsState.find(x => x.name === 'Symbol').state}'; ${output.currentControlsState.find(x => x.name === 'Mintable').state ? `
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
                </SyntaxHighlighter>
            </>)
        default:
          return (<></>)
    }
    return (<></>)
    

}

export default WizardOutput;

