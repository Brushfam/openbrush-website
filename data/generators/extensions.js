import {Extension, ExtensionBuilder, Import, Method, Storage, StorageBuilder, TraitImpl} from "./types";

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

        let extension = new ExtensionBuilder();
        extension.addBrushImport(new Import(`${brushName}::contracts::access_control::only_role`));
        extension.setImpl(new TraitImpl('AccessControl', 'Contract', []));

        extensions.push(extension.getExtension());
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
    const brushName = (version < 'v2.0.0') ? 'brush' : 'openbrush';

    switch(extensionName){
        case 'Batch':
            let batchExtension = new ExtensionBuilder();
            batchExtension.setName('Batch');
            batchExtension.addBrushImport(new Import(`${brushName}::contracts::${standardName}::extensions::batch::*`));
            batchExtension.setImpl(new TraitImpl(`${standardName.toUpperCase()}Batch`, 'Contract', additionalMethods));

            return batchExtension.getExtension();
        case 'Burnable':
            let burnableExtension = new ExtensionBuilder();
            burnableExtension.setName('Burnable');
            burnableExtension.addBrushImport(new Import(`${brushName}::contracts::${standardName}::extensions::burnable::*`));

            if(security && security !== 'none') {
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
                    `self._burn_from(account, ${standardName === 'psp22' ? 'amount' : (standardName === 'psp34' ? 'id' : 'ids_amounts')})`
                ));
            }

            burnableExtension.setImpl(new TraitImpl(`${standardName.toUpperCase()}Burnable`, 'Contract', additionalMethods));

            return burnableExtension.getExtension();
        case 'Mintable':
            let mintableExtension = new ExtensionBuilder();
            mintableExtension.setName('Mintable');
            mintableExtension.addBrushImport(new Import(`${brushName}::contracts::${standardName}::extensions::mintable::*`));

            if(security && security !== 'none') {
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
                    `self._mint${standardName !== 'psp22' ? '_to' : ''}(account, ${standardName === 'psp22' ? 'amount' : (standardName === 'psp34' ? 'id' : 'ids_amounts')})`
                ));
            }

            mintableExtension.setImpl(new TraitImpl(`${standardName.toUpperCase()}Mintable`, 'Contract', additionalMethods));

            if(standardName === 'psp34'){
                mintableExtension.addConstructorAction('_instance._mint_to(_instance.env().caller(), Id::U8(1)).expect("Can mint");');
            }

            return mintableExtension.getExtension();
        case 'ownable':
            let ownableExtension = new ExtensionBuilder();
            ownableExtension.setName('Ownable');
            ownableExtension.addInkImport(new Import(`${brushName}::contracts::ownable::*`));

            let ownableStorage = new StorageBuilder();
            ownableStorage.constructDefaultStorage('Ownable', version);
            ownableExtension.setStorage(ownableStorage.getStorage());

            ownableExtension.setImpl(new TraitImpl(`Ownable`, 'Contract', additionalMethods));
            ownableExtension.addConstructorAction('_instance._init_with_owner(_instance.env().caller());');

            return ownableExtension.getExtension()
        case 'access_control':
            let accessControlExtension = new ExtensionBuilder();

            accessControlExtension.setName('AccessControl');
            accessControlExtension.addBrushImport(new Import(`${brushName}::contracts::access_control::*`));

            let accessControlStorage = new StorageBuilder();
            accessControlStorage.constructDefaultStorage('AccessControl', version);
            if(version > 'v2.1.0')accessControlStorage.setType('access_control::Data')
            accessControlStorage.setName('access');
            accessControlExtension.setStorage(accessControlStorage.getStorage());

            accessControlExtension.setImpl(new TraitImpl(`AccessControl`, 'Contract', additionalMethods));
            accessControlExtension.addConstructorAction('_instance._init_with_admin(_instance.env().caller());');
            accessControlExtension.addConstructorAction('_instance.grant_role(MANAGER, _instance.env().caller()).expect("Should grant MANAGER role");');

            return accessControlExtension.getExtension();
        case 'access_control_enumerable':

            let accessControlEnumerableExtension = new ExtensionBuilder();
            accessControlEnumerableExtension.setName('AccessControlEnumerable');
            accessControlEnumerableExtension.addBrushImport(new Import(`${brushName}::contracts::access_control::extensions::enumerable::*`));

            let accessControlEnumerableStorage = new StorageBuilder();

            if(version < 'v2.2.0')accessControlEnumerableStorage.setDerive('AccessControlStorage');
            accessControlEnumerableStorage.setField(`\t#[${version < 'v2.2.0' ? 'AccessControlStorageField' : 'storage_field'}]`);
            accessControlEnumerableStorage.setName('access');
            accessControlEnumerableStorage.setType(`${version < 'v2.2.0' ? 'AccessControlData<EnumerableMembers>' : 'access_control::Data<Members>'}`);

            accessControlEnumerableExtension.setStorage(accessControlEnumerableStorage.getStorage());

            accessControlEnumerableExtension.setImpl(new TraitImpl(`AccessControlEnumerable`, 'Contract', additionalMethods));
            accessControlEnumerableExtension.addConstructorAction('_instance._init_with_admin(_instance.env().caller());');
            accessControlEnumerableExtension.addConstructorAction('_instance.grant_role(MANAGER, _instance.env().caller()).expect("Should grant MANAGER role");');

            return accessControlEnumerableExtension.getExtension();
        case 'Enumerable':
            let enumerableExtension = new ExtensionBuilder();

            enumerableExtension.setName('Enumerable');
            enumerableExtension.addBrushImport(new Import(`${brushName}::contracts::${standardName}::extensions::enumerable::*`));
            if(version < 'v2.1.0') {
                let enumerableStorage = new StorageBuilder();
                enumerableStorage.constructDefaultStorage('Enumerable', version, standardName);
                enumerableExtension.setStorage(enumerableStorage.getStorage());
            }

            enumerableExtension.setImpl(new TraitImpl(`${standardName.toUpperCase()}Enumerable`, 'Contract', additionalMethods));

            return enumerableExtension.getExtension();
        case 'Pausable':
            let pausableExtension = new ExtensionBuilder();

            pausableExtension.setName('Pausable');
            pausableExtension.addBrushImport(new Import(`${brushName}::contracts::pausable::*`));

            let pausableStorage = new StorageBuilder();
            pausableStorage.constructDefaultStorage('Pausable', version);
            pausableExtension.setStorage(pausableStorage.getStorage());

            pausableExtension.setImpl(new TraitImpl(`Pausable`, 'Contract', additionalMethods));
            pausableExtension.addContractMethod(new Method(
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
            ));

            return pausableExtension.getExtension();
        case 'Metadata':
            let metadataExtension = new ExtensionBuilder();

            metadataExtension.setName('Metadata');
            metadataExtension.addBrushImport(new Import(`${brushName}::contracts::${standardName}::extensions::metadata::*`));

            let metadataStorage = new StorageBuilder();
            metadataStorage.constructDefaultStorage('Metadata', version, standardName);
            metadataExtension.setStorage(metadataStorage.getStorage());

            metadataExtension.setImpl(new TraitImpl(`${standardName.toUpperCase()}Metadata`, 'Contract', additionalMethods));

            if(standardName === 'psp22') {
                metadataExtension.addConstructorArg('name: Option<String>');
                metadataExtension.addConstructorArg('symbol: Option<String>');
                metadataExtension.addConstructorArg('decimal: u8');

                metadataExtension.addConstructorAction('_instance.metadata.name = name;');
                metadataExtension.addConstructorAction('_instance.metadata.symbol = symbol;');
                metadataExtension.addConstructorAction('_instance.metadata.decimals = decimal;');
            }

            if(version < 'v2.1.0' && (standardName === 'psp37' || standardName === 'psp35' || standardName === 'psp1155')) {
                metadataExtension.addConstructorArg('uri: Option<String>');
                metadataExtension.addConstructorAction('_instance.metadata.uri = uri;');
            }

            if(standardName === 'psp34') {
                metadataExtension.addConstructorAction('let collection_id = _instance.collection_id();');
                metadataExtension.addConstructorAction('_instance._set_attribute(collection_id.clone(), String::from("name").into_bytes(), String::from("MyPSP34").into_bytes());');
                metadataExtension.addConstructorAction('_instance._set_attribute(collection_id, String::from("symbol").into_bytes(), String::from("MPSP").into_bytes());');
            }

            return metadataExtension.getExtension();
        case 'FlashMint':
            let flashMintExtension = new ExtensionBuilder();

            flashMintExtension.setName('FlashMint');
            flashMintExtension.addBrushImport(new Import(`${brushName}::contracts::${standardName}::extensions::flashmint::*`));
            flashMintExtension.setImpl(new TraitImpl(`FlashLender`, 'Contract', additionalMethods))

            return flashMintExtension.getExtension();
        case 'Wrapper':
            let wrapperExtension = new ExtensionBuilder();

            wrapperExtension.setName('Wrapper');
            wrapperExtension.addBrushImport(new Import(`${brushName}::contracts::${standardName}::extensions::wrapper::*`));

            let wrapperStorage = new StorageBuilder();
            wrapperStorage.constructDefaultStorage('Wrapper', version, standardName);
            wrapperExtension.setStorage(wrapperStorage.getStorage());

            wrapperExtension.setImpl(new TraitImpl(`${standardName.toUpperCase()}Wrapper`, 'Contract', additionalMethods));

            return wrapperExtension.getExtension();
        case 'Capped':
            let cappedExtension = new ExtensionBuilder();

            let cappedStorage = new StorageBuilder();
            cappedStorage.setName('cap');
            cappedStorage.setType('Balance');

            cappedExtension.setStorage(cappedStorage.getStorage());

            cappedExtension.setName('Capped');
            cappedExtension.addContractMethod(new Method(
                brushName,
                true,
                false,
                `#[ink(message)]`,
                'cap',
                [],
                'Balance',
                `self.cap`
            ));
            cappedExtension.addContractMethod(new Method(
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

            return cappedExtension.getExtension();
    }
}