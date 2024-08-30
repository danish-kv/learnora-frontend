import React, { useEffect, useState } from "react";
import CourseSidebar from "../components/CourseSidebar";
import Header from "../../../components/layout/Header";
import CourseList from "../components/CourseList";
import UseFetchCategory from "../../admin/hooks/UseFetchCategory";
import useFetchCourse from "../../admin/hooks/useFetchCourse";
import { useNavigate } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Courses = () => {
  const { categories, error } = UseFetchCategory();
  const { courses, getCourses, loading, page, setPage, totalPages } =
    useFetchCourse();
  const [seletedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();
  console.log("selected categr", seletedCategory);
  console.log("all cat", categories);

  console.log(courses);


  useEffect(() => {
    getCourses(page, seletedCategory);
  }, [page, seletedCategory]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setPage(1);
    navigate(`/courses/?category=${category}&page=1`);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      navigate(`/courses/?category=${seletedCategory || ""}&page=${newPage}`);
    }
  };

  const renderPaginationItems = () => {
    let items = [];
    const maxVisiblePage = 5;
    const halfVisible = Math.floor(maxVisiblePage / 2);
    let startPage = Math.max(1, page - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisiblePage - 1);

    if (endPage - startPage + 1 < maxVisiblePage) {
      startPage = Math.max(1, endPage - maxVisiblePage + 1);
    }

    if (startPage > 1) {
      items.push(
        <PaginationItem key="start-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => handlePageChange(i)}
            isActive={page === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages) {
      items.push(
        <PaginationItem key="end-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-8">
          <aside className="w-64 flex-shrink-0">
            <CourseSidebar
              categories={categories}
              selectedCategory={seletedCategory}
              onSelectCategory={handleCategorySelect}
            />
          </aside>
          <main className="flex-1">
            <CourseList courses={courses} />
            <div className="mt-8">
            {courses.length > 0 && 
            
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    {page != 1 && (
                      <PaginationPrevious
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        />
                    )}
                  </PaginationItem>
                  {renderPaginationItems()}
                  <PaginationItem>
                    {page != totalPages && (
                      <PaginationNext
                      onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages}
                      />
                    )}
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            }
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Courses;
