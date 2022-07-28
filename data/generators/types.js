export class Contract {
    brushName = "";
    standardName = "";
    impl = null;
    storage = null;
    extensions = [];

    constructor(name, extensions) {
        this.name = name;
        this.extensions = extensions;
    }
}

export class Extension {
    name = "";
    standardExtension = false;
    import = null;
    inkImports = null;
    storage = null;
    impl = null;
    constructorArgs = "";
    consructorActions = "";
    additionalMethods = null;
}

export class TraitImpl {
    trait_name = "";
    struct_name = "";
    methods = [];
}

export class Storage {
    derive = "";
    field = "";
    name = "";
    type = "";
}

export class Method {
    modifiers = [];
    name = "";
    args = [];
    return_type = "";
    body = "";
}
