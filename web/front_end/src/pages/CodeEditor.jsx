import MonacoEditor from 'react-monaco-editor';
import options from './../utils/MonacoEditor';
import {useState, useEffect} from 'react';

function CodeEditor() {
  const [code, setCode] = useState('');
  const [file, setFile] = useState();
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
        body: JSON.stringify({code : code})
      }).then((res) => res.json()).then((res) => console.log(res))
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
      <div>
        <input type="file" onChange={handleFileChange} /> 
      </div>
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <hr />
      <MonacoEditor
        height="800"
        language={language}
        value={code}
        options={options}
        theme = "vs-dark"
        onChange={handleCodeChange}
      />
      
    </div>
  )
}

export default CodeEditor;