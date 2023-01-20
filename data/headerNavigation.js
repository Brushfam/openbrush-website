export const docsLink = 'https://docs.openbrush.io/'
export const demoLink = 'https://www.crowdcast.io/e/substrate-seminar-2/10'
export const githubLink = 'https://github.com/727-Ventures/openbrush-contracts'
export const elementLink = 'https://matrix.to/#/!utTuYglskDvqRRMQta:matrix.org?via=matrix.org'
export const twitterLink = 'https://twitter.com/supercolony_vs'
export const linkedinLink = 'https://www.linkedin.com/company/super-colony/'
export const discordLink = 'https://discord.gg/EARg6RCThP'
export const telegramLink = 'https://t.me/openbrush'
export const openBrushFamily = 'https://openbrush.io/#obFam'

const handleClickOBFam = (event) => {
  event.preventDefault()
  document.getElementById('obFam')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export const headerSocials = [
  {
    label: 'Element',
    link: elementLink
  },
  {
    label: 'Telegram',
    link: telegramLink
  },
  {
    label: 'Discord',
    link: discordLink
  }
]

export const headerNavigation = [
  {
    label: 'Docs',
    link: docsLink
  },
  {
    label: 'GitHub',
    link: githubLink,
    newTab: true
  },
  {
    label: 'OpenBrush Family',
    link: openBrushFamily,
    newTab: true,
    eventType: handleClickOBFam
  }
]
