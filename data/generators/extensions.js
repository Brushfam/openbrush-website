import {Extension, Import, Storage, TraitImpl} from "./types";

export function generateExtension(extensionName, standardName, version) {

    const brushName = (version < 'v2.1.0') ? 'brush' : 'openbrush';

    switch(extensionName){
        case 'Batch':
            return new Extension(
                'Batch',
                true,
                [],
                [new Import(`${brushName}::traits::${standardName}::extensions::batch::*`)],
                null,
                new TraitImpl(`${standardName.toUpperCase()}Batch`, 'Contract', null),
            );
        case 'Burnable':
            return new Extension(
                'Burnable',
                true,
                [],
                [new Import(`${brushName}::traits::${standardName}::extensions::burnable::*`)],
                null,
                new TraitImpl(`${standardName.toUpperCase()}Burnable`, 'Contract', null),
            );
        case 'ownable':
            return new Extension(
                'Ownable',
                false,
                [],
                [new Import(`${brushName}::contracts::ownable::*`)],
                new Storage(`OwnableStorage`, `\t#[OwnableStorageField]`, 'ownable', 'OwnableData'),
                new TraitImpl('Ownable', 'Contract', null),
            );
        case 'access_control':
            return new Extension(
                'AccessControl',
                false,
                [],
                [new Import(`${brushName}::contracts::access_control::*`)],
                new Storage(`AccessControlStorage`, `\t#[AccessControlStorageField]`, 'access_control', 'AccessControlData'),
                new TraitImpl('AccessControl', 'Contract', null),
            );
        case 'Mintable':
            return new Extension(
                'Mintable',
                true,
                [],
                [new Import(`${brushName}::traits::${standardName}::extensions::mintable::*`)],
                null,
                new TraitImpl(`${standardName.toUpperCase()}Mintable`, 'Contract', null),
            );
        case 'Enumerable':
            return new Extension(
                'Enumerable',
                true,
                [],
                [new Import(`${brushName}::traits::${standardName}::extensions::enumerable::*`)],
                new Storage(`${standardName.toUpperCase()}EnumerableStorage`, `\t#[${standardName.toUpperCase()}EnumerableStorageField]`, 'enumerable', `${standardName.toUpperCase()}EnumerableData`),
                new TraitImpl(`${standardName.toUpperCase()}Enumerable`, 'Contract', null),
            );
        case 'Pausable':
            return new Extension(
                'Pausable',
                false,
                [],
                [new Import(`${brushName}::contracts::pausable::*`)],
                null,
                new TraitImpl(`Pausable`, 'Contract', null),
            );
        case 'Metadata':
            return new Extension(
                'Metadata',
                true,
                [],
                [new Import(`${brushName}::traits::${standardName}::extensions::metadata::*`)],
                new Storage(`${standardName.toUpperCase()}MetadataStorage`, `\t#[${standardName.toUpperCase()}MetadataStorageField]`, 'metadata', `${standardName.toUpperCase()}MetadataData`),
                new TraitImpl(`${standardName.toUpperCase()}Metadata`, 'Contract', null),
            );
        case 'FlashMint':
            return new Extension(
                'Flashmint',
                true,
                [],
                [new Import(`${brushName}::traits::${standardName}::extensions::flashmint::*`)],
                null,
                new TraitImpl(`FlashLender`, 'Contract', null),
            );
        case 'Wrapper':
            return new Extension(
                'Wrapper',
                true,
                [],
                [new Import(`${brushName}::traits::${standardName}::extensions::wrapper::*`)],
                new Storage(`${standardName.toUpperCase()}WrapperStorage`, `\t#[${standardName.toUpperCase()}WrapperStorageField]`, 'wrapper', `${standardName.toUpperCase()}WrapperData`),
                new TraitImpl(`${standardName.toUpperCase()}Wrapper`, 'Contract', null),
            );
        case 'Capped':
            return new Extension(
                'Capped',
                true,
                [new Import(`ink_prelude::string::String`)],
                [],
                new Storage(null, null, 'cap', 'Balance'),
                null,
                null,
            );
    }
}