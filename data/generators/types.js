export class Contract {
    version = "";
    brushName = "";
    standardName = "";
    inkImports = [];
    brushImports = [];
    impl = null;
    storage = null;
    extensions = [];

    constructor(version, brushName, standardName, inkImports, brushImports, impl, storage, extensions) {
        this.version = version;
        this.brushName = brushName;
        this.standardName = standardName;
        this.inkImports = inkImports;
        this.brushImports = brushImports;
        this.impl = impl;
        this.storage = storage;
        this.extensions = extensions;
    }

    collectInkImports(){
        return `${this.inkImports.map(i => (i.toString())).join("\n")}${
            (this.inkImports.length && this.extensions && this.extensions.filter(e => (e.inkImports && e.inkImports.length)).length) ? '\n': ''}${
            this.extensions ? this.extensions.filter(e => (e.inkImports && e.inkImports.length)).map(e => (`\t${e.collectInkImports()}`)).join("\n") : ""}`;
    }

    collectBrushImports() {
        return `${this.brushImports.map(i => (i.toString())).join("\n")}${
            (this.brushImports.length && this.extensions && this.extensions.filter(e => (e.brushImports && e.brushImports.length)).length) ? '\n' : ''}${
            this.extensions ? this.extensions.filter(
        e => (e.brushImports && e.brushImports.length)).map(
            e => `\t${e.collectBrushImports()}`).join("\n") : ""}`;
    }

    collectStorageDerives() {
        return `${(this.storage && this.storage.derive) ? `, ${this.storage.derive}` : ""}${
            (this.storage && this.storage.derive && this.extensions && this.extensions.filter(e => (e.storage && e.storage?.derive))).length ? ', ' : ''}${
            this.extensions ? this.extensions.filter(
            e => (e.storage && e.storage?.derive)).map(
                e => e.storage?.derive).join(", ") : ""}`;
    }

    collectStorageFields() {
        return `${(this.storage) ? this.storage.toString() : ''}${(this.storage && this.extensions && this.extensions.filter(e => e.storage).length) ? '\n': ''}${this.extensions ? this.extensions.filter(
            e => (e.storage)).map(
                e => `${e.storage.toString()}`).join("\n") : ""}`;
    }

    collectTraitImpls() {
        return `${(this.impl) ? this.impl.toString() : ''}${
            (this.impl && this.extensions && this.extensions.filter(e => e.impl).length) ? '\n' : ''}${
            this.extensions ? this.extensions.filter(
            e => (e.impl)).map(
                e => `\t${e.impl.toString()}`).join("\n") : ""}`;
    }

    toString() {
        return `#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]
        
#[${this.brushName}::contract]
pub mod my_${this.standardName} {
    // Imports from ink!
    ${this.collectInkImports()}
    
    // Imports from openbrush
    ${this.collectBrushImports()}
    
    #[ink(storage)]]
    #[derive(SpreadAllocate, Default${this.collectStorageDerives()})]
    pub struct Contract {
    ${this.collectStorageFields()}
    }
    
    ${this.collectTraitImpls()}
    
    impl Contract {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self::default()
        }
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

    constructor(name, inkImports, brushImports, storage, impl) {
        this.name = name;
        this.inkImports = inkImports;
        this.brushImports = brushImports;
        this.storage = storage;
        this.impl = impl;
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
    methods = null;

    constructor(trait_name, struct_name, methods) {
        this.traitName = trait_name;
        this.methods = methods;
    }

    toString() {
        return `impl ${this.traitName} for Contract {${this.methods ? `\n${this.methods.map(m => m.toString()).join("\n")}`: ""}}`;
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
    mutating = false;
    modifiers = [];
    name = "";
    args = [];
    return_type = null;
    body = "";

    constructor(brushName, mutating, modifiers, name, args, return_type, body) {
        this.brushName = brushName;
        this.mutating = mutating;
        this.modifiers = modifiers;
        this.name = name;
        this.args = args;
        this.return_type = return_type;
        this.body = body;
    }

    toString() {
        return `${
            this.modifiers ? `#[${this.brushName}::modifiers(${this.modifiers?.join(', ')}]` : ''}
fn ${this.name}(&${this.mutating ? 'mut' : ''} self, ${this.args?.join(', ')})${this.return_type? ` -> ${this.return_type}` : ''} {${this.body ? `\n${this.body}` : ''}}`;
    }
}
