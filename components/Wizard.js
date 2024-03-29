import wizard from './../styles/Wizard.module.scss'
import { useEffect, useState } from 'react'
import { wizardConfig } from '../data/wizardData'
import WizardOutput from './WizardOutput'
import Link from 'next/link'
import { docsLink, demoLink } from '../data/headerNavigation'
import header from '../styles/Header.module.scss'
import WizardSaveProject from './WizardSaveProject'
import { isVisible } from '../data/utils'

const Wizard = () => {
  const [activeOptionIndex, setActiveOptionIndex] = useState(0)
  const [config] = useState(wizardConfig)
  const [controlsState, setControlsState] = useState([])

  const [isControlsClosed, setControlsClosed] = useState(false)

  useEffect(() => {
    let currentState_tmp = []
    config.forEach((token, index) => {
      currentState_tmp.push({
        type: token.name,
        currentControlsState: [],
        notShowAccessControlEnumerable: false
      })
      token.controls.forEach((controlSection) => {
        controlSection.optionList.forEach((control) => {
          currentState_tmp[index].currentControlsState.push({
            name: control.name,
            state: control.initState
          })
        })
      })
    })
    setControlsState(currentState_tmp)
  }, [config])

  return (
    <div className={wizard.componentContainer} id="wizard">
      <h2 className="primaryHeadline">How to use: </h2>
      <div className={wizard.scrollWrapper}>
        <div className={wizard.wizardWrapper}>
          <div className={wizard.header}>
            <div className={wizard.tokenStandardRow}>
              <div
                className={`${wizard['controlsDisplayingController']} ${isControlsClosed ? '' : wizard['open']}`}
                onClick={() => setControlsClosed(!isControlsClosed)}
              >
                <img src="/icons/arrowDown.svg" alt="icon" />
              </div>

              {config.map((item, token_i) => {
                return (
                  <div
                    onClick={() => {
                      setActiveOptionIndex(token_i)
                    }}
                    key={token_i.toString()}
                    className={activeOptionIndex === token_i ? `${wizard['active']} ${wizard['tokenStandard']}` : `${wizard['tokenStandard']}`}
                  >
                    {item.name}
                  </div>
                )
              })}
            </div>
            <div className={wizard.actionsRow}>
              {config.map((item, token_i) => {
                return (
                  <div
                    key={token_i.toString()}
                    style={{
                      display: activeOptionIndex !== token_i ? 'none' : 'block'
                    }}
                  >
                    <WizardSaveProject data={controlsState[token_i]} />
                  </div>
                )
              })}
            </div>
          </div>
          <div className={wizard.body}>
            <div className={isControlsClosed ? `${wizard['contractControls']} ${wizard['closed']}` : `${wizard['contractControls']}`}>
              {config.map((token, token_i) => (
                <div
                  key={token_i.toString()}
                  style={{
                    display: activeOptionIndex !== token_i ? 'none' : 'block'
                  }}
                >
                  {/*  select version */}
                  <div className={wizard.versionSelectorWrapper}>
                    <h3 className={wizard.controlsSectionName}>Version</h3>
                    <select
                      className={wizard.select}
                      onChange={(e) => {
                        let tmp_state = [...controlsState]
                        tmp_state[token_i].version = e.target.value

                        if (e.target.value < 'v2.1.0') {
                          tmp_state[token_i].notShowAccessControlEnumerable = true
                          if (tmp_state[token_i].security === 'access_control_enumerable') {
                            tmp_state[token_i].security = 'none'
                          }
                        } else {
                          tmp_state[token_i].notShowAccessControlEnumerable = false
                        }

                        setControlsState(tmp_state)
                      }}
                      defaultValue={'v4.0.0-beta'}
                    >
                      <option value="v4.0.0-beta">v4.0.0-beta</option>
                      <option value="v3.0.0">v3.0.0</option>
                      <option value="v3.0.0-beta.1">v3.0.0-beta.1</option>
                      <option value="v3.0.0-beta">v3.0.0-beta</option>
                      <option value="v2.3.0">v2.3.0</option>
                      <option value="v2.2.0">v2.2.0</option>
                      <option value="v2.1.0">v2.1.0</option>
                      <option value="v2.0.0">v2.0.0</option>
                      <option value="v1.7.0">v1.7.0</option>
                      <option value="v1.6.0">v1.6.0</option>
                      <option value="v1.5.0">v1.5.0</option>
                      <option value="v1.3.0">v1.3.0</option>
                    </select>
                  </div>
                  {token.controls.map((item, index) => {
                    return (
                      <div className={wizard.inputSection} key={index.toString()}>
                        <div className={wizard.controlsSectionName}>{item.sectionName}</div>
                        <div className={wizard.settingsInputs}>
                          {item.optionList.map((option, count) => {
                            let tmp_state = [...controlsState]
                            if (!isVisible(token.name, tmp_state[token_i]?.version ? tmp_state[token_i].version : 'v2.2.0', option.name)) {
                              let pos = controlsState[token_i]?.currentControlsState
                                .map(function (e) {
                                  return e.name
                                })
                                .indexOf(option.name)
                              controlsState[token_i].currentControlsState[pos].state = false
                              return ''
                            }
                            if (option.name === 'Symbol' || option.name === 'URI') {
                              let pos = controlsState[token_i]?.currentControlsState
                                .map(function (e) {
                                  return e.name
                                })
                                .indexOf('Metadata')
                              if (controlsState[token_i]?.currentControlsState[pos]?.state === false) {
                                return
                              }
                            }

                            switch (option.type) {
                              case 'text':
                                return (
                                  <div key={count.toString()} className={wizard.textInput}>
                                    <div className={wizard.checkboxContainerNested}>
                                      <label htmlFor={option.name.split(' ').join('_')}>{option.name}:</label>
                                      <input
                                        type={option.type}
                                        id={option.name.split(' ').join('_')}
                                        name={option.name.split(' ').join('_')}
                                        value={
                                          controlsState[token_i]?.currentControlsState[
                                            controlsState[token_i]?.currentControlsState
                                              .map(function (e) {
                                                return e.name
                                              })
                                              .indexOf(option.name)
                                          ].state
                                        }
                                        onChange={(e) => {
                                          let tmp_state = [...controlsState]
                                          let pos = tmp_state[token_i].currentControlsState
                                            .map(function (e) {
                                              return e.name
                                            })
                                            .indexOf(option.name)
                                          tmp_state[token_i].currentControlsState[pos].state = e.target.value

                                          setControlsState(tmp_state)
                                        }}
                                      />
                                    </div>
                                    {option.tooltip && option.tooltip.length > 1 ? (
                                      <div className={wizard.tooltipContainer}>
                                        <div className={wizard.tooltipInfo}>{option.tooltip}</div>
                                        <img className={wizard.infoIcon} src="/icons/infoIcon.svg" alt="icon" />
                                      </div>
                                    ) : null}
                                  </div>
                                )
                              case 'checkbox':
                                return (
                                  <label key={count.toString()} className={wizard.checkboxContainer}>
                                    <div className={wizard.checkboxContainerNested}>
                                      <input
                                        type={option.type}
                                        id={option.name.split(' ').join('_')}
                                        name={option.name.split(' ').join('_')}
                                        onChange={(e) => {
                                          let tmp_state = [...controlsState]
                                          let pos = tmp_state[token_i].currentControlsState
                                            .map(function (e) {
                                              return e.name
                                            })
                                            .indexOf(option.name)
                                          tmp_state[token_i].currentControlsState[pos].state = e.target.checked

                                          setControlsState(tmp_state)
                                        }}
                                      />
                                      <span>{option.name}</span>
                                    </div>
                                    {option.tooltip && option.tooltip.length > 1 ? (
                                      <div className={wizard.tooltipContainer}>
                                        <div className={wizard.tooltipInfo}>{option.tooltip}</div>
                                        <img className={wizard.infoIcon} src="/icons/infoIcon.svg" alt="icon" />
                                      </div>
                                    ) : null}
                                  </label>
                                )
                            }
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              ))}
              {config.map((token, token_i) => {
                return (
                  <div
                    key={token_i.toString()}
                    style={{
                      display: activeOptionIndex !== token_i ? 'none' : 'block'
                    }}
                  >
                    <div className={wizard.versionSelectorWrapper}>
                      <h3 className={wizard.controlsSectionName}>Security</h3>
                      <select
                        className={wizard.select}
                        onChange={(e) => {
                          let tmp_state = [...controlsState]
                          tmp_state[token_i].security = e.target.value

                          setControlsState(tmp_state)
                        }}
                        defaultValue={'none'}
                      >
                        <option value="none">None</option>
                        <option value="ownable">Ownable</option>
                        <option value="access_control">Access Control</option>

                        <option
                          value="access_control_enumerable"
                          style={{
                            display: controlsState[token_i]?.notShowAccessControlEnumerable ? 'none' : 'block'
                          }}
                        >
                          Access Control Enumerable
                        </option>
                      </select>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className={wizard.contractOutput}>
              {config.map((token, token_i) => {
                return (
                  <div
                    key={token_i.toString()}
                    style={{
                      display: activeOptionIndex !== token_i ? 'none' : 'block'
                    }}
                  >
                    <WizardOutput data={controlsState[token_i]} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <div className={wizard.bottomLinksButtons}>
        <div className={wizard.bottomLinkBtn}>
          <Link href={docsLink}>
            <a>Documentation</a>
          </Link>
        </div>
        <div className={wizard.bottomLinkBtn}>
          <Link href={demoLink}>
            <a target="_blank">Demo</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Wizard
