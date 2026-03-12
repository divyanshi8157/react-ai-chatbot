

import { useState } from 'react'
import './App.css'
import { URL } from './assets/constants';
import Answer from './components/answers';

function App() {
  const [question, setQuestion] = useState('')
  const [result, setResult] = useState([])


  const payload = {
    "contents": [{
      "parts": [{
        "text": question
      }]
    }]
  }




  const askQuestion = async () => {
    let response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    let datastring = data.candidates[0].content.parts[0].text;
    datastring = datastring.split("* ");
    datastring = datastring.map((item) => item.trim());

    // console.log(datastring);
    setResult([...result,
    { type: 'q', text: question },
    { type: 'a', text: datastring },
    ]);
  };

  console.log(result)
  return (

    <div className='grid grid-cols-5 h-screen overflow-hidden text-center'>
      <div className='col-span-1 bg-gray-900'>

      </div>
      <div className='col-span-4'>
        <div className='container h-110 '>
          <div className=' text-white'>
            <ul>
              {
                result.map((item, index) => (
                  <div key={index} className={item.type === 'q' ? 'flex justify-end' : ''}>
                    {
                      item.type === 'q' ?
                        <li key={index + Math.random()} className='text-right  p-1 border-5 bg-zinc-700 border-zinc-700 rounded-3xl w-fit' ><Answer ans={item.text} totalResult={1} index={index} /></li>
                        : item.text.map((ansItems, ansIndex) => (
                          <li key={ansIndex} className='text-left p-1'>
                            <Answer ans={ansItems} totalResult={item.text.length} index={ansIndex} /></li>
                        ))
                    }
                  </div>
                ))
              }
            </ul>
            {/*<ul>

              {
                result && result.map((item, index) => (
                  <li key={index + Math.random()} className='text-left p-1'><Answer ans={item} totalResult={result.length} index={ansIndex} /></li>
                ))
              }
            </ul>
           */}
          </div>
        </div>
        <div className='flex h-16 p-3 bg-gray-500 w-1/2 text-white m-auto rounded-4xl border border-white-700'>
          <input className="w-full h-full items-center p-4 outline-none" type="text" onChange={(e) => setQuestion(e.target.value)} placeholder='Ask me anything' />
          <button className='border border-black px-4 hover:bg-gray-900 font-bold rounded-full ' onClick={askQuestion}>Ask</button>
        </div>
      </div >
    </div >
  )
}

export default App
