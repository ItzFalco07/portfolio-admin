import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function ProjectCard({name, description, tags, image, link}) {
  return (
      <Card className="w-[300px] text-white m-6">
        <CardHeader className="pb-3">
          <div className="relative w-full h-40  rounded-lg overflow-hidden mb-4">
            <img
              src={image}
              alt="Lulugram App Screenshot"
              className="w-full h-full object-cover"
            />
          </div>
          <CardTitle className="text-xl font-bold">{name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-400 mb-4">
          {description}
          </p>
          <div className="flex gap-2 flex-wrap">
           {tags.map(e => (
              <Badge variant="secondary" className="bg-[#333345] text-white">{e}</Badge>
           ))}
          </div>
        </CardContent>
        <CardFooter>
        <a href={link} className="w-full" >
          <Button className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-white">
            View Project
          </Button>
        </a>
        </CardFooter>
      </Card>
  )
}