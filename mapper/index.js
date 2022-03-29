'use strict'

const moment = require('moment')
const md5 = require('md5')

moment.suppressDeprecationWarnings = true

module.exports = (item) => {
  const splittedFirstName = item.First_Name.split()
  const hasOtherNames = !!item.Other_Names.trim().length
  const hasAlternativeScript = !!item.Alternative_Script.trim().length
  const isInEnglish = str => /^[a-zA-Z\s]*$/.test(str)
  const otherNames = item.Other_Names.split(';').map(n => n.trim()).filter(n => !!n)
  const englishOtherName = otherNames.reduce((acc, name) => {
    if (acc)
      return acc

    if (isInEnglish(otherNames[otherNames.length - 1]))  {
      acc = otherNames[otherNames.length - 1]

      return acc
    }

    if (isInEnglish(otherNames[0])) {
      acc = otherNames[0]

      return acc
    }

    if (isInEnglish(name)) {
      acc = item

      return acc
    }

    return acc
  }, '')

  item.Full_Name = (
    item.Full_Name ?
    item.Full_Name :
    `${item.First_Name} ${item.Last_Name}`
  ).trim()

  const prevFullName = item.Full_Name

  if (!isInEnglish(item.Full_Name)) {
    if (hasAlternativeScript && isInEnglish(item.Alternative_Script)) {
      item.Full_Name = item.Alternative_Script
      item.Alternative_Script = prevFullName
    } else {
      if (hasOtherNames) {
        const prevFullName = item.Full_Name

        if (englishOtherName) {
          item.Full_Name = englishOtherName
          if (hasAlternativeScript) {
            item.Other_Names += item.Other_Names.length ?
              `;${prevFullName}` :
              prevFullName
          } else {
            item.Alternative_Script = prevFullName
          }
        }
      }
    }
  }

  return {
    type: "Sanctions List",
    first_name: item.First_Name.split(" ")[0].trim(),
    maiden_name: item.First_Name.split(" ").slice(1).join(" ").trim(),
    last_name: item.Last_Name.trim(),
    full_name: item.Full_Name,
    alternate_name: item.Alternative_Script,
    dob: item.DOB && moment(item.DOB).isValid() ? moment(item.DOB).unix() : 0,
    identifier: item.ID,
    json: `"${JSON.stringify(item)}"`, // avoids parsing as object,
    entry_date: null,

    // @NOTE Ignore list dates which continuously change.
    md5: md5(JSON.stringify(Object.assign(item, {
      'Date_of_Publication_of_the_List': null
    })))
  }
}
