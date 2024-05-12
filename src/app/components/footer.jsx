//src\app\components\footer.jsx
const Footer = () => {
  const teamMembers = [
    {
      name: "Ahmed",
      role: "Project Lead",
      github: "https://github.com/IamAhmedly",
      linkedin: "https://www.linkedin.com/in/ahmed-essam-m/",
    },
    {
      name: "Amal",
      role: "To be determined",
      github: "https://github.com/amolllat",
      linkedin: "https://www.linkedin.com/in/AmalLinkedin",
    },
    {
      name: "Yuosra",
      role: "To be determined",
      github: "https://github.com/yousra40",
      linkedin: "https://www.linkedin.com/in/YusraLinkedin",
    },
    {
      name: "Abdulrahman",
      role: "To be determined",
      github: "https://github.com/Dev3bd",
      linkedin: "https://www.linkedin.com/in/AbdulrahmanLinkedin",
    },
  ];

  return (
    <footer className="bg-gray-800 py-4 text-center text-white">
      <div className="container mx-auto">
        <p>Designed and developed by:</p>
        <div className="flex justify-center space-x-4 mt-2">
          {teamMembers.map((member, index) => (
            <div key={index}>
              <p>{member.name}</p>
              <p>{member.role}</p>
              <div className="flex justify-center space-x-2">
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
