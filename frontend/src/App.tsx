import PersonForm from './components/PersonForm'
import PersonView from './components/PersonView'

function App() {

  return (
    <> 
    <div className='flex font-sans min-h-screen bg-gray-800 text-gray-50 justify-center'>
      <div className='flex'>
        <PersonForm/>
        <div className='ml-40'>
          <PersonView />
        </div>
      </div>
    </div>

    </>
  )
}

export default App
