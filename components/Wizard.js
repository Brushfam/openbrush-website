import wizard from "./../styles/Wizard.module.scss";
import { useEffect, useState } from "react";
import { wizardConfig } from "../data/wizardData";
import WizardOutput from "./WizardOutput";

const Wizard = () => {
  const [activeOptionIndex, setActiveOptionIndex] = useState(0);
  const [config, setConfig] = useState(wizardConfig);
  const [controlsState, setControlsState] = useState([]);

  useEffect(() => {
    let currentState_tmp = [];
    config.forEach((token, index) => {
      currentState_tmp.push({
        type: token.name,
        currentControlsState: [],
      });
      token.controls.forEach((controlSection) => {
        controlSection.optionList.forEach((control) => {
          currentState_tmp[index].currentControlsState.push({
            name: control.name,
            state: control.initState,
          });
        });
      });
    });
    setControlsState(currentState_tmp);
  }, [config]);

  return (
    <div className={wizard.componentContainer}>
      <h2 className='primaryHeadline'>Wizard</h2>
      <div className={wizard.scrollWrapper}>
        <div className={wizard.wizardWrapper}>
          <div className={wizard.header}>
            <div className={wizard.tokenStandardRow}>
              {config.map((item, token_i) => {
                return (
                  <div
                    onClick={() => {
                      setActiveOptionIndex(token_i);
                    }}
                    key={token_i.toString()}
                    className={
                      activeOptionIndex === token_i
                        ? `${wizard["active"]} ${wizard["tokenStandard"]}`
                        : `${wizard["tokenStandard"]}`
                    }
                  >
                    {item.name}
                  </div>
                );
              })}
            </div>
            <div className={wizard.actionsRow}>
              {/* <div className={wizard.copyToClipboard}
                  onClick={() => {navigator.clipboard.writeText('temporary placeholder')}}
              >
              
                <img
                  className={wizard.copyIcon}
                  src="/icons/copy.svg"
                  alt="logo"
                />
                Copy to clipboard
              </div> */}
            </div>
          </div>
          <div className={wizard.body}>
            <div className={wizard.contractControls}>
              {config.map((token, token_i) => (
                <div
                  key={token_i.toString()}
                  style={{
                    display: activeOptionIndex !== token_i ? "none" : "block",
                  }}
                >
                  {token.controls.map((item, index) => {
                    return (
                      <div className={wizard.inputSection} key={index.toString()}>
                        <div className={wizard.controlsSectionName}>
                          {item.sectionName}
                        </div>
                        <div className={wizard.settingsInputs}>
                          {item.optionList.map((option, count) => {
                            switch (option.type) {
                              case "text":
                                return (
                                  <div
                                    key={count.toString()}
                                    className={wizard.textInput}
                                  >
                                    <div>
                                      <label
                                        htmlFor={option.name.split(" ").join("_")}
                                      >
                                        {option.name}:
                                      </label>
                                      <input
                                        type={option.type}
                                        id={option.name.split(" ").join("_")}
                                        name={option.name.split(" ").join("_")}
                                        onChange={e => {
                                            let tmp_state = [...controlsState];
                                            let pos = tmp_state[token_i].currentControlsState.map(function (e) { return e.name; }).indexOf(option.name);
                                            tmp_state[token_i].currentControlsState[pos].state = e.target.value;
                                        
                                            setControlsState(tmp_state);
                                      }}
                                      />
                                    </div>
                                    {option.tooltip &&
                                    option.tooltip.length > 1 ? (
                                      <div className={wizard.tooltipContainer}>
                                        <div className={wizard.tooltipInfo}>
                                          {option.tooltip}
                                        </div>
                                        <img
                                          className={wizard.infoIcon}
                                          src="/icons/infoIcon.svg"
                                          alt="icon"
                                        />
                                      </div>
                                    ) : null}
                                  </div>
                                );
                              case "checkbox":
                                return (
                                  <label
                                    key={count.toString()}
                                    className={wizard.checkboxContainer}
                                  >
                                    <div>
                                      <input
                                        type={option.type}
                                        id={option.name.split(" ").join("_")}
                                        name={option.name.split(" ").join("_")}
                                        onChange={(e) => {
                                              let tmp_state = [...controlsState];
                                              let pos = tmp_state[token_i].currentControlsState.map(function (e) { return e.name; }).indexOf(option.name);
                                              tmp_state[token_i].currentControlsState[pos].state = e.target.checked;
                                          
                                              setControlsState(tmp_state);
                                        }}
                                      />
                                      {option.name}
                                    </div>
                                    {option.tooltip &&
                                    option.tooltip.length > 1 ? (
                                      <div className={wizard.tooltipContainer}>
                                        <div className={wizard.tooltipInfo}>
                                          {option.tooltip}
                                        </div>
                                        <img
                                          className={wizard.infoIcon}
                                          src="/icons/infoIcon.svg"
                                          alt="icon"
                                        />
                                      </div>
                                    ) : null}
                                  </label>
                                );
                            }
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            <div className={wizard.contractOutput}>
              {config.map((token, token_i) => {
                return (
                  <div
                    key={token_i.toString()}
                    style={{
                      display: activeOptionIndex !== token_i ? "none" : "block",
                    }}
                  >
                    <WizardOutput data={controlsState[token_i]} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wizard;
