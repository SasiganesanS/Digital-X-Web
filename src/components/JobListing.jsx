import {
  FiMapPin,
  FiClock,
  FiArrowUpRight,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useState, useEffect } from "react";

// component imports
import JobApplication from "./JobApplication";

function JobListing({ searchQuery = "", filters = {} }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState(null);
  const jobsPerPage = 5;

  const allJobs = [
    {
      id: 1,
      title: "Full Stack Web Developer",
      description:
        "Join our engineering team to build innovative web solutions using cutting-edge technologies. Work on both frontend and backend development.",
      location: "Hybrid",
      type: "Full-time",
      role: "Software Engineer",
      department: "Engineering",
      level: "Entry Level",
      skills: ["React", "Node.js", "TypeScript", "MongoDB", "AWS"],
      requirements: [
        "Strong knowledge of React and Node.js",
        "Experience with RESTful APIs and databases",
        "Understanding of modern web development practices",
      ],
    },
    {
      id: 2,
      title: "Full Stack Web Developer Intern",
      description:
        "Gain hands-on experience in full stack web development. Learn from experienced developers and contribute to real-world projects.",
      location: "On-site",
      type: "Internship",
      role: "Software Engineer",
      department: "Engineering",
      level: "Intern",
      skills: ["React", "Node.js", "JavaScript", "HTML/CSS"],
      requirements: [
        "Basic understanding of web development",
        "Eagerness to learn and adapt",
        "Duration: 6m to 1yr",
      ],
    },
    {
      id: 3,
      title: "Mobile App Developer",
      description:
        "Build innovative mobile applications for iOS and Android platforms. Create seamless user experiences with modern mobile technologies.",
      location: "Hybrid",
      type: "Full-time",
      role: "Software Engineer",
      department: "Engineering",
      level: "Mid Level",
      skills: ["React Native", "Flutter", "iOS", "Android", "Firebase"],
      requirements: [
        "Experience with React Native or Flutter",
        "Published apps on App Store or Play Store",
        "Strong understanding of mobile UI/UX patterns",
      ],
    },
    {
      id: 4,
      title: "Mobile App Developer Intern",
      description:
        "Learn mobile app development while working on real projects. Gain experience in building cross-platform applications.",
      location: "On-site",
      type: "Internship",
      role: "Software Engineer",
      department: "Engineering",
      level: "Intern",
      skills: ["React Native", "JavaScript", "Mobile UI"],
      requirements: [
        "Basic programming knowledge",
        "Interest in mobile app development",
        "Duration: 6m to 1yr",
      ],
    },
    {
      id: 5,
      title: "Senior Full Stack Web Developer",
      description:
        "Lead web development projects and mentor junior developers. Build scalable enterprise-level applications.",
      location: "Hybrid",
      type: "Full-time",
      role: "Software Engineer",
      department: "Engineering",
      level: "Mid Level",
      skills: [
        "React",
        "Node.js",
        "TypeScript",
        "PostgreSQL",
        "Docker",
        "Kubernetes",
      ],
      requirements: [
        "3+ years of full stack development experience",
        "Strong leadership and mentoring skills",
        "Experience with cloud platforms",
      ],
    },
    {
      id: 6,
      title: "Frontend Web Developer",
      description:
        "Create beautiful and responsive user interfaces. Work closely with designers to implement pixel-perfect designs.",
      location: "On-site",
      type: "Full-time",
      role: "Software Engineer",
      department: "Engineering",
      level: "Entry Level",
      skills: ["React", "JavaScript", "CSS", "Tailwind", "Figma"],
      requirements: [
        "Strong HTML, CSS, and JavaScript skills",
        "Experience with React or similar frameworks",
        "Eye for design and attention to detail",
      ],
    },
    {
      id: 7,
      title: "Backend Web Developer",
      description:
        "Build robust APIs and server-side applications. Work on database design and optimization.",
      location: "Hybrid",
      type: "Full-time",
      role: "Software Engineer",
      department: "Engineering",
      level: "Entry Level",
      skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "REST API"],
      requirements: [
        "Experience with Node.js and databases",
        "Understanding of API design principles",
        "Knowledge of authentication and security",
      ],
    },
    {
      id: 8,
      title: "iOS App Developer",
      description:
        "Develop native iOS applications using Swift. Create smooth and intuitive user experiences for iPhone and iPad.",
      location: "Hybrid",
      type: "Full-time",
      role: "Software Engineer",
      department: "Engineering",
      level: "Mid Level",
      skills: ["Swift", "iOS SDK", "UIKit", "SwiftUI", "Core Data"],
      requirements: [
        "Strong Swift programming skills",
        "Published iOS apps on App Store",
        "Understanding of iOS design guidelines",
      ],
    },
    {
      id: 9,
      title: "Android App Developer",
      description:
        "Build native Android applications using Kotlin. Optimize app performance and ensure compatibility across devices.",
      location: "On-site",
      type: "Full-time",
      role: "Software Engineer",
      department: "Engineering",
      level: "Mid Level",
      skills: ["Kotlin", "Android SDK", "Jetpack Compose", "Room", "Firebase"],
      requirements: [
        "Experience with Kotlin and Android development",
        "Published Android apps on Play Store",
        "Knowledge of Material Design",
      ],
    },
    {
      id: 10,
      title: "React Native Developer Intern",
      description:
        "Learn cross-platform mobile development with React Native. Work on real apps for both iOS and Android.",
      location: "On-site",
      type: "Internship",
      role: "Software Engineer",
      department: "Engineering",
      level: "Intern",
      skills: ["React Native", "JavaScript", "React"],
      requirements: [
        "Basic knowledge of JavaScript and React",
        "Passion for mobile development",
        "Duration: 6m to 1yr",
      ],
    },
  ];

  // Filter jobs based on search query and filters
  const jobs = allJobs.filter((job) => {
    // Search query filter
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      job.title.toLowerCase().includes(searchLower) ||
      job.description.toLowerCase().includes(searchLower) ||
      job.skills.some((skill) => skill.toLowerCase().includes(searchLower));

    // Filter pills
    const matchesRole = !filters.role || job.role === filters.role;
    const matchesDepartment =
      !filters.department || job.department === filters.department;
    const matchesType = !filters.type || job.type === filters.type;
    const matchesLevel = !filters.level || job.level === filters.level;
    const matchesLocation =
      !filters.location || job.location === filters.location;

    return (
      matchesSearch &&
      matchesRole &&
      matchesDepartment &&
      matchesType &&
      matchesLevel &&
      matchesLocation
    );
  });

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters]);

  // Pagination logic
  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 sm:px-4 py-2 rounded-full font-medium transition-colors text-sm sm:text-[15px] lg:text-base ${
            currentPage === i
              ? 'bg-[#371445] text-white shadow-[0_6px_20px_rgba(45,27,78,0.3)]'
              : 'bg-white text-[#371445] hover:bg-purple-50 border-2 border-[#371445]'
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <>
      <div className="bg-gray-50 py-4 sm:py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          {jobs.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <p className="text-[#5F5F5F] text-base sm:text-lg lg:text-xl">No jobs found matching your criteria.</p>
              <p className="text-[#5F5F5F] mt-2 text-sm sm:text-[15px] lg:text-base">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <>
              {currentJobs.map((job, index) => (
                <div key={job.id}>
                  <div className="flex flex-col sm:flex-row items-start justify-between py-6 sm:py-8 gap-4">
                    {/* Left Side - Job Info */}
                    <div className="flex-1 w-full">
                      <h3 className="text-[#371445] text-xl sm:text-[22px] lg:text-2xl font-bold mb-2 sm:mb-3">
                        {job.title}
                      </h3>
                      <p className="text-[#5F5F5F] text-sm sm:text-[15px] lg:text-base mb-4 sm:mb-6">
                        {job.description}
                      </p>

                      {/* Tags */}
                      <div className="flex gap-2 sm:gap-3 flex-wrap">
                        <div className="flex items-center gap-2 border-2 border-[#371445] rounded-full px-3 sm:px-5 py-1.5 sm:py-2">
                          <FiMapPin className="text-[#371445] w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="text-[#371445] font-medium text-xs sm:text-sm lg:text-base">
                            {job.location}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 border-2 border-[#371445] rounded-full px-3 sm:px-5 py-1.5 sm:py-2">
                          <FiClock className="text-[#371445] w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="text-[#371445] font-medium text-xs sm:text-sm lg:text-base">
                            {job.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 bg-purple-100 rounded-full px-3 sm:px-5 py-1.5 sm:py-2">
                          <span className="text-[#371445] font-medium text-xs sm:text-sm lg:text-base">
                            {job.level}
                          </span>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
                        {job.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-200 text-[#5F5F5F] text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right Side - Apply Button */}
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="w-full sm:w-auto text-[#371445] text-lg sm:text-xl lg:text-2xl font-bold hover:text-[#371445]/80 transition-colors flex items-center justify-center sm:justify-start gap-2 sm:ml-8 hover:-translate-y-1 transition-all duration-300 mt-2 sm:mt-0"
                    >
                      Apply
                      <FiArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                  </div>
                  <div className="border-b border-gray-200"></div>
                </div>
              ))}

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 sm:gap-3 mt-8 sm:mt-12 flex-wrap">
                  {/* Previous Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 sm:px-4 py-2 rounded-full font-medium transition-colors flex items-center gap-1 sm:gap-2 text-sm sm:text-[15px] lg:text-base ${
                      currentPage === 1
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-[#371445] hover:bg-purple-50 border-2 border-[#371445]'
                    }`}
                  >
                    <FiChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">Previous</span>
                    <span className="sm:hidden">Prev</span>
                  </button>

                  {/* Page Numbers */}
                  {renderPageNumbers()}

                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 sm:px-4 py-2 rounded-full font-medium transition-colors flex items-center gap-1 sm:gap-2 text-sm sm:text-[15px] lg:text-base ${
                      currentPage === totalPages
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-[#371445] hover:bg-purple-50 border-2 border-[#371445]'
                    }`}
                  >
                    Next
                    <FiChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Job Application Modal */}
      {selectedJob && (
        <JobApplication job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </>
  );
}

export default JobListing;