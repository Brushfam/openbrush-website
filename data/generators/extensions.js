import {Extension, Import, Storage, TraitImpl} from "./types";

export function generateExtension(extensionName, standardName, version, additionalMethods) {

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
                [],
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
                [],
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
                [],
                []
            );
        case 'Mintable':
            constructorActions = [];

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
                null,
                new TraitImpl(`Pausable`, 'Contract', additionalMethods),
                [],
                [],
                []
            );
        case 'Metadata':
            constructorArgs = [];
            constructorActions = [];

            if(standardName === 'psp22') {
                constructorArgs.push('name: Option<String>');
                constructorArgs.push('symbol: Option<String>');
                constructorArgs.push('decimal: u8');

                constructorActions.push('_instance.metadata.name = name;');
                constructorActions.push('_instance.metadata.symbol = symbol;');
                constructorActions.push('_instance.metadata.decimal = decimal;');
            }

            if(version < 'v2.1.0' && standardName === 'psp37' || standardName === 'psp35' || standardName === 'psp1155') {
                constructorArgs.push('uri: Option<String>');
                constructorActions.push('_instance.metadata.uri = uri;');
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
            return new Extension(
                'Capped',
                [new Import(`ink_prelude::string::String`)],
                [],
                new Storage(null, null, 'cap', 'Balance'),
                null,
                [],
                [],
                []
            );
    }
}