import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Menu, Search, CopyPlus } from "lucide-react"
import { ModeToggle } from './mode-toggle'
import axios from 'axios'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from 'react-toastify'

const navItems = [
  { text: "Portfolio", href: "https://rupamdas.vercel.app" },
  { text: "Github", href: "https://github.com/ItzFalco07" },
  { text: "Hire me", href: "https://www.upwork.com/freelancers/~0184cf5697571fafe6" },
  { text: "Contact", href: "https://www.upwork.com/freelancers/~0184cf5697571fafe6" },
]

export default function Navbar({IsAdmin}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [Name, setName] = useState("")
  const [Description, setDescription] = useState("")
  const [Image, setImage] = useState(null)
  const [Tags, setTags] = useState("")
  const [Link, setLink] = useState("")
  const serverUrl = import.meta.env.VITE_SERVER_URL

  const menuVariants = {
    closed: { opacity: 0, y: -20 },
    open: { opacity: 1, y: 0 }
  }

  const linkVariants = {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 }
  }

  async function handleAdd() {
    try {
      if (!Name || !Description || !Image || !Tags || !Link) {
        toast.error('All fields are required')
      } else {
        const formData = new FormData()
        formData.append('Name', Name)
        formData.append('Description', Description)
        formData.append('Tags', Tags)
        formData.append('Link', Link)
        formData.append('file', Image)

        await axios.post(`${serverUrl}/api/post-project`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        toast('Project Added')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="mb-5">Add Project</AlertDialogTitle>
            <form id="projectForm" encType="multipart/form-data">
              <Input onChange={(e) => setName(e.target.value)} placeholder="Name" className="mb-2" />
              <Input onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="mb-2" />
              <Input onChange={(e) => setTags(e.target.value)} placeholder="Tags (separated by ' , ')" className="mb-2" />
              <Input onChange={(e) => setLink(e.target.value)} placeholder="Project Link" className="mb-2" />
              <div className="grid w-full gap-1.5">
                <label className="mt-3 w-[fit-content] ml-4" htmlFor="picture">Add Cover</label>
                <Input
                  name="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="h-[100px] w-full"
                  id="picture"
                  type="file"
                />
              </div>
            </form>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleAdd}>Add</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>

        <nav className="bg-background border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <motion.div
                  className="flex-shrink-0"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-2xl font-bold text-primary">RupamDas</span>
                </motion.div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navItems.slice(0, 3).map((item, index) => (
                      <motion.div
                        key={item.text}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Button variant="ghost" onClick={() => window.location.href = item.href}>
                          {item.text}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Input
                      type="search"
                      placeholder="Search..."
                      className="w-64 pl-10"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    {IsAdmin && (
                      <AlertDialogTrigger>
                        <div className="flex items-center bg-red-500 rounded-[6px] hover:bg-red-600 p-2 px-4 mx-4 cursor-pointer">
                          <CopyPlus className="mr-2 h-4 w-4" /> Add Project
                        </div>
                      </AlertDialogTrigger>
                    )}
                    <ModeToggle />
                  </motion.div>
                </div>
              </div>
              <div className="md:hidden flex items-center">
                <ModeToggle />
                <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="ml-2">
                  <Menu className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="md:hidden"
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuVariants}
                transition={{ duration: 0.3 }}
              >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.text}
                      variants={linkVariants}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start"
                        onClick={() => {
                          window.location.href = item.href
                          setIsMenuOpen(false)
                        }}
                      >
                        {item.text}
                      </Button>
                    </motion.div>
                  ))}
                  {IsAdmin && (
                    <AlertDialogTrigger>
                      <div className="flex items-center bg-red-500 rounded-[6px] hover:bg-red-600 p-2 px-4 mx-4 cursor-pointer">
                        <CopyPlus className="mr-2 h-4 w-4" /> Add Project
                      </div>
                    </AlertDialogTrigger>
                  )}
                </div>
                <div className="pt-4 pb-3 border-t border-gray-700">
                  <div className="flex items-center px-5">
                    <div className="relative w-full">
                      <Input
                        type="search"
                        placeholder="Search..."
                        className="w-full pl-10"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </AlertDialog>
    </>
  )
}