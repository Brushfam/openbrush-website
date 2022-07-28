import * as Handlebars from "handlebars";

export function generateMethod(method) {
    let template = fs.readFileSync("./data/generators/method.hbs").toString()
    const generateForTemplate = Handlebars.compile(template);
    return generateForTemplate(method);
}

export function generateTraitImpl(traitImpl) {
    let template = fs.readFileSync("./data/generators/trait_impl.hbs").toString()
    const generateForTemplate = Handlebars.compile(template);
    return generateForTemplate(traitImpl);
}
export function generateContract() {}

Handlebars.registerHelper("generateMethod", generateMethod);
Handlebars.registerHelper("generateTraitImpl", generateTraitImpl);