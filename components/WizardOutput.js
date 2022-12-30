import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { useEffect, useState } from 'react'
import wizardOutput from './../styles/WizardOutput.module.scss'
import wizard from '../styles/Wizard.module.scss'
import { Contract, ContractBuilder, Import, Method, Storage, StorageBuilder, TraitImpl } from '../data/generators/types'
import { getExtensions } from '../data/generators/extensions'

const generateInkDeclaration = (version, inkVersion) => {
  let inkVersionString

  if (version < 'v1.7.0' || version === 'v3.0.0-beta') {
    inkVersionString = `git = "https://github.com/paritytech/ink"`
    if (version === 'v3.0.0-beta') {
      inkVersionString += `, commit = "4655a8b4413cb50cbc38d1b7c173ad426ab06cde"`
    } else {
      inkVersionString += `, tag = "${inkVersion}"`
    }
  } else {
    inkVersionString = `version = "${inkVersion}"`
  }

  let inkDeclaration

  if (version < 'v3.0.0-beta') {
    inkDeclaration = `ink_primitives = { ${inkVersionString}, default-features = false }
ink_metadata = { ${inkVersionString}, default-features = false, features = ["derive"], optional = true }
ink_env = { ${inkVersionString}, default-features = false }
ink_storage = { ${inkVersionString}, default-features = false }
ink_lang = { ${inkVersionString}, default-features = false }
ink_prelude = { ${inkVersionString}, default-features = false }
ink_engine = { ${inkVersionString}, default-features = false, optional = true }`
  } else {
    inkDeclaration = `ink = { ${inkVersionString}, default-features = false }`
  }

  return inkDeclaration
}

const generateCargoTomlWithVersion = (version, name, edition, inkVersion, scaleVersion, scaleInfoVersion, brushDeclaration) => {
  let inkDeclaration = generateInkDeclaration(version, inkVersion)

  return `[package]
name = "${name}"
version = "1.0.0"
edition = "${edition}"
authors = ["The best developer ever"]

[dependencies]

${inkDeclaration}

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
    ${
      version < 'v3.0.0-beta'
        ? `"ink_primitives/std",
    "ink_metadata",
    "ink_metadata/std",
    "ink_env/std",
    "ink_storage/std",
    "ink_lang/std",`
        : `"ink/std",`
    }
    "scale/std",
    "scale-info/std",

    "${version >= 'v2.0.0' ? 'openbrush' : 'brush'}/std",
]
ink-as-dependency = [] ${
    version === 'v1.3.0' ? '\n' + '[profile.dev]\n' + 'overflow-checks = false\n' + '\n' + '[profile.release]\n' + 'overflow-checks = false' : ''
  }`
}

const versionInfo = {
  'v1.3.0': {
    edition: '2018',
    inkVersion: 'v3.0.0-rc6',
    scaleVersion: '2.1',
    scaleInfoVersion: '1.0.0',
    brushDeclaration: (features) =>
      `brush = { tag = "v1.3.0", git = "https://github.com/Supercolony-net/openbrush-contracts", default-features = false, features = [${features}] }`
  },
  'v1.5.0': {
    edition: '2021',
    inkVersion: 'v3.0.0',
    scaleVersion: '3.0',
    scaleInfoVersion: '2.0.0',
    brushDeclaration: (features) =>
      `brush = { tag = "v1.5.0", git = "https://github.com/Supercolony-net/openbrush-contracts", default-features = false, features = [${features}] }`
  },
  'v1.6.0': {
    edition: '2021',
    inkVersion: 'v3.0.0',
    scaleVersion: '3.0',
    scaleInfoVersion: '2.0.0',
    brushDeclaration: (features) =>
      `brush = { tag = "v1.6.0", git = "https://github.com/Supercolony-net/openbrush-contracts", default-features = false, features = [${features}] }`
  },
  'v1.7.0': {
    edition: '2021',
    inkVersion: '3.1.0',
    scaleVersion: '3.0',
    scaleInfoVersion: '2.0.0',
    brushDeclaration: (features) =>
      `brush = { tag = "v1.7.0", git = "https://github.com/Supercolony-net/openbrush-contracts", default-features = false, features = [${features}] }`
  },
  'v2.0.0': {
    edition: '2021',
    inkVersion: '~3.2.0',
    scaleVersion: '3',
    scaleInfoVersion: '2',
    brushDeclaration: (features) => `openbrush = { version = "~2.0.0", default-features = false, features = [${features}] }`
  },
  'v2.1.0': {
    edition: '2021',
    inkVersion: '~3.3.0',
    scaleVersion: '3',
    scaleInfoVersion: '2',
    brushDeclaration: (features) => `openbrush = { version = "~2.1.0", default-features = false, features = [${features}] }`
  },
  'v2.2.0': {
    edition: '2021',
    inkVersion: '~3.3.0',
    scaleVersion: '3',
    scaleInfoVersion: '2',
    brushDeclaration: (features) => `openbrush = { version = "~2.2.0", default-features = false, features = [${features}] }`
  },
  'v2.3.0': {
    edition: '2021',
    inkVersion: '~3.4.0',
    scaleVersion: '3',
    scaleInfoVersion: '2',
    brushDeclaration: (features) =>
      `openbrush = { tag = "v2.3.0", git = "https://github.com/Supercolony-net/openbrush-contracts", default-features = false, features = [${features}] }`
  },
  'v3.0.0-beta': {
    edition: '2021',
    inkVersion: '~4.0.0-beta',
    scaleVersion: '3',
    scaleInfoVersion: '2.3',
    brushDeclaration: (features) =>
      `openbrush = { tag = "3.0.0-beta", git = "https://github.com/727-Ventures/openbrush-contracts", default-features = false, features = [${features}] }`
  }
}

export const generateCargoToml = (output, version = 'v3.0.0-beta') => {
  const versionInfoElement = versionInfo[version]

  switch (output.type) {
    case 'psp22':
      return generateCargoTomlWithVersion(
        version,
        'my_' + output.type,
        versionInfoElement.edition,
        versionInfoElement.inkVersion,
        versionInfoElement.scaleVersion,
        versionInfoElement.scaleInfoVersion,
        versionInfoElement.brushDeclaration(
          `"psp22"${output.currentControlsState.find((x) => x.name === 'Pausable').state ? `, "pausable"` : ''}${
            output.security === 'ownable' ? `, "ownable"` : ''
          }${output.security === 'access_control' || output.security === 'access_control_enumerable' ? `, "access_control"` : ''}`
        )
      )
    case 'psp37':
      return generateCargoTomlWithVersion(
        version,
        'my_' + output.type,
        versionInfoElement.edition,
        versionInfoElement.inkVersion,
        versionInfoElement.scaleVersion,
        versionInfoElement.scaleInfoVersion,
        versionInfoElement.brushDeclaration(
          `"${version < 'v2.1.0' ? 'psp1155' : version <= 'v2.2.0' ? 'psp35' : 'psp37'}"${output.security === 'ownable' ? `, "ownable"` : ''}${
            output.security === 'access_control' || output.security === 'access_control_enumerable' ? `, "access_control"` : ''
          }`
        )
      )
    case 'psp34':
      return generateCargoTomlWithVersion(
        version,
        'my_' + output.type,
        versionInfoElement.edition,
        versionInfoElement.inkVersion,
        versionInfoElement.scaleVersion,
        versionInfoElement.scaleInfoVersion,
        versionInfoElement.brushDeclaration(
          `"psp34"${output.security === 'ownable' ? `, "ownable"` : ''}${
            output.security === 'access_control' || output.security === 'access_control_enumerable' ? `, "access_control"` : ''
          }`
        )
      )
  }
}
export const generateLib = (output, version = 'v3.0.0-beta') => {
  const brushName = version >= 'v2.0.0' ? 'openbrush' : 'brush'
  const contractName = output.currentControlsState.find((x) => x.name === 'Name')?.state

  const standardName = output.type !== 'psp37' ? output.type : version < 'v2.1.0' ? 'psp1155' : version <= 'v2.2.0' ? 'psp35' : 'psp37'
  let { extensions, usesStandardExtensions } = getExtensions(output, version, standardName, brushName, contractName)

  let contract = new ContractBuilder()

  contract.setContractName(contractName)
  contract.setStandardName(standardName)
  contract.setBrushName(brushName)
  contract.setVersion(version)
  contract.setImpl(new TraitImpl(`${standardName.toUpperCase()}`, contractName, []))

  const isEnumerable = output.currentControlsState.find((x) => x.name === 'Enumerable')?.state
  let storage = new StorageBuilder()
  storage.setDerive(`${version < 'v2.2.0' ? standardName.toUpperCase() : ''}Storage`)
  storage.setField(`#[${version < 'v2.2.0' ? standardName.toUpperCase() + 'StorageField' : 'storage_field'}]`)
  storage.setName(standardName)
  storage.setType(
    (version < 'v2.2.0' ? `${standardName.toUpperCase()}Data` : `${standardName}::Data`) +
      (isEnumerable && version > 'v2.0.0' ? (version < 'v2.2.0' ? '<EnumerableBalances>' : '<Balances>') : '')
  )

  contract.setStorage(storage.getStorage())

  extensions.map((e) => {
    contract.addExtension(e)
  })

  const isPausable = output.currentControlsState.find((x) => x.name === 'Pausable')?.state
  const isCapped = output.currentControlsState.find((x) => x.name === 'Capped')?.state

  if (isCapped || isPausable) {
    contract.addBrushImport(
      new Import(
        `${brushName}::contracts::${standardName}::${version < 'v2.2.0' ? standardName.toUpperCase() : ''}${
          version < 'v1.6.0' ? 'Internal' : 'Transfer'
        }`
      )
    )
    contract.addAdditionalImpl(
      new TraitImpl(`${version < 'v2.2.0' ? standardName.toUpperCase() : ''}${version < 'v1.6.0' ? 'Internal' : 'Transfer'}`, 'Contract', [
        new Method(
          brushName,
          false,
          true,
          isPausable ? `#[${brushName}::modifiers(when_not_paused)]` : null,
          '_before_token_transfer',
          ['_from: Option<&AccountId>', '_to: Option<&AccountId>', '_amount: &Balance'],
          `Result<(), ${standardName.toUpperCase()}Error>`,
          isCapped
            ? `if _from.is_none() && (self.total_supply() + _amount) > self.cap() {
                return Err(PSP22Error::Custom(String::from("Cap exceeded")))
            }
            Ok(())`
            : null
        )
      ])
    )
  }

  if (standardName === 'psp22') {
    contract.addConstructorArg('initial_supply: Balance')
    contract.addConstructorAction(
      `_instance._mint${version < 'v2.3.0' ? '' : '_to'}(_instance.env().caller(), initial_supply).expect("Should mint"); `
    )
  }

  if (isCapped || output.currentControlsState.find((x) => x.name === 'Metadata')?.state) {
    if (version < 'v2.3.0') contract.addInkImport(new Import(`ink${version < 'v3.0.0-beta' ? '_' : '::'}prelude::string::String`))
    else {
      contract.addBrushImport(new Import(`${brushName}::traits::String`))
    }
  }

  if (
    output.security &&
    output.type === 'psp37' &&
    (output.currentControlsState.find((x) => x.name === 'Mintable')?.state || output.currentControlsState.find((x) => x.name === 'Burnable')?.state)
  ) {
    contract.addInkImport(new Import(`ink${version < 'v3.0.0-beta' ? '_' : '::'}prelude::vec::Vec`))
  }

  if (version > 'v1.3.0' && version < 'v3.0.0-beta')
    contract.addInkImport(new Import(`ink${version < 'v3.0.0-beta' ? '_' : '::'}storage::traits::SpreadAllocate`))

  if (!usesStandardExtensions) {
    contract.addBrushImport(new Import(`${brushName}::contracts::${standardName}::*`))
  }

  if (version > 'v2.1.0') contract.addBrushImport(new Import(`${brushName}::traits::Storage`))

  return contract.getContract().toString()
}

const WizardOutput = ({ data }) => {
  const [output, setOutPut] = useState(data)
  const [selectedTab, setSelectedTab] = useState('rust')

  useEffect(() => {
    setOutPut(data)
  }, [data, output])

  if (output)
    switch (output.type) {
      case 'psp22':
        return (
          <div>
            <div className={wizardOutput.tabsSwitch}>
              <div onClick={() => setSelectedTab('rust')} className={selectedTab === 'rust' ? wizardOutput.activeTab : ''}>
                lib.rs
              </div>
              <div onClick={() => setSelectedTab('toml')} className={selectedTab === 'toml' ? wizardOutput.activeTab : ''}>
                Cargo.toml
              </div>
            </div>
            <div className={wizardOutput.mainContent}>
              {
                <div
                  className={wizard.copyToClipboard}
                  onClick={() => {
                    selectedTab == 'rust'
                      ? navigator.clipboard.writeText(generateLib(output, output.version))
                      : navigator.clipboard.writeText(generateCargoToml(output, output.version))
                  }}
                >
                  <img className={wizard.copyIcon} src="/icons/copy.svg" alt="logo" />
                </div>
              }
              {selectedTab === 'rust' ? (
                <SyntaxHighlighter language="rust" wrapLongLines={true} style={vscDarkPlus}>
                  {generateLib(output, output.version)}
                </SyntaxHighlighter>
              ) : (
                <SyntaxHighlighter language="toml" wrapLongLines={true} style={vscDarkPlus}>
                  {generateCargoToml(output, output.version)}
                </SyntaxHighlighter>
              )}
            </div>
          </div>
        )
      case 'psp37':
        return (
          <div>
            <div className={wizardOutput.tabsSwitch}>
              <div onClick={() => setSelectedTab('rust')} className={selectedTab === 'rust' ? wizardOutput.activeTab : ''}>
                lib.rs
              </div>
              <div onClick={() => setSelectedTab('toml')} className={selectedTab === 'toml' ? wizardOutput.activeTab : ''}>
                Cargo.toml
              </div>
            </div>
            <div className={wizardOutput.mainContent}>
              {
                <div
                  className={wizard.copyToClipboard}
                  onClick={() => {
                    selectedTab == 'rust'
                      ? navigator.clipboard.writeText(generateLib(output, output.version))
                      : navigator.clipboard.writeText(generateCargoToml(output, output.version))
                  }}
                >
                  <img className={wizard.copyIcon} src="/icons/copy.svg" alt="logo" />
                </div>
              }
              {selectedTab === 'rust' ? (
                <SyntaxHighlighter language="rust" wrapLongLines={true} style={vscDarkPlus}>
                  {generateLib(output, output.version)}
                </SyntaxHighlighter>
              ) : (
                <SyntaxHighlighter language="toml" wrapLongLines={true} style={vscDarkPlus}>
                  {generateCargoToml(output, output.version)}
                </SyntaxHighlighter>
              )}
            </div>
          </div>
        )
      case 'psp34':
        return (
          <>
            <div>
              <div className={wizardOutput.tabsSwitch}>
                <div onClick={() => setSelectedTab('rust')} className={selectedTab === 'rust' ? wizardOutput.activeTab : ''}>
                  lib.rs
                </div>
                <div onClick={() => setSelectedTab('toml')} className={selectedTab === 'toml' ? wizardOutput.activeTab : ''}>
                  Cargo.toml
                </div>
              </div>
              <div className={wizardOutput.mainContent}>
                {
                  <div
                    className={wizard.copyToClipboard}
                    onClick={() => {
                      selectedTab == 'rust'
                        ? navigator.clipboard.writeText(generateLib(output, output.version))
                        : navigator.clipboard.writeText(generateCargoToml(output, output.version))
                    }}
                  >
                    <img className={wizard.copyIcon} src="/icons/copy.svg" alt="logo" />
                  </div>
                }
                {selectedTab === 'rust' ? (
                  <SyntaxHighlighter language="rust" wrapLongLines={true} style={vscDarkPlus}>
                    {generateLib(output, output.version)}
                  </SyntaxHighlighter>
                ) : (
                  <SyntaxHighlighter language="toml" wrapLongLines={true} style={vscDarkPlus}>
                    {generateCargoToml(output, output.version)}
                  </SyntaxHighlighter>
                )}
              </div>
            </div>
          </>
        )
      default:
        return <></>
    }
  return <></>
}

export default WizardOutput
