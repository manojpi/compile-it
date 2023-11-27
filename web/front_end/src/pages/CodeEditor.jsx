import MonacoEditor from 'react-monaco-editor';
import options from './../utils/MonacoEditor';
import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import './CodeEditor.css';
import '../project_assets/run.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function CodeEditor(props) {
    const [code, setCode] = useState('');
    const [file, setFile] = useState();
    const [codeResult, setCodeResult] = useState('>');
    const [language, setLanguage] = useState('javascript');

    const handleFileChange = (event) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
        console.log(file);
    };

    const handleCodeChange = async (newValue, event) => {
        await setCode(newValue);
    }

    const handleSubmit = async (event) => {
        await fetch("http://localhost:5001/api/compile", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code: code })
        }).then((res) => res.json()).then((res) => {
            setCodeResult(res.message);
        })
        console.log(code);
    }

    useEffect(() => {
        if (file) {
            let reader = new FileReader();
            reader.onload = async (event) => {
                setCode(event.target.result);
            };
            reader.readAsText(file);
            let newLanguage = 'javascript';
            const extension = file.name.split('.').pop();
            if (['css', 'html', 'python', 'dart'].includes(extension)) {
                newLanguage = extension;
            }
            setLanguage(newLanguage);
        }
    }, [file])

    return (
        <div>
            <Navigation />
            <div className='d-flex justify-content-between align-items-center'>

                <div className='mx-4'>
                    <input type="file" onChange={handleFileChange} />
                </div>
                <div>
                    <button className='btn btn-success mx-4' onClick={handleSubmit}> Run </button>
                </div>
            </div>
            <hr />
            <div className='main-container'>
                <div className='editor-container'>
                    <MonacoEditor
                        height="800"
                        language={language}
                        value={code}
                        options={options}
                        theme="vs-dark"
                        onChange={handleCodeChange}
                    />
                </div>
                <div className='mx-2'></div>
                <div className='compile-result'>
                    <p>{codeResult}</p>
                </div>

            </div>


        </div>
    )
}

export default CodeEditor;