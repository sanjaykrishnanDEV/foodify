import Layout from './components/Layout/Layout'

function App() {
useEffect(()=>({
  window.bentoSettings = {
  // Can be found in Data and Integrations page
  appId: '<BENTO f05f65c9-7812-45fe-b9fe-0423b35406f3>',
  // Accounts represent your customers or organizations.
  // For example, a company called "AcmeCo".
  // Or a company you would sell your product to.
  account: {
    // REQUIRED (String); Unique identifier for the account
    // This is best set to something used internally by your app
    id: '9990965678',
    // REQUIRED; Human-readable unique account identifier
    // Allows easily identifying the account within the Bento UI
    name: 'sanjay',
    // Please ensure it's formatted to ISO8601 Date String
    createdAt: '<ACCOUNT CREATED AT>',
    // You may also add any additional attributes you want associated with this account within Bento
    // [additionalAttribute: string]: boolean | Date | number | string
  },
  // Account users represent employees at your account.
  // For example, someone named John Doe who works at AcmeCo.
  // Or the person who would be using your software at the company who purchased it.
  accountUser: {
    // REQUIRED (String); Unique identifier for the account user
    // This is best set to something used internally by your app
    id: '<USER ID>',
    // OPTIONAL but recommended; Human-readable unique account user identifier
    // Allows easily identifying the account user within the Bento UI
    fullName: '<USER NAME>',
    email: '<USER EMAIL>',
    // Please ensure it's formatted to ISO8601 Date String
    createdAt: '<USER CREATED AT>',
    // You may also add any additional attributes (i.e. "role") you want associated with this account user within Bento
    // [additionalAttribute: string]: boolean | Date | number | string
  },
};
}),[])
  return (
    <>
    <Layout/>
    </>
  )
}

export default App
