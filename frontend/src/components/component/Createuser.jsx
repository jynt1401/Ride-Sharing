/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/mOYLOLa2sqi
 */
'use client'

import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState, useContext} from "react"
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import HomeContext from '@/context/HomeContext';
import { useRouter } from 'next/navigation'


export function CreateUser() {

  const options = [
    'rider', 'driver'
  ];
  const defaultOption = options[0];

  const { auth, setauth } = useContext(HomeContext);

  const [credentials, setcredentials] = useState({});
  const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const onSelect=(e)=>{
    console.log(e)
    setcredentials({ ...credentials, role: e.label });

  }

  const router = useRouter()
  const eventHandler = async () => {
    
    if(Object.keys(credentials).length===5){

      const body = {
        first_name:credentials.first_name,
        last_name:credentials.last_name,
        role:credentials.role,
        email: credentials.email,
        password: credentials.password,
      };
      const response = await fetch("http://localhost:3001/authcreateUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.text();
     console.log(data);
    if (data == "already a user") {
      alert("No such user found");
    } else {
      const leyy = JSON.parse(data);
      console.log(leyy);
      localStorage.setItem("authToken", leyy.authToken);
      // console.log(localStorage.getItem("authToken"));
      setauth(localStorage.getItem("authToken"))
      router.push('http://localhost:3000/', { scroll: false })
    }
  }
  else{
    alert("Fill filled properly")
  }
    
  }
    
// console.log(credentials)

useEffect(()=>{
console.log(credentials)
},[credentials])

  return (
    (<Card className="mx-auto max-w-sm mt-[50px]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Register</CardTitle>
        <CardDescription>Enter your details to register your account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor="f_name">First Name</Label>
            <Input required type="text" name="first_name" value={credentials.first_name} onChange={onchange}/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="l_name">Last Name</Label>
            <Input required type="text" name="last_name" value={credentials.last_name} onChange={onchange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role"> Role</Label>
            <Dropdown className="" options={options} onChange={onSelect} value={options} placeholder="Select an option" />
            {/* <Input required type="text" name="email"  value={credentials.email}  onChange={onchange}/> */}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input required type="email" name="email" value={credentials.email} onChange={onchange} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link className="ml-auto inline-block text-sm underline" href="#">
                Forgot your password?
              </Link>
            </div>
            <Input required type="password" name="password" value={credentials.password} onChange={onchange} />
          </div>
          <Button className="w-full"  onClick={eventHandler}>
            Login
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have a account?
          <Link className="underline" href="http://localhost:3000/Login">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>)
  );
}