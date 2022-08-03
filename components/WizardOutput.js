import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import {useEffect, useState} from "react";
import wizardOutput from "./../styles/WizardOutput.module.scss";
import wizard from "../styles/Wizard.module.scss";
import {Contract, Extension, Import, Method, Storage, TraitImpl} from "../data/generators/types";
import {generateExtension} from "../data/generators/extensions";

const generateCargoTomlWithVersion = (
    version,
    name,
    edition,
    inkVersion,
    scaleVersion,
    scaleInfoVersion,
    brushDeclaration
) => {
    const inkVersionString = `${version < 'v1.7.0' ? `tag = "${inkVersion}", git = "https://github.com/paritytech/ink"` : `version = "${inkVersion}"` }`;
    return `[package]
name = "${name}"
version = "1.0.0"
edition = "${edition}"
authors = ["The best developer ever"]

[dependencies]
ink_primitives = { ${inkVersionString}, default-features = false }
ink_metadata = { ${inkVersionString}, default-features = false, features = ["derive"], optional = true }
ink_env = { ${inkVersionString}, default-features = false }
ink_storage = { ${inkVersionString}, default-features = false }
ink_lang = { ${inkVersionString}, default-features = false }
ink_prelude = { ${inkVersionString}, default-features = false }
ink_engine = { ${inkVersionString}, default-features = false, optional = true }

scale = { package = "parity-scale-codec", version = "${scaleVersion}", default-features = false, features = ["derive"] }
scale-info = { version = "${scaleInfoVersion}", default-features = false, features = ["derive"], optional = true }

# Include brush as a dependency and enable default implementation for PSP22 via brush feature
${brushDeclaration}

[lib]
name = "${name}"
path = "lib.rs"
crate-type = [
    # Used for normal contract Wasm blobs.
    "cdylib",
]

[features]
default = ["std"]
std = [
    "ink_primitives/std",
    "ink_metadata",
    "ink_metadata/std",
    "ink_env/std",
    "ink_storage/std",
    "ink_lang/std",
    "scale/std",
    "scale-info",
    "scale-info/std",

    "${version >= 'v2.0.0' ? 'openbrush' : 'brush'}/std",
]
ink-as-dependency = [] ${version == 'v1.3.0' ? '\n' +
        '[profile.dev]\n' +
        'overflow-checks = false\n' +
        '\n' +
        '[profile.release]\n' +
        'overflow-checks = false' : ''}`
}

const versionInfo = {
    'v1.3.0': {
        edition: '2018',
        inkVersion: 'v3.0.0-rc6',
        scaleVersion: '2.1',
        scaleInfoVersion: '1.0.0',
        brushDeclaration:
            (features) => `brush = { tag = "v1.3.0", git = "https://github.com/Supercolony-net/openbrush-contracts", default-features = false, features = [${features}] }`,
    },
    'v1.5.0': {
        edition: '2021',
        inkVersion: 'v3.0.0',
        scaleVersion: '3.0',
        scaleInfoVersion: '2.0.0',
        brushDeclaration:
            (features) => `brush = { tag = "v1.5.0", git = "https://github.com/Supercolony-net/openbrush-contracts", default-features = false, features = [${features}] }`,
    },
    'v1.6.0': {
        edition: '2021',
        inkVersion: 'v3.0.0',
        scaleVersion: '3.0',
        scaleInfoVersion: '2.0.0',
        brushDeclaration:
            (features) => `brush = { tag = "v1.6.0", git = "https://github.com/Supercolony-net/openbrush-contracts", default-features = false, features = [${features}] }`,
    },
    'v1.7.0': {
        edition: '2021',
        inkVersion: '3.1.0',
        scaleVersion: '3.0',
        scaleInfoVersion: '2.0.0',
        brushDeclaration:
            (features) => `brush = { tag = "v1.7.0", git = "https://github.com/Supercolony-net/openbrush-contracts", default-features = false, features = [${features}] }`,
    },
    'v2.0.0': {
        edition: '2021',
        inkVersion: '~3.2.0',
        scaleVersion: '3',
        scaleInfoVersion: '2',
        brushDeclaration:
            (features) => `openbrush = { version = "~2.0.0", default-features = false, features = [${features}] }`,
    },
    'v2.1.0': {
        edition: '2021',
        inkVersion: '~3.3.0',
        scaleVersion: '3',
        scaleInfoVersion: '2',
        brushDeclaration:
            (features) => `openbrush = { version = "~2.1.0", default-features = false, features = [${features}] }`,
    },
    'v2.2.0': {
        edition: '2021',
        inkVersion: '~3.3.0',
        scaleVersion: '3',
        scaleInfoVersion: '2',
        brushDeclaration:
            (features) => `openbrush = { version = "~2.2.0", default-features = false, features = [${features}] }`,
    }
}

export const generateCargoToml = (output, version='v2.2.0') => {
    const versionInfoElement = versionInfo[version];

    switch (output.type) {
        case 'psp22':
            return generateCargoTomlWithVersion(
                version,
                "my_" + output.type,
                versionInfoElement.edition,
                versionInfoElement.inkVersion,
                versionInfoElement.scaleVersion,
                versionInfoElement.scaleInfoVersion,
                versionInfoElement.brushDeclaration(`"psp22"${
                    output.currentControlsState.find(x => x.name === 'Pausable').state ? `, "pausable"` : ''}${
                    output.security === "ownable" ? `, "ownable"` : ''}${
                    output.security === "access_control" ? `, "access_control"` : ''}`)
            );
        case 'psp37':
            return generateCargoTomlWithVersion(
                version,
                "my_" + output.type,
                versionInfoElement.edition,
                versionInfoElement.inkVersion,
                versionInfoElement.scaleVersion,
                versionInfoElement.scaleInfoVersion,
                versionInfoElement.brushDeclaration(`"${version < 'v2.1.0' ? 'psp1155' : (version <= 'v2.2.0' ? 'psp35' : 'psp37')}"${output.security === "ownable" ? `, "ownable"` : ''}${output.security === "access_control" ? `, "access_control"` : ''}`)
            );
        case 'psp34':
            return generateCargoTomlWithVersion(
                version,
                "my_" + output.type,
                versionInfoElement.edition,
                versionInfoElement.inkVersion,
                versionInfoElement.scaleVersion,
                versionInfoElement.scaleInfoVersion,
                versionInfoElement.brushDeclaration(`"psp34"${output.security === "ownable" ? `, "ownable"` : ''}${output.security === "access_control" ? `, "access_control"` : ''}`)
            );
    }
}
export const generateLib = (output, version='v2.2.0') => {
    const brushName = version >= 'v2.0.0' ? 'openbrush' : 'brush';

    const standardName = output.type !== 'psp37' ? output.type : (version < 'v2.1.0' ? 'psp1155' : (version <= 'v2.2.0' ? 'psp35' : 'psp37'));

    let extensions = [];
    let additionalImpls = [];
    let constructorArgs = [];
    let constructorActions = [];

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
        extensions.push(new Extension('', [], [], null, new TraitImpl('AccessControl', 'Contract', []), [], [], []));
        extensions.push(generateExtension('access_control_enumerable', standardName, version, output.security,[]));
    }

    // Batch extension
    if(output.currentControlsState.find(x => x.name === 'Batch')?.state) {
        extensions.push(generateExtension('Batch', standardName, version, output.security,[]));
    }
    // Burnable extension
    if(output.currentControlsState.find(x => x.name === 'Burnable')?.state) {
        extensions.push(generateExtension('Burnable', standardName, version, output.security, []));
    }
    // Mintable extension
    if(output.currentControlsState.find(x => x.name === 'Mintable')?.state) {
        extensions.push(generateExtension('Mintable', standardName, version, output.security, []));
    }
    // Enumerable extension psp34 > v1.5.0
    if(output.currentControlsState.find(x => x.name === 'Enumerable')?.state) {
        extensions.push(generateExtension('Enumerable', standardName, version, output.security, []));
    }
    // Pausable extension
    if(output.currentControlsState.find(x => x.name === 'Pausable')?.state) {
        extensions.push(generateExtension('Pausable', standardName, version, output.security,[]));
    }
    // Metadata extension
    if(output.currentControlsState.find(x => x.name === 'Metadata')?.state) {
        extensions.push(generateExtension('Metadata', standardName, version, output.security,[]));
    }
    // Flashmint extension
    if(output.currentControlsState.find(x => x.name === 'FlashMint')?.state) {
        extensions.push(generateExtension('FlashMint', standardName, version, output.security,[]));
    }
    // Wrapper extension
    if(output.currentControlsState.find(x => x.name ==='Wrapper')?.state) {
        extensions.push(generateExtension('Wrapper', standardName, version, output.security,[]));
    }
    // Capped extension
    if(output.currentControlsState.find(x => x.name === 'Capped')?.state) {
        extensions.push(generateExtension('Capped', standardName, version, output.security,[]));
    }

    const isPausable = output.currentControlsState.find(x => x.name === 'Pausable')?.state;
    const isCapped = output.currentControlsState.find(x => x.name === 'Capped')?.state;

    if(isCapped || isPausable) {
        additionalImpls.push(new TraitImpl(`${standardName.toUpperCase()}${version < 'v1.6.0'? 'Internal' : 'Transfer'}`, 'Contract', [new Method(
            brushName,
            false,
            true,
            isPausable ? `#[${brushName}::modifiers(when_not_paused)]` : null,
            '_before_token_transfer',
            ['_from: Option<&AccountId>', '_to: Option<&AccountId>', '_amount: &Balance'],
            `Result<(), ${standardName.toUpperCase()}Error>`,
            isCapped ? `if _from.is_none() && (self.total_supply() + _amount) > self.cap() {
                return Err(PSP22Error::Custom(String::from("Cap exceeded")))
            }
            Ok(())` : null
            )]));
    }

    if(standardName === 'psp22') {
        constructorArgs.push('initial_supply: Balance');
        constructorActions.push(`_instance._mint(_instance.env().caller(), initial_supply).expect("Should mint"); `);
    }

    let inkImports = [];

    if(isCapped || output.currentControlsState.find(x => x.name === 'Metadata')?.state) {
        inkImports.push(new Import('ink_prelude::string::String'));
    }

    if(output.security && output.type === 'psp37' && (output.currentControlsState.find(x => x.name === 'Mintable')?.state || output.currentControlsState.find(x => x.name === 'Burnable')?.state)) {
        inkImports.push(new Import('ink_prelude::vec::Vec'));
    }

    if(version > 'v1.3.0') inkImports.push(new Import('ink_storage::traits::SpreadAllocate'));

    return new Contract(
        version,
        brushName,
        standardName,
        inkImports,
        [new Import(`${brushName}::contracts::${standardName}::*`)],
        new TraitImpl(`${standardName.toUpperCase()}`, 'Contract', []),
        additionalImpls,
        new Storage(
            `${version < 'v2.2.0' ? `${standardName.toUpperCase()}Storage` : 'Storage'}`,
            `#[${version < 'v2.2.0' ? `${standardName.toUpperCase()}StorageField` : 'storage_field'}]`,
            standardName,
            `${version < 'v2.2.0' ? `${standardName.toUpperCase()}Data` : `${standardName}::Data`}${version >= 'v2.1.0'  && output.currentControlsState.find(x => x.name === 'Enumerable')?.state ? (version === 'v2.1.0' ? '<EnumerableData>' : '<enumerable::Data>') : ''}`),
        extensions,
        constructorArgs,
        constructorActions
    ).toString();
}

const WizardOutput = ({data}) => {
    const [output, setOutPut] = useState(data)
    const [selectedTab, setSelectedTab] = useState('rust')

    useEffect(() => {
        setOutPut(data);
    }, [data, output])

    if (output)
     switch (output.type) {
        case 'psp22':
            return (
                <div>
                    <div className={wizardOutput.tabsSwitch}>
                        <div onClick={() => setSelectedTab('rust')} className={ selectedTab === 'rust' ? wizardOutput.activeTab : ''}>lib.rs</div>
                        <div onClick={() => setSelectedTab('toml')} className={ selectedTab === 'toml' ? wizardOutput.activeTab : ''}>Cargo.toml</div>
                    </div>
                    <div className={wizardOutput.mainContent}>
                        {
                            <div className={wizard.copyToClipboard}
                                 onClick={() => {
                                     selectedTab == 'rust' ? navigator.clipboard.writeText(generateLib(output, output.version)) : navigator.clipboard.writeText(generateCargoToml(output, output.version))
                                 }}
                            >
                                <img
                                    className={wizard.copyIcon}
                                    src="/icons/copy.svg"
                                    alt="logo"
                                />
                            </div>
                        }
                        {
                            selectedTab === 'rust' ?
                             (<SyntaxHighlighter language="rust" wrapLongLines={true} style={vscDarkPlus}>
                                {generateLib(output, output.version)}
                            </SyntaxHighlighter>) :
                             (<SyntaxHighlighter language="toml" wrapLongLines={true} style={vscDarkPlus}>
                                {generateCargoToml(output, output.version)}
                            </SyntaxHighlighter>)
                        }
                    </div>
                </div>
            )        
        case 'psp37':
            return (
                <div>
                    <div className={wizardOutput.tabsSwitch}>
                        <div onClick={() => setSelectedTab('rust')} className={ selectedTab === 'rust' ? wizardOutput.activeTab : ''}>lib.rs</div>
                        <div onClick={() => setSelectedTab('toml')} className={ selectedTab === 'toml' ? wizardOutput.activeTab : ''}>Cargo.toml</div>
                    </div>
                    <div className={wizardOutput.mainContent}>
                        {
                            <div className={wizard.copyToClipboard}
                            onClick={() => {
                                selectedTab == 'rust' ? navigator.clipboard.writeText(generateLib(output, output.version)) : navigator.clipboard.writeText(generateCargoToml(output, output.version))
                            }}
                            >
                            <img
                            className={wizard.copyIcon}
                            src="/icons/copy.svg"
                            alt="logo"
                            />
                            </div>
                        }
                        {
                            selectedTab === 'rust' ?
                                (<SyntaxHighlighter language="rust" wrapLongLines={true} style={vscDarkPlus}>
                                    {generateLib(output, output.version)}
                                </SyntaxHighlighter>) :
                                (<SyntaxHighlighter language="toml" wrapLongLines={true} style={vscDarkPlus}>
                                    {generateCargoToml(output, output.version)}
                                </SyntaxHighlighter>)
                        }
                    </div>
                </div>)
        case 'psp34':
            return (<>
                <div>
                    <div className={wizardOutput.tabsSwitch}>
                        <div onClick={() => setSelectedTab('rust')} className={ selectedTab === 'rust' ? wizardOutput.activeTab : ''}>lib.rs</div>
                        <div onClick={() => setSelectedTab('toml')} className={ selectedTab === 'toml' ? wizardOutput.activeTab : ''}>Cargo.toml</div>
                    </div>
                    <div className={wizardOutput.mainContent}>
                        {
                            <div className={wizard.copyToClipboard}
                                 onClick={() => {
                                     selectedTab == 'rust' ? navigator.clipboard.writeText(generateLib(output, output.version)) : navigator.clipboard.writeText(generateCargoToml(output, output.version))
                                 }}
                            >
                                <img
                                    className={wizard.copyIcon}
                                    src="/icons/copy.svg"
                                    alt="logo"
                                />
                            </div>
                        }
                        {
                            selectedTab === 'rust' ?
                                (<SyntaxHighlighter language='rust' wrapLongLines={true} style={vscDarkPlus}>
                                        {generateLib(output, output.version)}
                                    </SyntaxHighlighter>) :
                                (<SyntaxHighlighter language="toml" wrapLongLines={true} style={vscDarkPlus}>
                                    {generateCargoToml(output, output.version)}
                                </SyntaxHighlighter>)
                        }
                    </div>
                </div>
            </>)
        default:
          return (<></>)
    }
    return (<></>)

}

export default WizardOutput;