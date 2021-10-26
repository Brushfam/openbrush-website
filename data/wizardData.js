export const wizardConfig = [
    {
        name: 'psp22',
        controls: [
            {
                sectionName: 'Constructor',
                optionList: [
                    {
                        name: 'Name',
                        type: 'text',
                        initState: 'MyPSP22',
                        tooltip: ''
                    },
                    {
                        name: 'Symbol',
                        type: 'text',
                        initState: 'MPSP',
                        tooltip: ''
                    },
                    {
                        name: 'Premint',
                        type: 'text',
                        initState: '100',
                        tooltip: ''
                    },
                ]
            },
            {
                sectionName: 'Extensions',
                optionList: [
                    {
                        name: 'Metadata',
                        type: 'checkbox',
                        initState: false,
                        tooltip: '[`PSP22`] Metadata'
                    },
                    {
                        name: 'Burnable',
                        type: 'checkbox',
                        initState: false,
                        tooltip: 'Extension of [`PSP22`] that allows token holders to destroy both their own tokens and those that they have an allowance for.'
                    },
                    {
                        name: 'Mintable',
                        type: 'checkbox',
                        initState: false,
                        tooltip: 'Extension of [`PSP22`] that allows create `amount` tokens and assigns them to `account`, increasing the total supply'
                    },
                    {
                        name: 'Ownable',
                        type: 'checkbox',
                        initState: false,
                        tooltip: 'Contract module which provides a basic access control mechanism, where there is an account (an owner) that can be granted exclusive access to specific functions.'
                    }
                ]
            }
        ],
    },
    {
        name: 'psp1155',
        controls: [
            {
                sectionName: 'Constructor',
                optionList: [
                    {
                        name: 'Name',
                        type: 'text',
                        initState: 'MyPSP1155',
                        tooltip: ''
                    },
                    {
                        name: 'URI',
                        type: 'text',
                        initState: 'https://...',
                        tooltip: ''
                    },
                ]
            },
            {
                sectionName: 'Extensions',
                optionList: [
                    {
                        name: 'Metadata',
                        type: 'checkbox',
                        initState: false,
                        tooltip: '[`PSP1155`] Metadata'
                    },
                    {
                        name: 'Burnable',
                        type: 'checkbox',
                        initState: false,
                        tooltip: 'Extension of [`PSP1155`] that allows token holders to destroy their tokens'
                    },
                    {
                        name: 'Mintable',
                        type: 'checkbox',
                        initState: false,
                        tooltip: 'Extension of [`PSP1155`] that allows minting of new tokens'
                    },
                    {
                        name: 'Ownable',
                        type: 'checkbox',
                        initState: false,
                        tooltip: 'Contract module which provides a basic access control mechanism, where there is an account (an owner) that can be granted exclusive access to specific functions.'
                    },
                ]
            }
        ],
    },
    {
        name: 'psp721',
        controls: [
            {
                sectionName: 'Constructor',
                optionList: [
                    {
                        name: 'Name',
                        type: 'text',
                        initState: 'MyPSP721',
                        tooltip: ''
                    },
                    {
                        name: 'Symbol',
                        type: 'text',
                        initState: 'MPSP',
                        tooltip: ''
                    },
                ]
            },
            {
                sectionName: 'Extensions',
                optionList: [
                    {
                        name: 'Metadata',
                        type: 'checkbox',
                        initState: false,
                        tooltip: '[`PSP721`] Metadata'
                    },
                    {
                        name: 'Burnable',
                        type: 'checkbox',
                        initState: false,
                        tooltip: 'Extension of [`PSP721`] that allows token holders to destroy their tokens'
                    },
                    {
                        name: 'Mintable',
                        type: 'checkbox',
                        initState: false,
                        tooltip: 'Extension of [`PSP721`] that exposes the mint function'
                    },
                    {
                        name: 'Ownable',
                        type: 'checkbox',
                        initState: false,
                        tooltip: 'Extension of [`PSP721`] that exposes the mint function'
                    }
                ]
            }
        ],
    },
]

