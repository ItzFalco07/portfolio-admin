import {ModeToggle} from './components/mode-toggle';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {useState, useEffect} from "react";
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom';

export default function Validate() {
  localStorage.setItem('Identity', 'visitor')
  const [Passkey, setPasskey] = useState(false)
  const navigate = useNavigate();

  async function handleAccess() {
    try {
    if(Passkey == 'ilikesamosa') {
      toast.success('Success! Welcome Falco');
      localStorage.setItem('Identity', 'admin')
      navigate('/dashboard')
    } else {
      toast.error('Incorrect Passkey')
    }
    }catch(error) {
      console.error(error);
    }
  }

  function handleVisitor() {
    localStorage.setItem('Identity', 'visitor')
    toast('Welcome visitor!')
    navigate('/dashboard')
  }

  return (
    <>
    <ModeToggle/>
    <div className="w-full h-[90vh] flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
          <CardDescription>Enter passkey to access our projects management system.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Passkey</Label>
                <Input onChange={(e)=> setPasskey(e.target.value)}  id="name" placeholder="xyz" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleVisitor} variant="outline">Be Visitor</Button>
          <Button onClick={handleAccess} >Access Dashboard</Button>
        </CardFooter>
    </Card>
    </div>

    </>
  )
}
