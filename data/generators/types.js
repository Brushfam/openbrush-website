export class Contract {
    version = "";
    brushName = "";
    standardName = "";
    inkImports = [];
    brushImports = [];
    impl = null;
    additionalImpls = [];
    storage = null;
    extensions = [];
    constructorArgs = [];
    constructorActions = [];

    constructor(version, brushName, standardName, inkImports, brushImports, impl, additionalImpls, storage, extensions, constructorArgs, constructorActions) {
        this.version = version;
        this.brushName = brushName;
        this.standardName = standardName;
        this.inkImports = inkImports;
        this.brushImports = brushImports;
        this.impl = impl;
        this.additionalImpls = additionalImpls;
        this.storage = storage;
        this.extensions = extensions;
        this.constructorArgs = constructorArgs;
        this.constructorActions = constructorActions;
    }

    collectInkImports(){
        return `// imports from ink!\n${this.inkImports.map(i => ('\t' + i.toString())).join("\n")}${
            (this.inkImports.length && this.extensions && this.extensions
                .filter(e => (e.inkImports && e.inkImports.length)).length) ? '\n': ''}${
            this.extensions ? this.extensions
                .filter(e => (e.inkImports && e.inkImports.length))
                .map(e => (`\t${e.collectInkImports()}`)).join("\n") : ""}`;
    }

    collectBrushImports() {
        return `// imports from openbrush\n${this.brushImports.map(i => ('\t' + i.toString())).join("\n")}${
            (this.brushImports.length && this.extensions && this.extensions
                .filter(e => (e.brushImports && e.brushImports.length)).length) ? '\n' : ''}${
            this.extensions ? this.extensions
                .filter(e => (e.brushImports && e.brushImports.length))
                .map(e => `\t${e.collectBrushImports()}`)
                .join("\n") : ""}`;
    }

    collectStorageDerives() {
        return `${(this.storage && this.storage.derive) ? `, ${this.storage.derive}` : ""}${
            (this.storage && this.storage.derive && this.extensions && this.extensions
                .filter(e => (e.storage && e.storage?.derive))).length ? ', ' : ''}${
            this.extensions ? this.extensions
                .filter(e => (e.storage && e.storage?.derive))
                .map(e => e.storage?.derive)
                .join(", ") : ""}`;
    }

    collectStorageFields() {
        return `${(this.storage) ? this.storage.toString() : ''}${(this.storage && this.extensions && this.extensions
            .filter(e => e.storage).length) ? '\n': ''}${
            this.extensions ? this.extensions
                .filter(e => (e.storage))
                .map(e => `${e.storage.toString()}`)
                .join("\n") : ""}`;
    }

    collectTraitImpls() {
        return `// Section contains default implementation without any modifications\n\t${
            (this.impl) ? this.impl.toString() : ''}${
            (this.impl && this.extensions && this.extensions
                .filter(e => e.impl).length) ? '\n' : ''}${
            this.extensions ? this.extensions
                .filter(e => (e.impl))
                .map(e => `\t${e.impl.toString()}`)
                .join("\n") : ""}`;
    }

    collectAdditionalImpls() {
        return `${this.additionalImpls.length ? `\n\n\t${this.additionalImpls
            .map(e => (e.toString())).join("\n")}` : ''}`;
    }

    collectConstructorArgs() {
        return `${this.constructorArgs.join(', ')}${
            this.constructorArgs.length && this.extensions
                .filter(e => e.constructorArgs.length).length ? ', ' : ''}${
            this.extensions
                .filter(e => e.constructorArgs.length)
                .map(e => e.constructorArgs
                    .join(', '))
                .join(', ')}`;
    }

    collectConstructorActions() {
        return `${
            this.constructorActions.length ? '\n\t\t\t' + (this.version === 'v1.3.0' ? '' : '\t') + this.constructorActions.join("\n\t\t\t\t") : ''}${this.extensions && this.extensions
                .filter(e => e.constructorActions.length).length ?
                `\n${this.extensions
                    .filter(e => e.constructorActions.length)
                    .map(e => `${e.constructorActions
                        .map(a => `${this.version === 'v1.3.0' ? '' : '\t'}\t\t\t${a}`)
                        .join("\n")}`)
                    .join("\n")}` : ""}`;
    }

    collectContractMethods() {
        return `${this.extensions && this.extensions.filter(e => e.contractMethods.length).length ? '\n\n' : ''}${this.extensions ? this.extensions
            .filter(e => e.contractMethods.length)
            .map(e => `${e.contractMethods.map(m => m.toString()).join("\n\n")}`)
            .join("\n\n") : ""}`;
    }

    toString() {
        return `#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]
        
#[${this.brushName}::contract]
pub mod my_${this.standardName} {
    ${this.collectInkImports()}
    
    ${this.collectBrushImports()}
    
    #[ink(storage)]
    #[derive(Default${this.version === 'v1.3.0' ? '' : ', SpreadAllocate'}${this.collectStorageDerives()})]
    pub struct Contract {
    ${this.collectStorageFields()}
    }${this.extensions.find(e => (e.name === 'AccessControl' || e.name === 'AccessControlEnumerable')) !== undefined ? '\n\n\tconst MANAGER: RoleType = ink_lang::selector_id!("MANAGER");' : ''}
    
    ${this.collectTraitImpls()}${this.collectAdditionalImpls()}
    
    impl Contract {
        #[ink(constructor)]
        pub fn new(${this.collectConstructorArgs()}) -> Self {
            ${this.version === 'v1.3.0' ?
            'let mut _instance = Self::default();' :
            'ink_lang::codegen::initialize_contract(|_instance: &mut Contract|{'}${this.collectConstructorActions()}${
            this.version > 'v1.3.0' ? '\n\t\t\t})' : '\n\t\t\t_instance'}
        }${this.collectContractMethods()}
    }
}`;
    }
}

export class Extension {
    name = "";
    inkImports = [];
    brushImports = [];
    storage = null;
    impl = null;
    constructorArgs = [];
    constructorActions = [];
    contractMethods = [];

    constructor(name, inkImports, brushImports, storage, impl, constructorArgs, constructorActions, contractMethods) {
        this.name = name;
        this.inkImports = inkImports;
        this.brushImports = brushImports;
        this.storage = storage;
        this.impl = impl;
        this.constructorArgs = constructorArgs;
        this.constructorActions = constructorActions;
        this.contractMethods = contractMethods;
    }

    collectInkImports() {
       return `${this.inkImports.map(i => (i.toString())).join("\n")}`;
    }

    collectBrushImports() {
        return `${this.brushImports.map(i => (i.toString())).join("\n")}`;
    }
}

export class Import {
    path = null;

    constructor(path) {
        this.path = path;
    }

    toString() {
        return `use ${this.path};`;
    }
}

export class TraitImpl {
    traitName = "";
    methods = [];

    constructor(trait_name, struct_name, methods) {
        this.traitName = trait_name;
        this.methods = methods;
    }

    toString() {
        return `impl ${this.traitName} for Contract {${this.methods.length ? `\n${this.methods.map(m => m.toString()).join("\n")}\n\t`: ""}}`;
    }
}

export class Storage {
    derive = "";
    field = "";
    name = "";
    type = "";

    constructor(derive, field, name, type) {
        this.derive = derive;
        this.field = field;
        this.name = name;
        this.type = type;
    }

    toString() {
        return `${this.field ? `\t${this.field}\n` : ''}\t\t${this.name}: ${this.type},`;
    }
}

export class Method {
    brushName = "";
    isPublic = false;
    mutating = false;
    derives = null;
    name = "";
    args = [];
    return_type = null;
    body = "";

    constructor(brushName, isPublic, mutating, derives, name, args, return_type, body) {
        this.brushName = brushName;
        this.isPublic = isPublic;
        this.mutating = mutating;
        this.derives = derives;
        this.name = name;
        this.args = args;
        this.return_type = return_type;
        this.body = body;
    }

    toString() {
        let result = '';

        result += `${this.derives ? `\t\t${this.derives}\n` : ''}`;

        if(this.args.length < 2) {
            result += `\t\t${this.isPublic ? 'pub ' : ''}fn ${this.name}(&${this.mutating ? 'mut ' : ''}self${this.args.length ? ', ' : ''}${this.args.map(a => a.toString()).join(', ')})${this.return_type? ` -> ${this.return_type}` : ''} {`;
        }
        else {
            result += `\t\t${this.isPublic ? 'pub ' : ''}fn ${this.name}(
            &${this.mutating ? 'mut ' : ''}self,
            ${this.args.map(a => a.toString()).join(',\n\t\t\t')}
        )${this.return_type? ` -> ${this.return_type}` : ''} {`;
        }

        result += `${this.body ? `\n\t\t\t${this.body}\n\t\t}` : '}'}`;

        return result;
    }


}
