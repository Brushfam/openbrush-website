import {Extension, Import, Method, Storage, TraitImpl} from "./types";

export function getExtensions(output, version, standardName, brushName) {
    let extensions = [];
    let usesStandardExtensions = false;

    // Ownable extension
    if(output.security === 'ownable') {
        extensions.push(generateExtension('ownable', standardName, version, output.security,[]));
    }
    // AccessControl extension
    if(output.security === 'access_control') {
        extensions.push(generateExtension('access_control', standardName, version, output.security,[]));
    }
    // AccessControlEnumerable extension
    if(output.security === 'access_control_enumerable') {
        extensions.push(new Extension('', [], [new Import(`${brushName}::contracts::access_control::only_role`)], null, new TraitImpl('AccessControl', 'Contract', []), [], [], []));
        extensions.push(generateExtension('access_control_enumerable', standardName, version, output.security,[]));

        usesStandardExtensions = true;
    }

    // Batch extension
    if(output.currentControlsState.find(x => x.name === 'Batch')?.state) {
        extensions.push(generateExtension('Batch', standardName, version, output.security,[]));

        usesStandardExtensions = true;
    }
    // Burnable extension
    if(output.currentControlsState.find(x => x.name === 'Burnable')?.state) {
        extensions.push(generateExtension('Burnable', standardName, version, output.security, []));

        usesStandardExtensions = true;
    }
    // Mintable extension
    if(output.currentControlsState.find(x => x.name === 'Mintable')?.state) {
        extensions.push(generateExtension('Mintable', standardName, version, output.security, []));

        usesStandardExtensions = true;
    }
    // Enumerable extension psp34 > v1.5.0
    if(output.currentControlsState.find(x => x.name === 'Enumerable')?.state) {
        extensions.push(generateExtension('Enumerable', standardName, version, output.security, []));

        usesStandardExtensions = true;
    }
    // Pausable extension
    if(output.currentControlsState.find(x => x.name === 'Pausable')?.state) {
        extensions.push(generateExtension('Pausable', standardName, version, output.security,[]));

        usesStandardExtensions = true;
    }
    // Metadata extension
    if(output.currentControlsState.find(x => x.name === 'Metadata')?.state) {
        extensions.push(generateExtension('Metadata', standardName, version, output.security,[]));

        usesStandardExtensions = true;
    }
    // Flashmint extension
    if(output.currentControlsState.find(x => x.name === 'FlashMint')?.state) {
        extensions.push(generateExtension('FlashMint', standardName, version, output.security,[]));

        usesStandardExtensions = true;
    }
    // Wrapper extension
    if(output.currentControlsState.find(x => x.name ==='Wrapper')?.state) {
        extensions.push(generateExtension('Wrapper', standardName, version, output.security,[]));

        usesStandardExtensions = true;
    }
    // Capped extension
    if(output.currentControlsState.find(x => x.name === 'Capped')?.state) {
        extensions.push(generateExtension('Capped', standardName, version, output.security,[]));

        usesStandardExtensions = true;
    }

    return {extensions, usesStandardExtensions};
}

export function generateExtension(extensionName, standardName, version, security, additionalMethods) {

    const brushName = (version < 'v2.1.0') ? 'brush' : 'openbrush';
    let constructorArgs = [];
    let constructorActions = [];

    switch(extensionName){
        case 'Batch':
            return new Extension(
                'Batch',
                [],
                [new Import(`${brushName}::contracts::${standardName}::extensions::batch::*`)],
                null,
                new TraitImpl(`${standardName.toUpperCase()}Batch`, 'Contract', additionalMethods),
                [],
                [],
                []
            );
        case 'Burnable':
            if(security === 'access_control' || security === 'access_control_enumerable' || security === 'ownable') {
                let args = [];
                args.push('account: AccountId');

                if(standardName === 'psp22')args.push('amount: Balance');
                if(standardName === 'psp37' || standardName === 'psp1155' || standardName === 'psp35')args.push('ids_amounts: Vec<(Id, Balance)>');
                if(standardName === 'psp34')args.push('id: Id');

                additionalMethods.push(new Method(brushName,
                    false,
                    true,
                    `#[ink(message)]\n\t\t#[${brushName}::modifiers(${security === 'ownable' ?'only_owner' : 'only_role(MANAGER)'})]`,
                    'burn',
                    args,
                    `Result<(), ${standardName.toUpperCase()}Error>`,
                    `self._burn_from(account, ${standardName === 'psp22' ? 'amount' : (standardName === 'psp34' ? 'id' : 'ids_amounts')})`));
            }

            return new Extension(
                'Burnable',
                [],
                [new Import(`${brushName}::contracts::${standardName}::extensions::burnable::*`)],
                null,
                new TraitImpl(`${standardName.toUpperCase()}Burnable`, 'Contract', additionalMethods),
                [],
                [],
                []
            );
        case 'Mintable':
            constructorActions = [];
            if(security === 'access_control' || security === 'access_control_enumerable' || security === 'ownable') {
                let args = [];
                args.push('account: AccountId');

                if(standardName === 'psp22')args.push('amount: Balance');
                if(standardName === 'psp37' || standardName === 'psp1155' || standardName === 'psp35')args.push('ids_amounts: Vec<(Id, Balance)>');
                if(standardName === 'psp34')args.push('id: Id');

                additionalMethods.push(new Method(brushName,
                    false,
                    true,
                    `#[ink(message)]\n\t\t#[${brushName}::modifiers(${security === 'ownable' ?'only_owner' : 'only_role(MANAGER)'})]`,
                    'mint',
                    args,
                    `Result<(), ${standardName.toUpperCase()}Error>`,
                    `self._mint${standardName !== 'psp22' ? '_to' : ''}(account, ${standardName === 'psp22' ? 'amount' : (standardName === 'psp34' ? 'id' : 'ids_amounts')})`));
            }

            if(standardName === 'psp34'){
                constructorActions.push('_instance._mint_to(_instance.env().caller(), Id::U8(1)).expect("Can mint");');
            }

            return new Extension(
                'Mintable',
                [],
                [new Import(`${brushName}::contracts::${standardName}::extensions::mintable::*`)],
                null,
                new TraitImpl(`${standardName.toUpperCase()}Mintable`, 'Contract', additionalMethods),
                [],
                constructorActions,
                []
            );
        case 'ownable':
            return new Extension(
                'Ownable',
                [],
                [new Import(`${brushName}::contracts::ownable::*`)],
                new Storage(
                    (version < 'v2.2.0' ? 'OwnableStorage' : null),
                    `\t#[${version < 'v2.2.0' ? 'OwnableStorageField' : 'storage_field'}]`,
                    'ownable',
                    `${version < 'v2.2.0' ? 'OwnableData' : 'ownable::Data'}`),
                new TraitImpl('Ownable', 'Contract', additionalMethods),
                [],
                ['_instance._init_with_owner(_instance.env().caller());'],
                []
            );
        case 'access_control':
            return new Extension(
                'AccessControl',
                [],
                [new Import(`${brushName}::contracts::access_control::*`)],
                new Storage(
                    (version < 'v2.2.0' ? 'AccessControlStorage' : null),
                    `\t#[${version < 'v2.2.0' ? 'AccessControlStorageField' : 'storage_field'}]`,
                    'access',
                    `${version < 'v2.2.0' ? 'AccessControlData' : 'access_control::Data'}`),
                new TraitImpl('AccessControl', 'Contract', additionalMethods),
                [],
                ['_instance._init_with_admin(_instance.env().caller());', '_instance.grant_role(MANAGER, _instance.env().caller()).expect("Should grant MANAGER role");'],
                []
            );
        case 'access_control_enumerable':
            return new Extension(
                'AccessControlEnumerable',
                [],
                [new Import(`${brushName}::contracts::access_control::extensions::enumerable::*`)],
                new Storage(
                    (version < 'v2.2.0' ? 'AccessControlStorage' : null),
                    `\t#[${version < 'v2.2.0' ? 'AccessControlStorageField' : 'storage_field'}]`,
                    'access',
                    `${version < 'v2.2.0' ? 'AccessControlData<EnumerableMembers>' : 'access_control::Data<enumerable::Members>'}`),
                new TraitImpl('AccessControlEnumerable', 'Contract', additionalMethods),
                [],
                ['_instance._init_with_admin(_instance.env().caller());', '_instance.grant_role(MANAGER, _instance.env().caller()).expect("Should grant MANAGER role");'],
                []
            );
        case 'Enumerable':
            return new Extension(
                'Enumerable',
                [],
                [new Import(`${brushName}::contracts::${standardName}::extensions::enumerable::*`)],
                version < 'v2.1.0' ? new Storage(
                    (version < 'v2.2.0' ? `${standardName.toUpperCase()}EnumerableStorage` : null),
                    `\t#[${version < 'v2.2.0' ? `${standardName.toUpperCase()}EnumerableStorageField` : 'storage_field'}]`,
                    'enumerable',
                    `${standardName.toUpperCase()}EnumerableData`) : null,
                new TraitImpl(`${standardName.toUpperCase()}Enumerable`, 'Contract', additionalMethods),
                [],
                [],
                []
            );
        case 'Pausable':
            return new Extension(
                'Pausable',
                [],
                [new Import(`${brushName}::contracts::pausable::*`)],
                new Storage(
                    (version < 'v2.2.0' ? 'PausableStorage' : null),
                    `\t#[${version < 'v2.2.0' ? 'PausableStorageField' : 'storage_field'}]`,
                    'pausable',
                    `${version < 'v2.2.0' ? 'PausableData' : 'pausable::Data'}`),
                new TraitImpl(`Pausable`, 'Contract', additionalMethods),
                [],
                [],
                [new Method(
                    brushName,
                    true,
                    true,
                    `#[ink(message)]${security ? `\n\t\t#[${brushName}::modifiers(${security === 'ownable' ? 'only_owner' : 'only_role(MANAGER)'})]` : ''}`,
                    'change_state',
                    [],
                    `Result<(), ${standardName.toUpperCase()}Error>`,
                    `if self.paused() {
                self._unpause()
            } else {
                self._pause()
            }`
                    )]
            );
        case 'Metadata':
            constructorArgs = [];
            constructorActions = [];
            let inkImports = []

            if(standardName === 'psp22') {
                constructorArgs.push('name: Option<String>');
                constructorArgs.push('symbol: Option<String>');
                constructorArgs.push('decimal: u8');

                constructorActions.push('_instance.metadata.name = name;');
                constructorActions.push('_instance.metadata.symbol = symbol;');
                constructorActions.push('_instance.metadata.decimals = decimal;');
            }

            if(version < 'v2.1.0' && (standardName === 'psp37' || standardName === 'psp35' || standardName === 'psp1155')) {
                constructorArgs.push('uri: Option<String>');
                constructorActions.push('_instance.metadata.uri = uri;');
            }

            if(standardName === 'psp34') {
                constructorActions.push('let collection_id = _instance.collection_id();');
                constructorActions.push('_instance._set_attribute(collection_id.clone(), String::from("name").into_bytes(), String::from("MyPSP34").into_bytes());');
                constructorActions.push('_instance._set_attribute(collection_id, String::from("symbol").into_bytes(), String::from("MPSP").into_bytes());');
            }

            return new Extension(
                'Metadata',
                [],
                [new Import(`${brushName}::contracts::${standardName}::extensions::metadata::*`)],
                new Storage(
                    (version < 'v2.2.0' ? `${standardName.toUpperCase()}MetadataStorage` : null),
                    `\t#[${version < 'v2.2.0' ? `${standardName.toUpperCase()}MetadataStorageField` : 'storage_field'}]`,
                    'metadata',
                    `${version < 'v2.2.0' ? `${standardName.toUpperCase()}MetadataData` : 'metadata::Data'}`),
                new TraitImpl(`${standardName.toUpperCase()}Metadata`, 'Contract', additionalMethods),
                constructorArgs,
                constructorActions,
                []
            );
        case 'FlashMint':
            return new Extension(
                'Flashmint',
                [],
                [new Import(`${brushName}::contracts::${standardName}::extensions::flashmint::*`)],
                null,
                new TraitImpl(`FlashLender`, 'Contract', additionalMethods),
                [],
                [],
                []
            );
        case 'Wrapper':
            return new Extension(
                'Wrapper',
                [],
                [new Import(`${brushName}::contracts::${standardName}::extensions::wrapper::*`)],
                new Storage(
                    (version < 'v2.2.0' ? `${standardName.toUpperCase()}WrapperStorage` : null),
                    `\t#[${version < 'v2.2.0' ? `${standardName.toUpperCase()}WrapperStorageField`: 'storage_field'}]`,
                    'wrapper',
                    `${version < 'v2.2.0' ? `${standardName.toUpperCase()}WrapperData` : 'wrapper::Data'}`),
                new TraitImpl(`${standardName.toUpperCase()}Wrapper`, 'Contract', additionalMethods),
                [],
                [],
                []
            );
        case 'Capped':
            let contractMethodsCapped = [];

            contractMethodsCapped.push(new Method(
                brushName,
                true,
                false,
                `#[ink(message)]`,
                'cap',
                [],
                'Balance',
                `self.cap`
            ));

            contractMethodsCapped.push(new Method(
                brushName,
                false,
                true,
                null,
                '_init_cap',
                ['cap: Balance'],
                `Result<(), ${standardName.toUpperCase()}Error>`,
                `if cap <= 0 {
                return Err(PSP22Error::Custom(String::from("Cap must be above 0")))
            }
            self.cap = cap;
            Ok(())`
            ));

            return new Extension(
                'Capped',
                [],
                [],
                new Storage(null, null, 'cap', 'Balance'),
                null,
                ['cap: Balance'],
                ['assert!(_instance._init_cap(cap).is_ok());'],
                contractMethodsCapped
            );
    }
}