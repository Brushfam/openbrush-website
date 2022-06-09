import {useEffect, useState} from "react";
import wizard from "../styles/Wizard.module.scss";
import {generateCargoToml, generateLib} from "./WizardOutput";
import JSZip from "jszip";
import FileSaver from 'file-saver';

const save = (output) => {
    console.log(output)

    const toml = generateCargoToml(output)
    const lib  = generateLib(output)

    const zip = new JSZip();

    zip.file('Cargo.toml', toml)
    zip.file('lib.rs', lib)

    zip.generateAsync({ type: 'blob' }).then(function (content) {
        FileSaver.saveAs(content, `${output.type}.zip`);
    })
}

const WizardSaveProject = ({data}) => {
    const [output, setOutPut] = useState(data)

    useEffect(() => {
        setOutPut(data);
    }, [data, output])

    return (<div className={wizard.download}
                 onClick={() => save(output)}
    >
        <img
            className={wizard.copyIcon}
            src="/icons/download.svg"
            alt="logo"
        />
        Download
    </div>)
}

export default WizardSaveProject;