import { ExtensionBuilder, Import, Method, StorageBuilder, TraitImpl } from './types'

export function getExtensions(output, version, standardName, brushName, contractName) {
  let extensions = []
  let usesStandardExtensions = false

  // Ownable extension
  if (output.security === 'ownable') {
    extensions.push(generateExtension('ownable', standardName, contractName, version, output.security, []))
  }
  // AccessControl extension
  if (output.security === 'access_control') {
    extensions.push(generateExtension('access_control', standardName, contractName, version, output.security, []))
  }
  // AccessControlEnumerable extension
  if (output.security === 'access_control_enumerable') {
    let extension = new ExtensionBuilder()
    extension.addBrushImport(new Import(`${brushName}::contracts::access_control::only_role`))
    extension.setImpl(new TraitImpl('AccessControl', contractName, []))

    extensions.push(extension.getExtension())
    extensions.push(generateExtension('access_control_enumerable', standardName, contractName, version, output.security, []))

    usesStandardExtensions = true
  }

  // Batch extension
  if (output.currentControlsState.find((x) => x.name === 'Batch')?.state) {
    extensions.push(generateExtension('Batch', standardName, contractName, version, output.security, []))

    usesStandardExtensions = true
  }
  // Burnable extension
  if (output.currentControlsState.find((x) => x.name === 'Burnable')?.state) {
    extensions.push(generateExtension('Burnable', standardName, contractName, version, output.security, []))

    usesStandardExtensions = true
  }
  // Mintable extension
  if (output.currentControlsState.find((x) => x.name === 'Mintable')?.state) {
    extensions.push(generateExtension('Mintable', standardName, contractName, version, output.security, []))

    usesStandardExtensions = true
  }
  // Enumerable extension psp34 > v1.5.0
  if (output.currentControlsState.find((x) => x.name === 'Enumerable')?.state) {
    extensions.push(generateExtension('Enumerable', standardName, contractName, version, output.security, []))

    usesStandardExtensions = true
  }
  // Pausable extension
  if (output.currentControlsState.find((x) => x.name === 'Pausable')?.state) {
    extensions.push(generateExtension('Pausable', standardName, contractName, version, output.security, []))

    usesStandardExtensions = true
  }
  // Metadata extension
  if (output.currentControlsState.find((x) => x.name === 'Metadata')?.state) {
    extensions.push(generateExtension('Metadata', standardName, contractName, version, output.security, []))

    usesStandardExtensions = true
  }
  // Flashmint extension
  if (output.currentControlsState.find((x) => x.name === 'FlashMint')?.state) {
    extensions.push(generateExtension('FlashMint', standardName, contractName, version, output.security, []))

    usesStandardExtensions = true
  }
  // Wrapper extension
  if (output.currentControlsState.find((x) => x.name === 'Wrapper')?.state) {
    extensions.push(generateExtension('Wrapper', standardName, contractName, version, output.security, []))

    usesStandardExtensions = true
  }
  // Capped extension
  if (output.currentControlsState.find((x) => x.name === 'Capped')?.state) {
    extensions.push(generateExtension('Capped', standardName, contractName, version, output.security, []))

    usesStandardExtensions = true
  }

  return { extensions, usesStandardExtensions }
}

export function generateExtension(extensionName, standardName, contractName, version, security, additionalMethods) {
  const brushName = version < 'v2.0.0' ? 'brush' : 'openbrush'

  switch (extensionName) {
    case 'Batch':
      let batchExtension = new ExtensionBuilder()
      batchExtension.setName('Batch')
      batchExtension.addBrushImport(new Import(`${brushName}::contracts::${standardName}::extensions::batch::*`))
      batchExtension.setImpl(new TraitImpl(`${standardName.toUpperCase()}Batch`, contractName, additionalMethods))

      return batchExtension.getExtension()
    case 'Burnable':
      let burnableExtension = new ExtensionBuilder()
      burnableExtension.setName('Burnable')
      burnableExtension.addBrushImport(new Import(`${brushName}::contracts::${standardName}::extensions::burnable::*`))

      if (security && security !== 'none') {
        let args = []
        args.push('account: AccountId')

        if (standardName === 'psp22') args.push('amount: Balance')
        if (standardName === 'psp37' || standardName === 'psp1155' || standardName === 'psp35') args.push('ids_amounts: Vec<(Id, Balance)>')
        if (standardName === 'psp34') args.push('id: Id')

        additionalMethods.push(
          new Method(
            brushName,
            false,
            true,
            `#[ink(message)]\n\t\t#[${brushName}::modifiers(${security === 'ownable' ? 'only_owner' : 'only_role(MANAGER)'})]`,
            'burn',
            args,
            `Result<(), ${standardName.toUpperCase()}Error>`,
              ( version < 'v4.0.0'
                ?  `self._burn_from(account, ${standardName === 'psp22' ? 'amount' : standardName === 'psp34' ? 'id' : 'ids_amounts'})`
                : `${standardName}::Internal::_burn_from(self, account, ${standardName === 'psp22' ? 'amount' : standardName === 'psp34' ? 'id' : 'ids_amounts'})`
              )
          )
        )
      }

      burnableExtension.setImpl(new TraitImpl(`${standardName.toUpperCase()}Burnable`, contractName, additionalMethods))

      return burnableExtension.getExtension()
    case 'Mintable':
      let mintableExtension = new ExtensionBuilder()
      mintableExtension.setName('Mintable')
      mintableExtension.addBrushImport(new Import(`${brushName}::contracts::${standardName}::extensions::mintable::*`))

      if (security && security !== 'none') {
        let args = []
        args.push('account: AccountId')

        if (standardName === 'psp22') args.push('amount: Balance')
        if (standardName === 'psp37' || standardName === 'psp1155' || standardName === 'psp35') args.push('ids_amounts: Vec<(Id, Balance)>')
        if (standardName === 'psp34') args.push('id: Id')

        additionalMethods.push(
          new Method(
            brushName,
            false,
            true,
            `#[ink(message)]\n\t\t#[${brushName}::modifiers(${security === 'ownable' ? 'only_owner' : 'only_role(MANAGER)'})]`,
            'mint',
            args,
            `Result<(), ${standardName.toUpperCase()}Error>`,
            `self._mint${standardName !== 'psp22' ? '_to' : version < 'v2.3.0' ? '' : '_to'}(account, ${
              standardName === 'psp22' ? 'amount' : standardName === 'psp34' ? 'id' : 'ids_amounts'
            })`
          )
        )
      }

      mintableExtension.setImpl(new TraitImpl(`${standardName.toUpperCase()}Mintable`, contractName, additionalMethods))

      if (standardName === 'psp34') {
        if (version < 'v4.0.0') mintableExtension.addConstructorAction('_instance._mint_to(_instance.env().caller(), Id::U8(1)).expect("Can mint");')
        else mintableExtension.addConstructorAction('psp34::Internal::_mint_to(&mut _instance, Self::env().caller(), Id::U8(1)).expect("Can mint");')
      }

      return mintableExtension.getExtension()
    case 'ownable':
      let ownableExtension = new ExtensionBuilder()
      ownableExtension.setName('Ownable')
      ownableExtension.addBrushImport(new Import(`${brushName}::contracts::ownable::*`))

      let ownableStorage = new StorageBuilder()
      ownableStorage.constructDefaultStorage('Ownable', version)
      ownableExtension.setStorage(ownableStorage.getStorage())

      ownableExtension.setImpl(new TraitImpl(`Ownable`, contractName, additionalMethods))
      if (version < 'v4.0.0') ownableExtension.addConstructorAction('_instance._init_with_owner(_instance.env().caller());')
      else ownableExtension.addConstructorAction('ownable::Internal::_init_with_owner(&mut _instance Self::env().caller());')

      return ownableExtension.getExtension()
    case 'access_control':
      let accessControlExtension = new ExtensionBuilder()

      accessControlExtension.setName('AccessControl')
      accessControlExtension.addBrushImport(new Import(`${brushName}::contracts::access_control::*`))

      let accessControlStorage = new StorageBuilder()
      accessControlStorage.constructDefaultStorage('AccessControl', version)
      if (version > 'v2.1.0') accessControlStorage.setType('access_control::Data')
      accessControlStorage.setName('access')
      accessControlExtension.setStorage(accessControlStorage.getStorage())

      accessControlExtension.setImpl(new TraitImpl(`AccessControl`, contractName, additionalMethods))
      if (version < 'v4.0.0') accessControlExtension.addConstructorAction('_instance._init_with_admin(_instance.env().caller());')
      else accessControlExtension.addConstructorAction('access_control::Internal::_init_with_admin(&mut _instance, Self::env().caller());')
      if (version < 'v4.0.0') accessControlExtension.addConstructorAction('_instance.grant_role(MANAGER, _instance.env().caller()).expect("Should grant MANAGER role");')
      else accessControlExtension.addConstructorAction('AccessControl::grant_role(&mut _instance, MANAGER).expect("Should grant MANAGER role");')

      return accessControlExtension.getExtension()
    case 'access_control_enumerable':
      let accessControlEnumerableExtension = new ExtensionBuilder()
      accessControlEnumerableExtension.setName('AccessControlEnumerable')
      accessControlEnumerableExtension.addBrushImport(new Import(`${brushName}::contracts::access_control::extensions::enumerable::*`))

      let accessControlEnumerableStorage = new StorageBuilder()

      if (version < 'v2.2.0') accessControlEnumerableStorage.setDerive('AccessControlStorage')
      accessControlEnumerableStorage.setField(`\t#[${version < 'v2.2.0' ? 'AccessControlStorageField' : 'storage_field'}]`)
      accessControlEnumerableStorage.setName('access')
      accessControlEnumerableStorage.setType(`${version < 'v2.2.0' ? 'AccessControlData<EnumerableMembers>' : 'access_control::Data<Members>'}`)

      accessControlEnumerableExtension.setStorage(accessControlEnumerableStorage.getStorage())

      accessControlEnumerableExtension.setImpl(new TraitImpl(`AccessControlEnumerable`, contractName, additionalMethods))
      // accessControlEnumerableExtension.addConstructorAction('_instance._init_with_admin(_instance.env().caller());')
      if (version < 'v4.0.0') accessControlEnumerableExtension.addConstructorAction('_instance.grant_role(MANAGER, _instance.env().caller()).expect("Should grant MANAGER role");')
      else accessControlEnumerableExtension.addConstructorAction('AccessContol::grant_role(&mut _instance, MANAGER, Some(Self::env().caller())).expect("Should grant MANAGER role");')
      if (version < 'v4.0.0') accessControlEnumerableExtension.addConstructorAction(
        '_instance.grant_role(MANAGER, _instance.env().caller()).expect("Should grant MANAGER role");'
      )
      else accessControlEnumerableExtension.addConstructorAction(
        'AccessControl::grant_role(&mut _instance, MANAGER, Some(Self::env().caller())).expect("Should grant MANAGER role");'
      )

      return accessControlEnumerableExtension.getExtension()
    case 'Enumerable':
      let enumerableExtension = new ExtensionBuilder()

      enumerableExtension.setName('Enumerable')
      enumerableExtension.addBrushImport(new Import(`${brushName}::contracts::${standardName}::extensions::enumerable::*`))
      if (version < 'v2.1.0') {
        let enumerableStorage = new StorageBuilder()
        enumerableStorage.constructDefaultStorage('Enumerable', version, standardName)
        enumerableExtension.setStorage(enumerableStorage.getStorage())
      }

      enumerableExtension.setImpl(new TraitImpl(`${standardName.toUpperCase()}Enumerable`, contractName, additionalMethods))

      return enumerableExtension.getExtension()
    case 'Pausable':
      let pausableExtension = new ExtensionBuilder()

      pausableExtension.setName('Pausable')
      pausableExtension.addBrushImport(new Import(`${brushName}::contracts::pausable::*`))

      let pausableStorage = new StorageBuilder()
      pausableStorage.constructDefaultStorage('Pausable', version)
      pausableExtension.setStorage(pausableStorage.getStorage())

      pausableExtension.setImpl(new TraitImpl(`Pausable`, contractName, additionalMethods))
      pausableExtension.addContractMethod(
        new Method(
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
        )
      )

      return pausableExtension.getExtension()
    case 'Metadata':
      let metadataExtension = new ExtensionBuilder()

      metadataExtension.setName('Metadata')
      metadataExtension.addBrushImport(new Import(`${brushName}::contracts::${standardName}::extensions::metadata::*`))

      let metadataStorage = new StorageBuilder()
      metadataStorage.constructDefaultStorage('Metadata', version, standardName)
      metadataExtension.setStorage(metadataStorage.getStorage())

      metadataExtension.setImpl(new TraitImpl(`${standardName.toUpperCase()}Metadata`, contractName, additionalMethods))

      if (standardName === 'psp22') {
        metadataExtension.addConstructorArg('name: Option<String>')
        metadataExtension.addConstructorArg('symbol: Option<String>')
        metadataExtension.addConstructorArg('decimal: u8')

        if (version < 'v4.0.0') metadataExtension.addConstructorAction('_instance.metadata.name = name;')
        else metadataExtension.addConstructorAction('_instance.metadata.name.set(&name);')
        if (version < 'v4.0.0') metadataExtension.addConstructorAction('_instance.metadata.symbol = symbol;')
        else metadataExtension.addConstructorAction('_instance.metadata.symbol.set(&symbol);')
        if (version < 'v4.0.0') metadataExtension.addConstructorAction('_instance.metadata.decimals = decimal;')
        else metadataExtension.addConstructorAction('_instance.metadata.decimals.set(&decimal);')
      }

      if (version < 'v2.1.0' && (standardName === 'psp37' || standardName === 'psp35' || standardName === 'psp1155')) {
        metadataExtension.addConstructorArg('uri: Option<String>')
        metadataExtension.addConstructorAction('_instance.metadata.uri = uri;')
      }

      if (standardName === 'psp34') {
        metadataExtension.addConstructorAction('let collection_id = _instance.collection_id();')
        if (version < 'v4.0.0') metadataExtension.addConstructorAction(
          `_instance._set_attribute(collection_id.clone(), String::from("name")${
            version <= 'v2.2.0' ? '.into_bytes()' : ''
          }, String::from("MyPSP34")${version <= 'v2.2.0' ? '.into_bytes()' : ''});`
        )
        else metadataExtension.addConstructorAction(
            `metadata::Internal::_set_attribute(&mut _instance, collection_id.clone(), String::from("name"), String::from("MyPSP34"));`
            )

        if (version < 'v4.0.0') metadataExtension.addConstructorAction(
          `_instance._set_attribute(collection_id, String::from("symbol")${version <= 'v2.2.0' ? '.into_bytes()' : ''}, String::from("MPSP")${
            version <= 'v2.2.0' ? '.into_bytes()' : ''
          });`
        )
        else metadataExtension.addConstructorAction(
          `metadata::Internal::_set_attribute(&mut _instance, collection_id, String::from("symbol"), String::from("MPSP"));`
        )
      }

      return metadataExtension.getExtension()
    case 'FlashMint':
      let flashMintExtension = new ExtensionBuilder()

      flashMintExtension.setName('FlashMint')
      flashMintExtension.addBrushImport(new Import(`${brushName}::contracts::${standardName}::extensions::flashmint::*`))
      flashMintExtension.setImpl(new TraitImpl(`FlashLender`, contractName, additionalMethods))

      return flashMintExtension.getExtension()
    case 'Wrapper':
      let wrapperExtension = new ExtensionBuilder()

      wrapperExtension.setName('Wrapper')
      wrapperExtension.addBrushImport(new Import(`${brushName}::contracts::${standardName}::extensions::wrapper::*`))

      let wrapperStorage = new StorageBuilder()
      wrapperStorage.constructDefaultStorage('Wrapper', version, standardName)
      wrapperExtension.setStorage(wrapperStorage.getStorage())

      wrapperExtension.setImpl(new TraitImpl(`${standardName.toUpperCase()}Wrapper`, contractName, additionalMethods))

      return wrapperExtension.getExtension()
    case 'Capped':
      let cappedExtension = new ExtensionBuilder()

      let cappedStorage = new StorageBuilder()
      cappedStorage.setName('cap')
      cappedStorage.setType('Balance')

      cappedExtension.setStorage(cappedStorage.getStorage())

      cappedExtension.setName('Capped')
      cappedExtension.addContractMethod(new Method(brushName, true, false, `#[ink(message)]`, 'cap', [], 'Balance', `self.cap`))
      cappedExtension.addContractMethod(
        new Method(
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
        )
      )

      return cappedExtension.getExtension()
  }
}
