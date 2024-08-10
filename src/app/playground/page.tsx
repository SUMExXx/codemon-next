'use client';
import Image from "next/image";

import Editor from '@monaco-editor/react';
import { useState } from "react";

export default function Playground() {

  const [code, setCode] = useState('');

  const [state, setState] = useState('fine');

  const languages = [
    { value: 'cpp', label: 'C++' },
    { value: 'java', label: 'Java' },
  ];

  const [language, setLanguage] = useState('cpp');

  const [output, setOutput] = useState('');

  const getOutput = async () => {
    if(code != ''){
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}:${process.env.NEXT_PUBLIC_API_PORT}/${process.env.NEXT_PUBLIC_PLAYGROUND_PATH}/${process.env.NEXT_PUBLIC_PLAYGROUND_EXECUTE}`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: code, language: language }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      setOutput(data.output)
      setState(data.state)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  };

  return (
    <main className="flex bg-black flex-col items-center justify-between" style={{minHeight: 'calc(100vh - 40px)'}}>
      <div className="flex gap-2 w-full">
        <div className="h-full w-[2000px]">
          <div className="flex justify-between items-center p-2 h-[40]">

            <div className="dropdown-container h-full flex justify-center items-center">
              <label htmlFor="language-select">{""}</label>
              <select
                id="language-select"
                value={language}
                onChange={handleChange}
              >
                {languages.map((language) => (
                  <option key={language.value} value={language.value}>
                    {language.label}
                  </option>
                ))}
              </select>
            </div>

            <button className="rounded-sm bg-blue-800 text-white px-4 py-2" onClick={getOutput}>Run</button>

          </div>
          <Editor 
            onChange={(value: string | undefined) => {
              setCode(value || '');
            }}
            value={code}
            language={language}
            theme="vs-dark" height="80vh" width="100%" defaultLanguage="cpp" defaultValue={`// write your code here`} className="h-full w-full"
          />;
        </div>
        <div className="w-full bg-black text-white p-12">
          <span className="w-full" style={{color: state == 'error' ? 'red': 'white'}}>
            {output}
          </span>
        </div>
      </div>
    </main>
  );
}
