(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{6570:function(t,n,e){"use strict";e.r(n),e.d(n,{default:function(){return j}});var a=e(5893),r=e(9008),o=e(2833),s=e.n(o),i=function(t){var n=t.title;t.illustration;return(0,a.jsxs)("div",{className:s().bannerContainer,children:[(0,a.jsx)("div",{className:s().bannerInnerContentHolder,children:(0,a.jsx)("div",{children:(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{className:s().headlineBlock,children:(0,a.jsx)("h1",{children:n})}),(0,a.jsxs)("div",{className:s().illustrationConstructor,children:[(0,a.jsxs)("div",{className:s().illustrationContainer,children:[(0,a.jsx)("img",{src:"/img/ink.svg",alt:"ink"}),(0,a.jsx)("span",{className:s().ink,children:"ink!"})]}),(0,a.jsx)("img",{src:"/img/plus.svg",alt:"plus"}),(0,a.jsxs)("div",{className:s().illustrationContainer,children:[(0,a.jsx)("img",{src:"/img/brush.svg",alt:"brush"}),(0,a.jsx)("span",{className:s().openbrush,children:"OpenBrush"})]}),(0,a.jsx)("img",{src:"/img/equals.svg",alt:"equals"}),(0,a.jsxs)("div",{className:s().illustrationContainer,children:[(0,a.jsx)("img",{src:"/img/contract.svg",alt:"ink"}),(0,a.jsx)("span",{className:s().contracts,children:"Smart Contracts"})]})]})]})})}),(0,a.jsxs)("div",{className:s().bannerContainerDecorWrapper,children:[(0,a.jsx)("div",{className:s().leftBottom}),(0,a.jsx)("div",{className:s().rightBottom,children:(0,a.jsx)("div",{})})]})]})},c=e(8073),l=e.n(c),u=e(1664),d=function(t){var n=t.title,e=t.data;return(0,a.jsxs)("div",{className:l().partnersContainer,children:[(0,a.jsx)("h2",{className:"primaryHeadline",children:n}),(0,a.jsx)("div",{className:l().logoWrapper,children:e&&e.map((function(t,n){return(0,a.jsx)(u.default,{href:t.link,children:(0,a.jsx)("a",{children:(0,a.jsx)("img",{src:t.src,alt:t.alt},n)})},n.toString())}))}),(0,a.jsx)("div",{className:l().partnersContainerDecor})]})},f=e(7294),m=e(5660),p=e.n(m),h=[{alt:"logo",src:"/img/partners/logo9.svg",link:"https://www.protocolventures.com/"},{alt:"logo",src:"/img/partners/logo8.svg",link:"https://www.zokyo.io/"},{alt:"logo",src:"/img/partners/logo10.svg",link:"https://gbv.capital/"},{alt:"logo",src:"/img/partners/logo4.svg",link:"https://impossible.finance/"},{alt:"logo",src:"/img/partners/logo6.svg",link:"https://applicature.com/"},{alt:"logo",src:"/img/partners/logo7.svg",link:"https://moonbeam.network/"},{alt:"logo",src:"/img/partners/Frame13.svg",link:"https://www.sinoglobalcapital.com/"},{alt:"logo",src:"/img/partners/logo3.svg",link:"https://exnetworkcapital.com/"},{alt:"logo",src:"/img/partners/Frame1.svg",link:"https://sheesha.finance/"},{alt:"logo",src:"/img/partners/Frame16.svg",link:"https://patract.io/"}],S=e(3143),b=e(7246),g=e.n(b),_=[{name:"psp22",controls:[{sectionName:"Constructor",optionList:[{name:"Name",type:"text",initState:"MyPSP22",tooltip:""},{name:"Symbol",type:"text",initState:"MPSP",tooltip:""},{name:"Premint",type:"text",initState:"100",tooltip:""}]},{sectionName:"Extensions",optionList:[{name:"Metadata",type:"checkbox",initState:!1,tooltip:"Metadata for [`PSP22`] "},{name:"Burnable",type:"checkbox",initState:!1,tooltip:"Extension of [`PSP22`] that allows token holders to destroy both their own tokens and those that they have an allowance for."},{name:"Mintable",type:"checkbox",initState:!1,tooltip:"Extension of [`PSP22`] that allows create `amount` tokens and assigns them to `account`, increasing the total supply"},{name:"Ownable",type:"checkbox",initState:!1,tooltip:"Contract module which provides a basic access control mechanism, where there is an account (an owner) that can be granted exclusive access to specific functions."}]}]},{name:"psp1155",controls:[{sectionName:"Constructor",optionList:[{name:"Name",type:"text",initState:"MyPSP1155",tooltip:""},{name:"URI",type:"text",initState:"https://...",tooltip:""}]},{sectionName:"Extensions",optionList:[{name:"Metadata",type:"checkbox",initState:!1,tooltip:"Metadata for [`PSP1155`]"},{name:"Burnable",type:"checkbox",initState:!1,tooltip:"Extension of [`PSP1155`] that allows token holders to destroy their tokens"},{name:"Mintable",type:"checkbox",initState:!1,tooltip:"Extension of [`PSP1155`] that allows minting of new tokens"},{name:"Ownable",type:"checkbox",initState:!1,tooltip:"Contract module which provides a basic access control mechanism, where there is an account (an owner) that can be granted exclusive access to specific functions."}]}]},{name:"psp721",controls:[{sectionName:"Constructor",optionList:[{name:"Name",type:"text",initState:"MyPSP721",tooltip:""},{name:"Symbol",type:"text",initState:"MPSP",tooltip:""}]},{sectionName:"Extensions",optionList:[{name:"Metadata",type:"checkbox",initState:!1,tooltip:"Metadata for [`PSP721`]"},{name:"Burnable",type:"checkbox",initState:!1,tooltip:"Extension of [`PSP721`] that allows token holders to destroy their tokens"},{name:"Mintable",type:"checkbox",initState:!1,tooltip:"Extension of [`PSP721`] that exposes the mint function"},{name:"Ownable",type:"checkbox",initState:!1,tooltip:"Extension of [`PSP721`] that exposes the mint function"}]}]}],k=e(3961),v=e(4283),C=e(5345),x=e.n(C),w=function(t){var n,e=t.data,r=(0,f.useState)(e),o=r[0],s=r[1],i=(0,f.useState)("rust"),c=i[0],l=i[1];if((0,f.useEffect)((function(){s(e)}),[e,o]),o)switch(o.type){case"psp22":return(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{className:x().tabsSwitch,children:[(0,a.jsx)("div",{onClick:function(){return l("rust")},className:"rust"===c?x().activeTab:"",children:"lib.rs"}),(0,a.jsx)("div",{onClick:function(){return l("toml")},className:"toml"===c?x().activeTab:"",children:"Cargo.toml"})]}),(0,a.jsx)("div",{className:x().mainContent,children:"rust"===c?(0,a.jsx)(k.Z,{language:"rust",wrapLongLines:!0,style:v.YC,children:'\n    #![cfg_attr(not(feature = "std"), no_std)]\n    #[brush::contract]\n    pub mod my_token { '.concat(o.currentControlsState.find((function(t){return"Burnable"===t.name})).state?"\n        use ink_prelude::vec::Vec;":""," ").concat(o.currentControlsState.find((function(t){return"Metadata"===t.name})).state?"\n        use ink_storage::Lazy;":"","\n        use psp22::{\n            traits::*, ").concat(o.currentControlsState.find((function(t){return"Burnable"===t.name})).state?"\n            extensions::burnable::*,":""," ").concat(o.currentControlsState.find((function(t){return"Mintable"===t.name})).state?"\n            extensions::mintable::*,":""," \n        }; ").concat(o.currentControlsState.find((function(t){return"Ownable"===t.name})).state?"\n        use ownable::traits::*;\n        use brush::modifiers;":"","\n    \n        #[ink(storage)]\n        #[derive(Default, PSP22Storage").concat(o.currentControlsState.find((function(t){return"Metadata"===t.name})).state?", PSP22MetadataStorage":""," ").concat(o.currentControlsState.find((function(t){return"Ownable"===t.name})).state?", OwnableStorage":"",")]\n        pub struct ").concat(o.currentControlsState.find((function(t){return"Name"===t.name})).state," {\n            #[PSP22StorageField]\n            psp22: PSP22Data, ").concat(o.currentControlsState.find((function(t){return"Metadata"===t.name})).state?"\n            #[PSP22MetadataStorageField]\n            metadata: PSP22MetadataData,":""," ").concat(o.currentControlsState.find((function(t){return"Ownable"===t.name})).state?"\n            #[OwnableStorageField]\n            ownable: OwnableData,":"","\n        }\n        \n        impl PSP22 for ").concat(o.currentControlsState.find((function(t){return"Name"===t.name})).state," {} ").concat(o.currentControlsState.find((function(t){return"Burnable"===t.name})).state?"\n        impl PSP22Burnable for ".concat(o.currentControlsState.find((function(t){return"Name"===t.name})).state," {}"):""," ").concat(o.currentControlsState.find((function(t){return"Mintable"===t.name})).state?"\n        impl PSP22Mintable for ".concat(o.currentControlsState.find((function(t){return"Name"===t.name})).state," {}"):""," ").concat(o.currentControlsState.find((function(t){return"Ownable"===t.name})).state?"\n        impl Ownable for ".concat(o.currentControlsState.find((function(t){return"Name"===t.name})).state," {}"):"","\n        \n        impl ").concat(o.currentControlsState.find((function(t){return"Name"===t.name})).state," {\n            #[ink(constructor)]\n            pub fn new(decimal: u8) -> Self {\n                let mut instance = Self::default(); ").concat(o.currentControlsState.find((function(t){return"Metadata"===t.name})).state?"\n                Lazy::set(&mut instance.metadata.name, '".concat(o.currentControlsState.find((function(t){return"Name"===t.name})).state,"');\n                Lazy::set(&mut instance.metadata.symbol, '").concat(o.currentControlsState.find((function(t){return"Symbol"===t.name})).state,"');\n                Lazy::set(&mut instance.metadata.decimals, decimal); ").concat(o.currentControlsState.find((function(t){return"Ownable"===t.name})).state?"\n                instance._init_with_owner(instance.env().caller());":""):"","\n                instance._mint(instance.env().caller(), ").concat(o.currentControlsState.find((function(t){return"Premint"===t.name})).state,");\n                instance\n            }  ").concat(o.currentControlsState.find((function(t){return"Burnable"===t.name})).state?"\n            \n            #[ink(message)]\n            pub fn burn_from_many(&mut self, accounts: Vec<(AccountId, Balance)>) {\n                for account in accounts.iter() {\n                    self.burn_from(account.0, account.1);\n                }\n            }":""," ").concat(o.currentControlsState.find((function(t){return"Mintable"===t.name})).state?"\n            \n            #[ink(message)] ".concat(o.currentControlsState.find((function(t){return"Ownable"===t.name})).state?"\n            #[modifiers(only_owner)]":"","\n            pub fn mint_to(&mut self, account: AccountId, amount: Balance) {\n                self.mint(account, amount);\n            }"):"","\n        }\n    }\n    ")}):(0,a.jsx)(k.Z,{language:"toml",wrapLongLines:!0,style:v.YC,children:'[package]\nname = "my_token"\nversion = "1.0.0"\nedition = "2018"\n\n[dependencies]\nink_primitives = { tag = "v3.0.0-rc4", git = "https://github.com/Supercolony-net/ink", default-features = false }\nink_metadata = { tag = "v3.0.0-rc4", git = "https://github.com/Supercolony-net/ink", default-features = false, features = ["derive"], optional = true }\nink_env = { tag = "v3.0.0-rc4", git = "https://github.com/Supercolony-net/ink", default-features = false }\nink_storage = { tag = "v3.0.0-rc4", git = "https://github.com/Supercolony-net/ink", default-features = false }\nink_lang = { tag = "v3.0.0-rc4", git = "https://github.com/Supercolony-net/ink", default-features = false }\nink_prelude = { tag = "v3.0.0-rc4", git = "https://github.com/Supercolony-net/ink", default-features = false }\n\nscale = { package = "parity-scale-codec", version = "2.1", default-features = false, features = ["derive"] }\nscale-info = { version = "0.6.0", default-features = false, features = ["derive"], optional = true }\n\n# These dependencies\npsp22 = { path = "../../contracts/token/psp22", default-features = false } '.concat(o.currentControlsState.find((function(t){return"Ownable"===t.name})).state?'\nownable = { path = "../../contracts/access/ownable", default-features = false }':"",'\nbrush = { path = "../../utils/brush", default-features = false }\n\n[lib]\nname = "my_psp22"\npath = "lib.rs"\ncrate-type = [\n    # Used for normal contract Wasm blobs.\n    "cdylib",\n]\n\n[features]\ndefault = ["std"]\nstd = [\n    "ink_primitives/std",\n    "ink_metadata",\n    "ink_metadata/std",\n    "ink_env/std",\n    "ink_storage/std",\n    "ink_lang/std",\n    "scale/std",\n    "scale-info",\n    "scale-info/std",\n\n    # These dependencies\n    "psp22/std",\n    "brush/std",\n]\nink-as-dependency = []')})})]});case"psp1155":return(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{className:x().tabsSwitch,children:[(0,a.jsx)("div",{onClick:function(){return l("rust")},className:"rust"===c?x().activeTab:"",children:"lib.rs"}),(0,a.jsx)("div",{onClick:function(){return l("toml")},className:"toml"===c?x().activeTab:"",children:"Cargo.toml"})]}),(0,a.jsx)("div",{className:x().mainContent,children:"rust"===c?(0,a.jsx)(k.Z,{language:"rust",wrapLongLines:!0,style:v.YC,children:'#![cfg_attr(not(feature = "std"), no_std)]\n\n#[brush::contract]\npub mod my_nft_token {\n    use brush::{ '.concat(o.currentControlsState.find((function(t){return"Ownable"===t.name})).state?"\n        modifiers,":"","\n        traits::InkStorage,\n    };\n    use ink_storage::collections::HashMap as StorageHashMap; ").concat(o.currentControlsState.find((function(t){return"Ownable"===t.name})).state?"\n    use ownable::traits::*;":"","\n    use psp1155::{ ").concat(o.currentControlsState.find((function(t){return"Burnable"===t.name})).state||o.currentControlsState.find((function(t){return"Mintable"===t.name})).state||o.currentControlsState.find((function(t){return"Metadata"===t.name})).state?"\n        extensions::{ ".concat(o.currentControlsState.find((function(t){return"Burnable"===t.name})).state?"\n            burnable::*,":""," ").concat(o.currentControlsState.find((function(t){return"Mintable"===t.name})).state?"\n            mintable::*,":""," ").concat(o.currentControlsState.find((function(t){return"Metadata"===t.name})).state?"\n            metadata::*, ":""," \n        }, "):"","\n        traits::*,\n    };\n\n    #[ink(storage)]\n    #[derive(Default, PSP1155Storage").concat(o.currentControlsState.find((function(t){return"Ownable"===t.name})).state?", OwnableStorage":"").concat(o.currentControlsState.find((function(t){return"Metadata"===t.name})).state?", PSP1155MetadataStorage":"",")]\n    pub struct ").concat(o.currentControlsState.find((function(t){return"Name"===t.name})).state," {\n        #[PSP1155StorageField]\n        psp1155: PSP1155Data, ").concat(o.currentControlsState.find((function(t){return"Ownable"===t.name})).state?"\n        #[OwnableStorageField]\n        ownable: OwnableData,":""," ").concat(o.currentControlsState.find((function(t){return"Metadata"===t.name})).state?"\n        #[PSP1155MetadataStorageField]\n        metadata: PSP1155MetadataData,":"","  \n        registered_ids: StorageHashMap<Id, bool>,    \n    }\n    ").concat(o.currentControlsState.find((function(t){return"Metadata"===t.name})).state?"\n    impl PSP1155Metadata for MyPSP1155 {}":""," ").concat(o.currentControlsState.find((function(t){return"Ownable"===t.name})).state?"\n    impl Ownable for ".concat(o.currentControlsState.find((function(t){return"Name"===t.name})).state," {}"):"","\n    impl PSP1155 for ").concat(o.currentControlsState.find((function(t){return"Name"===t.name})).state," {} ").concat(o.currentControlsState.find((function(t){return"Burnable"===t.name})).state&&o.currentControlsState.find((function(t){return"Ownable"===t.name})).state?"\n    \n    impl PSP1155Burnable for ".concat(o.currentControlsState.find((function(t){return"Name"===t.name})).state," {\n        #[ink(message)] \n        #[modifiers(only_owner)]\n        fn burn(&mut self, id: Id, amount: Balance) {\n            self._burn(Self::env().caller(), id, amount);\n        }\n    }\n    "):o.currentControlsState.find((function(t){return"Burnable"===t.name})).state?"\n    impl PSP1155Burnable for ".concat(o.currentControlsState.find((function(t){return"Name"===t.name})).state," {}"):""," ").concat(o.currentControlsState.find((function(t){return"Mintable"===t.name})).state&&o.currentControlsState.find((function(t){return"Ownable"===t.name})).state?"\n    \n    impl PSP1155Mintable for ".concat(o.currentControlsState.find((function(t){return"Name"===t.name})).state," {\n        #[ink(message)]\n        #[modifiers(only_owner)]\n        fn mint_to(&mut self, to: AccountId, id: Id, amount: Balance) {\n            self._mint(to, id, amount);\n        }\n        #[ink(message)]\n        #[modifiers(only_owner)]\n        fn mint(&mut self, id: Id, amount: Balance) {\n            self._mint(Self::env().caller(), id, amount);\n        }\n    }\n    "):o.currentControlsState.find((function(t){return"Mintable"===t.name})).state?"\n    impl PSP1155Mintable for ".concat(o.currentControlsState.find((function(t){return"Name"===t.name})).state," {}"):"","\n    \n    impl ").concat(o.currentControlsState.find((function(t){return"Name"===t.name})).state," {\n        #[ink(constructor)]\n        pub fn new() -> Self {\n            let mut instance = Self::default(); ").concat(o.currentControlsState.find((function(t){return"Metadata"===t.name})).state?"\n            instance.metadata.uri = '".concat(null===(n=o.currentControlsState.find((function(t){return"URI"===t.name})))||void 0===n?void 0:n.state,"';"):""," \n            instance\n        }\n        \n        #[ink(message)]\n        pub fn add_type(&mut self, id: Id) {\n            self.registered_ids.insert(id, true);\n        }\n        ").concat(o.currentControlsState.find((function(t){return"Mintable"===t.name})).state?"\n        #[ink(message)] ".concat(o.currentControlsState.find((function(t){return"Ownable"===t.name})).state?"\n        #[modifiers(only_owner)]":"","\n        pub fn mint_tokens(&mut self, id: Id, amount: Balance) {\n            assert!(*self.registered_ids.get(&id).unwrap_or(&false));\n            self.mint(id, amount);\n        }"):"","\n    } \n}\n")}):(0,a.jsx)(k.Z,{language:"toml",wrapLongLines:!0,style:v.YC,children:'[package]\nname = "my_nft_token"\nversion = "1.0.0"\nedition = "2018"\n\n[dependencies]\nink_primitives = { tag = "v3.0.0-rc4", git = "https://github.com/Supercolony-net/ink", default-features = false }\nink_metadata = { tag = "v3.0.0-rc4", git = "https://github.com/Supercolony-net/ink", default-features = false, features = ["derive"], optional = true }\nink_env = { tag = "v3.0.0-rc4", git = "https://github.com/Supercolony-net/ink", default-features = false }\nink_storage = { tag = "v3.0.0-rc4", git = "https://github.com/Supercolony-net/ink", default-features = false }\nink_lang = { tag = "v3.0.0-rc4", git = "https://github.com/Supercolony-net/ink", default-features = false }\nink_prelude = { tag = "v3.0.0-rc4", git = "https://github.com/Supercolony-net/ink", default-features = false }\n\nscale = { package = "parity-scale-codec", version = "2.1", default-features = false, features = ["derive"] }\nscale-info = { version = "0.6.0", default-features = false, features = ["derive"], optional = true }\n\n# These dependencies\npsp1155 = { path = "../../contracts/token/psp1155", default-features = false } '.concat(o.currentControlsState.find((function(t){return"Ownable"===t.name})).state?'\nownable = { path = "../../contracts/access/ownable", default-features = false }':"",'\nbrush = { path = "../../utils/brush", default-features = false }\n\n[lib]\nname = "my_psp1155"\npath = "lib.rs"\ncrate-type = [\n    # Used for normal contract Wasm blobs.\n    "cdylib",\n]\n\n[features]\ndefault = ["std"]\nstd = [\n    "ink_primitives/std",\n    "ink_metadata",\n    "ink_metadata/std",\n    "ink_env/std",\n    "ink_storage/std",\n    "ink_lang/std",\n    "scale/std",\n    "scale-info",\n    "scale-info/std",\n\n    # These dependencies\n    "psp1155/std",\n    "brush/std",\n]\nink-as-dependency = []')})})]});case"psp721":return(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{className:x().tabsSwitch,children:[(0,a.jsx)("div",{onClick:function(){return l("rust")},className:"rust"===c?x().activeTab:"",children:"lib.rs"}),(0,a.jsx)("div",{onClick:function(){return l("toml")},className:"toml"===c?x().activeTab:"",children:"Cargo.toml"})]}),(0,a.jsx)("div",{className:x().mainContent,children:"rust"===c?(0,a.jsx)(k.Z,{language:"rust",wrapLongLines:!0,style:v.YC,children:'#![cfg_attr(not(feature = "std"), no_std)]\n                    \n#[brush::contract]\npub mod my_nft_token {\n    use ink_prelude::{\n        string::String,\n        vec::Vec,\n    };\n    use psp721::{ '.concat(o.currentControlsState.find((function(t){return"Burnable"===t.name})).state||o.currentControlsState.find((function(t){return"Mintable"===t.name})).state||o.currentControlsState.find((function(t){return"Metadata"===t.name})).state?"\n        extensions::{".concat(o.currentControlsState.find((function(t){return"Burnable"===t.name})).state?"\n            burnable::*,":"").concat(o.currentControlsState.find((function(t){return"Mintable"===t.name})).state?"\n            mintable::*,":""," ").concat(o.currentControlsState.find((function(t){return"Metadata"===t.name})).state?"\n            metadata::*,":"","\n        }, "):"","\n        traits::*,\n    }; ").concat(o.currentControlsState.find((function(t){return"Ownable"===t.name})).state?"\n    use ownable::traits::*;":"","\n\n    #[derive(Default, PSP721Storage").concat(o.currentControlsState.find((function(t){return"Metadata"===t.name})).state?", PSP721MetadataStorage":"").concat(o.currentControlsState.find((function(t){return"Ownable"===t.name})).state?", OwnableStorage":"",")]\n    #[ink(storage)]\n    pub struct ").concat(o.currentControlsState.find((function(t){return"Name"===t.name})).state,"{\n        #[PSP721StorageField]\n        psp721: PSP721Data, ").concat(o.currentControlsState.find((function(t){return"Metadata"===t.name})).state?"\n        #[PSP721MetadataStorageField]\n        metadata: PSP721MetadataData,":""," ").concat(o.currentControlsState.find((function(t){return"Ownable"===t.name})).state?"\n        #[OwnableStorageField]\n        ownable: OwnableData,":"","\n        next_id: u8,\n    }\n\n    impl PSP721 for ").concat(o.currentControlsState.find((function(t){return"Name"===t.name})).state," {}").concat(o.currentControlsState.find((function(t){return"Burnable"===t.name})).state?"\n    impl PSP721Burnable for ".concat(o.currentControlsState.find((function(t){return"Name"===t.name})).state," {}"):""," ").concat(o.currentControlsState.find((function(t){return"Mintable"===t.name})).state?"\n    impl PSP721Mintable for ".concat(o.currentControlsState.find((function(t){return"Name"===t.name})).state," {}"):""," ").concat(o.currentControlsState.find((function(t){return"Ownable"===t.name})).state?"\n    impl Ownable for ".concat(o.currentControlsState.find((function(t){return"Name"===t.name})).state," {}"):""," ").concat(o.currentControlsState.find((function(t){return"Metadata"===t.name})).state?"\n    impl PSP721Metadata for ".concat(o.currentControlsState.find((function(t){return"Name"===t.name})).state," {}"):"","\n\n    impl ").concat(o.currentControlsState.find((function(t){return"Name"===t.name})).state," {\n        /// A constructor which mints the first token to the owner\n        #[ink(constructor)]\n        pub fn new() -> Self {\n            let mut instance = Self::default(); ").concat(o.currentControlsState.find((function(t){return"Metadata"===t.name})).state?"\n            instance.metadata.name = '".concat(o.currentControlsState.find((function(t){return"Name"===t.name})).state,"';\n            instance.metadata.symbol = '").concat(o.currentControlsState.find((function(t){return"Symbol"===t.name})).state,"'; "):"","  ").concat(o.currentControlsState.find((function(t){return"Mintable"===t.name})).state?"\n            instance.mint_token();":"\n            instance._mint([instance.next_id; 32]);\n            instance.next_id += 1;","\n            instance\n        }\n        ").concat(o.currentControlsState.find((function(t){return"Mintable"===t.name})).state?"\n        /// Mint method which mints a token and updates the id of next token\n        #[ink(message)]\n        pub fn mint_token(&mut self) {\n            self.mint([self.next_id; 32]);\n            self.next_id += 1;\n        }":"","\n    }\n}")}):(0,a.jsx)(k.Z,{language:"toml",wrapLongLines:!0,style:v.YC,children:'[package]\nname = "my_nft_token"\nversion = "1.0.0"\nedition = "2018"\n\n[dependencies]\nink_primitives = { tag = "v3.0.0-rc4", git = "https://github.com/Supercolony-net/ink", default-features = false }\nink_metadata = { tag = "v3.0.0-rc4", git = "https://github.com/Supercolony-net/ink", default-features = false, features = ["derive"], optional = true }\nink_env = { tag = "v3.0.0-rc4", git = "https://github.com/Supercolony-net/ink", default-features = false }\nink_storage = { tag = "v3.0.0-rc4", git = "https://github.com/Supercolony-net/ink", default-features = false }\nink_lang = { tag = "v3.0.0-rc4", git = "https://github.com/Supercolony-net/ink", default-features = false }\nink_prelude = { tag = "v3.0.0-rc4", git = "https://github.com/Supercolony-net/ink", default-features = false }\n\nscale = { package = "parity-scale-codec", version = "2.1", default-features = false, features = ["derive"] }\nscale-info = { version = "0.6.0", default-features = false, features = ["derive"], optional = true }\n\n# These dependencies\npsp721 = { path = "../../contracts/token/psp721", default-features = false } '.concat(o.currentControlsState.find((function(t){return"Ownable"===t.name})).state?'\nownable = { path = "../../contracts/access/ownable", default-features = false }':"",'\nbrush = { path = "../../utils/brush", default-features = false }\n\n[lib]\nname = "my_psp721"\npath = "lib.rs"\ncrate-type = [\n    # Used for normal contract Wasm blobs.\n    "cdylib",\n]\n\n[features]\ndefault = ["std"]\nstd = [\n    "ink_primitives/std",\n    "ink_metadata",\n    "ink_metadata/std",\n    "ink_env/std",\n    "ink_storage/std",\n    "ink_lang/std",\n    "scale/std",\n    "scale-info",\n    "scale-info/std",\n\n    # These dependencies\n    "psp721/std",\n    "brush/std",\n]\nink-as-dependency = []')})})]})});default:return(0,a.jsx)(a.Fragment,{})}return(0,a.jsx)(a.Fragment,{})},y=e(1233),P=function(){var t=(0,f.useState)(0),n=t[0],e=t[1],r=(0,f.useState)(_),o=r[0],s=(r[1],(0,f.useState)([])),i=s[0],c=s[1];return(0,f.useEffect)((function(){var t=[];o.forEach((function(n,e){t.push({type:n.name,currentControlsState:[]}),n.controls.forEach((function(n){n.optionList.forEach((function(n){t[e].currentControlsState.push({name:n.name,state:n.initState})}))}))})),c(t)}),[o]),(0,a.jsxs)("div",{className:g().componentContainer,children:[(0,a.jsx)("h2",{className:"primaryHeadline",children:"How to use: "}),(0,a.jsx)("div",{className:g().scrollWrapper,children:(0,a.jsxs)("div",{className:g().wizardWrapper,children:[(0,a.jsxs)("div",{className:g().header,children:[(0,a.jsx)("div",{className:g().tokenStandardRow,children:o.map((function(t,r){return(0,a.jsx)("div",{onClick:function(){e(r)},className:n===r?"".concat(g().active," ").concat(g().tokenStandard):"".concat(g().tokenStandard),children:t.name},r.toString())}))}),(0,a.jsx)("div",{className:g().actionsRow})]}),(0,a.jsxs)("div",{className:g().body,children:[(0,a.jsx)("div",{className:g().contractControls,children:o.map((function(t,e){return(0,a.jsx)("div",{style:{display:n!==e?"none":"block"},children:t.controls.map((function(t,n){return(0,a.jsxs)("div",{className:g().inputSection,children:[(0,a.jsx)("div",{className:g().controlsSectionName,children:t.sectionName}),(0,a.jsx)("div",{className:g().settingsInputs,children:t.optionList.map((function(t,n){var r,o;if("Symbol"===t.name||"URI"===t.name){var s,l,u,d=null===(s=i[e])||void 0===s?void 0:s.currentControlsState.map((function(t){return t.name})).indexOf("Metadata");if(!1===(null===(l=i[e])||void 0===l||null===(u=l.currentControlsState[d])||void 0===u?void 0:u.state))return}switch(t.type){case"text":return(0,a.jsxs)("div",{className:g().textInput,children:[(0,a.jsxs)("div",{className:g().checkboxContainerNested,children:[(0,a.jsxs)("label",{htmlFor:t.name.split(" ").join("_"),children:[t.name,":"]}),(0,a.jsx)("input",{type:t.type,id:t.name.split(" ").join("_"),name:t.name.split(" ").join("_"),value:null===(r=i[e])||void 0===r?void 0:r.currentControlsState[null===(o=i[e])||void 0===o?void 0:o.currentControlsState.map((function(t){return t.name})).indexOf(t.name)].state,onChange:function(n){var a=(0,S.Z)(i),r=a[e].currentControlsState.map((function(t){return t.name})).indexOf(t.name);a[e].currentControlsState[r].state=n.target.value,c(a)}})]}),t.tooltip&&t.tooltip.length>1?(0,a.jsxs)("div",{className:g().tooltipContainer,children:[(0,a.jsx)("div",{className:g().tooltipInfo,children:t.tooltip}),(0,a.jsx)("img",{className:g().infoIcon,src:"/icons/infoIcon.svg",alt:"icon"})]}):null]},n.toString());case"checkbox":return(0,a.jsxs)("label",{className:g().checkboxContainer,children:[(0,a.jsxs)("div",{className:g().checkboxContainerNested,children:[(0,a.jsx)("input",{type:t.type,id:t.name.split(" ").join("_"),name:t.name.split(" ").join("_"),onChange:function(n){var a=(0,S.Z)(i),r=a[e].currentControlsState.map((function(t){return t.name})).indexOf(t.name);a[e].currentControlsState[r].state=n.target.checked,c(a)}}),(0,a.jsx)("span",{children:t.name})]}),t.tooltip&&t.tooltip.length>1?(0,a.jsxs)("div",{className:g().tooltipContainer,children:[(0,a.jsx)("div",{className:g().tooltipInfo,children:t.tooltip}),(0,a.jsx)("img",{className:g().infoIcon,src:"/icons/infoIcon.svg",alt:"icon"})]}):null]},n.toString())}}))})]},n.toString())}))},e.toString())}))}),(0,a.jsx)("div",{className:g().contractOutput,children:o.map((function(t,e){return(0,a.jsx)("div",{style:{display:n!==e?"none":"block"},children:(0,a.jsx)(w,{data:i[e]})},e.toString())}))})]})]})}),(0,a.jsx)("div",{className:g().docsLink,children:(0,a.jsx)(u.default,{href:y.co,children:(0,a.jsx)("a",{children:"Documentation"})})})]})};function j(){return(0,f.useEffect)((function(){p().highlightAll()}),[]),(0,a.jsxs)("div",{children:[(0,a.jsxs)(r.default,{children:[(0,a.jsx)("title",{children:"Openbrush"}),(0,a.jsx)("meta",{name:"keywords",content:"openbrush"}),(0,a.jsx)("meta",{name:"description",content:"openbrush"})]}),(0,a.jsx)(i,{title:["Smart contracts library for",(0,a.jsx)("span",{style:{color:"#E6007A"},children:" Polkadot "},""),"on",(0,a.jsx)("span",{style:{color:"#B4BE68"},children:" Rust "},"")],illustration:"/img/bannerIllustration.svg"}),(0,a.jsx)(d,{title:"The world\u2019s leading projects trust OpenBrush",data:h}),(0,a.jsx)(P,{})]})}},8581:function(t,n,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return e(6570)}])},2833:function(t){t.exports={bannerContainer:"Banner_bannerContainer__1q1ki",bannerContainerDecorWrapper:"Banner_bannerContainerDecorWrapper__nXf5G",leftBottom:"Banner_leftBottom__Y2H1S",rightBottom:"Banner_rightBottom__3hZEn",bannerInnerContentHolder:"Banner_bannerInnerContentHolder__1PK8L",headlineBlock:"Banner_headlineBlock__UmnJ1",illustrationConstructor:"Banner_illustrationConstructor__3fBom",illustrationContainer:"Banner_illustrationContainer__2cQk9",ink:"Banner_ink__2uWTn",openbrush:"Banner_openbrush__23cWe",contracts:"Banner_contracts__3SBRS"}},8073:function(t){t.exports={partnersContainer:"Partners_partnersContainer__2RzlM",logoWrapper:"Partners_logoWrapper__3wu-0",partnersContainerDecor:"Partners_partnersContainerDecor__2GwuY"}},7246:function(t){t.exports={componentContainer:"Wizard_componentContainer__3zJFA",scrollWrapper:"Wizard_scrollWrapper__2Csdv",wizardWrapper:"Wizard_wizardWrapper__iyNAC",header:"Wizard_header__1HWND",tokenStandardRow:"Wizard_tokenStandardRow__1LGPX",tokenStandard:"Wizard_tokenStandard__3UODM",active:"Wizard_active__2-1H9",actionsRow:"Wizard_actionsRow__PZGP1",copyToClipboard:"Wizard_copyToClipboard__1iVhd",copyIcon:"Wizard_copyIcon__3pho0",body:"Wizard_body__20k8h",contractControls:"Wizard_contractControls__30QNB",inputSection:"Wizard_inputSection__hTxLh",settingsInputs:"Wizard_settingsInputs__WE65c",textInput:"Wizard_textInput__23e6v",checkboxContainerNested:"Wizard_checkboxContainerNested__3Bww1",controlsSectionName:"Wizard_controlsSectionName__3YTE0",checkboxContainer:"Wizard_checkboxContainer__1KL5V",tooltipContainer:"Wizard_tooltipContainer__FbqR4",tooltipInfo:"Wizard_tooltipInfo__DIVgG",infoIcon:"Wizard_infoIcon__2YE8v",contractOutput:"Wizard_contractOutput__11CLG",docsLink:"Wizard_docsLink__jXrXE"}},5345:function(t){t.exports={tabsSwitch:"WizardOutput_tabsSwitch__3-BOf",activeTab:"WizardOutput_activeTab__b4yTQ"}}},function(t){t.O(0,[905,774,888,179],(function(){return n=8581,t(t.s=n);var n}));var n=t.O();_N_E=n}]);