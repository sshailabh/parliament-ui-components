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
import React from 'react'

import { DynamicTemplate } from '../index'

export default {
  title: 'components/DynamicTemplate'
}

export const Default = () => {
  const props = {
    handlebartemp: "<p>{{profile.person.name.firstName}} {{profile.person.name.lastName}}</p>",
    jsondata: `{
      "profile": {
        "person": {
          "name": {
             "firstName": "Yehuda",
             "lastName": "Katz"
          }
        }
      }
    }`,
    ispql: "true"
  }

  return <DynamicTemplate {...props} />
}
