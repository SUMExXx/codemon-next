'use client';
import Image from "next/image";

import Editor from '@monaco-editor/react';
import { useState, useEffect } from "react";

interface TestCase {
    input: number | string;
    expected_output: number | string;
}

interface Problem {
    id: number;
    title: string;
    description: string;
    boilerplate: string;
    // datatype: 'number' | 'string';
    test_case_show: TestCase[];
    test_case_hidden: TestCase[];
    difficulty?: 'Easy' | 'Medium' | 'Hard';
}

export default function Arena() {

  const [code, setCode] = useState('');

  const [problem, setProblem] = useState<Problem>()

  // const [state, setState] = useState('fine');

  const [report, setReport] = useState<any>();

  const [fullPass, setFullPass] = useState(false);

  const languages = [
    { value: 'cpp', label: 'C++' },
    { value: 'java', label: 'Java' },
  ];

  const [language, setLanguage] = useState('cpp');

  // const [output, setOutput] = useState('');

  useEffect(() => {
        loadData();
  }, []);

  const loadData = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}:${process.env.NEXT_PUBLIC_API_PORT}/${process.env.NEXT_PUBLIC_ARENA_PATH}/${process.env.NEXT_PUBLIC_ARENA_PROBLEM}`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        // body: JSON.stringify({ code: code, language: language }),
      })

    if(!response.ok){
      throw new Error('Network response was not ok');
    }

    const data: Problem = await response.json();

    setProblem(data);
  }

  const getSubmit = () => {

  }

  const getOutput = async () => {
    if(code != ''){
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}:${process.env.NEXT_PUBLIC_API_PORT}/${process.env.NEXT_PUBLIC_ARENA_PATH}/${process.env.NEXT_PUBLIC_ARENA_TEST}`, {
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

      // setOutput(data.output)
      // setState(data.state)
      setReport(data.report)
      setFullPass(data.fullPass)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  };

  return (
    <main className="flex bg-black flex-col items-center justify-between" style={{minHeight: 'calc(100vh - 40px)'}}>
      <div className="flex justify-between w-full">
        <div className="h-full w-[1200px] p-2">
          {/* <div className="flex justify-between items-center p-2 h-[40]">

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
          />; */}

          <div className="p-6 bg-white shadow-md rounded-lg max-w-3xl mx-auto h-[600px] overflow-y-scroll" dangerouslySetInnerHTML={{ __html: problem? problem.description: '' }} >
          </div>

        </div>
        <div className="w-full flex flex-col gap-2 bg-black text-white p-2">
          <div className="flex justify-between items-center p-2 h-[40]">

            <div className="dropdown-container h-full flex justify-center items-center text-black">
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
            <button className="rounded-sm bg-blue-800 text-white px-4 py-2" onClick={getSubmit}>Submit</button>
            <button className="rounded-sm bg-blue-800 text-white px-4 py-2" onClick={getOutput}>Run</button>

          </div>
          <Editor 
            onChange={(value: string | undefined) => {
              setCode(value || '');
            }}
            value={code}
            language={language}
            theme="vs-dark" height="50vh" width="760px" defaultLanguage="cpp" defaultValue={`${problem?.boilerplate}`} className="h-full w-full"
          />
          {/* <span className="w-full" style={{color: state == 'error' ? 'red': 'white'}}>
            {output}
          </span> */}
          {fullPass?
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
                <tr>
                    <th className="border border-gray-300 p-2">Status</th>
                    <th className="border border-gray-300 p-2">Input</th>
                    <th className="border border-gray-300 p-2">Output</th>
                    <th className="border border-gray-300 p-2">Expected</th>
                    <th className="border border-gray-300 p-2">Time</th>
                </tr>
            </thead>
            <tbody>
                {report?.map((testcase: any, index: number) => (
                    <tr key={index} className="w-full text-white" style={{backgroundColor: fullPass? 'green': 'red'}}>
                        <td className="border border-gray-300 p-2">{testcase.status}</td>
                        <td className="border border-gray-300 p-2">{testcase.input}</td>
                        <td className="border border-gray-300 p-2">{testcase.output}</td>
                        <td className="border border-gray-300 p-2">{testcase.expected}</td>
                        <td className="border border-gray-300 p-2">{testcase.time}</td>
                    </tr>
                ))}
            </tbody>
        </table>: ''}
        </div>
      </div>
    </main>
  );
}
