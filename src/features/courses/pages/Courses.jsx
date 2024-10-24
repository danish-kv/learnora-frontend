import React, { useEffect, useState } from "react";
import CourseSidebar from "../components/CourseSidebar";
import Header from "../../../components/layout/Header";
import CourseList from "../components/CourseList";
import UseFetchCategory from "../../admin/hooks/UseFetchCategory";
import useFetchCourse from "../../admin/hooks/useFetchCourse";
import { useNavigate } from "react-router-dom";
import PaginationComponent from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import { BookOpen } from "lucide-react";
import Banner from "@/components/common/Banner";
import CardSkeleton from "@/skeleton/CardSkeleton";

const Courses = () => {
  const { categories } = UseFetchCategory();
  const {
    courses,
    getCourses,
    loading,
    page,
    setPage,
    totalPages,
    getSearchedCourses,
  } = useFetchCourse();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery) {
      getSearchedCourses(searchQuery);
    } else {
      getCourses(page, selectedCategory);
    }
  }, [page, selectedCategory, searchQuery]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setPage(1);
    setSearchQuery("");
    navigate(`/courses/?category=${category}&page=1`);
    getCourses(1, category);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      navigate(`/courses/?category=${selectedCategory || ""}&page=${newPage}`);
    }
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Banner
        title="Discover Your Next Learning Adventure"
        description="Explore our wide range of courses and start your journey to mastery."
        buttonText="Explore Courses"
        icon={BookOpen}
        gradient="bg-gradient-to-r from-indigo-600 to-purple-600"
        onClick={() => console.log("Explore Courses clicked")}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:flex lg:space-x-8">
          <aside className="lg:w-64 flex-shrink-0 mb-8 lg:mb-0">
            <button
              className="lg:hidden w-full bg-white text-indigo-600 font-semibold py-2 px-4 rounded-md mb-4"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? "Hide Categories" : "Show Categories"}
            </button>
            <div className={`lg:block ${sidebarOpen ? "block" : "hidden"}`}>
              {categories.length > 0 ? (
                <CourseSidebar
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelectCategory={handleCategorySelect}
                />
              ) : (
                <p>No categories available</p>
              )}
            </div>
          </aside>
          <main className="flex-1">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              from="courses"
            />
            {loading ? (
              [...Array(5)].map((_, index) => <CardSkeleton key={index} />)
            ) : (
              <>
                <CourseList courses={courses} />
                <div className="mt-8">
                  {courses.length > 0 && (
                    <PaginationComponent
                      page={page}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  )}
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Courses;
