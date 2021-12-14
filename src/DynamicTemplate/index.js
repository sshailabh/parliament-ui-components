/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import React, { useEffect, useState } from 'react'
import './styles.css'

export const DynamicTemplate = ({ handlebartemp, jsondata, ispql }) => {
  const [error, setError] = useState(null)
  const [data, setData] = useState({})
  const [html, setHTML] = useState('')
  const [res, setRes] = useState(null)
  const [selectedButton, setSelectedButton] = useState('html')
  const templateDemoUrl =
    'https://template-demo-dev.corp.ethos11-stage-va7.ethos.adobe.net/render'

  const onTextAreaChange = (e) => {
    const value = e.target.value
    if (selectedButton === 'data') {
      try {
        const temp = JSON.parse(value)
        setData(temp)
        setError(null)
      } catch (e) {
        setError('Invalid json')
      }
    } else {
      setHTML(e.target.value)
    }
  }

  useEffect(() => {
    try {
      setData(JSON.parse(jsondata))
      setHTML(handlebartemp)
    } catch (e) {
      setError('Invalid data')
    }
  }, [])

  const createTemplate = () => {
    if (html && data) {
      const obj = stringToHTML()

      const strigifiedHTML = obj.body.innerHTML.toString()
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: data, template: strigifiedHTML })
      }
      fetch(templateDemoUrl, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setRes(data.t)
        })

      return res
    }

    return ''
  }

  const onButtonClick = (e) => {
    const id = e.target.dataset.id
    setSelectedButton(id)
  }

  const stringToHTML = () => {
    if (html) {
      let doc = ''
      var parser = new DOMParser()
      if (ispql === 'true') {
        doc = parser.parseFromString('{%=' + html + '%}', 'text/html')
      } else {
        doc = parser.parseFromString(html, 'text/html')
      }
      return doc
    }
    return ''
  }

  return (
    <div className='flex'>
      <div className='flex flex-column flex-grow p-3 border'>
        <div className='flex'>
          <div
            className={`button-secondary border ${
              selectedButton === 'html' ? 'isSelected' : ''
            }`}
            data-id='html'
            onClick={onButtonClick}
          >
            HTML
          </div>
          <div
            className={`button-secondary border ${
              selectedButton === 'data' ? 'isSelected' : ''
            }`}
            data-id='data'
            onClick={onButtonClick}
          >
            DATA
          </div>
        </div>
        <div className='flex-grow mr-12'>
          <div style={{ height: '200px' }}>
            <textarea
              className='textarea'
              style={{ width: '100%', height: '100%' }}
              onBlur={onTextAreaChange}
              value={selectedButton === 'data' ? jsondata : handlebartemp}
            />
          </div>
        </div>
      </div>
      {error ? (
        <div className='flex-grow border'>{error} </div>
      ) : (
        <div
          className='whiteSpacePre flex-grow border'
          dangerouslySetInnerHTML={{ __html: createTemplate() }}
        />
      )}
    </div>
  )
}
