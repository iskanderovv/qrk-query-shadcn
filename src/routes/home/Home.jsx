import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <Button>
        <Link to="/auth">Go Login Page</Link>
      </Button>
    </div>
  )
}

export default Home
