'use strict'

const mapperFn = require('./mapper')
const colors = require('colors/safe')

const original = {
  ID: '10151134201',
  Title: '',
  First_Name: 'x',
  Last_Name: '',
  Full_Name: 'Бурляев Николай Петрович',
  Other_Names: 'Nikolai Burlyayev',
  Alternative_Script: 'урляев Николай Петрович',
  DOB: '03/08/1946',
  POB: '',
  Additional_Information: 'EU reference number: EU.7114.73, (Legal Basis: 2022/261 (OJ L42I), Programme: UKR, Reg. Date: 2022-02-23, Type: amendment, Organization Type: council, Publication Date: 2022-02-23, PDF Link: https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=OJ:L:2022:042I:FULL&from=EN), Entity Remark: (Designation Date: 2022-02-23); Aliases Additional Information: (Nikolai Burlyayev, Function: Member of the State Duma)',
  Type_SDN_or_Entity: 'P',
  Address: '',
  Passsport_Nr: '',
  Name_of_the_List: 'EU Financial Sanctions',
  Type_of_List: 'European Union Lists',
  Date_of_Publication_of_the_List: '15.03.2022',
  Authority: 'European Commission, the EU Credit Sector Federations',
  Whitelist: 'No'
}

const mapped = mapperFn(original)

console.log(colors.green(mapped))
