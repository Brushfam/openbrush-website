import {Extension, Import, Storage, TraitImpl} from "./types";

export function generateExtension(extensionName, standardName, version) {

    const brushName = (version < 'v2.1.0') ? 'brush' : 'openbrush';

    switch(extensionName){
        case 'Batch':
            return new Extension(
                'Batch',
                [],
                [new Import(`${brushName}::traits::${standardName}::extensions::batch::*`)],
                null,
                new TraitImpl(`${standardName.toUpperCase()}Batch`, 'Contract', null),
            );
        case 'Burnable':
            return new Extension(
                'Burnable',
                [],
                [new Import(`${brushName}::traits::${standardName}::extensions::burnable::*`)],
                null,
                new TraitImpl(`${standardName.toUpperCase()}Burnable`, 'Contract', null),
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
                new TraitImpl('Ownable', 'Contract', null),
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
                new TraitImpl('AccessControl', 'Contract', null),
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
                new TraitImpl('AccessControlEnumerable', 'Contract', null)
            );
        case 'Mintable':
            return new Extension(
                'Mintable',
                [],
                [new Import(`${brushName}::traits::${standardName}::extensions::mintable::*`)],
                null,
                new TraitImpl(`${standardName.toUpperCase()}Mintable`, 'Contract', null),
            );
        case 'Enumerable':
            return new Extension(
                'Enumerable',
                [],
                [new Import(`${brushName}::traits::${standardName}::extensions::enumerable::*`)],
                version < 'v2.1.0' ? new Storage(
                    (version < 'v2.2.0' ? `${standardName.toUpperCase()}EnumerableStorage` : null),
                    `\t#[${version < 'v2.2.0' ? `${standardName.toUpperCase()}EnumerableStorageField` : 'storage_field'}]`,
                    'enumerable',
                    `${standardName.toUpperCase()}EnumerableData`) : null,
                new TraitImpl(`${standardName.toUpperCase()}Enumerable`, 'Contract', null),
            );
        case 'Pausable':
            return new Extension(
                'Pausable',
                [],
                [new Import(`${brushName}::contracts::pausable::*`)],
                null,
                new TraitImpl(`Pausable`, 'Contract', null),
            );
        case 'Metadata':
            return new Extension(
                'Metadata',
                [],
                [new Import(`${brushName}::traits::${standardName}::extensions::metadata::*`)],
                new Storage(
                    (version < 'v2.2.0' ? `${standardName.toUpperCase()}MetadataStorage` : null),
                    `\t#[${version < 'v2.2.0' ? `${standardName.toUpperCase()}MetadataStorageField` : 'storage_field'}]`,
                    'metadata',
                    `${version < 'v2.2.0' ? `${standardName.toUpperCase()}MetadataData` : 'metadata::Data'}`),
                new TraitImpl(`${standardName.toUpperCase()}Metadata`, 'Contract', null),
            );
        case 'FlashMint':
            return new Extension(
                'Flashmint',
                [],
                [new Import(`${brushName}::traits::${standardName}::extensions::flashmint::*`)],
                null,
                new TraitImpl(`FlashLender`, 'Contract', null),
            );
        case 'Wrapper':
            return new Extension(
                'Wrapper',
                [],
                [new Import(`${brushName}::traits::${standardName}::extensions::wrapper::*`)],
                new Storage(
                    (version < 'v2.2.0' ? `${standardName.toUpperCase()}WrapperStorage` : null),
                    `\t#[${version < 'v2.2.0' ? `${standardName.toUpperCase()}WrapperStorageField`: 'storage_field'}]`,
                    'wrapper',
                    `${version < 'v2.2.0' ? `${standardName.toUpperCase()}WrapperData` : 'wrapper::Data'}`),
                new TraitImpl(`${standardName.toUpperCase()}Wrapper`, 'Contract', null),
            );
        case 'Capped':
            return new Extension(
                'Capped',
                [new Import(`ink_prelude::string::String`)],
                [],
                new Storage(null, null, 'cap', 'Balance'),
                null,
            );
    }
}