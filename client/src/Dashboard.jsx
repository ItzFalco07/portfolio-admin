import Navbar from './components/Navbar';
import ProjectCard from './components/ProjectCard';
import {useEffect, useState} from 'react';
import axios from 'axios';

const Dashboard = () => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const [IsAdmin, setIsAdmin] = useState(false);
  const [Projects, setProjects] = useState([]);
  useEffect(()=> {
    if(localStorage.getItem('Identity') == 'admin') {
      setIsAdmin(true);
    }
    // Fetch projects
    const getProjects = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/get-project`);
        setProjects(response.data); // Set projects from response data
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
    };
  getProjects();


  },[])


  return (
    <>
    <Navbar IsAdmin ={IsAdmin} />
    <div className="flex flex-wrap w-full h-fit-content mt-12 justify-center" >
      {Projects.map((project, index) => (
        <ProjectCard key={index} index={index} name={project.Name} description={project.Description} tags={project.Tags} image={project.Image} link={project.Link} />
      ))}
    </div>
    </>
  );
};

export default Dashboard;