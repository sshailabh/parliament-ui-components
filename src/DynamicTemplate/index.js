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
import React, { useCallback, useState } from 'react'
// import { css } from '@emotion/react'
// import { Flex } from '@adobe/react-spectrum'
// import './styles'
import Handlebars from 'handlebars'

const hbr = `Street: {{address.street}}
City: {{address.city}} 
Dynamic: {{part}}`

export const DynamicTemplate = () => {
  const [error, setError] = useState(null)
  const [data, setData] = useState({})
  const [html, setHTML] = useState('')

  const onJSONChange = (e) => {
    const value = e.target.value
    try {
      const temp = JSON.parse(value)
      setData(temp)
      setError(null)
    } catch (e) {
      setError('Invalid json')
    }
  }

  const onHTMLChange = (e) => {
    setHTML(e.target.value)
  }

  const createTemplate = () => {
    if (html) {
      const obj = stringToHTML()

      const strigifiedHTML = obj.body.innerHTML.toString()
      const template = Handlebars.compile(
        strigifiedHTML.replaceAll(/\n/g, '<br />')
      )

      return template(data)
    }

    return ''
  }

  const stringToHTML = () => {
    if (html) {
      var parser = new DOMParser()
      var doc = parser.parseFromString(html, 'text/html')

      return doc
    }
    return ''
  }

  return (
    <div>
      {error ? <div>{error} </div> : null}
      <div>
        <div style={{ height: '100px' }}>
          <textarea
            style={{ width: '100%', height: '100%' }}
            onBlur={onJSONChange}
            defaultValue={JSON.stringify({}, undefined, 2)}
          />
        </div>
        <div style={{ height: '100px' }}>
          <textarea
            style={{ width: '100%', height: '100%' }}
            onBlur={onHTMLChange}
            defaultValue={hbr}
          />
        </div>
      </div>
      <div
        // className='whiteSpacePre'
        dangerouslySetInnerHTML={{ __html: createTemplate() }}
      />
    </div>
  )
}
